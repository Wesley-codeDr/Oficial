'use client';

import * as React from 'react';
import type { Variants, Transition } from 'framer-motion';
import type { SymbolAnimation, SymbolAnimationConfig, AnimationDirection } from '../types';
import {
  animationVariantMap,
  getAnimationVariants,
  getReplaceInVariants,
  getReplaceOutVariants,
} from '../presets/animations';
import { useReducedMotion } from './useVariableColor';

export interface UseSymbolAnimationOptions {
  /** Animation type or full configuration */
  animation?: SymbolAnimation | SymbolAnimationConfig;
  /** Trigger animation (for controlled mode) */
  trigger?: boolean;
  /** Callback when animation completes */
  onComplete?: () => void;
  /** Whether to respect reduced motion preference */
  respectReducedMotion?: boolean;
}

export interface UseSymbolAnimationReturn {
  /** Framer Motion variants */
  variants: Variants;
  /** Initial animation state */
  initial: string | undefined;
  /** Animate state */
  animate: string | undefined;
  /** Exit state */
  exit: string | undefined;
  /** Animation key for forcing re-animation */
  animationKey: number;
  /** Whether animation should be active */
  isActive: boolean;
  /** Manually trigger animation */
  triggerAnimation: () => void;
  /** Animation complete handler */
  handleAnimationComplete: () => void;
}

/**
 * Hook for managing symbol animations with Framer Motion
 *
 * @example
 * ```tsx
 * const { variants, initial, animate, handleAnimationComplete } = useSymbolAnimation({
 *   animation: 'bounce',
 *   onComplete: () => console.log('Animation done!'),
 * });
 *
 * return (
 *   <motion.div
 *     variants={variants}
 *     initial={initial}
 *     animate={animate}
 *     onAnimationComplete={handleAnimationComplete}
 *   >
 *     <Icon />
 *   </motion.div>
 * );
 * ```
 */
export function useSymbolAnimation(
  options: UseSymbolAnimationOptions = {}
): UseSymbolAnimationReturn {
  const {
    animation = 'none',
    trigger,
    onComplete,
    respectReducedMotion = true,
  } = options;

  const prefersReducedMotion = useReducedMotion();
  const [animationKey, setAnimationKey] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  // Parse animation config
  const animationConfig: SymbolAnimationConfig = React.useMemo(() => {
    if (typeof animation === 'string') {
      return { type: animation };
    }
    return animation;
  }, [animation]);

  // Check if animation should be disabled
  const isDisabled = React.useMemo(() => {
    if (animationConfig.type === 'none') return true;
    if (respectReducedMotion && prefersReducedMotion) return true;
    return false;
  }, [animationConfig.type, respectReducedMotion, prefersReducedMotion]);

  // Get variants
  const variants = React.useMemo(() => {
    if (isDisabled) return {};

    return getAnimationVariants(animationConfig.type, {
      direction: animationConfig.direction,
      speed: animationConfig.speed,
      repeat: animationConfig.repeat,
    });
  }, [animationConfig, isDisabled]);

  // Handle trigger changes
  React.useEffect(() => {
    if (trigger && !isDisabled) {
      setIsActive(true);
      setAnimationKey((prev) => prev + 1);
    }
  }, [trigger, isDisabled]);

  // Handle autoPlay
  React.useEffect(() => {
    if (animationConfig.autoPlay && !isDisabled) {
      const delay = animationConfig.delay || 0;
      const timer = setTimeout(() => {
        setIsActive(true);
      }, delay);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [animationConfig.autoPlay, animationConfig.delay, isDisabled]);

  // Animation complete handler
  const handleAnimationComplete = React.useCallback((): void => {
    // Check if animation should repeat
    if (animationConfig.repeat === 'infinity') {
      // Continue animation
      return;
    }

    setIsActive(false);
    onComplete?.();
  }, [animationConfig.repeat, onComplete]);

  // Manual trigger function
  const triggerAnimation = React.useCallback(() => {
    if (!isDisabled) {
      setIsActive(true);
      setAnimationKey((prev) => prev + 1);
    }
  }, [isDisabled]);

  // Determine animation states
  const initial = isDisabled ? undefined : 'initial';
  const animate = isDisabled ? undefined : isActive ? 'animate' : 'initial';
  const exit = isDisabled ? undefined : 'exit';

  return {
    variants,
    initial,
    animate,
    exit,
    animationKey,
    isActive,
    triggerAnimation,
    handleAnimationComplete,
  };
}

/**
 * Hook for replace animation between two icons
 */
export interface UseReplaceAnimationOptions {
  /** Direction of the replace animation */
  direction?: AnimationDirection;
  /** Callback when replace animation completes */
  onComplete?: () => void;
}

export interface UseReplaceAnimationReturn {
  /** Variants for outgoing icon */
  outVariants: Variants;
  /** Variants for incoming icon */
  inVariants: Variants;
  /** Animation key */
  animationKey: number;
  /** Whether replace is in progress */
  isReplacing: boolean;
  /** Start the replace animation */
  startReplace: () => void;
}

export function useReplaceAnimation(
  options: UseReplaceAnimationOptions = {}
): UseReplaceAnimationReturn {
  const { direction = 'down', onComplete } = options;

  const [animationKey, setAnimationKey] = React.useState(0);
  const [isReplacing, setIsReplacing] = React.useState(false);

  const outVariants = React.useMemo(
    () => getReplaceOutVariants(direction),
    [direction]
  );

  const inVariants = React.useMemo(
    () => getReplaceInVariants(direction === 'down' ? 'up' : direction),
    [direction]
  );

  const startReplace = React.useCallback(() => {
    setIsReplacing(true);
    setAnimationKey((prev) => prev + 1);
  }, []);

  React.useEffect(() => {
    if (isReplacing) {
      // Animation duration + buffer
      const timer = setTimeout(() => {
        setIsReplacing(false);
        onComplete?.();
      }, 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isReplacing, onComplete]);

  return {
    outVariants,
    inVariants,
    animationKey,
    isReplacing,
    startReplace,
  };
}

export default useSymbolAnimation;
