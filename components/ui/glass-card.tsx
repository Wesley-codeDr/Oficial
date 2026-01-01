"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "dark" | "light"
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 30 
        }}
        className={cn(
          "rounded-3xl p-5 shadow-glass overflow-hidden",
          "bg-glass-background backdrop-blur-xl border border-glass-border",
          "text-white font-sans",
          // Enhanced interactive styles
          "hover:shadow-apple-xl hover:border-white/30 hover:bg-glass-background/80",
          "transition-colors duration-300",
          className
        )}
        {...props}
      />
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
