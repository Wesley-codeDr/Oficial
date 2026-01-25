'use client'

import * as React from 'react'
import { motion, MotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { applePhysics } from '@/lib/design-system/animation-tokens'
import { useTheme } from 'next-themes'
import { useGlassBlur, useGlassOpacity, useGlassBorder, useGlassShadow, useGlassRadius, useGlassNoise, useGlassSpecular, useGlassRimLight, useGlassHoverScale, useGlassTapScale } from '@/lib/theme'

/**
 * Apple Liquid Glass iOS 26 Material Variants
 * Based on Apple Human Interface Guidelines
 * Universal: blur(50px) saturate(200%)
 * Healthcare variants use iOS 26 semantic colors
 */
type GlassMaterialVariant =
  | 'default' | 'clear' | 'elevated' | 'medical' | 'subtle'
  | 'healthcare-primary' | 'healthcare-success' | 'healthcare-warning' | 'healthcare-critical' | 'healthcare-info'

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
  glow?: 'none' | 'blue' | 'green' | 'teal' | 'primary' | 'success' | 'warning' | 'critical' | 'info'
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

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    {
      children,
      className,
      as: Component = motion.div,
      variant = 'default',
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
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    
    // Use theme hooks for dynamic classes
    const blurClass = useGlassBlur(variant)
    const opacityClass = useGlassOpacity(variant, isDark)
    const borderClass = useGlassBorder(variant, isDark)
    const shadowClass = useGlassShadow(variant, isDark)
    const radiusClass = useGlassRadius(variant)
    const noiseClass = useGlassNoise()
    const specularClass = useGlassSpecular(variant)
    const rimLightClass = useGlassRimLight()
    const hoverScaleClass = useGlassHoverScale()
    const tapScaleClass = useGlassTapScale()
    
    const glowClasses = {
      none: '',
      blue: 'hover:shadow-[0_0_32px_rgba(0,102,255,0.12),0_8px_32px_rgba(0,0,0,0.1)]',
      green: 'hover:shadow-[0_0_32px_rgba(0,200,83,0.12),0_8px_32px_rgba(0,0,0,0.1)]',
      teal: 'hover:shadow-[0_0_32px_rgba(90,200,250,0.12),0_8px_32px_rgba(0,0,0,0.1)]',
      // Healthcare semantic glows
      primary: 'hover:shadow-[0_0_32px_rgba(0,102,255,0.15),0_8px_32px_rgba(0,0,0,0.1)]',
      success: 'hover:shadow-[0_0_32px_rgba(0,200,83,0.15),0_8px_32px_rgba(0,0,0,0.1)]',
      warning: 'hover:shadow-[0_0_32px_rgba(255,149,0,0.15),0_8px_32px_rgba(0,0,0,0.1)]',
      critical: 'hover:shadow-[0_0_32px_rgba(255,59,48,0.15),0_8px_32px_rgba(0,0,0,0.1)]',
      info: 'hover:shadow-[0_0_32px_rgba(90,200,250,0.15),0_8px_32px_rgba(0,0,0,0.1)]',
    }
    
    const baseClasses = `
      relative ${radiusClass} overflow-hidden
      transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]
    `
    
    return (
      <Component
        ref={ref}
        className={cn(
          baseClasses,
          blurClass,
          opacityClass,
          borderClass,
          shadowClass,
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
          className={noiseClass}
          style={{
            mixBlendMode: 'overlay',
          }}
        />
        
        {/* Specular highlight - iOS 26 style */}
        {specular && (
          <div
            className={cn(
              'absolute top-0 left-[5%] right-[5%] h-[45%] pointer-events-none z-[20]',
              radiusClass,
              'specular-highlight-ios26'
            )}
            style={{
              opacity: variant === 'clear' ? 0.5 : 0.9,
              filter: 'blur(0.5px)',
            }}
          />
        )}
        
        {/* Rim light effect - Apple conic gradient */}
        {rimLight && (
          <div
            className={rimLightClass}
            style={{
              borderRadius: 'inherit',
              padding: '1.5px',
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
