'use client'

/**
 * NetworkRecoveryBanner - Recovery UI for network failures
 *
 * Features:
 * - Persistent banner when offline
 * - Shows pending changes count
 * - Recovery progress indicator
 * - Manual retry option
 * - Auto-dismisses when back online and synced
 * - Glass morphism design
 */

import * as React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WifiOff, RefreshCw, Check, AlertTriangle, X, CloudOff, Cloud } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AutoSaveStatus } from '@/hooks/use-auto-save'

// ============================================================================
// Types
// ============================================================================

export interface NetworkRecoveryBannerProps {
  /** Whether network is available */
  isOnline: boolean
  /** Current auto-save status */
  status: AutoSaveStatus
  /** Number of pending changes */
  pendingChanges: number
  /** Error message */
  error?: string | null
  /** Callback to retry failed saves */
  onRetry: () => void
  /** Callback when user manually dismisses */
  onDismiss?: () => void
  /** Additional class names */
  className?: string
}

// ============================================================================
// Component
// ============================================================================

export function NetworkRecoveryBanner({
  isOnline,
  status,
  pendingChanges,
  error,
  onRetry,
  onDismiss,
  className,
}: NetworkRecoveryBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [wasOffline, setWasOffline] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Track offline state transitions
  useEffect(() => {
    if (!isOnline) {
      setIsVisible(true)
      setWasOffline(true)
    } else if (wasOffline && status === 'saved' && pendingChanges === 0) {
      // Show success message briefly before hiding
      setShowSuccess(true)
      const timer = setTimeout(() => {
        setShowSuccess(false)
        setIsVisible(false)
        setWasOffline(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOnline, status, pendingChanges, wasOffline])

  // Show banner for error state
  useEffect(() => {
    if (status === 'error' && pendingChanges > 0) {
      setIsVisible(true)
    }
  }, [status, pendingChanges])

  // Determine banner variant
  const getVariant = () => {
    if (showSuccess) return 'success'
    if (!isOnline) return 'offline'
    if (status === 'recovering') return 'recovering'
    if (status === 'error') return 'error'
    return 'offline'
  }

  const variant = getVariant()

  const variants = {
    offline: {
      icon: WifiOff,
      title: 'Sem conexao com a internet',
      description: `Suas alteracoes estao salvas localmente${pendingChanges > 0 ? `. ${pendingChanges} alteracao${pendingChanges > 1 ? 'oes' : ''} pendente${pendingChanges > 1 ? 's' : ''}.` : '.'}`,
      bgColor: 'bg-orange-500/10 dark:bg-orange-500/20',
      borderColor: 'border-orange-500/30',
      iconColor: 'text-orange-500',
      textColor: 'text-orange-700 dark:text-orange-300',
    },
    recovering: {
      icon: RefreshCw,
      title: 'Sincronizando alteracoes...',
      description: `Recuperando ${pendingChanges} alteracao${pendingChanges > 1 ? 'oes' : ''} pendente${pendingChanges > 1 ? 's' : ''}.`,
      bgColor: 'bg-blue-500/10 dark:bg-blue-500/20',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-500',
      textColor: 'text-blue-700 dark:text-blue-300',
    },
    error: {
      icon: AlertTriangle,
      title: 'Falha ao sincronizar',
      description: error || 'Nao foi possivel salvar suas alteracoes. Tente novamente.',
      bgColor: 'bg-red-500/10 dark:bg-red-500/20',
      borderColor: 'border-red-500/30',
      iconColor: 'text-red-500',
      textColor: 'text-red-700 dark:text-red-300',
    },
    success: {
      icon: Check,
      title: 'Alteracoes sincronizadas!',
      description: 'Todas as suas alteracoes foram salvas com sucesso.',
      bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-500',
      textColor: 'text-emerald-700 dark:text-emerald-300',
    },
  }

  const config = variants[variant]
  const Icon = config.icon

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn('overflow-hidden', className)}
          data-testid="network-recovery-banner"
          data-variant={variant}
        >
          <div
            className={cn(
              'relative',
              'px-4 py-3',
              'rounded-2xl',
              // Glass effect
              'backdrop-blur-xl',
              'border',
              config.bgColor,
              config.borderColor,
              'shadow-lg'
            )}
          >
            {/* Inner glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-2xl" />

            <div className="flex items-start gap-3">
              {/* Icon */}
              <motion.div
                className={cn(
                  'flex-shrink-0 p-2 rounded-xl',
                  'bg-white/50 dark:bg-black/20',
                  config.iconColor
                )}
                animate={
                  variant === 'recovering'
                    ? { rotate: 360 }
                    : variant === 'offline'
                      ? { opacity: [1, 0.5, 1] }
                      : undefined
                }
                transition={
                  variant === 'recovering'
                    ? { duration: 1, repeat: Infinity, ease: 'linear' }
                    : variant === 'offline'
                      ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                      : undefined
                }
              >
                <Icon className="h-5 w-5" />
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4
                  className={cn(
                    'text-sm font-semibold',
                    config.textColor
                  )}
                >
                  {config.title}
                </h4>
                <p
                  className={cn(
                    'text-xs mt-0.5',
                    'text-slate-600 dark:text-slate-400'
                  )}
                >
                  {config.description}
                </p>

                {/* Progress indicator for recovering */}
                {variant === 'recovering' && (
                  <div className="mt-2 h-1 w-full bg-blue-200/50 dark:bg-blue-800/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-500 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Retry button */}
                {(variant === 'error' || variant === 'offline') && isOnline && (
                  <motion.button
                    type="button"
                    onClick={onRetry}
                    className={cn(
                      'px-3 py-1.5 rounded-lg',
                      'text-xs font-semibold',
                      'bg-white/50 dark:bg-black/30',
                      config.textColor,
                      'hover:bg-white/80 dark:hover:bg-black/50',
                      'transition-colors duration-200',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                      variant === 'error'
                        ? 'focus-visible:ring-red-500'
                        : 'focus-visible:ring-orange-500'
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center gap-1.5">
                      <RefreshCw className="h-3 w-3" />
                      Tentar novamente
                    </span>
                  </motion.button>
                )}

                {/* Dismiss button */}
                {(variant === 'success' || variant === 'error') && (
                  <motion.button
                    type="button"
                    onClick={handleDismiss}
                    className={cn(
                      'p-1.5 rounded-lg',
                      'text-slate-400 hover:text-slate-600',
                      'dark:text-slate-500 dark:hover:text-slate-300',
                      'hover:bg-white/50 dark:hover:bg-black/30',
                      'transition-colors duration-200',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/50'
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Fechar</span>
                  </motion.button>
                )}
              </div>
            </div>

            {/* Local storage indicator */}
            {variant === 'offline' && pendingChanges > 0 && (
              <div className="mt-3 pt-2 border-t border-orange-500/20">
                <div className="flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400">
                  <CloudOff className="h-3 w-3" />
                  <span>Dados salvos localmente ate a conexao ser restaurada</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ============================================================================
// NetworkStatusToast - Compact toast for network changes
// ============================================================================

export interface NetworkStatusToastProps {
  isOnline: boolean
  className?: string
}

export function NetworkStatusToast({ isOnline, className }: NetworkStatusToastProps) {
  const [show, setShow] = useState(false)
  const [prevOnline, setPrevOnline] = useState(isOnline)

  useEffect(() => {
    if (prevOnline !== isOnline) {
      setShow(true)
      setPrevOnline(isOnline)

      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        setShow(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isOnline, prevOnline])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={cn(
            'fixed bottom-4 left-1/2 -translate-x-1/2 z-50',
            'px-4 py-2',
            'rounded-full',
            'backdrop-blur-xl',
            'border',
            'shadow-lg',
            isOnline
              ? 'bg-emerald-500/20 border-emerald-500/30'
              : 'bg-orange-500/20 border-orange-500/30',
            className
          )}
        >
          <div className="flex items-center gap-2">
            {isOnline ? (
              <>
                <Cloud className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  Conexao restaurada
                </span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-orange-500" />
                <span className="text-xs font-medium text-orange-700 dark:text-orange-300">
                  Sem conexao
                </span>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

NetworkRecoveryBanner.displayName = 'NetworkRecoveryBanner'
NetworkStatusToast.displayName = 'NetworkStatusToast'
