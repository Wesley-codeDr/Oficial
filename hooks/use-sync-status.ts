'use client'

/**
 * useSyncStatus Hook
 *
 * React hook para polling do health endpoint do Sync Agent
 * - Polling automático a cada 30 segundos
 * - Detecção de status: healthy, degraded, unhealthy, offline
 * - Error handling robusto
 * - Cache e revalidação inteligente
 */

import { useQuery } from '@tanstack/react-query'

// ============================================================================
// Types
// ============================================================================

export type SyncHealthStatus = 'healthy' | 'degraded' | 'unhealthy' | 'offline'

export interface SyncHealthData {
  status: SyncHealthStatus
  uptime: number
  lastSyncAt: string | null
  lastSuccessAt: string | null
  lastErrorAt: string | null
  lastError: string | null
  message?: string
  stats: {
    totalSyncs: number
    successCount: number
    errorCount: number
    successRate: number
  }
  pendingFiles: number
  timestamp: string
}

export interface UseSyncStatusReturn {
  /** Status atual: healthy | degraded | unhealthy | offline */
  status: SyncHealthStatus
  /** Dados completos do health check */
  data: SyncHealthData | undefined
  /** Se está carregando */
  isLoading: boolean
  /** Erro de conexão */
  error: Error | null
  /** Última atualização bem-sucedida */
  dataUpdatedAt: number
  /** Forçar refresh */
  refetch: () => void
}

// ============================================================================
// Configuration
// ============================================================================

const HEALTH_ENDPOINT = 'http://localhost:3001/health'
const POLL_INTERVAL = 30000 // 30 segundos
const STALE_TIME = 10000 // 10 segundos
const RETRY_DELAY = 5000 // 5 segundos
const MAX_RETRIES = 3

// ============================================================================
// Fetch Function
// ============================================================================

/**
 * Fetch health status do sync agent
 */
async function fetchSyncHealth(): Promise<SyncHealthData> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000) // 5s timeout

  try {
    const response = await fetch(HEALTH_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      // Não usar cache do browser
      cache: 'no-store',
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      // Status 503 (unhealthy) é esperado, não é erro
      if (response.status === 503) {
        const data = await response.json()
        return data as SyncHealthData
      }

      throw new Error(`Health endpoint retornou ${response.status}`)
    }

    const data = await response.json()
    return data as SyncHealthData
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof Error) {
      // Timeout ou rede offline
      if (error.name === 'AbortError') {
        throw new Error('Health endpoint timeout (5s)')
      }

      // Network error
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('Sync Agent offline ou inacessível')
      }
    }

    throw error
  }
}

// ============================================================================
// Hook
// ============================================================================

/**
 * Hook para monitorar status do Sync Agent
 *
 * @example
 * ```tsx
 * function SyncIndicator() {
 *   const { status, data, isLoading } = useSyncStatus()
 *
 *   return (
 *     <Badge variant={status === 'healthy' ? 'success' : 'destructive'}>
 *       {status}
 *     </Badge>
 *   )
 * }
 * ```
 */
export function useSyncStatus(): UseSyncStatusReturn {
  const query = useQuery<SyncHealthData, Error>({
    queryKey: ['sync-health'],
    queryFn: fetchSyncHealth,

    // Polling configuration
    refetchInterval: POLL_INTERVAL,
    refetchIntervalInBackground: false, // Não poll quando tab inativa
    refetchOnWindowFocus: true, // Refresh ao focar tab
    refetchOnReconnect: true, // Refresh ao reconectar

    // Cache configuration
    staleTime: STALE_TIME, // Dados considerados fresh por 10s
    gcTime: 60000, // Garbage collect após 1min

    // Retry configuration
    retry: MAX_RETRIES,
    retryDelay: (attemptIndex) => Math.min(RETRY_DELAY * Math.pow(2, attemptIndex), 30000),

    // Não mostrar erro no console (vamos tratar manualmente)
    useErrorBoundary: false,
  })

  // Determina status baseado no resultado da query
  let status: SyncHealthStatus = 'offline'

  if (query.isLoading && !query.data) {
    // Primeira carga
    status = 'offline'
  } else if (query.error) {
    // Erro de rede ou timeout
    status = 'offline'
  } else if (query.data) {
    // Dados válidos, usar status do health endpoint
    status = query.data.status
  }

  return {
    status,
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    dataUpdatedAt: query.dataUpdatedAt,
    refetch: query.refetch,
  }
}

// ============================================================================
// Utility Hooks
// ============================================================================

/**
 * Hook que retorna apenas se o sync está online
 */
export function useIsSyncOnline(): boolean {
  const { status } = useSyncStatus()
  return status !== 'offline'
}

/**
 * Hook que retorna apenas se o sync está healthy
 */
export function useIsSyncHealthy(): boolean {
  const { status } = useSyncStatus()
  return status === 'healthy'
}

/**
 * Hook que dispara callback quando status muda
 */
export function useOnSyncStatusChange(callback: (status: SyncHealthStatus) => void) {
  const { status } = useSyncStatus()
  const previousStatus = React.useRef<SyncHealthStatus>(status)

  React.useEffect(() => {
    if (previousStatus.current !== status) {
      callback(status)
      previousStatus.current = status
    }
  }, [status, callback])
}

// Importação do React para useRef e useEffect
import React from 'react'
