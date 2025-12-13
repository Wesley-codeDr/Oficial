/**
 * Apple 2025 Animation Presets
 * Framer Motion animation configurations for Liquid Glass design
 */

import type { Transition, Variants } from 'framer-motion';

// ============================================
// TRANSITION PRESETS
// ============================================

/** Apple-style spring physics */
export const appleSpring: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
};

/** Bouncy spring for playful interactions */
export const bouncySpring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
};

/** Gentle spring for subtle movements */
export const gentleSpring: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
};

/** Liquid glass smooth transition */
export const liquidTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1], // Apple ease curve
};

/** Quick snap transition */
export const snapTransition: Transition = {
  duration: 0.2,
  ease: [0.25, 0.1, 0.25, 1],
};

/** Slow reveal transition */
export const revealTransition: Transition = {
  duration: 0.7,
  ease: [0.25, 0.1, 0.25, 1],
};

// ============================================
// ANIMATION VARIANTS
// ============================================

/** Fade in from bottom with scale */
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: liquidTransition,
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: snapTransition,
  },
};

/** Scale in from center */
export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: appleSpring,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: snapTransition,
  },
};

/** Slide in from left */
export const slideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: liquidTransition,
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: snapTransition,
  },
};

/** Slide in from right */
export const slideInRight: Variants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: liquidTransition,
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: snapTransition,
  },
};

/** Staggered children animation */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/** Fast stagger for lists */
export const fastStagger: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

/** Individual stagger child */
export const staggerChild: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: liquidTransition,
  },
};

// ============================================
// HOVER ANIMATIONS
// ============================================

/** Glass card hover effect */
export const glassHover = {
  scale: 1.02,
  y: -2,
  transition: appleSpring,
};

/** Glass card tap effect */
export const glassTap = {
  scale: 0.98,
  transition: snapTransition,
};

/** Button hover effect */
export const buttonHover = {
  scale: 1.05,
  transition: appleSpring,
};

/** Button tap effect */
export const buttonTap = {
  scale: 0.95,
  transition: snapTransition,
};

/** Subtle hover for interactive elements */
export const subtleHover = {
  scale: 1.02,
  transition: gentleSpring,
};

// ============================================
// DRAG ANIMATIONS (Apple HIG 2025)
// ============================================

/** Kanban card drag animation */
export const dragVariants: Variants = {
  initial: {
    scale: 1,
    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
    filter: 'grayscale(0%) blur(0px)',
  },
  dragging: {
    scale: 1.05,
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
    filter: 'grayscale(0%) blur(0px)',
    zIndex: 100,
    transition: appleSpring,
  },
  dropped: {
    scale: 0.95,
    opacity: 0.4,
    filter: 'grayscale(100%) blur(1px)',
    transition: snapTransition,
  },
};

/**
 * Drag elevation effect - Apple HIG style
 * Item floats with elevated shadow during drag
 */
export const dragElevation: Variants = {
  idle: {
    scale: 1,
    rotate: 0,
    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
  },
  elevated: {
    scale: 1.05,
    rotate: 2,
    boxShadow: '0 25px 50px -10px rgba(0,0,0,0.2), 0 15px 30px -5px rgba(0,0,0,0.1)',
    transition: appleSpring,
  },
};

/**
 * Drop impact animation - Apple HIG style
 * Spring animation when item lands
 */
export const dropImpact: Variants = {
  dropping: {
    scale: 1.05,
    boxShadow: '0 20px 40px -5px rgba(0,0,0,0.15)',
  },
  landed: {
    scale: [1.05, 0.98, 1],
    boxShadow: [
      '0 20px 40px -5px rgba(0,0,0,0.15)',
      '0 5px 15px -3px rgba(0,0,0,0.08)',
      '0 4px 20px rgba(0,0,0,0.02)',
    ],
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
      duration: 0.3,
    },
  },
};

/**
 * Magnetic snap transition - Apple HIG style
 * Used when items snap to drop zones
 */
export const magneticSnap: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 35,
  mass: 0.8,
};

/**
 * Drop zone highlight animation
 */
export const dropZoneHighlight: Variants = {
  inactive: {
    scale: 1,
    backgroundColor: 'rgba(0, 122, 255, 0)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  active: {
    scale: 1.01,
    backgroundColor: 'rgba(0, 122, 255, 0.08)',
    borderColor: 'rgba(0, 122, 255, 0.3)',
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

/**
 * Sortable item reorder animation
 */
export const sortableReorder: Variants = {
  initial: {
    opacity: 1,
    scale: 1,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0.4,
    scale: 0.95,
    transition: snapTransition,
  },
};

// ============================================
// PAGE TRANSITIONS
// ============================================

/** Page enter/exit animation */
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// ============================================
// MODAL ANIMATIONS
// ============================================

/** Modal backdrop animation */
export const modalBackdrop: Variants = {
  initial: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
  },
  animate: {
    opacity: 1,
    backdropFilter: 'blur(12px)',
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: {
      duration: 0.2,
    },
  },
};

/** Modal content animation */
export const modalContent: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: appleSpring,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: snapTransition,
  },
};

// ============================================
// SPECIAL EFFECTS
// ============================================

/** Floating animation for cards */
export const floatingAnimation = {
  y: [0, -5, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

/** Pulse glow animation */
export const pulseGlow = {
  opacity: [0.5, 1, 0.5],
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
};

/** Shimmer effect for loading */
export const shimmerAnimation = {
  x: [-1000, 1000],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'linear',
  },
};

/** Logo wave animation */
export const logoWave = {
  x: [0, 4, 0],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: 'easeOut',
  },
};

/** Gradient shift animation */
export const gradientShift = {
  backgroundPosition: ['0% 50%', '200% 50%'],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: 'linear',
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Creates a delayed version of any variants
 */
export function withDelay(variants: Variants, delay: number): Variants {
  return {
    ...variants,
    animate: {
      ...(variants.animate as object),
      transition: {
        ...((variants.animate as { transition?: Transition })?.transition ?? {}),
        delay,
      },
    },
  };
}

/**
 * Creates staggered children with custom delay
 */
export function createStagger(staggerDelay: number, initialDelay = 0): Variants {
  return {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };
}
