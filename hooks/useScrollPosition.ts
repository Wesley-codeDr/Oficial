'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * Scroll direction type
 */
export type ScrollDirection = 'up' | 'down' | 'none';

/**
 * Scroll position state returned by the hook
 */
export interface ScrollPositionState {
  /** Current scroll Y position in pixels */
  scrollY: number;
  /** Current scroll X position in pixels */
  scrollX: number;
  /** Scroll direction (up, down, or none) */
  direction: ScrollDirection;
  /** Scroll velocity in pixels per frame */
  velocity: number;
  /** Whether scroll position is past the threshold */
  isPastThreshold: boolean;
  /** Scroll progress as a percentage (0-1) based on progressDistance */
  progress: number;
  /** Whether user is currently scrolling */
  isScrolling: boolean;
}

/**
 * Options for useScrollPosition hook
 */
export interface UseScrollPositionOptions {
  /**
   * Scroll threshold in pixels for isPastThreshold calculation
   * @default 50
   */
  threshold?: number;
  /**
   * Distance in pixels to calculate scroll progress (0-1)
   * @default 200
   */
  progressDistance?: number;
  /**
   * Debounce delay in milliseconds for performance
   * @default 10
   */
  debounceMs?: number;
  /**
   * Delay in ms before isScrolling becomes false after scroll stops
   * @default 150
   */
  scrollingTimeout?: number;
  /**
   * Custom scroll container element (defaults to window)
   */
  container?: HTMLElement | null;
  /**
   * Whether to track horizontal scroll
   * @default false
   */
  trackHorizontal?: boolean;
}

// ============================================
// HOOK IMPLEMENTATION
// ============================================

/**
 * useScrollPosition - Track scroll position with requestAnimationFrame
 *
 * Provides:
 * - Current scroll position (X and Y)
 * - Scroll direction (up/down/none)
 * - Scroll velocity (pixels per frame)
 * - Threshold detection
 * - Scroll progress (0-1)
 * - Scrolling state
 *
 * Uses requestAnimationFrame for smooth performance and debouncing.
 *
 * @param options - Configuration options
 * @returns ScrollPositionState - Current scroll state
 *
 * @example
 * ```tsx
 * function GlassHeader() {
 *   const { isPastThreshold, direction, progress } = useScrollPosition({
 *     threshold: 50,
 *     progressDistance: 200
 *   });
 *
 *   // Shrink header when scrolled past threshold
 *   const height = isPastThreshold ? 48 : 64;
 *
 *   // Increase blur based on scroll progress
 *   const blur = 40 + (progress * 20);
 *
 *   return (
 *     <header style={{ height, backdropFilter: `blur(${blur}px)` }}>
 *       Navigation
 *     </header>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * function ScrollDirectionIndicator() {
 *   const { direction, velocity } = useScrollPosition();
 *
 *   return (
 *     <div>
 *       Direction: {direction}
 *       Velocity: {velocity.toFixed(2)} px/frame
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * function HideOnScrollNav() {
 *   const { direction, isPastThreshold } = useScrollPosition({ threshold: 100 });
 *
 *   // Hide when scrolling down and past threshold
 *   const isHidden = direction === 'down' && isPastThreshold;
 *
 *   return (
 *     <nav style={{ transform: isHidden ? 'translateY(-100%)' : 'translateY(0)' }}>
 *       Links
 *     </nav>
 *   );
 * }
 * ```
 */
