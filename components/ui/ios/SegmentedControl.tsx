"use client"

import { useTheme } from 'next-themes'
import { useGlassBlur, useGlassOpacity, useGlassBorder, useGlassShadow, useGlassRadius } from '@/lib/theme'

export interface SegmentOption {
  id: string
  label: string
}

export interface SegmentedControlProps {
  options: SegmentOption[]
  value: string
  onChange: (id: string) => void
}

export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Use theme hooks for dynamic classes
  const blurClass = useGlassBlur('default')
  const opacityClass = useGlassOpacity('default', isDark)
  const borderClass = useGlassBorder('default', isDark)
  const shadowClass = useGlassShadow('default', isDark)
  const radiusClass = useGlassRadius('default')

  return (
    <div className={`
      inline-flex ${radiusClass} ${blurClass} ${opacityClass} ${borderClass} ${shadowClass} p-1.5
    `}>
      {options.map((opt) => {
        const selected = opt.id === value
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`
              px-4 py-2 rounded-[14px] text-[14px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ww-primary/40
              ${selected
                ? 'bg-ww-secondary/80 dark:bg-ww-secondary/20 text-ww-primary dark:text-ww-primary-100 shadow-ww-md'
                : 'text-ww-primary/60 dark:text-ww-primary/60 hover:bg-ww-secondary/40 dark:hover:bg-ww-secondary/10'
            }
            `}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
