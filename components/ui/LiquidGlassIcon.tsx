'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  IconColorKey,
  liquidGlassColors,
  sidebarItemColorMap,
} from '@/lib/design-system/liquidGlassColors'

export interface LiquidGlassIconProps {
  /** Lucide icon component */
  icon: LucideIcon
  /** Item ID for color mapping */
  itemId?: string
  /** Direct color key override */
  colorKey?: IconColorKey
  /** Whether the icon is in active state */
  isActive?: boolean
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Additional className */
  className?: string
  /** Click handler */
  onClick?: () => void
  /** Accessibility label */
  ariaLabel?: string
}

const sizeConfig = {
  sm: {
    container: 'w-8 h-8',
    icon: 'w-4 h-4',
    padding: 'p-1.5',
    radius: 'rounded-[10px]',
  },
  md: {
    container: 'w-10 h-10',
    icon: 'w-5 h-5',
    padding: 'p-2',
    radius: 'rounded-[12px]',
  },
  lg: {
    container: 'w-12 h-12',
    icon: 'w-6 h-6',
    padding: 'p-2.5',
    radius: 'rounded-[14px]',
  },
}

/**
 * LiquidGlassIcon - Apple iOS 26 Liquid Glass styled icon
 *
 * Features:
 * - Transparent background with backdrop blur
 * - Subtle gradients simulating light refraction
 * - Luminous borders with variable opacity
 * - Multi-layer shadows for 3D depth
 * - Internal reflections simulating light
 * - Fluid hover and active animations
 */
export const LiquidGlassIcon: React.FC<LiquidGlassIconProps> = ({
  icon: Icon,
  itemId = 'dashboard',
  colorKey,
  isActive = false,
  size = 'md',
  className,
  onClick,
  ariaLabel,
}) => {
  // Determine color configuration
  const resolvedColorKey = colorKey || sidebarItemColorMap[itemId] || 'dashboard'
  const colors = liquidGlassColors[resolvedColorKey]
  const sizeClasses = sizeConfig[size]

  return (
    <motion.div
      className={cn(
        // Base container
        'relative flex items-center justify-center',
        sizeClasses.container,
        sizeClasses.radius,
        'cursor-pointer',
        'transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]',

        // Glass base effect
        'backdrop-blur-xl',

        // Default state (inactive)
        !isActive && [
          'bg-white/10 dark:bg-white/5',
          'border border-white/20 dark:border-white/10',
          'shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.3)]',
          'dark:shadow-[0_2px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]',
        ],

        // Hover state (inactive)
        !isActive && [
          'hover:bg-white/20 dark:hover:bg-white/10',
          'hover:border-white/30 dark:hover:border-white/15',
          'hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.4)]',
          'dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]',
        ],

        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      aria-label={ariaLabel}
      whileHover={{ scale: isActive ? 1.05 : 1.08, y: -1 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        scale: isActive ? 1.05 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
      style={
        isActive
          ? {
              background: colors.gradient,
              border: `1px solid ${colors.borderActive}`,
              boxShadow: `${colors.glowShadow}, inset 0 1px 1px rgba(255,255,255,0.4)`,
            }
          : undefined
      }
    >
      {/* Top specular highlight (light reflection) */}
      <div
        className={cn(
          'absolute top-0 left-[15%] right-[15%] h-[1px]',
          'bg-gradient-to-r from-transparent via-white/50 to-transparent',
          'rounded-full',
          'pointer-events-none',
          'transition-opacity duration-300',
          isActive ? 'opacity-80' : 'opacity-40'
        )}
      />

      {/* Inner glow effect */}
      <div
        className={cn(
          'absolute inset-0',
          sizeClasses.radius,
          'pointer-events-none',
          'transition-opacity duration-300',
          isActive ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
        }}
      />

      {/* Icon */}
      <Icon
        className={cn(
          sizeClasses.icon,
          'relative z-10',
          'transition-all duration-300',

          // Inactive state colors
          !isActive && [
            'text-slate-500 dark:text-slate-400',
            'group-hover:text-slate-700 dark:group-hover:text-slate-200',
          ],

          // Active state - apply dynamic glow
          isActive && 'icon-liquid-glow'
        )}
        strokeWidth={isActive ? 2.2 : 1.8}
        style={
          isActive
            ? {
                color: `var(--icon-active-color, ${colors.iconActive})`,
                filter: `drop-shadow(0 0 6px ${colors.iconActive}40)`,
              }
            : undefined
        }
      />

      {/* CSS custom property for dark mode icon color */}
      <style jsx>{`
        @media (prefers-color-scheme: dark) {
          .icon-liquid-glow {
            --icon-active-color: ${colors.iconActiveDark};
            filter: drop-shadow(0 0 8px ${colors.iconActiveDark}50) !important;
          }
        }
        :global(.dark) .icon-liquid-glow {
          --icon-active-color: ${colors.iconActiveDark};
          filter: drop-shadow(0 0 8px ${colors.iconActiveDark}50) !important;
        }
      `}</style>
    </motion.div>
  )
}

/**
 * Animated version with entrance animation
 */
export const AnimatedLiquidGlassIcon: React.FC<
  LiquidGlassIconProps & { delay?: number }
> = ({ delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay,
      }}
    >
      <LiquidGlassIcon {...props} />
    </motion.div>
  )
}

export default LiquidGlassIcon
