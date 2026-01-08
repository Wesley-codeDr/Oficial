'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { springConfig, cardHover, cardTap } from '@/lib/animations'

type GlowColor = 'teal' | 'blue' | 'amber' | 'violet' | 'orange' | 'green' | 'none'

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
}

const sizeClasses = {
  sm: 'p-4 rounded-2xl',
  md: 'p-6 rounded-[28px]',
  lg: 'p-8 rounded-[32px]',
  xl: 'p-10 rounded-[40px]',
}

const variantClasses = {
  card: 'bg-white/25 dark:bg-[#1c1c1e]/25 backdrop-blur-4xl saturate-180 border border-white/30 dark:border-white/10 shadow-glass dark:shadow-glass-dark ring-1 ring-white/40 dark:ring-white/5',
  panel:
    'bg-white/25 dark:bg-white/[0.03] backdrop-blur-4xl saturate-180 border border-white/30 dark:border-white/10',
  section:
    'bg-white/15 dark:bg-white/[0.02] backdrop-blur-4xl saturate-180 border border-white/20 dark:border-white/5',
  nav: 'bg-white/25 dark:bg-[#1c1c1e]/25 backdrop-blur-4xl saturate-180 border-b border-white/30 dark:border-white/10 shadow-glass dark:shadow-glass-dark',
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
  }

  const theme = glowClasses[glow]

  return (
    <motion.div
      className={cn(
        'group relative overflow-hidden rounded-liquid-lg p-6 h-[200px] flex flex-col justify-between',
        'bg-white/25 dark:bg-[#1c1c1e]/25 backdrop-blur-4xl saturate-180',
        'border border-white/30 dark:border-white/10',
        'shadow-glass dark:shadow-glass-dark hover:shadow-glass-elevated',
        'ring-1 ring-white/40 dark:ring-white/5',
        'transition-all duration-500 hover:scale-[1.02]',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="light-refraction" />

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
            'rounded-[20px] w-12 h-12 flex items-center justify-center',
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
                d="M5 10l7-7m0 0l7 7m-7-7v18"
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
