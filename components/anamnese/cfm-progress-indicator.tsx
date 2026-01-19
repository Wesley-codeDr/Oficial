'use client'

import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Activity,
  Heart,
  Pill,
  AlertTriangle,
  Stethoscope,
  XCircle,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CheckboxCategory } from '@/lib/types/medical'

interface CFMProgressIndicatorProps {
  /**
   * Map of category to array of selected checkbox IDs
   */
  selectedByCategory: Record<CheckboxCategory, string[]>
  /**
   * Map of category to total checkbox count
   */
  totalByCategory: Record<CheckboxCategory, number>
  /**
   * Compact mode for smaller displays
   */
  compact?: boolean
  /**
   * Show labels for categories
   */
  showLabels?: boolean
  /**
   * Custom class name
   */
  className?: string
}

/**
 * CFM Blocks (Conselho Federal de Medicina)
 * Required sections for compliant medical documentation
 */
const CFM_BLOCKS: {
  category: CheckboxCategory
  label: string
  shortLabel: string
  icon: React.ElementType
  color: string
  bgColor: string
  description: string
}[] = [
  {
    category: 'QP',
    label: 'Queixa Principal',
    shortLabel: 'QP',
    icon: FileText,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-500',
    description: 'Motivo da consulta',
  },
  {
    category: 'HDA',
    label: 'Historia da Doenca',
    shortLabel: 'HDA',
    icon: Activity,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-500',
    description: 'Evolucao dos sintomas',
  },
  {
    category: 'ANTECEDENTES',
    label: 'Antecedentes',
    shortLabel: 'AP',
    icon: Heart,
    color: 'text-rose-600 dark:text-rose-400',
    bgColor: 'bg-rose-500',
    description: 'Historico pessoal',
  },
  {
    category: 'MEDICACOES',
    label: 'Medicacoes',
    shortLabel: 'MED',
    icon: Pill,
    color: 'text-teal-600 dark:text-teal-400',
    bgColor: 'bg-teal-500',
    description: 'Medicamentos em uso',
  },
  {
    category: 'ALERGIAS',
    label: 'Alergias',
    shortLabel: 'AL',
    icon: AlertTriangle,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-500',
    description: 'Alergias conhecidas',
  },
  {
    category: 'HABITOS',
    label: 'Habitos',
    shortLabel: 'HAB',
    icon: Activity,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-500',
    description: 'Habitos de vida',
  },
  {
    category: 'EXAME_FISICO',
    label: 'Exame Fisico',
    shortLabel: 'EF',
    icon: Stethoscope,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-500',
    description: 'Achados do exame',
  },
  {
    category: 'NEGATIVAS',
    label: 'Negativas',
    shortLabel: 'NEG',
    icon: XCircle,
    color: 'text-slate-600 dark:text-slate-400',
    bgColor: 'bg-slate-500',
    description: 'Sintomas ausentes',
  },
]

type BlockStatus = 'empty' | 'partial' | 'complete'

interface BlockProgress {
  category: CheckboxCategory
  selected: number
  total: number
  percentage: number
  status: BlockStatus
}

