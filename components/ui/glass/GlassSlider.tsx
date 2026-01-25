'use client'

import * as React from 'react'
import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'
import {
  glassRadius,
  glassTransition,
  appleSystemColors,
} from '@/lib/design-system/glass-tokens'

/**
 * GlassSlider - iOS 26 style slider component
 * Based on Apple's Liquid Glass 2026 design
 *
 * Features:
 * - Glass track and thumb styling
 * - Value indicator tooltip on drag
 * - Smooth spring animations
 * - Healthcare variant support
 */

// ==================== TYPES ====================

export type GlassSliderHealthcareVariant =
  | 'default'
  | 'healthcare-primary'
  | 'healthcare-success'
  | 'healthcare-warning'
  | 'healthcare-critical'

export interface GlassSliderProps {
  /** Controlled value */
  value?: number[]
  /** Default value */
  defaultValue?: number[]
  /** Called when value changes */
  onValueChange?: (value: number[]) => void
  /** Called when value change is committed (on mouse up) */
  onValueCommit?: (value: number[]) => void
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Disabled state */
  disabled?: boolean
  /** Show tooltip with value on drag */
  showTooltip?: boolean
  /** Show min/max labels */
  showMinMax?: boolean
  /** Format value for display */
  formatValue?: (value: number) => string
  /** Healthcare variant for medical contexts */
  healthcareVariant?: GlassSliderHealthcareVariant
  /** Additional class names */
  className?: string
}

// ==================== HEALTHCARE VARIANT STYLES ====================

const healthcareVariantColors: Record<GlassSliderHealthcareVariant, {
  gradient: string
  glow: string
}> = {
  default: {
    gradient: `linear-gradient(to right, ${appleSystemColors.blue}, ${appleSystemColors.purple})`,
    glow: `0 0 12px ${appleSystemColors.blue}66`,
  },
  'healthcare-primary': {
    gradient: `linear-gradient(to right, ${appleSystemColors.blue}, #0066CC)`,
    glow: `0 0 12px ${appleSystemColors.blue}66`,
  },
  'healthcare-success': {
    gradient: `linear-gradient(to right, ${appleSystemColors.green}, #2DB84C)`,
    glow: `0 0 12px ${appleSystemColors.green}66`,
  },
  'healthcare-warning': {
    gradient: `linear-gradient(to right, ${appleSystemColors.orange}, #E68600)`,
    glow: `0 0 12px ${appleSystemColors.orange}66`,
  },
  'healthcare-critical': {
    gradient: `linear-gradient(to right, ${appleSystemColors.red}, #D32F2F)`,
    glow: `0 0 12px ${appleSystemColors.red}66`,
  },
}

// ==================== ANIMATION VARIANTS ====================

const thumbAnimationStates = {
  rest: {
    scale: 1,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  },
  hover: {
    scale: 1.15,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
  },
  drag: {
    scale: 1.25,
    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.25)',
  },
}

const tooltipVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.15,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 5,
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
}

// ==================== COMPONENT ====================

const GlassSlider = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  GlassSliderProps
>(
  (
    {
      value,
      defaultValue = [50],
      onValueChange,
      onValueCommit,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      showTooltip = true,
      showMinMax = false,
      formatValue = (v) => String(v),
      healthcareVariant = 'default',
      className,
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [internalValue, setInternalValue] = useState(defaultValue)

    const currentValue = value ?? internalValue
    const displayValue = currentValue[0] ?? min
    const variantColors = healthcareVariantColors[healthcareVariant]

    const handleValueChange = (newValue: number[]) => {
      if (!value) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    const handleValueCommit = (newValue: number[]) => {
      onValueCommit?.(newValue)
    }

    const springTransition = {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
    }

    return (
      <div className={cn('relative w-full', className)}>
        {/* Min/Max Labels */}
        {showMinMax && (
          <div className="flex justify-between mb-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{formatValue(min)}</span>
            <span>{formatValue(max)}</span>
          </div>
        )}

        <SliderPrimitive.Root
          ref={ref}
          value={currentValue}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          onValueCommit={handleValueCommit}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={cn(
            'relative flex w-full touch-none select-none items-center',
            'h-7',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          onPointerLeave={() => {
            setIsDragging(false)
            setIsHovering(false)
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Glass Track */}
          <SliderPrimitive.Track
            className={cn(
              'relative h-1.5 w-full grow overflow-hidden rounded-full',
              'liquid-glass-subtle',
              'bg-slate-200/60 dark:bg-slate-700/40'
            )}
          >
            {/* Filled Range */}
            <SliderPrimitive.Range
              className="absolute h-full rounded-full"
              style={{
                background: variantColors.gradient,
                boxShadow: isDragging ? variantColors.glow : 'none',
              }}
            />
          </SliderPrimitive.Track>

          {/* Glass Thumb */}
          <SliderPrimitive.Thumb asChild>
            <motion.div
              className={cn(
                'relative block rounded-full w-7 h-7',
                'bg-white dark:bg-slate-100',
                'border border-white/50 dark:border-white/30',
                'liquid-glass-subtle',
                // Focus ring - accessible
                'focus:outline-none',
                'focus-visible:ring-[3px]',
                'focus-visible:ring-blue-500/50',
                'focus-visible:ring-offset-2',
                disabled
                  ? 'cursor-not-allowed'
                  : 'cursor-grab active:cursor-grabbing'
              )}
              initial={thumbAnimationStates.rest}
              animate={
                isDragging
                  ? thumbAnimationStates.drag
                  : isHovering
                    ? thumbAnimationStates.hover
                    : thumbAnimationStates.rest
              }
              transition={springTransition}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {showTooltip && isDragging && (
                  <motion.div
                    className={cn(
                      'absolute -top-10 left-1/2 -translate-x-1/2',
                      'px-2.5 py-1.5',
                      glassRadius.sm,
                      // Glass styling
                      'liquid-glass-subtle',
                      'bg-white/90 dark:bg-slate-900/90',
                      'border border-white/50 dark:border-white/12',
                      'shadow-lg',
                      // Typography
                      'text-sm font-medium',
                      'text-slate-900 dark:text-slate-100',
                      'whitespace-nowrap'
                    )}
                    variants={tooltipVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {formatValue(displayValue)}
                    {/* Tooltip arrow */}
                    <div
                      className={cn(
                        'absolute -bottom-1 left-1/2 -translate-x-1/2',
                        'w-2 h-2 rotate-45',
                        'bg-white/90 dark:bg-slate-900/90',
                        'border-r border-b border-white/50 dark:border-white/12'
                      )}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </SliderPrimitive.Thumb>
        </SliderPrimitive.Root>
      </div>
    )
  }
)

GlassSlider.displayName = 'GlassSlider'

export { GlassSlider }
