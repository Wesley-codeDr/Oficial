"use client"

import type { SeverityResult } from '../../lib/anamnese/severity'

export function SeverityIndicator({ result }: { result: SeverityResult }) {
  const color = result.level === 'critical' ? '#FF3B30' : result.level === 'high' ? '#FF9500' : result.level === 'moderate' ? '#0A84FF' : '#34C759'

  return (
    <div className="p-3 rounded-[12px] bg-white dark:bg-[#1C1C1E] shadow-sm" aria-live="polite" role="status">
      <div className="text-[14px]" style={{ color }}>Gravidade: {result.level.toUpperCase()} ({Math.round(result.score)})</div>
      {result.reasons?.length ? (
        <ul className="mt-1 text-[13px] text-[rgba(60,60,67,0.6)] dark:text-[rgba(235,235,245,0.6)]">
          {result.reasons.map((r) => (
            <li key={r}>• {r}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
