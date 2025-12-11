/**
 * Design Tokens - Apple Design Language 2025
 * Based on Constitution requirements for WellWave
 */

export const colors = {
  // Primary palette - Apple accent colors
  primary: {
    DEFAULT: '#007AFF',
    light: '#5AC8FA',
    dark: '#0051D4',
  },
  success: {
    DEFAULT: '#34C759',
    light: '#4CD964',
    dark: '#248A3D',
  },
  warning: {
    DEFAULT: '#FF9500',
    light: '#FFCC00',
    dark: '#C93400',
  },
  danger: {
    DEFAULT: '#FF3B30',
    light: '#FF6961',
    dark: '#C41E3A',
  },

  // Medical-specific colors
  medical: {
    redFlag: '#FF3B30',
    warning: '#FF9500',
    safe: '#34C759',
    info: '#5AC8FA',
  },

  // Neutral palette
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },

  // Glass morphism backgrounds
  glass: {
    light: 'rgba(255, 255, 255, 0.30)',
    lightHover: 'rgba(255, 255, 255, 0.40)',
    dark: 'rgba(0, 0, 0, 0.30)',
    darkHover: 'rgba(0, 0, 0, 0.40)',
  },
} as const

export const typography = {
  fontFamily: {
    sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
    mono: ['SF Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
} as const

export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
  // Apple-style radii
  button: '8px',
  card: '12px',
  cardLarge: '20px',
  container: '28px',
} as const

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  // Glass shadows
  glass: '0 8px 32px rgba(0, 0, 0, 0.12)',
  glassLight: '0 4px 16px rgba(0, 0, 0, 0.08)',
} as const

export const blur = {
  none: '0',
  sm: '4px',
  DEFAULT: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  // Apple glass blur
  glass: '20px',
} as const

// Spring animation presets for Framer Motion
export const motion = {
  spring: {
    default: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
    },
    soft: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 25,
    },
    snappy: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 35,
    },
  },
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
  },
  easing: {
    easeOut: [0.16, 1, 0.3, 1],
    easeInOut: [0.65, 0, 0.35, 1],
  },
} as const

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// Z-index scale
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  modal: 1200,
  popover: 1300,
  toast: 1400,
  tooltip: 1500,
} as const
