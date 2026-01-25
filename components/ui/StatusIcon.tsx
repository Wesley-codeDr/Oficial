'use client'

import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Loader2,
  Clock,
  AlertOctagon,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  IconSize,
  iconSizeClasses,
  iconStrokeWidth,
} from '@/lib/design-system/icon-system'

type StatusType =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'loading'
  | 'pending'
  | 'critical'

export interface StatusIconProps {
  /** The status type to display */
  status: StatusType
  /** Size of the icon */
  size?: IconSize
  /** Whether to show with background container */
  withBackground?: boolean
  /** Whether to animate (for loading/pending) */
  animate?: boolean
  /** Whether to pulse (for critical/warning) */
  pulse?: boolean
  /** Additional CSS classes */
  className?: string
  /** Accessibility label override */
  'aria-label'?: string
}

/**
 * Icon mappings for each status type
 */
const statusIcons: Record<StatusType, LucideIcon> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
  loading: Loader2,
  pending: Clock,
  critical: AlertOctagon,
}

/**
 * Color configurations for each status type
 */
const statusColors: Record<
  StatusType,
  { icon: string; bg: string; border: string }
> = {
  success: {
    icon: 'text-status-success',
    bg: 'bg-status-success/10 dark:bg-status-success/15',
    border: 'border-status-success/20 dark:border-status-success/25',
  },
  warning: {
    icon: 'text-status-warning',
    bg: 'bg-status-warning/10 dark:bg-status-warning/15',
    border: 'border-status-warning/20 dark:border-status-warning/25',
  },
  error: {
    icon: 'text-status-error',
    bg: 'bg-status-error/10 dark:bg-status-error/15',
    border: 'border-status-error/20 dark:border-status-error/25',
  },
  info: {
    icon: 'text-status-info',
    bg: 'bg-status-info/10 dark:bg-status-info/15',
    border: 'border-status-info/20 dark:border-status-info/25',
  },
  loading: {
    icon: 'text-action-primary',
    bg: 'bg-action-primary/10 dark:bg-action-primary/15',
    border: 'border-action-primary/20 dark:border-action-primary/25',
  },
  pending: {
    icon: 'text-text-muted',
    bg: 'bg-surface-subtle',
    border: 'border-border-subtle',
  },
  critical: {
    icon: 'text-status-error',
    bg: 'bg-status-error/15 dark:bg-status-error/20',
    border: 'border-status-error/30 dark:border-status-error/35',
  },
}

/**
 * Container sizes for status icons with background
 */
const containerSizes: Record<IconSize, string> = {
  xs: 'w-5 h-5',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
  xl: 'w-12 h-12',
  '2xl': 'w-14 h-14',
}

/**
 * Accessibility labels for each status
 */
const statusLabels: Record<StatusType, string> = {
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
  info: 'Information',
  loading: 'Loading',
  pending: 'Pending',
  critical: 'Critical alert',
}

/**
 * StatusIcon - Semantic status indicator with Apple Liquid Glass 2026 styling
 *
 * Provides consistent status visualization across the application with:
 * - Automatic icon selection based on status type
 * - Semantic colors following healthcare guidelines
 * - Optional background containers
 * - Animation support for loading/critical states
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * import { StatusIcon } from '@/components/ui/StatusIcon'
 *
 * // Basic status indicators
 * <StatusIcon status="success" />
 * <StatusIcon status="warning" size="lg" />
 * <StatusIcon status="error" withBackground />
 *
 * // Loading with animation
 * <StatusIcon status="loading" animate />
 *
 * // Critical with pulse
 * <StatusIcon status="critical" pulse withBackground />
 * ```
 */
export const StatusIcon = forwardRef<HTMLDivElement, StatusIconProps>(
  (
    {
      status,
      size = 'md',
      withBackground = false,
      animate = status === 'loading',
      pulse = status === 'critical',
      className,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const Icon = statusIcons[status]
    const colors = statusColors[status]
    const sizeClass = iconSizeClasses[size]
    const containerSize = containerSizes[size]
    const label = ariaLabel || statusLabels[status]

    // Icon element
    const iconElement = (
      <Icon
        className={cn(sizeClass, colors.icon, 'flex-shrink-0')}
        strokeWidth={iconStrokeWidth.regular}
        aria-hidden="true"
      />
    )

    // Animated wrapper for loading
    const animatedIcon =
      animate && status === 'loading' ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          {iconElement}
        </motion.div>
      ) : (
        iconElement
      )

    // With background container
    if (withBackground) {
      return (
        <motion.div
          ref={ref}
          className={cn(
            'inline-flex items-center justify-center',
            containerSize,
            colors.bg,
            colors.border,
            'border rounded-full',
            'backdrop-blur-sm',
            className
          )}
          animate={pulse ? { scale: [1, 1.05, 1] } : undefined}
          transition={
            pulse
              ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
              : undefined
          }
          role="img"
          aria-label={label}
        >
          {animatedIcon}
        </motion.div>
      )
    }

    // Without background
    return (
      <span
        ref={ref}
        className={cn('inline-flex', className)}
        role="img"
        aria-label={label}
      >
        {pulse ? (
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {animatedIcon}
          </motion.span>
        ) : (
          animatedIcon
        )}
      </span>
    )
  }
)

StatusIcon.displayName = 'StatusIcon'

/**
 * Inline status text with icon
 */
export interface StatusTextProps extends Omit<StatusIconProps, 'withBackground'> {
  /** Text to display alongside the icon */
  children: React.ReactNode
}

export const StatusText = forwardRef<HTMLSpanElement, StatusTextProps>(
  ({ status, size = 'sm', children, className, ...props }, ref) => {
    const colors = statusColors[status]

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5',
          'text-sm font-medium',
          colors.icon,
          className
        )}
      >
        <StatusIcon status={status} size={size} {...props} />
        {children}
      </span>
    )
  }
)

StatusText.displayName = 'StatusText'

/**
 * Status badge with background
 */
export interface StatusBadgeProps extends Omit<StatusIconProps, 'withBackground'> {
  /** Text to display in the badge */
  children?: React.ReactNode
  /** Whether to show just the icon or icon with text */
  iconOnly?: boolean
}

export const StatusBadge = forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ status, size = 'xs', children, iconOnly = false, className, ...props }, ref) => {
    const colors = statusColors[status]
    const label = children || statusLabels[status]

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1',
          colors.bg,
          colors.border,
          'border rounded-full',
          'backdrop-blur-sm',
          iconOnly ? 'p-1' : 'px-2 py-0.5',
          className
        )}
      >
        <StatusIcon status={status} size={size} {...props} />
        {!iconOnly && (
          <span className={cn('text-xs font-medium', colors.icon)}>{label}</span>
        )}
      </div>
    )
  }
)

StatusBadge.displayName = 'StatusBadge'

export default StatusIcon
