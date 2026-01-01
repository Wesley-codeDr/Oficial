"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedWrapper({
  children,
  className,
  delay = 0,
  ...props
}: AnimatedWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: delay,
      }}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
