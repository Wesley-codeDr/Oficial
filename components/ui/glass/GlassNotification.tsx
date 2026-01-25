'use client'

import * as React from 'react'
import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, CheckCircle, Info, XCircle, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  glassRadius,
  glassTransition,
  appleSystemColors,
} from '@/lib/design-system/glass-tokens'

/**
 * GlassNotification - iOS 26 style notification banner
 * Based on Apple's Liquid Glass 2026 design
 *
 * Features:
 * - Frosted glass background with elevated effect
 * - Healthcare variant support for medical alerts
 * - Enter/exit animations
 * - Swipe to dismiss animation
 * - Pulse animation for critical alerts
 */

// ==================== TYPES ====================

export type GlassNotificationHealthcareVariant =
  | 'default'
  | 'healthcare-primary'
  | 'healthcare-success'
  | 'healthcare-warning'
  | 'healthcare-critical'
  | 'healthcare-info'

export interface GlassNotificationProps {
  /** App icon */
  icon?: React.ReactNode
  /** App name */
  appName: string
  /** Notification title */
  title: string
  /** Notification body/subtitle */
  subtitle?: string
  /** Time string (e.g., "Now", "5m ago") */
  time?: string
  /** Whether notification is visible */
  open?: boolean
  /** Callback when dismissed */
  onDismiss?: () => void
  /** Callback when clicked */
  onClick?: () => void
  /** Healthcare semantic variant for medical alerts */
  healthcareVariant?: GlassNotificationHealthcareVariant
  /** Additional class names */
  className?: string
}

// ==================== HEALTHCARE VARIANT STYLES ====================

const healthcareVariantStyles: Record<GlassNotificationHealthcareVariant, {
  bg: string
  border: string
  iconBg: string
  iconColor: string
  icon: React.ComponentType<{ className?: string }>
}> = {
  default: {
    bg: 'bg-white/80 dark:bg-slate-900/80',
    border: 'border-white/30 dark:border-white/10',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    iconColor: 'text-white',
    icon: Bell,
  },
  'healthcare-primary': {
    bg: 'bg-white/85 dark:bg-slate-900/85',
    border: 'border-blue-500/30 dark:border-blue-500/20',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    iconColor: 'text-white',
    icon: Info,
  },
  'healthcare-success': {
    bg: 'bg-white/85 dark:bg-slate-900/85',
    border: 'border-green-500/30 dark:border-green-500/20',
    iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
    iconColor: 'text-white',
    icon: CheckCircle,
  },
  'healthcare-warning': {
    bg: 'bg-white/85 dark:bg-slate-900/85',
    border: 'border-orange-500/30 dark:border-orange-500/20',
    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600',
    iconColor: 'text-white',
    icon: AlertTriangle,
  },
  'healthcare-critical': {
    bg: 'bg-red-50/95 dark:bg-red-950/90',
    border: 'border-red-500/50 dark:border-red-500/50',
    iconBg: 'bg-gradient-to-br from-red-500 to-red-600',
    iconColor: 'text-white',
    icon: XCircle,
  },
  'healthcare-info': {
    bg: 'bg-white/85 dark:bg-slate-900/85',
    border: 'border-teal-400/30 dark:border-teal-400/20',
    iconBg: 'bg-gradient-to-br from-teal-400 to-teal-500',
    iconColor: 'text-white',
    icon: Info,
  },
}

// ==================== ANIMATION VARIANTS ====================

const notificationVariants = {
  hidden: {
    opacity: 0,
    y: -100,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 35,
    },
  },
  exit: {
    opacity: 0,
    y: -100,
    scale: 0.9,
    transition: {
      duration: 0.2,
      ease: [0.25, 1, 0.5, 1],
    },
  },
}

