'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Apple 2025 Premium Typography
 *
 * Inspired by Apple Vision Pro, iOS 18, and visionOS design language:
 * - Glass morphism with subtle blur
 * - Fluid spring animations
 * - Shimmer effect on reveal
 * - Gradient color wave
 * - Micro-glow pulsing
 */

// Apple-style spring configuration
const appleSpring = {
  type: 'spring' as const,
  damping: 20,
  stiffness: 300,
  mass: 0.8,
}

// Container with staggered children
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
}

// Letter reveal animation - Apple style flip + fade
const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    rotateX: -80,
    scale: 0.5,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: appleSpring,
  },
}

// Shimmer animation after reveal
const shimmerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 1, 0],
    transition: {
      duration: 1.5,
      delay: 0.8,
      ease: 'easeInOut',
    },
  },
}

interface AnimatedWordProps {
  text: string
  className?: string
}

export function AnimatedWord({ text, className }: AnimatedWordProps) {
  const letters = Array.from(text)
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <span className={cn('apple-word-static', className)}>
        {text}
      </span>
    )
  }

  return (
    <span className={cn('apple-word-container', className)}>
      {/* Main animated text */}
      <motion.span
        className="apple-word-text"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ perspective: '1000px' }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            className="apple-word-letter"
            variants={letterVariants}
            style={{
              display: 'inline-block',
              transformStyle: 'preserve-3d',
              willChange: 'transform, opacity, filter',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.span>

      {/* Shimmer overlay */}
      <motion.span
        className="apple-word-shimmer"
        variants={shimmerVariants}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
      />

      {/* Glow layer */}
      <span className="apple-word-glow" aria-hidden="true">
        {text}
      </span>
    </span>
  )
}
