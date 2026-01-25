/**
 * Apple Liquid Glass 2026 - Unified Icon System
 *
 * Standardized icon sizing, semantic mappings, and utilities
 * for consistent icon usage across the WellWave application.
 *
 * @version 1.0.0
 * @date 2026-01-25
 */

import type { LucideIcon } from 'lucide-react'

// ============================================
// SIZE SYSTEM
// ============================================

/**
 * Icon size scale following Apple Liquid Glass 2026 hierarchy
 * All sizes in pixels (Tailwind classes provided)
 */
export const iconSizes = {
  /** 12px - Extra small: badges, inline micro */
  xs: 12,
  /** 16px - Small: inline text, small buttons */
  sm: 16,
  /** 20px - Medium: navigation, default UI elements */
  md: 20,
  /** 24px - Large: headers, prominent actions */
  lg: 24,
  /** 32px - Extra large: hero sections, features */
  xl: 32,
  /** 40px - 2XL: landing page heroes */
  '2xl': 40,
} as const

export type IconSize = keyof typeof iconSizes

/**
 * Tailwind classes for icon sizes
 */
export const iconSizeClasses: Record<IconSize, string> = {
  xs: 'w-3 h-3',      // 12px
  sm: 'w-4 h-4',      // 16px
  md: 'w-5 h-5',      // 20px
  lg: 'w-6 h-6',      // 24px
  xl: 'w-8 h-8',      // 32px
  '2xl': 'w-10 h-10', // 40px
}

/**
 * Container sizes for icon buttons (Liquid Glass)
 */
export const iconContainerSizes: Record<IconSize, { container: string; icon: string; padding: string }> = {
  xs: { container: 'w-6 h-6', icon: 'w-3 h-3', padding: 'p-1.5' },
  sm: { container: 'w-8 h-8', icon: 'w-4 h-4', padding: 'p-2' },
  md: { container: 'w-10 h-10', icon: 'w-5 h-5', padding: 'p-2.5' },
  lg: { container: 'w-12 h-12', icon: 'w-6 h-6', padding: 'p-3' },
  xl: { container: 'w-14 h-14', icon: 'w-8 h-8', padding: 'p-3' },
  '2xl': { container: 'w-16 h-16', icon: 'w-10 h-10', padding: 'p-3' },
}

// ============================================
// STROKE WIDTH SYSTEM
// ============================================

/**
 * Stroke width scale for Lucide icons
 * Apple Liquid Glass 2026 uses slightly thinner strokes
 */
export const iconStrokeWidth = {
  /** 1.5 - Light: subtle, secondary icons */
  light: 1.5,
  /** 1.75 - Regular: default weight */
  regular: 1.75,
  /** 2.0 - Medium: active states, emphasis */
  medium: 2.0,
  /** 2.25 - Bold: strong emphasis, headers */
  bold: 2.25,
} as const

export type IconStrokeWeight = keyof typeof iconStrokeWidth

// ============================================
// SEMANTIC ICON MAPPINGS
// ============================================

/**
 * Semantic icon categories for medical/healthcare context
 */
