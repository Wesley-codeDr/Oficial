"use client"

import * as React from "react"
import { motion, HTMLMotionProps, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Apple Liquid Glass 2026 Material Variants
 * Based on Apple Human Interface Guidelines iOS 26
 *
 * - regular: For most UI components (40px blur, 0.22 opacity)
 * - clear: For components over photos/videos/rich backgrounds (40px blur, 0.12 opacity)
 * - elevated: For modals, floating panels (40px blur, 0.28 opacity)
 * - subtle: More transparent, lighter feel (40px blur, 0.18 opacity)
 */
export type GlassMaterialVariant = "regular" | "clear" | "elevated" | "subtle"

/**
 * Healthcare semantic variants for medical context
 * These override the material variant with semantic colors
 */
export type HealthcareVariant =
  | "healthcare-primary"
  | "healthcare-success"
  | "healthcare-warning"
  | "healthcare-critical"
  | "healthcare-info"

/**
 * Glow color options for hover effects
 */
export type GlowColor =
  | "none"
  | "blue"
  | "green"
  | "teal"
  | "purple"
  | "orange"
  // Semantic glow options
  | "primary"
  | "success"
  | "warning"
  | "critical"
  | "info"

/**
 * Size presets affecting padding and border-radius
 */
export type GlassCardSize = "sm" | "md" | "lg"

export interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  /**
   * Material variant following Apple Liquid Glass 2026 HIG
   * @default "regular"
   */
  variant?: GlassMaterialVariant

  /**
   * Healthcare semantic variant (optional, adds semantic styling)
   * When specified, adds healthcare-specific colors to the card
   */
  healthcareVariant?: HealthcareVariant

  /**
   * Enable specular highlight effect (top shine)
   * Creates a radial gradient highlight at the top of the card
   * @default true
   */
  specular?: boolean

  /**
   * Enable rim light border effect
   * Creates a conic gradient border that simulates ambient lighting
   * @default true
   */
  rimLight?: boolean

  /**
   * Enable interactive animations (hover/press)
   * When true, enables scale and shadow animations on hover
   * @default true
   */
  interactive?: boolean

  /**
   * Enable hover glow effect
   * @deprecated Use glow prop instead
   * @default true
   */
  hover?: boolean

  /**
   * Glow color on hover
   * Applies a colored glow shadow effect on hover
   * @default "none"
   */
  glow?: GlowColor

  /**
   * Static glow (always visible, not just on hover)
   * @default false
   */
  glowStatic?: boolean

  /**
   * Enable 35% dimming layer (for clear variant on bright backgrounds)
   * @default false
   */
  dimming?: boolean

  /**
   * Enable shimmer effect on hover
   * @default false
   */
  shimmer?: boolean

  /**
   * Size preset affecting padding and border-radius
   * @default "md"
   */
  size?: GlassCardSize
}

/**
 * CSS classes for material variants
 * Uses CSS custom properties defined in liquid-glass-utils.css
 */
const variantClasses: Record<GlassMaterialVariant, string> = {
  regular: "liquid-glass-regular",
  clear: "liquid-glass-clear",
  elevated: "liquid-glass-elevated",
  subtle: "liquid-glass-2026-subtle",
}

/**
 * Healthcare variant styling with semantic colors
 */
const healthcareVariantClasses: Record<HealthcareVariant, string> = {
  "healthcare-primary": "border-blue-500/30 dark:border-blue-400/20",
  "healthcare-success": "border-green-500/30 dark:border-green-400/20",
  "healthcare-warning": "border-orange-500/30 dark:border-orange-400/20",
  "healthcare-critical": "border-red-500/40 dark:border-red-400/30",
  "healthcare-info": "border-cyan-500/30 dark:border-cyan-400/20",
}

/**
 * Healthcare variant background tints
 */
const healthcareBackgroundClasses: Record<HealthcareVariant, string> = {
  "healthcare-primary": "bg-blue-500/5 dark:bg-blue-500/10",
  "healthcare-success": "bg-green-500/5 dark:bg-green-500/10",
  "healthcare-warning": "bg-orange-500/5 dark:bg-orange-500/10",
  "healthcare-critical": "bg-red-500/8 dark:bg-red-500/12",
  "healthcare-info": "bg-cyan-500/5 dark:bg-cyan-500/10",
}

