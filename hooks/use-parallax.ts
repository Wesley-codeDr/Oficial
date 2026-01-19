'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'

/**
 * Parallax layer configuration
 */
export interface ParallaxLayer {
  /** Unique identifier for the layer */
  id: string
  /** Speed multiplier (0 = fixed, 1 = scroll speed, >1 = faster, <0 = opposite direction) */
  speed: number
  /** Optional rotation factor based on scroll (degrees per 100px scroll) */
  rotationFactor?: number
  /** Optional scale factor based on scroll */
  scaleFactor?: number
  /** Optional opacity change based on scroll (per 100px) */
  opacityFactor?: number
  /** Initial offset in pixels */
  initialOffset?: number
  /** Maximum offset limit in pixels */
  maxOffset?: number
  /** Enable 3D perspective effects */
  enable3D?: boolean
}

/**
 * Computed transform values for a parallax layer
 */
export interface ParallaxTransform {
  /** Translated Y value in pixels */
  translateY: number
  /** Translated X value in pixels (for horizontal parallax) */
  translateX: number
  /** Rotation in degrees */
  rotate: number
  /** Scale factor */
  scale: number
  /** Opacity (0-1) */
  opacity: number
  /** Z-index based on layer speed */
  zIndex: number
  /** CSS transform string ready to apply */
  transform: string
  /** Full CSS style object */
  style: React.CSSProperties
}

/**
 * Parallax preset speeds for Apple Liquid Glass effects
 */
export const PARALLAX_SPEEDS = {
  /** Fixed background - doesn't move */
  fixed: 0,
  /** Subtle background movement */
  backgroundSlow: 0.1,
  /** Standard background parallax */
  background: 0.3,
  /** Medium depth layer */
  midground: 0.5,
  /** Foreground with slight lag */
  foreground: 0.7,
  /** Content layer - moves with scroll */
  content: 1,
  /** Floating elements - faster than scroll */
  floating: 1.2,
  /** Inverse parallax - moves opposite */
  inverse: -0.2,
} as const

export type ParallaxPreset = keyof typeof PARALLAX_SPEEDS

/**
 * Options for the useParallax hook
 */
export interface UseParallaxOptions {
  /** Layers to track with parallax */
  layers?: ParallaxLayer[]
  /** Enable horizontal parallax in addition to vertical */
  horizontal?: boolean
  /** Horizontal scroll factor (relative to vertical) */
  horizontalFactor?: number
  /** Enable smooth interpolation */
  smooth?: boolean
  /** Smoothing factor (0-1, higher = more responsive) */
  smoothFactor?: number
  /** Enable reduced motion for accessibility */
  respectReducedMotion?: boolean
  /** Container element ref for contained parallax (HTMLDivElement or similar scrollable element) */
  containerRef?: React.RefObject<HTMLDivElement | null>
  /** Perspective value for 3D effects */
  perspective?: number
  /** Disable parallax on mobile for performance */
  disableOnMobile?: boolean
  /** Mobile breakpoint in pixels */
  mobileBreakpoint?: number
}

/**
 * Return type for the useParallax hook
 */
export interface UseParallaxReturn {
  /** Current scroll Y position */
  scrollY: number
  /** Scroll progress (0-1 based on document height) */
  scrollProgress: number
  /** Scroll velocity (pixels per frame) */
  velocity: number
  /** Scroll direction */
  direction: 'up' | 'down' | 'none'
  /** Whether parallax is currently active */
  isActive: boolean
  /** Computed transforms for each layer */
  transforms: Record<string, ParallaxTransform>
  /** Get transform for a specific layer ID */
  getLayerTransform: (layerId: string) => ParallaxTransform | undefined
  /** Get style object for quick preset application */
  getPresetStyle: (preset: ParallaxPreset, options?: Partial<ParallaxLayer>) => React.CSSProperties
  /** Container style with perspective for 3D effects */
  containerStyle: React.CSSProperties
}

/**
 * Default parallax layer configuration
 */
const DEFAULT_LAYER: ParallaxLayer = {
  id: 'default',
  speed: PARALLAX_SPEEDS.background,
  rotationFactor: 0,
  scaleFactor: 0,
  opacityFactor: 0,
  initialOffset: 0,
  maxOffset: Infinity,
  enable3D: false,
}

/**
 * Clamp a value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Linear interpolation for smooth transitions
 */
function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

/**
 * Calculate parallax transform for a layer
 */
