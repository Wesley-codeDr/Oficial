'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type {
  GlassEffectConfig,
  GlassEffectContainerProps,
  GlassMaterialVariant,
  GlassIntensity,
  ContourRectConfig,
} from '../types';
import {
  GLASS_BLUR,
  GLASS_OPACITY,
  GLASS_SATURATION,
  GLASS_BORDER_OPACITY,
  ANIMATION_DURATION,
  calculateConcentricRadius,
} from '../constants';
import { useLiquidGlass } from '../hooks/useLiquidGlass';

// ============================================
// GLASS EFFECT CONTAINER
// ============================================

/**
 * GlassEffectContainer - Container for combining glass effects
 *
 * Helps optimize performance while fluidly morphing Liquid Glass shapes
 * into each other. Use this when applying glass effects to custom elements.
 *
 * @example
 * ```tsx
 * <GlassEffectContainer fluidMorphing>
 *   <GlassCard>Content 1</GlassCard>
 *   <GlassCard>Content 2</GlassCard>
 * </GlassEffectContainer>
 * ```
 */
export function GlassEffectContainer({
  effects = [],
  fluidMorphing = true,
  style,
  children,
  className,
}: GlassEffectContainerProps) {
  const { accessibility } = useLiquidGlass();

  // Skip complex effects if accessibility requires
  if (accessibility.useFallback) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative',
        fluidMorphing && 'isolate',
        className
      )}
      style={{
        // Optimization: contain layout and paint
        contain: 'layout paint',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ============================================
// GLASS EFFECT PRIMITIVE
// ============================================

export interface GlassEffectProps extends GlassEffectConfig {
  /** Children content */
  children: React.ReactNode;
  /** Additional class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Corner radius */
  radius?: number | string;
  /** As element */
  as?: React.ElementType;
}

/**
 * GlassEffect - Apply glass effect to an element
 *
 * @example
 * ```tsx
 * <GlassEffect variant="regular" intensity="medium" radius={16}>
 *   <div className="p-4">Content</div>
 * </GlassEffect>
 * ```
 */
export function GlassEffect({
  variant = 'regular',
  intensity = 'medium',
  tintColor,
  blur = true,
  blurAmount,
  disabled = false,
  children,
  className,
  style,
  radius = 16,
  as: Component = 'div',
}: GlassEffectProps) {
  const { accessibility } = useLiquidGlass();

  // Use fallback if disabled or accessibility requires
  const useFallback = disabled || accessibility.useFallback;

  // Calculate CSS properties
  const glassStyles = React.useMemo((): React.CSSProperties => {
    if (useFallback) {
      return {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: radius,
        ...style,
      };
    }

    const actualBlur = blurAmount ?? GLASS_BLUR[intensity];
    const opacity = GLASS_OPACITY[variant].light;
    const borderOpacity = GLASS_BORDER_OPACITY[variant].light;
    const saturation = GLASS_SATURATION[intensity];

    const baseStyles: React.CSSProperties = {
      backgroundColor: `rgba(255, 255, 255, ${opacity})`,
      backdropFilter: blur ? `blur(${actualBlur}px) saturate(${saturation}%)` : 'none',
      WebkitBackdropFilter: blur ? `blur(${actualBlur}px) saturate(${saturation}%)` : 'none',
      border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
      borderRadius: radius,
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
      ...style,
    };

    if (tintColor && variant === 'tinted') {
      baseStyles.backgroundColor = tintColor;
    }

    return baseStyles;
  }, [variant, intensity, tintColor, blur, blurAmount, radius, style, useFallback]);

  // Dark mode styles
  const darkModeClass = useFallback
    ? 'dark:bg-[rgb(28,28,30)]/95 dark:border-white/10'
    : 'dark:bg-[rgb(28,28,30)]/72 dark:border-white/10';

  return (
    <Component
      className={cn(
        'transition-all duration-200',
        darkModeClass,
        className
      )}
      style={glassStyles}
    >
      {children}
    </Component>
  );
}

// ============================================
// CONTOUR RECTANGLE
// ============================================

export interface ContourRectangleProps {
  /** Corner configuration */
  corners?: 'all' | 'top' | 'bottom' | 'leading' | 'trailing';
  /** Use uniform corners */
  uniform?: boolean;
  /** Base radius */
  radius?: number;
  /** Container radius (for concentric calculation) */
  containerRadius?: number;
  /** Inset from container */
  inset?: number;
  /** Children content */
  children: React.ReactNode;
  /** Additional class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * ContourRectangle - Shape that follows container contours
 *
 * Creates shapes with corners that are concentric to their containers,
 * maintaining visual continuity with the hardware curvature.
 *
 * @example
 * ```tsx
 * <ContourRectangle containerRadius={24} inset={8}>
 *   <button>Concentric Button</button>
 * </ContourRectangle>
 * ```
 */
export function ContourRectangle({
  corners = 'all',
  uniform = true,
  radius = 16,
  containerRadius,
  inset = 0,
  children,
  className,
  style,
}: ContourRectangleProps) {
  // Calculate concentric radius if container radius is provided
  const effectiveRadius = containerRadius
    ? calculateConcentricRadius(containerRadius, inset)
    : radius;

  // Build border radius based on corners
  const getBorderRadius = (): string => {
    const r = `${effectiveRadius}px`;

    switch (corners) {
      case 'top':
        return `${r} ${r} 0 0`;
      case 'bottom':
        return `0 0 ${r} ${r}`;
      case 'leading':
        return `${r} 0 0 ${r}`;
      case 'trailing':
        return `0 ${r} ${r} 0`;
      default:
        return r;
    }
  };

  return (
    <div
      className={className}
      style={{
        borderRadius: getBorderRadius(),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ============================================
// MORPHING GLASS CONTAINER
// ============================================

export interface MorphingGlassProps {
  /** Current shape key for morphing */
  shapeKey: string;
  /** Glass variant */
  variant?: GlassMaterialVariant;
  /** Glass intensity */
  intensity?: GlassIntensity;
  /** Corner radius */
  radius?: number;
  /** Children content */
  children: React.ReactNode;
  /** Additional class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * MorphingGlass - Glass element that morphs between shapes
 *
 * @example
 * ```tsx
 * <MorphingGlass shapeKey={isExpanded ? 'expanded' : 'collapsed'}>
 *   {content}
 * </MorphingGlass>
 * ```
 */
export function MorphingGlass({
  shapeKey,
  variant = 'regular',
  intensity = 'medium',
  radius = 16,
  children,
  className,
  style,
}: MorphingGlassProps) {
  const { accessibility } = useLiquidGlass();

  const morphVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
  };

  const transition = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 25,
    duration: accessibility.reduceMotion ? 0 : ANIMATION_DURATION.morph / 1000,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={shapeKey}
        variants={morphVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        className={className}
        style={style}
      >
        <GlassEffect variant={variant} intensity={intensity} radius={radius}>
          {children}
        </GlassEffect>
      </motion.div>
    </AnimatePresence>
  );
}

export default GlassEffectContainer;
