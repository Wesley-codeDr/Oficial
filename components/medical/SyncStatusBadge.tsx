'use client'

/**
 * SyncStatusBadge
 *
 * Componente para exibir status de sincronização do Sync Agent no canto superior da UI
 * - Polling do health endpoint a cada 30s
 * - Indicadores visuais: ✅ healthy, ⚠️ degraded, ❌ unhealthy, 🔌 offline
 * - Tooltip com detalhes (last sync, success rate, uptime)
 * - Click para abrir modal com informações completas
 */

import React from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CheckCircle2, AlertTriangle, XCircle, WifiOff, Clock, Activity, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSyncStatus } from '@/hooks/use-sync-status'

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Formata tempo relativo (ex: "2 min atrás")
 */
function formatRelativeTime(date: Date | string | null): string {
  if (!date) return 'Nunca'

  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) return `${diffSec}s atrás`
  if (diffMin < 60) return `${diffMin} min atrás`
  if (diffHour < 24) return `${diffHour}h atrás`
  return `${diffDay}d atrás`
}

/**
 * Formata uptime em formato legível
 */
function formatUptime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else if (minutes > 0) {
    return `${minutes}m`
  } else {
    return `${seconds}s`
  }
}

// ============================================================================
// Main Component
// ============================================================================

export function SyncStatusBadge() {
  const { status, isLoading, error, data } = useSyncStatus()

  // Determina ícone e estilo baseado no status
  const statusConfig = {
    healthy: {
      icon: CheckCircle2,
      label: 'Sync OK',
      color: 'bg-green-600 text-white hover:bg-green-700',
      dotColor: 'bg-green-400',
    },
    degraded: {
      icon: AlertTriangle,
      label: 'Sync Degradado',
      color: 'bg-yellow-600 text-white hover:bg-yellow-700',
      dotColor: 'bg-yellow-400',
    },
    unhealthy: {
      icon: XCircle,
      label: 'Sync com Erro',
      color: 'bg-red-600 text-white hover:bg-red-700',
      dotColor: 'bg-red-400',
    },
    offline: {
      icon: WifiOff,
      label: 'Sync Offline',
      color: 'bg-gray-600 text-white hover:bg-gray-700',
      dotColor: 'bg-gray-400',
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  // Tooltip content (resumido)
  const tooltipContent = error ? (
    <div className="space-y-1">
      <p className="font-semibold">❌ Sync Agent Offline</p>
      <p className="text-xs text-muted-foreground">
        Não foi possível conectar ao health endpoint
      </p>
    </div>
  ) : data ? (
    <div className="space-y-1">
      <p className="font-semibold">{config.label}</p>
      <div className="text-xs space-y-0.5">
        <p>Último sync: {formatRelativeTime(data.lastSyncAt)}</p>
        <p>Success rate: {data.stats.successRate}%</p>
        <p>Uptime: {formatUptime(data.uptime)}</p>
      </div>
    </div>
  ) : (
    <div>
      <p className="font-semibold">Carregando...</p>
    </div>
  )

  // Dialog content (detalhado)
  const dialogContent = error ? (
    <div className="space-y-4">
      <div className="bg-red-50 dark:bg-red-950 p-4 rounded-md border border-red-200 dark:border-red-800">
        <p className="font-medium text-red-900 dark:text-red-100">
          ❌ Sync Agent não está respondendo
        </p>
        <p className="text-sm text-red-700 dark:text-red-300 mt-2">
          O serviço de sincronização pode estar parado ou o health endpoint não está acessível.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold">Como resolver:</h4>
        <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
          <li>Verifique se o agent está rodando: <code className="bg-muted px-1 rounded">pnpm sync:agent:status</code></li>
          <li>Inicie o agent se necessário: <code className="bg-muted px-1 rounded">pnpm sync:agent:start</code></li>
          <li>Veja os logs: <code className="bg-muted px-1 rounded">pnpm sync:agent:logs</code></li>
          <li>Health endpoint: <code className="bg-muted px-1 rounded">http://localhost:3001/health</code></li>
        </ul>
      </div>
    </div>
  ) : data ? (
    <div className="space-y-6">
      {/* Status Geral */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn('w-3 h-3 rounded-full animate-pulse', config.dotColor)} />
          <h4 className="font-semibold text-lg">{config.label}</h4>
        </div>
        <Badge variant="outline" className={config.color}>
          {data.stats.successRate}% success
        </Badge>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Último Sync</span>
          </div>
          <p className="text-lg font-semibold">
            {formatRelativeTime(data.lastSyncAt)}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Activity className="h-4 w-4" />
            <span className="text-sm">Uptime</span>
          </div>
          <p className="text-lg font-semibold">{formatUptime(data.uptime)}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">Total Syncs</span>
          </div>
          <p className="text-lg font-semibold">{data.stats.totalSyncs}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm">Sucessos</span>
          </div>
          <p className="text-lg font-semibold">
            {data.stats.successCount} / {data.stats.totalSyncs}
          </p>
        </div>
      </div>

      {/* Last Success/Error */}
      {data.lastSuccessAt && (
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Último sucesso</p>
          <p className="font-medium">{formatRelativeTime(data.lastSuccessAt)}</p>
        </div>
      )}

      {data.lastError && (
        <div className="bg-red-50 dark:bg-red-950 p-3 rounded-md border border-red-200 dark:border-red-800">
          <p className="text-sm font-medium text-red-900 dark:text-red-100">
            Último erro:
          </p>
          <p className="text-sm text-red-700 dark:text-red-300 mt-1">
            {data.lastError}
          </p>
          {data.lastErrorAt && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              {formatRelativeTime(data.lastErrorAt)}
            </p>
          )}
        </div>
      )}

      {/* Pending Files */}
      {data.pendingFiles > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded-md border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
            ⏳ {data.pendingFiles} arquivo(s) pendente(s) na fila
          </p>
        </div>
      )}

      {/* Message */}
      {data.message && (
        <div className="text-sm text-muted-foreground italic">
          {data.message}
        </div>
      )}
    </div>
  ) : (
    <div className="text-center text-muted-foreground py-8">
      <Activity className="h-12 w-12 mx-auto mb-4 animate-spin opacity-50" />
      <p>Carregando status...</p>
    </div>
  )

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <button
                className={cn(
                  'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                  config.color,
                  isLoading && 'opacity-50 cursor-wait'
                )}
              >
                <div className={cn('w-2 h-2 rounded-full', config.dotColor, !error && 'animate-pulse')} />
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {isLoading ? 'Carregando...' : config.label}
                </span>
              </button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Status do Sync Agent
          </DialogTitle>
          <DialogDescription>
            Monitoramento em tempo real da sincronização Obsidian ↔ Database
          </DialogDescription>
        </DialogHeader>
        {dialogContent}
      </DialogContent>
    </Dialog>
  )
}
