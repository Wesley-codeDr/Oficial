/**
 * Apple Liquid Glass iOS 26 - Micro-Interactions System
 * 
 * Advanced animation tokens and utilities for haptic-like visual feedback
 */

import { Variants, Transition } from 'framer-motion'

// ==================== HAPTIC FEEDBACK VARIANTS ====================

/**
 * Simulates haptic feedback through visual micro-animations
 * Based on iOS 26 physics
 */
export const hapticFeedback = {
  /** Light tap - subtle bounce */
  light: {
    scale: [1, 0.97, 1.02, 1],
    transition: {
      duration: 0.2,
      times: [0, 0.3, 0.7, 1],
      ease: [0.25, 1, 0.5, 1],
    },
  },

  /** Medium tap - more pronounced */
  medium: {
    scale: [1, 0.95, 1.03, 1],
    transition: {
      duration: 0.25,
      times: [0, 0.25, 0.65, 1],
      ease: [0.25, 1, 0.5, 1],
    },
  },

  /** Heavy tap - strong feedback */
  heavy: {
    scale: [1, 0.92, 1.05, 0.98, 1],
    transition: {
      duration: 0.35,
      times: [0, 0.2, 0.5, 0.8, 1],
      ease: [0.25, 1, 0.5, 1],
    },
  },

  /** Success feedback - with glow pulse */
  success: {
    scale: [1, 1.08, 1],
    boxShadow: [
      '0 0 0 0 rgba(52, 199, 89, 0)',
      '0 0 20px 5px rgba(52, 199, 89, 0.4)',
      '0 0 0 0 rgba(52, 199, 89, 0)',
    ],
    transition: {
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1],
    },
  },

  /** Error feedback - shake */
  error: {
    x: [0, -8, 8, -6, 6, -3, 3, 0],
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    },
  },

  /** Warning feedback */
  warning: {
    scale: [1, 1.02, 0.98, 1.01, 1],
    rotate: [0, -1, 1, -0.5, 0],
    transition: {
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1],
    },
  },
} as const

// ==================== BUTTON ANIMATIONS ====================

export const buttonAnimations = {
  /** Press down effect */
  press: {
    scale: 0.96,
    y: 2,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },

  /** Hover lift effect */
  hover: {
    scale: 1.02,
    y: -2,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  },

  /** Focus glow */
  focus: {
    boxShadow: '0 0 0 3px rgba(0, 122, 255, 0.3)',
  },

  /** Spring transition for buttons */
  spring: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
    mass: 0.8,
  } as Transition,
} as const

// ==================== TOGGLE/SWITCH ANIMATIONS ====================

export const switchAnimations = {
  /** Knob movement */
  knob: {
    checked: {
      x: 20,
      backgroundColor: '#FFFFFF',
    },
    unchecked: {
      x: 0,
      backgroundColor: '#FFFFFF',
    },
    spring: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
      mass: 0.6,
    } as Transition,
  },

  /** Track color transition */
  track: {
    checked: {
      backgroundColor: '#34C759', // Apple green
    },
    unchecked: {
      backgroundColor: 'rgba(120, 120, 128, 0.32)',
    },
    transition: {
      duration: 0.2,
    },
  },

  /** Haptic on toggle */
  haptic: {
    scale: [1, 0.95, 1.02, 1],
    transition: {
      duration: 0.2,
    },
  },
} as const

// ==================== SLIDER ANIMATIONS ====================

export const sliderAnimations = {
  /** Thumb interactions */
  thumb: {
    rest: {
      scale: 1,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    },
    hover: {
      scale: 1.15,
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
    },
    drag: {
      scale: 1.25,
      boxShadow: '0 6px 24px rgba(0, 0, 0, 0.25)',
    },
  },

  /** Track fill animation */
  track: {
    spring: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    } as Transition,
  },

  /** Value tooltip */
  tooltip: {
    initial: { opacity: 0, y: 10, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 5, scale: 0.95 },
    transition: {
      duration: 0.15,
      ease: [0.25, 1, 0.5, 1],
    },
  },
} as const

