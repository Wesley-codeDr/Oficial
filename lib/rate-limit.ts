/**
 * Rate Limiting Utility
 * 
 * Simple in-memory rate limiter for API routes.
 * For production with multiple instances, consider using Redis or Upstash.
 * 
 * Usage:
 * ```typescript
 * import { rateLimit } from '@/lib/rate-limit'
 * 
 * export async function POST(request: Request) {
 *   const limiter = rateLimit({ interval: 60000, uniqueTokenPerInterval: 500 })
 *   try {
 *     await limiter.check(request, 10) // 10 requests per minute
 *   } catch {
 *     return new Response('Rate limit exceeded', { status: 429 })
 *   }
 *   // ... rest of handler
 * }
 * ```
 */

import { NextRequest } from 'next/server'

interface RateLimitOptions {
  interval: number // Time window in milliseconds
  uniqueTokenPerInterval?: number // Number of unique tokens to keep track of
}

interface RateLimitResult {
  limit: number
  remaining: number
  reset: number
}

class RateLimiter {
  private tokenCache: Map<string, number[]>
  private interval: number
  private uniqueTokenPerInterval: number

  constructor(options: RateLimitOptions) {
    this.interval = options.interval
    this.uniqueTokenPerInterval = options.uniqueTokenPerInterval || 500
    this.tokenCache = new Map()

    // Clean up old entries periodically
    if (typeof window === 'undefined') {
      // Only run cleanup on server
      setInterval(() => {
        const now = Date.now()
        for (const [key, timestamps] of this.tokenCache.entries()) {
          const validTimestamps = timestamps.filter(
            (timestamp) => now - timestamp < this.interval
          )
          if (validTimestamps.length === 0) {
            this.tokenCache.delete(key)
          } else {
            this.tokenCache.set(key, validTimestamps)
          }
        }
      }, this.interval)
    }
  }

  /**
   * Get a unique identifier for the request
   */
  private getIdentifier(request: NextRequest | Request): string {
    // Try to get IP from various headers (for different deployment environments)
    const headers = request.headers
    const forwarded = headers.get('x-forwarded-for')
    const real = headers.get('x-real-ip')
    const cfConnecting = headers.get('cf-connecting-ip')
    
    let ip = cfConnecting || real || forwarded || 'unknown'
    
    // If multiple IPs in x-forwarded-for, take the first one
    if (ip && ip.includes(',')) {
      ip = ip.split(',')[0]?.trim() ?? 'unknown'
    }

    // Include user agent to prevent abuse from same IP
    const userAgent = headers.get('user-agent') || 'unknown'
    
    return `${ip}:${userAgent.substring(0, 50)}`
  }

  /**
   * Check if the request is within rate limits
   * @throws Error if rate limit is exceeded
   */
  async check(
    request: NextRequest | Request,
    limit: number
  ): Promise<RateLimitResult> {
    const identifier = this.getIdentifier(request)
    const now = Date.now()

    // Get existing timestamps for this identifier
    const timestamps = this.tokenCache.get(identifier) || []

    // Filter out timestamps outside the current window
    const validTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < this.interval
    )

    // Check if limit is exceeded
    if (validTimestamps.length >= limit) {
      const oldestTimestamp = Math.min(...validTimestamps)
      const resetTime = oldestTimestamp + this.interval

      const error = new Error('Rate limit exceeded') as Error & RateLimitResult
      error.limit = limit
      error.remaining = 0
      error.reset = Math.ceil((resetTime - now) / 1000)
      throw error
    }

    // Add current timestamp
    validTimestamps.push(now)

    // Manage cache size
    if (this.tokenCache.size >= this.uniqueTokenPerInterval) {
      // Remove oldest entry
      const firstKey = this.tokenCache.keys().next().value
      if (firstKey !== undefined) {
        this.tokenCache.delete(firstKey)
      }
    }

    this.tokenCache.set(identifier, validTimestamps)

    return {
      limit,
      remaining: limit - validTimestamps.length,
      reset: Math.ceil(this.interval / 1000),
    }
  }
}

// Create rate limiter instances for different use cases
const limiters = new Map<string, RateLimiter>()

/**
 * Get or create a rate limiter for a specific configuration
 */
export function rateLimit(options: RateLimitOptions): RateLimiter {
  const key = `${options.interval}-${options.uniqueTokenPerInterval || 500}`
  
  if (!limiters.has(key)) {
    limiters.set(key, new RateLimiter(options))
  }
  
  return limiters.get(key)!
}

/**
 * Default rate limiters for common use cases
 */

// Strict rate limit for authentication endpoints (5 requests per minute)
export const authLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
})

// Standard rate limit for API endpoints (30 requests per minute)
export const apiLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 1000,
})

// Relaxed rate limit for read operations (100 requests per minute)
export const readLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 2000,
})

// Strict rate limit for AI/expensive operations (10 requests per minute)
export const aiLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
})

/**
 * Type guard to check if error is a rate limit error
 */
function isRateLimitError(error: unknown): error is Error & RateLimitResult {
  return (
    error instanceof Error &&
    'limit' in error &&
    'remaining' in error &&
    'reset' in error &&
    typeof (error as { limit: unknown }).limit === 'number' &&
    typeof (error as { remaining: unknown }).remaining === 'number' &&
    typeof (error as { reset: unknown }).reset === 'number'
  )
}

/**
 * Middleware helper to apply rate limiting to a route handler
 */
export async function withRateLimit(
  request: NextRequest | Request,
  limiter: RateLimiter,
  limit: number
): Promise<Response | null> {
  try {
    const result = await limiter.check(request, limit)
    
    // Add rate limit headers
    const headers = new Headers()
    headers.set('X-RateLimit-Limit', result.limit.toString())
    headers.set('X-RateLimit-Remaining', result.remaining.toString())
    headers.set('X-RateLimit-Reset', result.reset.toString())
    
    return null // No error, continue with request
  } catch (error: unknown) {
    // Verify error structure with type guard
    if (!isRateLimitError(error)) {
      // Re-throw if not a rate limit error
      throw error
    }
    
    const result = error
    
    // Return 429 response
    return new Response(
      JSON.stringify({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.',
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': result.limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': result.reset.toString(),
          'Retry-After': result.reset.toString(),
        },
      }
    )
  }
}