function calculateTransform(
  layer: ParallaxLayer,
  scrollY: number,
  horizontalOffset: number
): ParallaxTransform {
  const { 
    speed, 
    rotationFactor = 0, 
    scaleFactor = 0, 
    opacityFactor = 0,
    initialOffset = 0,
    maxOffset = Infinity,
    enable3D = false,
  } = layer

  // Calculate base translation
  let translateY = initialOffset - scrollY * speed
  translateY = clamp(translateY, -maxOffset, maxOffset)

  // Horizontal translation
  const translateX = horizontalOffset

  // Rotation based on scroll
  const rotate = (scrollY / 100) * rotationFactor

  // Scale based on scroll
  const scale = 1 + (scrollY / 100) * scaleFactor

  // Opacity based on scroll (clamped 0-1)
  const opacity = clamp(1 + (scrollY / 100) * opacityFactor, 0, 1)

  // Z-index based on speed (faster = higher z-index)
  const zIndex = Math.round(speed * 10)

  // Build transform string
  const transforms: string[] = []
  
  if (enable3D) {
    transforms.push(`translate3d(${translateX}px, ${translateY}px, 0)`)
  } else {
    if (translateX !== 0) transforms.push(`translateX(${translateX}px)`)
    if (translateY !== 0) transforms.push(`translateY(${translateY}px)`)
  }
  
  if (rotate !== 0) transforms.push(`rotate(${rotate}deg)`)
  if (scale !== 1) transforms.push(`scale(${scale})`)

  const transform = transforms.length > 0 ? transforms.join(' ') : 'none'

  // Build style object
  const style: React.CSSProperties = {
    transform,
    opacity,
    zIndex,
    willChange: 'transform, opacity',
    ...(enable3D && { transformStyle: 'preserve-3d' as const }),
  }

  return {
    translateY,
    translateX,
    rotate,
    scale,
    opacity,
    zIndex,
    transform,
    style,
  }
}

/**
 * Custom hook for scroll-based parallax depth effects
 * Implements Apple Liquid Glass 2026 spatial design principles
 * 
 * @example
 * ```tsx
 * const { transforms, getPresetStyle, containerStyle } = useParallax({
 *   layers: [
 *     { id: 'bg', speed: 0.3 },
 *     { id: 'mid', speed: 0.6 },
 *     { id: 'fg', speed: 0.9 },
 *   ]
 * })
 * 
 * return (
 *   <div style={containerStyle}>
 *     <div style={transforms.bg?.style}>Background</div>
 *     <div style={transforms.mid?.style}>Midground</div>
 *     <div style={transforms.fg?.style}>Foreground</div>
 *   </div>
 * )
 * ```
 */
