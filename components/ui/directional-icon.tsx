'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { useDirection } from '@/lib/contexts/direction-context'
import { LucideIcon } from 'lucide-react'

/**
 * Apple HIG Right-to-Left Icon Guidelines
 * @see https://developer.apple.com/design/human-interface-guidelines/right-to-left
 * 
 * Icon Semantic Types:
 * - directional: Icons that represent direction (arrows, chevrons for navigation)
 * - navigation: Icons for back/forward navigation
 * - progress: Icons that show progress or counting direction
 * - static: Icons that should NEVER flip (logos, checkmarks, universal signs)
 * - text: Icons that represent text or reading direction
 * - audio: Speaker icons showing sound direction
 */

export type IconSemantic = 
  | 'directional'  // Arrows, chevrons indicating movement
  | 'navigation'   // Back/forward navigation
  | 'progress'     // Progress indicators, ratings
  | 'static'       // Never flip: logos, checkmarks, clocks
  | 'text'         // Text representation icons
  | 'audio'        // Speaker, volume icons

interface DirectionalIconProps extends React.SVGAttributes<SVGSVGElement> {
  /** The Lucide icon component to render */
  icon: LucideIcon
  /** Semantic meaning of the icon (determines if it flips in RTL) */
  semantic?: IconSemantic
  /** Size of the icon */
  size?: number | string
  /** Additional class names */
  className?: string
  /** Force flip regardless of direction */
  forceFlip?: boolean
  /** Prevent flip regardless of direction */
  preventFlip?: boolean
}

/**
 * DirectionalIcon - RTL-aware icon component
 * 
 * Automatically handles icon flipping based on Apple HIG guidelines:
 * - Directional icons (arrows, chevrons) flip in RTL
 * - Static icons (logos, checkmarks) never flip
 * - Navigation icons (back/forward) flip in RTL
 * 
 * @example
 * ```tsx
 * // Arrow that flips in RTL
 * <DirectionalIcon icon={ArrowRight} semantic="directional" />
 * 
 * // Logo that never flips
 * <DirectionalIcon icon={Apple} semantic="static" />
 * 
 * // Back button that flips in RTL
 * <DirectionalIcon icon={ChevronLeft} semantic="navigation" />
 * ```
 */
export function DirectionalIcon({
  icon: Icon,
  semantic = 'static',
  size = 24,
  className,
  forceFlip = false,
  preventFlip = false,
  ...props
}: DirectionalIconProps) {
  const { isRTL } = useDirection()

  // Determine if icon should flip
  const shouldFlip = React.useMemo(() => {
    if (preventFlip) return false
    if (forceFlip) return true
    
    // Apple HIG: Only flip icons that represent direction, navigation, or progress
    const flippableSemantics: IconSemantic[] = ['directional', 'navigation', 'progress', 'text', 'audio']
    return isRTL && flippableSemantics.includes(semantic)
  }, [isRTL, semantic, forceFlip, preventFlip])

  return (
    <Icon
      size={size}
      className={cn(
        'transition-transform duration-200',
        shouldFlip && 'scale-x-[-1]',
        className
      )}
      {...props}
    />
  )
}

/**
 * Common preset icons with correct semantic types
 */

// Navigation presets
export function BackIcon({ className, ...props }: Omit<DirectionalIconProps, 'icon' | 'semantic'> & { icon: LucideIcon }) {
  return <DirectionalIcon semantic="navigation" className={className} {...props} />
}

export function ForwardIcon({ className, ...props }: Omit<DirectionalIconProps, 'icon' | 'semantic'> & { icon: LucideIcon }) {
  return <DirectionalIcon semantic="navigation" className={className} {...props} />
}

// Utility component for lists with directional markers
interface ListMarkerIconProps {
  icon: LucideIcon
  className?: string
  size?: number
}

export function ListMarkerIcon({ icon: Icon, className, size = 16 }: ListMarkerIconProps) {
  const { isRTL } = useDirection()
  
  return (
    <Icon 
      size={size}
      className={cn(
        'shrink-0',
        isRTL && 'scale-x-[-1]',
        className
      )}
    />
  )
}

/**
 * Hook to get icon flip state based on semantic
 */
export function useIconFlip(semantic: IconSemantic = 'static'): boolean {
  const { isRTL } = useDirection()
  
  const flippableSemantics: IconSemantic[] = ['directional', 'navigation', 'progress', 'text', 'audio']
  return isRTL && flippableSemantics.includes(semantic)
}



