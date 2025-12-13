'use client';

import React, { useId, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

// ============================================
// TYPES
// ============================================

type TrendDirection = 'up' | 'down' | 'stable';

interface ChartAccessibilityProps {
  /** Title of the chart for screen readers */
  title: string;
  /** Detailed description of the chart data */
  description: string;
  /** Number of data points in the chart */
  dataPoints?: number;
  /** Current value being displayed */
  currentValue?: string | number;
  /** Unit of measurement */
  unit?: string;
  /** Trend direction */
  trendDirection?: TrendDirection;
  /** Trend percentage */
  trendPercentage?: string;
  /** Time period the chart covers */
  period?: string;
  /** Additional context for screen readers */
  additionalContext?: string;
  /** Children (the chart component) */
  children: React.ReactNode;
  /** Enable keyboard navigation within the chart */
  enableKeyboardNav?: boolean;
  /** Callback when a data point is focused via keyboard */
  onDataPointFocus?: (index: number) => void;
  /** Total number of navigable data points */
  totalDataPoints?: number;
  /** Custom class name */
  className?: string;
}

interface AccessibleDataTableProps {
  /** Data for the accessible table */
  data: Array<{ label: string; value: number | string }>;
  /** Column headers */
  headers: { label: string; value: string };
  /** Unit for values */
  unit?: string;
  /** Caption for the table */
  caption: string;
  /** Whether to visually hide the table (show only to screen readers) */
  visuallyHidden?: boolean;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function getTrendDescription(direction?: TrendDirection, percentage?: string): string {
  if (!direction || direction === 'stable') {
    return 'sem alteração significativa';
  }
  
  const directionText = direction === 'up' ? 'aumento' : 'redução';
  const percentageText = percentage ? ` de ${percentage}` : '';
  
  return `${directionText}${percentageText}`;
}

function generateChartDescription(props: ChartAccessibilityProps): string {
  const parts: string[] = [props.description];
  
  if (props.currentValue !== undefined) {
    const valueText = `Valor atual: ${props.currentValue}${props.unit ? ` ${props.unit}` : ''}`;
    parts.push(valueText);
  }
  
  if (props.trendDirection) {
    const trendText = `Tendência: ${getTrendDescription(props.trendDirection, props.trendPercentage)}`;
    parts.push(trendText);
  }
  
  if (props.period) {
    parts.push(`Período: ${props.period}`);
  }
  
  if (props.dataPoints) {
    parts.push(`${props.dataPoints} pontos de dados`);
  }
  
  if (props.additionalContext) {
    parts.push(props.additionalContext);
  }
  
  return parts.join('. ') + '.';
}

// ============================================
// VISUALLY HIDDEN COMPONENT
// ============================================

function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
      style={{ clip: 'rect(0, 0, 0, 0)' }}
    >
      {children}
    </span>
  );
}

// ============================================
// ACCESSIBLE DATA TABLE
// ============================================

/**
 * AccessibleDataTable - Provides tabular data access for screen readers
 * 
 * Apple HIG: "Provide accessibility labels that describe chart values"
 * 
 * This component renders an invisible (or visible) table that screen readers
 * can parse to understand the chart data.
 */
