'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, AlertCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { redFlagChoreography } from '@/lib/design-system/animation-choreography'

interface RedFlag {
  id: string
  displayText: string
  severity?: 'warning' | 'danger' | 'critical'
  action?: string
}

interface FormRedFlagsPanelProps {
  redFlags: RedFlag[]
  onDismiss?: (id: string) => void
  className?: string
}

export function FormRedFlagsPanel({
  redFlags,
  onDismiss,
  className,
}: FormRedFlagsPanelProps) {
  if (redFlags.length === 0) return null

  const criticalFlags = redFlags.filter((rf) => rf.severity === 'critical')
  const hasCritical = criticalFlags.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.8,
        duration: 0.3,
        ease: [0.25, 1, 0.5, 1],
      }}
      className={cn(
        'backdrop-blur-glass',
        hasCritical
          ? 'bg-healthcare-critical-glass border-2 border-healthcare-critical/40'
          : 'bg-healthcare-warning-glass border border-healthcare-warning/30',
        'rounded-glass-lg',
        'p-6',
        'shadow-glass-light dark:shadow-glass-dark',
        className
      )}
    >
      {/* Header with Icon */}
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            ...redFlagChoreography.icon,
            delay: redFlagChoreography.icon.delay,
          }}
          className={cn(
            'p-2 rounded-glass-sm',
            hasCritical
              ? 'bg-healthcare-critical/20'
              : 'bg-healthcare-warning/20'
          )}
        >
          {hasCritical ? (
            <AlertTriangle className="w-5 h-5 text-healthcare-critical dark:text-healthcare-critical-dark" />
          ) : (
            <AlertCircle className="w-5 h-5 text-healthcare-warning dark:text-healthcare-warning-dark" />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            ...redFlagChoreography.text,
            delay: redFlagChoreography.text.delay,
          }}
        >
          <h3 className="text-sm font-bold text-slate-800 dark:text-white">
            {hasCritical ? 'Red Flags Críticos' : 'Alertas Importantes'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {redFlags.length} alerta{redFlags.length !== 1 ? 's' : ''} detectado
            {redFlags.length !== 1 ? 's' : ''}
          </p>
        </motion.div>
      </div>

      {/* Red Flags List */}
      <AnimatePresence mode="popLayout">
        <div className="space-y-3">
          {redFlags.map((flag, index) => (
            <motion.div
              key={flag.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{
                delay: 0.05 * index,
                duration: 0.2,
              }}
              className={cn(
                'p-3 rounded-glass-sm',
                'bg-white/50 dark:bg-slate-800/50',
                'border',
                flag.severity === 'critical'
                  ? 'border-healthcare-critical/30'
                  : 'border-healthcare-warning/30',
                'flex items-start gap-3'
              )}
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800 dark:text-white">
                  {flag.displayText}
                </p>
                {flag.action && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    <strong>Ação:</strong> {flag.action}
                  </p>
                )}
              </div>

              {onDismiss && (
                <button
                  onClick={() => onDismiss(flag.id)}
                  className="flex-shrink-0 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                  aria-label="Dismiss alert"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Critical Background Pulse */}
      {hasCritical && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-glass-lg"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            ...redFlagChoreography.pulse,
            duration: redFlagChoreography.pulse.duration / 1000,
          }}
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 59, 48, 0.3) 0%, transparent 70%)',
          }}
        />
      )}
    </motion.div>
  )
}
