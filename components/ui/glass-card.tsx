'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { appleSpring, snapTransition, glassHover, glassTap } from '@/lib/animations/presets';

// ============================================
// TYPES
// ============================================

type GlassVariant = 'default' | 'elevated' | 'inset' | 'solid';
type GlassBlur = 'light' | 'medium' | 'heavy';
type GlassTint = 'neutral' | 'blue' | 'green' | 'red' | 'orange' | 'purple';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  variant?: GlassVariant;
  blur?: GlassBlur;
  tint?: GlassTint;
  hover?: boolean;
  glow?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

// ============================================
// STYLES
// ============================================

const variantStyles: Record<GlassVariant, string> = {
  default: cn(
    'bg-white/60 dark:bg-[#1c1c1e]/60',
    'backdrop-blur-2xl backdrop-saturate-[180%]',
    'border border-white/60 dark:border-white/10',
    'shadow-[0_8px_32px_rgba(0,0,0,0.04)]'
  ),
  elevated: cn(
    'bg-white/80 dark:bg-[#2c2c2e]/80',
    'backdrop-blur-3xl backdrop-saturate-[180%]',
    'border border-white/40 dark:border-white/5',
    'shadow-[0_20px_50px_rgba(0,0,0,0.08)]'
  ),
  inset: cn(
    'bg-white/40 dark:bg-white/5',
    'backdrop-blur-xl backdrop-saturate-[150%]',
    'border border-white/30 dark:border-white/5',
    'shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)]'
  ),
  solid: cn(
    'bg-white dark:bg-[#1c1c1e]',
    'border border-slate-200/50 dark:border-white/10',
    'shadow-[0_4px_16px_rgba(0,0,0,0.06)]'
  ),
};

const blurStyles: Record<GlassBlur, string> = {
  light: 'backdrop-blur-md',
  medium: 'backdrop-blur-2xl',
  heavy: 'backdrop-blur-3xl',
};

const tintStyles: Record<GlassTint, string> = {
  neutral: '',
  blue: 'bg-ios-blue/5 dark:bg-ios-blue/10',
  green: 'bg-ios-green/5 dark:bg-ios-green/10',
  red: 'bg-ios-red/5 dark:bg-ios-red/10',
  orange: 'bg-ios-orange/5 dark:bg-ios-orange/10',
  purple: 'bg-ios-purple/5 dark:bg-ios-purple/10',
};

const glowStyles: Record<GlassTint, string> = {
  neutral: 'shadow-glass-lg',
  blue: 'shadow-glow-blue',
  green: 'shadow-glow-green',
  red: 'shadow-glow-red',
  orange: 'shadow-glow-orange',
  purple: 'shadow-glow-purple',
};

const paddingStyles = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

// ============================================
// COMPONENT
// ============================================

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      children,
      className,
      variant = 'default',
      blur = 'medium',
      tint = 'neutral',
      hover = true,
      glow = false,
      padding = 'md',
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          // Base styles
          'rounded-[32px] transition-all duration-300',
          // Variant
          variantStyles[variant],
          // Override blur if different from default
          blur !== 'medium' && blurStyles[blur],
          // Tint
          tint !== 'neutral' && tintStyles[tint],
          // Glow effect
          glow && glowStyles[tint],
          // Padding
          paddingStyles[padding],
          // Hover effect
          hover && 'cursor-pointer',
          className
        )}
        whileHover={hover ? glassHover : undefined}
        whileTap={hover ? glassTap : undefined}
        transition={appleSpring}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

// ============================================
// VARIANTS
// ============================================

/** Metric card with volumetric glow effect */
export function MetricGlassCard({
  children,
  className,
  colorTheme = 'blue',
  ...props
}: GlassCardProps & { colorTheme?: 'orange' | 'blue' | 'green' | 'purple' }) {
  const glowColors: Record<string, string> = {
    orange: 'from-orange-500/30 to-amber-500/30',
    blue: 'from-blue-500/30 to-cyan-500/30',
    green: 'from-emerald-500/30 to-teal-500/30',
    purple: 'from-violet-500/30 to-fuchsia-500/30',
  };

  return (
    <GlassCard
      className={cn('relative overflow-hidden group', className)}
      {...props}
    >
      {/* Volumetric Glow */}
      <div
        className={cn(
          'absolute -top-20 -right-20 w-60 h-60 rounded-full',
          'bg-gradient-to-br opacity-20 blur-[70px] pointer-events-none',
          'group-hover:opacity-40 transition-opacity duration-700',
          glowColors[colorTheme]
        )}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </GlassCard>
  );
}

/** Card for Kanban columns */
export function KanbanColumnCard({
  children,
  className,
  isDropTarget = false,
  ...props
}: GlassCardProps & { isDropTarget?: boolean }) {
  return (
    <motion.div
      className={cn(
        'flex flex-col h-full min-w-[320px] rounded-[40px] p-2',
        'transition-all duration-500',
        isDropTarget
          ? 'bg-ios-blue/10 dark:bg-ios-blue/20 border border-ios-blue/30 shadow-lg shadow-ios-blue/5 scale-[1.01]'
          : 'bg-white/20 dark:bg-white/5 backdrop-blur-2xl border border-white/30 dark:border-white/5 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Modal/Dialog glass container */
export function ModalGlassCard({
  children,
  className,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl',
        'rounded-[28px] shadow-2xl',
        'border border-white/20 dark:border-white/10',
        'ring-1 ring-black/5',
        className
      )}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={appleSpring}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;