export const semanticIcons = {
  // Navigation
  navigation: {
    dashboard: 'LayoutGrid',
    anamnese: 'FileText',
    flash: 'Zap',
    chat: 'MessageCircle',
    prescription: 'FileSignature',
    history: 'FolderClock',
    protocols: 'BookOpen',
    settings: 'Settings',
    accessibility: 'Eye',
    menu: 'Menu',
    close: 'X',
    back: 'ChevronLeft',
    forward: 'ChevronRight',
    up: 'ChevronUp',
    down: 'ChevronDown',
  },

  // Actions
  actions: {
    add: 'Plus',
    remove: 'Minus',
    delete: 'Trash2',
    edit: 'Pencil',
    save: 'Save',
    copy: 'Copy',
    check: 'Check',
    cancel: 'X',
    refresh: 'RefreshCw',
    search: 'Search',
    filter: 'Filter',
    sort: 'ArrowUpDown',
    expand: 'Maximize2',
    collapse: 'Minimize2',
    pin: 'Pin',
    unpin: 'PinOff',
    share: 'Share2',
    download: 'Download',
    upload: 'Upload',
    print: 'Printer',
    export: 'FileDown',
    import: 'FileUp',
  },

  // Status indicators
  status: {
    success: 'CheckCircle2',
    warning: 'AlertTriangle',
    error: 'XCircle',
    info: 'Info',
    loading: 'Loader2',
    pending: 'Clock',
    complete: 'CheckCircle',
    incomplete: 'Circle',
  },

  // Medical/Healthcare
  medical: {
    heart: 'Heart',
    heartPulse: 'HeartPulse',
    activity: 'Activity',
    stethoscope: 'Stethoscope',
    pill: 'Pill',
    thermometer: 'Thermometer',
    syringe: 'Syringe',
    bandage: 'BandagePlus',
    hospital: 'Building2',
    ambulance: 'Ambulance',
    brain: 'Brain',
    eye: 'Eye',
    user: 'User',
    users: 'Users',
    baby: 'Baby',
    bone: 'Bone',
    lungs: 'Wind',
    scale: 'Scale',
    calculator: 'Calculator',
    clipboard: 'ClipboardCheck',
    shield: 'Shield',
    shieldAlert: 'ShieldAlert',
    redFlag: 'AlertOctagon',
  },

  // Data/Charts
  data: {
    chart: 'BarChart3',
    lineChart: 'LineChart',
    pieChart: 'PieChart',
    trendUp: 'TrendingUp',
    trendDown: 'TrendingDown',
    stats: 'BarChart',
    table: 'Table',
    grid: 'Grid3X3',
  },

  // Time
  time: {
    clock: 'Clock',
    calendar: 'Calendar',
    calendarDays: 'CalendarDays',
    history: 'History',
    timer: 'Timer',
    alarm: 'AlarmClock',
  },

  // Communication
  communication: {
    bell: 'Bell',
    bellOff: 'BellOff',
    mail: 'Mail',
    message: 'MessageSquare',
    phone: 'Phone',
    video: 'Video',
    mic: 'Mic',
    micOff: 'MicOff',
  },

  // UI elements
  ui: {
    sun: 'Sun',
    moon: 'Moon',
    star: 'Star',
    sparkles: 'Sparkles',
    zap: 'Zap',
    bolt: 'Bolt',
    flame: 'Flame',
    droplet: 'Droplet',
    cloud: 'Cloud',
    cloudOff: 'CloudOff',
    wifi: 'Wifi',
    wifiOff: 'WifiOff',
    lock: 'Lock',
    unlock: 'Unlock',
    key: 'Key',
    eye: 'Eye',
    eyeOff: 'EyeOff',
    moreHorizontal: 'MoreHorizontal',
    moreVertical: 'MoreVertical',
    grip: 'GripVertical',
    quote: 'Quote',
    tag: 'Tag',
    folder: 'Folder',
    file: 'FileText',
    image: 'Image',
    layout: 'Layout',
    layers: 'Layers',
    logout: 'LogOut',
    login: 'LogIn',
  },
} as const

// ============================================
// COLOR SYSTEM
// ============================================

/**
 * Icon color variants following Liquid Glass 2026
 */
export const iconColors = {
  // Semantic colors
  primary: {
    className: 'text-action-primary dark:text-action-primary',
    style: { color: 'var(--action-primary)' },
  },
  secondary: {
    className: 'text-text-secondary dark:text-text-secondary',
    style: { color: 'var(--text-secondary)' },
  },
  muted: {
    className: 'text-text-muted dark:text-text-muted',
    style: { color: 'var(--text-muted)' },
  },

  // Status colors
  success: {
    className: 'text-status-success dark:text-status-success',
    style: { color: 'var(--status-success)' },
  },
  warning: {
    className: 'text-status-warning dark:text-status-warning',
    style: { color: 'var(--status-warning)' },
  },
  error: {
    className: 'text-status-error dark:text-status-error',
    style: { color: 'var(--status-error)' },
  },
  info: {
    className: 'text-status-info dark:text-status-info',
    style: { color: 'var(--status-info)' },
  },

  // Neutral colors
  default: {
    className: 'text-slate-500 dark:text-slate-400',
    style: { color: 'currentColor' },
  },
  inherit: {
    className: '',
    style: { color: 'inherit' },
  },
} as const

export type IconColor = keyof typeof iconColors

// ============================================
// ANIMATION PRESETS
// ============================================

/**
 * Framer Motion animation presets for icons
 */
