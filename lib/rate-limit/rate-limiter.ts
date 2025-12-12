/**
 * Distributed Rate Limiter
 * 
 * Postgres-based rate limiting that works across multiple instances.
 * Uses a sliding window approach with per-minute and per-hour limits.
 * 
 * NOTE: After adding RateLimitEntry to schema.prisma, run:
 *   pnpm prisma generate
 * to regenerate the Prisma Client with the new model.
 */

import { prisma } from '@/lib/db/prisma'
import { RATE_LIMIT } from '@/lib/ai/guardrails'
import type { RateLimitEntry } from '@prisma/client'

export interface RateLimitResult {
  allowed: boolean
  retryAfter?: number
}

/**
 * Check if a user request is within rate limits
 * 
 * Uses Postgres to maintain request counts across all instances.
 * Implements sliding window for both per-minute and per-hour limits.
 * 
 * @param userId - User ID to check rate limit for
 * @param now - Current timestamp (defaults to Date.now())
 * @returns Rate limit check result with allowed status and optional retryAfter
 */
export async function checkRateLimit(
  userId: string,
  now: number = Date.now()
): Promise<RateLimitResult> {
  try {
    // Clean up old entries for this user only (older than 1 hour)
    // Scoped cleanup prevents unnecessary work and improves performance at scale
    const oneHourAgo = new Date(now - 3600000)
    await prisma.rateLimitEntry.deleteMany({
      where: {
        userId,
        timestamp: {
          lt: oneHourAgo,
        },
      },
    })

    // Get all entries for this user in the last hour
    const oneHourAgoDate = new Date(now - 3600000)
    const entries = await prisma.rateLimitEntry.findMany({
      where: {
        userId,
        timestamp: {
          gte: oneHourAgoDate,
        },
      },
      orderBy: {
        timestamp: 'asc',
      },
    })

    // Check per-hour limit
    if (entries.length >= RATE_LIMIT.maxRequestsPerHour) {
      const oldestEntry = entries[0]
      if (oldestEntry) {
        const oldestTimestamp = oldestEntry.timestamp.getTime()
        const retryAfter = Math.ceil((oldestTimestamp + 3600000 - now) / 1000)
        return { allowed: false, retryAfter: Math.max(1, retryAfter) }
      }
    }

    // Check per-minute limit
    const oneMinuteAgo = new Date(now - 60000)
    const recentEntries = entries.filter((e: RateLimitEntry) => e.timestamp >= oneMinuteAgo)

    if (recentEntries.length >= RATE_LIMIT.maxRequestsPerMinute) {
      const oldestRecent = recentEntries[0]
      if (oldestRecent) {
        const oldestTimestamp = oldestRecent.timestamp.getTime()
        const retryAfter = Math.ceil((oldestTimestamp + 60000 - now) / 1000)
        return { allowed: false, retryAfter: Math.max(1, retryAfter) }
      }
    }

    // Record this request
    await prisma.rateLimitEntry.create({
      data: {
        userId,
        timestamp: new Date(now),
      },
    })

    return { allowed: true }
  } catch (error) {
    // On database error, allow the request but log the error
    // This prevents rate limiting from breaking the service
    console.error('Rate limit check failed:', error)
    return { allowed: true }
  }
}

/**
 * Fallback in-memory rate limiter for development
 * Only used when USE_IN_MEMORY_RATE_LIMIT env var is set
 */
const inMemoryStore = new Map<string, { requests: number[]; lastReset: number }>()

export function checkRateLimitInMemory(userId: string): RateLimitResult {
  const now = Date.now()
  const userLimit = inMemoryStore.get(userId) || { requests: [], lastReset: now }

  // Reset hourly window
  if (now - userLimit.lastReset > 3600000) {
    userLimit.requests = []
    userLimit.lastReset = now
  }

  // Remove requests older than 1 minute
  const oneMinuteAgo = now - 60000
  userLimit.requests = userLimit.requests.filter((time) => time > oneMinuteAgo)

  // Check per-minute limit
  if (userLimit.requests.length >= RATE_LIMIT.maxRequestsPerMinute) {
    const oldestRequest = Math.min(...userLimit.requests)
    const retryAfter = Math.ceil((oldestRequest + 60000 - now) / 1000)
    // Save state before returning to preserve rate limit tracking
    inMemoryStore.set(userId, userLimit)
    return { allowed: false, retryAfter: Math.max(1, retryAfter) }
  }

  // Check per-hour limit
  const hourAgo = now - 3600000
  const requestsInHour = userLimit.requests.filter((time) => time > hourAgo)
  if (requestsInHour.length >= RATE_LIMIT.maxRequestsPerHour) {
    const sortedRequests = requestsInHour.sort((a, b) => a - b)
    const oldestInHour = sortedRequests[0]
    if (oldestInHour !== undefined) {
      const retryAfter = Math.ceil((oldestInHour + 3600000 - now) / 1000)
      // Save state before returning to preserve rate limit tracking
      inMemoryStore.set(userId, userLimit)
      return { allowed: false, retryAfter: Math.max(1, retryAfter) }
    }
  }

  // Allow request
  userLimit.requests.push(now)
  inMemoryStore.set(userId, userLimit)
  return { allowed: true }
}

