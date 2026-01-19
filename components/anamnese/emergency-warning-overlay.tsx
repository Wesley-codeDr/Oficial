'use client'

import * as React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertTriangle,
  AlertCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  X,
  Zap,
  Phone,
  Clock,
  Activity
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type {
  DetectedEmergency,
  EmergencySeverity
} from '@/hooks/use-emergency-detection'

/**
 * EmergencyWarningOverlay
 *
 * A prominent, real-time visual warning component that displays
 * when emergency indicators are detected in the anamnesis form.
 *
 * Features:
 * - Glassmorphism design following Apple Liquid Glass 2026 spec
 * - Pulsing animations for critical/danger alerts
 * - Expandable alert list with immediate actions
 * - Haptic feedback integration (handled by hook)
 * - Accessible keyboard navigation
 */

export interface EmergencyWarningOverlayProps {
  emergencies: DetectedEmergency[]
  highestSeverity: EmergencySeverity
  requiresImmediateAction: boolean
  onDismiss?: () => void
  onDismissOne?: (id: string) => void
  className?: string
  position?: 'top' | 'inline'
}

// Severity configuration
const SEVERITY_CONFIG = {
  critical: {
    icon: XCircle,
    title: 'ALERTA CRÍTICO',
    subtitle: 'Ação imediata necessária',
    glassClass: 'glass-emergency-alert glass-emergency-critical',
    pulseClass: 'animate-emergency-pulse-critical',
    iconClass: 'emergency-icon-critical',
    badgeClass: 'emergency-badge-critical',
    borderClass: 'animate-emergency-border-glow',
    textColor: 'text-red-700 dark:text-red-300',
    bgAccent: 'bg-red-500/10',
    dotColor: 'bg-red-500'
  },
  danger: {
    icon: AlertTriangle,
    title: 'Sinais de Alarme',
    subtitle: 'Requer avaliação urgente',
    glassClass: 'glass-emergency-alert glass-emergency-danger',
    pulseClass: 'animate-emergency-pulse-danger',
    iconClass: 'emergency-icon-danger',
    badgeClass: 'emergency-badge-danger',
    borderClass: '',
    textColor: 'text-orange-700 dark:text-orange-300',
    bgAccent: 'bg-orange-500/10',
    dotColor: 'bg-orange-500'
  },
  warning: {
    icon: AlertCircle,
    title: 'Pontos de Atenção',
    subtitle: 'Monitorar evolução',
    glassClass: 'glass-emergency-alert glass-emergency-warning',
    pulseClass: '',
    iconClass: 'emergency-icon-warning',
    badgeClass: 'emergency-badge-warning',
    borderClass: '',
    textColor: 'text-yellow-700 dark:text-yellow-300',
    bgAccent: 'bg-yellow-500/10',
    dotColor: 'bg-yellow-500'
  },
  none: {
    icon: AlertCircle,
    title: '',
    subtitle: '',
    glassClass: '',
    pulseClass: '',
    iconClass: '',
    badgeClass: '',
    borderClass: '',
    textColor: '',
    bgAccent: '',
    dotColor: ''
  }
}

