'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { springConfig, cardHover, cardTap } from '@/lib/animations'

type GlowColor =
  | 'teal' | 'blue' | 'amber' | 'violet' | 'orange' | 'green' | 'none'
  | 'primary' | 'success' | 'warning' | 'critical' | 'info'

interface GlassContainerProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  variant?: 'card' | 'panel' | 'section' | 'nav'
  glow?: GlowColor
  hover?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const glowColors: Record<GlowColor, string> = {
  teal: 'from-teal-500/30 to-cyan-500/30',
  blue: 'from-blue-500/30 to-indigo-500/30',
  amber: 'from-amber-500/30 to-orange-500/30',
  violet: 'from-violet-500/30 to-fuchsia-500/30',
  orange: 'from-orange-500/30 to-red-500/30',
  green: 'from-emerald-500/30 to-teal-500/30',
  none: '',
  // Healthcare semantic glow colors (iOS 26)
  primary: 'from-healthcare-primary/30 to-blue-500/30',
  success: 'from-healthcare-success/30 to-emerald-500/30',
  warning: 'from-healthcare-warning/30 to-amber-500/30',
  critical: 'from-healthcare-critical/30 to-red-500/30',
  info: 'from-healthcare-info/30 to-cyan-500/30',
}

const sizeClasses = {
  sm: 'p-4 rounded-glass-sm',
  md: 'p-6 rounded-glass',
  lg: 'p-8 rounded-glass-lg',
  xl: 'p-10 rounded-[40px]',
}

const variantClasses = {
  card: [
    'liquid-glass-default',
    'bg-[linear-gradient(135deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,calc(var(--glass-bg-opacity-regular)*0.7))_50%,rgba(255,255,255,calc(var(--glass-bg-opacity-regular)*0.8))_100%)]',
    'dark:bg-[linear-gradient(135deg,rgba(30,41,59,var(--glass-bg-opacity-dark))_0%,rgba(30,41,59,calc(var(--glass-bg-opacity-dark)*0.8))_50%,rgba(30,41,59,var(--glass-bg-opacity-dark))_100%)]',
    'border border-white/35 dark:border-white/20',
    'shadow-[0_20px_60px_-15px_var(--color-shadow),0_8px_24px_-8px_var(--color-shadow-subtle),inset_0_0_1px_rgba(255,255,255,0.6),inset_0_2px_0_rgba(255,255,255,0.8)]',
    'dark:shadow-[0_20px_60px_-15px_var(--color-shadow-dark),0_8px_24px_-8px_var(--color-shadow-subtle-dark),inset_0_0_1px_rgba(255,255,255,0.3),inset_0_2px_0_rgba(255,255,255,0.5)]',
  ].join(' '),
  panel: [
    'liquid-glass-default',
    'bg-[linear-gradient(135deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,calc(var(--glass-bg-opacity-regular)*0.7))_50%,rgba(255,255,255,calc(var(--glass-bg-opacity-regular)*0.8))_100%)]',
    'dark:bg-[linear-gradient(135deg,rgba(30,41,59,var(--glass-bg-opacity-dark))_0%,rgba(30,41,59,calc(var(--glass-bg-opacity-dark)*0.8))_50%,rgba(30,41,59,var(--glass-bg-opacity-dark))_100%)]',
    'border border-white/35 dark:border-white/20',
    'shadow-[0_20px_60px_-15px_var(--color-shadow),0_8px_24px_-8px_var(--color-shadow-subtle),inset_0_0_1px_rgba(255,255,255,0.6),inset_0_2px_0_rgba(255,255,255,0.8)]',
    'dark:shadow-[0_20px_60px_-15px_var(--color-shadow-dark),0_8px_24px_-8px_var(--color-shadow-subtle-dark),inset_0_0_1px_rgba(255,255,255,0.3),inset_0_2px_0_rgba(255,255,255,0.5)]',
  ].join(' '),
  section: [
    'liquid-glass-default',
    'bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,calc(var(--glass-bg-opacity-subtle)*0.7))_50%,rgba(255,255,255,calc(var(--glass-bg-opacity-subtle)*0.8))_100%)]',
    'dark:bg-[linear-gradient(135deg,rgba(30,41,59,calc(var(--glass-bg-opacity-dark)*0.7))_0%,rgba(30,41,59,calc(var(--glass-bg-opacity-dark)*0.8))_50%,rgba(30,41,59,calc(var(--glass-bg-opacity-dark)*0.7))_100%)]',
    'border border-white/25 dark:border-white/10',
    'shadow-[0_20px_60px_-15px_var(--color-shadow-subtle),0_8px_24px_-8px_var(--color-shadow-subtle),inset_0_0_1px_rgba(255,255,255,0.5),inset_0_2px_0_rgba(255,255,255,0.7)]',
    'dark:shadow-[0_20px_60px_-15px_var(--color-shadow-dark),0_8px_24px_-8px_var(--color-shadow-subtle-dark),inset_0_0_1px_rgba(255,255,255,0.2),inset_0_2px_0_rgba(255,255,255,0.4)]',
  ].join(' '),
  nav: [
    'liquid-glass-default',
    'bg-[linear-gradient(135deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,calc(var(--glass-bg-opacity-regular)*0.7))_50%,rgba(255,255,255,calc(var(--glass-bg-opacity-regular)*0.8))_100%)]',
    'dark:bg-[linear-gradient(135deg,rgba(30,41,59,var(--glass-bg-opacity-dark))_0%,rgba(30,41,59,calc(var(--glass-bg-opacity-dark)*0.8))_50%,rgba(30,41,59,var(--glass-bg-opacity-dark))_100%)]',
    'border border-white/35 dark:border-white/20',
    'shadow-[0_20px_60px_-15px_var(--color-shadow),0_8px_24px_-8px_var(--color-shadow-subtle),inset_0_0_1px_rgba(255,255,255,0.6),inset_0_2px_0_rgba(255,255,255,0.8)]',
    'dark:shadow-[0_20px_60px_-15px_var(--color-shadow-dark),0_8px_24px_-8px_var(--color-shadow-subtle-dark),inset_0_0_1px_rgba(255,255,255,0.3),inset_0_2px_0_rgba(255,255,255,0.5)]',
  ].join(' '),
}

