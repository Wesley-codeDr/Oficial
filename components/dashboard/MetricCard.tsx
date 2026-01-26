/**
 * MetricCard Component
 *
 * Card component for displaying dashboard metrics with charts
 */

'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'
import { CountUp } from './CountUp'
import { CustomChartTooltip } from './CustomChartTooltip'
import { DASHBOARD_CONFIG } from '@/lib/config/dashboard'
import { CHART_DATA, type ChartDataPoint } from '@/lib/mock/dashboard-data'

interface ThemeConfig {
  gradient: string
  border: string
  iconColor: string
  label: string
  stroke: string
  fillStart: string
  glow: string
  iconBg: string
  trendColor: string
  trendBg: string
  chartData: ChartDataPoint[]
}

interface MetricCardProps {
  title: string
  value: string
  sub: string
  icon: React.ComponentType<{ className?: string }>
  type: 'critical' | 'info' | 'success' | 'warning'
  theme: ThemeConfig
  trend: 'up' | 'down'
  trendValue: string
  data: ChartDataPoint[]
  density?: 'compact' | 'comfortable'
}

const THEME_MAP: Record<MetricCardProps['type'], ThemeConfig> = {
  critical: {
    gradient: 'var(--gradient-critical)',
    border: 'var(--gradient-critical-border)',
    iconColor: 'var(--gradient-critical-icon)',
    label: 'DOR TORÁCICA',
    stroke: '#E9C46A',
    fillStart: '#E9C46A',
    glow: 'from-amber-200/20 to-orange-100/10',
    iconBg: 'bg-amber-50 dark:bg-amber-500/10',
    trendColor: 'text-amber-700 dark:text-amber-400',
    trendBg: 'bg-amber-100/50 dark:bg-amber-500/10',
    chartData: CHART_DATA.orange,
  },
  info: {
    gradient: 'var(--gradient-info)',
    border: 'var(--gradient-info-border)',
    iconColor: 'var(--gradient-info-icon)',
    label: 'PCTS/HORA',
    stroke: '#0077B6',
    fillStart: '#0077B6',
    glow: 'from-blue-200/20 to-cyan-100/10',
    iconBg: 'bg-blue-50 dark:bg-blue-500/10',
    trendColor: 'text-blue-700 dark:text-blue-400',
    trendBg: 'bg-blue-100/50 dark:bg-blue-500/10',
    chartData: CHART_DATA.blue,
  },
  success: {
    gradient: 'var(--gradient-success)',
    border: 'var(--gradient-success-border)',
    iconColor: 'var(--gradient-success-icon)',
    label: 'REAVALIAÇÕES',
    stroke: '#2A9D8F',
    fillStart: '#2A9D8F',
    glow: 'from-emerald-200/20 to-teal-100/10',
    iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
    trendColor: 'text-emerald-700 dark:text-emerald-400',
    trendBg: 'bg-emerald-100/50 dark:bg-emerald-500/10',
    chartData: CHART_DATA.green,
  },
  warning: {
    gradient: 'var(--gradient-warning)',
    border: 'var(--gradient-warning-border)',
    iconColor: 'var(--gradient-warning-icon)',
    label: 'TEMPO PORTA-ECG',
    stroke: '#E9C46A',
    fillStart: '#E9C46A',
    glow: 'from-amber-100/20 to-orange-50/10',
    iconBg: 'bg-amber-50 dark:bg-amber-500/10',
    trendColor: 'text-amber-700 dark:text-amber-400',
    trendBg: 'bg-amber-100/50 dark:bg-amber-500/10',
    chartData: CHART_DATA.purple,
  },
}

