#!/usr/bin/env tsx
/**
 * Sync Agent - Serviço standalone para sincronização Obsidian → Database
 *
 * MVP Features:
 * - File watching do vault Obsidian
 * - Sync automático Obsidian → DB
 * - Detecção de conflitos hash-based
 * - Retry com exponential backoff
 * - Health check HTTP server
 * - Graceful shutdown
 *
 * Uso:
 *   npm run sync:agent          # Desenvolvimento
 *   pm2 start ecosystem.config.js  # Produção
 */

import 'dotenv/config'
import chokidar from 'chokidar'
import path from 'path'
import chalk from 'chalk'
import { PATHS, SYNC_CONFIG } from './utils/config'
import { syncObsidianToDB } from './obsidian-to-db'
import { createHealthServer, updateHealthStatus, type HealthStatus } from './health-server'
import { prisma } from '../../lib/db/prisma'

// ============================================================================
// Estado do Agent
// ============================================================================

interface AgentState {
  isSyncing: boolean
  lastSyncAt: Date | null
  lastSuccessAt: Date | null
  lastErrorAt: Date | null
  totalSyncs: number
  successCount: number
  errorCount: number
  pendingFiles: string[]
  currentError: string | null
}

const state: AgentState = {
  isSyncing: false,
  lastSyncAt: null,
  lastSuccessAt: null,
  lastErrorAt: null,
  totalSyncs: 0,
  successCount: 0,
  errorCount: 0,
  pendingFiles: [],
  currentError: null,
}

// ============================================================================
// Configuração de Retry
// ============================================================================

interface RetryConfig {
  maxAttempts: number
  baseDelay: number // ms
  maxDelay: number // ms
  backoffFactor: number
}

const RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  baseDelay: 1000, // 1s
  maxDelay: 30000, // 30s
  backoffFactor: 2,
}

/**
 * Calcula delay para retry com exponential backoff
 */
function calculateRetryDelay(attempt: number): number {
  const delay = Math.min(
    RETRY_CONFIG.baseDelay * Math.pow(RETRY_CONFIG.backoffFactor, attempt),
    RETRY_CONFIG.maxDelay
  )
  return delay
}

/**
 * Executa função com retry e exponential backoff
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  context: string
): Promise<T | null> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt < RETRY_CONFIG.maxAttempts; attempt++) {
    try {
      const result = await fn()
      if (attempt > 0) {
        console.log(chalk.green(`   ✓ ${context} - sucesso após ${attempt + 1} tentativas`))
      }
      return result
    } catch (error) {
      lastError = error as Error
      const isLastAttempt = attempt === RETRY_CONFIG.maxAttempts - 1

      if (isLastAttempt) {
        console.error(chalk.red(`   ✖ ${context} - falha após ${RETRY_CONFIG.maxAttempts} tentativas`))
        console.error(chalk.red(`     Erro: ${lastError.message}`))
        break
      }

      const delay = calculateRetryDelay(attempt)
      console.log(chalk.yellow(`   ⚠ ${context} - tentativa ${attempt + 1} falhou, retry em ${delay}ms...`))
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  return null
}

// ============================================================================
// Debounce e Queue Management
// ============================================================================

let debounceTimer: NodeJS.Timeout | null = null
let queuedFiles = new Set<string>()

/**
 * Debounce para evitar múltiplas sincronizações simultâneas
 */
function debounceSync(filePaths: string[], delay: number): void {
  // Adiciona arquivos à queue
  filePaths.forEach(f => queuedFiles.add(f))

  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = setTimeout(async () => {
    debounceTimer = null
    const files = Array.from(queuedFiles)
    queuedFiles.clear()
    await syncFromObsidian(files)
  }, delay)
}

// ============================================================================
// Sync Logic
// ============================================================================

/**
 * Executa sincronização do Obsidian para DB
 */
