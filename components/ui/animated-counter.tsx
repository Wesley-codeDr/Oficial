'use client'

import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform, animate, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { counterAnimations } from '@/lib/design-system/micro-interactions'

export interface AnimatedCounterProps {
  /** The current value to display */
  value: number
  /** Previous value for direction detection */
  previousValue?: number
  /** Animation duration in seconds */
  duration?: number
  /** Intl.NumberFormat options for formatting */
  formatOptions?: Intl.NumberFormatOptions
  /** Locale for number formatting */
  locale?: string
  /** Prefix to display before the number (e.g., 'R$') */
  prefix?: string
  /** Suffix to display after the number (e.g., '%') */
  suffix?: string
  /** Show direction indicator arrow */
  showDirection?: boolean
  /** Apply color based on direction (green up, red down) */
  colorizeDirection?: boolean
  /** Animate each digit separately (Apple-style) */
  digitAnimation?: boolean
  /** Additional CSS classes */
  className?: string
  /** Spring physics configuration */
  spring?: {
    stiffness?: number
    damping?: number
  }
}

type Direction = 'up' | 'down' | 'neutral'

function getDirection(current: number, previous?: number): Direction {
  if (previous === undefined) return 'neutral'
  if (current > previous) return 'up'
  if (current < previous) return 'down'
  return 'neutral'
}

function formatNumber(value: number, locale: string, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(locale, options).format(value)
}

function AnimatedDigit({ digit, className }: { digit: string; className?: string }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={digit}
        initial={counterAnimations.digit.initial}
        animate={counterAnimations.digit.animate}
        exit={counterAnimations.digit.exit}
        transition={counterAnimations.digit.transition}
        className={cn('inline-block', className)}
      >
        {digit}
      </motion.span>
    </AnimatePresence>
  )
}

function DirectionIndicator({ direction, colorize }: { direction: Direction; colorize?: boolean }) {
  if (direction === 'neutral') return null

  const isUp = direction === 'up'

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'ml-1 inline-flex items-center text-sm',
        colorize && isUp && 'text-green-500',
        colorize && !isUp && 'text-red-500'
      )}
      aria-label={isUp ? 'increasing' : 'decreasing'}
    >
      {isUp ? (
        <svg
          className="h-3 w-3"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 10V2M2 6l4-4 4 4" />
        </svg>
      ) : (
        <svg
          className="h-3 w-3"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2v8M2 6l4 4 4-4" />
        </svg>
      )}
    </motion.span>
  )
}

export function AnimatedCounter({
  value,
  previousValue,
  duration = 0.8,
  formatOptions,
  locale = 'pt-BR',
  prefix = '',
  suffix = '',
  showDirection = false,
  colorizeDirection = false,
  digitAnimation = false,
  className,
  spring: springConfig,
}: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const prevValueRef = useRef<number>(previousValue ?? value)
  const [displayValue, setDisplayValue] = useState(value)
  const [digits, setDigits] = useState<string[]>([])

  const direction = getDirection(value, prevValueRef.current)

  const springOptions = {
    stiffness: springConfig?.stiffness ?? 100,
    damping: springConfig?.damping ?? 30,
    duration: duration,
  }

  const springValue = useSpring(prevValueRef.current, springOptions)

  const formattedValue = useTransform(springValue, (latest) =>
    formatNumber(latest, locale, formatOptions)
  )

  useEffect(() => {
    const controls = animate(springValue, value, {
      type: 'spring',
      ...springOptions,
      onUpdate: (latest) => {
        setDisplayValue(latest)
        if (digitAnimation) {
          const formatted = formatNumber(latest, locale, formatOptions)
          setDigits(formatted.split(''))
        }
      },
    })

    return () => controls.stop()
  }, [value, locale, formatOptions, digitAnimation, springValue, springOptions])

  useEffect(() => {
    prevValueRef.current = value
  }, [value])

  useEffect(() => {
    if (digitAnimation) {
      const formatted = formatNumber(value, locale, formatOptions)
      setDigits(formatted.split(''))
    }
  }, [digitAnimation, value, locale, formatOptions])

  const directionColorClass = colorizeDirection
    ? direction === 'up'
      ? 'text-green-500'
      : direction === 'down'
        ? 'text-red-500'
        : ''
    : ''

  return (
    <motion.span
      ref={nodeRef}
      className={cn('inline-flex items-center tabular-nums', directionColorClass, className)}
      animate={counterAnimations.container.animate}
    >
      {prefix && <span className="mr-0.5">{prefix}</span>}

      {digitAnimation ? (
        <span className="inline-flex overflow-hidden">
          {digits.map((digit, index) => (
            <AnimatedDigit
              key={`${index}-${digit}`}
              digit={digit}
              className={directionColorClass}
            />
          ))}
        </span>
      ) : (
        <motion.span>{formattedValue}</motion.span>
      )}

      {suffix && <span className="ml-0.5">{suffix}</span>}

      {showDirection && <DirectionIndicator direction={direction} colorize={colorizeDirection} />}
    </motion.span>
  )
}
