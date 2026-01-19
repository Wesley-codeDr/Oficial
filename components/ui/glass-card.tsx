"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { applePhysics } from "@/lib/design-system/animation-tokens"

/**
 * Apple Liquid Glass iOS 26 Material Variants
 * Universal: blur(40px) saturate(180%)
 */
type GlassCardVariant = "default" | "regular" | "clear" | "elevated" | "medical" | "subtle" | "dark" | "light"

interface GlassCardProps extends HTMLMotionProps<"div"> {
  /**
   * Material variant following Apple Liquid Glass iOS 26 HIG
   * - default/regular: For most UI components (40px blur, 0.2 opacity)
   * - clear: For components over photos/videos/rich backgrounds (40px blur, 0.15 opacity)
   * - elevated: For modals, floating panels (40px blur, 0.25 opacity)
   * - medical: Medical-themed with blue tint
   * - subtle: More transparent, lighter feel
   * - dark: Dark background variant
   * - light: Light background variant
   */
  variant?: GlassCardVariant
  hover?: boolean
  glow?: "none" | "blue" | "green" | "teal" | "purple" | "orange"
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
  default: [
    "backdrop-blur-[40px] saturate-[180%]",
    "bg-[linear-gradient(135deg,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0.1)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(30,30,30,0.25)_0%,rgba(30,30,30,0.15)_100%)]",
    "border border-white/30 dark:border-white/15",
    "shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.2)]",
    "dark:shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.1)]",
  ].join(" "),
  regular: [
    "backdrop-blur-[40px] saturate-[180%]",
    "bg-[linear-gradient(135deg,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0.1)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(30,30,30,0.25)_0%,rgba(30,30,30,0.15)_100%)]",
    "border border-white/30 dark:border-white/15",
    "shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.2)]",
    "dark:shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.1)]",
  ].join(" "),
  clear: [
    "backdrop-blur-[40px] saturate-[180%]",
    "bg-white/15 dark:bg-[rgba(30,30,30,0.18)]",
    "border border-white/25 dark:border-white/10",
    "shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.15)]",
    "dark:shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.08)]",
  ].join(" "),
  elevated: [
    "backdrop-blur-[40px] saturate-[180%]",
    "bg-[linear-gradient(135deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0.15)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(30,30,30,0.32)_0%,rgba(30,30,30,0.2)_100%)]",
    "border border-white/40 dark:border-white/20",
    "shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.2)]",
    "dark:shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.1)]",
  ].join(" "),
  medical: [
    "backdrop-blur-[40px] saturate-[180%]",
    "bg-[rgba(0,122,255,0.08)] dark:bg-[rgba(0,122,255,0.12)]",
    "border border-[rgba(0,122,255,0.15)] dark:border-[rgba(0,122,255,0.2)]",
    "shadow-[0_8px_32px_rgba(0,122,255,0.1),inset_0_1px_1px_rgba(255,255,255,0.2)]",
    "dark:shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.1)]",
  ].join(" "),
  subtle: [
    "backdrop-blur-[40px] saturate-[180%]",
    "bg-white/15 dark:bg-[rgba(30,30,30,0.18)]",
    "border border-white/20 dark:border-white/10",
    "shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.15)]",
    "dark:shadow-[0_8px_32px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.05)]",
  ].join(" "),
  dark: [
    "backdrop-blur-[40px] saturate-[180%]",
    "bg-[rgba(30,30,30,0.35)] dark:bg-[rgba(15,15,15,0.45)]",
    "border border-white/10 dark:border-white/08",
    "shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.08)]",
  ].join(" "),
  light: [
    "backdrop-blur-[40px] saturate-[180%]",
    "bg-white/40 dark:bg-[rgba(30,30,30,0.35)]",
    "border border-white/40 dark:border-white/15",
    "shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.4)]",
    "dark:shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.1)]",
  ].join(" "),
}

