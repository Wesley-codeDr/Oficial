'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type CheckboxItem = {
  id: string
  displayText: string
  narrativeText: string
  isRedFlag: boolean
  isNegative: boolean
}

interface CheckboxGroupProps {
  title: string
  items: CheckboxItem[]
  selectedIds: Set<string>
  onToggle: (id: string) => void
}

export function CheckboxGroup({ title, items, selectedIds, onToggle }: CheckboxGroupProps) {
  if (items.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">
        {title}
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const isChecked = selectedIds.has(item.id)

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: index * 0.03, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={() => onToggle(item.id)}
                className={cn(
                  'group relative w-full flex items-center gap-3 rounded-[24px] border p-4 transition-all duration-300 text-left',
                  isChecked
                    ? item.isRedFlag
                      ? 'border-rose-500/50 bg-rose-500/10 shadow-[0_0_20px_rgba(244,63,94,0.1)]'
                      : 'border-blue-500/50 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                    : 'border-white/20 dark:border-white/5 bg-white/5 dark:bg-black/5 hover:border-white/40 dark:hover:border-white/20 hover:bg-white/10 dark:hover:bg-white/10'
                )}
              >
                {/* Visual Checkbox Replacement */}
                <div className={cn(
                  'w-5 h-5 rounded-lg border flex items-center justify-center transition-all duration-300',
                  isChecked 
                    ? item.isRedFlag ? 'bg-rose-500 border-rose-500' : 'bg-blue-500 border-blue-500'
                    : 'bg-white/10 border-white/20 group-hover:border-white/40'
                )}>
                  {isChecked && <Check className="w-3.5 h-3.5 text-white stroke-[4px]" />}
                </div>

                <span className={cn(
                  'flex-1 text-xs font-bold leading-tight transition-colors',
                  isChecked 
                    ? 'text-slate-900 dark:text-white' 
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                )}>
                  {item.displayText}
                </span>

                {item.isRedFlag && (
                  <AlertTriangle
                    className={cn(
                      'h-4 w-4 shrink-0 transition-all duration-300',
                      isChecked ? 'text-rose-500 scale-110' : 'text-slate-400/30'
                    )}
                  />
                )}
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ring-1 ring-inset ring-white/20" />
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
