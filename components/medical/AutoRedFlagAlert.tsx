'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { AlertTriangle, AlertCircle, XCircle, ChevronDown, ChevronUp, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DetectionResult,
  RedFlagAlert as RedFlagAlertType,
  groupAlertsBySeverity
} from '@/lib/anamnese/red-flag-detector'

interface AutoRedFlagAlertProps {
  result: DetectionResult
  onDismiss?: () => void
  onActionClick?: (alert: RedFlagAlertType) => void
  expanded?: boolean
}

/**
 * Componente de alerta automático para Red Flags
 * Exibe alertas detectados baseados nos sintomas selecionados
 */
export function AutoRedFlagAlert({
  result,
  onDismiss,
  onActionClick,
  expanded: defaultExpanded = true
}: AutoRedFlagAlertProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [dismissed, setDismissed] = useState(false)

  // Reset dismissed state when new alerts appear
  useEffect(() => {
    if (result.hasRedFlags) {
      setDismissed(false)
    }
  }, [result.alerts.length])

  if (!result.hasRedFlags || dismissed) {
    return null
  }

  const grouped = groupAlertsBySeverity(result.alerts)
  const hasMultipleAlerts = result.alerts.length > 1

  // Cores e ícones baseados na severidade
  const severityConfig = {
    critical: {
      bg: 'bg-red-50 dark:bg-red-950/40',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200',
      icon: XCircle,
      iconColor: 'text-red-500',
      badge: 'bg-red-500 text-white',
      pulse: true
    },
    danger: {
      bg: 'bg-orange-50 dark:bg-orange-950/40',
      border: 'border-orange-200 dark:border-orange-800',
      text: 'text-orange-800 dark:text-orange-200',
      icon: AlertTriangle,
      iconColor: 'text-orange-500',
      badge: 'bg-orange-500 text-white',
      pulse: false
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-950/40',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-200',
      icon: AlertCircle,
      iconColor: 'text-yellow-600',
      badge: 'bg-yellow-500 text-white',
      pulse: false
    }
  }

  const config = severityConfig[result.highestSeverity as keyof typeof severityConfig] || severityConfig.warning
  const Icon = config.icon

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`
        rounded-2xl border-2 ${config.bg} ${config.border}
        overflow-hidden shadow-lg
        ${config.pulse ? 'animate-pulse-subtle' : ''}
      `}
    >
      {/* Header */}
      <div
        className={`
          flex items-center justify-between px-4 py-3 cursor-pointer
          hover:bg-black/5 dark:hover:bg-white/5 transition-colors
        `}
        onClick={() => hasMultipleAlerts && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`${config.iconColor} ${config.pulse ? 'animate-bounce' : ''}`}>
            <Icon className="w-6 h-6" />
          </div>

          <div>
            <h3 className={`font-semibold ${config.text}`}>
              {result.highestSeverity === 'critical' && '🚨 ALERTA CRÍTICO'}
              {result.highestSeverity === 'danger' && '⚠️ Sinais de Alarme'}
              {result.highestSeverity === 'warning' && 'ℹ️ Pontos de Atenção'}
            </h3>
            <p className={`text-sm opacity-80 ${config.text}`}>
              {result.alerts.length} {result.alerts.length === 1 ? 'alerta detectado' : 'alertas detectados'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {result.requiresImmediateAction && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${config.badge}`}>
              AÇÃO IMEDIATA
            </span>
          )}

          {hasMultipleAlerts && (
            <button
              className={`p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 ${config.text}`}
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          )}

          {onDismiss && (
            <button
              onClick={(e) => { e.stopPropagation(); handleDismiss(); }}
              className={`p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 ${config.text}`}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Alert List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              {/* Critical Alerts */}
              {grouped.critical.length > 0 && (
                <AlertGroup
                  alerts={grouped.critical}
                  severity="critical"
                  onActionClick={onActionClick}
                />
              )}

              {/* Danger Alerts */}
              {grouped.danger.length > 0 && (
                <AlertGroup
                  alerts={grouped.danger}
                  severity="danger"
                  onActionClick={onActionClick}
                />
              )}

              {/* Warning Alerts */}
              {grouped.warning.length > 0 && (
                <AlertGroup
                  alerts={grouped.warning}
                  severity="warning"
                  onActionClick={onActionClick}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Sub-component for alert groups
interface AlertGroupProps {
  alerts: RedFlagAlertType[]
  severity: 'critical' | 'danger' | 'warning'
  onActionClick?: (alert: RedFlagAlertType) => void
}

function AlertGroup({ alerts, severity, onActionClick }: AlertGroupProps) {
  const colors = {
    critical: {
      dot: 'bg-red-500',
      action: 'bg-red-100 hover:bg-red-200 dark:bg-red-900/50 dark:hover:bg-red-800/50 text-red-700 dark:text-red-300'
    },
    danger: {
      dot: 'bg-orange-500',
      action: 'bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/50 dark:hover:bg-orange-800/50 text-orange-700 dark:text-orange-300'
    },
    warning: {
      dot: 'bg-yellow-500',
      action: 'bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/50 dark:hover:bg-yellow-800/50 text-yellow-700 dark:text-yellow-300'
    }
  }

  const config = colors[severity]

  return (
    <div className="space-y-2">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="flex items-start gap-3 p-3 rounded-xl bg-white/50 dark:bg-black/20"
        >
          <div className={`w-2 h-2 rounded-full ${config.dot} mt-2 flex-shrink-0`} />

          <div className="flex-1 min-w-0">
            <p className="font-medium text-slate-900 dark:text-white text-sm">
              {alert.message}
            </p>

            <button
              onClick={() => onActionClick?.(alert)}
              className={`
                mt-2 px-3 py-1.5 rounded-lg text-xs font-medium
                transition-colors ${config.action}
              `}
            >
              → {alert.action}
            </button>

            {alert.triggeredBy.length > 0 && (
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Baseado em: {alert.triggeredBy.join(', ')}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// Exporta tipos úteis
export type { AutoRedFlagAlertProps }
