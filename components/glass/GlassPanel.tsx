'use client'

import * as React from 'react'
import { motion, MotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  initial?: MotionProps['initial']
  animate?: MotionProps['animate']
  transition?: MotionProps['transition']
}

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    {
      children,
      className,
      as: Component = motion.div,
      initial = { opacity: 0, y: 10 },
      animate = { opacity: 1, y: 0 },
      transition = { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn('liquid-glass-material', className)}
        initial={initial}
        animate={animate}
        transition={transition}
        whileHover={{ scale: 1.01, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

GlassPanel.displayName = 'GlassPanel'

export { GlassPanel }
