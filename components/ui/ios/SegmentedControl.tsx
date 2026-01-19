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
    <div className="inline-flex rounded-[18px] backdrop-blur-[40px] saturate-[180%] bg-white/40 dark:bg-[rgba(30,30,30,0.4)] border border-white/30 dark:border-white/15 p-1.5">
      {options.map((opt) => {
        const selected = opt.id === value
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={
              'px-4 py-2 rounded-[14px] text-[14px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]/40 ' +
              (selected
                ? 'bg-white/80 dark:bg-white/20 text-[rgba(0,0,0,0.85)] dark:text-white shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
                : 'text-[rgba(0,0,0,0.5)] dark:text-[rgba(255,255,255,0.5)] hover:bg-white/40 dark:hover:bg-white/10')
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - ARIA spec requires string "true"/"false", not boolean
            aria-pressed={selected ? "true" : "false"}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
