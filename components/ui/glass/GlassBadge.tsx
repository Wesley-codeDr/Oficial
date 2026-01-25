'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  glassRadius,
  glassTransition,
  appleSystemColors,
} from '@/lib/design-system/glass-tokens'

/**
 * GlassBadge - Apple Liquid Glass 2026 Badge Component
 *
 * Features:
 * - Universal blur(50px) saturate(200%)
 * - Healthcare variants with iOS 26 semantic colors
 * - Pulse animation for critical badges
 * - Inner glow and rim light effects
 */

// ==================== TYPES ====================

export type GlassBadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'medical'
  | 'danger'
  | 'success'
  | 'warning'
  | 'healthcare-primary'
  | 'healthcare-success'
  | 'healthcare-warning'
  | 'healthcare-critical'
  | 'healthcare-info'
  | 'healthcare-neutral'

export type GlassBadgeSize = 'sm' | 'md' | 'lg'

export interface GlassBadgeProps {
  /**
   * Material variant following Apple Liquid Glass 2026 HIG
   */
  variant?: GlassBadgeVariant
  /** Size of the badge */
  size?: GlassBadgeSize
  /** Badge content */
  children: React.ReactNode
  /** Enable inner glow effect */
  innerGlow?: boolean
  /** Enable rim light border effect */
  rimLight?: boolean
  /** Enable pulse animation (useful for critical alerts) */
  pulse?: boolean
  /** Additional class names */
  className?: string
}

// ==================== VARIANT STYLES ====================

const variantClasses: Record<GlassBadgeVariant, string> = {
  default: cn(
    'liquid-glass-default',
    'bg-white/30 dark:bg-slate-800/40',
    'border border-white/35 dark:border-white/20',
    'shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]',
    'text-slate-700 dark:text-slate-200'
  ),
  primary: cn(
    'liquid-glass-default',
    'bg-blue-500/85 dark:bg-blue-500/90',
    'border border-blue-400/40 dark:border-blue-400/50',
    'shadow-[0_6px_16px_-6px_rgba(0,122,255,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]',
    'text-white'
  ),
  secondary: cn(
    'liquid-glass-default',
    'bg-white/25 dark:bg-slate-800/35',
    'border border-white/25 dark:border-white/12',
    'shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.7)]',
    'text-slate-600 dark:text-slate-300'
  ),
  medical: cn(
    'liquid-glass-default',
    'bg-blue-500/20 dark:bg-blue-500/25',
    'border border-blue-500/25 dark:border-blue-500/30',
    'shadow-[0_4px_12px_-4px_rgba(0,122,255,0.15),inset_0_1px_0_rgba(255,255,255,0.6)]',
    'text-blue-600 dark:text-blue-400'
  ),
  danger: cn(
    'liquid-glass-default',
    'bg-red-500/85 dark:bg-red-500/90',
    'border border-red-400/40 dark:border-red-400/50',
    'shadow-[0_6px_16px_-6px_rgba(255,59,48,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]',
    'text-white'
  ),
  success: cn(
    'liquid-glass-default',
    'bg-green-500/85 dark:bg-green-500/90',
    'border border-green-400/40 dark:border-green-400/50',
    'shadow-[0_6px_16px_-6px_rgba(52,199,89,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]',
    'text-white'
  ),
  warning: cn(
    'liquid-glass-default',
    'bg-orange-500/85 dark:bg-orange-500/90',
    'border border-orange-400/40 dark:border-orange-400/50',
    'shadow-[0_6px_16px_-6px_rgba(255,149,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]',
    'text-white'
  ),
  'healthcare-primary': cn(
    'backdrop-blur-[50px] saturate-[180%]',
    'bg-blue-500/15 dark:bg-blue-500/20',
    'border border-blue-500/25 dark:border-blue-500/30',
    'shadow-[0_4px_12px_-4px_rgba(0,122,255,0.1)]',
    'text-blue-600 dark:text-blue-400'
  ),
  'healthcare-success': cn(
    'backdrop-blur-[50px] saturate-[180%]',
    'bg-green-500/15 dark:bg-green-500/20',
    'border border-green-500/25 dark:border-green-500/30',
    'shadow-[0_4px_12px_-4px_rgba(52,199,89,0.1)]',
    'text-green-600 dark:text-green-400'
  ),
  'healthcare-warning': cn(
    'backdrop-blur-[50px] saturate-[180%]',
    'bg-orange-500/15 dark:bg-orange-500/20',
    'border border-orange-500/25 dark:border-orange-500/30',
    'shadow-[0_4px_12px_-4px_rgba(255,149,0,0.1)]',
    'text-orange-600 dark:text-orange-400'
  ),
  'healthcare-critical': cn(
    'backdrop-blur-[50px] saturate-[180%]',
    'bg-red-500/15 dark:bg-red-500/20',
    'border border-red-500/25 dark:border-red-500/30',
    'shadow-[0_4px_12px_-4px_rgba(255,59,48,0.1)]',
    'text-red-600 dark:text-red-400'
  ),
  'healthcare-info': cn(
    'backdrop-blur-[50px] saturate-[180%]',
    'bg-teal-400/15 dark:bg-teal-400/20',
    'border border-teal-400/25 dark:border-teal-400/30',
    'shadow-[0_4px_12px_-4px_rgba(90,200,250,0.1)]',
    'text-teal-600 dark:text-teal-400'
  ),
  'healthcare-neutral': cn(
    'backdrop-blur-[50px] saturate-[180%]',
    'bg-slate-400/15 dark:bg-slate-400/20',
    'border border-slate-400/25 dark:border-slate-400/30',
    'shadow-[0_4px_12px_-4px_rgba(142,142,147,0.1)]',
    'text-slate-600 dark:text-slate-400'
  ),
}

