import type { Variants, Transition } from 'framer-motion';
import type { SymbolAnimation, AnimationDirection } from '../types';
import { ANIMATION_DURATIONS, ANIMATION_EASINGS } from '../constants';

/**
 * SF Symbols Animation Presets
 *
 * Framer Motion variants for all SF Symbols animation types.
 * These animations match the behavior described in Apple's HIG.
 *
 * @see https://developer.apple.com/design/human-interface-guidelines/sf-symbols#Animations
 */

// ============================================
// TRANSITION PRESETS
// ============================================

/** Spring transition for bouncy animations */
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
};

/** Bouncy spring for playful animations */
export const bouncyTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 15,
  bounce: 0.4,
};

/** Smooth easing transition */
export const smoothTransition: Transition = {
  duration: ANIMATION_DURATIONS.normal / 1000,
  ease: ANIMATION_EASINGS.smooth,
};

/** Fast transition */
export const fastTransition: Transition = {
  duration: ANIMATION_DURATIONS.fast / 1000,
  ease: ANIMATION_EASINGS.smooth,
};

// ============================================
// APPEAR / DISAPPEAR
// ============================================

/** Appear animation - scale up with bounce */
export const appearVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: bouncyTransition,
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: smoothTransition,
  },
};

/** Disappear animation - scale down and fade */
export const disappearVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  animate: {
    scale: 0,
    opacity: 0,
    transition: smoothTransition,
  },
};

// ============================================
// BOUNCE
// ============================================

/** Bounce animation - vertical elastic movement */
export const bounceVariants: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [0, -8, 0, -4, 0],
    transition: {
      duration: 0.6,
      ease: ANIMATION_EASINGS.bounce,
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  },
};

/** Bounce down variant */
export const bounceDownVariants: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [0, 8, 0, 4, 0],
    transition: {
      duration: 0.6,
      ease: ANIMATION_EASINGS.bounce,
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  },
};

// ============================================
// SCALE
// ============================================

/** Scale animation - pop effect */
export const scaleVariants: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.4,
      ease: ANIMATION_EASINGS.spring,
    },
  },
};

/** Scale up (stays scaled) */
export const scaleUpVariants: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: 1.15,
    transition: springTransition,
  },
};

/** Scale down (stays scaled) */
export const scaleDownVariants: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: 0.85,
    transition: springTransition,
  },
};

// ============================================
// PULSE
// ============================================

/** Pulse animation - opacity variation */
export const pulseVariants: Variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: [1, 0.4, 1],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

/** Pulse once (non-repeating) */
export const pulseOnceVariants: Variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: [1, 0.4, 1],
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};

// ============================================
// WIGGLE
// ============================================

/** Wiggle animation - rotation oscillation */
export const wiggleVariants: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: [0, -12, 12, -8, 8, -4, 4, 0],
    transition: {
      duration: 0.5,
      ease: ANIMATION_EASINGS.smooth,
    },
  },
};

/** Gentle wiggle */
export const wiggleGentleVariants: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: [0, -6, 6, -4, 4, 0],
    transition: {
      duration: 0.4,
      ease: ANIMATION_EASINGS.smooth,
    },
  },
};

// ============================================
// BREATHE
// ============================================

/** Breathe animation - gentle scale and opacity */
export const breatheVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  animate: {
    scale: [1, 1.08, 1],
    opacity: [1, 0.9, 1],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

/** Breathe once (non-repeating) */
export const breatheOnceVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  animate: {
    scale: [1, 1.08, 1],
    opacity: [1, 0.9, 1],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

// ============================================
// ROTATE
// ============================================

/** Rotate animation - continuous rotation */
export const rotateVariants: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

/** Rotate once (single rotation) */
export const rotateOnceVariants: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: 360,
    transition: {
      duration: 0.5,
      ease: ANIMATION_EASINGS.spring,
    },
  },
};

