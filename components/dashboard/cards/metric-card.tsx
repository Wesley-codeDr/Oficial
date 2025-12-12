'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { appleSpring } from '@/lib/animations/presets';

// ============================================
// TYPES
// ============================================

type ColorTheme = 'orange' | 'blue' | 'green' | 'purple' | 'red';
type TrendDirection = 'up' | 'down';
type CardDensity = 'default' | 'compact';

interface MetricCardProps {
  title: string;
  value: string | number;
  sub?: string;
  icon: LucideIcon;
  colorTheme?: ColorTheme;
  trend?: TrendDirection;
  trendValue?: string;
  data?: { value: number }[];
  density?: CardDensity;
  className?: string;
}

// ============================================
// THEME CONFIG
// ============================================

const themeConfig: Record<ColorTheme, {
  stroke: string;
  fillStart: string;
  glow: string;
  iconColor: string;
  iconBg: string;
  trendColor: string;
  trendBg: string;
}> = {
  orange: {
    stroke: '#F97316',
    fillStart: '#F97316',
    glow: 'from-orange-500/30 to-amber-500/30',
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-50 dark:bg-orange-500/20',
    trendColor: 'text-orange-600 dark:text-orange-400',
    trendBg: 'bg-orange-100/50 dark:bg-orange-500/10',
  },
  blue: {
    stroke: '#3B82F6',
    fillStart: '#3B82F6',
    glow: 'from-blue-500/30 to-cyan-500/30',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50 dark:bg-blue-500/20',
    trendColor: 'text-blue-600 dark:text-blue-400',
    trendBg: 'bg-blue-100/50 dark:bg-blue-500/10',
  },
  green: {
    stroke: '#10B981',
    fillStart: '#10B981',
    glow: 'from-emerald-500/30 to-teal-500/30',
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-50 dark:bg-emerald-500/20',
    trendColor: 'text-emerald-600 dark:text-emerald-400',
    trendBg: 'bg-emerald-100/50 dark:bg-emerald-500/10',
  },
  purple: {
    stroke: '#8B5CF6',
    fillStart: '#8B5CF6',
    glow: 'from-violet-500/30 to-fuchsia-500/30',
    iconColor: 'text-violet-500',
    iconBg: 'bg-violet-50 dark:bg-violet-500/20',
    trendColor: 'text-violet-600 dark:text-violet-400',
    trendBg: 'bg-violet-100/50 dark:bg-violet-500/10',
  },
  red: {
    stroke: '#EF4444',
    fillStart: '#EF4444',
    glow: 'from-red-500/30 to-rose-500/30',
    iconColor: 'text-red-500',
    iconBg: 'bg-red-50 dark:bg-red-500/20',
    trendColor: 'text-red-600 dark:text-red-400',
    trendBg: 'bg-red-100/50 dark:bg-red-500/10',
  },
};

// ============================================
// TOOLTIP
// ============================================

function CustomChartTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) {
  if (active && payload && payload.length > 0 && payload[0]) {
    return (
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-3 py-2 rounded-xl border border-white/50 dark:border-white/10 shadow-xl transform -translate-y-2">
        <p className="text-lg font-bold text-slate-800 dark:text-white leading-none">
          {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
}

// ============================================
// METRIC CARD COMPONENT
// ============================================

export function MetricCard({
  title,
  value,
  sub,
  icon: Icon,
  colorTheme = 'blue',
  trend = 'up',
  trendValue = '0%',
  data = [],
  density = 'default',
  className,
}: MetricCardProps) {
  const theme = themeConfig[colorTheme];
  const gradId = `grad-${title.replace(/\s/g, '')}`;
  const isCompact = density === 'compact';

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-[32px] p-0 flex flex-col justify-between group',
        'transition-all duration-500',
        'bg-white/60 dark:bg-[#1c1c1e]/60 backdrop-blur-3xl',
        'border border-white/60 dark:border-white/10',
        'shadow-[0_8px_32px_rgba(0,0,0,0.04)]',
        'hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]',
        'ring-1 ring-white/40 dark:ring-white/5',
        isCompact ? 'h-[180px]' : 'h-[240px]',
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={appleSpring}
    >
      {/* Volumetric Glow */}
      <div
        className={cn(
          'absolute -top-20 -right-20 w-60 h-60 rounded-full',
          'bg-gradient-to-br opacity-20 blur-[70px] pointer-events-none',
          'group-hover:opacity-40 transition-opacity duration-700',
          theme.glow
        )}
      />

      {/* Content Container */}
      <div className={cn('relative z-20 flex flex-col h-full pointer-events-none', isCompact ? 'p-4' : 'p-6')}>
        <div className="flex justify-between items-start mb-2 pointer-events-auto">
          {/* Icon */}
          <div
            className={cn(
              'rounded-[20px] backdrop-blur-md flex items-center justify-center',
              'shadow-sm border border-white/40 dark:border-white/5',
              theme.iconBg,
              theme.iconColor,
              isCompact ? 'w-10 h-10' : 'w-12 h-12'
            )}
          >
            <Icon className={cn('stroke-[2.5px]', isCompact ? 'w-5 h-5' : 'w-6 h-6')} />
          </div>

          {/* Trend Badge */}
          <div
            className={cn(
              'px-3 py-1.5 rounded-full text-[11px] font-bold',
              'backdrop-blur-md border border-white/20',
              'flex items-center gap-1',
              theme.trendBg,
              theme.trendColor
            )}
          >
            <ArrowUpRight className={cn('w-3 h-3', trend === 'down' && 'rotate-90')} />
            {trendValue}
          </div>
        </div>

        {/* Value Section */}
        <div className={cn('pointer-events-auto', isCompact ? 'mt-auto' : 'mt-4')}>
          <p className="text-[13px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-0.5">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3
              className={cn(
                'font-bold text-slate-800 dark:text-white tracking-tight leading-none',
                'filter drop-shadow-sm',
                isCompact ? 'text-[32px]' : 'text-[42px]'
              )}
            >
              {value}
            </h3>
          </div>
          {!isCompact && sub && (
            <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>
          )}
        </div>
      </div>

      {/* Chart Area */}
      {data.length > 0 && (
        <div className={cn('absolute bottom-0 left-0 right-0 w-full z-10 opacity-90', isCompact ? 'h-24' : 'h-36')}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={theme.fillStart} stopOpacity={0.25} />
                  <stop offset="90%" stopColor={theme.fillStart} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip content={<CustomChartTooltip />} cursor={false} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={theme.stroke}
                strokeWidth={3}
                fill={`url(#${gradId})`}
                animationDuration={1500}
                isAnimationActive={true}
                activeDot={{ r: 6, strokeWidth: 0, fill: theme.stroke, stroke: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}

// ============================================
// PRESET METRIC CARDS
// ============================================

const chartDataOrange = [
  { value: 12 }, { value: 18 }, { value: 15 }, { value: 25 },
  { value: 32 }, { value: 45 }, { value: 38 }, { value: 50 }, { value: 42 },
];

const chartDataBlue = [
  { value: 30 }, { value: 25 }, { value: 35 }, { value: 30 },
  { value: 45 }, { value: 35 }, { value: 55 }, { value: 50 }, { value: 60 },
];

const chartDataGreen = [
  { value: 20 }, { value: 25 }, { value: 30 }, { value: 28 },
  { value: 35 }, { value: 45 }, { value: 40 }, { value: 48 }, { value: 55 },
];

const chartDataPurple = [
  { value: 65 }, { value: 58 }, { value: 62 }, { value: 55 },
  { value: 50 }, { value: 45 }, { value: 48 }, { value: 42 }, { value: 40 },
];

export { chartDataOrange, chartDataBlue, chartDataGreen, chartDataPurple };

export default MetricCard;
