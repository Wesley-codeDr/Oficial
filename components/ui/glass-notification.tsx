'use client'

import * as React from 'react'
import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * GlassNotification - iOS 26 style notification banner
 * Based on Apple's Liquid Glass 2026 design
 *
 * Features:
 * - Frosted glass background
 * - App icon with rounded corners
 * - Title, subtitle, and time
 * - Swipe to dismiss animation
 * - Press and hold to expand
 */

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
  /** Additional class names */
  className?: string
}

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
      className,
    },
    ref
  ) => {
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            className={cn(
              'relative w-full max-w-sm mx-auto',
              // Glass styling
              'bg-white/80 dark:bg-slate-900/80',
              'backdrop-blur-[60px] saturate-[180%]',
              'border border-white/30 dark:border-white/10',
              'rounded-3xl',
              // Shadow
              'shadow-[0_15px_40px_-10px_rgba(0,0,0,0.2)]',
              // Padding
              'p-3',
              // Cursor
              onClick && 'cursor-pointer',
              className
            )}
            initial={{ opacity: 0, y: -100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.9 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 35,
            }}
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
              {icon && (
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl',
                    'flex items-center justify-center',
                    'bg-gradient-to-br from-blue-500 to-blue-600',
                    'shadow-sm',
                    '[&>svg]:w-5 [&>svg]:h-5 text-white'
                  )}
                >
                  {icon}
                </div>
              )}

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
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5 line-clamp-1">
                  {title}
                </h4>

                {/* Subtitle */}
                {subtitle && (
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-2">
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
                    'transition-colors duration-200',
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

/**
 * GlassNotificationBadge - Small notification badge with count
 */
interface GlassNotificationBadgeProps {
  count: number
  className?: string
}

const GlassNotificationBadge = ({ count, className }: GlassNotificationBadgeProps) => {
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

/**
 * GlassNotificationStack - Container for stacked notifications
 */
interface GlassNotificationStackProps {
  children: React.ReactNode
  className?: string
}

const GlassNotificationStack = ({ children, className }: GlassNotificationStackProps) => (
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

export { GlassNotification, GlassNotificationBadge, GlassNotificationStack }
