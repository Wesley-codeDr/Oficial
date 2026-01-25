"use client"

import * as React from "react"
import { motion, HTMLMotionProps, useAnimation, Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { glassRadius, glassFocusRing, glassTransition } from "@/lib/design-system/glass-tokens"

// ==================== TYPES ====================

/**
 * Button variant types following Apple Liquid Glass 2026 design system
 */
export type GlassButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"

/**
 * Healthcare semantic button variants for medical contexts
 */
export type GlassButtonHealthcareVariant =
  | "healthcare-primary"
  | "healthcare-success"
  | "healthcare-warning"
  | "healthcare-critical"
  | "healthcare-info"

/**
 * Button size options
 */
export type GlassButtonSize = "sm" | "md" | "lg"

/**
 * Haptic feedback intensity levels
 * Each level has progressively more pronounced visual feedback
 */
export type GlassButtonHaptic = "light" | "medium" | "heavy" | false

export interface GlassButtonProps extends Omit<HTMLMotionProps<"button">, "variant" | "size"> {
  /**
   * Visual variant for the button
   * @default "default"
   */
  variant?: GlassButtonVariant

  /**
   * Healthcare semantic variant (overrides standard variant when set)
   * Use for medical contexts requiring semantic color coding
   */
  healthcareVariant?: GlassButtonHealthcareVariant

  /**
   * Button size preset
   * @default "md"
   */
  size?: GlassButtonSize

  /**
   * Icon to render on the left side of the button content
   */
  leftIcon?: React.ReactNode

  /**
   * Icon to render on the right side of the button content
   */
  rightIcon?: React.ReactNode

  /**
   * Loading state - shows spinner and disables interactions
   * @default false
   */
  loading?: boolean

  /**
   * Haptic visual feedback intensity on press
   * - light: Subtle bounce (200ms)
   * - medium: Moderate bounce (250ms)
   * - heavy: Pronounced bounce (350ms)
   * - false: No haptic feedback
   * @default "medium"
   */
  haptic?: GlassButtonHaptic

  /**
   * Enable rim light border effect
   * Creates a subtle conic gradient border for depth
   * @default false
   */
  rimLight?: boolean

  /**
   * Enable inner glow effect
   * Adds radial gradient glow based on variant color
   * @default true
   */
  innerGlow?: boolean
}

// ==================== VARIANT STYLES ====================

/**
 * CSS classes for each button variant
 * Uses CSS custom properties from liquid-glass-2026.css
 */
const variantStyles: Record<GlassButtonVariant, string> = {
  default: cn(
    // Base glass effect
    "liquid-glass-2026",
    // Background gradient
    "bg-[linear-gradient(135deg,rgba(255,255,255,var(--glass-bg-opacity-regular))_0%,rgba(255,255,255,calc(var(--glass-bg-opacity-regular)*0.7))_50%,rgba(255,255,255,calc(var(--glass-bg-opacity-regular)*0.8))_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(30,41,59,var(--glass-bg-opacity-dark))_0%,rgba(30,41,59,calc(var(--glass-bg-opacity-dark)*0.8))_50%,rgba(30,41,59,var(--glass-bg-opacity-dark))_100%)]",
    // Border
    "border border-white/35 dark:border-white/20",
    // Shadow
    "shadow-[0_8px_24px_-8px_var(--color-shadow),0_4px_12px_-4px_var(--color-shadow-subtle),inset_0_0_1px_rgba(255,255,255,0.6),inset_0_1px_0_rgba(255,255,255,0.8)]",
    // Text
    "text-slate-800 dark:text-white",
    "hover:text-slate-900 dark:hover:text-slate-100"
  ),

  primary: cn(
    "liquid-glass-2026",
    "bg-[linear-gradient(135deg,rgba(0,122,255,0.85)_0%,rgba(0,122,255,0.75)_50%,rgba(0,122,255,0.85)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(10,132,255,0.95)_0%,rgba(10,132,255,0.85)_50%,rgba(10,132,255,0.95)_100%)]",
    "border border-[rgba(0,122,255,0.4)] dark:border-[rgba(10,132,255,0.5)]",
    "shadow-[0_12px_32px_-10px_rgba(0,122,255,0.25),0_6px_20px_-6px_rgba(0,122,255,0.15),inset_0_0_1px_rgba(255,255,255,0.7),inset_0_1px_0_rgba(0,122,255,0.2)]",
    "text-white dark:text-white",
    "hover:bg-[linear-gradient(135deg,rgba(0,122,255,0.9)_0%,rgba(0,122,255,0.8)_50%,rgba(0,122,255,0.9)_100%)]"
  ),

  secondary: cn(
    "liquid-glass-2026",
    "bg-[linear-gradient(135deg,rgba(255,255,255,var(--glass-bg-opacity-subtle))_0%,rgba(255,255,255,calc(var(--glass-bg-opacity-subtle)*0.6))_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(30,41,59,calc(var(--glass-bg-opacity-subtle)*1.2))_0%,rgba(30,41,59,calc(var(--glass-bg-opacity-subtle)*0.7))_100%)]",
    "border border-white/25 dark:border-white/12",
    "shadow-[0_6px_20px_-6px_var(--color-shadow),0_3px_12px_-3px_var(--color-shadow-subtle),inset_0_0_1px_rgba(255,255,255,0.5),inset_0_1px_0_rgba(255,255,255,0.7)]",
    "text-slate-700 dark:text-slate-200",
    "hover:text-slate-800 dark:hover:text-slate-100",
    "hover:bg-white/30 dark:hover:bg-slate-700/40"
  ),

  ghost: cn(
    "bg-transparent",
    "border border-transparent",
    "hover:bg-white/20 dark:hover:bg-white/10",
    "hover:border-white/20 dark:hover:border-white/10",
    "text-slate-700 dark:text-slate-200",
    "hover:text-slate-900 dark:hover:text-slate-100",
    "shadow-none"
  ),

  danger: cn(
    "liquid-glass-2026",
    "bg-[linear-gradient(135deg,rgba(255,59,48,0.85)_0%,rgba(255,59,48,0.75)_50%,rgba(255,59,48,0.85)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(255,69,58,0.95)_0%,rgba(255,69,58,0.85)_50%,rgba(255,69,58,0.95)_100%)]",
    "border border-[rgba(255,59,48,0.4)] dark:border-[rgba(255,69,58,0.5)]",
    "shadow-[0_12px_32px_-10px_rgba(255,59,48,0.25),0_6px_20px_-6px_rgba(255,59,48,0.15),inset_0_0_1px_rgba(255,255,255,0.7),inset_0_1px_0_rgba(255,59,48,0.2)]",
    "text-white dark:text-white"
  ),
}

/**
 * CSS classes for healthcare semantic variants
 * Higher contrast ratios for medical critical information
 */
const healthcareVariantStyles: Record<GlassButtonHealthcareVariant, string> = {
  "healthcare-primary": cn(
    "liquid-glass-2026",
    "bg-[linear-gradient(135deg,rgba(0,122,255,0.88)_0%,rgba(0,122,255,0.78)_50%,rgba(0,122,255,0.88)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(10,132,255,0.95)_0%,rgba(10,132,255,0.85)_50%,rgba(10,132,255,0.95)_100%)]",
    "border border-[rgba(0,122,255,0.5)] dark:border-[rgba(10,132,255,0.6)]",
    "shadow-[0_12px_32px_-10px_rgba(0,122,255,0.3),0_6px_20px_-6px_rgba(0,122,255,0.2),inset_0_0_1px_rgba(255,255,255,0.7)]",
    "text-white"
  ),

  "healthcare-success": cn(
    "liquid-glass-2026",
    "bg-[linear-gradient(135deg,rgba(52,199,89,0.88)_0%,rgba(52,199,89,0.78)_50%,rgba(52,199,89,0.88)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(48,209,88,0.95)_0%,rgba(48,209,88,0.85)_50%,rgba(48,209,88,0.95)_100%)]",
    "border border-[rgba(52,199,89,0.5)] dark:border-[rgba(48,209,88,0.6)]",
    "shadow-[0_12px_32px_-10px_rgba(52,199,89,0.3),0_6px_20px_-6px_rgba(52,199,89,0.2),inset_0_0_1px_rgba(255,255,255,0.7)]",
    "text-white"
  ),

  "healthcare-warning": cn(
    "liquid-glass-2026",
    "bg-[linear-gradient(135deg,rgba(255,149,0,0.88)_0%,rgba(255,149,0,0.78)_50%,rgba(255,149,0,0.88)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(255,159,10,0.95)_0%,rgba(255,159,10,0.85)_50%,rgba(255,159,10,0.95)_100%)]",
    "border border-[rgba(255,149,0,0.5)] dark:border-[rgba(255,159,10,0.6)]",
    "shadow-[0_12px_32px_-10px_rgba(255,149,0,0.3),0_6px_20px_-6px_rgba(255,149,0,0.2),inset_0_0_1px_rgba(255,255,255,0.7)]",
    "text-white dark:text-slate-900"
  ),

  "healthcare-critical": cn(
    "liquid-glass-2026",
    // Higher opacity for critical medical alerts - must be highly visible
    "bg-[linear-gradient(135deg,rgba(255,59,48,0.92)_0%,rgba(255,59,48,0.85)_50%,rgba(255,59,48,0.92)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(255,69,58,0.98)_0%,rgba(255,69,58,0.92)_50%,rgba(255,69,58,0.98)_100%)]",
    "border-2 border-[rgba(255,59,48,0.6)] dark:border-[rgba(255,69,58,0.7)]",
    "shadow-[0_12px_32px_-10px_rgba(255,59,48,0.4),0_6px_20px_-6px_rgba(255,59,48,0.3),inset_0_0_1px_rgba(255,255,255,0.8)]",
    "text-white",
    // Ensure high z-index for critical alerts
    "z-50"
  ),

  "healthcare-info": cn(
    "liquid-glass-2026",
    "bg-[linear-gradient(135deg,rgba(90,200,250,0.88)_0%,rgba(90,200,250,0.78)_50%,rgba(90,200,250,0.88)_100%)]",
    "dark:bg-[linear-gradient(135deg,rgba(100,210,255,0.95)_0%,rgba(100,210,255,0.85)_50%,rgba(100,210,255,0.95)_100%)]",
    "border border-[rgba(90,200,250,0.5)] dark:border-[rgba(100,210,255,0.6)]",
    "shadow-[0_12px_32px_-10px_rgba(90,200,250,0.3),0_6px_20px_-6px_rgba(90,200,250,0.2),inset_0_0_1px_rgba(255,255,255,0.7)]",
    "text-white dark:text-slate-900"
  ),
}

/**
 * Size preset classes
 */
const sizeStyles: Record<GlassButtonSize, string> = {
  sm: "h-9 px-4 text-sm font-medium gap-1.5",
  md: "h-11 px-5 text-base font-medium gap-2",
  lg: "h-13 px-6 text-lg font-medium gap-2.5",
}

// ==================== HAPTIC ANIMATIONS ====================

/**
 * Haptic feedback animation configurations
 * Uses Framer Motion spring physics for natural feel
 */
const hapticAnimations: Record<Exclude<GlassButtonHaptic, false>, {
  keyframes: number[]
  duration: number
  times: number[]
}> = {
  light: {
    // Scale: 1 -> 0.97 -> 1.02 -> 1
    keyframes: [1, 0.97, 1.02, 1],
    duration: 0.2, // 200ms
    times: [0, 0.3, 0.7, 1],
  },
  medium: {
    // Scale: 1 -> 0.95 -> 1.03 -> 1
    keyframes: [1, 0.95, 1.03, 1],
    duration: 0.25, // 250ms
    times: [0, 0.25, 0.65, 1],
  },
  heavy: {
    // Scale: 1 -> 0.92 -> 1.05 -> 0.98 -> 1
    keyframes: [1, 0.92, 1.05, 0.98, 1],
    duration: 0.35, // 350ms
    times: [0, 0.2, 0.5, 0.8, 1],
  },
}

/**
 * Spring physics configuration for haptic feedback
 */
const hapticSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
  mass: 0.8,
}

