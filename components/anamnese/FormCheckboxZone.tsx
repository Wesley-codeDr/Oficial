'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckboxCategory } from '@prisma/client'
import { CheckboxGroup } from './checkbox-group'
import { tabVariants, checkboxVariants } from '@/lib/design-system/animation-choreography'

type CheckboxData = {
  id: string
  category: CheckboxCategory
  displayText: string
  narrativeText: string
  isRedFlag: boolean
  isNegative: boolean
  orderIndex: number
}

interface FormCheckboxZoneProps {
  category: CheckboxCategory
  categoryLabel: string
  checkboxes: CheckboxData[]
  selectedIds: Set<string>
  onToggle: (id: string) => void
}

export function FormCheckboxZone({
  category,
  categoryLabel,
  checkboxes,
  selectedIds,
  onToggle,
}: FormCheckboxZoneProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category}
        variants={tabVariants}
        initial="exit"
        animate="enter"
        exit="exit"
        className="space-y-6"
      >
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="sticky top-0 z-20 backdrop-blur-glass bg-white/80 dark:bg-slate-900/80 px-4 py-3 rounded-glass-lg border border-white/20"
        >
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            {categoryLabel}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {checkboxes.length} item{checkboxes.length !== 1 ? 's' : ''} disponível
            {checkboxes.length !== 1 ? 'is' : ''}
          </p>
        </motion.div>

        {/* Checkboxes with Stagger Animation */}
        <div className="space-y-4">
          {checkboxes.map((checkbox, index) => (
            <motion.div
              key={checkbox.id}
              custom={index}
              variants={checkboxVariants}
              initial="hidden"
              animate="visible"
            >
              <CheckboxGroup
                title=""
                items={[checkbox]}
                selectedIds={selectedIds}
                onToggle={onToggle}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {checkboxes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-12 text-slate-400"
          >
            <p className="text-sm">Nenhum item disponível nesta categoria</p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
