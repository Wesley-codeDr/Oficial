'use client'

import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
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
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((item, index) => {
          const isChecked = selectedIds.has(item.id)

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02, duration: 0.2 }}
            >
              <Label
                htmlFor={item.id}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all',
                  isChecked
                    ? item.isRedFlag
                      ? 'border-destructive/50 bg-destructive/10'
                      : 'border-primary/50 bg-primary/10'
                    : 'border-border hover:border-primary/30 hover:bg-accent/50'
                )}
              >
                <Checkbox
                  id={item.id}
                  checked={isChecked}
                  onCheckedChange={() => onToggle(item.id)}
                  className={cn(
                    item.isRedFlag && isChecked && 'border-destructive bg-destructive'
                  )}
                />
                <span className="flex-1 text-sm">{item.displayText}</span>
                {item.isRedFlag && (
                  <AlertTriangle
                    className={cn(
                      'h-4 w-4 shrink-0',
                      isChecked ? 'text-destructive' : 'text-muted-foreground/50'
                    )}
                  />
                )}
              </Label>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
