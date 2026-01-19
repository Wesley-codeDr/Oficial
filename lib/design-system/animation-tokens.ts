/**
 * Apple Liquid Glass 2026 - Animation Physics Tokens
 *
 * Based on Apple Human Interface Guidelines WWDC 2025
 * Motion principles: Fluid spring physics, responds to direct touch
 * with greater emphasis, brief and precise feedback animations.
 */

/**
 * Apple Liquid Glass 2026 Spring Physics
 * Use these tokens with Framer Motion (transition prop)
 */
export const applePhysics = {
  /**
   * Default UI interactions (buttons, switches, popovers)
   * Stiffness: 350, Damping: 32 - Apple HIG standard
   */
  default: {
    type: "spring" as const,
    stiffness: 350,
    damping: 32,
    mass: 1,
  },

  /**
   * Liquid Glass Specific - "Heavy/Premium" feel
   * Slightly more "drift" to feel the material weight
   */
  glass: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 1.1,
  },

  /**
   * Soft transitions for larger elements or modals
   * More comfortable entrance feeling
   */
  soft: {
    type: "spring" as const,
    stiffness: 200,
    damping: 28,
    mass: 1,
  },

  /**
   * Gesture interactions (drag, rubber band)
   * More rigid and immediately responsive
   */
  gesture: {
    type: "spring" as const,
    stiffness: 450,
    damping: 42,
    mass: 1,
  },

  /**
   * Spatial/3D motion (Z-axis, stacks)
   * Heavier for perceived depth
   */
  spatial: {
    type: "spring" as const,
    stiffness: 280,
    damping: 30,
    mass: 1.2,
  },

  /**
   * Haptic-like micro-interactions
   * Fast, brief, precise feedback
   */
  haptic: {
    type: "spring" as const,
    stiffness: 600,
    damping: 40,
    mass: 0.7,
  },

  /**
   * Layout transitions (shared layout animations)
   */
  layout: {
    type: "spring" as const,
    stiffness: 400,
    damping: 35,
    mass: 1,
  },

  /**
   * Opacity and blur transitions
   */
  blur: {
    initial: { filter: "blur(20px)", opacity: 0 },
    animate: { filter: "blur(0px)", opacity: 1 },
    exit: { filter: "blur(12px)", opacity: 0 },
    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
  },
} as const;

/**
 * Apple 2026 Timing Tokens (seconds for Framer Motion)
 */
export const appleTiming = {
  micro: 0.15, // Haptic feedback, tiny state changes
  default: 0.3, // Standard UI transitions
  layout: 0.45, // Layout shifts, expanding panels
  modal: 0.6, // Modal entrance/exit
  page: 0.8, // Page transitions
} as const;

/**
 * Apple 2026 Easing Curves (Cubic Bezier)
 */
export const appleEasing = {
  // Standard Apple deceleration (viscous out)
  standard: [0.16, 1, 0.3, 1] as [number, number, number, number],
  // Smooth entrance, fast exit
  in: [0.4, 0, 1, 1] as [number, number, number, number],
  // Fast entrance, smooth exit
  out: [0, 0, 0.2, 1] as [number, number, number, number],
  // Symmetric acceleration/deceleration
  inOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
  // Liquid Glass specific - smooth and organic
  liquidGlass: [0.25, 1, 0.5, 1] as [number, number, number, number],
  // Bounce feel for interactive elements
  bounce: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
} as const;

/**
 * Spatial depth patterns for background elements (stacks, cards)
 */
export const spatialDepth = {
  inactive: {
    scale: 0.96,
    opacity: 0.7,
    filter: "blur(4px)",
    y: -12,
    rotateX: 2,
  },
  hidden: {
    scale: 0.9,
    opacity: 0,
    filter: "blur(12px)",
    y: -30,
    rotateX: 5,
  },
} as const;

/**
 * Scroll-Reactive Animation Configs
 * Tab bars shrink on scroll, fluidly expand on scroll back
 */
export const scrollAnimations = {
  /**
   * Header shrink animation
   * Triggered when scrolling past threshold (50px)
   */
  header: {
    expanded: {
      height: 64,
      paddingY: 16,
      backdropBlur: 80,
      backgroundOpacity: 0.22,
    },
    collapsed: {
      height: 48,
      paddingY: 8,
      backdropBlur: 100,
      backgroundOpacity: 0.32,
    },
    threshold: 50,
    transition: {
      type: "spring" as const,
      stiffness: 350,
      damping: 32,
    },
  },

  /**
   * Tab bar shrink animation
   * Labels fade out, icons shrink
   */
  tabBar: {
    expanded: {
      height: 56,
      iconSize: 24,
      labelOpacity: 1,
      labelScale: 1,
    },
    collapsed: {
      height: 44,
      iconSize: 20,
      labelOpacity: 0,
      labelScale: 0.8,
    },
    threshold: 100,
    transition: {
      type: "spring" as const,
      stiffness: 350,
      damping: 32,
    },
  },

  /**
   * Sidebar collapse animation
   */
  sidebar: {
    expanded: {
      width: 280,
      opacity: 1,
    },
    collapsed: {
      width: 72,
      opacity: 0.9,
    },
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  },
} as const;

/**
 * Interactive hover states
 */
export const hoverAnimations = {
  /**
   * Card hover - lift and scale
   */
  card: {
    scale: 1.015,
    y: -4,
    transition: {
      type: "spring" as const,
      stiffness: 350,
      damping: 25,
    },
  },

  /**
   * Button hover - subtle lift
   */
  button: {
    scale: 1.02,
    y: -2,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 30,
    },
  },

  /**
   * Icon hover - rotation for visual interest
   */
  icon: {
    scale: 1.1,
    rotate: 5,
    transition: {
      type: "spring" as const,
      stiffness: 350,
      damping: 25,
    },
  },
} as const;

/**
 * Press/tap animations
 */
export const pressAnimations = {
  /**
   * Standard button press
   */
  button: {
    scale: 0.96,
    transition: {
      type: "spring" as const,
      stiffness: 600,
      damping: 40,
      mass: 0.7,
    },
  },

  /**
   * Card press
   */
  card: {
    scale: 0.98,
    transition: {
      type: "spring" as const,
      stiffness: 500,
      damping: 35,
    },
  },
} as const;

/**
 * Entrance animations
 */
export const entranceAnimations = {
  /**
   * Fade up entrance
   */
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: applePhysics.glass,
  },

  /**
   * Scale fade entrance
   */
  scaleFade: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: applePhysics.soft,
  },

  /**
   * Blur fade entrance (Liquid Glass specific)
   */
  blurFade: {
    initial: { opacity: 0, filter: "blur(20px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    transition: { duration: 0.5, ease: appleEasing.standard },
  },

  /**
   * Staggered children entrance
   */
  stagger: {
    container: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    item: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: applePhysics.default,
    },
  },
} as const;

/**
 * Export all animation tokens
 */
export const animationTokens = {
  physics: applePhysics,
  timing: appleTiming,
  easing: appleEasing,
  spatialDepth,
  scroll: scrollAnimations,
  hover: hoverAnimations,
  press: pressAnimations,
  entrance: entranceAnimations,
} as const;

export default animationTokens;
