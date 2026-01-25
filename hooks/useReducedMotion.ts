'use client';

import { useState, useEffect } from 'react';

/**
 * Media query string for reduced motion preference
 */
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * useReducedMotion - Hook to detect and subscribe to prefers-reduced-motion preference
 *
 * This hook detects the user's system preference for reduced motion and
 * automatically updates when the preference changes.
 *
 * According to WCAG 2.1 and Apple Human Interface Guidelines:
 * - Users who prefer reduced motion should not see:
 *   - Parallax effects
 *   - Zoom effects
 *   - Bounce/spring animations
 *   - Spinning or continuous animations
 * - Instead, provide:
 *   - Simple fades or no animation
 *   - Instant transitions
 *   - Static alternatives
 *
 * @returns boolean - true if user prefers reduced motion, false otherwise
 *
 * @example
 * ```tsx
 * function AnimatedCard() {
 *   const prefersReducedMotion = useReducedMotion();
 *
 *   // Use different animation based on preference
 *   const variants = prefersReducedMotion
 *     ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
 *     : {
 *         initial: { opacity: 0, scale: 0.95, y: 20 },
 *         animate: { opacity: 1, scale: 1, y: 0 }
 *       };
 *
 *   return <motion.div {...variants}>Content</motion.div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * function ShimmerButton({ children }) {
 *   const prefersReducedMotion = useReducedMotion();
 *
 *   return (
 *     <button
 *       className={cn(
 *         'glass-button',
 *         // Disable shimmer animation for reduced motion
 *         !prefersReducedMotion && 'shimmer-effect'
 *       )}
 *     >
 *       {children}
 *     </button>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * function TransitionDuration() {
 *   const prefersReducedMotion = useReducedMotion();
 *
 *   // Return instant or very fast transitions for reduced motion
 *   const duration = prefersReducedMotion ? 0 : 300;
 *
 *   return duration;
 * }
 * ```
 */
export function useReducedMotion(): boolean {
  // Initialize with false for SSR, will be updated on client
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check if window is defined (client-side only)
    if (typeof window === 'undefined') {
      return;
    }

    // Create media query
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Event handler for preference changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Subscribe to changes
    // Using addEventListener for modern browsers
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup subscription
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Get animation duration based on reduced motion preference
 *
 * @param normalDuration - Duration in ms when motion is allowed
 * @param reducedDuration - Duration in ms when motion is reduced (default: 0)
 * @param prefersReducedMotion - Current reduced motion preference
 * @returns The appropriate duration based on preference
 *
 * @example
 * ```tsx
 * const prefersReducedMotion = useReducedMotion();
 * const duration = getAnimationDuration(300, 0, prefersReducedMotion);
 * ```
 */
export function getAnimationDuration(
  normalDuration: number,
  reducedDuration: number = 0,
  prefersReducedMotion: boolean
): number {
  return prefersReducedMotion ? reducedDuration : normalDuration;
}

/**
 * Get Framer Motion transition based on reduced motion preference
 *
 * @param prefersReducedMotion - Current reduced motion preference
 * @returns Framer Motion transition config
 *
 * @example
 * ```tsx
 * const prefersReducedMotion = useReducedMotion();
 * const transition = getMotionTransition(prefersReducedMotion);
 *
 * return <motion.div transition={transition}>Content</motion.div>;
 * ```
 */
export function getMotionTransition(prefersReducedMotion: boolean): {
  duration: number;
  ease: number[] | string;
} {
  if (prefersReducedMotion) {
    return {
      duration: 0,
      ease: 'linear',
    };
  }

  return {
    duration: 0.3,
    ease: [0.25, 1, 0.5, 1], // Apple ease-out curve
  };
}

export default useReducedMotion;