export const iconAnimations = {
  /** Subtle pulse for loading states */
  pulse: {
    animate: { scale: [1, 1.1, 1] },
    transition: { duration: 1, repeat: Infinity },
  },

  /** Rotation for loaders */
  spin: {
    animate: { rotate: 360 },
    transition: { duration: 1, repeat: Infinity, ease: 'linear' },
  },

  /** Bounce for attention */
  bounce: {
    animate: { y: [0, -4, 0] },
    transition: { duration: 0.6, repeat: Infinity },
  },

  /** Scale on hover */
  hover: {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  },

  /** Entrance animation */
  enter: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },

  /** Exit animation */
  exit: {
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.15 },
  },
} as const

// ============================================
// GLASS ICON STYLES
// ============================================

/**
 * Base styles for glass icon containers
 */
export const glassIconContainerStyles = {
  /** Default glass container */
  default: `
    relative flex items-center justify-center
    backdrop-blur-xl
    bg-white/10 dark:bg-white/5
    border border-white/20 dark:border-white/10
    shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.3)]
    dark:shadow-[0_2px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]
    transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
  `.trim().replace(/\s+/g, ' '),

  /** Hover state */
  hover: `
    hover:bg-white/20 dark:hover:bg-white/10
    hover:border-white/30 dark:hover:border-white/15
    hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.4)]
    dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]
  `.trim().replace(/\s+/g, ' '),

  /** Active/selected state */
  active: `
    bg-action-primary/15 dark:bg-action-primary/20
    border-action-primary/30 dark:border-action-primary/25
    shadow-[0_4px_20px_rgba(0,122,255,0.2)]
  `.trim().replace(/\s+/g, ' '),

  /** Circular container */
  circular: 'rounded-full',

  /** Rounded square container */
  rounded: 'rounded-[12px]',
}

/**
 * Border radius for icon containers by size
 */
export const iconContainerRadius: Record<IconSize, string> = {
  xs: 'rounded-[8px]',
  sm: 'rounded-[10px]',
  md: 'rounded-[12px]',
  lg: 'rounded-[14px]',
  xl: 'rounded-[16px]',
  '2xl': 'rounded-[18px]',
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get icon size class for a given size key
 */
export function getIconSizeClass(size: IconSize): string {
  return iconSizeClasses[size]
}

/**
 * Get icon container classes for a given size
 */
export function getIconContainerClasses(size: IconSize): {
  container: string
  icon: string
  padding: string
  radius: string
} {
  return {
    ...iconContainerSizes[size],
    radius: iconContainerRadius[size],
  }
}

/**
 * Get stroke width for a given weight
 */
export function getStrokeWidth(weight: IconStrokeWeight = 'regular'): number {
  return iconStrokeWidth[weight]
}

/**
 * Get icon color classes
 */
export function getIconColorClass(color: IconColor): string {
  return iconColors[color].className
}

/**
 * Compose icon classes for direct usage
 */
export function composeIconClasses(options: {
  size?: IconSize
  color?: IconColor
  weight?: IconStrokeWeight
  className?: string
}): string {
  const { size = 'md', color = 'default', className = '' } = options

  return [
    iconSizeClasses[size],
    iconColors[color].className,
    'transition-colors duration-200',
    className,
  ].filter(Boolean).join(' ')
}

/**
 * Props interface for standardized icon components
 */
export interface StandardIconProps {
  /** The Lucide icon component to render */
  icon: LucideIcon
  /** Size of the icon */
  size?: IconSize
  /** Color variant */
  color?: IconColor
  /** Stroke weight */
  weight?: IconStrokeWeight
  /** Additional CSS classes */
  className?: string
  /** Accessibility label */
  'aria-label'?: string
  /** Click handler */
  onClick?: () => void
}

/**
 * Props for icon button components
 */
export interface IconButtonProps extends StandardIconProps {
  /** Button variant */
  variant?: 'default' | 'ghost' | 'outline' | 'glass'
  /** Whether the button is in active state */
  isActive?: boolean
  /** Whether the button is disabled */
  disabled?: boolean
  /** Button type */
  type?: 'button' | 'submit' | 'reset'
}

// ============================================
// EXPORTS
// ============================================

export default {
  sizes: iconSizes,
  sizeClasses: iconSizeClasses,
  containerSizes: iconContainerSizes,
  strokeWidth: iconStrokeWidth,
  semanticIcons,
  colors: iconColors,
  animations: iconAnimations,
  glassStyles: glassIconContainerStyles,
  containerRadius: iconContainerRadius,
  // Utilities
  getIconSizeClass,
  getIconContainerClasses,
  getStrokeWidth,
  getIconColorClass,
  composeIconClasses,
}