export function GlassContainer({
  children,
  variant = 'card',
  glow = 'none',
  hover = false,
  size = 'md',
  className,
  ...props
}: GlassContainerProps) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden',
        variantClasses[variant],
        sizeClasses[size],
        hover && 'cursor-pointer',
        className
      )}
      whileHover={hover ? cardHover : undefined}
      whileTap={hover ? cardTap : undefined}
      transition={springConfig}
      {...props}
    >
      {/* Volumetric glow effect */}
      {glow !== 'none' && (
        <div
          className={cn(
            'absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none',
            'bg-gradient-to-br opacity-20 blur-[70px]',
            'group-hover:opacity-40 transition-opacity duration-700',
            glowColors[glow]
          )}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// Specialized glass card for metrics (like Dashboard)
interface GlassMetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ComponentType<{ className?: string }>
  glow?: GlowColor
  trend?: 'up' | 'down'
  trendValue?: string
  className?: string
}

export function GlassMetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  glow = 'blue',
  trend,
  trendValue,
  className,
}: GlassMetricCardProps) {
  const glowClasses: Record<
    GlowColor,
    { iconBg: string; iconColor: string; trendBg: string; trendColor: string }
  > = {
    teal: {
      iconBg: 'bg-teal-50 dark:bg-teal-500/20',
      iconColor: 'text-teal-500',
      trendBg: 'bg-teal-100/50 dark:bg-teal-500/10',
      trendColor: 'text-teal-600 dark:text-teal-400',
    },
    blue: {
      iconBg: 'bg-blue-50 dark:bg-blue-500/20',
      iconColor: 'text-blue-500',
      trendBg: 'bg-blue-100/50 dark:bg-blue-500/10',
      trendColor: 'text-blue-600 dark:text-blue-400',
    },
    amber: {
      iconBg: 'bg-amber-50 dark:bg-amber-500/20',
      iconColor: 'text-amber-500',
      trendBg: 'bg-amber-100/50 dark:bg-amber-500/10',
      trendColor: 'text-amber-600 dark:text-amber-400',
    },
    violet: {
      iconBg: 'bg-violet-50 dark:bg-violet-500/20',
      iconColor: 'text-violet-500',
      trendBg: 'bg-violet-100/50 dark:bg-violet-500/10',
      trendColor: 'text-violet-600 dark:text-violet-400',
    },
    orange: {
      iconBg: 'bg-orange-50 dark:bg-orange-500/20',
      iconColor: 'text-orange-500',
      trendBg: 'bg-orange-100/50 dark:bg-orange-500/10',
      trendColor: 'text-orange-600 dark:text-orange-400',
    },
    green: {
      iconBg: 'bg-emerald-50 dark:bg-emerald-500/20',
      iconColor: 'text-emerald-500',
      trendBg: 'bg-emerald-100/50 dark:bg-emerald-500/10',
      trendColor: 'text-emerald-600 dark:text-emerald-400',
    },
    none: {
      iconBg: 'bg-slate-50 dark:bg-slate-500/20',
      iconColor: 'text-slate-500',
      trendBg: 'bg-slate-100/50 dark:bg-slate-500/10',
      trendColor: 'text-slate-600 dark:text-slate-400',
    },
    // Healthcare semantic colors (iOS 26)
    primary: {
      iconBg: 'bg-healthcare-primary-glass dark:bg-healthcare-primary/20',
      iconColor: 'text-healthcare-primary dark:text-healthcare-primary-dark',
      trendBg: 'bg-healthcare-primary-tint dark:bg-healthcare-primary/10',
      trendColor: 'text-healthcare-primary dark:text-healthcare-primary-dark',
    },
    success: {
      iconBg: 'bg-healthcare-success-glass dark:bg-healthcare-success/20',
      iconColor: 'text-healthcare-success dark:text-healthcare-success-dark',
      trendBg: 'bg-healthcare-success-glass dark:bg-healthcare-success/10',
      trendColor: 'text-healthcare-success dark:text-healthcare-success-dark',
    },
    warning: {
      iconBg: 'bg-healthcare-warning-glass dark:bg-healthcare-warning/20',
      iconColor: 'text-healthcare-warning dark:text-healthcare-warning-dark',
      trendBg: 'bg-healthcare-warning-glass dark:bg-healthcare-warning/10',
      trendColor: 'text-healthcare-warning dark:text-healthcare-warning-dark',
    },
    critical: {
      iconBg: 'bg-healthcare-critical-glass dark:bg-healthcare-critical/20',
      iconColor: 'text-healthcare-critical dark:text-healthcare-critical-dark',
      trendBg: 'bg-healthcare-critical-glass dark:bg-healthcare-critical/10',
      trendColor: 'text-healthcare-critical dark:text-healthcare-critical-dark',
    },
    info: {
      iconBg: 'bg-healthcare-info-glass dark:bg-healthcare-info/20',
      iconColor: 'text-healthcare-info dark:text-healthcare-info-dark',
      trendBg: 'bg-healthcare-info-glass dark:bg-healthcare-info/10',
      trendColor: 'text-healthcare-info dark:text-healthcare-info-dark',
    },
  }

  const theme = glowClasses[glow]

  return (
    <motion.div
      className={cn(
        'group relative overflow-hidden rounded-glass p-6 h-[200px] flex flex-col justify-between',
        'liquid-glass-default',
        'bg-[linear-gradient(135deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,calc(var(--glass-bg-opacity-regular)*0.7))_50%,rgba(255,255,255,calc(var(--glass-bg-opacity-regular)*0.8))_100%)]',
        'dark:bg-[linear-gradient(135deg,rgba(30,41,59,var(--glass-bg-opacity-dark))_0%,rgba(30,41,59,calc(var(--glass-bg-opacity-dark)*0.8))_50%,rgba(30,41,59,var(--glass-bg-opacity-dark))_100%)]',
        'border border-white/35 dark:border-white/20',
        'shadow-[0_20px_60px_-15px_var(--color-shadow),0_8px_24px_-8px_var(--color-shadow-subtle),inset_0_0_1px_rgba(255,255,255,0.6),inset_0_2px_0_rgba(255,255,255,0.8)]',
        'dark:shadow-[0_20px_60px_-15px_var(--color-shadow-dark),0_8px_24px_-8px_var(--color-shadow-subtle-dark),inset_0_0_1px_rgba(255,255,255,0.3),inset_0_2px_0_rgba(255,255,255,0.5)]',
        'transition-all duration-500 hover:scale-[1.02]',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="light-reflection" />

      <div
        className={cn(
          'absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none',
          'bg-gradient-to-br opacity-20 blur-[70px]',
          'group-hover:opacity-40 transition-opacity duration-700',
          glowColors[glow]
        )}
      />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-start">
        <div
          className={cn(
            'rounded-[16px] w-12 h-12 flex items-center justify-center',
            'backdrop-blur-md shadow-sm border border-white/40 dark:border-white/5',
            theme.iconBg,
            theme.iconColor
          )}
        >
          <Icon className="w-6 h-6 stroke-[2.5px]" />
        </div>

        {trend && trendValue && (
          <div
            className={cn(
              'px-3 py-1.5 rounded-full text-[11px] font-bold backdrop-blur-md',
              'border border-white/20 flex items-center gap-1',
              theme.trendBg,
              theme.trendColor
            )}
          >
            <svg
              className={cn('w-3 h-3', trend === 'down' && 'rotate-180')}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7 7m0 0l7 7m-7 7v18"
              />
            </svg>
            {trendValue}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className="text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
          {title}
        </p>
        <h3 className="text-[42px] font-light text-slate-800 dark:text-white tracking-tight leading-none">
          {value}
        </h3>
        {subtitle && (
          <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  )
}
