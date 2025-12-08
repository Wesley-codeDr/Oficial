"use client"

import { motion } from "framer-motion"
import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ScaleInProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  scale?: number
}

export function ScaleIn({
  children,
  className,
  delay = 0,
  duration = 0.3,
  scale = 0.95,
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1], // Apple easing
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

