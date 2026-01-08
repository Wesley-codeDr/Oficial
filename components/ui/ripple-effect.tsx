'use client'

import React, { useState, useCallback, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { rippleConfig } from '@/lib/design-system/micro-interactions'

export interface RippleEffectProps {
  children: ReactNode
  color?: 'light' | 'dark' | 'primary' | 'success' | 'error'
  disabled?: boolean
  className?: string
  as?: keyof React.JSX.IntrinsicElements
}

interface Ripple {
  id: number
  x: number
  y: number
}

export function RippleEffect({
  children,
  color = 'light',
  disabled = false,
  className,
  as: Component = 'div',
}: RippleEffectProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (disabled) return

      const element = event.currentTarget
      const rect = element.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const id = Date.now()

      setRipples((prev) => [...prev, { id, x, y }])
    },
    [disabled]
  )

  const handleAnimationComplete = useCallback((id: number) => {
    setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
  }, [])

  const MotionComponent = motion[Component as keyof typeof motion] as typeof motion.div

  return (
    <MotionComponent className={cn('relative overflow-hidden', className)} onClick={handleClick}>
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 20,
              height: 20,
              marginLeft: -10,
              marginTop: -10,
              backgroundColor: rippleConfig.colors[color],
            }}
            initial={{
              scale: rippleConfig.initialScale,
              opacity: rippleConfig.initialOpacity,
            }}
            animate={{
              scale: rippleConfig.finalScale,
              opacity: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: rippleConfig.duration,
              ease: rippleConfig.easing,
            }}
            onAnimationComplete={() => handleAnimationComplete(ripple.id)}
          />
        ))}
      </AnimatePresence>
    </MotionComponent>
  )
}
