"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Apple Liquid Glass 2026 Input Variants
 * Universal: blur(50px) saturate(200%)
 * Healthcare variants use iOS 26 semantic colors
 */
type GlassInputVariant =
  | "default" | "clear" | "elevated" | "medical" | "subtle"
  | "healthcare-primary" | "healthcare-success" | "healthcare-warning" | "healthcare-critical"
type GlassInputSize = "sm" | "md" | "lg"

interface GlassInputProps extends Omit<HTMLMotionProps<"input">, "variant" | "size"> {
  /**
   * Material variant following Apple Liquid Glass 2026 HIG
   * - default: Standard input (50px blur, 0.28 opacity)
   * - clear: For inputs over photos/videos/rich backgrounds (50px blur, 0.15 opacity)
   * - elevated: For prominent inputs (50px blur, 0.35 opacity)
   * - medical: Medical-themed with blue tint
   * - subtle: More transparent, lighter feel (50px blur, 0.22 opacity)
   */
  variant?: GlassInputVariant
  size?: GlassInputSize
  label?: string
  error?: boolean
  errorMessage?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  rightIconLabel?: string
  onRightIconClick?: () => void
  /**
   * Enable inner glow effect
   */
  innerGlow?: boolean
  /**
   * Enable rim light border effect
   */
  rimLight?: boolean
}

const variantClasses: Record<GlassInputVariant, string> = {
  default: [
    "liquid-glass-default",
    "bg-[linear-gradient(135deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,calc(var(--glass-bg-opacity-regular)*0.7))_50%,rgba(255,255,255,calc(var(--glass-bg-opacity-regular)*0.8))_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(30,41,59,var(--glass-bg-opacity-dark))_0%,rgba(30,41,59,calc(var(--glass-bg-opacity-dark)*0.8))_50%,rgba(30,41,59,var(--glass-bg-opacity-dark))_100%)]",
    "border border-white/35 dark:border-white/20",
    "shadow-[0_8px_24px_-8px_var(--color-shadow),0_4px_12px_-4px_var(--color-shadow-subtle),inset_0_0_1px_rgba(255,255,255,0.6),inset_0_1px_0_rgba(255,255,255,0.8)]",
  ].join(" "),
  clear: [
    "liquid-glass-clear",
    "bg-[linear-gradient(135deg,rgba(255,255,255,var(--glass-bg-opacity-clear))_0%,rgba(255,255,255,calc(var(--glass-bg-opacity-clear)*0.6))_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(30,41,59,calc(var(--glass-bg-opacity-clear)*1.2))_0%,rgba(30,41,59,calc(var(--glass-bg-opacity-clear)*0.7))_100%)]",
    "border border-white/30 dark:border-white/15",
    "shadow-[0_8px_24px_-8px_var(--color-shadow),0_4px_12px_-4px_var(--color-shadow-subtle),inset_0_0_1px_rgba(255,255,255,0.5),inset_0_1px_0_rgba(255,255,255,0.7)]",
  ].join(" "),
  elevated: [
    "liquid-glass-elevated",
    "bg-[linear-gradient(135deg,rgba(255,255,255,var(--glass-bg-opacity-elevated))_0%,rgba(255,255,255,calc(var(--glass-bg-opacity-elevated)*0.7))_50%,rgba(255,255,255,calc(var(--glass-bg-opacity-elevated)*0.85))_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(30,41,59,calc(var(--glass-bg-opacity-elevated)*1.3))_0%,rgba(30,41,59,calc(var(--glass-bg-opacity-elevated)*1.1))_50%,rgba(30,41,59,calc(var(--glass-bg-opacity-elevated)*1.3))_100%)]",
    "border border-white/45 dark:border-white/25",
    "shadow-[0_12px_32px_-10px_var(--color-shadow-elevated),0_6px_20px_-6px_var(--color-shadow-subtle),inset_0_0_1px_rgba(255,255,255,0.7),inset_0_1px_0_rgba(255,255,255,0.9)]",
  ].join(" "),
  medical: [
    "liquid-glass-default",
    "bg-[linear-gradient(135deg,rgba(0,122,255,var(--glass-bg-opacity-medical))_0%,rgba(0,122,255,calc(var(--glass-bg-opacity-medical)*0.7))_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(0,122,255,calc(var(--glass-bg-opacity-medical)*1.3))_0%,rgba(0,122,255,calc(var(--glass-bg-opacity-medical)*0.9))_100%)]",
    "border border-[rgba(0,122,255,0.25)] dark:border-[rgba(0,122,255,0.3)]",
    "shadow-[0_8px_24px_-8px_rgba(0,122,255,0.15),0_4px_12px_-4px_rgba(0,122,255,0.08),inset_0_0_1px_rgba(255,255,255,0.6),inset_0_1px_0_rgba(0,122,255,0.1)]",
  ].join(" "),
  subtle: [
    "liquid-glass-subtle",
    "bg-[linear-gradient(135deg,rgba(255,255,255,var(--glass-bg-opacity-subtle))_0%,rgba(255,255,255,calc(var(--glass-bg-opacity-subtle)*0.6))_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(30,41,59,calc(var(--glass-bg-opacity-subtle)*1.2))_0%,rgba(30,41,59,calc(var(--glass-bg-opacity-subtle)*0.7))_100%)]",
    "border border-white/25 dark:border-white/12",
    "shadow-[0_6px_20px_-6px_var(--color-shadow),0_3px_12px_-3px_var(--color-shadow-subtle),inset_0_0_1px_rgba(255,255,255,0.5),inset_0_1px_0_rgba(255,255,255,0.7)]",
  ].join(" "),
  // iOS 26 Healthcare Semantic Input Variants
  "healthcare-primary": [
    "backdrop-blur-glass",
    "bg-healthcare-primary-glass",
    "dark:bg-[linear-gradient(135deg,rgba(59,130,246,0.1)_0%,rgba(59,130,246,0.06)_100%)]",
    "border border-healthcare-primary/20 dark:border-healthcare-primary-dark/25",
    "shadow-glass-light dark:shadow-glass-dark",
    "focus-within:border-healthcare-primary/40 dark:focus-within:border-healthcare-primary-dark/50",
  ].join(" "),
  "healthcare-success": [
    "backdrop-blur-glass",
    "bg-healthcare-success-glass",
    "dark:bg-[linear-gradient(135deg,rgba(0,200,83,0.1)_0%,rgba(0,200,83,0.06)_100%)]",
    "border border-healthcare-success/20 dark:border-healthcare-success-dark/25",
    "shadow-glass-light dark:shadow-glass-dark",
    "focus-within:border-healthcare-success/40 dark:focus-within:border-healthcare-success-dark/50",
  ].join(" "),
  "healthcare-warning": [
    "backdrop-blur-glass",
    "bg-healthcare-warning-glass",
    "dark:bg-[linear-gradient(135deg,rgba(255,149,0,0.1)_0%,rgba(255,149,0,0.06)_100%)]",
    "border border-healthcare-warning/20 dark:border-healthcare-warning-dark/25",
    "shadow-glass-light dark:shadow-glass-dark",
    "focus-within:border-healthcare-warning/40 dark:focus-within:border-healthcare-warning-dark/50",
  ].join(" "),
  "healthcare-critical": [
    "backdrop-blur-glass",
    "bg-healthcare-critical-glass",
    "dark:bg-[linear-gradient(135deg,rgba(255,59,48,0.1)_0%,rgba(255,59,48,0.06)_100%)]",
    "border border-healthcare-critical/20 dark:border-healthcare-critical-dark/25",
    "shadow-glass-light dark:shadow-glass-dark",
    "focus-within:border-healthcare-critical/40 dark:focus-within:border-healthcare-critical-dark/50",
  ].join(" "),
}