/** Counter-clockwise rotation */
export const rotateCCWVariants: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: -360,
    transition: {
      duration: 1,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

// ============================================
// REPLACE
// ============================================

/**
 * Generate replace out variants based on direction
 */
export function getReplaceOutVariants(direction: AnimationDirection = 'down'): Variants {
  const transforms: Record<AnimationDirection, { y?: number; x?: number }> = {
    up: { y: -20 },
    down: { y: 20 },
    forward: { x: 20 },
    backward: { x: -20 },
  };

  return {
    initial: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    animate: {
      ...transforms[direction],
      opacity: 0,
      scale: 0.8,
      transition: smoothTransition,
    },
  };
}

/**
 * Generate replace in variants based on direction
 */
export function getReplaceInVariants(direction: AnimationDirection = 'up'): Variants {
  const transforms: Record<AnimationDirection, { y?: number; x?: number }> = {
    up: { y: 20 },
    down: { y: -20 },
    forward: { x: -20 },
    backward: { x: 20 },
  };

  return {
    initial: {
      ...transforms[direction],
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: bouncyTransition,
    },
  };
}

/** Down-up replace (default) */
export const replaceDownUpOutVariants = getReplaceOutVariants('down');
export const replaceDownUpInVariants = getReplaceInVariants('up');

/** Up-up replace */
export const replaceUpUpOutVariants = getReplaceOutVariants('up');
export const replaceUpUpInVariants = getReplaceInVariants('up');

/** Off-up replace (instant out) */
export const replaceOffUpOutVariants: Variants = {
  initial: {
    opacity: 1,
    scale: 1,
  },
  animate: {
    opacity: 0,
    scale: 1,
    transition: {
      duration: 0,
    },
  },
};

export const replaceOffUpInVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: bouncyTransition,
  },
};

// ============================================
// VARIABLE COLOR
// ============================================

/** Variable color layer transition */
export const variableColorLayerVariants: Variants = {
  inactive: {
    color: 'var(--symbol-vc-inactive)',
    opacity: 0.4,
    transition: smoothTransition,
  },
  active: {
    color: 'var(--symbol-vc-active)',
    opacity: 1,
    transition: smoothTransition,
  },
};

// ============================================
// VARIANT MAP
// ============================================

/**
 * Map animation types to their variants
 */
export const animationVariantMap: Record<SymbolAnimation, Variants> = {
  none: {},
  appear: appearVariants,
  disappear: disappearVariants,
  bounce: bounceVariants,
  scale: scaleVariants,
  pulse: pulseVariants,
  variableColor: variableColorLayerVariants,
  replace: {}, // Handled separately with getReplaceVariants
  wiggle: wiggleVariants,
  breathe: breatheVariants,
  rotate: rotateVariants,
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get animation variants with custom configuration
 */
export function getAnimationVariants(
  animation: SymbolAnimation,
  options?: {
    direction?: AnimationDirection;
    speed?: number;
    repeat?: number | 'infinity';
  }
): Variants {
  const baseVariants: Variants = { ...animationVariantMap[animation] };

  if (!baseVariants.animate || typeof baseVariants.animate !== 'object') {
    return baseVariants;
  }

  // Clone the animate variant
  const animateVariant = baseVariants.animate as { transition?: Transition; [key: string]: unknown };
  const animate: { transition?: Transition; [key: string]: unknown } = { ...animateVariant };
  const transition: Transition = { ...(animate.transition || {}) };

  // Apply speed modifier
  if (options?.speed && typeof transition.duration === 'number') {
    transition.duration = transition.duration / options.speed;
  }

  // Apply repeat
  if (options?.repeat !== undefined) {
    transition.repeat = options.repeat === 'infinity' ? Infinity : options.repeat;
  }

  animate.transition = transition;

  return {
    ...baseVariants,
    animate: animate as Variants['animate'],
  };
}

/**
 * Create custom animation variants
 */
export function createCustomAnimation(
  keyframes: Record<string, (string | number)[]>,
  transition?: Transition
): Variants {
  const initialState = Object.fromEntries(
    Object.entries(keyframes).map(([key, values]) => [key, values[0]])
  ) as Record<string, string | number>;

  const animateState = Object.fromEntries(
    Object.entries(keyframes).map(([key, values]) => [key, values])
  ) as Record<string, (string | number)[]>;

  return {
    initial: initialState,
    animate: {
      ...animateState,
      transition: transition || smoothTransition,
    },
  };
}
