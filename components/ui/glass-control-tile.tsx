'use client'

import * as React from 'react'
import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * GlassControlTile - iOS 26 Control Center style tile component
 * Based on Apple's Liquid Glass 2026 design system
 *
 * Features:
 * - Translucent glass background with backdrop blur
 * - Rounded square shape matching device hardware
 * - Active state with filled background
 * - Subtle rim light and inner glow effects
 * - Press animation with scale feedback
 */

export type ControlTileSize = 'sm' | 'default' | 'lg' | 'wide' | 'tall'
export type ControlTileColor = 'default' | 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'teal'

export interface GlassControlTileProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  /** Icon to display in the tile */
  icon: React.ReactNode
  /** Label text below the icon */
  label?: string
  /** Secondary label text */
  sublabel?: string
  /** Whether the tile is in active/selected state */
  active?: boolean
  /** Size variant */
  size?: ControlTileSize
  /** Color when active */
  activeColor?: ControlTileColor
  /** Disabled state */
  disabled?: boolean
}

const sizeConfig = {
  sm: {
    container: 'w-14 h-14',
    icon: 'w-5 h-5',
    padding: 'p-3',
    rounded: 'rounded-2xl',
    showLabel: false,
  },
  default: {
    container: 'w-20 h-20',
    icon: 'w-7 h-7',
    padding: 'p-4',
    rounded: 'rounded-[22px]',
    showLabel: true,
  },
  lg: {
    container: 'w-24 h-24',
    icon: 'w-8 h-8',
    padding: 'p-5',
    rounded: 'rounded-3xl',
    showLabel: true,
  },
  wide: {
    container: 'w-44 h-20',
    icon: 'w-7 h-7',
    padding: 'p-4',
    rounded: 'rounded-[22px]',
    showLabel: true,
  },
  tall: {
    container: 'w-20 h-44',
    icon: 'w-7 h-7',
    padding: 'p-4',
    rounded: 'rounded-[22px]',
    showLabel: true,
  },
} as const

/**
 * Color config using glassmorphism - NO solid backgrounds
 * Active states use subtle tinted glass instead of solid colors
 */
const colorConfig = {
  default: {
    active: 'bg-white/70 dark:bg-white/20',
    inactive: 'bg-white/25 dark:bg-white/10',
    iconActive: 'text-slate-900 dark:text-white',
    iconInactive: 'text-white/90',
    labelActive: 'text-slate-900 dark:text-white',
    labelInactive: 'text-white/90',
  },
  blue: {
    active: 'bg-[rgba(0,122,255,0.25)] dark:bg-[rgba(0,122,255,0.35)]',
    inactive: 'bg-white/25 dark:bg-white/10',
    iconActive: 'text-[#007AFF] dark:text-[#0A84FF]',
    iconInactive: 'text-white/90',
    labelActive: 'text-[#007AFF] dark:text-[#0A84FF]',
    labelInactive: 'text-white/90',
  },
  green: {
    active: 'bg-[rgba(52,199,89,0.25)] dark:bg-[rgba(52,199,89,0.35)]',
    inactive: 'bg-white/25 dark:bg-white/10',
    iconActive: 'text-[#34C759] dark:text-[#30D158]',
    iconInactive: 'text-white/90',
    labelActive: 'text-[#34C759] dark:text-[#30D158]',
    labelInactive: 'text-white/90',
  },
  orange: {
    active: 'bg-[rgba(255,149,0,0.25)] dark:bg-[rgba(255,149,0,0.35)]',
    inactive: 'bg-white/25 dark:bg-white/10',
    iconActive: 'text-[#FF9500] dark:text-[#FF9F0A]',
    iconInactive: 'text-white/90',
    labelActive: 'text-[#FF9500] dark:text-[#FF9F0A]',
    labelInactive: 'text-white/90',
  },
  red: {
    active: 'bg-[rgba(255,59,48,0.25)] dark:bg-[rgba(255,59,48,0.35)]',
    inactive: 'bg-white/25 dark:bg-white/10',
    iconActive: 'text-[#FF3B30] dark:text-[#FF453A]',
    iconInactive: 'text-white/90',
    labelActive: 'text-[#FF3B30] dark:text-[#FF453A]',
    labelInactive: 'text-white/90',
  },
  purple: {
    active: 'bg-[rgba(175,82,222,0.25)] dark:bg-[rgba(175,82,222,0.35)]',
    inactive: 'bg-white/25 dark:bg-white/10',
    iconActive: 'text-[#AF52DE] dark:text-[#BF5AF2]',
    iconInactive: 'text-white/90',
    labelActive: 'text-[#AF52DE] dark:text-[#BF5AF2]',
    labelInactive: 'text-white/90',
  },
  teal: {
    active: 'bg-[rgba(90,200,250,0.25)] dark:bg-[rgba(90,200,250,0.35)]',
    inactive: 'bg-white/25 dark:bg-white/10',
    iconActive: 'text-[#5AC8FA] dark:text-[#64D2FF]',
    iconInactive: 'text-white/90',
    labelActive: 'text-[#5AC8FA] dark:text-[#64D2FF]',
    labelInactive: 'text-white/90',
  },
} as const

