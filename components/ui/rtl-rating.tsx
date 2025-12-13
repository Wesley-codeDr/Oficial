'use client'

import React from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDirection } from '@/lib/contexts/direction-context'

/**
 * Apple HIG Right-to-Left Rating Guidelines
 * @see https://developer.apple.com/design/human-interface-guidelines/right-to-left
 * 
 * "Reverse the order of numerals that show progress or a counting direction;
 * never flip the numerals themselves."
 * 
 * Rating controls should:
 * - Flip star order in RTL (1-5 becomes 5-1 visually)
 * - Maintain the same interaction direction
 * - Show numbers in correct RTL order
 */

interface RTLRatingProps {
  /** Current rating value */
  value: number
  /** Maximum rating (default 5) */
  max?: number
  /** Whether the rating is editable */
  editable?: boolean
  /** Callback when rating changes */
  onChange?: (value: number) => void
  /** Size of stars */
  size?: 'sm' | 'md' | 'lg'
  /** Show numeric labels under stars */
  showLabels?: boolean
  /** Custom star icon */
  icon?: React.ComponentType<{ className?: string; filled?: boolean }>
  /** Color when filled */
  filledColor?: string
  /** Color when empty */
  emptyColor?: string
  /** Allow half stars */
  allowHalf?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Additional class names */
  className?: string
}

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
}

const labelSizeStyles = {
  sm: 'text-[10px]',
  md: 'text-xs',
  lg: 'text-sm',
}

/**
 * RTL-aware Rating Component
 * 
 * Automatically handles star order and number display in RTL mode.
 * Following Apple HIG, the visual order reverses but semantics remain.
 * 
 * @example
 * ```tsx
 * // Read-only rating
 * <RTLRating value={3.5} />
 * 
 * // Editable rating with labels
 * <RTLRating value={rating} onChange={setRating} editable showLabels />
 * ```
 */
export function RTLRating({
  value,
  max = 5,
  editable = false,
  onChange,
  size = 'md',
  showLabels = false,
  icon: Icon,
  filledColor = 'text-yellow-500',
  emptyColor = 'text-muted-foreground/30',
  allowHalf = false,
  disabled = false,
  className,
}: RTLRatingProps) {
  const { isRTL } = useDirection()
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)

  // Generate star indices
  const stars = Array.from({ length: max }, (_, i) => i + 1)
  
  // Apple HIG: Reverse order visually in RTL, but maintain semantic order
  const displayStars = isRTL ? [...stars].reverse() : stars

  const handleClick = (starValue: number) => {
    if (!editable || disabled) return
    onChange?.(starValue)
  }

  const handleMouseEnter = (starValue: number) => {
    if (!editable || disabled) return
    setHoverValue(starValue)
  }

  const handleMouseLeave = () => {
    setHoverValue(null)
  }

  const getStarFill = (starIndex: number): 'full' | 'half' | 'empty' => {
    const currentValue = hoverValue ?? value
    
    if (currentValue >= starIndex) return 'full'
    if (allowHalf && currentValue >= starIndex - 0.5) return 'half'
    return 'empty'
  }

  const StarIcon = Icon || Star

  return (
    <div 
      className={cn(
        'inline-flex items-center gap-0.5',
        // Apple HIG: Direction reversal for rating controls
        isRTL && 'flex-row-reverse',
        className
      )}
      role="group"
      aria-label={`Rating: ${value} out of ${max}`}
    >
      {displayStars.map((starIndex) => {
        const fill = getStarFill(starIndex)
        
        return (
          <div
            key={starIndex}
            className="flex flex-col items-center"
          >
            <button
              type="button"
              onClick={() => handleClick(starIndex)}
              onMouseEnter={() => handleMouseEnter(starIndex)}
              onMouseLeave={handleMouseLeave}
              disabled={!editable || disabled}
              className={cn(
                'relative transition-transform duration-150',
                editable && !disabled && 'cursor-pointer hover:scale-110 active:scale-95',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
              aria-label={`${starIndex} star${starIndex > 1 ? 's' : ''}`}
            >
              {/* Background star (empty) */}
              <StarIcon
                className={cn(
                  sizeStyles[size],
                  emptyColor,
                  'stroke-current'
                )}
              />
              
              {/* Filled overlay */}
              {fill !== 'empty' && (
                <div
                  className={cn(
                    'absolute inset-0 overflow-hidden',
                    fill === 'half' && 'w-1/2'
                  )}
                >
                  <StarIcon
                    className={cn(
                      sizeStyles[size],
                      filledColor,
                      'fill-current stroke-current'
                    )}
                  />
                </div>
              )}
            </button>
            
            {/* Numeric label - Apple HIG: Numbers don't flip */}
            {showLabels && (
              <span 
                className={cn(
                  labelSizeStyles[size],
                  'mt-0.5 text-muted-foreground number-preserve'
                )}
              >
                {starIndex}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

/**
 * Simple read-only rating display
 */
interface RatingDisplayProps {
  value: number
  max?: number
  className?: string
}

export function RatingDisplay({ value, max = 5, className }: RatingDisplayProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <RTLRating value={value} max={max} size="sm" />
      <span className="text-sm text-muted-foreground number-preserve">
        {value.toFixed(1)}
      </span>
    </div>
  )
}



