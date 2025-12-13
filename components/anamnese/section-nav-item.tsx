'use client'

import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SectionNavItemProps {
  label: string
  icon: LucideIcon
  isActive: boolean
  hasRedFlag: boolean
  onClick: () => void
  isCollapsed?: boolean
}

export function SectionNavItem({
  label,
  icon: Icon,
  isActive,
  hasRedFlag,
  onClick,
  isCollapsed,
}: SectionNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all duration-300 group relative',
        isActive
          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-900/20 dark:shadow-white/10 scale-[1.02]'
          : 'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-slate-200',
        isCollapsed && 'justify-center'
      )}
      title={isCollapsed ? label : undefined}
    >
      <div className={cn('flex items-center gap-3 min-w-0', isCollapsed && 'gap-0')}>
        <Icon
          className={cn(
            'w-4 h-4 shrink-0',
            isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'
          )}
        />
        {!isCollapsed && (
          <span
            className={cn(
              'text-[13px] truncate tracking-tight',
              isActive ? 'font-bold' : 'font-medium'
            )}
          >
            {label}
          </span>
        )}
      </div>

      {/* Red Flag Indicator - Pulsing dot */}
      {hasRedFlag && !isCollapsed && (
        <div
          className={cn(
            'w-2 h-2 rounded-full animate-pulse',
            isActive ? 'bg-red-400' : 'bg-red-500'
          )}
        />
      )}
    </button>
  )
}
