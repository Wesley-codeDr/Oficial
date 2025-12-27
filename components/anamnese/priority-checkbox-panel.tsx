'use client'

import { useMemo } from 'react'
import { Stethoscope, AlertTriangle, CheckCircle2, FileText, Pill, Heart, Activity, XCircle } from 'lucide-react'
import { getPriorityCheckboxes, countPriorityCheckboxes } from '@/lib/data/complaintCheckboxMap'
import { getComplaintById } from '@/lib/data/allComplaints'
import type { CheckboxCategory, PriorityCheckboxMapping } from '@/lib/types/medical'

interface PriorityCheckboxPanelProps {
  complaintId: string
  selectedCheckboxes: Set<string>
  onToggle: (checkboxLabel: string, category: CheckboxCategory) => void
}

const CATEGORY_CONFIG: Record<CheckboxCategory, { label: string; icon: React.ElementType; color: string }> = {
  QP: { label: 'Queixa Principal', icon: FileText, color: 'text-blue-600 dark:text-blue-400' },
  HDA: { label: 'Historia da Doenca', icon: Activity, color: 'text-purple-600 dark:text-purple-400' },
  ANTECEDENTES: { label: 'Antecedentes', icon: Heart, color: 'text-rose-600 dark:text-rose-400' },
  MEDICACOES: { label: 'Medicacoes', icon: Pill, color: 'text-teal-600 dark:text-teal-400' },
  ALERGIAS: { label: 'Alergias', icon: AlertTriangle, color: 'text-amber-600 dark:text-amber-400' },
  HABITOS: { label: 'Habitos', icon: Activity, color: 'text-green-600 dark:text-green-400' },
  EXAME_FISICO: { label: 'Exame Fisico', icon: Stethoscope, color: 'text-indigo-600 dark:text-indigo-400' },
  NEGATIVAS: { label: 'Negativas Pertinentes', icon: XCircle, color: 'text-slate-600 dark:text-slate-400' },
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

export function PriorityCheckboxPanel({
  complaintId,
  selectedCheckboxes,
  onToggle,
}: PriorityCheckboxPanelProps) {
  const priorityCheckboxes = useMemo(() => getPriorityCheckboxes(complaintId), [complaintId])
  const complaint = useMemo(() => getComplaintById(complaintId), [complaintId])
  const totalCheckboxes = useMemo(() => countPriorityCheckboxes(complaintId), [complaintId])

  if (!priorityCheckboxes || !complaint) {
    return null
  }

  // Calcular progresso
  const selectedCount = useMemo(() => {
    let count = 0
    CATEGORY_ORDER.forEach(category => {
      const items = priorityCheckboxes[category]
      if (items) {
        items.forEach(item => {
          if (selectedCheckboxes.has(`${category}:${item}`)) {
            count++
          }
        })
      }
    })
    return count
  }, [priorityCheckboxes, selectedCheckboxes])

  const progressPercentage = totalCheckboxes > 0 ? Math.round((selectedCount / totalCheckboxes) * 100) : 0

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/50 dark:to-indigo-900/30 rounded-xl border border-blue-200 dark:border-blue-800/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-blue-100/50 dark:bg-blue-900/30 border-b border-blue-200 dark:border-blue-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                Checkboxes Prioritarios
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {complaint.title}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {selectedCount}/{totalCheckboxes}
              </p>
              <p className="text-xs text-slate-500">selecionados</p>
            </div>
            <div className="w-12 h-12 relative">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-slate-200 dark:text-slate-700"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${progressPercentage}, 100`}
                  className="text-blue-600 dark:text-blue-400"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">
                {progressPercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkbox Categories */}
      <div className="p-4 space-y-4">
        {CATEGORY_ORDER.map(category => {
          const items = priorityCheckboxes[category]
          if (!items || items.length === 0) return null

          const config = CATEGORY_CONFIG[category]
          const Icon = config.icon

          return (
            <div key={category} className="space-y-2">
              {/* Category Header */}
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${config.color}`} />
                <span className={`text-sm font-medium ${config.color}`}>
                  {config.label}
                </span>
                <span className="text-xs text-slate-400">({items.length})</span>
              </div>

              {/* Checkboxes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {items.map(item => {
                  const checkboxKey = `${category}:${item}`
                  const isSelected = selectedCheckboxes.has(checkboxKey)

                  return (
                    <button
                      key={checkboxKey}
                      type="button"
                      onClick={() => onToggle(item, category)}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm
                        transition-all duration-150
                        ${isSelected
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}
                      `}
                    >
                      <div className={`
                        w-5 h-5 rounded flex items-center justify-center shrink-0
                        ${isSelected
                          ? 'bg-white/20'
                          : 'border-2 border-slate-300 dark:border-slate-600'}
                      `}>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                      </div>
                      <span className="truncate">{item}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Tip */}
      <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800/50">
        <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5" />
          Checkboxes recomendados para esta queixa. Selecione os pertinentes ao caso.
        </p>
      </div>
    </div>
  )
}
