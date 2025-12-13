'use client';

import { useState, useEffect, useCallback, type RefObject } from 'react';

interface ScrollEdgeState {
  /** Whether scroll is at the top (within threshold) */
  isAtTop: boolean;
  /** Whether scroll is at the bottom (within threshold) */
  isAtBottom: boolean;
  /** Scroll progress from 0 to 1 */
  scrollProgress: number;
  /** Current scroll position in pixels */
  scrollTop: number;
  /** Whether the element can scroll (content exceeds container) */
  canScroll: boolean;
}

interface UseScrollEdgeOptions {
  /** Threshold in pixels to consider "at edge" (default: 10) */
  threshold?: number;
  /** Throttle delay in milliseconds (default: 16 - ~60fps) */
  throttleMs?: number;
}

/**
 * useScrollEdge - Detects scroll position for edge effects.
 *
 * Apple HIG: Controls should transition when content scrolls beneath them.
 * Use this hook to show scroll edge effects (shadows, borders) when content
 * is scrolled away from the top or bottom.
 *
 * @param ref - RefObject to the scrollable element
 * @param options - Configuration options
 * @returns ScrollEdgeState with position information
 *
 * @example
 * ```tsx
 * const scrollRef = useRef<HTMLDivElement>(null);
 * const { isAtTop, canScroll } = useScrollEdge(scrollRef);
 *
 * return (
 *   <div
 *     ref={scrollRef}
 *     className="scroll-edge-top"
 *     data-scrolled={!isAtTop}
 *     data-can-scroll={canScroll}
 *   >
 *     <YourContent />
 *   </div>
 * );
 * ```
 */
export function useScrollEdge(
  ref: RefObject<HTMLElement>,
  options: UseScrollEdgeOptions = {}
): ScrollEdgeState {
  const { threshold = 10, throttleMs = 16 } = options;

  const [state, setState] = useState<ScrollEdgeState>({
    isAtTop: true,
    isAtBottom: false,
    scrollProgress: 0,
    scrollTop: 0,
    canScroll: false,
  });

  const handleScroll = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    const { scrollTop, scrollHeight, clientHeight } = element;
    const maxScroll = scrollHeight - clientHeight;
    const canScroll = maxScroll > 0;

    setState({
      isAtTop: scrollTop < threshold,
      isAtBottom: canScroll ? maxScroll - scrollTop < threshold : true,
      scrollProgress: canScroll ? scrollTop / maxScroll : 0,
      scrollTop,
      canScroll,
    });
  }, [ref, threshold]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Throttled scroll handler
    let ticking = false;
    const throttledHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    handleScroll();

    // Listen for scroll
    element.addEventListener('scroll', throttledHandler, { passive: true });

    // Also check on resize (content might change)
    const resizeObserver = new ResizeObserver(() => {
      handleScroll();
    });
    resizeObserver.observe(element);

    return () => {
      element.removeEventListener('scroll', throttledHandler);
      resizeObserver.disconnect();
    };
  }, [ref, handleScroll]);

  return state;
}

/**
 * useScrollEdgeClass - Returns CSS class modifiers based on scroll state.
 *
 * @param ref - RefObject to the scrollable element
 * @returns Object with data attributes for CSS styling
 *
 * @example
 * ```tsx
 * const scrollRef = useRef<HTMLDivElement>(null);
 * const scrollAttrs = useScrollEdgeClass(scrollRef);
 *
 * return (
 *   <div
 *     ref={scrollRef}
 *     className="scroll-edge-top overflow-auto"
 *     {...scrollAttrs}
 *   >
 *     <YourContent />
 *   </div>
 * );
 * ```
 */
export function useScrollEdgeClass(ref: RefObject<HTMLElement>) {
  const { isAtTop, isAtBottom, canScroll } = useScrollEdge(ref);

  return {
    'data-scrolled': !isAtTop ? 'true' : undefined,
    'data-at-bottom': isAtBottom ? 'true' : undefined,
    'data-can-scroll': canScroll ? 'true' : undefined,
  };
}

export default useScrollEdge;