export function useParallax(options: UseParallaxOptions = {}): UseParallaxReturn {
  const {
    layers = [],
    horizontal = false,
    horizontalFactor = 0.1,
    smooth = true,
    smoothFactor = 0.1,
    respectReducedMotion = true,
    containerRef,
    perspective = 1000,
    disableOnMobile = true,
    mobileBreakpoint = 768,
  } = options

  // State
  const [scrollY, setScrollY] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down' | 'none'>('none')
  const [isActive, setIsActive] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Refs for smooth interpolation
  const targetScrollY = useRef(0)
  const currentScrollY = useRef(0)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const rafId = useRef<number>(0)

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Merge layers with defaults
  const normalizedLayers = useMemo(() => 
    layers.map(layer => ({ ...DEFAULT_LAYER, ...layer })),
    [layers]
  )

  // Calculate scroll progress
  const scrollProgress = useMemo(() => {
    if (typeof window === 'undefined') return 0
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    return docHeight > 0 ? scrollY / docHeight : 0
  }, [scrollY])

  // Calculate horizontal offset
  const horizontalOffset = useMemo(() => {
    if (!horizontal) return 0
    return scrollY * horizontalFactor
  }, [horizontal, horizontalFactor, scrollY])

  // Calculate transforms for all layers
  const transforms = useMemo(() => {
    // If reduced motion is preferred and respected, return neutral transforms
    if (respectReducedMotion && prefersReducedMotion) {
      return normalizedLayers.reduce<Record<string, ParallaxTransform>>((acc, layer) => {
        acc[layer.id] = {
          translateY: 0,
          translateX: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
          zIndex: 0,
          transform: 'none',
          style: {},
        }
        return acc
      }, {})
    }

    // If disabled on mobile and is mobile, return neutral transforms
    if (disableOnMobile && isMobile) {
      return normalizedLayers.reduce<Record<string, ParallaxTransform>>((acc, layer) => {
        acc[layer.id] = {
          translateY: 0,
          translateX: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
          zIndex: 0,
          transform: 'none',
          style: {},
        }
        return acc
      }, {})
    }

    return normalizedLayers.reduce<Record<string, ParallaxTransform>>((acc, layer) => {
      acc[layer.id] = calculateTransform(layer, scrollY, horizontalOffset)
      return acc
    }, {})
  }, [normalizedLayers, scrollY, horizontalOffset, respectReducedMotion, prefersReducedMotion, disableOnMobile, isMobile])

  // Get transform for a specific layer
  const getLayerTransform = useCallback((layerId: string): ParallaxTransform | undefined => {
    return transforms[layerId]
  }, [transforms])

  // Get style for a preset
  const getPresetStyle = useCallback((
    preset: ParallaxPreset, 
    layerOptions: Partial<ParallaxLayer> = {}
  ): React.CSSProperties => {
    const layer: ParallaxLayer = {
      ...DEFAULT_LAYER,
      id: preset,
      speed: PARALLAX_SPEEDS[preset],
      ...layerOptions,
    }
    
    // If reduced motion is preferred and respected, return empty style
    if (respectReducedMotion && prefersReducedMotion) {
      return {}
    }

    // If disabled on mobile and is mobile, return empty style
    if (disableOnMobile && isMobile) {
      return {}
    }

    return calculateTransform(layer, scrollY, horizontalOffset).style
  }, [scrollY, horizontalOffset, respectReducedMotion, prefersReducedMotion, disableOnMobile, isMobile])

  // Container style with perspective
  const containerStyle = useMemo((): React.CSSProperties => ({
    perspective: `${perspective}px`,
    perspectiveOrigin: '50% 50%',
    transformStyle: 'preserve-3d' as const,
    overflow: 'hidden',
  }), [perspective])

  // Smooth scroll update with RAF
  const updateScrollSmooth = useCallback(() => {
    if (!smooth) {
      setScrollY(targetScrollY.current)
      return
    }

    currentScrollY.current = lerp(currentScrollY.current, targetScrollY.current, smoothFactor)
    
    // Only update if difference is significant
    if (Math.abs(currentScrollY.current - targetScrollY.current) > 0.1) {
      setScrollY(Math.round(currentScrollY.current * 100) / 100)
      rafId.current = requestAnimationFrame(updateScrollSmooth)
    } else {
      setScrollY(targetScrollY.current)
    }
  }, [smooth, smoothFactor])

  // Handle scroll event
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true
      
      requestAnimationFrame(() => {
        let newScrollY: number
        
        if (containerRef?.current) {
          newScrollY = containerRef.current.scrollTop
        } else {
          newScrollY = window.scrollY
        }

        // Calculate velocity
        const newVelocity = newScrollY - lastScrollY.current
        setVelocity(newVelocity)

        // Determine direction
        if (newScrollY > lastScrollY.current) {
          setDirection('down')
        } else if (newScrollY < lastScrollY.current) {
          setDirection('up')
        } else {
          setDirection('none')
        }

        lastScrollY.current = newScrollY
        targetScrollY.current = newScrollY

        if (smooth) {
          cancelAnimationFrame(rafId.current)
          rafId.current = requestAnimationFrame(updateScrollSmooth)
        } else {
          setScrollY(newScrollY)
        }

        ticking.current = false
      })
    }
  }, [containerRef, smooth, updateScrollSmooth])

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [mobileBreakpoint])

  // Check if parallax is active
  useEffect(() => {
    const shouldBeActive = !(respectReducedMotion && prefersReducedMotion) && 
                          !(disableOnMobile && isMobile)
    setIsActive(shouldBeActive)
  }, [respectReducedMotion, prefersReducedMotion, disableOnMobile, isMobile])

  // Set up scroll listener
  useEffect(() => {
    const target = containerRef?.current || window
    
    // Initial scroll position
    handleScroll()

    target.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      target.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId.current)
    }
  }, [containerRef, handleScroll])

  return {
    scrollY,
    scrollProgress,
    velocity,
    direction,
    isActive,
    transforms,
    getLayerTransform,
    getPresetStyle,
    containerStyle,
  }
}

/**
 * Simplified hook for single-layer parallax effect
 * 
 * @example
 * ```tsx
 * const { style } = useSimpleParallax({ speed: 0.5 })
 * return <div style={style}>Parallax content</div>
 * ```
 */
export function useSimpleParallax(options: {
  speed?: number
  maxOffset?: number
  enable3D?: boolean
} = {}): { style: React.CSSProperties; scrollY: number } {
  const { speed = 0.5, maxOffset, enable3D = true } = options
  
  const { transforms, scrollY } = useParallax({
    layers: [{ id: 'simple', speed, maxOffset, enable3D }],
  })

  return {
    style: transforms.simple?.style || {},
    scrollY,
  }
}

export default useParallax
