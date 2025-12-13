'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import type {
  GlassButtonStyle,
  GlassButtonSize,
  ControlShape,
} from '../types';
import {
  BUTTON_SIZE,
  CONTROL_RADIUS,
  ANIMATION_DURATION,
  ANIMATION_EASING,
  DEFAULTS,
} from '../constants';
import { useLiquidGlass } from '../hooks/useLiquidGlass';

// ============================================
// TYPES
// ============================================

export interface GlassButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  /** Button style variant */
  variant?: GlassButtonStyle;
  /** Button size */
  size?: GlassButtonSize;
  /** Button shape */
  shape?: ControlShape;
  /** Loading state */
  loading?: boolean;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Icon position */
  iconPosition?: 'leading' | 'trailing';
  /** Full width button */
  fullWidth?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Button children */
  children?: React.ReactNode;
}

// ============================================
// STYLES
// ============================================

const variantStyles: Record<GlassButtonStyle, string> = {
  glass: cn(
    'bg-white/72 dark:bg-[rgb(28,28,30)]/72',
    'border border-white/40 dark:border-white/10',
    'text-foreground',
    'shadow-sm',
    'backdrop-blur-[20px] backdrop-saturate-[180%]',
    'hover:bg-white/80 dark:hover:bg-[rgb(28,28,30)]/80'
  ),
  glassProminent: cn(
    'bg-white/88 dark:bg-[rgb(44,44,46)]/88',
    'border border-white/50 dark:border-white/12',
    'text-foreground font-medium',
    'shadow-md',
    'backdrop-blur-[40px] backdrop-saturate-[200%]',
    'hover:bg-white/95 dark:hover:bg-[rgb(44,44,46)]/95'
  ),
  glassTinted: cn(
    'bg-[var(--glass-tint,hsl(var(--primary)))]/65',
    'border border-[var(--glass-tint,hsl(var(--primary)))]/30',
    'text-white',
    'shadow-sm',
    'backdrop-blur-[20px] backdrop-saturate-[180%]',
    'hover:bg-[var(--glass-tint,hsl(var(--primary)))]/75'
  ),
};

const sizeStyles: Record<GlassButtonSize, string> = {
  small: 'h-8 px-3 text-sm gap-1.5',
  medium: 'h-10 px-4 text-[15px] gap-2',
  large: 'h-12 px-5 text-base gap-2.5',
  extraLarge: 'h-14 px-6 text-[17px] gap-3',
};

const iconSizeMap: Record<GlassButtonSize, string> = {
  small: 'w-4 h-4',
  medium: 'w-[18px] h-[18px]',
  large: 'w-5 h-5',
  extraLarge: 'w-[22px] h-[22px]',
};

// ============================================
// COMPONENT
// ============================================

/**
 * GlassButton - Liquid Glass styled button
 *
 * Implements Apple's Liquid Glass button styles with
 * fluid morphing animations and accessibility support.
 *
 * @example
 * ```tsx
 * // Standard glass button
 * <GlassButton>Click me</GlassButton>
 *
 * // Prominent glass button
 * <GlassButton variant="glassProminent">Primary Action</GlassButton>
 *
 * // With icon
 * <GlassButton icon={<PlusIcon />} iconPosition="leading">
 *   Add Item
 * </GlassButton>
 *
 * // Extra large size
 * <GlassButton size="extraLarge">Large Button</GlassButton>
 *
 * // Pill shape
 * <GlassButton shape="pill">Pill Button</GlassButton>
 * ```
 */
