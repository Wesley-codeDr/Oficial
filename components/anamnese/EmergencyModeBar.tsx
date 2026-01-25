"use client"

export interface EmergencyModeBarProps {
  active: boolean
  onToggle: (active: boolean) => void
}

export function EmergencyModeBar({ active, onToggle }: EmergencyModeBarProps) {
  return (
    <div
      className={
        'flex items-center justify-between p-3 rounded-[24px] liquid-glass-subtle border transition-all duration-200 ' +
        (active
          ? 'bg-[rgba(255,59,48,0.15)] dark:bg-[rgba(255,59,48,0.2)] border-[rgba(255,59,48,0.3)]'
          : 'bg-white/55 dark:bg-[rgba(30,30,30,0.55)] border-white/40 dark:border-white/15')
      }
    >
      <div className="text-[14px] font-semibold text-[#FF3B30] dark:text-[#FF453A]">
        Modo Emergência{active ? ': Ativo' : ''}
      </div>
      <button
        type="button"
        onClick={() => onToggle(!active)}
        className={
          'px-4 py-2 rounded-[14px] text-[14px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30]/40 ' +
          (active
            ? 'bg-[rgba(255,59,48,0.25)] dark:bg-[rgba(255,59,48,0.35)] text-[#FF3B30] dark:text-[#FF453A]'
            : 'bg-white/70 dark:bg-white/15 text-[rgba(0,0,0,0.85)] dark:text-white shadow-[0_4px_16px_rgba(0,0,0,0.06)]')
        }
        aria-pressed={active}
      >
        {active ? 'Desativar' : 'Ativar'}
      </button>
    </div>
  )
}
