'use client'

import * as React from 'react'
import { motion, MotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  variant?: 'default' | 'elevated' | 'medical' | 'subtle'
  glow?: 'none' | 'blue' | 'green' | 'teal'
  interactive?: boolean
  initial?: MotionProps['initial']
  animate?: MotionProps['animate']
  transition?: MotionProps['transition']
}

const variantClasses = {
  default: `
    backdrop-blur-[80px] saturate-[200%]
    bg-white/22 dark:bg-slate-900/28
    border border-white/35 dark:border-white/12
    shadow-[0_8px_32px_rgba(0,78,146,0.08),inset_0_1px_1px_rgba(255,255,255,0.5)]
    dark:shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.1)]
  `,
  elevated: `
    backdrop-blur-[100px] saturate-[220%]
    bg-white/32 dark:bg-slate-900/38
    border border-white/55 dark:border-white/22
    shadow-[0_25px_50px_-12px_rgba(0,78,146,0.12),0_8px_24px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.6)]
    dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]
  `,
  medical: `
    backdrop-blur-[80px] saturate-[200%]
    bg-[rgba(0,135,255,0.08)] dark:bg-[rgba(10,159,255,0.12)]
    border border-[rgba(0,135,255,0.15)] dark:border-[rgba(10,159,255,0.2)]
    shadow-[0_8px_32px_rgba(0,135,255,0.1),inset_0_1px_1px_rgba(255,255,255,0.4)]
    dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
  `,
  subtle: `
    backdrop-blur-[60px] saturate-[180%]
    bg-white/15 dark:bg-slate-900/20
    border border-white/25 dark:border-white/08
    shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.3)]
    dark:shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]
  `,
}

const glowClasses = {
  none: '',
  blue: 'hover:shadow-[0_0_40px_rgba(0,135,255,0.15),0_8px_32px_rgba(0,78,146,0.08)]',
  green: 'hover:shadow-[0_0_40px_rgba(0,184,148,0.15),0_8px_32px_rgba(0,78,146,0.08)]',
  teal: 'hover:shadow-[0_0_40px_rgba(20,184,166,0.15),0_8px_32px_rgba(0,78,146,0.08)]',
}

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    {
      children,
      className,
      as: Component = motion.div,
      variant = 'default',
      glow = 'none',
      interactive = true,
      initial = { opacity: 0, y: 10 },
      animate = { opacity: 1, y: 0 },
      transition = { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
      ...props
    },
    ref
  ) => {
    const baseClasses = `
      relative rounded-[40px] overflow-hidden
      transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
    `
    
    return (
      <Component
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          glowClasses[glow],
          className
        )}
        initial={initial}
        animate={animate}
        transition={transition}
        whileHover={interactive ? { 
          scale: 1.015, 
          y: -4,
        } : undefined}
        {...props}
      >
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="absolute top-0 left-[5%] right-[5%] h-[45%] pointer-events-none rounded-t-[40px] bg-gradient-to-b from-white/30 via-white/10 to-transparent dark:from-white/15 dark:via-white/5 dark:to-transparent" />
        
        <div className="relative z-10">
          {children}
        </div>
      </Component>
    )
  }
)

GlassPanel.displayName = 'GlassPanel'

export { GlassPanel }