export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      variant = DEFAULTS.buttonStyle,
      size = DEFAULTS.buttonSize,
      shape = DEFAULTS.controlShape,
      loading = false,
      icon,
      iconPosition = 'leading',
      fullWidth = false,
      disabled = false,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { accessibility } = useLiquidGlass();
    const dimensions = BUTTON_SIZE[size];

    // Determine if we should use reduced effects
    const useReducedEffects =
      accessibility.reduceTransparency || accessibility.reduceMotion;

    // Animation variants
    const motionVariants = {
      initial: { scale: 1 },
      hover: accessibility.reduceMotion ? {} : { scale: 1.02 },
      tap: accessibility.reduceMotion ? {} : { scale: 0.98 },
    };

    const transitionConfig = {
      type: 'spring' as const,
      stiffness: 400,
      damping: 25,
      duration: accessibility.reduceMotion
        ? 0
        : ANIMATION_DURATION.focus / 1000,
    };

    // Build class names
    const buttonClasses = cn(
      // Base styles
      'relative inline-flex items-center justify-center',
      'transition-colors duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',

      // Variant styles
      useReducedEffects
        ? 'bg-white/95 dark:bg-[rgb(28,28,30)]/95 border border-black/10 dark:border-white/10'
        : variantStyles[variant],

      // Size styles
      sizeStyles[size],

      // Shape
      shape === 'pill' && 'rounded-full',
      shape === 'rounded' && 'rounded-xl',
      shape === 'concentric' && 'rounded-[var(--radius-concentric,16px)]',
      shape === 'circle' && 'rounded-full aspect-square p-0',

      // Full width
      fullWidth && 'w-full',

      className
    );

    // Icon element
    const iconElement = loading ? (
      <Loader2
        className={cn(iconSizeMap[size], 'animate-spin')}
        aria-hidden="true"
      />
    ) : icon ? (
      <span className={cn(iconSizeMap[size], 'flex-shrink-0')} aria-hidden="true">
        {icon}
      </span>
    ) : null;

    return (
      <motion.button
        ref={ref}
        className={buttonClasses}
        style={{
          height: dimensions.height,
          borderRadius: CONTROL_RADIUS[shape],
          ...style,
        }}
        disabled={disabled || loading}
        variants={motionVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        transition={transitionConfig}
        {...props}
      >
        {/* Leading icon */}
        {iconPosition === 'leading' && iconElement}

        {/* Content */}
        {children && (
          <span className="flex-shrink-0">{children}</span>
        )}

        {/* Trailing icon */}
        {iconPosition === 'trailing' && iconElement}

        {/* Fluid morph overlay (for interactive states) */}
        {!useReducedEffects && (
          <motion.span
            className="absolute inset-0 rounded-[inherit] pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1) 0%, transparent 50%)',
            }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          />
        )}
      </motion.button>
    );
  }
);

GlassButton.displayName = 'GlassButton';

// ============================================
// ICON BUTTON VARIANT
// ============================================

export interface GlassIconButtonProps
  extends Omit<GlassButtonProps, 'children' | 'iconPosition'> {
  /** Accessibility label */
  'aria-label': string;
}

/**
 * GlassIconButton - Icon-only glass button
 *
 * @example
 * ```tsx
 * <GlassIconButton icon={<MenuIcon />} aria-label="Open menu" />
 * ```
 */
export const GlassIconButton = React.forwardRef<
  HTMLButtonElement,
  GlassIconButtonProps
>(({ icon, size = 'medium', shape = 'circle', ...props }, ref) => {
  const dimensions = BUTTON_SIZE[size];

  return (
    <GlassButton
      ref={ref}
      icon={icon}
      size={size}
      shape={shape}
      style={{
        width: dimensions.height,
        height: dimensions.height,
        padding: 0,
      }}
      {...props}
    />
  );
});

GlassIconButton.displayName = 'GlassIconButton';

// ============================================
// BUTTON GROUP
// ============================================

export interface GlassButtonGroupProps {
  /** Orientation of the group */
  orientation?: 'horizontal' | 'vertical';
  /** Children buttons */
  children: React.ReactNode;
  /** Additional class names */
  className?: string;
}

/**
 * GlassButtonGroup - Group of glass buttons with shared background
 *
 * @example
 * ```tsx
 * <GlassButtonGroup>
 *   <GlassButton icon={<UndoIcon />} aria-label="Undo" />
 *   <GlassButton icon={<RedoIcon />} aria-label="Redo" />
 * </GlassButtonGroup>
 * ```
 */
export function GlassButtonGroup({
  orientation = 'horizontal',
  children,
  className,
}: GlassButtonGroupProps) {
  return (
    <div
      className={cn(
        'inline-flex',
        'bg-white/60 dark:bg-[rgb(28,28,30)]/60',
        'backdrop-blur-[20px] backdrop-saturate-[180%]',
        'border border-white/30 dark:border-white/10',
        'rounded-2xl p-1 gap-0.5',
        'shadow-sm',
        orientation === 'vertical' && 'flex-col',
        className
      )}
      role="group"
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<GlassButtonProps>, {
            variant: 'glass' as GlassButtonStyle,
            className: cn(
              (child as React.ReactElement<GlassButtonProps>).props.className,
              'bg-transparent border-0 shadow-none',
              'hover:bg-white/40 dark:hover:bg-white/10',
              'rounded-xl'
            ),
          });
        }
        return child;
      })}
    </div>
  );
}

export default GlassButton;
