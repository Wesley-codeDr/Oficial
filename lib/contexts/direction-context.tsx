'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

/**
 * Apple HIG Right-to-Left Guidelines Implementation
 * @see https://developer.apple.com/design/human-interface-guidelines/right-to-left
 * 
 * This context provides RTL support following Apple's design principles:
 * - Text alignment adjusts to match interface direction
 * - Controls flip to show progress in reading direction
 * - Interface icons adapt based on their semantic meaning
 * - Numbers maintain their order (never reversed)
 */

// RTL languages supported
const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur', 'yi', 'ps', 'sd', 'ckb', 'ug'] as const
type RTLLanguage = typeof RTL_LANGUAGES[number]

// Direction types
export type TextDirection = 'ltr' | 'rtl'

interface DirectionContextType {
  /** Current text direction */
  direction: TextDirection
  /** Whether current direction is RTL */
  isRTL: boolean
  /** Whether current direction is LTR */
  isLTR: boolean
  /** Current language code */
  language: string
  /** Set direction manually */
  setDirection: (direction: TextDirection) => void
  /** Set language (direction auto-detected) */
  setLanguage: (language: string) => void
  /** Toggle between LTR and RTL */
  toggleDirection: () => void
  /** Get the start side (left for LTR, right for RTL) */
  startSide: 'left' | 'right'
  /** Get the end side (right for LTR, left for RTL) */
  endSide: 'left' | 'right'
  /** Get logical inline start (inset-inline-start) */
  inlineStart: 'left' | 'right'
  /** Get logical inline end (inset-inline-end) */
  inlineEnd: 'left' | 'right'
}

const DirectionContext = createContext<DirectionContextType | undefined>(undefined)

/**
 * Check if a language code is RTL
 */
function isRTLLanguage(lang: string): boolean {
  const baseLang = lang.split('-')[0].toLowerCase() as RTLLanguage
  return RTL_LANGUAGES.includes(baseLang)
}

/**
 * Get direction from language
 */
function getDirectionFromLanguage(lang: string): TextDirection {
  return isRTLLanguage(lang) ? 'rtl' : 'ltr'
}

interface DirectionProviderProps {
  children: React.ReactNode
  /** Default language (defaults to 'pt-BR') */
  defaultLanguage?: string
  /** Force a specific direction regardless of language */
  forceDirection?: TextDirection
  /** Storage key for persisting direction preference */
  storageKey?: string
}

export function DirectionProvider({
  children,
  defaultLanguage = 'pt-BR',
  forceDirection,
  storageKey = 'wellwave-direction'
}: DirectionProviderProps) {
  const [language, setLanguageState] = useState(defaultLanguage)
  const [manualDirection, setManualDirection] = useState<TextDirection | null>(null)

  // Determine the actual direction
  const direction = useMemo(() => {
    if (forceDirection) return forceDirection
    if (manualDirection) return manualDirection
    return getDirectionFromLanguage(language)
  }, [forceDirection, manualDirection, language])

  const isRTL = direction === 'rtl'
  const isLTR = direction === 'ltr'

  // Logical properties
  const startSide = isRTL ? 'right' : 'left'
  const endSide = isRTL ? 'left' : 'right'
  const inlineStart = startSide
  const inlineEnd = endSide

  // Load persisted preference
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.language) setLanguageState(parsed.language)
        if (parsed.direction) setManualDirection(parsed.direction)
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, [storageKey])

  // Persist preference
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        language,
        direction: manualDirection
      }))
    } catch (e) {
      // Ignore storage errors
    }
  }, [language, manualDirection, storageKey])

  // Update document direction
  useEffect(() => {
    if (typeof document === 'undefined') return
    
    const root = document.documentElement

    if (root.getAttribute('dir') !== direction) {
      root.setAttribute('dir', direction)
    }
    if (root.getAttribute('lang') !== language) {
      root.setAttribute('lang', language)
    }
    
    // Add CSS class for direction-specific styling
    root.classList.remove('dir-ltr', 'dir-rtl')
    root.classList.add(`dir-${direction}`)
  }, [direction, language])

  const setDirection = useCallback((dir: TextDirection) => {
    setManualDirection(dir)
  }, [])

  const setLanguage = useCallback((lang: string) => {
    setLanguageState(lang)
    // Reset manual direction when language changes
    setManualDirection(null)
  }, [])

  const toggleDirection = useCallback(() => {
    setManualDirection(prev => {
      const current = prev || getDirectionFromLanguage(language)
      return current === 'ltr' ? 'rtl' : 'ltr'
    })
  }, [language])

  const value = useMemo(() => ({
    direction,
    isRTL,
    isLTR,
    language,
    setDirection,
    setLanguage,
    toggleDirection,
    startSide,
    endSide,
    inlineStart,
    inlineEnd
  }), [
    direction,
    isRTL,
    isLTR,
    language,
    setDirection,
    setLanguage,
    toggleDirection,
    startSide,
    endSide,
    inlineStart,
    inlineEnd
  ])

  return (
    <DirectionContext.Provider value={value}>
      {children}
    </DirectionContext.Provider>
  )
}