const sizeClasses: Record<GlassInputSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-base",
  lg: "h-13 px-5 text-lg",
}

const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({
    className,
    variant = "default",
    size = "md",
    label,
    error = false,
    errorMessage,
    leftIcon,
    rightIcon,
    rightIconLabel,
    onRightIconClick,
    innerGlow = true,
    rimLight = true,
    type = "text",
    id,
    ...props
  }, ref) => {
    // iOS 2026 radius: 14px for inputs (glass-sm)
    const radiusClass = "rounded-glass-sm"
    const uniqueId = React.useId()
    const inputId = id || uniqueId
    const errorId = `${inputId}-error`

    return (
      <div className="relative w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-slate-400 dark:text-slate-500">
              {leftIcon}
            </div>
          )}

          {/* Input Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className={cn(
              "relative overflow-hidden",
              radiusClass,
              "transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]",
              // Variant styles
              variantClasses[variant],
              // Error state
              error && "border-red-400 dark:border-red-500",
              // Text styles
              "text-slate-800 dark:text-white font-sans",
              className
            )}
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
                  background: variant === "medical" || variant === "healthcare-primary"
                    ? 'radial-gradient(circle at center, rgba(0,102,255,0.15) 0%, transparent 70%)'
                    : variant === "healthcare-success"
                    ? 'radial-gradient(circle at center, rgba(0,200,83,0.15) 0%, transparent 70%)'
                    : variant === "healthcare-warning"
                    ? 'radial-gradient(circle at center, rgba(255,149,0,0.15) 0%, transparent 70%)'
                    : variant === "healthcare-critical"
                    ? 'radial-gradient(circle at center, rgba(255,59,48,0.15) 0%, transparent 70%)'
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

            {/* Actual Input */}
            <input
              ref={ref}
              id={inputId}
              type={type}
              aria-invalid={error ? "true" : undefined}
              aria-describedby={error && errorMessage ? errorId : undefined}
              className={cn(
                "relative z-10 w-full bg-transparent outline-none",
                sizeClasses[size],
                leftIcon && "pl-10",
                rightIcon && "pr-10",
                "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                error && "text-red-600 dark:text-red-400",
                "transition-all duration-200",
                className
              )}
              {...props}
            />

            {/* Right Icon */}
            {rightIcon && (
              <button
                type="button"
                onClick={onRightIconClick}
                aria-label={rightIconLabel}
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 z-10 text-slate-400 dark:text-slate-500",
                  "transition-colors duration-200",
                  onRightIconClick && "hover:text-slate-600 dark:hover:text-slate-400"
                )}
              >
                {rightIcon}
              </button>
            )}
          </motion.div>

          {/* Error Message */}
          {error && errorMessage && (
            <motion.p
              id={errorId}
              role="alert"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 dark:text-red-400"
            >
              {errorMessage}
            </motion.p>
          )}
        </div>
      </div>
    )
  }
)
GlassInput.displayName = "GlassInput"

export { GlassInput }
export type { GlassInputProps, GlassInputVariant, GlassInputSize }
