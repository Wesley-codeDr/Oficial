'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { appleSpring } from '@/lib/animations/presets';
import type { LucideIcon } from 'lucide-react';
import type {
  SymbolWeight,
  SymbolScale,
  SymbolRenderingMode,
  SymbolAnimation,
  SymbolAnimationConfig,
  VariableColorConfig,
} from './types';
import {
  SYMBOL_WEIGHTS,
  SYMBOL_SCALES,
  HIERARCHICAL_OPACITIES,
  DEFAULTS,
} from './constants';
import { animationVariantMap, getAnimationVariants } from './presets/animations';

// ============================================
// TYPES
// ============================================

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type IconColor = 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'pink' | 'teal' | 'slate';

export interface SquircleSymbolProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Lucide icon to render */
  icon: LucideIcon;
  /** Size preset */
  size?: IconSize;
  /** Color theme */
  color?: IconColor;
  /** Background variant */
  variant?: 'filled' | 'light' | 'outline';
  /** Enable glow effect */
  glow?: boolean;
  /** Enable hover animation */
  animate?: boolean;

  // SF Symbol features
  /** Symbol weight (stroke thickness) */
  weight?: SymbolWeight;
  /** Symbol scale relative to container */
  scale?: SymbolScale;
  /** Rendering mode for color application */
  renderingMode?: SymbolRenderingMode;
  /** Animation type */
  symbolAnimation?: SymbolAnimation | SymbolAnimationConfig;
  /** Variable color configuration */
  variableColor?: VariableColorConfig;
  /** Loading state (shows rotate animation) */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

// ============================================
// STYLES
// ============================================

const sizeStyles: Record<IconSize, { container: string; icon: number; radius: string }> = {
  xs: { container: 'w-8 h-8', icon: 16, radius: 'rounded-[10px]' },
  sm: { container: 'w-10 h-10', icon: 20, radius: 'rounded-[12px]' },
  md: { container: 'w-12 h-12', icon: 24, radius: 'rounded-[16px]' },
  lg: { container: 'w-14 h-14', icon: 28, radius: 'rounded-[18px]' },
  xl: { container: 'w-16 h-16', icon: 32, radius: 'rounded-[20px]' },
};

