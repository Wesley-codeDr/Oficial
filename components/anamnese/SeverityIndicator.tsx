"use client"

import type { SeverityResult } from '../../lib/anamnese/severity'

export function SeverityIndicator({ result }: { result: SeverityResult }) {
  const color = result.level === 'critical' ? '#FF3B30' : result.level === 'high' ? '#FF9500' : result.level === 'moderate' ? '#0A84FF' : '#34C759'

  return (
    <div
      className="p-4 rounded-[24px] backdrop-blur-[40px] saturate-[180%] bg-white/55 dark:bg-[rgba(30,30,30,0.55)] border border-white/40 dark:border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.3)]"
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
