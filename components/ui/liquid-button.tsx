'use client';

import React, { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { appleSpring, snapTransition } from '@/lib/animations/presets';
import { Loader2 } from 'lucide-react';

// ============================================
// TYPES
// ============================================

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface LiquidButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  glow?: boolean;
}

// ============================================
// STYLES
// ============================================

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-ios-blue text-white',
    'shadow-[0_4px_14px_rgba(10,132,255,0.35)]',
    'hover:bg-ios-blue/90 hover:shadow-[0_6px_20px_rgba(10,132,255,0.45)]',
    'active:bg-ios-blue/80'
  ),
  secondary: cn(
    'bg-white/60 dark:bg-[#2c2c2e]/60 text-slate-800 dark:text-white',
    'backdrop-blur-xl border border-white/60 dark:border-white/10',
    'shadow-[0_4px_12px_rgba(0,0,0,0.04)]',
    'hover:bg-white/80 dark:hover:bg-[#2c2c2e]/80',
    'hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]'
  ),
  ghost: cn(
    'bg-transparent text-slate-600 dark:text-slate-300',
    'hover:bg-slate-100/60 dark:hover:bg-slate-800/60',
    'backdrop-blur-md'
  ),
  danger: cn(
    'bg-ios-red text-white',
    'shadow-[0_4px_14px_rgba(255,69,58,0.35)]',
    'hover:bg-ios-red/90 hover:shadow-[0_6px_20px_rgba(255,69,58,0.45)]',
    'active:bg-ios-red/80'
  ),
  success: cn(
    'bg-ios-green text-white',
    'shadow-[0_4px_14px_rgba(48,209,88,0.35)]',
    'hover:bg-ios-green/90 hover:shadow-[0_6px_20px_rgba(48,209,88,0.45)]',
    'active:bg-ios-green/80'
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm rounded-[14px]',
  md: 'h-11 px-6 text-sm rounded-[18px]',
  lg: 'h-14 px-8 text-base rounded-[22px]',
  icon: 'h-11 w-11 rounded-full',
};

const glowStyles: Record<ButtonVariant, string> = {
  primary: 'shadow-glow-blue',
  secondary: 'shadow-glass-lg',
  ghost: '',
  danger: 'shadow-glow-red',
  success: 'shadow-glow-green',
};

// ============================================
// COMPONENT
// ============================================

export const LiquidButton = forwardRef<HTMLButtonElement, LiquidButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      glow = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center gap-2',
          'font-semibold transition-all duration-300',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-ios-blue/50 focus-visible:ring-offset-2',
          // Variant
          variantStyles[variant],
          // Size
          sizeStyles[size],
          // Glow
          glow && glowStyles[variant],
          // Full width
          fullWidth && 'w-full',
          // Disabled state
          isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
        whileHover={!isDisabled ? { scale: 1.02, y: -1 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        transition={appleSpring}
        disabled={isDisabled}
        {...props}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
          </motion.span>
        )}

        {/* Content */}
        <span className={cn('flex items-center gap-2', isLoading && 'opacity-0')}>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </span>
      </motion.button>
    );
  }
);

LiquidButton.displayName = 'LiquidButton';

// ============================================
// ICON BUTTON VARIANT
// ============================================

interface LiquidIconButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  icon: React.ReactNode;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  glow?: boolean;
  badge?: number | string;
}

const iconSizeStyles = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-14 w-14',
};

export const LiquidIconButton = forwardRef<HTMLButtonElement, LiquidIconButtonProps>(
  (
    {
      icon,
      className,
      variant = 'secondary',
      size = 'md',
      isLoading = false,
      glow = false,
      badge,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center',
          'rounded-full transition-all duration-300',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-ios-blue/50 focus-visible:ring-offset-2',
          // Variant
          variantStyles[variant],
          // Size
          iconSizeStyles[size],
          // Glow
          glow && glowStyles[variant],
          // Disabled state
          isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
        whileHover={!isDisabled ? { scale: 1.1 } : undefined}
        whileTap={!isDisabled ? { scale: 0.95 } : undefined}
        transition={appleSpring}
        disabled={isDisabled}
        {...props}
      >
        {/* Loading Spinner */}
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          icon
        )}

        {/* Badge */}
        {badge !== undefined && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-ios-red text-white text-[10px] font-bold rounded-full ring-2 ring-white dark:ring-slate-900"
          >
            {badge}
          </motion.span>
        )}
      </motion.button>
    );
  }
);

LiquidIconButton.displayName = 'LiquidIconButton';

export default LiquidButton;