// ==================== INNER GLOW COLORS ====================

/**
 * Get inner glow gradient based on variant
 */
function getInnerGlowGradient(
  variant: GlassButtonVariant,
  healthcareVariant?: GlassButtonHealthcareVariant
): string {
  if (healthcareVariant) {
    switch (healthcareVariant) {
      case "healthcare-primary":
        return "radial-gradient(circle at center, rgba(0,122,255,0.25) 0%, transparent 70%)"
      case "healthcare-success":
        return "radial-gradient(circle at center, rgba(52,199,89,0.25) 0%, transparent 70%)"
      case "healthcare-warning":
        return "radial-gradient(circle at center, rgba(255,149,0,0.25) 0%, transparent 70%)"
      case "healthcare-critical":
        return "radial-gradient(circle at center, rgba(255,59,48,0.3) 0%, transparent 70%)"
      case "healthcare-info":
        return "radial-gradient(circle at center, rgba(90,200,250,0.25) 0%, transparent 70%)"
    }
  }

  switch (variant) {
    case "primary":
      return "radial-gradient(circle at center, rgba(0,122,255,0.2) 0%, transparent 70%)"
    case "danger":
      return "radial-gradient(circle at center, rgba(255,59,48,0.2) 0%, transparent 70%)"
    default:
      return "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)"
  }
}