// Pulse animation for critical alerts
const pulseAnimation = {
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(255, 59, 48, 0)',
      '0 0 0 8px rgba(255, 59, 48, 0.2)',
      '0 0 0 0 rgba(255, 59, 48, 0)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// ==================== COMPONENT ====================

const GlassNotification = forwardRef<HTMLDivElement, GlassNotificationProps>(
  (
    {
      icon,
      appName,
      title,
      subtitle,
      time = 'Now',
      open = true,
      onDismiss,
      onClick,
      healthcareVariant = 'default',
      className,
    },
    ref
  ) => {
    const variantStyles = healthcareVariantStyles[healthcareVariant]
    const isCritical = healthcareVariant === 'healthcare-critical'
    const IconComponent = variantStyles.icon

    return (
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            className={cn(
              'relative w-full max-w-sm mx-auto',
              // Glass styling - elevated variant
              'liquid-glass-elevated',
              variantStyles.bg,
              // Border
              'border',
              variantStyles.border,
              // Radius - iOS 26 style
              'rounded-3xl',
              // Shadow
              'shadow-[0_15px_40px_-10px_rgba(0,0,0,0.2)]',
              // Padding
              'p-3',
              // Cursor
              onClick && 'cursor-pointer',
              // Critical alert z-index priority (Task 5.3)
              isCritical && 'z-critical-alert',
              // Critical alert pulse animation (Task 5.2)
              isCritical && 'animate-critical-pulse',
              className
            )}
            variants={notificationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            {...(isCritical && pulseAnimation)}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 100) {
                onDismiss?.()
              }
            }}
            onClick={onClick}
          >
            {/* Inner glow line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-t-3xl" />

            <div className="flex items-start gap-3">
              {/* App Icon */}
              <div
                className={cn(
                  'w-10 h-10 rounded-xl',
                  'flex items-center justify-center',
                  variantStyles.iconBg,
                  'shadow-sm',
                  '[&>svg]:w-5 [&>svg]:h-5',
                  variantStyles.iconColor
                )}
              >
                {icon || <IconComponent />}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Header row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    {appName}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {time}
                  </span>
                </div>

                {/* Title */}
                <h4
                  className={cn(
                    'text-sm font-semibold mt-0.5 line-clamp-1',
                    isCritical
                      ? 'text-red-700 dark:text-red-300'
                      : 'text-slate-900 dark:text-white'
                  )}
                >
                  {title}
                </h4>

                {/* Subtitle */}
                {subtitle && (
                  <p
                    className={cn(
                      'text-sm mt-0.5 line-clamp-2',
                      isCritical
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-slate-600 dark:text-slate-300'
                    )}
                  >
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Dismiss button */}
              {onDismiss && (
                <motion.button
                  type="button"
                  className={cn(
                    'w-6 h-6 rounded-full',
                    'flex items-center justify-center',
                    'bg-slate-200/50 dark:bg-slate-700/50',
                    'text-slate-400 dark:text-slate-500',
                    'hover:bg-slate-200/80 dark:hover:bg-slate-700/80',
                    glassTransition.fast,
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50'
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    onDismiss()
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-3 h-3" />
                  <span className="sr-only">Dismiss</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)

GlassNotification.displayName = 'GlassNotification'

// ==================== NOTIFICATION BADGE ====================

interface GlassNotificationBadgeProps {
  count: number
  className?: string
}

const GlassNotificationBadge = ({
  count,
  className,
}: GlassNotificationBadgeProps) => {
  if (count <= 0) return null

  const displayCount = count > 99 ? '99+' : String(count)

  return (
    <motion.span
      className={cn(
        'inline-flex items-center justify-center',
        'min-w-[20px] h-5 px-1.5',
        'rounded-full',
        'bg-red-500',
        'text-[11px] font-bold text-white',
        'shadow-sm',
        className
      )}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      {displayCount}
    </motion.span>
  )
}

GlassNotificationBadge.displayName = 'GlassNotificationBadge'

// ==================== NOTIFICATION STACK ====================

interface GlassNotificationStackProps {
  children: React.ReactNode
  className?: string
}

const GlassNotificationStack = ({
  children,
  className,
}: GlassNotificationStackProps) => (
  <div
    className={cn(
      'fixed top-4 inset-x-4 z-50',
      'flex flex-col gap-2',
      'sm:right-4 sm:left-auto sm:max-w-sm',
      className
    )}
  >
    {children}
  </div>
)

GlassNotificationStack.displayName = 'GlassNotificationStack'

// ==================== EXPORTS ====================

export {
  GlassNotification,
  GlassNotificationBadge,
  GlassNotificationStack,
}
