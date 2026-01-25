'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Bug, Lightbulb, Clock, CheckSquare, ArrowUp, Inbox, ListTodo, Loader2, Search, CheckCircle2 } from 'lucide-react'
import type { KanbanTask, KanbanColumnStatus } from '@/types/kanban'
import { KANBAN_COLUMNS } from '@/types/kanban'
import { KanbanCard } from './KanbanCard'
import { ExpandableHelpCard } from './ExpandableHelpCard'
import { cn } from '@/lib/utils'
import { TASK_TEMPLATES, createTaskFromTemplate } from '@/lib/kanban/task-templates'
import { getHelpTipsForColumn } from '@/lib/kanban/help-tips'
import type { TaskTemplate } from '@/lib/kanban/task-templates'

interface KanbanColumnProps {
  status: KanbanColumnStatus
  tasks: KanbanTask[]
  onDeleteTask: (id: string) => void
  onMoveTask: (taskId: string, newStatus: KanbanColumnStatus) => void
  onAddTask?: (status: KanbanColumnStatus) => void
  onAddTaskFromTemplate?: (task: Omit<KanbanTask, 'id' | 'createdAt' | 'updatedAt'>) => void
}

const TEMPLATE_ICONS: Record<TaskTemplate['icon'], React.ElementType> = {
  bug: Bug,
  lightbulb: Lightbulb,
  clock: Clock,
  'check-square': CheckSquare,
}

const COLUMN_COLORS: Record<string, string> = {
  slate: 'from-slate-500/10 to-slate-500/5 border-slate-300/30',
  blue: 'from-blue-500/10 to-blue-500/5 border-blue-300/30',
  amber: 'from-amber-500/10 to-amber-500/5 border-amber-300/30',
  purple: 'from-purple-500/10 to-purple-500/5 border-purple-300/30',
  green: 'from-green-500/10 to-green-500/5 border-green-300/30',
}

const HEADER_COLORS: Record<string, string> = {
  slate: 'bg-slate-500',
  blue: 'bg-blue-500',
  amber: 'bg-amber-500',
  purple: 'bg-purple-500',
  green: 'bg-green-500',
}

// Context-aware empty state configuration for each column
const COLUMN_EMPTY_STATE: Record<KanbanColumnStatus, {
  icon: React.ElementType
  title: string
  hint: string
  actionHint: string
}> = {
  backlog: {
    icon: Inbox,
    title: 'Backlog vazio',
    hint: 'Adicione ideias e tarefas futuras aqui',
    actionHint: 'Clique no + para adicionar sua primeira ideia',
  },
  todo: {
    icon: ListTodo,
    title: 'Nenhuma tarefa pendente',
    hint: 'Arraste tarefas do Backlog ou crie novas',
    actionHint: 'Use o + acima para criar uma tarefa',
  },
  in_progress: {
    icon: Loader2,
    title: 'Nada em andamento',
    hint: 'Arraste tarefas de "A Fazer" para começar',
    actionHint: 'Ou clique no + para iniciar algo novo',
  },
  review: {
    icon: Search,
    title: 'Sem itens para revisão',
    hint: 'Mova tarefas concluídas aqui para revisão',
    actionHint: 'Arraste do "Em Progresso" quando pronto',
  },
  done: {
    icon: CheckCircle2,
    title: 'Nenhuma tarefa concluída',
    hint: 'Arraste itens revisados para concluir',
    actionHint: 'Tarefas finalizadas aparecerão aqui',
  },
}

