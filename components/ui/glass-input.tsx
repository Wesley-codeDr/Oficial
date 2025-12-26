'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  error?: boolean
}

const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, type, icon: Icon, iconPosition = 'left', error, ...props }, ref) => {
    return (
      <div className="relative group">
        {Icon && iconPosition === 'left' && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <Icon
              className={cn(
                'h-[18px] w-[18px] transition-colors duration-300',
                error
                  ? 'text-red-400 dark:text-red-500'
                  : 'text-slate-400 dark:text-slate-500 group-focus-within:text-slate-600 dark:group-focus-within:text-slate-300'
              )}
            />
          </div>
        )}
        <input
          type={type}
          className={cn(
            // Base styles
            'flex w-full h-12 rounded-xl',
            'text-slate-900 dark:text-white',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
            'text-sm font-medium',

            // Glass effect
            'bg-white/60 dark:bg-white/5',
            'border backdrop-blur-xl shadow-sm',
            error
              ? 'border-red-300 dark:border-red-500/30'
              : 'border-white/60 dark:border-white/10',

            // Padding based on icon position
            Icon && iconPosition === 'left' ? 'pl-12 pr-4' : 'pl-4 pr-4',
            Icon && iconPosition === 'right' && 'pr-12',

            // Transitions
            'transition-all duration-300 ease-out',

            // Focus states
            'focus:bg-white/80 dark:focus:bg-white/10',
            'focus:border-slate-300 dark:focus:border-white/20',
            'focus:ring-2',
            error
              ? 'focus:ring-red-500/20 dark:focus:ring-red-500/20'
              : 'focus:ring-slate-900/10 dark:focus:ring-white/10',
            'focus:shadow-[0_4px_20px_rgba(0,0,0,0.08)]',
            'focus-visible:outline-none',

            // Hover states
            'hover:bg-white/80 dark:hover:bg-white/10',
            'hover:border-white/80 dark:hover:border-white/15',

            // Disabled state
            'disabled:cursor-not-allowed disabled:opacity-50',

            className
          )}
          ref={ref}
          {...props}
        />
        {Icon && iconPosition === 'right' && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <Icon
              className={cn(
                'h-[18px] w-[18px] transition-colors duration-300',
                error
                  ? 'text-red-400 dark:text-red-500'
                  : 'text-slate-400 dark:text-slate-500 group-focus-within:text-slate-600 dark:group-focus-within:text-slate-300'
              )}
            />
          </div>
        )}
      </div>
    )
  }
)
GlassInput.displayName = 'GlassInput'

export { GlassInput }
