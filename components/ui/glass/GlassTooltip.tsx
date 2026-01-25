"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * GlassTooltip - Apple Liquid Glass 2026 Tooltip
 *
 * Implements iOS 26 tooltip behavior:
 * - Glass morphism surface with backdrop blur
 * - Smooth fade + scale enter/exit animations
 * - Configurable delay and positioning
 * - Respects reduced motion preferences
 *
 * Built on top of Radix UI Tooltip for accessibility
 */

type GlassTooltipPosition = "top" | "bottom" | "left" | "right"
type GlassTooltipVariant = "regular" | "clear" | "elevated" | "subtle"

interface GlassTooltipProps {
  /** Tooltip content */
  content: React.ReactNode
  /** Trigger element */
  children: React.ReactElement
  /** Tooltip position */
  position?: GlassTooltipPosition
  /** Glass material variant */
  variant?: GlassTooltipVariant
  /** Delay before showing (ms) */
  delay?: number
  /** Delay before hiding (ms) */
  hideDelay?: number
  /** Skip delay on open */
  skipDelayDuration?: number
  /** Whether tooltip should be open by default */
  defaultOpen?: boolean
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Maximum width of tooltip */
  maxWidth?: number
  /** Arrow visibility */
  showArrow?: boolean
  /** Side offset from trigger */
  sideOffset?: number
  /** Additional className for tooltip content */
  className?: string
  /** Additional className for arrow */
  arrowClassName?: string
}

// Animation variants for Framer Motion
const tooltipAnimationVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
  },
}

// Position-specific offset origins
const positionOrigins: Record<GlassTooltipPosition, string> = {
  top: "bottom center",
  bottom: "top center",
  left: "right center",
  right: "left center",
}

// Glass variant classes
const variantClasses: Record<GlassTooltipVariant, string> = {
  regular: "liquid-glass-2026-regular",
  clear: "liquid-glass-2026-clear",
  elevated: "liquid-glass-2026-elevated",
  subtle: "liquid-glass-2026-subtle",
}

/**
 * GlassTooltipProvider - Context provider for tooltip settings
 */
const GlassTooltipProvider = TooltipPrimitive.Provider

/**
 * TooltipContent - Internal animated tooltip content
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    variant?: GlassTooltipVariant
    showArrow?: boolean
    arrowClassName?: string
    maxWidth?: number
  }
>(
  (
    {
      className,
      variant = "regular",
      showArrow = true,
      arrowClassName,
      maxWidth = 300,
      sideOffset = 8,
      children,
      ...props
    },
    ref
  ) => {
    // Check for reduced motion preference
    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)

    React.useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(mediaQuery.matches)

      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
      mediaQuery.addEventListener("change", handler)
      return () => mediaQuery.removeEventListener("change", handler)
    }, [])

    return (
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          className={cn(
            // Base styles
            "z-[100] overflow-hidden",
            // Glass morphism
            "liquid-glass-2026",
            variantClasses[variant],
            // Typography
            "text-sm text-slate-800 dark:text-slate-100",
            // Padding and radius
            "px-3 py-2 rounded-lg",
            // Shadow
            "shadow-lg shadow-black/5 dark:shadow-black/20",
            className
          )}
          style={{
            maxWidth,
            transformOrigin: positionOrigins[props.side || "top"],
          }}
          asChild
          {...props}
        >
          <motion.div
            initial={prefersReducedMotion ? false : "initial"}
            animate="animate"
            exit={prefersReducedMotion ? undefined : "exit"}
            variants={tooltipAnimationVariants}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.15,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            {children}

            {/* Arrow */}
            {showArrow && (
              <TooltipPrimitive.Arrow
                className={cn(
                  "fill-white/25 dark:fill-slate-800/50",
                  "drop-shadow-sm",
                  arrowClassName
                )}
                width={12}
                height={6}
              />
            )}
          </motion.div>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    )
  }
)
TooltipContent.displayName = "TooltipContent"

/**
 * GlassTooltip - Main component
 */
const GlassTooltip: React.FC<GlassTooltipProps> = ({
  content,
  children,
  position = "top",
  variant = "regular",
  delay = 200,
  hideDelay = 0,
  skipDelayDuration = 300,
  defaultOpen,
  open,
  onOpenChange,
  maxWidth = 300,
  showArrow = true,
  sideOffset = 8,
  className,
  arrowClassName,
}) => {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delay}
      skipDelayDuration={skipDelayDuration}
    >
      <TooltipPrimitive.Root
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        delayDuration={delay}
      >
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>

        <AnimatePresence>
          {(open !== undefined ? open : true) && (
            <TooltipContent
              side={position}
              variant={variant}
              showArrow={showArrow}
              arrowClassName={arrowClassName}
              maxWidth={maxWidth}
              sideOffset={sideOffset}
              className={className}
            >
              {content}
            </TooltipContent>
          )}
        </AnimatePresence>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
GlassTooltip.displayName = "GlassTooltip"

/**
 * Simple version for basic usage without provider
 */
interface GlassTooltipSimpleProps {
  /** Tooltip text content */
  content: string
  /** Trigger element */
  children: React.ReactElement
  /** Tooltip position */
  position?: GlassTooltipPosition
  /** Delay in ms */
  delay?: number
}

const GlassTooltipSimple: React.FC<GlassTooltipSimpleProps> = ({
  content,
  children,
  position = "top",
  delay = 200,
}) => (
  <GlassTooltip content={content} position={position} delay={delay}>
    {children}
  </GlassTooltip>
)
GlassTooltipSimple.displayName = "GlassTooltipSimple"

export {
  GlassTooltip,
  GlassTooltipSimple,
  GlassTooltipProvider,
  TooltipContent as GlassTooltipContent,
}

export type {
  GlassTooltipProps,
  GlassTooltipPosition,
  GlassTooltipVariant,
  GlassTooltipSimpleProps,
}