async function syncFromObsidian(filePaths?: string[]): Promise<void> {
  if (state.isSyncing) {
    // Adiciona arquivos à pending queue
    if (filePaths) {
      state.pendingFiles.push(...filePaths)
    }
    console.log(chalk.yellow('   ⏸ Sync em progresso, arquivos adicionados à fila'))
    return
  }

  state.isSyncing = true
  state.lastSyncAt = new Date()
  state.totalSyncs += 1

  console.log(chalk.blue(`\n📥 Iniciando sync Obsidian → DB`))
  if (filePaths?.length) {
    console.log(chalk.gray(`   Arquivos: ${filePaths.length}`))
  }

  const startTime = Date.now()

  try {
    // Executa sync com retry
    const stats = await withRetry(
      () => syncObsidianToDB({ filePaths }),
      'Sync Obsidian → DB'
    )

    if (stats) {
      const duration = ((Date.now() - startTime) / 1000).toFixed(2)
      console.log(chalk.green(`✅ Sync concluído em ${duration}s`))
      console.log(chalk.gray(`   Atualizados: ${stats.updated} | Conflitos: ${stats.conflicts} | Erros: ${stats.errors}`))

      state.lastSuccessAt = new Date()
      state.successCount += 1
      state.currentError = null

      // Atualiza health status
      updateHealthStatus({
        status: 'healthy',
        lastSyncAt: state.lastSyncAt,
        lastSuccessAt: state.lastSuccessAt,
        totalSyncs: state.totalSyncs,
        successCount: state.successCount,
        errorCount: state.errorCount,
        pendingFiles: state.pendingFiles.length,
      })
    } else {
      throw new Error('Sync retornou null após retries')
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error(chalk.red('Erro na sincronização:'), errorMsg)

    state.lastErrorAt = new Date()
    state.errorCount += 1
    state.currentError = errorMsg

    // Atualiza health status como unhealthy
    updateHealthStatus({
      status: 'unhealthy',
      lastSyncAt: state.lastSyncAt,
      lastErrorAt: state.lastErrorAt,
      lastError: errorMsg,
      totalSyncs: state.totalSyncs,
      successCount: state.successCount,
      errorCount: state.errorCount,
      pendingFiles: state.pendingFiles.length,
    })
  } finally {
    state.isSyncing = false

    // Processa pending files
    if (state.pendingFiles.length > 0) {
      const pending = [...state.pendingFiles]
      state.pendingFiles = []
      console.log(chalk.cyan(`\n📋 Processando ${pending.length} arquivos pendentes...`))
      setTimeout(() => syncFromObsidian(pending), 500)
    }
  }
}

// ============================================================================
// File Watcher
// ============================================================================

/**
 * Inicia o file watcher do Obsidian vault
 */
function startFileWatcher(): chokidar.FSWatcher {
  console.log(chalk.blue('\n👁️  Iniciando file watcher do Obsidian\n'))
  console.log(chalk.gray('   Monitorando:'))
  console.log(chalk.gray(`   • ${PATHS.queixas}`))
  console.log(chalk.gray(`\n   Debounce: ${SYNC_CONFIG.watchDebounce}ms\n`))

  const watcher = chokidar.watch(
    [path.join(PATHS.queixas, '**/*.md')],
    {
      ignored: [
        /(^|[/\\])\../, // Arquivos ocultos
        /_índice\.md$/, // Índices
        /00 - Índice/, // Índice principal
        /-CONFLICT\.md$/, // Arquivos de conflito
      ],
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 500,
        pollInterval: 100,
      },
    }
  )

  watcher
    .on('ready', () => {
      console.log(chalk.green('✅ File watcher pronto! Aguardando mudanças...\n'))
    })
    .on('change', (filePath) => {
      console.log(chalk.cyan(`   📝 Modificado: ${path.basename(filePath)}`))
      debounceSync([filePath], SYNC_CONFIG.watchDebounce)
    })
    .on('add', (filePath) => {
      console.log(chalk.green(`   ➕ Adicionado: ${path.basename(filePath)}`))
      debounceSync([filePath], SYNC_CONFIG.watchDebounce)
    })
    .on('unlink', (filePath) => {
      console.log(chalk.yellow(`   ➖ Removido: ${path.basename(filePath)}`))
      // Não sincroniza remoções automaticamente por segurança
    })
    .on('error', (error) => {
      console.error(chalk.red('Erro no file watcher:'), error)
      state.currentError = `File watcher error: ${error.message}`
      updateHealthStatus({
        status: 'degraded',
        lastError: state.currentError,
      })
    })

  return watcher
}