// ==================== SIZE STYLES ====================

const sizeClasses: Record<GlassBadgeSize, string> = {
  sm: 'h-6 px-2 text-xs font-medium',
  md: 'h-7 px-3 text-sm font-medium',
  lg: 'h-8 px-4 text-base font-medium',
}

// ==================== INNER GLOW COLORS ====================

const innerGlowColors: Partial<Record<GlassBadgeVariant, string>> = {
  primary: 'rgba(0,102,255,0.15)',
  'healthcare-primary': 'rgba(0,102,255,0.15)',
  medical: 'rgba(0,102,255,0.15)',
  danger: 'rgba(255,59,48,0.15)',
  'healthcare-critical': 'rgba(255,59,48,0.15)',
  success: 'rgba(0,200,83,0.15)',
  'healthcare-success': 'rgba(0,200,83,0.15)',
  warning: 'rgba(255,149,0,0.15)',
  'healthcare-warning': 'rgba(255,149,0,0.15)',
  'healthcare-info': 'rgba(90,200,250,0.15)',
  'healthcare-neutral': 'rgba(142,142,147,0.15)',
  default: 'rgba(255,255,255,0.1)',
  secondary: 'rgba(255,255,255,0.1)',
}

// ==================== ANIMATION VARIANTS ====================

const badgeVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.25, 1, 0.5, 1],
    },
  },
}

const pulseVariants = {
  pulse: {
    boxShadow: [
      '0 0 0 0 rgba(255, 59, 48, 0)',
      '0 0 0 6px rgba(255, 59, 48, 0.3)',
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

const GlassBadge = React.forwardRef<HTMLDivElement, GlassBadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      children,
      innerGlow = true,
      rimLight = true,
      pulse = false,
      ...props
    },
    ref
  ) => {
    // Auto-enable pulse for critical variants
    const shouldPulse = pulse || variant === 'healthcare-critical' || variant === 'danger'
    const glowColor = innerGlowColors[variant] || 'rgba(255,255,255,0.1)'

    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden font-medium',
          // Radius - iOS 26 style
          glassRadius.sm,
          // Transitions
          glassTransition.fast,
          glassTransition.easeApple,
          // Variant styles
          variantClasses[variant],
          // Size styles
          sizeClasses[size],
          className
        )}
        variants={badgeVariants}
        initial="hidden"
        animate="visible"
        {...(shouldPulse && {
          animate: 'pulse',
          variants: { ...badgeVariants, ...pulseVariants },
        })}
        {...props}
      >
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.02] z-[1]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Inner Glow Effect */}
        {innerGlow && (
          <div
            className={cn(
              'absolute inset-0 pointer-events-none z-[2]',
              glassRadius.sm
            )}
            style={{
              background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
              opacity: 0.6,
            }}
          />
        )}

        {/* Rim Light Effect */}
        {rimLight && (
          <div
            className={cn(
              'absolute inset-0 pointer-events-none z-[50] opacity-80 dark:opacity-40',
              glassRadius.sm
            )}
            style={{
              padding: '0.75px',
              background: `
                conic-gradient(
                  from 45deg at 50% 50%,
                  rgba(255,255,255,0.8) 0deg,
                  rgba(255,255,255,0.5) 30deg,
                  rgba(255,255,255,0.3) 60deg,
                  rgba(255,255,255,0.15) 90deg,
                  rgba(255,255,255,0.1) 120deg,
                  rgba(255,255,255,0.15) 150deg,
                  rgba(255,255,255,0.3) 180deg,
                  rgba(255,255,255,0.5) 210deg,
                  rgba(255,255,255,0.7) 240deg,
                  rgba(255,255,255,0.85) 270deg,
                  rgba(255,255,255,0.6) 300deg,
                  rgba(255,255,255,0.4) 330deg,
                  rgba(255,255,255,0.8) 360deg
                )
              `,
              WebkitMask:
                'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              filter: 'blur(0.5px)',
            }}
          />
        )}

        {/* Badge Content */}
        <span className="relative z-10">{children}</span>
      </motion.div>
    )
  }
)

GlassBadge.displayName = 'GlassBadge'

export { GlassBadge }
export type { GlassBadgeProps, GlassBadgeVariant, GlassBadgeSize }
