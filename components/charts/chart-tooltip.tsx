'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { appleSpring } from '@/lib/animations/presets';

// ============================================
// TYPES
// ============================================

interface TooltipPayloadItem {
  value: number;
  name?: string;
  dataKey?: string;
  color?: string;
  payload?: Record<string, unknown>;
}

interface ChartTooltipProps {
  /** Whether the tooltip is active/visible */
  active?: boolean;
  /** Array of data points at the current position */
  payload?: TooltipPayloadItem[];
  /** The label for the current data point (e.g., date, category) */
  label?: string;
  /** Unit to display after the value (e.g., "bpm", "kg", "%") */
  unit?: string;
  /** Custom formatter for the value */
  formatter?: (value: number, name?: string) => string;
  /** Custom label formatter */
  labelFormatter?: (label: string) => string;
  /** Optional title for the tooltip */
  title?: string;
  /** Show trend indicator */
  showTrend?: boolean;
  /** Previous value for trend calculation */
  previousValue?: number;
  /** Tooltip variant */
  variant?: 'default' | 'compact' | 'detailed';
  /** Custom class name */
  className?: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function formatValue(value: number, formatter?: (value: number, name?: string) => string): string {
  if (formatter) return formatter(value);
  
  // Smart formatting based on value magnitude
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  if (Number.isInteger(value)) {
    return value.toString();
  }
  return value.toFixed(1);
}

function getTrendInfo(current: number, previous: number): { direction: 'up' | 'down' | 'stable'; percentage: string } {
  if (previous === 0) return { direction: 'stable', percentage: '0%' };
  
  const change = ((current - previous) / previous) * 100;
  
  if (Math.abs(change) < 0.5) {
    return { direction: 'stable', percentage: '0%' };
  }
  
  return {
    direction: change > 0 ? 'up' : 'down',
    percentage: `${Math.abs(change).toFixed(1)}%`,
  };
}

// ============================================
// TREND INDICATOR COMPONENT
// ============================================

function TrendIndicator({ direction, percentage }: { direction: 'up' | 'down' | 'stable'; percentage: string }) {
  const colors = {
    up: 'text-clinical-stable',
    down: 'text-clinical-critical',
    stable: 'text-slate-400 dark:text-slate-500',
  };

  const arrows = {
    up: '↑',
    down: '↓',
    stable: '→',
  };

  return (
    <span className={cn('text-[10px] font-bold flex items-center gap-0.5', colors[direction])}>
      <span>{arrows[direction]}</span>
      <span>{percentage}</span>
    </span>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * ChartTooltip - Apple HIG Compliant Chart Tooltip
 * 
 * Features:
 * - Glassmorphism design consistent with app theme
 * - Smart value formatting
 * - Optional trend indicator
 * - Multiple variants (default, compact, detailed)
 * - Smooth animations
 * - Full accessibility support
 * 
 * @example
 * ```tsx
 * <Tooltip 
 *   content={<ChartTooltip unit="bpm" showTrend previousValue={68} />} 
 * />
 * ```
 */
export function ChartTooltip({
  active,
  payload,
  label,
  unit,
  formatter,
  labelFormatter,
  title,
  showTrend = false,
  previousValue,
  variant = 'default',
  className,
}: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const firstPayload = payload[0];
  if (!firstPayload) return null;

  const value = firstPayload.value;
  const formattedValue = formatValue(value, formatter);
  const formattedLabel = label && labelFormatter ? labelFormatter(label) : label;
  
  const trend = showTrend && previousValue !== undefined 
    ? getTrendInfo(value, previousValue)
    : null;

  // Variant-specific styles
  const variantStyles = {
    default: 'px-3 py-2',
    compact: 'px-2 py-1.5',
    detailed: 'px-4 py-3',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 5, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 5, scale: 0.95 }}
        transition={appleSpring}
        className={cn(
          // Base glass styles
          'bg-white/80 dark:bg-slate-900/80',
          'backdrop-blur-xl backdrop-saturate-150',
          'border border-white/50 dark:border-white/10',
          'rounded-xl shadow-xl',
          // Remove default recharts outline
          'outline-none',
          // Variant padding
          variantStyles[variant],
          className
        )}
        role="tooltip"
        aria-live="polite"
      >
        {/* Title (optional) */}
        {title && (
          <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            {title}
          </p>
        )}

        {/* Label (e.g., date or category) */}
        {formattedLabel && variant !== 'compact' && (
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">
            {formattedLabel}
          </p>
        )}

        {/* Value with unit */}
        <div className="flex items-baseline gap-1.5">
          <span 
            className={cn(
              'font-bold text-slate-800 dark:text-white leading-none',
              variant === 'compact' ? 'text-base' : 'text-lg',
              variant === 'detailed' && 'text-xl'
            )}
          >
            {formattedValue}
          </span>
          
          {unit && (
            <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
              {unit}
            </span>
          )}

          {/* Trend indicator */}
          {trend && <TrendIndicator direction={trend.direction} percentage={trend.percentage} />}
        </div>

        {/* Additional data points for detailed variant */}
        {variant === 'detailed' && payload.length > 1 && (
          <div className="mt-2 pt-2 border-t border-slate-200/50 dark:border-white/10 space-y-1">
            {payload.slice(1).map((item, index) => (
              <div key={index} className="flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {item.name || item.dataKey}
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {formatValue(item.value, formatter)}
                  {unit && <span className="text-slate-400"> {unit}</span>}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================
// SPECIALIZED TOOLTIPS
// ============================================

/**
 * Heart Rate specific tooltip with BPM styling
 */
export function HeartRateTooltip(props: Omit<ChartTooltipProps, 'unit'>) {
  return (
    <ChartTooltip
      {...props}
      unit="bpm"
      title="Frequência"
      formatter={(value) => Math.round(value).toString()}
    />
  );
}

/**
 * Blood Pressure tooltip with systolic/diastolic display
 */
export function BloodPressureTooltip({ 
  active, 
  payload,
  ...rest 
}: ChartTooltipProps) {
  if (!active || !payload || payload.length < 2) {
    return <ChartTooltip active={active} payload={payload} unit="mmHg" {...rest} />;
  }

  const systolic = payload.find(p => p.dataKey === 'systolic')?.value || payload[0]?.value || 0;
  const diastolic = payload.find(p => p.dataKey === 'diastolic')?.value || payload[1]?.value || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={appleSpring}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-3 py-2 rounded-xl border border-white/50 dark:border-white/10 shadow-xl"
      role="tooltip"
    >
      <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
        Pressão Arterial
      </p>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold text-slate-800 dark:text-white">
          {Math.round(systolic)}/{Math.round(diastolic)}
        </span>
        <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
          mmHg
        </span>
      </div>
    </motion.div>
  );
}

/**
 * Weight tooltip with kg/lbs support
 */
export function WeightTooltip({ 
  usePounds = false,
  ...props 
}: ChartTooltipProps & { usePounds?: boolean }) {
  return (
    <ChartTooltip
      {...props}
      unit={usePounds ? 'lbs' : 'kg'}
      formatter={(value) => value.toFixed(1)}
    />
  );
}

/**
 * Sleep duration tooltip
 */
export function SleepTooltip(props: Omit<ChartTooltipProps, 'formatter'>) {
  const formatSleep = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  return (
    <ChartTooltip
      {...props}
      formatter={formatSleep}
      title="Sono"
    />
  );
}

/**
 * Percentage tooltip
 */
export function PercentageTooltip(props: Omit<ChartTooltipProps, 'unit' | 'formatter'>) {
  return (
    <ChartTooltip
      {...props}
      unit="%"
      formatter={(value) => Math.round(value).toString()}
    />
  );
}

export default ChartTooltip;

