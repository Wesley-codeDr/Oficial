'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { useDirection } from '@/lib/contexts/direction-context'

/**
 * Apple HIG Right-to-Left Progress Guidelines
 * @see https://developer.apple.com/design/human-interface-guidelines/right-to-left
 * 
 * "Flip controls that show progress from one value to another.
 * Because people tend to view forward progress as moving in the
 * same direction as the language they read."
 */

interface RTLProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress value (0-100) */
  value: number
  /** Maximum value (defaults to 100) */
  max?: number
  /** Show percentage label */
  showLabel?: boolean
  /** Custom label format */
  formatLabel?: (value: number, max: number) => string
  /** Progress bar color variant */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Animate the progress bar */
  animated?: boolean
}

const variantStyles = {
  default: 'bg-primary',
  success: 'bg-clinical-stable',
  warning: 'bg-clinical-warning',
  danger: 'bg-clinical-critical',
  info: 'bg-healthcare-primary',
}

const sizeStyles = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

/**
 * RTL-aware Progress Bar
 * 
 * Automatically flips direction in RTL mode following Apple HIG guidelines.
 * Progress moves from right to left in RTL languages.
 * 
 * @example
 * ```tsx
 * <RTLProgress value={75} />
 * <RTLProgress value={50} variant="success" showLabel />
 * ```
 */
export function RTLProgress({
  value,
  max = 100,
  showLabel = false,
  formatLabel,
  variant = 'default',
  size = 'md',
  animated = true,
  className,
  ...props
}: RTLProgressProps) {
  const { isRTL } = useDirection()
  
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  const label = formatLabel 
    ? formatLabel(value, max) 
    : `${Math.round(percentage)}%`

  return (
    <div 
      className={cn('flex items-center gap-2', className)} 
      {...props}
    >
      <div 
        className={cn(
          'relative w-full overflow-hidden rounded-full bg-muted',
          sizeStyles[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={cn(
            'h-full rounded-full',
            variantStyles[variant],
            animated && 'transition-all duration-500 ease-out'
          )}
          style={{
            width: `${percentage}%`,
            // Apple HIG: Progress bar direction follows reading direction
            // In RTL, progress fills from right to left
            [isRTL ? 'marginLeft' : 'marginRight']: 'auto',
            [isRTL ? 'marginRight' : 'marginLeft']: 0,
          }}
        />
      </div>
      
      {showLabel && (
        <span className="text-sm font-medium text-muted-foreground number-preserve min-w-[3ch]">
          {label}
        </span>
      )}
    </div>
  )
}

/**
 * RTL-aware Circular Progress
 */
interface RTLCircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress value (0-100) */
  value: number
  /** Size in pixels */
  size?: number
  /** Stroke width */
  strokeWidth?: number
  /** Show center label */
  showLabel?: boolean
  /** Progress color */
  color?: string
}

export function RTLCircularProgress({
  value,
  size = 48,
  strokeWidth = 4,
  showLabel = true,
  color,
  className,
  ...props
}: RTLCircularProgressProps) {
  const { isRTL } = useDirection()
  
  const percentage = Math.min(Math.max(value, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div 
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <svg
        width={size}
        height={size}
        className={cn(
          'transform -rotate-90',
          // Apple HIG: Circular progress rotates opposite in RTL
          isRTL && 'scale-x-[-1]'
        )}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color || 'currentColor'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(
            'text-primary transition-all duration-500 ease-out',
            color && ''
          )}
          style={color ? { stroke: color } : undefined}
        />
      </svg>
      
      {showLabel && (
        <span className="absolute text-xs font-semibold number-preserve">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  )
}



