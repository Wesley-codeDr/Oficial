'use client'

import React, { forwardRef } from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  IconSize,
  IconColor,
  IconStrokeWeight,
  iconSizeClasses,
  iconColors,
  iconStrokeWidth,
} from '@/lib/design-system/icon-system'

export interface GlassIconProps {
  /** The Lucide icon component to render */
  icon: LucideIcon
  /** Size of the icon */
  size?: IconSize
  /** Color variant */
  color?: IconColor
  /** Stroke weight */
  weight?: IconStrokeWeight
  /** Additional CSS classes */
  className?: string
  /** Accessibility label */
  'aria-label'?: string
  /** Whether the icon is hidden from screen readers */
  'aria-hidden'?: boolean
  /** Click handler - makes the icon interactive */
  onClick?: (e: React.MouseEvent) => void
  /** Custom style overrides */
  style?: React.CSSProperties
  /** Fill the icon (for filled variants) */
  fill?: string
  /** Absolute positioning flag */
  absoluteStrokeWidth?: boolean
}

/**
 * GlassIcon - Standardized icon component for Apple Liquid Glass 2026
 *
 * A universal wrapper for Lucide icons that provides:
 * - Consistent sizing across the application
 * - Semantic color tokens
 * - Proper stroke weights
 * - Accessibility support
 * - Dark mode compatibility
 *
 * @example
 * ```tsx
 * import { GlassIcon } from '@/components/ui/GlassIcon'
 * import { Heart, AlertTriangle, Check } from 'lucide-react'
 *
 * // Basic usage
 * <GlassIcon icon={Heart} />
 *
 * // With size and color
 * <GlassIcon icon={AlertTriangle} size="lg" color="warning" />
 *
 * // With custom weight
 * <GlassIcon icon={Check} size="md" color="success" weight="bold" />
 * ```
 */
export const GlassIcon = forwardRef<SVGSVGElement, GlassIconProps>(
  (
    {
      icon: Icon,
      size = 'md',
      color = 'default',
      weight = 'regular',
      className,
      'aria-label': ariaLabel,
      'aria-hidden': ariaHidden,
      onClick,
      style,
      fill = 'none',
      absoluteStrokeWidth = false,
    },
    ref
  ) => {
    const sizeClass = iconSizeClasses[size]
    const colorClass = iconColors[color].className
    const strokeWidthValue = iconStrokeWidth[weight]

    const isInteractive = !!onClick

    return (
      <Icon
        ref={ref}
        className={cn(
          sizeClass,
          colorClass,
          'flex-shrink-0',
          'transition-colors duration-200 ease-out',
          isInteractive && 'cursor-pointer hover:opacity-80',
          className
        )}
        strokeWidth={strokeWidthValue}
        fill={fill}
        absoluteStrokeWidth={absoluteStrokeWidth}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden ?? !ariaLabel}
        onClick={onClick}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        style={style}
      />
    )
  }
)

GlassIcon.displayName = 'GlassIcon'

/**
 * Inline icon variant - optimized for text alongside icons
 * Uses slightly smaller sizing and tighter spacing
 */
export const InlineIcon = forwardRef<SVGSVGElement, Omit<GlassIconProps, 'size'>>(
  ({ className, ...props }, ref) => {
    return (
      <GlassIcon
        ref={ref}
        size="sm"
        className={cn('inline-block align-text-bottom mr-1', className)}
        {...props}
      />
    )
  }
)

InlineIcon.displayName = 'InlineIcon'

/**
 * Feature icon - larger icon for feature highlights
 */
export const FeatureIcon = forwardRef<SVGSVGElement, Omit<GlassIconProps, 'size'>>(
  ({ className, ...props }, ref) => {
    return (
      <GlassIcon
        ref={ref}
        size="xl"
        className={cn('block', className)}
        {...props}
      />
    )
  }
)

FeatureIcon.displayName = 'FeatureIcon'

export default GlassIcon