const GlassControlTile = forwardRef<HTMLButtonElement, GlassControlTileProps>(
  (
    {
      icon,
      label,
      sublabel,
      active = false,
      size = 'default',
      activeColor = 'default',
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const sizeStyles = sizeConfig[size]
    const colorStyles = colorConfig[activeColor]

    return (
      <motion.button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          'relative flex flex-col items-center justify-center gap-1.5',
          'backdrop-blur-[60px] saturate-[180%]',
          'border border-white/20',
          'transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          sizeStyles.container,
          sizeStyles.padding,
          sizeStyles.rounded,
          active ? colorStyles.active : colorStyles.inactive,
          // Inner glow effect
          'shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        whileHover={!disabled ? { scale: 1.02 } : undefined}
        whileTap={!disabled ? { scale: 0.95 } : undefined}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
        {...props}
      >
        {/* Rim light effect */}
        <div
          className={cn(
            'absolute inset-0 pointer-events-none',
            sizeStyles.rounded,
            'before:absolute before:inset-0 before:rounded-inherit before:p-[1px]',
            "before:bg-[conic-gradient(from_45deg_at_50%_50%,rgba(255,255,255,0.8)_0deg,rgba(255,255,255,0.3)_90deg,rgba(255,255,255,0.1)_180deg,rgba(255,255,255,0.3)_270deg,rgba(255,255,255,0.8)_360deg)]",
            "before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
            'before:[mask-composite:xor]',
            'before:[-webkit-mask-composite:xor]'
          )}
        />

        {/* Icon */}
        <div
          className={cn(
            sizeStyles.icon,
            'transition-colors duration-200',
            active ? colorStyles.iconActive : colorStyles.iconInactive,
            '[&>svg]:w-full [&>svg]:h-full'
          )}
        >
          {icon}
        </div>

        {/* Label */}
        {sizeStyles.showLabel && label && (
          <span
            className={cn(
              'text-[10px] font-medium leading-tight text-center line-clamp-2',
              'transition-colors duration-200',
              active ? colorStyles.labelActive : colorStyles.labelInactive
            )}
          >
            {label}
          </span>
        )}

        {/* Sublabel for wide tiles */}
        {size === 'wide' && sublabel && (
          <span
            className={cn(
              'text-[9px] opacity-70 leading-tight',
              'transition-colors duration-200',
              active ? colorStyles.labelActive : colorStyles.labelInactive
            )}
          >
            {sublabel}
          </span>
        )}
      </motion.button>
    )
  }
)

GlassControlTile.displayName = 'GlassControlTile'

/**
 * GlassControlTileGrid - Grid container for control tiles
 */
export interface GlassControlTileGridProps {
  children: React.ReactNode
  columns?: 2 | 3 | 4
  className?: string
}

const GlassControlTileGrid = ({
  children,
  columns = 4,
  className,
}: GlassControlTileGridProps) => {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }

  return (
    <div
      className={cn(
        'grid gap-2 p-2',
        gridCols[columns],
        className
      )}
    >
      {children}
    </div>
  )
}

GlassControlTileGrid.displayName = 'GlassControlTileGrid'

export { GlassControlTile, GlassControlTileGrid }
