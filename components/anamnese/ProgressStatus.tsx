"use client"

import type { SeverityLevel } from '../../lib/anamnese/severity'

export interface ProgressStatusProps {
  progress: number // 0-100
  severity: SeverityLevel
}

export function ProgressStatus({ progress, severity }: ProgressStatusProps) {
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
        className="h-2.5 rounded-[12px] backdrop-blur-[20px] bg-white/40 dark:bg-[rgba(30,30,30,0.4)] border border-white/30 dark:border-white/15 overflow-hidden"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-[12px] transition-all duration-300"
          style={{ width: `${progress}%`, backgroundColor: color, opacity: 0.8 }}
        />
      </div>
    </div>
  )
}
