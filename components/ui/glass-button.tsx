"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Apple Liquid Glass 2026 Button Variants
 * Universal: blur(50px) saturate(200%)
 * Healthcare variants use iOS 26 semantic colors
 */
type GlassButtonVariant =
  | "default" | "primary" | "secondary" | "medical" | "danger"
  | "healthcare-success" | "healthcare-warning" | "healthcare-critical" | "healthcare-info"
type GlassButtonSize = "sm" | "md" | "lg"

interface GlassButtonProps extends Omit<HTMLMotionProps<"button">, "variant" | "size"> {
  /**
   * Material variant following Apple Liquid Glass 2026 HIG
   * - default: Standard button (50px blur, 0.28 opacity)
   * - primary: Primary action button with blue tint
   * - secondary: Secondary action button (50px blur, 0.22 opacity)
   * - medical: Medical-themed with blue tint
   * - danger: Destructive action with red tint
   */
  variant?: GlassButtonVariant
  size?: GlassButtonSize
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
  /**
   * Enable inner glow effect
   */
  innerGlow?: boolean
  /**
   * Enable rim light border effect
   */
  rimLight?: boolean
  /**
   * Enable haptic feedback visual
   */
  haptic?: boolean
}

const variantClasses: Record<GlassButtonVariant, string> = {
  default: [
    "liquid-glass-default",
    "bg-[linear-gradient(135deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,calc(var(--glass-bg-opacity-regular)*0.7))_50%,rgba(255,255,255,calc(var(--glass-bg-opacity-regular)*0.8))_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(30,41,59,var(--glass-bg-opacity-dark))_0%,rgba(30,41,59,calc(var(--glass-bg-opacity-dark)*0.8))_50%,rgba(30,41,59,var(--glass-bg-opacity-dark))_100%)]",
    "border border-white/35 dark:border-white/20",
    "shadow-[0_8px_24px_-8px_var(--color-shadow),0_4px_12px_-4px_var(--color-shadow-subtle),inset_0_0_1px_rgba(255,255,255,0.6),inset_0_1px_0_rgba(255,255,255,0.8)]",
    "text-slate-800 dark:text-white hover:text-slate-900 dark:hover:text-slate-100",
  ].join(" "),
  primary: [
    "liquid-glass-default",
    "bg-[linear-gradient(135deg,rgba(0,122,255,0.85)_0%,rgba(0,122,255,0.75)_50%,rgba(0,122,255,0.85)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(0,122,255,0.95)_0%,rgba(0,122,255,0.85)_50%,rgba(0,122,255,0.95)_100%)]",
    "border border-[rgba(0,122,255,0.4)] dark:border-[rgba(0,122,255,0.5)]",
    "shadow-[0_12px_32px_-10px_rgba(0,122,255,0.25),0_6px_20px_-6px_rgba(0,122,255,0.15),inset_0_0_1px_rgba(255,255,255,0.7),inset_0_1px_0_rgba(0,122,255,0.2)]",
    "text-white dark:text-white hover:text-white",
  ].join(" "),
  secondary: [
    "liquid-glass-default",
    "bg-[linear-gradient(135deg,rgba(255,255,255,var(--glass-bg-opacity-subtle))_0%,rgba(255,255,255,calc(var(--glass-bg-opacity-subtle)*0.6))_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(30,41,59,calc(var(--glass-bg-opacity-subtle)*1.2))_0%,rgba(30,41,59,calc(var(--glass-bg-opacity-subtle)*0.7))_100%)]",
    "border border-white/25 dark:border-white/12",
    "shadow-[0_6px_20px_-6px_var(--color-shadow),0_3px_12px_-3px_var(--color-shadow-subtle),inset_0_0_1px_rgba(255,255,255,0.5),inset_0_1px_0_rgba(255,255,255,0.7)]",
    "text-slate-700 dark:text-slate-200 hover:text-slate-800 dark:hover:text-slate-100",
  ].join(" "),
  medical: [
    "liquid-glass-default",
    "bg-[linear-gradient(135deg,rgba(0,122,255,var(--glass-bg-opacity-medical))_0%,rgba(0,122,255,calc(var(--glass-bg-opacity-medical)*0.7))_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(0,122,255,calc(var(--glass-bg-opacity-medical)*1.3))_0%,rgba(0,122,255,calc(var(--glass-bg-opacity-medical)*0.9))_100%)]",
    "border border-[rgba(0,122,255,0.25)] dark:border-[rgba(0,122,255,0.3)]",
    "shadow-[0_8px_24px_-8px_rgba(0,122,255,0.15),0_4px_12px_-4px_rgba(0,122,255,0.08),inset_0_0_1px_rgba(255,255,255,0.6),inset_0_1px_0_rgba(0,122,255,0.1)]",
    "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
  ].join(" "),
  danger: [
    "liquid-glass-default",
    "bg-[linear-gradient(135deg,rgba(255,59,48,0.85)_0%,rgba(255,59,48,0.75)_50%,rgba(255,59,48,0.85)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(255,69,58,0.95)_0%,rgba(255,69,58,0.85)_50%,rgba(255,69,58,0.95)_100%)]",
    "border border-[rgba(255,59,48,0.4)] dark:border-[rgba(255,69,58,0.5)]",
    "shadow-[0_12px_32px_-10px_rgba(255,59,48,0.25),0_6px_20px_-6px_rgba(255,59,48,0.15),inset_0_0_1px_rgba(255,255,255,0.7),inset_0_1px_0_rgba(255,59,48,0.2)]",
    "text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300",
  ].join(" "),
  // iOS 26 Healthcare Semantic Button Variants
  "healthcare-success": [
    "backdrop-blur-glass",
    "bg-[linear-gradient(135deg,rgba(0,200,83,0.85)_0%,rgba(0,200,83,0.75)_50%,rgba(0,200,83,0.85)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(52,211,153,0.95)_0%,rgba(52,211,153,0.85)_50%,rgba(52,211,153,0.95)_100%)]",
    "border border-healthcare-success/40 dark:border-healthcare-success-dark/50",
    "shadow-[0_12px_32px_-10px_rgba(0,200,83,0.25),0_6px_20px_-6px_rgba(0,200,83,0.15),inset_0_0_1px_rgba(255,255,255,0.7),inset_0_1px_0_rgba(0,200,83,0.2)]",
    "text-white dark:text-white hover:text-white",
  ].join(" "),
  "healthcare-warning": [
    "backdrop-blur-glass",
    "bg-[linear-gradient(135deg,rgba(255,149,0,0.85)_0%,rgba(255,149,0,0.75)_50%,rgba(255,149,0,0.85)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(251,191,36,0.95)_0%,rgba(251,191,36,0.85)_50%,rgba(251,191,36,0.95)_100%)]",
    "border border-healthcare-warning/40 dark:border-healthcare-warning-dark/50",
    "shadow-[0_12px_32px_-10px_rgba(255,149,0,0.25),0_6px_20px_-6px_rgba(255,149,0,0.15),inset_0_0_1px_rgba(255,255,255,0.7),inset_0_1px_0_rgba(255,149,0,0.2)]",
    "text-white dark:text-slate-900 hover:text-white dark:hover:text-slate-900",
  ].join(" "),
  "healthcare-critical": [
    "backdrop-blur-glass",
    "bg-[linear-gradient(135deg,rgba(255,59,48,0.85)_0%,rgba(255,59,48,0.75)_50%,rgba(255,59,48,0.85)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(248,113,113,0.95)_0%,rgba(248,113,113,0.85)_50%,rgba(248,113,113,0.95)_100%)]",
    "border border-healthcare-critical/40 dark:border-healthcare-critical-dark/50",
    "shadow-[0_12px_32px_-10px_rgba(255,59,48,0.25),0_6px_20px_-6px_rgba(255,59,48,0.15),inset_0_0_1px_rgba(255,255,255,0.7),inset_0_1px_0_rgba(255,59,48,0.2)]",
    "text-white dark:text-white hover:text-white",
  ].join(" "),
  "healthcare-info": [
    "backdrop-blur-glass",
    "bg-[linear-gradient(135deg,rgba(90,200,250,0.85)_0%,rgba(90,200,250,0.75)_50%,rgba(90,200,250,0.85)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(103,232,249,0.95)_0%,rgba(103,232,249,0.85)_50%,rgba(103,232,249,0.95)_100%)]",
    "border border-healthcare-info/40 dark:border-healthcare-info-dark/50",
    "shadow-[0_12px_32px_-10px_rgba(90,200,250,0.25),0_6px_20px_-6px_rgba(90,200,250,0.15),inset_0_0_1px_rgba(255,255,255,0.7),inset_0_1px_0_rgba(90,200,250,0.2)]",
    "text-white dark:text-slate-900 hover:text-white dark:hover:text-slate-900",
  ].join(" "),
}

