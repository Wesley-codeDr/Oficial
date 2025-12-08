"use client"

import { motion } from "framer-motion"
import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ContainerProps {
  children: ReactNode
  className?: string
  animate?: boolean
  stagger?: boolean
}

export function Container({
  children,
  className,
  animate = true,
  stagger = false,
}: ContainerProps) {
  if (!animate) {
    return <div className={cn("container mx-auto px-4", className)}>{children}</div>
  }

  return (
    <motion.div
      className={cn("container mx-auto px-4", className)}
      initial="hidden"
      animate="visible"
      variants={stagger ? containerVariants : undefined}
    >
      {stagger ? (
        <motion.div variants={staggerVariants}>{children}</motion.div>
      ) : (
        children
      )}
    </motion.div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const staggerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

