"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

/**
 * Separator Component - Apple Liquid Glass 2026 Style
 * 
 * A subtle glass-styled divider with gradient fade effect.
 * 
 * @example
 * ```tsx
 * <Separator />
 * <Separator orientation="vertical" />
 * ```
 */

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    variant?: "default" | "glass" | "subtle"
  }
>(
  (
    { className, orientation = "horizontal", decorative = true, variant = "glass", ...props },
    ref
  ) => {
    const variantClasses = {
      default: "bg-border",
      glass: [
        "bg-gradient-to-r",
        orientation === "horizontal" 
          ? "from-transparent via-white/50 to-transparent dark:via-white/20"
          : "from-transparent via-white/50 to-transparent dark:via-white/20",
      ].join(" "),
      subtle: "bg-white/25 dark:bg-white/10",
    }

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0",
          orientation === "horizontal" 
            ? "h-px w-full" 
            : "h-full w-px",
          variantClasses[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
