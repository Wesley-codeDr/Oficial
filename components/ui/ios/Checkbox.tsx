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
        'flex items-start gap-3 p-3 rounded-[8px] focus-within:ring-2 focus-within:ring-[#0A84FF]/40 ' +
        'bg-white dark:bg-[#1C1C1E] shadow-[0_1px_3px_rgba(0,0,0,0.1)] ' +
        (disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-[#F2F2F7] dark:hover:bg-[#2C2C2E]')
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
          'mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-[6px] border ' +
          (checked ? 'bg-[#0A84FF] border-[#0A84FF]' : 'bg-white dark:bg-[#1C1C1E] border-gray-300 dark:border-[#2C2C2E]')
        }
        role="checkbox"
        aria-checked={checked}
        aria-hidden="true"
      >
        {checked ? (
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7.8 14.3L4.5 11l1.4-1.4l1.9 1.9l6.2-6.2l1.4 1.4l-7.6 7.6z" fill="white" />
          </svg>
        ) : null}
      </span>
      <div className="flex-1">
        <div className="text-[16px] leading-[1.4] text-black dark:text-white">{label}</div>
        {narrative ? (
          <div className="text-[14px] leading-[1.4] text-[rgba(60,60,67,0.6)] dark:text-[rgba(235,235,245,0.6)]">
            {narrative}
          </div>
        ) : null}
      </div>
    </label>
  )
}