export const MetricCard = ({
  title,
  value,
  sub,
  icon: Icon,
  type,
  theme,
  trend,
  trendValue,
  data,
  density = 'comfortable',
}: MetricCardProps) => {
  const isCompact = density === 'compact'
  const gradId = `grad-${title.replace(/\s/g, '')}`

  const glowClass =
    type === 'critical'
      ? 'text-glow-orange'
      : type === 'info'
        ? 'text-glow-blue'
        : type === 'success'
          ? 'text-glow-green'
          : 'text-glow-purple' // For warning

  const iconGlowClass =
    type === 'critical'
      ? 'icon-glow-orange'
      : type === 'info'
        ? 'icon-glow-blue'
        : type === 'success'
          ? 'icon-glow-green'
          : 'icon-glow-purple' // For warning

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.01,
        transition: {
          duration: 0.4,
          ease: DASHBOARD_CONFIG.easing.smooth,
        }
      }}
      className={`relative overflow-hidden p-0 flex flex-col justify-between group
        ${theme.gradient}
        liquid-glass-subtle
        saturate-[180%]
        border border-white/30
        rounded-3xl
        card-shadow
        transition-all duration-300 ease-[var(--lg-transition-apple)]
        hover:card-shadow-hover hover:-translate-y-1 hover:scale-[1.02]
        stagger-child
        ${isCompact ? `h-[${DASHBOARD_CONFIG.card.compact.height}px]` : `h-[${DASHBOARD_CONFIG.card.comfortable.height}px]`} inner-glow-ios26`}
    >
      {/* Enhanced hover gradient with better visibility */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Enhanced glow with better saturation */}
      <motion.div
        className={`absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br ${theme.glow} blur-[90px] rounded-full pointer-events-none transition-opacity duration-700`}
        animate={{
          opacity: [0.35, 0.5, 0.35],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="specular-2026 absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content Container */}
      <div
        className={`relative z-20 flex flex-col h-full pointer-events-none ${isCompact ? 'p-4' : 'p-6'}`}
      >
        <div className="flex items-center justify-between pointer-events-auto">
          <div
            className={`glass-icon-circle rim-light-ios26 ${theme.iconBg.includes('amber') ? 'glass-icon-circle--warning' : theme.iconBg.includes('blue') ? 'glass-icon-circle--info' : theme.iconBg.includes('emerald') ? 'glass-icon-circle--success' : 'glass-icon-circle--danger'}`}
          >
            <Icon
              className={`w-5 h-5 ${theme.iconColor} ${iconGlowClass} transition-all duration-300`}
            />
          </div>

          <div
            className={`glass-pill inner-glow-ios26 px-3 py-1.5 rounded-[14px] text-[11px] font-semibold flex items-center gap-1.5 ${theme.trendColor}`}
          >
            {trend === 'up' ? (
              <svg className="w-3 h-3 stroke-[3px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg className="w-3 h-3 stroke-[3px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 9l7-7 7 7" />
              </svg>
            )}
            <span className="tracking-wide">{trendValue}</span>
          </div>
        </div>

        <div className={`pointer-events-auto ${isCompact ? 'mt-auto' : 'mt-5'}`}>
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] mb-1.5 opacity-90">
            {title}
          </p>

          <div className="flex items-baseline gap-2">
            <h3
              className={`${isCompact ? 'text-[38px]' : 'text-[52px]'} font-[100] text-slate-800 dark:text-white tracking-[-0.04em] leading-none display-number-2026 ${glowClass}`}
            >
              <CountUp value={value} />
            </h3>
          </div>

          {!isCompact && (
            <p className="text-[13px] font-medium text-slate-400 dark:text-slate-500 mt-2 tracking-tight">
              {sub}
            </p>
          )}
        </div>
      </div>

      {/* Chart Area - Seamless Bottom (Translucent, not opaque) */}
      <div
        className={`absolute bottom-0 left-0 right-0 w-full z-10 opacity-90 ${isCompact ? 'h-24' : 'h-36'} bg-linear-to-b from-transparent via-slate-500/5 to-slate-500/15`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={theme.fillStart} stopOpacity={0.25} />
                <stop offset="90%" stopColor={theme.fillStart} stopOpacity={0.0} />
              </linearGradient>
              <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <Tooltip content={<CustomChartTooltip />} cursor={false} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={theme.stroke}
              strokeWidth={DASHBOARD_CONFIG.chart.strokeWidth}
              fill={`url(#${gradId})`}
              filter="url(#lineGlow)"
              animationDuration={DASHBOARD_CONFIG.animation.chart}
              isAnimationActive={true}
              activeDot={{ r: DASHBOARD_CONFIG.chart.dotRadius, strokeWidth: 0, fill: theme.stroke, stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
