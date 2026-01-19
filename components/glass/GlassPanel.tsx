'use client'

import * as React from 'react'
import { motion, MotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { applePhysics } from '@/lib/design-system/animation-tokens'

/**
 * Apple Liquid Glass iOS 26 Material Variants
 * Based on Apple Human Interface Guidelines
 * Universal: blur(40px) saturate(180%)
 */
type GlassMaterialVariant = 'regular' | 'clear' | 'elevated' | 'medical' | 'subtle'

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  /**
   * Material variant following Apple Liquid Glass 2026 HIG
   * - regular: For controls, navigation, alerts, sidebars, popovers (default)
   * - clear: For components over photos/videos/rich backgrounds
   * - elevated: For modals, floating panels, high z-index elements
   * - medical: Medical-themed with blue tint
   * - subtle: More transparent, lighter feel
   */
  variant?: GlassMaterialVariant
  glow?: 'none' | 'blue' | 'green' | 'teal'
  interactive?: boolean
  /**
   * Enable specular highlight (top shine effect)
   */
  specular?: boolean
  /**
   * Enable rim light border effect
   */
  rimLight?: boolean
  /**
   * Enable 35% dimming layer (for clear variant on bright backgrounds)
   */
  dimming?: boolean
  /**
   * Enable refraction effect
   */
  refraction?: boolean
  initial?: MotionProps['initial']
  animate?: MotionProps['animate']
  transition?: MotionProps['transition']
}

const variantClasses: Record<GlassMaterialVariant, string> = {
  regular: `
    backdrop-blur-[40px] saturate-[180%]
    bg-[linear-gradient(135deg,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0.1)_100%)]
    dark:bg-[linear-gradient(135deg,rgba(30,30,30,0.25)_0%,rgba(30,30,30,0.15)_100%)]
    border border-white/30 dark:border-white/15
    shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.2)]
    dark:shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.1)]
  `,
  clear: `
    backdrop-blur-[40px] saturate-[180%]
    bg-white/15 dark:bg-[rgba(30,30,30,0.18)]
    border border-white/25 dark:border-white/10
    shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.15)]
    dark:shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.08)]
  `,
  elevated: `
    backdrop-blur-[40px] saturate-[180%]
    bg-[linear-gradient(135deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0.15)_100%)]
    dark:bg-[linear-gradient(135deg,rgba(30,30,30,0.32)_0%,rgba(30,30,30,0.2)_100%)]
    border border-white/40 dark:border-white/20
    shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.2)]
    dark:shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.1)]
  `,
  medical: `
    backdrop-blur-[40px] saturate-[180%]
    bg-[rgba(0,122,255,0.08)] dark:bg-[rgba(0,122,255,0.12)]
    border border-[rgba(0,122,255,0.15)] dark:border-[rgba(0,122,255,0.2)]
    shadow-[0_8px_32px_rgba(0,122,255,0.1),inset_0_1px_1px_rgba(255,255,255,0.2)]
    dark:shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.1)]
  `,
  subtle: `
    backdrop-blur-[40px] saturate-[180%]
    bg-white/15 dark:bg-[rgba(30,30,30,0.18)]
    border border-white/20 dark:border-white/10
    shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.15)]
    dark:shadow-[0_8px_32px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.05)]
  `,
}

const glowClasses = {
  none: '',
  blue: 'hover:shadow-[0_0_32px_rgba(0,122,255,0.12),0_8px_32px_rgba(0,0,0,0.1)]',
  green: 'hover:shadow-[0_0_32px_rgba(52,199,89,0.12),0_8px_32px_rgba(0,0,0,0.1)]',
  teal: 'hover:shadow-[0_0_32px_rgba(90,200,250,0.12),0_8px_32px_rgba(0,0,0,0.1)]',
}

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    {
      children,
      className,
      as: Component = motion.div,
      variant = 'regular',
      glow = 'none',
      interactive = true,
      specular = true,
      rimLight = true,
      dimming = false,
      refraction = false,
      initial = { opacity: 0, y: 10 },
      animate = { opacity: 1, y: 0 },
      transition = applePhysics.glass,
      ...props
    },
    ref
  ) => {
    // iOS 26 radius based on variant (24px standard, 28-32px elevated)
    const radiusClass = variant === 'elevated' ? 'rounded-[28px]' : 'rounded-[24px]'

    const baseClasses = `
      relative ${radiusClass} overflow-hidden
      transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]
    `

    return (
      <Component
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          glowClasses[glow],
          dimming && 'liquid-glass-dim',
          refraction && 'liquid-glass-refraction',
          className
        )}
        initial={initial}
        animate={animate}
        transition={transition}
        whileHover={
          interactive
            ? {
                scale: 1.02,
                transition: { duration: 0.2, ease: [0.25, 1, 0.5, 1] },
              }
            : undefined
        }
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

        {/* Specular highlight - iOS 26 style */}
        {specular && (
          <div
            className={cn(
              'absolute top-0 left-[5%] right-[5%] h-[45%] pointer-events-none z-[20]',
              radiusClass
            )}
            style={{
              background:
                variant === 'clear'
                  ? 'radial-gradient(ellipse 70% 35% at 50% 0%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 35%, transparent 65%)'
                  : 'radial-gradient(ellipse 85% 45% at 50% 0%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.35) 30%, rgba(255,255,255,0.12) 50%, transparent 75%)',
              opacity: variant === 'clear' ? 0.5 : 0.9,
              filter: 'blur(0.5px)',
            }}
          />
        )}

        {/* Rim light effect - Apple conic gradient */}
        {rimLight && (
          <div
            className="absolute inset-0 pointer-events-none z-[50] opacity-85 dark:opacity-50"
            style={{
              borderRadius: 'inherit',
              padding: '1.5px',
              background: `
                conic-gradient(
                  from 225deg at 50% 50%,
                  rgba(255, 255, 255, 0.9) 0deg,
                  rgba(255, 255, 255, 0.5) 45deg,
                  rgba(255, 255, 255, 0.2) 90deg,
                  rgba(255, 255, 255, 0.1) 135deg,
                  rgba(255, 255, 255, 0.2) 180deg,
                  rgba(255, 255, 255, 0.4) 225deg,
                  rgba(255, 255, 255, 0.6) 270deg,
                  rgba(255, 255, 255, 0.8) 315deg,
                  rgba(255, 255, 255, 0.9) 360deg
                )
              `,
              WebkitMask:
                'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </Component>
    )
  }
)

GlassPanel.displayName = 'GlassPanel'

export { GlassPanel }
export type { GlassPanelProps, GlassMaterialVariant }
