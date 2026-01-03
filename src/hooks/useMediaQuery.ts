"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook for responsive breakpoint detection
 * SSR-safe with no hydration mismatch
 *
 * @param query - Media query string (e.g., "(min-width: 768px)")
 * @returns boolean indicating if the media query matches
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * const isDesktop = useMediaQuery("(min-width: 1024px)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    // Fallback for older browsers
    else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [query]);

  // Return false on server-side to prevent hydration mismatch
  if (!mounted) {
    return false;
  }

  return matches;
}

/**
 * Hook with all Tailwind breakpoints pre-configured
 * Follows mobile-first approach
 *
 * @returns object with boolean flags for each breakpoint
 *
 * @example
 * const { isXs, isMd, isLg } = useBreakpoints();
 * if (isLg) {
 *   // Desktop layout
 * }
 */
export function useBreakpoints() {
  const isXs = useMediaQuery("(min-width: 320px)");
  const isSm = useMediaQuery("(min-width: 640px)");
  const isMd = useMediaQuery("(min-width: 768px)");
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isXl = useMediaQuery("(min-width: 1280px)");
  const is2Xl = useMediaQuery("(min-width: 1536px)");

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    // Convenience flags
    isMobile: !isMd,
    isTablet: isMd && !isLg,
    isDesktop: isLg,
  };
}

/**
 * Hook for detecting mobile devices (max-width: 767px)
 *
 * @returns boolean indicating if current viewport is mobile
 *
 * @example
 * const isMobile = useIsMobile();
 */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}

/**
 * Hook for detecting tablet devices (768px - 1023px)
 *
 * @returns boolean indicating if current viewport is tablet
 *
 * @example
 * const isTablet = useIsTablet();
 */
export function useIsTablet(): boolean {
  return useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
}

/**
 * Hook for detecting desktop devices (min-width: 1024px)
 *
 * @returns boolean indicating if current viewport is desktop
 *
 * @example
 * const isDesktop = useIsDesktop();
 */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}
