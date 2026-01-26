/**
 * CustomChartTooltip Component
 *
 * Custom tooltip for dashboard charts
 */

'use client'

interface CustomChartTooltipProps {
  active: boolean
  payload: any
}

export const CustomChartTooltip = ({ active, payload }: CustomChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        role="tooltip"
        aria-live="polite"
        className="glass-molded-3d liquid-glass-rim liquid-glass-specular px-3 py-2 rounded-[14px] shadow-xl transform -translate-y-2"
      >
        <p className="text-lg font-black text-slate-800 dark:text-white leading-none">
          {payload[0].value}
        </p>
      </div>
    )
  }
  return null
}