export function AccessibleDataTable({
  data,
  headers,
  unit,
  caption,
  visuallyHidden = true,
}: AccessibleDataTableProps) {
  const tableContent = (
    <table className={cn(
      'min-w-full',
      !visuallyHidden && 'text-sm text-slate-600 dark:text-slate-400'
    )}>
      <caption className={visuallyHidden ? 'sr-only' : 'text-left font-semibold mb-2'}>
        {caption}
      </caption>
      <thead>
        <tr>
          <th scope="col" className={visuallyHidden ? 'sr-only' : 'text-left pr-4'}>
            {headers.label}
          </th>
          <th scope="col" className={visuallyHidden ? 'sr-only' : 'text-right'}>
            {headers.value}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td className={visuallyHidden ? 'sr-only' : 'pr-4'}>{row.label}</td>
            <td className={visuallyHidden ? 'sr-only' : 'text-right font-medium'}>
              {row.value}{unit ? ` ${unit}` : ''}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (visuallyHidden) {
    return <VisuallyHidden>{tableContent}</VisuallyHidden>;
  }

  return tableContent;
}

// ============================================
// MAIN COMPONENT
// ============================================

/**
 * ChartAccessibility - Wrapper for accessible chart components
 * 
 * Apple HIG Guidelines Implemented:
 * - Accessibility labels that describe chart values and components
 * - Accessibility elements that help people interact with the chart
 * - Screen reader announcements for data changes
 * - Keyboard navigation support
 * 
 * @example
 * ```tsx
 * <ChartAccessibility
 *   title="Frequência Cardíaca"
 *   description="Gráfico de linha mostrando a frequência cardíaca ao longo das últimas 24 horas"
 *   currentValue={72}
 *   unit="bpm"
 *   trendDirection="up"
 *   trendPercentage="5%"
 *   period="Últimas 24 horas"
 * >
 *   <AreaChart data={data}>...</AreaChart>
 * </ChartAccessibility>
 * ```
 */
export function ChartAccessibility({
  title,
  description,
  dataPoints,
  currentValue,
  unit,
  trendDirection,
  trendPercentage,
  period,
  additionalContext,
  children,
  enableKeyboardNav = false,
  onDataPointFocus,
  totalDataPoints = 0,
  className,
}: ChartAccessibilityProps) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  
  const fullDescription = generateChartDescription({
    title,
    description,
    dataPoints,
    currentValue,
    unit,
    trendDirection,
    trendPercentage,
    period,
    additionalContext,
    children,
  });

  // Keyboard navigation handler
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!enableKeyboardNav || totalDataPoints === 0) return;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => {
          const next = prev < totalDataPoints - 1 ? prev + 1 : 0;
          onDataPointFocus?.(next);
          return next;
        });
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => {
          const next = prev > 0 ? prev - 1 : totalDataPoints - 1;
          onDataPointFocus?.(next);
          return next;
        });
        break;
      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        onDataPointFocus?.(0);
        break;
      case 'End':
        event.preventDefault();
        setFocusedIndex(totalDataPoints - 1);
        onDataPointFocus?.(totalDataPoints - 1);
        break;
    }
  }, [enableKeyboardNav, totalDataPoints, onDataPointFocus]);

  // Announce focus changes to screen readers
  useEffect(() => {
    if (focusedIndex >= 0 && enableKeyboardNav) {
      const announcement = `Ponto ${focusedIndex + 1} de ${totalDataPoints}`;
      // Create a live region announcement
      const liveRegion = document.getElementById(`${id}-live`);
      if (liveRegion) {
        liveRegion.textContent = announcement;
      }
    }
  }, [focusedIndex, totalDataPoints, enableKeyboardNav, id]);

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      role="figure"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-desc`}
    >
      {/* Hidden title for screen readers */}
      <VisuallyHidden>
        <h3 id={`${id}-title`}>{title}</h3>
        <p id={`${id}-desc`}>{fullDescription}</p>
      </VisuallyHidden>

      {/* Live region for dynamic announcements */}
      <div
        id={`${id}-live`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* Chart container with keyboard support */}
      <div
        role={enableKeyboardNav ? 'application' : 'img'}
        aria-roledescription="gráfico"
        aria-label={`${title}. ${description}`}
        tabIndex={enableKeyboardNav ? 0 : -1}
        onKeyDown={enableKeyboardNav ? handleKeyDown : undefined}
        className={cn(
          'focus:outline-none',
          enableKeyboardNav && 'focus-visible:ring-2 focus-visible:ring-healthcare-primary/50 focus-visible:ring-offset-2 rounded-lg'
        )}
      >
        {children}
      </div>

      {/* Skip link for keyboard users */}
      {enableKeyboardNav && (
        <VisuallyHidden>
          <p>
            Use as setas para navegar entre os pontos de dados. 
            Pressione Home para ir ao primeiro ponto ou End para ir ao último.
          </p>
        </VisuallyHidden>
      )}
    </div>
  );
}

// ============================================
// CHART SUMMARY COMPONENT
// ============================================

interface ChartSummaryProps {
  /** Main value to display */
  value: string | number;
  /** Label for the value */
  label: string;
  /** Unit of measurement */
  unit?: string;
  /** Trend information */
  trend?: {
    direction: TrendDirection;
    value: string;
    label?: string;
  };
  /** Time period */
  period?: string;
  /** Additional insight text */
  insight?: string;
  /** Visual variant */
  variant?: 'default' | 'compact' | 'prominent';
  /** Class name */
  className?: string;
}

/**
 * ChartSummary - Displays a summary headline for a chart
 * 
 * Apple HIG: "Display brief descriptive text that serves as a headline 
 * or summary for a chart, helping people grasp essential information at a glance"
 */
export function ChartSummary({
  value,
  label,
  unit,
  trend,
  period,
  insight,
  variant = 'default',
  className,
}: ChartSummaryProps) {
  const trendColors = {
    up: 'text-clinical-stable',
    down: 'text-clinical-critical',
    stable: 'text-slate-400 dark:text-slate-500',
  };

  const trendArrows = {
    up: '↑',
    down: '↓',
    stable: '→',
  };

  const variantStyles = {
    default: {
      container: 'mb-3',
      value: 'text-2xl',
      label: 'text-sm',
    },
    compact: {
      container: 'mb-2',
      value: 'text-xl',
      label: 'text-xs',
    },
    prominent: {
      container: 'mb-4',
      value: 'text-4xl',
      label: 'text-base',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={cn(styles.container, className)}>
      {/* Main value */}
      <div className="flex items-baseline gap-2">
        <span 
          className={cn(
            'font-bold text-slate-800 dark:text-white tracking-tight leading-none',
            styles.value
          )}
          aria-label={`${label}: ${value}${unit ? ` ${unit}` : ''}`}
        >
          {value}
        </span>
        
        {unit && (
          <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
            {unit}
          </span>
        )}

        {trend && (
          <span 
            className={cn('text-sm font-bold flex items-center gap-0.5', trendColors[trend.direction])}
            aria-label={`Tendência: ${trend.direction === 'up' ? 'aumento' : trend.direction === 'down' ? 'redução' : 'estável'} de ${trend.value}`}
          >
            <span aria-hidden="true">{trendArrows[trend.direction]}</span>
            <span>{trend.value}</span>
          </span>
        )}
      </div>

      {/* Label */}
      <p className={cn('font-medium text-slate-500 dark:text-slate-400 mt-0.5', styles.label)}>
        {label}
        {period && (
          <span className="text-slate-400 dark:text-slate-500"> · {period}</span>
        )}
      </p>

      {/* Insight */}
      {insight && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
          {insight}
        </p>
      )}
    </div>
  );
}

export default ChartAccessibility;

