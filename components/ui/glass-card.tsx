"use client"

import { motion } from "framer-motion"
import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass rounded-xl p-6 shadow-glass",
        hover && "hover-lift cursor-pointer",
        className
      )}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  )
}