const glowClasses = {
  none: "",
  blue: "hover:shadow-[0_0_32px_rgba(0,122,255,0.12),0_8px_32px_rgba(0,0,0,0.1)]",
  green: "hover:shadow-[0_0_32px_rgba(52,199,89,0.12),0_8px_32px_rgba(0,0,0,0.1)]",
  teal: "hover:shadow-[0_0_32px_rgba(90,200,250,0.12),0_8px_32px_rgba(0,0,0,0.1)]",
  purple: "hover:shadow-[0_0_32px_rgba(175,82,222,0.12),0_8px_32px_rgba(0,0,0,0.1)]",
  orange: "hover:shadow-[0_0_32px_rgba(255,149,0,0.12),0_8px_32px_rgba(0,0,0,0.1)]",
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
    // iOS 26 radius based on variant (24px standard, 28px elevated)
    const radiusClass = variant === "elevated" ? "rounded-[28px]" : "rounded-[24px]"
    const innerRadiusClass = variant === "elevated" ? "rounded-[26px]" : "rounded-[22px]"

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
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.02] z-[1]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Enhanced Specular highlight - iOS 26 style with more depth */}
        {specular && (
          <>
            {/* Primary specular reflection */}
            <div
              className={cn("absolute top-0 left-[5%] right-[5%] h-[50%] pointer-events-none z-[20]", innerRadiusClass)}
              style={{
                background: variant === "clear"
                  ? 'radial-gradient(ellipse 70% 35% at 50% 0%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 35%, transparent 65%)'
                  : 'radial-gradient(ellipse 85% 45% at 50% 0%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.35) 30%, rgba(255,255,255,0.12) 50%, transparent 75%)',
                opacity: variant === "clear" ? 0.5 : 0.9,
                filter: 'blur(0.5px)',
              }}
            />
            {/* Secondary softer glow for realism */}
            <div
              className={cn("absolute top-0 left-[10%] right-[10%] h-[35%] pointer-events-none z-[19]", innerRadiusClass)}
              style={{
                background: 'radial-gradient(ellipse 70% 35% at 50% 0%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.15) 40%, transparent 70%)',
                opacity: variant === "clear" ? 0.3 : 0.6,
              }}
            />
          </>
        )}

        {/* Enhanced Rim light effect with dynamic gradients */}
        {rimLight && (
          <>
            <div
              className={cn("absolute inset-0 pointer-events-none z-[50] opacity-90 dark:opacity-50", radiusClass)}
              style={{
                padding: '1.5px',
                background: `
                  conic-gradient(
                    from 45deg at 50% 50%,
                    rgba(255,255,255,1) 0deg,
                    rgba(255,255,255,0.7) 30deg,
                    rgba(255,255,255,0.5) 60deg,
                    rgba(255,255,255,0.25) 90deg,
                    rgba(255,255,255,0.15) 120deg,
                    rgba(255,255,255,0.2) 150deg,
                    rgba(255,255,255,0.4) 180deg,
                    rgba(255,255,255,0.6) 210deg,
                    rgba(255,255,255,0.85) 240deg,
                    rgba(255,255,255,1) 270deg,
                    rgba(255,255,255,0.7) 300deg,
                    rgba(255,255,255,0.5) 330deg,
                    rgba(255,255,255,1) 360deg
                  )
                `,
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                filter: 'blur(0.5px)',
              }}
            />
            {/* Inner rim glow for extra depth */}
            <div
              className={cn("absolute inset-[2px] pointer-events-none z-[49] opacity-60 dark:opacity-30", innerRadiusClass)}
              style={{
                padding: '1px',
                background: 'conic-gradient(from 90deg at 50% 50%, rgba(255,255,255,0.4) 0deg, rgba(255,255,255,0.1) 90deg, rgba(255,255,255,0.05) 180deg, rgba(255,255,255,0.3) 270deg, rgba(255,255,255,0.4) 360deg)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
          </>
        )}

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
