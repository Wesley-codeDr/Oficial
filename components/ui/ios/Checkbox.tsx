"use client"

import { useId } from 'react'

export interface IOSCheckboxProps {
  id?: string
  label: string
  narrative?: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export function IOSCheckbox({ id, label, narrative, checked, onChange, disabled }: IOSCheckboxProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <label
      htmlFor={inputId}
      className={
        'flex items-start gap-3 p-4 rounded-[18px] backdrop-blur-[40px] saturate-[180%] border transition-all duration-200 focus-within:ring-2 focus-within:ring-[#007AFF]/40 ' +
        'bg-white/55 dark:bg-[rgba(30,30,30,0.55)] border-white/40 dark:border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.3)] ' +
        (disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-white/70 dark:hover:bg-[rgba(30,30,30,0.65)]')
      }
      aria-disabled={disabled}
    >
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only"
        aria-checked={checked}
      />
      <span
        className={
          'mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-[10px] border transition-all duration-200 ' +
          (checked
            ? 'bg-[rgba(0,122,255,0.25)] dark:bg-[rgba(0,122,255,0.35)] border-[#007AFF]/50'
            : 'bg-white/50 dark:bg-white/10 border-white/40 dark:border-white/20')
        }
        role="checkbox"
        aria-checked={checked}
        aria-hidden="true"
      >
        {checked ? (
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7.8 14.3L4.5 11l1.4-1.4l1.9 1.9l6.2-6.2l1.4 1.4l-7.6 7.6z" fill="#007AFF" />
          </svg>
        ) : null}
      </span>
      <div className="flex-1">
        <div className="text-[16px] leading-[1.4] text-[rgba(0,0,0,0.85)] dark:text-white font-medium">{label}</div>
        {narrative ? (
          <div className="text-[14px] leading-[1.4] text-[rgba(0,0,0,0.45)] dark:text-[rgba(255,255,255,0.5)]">
            {narrative}
          </div>
        ) : null}
      </div>
    </label>
  )
}
