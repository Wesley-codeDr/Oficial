'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Apple HIG Size Class
 * - compact: < 768px (iPhone portrait, iPad split view)
 * - regular: >= 768px (iPad full, desktop)
 */
export type SizeClass = 'compact' | 'regular';

interface SizeClassState {
  /** Horizontal size class (based on width) */
  horizontal: SizeClass;
  /** Vertical size class (based on height) */
  vertical: SizeClass;
  /** Whether the device is in compact horizontal mode */
  isCompact: boolean;
  /** Whether the device is in regular horizontal mode */
  isRegular: boolean;
}

const SIZE_CLASS_BREAKPOINT = 768;

/**
 * useSizeClass - Apple HIG size class detection.
 *
 * Size classes determine the horizontal and vertical trait collections
 * that define how your layout should adapt.
 *
 * @returns SizeClassState with horizontal/vertical size classes and convenience booleans
 *
 * @example
 * ```tsx
 * const { isCompact, isRegular, horizontal } = useSizeClass();
 *
 * // Conditional rendering
 * if (isCompact) {
 *   return <MobileLayout />;
 * }
 * return <DesktopLayout />;
 *
 * // Or use the size class directly
 * const columns = horizontal === 'compact' ? 1 : 3;
 * ```
 */
export function useSizeClass(): SizeClassState {
  const [sizeClass, setSizeClass] = useState<SizeClassState>({
    horizontal: 'regular',
    vertical: 'regular',
    isCompact: false,
    isRegular: true,
  });

  const updateSizeClass = useCallback(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const horizontal: SizeClass = width < SIZE_CLASS_BREAKPOINT ? 'compact' : 'regular';
    const vertical: SizeClass = height < SIZE_CLASS_BREAKPOINT ? 'compact' : 'regular';

    setSizeClass({
      horizontal,
      vertical,
      isCompact: horizontal === 'compact',
      isRegular: horizontal === 'regular',
    });
  }, []);

  useEffect(() => {
    // Initial check
    updateSizeClass();

    // Listen for resize
    window.addEventListener('resize', updateSizeClass);

    // Also listen for orientation change on mobile
    window.addEventListener('orientationchange', updateSizeClass);

    return () => {
      window.removeEventListener('resize', updateSizeClass);
      window.removeEventListener('orientationchange', updateSizeClass);
    };
  }, [updateSizeClass]);

  return sizeClass;
}

/**
 * useSizeClassValue - Select a value based on size class.
 *
 * @param compact - Value to use in compact mode
 * @param regular - Value to use in regular mode
 * @returns The appropriate value for the current size class
 *
 * @example
 * ```tsx
 * const columns = useSizeClassValue(1, 3);
 * const padding = useSizeClassValue('p-4', 'p-8');
 * ```
 */
export function useSizeClassValue<T>(compact: T, regular: T): T {
  const { isCompact } = useSizeClass();
  return isCompact ? compact : regular;
}

export default useSizeClass;
