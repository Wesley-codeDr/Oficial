'use client'

/**
 * AutoSaveIndicator - Visual feedback for auto-save status
 *
 * Features:
 * - Shows current save status with animated icons
 * - Displays last saved timestamp
 * - Network status indicator
 * - Glass morphism design matching iOS 26 style
 * - Compact and non-intrusive
 */

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cloud,
  CloudOff,
  Check,
  Loader2,
  AlertCircle,
  RefreshCw,
  WifiOff,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AutoSaveStatus } from '@/hooks/use-auto-save'

// ============================================================================
// Types
// ============================================================================

export interface AutoSaveIndicatorProps {
  /** Current auto-save status */
  status: AutoSaveStatus
  /** Last saved timestamp */
  lastSavedAt: Date | null
  /** Whether network is available */
  isOnline: boolean
  /** Number of pending changes */
  pendingChanges?: number
  /** Error message */
  error?: string | null
  /** Callback to retry failed saves */
  onRetry?: () => void
  /** Additional class names */
  className?: string
  /** Compact mode for smaller displays */
  compact?: boolean
}

// ============================================================================
// Helper Functions
// ============================================================================

function formatTimestamp(date: Date | null): string {
  if (!date) return ''

  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)

  if (diffSeconds < 10) return 'agora'
  if (diffSeconds < 60) return `${diffSeconds}s atras`
  if (diffMinutes < 60) return `${diffMinutes}min atras`
  if (diffHours < 24) return `${diffHours}h atras`

  return date.toLocaleDateString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

// ============================================================================
// Status Configurations
// ============================================================================

type StatusConfig = {
  icon: React.ElementType
  text: string
  color: string
  bgColor: string
  animate?: boolean
  spin?: boolean
}

const statusConfigs: Record<AutoSaveStatus, StatusConfig> = {
  idle: {
    icon: Cloud,
    text: 'Salvo',
    color: 'text-slate-400 dark:text-slate-500',
    bgColor: 'bg-slate-100/50 dark:bg-slate-800/50',
  },
  pending: {
    icon: Cloud,
    text: 'Alteracoes pendentes',
    color: 'text-amber-500 dark:text-amber-400',
    bgColor: 'bg-amber-100/50 dark:bg-amber-900/30',
    animate: true,
  },
  saving: {
    icon: Loader2,
    text: 'Salvando...',
    color: 'text-blue-500 dark:text-blue-400',
    bgColor: 'bg-blue-100/50 dark:bg-blue-900/30',
    spin: true,
  },
  saved: {
    icon: Check,
    text: 'Salvo',
    color: 'text-emerald-500 dark:text-emerald-400',
    bgColor: 'bg-emerald-100/50 dark:bg-emerald-900/30',
  },
  error: {
    icon: AlertCircle,
    text: 'Erro ao salvar',
    color: 'text-red-500 dark:text-red-400',
    bgColor: 'bg-red-100/50 dark:bg-red-900/30',
  },
  offline: {
    icon: WifiOff,
    text: 'Sem conexao',
    color: 'text-orange-500 dark:text-orange-400',
    bgColor: 'bg-orange-100/50 dark:bg-orange-900/30',
  },
  recovering: {
    icon: RefreshCw,
    text: 'Recuperando...',
    color: 'text-blue-500 dark:text-blue-400',
    bgColor: 'bg-blue-100/50 dark:bg-blue-900/30',
    spin: true,
  },
}

// ============================================================================
// Component
// ============================================================================

export function AutoSaveIndicator({
  status,
  lastSavedAt,
  isOnline,
  pendingChanges = 0,
  error: _error,
  onRetry,
  className,
  compact = false,
}: AutoSaveIndicatorProps) {
  const config = statusConfigs[status]
  const Icon = config.icon
  const timestamp = formatTimestamp(lastSavedAt)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'inline-flex items-center gap-2',
          'px-3 py-1.5',
          'rounded-xl',
          // Glass effect
          'backdrop-blur-md',
          'border border-white/20 dark:border-white/10',
          config.bgColor,
          'shadow-sm',
          'transition-all duration-300',
          className
        )}
        data-testid="auto-save-indicator"
        data-status={status}
      >
        {/* Icon */}
        <motion.span
          className={cn('flex-shrink-0', config.color)}
          animate={
            config.animate
              ? {
                  opacity: [1, 0.5, 1],
                }
              : undefined
          }
          transition={
            config.animate
              ? {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : undefined
          }
        >
          <Icon
            className={cn(
              compact ? 'h-3 w-3' : 'h-3.5 w-3.5',
              config.spin && 'animate-spin'
            )}
          />
        </motion.span>

        {/* Text */}
        {!compact && (
          <span
            className={cn(
              'text-[10px] font-semibold uppercase tracking-wider',
              config.color
            )}
          >
            {config.text}
          </span>
        )}

        {/* Timestamp */}
        {!compact && timestamp && status !== 'saving' && status !== 'recovering' && (
          <span className="text-[9px] text-slate-400 dark:text-slate-500">
            {timestamp}
          </span>
        )}

        {/* Pending count badge */}
        {pendingChanges > 0 && status === 'offline' && (
          <span
            className={cn(
              'inline-flex items-center justify-center',
              'min-w-[16px] h-4 px-1',
              'rounded-full',
              'bg-orange-500',
              'text-[9px] font-bold text-white'
            )}
          >
            {pendingChanges}
          </span>
        )}

        {/* Retry button for error state */}
        {status === 'error' && onRetry && (
          <motion.button
            type="button"
            onClick={onRetry}
            className={cn(
              'ml-1 p-1 rounded-lg',
              'text-red-500 hover:text-red-600',
              'hover:bg-red-100/50 dark:hover:bg-red-900/30',
              'transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50'
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Tentar novamente"
          >
            <RefreshCw className="h-3 w-3" />
          </motion.button>
        )}

        {/* Network status indicator when offline */}
        {!isOnline && status !== 'offline' && (
          <CloudOff className="h-3 w-3 text-orange-500 ml-1" />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

// ============================================================================
// AutoSaveStatusDot - Minimal status indicator
// ============================================================================

export interface AutoSaveStatusDotProps {
  status: AutoSaveStatus
  className?: string
}

export function AutoSaveStatusDot({ status, className }: AutoSaveStatusDotProps) {
  const dotColors: Record<AutoSaveStatus, string> = {
    idle: 'bg-slate-400',
    pending: 'bg-amber-500',
    saving: 'bg-blue-500',
    saved: 'bg-emerald-500',
    error: 'bg-red-500',
    offline: 'bg-orange-500',
    recovering: 'bg-blue-500',
  }

  const shouldPulse =
    status === 'pending' || status === 'saving' || status === 'recovering'

  return (
    <span
      className={cn(
        'relative inline-flex h-2 w-2 rounded-full',
        dotColors[status],
        className
      )}
      data-testid="auto-save-dot"
      data-status={status}
    >
      {shouldPulse && (
        <span
          className={cn(
            'absolute inline-flex h-full w-full rounded-full opacity-75',
            dotColors[status],
            'animate-ping'
          )}
        />
      )}
    </span>
  )
}

AutoSaveIndicator.displayName = 'AutoSaveIndicator'
AutoSaveStatusDot.displayName = 'AutoSaveStatusDot'
