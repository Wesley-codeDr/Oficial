"use client"

export interface EmergencyModeBarProps {
  active: boolean
  onToggle: (active: boolean) => void
}

export function EmergencyModeBar({ active, onToggle }: EmergencyModeBarProps) {
  return (
    <div className={
      'flex items-center justify-between p-2 rounded-[12px] ' +
      (active ? 'bg-[#FF3B30]/10 border border-[#FF3B30]/30' : 'bg-[#F2F2F7] dark:bg-[#2C2C2E]')
    }>
      <div className="text-[14px] font-medium text-[#FF3B30]">Modo Emergência{active ? ': Ativo' : ''}</div>
      <button
        type="button"
        onClick={() => onToggle(!active)}
        className={
          'px-3 py-1.5 rounded-[10px] text-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30]/40 ' +
          (active ? 'bg-[#FF3B30] text-white' : 'bg-white dark:bg-black text-black dark:text-white shadow-sm')
        }
        aria-pressed={active}
      >
        {active ? 'Desativar' : 'Ativar'}
      </button>
    </div>
  )
}
