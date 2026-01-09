/**
 * Health API Endpoint Integration Tests
 *
 * Tests for /api/health endpoint covering:
 * - Basic health check
 * - Detailed health check with database and memory info
 * - HEAD request for alive check
 * - Error handling
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'

// Use vi.hoisted to define mocks before they're used in vi.mock
const mocks = vi.hoisted(() => ({
  prismaQueryRaw: vi.fn(),
}))

// Mock Prisma
vi.mock('@/lib/db/prisma', () => ({
  prisma: {
    $queryRaw: mocks.prismaQueryRaw,
  },
}))

// Import after mocks
import { GET, HEAD } from '@/app/api/health/route'

// ============================================================================
// Test Utilities
// ============================================================================

function createMockRequest(searchParams: Record<string, string> = {}): NextRequest {
  const url = new URL('http://localhost:3000/api/health')
  Object.entries(searchParams).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })
  return new NextRequest(url)
}

// ============================================================================
// GET /api/health Tests
// ============================================================================

describe('GET /api/health', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Basic health check', () => {
    it('should return healthy status', async () => {
      const request = createMockRequest()
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.status).toBe('healthy')
    })

    it('should include timestamp in ISO format', async () => {
      const request = createMockRequest()
      const response = await GET(request)
      const data = await response.json()

      expect(data.timestamp).toBeDefined()
      expect(new Date(data.timestamp).toISOString()).toBe(data.timestamp)
    })

    it('should include uptime as a number', async () => {
      const request = createMockRequest()
      const response = await GET(request)
      const data = await response.json()

      expect(typeof data.uptime).toBe('number')
      expect(data.uptime).toBeGreaterThanOrEqual(0)
    })

    it('should include environment info', async () => {
      const request = createMockRequest()
      const response = await GET(request)
      const data = await response.json()

      expect(data.environment).toBeDefined()
      expect(['development', 'test', 'production', 'unknown']).toContain(
        data.environment
      )
    })

    it('should not include detailed checks without detailed param', async () => {
      const request = createMockRequest()
      const response = await GET(request)
      const data = await response.json()

      expect(data.checks).toBeUndefined()
    })
  })

  describe('Detailed health check', () => {
    beforeEach(() => {
      mocks.prismaQueryRaw.mockResolvedValue([{ '?column?': 1 }])
    })

    it('should include database check when detailed=true', async () => {
      const request = createMockRequest({ detailed: 'true' })
      const response = await GET(request)
      const data = await response.json()

      expect(data.checks).toBeDefined()
      expect(data.checks.database).toBeDefined()
      expect(data.checks.database.status).toBe('connected')
    })

    it('should include database response time', async () => {
      const request = createMockRequest({ detailed: 'true' })
      const response = await GET(request)
      const data = await response.json()

      expect(data.checks.database.responseTime).toBeDefined()
      expect(typeof data.checks.database.responseTime).toBe('number')
      expect(data.checks.database.responseTime).toBeGreaterThanOrEqual(0)
    })

    it('should include memory information', async () => {
      const request = createMockRequest({ detailed: 'true' })
      const response = await GET(request)
      const data = await response.json()

      expect(data.checks.memory).toBeDefined()
      expect(data.checks.memory.used).toBeDefined()
      expect(data.checks.memory.total).toBeDefined()
      expect(data.checks.memory.percentage).toBeDefined()
    })

    it('should report memory as percentages between 0-100', async () => {
      const request = createMockRequest({ detailed: 'true' })
      const response = await GET(request)
      const data = await response.json()

      expect(data.checks.memory.percentage).toBeGreaterThanOrEqual(0)
      expect(data.checks.memory.percentage).toBeLessThanOrEqual(100)
    })
  })

  describe('Database connection errors', () => {
    it('should return unhealthy status when database is disconnected', async () => {
      mocks.prismaQueryRaw.mockRejectedValue(new Error('Connection refused'))

      const request = createMockRequest({ detailed: 'true' })
      const response = await GET(request)
      const data = await response.json()

      expect(data.status).toBe('unhealthy')
      expect(data.checks.database.status).toBe('disconnected')
    })

    it('should return 503 status code when unhealthy', async () => {
      mocks.prismaQueryRaw.mockRejectedValue(new Error('Connection refused'))

      const request = createMockRequest({ detailed: 'true' })
      const response = await GET(request)

      expect(response.status).toBe(503)
    })
  })

  describe('Degraded status conditions', () => {
    it('should report degraded status when database is slow', async () => {
      // Simulate slow database by delaying the mock
      mocks.prismaQueryRaw.mockImplementation(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1100)) // > 1000ms
        return [{ '?column?': 1 }]
      })

      const request = createMockRequest({ detailed: 'true' })
      const response = await GET(request)
      const data = await response.json()

      expect(data.status).toBe('degraded')
    })
  })

  describe('Response format', () => {
    it('should return JSON content type', async () => {
      const request = createMockRequest()
      const response = await GET(request)

      expect(response.headers.get('content-type')).toContain('application/json')
    })

    it('should have consistent response structure', async () => {
      const request = createMockRequest()
      const response = await GET(request)
      const data = await response.json()

      // Required fields
      expect(data).toHaveProperty('status')
      expect(data).toHaveProperty('timestamp')
      expect(data).toHaveProperty('uptime')
      expect(data).toHaveProperty('environment')
    })
  })
})

// ============================================================================
// HEAD /api/health Tests
// ============================================================================

describe('HEAD /api/health', () => {
  it('should return 200 status', async () => {
    const response = await HEAD()

    expect(response.status).toBe(200)
  })

  it('should return empty body', async () => {
    const response = await HEAD()

    expect(response.body).toBeNull()
  })
})

// ============================================================================
// Edge Cases
// ============================================================================

describe('Edge Cases', () => {
  it('should handle invalid detailed param gracefully', async () => {
    const request = createMockRequest({ detailed: 'false' })
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.checks).toBeUndefined()
  })

  it('should handle multiple query params', async () => {
    const url = new URL('http://localhost:3000/api/health')
    url.searchParams.set('detailed', 'true')
    url.searchParams.set('extra', 'param')
    const request = new NextRequest(url)

    mocks.prismaQueryRaw.mockResolvedValue([{ '?column?': 1 }])

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.checks).toBeDefined()
  })
})
