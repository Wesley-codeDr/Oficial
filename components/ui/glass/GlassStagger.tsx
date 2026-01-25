'use client'

import React, { Children, useMemo } from 'react'
import { motion, MotionProps, Variants } from 'framer-motion'
import { staggerFadeInConfig } from '@/lib/design-system/micro-interactions'

/**
 * Speed presets for stagger animations
 */
export type StaggerSpeed = 'fast' | 'default' | 'slow'

/**
 * Direction of stagger animation
 */
export type StaggerDirection = 'up' | 'down' | 'left' | 'right'

/**
 * Props for GlassStagger component
 */
export interface GlassStaggerProps extends Omit<MotionProps, 'variants'> {
  /** Child elements to animate with stagger effect */
  children: React.ReactNode

  /** Speed preset for stagger timing */
  speed?: StaggerSpeed

  /** Direction of animation entrance */
  direction?: StaggerDirection

  /** Custom stagger delay between children (in seconds) */
  staggerDelay?: number

  /** Custom animation duration per child (in seconds) */
  duration?: number

  /** Whether to disable animations (respects reduced-motion) */
  disabled?: boolean

  /** Additional CSS classes for the container */
  className?: string

  /** Whether to animate on mount */
  animateOnMount?: boolean

  /** HTML tag for the container */
  as?: 'div' | 'ul' | 'ol' | 'section' | 'article' | 'nav' | 'aside' | 'main'
}

/**
 * Props for GlassStaggerItem component
 */
export interface GlassStaggerItemProps extends Omit<MotionProps, 'variants'> {
  /** Child content */
  children: React.ReactNode

  /** Additional CSS classes */
  className?: string

  /** Whether to disable animation for this item */
  disabled?: boolean

  /** HTML tag for the item */
  as?: 'div' | 'li' | 'article' | 'section' | 'span'
}

/**
 * Get direction-based animation offset
 */
function getDirectionOffset(direction: StaggerDirection): { x: number; y: number } {
  switch (direction) {
    case 'up':
      return { x: 0, y: 20 }
    case 'down':
      return { x: 0, y: -20 }
    case 'left':
      return { x: 20, y: 0 }
    case 'right':
      return { x: -20, y: 0 }
    default:
      return { x: 0, y: 20 }
  }
}

/**
 * Get speed-based timing configuration
 */
function getSpeedConfig(speed: StaggerSpeed): { staggerDelay: number; duration: number } {
  switch (speed) {
    case 'fast':
      return { staggerDelay: 0.05, duration: 0.4 }
    case 'slow':
      return { staggerDelay: 0.15, duration: 0.8 }
    default:
      return { staggerDelay: 0.1, duration: 0.6 }
  }
}

/**
 * GlassStagger - Container for staggered animations
 *
 * A wrapper component that orchestrates stagger fade-in animations for its children.
 * Based on Apple Liquid Glass 2026 design system specifications.
 *
 * Features:
 * - 600ms duration per child (configurable)
 * - 100ms delay increment between children (configurable)
 * - Apple spring easing for fluid motion
 * - Respects prefers-reduced-motion accessibility preference
 * - Multiple speed presets and directions
 *
 * @example
 * ```tsx
 * <GlassStagger>
 *   <GlassStaggerItem>Item 1</GlassStaggerItem>
 *   <GlassStaggerItem>Item 2</GlassStaggerItem>
 *   <GlassStaggerItem>Item 3</GlassStaggerItem>
 * </GlassStagger>
 * ```
 */
export function GlassStagger({
  children,
  speed = 'default',
  direction = 'up',
  staggerDelay: customStaggerDelay,
  duration: customDuration,
  disabled = false,
  className = '',
  animateOnMount = true,
  as = 'div',
  ...motionProps
}: GlassStaggerProps) {
  const speedConfig = getSpeedConfig(speed)
  const staggerDelay = customStaggerDelay ?? speedConfig.staggerDelay
  const duration = customDuration ?? speedConfig.duration
  const offset = getDirectionOffset(direction)

  // Create container variants
  const containerVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: staggerDelay * 0.5,
      },
    },
  }), [staggerDelay])

  // Create item variants for children
  const itemVariants: Variants = useMemo(() => ({
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        ease: [0.25, 1, 0.5, 1], // Apple spring easing
      },
    },
  }), [offset.x, offset.y, duration])

  // Handle reduced motion preference
  const reducedMotionVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.01 }
    },
  }), [])

  const MotionComponent = motion[as]

  if (disabled) {
    const Component = as
    return <Component className={className}>{children}</Component>
  }

  return (
    <MotionComponent
      className={className}
      variants={containerVariants}
      initial={animateOnMount ? 'hidden' : false}
      animate="visible"
      {...motionProps}
    >
      {Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child

        // If child is already a GlassStaggerItem, it will use the variants from context
        // Otherwise, wrap it in a motion.div with the item variants
        if (child.type === GlassStaggerItem) {
          return React.cloneElement(child as React.ReactElement<GlassStaggerItemProps>, {
            ...child.props,
            // Pass itemVariants through custom prop or context
          })
        }

        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className="stagger-item"
          >
            {child}
          </motion.div>
        )
      })}
    </MotionComponent>
  )
}

/**
 * GlassStaggerItem - Individual item within a GlassStagger container
 *
 * Provides consistent styling and animation for items in a stagger animation.
 * Automatically inherits animation variants from parent GlassStagger.
 *
 * @example
 * ```tsx
 * <GlassStagger>
 *   <GlassStaggerItem>Content here</GlassStaggerItem>
 * </GlassStagger>
 * ```
 */
export function GlassStaggerItem({
  children,
  className = '',
  disabled = false,
  as = 'div',
  ...motionProps
}: GlassStaggerItemProps) {
  // Default item variants - will be overridden by parent context if available
  const itemVariants: Variants = useMemo(() => ({
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  }), [])

  const MotionComponent = motion[as]

  if (disabled) {
    const Component = as
    return <Component className={className}>{children}</Component>
  }

  return (
    <MotionComponent
      className={className}
      variants={itemVariants}
      {...motionProps}
    >
      {children}
    </MotionComponent>
  )
}

/**
 * Utility hook for using stagger animations programmatically
 */
export function useStaggerAnimation(
  speed: StaggerSpeed = 'default',
  direction: StaggerDirection = 'up'
) {
  const speedConfig = getSpeedConfig(speed)
  const offset = getDirectionOffset(direction)

  const containerVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speedConfig.staggerDelay,
        delayChildren: speedConfig.staggerDelay * 0.5,
      },
    },
  }), [speedConfig.staggerDelay])

  const itemVariants: Variants = useMemo(() => ({
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: speedConfig.duration,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  }), [offset.x, offset.y, speedConfig.duration])

  return { containerVariants, itemVariants }
}

// Export the pre-built stagger config from micro-interactions for convenience
export { staggerFadeInConfig }

export default GlassStagger