export function EmergencyWarningOverlay({
  emergencies,
  highestSeverity,
  requiresImmediateAction,
  onDismiss,
  onDismissOne,
  className,
  position = 'inline'
}: EmergencyWarningOverlayProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [dismissedInSession, setDismissedInSession] = useState(false)

  // Reset dismissed state when new critical emergencies appear
  useEffect(() => {
    if (highestSeverity === 'critical' && emergencies.length > 0) {
      setDismissedInSession(false)
    }
  }, [emergencies.length, highestSeverity])

  const handleDismiss = useCallback(() => {
    setDismissedInSession(true)
    onDismiss?.()
  }, [onDismiss])

  const handleDismissOne = useCallback((id: string) => {
    onDismissOne?.(id)
  }, [onDismissOne])

  // Don't render if no emergencies or dismissed
  if (emergencies.length === 0 || dismissedInSession || highestSeverity === 'none') {
    return null
  }

  const config = SEVERITY_CONFIG[highestSeverity]
  const Icon = config.icon

  // Group emergencies by severity (available for future use if needed)
  const _groupedEmergencies = {
    critical: emergencies.filter(e => e.indicator.severity === 'critical'),
    danger: emergencies.filter(e => e.indicator.severity === 'danger'),
    warning: emergencies.filter(e => e.indicator.severity === 'warning')
  }

  // Show limited alerts initially
  const visibleEmergencies = showAll ? emergencies : emergencies.slice(0, 3)
  const hasMore = emergencies.length > 3

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className={cn(
          config.glassClass,
          config.pulseClass,
          config.borderClass,
          'p-4 sm:p-5',
          position === 'top' && 'emergency-overlay-fixed',
          className
        )}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        {/* Header */}
        <div
          className="flex items-start justify-between gap-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
          onKeyDown={(e) => e.key === 'Enter' && setIsExpanded(!isExpanded)}
          tabIndex={0}
          role="button"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-3">
            {/* Animated Icon */}
            <motion.div
              className={cn(
                'flex-shrink-0',
                config.iconClass,
                highestSeverity === 'critical' && 'animate-emergency-glow-critical'
              )}
              animate={highestSeverity === 'critical' ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
            </motion.div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className={cn('font-bold text-base sm:text-lg', config.textColor)}>
                  {highestSeverity === 'critical' && '🚨 '}{config.title}
                </h3>
                {requiresImmediateAction && (
                  <span className={cn(config.badgeClass, 'animate-pulse')}>
                    <Zap className="w-3 h-3 inline mr-1" />
                    AÇÃO IMEDIATA
                  </span>
                )}
              </div>
              <p className={cn('text-sm opacity-80', config.textColor)}>
                {emergencies.length} {emergencies.length === 1 ? 'alerta detectado' : 'alertas detectados'} • {config.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Expand/Collapse */}
            <motion.button
              className={cn(
                'p-2 rounded-xl transition-colors',
                'hover:bg-black/10 dark:hover:bg-white/10',
                config.textColor
              )}
              whileTap={{ scale: 0.9 }}
              aria-label={isExpanded ? 'Recolher alertas' : 'Expandir alertas'}
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </motion.button>

            {/* Dismiss (only for warning level) */}
            {highestSeverity === 'warning' && onDismiss && (
              <motion.button
                onClick={(e) => { e.stopPropagation(); handleDismiss(); }}
                className={cn(
                  'p-2 rounded-xl transition-colors',
                  'hover:bg-black/10 dark:hover:bg-white/10',
                  config.textColor
                )}
                whileTap={{ scale: 0.9 }}
                aria-label="Dispensar alertas"
              >
                <X className="w-5 h-5" />
              </motion.button>
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
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-3">
                {visibleEmergencies.map((emergency, index) => (
                  <EmergencyAlertItem
                    key={emergency.indicator.id}
                    emergency={emergency}
                    index={index}
                    onDismiss={
                      emergency.indicator.severity !== 'critical'
                        ? () => handleDismissOne(emergency.indicator.id)
                        : undefined
                    }
                  />
                ))}

                {/* Show More Button */}
                {hasMore && (
                  <motion.button
                    onClick={() => setShowAll(!showAll)}
                    className={cn(
                      'w-full py-2 px-4 rounded-xl text-sm font-medium',
                      'bg-white/30 dark:bg-black/20',
                      'hover:bg-white/50 dark:hover:bg-black/30',
                      'transition-colors',
                      config.textColor
                    )}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {showAll
                      ? 'Mostrar menos'
                      : `Ver mais ${emergencies.length - 3} alertas`}
                  </motion.button>
                )}
              </div>

              {/* Emergency Contact Info for Critical */}
              {highestSeverity === 'critical' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={cn(
                    'mt-4 p-3 rounded-xl',
                    'bg-red-500/10 border border-red-500/30',
                    'flex items-center gap-3'
                  )}
                >
                  <Phone className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                      Emergência Médica
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400">
                      Considere acionar equipe de emergência ou código azul
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}

// Individual alert item component
interface EmergencyAlertItemProps {
  emergency: DetectedEmergency
  index: number
  onDismiss?: () => void
}

function EmergencyAlertItem({ emergency, index, onDismiss }: EmergencyAlertItemProps) {
  const { indicator, triggeredBy } = emergency
  const config = SEVERITY_CONFIG[indicator.severity]

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        'p-3 sm:p-4 rounded-xl',
        'bg-white/40 dark:bg-black/20',
        'border border-white/30 dark:border-white/10',
        'relative overflow-hidden'
      )}
    >
      {/* Severity Indicator Line */}
      <div
        className={cn(
          'absolute left-0 top-0 bottom-0 w-1 rounded-l-xl',
          config.dotColor
        )}
      />

      <div className="flex items-start gap-3 pl-2">
        {/* Severity Dot */}
        <div
          className={cn(
            'w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0',
            config.dotColor,
            indicator.severity === 'critical' && 'animate-pulse'
          )}
        />

        <div className="flex-1 min-w-0">
          {/* Alert Label */}
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
              {indicator.label}
            </h4>
            <span className={cn('text-xs px-2 py-0.5 rounded-full', config.bgAccent, config.textColor)}>
              {indicator.category}
            </span>
          </div>

          {/* Recommended Action */}
          <div className={cn(
            'mt-2 p-2 rounded-lg text-xs sm:text-sm',
            config.bgAccent
          )}>
            <div className="flex items-start gap-2">
              <Activity className={cn('w-4 h-4 flex-shrink-0 mt-0.5', config.textColor)} />
              <p className={config.textColor}>
                <span className="font-semibold">Ação recomendada:</span> {indicator.action}
              </p>
            </div>
          </div>

          {/* Triggered By */}
          <div className="mt-2 flex items-center gap-2 flex-wrap text-xs text-slate-500 dark:text-slate-400">
            <Clock className="w-3 h-3" />
            <span>Baseado em: {triggeredBy.join(', ')}</span>
          </div>
        </div>

        {/* Dismiss button (only for non-critical) */}
        {onDismiss && indicator.severity !== 'critical' && (
          <motion.button
            onClick={(e) => { e.stopPropagation(); onDismiss(); }}
            className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-slate-400"
            whileTap={{ scale: 0.9 }}
            aria-label="Dispensar alerta"
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default EmergencyWarningOverlay
