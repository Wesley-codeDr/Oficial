'use client'

import * as React from 'react'
import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * GlassCircleButton - iOS 26 Lock Screen style circular button
 * Based on Apple's Liquid Glass 2026 design (flashlight/camera buttons)
 *
 * Features:
 * - Perfectly circular glass button
 * - Subtle translucent background
 * - Rim light effect around the edge
 * - Press animation with haptic-like feedback
 * - Icon-only design for minimal UI
 */

export type CircleButtonSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl'

export interface GlassCircleButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  /** Icon to display */
  icon: React.ReactNode
  /** Size variant */
  size?: CircleButtonSize
  /** Active/pressed state */
  active?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Screen reader label */
  'aria-label': string
}

const sizeConfig = {
  xs: {
    button: 'w-8 h-8',
    icon: 'w-4 h-4',
    ring: '1px',
  },
  sm: {
    button: 'w-10 h-10',
    icon: 'w-5 h-5',
    ring: '1px',
  },
  default: {
    button: 'w-14 h-14',
    icon: 'w-6 h-6',
    ring: '1.5px',
  },
  lg: {
    button: 'w-16 h-16',
    icon: 'w-7 h-7',
    ring: '1.5px',
  },
  xl: {
    button: 'w-20 h-20',
    icon: 'w-8 h-8',
    ring: '2px',
  },
} as const

const GlassCircleButton = forwardRef<HTMLButtonElement, GlassCircleButtonProps>(
  (
    {
      icon,
      size = 'default',
      active = false,
      disabled = false,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const sizeStyles = sizeConfig[size]

    return (
      <motion.button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        className={cn(
          'relative flex items-center justify-center',
          'rounded-full',
          'backdrop-blur-[60px] saturate-[180%]',
          'transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          sizeStyles.button,
          // Background
          active
            ? 'bg-white/90 dark:bg-white/85'
            : 'bg-white/15 dark:bg-white/10',
          // Border with subtle rim light
          'border border-white/30',
          // Inner shadow for glass depth
          'shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-1px_1px_rgba(0,0,0,0.05)]',
          // Outer glow on hover
          'hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(0,0,0,0.05),0_0_20px_rgba(255,255,255,0.1)]',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        whileHover={!disabled ? { scale: 1.05 } : undefined}
        whileTap={!disabled ? { scale: 0.9 } : undefined}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
        {...props}
      >
        {/* Conic gradient rim light */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            padding: sizeStyles.ring,
            background: `conic-gradient(
              from 135deg at 50% 50%,
              rgba(255, 255, 255, 0.6) 0deg,
              rgba(255, 255, 255, 0.2) 90deg,
              rgba(255, 255, 255, 0.1) 180deg,
              rgba(255, 255, 255, 0.2) 270deg,
              rgba(255, 255, 255, 0.6) 360deg
            )`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* Specular highlight */}
        <div
          className="absolute top-1 left-1/2 -translate-x-1/2 w-1/2 h-1/4 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(255,255,255,0.4) 0%, transparent 70%)',
          }}
        />

        {/* Icon */}
        <div
          className={cn(
            sizeStyles.icon,
            'transition-colors duration-200',
            active ? 'text-slate-900' : 'text-white/90',
            '[&>svg]:w-full [&>svg]:h-full'
          )}
        >
          {icon}
        </div>
      </motion.button>
    )
  }
)

GlassCircleButton.displayName = 'GlassCircleButton'

/**
 * GlassCircleButtonGroup - Horizontal group of circle buttons
 */
export interface GlassCircleButtonGroupProps {
  children: React.ReactNode
  className?: string
}

const GlassCircleButtonGroup = ({
  children,
  className,
}: GlassCircleButtonGroupProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-3',
        className
      )}
      role="group"
    >
      {children}
    </div>
  )
}

GlassCircleButtonGroup.displayName = 'GlassCircleButtonGroup'

export { GlassCircleButton, GlassCircleButtonGroup }
