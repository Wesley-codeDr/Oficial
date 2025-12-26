/**
 * Shared animation constants and variants for Framer Motion
 * Matches the Dashboard's Apple-inspired animation style
 */

import type { Variants, Transition } from 'framer-motion'

// Apple-inspired easing function
export const appleEase = [0.22, 1, 0.36, 1] as const

// Spring configuration for buttons and interactive elements
export const springConfig = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20,
}

// Faster spring for snappy interactions
export const springFast = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 25,
}

// Fade up animation variant
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: appleEase,
    },
  },
}

// Fade in animation variant
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: appleEase,
    },
  },
}

// Scale in animation variant
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: springConfig,
  },
}

// Stagger children animation
export const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

// Container with stagger for forms
export const containerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Item variant for staggered lists
export const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springConfig,
  },
}

// Hover animation for cards
export const cardHover = {
  scale: 1.02,
  y: -4,
}

// Tap animation for interactive elements
export const cardTap = {
  scale: 0.98,
}

// Button hover/tap animations
export const buttonHover = {
  scale: 1.02,
}

export const buttonTap = {
  scale: 0.98,
}

// Blob animation for background elements
export const blobAnimation = (duration: number = 26) => ({
  x: [0, 40, -20, 0],
  y: [0, -30, 20, 0],
})

export const blobTransition = (duration: number = 26): Transition => ({
  duration,
  repeat: Infinity,
  ease: 'easeInOut',
})

// Pulse animation for status indicators
export const pulseAnimation = {
  scale: [1, 1.2, 1],
  opacity: [0.7, 1, 0.7],
}

export const pulseTransition: Transition = {
  duration: 2,
  repeat: Infinity,
  ease: 'easeInOut',
}
