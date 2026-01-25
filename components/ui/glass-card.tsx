"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Apple Liquid Glass 2026 Material Variants
 * Universal: blur(40px) saturate(180%)
 * Following Apple HIG iOS 26 specifications
 */
type GlassCardVariant =
  | "default" | "regular" | "clear" | "elevated" | "subtle" | "dark" | "light"

interface GlassCardProps extends HTMLMotionProps<"div"> {
  /**
   * Material variant following Apple Liquid Glass 2026 HIG
   * - default/regular: For most UI components (40px blur, 0.25 opacity)
   * - clear: For components over photos/videos/rich backgrounds (40px blur, 0.15 opacity)
   * - elevated: For modals, floating panels (40px blur, 0.25 opacity)
   * - subtle: More transparent, lighter feel (40px blur, 0.20 opacity)
   * - dark: Dark background variant
   * - light: Light background variant
   */
  variant?: GlassCardVariant
  hover?: boolean
  glow?: "none" | "blue" | "green" | "teal" | "purple" | "orange" | "primary" | "success" | "warning" | "critical" | "info"
  /**
   * Enable specular highlight (top shine effect)
   */
  specular?: boolean
  interactive?: boolean
  /**
   * Enable rim light border effect
   */
  rimLight?: boolean
  /**
   * Enable 35% dimming layer (for clear variant on bright backgrounds)
   */
  dimming?: boolean
}

const variantClasses: Record<GlassCardVariant, string> = {
  // Apple Liquid Glass 2026 standardized variants
  default: "liquid-glass-regular",
  regular: "liquid-glass-regular",
  clear: "liquid-glass-clear",
  elevated: "liquid-glass-elevated",
  subtle: "liquid-glass-regular",
  dark: "liquid-glass-regular",
  light: "liquid-glass-regular",
}

const glowClasses = {
  none: "",
  blue: "hover:shadow-[0_0_40px_rgba(0,102,255,0.2),0_20px_60px_-15px_rgba(0,102,255,0.1)]",
  green: "hover:shadow-[0_0_40px_rgba(0,200,83,0.2),0_20px_60px_-15px_rgba(0,200,83,0.1)]",
  teal: "hover:shadow-[0_0_40px_rgba(90,200,250,0.2),0_20px_60px_-15px_rgba(90,200,250,0.1)]",
  purple: "hover:shadow-[0_0_40px_rgba(175,82,222,0.2),0_20px_60px_-15px_rgba(175,82,222,0.1)]",
  orange: "hover:shadow-[0_0_40px_rgba(255,149,0,0.2),0_20px_60px_-15px_rgba(255,149,0,0.1)]",
  // Healthcare semantic glows
  primary: "hover:shadow-[0_0_40px_rgba(0,102,255,0.25),0_20px_60px_-15px_rgba(0,102,255,0.15)]",
  success: "hover:shadow-[0_0_40px_rgba(0,200,83,0.25),0_20px_60px_-15px_rgba(0,200,83,0.15)]",
  warning: "hover:shadow-[0_0_40px_rgba(255,149,0,0.25),0_20px_60px_-15px_rgba(255,149,0,0.15)]",
  critical: "hover:shadow-[0_0_40px_rgba(255,59,48,0.25),0_20px_60px_-15px_rgba(255,59,48,0.15)]",
  info: "hover:shadow-[0_0_40px_rgba(90,200,250,0.25),0_20px_60px_-15px_rgba(90,200,250,0.15)]",
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({
    className,
    variant = "default",
    hover = true,
    glow = "none",
    specular = true,
    interactive = true,
    rimLight = true,
    dimming = false,
    children,
    ...props
  }, ref) => {
    // iOS 2026 radius based on variant (using glass utility classes)
    const radiusClass = variant === "elevated" ? "rounded-glass-lg" : "rounded-glass"

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={hover && interactive ? {
          scale: 1.02,
          transition: { duration: 0.2, ease: [0.25, 1, 0.5, 1] }
        } : undefined}
        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
        className={cn(
          // Base styles with iOS 26 radius
          "relative p-6 overflow-hidden",
          radiusClass,
          "transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]",
          // Variant styles
          variantClasses[variant],
          // Specular highlight (use clear specular on clear variant)
          specular && (variant === "clear" ? "liquid-glass-specular-clear" : "liquid-glass-specular"),
          // Rim light effect
          rimLight && "rim-light-ios26",
          // Subtle inner glow and noise for realism
          "inner-glow-ios26 noise-grain",
          // Glow effect
          glowClasses[glow],
          // Dimming layer
          dimming && "liquid-glass-dim",
          // Text styles
          "text-slate-800 dark:text-white font-sans",
          className
        )}
        {...props}
      >
        {/* Content */}
        <div className="relative z-10">
          {children as React.ReactNode}
        </div>
      </motion.div>
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
export type { GlassCardProps, GlassCardVariant }