export function KanbanColumn({
  status,
  tasks,
  onDeleteTask,
  onMoveTask,
  onAddTask,
  onAddTaskFromTemplate,
}: KanbanColumnProps) {
  const column = KANBAN_COLUMNS.find((col) => col.id === status)
  if (!column) return null

  const columnTasks = tasks.filter((task) => task.status === status)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative flex flex-col min-w-[280px] max-w-[320px] h-full',
        'rounded-3xl p-4',
        'border border-white/20 dark:border-white/5'
      )}
      data-testid={`kanban-column-${status}`}
    >
      <div
        className={cn(
          'absolute inset-0 -z-10 rounded-3xl',
          'bg-gradient-to-b',
          COLUMN_COLORS[column.color]
        )}
      />
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-3 h-3 rounded-full',
              HEADER_COLORS[column.color]
            )}
          />
          <h2 className="font-semibold text-sm text-slate-700 dark:text-slate-200">
            {column.title}
          </h2>
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-white/50 dark:bg-white/10 text-slate-600 dark:text-slate-300">
            {columnTasks.length}
          </span>
        </div>

        {onAddTask && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddTask(status)}
            className="p-1.5 rounded-lg hover:bg-white/30 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-colors"
            aria-label={`Adicionar tarefa em ${column.title}`}
          >
            <Plus className="h-4 w-4" />
          </motion.button>
        )}
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {columnTasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onMove={onMoveTask}
            />
          ))}
        </AnimatePresence>

        {columnTasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-6 px-2"
            data-testid={`kanban-empty-state-${status}`}
          >
            {/* Animated Arrow pointing to add button */}
            {onAddTask && (
              <motion.div
                className="flex justify-end w-full pr-1 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-slate-400 dark:text-slate-500"
                  data-testid="empty-state-arrow"
                >
                  <ArrowUp className="h-4 w-4" />
                </motion.div>
              </motion.div>
            )}

            {/* Column-specific Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className={cn(
                'p-3 rounded-xl mb-3',
                'bg-white/30 dark:bg-white/5',
                'border border-white/20 dark:border-white/10'
              )}
            >
              {(() => {
                const EmptyIcon = COLUMN_EMPTY_STATE[status].icon
                return <EmptyIcon className="h-6 w-6 text-slate-400 dark:text-slate-500" />
              })()}
            </motion.div>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-medium text-slate-500 dark:text-slate-400 text-center mb-1"
            >
              {COLUMN_EMPTY_STATE[status].title}
            </motion.p>

            {/* Context-aware hint */}
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-slate-400 dark:text-slate-500 text-center mb-3 leading-relaxed"
            >
              {COLUMN_EMPTY_STATE[status].hint}
            </motion.p>

            {/* Action hint with visual cue */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg',
                'bg-white/20 dark:bg-white/5',
                'border border-dashed border-slate-300/50 dark:border-slate-600/50'
              )}
              data-testid="empty-state-action-hint"
            >
              <Plus className="h-3 w-3 text-slate-400 dark:text-slate-500" />
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                {COLUMN_EMPTY_STATE[status].actionHint}
              </span>
            </motion.div>

            {/* Template buttons for columns that support quick creation */}
            {(status === 'backlog' || status === 'todo') && onAddTaskFromTemplate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 w-full"
              >
                <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center mb-2">
                  Ou crie a partir de template:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {TASK_TEMPLATES.slice(0, 2).map((template, index) => {
                    const Icon = TEMPLATE_ICONS[template.icon]
                    return (
                      <motion.button
                        key={template.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          const taskData = createTaskFromTemplate(template, status)
                          onAddTaskFromTemplate(taskData)
                        }}
                        className={cn(
                          'flex flex-col items-center gap-1 p-2 rounded-lg',
                          'bg-white/30 dark:bg-white/5',
                          'border border-white/30 dark:border-white/10',
                          'hover:bg-white/40 dark:hover:bg-white/10',
                          'transition-colors cursor-pointer'
                        )}
                        data-testid={`template-button-${template.id}`}
                      >
                        <Icon className="h-3 w-3 text-slate-500 dark:text-slate-400" />
                        <span className="text-[9px] font-medium text-slate-500 dark:text-slate-400 text-center leading-tight">
                          {template.name}
                        </span>
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Expandable Help Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4 w-full"
            >
              <ExpandableHelpCard
                tips={getHelpTipsForColumn(status)}
                storageKey={`kanban-column-${status}`}
                compact
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
