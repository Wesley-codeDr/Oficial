"use client"

import * as React from "react"
import { motion, HTMLMotionProps, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { glassTokens, glassFocusRing, glassTransition } from "@/lib/design-system/glass-tokens"

/**
 * GlassInput Component - Apple Liquid Glass 2026 Design System
 *
 * Enhanced input component following iOS 26 design language with:
 * - Material variants (regular, clear, elevated, subtle)
 * - Healthcare semantic states (default, error, success, warning)
 * - Focus state with glow effects (Task 3.12)
 * - Label and helper text support with accessibility (Task 3.13)
 * - Icon support with proper positioning (Task 3.14)
 *
 * @see https://developer.apple.com/design/human-interface-guidelines/materials
 */

// ==================== TYPES ====================

/**
 * Material variant following Apple Liquid Glass 2026 HIG
 */
export type GlassInputVariant = "regular" | "clear" | "elevated" | "subtle"

/**
 * Input state for healthcare semantic colors
 */
export type GlassInputState = "default" | "error" | "success" | "warning"

/**
 * Input size options
 */
export type GlassInputSize = "sm" | "md" | "lg"

/**
 * Label position
 */
export type GlassInputLabelPosition = "floating" | "static"

/**
 * Props for GlassInput component
 */
export interface GlassInputProps extends Omit<HTMLMotionProps<"input">, "size"> {
  /**
   * Material variant following Apple Liquid Glass 2026 HIG
   * - regular: Standard input (40px blur, 0.2 opacity)
   * - clear: For inputs over photos/videos/rich backgrounds (40px blur, 0.15 opacity)
   * - elevated: For prominent inputs (40px blur, 0.25 opacity)
   * - subtle: More transparent, lighter feel (40px blur, 0.18 opacity)
   * @default "regular"
   */
  variant?: GlassInputVariant

  /**
   * Input state for healthcare semantic styling
   * - default: Standard blue focus
   * - error: Red/critical styling for validation errors
   * - success: Green styling for valid input
   * - warning: Orange styling for warnings
   * @default "default"
   */
  state?: GlassInputState

  /**
   * Size of the input
   * @default "md"
   */
  size?: GlassInputSize

  /**
   * Label text displayed above or floating in the input
   */
  label?: string

  /**
   * Position of the label
   * - static: Always above the input
   * - floating: Floats up when input has value or focus
   * @default "static"
   */
  labelPosition?: GlassInputLabelPosition

  /**
   * Helper text displayed below the input
   * Shows error message when state is "error"
   */
  helperText?: string

  /**
   * Icon to display on the left side of the input
   */
  leftIcon?: React.ReactNode

  /**
   * Icon to display on the right side of the input
   */
  rightIcon?: React.ReactNode

  /**
   * Callback when right icon is clicked
   */
  onRightIconClick?: () => void

  /**
   * Enable inner glow effect
   * @default true
   */
  innerGlow?: boolean

  /**
   * Enable rim light border effect
   * @default true
   */
  rimLight?: boolean

  /**
   * Enable specular highlight effect
   * @default false
   */
  specular?: boolean

  /**
   * Whether the input is required
   * Shows required indicator on label
   */
  required?: boolean

  /**
   * Custom ID for the input
   * Auto-generated if not provided
   */
  id?: string
}

// ==================== VARIANT STYLES ====================

/**
 * Material variant CSS classes using unified design tokens
 */
const variantClasses: Record<GlassInputVariant, string> = {
  regular: cn(
    "liquid-glass-2026 liquid-glass-2026-regular",
    "backdrop-blur-[40px] backdrop-saturate-[180%]",
    "bg-gradient-to-br from-white/20 via-white/[0.14] to-white/[0.16]",
    "dark:from-slate-800/25 dark:via-slate-800/20 dark:to-slate-800/25",
    "border border-white/30 dark:border-white/15",
    "shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.2)]",
    "dark:shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.1)]"
  ),
  clear: cn(
    "liquid-glass-2026 liquid-glass-2026-clear",
    "backdrop-blur-[40px] backdrop-saturate-[180%]",
    "bg-white/15 dark:bg-slate-800/18",
    "border border-white/25 dark:border-white/10",
    "shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.15)]",
    "dark:shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.08)]"
  ),
  elevated: cn(
    "liquid-glass-2026 liquid-glass-2026-elevated",
    "backdrop-blur-[40px] backdrop-saturate-[180%]",
    "bg-gradient-to-br from-white/25 via-white/20 to-white/[0.225]",
    "dark:from-slate-800/32 dark:via-slate-800/26 dark:to-slate-800/32",
    "border border-white/40 dark:border-white/20",
    "shadow-[0_12px_40px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.25)]",
    "dark:shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.12)]"
  ),
  subtle: cn(
    "liquid-glass-2026 liquid-glass-2026-subtle",
    "backdrop-blur-[40px] backdrop-saturate-[180%]",
    "bg-gradient-to-br from-white/18 via-white/[0.144] to-white/[0.162]",
    "dark:from-slate-800/18 dark:via-slate-800/14 dark:to-slate-800/18",
    "border border-white/25 dark:border-white/12",
    "shadow-[0_6px_24px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.15)]",
    "dark:shadow-[0_6px_24px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.08)]"
  ),
}

// ==================== STATE STYLES ====================

/**
 * State-specific border and glow colors for healthcare semantics
 */
const stateStyles: Record<GlassInputState, {
  border: string
  focusBorder: string
  focusRing: string
  focusGlow: string
  textColor: string
  labelColor: string
  helperColor: string
  glowColor: string
}> = {
  default: {
    border: "border-white/30 dark:border-white/15",
    focusBorder: "focus-within:border-blue-500/50 dark:focus-within:border-blue-400/50",
    focusRing: "focus-within:ring-2 focus-within:ring-blue-500/20 dark:focus-within:ring-blue-400/25",
    focusGlow: "focus-within:shadow-[0_0_24px_rgba(0,122,255,0.15)]",
    textColor: "text-slate-800 dark:text-white",
    labelColor: "text-slate-700 dark:text-slate-200",
    helperColor: "text-slate-500 dark:text-slate-400",
    glowColor: "rgba(0, 122, 255, 0.2)",
  },
  error: {
    border: "border-red-400/50 dark:border-red-500/40",
    focusBorder: "focus-within:border-red-500/60 dark:focus-within:border-red-400/60",
    focusRing: "focus-within:ring-2 focus-within:ring-red-500/25 dark:focus-within:ring-red-400/30",
    focusGlow: "focus-within:shadow-[0_0_24px_rgba(255,59,48,0.2)]",
    textColor: "text-slate-800 dark:text-white",
    labelColor: "text-red-600 dark:text-red-400",
    helperColor: "text-red-600 dark:text-red-400",
    glowColor: "rgba(255, 59, 48, 0.25)",
  },
  success: {
    border: "border-green-400/50 dark:border-green-500/40",
    focusBorder: "focus-within:border-green-500/60 dark:focus-within:border-green-400/60",
    focusRing: "focus-within:ring-2 focus-within:ring-green-500/25 dark:focus-within:ring-green-400/30",
    focusGlow: "focus-within:shadow-[0_0_24px_rgba(52,199,89,0.2)]",
    textColor: "text-slate-800 dark:text-white",
    labelColor: "text-green-600 dark:text-green-400",
    helperColor: "text-green-600 dark:text-green-400",
    glowColor: "rgba(52, 199, 89, 0.25)",
  },
  warning: {
    border: "border-orange-400/50 dark:border-orange-500/40",
    focusBorder: "focus-within:border-orange-500/60 dark:focus-within:border-orange-400/60",
    focusRing: "focus-within:ring-2 focus-within:ring-orange-500/25 dark:focus-within:ring-orange-400/30",
    focusGlow: "focus-within:shadow-[0_0_24px_rgba(255,149,0,0.2)]",
    textColor: "text-slate-800 dark:text-white",
    labelColor: "text-orange-600 dark:text-orange-400",
    helperColor: "text-orange-600 dark:text-orange-400",
    glowColor: "rgba(255, 149, 0, 0.25)",
  },
}

// ==================== SIZE STYLES ====================

/**
 * Size-specific classes
 */
const sizeClasses: Record<GlassInputSize, {
  container: string
  input: string
  label: string
  helperText: string
  iconSize: string
  iconPaddingLeft: string
  iconPaddingRight: string
}> = {
  sm: {
    container: "min-h-[36px]",
    input: "h-9 px-3 text-sm",
    label: "text-xs mb-1.5",
    helperText: "text-xs mt-1.5",
    iconSize: "w-4 h-4",
    iconPaddingLeft: "pl-9",
    iconPaddingRight: "pr-9",
  },
  md: {
    container: "min-h-[44px]",
    input: "h-11 px-4 text-base",
    label: "text-sm mb-2",
    helperText: "text-sm mt-2",
    iconSize: "w-5 h-5",
    iconPaddingLeft: "pl-11",
    iconPaddingRight: "pr-11",
  },
  lg: {
    container: "min-h-[52px]",
    input: "h-13 px-5 text-lg",
    label: "text-base mb-2.5",
    helperText: "text-base mt-2.5",
    iconSize: "w-6 h-6",
    iconPaddingLeft: "pl-13",
    iconPaddingRight: "pr-13",
  },
}

// ==================== INNER GLOW COLORS ====================

/**
 * Inner glow colors based on state
 */
const innerGlowColors: Record<GlassInputState, string> = {
  default: "radial-gradient(circle at center, rgba(0,122,255,0.1) 0%, transparent 70%)",
  error: "radial-gradient(circle at center, rgba(255,59,48,0.12) 0%, transparent 70%)",
  success: "radial-gradient(circle at center, rgba(52,199,89,0.12) 0%, transparent 70%)",
  warning: "radial-gradient(circle at center, rgba(255,149,0,0.12) 0%, transparent 70%)",
}

// ==================== COMPONENT ====================

/**
 * GlassInput - Apple Liquid Glass 2026 Input Component
 *
 * A fully accessible input component with glass morphism styling,
 * healthcare semantic states, and comprehensive icon support.
 */
const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      className,
      variant = "regular",
      state = "default",
      size = "md",
      label,
      labelPosition = "static",
      helperText,
      leftIcon,
      rightIcon,
      onRightIconClick,
      innerGlow = true,
      rimLight = true,
      specular = false,
      required = false,
      id: providedId,
      type = "text",
      placeholder,
      value,
      defaultValue,
      onFocus,
      onBlur,
      disabled,
      ...props
    },
    ref
  ) => {
    // Generate unique ID for accessibility
    const generatedId = React.useId()
    const inputId = providedId || `glass-input-${generatedId}`
    const labelId = `${inputId}-label`
    const helperId = `${inputId}-helper`

    // Track focus and value state for floating label
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(
      Boolean(value || defaultValue)
    )

    // Update hasValue when controlled value changes
    React.useEffect(() => {
      if (value !== undefined) {
        setHasValue(Boolean(value))
      }
    }, [value])

    // Handle focus events
    const handleFocus = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true)
        onFocus?.(e)
      },
      [onFocus]
    )

    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false)
        onBlur?.(e)
      },
      [onBlur]
    )

    // Handle input changes for floating label
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasValue(Boolean(e.target.value))
        // Call parent onChange if provided via props
        if (props.onChange) {
          props.onChange(e as React.ChangeEvent<HTMLInputElement> & { target: HTMLInputElement })
        }
      },
      [props]
    )

    // Determine if floating label should be raised
    const isLabelRaised = labelPosition === "floating" && (isFocused || hasValue || placeholder)

    // iOS 26 radius: 18px for inputs (glass-md)
    const radiusClass = "rounded-[18px]"

    // Get current state styles
    const currentState = stateStyles[state]
    const currentSize = sizeClasses[size]

    return (
      <div className="relative w-full">
        {/* Static Label */}
        {label && labelPosition === "static" && (
          <label
            id={labelId}
            htmlFor={inputId}
            className={cn(
              "block font-medium",
              currentSize.label,
              currentState.labelColor,
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {label}
            {required && (
              <span className="ml-1 text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 z-20",
                "text-slate-400 dark:text-slate-500",
                "pointer-events-none",
                "transition-colors duration-200",
                isFocused && "text-slate-600 dark:text-slate-300",
                currentSize.iconSize,
                "flex items-center justify-center"
              )}
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}

          {/* Glass Container with Motion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.25,
              ease: [0.25, 1, 0.5, 1], // Apple ease-out
            }}
            className={cn(
              "relative overflow-hidden",
              radiusClass,
              currentSize.container,
              // Variant styles
              variantClasses[variant],
              // State-specific border (override variant border when not default)
              state !== "default" && currentState.border,
              // Focus styles with glow effects (Task 3.12)
              currentState.focusBorder,
              currentState.focusRing,
              currentState.focusGlow,
              // Transition for smooth focus
              "transition-all duration-[250ms] ease-[cubic-bezier(0.25,1,0.5,1)]",
              // Disabled state
              disabled && "opacity-50 cursor-not-allowed",
              // Specular effect
              specular && "specular-2026",
              // Rim light effect
              rimLight && "rim-light-2026",
              className
            )}
          >
            {/* Noise texture overlay for authentic glass feel */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.015] z-[1]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                mixBlendMode: "overlay",
              }}
              aria-hidden="true"
            />

            {/* Inner Glow Effect (Task 3.12) */}
            {innerGlow && (
              <motion.div
                className={cn(
                  "absolute inset-0 pointer-events-none z-[2]",
                  radiusClass
                )}
                initial={{ opacity: 0.4 }}
                animate={{
                  opacity: isFocused ? 0.8 : 0.4,
                }}
                transition={{ duration: 0.25 }}
                style={{
                  background: innerGlowColors[state],
                }}
                aria-hidden="true"
              />
            )}

            {/* Floating Label (Task 3.13) */}
            {label && labelPosition === "floating" && (
              <motion.label
                id={labelId}
                htmlFor={inputId}
                className={cn(
                  "absolute left-4 z-20 pointer-events-none origin-left",
                  "font-medium",
                  currentState.labelColor,
                  leftIcon && "left-11",
                  disabled && "opacity-50"
                )}
                initial={false}
                animate={{
                  y: isLabelRaised ? -24 : 0,
                  scale: isLabelRaised ? 0.75 : 1,
                  top: isLabelRaised ? "0" : "50%",
                  translateY: isLabelRaised ? 0 : "-50%",
                }}
                transition={{
                  duration: 0.2,
                  ease: [0.25, 1, 0.5, 1],
                }}
              >
                {label}
                {required && (
                  <span className="ml-1 text-red-500" aria-hidden="true">
                    *
                  </span>
                )}
              </motion.label>
            )}

            {/* Actual Input Element */}
            <input
              ref={ref}
              id={inputId}
              type={type}
              value={value}
              defaultValue={defaultValue}
              placeholder={labelPosition === "floating" && !isLabelRaised ? undefined : placeholder}
              disabled={disabled}
              required={required}
              aria-labelledby={label ? labelId : undefined}
              aria-describedby={helperText ? helperId : undefined}
              aria-invalid={state === "error"}
              aria-required={required}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              className={cn(
                "relative z-10 w-full bg-transparent outline-none",
                currentSize.input,
                currentState.textColor,
                // Adjust padding for icons (Task 3.14)
                leftIcon && currentSize.iconPaddingLeft,
                rightIcon && currentSize.iconPaddingRight,
                // Placeholder styling
                "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                "placeholder:transition-opacity placeholder:duration-200",
                // Floating label placeholder visibility
                labelPosition === "floating" && !isLabelRaised && "placeholder:opacity-0",
                // Disabled styling
                disabled && "cursor-not-allowed",
                // Remove default browser styling
                "focus:ring-0 focus:outline-none"
              )}
              {...props}
            />

            {/* Right Icon (Task 3.14) */}
            {rightIcon && (
              <button
                type="button"
                onClick={onRightIconClick}
                disabled={disabled || !onRightIconClick}
                tabIndex={onRightIconClick ? 0 : -1}
                aria-label="Input action"
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 z-20",
                  "text-slate-400 dark:text-slate-500",
                  "transition-colors duration-200",
                  currentSize.iconSize,
                  "flex items-center justify-center",
                  onRightIconClick && !disabled && [
                    "cursor-pointer",
                    "hover:text-slate-600 dark:hover:text-slate-300",
                    "focus:outline-none focus:text-slate-600 dark:focus:text-slate-300",
                  ],
                  disabled && "cursor-not-allowed opacity-50"
                )}
              >
                {rightIcon}
              </button>
            )}
          </motion.div>

          {/* Helper Text / Error Message (Task 3.13) */}
          <AnimatePresence mode="wait">
            {helperText && (
              <motion.p
                key={`${state}-${helperText}`}
                id={helperId}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                className={cn(
                  currentSize.helperText,
                  currentState.helperColor,
                  disabled && "opacity-50"
                )}
                role={state === "error" ? "alert" : undefined}
                aria-live={state === "error" ? "polite" : undefined}
              >
                {helperText}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }
)

GlassInput.displayName = "GlassInput"

export { GlassInput }
export default GlassInput
