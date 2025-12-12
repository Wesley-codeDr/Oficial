'use client';

import React, { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { appleSpring } from '@/lib/animations/presets';
import { type LucideIcon } from 'lucide-react';

// ============================================
// TYPES
// ============================================

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type IconColor = 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'pink' | 'teal' | 'slate';

interface SquircleIconProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  icon: LucideIcon;
  size?: IconSize;
  color?: IconColor;
  variant?: 'filled' | 'light' | 'outline';
  glow?: boolean;
  animate?: boolean;
}

// ============================================
// STYLES
// ============================================

const sizeStyles: Record<IconSize, { container: string; icon: string; radius: string }> = {
  xs: { container: 'w-8 h-8', icon: 'w-4 h-4', radius: 'rounded-[10px]' },
  sm: { container: 'w-10 h-10', icon: 'w-5 h-5', radius: 'rounded-[12px]' },
  md: { container: 'w-12 h-12', icon: 'w-6 h-6', radius: 'rounded-[16px]' },
  lg: { container: 'w-14 h-14', icon: 'w-7 h-7', radius: 'rounded-[18px]' },
  xl: { container: 'w-16 h-16', icon: 'w-8 h-8', radius: 'rounded-[20px]' },
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

export const SquircleIcon = forwardRef<HTMLDivElement, SquircleIconProps>(
  (
    {
      icon: Icon,
      className,
      size = 'md',
      color = 'blue',
      variant = 'light',
      glow = false,
      animate = true,
      ...props
    },
    ref
  ) => {
    const sizeConfig = sizeStyles[size];
    const colorConfig = colorStyles[color];

    const variantClasses = variant === 'filled'
      ? cn(colorConfig.filled.bg, colorConfig.filled.text)
      : variant === 'light'
        ? cn(colorConfig.light.bg, colorConfig.light.text)
        : cn('bg-transparent', colorConfig.outline.border, colorConfig.outline.text);

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
          className
        )}
        whileHover={animate ? { scale: 1.05, y: -1 } : undefined}
        transition={appleSpring}
        {...props}
      >
        <Icon className={cn(sizeConfig.icon, 'stroke-[2.5px]')} />
      </motion.div>
    );
  }
);

SquircleIcon.displayName = 'SquircleIcon';

// ============================================
// ICON GRID COMPONENT
// ============================================

interface SquircleIconGridProps {
  icons: Array<{
    icon: LucideIcon;
    color?: IconColor;
    label?: string;
    onClick?: () => void;
  }>;
  size?: IconSize;
  columns?: number;
  showLabels?: boolean;
  className?: string;
}

export function SquircleIconGrid({
  icons,
  size = 'lg',
  columns = 4,
  showLabels = true,
  className,
}: SquircleIconGridProps) {
  return (
    <div
      className={cn(
        'grid gap-4',
        columns === 2 && 'grid-cols-2',
        columns === 3 && 'grid-cols-3',
        columns === 4 && 'grid-cols-4',
        columns === 5 && 'grid-cols-5',
        columns === 6 && 'grid-cols-6',
        className
      )}
    >
      {icons.map((item, index) => (
        <motion.button
          key={index}
          className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors"
          onClick={item.onClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <SquircleIcon
            icon={item.icon}
            size={size}
            color={item.color || 'blue'}
            variant="light"
            animate={false}
          />
          {showLabels && item.label && (
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400 text-center">
              {item.label}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
}

export default SquircleIcon;