const sizeClasses: Record<GlassButtonSize, string> = {
  sm: "h-9 px-4 text-sm font-medium",
  md: "h-11 px-5 text-base font-medium",
  lg: "h-13 px-6 text-lg font-medium",
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({
    className,
    variant = "default",
    size = "md",
    leftIcon,
    rightIcon,
    loading = false,
    innerGlow = true,
    rimLight = true,
    haptic = true,
    disabled = false,
    children,
    ...props
  }, ref) => {
    // iOS 2026 radius: 14px for buttons (Level 7 hierarchy)
    const radiusClass = "rounded-[14px]"

    return (
      <motion.button
        ref={ref}
        disabled={disabled || loading}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={!disabled && !loading ? {
          scale: 1.05,
          transition: { duration: 0.2, ease: [0.25, 1, 0.5, 1] }
        } : undefined}
        whileTap={!disabled && !loading && haptic ? {
          scale: 0.95,
          transition: { duration: 0.1, ease: [0.25, 1, 0.5, 1] }
        } : undefined}
        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
        className={cn(
          "relative overflow-hidden font-medium",
          radiusClass,
          "transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]",
          // Variant styles
          variantClasses[variant],
          // Size styles
          sizeClasses[size],
          // Disabled state
          (disabled || loading) && "opacity-50 cursor-not-allowed",
          // Focus state
          "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2",
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
              background: variant === "primary"
                ? 'radial-gradient(circle at center, rgba(0,102,255,0.2) 0%, transparent 70%)'
                : variant === "medical"
                ? 'radial-gradient(circle at center, rgba(0,102,255,0.2) 0%, transparent 70%)'
                : variant === "danger" || variant === "healthcare-critical"
                ? 'radial-gradient(circle at center, rgba(255,59,48,0.2) 0%, transparent 70%)'
                : variant === "healthcare-success"
                ? 'radial-gradient(circle at center, rgba(0,200,83,0.2) 0%, transparent 70%)'
                : variant === "healthcare-warning"
                ? 'radial-gradient(circle at center, rgba(255,149,0,0.2) 0%, transparent 70%)'
                : variant === "healthcare-info"
                ? 'radial-gradient(circle at center, rgba(90,200,250,0.2) 0%, transparent 70%)'
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
              padding: '1px',
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

        {/* Button Content */}
        <div className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent animate-[spin_1s_linear_infinite]" />
            </div>
          ) : (
            <>
              {leftIcon && (
                <span className="flex items-center">
                  {leftIcon}
                </span>
              )}
              <span className="relative z-10">{children}</span>
              {rightIcon && (
                <span className="flex items-center">
                  {rightIcon}
                </span>
              )}
            </>
          )}
        </div>
      </motion.button>
    )
  }
)
GlassButton.displayName = "GlassButton"

export { GlassButton }
export type { GlassButtonProps, GlassButtonVariant, GlassButtonSize }
