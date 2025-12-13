/**
 * Apple HIG-style Drag Animations
 * Animation presets for @dnd-kit following Apple design language
 */

import type { DropAnimation } from '@dnd-kit/core';

/**
 * Spring physics matching Apple HIG
 * These values create the characteristic iOS "fluid" feel
 */
export const APPLE_SPRING = {
  stiffness: 400,
  damping: 30,
  mass: 1,
};

export const BOUNCY_SPRING = {
  stiffness: 300,
  damping: 20,
  mass: 0.8,
};

export const GENTLE_SPRING = {
  stiffness: 200,
  damping: 25,
  mass: 1,
};

/**
 * CSS transition string for @dnd-kit animations
 * Used in sortable items for smooth reordering
 */
export const APPLE_TRANSITION = 'transform 250ms cubic-bezier(0.25, 0.1, 0.25, 1)';

/**
 * Drop animation configuration
 * Used when item is released to animate back to position
 */
export const dropAnimationConfig: DropAnimation = {
  duration: 250,
  easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
};

/**
 * Styles for drag overlay (the item being dragged)
 * Following Apple HIG with elevation and subtle rotation
 */
export const dragOverlayStyles = {
  default: {
    transform: 'scale(1.03)',
    boxShadow: '0 20px 40px -5px rgba(0, 0, 0, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.08)',
    opacity: 1,
    cursor: 'grabbing',
  },
  elevated: {
    transform: 'scale(1.05) rotate(2deg)',
    boxShadow: '0 25px 50px -10px rgba(0, 0, 0, 0.2), 0 15px 30px -5px rgba(0, 0, 0, 0.1)',
    opacity: 1,
    cursor: 'grabbing',
  },
  subtle: {
    transform: 'scale(1.02)',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 15px -3px rgba(0, 0, 0, 0.05)',
    opacity: 0.95,
    cursor: 'grabbing',
  },
};

/**
 * Styles for placeholder (where the item was)
 */
export const placeholderStyles = {
  default: {
    opacity: 0.4,
    transform: 'scale(0.98)',
    filter: 'grayscale(50%)',
  },
  faded: {
    opacity: 0.2,
    transform: 'scale(0.95)',
    filter: 'grayscale(100%) blur(2px)',
  },
  outline: {
    opacity: 0,
    border: '2px dashed var(--ios-blue, #007AFF)',
    borderRadius: '16px',
    background: 'rgba(0, 122, 255, 0.05)',
  },
};

/**
 * Styles for drop zone when item is hovering over it
 */
export const dropZoneStyles = {
  default: {
    background: 'rgba(0, 122, 255, 0.08)',
    borderColor: 'rgba(0, 122, 255, 0.3)',
    transform: 'scale(1.01)',
    transition: 'all 200ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
  highlighted: {
    background: 'rgba(0, 122, 255, 0.12)',
    borderColor: 'rgba(0, 122, 255, 0.5)',
    boxShadow: '0 0 0 2px rgba(0, 122, 255, 0.2)',
    transform: 'scale(1.02)',
    transition: 'all 200ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
  accepted: {
    background: 'rgba(52, 199, 89, 0.08)',
    borderColor: 'rgba(52, 199, 89, 0.3)',
    transition: 'all 200ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
  rejected: {
    background: 'rgba(255, 59, 48, 0.08)',
    borderColor: 'rgba(255, 59, 48, 0.3)',
    transition: 'all 200ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
};

/**
 * CSS class generators for drag states
 */
export const dragStateClasses = {
  isDragging: 'opacity-40 scale-95 grayscale blur-[1px]',
  isOver: 'bg-ios-blue/10 border-ios-blue/30 scale-[1.01]',
  isOverAccept: 'bg-ios-green/10 border-ios-green/30',
  isOverReject: 'bg-ios-red/10 border-ios-red/30',
};

/**
 * Get inline styles for sortable item based on state
 */
export function getSortableItemStyles(
  transform: { x: number; y: number } | null,
  transition: string | undefined,
  isDragging: boolean
): React.CSSProperties {
  return {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: transition || APPLE_TRANSITION,
    opacity: isDragging ? 0.4 : 1,
    filter: isDragging ? 'grayscale(50%)' : 'none',
    pointerEvents: isDragging ? 'none' : 'auto',
  };
}

/**
 * Keyframe animations for drop impact
 */
export const dropImpactKeyframes = `
  @keyframes drop-impact {
    0% {
      transform: scale(1.05);
      box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.15);
    }
    50% {
      transform: scale(0.98);
      box-shadow: 0 5px 15px -3px rgba(0, 0, 0, 0.08);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
    }
  }
`;

/**
 * Apply drop impact animation class
 */
export const DROP_IMPACT_ANIMATION = 'animate-[drop-impact_300ms_cubic-bezier(0.25,0.1,0.25,1)]';
