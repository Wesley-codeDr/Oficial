/**
 * Health Check HTTP Server
 *
 * Fornece endpoint HTTP para monitoramento do sync agent
 * Endpoint: GET http://localhost:3001/health
 *
 * Response Format:
 * {
 *   status: 'healthy' | 'degraded' | 'unhealthy',
 *   uptime: number,
 *   lastSyncAt: string | null,
 *   lastSuccessAt: string | null,
 *   lastErrorAt: string | null,
 *   lastError: string | null,
 *   stats: {
 *     totalSyncs: number,
 *     successCount: number,
 *     errorCount: number,
 *     successRate: number
 *   },
 *   pendingFiles: number,
 *   message?: string
 * }
 */

import http from 'http'
import chalk from 'chalk'

// ============================================================================
// Types
// ============================================================================

export type HealthStatusValue = 'healthy' | 'degraded' | 'unhealthy'

export interface HealthStatus {
  status: HealthStatusValue
  uptime: number
  lastSyncAt: Date | null
  lastSuccessAt: Date | null
  lastErrorAt: Date | null
  lastError: string | null
  message?: string
  stats: {
    totalSyncs: number
    successCount: number
    errorCount: number
    successRate: number
  }
  pendingFiles: number
}

export interface HealthUpdatePayload {
  status?: HealthStatusValue
  lastSyncAt?: Date | null
  lastSuccessAt?: Date | null
  lastErrorAt?: Date | null
  lastError?: string | null
  message?: string
  totalSyncs?: number
  successCount?: number
  errorCount?: number
  pendingFiles?: number
}

// ============================================================================
// Estado Global do Health
// ============================================================================

const startTime = Date.now()

const healthStatus: HealthStatus = {
  status: 'healthy',
  uptime: 0,
  lastSyncAt: null,
  lastSuccessAt: null,
  lastErrorAt: null,
  lastError: null,
  stats: {
    totalSyncs: 0,
    successCount: 0,
    errorCount: 0,
    successRate: 100,
  },
  pendingFiles: 0,
}

/**
 * Atualiza o status de health
 */
export function updateHealthStatus(update: HealthUpdatePayload): void {
  if (update.status) {
    healthStatus.status = update.status
  }

  if (update.lastSyncAt !== undefined) {
    healthStatus.lastSyncAt = update.lastSyncAt
  }

  if (update.lastSuccessAt !== undefined) {
    healthStatus.lastSuccessAt = update.lastSuccessAt
  }

  if (update.lastErrorAt !== undefined) {
    healthStatus.lastErrorAt = update.lastErrorAt
  }

  if (update.lastError !== undefined) {
    healthStatus.lastError = update.lastError
  }

  if (update.message !== undefined) {
    healthStatus.message = update.message
  }

  if (update.pendingFiles !== undefined) {
    healthStatus.pendingFiles = update.pendingFiles
  }

  // Atualiza stats
  if (update.totalSyncs !== undefined) {
    healthStatus.stats.totalSyncs = update.totalSyncs
  }

  if (update.successCount !== undefined) {
    healthStatus.stats.successCount = update.successCount
  }

  if (update.errorCount !== undefined) {
    healthStatus.stats.errorCount = update.errorCount
  }

  // Calcula success rate
  if (healthStatus.stats.totalSyncs > 0) {
    healthStatus.stats.successRate = Math.round(
      (healthStatus.stats.successCount / healthStatus.stats.totalSyncs) * 100
    )
  }

  // Auto-determina status baseado em success rate
  if (healthStatus.stats.successRate < 50) {
    healthStatus.status = 'unhealthy'
  } else if (healthStatus.stats.successRate < 90) {
    healthStatus.status = 'degraded'
  }
}

/**
 * Retorna o status atual de health
 */
export function getHealthStatus(): HealthStatus {
  return {
    ...healthStatus,
    uptime: Math.floor((Date.now() - startTime) / 1000),
  }
}

// ============================================================================
// HTTP Server
// ============================================================================

const PORT = parseInt(process.env.HEALTH_PORT || '3001', 10)
const HOST = process.env.HEALTH_HOST || 'localhost'

/**
 * Cria e inicia o health check server
 */
export function createHealthServer(): http.Server {
  const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    // Handle OPTIONS
    if (req.method === 'OPTIONS') {
      res.writeHead(200)
      res.end()
      return
    }

    // Only accept GET requests to /health
    if (req.method !== 'GET') {
      res.writeHead(405, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Method not allowed' }))
      return
    }

    if (req.url !== '/health' && req.url !== '/') {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Not found' }))
      return
    }

    // Return health status
    const health = getHealthStatus()
    const statusCode = health.status === 'healthy' ? 200 : health.status === 'degraded' ? 200 : 503

    res.writeHead(statusCode, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify(
        {
          ...health,
          lastSyncAt: health.lastSyncAt?.toISOString() || null,
          lastSuccessAt: health.lastSuccessAt?.toISOString() || null,
          lastErrorAt: health.lastErrorAt?.toISOString() || null,
          timestamp: new Date().toISOString(),
        },
        null,
        2
      )
    )
  })

  server.listen(PORT, HOST, () => {
    console.log(chalk.green(`🏥 Health server listening on http://${HOST}:${PORT}/health`))
  })

  // Error handling
  server.on('error', (error) => {
    console.error(chalk.red('Health server error:'), error)
  })

  return server
}

/**
 * Para o health server gracefully
 */
export function stopHealthServer(server: http.Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error)
      } else {
        console.log(chalk.gray('   ✓ Health server fechado'))
        resolve()
      }
    })
  })
}

// ============================================================================
// Helpers
// ============================================================================

/**
 * Formata uptime em formato legível
 */
export function formatUptime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`
  } else {
    return `${secs}s`
  }
}

/**
 * Retorna emoji baseado no status
 */
export function getStatusEmoji(status: HealthStatusValue): string {
  switch (status) {
    case 'healthy':
      return '✅'
    case 'degraded':
      return '⚠️'
    case 'unhealthy':
      return '❌'
  }
}

// ============================================================================
// CLI Helper (Standalone Mode)
// ============================================================================

/**
 * Testa o health endpoint (útil para debugging)
 */
export async function testHealthEndpoint(): Promise<void> {
  console.log(chalk.blue('\n🧪 Testando health endpoint...\n'))

  try {
    const response = await fetch(`http://${HOST}:${PORT}/health`)
    const data = await response.json()

    console.log(chalk.green('✅ Health endpoint respondeu:'))
    console.log(JSON.stringify(data, null, 2))
    console.log()
  } catch (error) {
    console.error(chalk.red('❌ Erro ao testar health endpoint:'), error)
  }
}

// Se executado diretamente (para testes)
const isMain = import.meta.url === `file://${process.argv[1]}`
if (isMain) {
  const server = createHealthServer()

  // Simula updates de status
  setTimeout(() => {
    updateHealthStatus({
      status: 'healthy',
      totalSyncs: 5,
      successCount: 5,
      errorCount: 0,
      lastSyncAt: new Date(),
      lastSuccessAt: new Date(),
    })
  }, 2000)

  setTimeout(() => {
    testHealthEndpoint()
  }, 3000)

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log(chalk.yellow('\n👋 Encerrando health server...\n'))
    stopHealthServer(server).then(() => process.exit(0))
  })
}