// ============================================================================
// Graceful Shutdown
// ============================================================================

async function shutdown(watcher: chokidar.FSWatcher, signal: string): Promise<void> {
  console.log(chalk.yellow(`\n\n👋 Recebido ${signal}, encerrando agent...\n`))

  // Para de aceitar novos syncs
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  // Aguarda sync atual terminar
  if (state.isSyncing) {
    console.log(chalk.yellow('   ⏳ Aguardando sync atual terminar...'))
    await new Promise(resolve => {
      const check = setInterval(() => {
        if (!state.isSyncing) {
          clearInterval(check)
          resolve(null)
        }
      }, 100)
    })
  }

  // Fecha watcher
  await watcher.close()
  console.log(chalk.gray('   ✓ File watcher fechado'))

  // Desconecta Prisma
  await prisma.$disconnect()
  console.log(chalk.gray('   ✓ Database desconectado'))

  console.log(chalk.green('\n✅ Agent encerrado com sucesso\n'))
  process.exit(0)
}

// ============================================================================
// Main
// ============================================================================

async function main(): Promise<void> {
  console.log(chalk.blue.bold('\n╔════════════════════════════════════════════════════╗'))
  console.log(chalk.blue.bold('║     WellWave Sync Agent - Obsidian → Database     ║'))
  console.log(chalk.blue.bold('╚════════════════════════════════════════════════════╝\n'))

  console.log(chalk.gray(`   Versão: MVP 1.0.0`))
  console.log(chalk.gray(`   Modo: Obsidian → DB only`))
  console.log(chalk.gray(`   Ambiente: ${process.env.NODE_ENV || 'development'}\n`))

  // Verifica conexão com DB
  console.log(chalk.blue('🔌 Verificando conexão com database...'))
  try {
    await prisma.$connect()
    console.log(chalk.green('   ✓ Conectado ao database\n'))
  } catch (error) {
    console.error(chalk.red('   ✖ Falha ao conectar ao database:'), error)
    process.exit(1)
  }

  // Inicia health server
  const healthServer = createHealthServer()
  const healthPort = process.env.HEALTH_PORT || '3001'
  console.log(chalk.green(`✅ Health server rodando em http://localhost:${healthPort}/health\n`))

  // Status inicial
  updateHealthStatus({
    status: 'healthy',
    message: 'Sync agent iniciado',
  })

  // Inicia file watcher
  const watcher = startFileWatcher()

  // Sync inicial (opcional)
  if (process.env.SYNC_ON_START !== 'false') {
    console.log(chalk.blue('🔄 Executando sync inicial...\n'))
    await syncFromObsidian()
  }

  // Log de status periódico
  setInterval(() => {
    if (!state.isSyncing) {
      const uptime = process.uptime()
      const hours = Math.floor(uptime / 3600)
      const minutes = Math.floor((uptime % 3600) / 60)
      console.log(chalk.gray(`   [${new Date().toLocaleTimeString()}] Uptime: ${hours}h ${minutes}m | Syncs: ${state.successCount}/${state.totalSyncs}`))
    }
  }, 60000) // A cada minuto

  // Graceful shutdown handlers
  process.on('SIGINT', () => shutdown(watcher, 'SIGINT'))
  process.on('SIGTERM', () => shutdown(watcher, 'SIGTERM'))

  // Uncaught errors
  process.on('uncaughtException', (error) => {
    console.error(chalk.red('\n💥 Uncaught Exception:'), error)
    shutdown(watcher, 'UNCAUGHT_EXCEPTION')
  })

  process.on('unhandledRejection', (reason) => {
    console.error(chalk.red('\n💥 Unhandled Rejection:'), reason)
    shutdown(watcher, 'UNHANDLED_REJECTION')
  })

  console.log(chalk.yellow('   Pressione Ctrl+C para parar\n'))
}

// Executa se chamado diretamente
const isMain = import.meta.url === `file://${process.argv[1]}`
if (isMain) {
  main().catch((error) => {
    console.error(chalk.red('Fatal error:'), error)
    process.exit(1)
  })
}

export { startFileWatcher, syncFromObsidian, state as agentState }
