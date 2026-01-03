"use client";

import { useEffect, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 * Custom hook for reactive window dimensions
 * Provides width, height, and device type flags
 * Debounced for performance (300ms)
 * SSR-safe with useEffect
 *
 * @returns WindowSize object with dimensions and device flags
 *
 * @example
 * const { width, height, isMobile, isTablet, isDesktop } = useWindowSize();
 *
 * if (isMobile) {
 *   return <MobileLayout />
 * }
 */
export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      // Clear existing timeout
      clearTimeout(timeoutId);

      // Debounce resize events (300ms)
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        setWindowSize({
          width,
          height,
          isMobile: width < 768,
          isTablet: width >= 768 && width < 1024,
          isDesktop: width >= 1024,
        });
      }, 300);
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Return default values on server-side to prevent hydration mismatch
  if (!mounted) {
    return {
      width: 0,
      height: 0,
      isMobile: false,
      isTablet: false,
      isDesktop: false,
    };
  }

  return windowSize;
}

/**
 * Hook for getting current viewport width only
 * More lightweight than useWindowSize
 *
 * @returns Current viewport width in pixels
 *
 * @example
 * const width = useViewportWidth();
 */
export function useViewportWidth(): number {
  const [width, setWidth] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
      }, 300);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!mounted) {
    return 0;
  }

  return width;
}

/**
 * Hook for getting current viewport height only
 * More lightweight than useWindowSize
 *
 * @returns Current viewport height in pixels
 *
 * @example
 * const height = useViewportHeight();
 */
export function useViewportHeight(): number {
  const [height, setHeight] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setHeight(window.innerHeight);
      }, 300);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!mounted) {
    return 0;
  }

  return height;
}
