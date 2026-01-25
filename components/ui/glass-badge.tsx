"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Apple Liquid Glass 2026 Badge Variants
 * Universal: blur(50px) saturate(200%)
 * Healthcare variants use iOS 26 semantic colors
 */
type GlassBadgeVariant =
  | "default" | "primary" | "secondary" | "medical" | "danger" | "success" | "warning"
  | "healthcare-primary" | "healthcare-success" | "healthcare-warning" | "healthcare-critical" | "healthcare-info" | "healthcare-neutral"
type GlassBadgeSize = "sm" | "md" | "lg"

interface GlassBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Material variant following Apple Liquid Glass 2026 HIG
   * - default: Standard badge (50px blur, 0.28 opacity)
   * - primary: Primary badge with blue tint
   * - secondary: Secondary badge (50px blur, 0.22 opacity)
   * - medical: Medical-themed with blue tint
   * - danger: Destructive with red tint
   * - success: Success state with green tint
   * - warning: Warning state with orange tint
   */
  variant?: GlassBadgeVariant
  size?: GlassBadgeSize
  children: React.ReactNode
  /**
   * Enable inner glow effect
   */
  innerGlow?: boolean
  /**
   * Enable rim light border effect
   */
  rimLight?: boolean
}

const variantClasses: Record<GlassBadgeVariant, string> = {
  default: [
    "liquid-glass-default",
    "bg-[linear-gradient(135deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,calc(var(--glass-bg-opacity-regular)*0.7))_50%,rgba(255,255,255,calc(var(--glass-bg-opacity-regular)*0.8))_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(30,41,59,var(--glass-bg-opacity-dark))_0%,rgba(30,41,59,calc(var(--glass-bg-opacity-dark)*0.8))_50%,rgba(30,41,59,var(--glass-bg-opacity-dark))_100%)]",
    "border border-white/35 dark:border-white/20",
    "shadow-[0_4px_12px_-4px_var(--color-shadow),0_2px_6px_-2px_var(--color-shadow-subtle),inset_0_0_1px_rgba(255,255,255,0.6),inset_0_1px_0_rgba(255,255,255,0.8)]",
    "text-slate-700 dark:text-slate-200",
  ].join(" "),
  primary: [
    "liquid-glass-default",
    "bg-[linear-gradient(135deg,rgba(0,122,255,0.85)_0%,rgba(0,122,255,0.75)_50%,rgba(0,122,255,0.85)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(0,122,255,0.95)_0%,rgba(0,122,255,0.85)_50%,rgba(0,122,255,0.95)_100%)]",
    "border border-[rgba(0,122,255,0.4)] dark:border-[rgba(0,122,255,0.5)]",
    "shadow-[0_6px_16px_-6px_rgba(0,122,255,0.25),0_3px_8px_-3px_rgba(0,122,255,0.15),inset_0_0_1px_rgba(255,255,255,0.7),inset_0_1px_0_rgba(0,122,255,0.2)]",
    "text-white dark:text-white",
  ].join(" "),
  secondary: [
    "liquid-glass-default",
    "bg-[linear-gradient(135deg,rgba(255,255,255,var(--glass-bg-opacity-subtle))_0%,rgba(255,255,255,calc(var(--glass-bg-opacity-subtle)*0.6))_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(30,41,59,calc(var(--glass-bg-opacity-subtle)*1.2))_0%,rgba(30,41,59,calc(var(--glass-bg-opacity-subtle)*0.7))_100%)]",
    "border border-white/25 dark:border-white/12",
    "shadow-[0_4px_12px_-4px_var(--color-shadow),0_2px_6px_-2px_var(--color-shadow-subtle),inset_0_0_1px_rgba(255,255,255,0.5),inset_0_1px_0_rgba(255,255,255,0.7)]",
    "text-slate-600 dark:text-slate-300",
  ].join(" "),
  medical: [
    "liquid-glass-default",
    "bg-[linear-gradient(135deg,rgba(0,122,255,var(--glass-bg-opacity-medical))_0%,rgba(0,122,255,calc(var(--glass-bg-opacity-medical)*0.7))_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(0,122,255,calc(var(--glass-bg-opacity-medical)*1.3))_0%,rgba(0,122,255,calc(var(--glass-bg-opacity-medical)*0.9))_100%)]",
    "border border-[rgba(0,122,255,0.25)] dark:border-[rgba(0,122,255,0.3)]",
    "shadow-[0_4px_12px_-4px_rgba(0,122,255,0.15),0_2px_6px_-2px_rgba(0,122,255,0.08),inset_0_0_1px_rgba(255,255,255,0.6),inset_0_1px_0_rgba(0,122,255,0.1)]",
    "text-blue-600 dark:text-blue-400",
  ].join(" "),
  danger: [
    "liquid-glass-default",
    "bg-[linear-gradient(135deg,rgba(255,59,48,0.85)_0%,rgba(255,59,48,0.75)_50%,rgba(255,59,48,0.85)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(255,69,58,0.95)_0%,rgba(255,69,58,0.85)_50%,rgba(255,69,58,0.95)_100%)]",
    "border border-[rgba(255,59,48,0.4)] dark:border-[rgba(255,69,58,0.5)]",
    "shadow-[0_6px_16px_-6px_rgba(255,59,48,0.25),0_3px_8px_-3px_rgba(255,59,48,0.15),inset_0_0_1px_rgba(255,255,255,0.7),inset_0_1px_0_rgba(255,59,48,0.2)]",
    "text-red-600 dark:text-red-400",
  ].join(" "),
  success: [
    "liquid-glass-default",
    "bg-[linear-gradient(135deg,rgba(52,199,89,0.85)_0%,rgba(52,199,89,0.75)_50%,rgba(52,199,89,0.85)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(52,199,89,0.95)_0%,rgba(52,199,89,0.85)_50%,rgba(52,199,89,0.95)_100%)]",
    "border border-[rgba(52,199,89,0.4)] dark:border-[rgba(52,199,89,0.5)]",
    "shadow-[0_6px_16px_-6px_rgba(52,199,89,0.25),0_3px_8px_-3px_rgba(52,199,89,0.15),inset_0_0_1px_rgba(255,255,255,0.7),inset_0_1px_0_rgba(52,199,89,0.2)]",
    "text-green-600 dark:text-green-400",
  ].join(" "),
  warning: [
    "liquid-glass-default",
    "bg-[linear-gradient(135deg,rgba(255,149,0,0.85)_0%,rgba(255,149,0,0.75)_50%,rgba(255,149,0,0.85)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(255,159,64,0.95)_0%,rgba(255,159,64,0.85)_50%,rgba(255,159,64,0.95)_100%)]",
    "border border-[rgba(255,149,0,0.4)] dark:border-[rgba(255,159,64,0.5)]",
    "shadow-[0_6px_16px_-6px_rgba(255,149,0,0.25),0_3px_8px_-3px_rgba(255,149,0,0.15),inset_0_0_1px_rgba(255,255,255,0.7),inset_0_1px_0_rgba(255,149,0,0.2)]",
    "text-orange-600 dark:text-orange-400",
  ].join(" "),
  // iOS 26 Healthcare Semantic Badge Variants (glass-style)
  "healthcare-primary": [
    "backdrop-blur-glass",
    "bg-healthcare-primary-glass",
    "dark:bg-[linear-gradient(135deg,rgba(59,130,246,0.15)_0%,rgba(59,130,246,0.1)_100%)]",
    "border border-healthcare-primary/25 dark:border-healthcare-primary-dark/30",
    "shadow-glass-light dark:shadow-glass-dark",
    "text-healthcare-primary dark:text-healthcare-primary-dark",
  ].join(" "),
  "healthcare-success": [
    "backdrop-blur-glass",
    "bg-healthcare-success-glass",
    "dark:bg-[linear-gradient(135deg,rgba(0,200,83,0.15)_0%,rgba(0,200,83,0.1)_100%)]",
    "border border-healthcare-success/25 dark:border-healthcare-success-dark/30",
    "shadow-glass-light dark:shadow-glass-dark",
    "text-healthcare-success dark:text-healthcare-success-dark",
  ].join(" "),
  "healthcare-warning": [
    "backdrop-blur-glass",
    "bg-healthcare-warning-glass",
    "dark:bg-[linear-gradient(135deg,rgba(255,149,0,0.15)_0%,rgba(255,149,0,0.1)_100%)]",
    "border border-healthcare-warning/25 dark:border-healthcare-warning-dark/30",
    "shadow-glass-light dark:shadow-glass-dark",
    "text-healthcare-warning dark:text-healthcare-warning-dark",
  ].join(" "),
  "healthcare-critical": [
    "backdrop-blur-glass",
    "bg-healthcare-critical-glass",
    "dark:bg-[linear-gradient(135deg,rgba(255,59,48,0.15)_0%,rgba(255,59,48,0.1)_100%)]",
    "border border-healthcare-critical/25 dark:border-healthcare-critical-dark/30",
    "shadow-glass-light dark:shadow-glass-dark",
    "text-healthcare-critical dark:text-healthcare-critical-dark",
  ].join(" "),
  "healthcare-info": [
    "backdrop-blur-glass",
    "bg-healthcare-info-glass",
    "dark:bg-[linear-gradient(135deg,rgba(90,200,250,0.15)_0%,rgba(90,200,250,0.1)_100%)]",
    "border border-healthcare-info/25 dark:border-healthcare-info-dark/30",
    "shadow-glass-light dark:shadow-glass-dark",
    "text-healthcare-info dark:text-healthcare-info-dark",
  ].join(" "),
  "healthcare-neutral": [
    "backdrop-blur-glass",
    "bg-healthcare-neutral-glass",
    "dark:bg-[linear-gradient(135deg,rgba(142,142,147,0.15)_0%,rgba(142,142,147,0.1)_100%)]",
    "border border-healthcare-neutral/25 dark:border-healthcare-neutral-dark/30",
    "shadow-glass-light dark:shadow-glass-dark",
    "text-healthcare-neutral dark:text-healthcare-neutral-dark",
  ].join(" "),
}

