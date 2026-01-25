'use client'

import React, { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  IconSize,
  IconColor,
  IconStrokeWeight,
  iconContainerSizes,
  iconContainerRadius,
  iconColors,
  iconStrokeWidth,
  iconAnimations,
} from '@/lib/design-system/icon-system'

type ButtonVariant = 'glass' | 'ghost' | 'outline' | 'solid'

export interface GlassIconButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  /** The Lucide icon component to render */
  icon: LucideIcon
  /** Size of the button and icon */
  size?: IconSize
  /** Color variant */
  color?: IconColor
  /** Stroke weight */
  weight?: IconStrokeWeight
  /** Button variant */
  variant?: ButtonVariant
  /** Whether the button is in active/selected state */
  isActive?: boolean
  /** Whether to show loading spinner */
  isLoading?: boolean
  /** Whether to use circular shape */
  isCircular?: boolean
  /** Accessibility label (required for icon-only buttons) */
  'aria-label': string
  /** Optional tooltip text */
  tooltip?: string
}

/**
 * GlassIconButton - Icon button with Apple Liquid Glass 2026 styling
 *
 * A fully styled icon button that supports:
 * - Multiple variants (glass, ghost, outline, solid)
 * - Active states with glow effects
 * - Loading states with spinner
 * - Smooth animations via Framer Motion
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * import { GlassIconButton } from '@/components/ui/GlassIconButton'
 * import { Plus, Trash2, Check } from 'lucide-react'
 *
 * // Glass variant (default)
 * <GlassIconButton icon={Plus} aria-label="Add item" />
 *
 * // Active state with color
 * <GlassIconButton icon={Check} isActive color="success" aria-label="Confirm" />
 *
 * // Ghost variant
 * <GlassIconButton icon={Trash2} variant="ghost" color="error" aria-label="Delete" />
 * ```
 */
export const GlassIconButton = forwardRef<HTMLButtonElement, GlassIconButtonProps>(
  (
    {
      icon: Icon,
      size = 'md',
      color = 'default',
      weight = 'regular',
      variant = 'glass',
      isActive = false,
      isLoading = false,
      isCircular = false,
      className,
      disabled,
      'aria-label': ariaLabel,
      tooltip,
      ...motionProps
    },
    ref
  ) => {
    const containerConfig = iconContainerSizes[size]
    const radiusClass = isCircular ? 'rounded-full' : iconContainerRadius[size]
    const colorConfig = iconColors[color]
    const strokeWidthValue = iconStrokeWidth[weight]

    // Variant-specific styles
    const variantStyles: Record<ButtonVariant, string> = {
      glass: cn(
        // Base glass effect
        'backdrop-blur-xl',
        'bg-white/10 dark:bg-white/5',
        'border border-white/20 dark:border-white/10',
        'shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.3)]',
        'dark:shadow-[0_2px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]',
        // Hover
        'hover:bg-white/20 dark:hover:bg-white/10',
        'hover:border-white/30 dark:hover:border-white/15',
        'hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.4)]',
        'dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]'
      ),
      ghost: cn(
        'bg-transparent',
        'hover:bg-white/10 dark:hover:bg-white/5',
        'border border-transparent',
        'hover:border-white/10 dark:hover:border-white/5'
      ),
      outline: cn(
        'bg-transparent',
        'border border-border-default',
        'hover:bg-surface-subtle',
        'hover:border-border-default/80'
      ),
      solid: cn(
        'bg-action-primary text-white',
        'border border-transparent',
        'shadow-button-primary',
        'hover:bg-action-primary-hover'
      ),
    }

    // Active state styles
    const activeStyles = isActive
      ? cn(
          'bg-action-primary/15 dark:bg-action-primary/20',
          'border-action-primary/30 dark:border-action-primary/25',
          'shadow-[0_4px_20px_rgba(0,122,255,0.2)]'
        )
      : ''

    // Disabled styles
    const disabledStyles =
      disabled || isLoading
        ? 'opacity-50 cursor-not-allowed pointer-events-none'
        : ''

    return (
      <motion.button
        ref={ref}
        type="button"
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center',
          containerConfig.container,
          radiusClass,
          'cursor-pointer',
          'transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2',
          // Variant styles
          variantStyles[variant],
          // Active state
          activeStyles,
          // Disabled state
          disabledStyles,
          className
        )}
        whileHover={disabled || isLoading ? undefined : { scale: 1.05, y: -1 }}
        whileTap={disabled || isLoading ? undefined : { scale: 0.95 }}
        transition={iconAnimations.hover.transition}
        disabled={disabled || isLoading}
        aria-label={ariaLabel}
        title={tooltip}
        {...motionProps}
      >
        {/* Specular highlight */}
        {variant === 'glass' && (
          <div
            className={cn(
              'absolute top-0 left-[15%] right-[15%] h-[1px]',
              'bg-gradient-to-r from-transparent via-white/50 to-transparent',
              'rounded-full pointer-events-none',
              'transition-opacity duration-300',
              isActive ? 'opacity-80' : 'opacity-40'
            )}
          />
        )}

        {/* Icon or loader */}
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Icon
              className={cn(containerConfig.icon, 'text-current')}
              strokeWidth={strokeWidthValue}
            />
          </motion.div>
        ) : (
          <Icon
            className={cn(
              containerConfig.icon,
              'relative z-10',
              'transition-all duration-300',
              !isActive && [
                'text-slate-500 dark:text-slate-400',
                'group-hover:text-slate-700 dark:group-hover:text-slate-200',
              ],
              isActive && colorConfig.className
            )}
            strokeWidth={isActive ? strokeWidthValue + 0.2 : strokeWidthValue}
            style={
              isActive && color !== 'default'
                ? {
                    color: colorConfig.style.color,
                    filter: `drop-shadow(0 0 6px ${colorConfig.style.color}40)`,
                  }
                : undefined
            }
          />
        )}
      </motion.button>
    )
  }
)

GlassIconButton.displayName = 'GlassIconButton'

/**
 * Compact icon button - smaller touch target for dense UIs
 */
export const CompactIconButton = forwardRef<
  HTMLButtonElement,
  Omit<GlassIconButtonProps, 'size'>
>((props, ref) => {
  return <GlassIconButton ref={ref} size="sm" {...props} />
})

CompactIconButton.displayName = 'CompactIconButton'

/**
 * Large icon button - bigger touch target for primary actions
 */
export const LargeIconButton = forwardRef<
  HTMLButtonElement,
  Omit<GlassIconButtonProps, 'size'>
>((props, ref) => {
  return <GlassIconButton ref={ref} size="lg" {...props} />
})

LargeIconButton.displayName = 'LargeIconButton'

export default GlassIconButton