export function useScrollPosition(
  options: UseScrollPositionOptions = {}
): ScrollPositionState {
  const {
    threshold = 50,
    progressDistance = 200,
    debounceMs = 10,
    scrollingTimeout = 150,
    container = null,
    trackHorizontal = false,
  } = options;

  // ----------------------------------------
  // State
  // ----------------------------------------
  const [state, setState] = useState<ScrollPositionState>({
    scrollY: 0,
    scrollX: 0,
    direction: 'none',
    velocity: 0,
    isPastThreshold: false,
    progress: 0,
    isScrolling: false,
  });

  // ----------------------------------------
  // Refs for tracking
  // ----------------------------------------
  const lastScrollY = useRef<number>(0);
  const lastScrollX = useRef<number>(0);
  const lastTime = useRef<number>(performance.now());
  const ticking = useRef<boolean>(false);
  const scrollingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastUpdateTime = useRef<number>(0);

  // ----------------------------------------
  // Get scroll position from container or window
  // ----------------------------------------
  const getScrollPosition = useCallback(() => {
    if (container) {
      return {
        scrollY: container.scrollTop,
        scrollX: container.scrollLeft,
      };
    }

    if (typeof window === 'undefined') {
      return { scrollY: 0, scrollX: 0 };
    }

    return {
      scrollY: window.scrollY || window.pageYOffset,
      scrollX: window.scrollX || window.pageXOffset,
    };
  }, [container]);

  // ----------------------------------------
  // Update state with scroll position
  // ----------------------------------------
  const updateScrollPosition = useCallback(() => {
    const now = performance.now();

    // Debounce check
    if (now - lastUpdateTime.current < debounceMs) {
      ticking.current = false;
      return;
    }

    lastUpdateTime.current = now;

    const { scrollY, scrollX } = getScrollPosition();

    // Calculate direction
    let direction: ScrollDirection = 'none';
    if (scrollY > lastScrollY.current) {
      direction = 'down';
    } else if (scrollY < lastScrollY.current) {
      direction = 'up';
    }

    // Calculate velocity (pixels per frame, roughly 16ms)
    const timeDelta = now - lastTime.current;
    const positionDelta = Math.abs(scrollY - lastScrollY.current);
    const velocity = timeDelta > 0 ? (positionDelta / timeDelta) * 16 : 0;

    // Calculate threshold and progress
    const isPastThreshold = scrollY > threshold;
    const progress = Math.min(scrollY / progressDistance, 1);

    // Update state
    setState({
      scrollY,
      scrollX: trackHorizontal ? scrollX : 0,
      direction,
      velocity,
      isPastThreshold,
      progress,
      isScrolling: true,
    });

    // Update refs
    lastScrollY.current = scrollY;
    lastScrollX.current = scrollX;
    lastTime.current = now;
    ticking.current = false;

    // Reset scrolling state after timeout
    if (scrollingTimeoutRef.current) {
      clearTimeout(scrollingTimeoutRef.current);
    }

    scrollingTimeoutRef.current = setTimeout(() => {
      setState(prev => ({ ...prev, isScrolling: false, direction: 'none' }));
    }, scrollingTimeout);
  }, [
    debounceMs,
    getScrollPosition,
    threshold,
    progressDistance,
    scrollingTimeout,
    trackHorizontal,
  ]);

  // ----------------------------------------
  // Request animation frame handler
  // ----------------------------------------
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(updateScrollPosition);
      ticking.current = true;
    }
  }, [updateScrollPosition]);

  // ----------------------------------------
  // Setup scroll listener
  // ----------------------------------------
  useEffect(() => {
    // Set initial state
    const { scrollY, scrollX } = getScrollPosition();
    lastScrollY.current = scrollY;
    lastScrollX.current = scrollX;

    setState(prev => ({
      ...prev,
      scrollY,
      scrollX: trackHorizontal ? scrollX : 0,
      isPastThreshold: scrollY > threshold,
      progress: Math.min(scrollY / progressDistance, 1),
    }));

    // Get scroll target
    const scrollTarget = container || window;

    // Add event listener with passive flag for performance
    scrollTarget.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      scrollTarget.removeEventListener('scroll', handleScroll);

      if (scrollingTimeoutRef.current) {
        clearTimeout(scrollingTimeoutRef.current);
      }
    };
  }, [
    container,
    getScrollPosition,
    handleScroll,
    progressDistance,
    threshold,
    trackHorizontal,
  ]);

  return state;
}

/**
 * Utility function to check if scroll is past multiple thresholds
 *
 * @param scrollY - Current scroll Y position
 * @param thresholds - Array of threshold values in pixels
 * @returns Object with threshold states
 *
 * @example
 * ```tsx
 * const { scrollY } = useScrollPosition();
 * const thresholds = checkScrollThresholds(scrollY, [50, 100, 200]);
 * // thresholds = { 50: true, 100: true, 200: false }
 * ```
 */
export function checkScrollThresholds(
  scrollY: number,
  thresholds: number[]
): Record<number, boolean> {
  return thresholds.reduce((acc, threshold) => {
    acc[threshold] = scrollY > threshold;
    return acc;
  }, {} as Record<number, boolean>);
}

/**
 * Calculate scroll progress between two points
 *
 * @param scrollY - Current scroll Y position
 * @param start - Start position in pixels
 * @param end - End position in pixels
 * @returns Progress value between 0 and 1
 *
 * @example
 * ```tsx
 * const { scrollY } = useScrollPosition();
 * // Progress from 100px to 300px
 * const progress = calculateScrollProgress(scrollY, 100, 300);
 * ```
 */
export function calculateScrollProgress(
  scrollY: number,
  start: number,
  end: number
): number {
  if (scrollY <= start) return 0;
  if (scrollY >= end) return 1;
  return (scrollY - start) / (end - start);
}

export default useScrollPosition;
