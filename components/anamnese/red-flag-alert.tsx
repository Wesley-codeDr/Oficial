'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, AlertCircle, XCircle, X, ChevronDown, ChevronUp } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Severidade de red flags
type Severity = 'warning' | 'danger' | 'critical'

type RedFlag = {
  id: string
  displayText: string
  severity?: Severity
  action?: string
}

interface RedFlagAlertProps {
  redFlags: RedFlag[]
  className?: string
  showActions?: boolean
  onActionClick?: (flag: RedFlag) => void
}

// Determina severidade baseada no texto
function determineSeverity(text: string): Severity {
  const textLower = text.toLowerCase()

  const criticalTerms = [
    'parada', 'pcr', 'choque', 'coma', 'anúria', 'apneia',
    'glasgow < 8', 'hipotensão refratária', 'hemorragia maciça'
  ]

  const dangerTerms = [
    'spo2 < 90', 'alteração consciência', 'hipotensão',
    'instabilidade', 'sangramento', 'déficit neurológico',
    'convulsão', 'síncope', 'cianose', 'glasgow < 15'
  ]

  if (criticalTerms.some(term => textLower.includes(term))) return 'critical'
  if (dangerTerms.some(term => textLower.includes(term))) return 'danger'
  return 'warning'
}

const SEVERITY_CONFIG = {
  critical: {
    bg: 'bg-red-50 dark:bg-red-950/40',
    border: 'border-red-300 dark:border-red-800',
    text: 'text-red-700 dark:text-red-300',
    icon: XCircle,
    dot: 'bg-red-500',
    title: '🚨 ALERTA CRÍTICO'
  },
  danger: {
    bg: 'bg-orange-50 dark:bg-orange-950/40',
    border: 'border-orange-300 dark:border-orange-800',
    text: 'text-orange-700 dark:text-orange-300',
    icon: AlertTriangle,
    dot: 'bg-orange-500',
    title: '⚠️ Sinais de Alarme'
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-950/40',
    border: 'border-yellow-300 dark:border-yellow-800',
    text: 'text-yellow-700 dark:text-yellow-300',
    icon: AlertCircle,
    dot: 'bg-yellow-500',
    title: 'ℹ️ Atenção'
  }
}

export function RedFlagAlert({ redFlags, className, showActions = false, onActionClick }: RedFlagAlertProps) {
  const [dismissed, setDismissed] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)

  // Agrupa por severidade e determina a mais alta
  const { groupedFlags, highestSeverity } = useMemo(() => {
    const grouped: Record<Severity, RedFlag[]> = {
      critical: [],
      danger: [],
      warning: []
    }

    for (const flag of redFlags) {
      const severity = flag.severity || determineSeverity(flag.displayText)
      grouped[severity].push({ ...flag, severity })
    }

    let highest: Severity = 'warning'
    if (grouped.critical.length > 0) highest = 'critical'
    else if (grouped.danger.length > 0) highest = 'danger'

    return { groupedFlags: grouped, highestSeverity: highest }
  }, [redFlags])

  if (redFlags.length === 0 || dismissed) return null

  const config = SEVERITY_CONFIG[highestSeverity]
  const Icon = config.icon
  const hasMultiple = redFlags.length > 1

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0, y: -20, height: 0 }}
        className={cn(
          'rounded-xl border-2 overflow-hidden',
          config.bg,
          config.border,
          className
        )}
      >
        {/* Header */}
        <div
          className={cn(
            'flex items-center justify-between px-4 py-3',
            hasMultiple && 'cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors'
          )}
          onClick={() => hasMultiple && setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <div className={cn('p-1.5 rounded-full', config.bg)}>
              <Icon className={cn('h-5 w-5', config.text)} />
            </div>
            <div>
              <h4 className={cn('font-semibold', config.text)}>
                {config.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {redFlags.length} {redFlags.length === 1 ? 'sinal detectado' : 'sinais detectados'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {highestSeverity === 'critical' && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
                AÇÃO IMEDIATA
              </span>
            )}

            {hasMultiple && (
              <button className={cn('p-1 rounded-lg', config.text)}>
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => { e.stopPropagation(); setDismissed(true) }}
              className={cn('h-6 w-6', config.text)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-3">
                {/* Critical flags */}
                {groupedFlags.critical.length > 0 && (
                  <FlagGroup flags={groupedFlags.critical} severity="critical" showActions={showActions} onActionClick={onActionClick} />
                )}

                {/* Danger flags */}
                {groupedFlags.danger.length > 0 && (
                  <FlagGroup flags={groupedFlags.danger} severity="danger" showActions={showActions} onActionClick={onActionClick} />
                )}

                {/* Warning flags */}
                {groupedFlags.warning.length > 0 && (
                  <FlagGroup flags={groupedFlags.warning} severity="warning" showActions={showActions} onActionClick={onActionClick} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}

// Sub-component for flag groups
interface FlagGroupProps {
  flags: RedFlag[]
  severity: Severity
  showActions?: boolean
  onActionClick?: (flag: RedFlag) => void
}

function FlagGroup({ flags, severity, showActions, onActionClick }: FlagGroupProps) {
  const config = SEVERITY_CONFIG[severity]

  return (
    <div className="space-y-2">
      {flags.map((flag) => (
        <motion.div
          key={flag.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-black/20"
        >
          <span className={cn('h-2 w-2 rounded-full mt-1.5 shrink-0', config.dot)} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {flag.displayText.replace(/^⚠️\s*/, '')}
            </p>
            {showActions && flag.action && (
              <button
                onClick={() => onActionClick?.(flag)}
                className={cn(
                  'mt-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                  config.bg, config.text, 'hover:opacity-80'
                )}
              >
                → {flag.action}
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