export function CFMProgressIndicator({
  selectedByCategory,
  totalByCategory,
  compact = false,
  showLabels = true,
  className,
}: CFMProgressIndicatorProps) {
  // Calculate progress for each block
  const blockProgress = useMemo((): BlockProgress[] => {
    return CFM_BLOCKS.map(({ category }) => {
      const selected = selectedByCategory[category]?.length ?? 0
      const total = totalByCategory[category] ?? 0
      const percentage = total > 0 ? Math.round((selected / total) * 100) : 0
      const status: BlockStatus =
        selected === 0 ? 'empty' : selected >= total ? 'complete' : 'partial'

      return { category, selected, total, percentage, status }
    })
  }, [selectedByCategory, totalByCategory])

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const totalSelected = blockProgress.reduce((sum, b) => sum + b.selected, 0)
    const totalItems = blockProgress.reduce((sum, b) => sum + b.total, 0)
    const percentage = totalItems > 0 ? Math.round((totalSelected / totalItems) * 100) : 0
    const completedBlocks = blockProgress.filter((b) => b.status === 'complete').length
    const partialBlocks = blockProgress.filter((b) => b.status === 'partial').length

    return { totalSelected, totalItems, percentage, completedBlocks, partialBlocks }
  }, [blockProgress])

  // Get status color classes
  const getStatusClasses = (status: BlockStatus) => {
    switch (status) {
      case 'complete':
        return {
          ring: 'ring-2 ring-emerald-500/50',
          bg: 'bg-emerald-500/20 dark:bg-emerald-500/30',
          text: 'text-emerald-600 dark:text-emerald-400',
          icon: 'text-emerald-500',
        }
      case 'partial':
        return {
          ring: 'ring-2 ring-amber-500/50',
          bg: 'bg-amber-500/20 dark:bg-amber-500/30',
          text: 'text-amber-600 dark:text-amber-400',
          icon: 'text-amber-500',
        }
      default:
        return {
          ring: 'ring-1 ring-slate-300/50 dark:ring-slate-600/50',
          bg: 'bg-slate-100/50 dark:bg-slate-800/50',
          text: 'text-slate-500 dark:text-slate-400',
          icon: 'text-slate-400',
        }
    }
  }

  // Get overall progress color
  const getOverallProgressColor = () => {
    if (overallProgress.percentage >= 80) return 'text-emerald-500'
    if (overallProgress.percentage >= 50) return 'text-amber-500'
    return 'text-slate-400'
  }

  if (compact) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {/* Compact circular progress */}
        <div className="relative w-10 h-10">
          <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-slate-200 dark:text-slate-700"
            />
            <motion.path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              initial={{ strokeDasharray: '0, 100' }}
              animate={{ strokeDasharray: `${overallProgress.percentage}, 100` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={getOverallProgressColor()}
            />
          </svg>
          <span
            className={cn(
              'absolute inset-0 flex items-center justify-center text-[10px] font-bold',
              getOverallProgressColor()
            )}
          >
            {overallProgress.percentage}%
          </span>
        </div>

        {/* Compact block indicators */}
        <div className="flex gap-1">
          {blockProgress.map((block) => {
            const config = CFM_BLOCKS.find((b) => b.category === block.category)!
            const statusClasses = getStatusClasses(block.status)

            return (
              <motion.div
                key={block.category}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={cn(
                  'w-6 h-6 rounded-md flex items-center justify-center',
                  statusClasses.bg,
                  statusClasses.ring
                )}
                title={`${config.label}: ${block.selected}/${block.total}`}
              >
                {block.status === 'complete' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <span className={cn('text-[8px] font-bold', statusClasses.text)}>
                    {config.shortLabel}
                  </span>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'glass-molded rim-light-ios26 inner-glow-ios26 noise-grain rounded-[24px] p-4 shadow-lg',
        className
      )}
    >
      {/* Header with overall progress */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Documentacao CFM
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Progresso da anamnese
            </p>
          </div>
        </div>

        {/* Overall progress circle */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {overallProgress.completedBlocks}/{CFM_BLOCKS.length}
            </p>
            <p className="text-[10px] text-slate-500">blocos</p>
          </div>
          <div className="relative w-14 h-14">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-slate-200 dark:text-slate-700"
              />
              <motion.path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0, 100' }}
                animate={{ strokeDasharray: `${overallProgress.percentage}, 100` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={getOverallProgressColor()}
              />
            </svg>
            <span
              className={cn(
                'absolute inset-0 flex items-center justify-center text-xs font-bold',
                getOverallProgressColor()
              )}
            >
              {overallProgress.percentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Block progress grid */}
      <div className="grid grid-cols-4 gap-2">
        <AnimatePresence mode="popLayout">
          {blockProgress.map((block, index) => {
            const config = CFM_BLOCKS.find((b) => b.category === block.category)!
            const Icon = config.icon
            const statusClasses = getStatusClasses(block.status)

            return (
              <motion.div
                key={block.category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  'relative rounded-xl p-2.5 transition-all duration-300',
                  statusClasses.bg,
                  statusClasses.ring,
                  'hover:scale-[1.02]'
                )}
              >
                {/* Status indicator */}
                <div className="absolute -top-1 -right-1">
                  {block.status === 'complete' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg"
                    >
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                  {block.status === 'partial' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center shadow-lg"
                    >
                      <Clock className="w-2.5 h-2.5 text-white" />
                    </motion.div>
                  )}
                </div>

                {/* Icon and label */}
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                      block.status === 'complete'
                        ? 'bg-emerald-500/20'
                        : block.status === 'partial'
                          ? 'bg-amber-500/20'
                          : 'bg-slate-200/50 dark:bg-slate-700/50'
                    )}
                  >
                    <Icon
                      className={cn(
                        'w-4 h-4',
                        block.status === 'complete'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : block.status === 'partial'
                            ? 'text-amber-600 dark:text-amber-400'
                            : config.color
                      )}
                    />
                  </div>

                  {showLabels && (
                    <span
                      className={cn(
                        'text-[9px] font-bold uppercase tracking-wider text-center',
                        statusClasses.text
                      )}
                    >
                      {config.shortLabel}
                    </span>
                  )}

                  {/* Progress bar */}
                  <div className="w-full h-1 rounded-full bg-slate-200/50 dark:bg-slate-700/50 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${block.percentage}%` }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className={cn(
                        'h-full rounded-full',
                        block.status === 'complete'
                          ? 'bg-emerald-500'
                          : block.status === 'partial'
                            ? 'bg-amber-500'
                            : 'bg-slate-400'
                      )}
                    />
                  </div>

                  {/* Count */}
                  <span className={cn('text-[8px] font-medium', statusClasses.text)}>
                    {block.selected}/{block.total}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Completion message */}
      <AnimatePresence>
        {overallProgress.percentage >= 80 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-700/50"
          >
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-medium">
                {overallProgress.percentage === 100
                  ? 'Documentacao completa!'
                  : 'Quase completo! Continue para finalizar.'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