const colorStyles: Record<IconColor, {
  filled: { bg: string; text: string };
  light: { bg: string; text: string };
  outline: { border: string; text: string };
  glow: string;
}> = {
  blue: {
    filled: { bg: 'bg-ios-blue', text: 'text-white' },
    light: { bg: 'bg-blue-50 dark:bg-blue-500/20', text: 'text-ios-blue' },
    outline: { border: 'border-2 border-ios-blue/30', text: 'text-ios-blue' },
    glow: 'shadow-glow-blue',
  },
  green: {
    filled: { bg: 'bg-ios-green', text: 'text-white' },
    light: { bg: 'bg-emerald-50 dark:bg-emerald-500/20', text: 'text-ios-green' },
    outline: { border: 'border-2 border-ios-green/30', text: 'text-ios-green' },
    glow: 'shadow-glow-green',
  },
  red: {
    filled: { bg: 'bg-ios-red', text: 'text-white' },
    light: { bg: 'bg-red-50 dark:bg-red-500/20', text: 'text-ios-red' },
    outline: { border: 'border-2 border-ios-red/30', text: 'text-ios-red' },
    glow: 'shadow-glow-red',
  },
  orange: {
    filled: { bg: 'bg-ios-orange', text: 'text-white' },
    light: { bg: 'bg-orange-50 dark:bg-orange-500/20', text: 'text-ios-orange' },
    outline: { border: 'border-2 border-ios-orange/30', text: 'text-ios-orange' },
    glow: 'shadow-glow-orange',
  },
  purple: {
    filled: { bg: 'bg-ios-purple', text: 'text-white' },
    light: { bg: 'bg-violet-50 dark:bg-violet-500/20', text: 'text-ios-purple' },
    outline: { border: 'border-2 border-ios-purple/30', text: 'text-ios-purple' },
    glow: 'shadow-glow-purple',
  },
  pink: {
    filled: { bg: 'bg-ios-pink', text: 'text-white' },
    light: { bg: 'bg-pink-50 dark:bg-pink-500/20', text: 'text-ios-pink' },
    outline: { border: 'border-2 border-ios-pink/30', text: 'text-ios-pink' },
    glow: 'shadow-[0_0_20px_rgba(255,55,95,0.3)]',
  },
  teal: {
    filled: { bg: 'bg-ios-teal', text: 'text-white' },
    light: { bg: 'bg-cyan-50 dark:bg-cyan-500/20', text: 'text-ios-teal' },
    outline: { border: 'border-2 border-ios-teal/30', text: 'text-ios-teal' },
    glow: 'shadow-[0_0_20px_rgba(100,210,255,0.3)]',
  },
  slate: {
    filled: { bg: 'bg-slate-600 dark:bg-slate-500', text: 'text-white' },
    light: { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-300' },
    outline: { border: 'border-2 border-slate-300 dark:border-slate-600', text: 'text-slate-600 dark:text-slate-300' },
    glow: 'shadow-[0_0_20px_rgba(100,116,139,0.2)]',
  },
};

// ============================================
// COMPONENT
// ============================================

/**
 * SquircleSymbol - SF Symbols features in a Squircle container
 *
 * Combines the visual styling of SquircleIcon with the animation
 * and rendering features of the Symbol component.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <SquircleSymbol icon={Heart} color="red" />
 *
 * // With animation
 * <SquircleSymbol icon={Bell} color="blue" symbolAnimation="pulse" />
 *
 * // With weight and scale
 * <SquircleSymbol icon={Star} weight="bold" scale="large" />
 *
 * // Loading state
 * <SquircleSymbol icon={RefreshCw} loading />
 * ```
 */
export const SquircleSymbol = React.forwardRef<HTMLDivElement, SquircleSymbolProps>(
  (
    {
      icon: Icon,
      className,
      size = 'md',
      color = 'blue',
      variant = 'light',
      glow = false,
      animate = true,
      weight = DEFAULTS.weight,
      scale = DEFAULTS.scale,
      renderingMode = DEFAULTS.renderingMode,
      symbolAnimation,
      variableColor,
      loading = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const sizeConfig = sizeStyles[size];
    const colorConfig = colorStyles[color];

    // Resolve animation
    const animationConfig: SymbolAnimationConfig | null = React.useMemo(() => {
      if (loading) {
        return { type: 'rotate' as SymbolAnimation };
      }
      if (!symbolAnimation) return null;
      if (typeof symbolAnimation === 'string') {
        return { type: symbolAnimation };
      }
      return symbolAnimation;
    }, [symbolAnimation, loading]);

    // Get animation variants
    const variants = React.useMemo(() => {
      if (!animationConfig || animationConfig.type === 'none') return {};
      return getAnimationVariants(animationConfig.type, {
        direction: animationConfig.direction,
        speed: animationConfig.speed,
        repeat: animationConfig.repeat,
      });
    }, [animationConfig]);

    // Calculate icon size with scale
    const iconSize = Math.round(sizeConfig.icon * SYMBOL_SCALES[scale]);
    const strokeWidth = SYMBOL_WEIGHTS[weight];

    // Variant classes
    const variantClasses = variant === 'filled'
      ? cn(colorConfig.filled.bg, colorConfig.filled.text)
      : variant === 'light'
        ? cn(colorConfig.light.bg, colorConfig.light.text)
        : cn('bg-transparent', colorConfig.outline.border, colorConfig.outline.text);

    // Symbol style with CSS variables
    const symbolStyle: React.CSSProperties = {
      '--symbol-stroke-width': `${strokeWidth}px`,
    } as React.CSSProperties;

    // Hierarchical mode opacity
    if (renderingMode === 'hierarchical') {
      (symbolStyle as Record<string, unknown>)['--symbol-opacity-primary'] = HIERARCHICAL_OPACITIES[0];
      (symbolStyle as Record<string, unknown>)['--symbol-opacity-secondary'] = HIERARCHICAL_OPACITIES[1];
      (symbolStyle as Record<string, unknown>)['--symbol-opacity-tertiary'] = HIERARCHICAL_OPACITIES[2];
    }

    // Variable color style
    if (variableColor) {
      (symbolStyle as Record<string, unknown>)['--symbol-vc-value'] = variableColor.value;
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center shrink-0',
          'backdrop-blur-md border border-white/40 dark:border-white/5',
          'shadow-sm transition-all duration-300',
          // Size
          sizeConfig.container,
          sizeConfig.radius,
          // Variant
          variantClasses,
          // Glow
          glow && colorConfig.glow,
          // States
          disabled && 'opacity-50 pointer-events-none',
          className
        )}
        style={symbolStyle}
        whileHover={animate && !disabled ? { scale: 1.05, y: -1 } : undefined}
        transition={appleSpring}
        {...props}
      >
        <motion.span
          className="inline-flex items-center justify-center"
          variants={variants}
          initial={animationConfig ? 'initial' : undefined}
          animate={animationConfig ? 'animate' : undefined}
        >
          <Icon
            size={iconSize}
            strokeWidth={strokeWidth}
            className={cn(
              `symbol-${renderingMode}`,
              loading && 'symbol-animate-rotate'
            )}
          />
        </motion.span>
      </motion.div>
    );
  }
);

SquircleSymbol.displayName = 'SquircleSymbol';

export default SquircleSymbol;
