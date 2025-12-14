/**
 * Health Check Endpoint
 * 
 * This endpoint provides health status information for monitoring and uptime checks.
 * Can be used by load balancers, monitoring tools, and deployment pipelines.
 * 
 * Endpoints:
 * - GET /api/health - Basic health check
 * - GET /api/health?detailed=true - Detailed health information
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export const dynamic = 'force-dynamic'

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  version?: string
  uptime: number
  environment: string
  checks?: {
    database: {
      status: 'connected' | 'disconnected'
      responseTime?: number
    }
    memory?: {
      used: number
      total: number
      percentage: number
    }
  }
}

/**
 * Basic health check
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const detailed = searchParams.get('detailed') === 'true'

  try {
    // Basic health check
    const healthStatus: HealthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'unknown',
    }

    // Detailed health check (includes database and memory checks)
    if (detailed) {
      // Check database connection
      const dbStart = Date.now()
      try {
        await prisma.$queryRaw`SELECT 1`
        const dbResponseTime = Date.now() - dbStart

        healthStatus.checks = {
          database: {
            status: 'connected',
            responseTime: dbResponseTime,
          },
        }

        // Add memory information
        const memoryUsage = process.memoryUsage()
        healthStatus.checks.memory = {
          used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
          total: Math.round(memoryUsage.heapTotal / 1024 / 1024),
          percentage: Math.round(
            (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100
          ),
        }

        // Check if database response is slow
        if (dbResponseTime > 1000) {
          healthStatus.status = 'degraded'
        }

        // Check if memory usage is high
        if (healthStatus.checks.memory.percentage > 90) {
          healthStatus.status = 'degraded'
        }
      } catch (_dbError) {
        healthStatus.status = 'unhealthy'
        healthStatus.checks = {
          database: {
            status: 'disconnected',
          },
        }
      }
    }

    // Return appropriate status code based on health
    const statusCode = healthStatus.status === 'healthy' ? 200 : 503

    return NextResponse.json(healthStatus, { status: statusCode })
  } catch (error) {
    // Catch-all for unexpected errors
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        environment: process.env.NODE_ENV || 'unknown',
      },
      { status: 503 }
    )
  }
}

/**
 * HEAD request for simple alive check
 * Useful for load balancers that only need to know if the service is responding
 */
export async function HEAD() {
  return new NextResponse(null, { status: 200 })
}
