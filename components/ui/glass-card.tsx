'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { appleSpring, snapTransition, glassHover, glassTap } from '@/lib/animations/presets';

// ============================================
// TYPES
// ============================================

// Apple HIG Materials:
// - 'default/elevated/inset' = Standard Materials (content layer)
// - 'liquid' = Liquid Glass (navigation/controls layer)
type GlassVariant = 'default' | 'elevated' | 'inset' | 'solid' | 'liquid' | 'liquid-clear';
type MaterialWeight = 'ultra-thin' | 'thin' | 'regular' | 'thick';
type GlassBlur = 'light' | 'medium' | 'heavy';
type GlassTint = 'neutral' | 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'teal' | 'healthcare' | 'critical' | 'warning' | 'stable';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  /**
   * Apple HIG Material variant:
   * - default/elevated/inset/solid: Standard Materials (content layer)
   * - liquid/liquid-clear: Liquid Glass (controls layer - use sparingly!)
   */
  variant?: GlassVariant;
  /** Material weight for standard materials (ultraThin → thick) */
  weight?: MaterialWeight;
  blur?: GlassBlur;
  tint?: GlassTint;
  hover?: boolean;
  glow?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

// ============================================
// STYLES - Apple HIG Materials System
// ============================================

// Standard Materials (Content Layer) - use for cards, backgrounds
const variantStyles: Record<GlassVariant, string> = {
  // Standard Material - Regular (default for content)
  default: 'card-material',
  // Standard Material - Thick (elevated content)
  elevated: 'material-thick',
  // Standard Material - Ultra Thin (nested/inset elements)
  inset: 'material-ultra-thin',
  // Solid (no transparency)
  solid: cn(
    'bg-white dark:bg-[#1c1c1e]',
    'border border-slate-200/50 dark:border-white/10',
    'shadow-[0_4px_16px_rgba(0,0,0,0.06)]'
  ),
  // Liquid Glass - Regular (for controls/navigation ONLY)
  liquid: 'liquid-glass',
  // Liquid Glass - Clear (for media backgrounds)
  'liquid-clear': 'liquid-glass-clear',
};

// Material weight overrides
const weightStyles: Record<MaterialWeight, string> = {
  'ultra-thin': 'material-ultra-thin',
  'thin': 'material-thin',
  'regular': 'material-regular',
  'thick': 'material-thick',
};

const blurStyles: Record<GlassBlur, string> = {
  light: 'backdrop-blur-md',
  medium: 'backdrop-blur-2xl',
  heavy: 'backdrop-blur-3xl',
};

// Apple HIG: "Use color sparingly in Liquid Glass"
// Tints coloridos APENAS para status clínicos
// Outros tints são neutros - cor vai na camada de conteúdo
const tintStyles: Record<GlassTint, string> = {
  neutral: '',
  // Apple HIG: Neutro - cor na camada de conteúdo, não no material
  healthcare: '',
  blue: '',
  teal: '',
  purple: '',
  // Clinical Status - MANTER cor para indicadores de urgência
  critical: 'bg-clinical-critical/5 dark:bg-clinical-critical/10',
  warning: 'bg-clinical-warning/5 dark:bg-clinical-warning/10',
  stable: 'bg-clinical-stable/5 dark:bg-clinical-stable/10',
  // Legacy aliases (status clínicos)
  green: 'bg-clinical-stable/5 dark:bg-clinical-stable/10',
  red: 'bg-clinical-critical/5 dark:bg-clinical-critical/10',
  orange: 'bg-clinical-warning/5 dark:bg-clinical-warning/10',
};

// Apple HIG: Glows coloridos apenas para status clínicos
// Para outros elementos, glow neutro ou nenhum
const glowStyles: Record<GlassTint, string> = {
  neutral: 'shadow-glass-lg',
  // Apple HIG: Glow neutro para não-status
  healthcare: 'shadow-glass-lg',
  blue: 'shadow-glass-lg',
  teal: 'shadow-glass-lg',
  purple: 'shadow-glass-lg',
  // Clinical Status - MANTER glow colorido para urgência
  critical: 'shadow-glow-red',
  warning: 'shadow-glow-orange',
  stable: 'shadow-glow-green',
  // Legacy aliases (status clínicos)
  green: 'shadow-glow-green',
  red: 'shadow-glow-red',
  orange: 'shadow-glow-orange',
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
      weight,
      blur = 'medium',
      tint = 'neutral',
      hover = true,
      glow = false,
      padding = 'md',
      ...props
    },
    ref
  ) => {
    // Determine if using Liquid Glass (controls layer) vs Standard Material (content layer)
    const isLiquidGlass = variant === 'liquid' || variant === 'liquid-clear';

    return (
      <motion.div
        ref={ref}
        className={cn(
          // Base styles
          'rounded-[32px] transition-all duration-300',
          // Apple HIG focus states for keyboard navigation
          'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-healthcare-primary/30',
          'focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900',
          // Material variant (Apple HIG)
          weight ? weightStyles[weight] : variantStyles[variant],
          // Override blur for standard materials only (Liquid Glass has built-in blur)
          !isLiquidGlass && blur !== 'medium' && blurStyles[blur],
          // Tint (only for clinical status indicators)
          tint !== 'neutral' && tintStyles[tint],
          // Glow effect (only for clinical status)
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

/** Card for Kanban columns - Apple HIG: Drop highlight sutil */
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
        // Apple HIG: Cor na borda apenas, não no material
        isDropTarget
          ? 'bg-black/[0.02] dark:bg-white/[0.03] border-2 border-dashed border-healthcare-primary/40 shadow-md scale-[1.01]'
          : 'bg-white/20 dark:bg-white/5 backdrop-blur-2xl border border-black/[0.06] dark:border-white/5 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Modal/Dialog - Liquid Glass (controls layer) */
export function ModalGlassCard({
  children,
  className,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        // Apple HIG: Modals use Liquid Glass
        'modal-glass',
        'rounded-[28px]',
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
