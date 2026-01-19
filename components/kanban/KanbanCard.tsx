'use client'

import { motion } from 'framer-motion'
import { Calendar, Tag, Trash2, GripVertical, AlertTriangle } from 'lucide-react'
import type { KanbanTask, KanbanColumnStatus } from '@/types/kanban'
import { PRIORITY_COLORS, PRIORITY_LABELS, KANBAN_COLUMNS } from '@/types/kanban'
import { cn } from '@/lib/utils'

interface KanbanCardProps {
  task: KanbanTask
  onDelete: (id: string) => void
  onMove: (taskId: string, newStatus: KanbanColumnStatus) => void
}

export function KanbanCard({ task, onDelete, onMove }: KanbanCardProps) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date()
  const isCritical = task.priority === 'critical'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.01, y: -2 }}
      className={cn(
        'group relative rounded-2xl p-4',
        'liquid-glass-material rim-light-ios26',
        'border border-white/30 dark:border-white/10',
        'shadow-sm hover:shadow-md transition-shadow duration-300',
        isCritical && 'ring-2 ring-red-500/30'
      )}
      data-testid={`kanban-card-${task.id}`}
    >
      {/* Drag Handle (visual only for now) */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40 transition-opacity">
        <GripVertical className="h-4 w-4 text-slate-400" />
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(task.id)}
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-500"
        aria-label="Excluir tarefa"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>

      <div className="space-y-3 pl-4">
        {/* Priority Badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider',
              PRIORITY_COLORS[task.priority]
            )}
          >
            {isCritical && <AlertTriangle className="h-2.5 w-2.5" />}
            {PRIORITY_LABELS[task.priority]}
          </span>
          {isOverdue && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              Atrasado
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm text-slate-800 dark:text-white leading-tight pr-6">
          {task.title}
        </h3>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Labels */}
        {task.labels.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {task.labels.slice(0, 3).map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                <Tag className="h-2.5 w-2.5" />
                {label}
              </span>
            ))}
            {task.labels.length > 3 && (
              <span className="text-[10px] text-slate-400">
                +{task.labels.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Due Date & Move Controls */}
        <div className="flex items-center justify-between pt-1">
          {task.dueDate && (
            <span
              className={cn(
                'inline-flex items-center gap-1 text-[10px]',
                isOverdue
                  ? 'text-red-500'
                  : 'text-slate-400 dark:text-slate-500'
              )}
            >
              <Calendar className="h-3 w-3" />
              {new Date(task.dueDate).toLocaleDateString('pt-BR')}
            </span>
          )}

          {/* Quick Move Buttons */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <select
              value={task.status}
              onChange={(e) => onMove(task.id, e.target.value as KanbanColumnStatus)}
              className="text-[10px] px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border-none text-slate-600 dark:text-slate-300 cursor-pointer"
              aria-label="Mover para coluna"
            >
              {KANBAN_COLUMNS.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