/**
 * Glow shadow classes for hover effects
 * Uses box-shadow for colored glow around the card
 */
const glowClasses: Record<GlowColor, { hover: string; static: string }> = {
  none: { hover: "", static: "" },
  // Direct color glows
  blue: {
    hover: "hover:shadow-[0_0_40px_rgba(0,102,255,0.2),0_20px_60px_-15px_rgba(0,102,255,0.1)]",
    static: "shadow-[0_0_40px_rgba(0,102,255,0.2),0_20px_60px_-15px_rgba(0,102,255,0.1)]",
  },
  green: {
    hover: "hover:shadow-[0_0_40px_rgba(0,200,83,0.2),0_20px_60px_-15px_rgba(0,200,83,0.1)]",
    static: "shadow-[0_0_40px_rgba(0,200,83,0.2),0_20px_60px_-15px_rgba(0,200,83,0.1)]",
  },
  teal: {
    hover: "hover:shadow-[0_0_40px_rgba(90,200,250,0.2),0_20px_60px_-15px_rgba(90,200,250,0.1)]",
    static: "shadow-[0_0_40px_rgba(90,200,250,0.2),0_20px_60px_-15px_rgba(90,200,250,0.1)]",
  },
  purple: {
    hover: "hover:shadow-[0_0_40px_rgba(175,82,222,0.2),0_20px_60px_-15px_rgba(175,82,222,0.1)]",
    static: "shadow-[0_0_40px_rgba(175,82,222,0.2),0_20px_60px_-15px_rgba(175,82,222,0.1)]",
  },
  orange: {
    hover: "hover:shadow-[0_0_40px_rgba(255,149,0,0.2),0_20px_60px_-15px_rgba(255,149,0,0.1)]",
    static: "shadow-[0_0_40px_rgba(255,149,0,0.2),0_20px_60px_-15px_rgba(255,149,0,0.1)]",
  },
  // Semantic glows (slightly more intense for visibility in medical context)
  primary: {
    hover: "hover:shadow-[0_0_40px_rgba(0,102,255,0.25),0_20px_60px_-15px_rgba(0,102,255,0.15)]",
    static: "shadow-[0_0_40px_rgba(0,102,255,0.25),0_20px_60px_-15px_rgba(0,102,255,0.15)]",
  },
  success: {
    hover: "hover:shadow-[0_0_40px_rgba(0,200,83,0.25),0_20px_60px_-15px_rgba(0,200,83,0.15)]",
    static: "shadow-[0_0_40px_rgba(0,200,83,0.25),0_20px_60px_-15px_rgba(0,200,83,0.15)]",
  },
  warning: {
    hover: "hover:shadow-[0_0_40px_rgba(255,149,0,0.25),0_20px_60px_-15px_rgba(255,149,0,0.15)]",
    static: "shadow-[0_0_40px_rgba(255,149,0,0.25),0_20px_60px_-15px_rgba(255,149,0,0.15)]",
  },
  critical: {
    hover: "hover:shadow-[0_0_40px_rgba(255,59,48,0.25),0_20px_60px_-15px_rgba(255,59,48,0.15)]",
    static: "shadow-[0_0_40px_rgba(255,59,48,0.25),0_20px_60px_-15px_rgba(255,59,48,0.15)]",
  },
  info: {
    hover: "hover:shadow-[0_0_40px_rgba(90,200,250,0.25),0_20px_60px_-15px_rgba(90,200,250,0.15)]",
    static: "shadow-[0_0_40px_rgba(90,200,250,0.25),0_20px_60px_-15px_rgba(90,200,250,0.15)]",
  },
}

/**
 * Size preset classes for padding and border-radius
 */
const sizeClasses: Record<GlassCardSize, string> = {
  sm: "p-4 rounded-[16px]",
  md: "p-6 rounded-[24px]",
  lg: "p-8 rounded-[32px]",
}

/**
 * Border radius by variant (elevated gets larger radius)
 */
const radiusClasses: Record<GlassMaterialVariant, Record<GlassCardSize, string>> = {
  regular: {
    sm: "rounded-[16px]",
    md: "rounded-[24px]",
    lg: "rounded-[32px]",
  },
  clear: {
    sm: "rounded-[16px]",
    md: "rounded-[24px]",
    lg: "rounded-[32px]",
  },
  elevated: {
    sm: "rounded-[20px]",
    md: "rounded-[28px]",
    lg: "rounded-[36px]",
  },
  subtle: {
    sm: "rounded-[14px]",
    md: "rounded-[20px]",
    lg: "rounded-[28px]",
  },
}

