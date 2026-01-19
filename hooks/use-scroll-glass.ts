'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface UseScrollGlassOptions {
  /** Threshold at which the navbar becomes more opaque (default: 10px) */
  threshold?: number
  /** Maximum blur when scrolled (default: 60) */
  maxBlur?: number
  /** Minimum blur at top (default: 20) */
  minBlur?: number
  /** Maximum background opacity when scrolled (default: 0.8) */
  maxOpacity?: number
  /** Minimum background opacity at top (default: 0.2) */
  minOpacity?: number
  /** Enable hide on scroll down (default: false) */
  hideOnScroll?: boolean
  /** Distance to scroll before hiding (default: 100px) */
  hideDistance?: number
}

interface ScrollGlassState {
  /** Whether the user has scrolled past the threshold */
  isScrolled: boolean
  /** Current scroll progress (0 to 1) */
  scrollProgress: number
  /** Whether navbar is visible (for hideOnScroll) */
  isVisible: boolean
  /** Current blur value */
  blur: number
  /** Current opacity value */
  opacity: number
  /** Current Y position */
  scrollY: number
  /** Scroll direction */
  direction: 'up' | 'down' | 'none'
  /** CSS styles ready to apply */
  styles: {
    backdropFilter: string
    WebkitBackdropFilter: string
    backgroundColor: string
    borderColor: string
    transform: string
  }
}

/**
 * Custom hook for scroll-responsive glass navbar effects
 * Implements Apple Liquid Glass 2026 scroll behavior
 * Based on Apple HIG: Tab bars shrink on scroll, fluidly expand on scroll back
 */
export function useScrollGlass(options: UseScrollGlassOptions = {}): ScrollGlassState {
  const {
    threshold = 10,
    // Apple Liquid Glass 2026 specs: 80px regular, 100px elevated on scroll
    maxBlur = 100,
    minBlur = 80,
    // Apple specs: 0.22 regular, 0.32 elevated
    maxOpacity = 0.32,
    minOpacity = 0.22,
    hideOnScroll = false,
    hideDistance = 100,
  } = options

  const [state, setState] = useState<Omit<ScrollGlassState, 'styles'>>({
    isScrolled: false,
    scrollProgress: 0,
    isVisible: true,
    blur: minBlur,
    opacity: minOpacity,
    scrollY: 0,
    direction: 'none',
  })

  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  const updateState = useCallback(() => {
    const scrollY = window.scrollY
    const direction = scrollY > lastScrollY.current ? 'down' : scrollY < lastScrollY.current ? 'up' : 'none'

    // Calculate scroll progress (0 to 1, capped at 200px scroll)
    const scrollProgress = Math.min(scrollY / 200, 1)

    // Calculate blur and opacity based on scroll
    const blur = minBlur + (maxBlur - minBlur) * scrollProgress
    const opacity = minOpacity + (maxOpacity - minOpacity) * scrollProgress

    // Determine visibility for hideOnScroll
    let isVisible = true
    if (hideOnScroll) {
      if (direction === 'down' && scrollY > hideDistance) {
        isVisible = false
      } else if (direction === 'up') {
        isVisible = true
      }
    }

    setState({
      isScrolled: scrollY > threshold,
      scrollProgress,
      isVisible,
      blur,
      opacity,
      scrollY,
      direction,
    })

    lastScrollY.current = scrollY
    ticking.current = false
  }, [threshold, maxBlur, minBlur, maxOpacity, minOpacity, hideOnScroll, hideDistance])

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(updateState)
      ticking.current = true
    }
  }, [updateState])

  useEffect(() => {
    // Initial state
    updateState()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll, updateState])

  // Generate CSS styles - Apple Liquid Glass 2026 specs
  const styles = {
    // Apple specs: 200% saturate for regular, 220% for elevated
    backdropFilter: `blur(${state.blur}px) saturate(${state.isScrolled ? 220 : 200}%)`,
    WebkitBackdropFilter: `blur(${state.blur}px) saturate(${state.isScrolled ? 220 : 200}%)`,
    backgroundColor: state.isScrolled
      ? `rgba(255, 255, 255, ${state.opacity})`
      : `rgba(255, 255, 255, ${minOpacity})`,
    // Apple specs: 0.35 regular border, 0.55 elevated
    borderColor: state.isScrolled
      ? `rgba(255, 255, 255, ${Math.min(state.opacity + 0.2, 0.55)})`
      : 'rgba(255, 255, 255, 0.35)',
    transform: state.isVisible ? 'translateY(0)' : 'translateY(-100%)',
  }

  return {
    ...state,
    styles,
  }
}

/**
 * Dark mode variant styles generator
 */
export function getDarkModeGlassStyles(opacity: number, isScrolled: boolean): Record<string, string> {
  return {
    backgroundColor: isScrolled
      ? `rgba(15, 23, 42, ${opacity + 0.1})`
      : `rgba(15, 23, 42, 0.2)`,
    borderColor: isScrolled
      ? `rgba(255, 255, 255, ${Math.min(opacity * 0.5, 0.15)})`
      : 'rgba(255, 255, 255, 0.08)',
  }
}

export default useScrollGlass
