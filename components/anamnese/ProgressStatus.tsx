'use client'

import { useTheme } from 'next-themes'
import type { SeverityLevel } from '../../lib/anamnese/severity'
import { cn } from '@/lib/utils'
import * as Tokens from '@/lib/theme/tokens'
import {
  useGlassBlur,
  useGlassOpacity,
  useGlassBorder,
  useGlassRadius,
  useGlassNoise,
  useGlassSpecular,
} from '@/lib/theme/hooks'

export interface ProgressStatusProps {
  progress: number // 0-100
  severity: SeverityLevel
}

export function ProgressStatus({ progress, severity }: ProgressStatusProps) {
  const { theme, systemTheme } = useTheme()
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')

  // Get theme classes
  const glassBlur = useGlassBlur()
  const glassOpacity = useGlassOpacity('subtle', isDark)
  const glassBorder = useGlassBorder(isDark)
  const glassRadius = useGlassRadius('SM')
  const glassNoise = useGlassNoise()
  const glassSpecular = useGlassSpecular('subtle')

  // Get color based on severity
  const color = severity === 'critical' ? '#FF3B30' : severity === 'high' ? '#FF9500' : severity === 'moderate' ? '#007AFF' : '#34C759'

  return (
    <div className="space-y-2" aria-label="Indicadores de progresso e severidade">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-[rgba(0,0,0,0.5)] dark:text-[rgba(255,255,255,0.5)]">
          Progresso
        </span>
        <span className="text-[13px] font-semibold" style={{ color }}>
          {severity.toUpperCase()}
        </span>
      </div>
      <div
        className={cn(
          'h-2.5 rounded-[12px] overflow-hidden',
          glassBlur,
          glassOpacity,
          glassBorder,
          glassRadius,
          glassNoise,
          glassSpecular,
          'liquid-glass-subtle bg-white/40 dark:bg-[rgba(30,30,30,0.4)] border-white/30 dark:border-white/15'
        )}
        role="progressbar"
      >
        <div
          className="h-full rounded-[12px] transition-all duration-300"
          style={{ width: `${progress}%`, backgroundColor: color, opacity: 0.8 }}
        />
      </div>
    </div>
  )
}
