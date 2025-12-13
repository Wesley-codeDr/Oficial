'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ScrollEdgePosition, GlassIntensity } from '../types';
import { SCROLL_EDGE, GLASS_BLUR } from '../constants';
import { useLiquidGlass } from '../hooks/useLiquidGlass';

// ============================================
// TYPES
// ============================================

export interface ScrollEdgeEffectProps {
  /** Which edges to apply effect to */
  edges?: ScrollEdgePosition[];
  /** Intensity of the effect */
  intensity?: GlassIntensity;
  /** Scroll threshold before effect activates */
  threshold?: number;
  /** Target element ref (if not using container) */
  targetRef?: React.RefObject<HTMLElement>;
  /** Additional class names */
  className?: string;
  /** Children content */
  children: React.ReactNode;
}

interface EdgeIndicatorProps {
  position: ScrollEdgePosition;
  intensity: GlassIntensity;
  isVisible: boolean;
  reduceEffects: boolean;
}

// ============================================
// EDGE INDICATOR
// ============================================

function EdgeIndicator({
  position,
  intensity,
  isVisible,
  reduceEffects,
}: EdgeIndicatorProps) {
  const positionStyles: Record<ScrollEdgePosition, string> = {
    top: 'top-0 left-0 right-0 h-4',
    bottom: 'bottom-0 left-0 right-0 h-4',
    leading: 'top-0 bottom-0 left-0 w-4',
    trailing: 'top-0 bottom-0 right-0 w-4',
  };

  const gradientDirection: Record<ScrollEdgePosition, string> = {
    top: 'to bottom',
    bottom: 'to top',
    leading: 'to right',
    trailing: 'to left',
  };

  if (reduceEffects) {
    // Simple border fallback
    return (
      <motion.div
        className={cn(
          'absolute pointer-events-none z-10',
          positionStyles[position]
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        aria-hidden="true"
      >
        <div
          className={cn(
            'absolute',
            position === 'top' && 'bottom-0 left-0 right-0 h-px bg-black/10 dark:bg-white/10',
            position === 'bottom' && 'top-0 left-0 right-0 h-px bg-black/10 dark:bg-white/10',
            position === 'leading' && 'right-0 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10',
            position === 'trailing' && 'left-0 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10'
          )}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(
        'absolute pointer-events-none z-10',
        positionStyles[position]
      )}
      style={{
        background: `linear-gradient(${gradientDirection[position]}, rgba(0, 0, 0, 0.06) 0%, transparent 100%)`,
        backdropFilter: isVisible ? `blur(${GLASS_BLUR[intensity] / 4}px)` : 'none',
        WebkitBackdropFilter: isVisible ? `blur(${GLASS_BLUR[intensity] / 4}px)` : 'none',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
      aria-hidden="true"
    />
  );
}

// ============================================
// SCROLL EDGE EFFECT
// ============================================

/**
 * ScrollEdgeEffect - Maintains legibility when content scrolls under controls
 *
 * Applies a subtle blur and fade effect at specified edges to help
 * maintain contrast for controls when content scrolls beneath them.
 *
 * @example
 * ```tsx
 * <ScrollEdgeEffect edges={['top', 'bottom']}>
 *   <div className="overflow-auto h-96">
 *     {longContent}
 *   </div>
 * </ScrollEdgeEffect>
 * ```
 */
export function ScrollEdgeEffect({
  edges = ['top'],
  intensity = 'medium',
  threshold = SCROLL_EDGE.threshold,
  targetRef,
  className,
  children,
}: ScrollEdgeEffectProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { accessibility } = useLiquidGlass();

  const scrollRef = targetRef || containerRef;

  // Track scroll position
  const { scrollY, scrollYProgress } = useScroll({
    container: scrollRef,
  });

  // Determine which edges are active based on scroll position
  const [activeEdges, setActiveEdges] = React.useState<Set<ScrollEdgePosition>>(
    new Set()
  );

  React.useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const checkScrollPosition = () => {
      const newActiveEdges = new Set<ScrollEdgePosition>();

      const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = element;

      // Check vertical scrolling
      if (edges.includes('top') && scrollTop > threshold) {
        newActiveEdges.add('top');
      }
      if (edges.includes('bottom') && scrollTop < scrollHeight - clientHeight - threshold) {
        newActiveEdges.add('bottom');
      }

      // Check horizontal scrolling
      if (edges.includes('leading') && scrollLeft > threshold) {
        newActiveEdges.add('leading');
      }
      if (edges.includes('trailing') && scrollLeft < scrollWidth - clientWidth - threshold) {
        newActiveEdges.add('trailing');
      }

      setActiveEdges(newActiveEdges);
    };

    // Initial check
    checkScrollPosition();

    // Listen for scroll events
    element.addEventListener('scroll', checkScrollPosition, { passive: true });
    return () => element.removeEventListener('scroll', checkScrollPosition);
  }, [scrollRef, edges, threshold]);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {/* Edge indicators */}
      {edges.map((edge) => (
        <EdgeIndicator
          key={edge}
          position={edge}
          intensity={intensity}
          isVisible={activeEdges.has(edge)}
          reduceEffects={accessibility.useFallback || false}
        />
      ))}

      {/* Content */}
      {children}
    </div>
  );
}

// ============================================
// SAFE AREA BAR
// ============================================

export interface SafeAreaBarProps {
  /** Edge position */
  edge?: 'top' | 'bottom';
  /** Alignment within the bar */
  alignment?: 'leading' | 'center' | 'trailing';
  /** Spacing from edge */
  spacing?: number;
  /** Whether bar uses glass effect */
  glass?: boolean;
  /** Children content */
  children: React.ReactNode;
  /** Additional class names */
  className?: string;
}

/**
 * SafeAreaBar - Fixed bar with scroll edge effect
 *
 * Use this for custom bars with controls that need scroll edge effects.
 *
 * @example
 * ```tsx
 * <SafeAreaBar edge="top" glass>
 *   <Button>Action</Button>
 * </SafeAreaBar>
 * ```
 */
export function SafeAreaBar({
  edge = 'top',
  alignment = 'center',
  spacing = 8,
  glass = true,
  children,
  className,
}: SafeAreaBarProps) {
  const { accessibility } = useLiquidGlass();

  const alignmentClasses: Record<string, string> = {
    leading: 'justify-start',
    center: 'justify-center',
    trailing: 'justify-end',
  };

  return (
    <div
      className={cn(
        'fixed left-0 right-0 z-50',
        'flex items-center px-4',
        edge === 'top' && 'top-0 safe-area-top',
        edge === 'bottom' && 'bottom-0 safe-area-bottom',
        alignmentClasses[alignment],
        glass && !accessibility.useFallback && [
          'bg-white/75 dark:bg-[rgb(28,28,30)]/75',
          'backdrop-blur-[40px] backdrop-saturate-[200%]',
          'border-b border-black/5 dark:border-white/5',
        ],
        glass && accessibility.useFallback && [
          'bg-white/95 dark:bg-[rgb(28,28,30)]/95',
          'border-b border-black/10 dark:border-white/10',
        ],
        className
      )}
      style={{ paddingTop: spacing, paddingBottom: spacing }}
    >
      {children}
    </div>
  );
}

export default ScrollEdgeEffect;
