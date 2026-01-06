"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { applePhysics } from "@/lib/design-system/animation-tokens"

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "dark" | "light" | "elevated"
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ 
          scale: 1.01,
          y: -2,
          transition: { ...applePhysics.glass, stiffness: 350, damping: 25 } // Physical lift
        }}
        transition={applePhysics.glass}
        className={cn(
          "rounded-[32px] p-6 overflow-hidden",
          variant === "elevated" ? "glass-elevated rim-light-ios26 inner-glow-ios26 noise-grain" : variant === "default" ? "liquid-glass-material rim-light-ios26 inner-glow-ios26 noise-grain" : "glass-molded rim-light-ios26 inner-glow-ios26 noise-grain",
          // Text styles
          "text-slate-800 dark:text-white font-sans",
          // Interactive states handled by liquid-glass-material, ensuring relative positioning for sheen
          "relative",
          className
        )}
        {...props}
      />
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
