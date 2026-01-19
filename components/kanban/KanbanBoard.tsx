'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, RotateCcw } from 'lucide-react'
import { useKanbanStore, useIsKanbanEmpty } from '@/stores/kanban-store'
import { KANBAN_COLUMNS } from '@/types/kanban'
import type { KanbanColumnStatus, KanbanTask } from '@/types/kanban'
import { KanbanColumn } from './KanbanColumn'
import { KanbanEmptyState } from './KanbanEmptyState'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AddTaskDialogState {
  isOpen: boolean
  status: KanbanColumnStatus | null
}

export function KanbanBoard() {
  const tasks = useKanbanStore((state) => state.tasks)
  const boardName = useKanbanStore((state) => state.boardName)
  const boardDescription = useKanbanStore((state) => state.boardDescription)
  const deleteTask = useKanbanStore((state) => state.deleteTask)
  const moveTask = useKanbanStore((state) => state.moveTask)
  const addTask = useKanbanStore((state) => state.addTask)
  const clearBoard = useKanbanStore((state) => state.clearBoard)
  const isEmpty = useIsKanbanEmpty()

  const [addTaskDialog, setAddTaskDialog] = useState<AddTaskDialogState>({
    isOpen: false,
    status: null,
  })
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddTask = (status: KanbanColumnStatus) => {
    setAddTaskDialog({ isOpen: true, status })
  }

  const handleAddTaskFromTemplate = (taskData: Omit<KanbanTask, 'id' | 'createdAt' | 'updatedAt'>) => {
    addTask(taskData)
  }

  const handleSubmitTask = () => {
    if (!newTaskTitle.trim() || !addTaskDialog.status) return

    addTask({
      title: newTaskTitle.trim(),
      status: addTaskDialog.status,
      priority: 'medium',
      labels: [],
    })

    setNewTaskTitle('')
    setAddTaskDialog({ isOpen: false, status: null })
  }

  const handleClearBoard = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o quadro? Esta ação não pode ser desfeita.')) {
      clearBoard()
    }
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (isEmpty) {
    return <KanbanEmptyState />
  }

  return (
    <div className="h-full flex flex-col" data-testid="kanban-board">
      {/* Board Header */}
      <div className="flex items-center justify-between mb-6 px-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            {boardName}
          </h1>
          {boardDescription && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {boardDescription}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearBoard}
            className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            <RotateCcw className="h-4 w-4" />
            Reiniciar
          </Button>
        </div>
      </div>

      {/* Columns Container */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4 min-h-[500px] px-2">
          {KANBAN_COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              status={column.id}
              tasks={tasks}
              onDeleteTask={deleteTask}
              onMoveTask={moveTask}
              onAddTask={handleAddTask}
              onAddTaskFromTemplate={handleAddTaskFromTemplate}
            />
          ))}
        </div>
      </div>

      {/* Add Task Dialog (simple modal) */}
      {addTaskDialog.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setAddTaskDialog({ isOpen: false, status: null })}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="liquid-glass-material rim-light-ios26 rounded-2xl p-6 w-full max-w-md border border-white/30"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              Nova Tarefa
            </h3>

            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Título da tarefa..."
              className={cn(
                'w-full px-4 py-3 rounded-xl',
                'bg-white/50 dark:bg-slate-800/50',
                'border border-slate-200 dark:border-slate-700',
                'text-slate-800 dark:text-white',
                'placeholder:text-slate-400',
                'focus:outline-none focus:ring-2 focus:ring-blue-500/50'
              )}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmitTask()
                if (e.key === 'Escape') setAddTaskDialog({ isOpen: false, status: null })
              }}
            />

            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="ghost"
                onClick={() => setAddTaskDialog({ isOpen: false, status: null })}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmitTask}
                disabled={!newTaskTitle.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
