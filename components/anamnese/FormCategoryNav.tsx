'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CheckboxCategory } from '@prisma/client'
import { CheckCircle2, Circle } from 'lucide-react'

interface FormCategoryNavProps {
  activeCategory: CheckboxCategory
  onCategoryChange: (category: CheckboxCategory) => void
  selectedByCategory: Record<CheckboxCategory, number>
  totalByCategory: Record<CheckboxCategory, number>
}

const CATEGORY_LABELS: Record<CheckboxCategory, string> = {
  QP: 'Queixa Principal',
  HDA: 'História da Doença Atual',
  ANTECEDENTES: 'Antecedentes',
  MEDICACOES: 'Medicações',
  ALERGIAS: 'Alergias',
  HABITOS: 'Hábitos',
  EXAME_FISICO: 'Exame Físico',
  NEGATIVAS: 'Negativas',
}

const CATEGORY_ORDER: CheckboxCategory[] = [
  'QP',
  'HDA',
  'ANTECEDENTES',
  'MEDICACOES',
  'ALERGIAS',
  'HABITOS',
  'EXAME_FISICO',
  'NEGATIVAS',
]

export function FormCategoryNav({
  activeCategory,
  onCategoryChange,
  selectedByCategory,
  totalByCategory,
}: FormCategoryNavProps) {
  return (
    <div className="space-y-2">
      {CATEGORY_ORDER.map((category, index) => {
        const isActive = activeCategory === category
        const selected = selectedByCategory[category] || 0
        const total = totalByCategory[category] || 0
        const isComplete = selected > 0 && selected === total
        const hasSelection = selected > 0

        return (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.05 * index,
              duration: 0.3,
              ease: [0.25, 1, 0.5, 1],
            }}
            className={cn(
              'w-full text-left p-4 rounded-glass-lg transition-all duration-200',
              'flex items-center gap-3',
              'backdrop-blur-glass',
              isActive
                ? 'bg-healthcare-primary-glass border border-healthcare-primary/30 shadow-glass-light'
                : 'bg-white/5 border border-white/10 hover:bg-white/10',
              'group'
            )}
          >
            {/* Status Indicator */}
            <div className="flex-shrink-0">
              {isComplete ? (
                <CheckCircle2 className="w-5 h-5 text-healthcare-success" />
              ) : hasSelection ? (
                <Circle className="w-5 h-5 text-healthcare-primary" />
              ) : (
                <Circle className="w-5 h-5 text-slate-400" />
              )}
            </div>

            {/* Category Info */}
            <div className="flex-1 min-w-0">
              <div
                className={cn(
                  'text-sm font-semibold transition-colors',
                  isActive
                    ? 'text-healthcare-primary dark:text-healthcare-primary-dark'
                    : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
                )}
              >
                {CATEGORY_LABELS[category]}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {selected}/{total}
              </div>
            </div>

            {/* Progress Bar */}
            {total > 0 && (
              <div className="flex-shrink-0 w-12">
                <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(selected / total) * 100}%` }}
                    transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                    className={cn(
                      'h-full rounded-full',
                      isComplete
                        ? 'bg-healthcare-success'
                        : 'bg-healthcare-primary'
                    )}
                  />
                </div>
              </div>
            )}

            {/* Active Indicator */}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 border-2 border-healthcare-primary rounded-glass-lg pointer-events-none"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