// ==================== RIPPLE EFFECT ====================

export const rippleConfig = {
  /** Duration of ripple expansion */
  duration: 0.6,
  
  /** Easing curve */
  easing: [0.25, 1, 0.5, 1] as [number, number, number, number],
  
  /** Initial scale */
  initialScale: 0,
  
  /** Final scale */
  finalScale: 4,
  
  /** Initial opacity */
  initialOpacity: 0.35,
  
  /** Colors */
  colors: {
    light: 'rgba(0, 0, 0, 0.12)',
    dark: 'rgba(255, 255, 255, 0.2)',
    primary: 'rgba(0, 122, 255, 0.3)',
    success: 'rgba(52, 199, 89, 0.3)',
    error: 'rgba(255, 59, 48, 0.3)',
  },
} as const

// ==================== PAGE TRANSITIONS ====================

export const pageTransitions = {
  /** Fade transition */
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
  },

  /** Slide up transition */
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
  },

  /** Slide from right (iOS style) */
  slideRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
  },

  /** Scale fade (modal style) */
  scaleFade: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] },
  },

  /** Blur fade (glass style) */
  blurFade: {
    initial: { opacity: 0, filter: 'blur(10px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(5px)' },
    transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
  },
} as const

// ==================== LIST ANIMATIONS ====================

export const listAnimations = {
  /** Container for staggered children */
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  } as Variants,

  /** Individual list item */
  item: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  } as Variants,

  /** Swipe to delete */
  swipeDelete: {
    exit: {
      x: -300,
      opacity: 0,
      height: 0,
      marginTop: 0,
      marginBottom: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  },
} as const

// ==================== COUNTER ANIMATIONS ====================

export const counterAnimations = {
  /** Digit change animation */
  digit: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },

  /** Counter container */
  container: {
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  },
} as const

// ==================== SCROLL ANIMATIONS ====================

export const scrollAnimations = {
  /** Reveal on scroll */
  reveal: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  } as Variants,

  /** Parallax effect values */
  parallax: {
    slow: 0.3,
    medium: 0.5,
    fast: 0.8,
  },

  /** Sticky header animation */
  stickyHeader: {
    visible: {
      y: 0,
      opacity: 1,
      backdropFilter: 'blur(60px)',
    },
    hidden: {
      y: -100,
      opacity: 0,
    },
    transition: {
      duration: 0.3,
      ease: [0.25, 1, 0.5, 1],
    },
  },
} as const

// ==================== LOADING ANIMATIONS ====================

export const loadingAnimations = {
  /** Spinning loader */
  spin: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },

  /** Pulsing dots */
  pulse: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },

  /** Shimmer effect */
  shimmer: {
    x: ['-100%', '100%'],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    },
  },

  /** Skeleton loading */
  skeleton: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
} as const

// ==================== TOOLTIP ANIMATIONS ====================

export const tooltipAnimations = {
  /** Tooltip appearance */
  show: {
    initial: { opacity: 0, scale: 0.9, y: 5 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 2 },
    transition: {
      duration: 0.15,
      ease: [0.25, 1, 0.5, 1],
    },
  },
} as const

// ==================== MODAL ANIMATIONS ====================

export const modalAnimations = {
  /** Backdrop fade */
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },

  /** Modal content */
  content: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.98, y: 10 },
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },

  /** Bottom sheet style */
  bottomSheet: {
    initial: { opacity: 0, y: '100%' },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '100%' },
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
} as const

// ==================== EXPORTS ====================

export const microInteractions = {
  haptic: hapticFeedback,
  button: buttonAnimations,
  switch: switchAnimations,
  slider: sliderAnimations,
  ripple: rippleConfig,
  page: pageTransitions,
  list: listAnimations,
  counter: counterAnimations,
  scroll: scrollAnimations,
  loading: loadingAnimations,
  tooltip: tooltipAnimations,
  modal: modalAnimations,
} as const

export default microInteractions
