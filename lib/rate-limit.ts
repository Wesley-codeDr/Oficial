/**
 * Rate Limiting Utility (Distributed)
 *
 * Supports both in-memory and distributed rate limiting (Upstash Redis).
 * For production with multiple instances, use Upstash for distributed rate limiting.
 *
 * Configuration:
 * - Set RATE_LIMIT_BACKEND="upstash" in .env to use distributed rate limiting
 * - Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN for Upstash
 *
 * Usage:
 * ```typescript
 * import { rateLimit, withRateLimit, apiLimiter } from '@/lib/rate-limit'
 *
 * export async function POST(request: Request) {
 *   const rateLimitResponse = await withRateLimit(request, apiLimiter, 10)
 *   if (rateLimitResponse) return rateLimitResponse
 *
 *   // ... rest of handler
 * }
 * ```
 */

export { rateLimit, withRateLimit, apiLimiter, authLimiter, readLimiter, aiLimiter } from './rate-limit-distributed'
export type { RateLimitOptions, RateLimitResult } from './rate-limit-distributed'
