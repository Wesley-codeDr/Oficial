'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { healthcareColors } from '@/lib/design-system/glass-tokens'

/**
 * Status Indicator Component
 *
 * Indicador visual de status com animações contextuais.
 * Usado em: chat conversations, kanban cards, patient lists
 *
 * Features:
 * - Urgent: pulse dot (scale 1 → 1.2, opacity 1 → 0.6, repeat)
 * - Normal: subtle glow
 * - Low: static
 * - Tamanhos: sm, md, lg
 * - Com ou sem label
 */

export type StatusIndicatorStatus = 'urgent' | 'normal' | 'low' | 'completed'

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusIndicatorStatus
  /** Ativar animação */
  animated?: boolean
  /** Mostrar dot pulsante */
  withDot?: boolean
  /** Label de texto */
  label?: string
  /** Tamanho */
  size?: 'sm' | 'md' | 'lg'
}

const statusConfig = {
  urgent: {
    color: healthcareColors.critical.light,
    darkColor: healthcareColors.critical.dark,
    bg: 'bg-healthcare-critical/15',
    text: 'text-healthcare-critical dark:text-healthcare-critical-dark',
    border: 'border-healthcare-critical/30',
    glow: 'shadow-[0_0_12px_rgba(255,59,48,0.4)]',
    label: 'Urgente',
  },
  normal: {
    color: healthcareColors.primary.light,
    darkColor: healthcareColors.primary.dark,
    bg: 'bg-healthcare-primary/15',
    text: 'text-healthcare-primary dark:text-healthcare-primary-dark',
    border: 'border-healthcare-primary/30',
    glow: 'shadow-[0_0_8px_rgba(0,122,255,0.3)]',
    label: 'Normal',
  },
  low: {
    color: '#8E8E93',
    darkColor: '#98989D',
    bg: 'bg-slate-500/15',
    text: 'text-slate-500 dark:text-slate-400',
    border: 'border-slate-500/30',
    glow: '',
    label: 'Baixa',
  },
  completed: {
    color: healthcareColors.success.light,
    darkColor: healthcareColors.success.dark,
    bg: 'bg-healthcare-success/15',
    text: 'text-healthcare-success dark:text-healthcare-success-dark',
    border: 'border-healthcare-success/30',
    glow: 'shadow-[0_0_10px_rgba(52,199,89,0.3)]',
    label: 'Concluído',
  },
}

const sizeConfig = {
  sm: {
    dot: 'w-2 h-2',
    container: 'gap-1.5',
    text: 'text-xs',
  },
  md: {
    dot: 'w-2.5 h-2.5',
    container: 'gap-2',
    text: 'text-sm',
  },
  lg: {
    dot: 'w-3 h-3',
    container: 'gap-2.5',
    text: 'text-base',
  },
}

export const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  (
    {
      status = 'normal',
      animated = status === 'urgent',
      withDot = true,
      label,
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const config = statusConfig[status]
    const sizeStyles = sizeConfig[size]
    const displayLabel = label || config.label

    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center', sizeStyles.container, className)}
        {...props}
      >
        {withDot && (
          <div className="relative flex items-center justify-center">
            {/* Pulse outer ring para urgent */}
            {animated && status === 'urgent' && (
              <motion.div
                className={cn('absolute rounded-full', config.bg)}
                style={{
                  width: size === 'sm' ? 16 : size === 'md' ? 20 : 24,
                  height: size === 'sm' ? 16 : size === 'md' ? 20 : 24,
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}

            {/* Glow ring para normal */}
            {animated && status === 'normal' && (
              <motion.div
                className={cn('absolute rounded-full', sizeStyles.dot)}
                style={{
                  width: size === 'sm' ? 12 : size === 'md' ? 14 : 16,
                  height: size === 'sm' ? 12 : size === 'md' ? 14 : 16,
                  backgroundColor: config.color,
                  opacity: 0.3,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}

            {/* Dot principal */}
            <motion.div
              className={cn(
                'relative rounded-full',
                sizeStyles.dot,
                animated && status === 'urgent' && config.glow
              )}
              style={{
                backgroundColor: config.color,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 20,
                delay: 0.1,
              }}
            />
          </div>
        )}

        {/* Label */}
        {displayLabel && (
          <motion.span
            className={cn('font-medium', config.text, sizeStyles.text)}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.2 }}
          >
            {displayLabel}
          </motion.span>
        )}
      </div>
    )
  }
)

StatusIndicator.displayName = 'StatusIndicator'

/**
 * Dot-only version (sem label)
 */
export const StatusDot = React.forwardRef<
  HTMLDivElement,
  Omit<StatusIndicatorProps, 'label' | 'withDot'>
>((props, ref) => {
  return <StatusIndicator ref={ref} {...props} withDot={true} label={undefined} />
})

StatusDot.displayName = 'StatusDot'