// ==================== LOADING SPINNER ====================

/**
 * Glass-styled loading spinner component
 */
function GlassSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {/* Outer ring with glass effect */}
      <div
        className={cn(
          "h-5 w-5 rounded-full",
          "border-2 border-current/20",
          "animate-spin"
        )}
        style={{
          borderTopColor: "currentColor",
          animationDuration: "0.8s",
        }}
      />
      {/* Inner glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
        }}
      />
    </div>
  )
}

// ==================== COMPONENT ====================

/**
 * GlassButton - Apple Liquid Glass 2026 Button Component
 *
 * A button component implementing Apple's Liquid Glass design language with
 * haptic visual feedback, healthcare semantic variants, and accessibility support.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <GlassButton variant="primary">Save Patient</GlassButton>
 *
 * // With haptic feedback
 * <GlassButton variant="primary" haptic="medium">
 *   Submit
 * </GlassButton>
 *
 * // Healthcare critical variant
 * <GlassButton healthcareVariant="healthcare-critical">
 *   Emergency Alert
 * </GlassButton>
 *
 * // With loading state
 * <GlassButton loading>Processing...</GlassButton>
 * ```
 */
const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      className,
      variant = "default",
      healthcareVariant,
      size = "md",
      leftIcon,
      rightIcon,
      loading = false,
      disabled = false,
      haptic = "medium",
      rimLight = false,
      innerGlow = true,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const controls = useAnimation()
    const [isPressed, setIsPressed] = React.useState(false)

    // Check for reduced motion preference
    const prefersReducedMotion = React.useMemo(() => {
      if (typeof window === "undefined") return false
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    // Determine if button is interactive
    const isInteractive = !disabled && !loading

    // Get the appropriate variant styles
    const buttonVariantStyles = healthcareVariant
      ? healthcareVariantStyles[healthcareVariant]
      : variantStyles[variant]

    // Handle haptic animation on press
    const triggerHaptic = React.useCallback(async () => {
      if (!haptic || !isInteractive || prefersReducedMotion) return

      const config = hapticAnimations[haptic]

      await controls.start({
        scale: config.keyframes,
        transition: {
          duration: config.duration,
          times: config.times,
          ease: [0.25, 1, 0.5, 1], // Apple easing
        },
      })
    }, [haptic, isInteractive, prefersReducedMotion, controls])

    // Handle click with haptic feedback
    const handleClick = React.useCallback(
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!isInteractive) return

        // Trigger haptic animation
        await triggerHaptic()

        // Call original onClick handler
        onClick?.(e as never)
      },
      [isInteractive, triggerHaptic, onClick]
    )

    // Handle pointer down for press state
    const handlePointerDown = React.useCallback(() => {
      if (isInteractive) {
        setIsPressed(true)
      }
    }, [isInteractive])

    // Handle pointer up for press state
    const handlePointerUp = React.useCallback(() => {
      setIsPressed(false)
    }, [])

    return (
      <motion.button
        ref={ref}
        disabled={disabled || loading}
        animate={controls}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={
          isInteractive && !prefersReducedMotion
            ? {
                scale: 1.02,
                transition: { duration: 0.2, ease: [0.25, 1, 0.5, 1] },
              }
            : undefined
        }
        whileTap={
          isInteractive && !prefersReducedMotion && !haptic
            ? {
                scale: 0.98,
                transition: { duration: 0.1, ease: [0.25, 1, 0.5, 1] },
              }
            : undefined
        }
        transition={{
          duration: 0.3,
          ease: [0.25, 1, 0.5, 1],
        }}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={cn(
          // Base styles
          "relative overflow-hidden font-medium",
          "inline-flex items-center justify-center",
          // Border radius from design tokens
          "rounded-[14px]", // glass-sm equivalent
          // Transition
          "transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]",
          // Variant styles
          buttonVariantStyles,
          // Size styles
          sizeStyles[size],
          // Disabled/loading state
          (disabled || loading) && "opacity-50 cursor-not-allowed pointer-events-none",
          // Focus ring
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          // User className
          className
        )}
        {...props}
      >
        {/* Noise texture overlay for glass effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.015] z-[1]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
          }}
          aria-hidden="true"
        />

        {/* Inner glow effect */}
        {innerGlow && (
          <div
            className="absolute inset-0 pointer-events-none z-[2] rounded-[14px]"
            style={{
              background: getInnerGlowGradient(variant, healthcareVariant),
              opacity: isPressed ? 0.8 : 0.6,
              transition: "opacity 0.15s ease-out",
            }}
            aria-hidden="true"
          />
        )}

        {/* Rim light effect */}
        {rimLight && (
          <div
            className="absolute inset-0 pointer-events-none z-[50] opacity-80 dark:opacity-40 rounded-[14px]"
            style={{
              padding: "1px",
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
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              filter: "blur(0.5px)",
            }}
            aria-hidden="true"
          />
        )}

        {/* Button content */}
        <div className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <GlassSpinner className="flex-shrink-0" />
          ) : (
            <>
              {leftIcon && (
                <span className="flex items-center flex-shrink-0">
                  {leftIcon}
                </span>
              )}
              {children && (
                <span className="relative z-10">{children}</span>
              )}
              {rightIcon && (
                <span className="flex items-center flex-shrink-0">
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
