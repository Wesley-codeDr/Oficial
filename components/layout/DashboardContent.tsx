'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface DashboardContentProps {
  children: ReactNode
}

export function DashboardContent({ children }: DashboardContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className="max-w-7xl mx-auto"
    >
      {children}
    </motion.div>
  )
}
