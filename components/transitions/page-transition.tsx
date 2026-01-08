'use client'

import { ReactNode } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { pageTransitions } from '@/lib/design-system/micro-interactions'

export interface PageTransitionProps {
  children: ReactNode
  variant?: 'fade' | 'slideUp' | 'slideRight' | 'scaleFade' | 'blurFade'
  className?: string
  initial?: boolean
}

/**
 * Page transition wrapper component for Next.js App Router
 *
 * Wraps page content with AnimatePresence and applies smooth transitions
 * based on the selected variant. Uses pathname as key to trigger transitions
 * between pages.
 *
 * @example
 * ```tsx
 * <PageTransition variant="blurFade">
 *   {children}
 * </PageTransition>
 * ```
 */
export function PageTransition({
  children,
  variant = 'fade',
  className,
  initial = true,
}: PageTransitionProps) {
  const pathname = usePathname()

  const selectedTransition = pageTransitions[variant]

  const variants: Variants = {
    initial: selectedTransition.initial,
    animate: selectedTransition.animate,
    exit: selectedTransition.exit,
  }

  return (
    <AnimatePresence mode="wait" initial={initial}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={selectedTransition.transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
