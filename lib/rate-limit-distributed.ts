/**
 * Distributed Rate Limiting Utility
 *
 * Supports both in-memory and distributed rate limiting (Upstash Redis).
 * For production with multiple instances, use Upstash for distributed rate limiting.
 *
 * Usage:
 * ```typescript
 * import { rateLimit, withRateLimit, apiLimiter } from '@/lib/rate-limit-distributed'
 *
 * export async function POST(request: Request) {
 *   const rateLimitResponse = await withRateLimit(request, apiLimiter, 10)
 *   if (rateLimitResponse) return rateLimitResponse
 *
 *   // ... rest of handler
 * }
 * ```
 */

import { NextRequest } from 'next/server'

// ============================================================================
// Configuration
// ============================================================================

type RateLimitBackend = 'memory' | 'upstash'

interface RateLimitOptions {
  interval: number // Time window in milliseconds
  uniqueTokenPerInterval?: number // Number of unique tokens to keep track of (memory only)
}

interface RateLimitResult {
  limit: number
  remaining: number
  reset: number
}

// Get rate limit backend from environment (default: memory)
const RATE_LIMIT_BACKEND: RateLimitBackend =
  (process.env.RATE_LIMIT_BACKEND as RateLimitBackend) || 'memory'

// ============================================================================
// In-Memory Rate Limiter
// ============================================================================

class InMemoryRateLimiter {
  private tokenCache: Map<string, number[]>
  private interval: number
  private uniqueTokenPerInterval: number

  constructor(options: RateLimitOptions) {
    this.interval = options.interval
    this.uniqueTokenPerInterval = options.uniqueTokenPerInterval || 500
    this.tokenCache = new Map()

    // Clean up old entries periodically
    if (typeof (globalThis as { window?: unknown }).window === 'undefined') {
      // Only run cleanup on server
      globalThis.setInterval?.(() => {
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

// ============================================================================
// Upstash Redis Rate Limiter
// ============================================================================

class UpstashRateLimiter {
  private interval: number
  private redisUrl: string
  private redisToken: string

  constructor(options: RateLimitOptions) {
    this.interval = options.interval
    this.redisUrl = process.env.UPSTASH_REDIS_REST_URL || ''
    this.redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || ''

    if (!this.redisUrl || !this.redisToken) {
      throw new Error(
        'Upstash Redis credentials not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN environment variables.'
      )
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
   * Check if the request is within rate limits using Upstash Redis
   * @throws Error if rate limit is exceeded
   */
  async check(
    request: NextRequest | Request,
    limit: number
  ): Promise<RateLimitResult> {
    const identifier = this.getIdentifier(request)
    const now = Date.now()
    const windowStart = now - this.interval
    const key = `ratelimit:${identifier}`

    try {
      // Use Upstash Redis REST API
      const response = await fetch(`${this.redisUrl}/pipeline`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.redisToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          // Remove old entries
          ['ZREMRANGEBYSCORE', key, 0, windowStart],
          // Count current entries
          ['ZCARD', key],
          // Add current timestamp
          ['ZADD', key, now, `${now}-${Math.random()}`],
          // Set expiration
          ['EXPIRE', key, Math.ceil(this.interval / 1000) + 1],
        ]),
      })

      if (!response.ok) {
        throw new Error(`Upstash Redis request failed: ${response.statusText}`)
      }

      const data = await response.json()
      const count = data[1]?.result || 0

      // Check if limit is exceeded
      if (count >= limit) {
        // Get oldest timestamp to calculate reset time
        const oldestResponse = await fetch(`${this.redisUrl}/ZRANGE`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.redisToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([key, 0, 0, 'WITHSCORES']),
        })

        const oldestData = await oldestResponse.json()
        const oldestTimestamp = oldestData.result?.[1]
          ? parseFloat(oldestData.result[1])
          : now

        const resetTime = oldestTimestamp + this.interval

        const error = new Error('Rate limit exceeded') as Error & RateLimitResult
        error.limit = limit
        error.remaining = 0
        error.reset = Math.ceil((resetTime - now) / 1000)
        throw error
      }

      return {
        limit,
        remaining: limit - count,
        reset: Math.ceil(this.interval / 1000),
      }
    } catch (error) {
      // Log error but don't fail the request (fallback to allow)
      console.error('Rate limiting error:', error)
      // Return success to avoid blocking requests when Redis is down
      return {
        limit,
        remaining: limit,
        reset: Math.ceil(this.interval / 1000),
      }
    }
  }
}

// ============================================================================
// Rate Limiter Factory
// ============================================================================

interface RateLimiter {
  check(request: NextRequest | Request, limit: number): Promise<RateLimitResult>
}

const limiters = new Map<string, RateLimiter>()

/**
 * Get or create a rate limiter for a specific configuration
 */
export function rateLimit(options: RateLimitOptions): RateLimiter {
  const key = `${RATE_LIMIT_BACKEND}-${options.interval}-${options.uniqueTokenPerInterval || 500}`

  if (!limiters.has(key)) {
    if (RATE_LIMIT_BACKEND === 'upstash') {
      limiters.set(key, new UpstashRateLimiter(options))
    } else {
      limiters.set(key, new InMemoryRateLimiter(options))
    }
  }

  return limiters.get(key)!
}

// ============================================================================
// Default Rate Limiters
// ============================================================================

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

// ============================================================================
// Type Guards and Helpers
// ============================================================================

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

// ============================================================================
// Export
// ============================================================================

export type { RateLimitOptions, RateLimitResult }
export { InMemoryRateLimiter, UpstashRateLimiter }