/**
 * Padding by size
 */
const paddingClasses: Record<GlassCardSize, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
}

/**
 * GlassCard Component
 *
 * A glassmorphism card component following Apple Liquid Glass 2026 design system.
 * Supports four material variants (regular, clear, elevated, subtle), healthcare
 * semantic colors, specular highlights, rim lights, and interactive animations.
 *
 * @example
 * // Basic usage
 * <GlassCard variant="regular">
 *   <p>Card content</p>
 * </GlassCard>
 *
 * @example
 * // Healthcare critical alert
 * <GlassCard
 *   variant="elevated"
 *   healthcareVariant="healthcare-critical"
 *   glow="critical"
 * >
 *   <RedFlagAlert />
 * </GlassCard>
 *
 * @example
 * // Non-interactive card with shimmer
 * <GlassCard
 *   variant="clear"
 *   interactive={false}
 *   shimmer
 *   dimming
 * >
 *   <MediaOverlay />
 * </GlassCard>
 */
const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      variant = "regular",
      healthcareVariant,
      specular = true,
      rimLight = true,
      interactive = true,
      hover = true,
      glow = "none",
      glowStatic = false,
      dimming = false,
      shimmer = false,
      size = "md",
      children,
      ...props
    },
    ref
  ) => {
    // Detect reduced motion preference
    const shouldReduceMotion = useReducedMotion()

    // Determine if we should animate
    const shouldAnimate = interactive && !shouldReduceMotion

    // Get the appropriate specular class based on variant
    const specularClass = variant === "clear"
      ? "liquid-glass-specular-clear"
      : "liquid-glass-specular"

    // Get glow classes
    const glowHoverClass = glowClasses[glow].hover
    const glowStaticClass = glowStatic ? glowClasses[glow].static : ""

    // Framer Motion animation variants
    const animationVariants = {
      initial: {
        opacity: 0,
        scale: 0.98,
        y: 10
      },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0
      },
      hover: shouldAnimate ? {
        scale: 1.02,
        transition: {
          duration: 0.2,
          ease: [0.25, 1, 0.5, 1]
        }
      } : {},
      tap: shouldAnimate ? {
        scale: 0.98,
        transition: {
          duration: 0.1,
          ease: [0.25, 1, 0.5, 1]
        }
      } : {},
    }

    return (
      <motion.div
        ref={ref}
        initial={shouldAnimate ? "initial" : false}
        animate={shouldAnimate ? "animate" : undefined}
        whileHover={shouldAnimate && hover ? "hover" : undefined}
        whileTap={shouldAnimate && interactive ? "tap" : undefined}
        variants={animationVariants}
        transition={{
          duration: 0.3,
          ease: [0.25, 1, 0.5, 1]
        }}
        className={cn(
          // Base styles
          "relative overflow-hidden",

          // Padding by size
          paddingClasses[size],

          // Border radius by variant and size
          radiusClasses[variant][size],

          // Transition for non-motion effects
          "transition-shadow duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",

          // Material variant styles
          variantClasses[variant],

          // Healthcare variant styling (if specified)
          healthcareVariant && healthcareVariantClasses[healthcareVariant],
          healthcareVariant && healthcareBackgroundClasses[healthcareVariant],

          // Specular highlight effect
          specular && specularClass,

          // Rim light border effect
          rimLight && "rim-light-ios26",

          // Inner glow and noise texture for realism
          "inner-glow-ios26 noise-grain",

          // Glow effects
          glowHoverClass,
          glowStaticClass,

          // Dimming layer for clear variant
          dimming && "liquid-glass-dim",

          // Shimmer effect on hover
          shimmer && "shimmer-effect",

          // Text colors
          "text-slate-800 dark:text-white font-sans",

          // Custom className override
          className
        )}
        {...props}
      >
        {/* Content wrapper with z-index to appear above effects */}
        <div className="relative z-10">
          {children as React.ReactNode}
        </div>
      </motion.div>
    )
  }
)

GlassCard.displayName = "GlassCard"

export { GlassCard }