const sizeClasses: Record<GlassBadgeSize, string> = {
  sm: "h-6 px-2 text-xs font-medium",
  md: "h-7 px-3 text-sm font-medium",
  lg: "h-8 px-4 text-base font-medium",
}

const GlassBadge = React.forwardRef<HTMLDivElement, GlassBadgeProps>(
  ({
    className,
    variant = "default",
    size = "md",
    children,
    innerGlow = true,
    rimLight = true,
    ...props
  }, ref) => {
    // iOS 2026 radius: 12px for badges
    const radiusClass = "rounded-[12px]"

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden font-medium",
          radiusClass,
          "transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]",
          // Variant styles
          variantClasses[variant],
          // Size styles
          sizeClasses[size],
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

        {/* Inner Glow Effect */}
        {innerGlow && (
          <div
            className={cn("absolute inset-0 pointer-events-none z-[2]", radiusClass)}
            style={{
              background: variant === "primary" || variant === "healthcare-primary"
                ? 'radial-gradient(circle at center, rgba(0,102,255,0.15) 0%, transparent 70%)'
                : variant === "medical"
                ? 'radial-gradient(circle at center, rgba(0,102,255,0.15) 0%, transparent 70%)'
                : variant === "danger" || variant === "healthcare-critical"
                ? 'radial-gradient(circle at center, rgba(255,59,48,0.15) 0%, transparent 70%)'
                : variant === "success" || variant === "healthcare-success"
                ? 'radial-gradient(circle at center, rgba(0,200,83,0.15) 0%, transparent 70%)'
                : variant === "warning" || variant === "healthcare-warning"
                ? 'radial-gradient(circle at center, rgba(255,149,0,0.15) 0%, transparent 70%)'
                : variant === "healthcare-info"
                ? 'radial-gradient(circle at center, rgba(90,200,250,0.15) 0%, transparent 70%)'
                : variant === "healthcare-neutral"
                ? 'radial-gradient(circle at center, rgba(142,142,147,0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
              opacity: 0.6,
            }}
          />
        )}

        {/* Rim Light Effect */}
        {rimLight && (
          <div
            className={cn("absolute inset-0 pointer-events-none z-[50] opacity-80 dark:opacity-40", radiusClass)}
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
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
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
GlassBadge.displayName = "GlassBadge"

export { GlassBadge }
export type { GlassBadgeProps, GlassBadgeVariant, GlassBadgeSize }
