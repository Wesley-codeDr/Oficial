"use client"

import type { SeverityLevel } from '../../lib/anamnese/severity'

export interface ProgressStatusProps {
  progress: number // 0-100
  severity: SeverityLevel
}

export function ProgressStatus({ progress, severity }: ProgressStatusProps) {
  const color = severity === 'critical' ? '#FF3B30' : severity === 'high' ? '#FF9500' : severity === 'moderate' ? '#0A84FF' : '#34C759'

  return (
    <div className="space-y-1" aria-label="Indicadores de progresso e severidade">
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-[rgba(60,60,67,0.6)] dark:text-[rgba(235,235,245,0.6)]">Progresso</span>
        <span className="text-[13px]" style={{ color }}>{severity.toUpperCase()}</span>
      </div>
      <div className="h-2 rounded-[8px] bg-[#F2F2F7] dark:bg-[#2C2C2E] overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full" style={{ width: `${progress}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}