/**
 * Hook to access direction context
 */
export function useDirection(): DirectionContextType {
  const context = useContext(DirectionContext)
  if (context === undefined) {
    throw new Error('useDirection must be used within a DirectionProvider')
  }
  return context
}

/**
 * Hook for RTL-aware styling
 * Returns utility functions for directional properties
 */
export function useDirectionalStyles() {
  const { isRTL, startSide, endSide } = useDirection()

  return useMemo(() => ({
    /**
     * Get margin-inline-start value
     */
    marginStart: (value: string) => ({
      [isRTL ? 'marginRight' : 'marginLeft']: value
    }),

    /**
     * Get margin-inline-end value
     */
    marginEnd: (value: string) => ({
      [isRTL ? 'marginLeft' : 'marginRight']: value
    }),

    /**
     * Get padding-inline-start value
     */
    paddingStart: (value: string) => ({
      [isRTL ? 'paddingRight' : 'paddingLeft']: value
    }),

    /**
     * Get padding-inline-end value
     */
    paddingEnd: (value: string) => ({
      [isRTL ? 'paddingLeft' : 'paddingRight']: value
    }),

    /**
     * Get position: start value
     */
    positionStart: (value: string) => ({
      [startSide]: value
    }),

    /**
     * Get position: end value
     */
    positionEnd: (value: string) => ({
      [endSide]: value
    }),

    /**
     * Transform for flipping (rotateY for icons)
     */
    flipTransform: isRTL ? 'scaleX(-1)' : 'scaleX(1)',

    /**
     * Text alignment matching direction
     */
    textAlign: isRTL ? 'right' as const : 'left' as const,

    /**
     * Flex direction for horizontal layouts
     */
    flexDirection: isRTL ? 'row-reverse' as const : 'row' as const,

    /**
     * Check if should flip a directional icon
     * @param semantic - The semantic meaning of the icon
     */
    shouldFlipIcon: (semantic: 'directional' | 'navigation' | 'progress' | 'static') => {
      // Apple HIG: Only flip icons that represent direction, navigation, or progress
      // Don't flip static icons or icons representing real-world objects
      return isRTL && (semantic === 'directional' || semantic === 'navigation' || semantic === 'progress')
    }
  }), [isRTL, startSide, endSide])
}

/**
 * Hook for RTL-aware class names
 * Generates Tailwind classes with RTL variants
 */
export function useDirectionalClasses() {
  const { isRTL } = useDirection()

  return useMemo(() => ({
    /**
     * Get text alignment class
     */
    textAlign: isRTL ? 'text-right' : 'text-left',

    /**
     * Get flex direction class
     */
    flexRow: isRTL ? 'flex-row-reverse' : 'flex-row',

    /**
     * Get margin/padding start class with value
     */
    ms: (size: string) => isRTL ? `me-${size}` : `ms-${size}`,
    me: (size: string) => isRTL ? `ms-${size}` : `me-${size}`,
    ps: (size: string) => isRTL ? `pe-${size}` : `ps-${size}`,
    pe: (size: string) => isRTL ? `ps-${size}` : `pe-${size}`,

    /**
     * Get position class with value
     */
    start: (value: string) => isRTL ? `right-${value}` : `left-${value}`,
    end: (value: string) => isRTL ? `left-${value}` : `right-${value}`,

    /**
     * Get border radius classes
     */
    roundedStart: isRTL ? 'rounded-r' : 'rounded-l',
    roundedEnd: isRTL ? 'rounded-l' : 'rounded-r',
    roundedStartLg: isRTL ? 'rounded-r-lg' : 'rounded-l-lg',
    roundedEndLg: isRTL ? 'rounded-l-lg' : 'rounded-r-lg',

    /**
     * Get translate class for animations
     */
    translateStart: isRTL ? 'translate-x-full' : '-translate-x-full',
    translateEnd: isRTL ? '-translate-x-full' : 'translate-x-full',

    /**
     * Icon flip class (for directional icons)
     */
    flipIcon: isRTL ? 'rtl-flip' : ''
  }), [isRTL])
}

export { DirectionContext }


