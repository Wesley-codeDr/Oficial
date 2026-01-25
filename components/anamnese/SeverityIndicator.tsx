'use client'

import type { SeverityResult } from '../../lib/anamnese/severity'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import * as Tokens from '@/lib/theme/tokens'
import {
  useGlassBlur,
  useGlassOpacity,
  useGlassBorder,
  useGlassRadius,
  useGlassNoise,
  useGlassSpecular,
  useGlassRimLight,
} from '@/lib/theme/hooks'

export function SeverityIndicator({ result }: { result: SeverityResult }) {
  const { theme, systemTheme } = useTheme()
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')

  // Get theme classes
  const glassBlur = useGlassBlur()
  const glassOpacity = useGlassOpacity('subtle', isDark)
  const glassBorder = useGlassBorder(isDark)
  const glassRadius = useGlassRadius('SM')
  const glassNoise = useGlassNoise()
  const glassSpecular = useGlassSpecular('subtle')
  const glassRimLight = useGlassRimLight()

  const color = result.level === 'critical' ? '#FF3B30' : result.level === 'high' ? '#FF9500' : result.level === 'moderate' ? '#0A84FF' : '#34C759'

  return (
    <div
      className={cn(
        'p-4 rounded-[24px] overflow-hidden',
        glassBlur,
        glassOpacity,
        glassBorder,
        glassRadius,
        glassNoise,
        glassSpecular,
        glassRimLight,
        'liquid-glass-subtle bg-white/55 dark:bg-[rgba(30,30,30,0.55)] border-white/40 dark:border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.3)]'
      )}
      aria-live="polite"
      role="status"
    >
      <div className="text-[14px] font-semibold" style={{ color }}>
        Gravidade: {result.level.toUpperCase()} ({Math.round(result.score)})
      </div>
      {result.reasons?.length ? (
        <ul className="mt-2 text-[13px] text-[rgba(0,0,0,0.5)] dark:text-[rgba(255,255,255,0.5)]">
          {result.reasons.map((r) => (
            <li key={r}>• {r}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
