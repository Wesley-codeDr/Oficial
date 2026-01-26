'use client'

import { motion } from 'framer-motion'
import { CheckboxCategory } from '@prisma/client'
import { CFMProgressIndicator } from './cfm-progress-indicator'
import { cn } from '@/lib/utils'

interface FormCFMIndicatorProps {
  selectedByCategory: Record<CheckboxCategory, number>
  totalByCategory: Record<CheckboxCategory, number>
  className?: string
}

export function FormCFMIndicator({
  selectedByCategory,
  totalByCategory,
  className,
}: FormCFMIndicatorProps) {
  // Calculate overall progress
  const totalSelected = Object.values(selectedByCategory).reduce((a, b) => a + b, 0)
  const totalItems = Object.values(totalByCategory).reduce((a, b) => a + b, 0)
  const progressPercentage = totalItems > 0 ? (totalSelected / totalItems) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.7,
        duration: 0.3,
        ease: [0.25, 1, 0.5, 1],
      }}
      className={cn(
        'backdrop-blur-glass',
        'bg-white/60 dark:bg-slate-900/60',
        'border border-white/30',
        'rounded-glass-lg',
        'p-6',
        'shadow-glass-light dark:shadow-glass-dark',
        className
      )}
    >
      {/* Overall Progress Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Progresso CFM
          </h3>
          <span className="text-xs font-semibold text-healthcare-primary dark:text-healthcare-primary-dark">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="h-full bg-gradient-to-r from-healthcare-primary to-healthcare-primary-dark rounded-full"
          />
        </div>
      </div>

      {/* Detailed CFM Progress */}
      <CFMProgressIndicator
        selectedByCategory={selectedByCategory}
        totalByCategory={totalByCategory}
        showLabels={true}
      />

      {/* CFM Compliance Message */}
      {progressPercentage >= 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.3,
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
          className="mt-4 p-3 bg-healthcare-success-glass border border-healthcare-success/30 rounded-glass-sm"
        >
          <p className="text-xs font-semibold text-healthcare-success dark:text-healthcare-success-dark">
            ✓ Documentação completa e conforme CFM
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
