"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Tooltip Components - Apple Liquid Glass 2026 Style
 * Healthcare Palette Variants
 *
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>Hover me</TooltipTrigger>
 *     <TooltipContent variant="success">Success message</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const tooltipVariants = cva(
  [
    // Base styles
    "z-50 overflow-hidden rounded-xl px-3 py-1.5 text-sm",
    "liquid-glass-elevated",
    "font-medium",
    // Animation
    "animate-in fade-in-0 zoom-in-95",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
    "data-[side=bottom]:slide-in-from-top-2",
    "data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2",
    "data-[side=top]:slide-in-from-bottom-2",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-slate-900/85 dark:bg-slate-800/90",
          "border border-white/15 dark:border-white/10",
          "shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1)]",
          "text-white",
        ].join(" "),
        success: [
          "bg-healthcare-success/90 dark:bg-healthcare-success-dark/85",
          "border border-healthcare-success/30 dark:border-healthcare-success-dark/20",
          "shadow-[0_8px_32px_rgba(0,200,83,0.25),inset_0_1px_0_rgba(255,255,255,0.1)]",
          "text-white",
        ].join(" "),
        warning: [
          "bg-healthcare-warning/90 dark:bg-healthcare-warning-dark/85",
          "border border-healthcare-warning/30 dark:border-healthcare-warning-dark/20",
          "shadow-[0_8px_32px_rgba(255,149,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1)]",
          "text-white",
        ].join(" "),
        critical: [
          "bg-healthcare-critical/90 dark:bg-healthcare-critical-dark/85",
          "border border-healthcare-critical/30 dark:border-healthcare-critical-dark/20",
          "shadow-[0_8px_32px_rgba(255,59,48,0.25),inset_0_1px_0_rgba(255,255,255,0.1)]",
          "text-white",
        ].join(" "),
        info: [
          "bg-healthcare-info/90 dark:bg-healthcare-info-dark/85",
          "border border-healthcare-info/30 dark:border-healthcare-info-dark/20",
          "shadow-[0_8px_32px_rgba(90,200,250,0.25),inset_0_1px_0_rgba(255,255,255,0.1)]",
          "text-white",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> &
    VariantProps<typeof tooltipVariants>
>(({ className, sideOffset = 4, variant, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(tooltipVariants({ variant }), className)}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, tooltipVariants }
