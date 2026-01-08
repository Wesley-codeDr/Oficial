'use client'

import * as React from 'react'
import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'
import { sliderAnimations } from '@/lib/design-system/micro-interactions'

export interface GlassSliderProps {
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  onValueCommit?: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  showTooltip?: boolean
  showMinMax?: boolean
  formatValue?: (value: number) => string
  className?: string
}

const GlassSlider = forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, GlassSliderProps>(
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
      className,
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [internalValue, setInternalValue] = useState(defaultValue)

    const currentValue = value ?? internalValue
    const displayValue = currentValue[0] ?? min

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
          <SliderPrimitive.Track
            className="relative h-1 w-full grow overflow-hidden rounded-full backdrop-blur-[20px]"
            style={{
              backgroundColor: 'rgba(120, 120, 128, 0.16)',
            }}
          >
            <SliderPrimitive.Range
              className="absolute h-full rounded-full"
              style={{
                background: 'linear-gradient(to right, #007AFF, #5856D6)',
              }}
            />
          </SliderPrimitive.Track>

          <SliderPrimitive.Thumb asChild>
            <motion.div
              className={cn(
                'relative block rounded-full w-7 h-7 bg-white',
                'border border-white/50 backdrop-blur-[10px]',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2',
                disabled ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'
              )}
              initial={sliderAnimations.thumb.rest}
              animate={
                isDragging
                  ? sliderAnimations.thumb.drag
                  : isHovering
                    ? sliderAnimations.thumb.hover
                    : sliderAnimations.thumb.rest
              }
              transition={springTransition}
              style={{
                boxShadow: isDragging
                  ? '0 6px 24px rgba(0, 0, 0, 0.25)'
                  : isHovering
                    ? '0 4px 16px rgba(0, 0, 0, 0.2)'
                    : '0 2px 8px rgba(0, 0, 0, 0.15)',
              }}
            >
              <AnimatePresence>
                {showTooltip && isDragging && (
                  <motion.div
                    className={cn(
                      'absolute -top-10 left-1/2 -translate-x-1/2',
                      'px-2.5 py-1.5 rounded-lg',
                      'backdrop-blur-[40px] saturate-[180%]',
                      'bg-white/80 dark:bg-slate-900/80',
                      'border border-white/50 dark:border-white/12',
                      'shadow-lg text-sm font-medium',
                      'text-slate-900 dark:text-slate-100 whitespace-nowrap'
                    )}
                    initial={sliderAnimations.tooltip.initial}
                    animate={sliderAnimations.tooltip.animate}
                    exit={sliderAnimations.tooltip.exit}
                    transition={sliderAnimations.tooltip.transition}
                  >
                    {formatValue(displayValue)}
                    <div
                      className={cn(
                        'absolute -bottom-1 left-1/2 -translate-x-1/2',
                        'w-2 h-2 rotate-45',
                        'bg-white/80 dark:bg-slate-900/80',
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
