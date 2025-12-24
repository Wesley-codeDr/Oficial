"use client"

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
  return (
    <div className="inline-flex rounded-[10px] bg-[#F2F2F7] dark:bg-[#2C2C2E] p-1">
      {options.map((opt) => {
        const selected = opt.id === value
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={
              'px-3 py-1.5 rounded-[8px] text-[14px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF]/40 ' +
              (selected
                ? 'bg-white dark:bg-black text-black dark:text-white shadow-sm'
                : 'text-[rgba(60,60,67,0.6)] dark:text-[rgba(235,235,245,0.6)] hover:bg-white/60 dark:hover:bg-black/40')
            }
            aria-pressed={selected}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
