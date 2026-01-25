'use client'

import * as React from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { Pin, CheckCircle2, ChevronDown, Trash2 } from 'lucide-react'
import { TodoItem } from './TodoItem'
import { TodoInput } from './TodoInput'
import {
  useShiftTodoStore,
  usePinnedTodos,
  usePendingTodos,
  useCompletedTodos,
} from '@/stores/shift-todo-store'
import type { ShiftTodo, TaskPriority } from '@/types/shift-todo'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import * as Tokens from '@/lib/theme/tokens'
import {
  useGlassBlur,
  useGlassOpacity,
  useGlassBorder,
  useGlassRadius,
  useGlassNoise,
  useGlassSpecular,
  useGlassRimLight,
  useGlassInnerGlow,
  useGlassHoverScale,
  useGlassTapScale,
} from '@/lib/theme/hooks'

interface ShiftTodoListProps {
  className?: string
}

export function ShiftTodoList({ className }: ShiftTodoListProps) {
  const [showCompleted, setShowCompleted] = React.useState(false)
  const { theme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  
  const pinnedTodos = usePinnedTodos()
  const pendingTodos = usePendingTodos()
  const completedTodos = useCompletedTodos()

  const { addTodo, toggleComplete, togglePin, deleteTodo, reorderTodos, clearCompleted } =
    useShiftTodoStore()
  
  const glassBlur = useGlassBlur()
  const glassOpacity = useGlassOpacity('default', isDark)
  const glassBorder = useGlassBorder('default', isDark)
  const glassRadius = useGlassRadius('default')
  const glassNoise = useGlassNoise()
  const glassSpecular = useGlassSpecular()
  const glassRimLight = useGlassRimLight()
  const glassInnerGlow = useGlassInnerGlow()
  const glassHoverScale = useGlassHoverScale()
  const glassTapScale = useGlassTapScale()

  const handleAddTodo = (content: string, priority: TaskPriority) => {
    addTodo(content, priority)
  }

  const handleReorder = (newOrder: ShiftTodo[]) => {
    // Merge reordered pending with pinned and completed
    const allTodos = useShiftTodoStore.getState().todos
    const pinnedIds = new Set(pinnedTodos.map((t) => t.id))
    const completedIds = new Set(completedTodos.map((t) => t.id))

    // Keep pinned and completed in their original positions, update pending order
    const updatedTodos = allTodos.map((todo) => {
      if (pinnedIds.has(todo.id) || completedIds.has(todo.id)) {
        return todo
      }
      const newIndex = newOrder.findIndex((t) => t.id === todo.id)
      return { ...todo, order: newIndex >= 0 ? newIndex : todo.order }
    })

    reorderTodos(updatedTodos)
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Add Task Input */}
      <TodoInput onAdd={handleAddTodo} />

      {/* Pinned Section */}
      {pinnedTodos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className={cn(
            'flex items-center gap-2 px-1',
            glassBlur,
            glassOpacity,
            glassBorder,
            glassRadius,
            glassNoise,
            glassSpecular,
            glassRimLight,
            'bg-white/60 dark:bg-white/10'
          )}>
            <Pin className="w-3.5 h-3.5 text-amber-500" fill="currentColor" />
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Fixadas
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              ({pinnedTodos.length})
            </span>
          </div>

          <div className="space-y-2">
            {pinnedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={toggleComplete}
                onTogglePin={togglePin}
                onDelete={deleteTodo}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Pending Section with Drag & Drop */}
      {pendingTodos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="space-y-2"
        >
          {pinnedTodos.length > 0 && (
            <div className={cn(
              'flex items-center gap-2 px-1',
              glassBlur,
              glassOpacity,
              glassBorder,
              glassRadius,
              glassNoise,
              glassSpecular,
              glassRimLight,
              'bg-white/60 dark:bg-white/10'
            )}>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Pendentes
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                ({pendingTodos.length})
              </span>
            </div>
          )}

          <Reorder.Group
            axis="y"
            values={pendingTodos}
            onReorder={handleReorder}
            className="space-y-2"
          >
            {pendingTodos.map((todo) => (
              <Reorder.Item
                key={todo.id}
                value={todo}
                className="list-none"
              >
                <TodoItem
                  todo={todo}
                  onToggleComplete={toggleComplete}
                  onTogglePin={togglePin}
                  onDelete={deleteTodo}
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </motion.div>
      )}

      {/* Empty State */}
      {pinnedTodos.length === 0 && pendingTodos.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            'flex flex-col items-center justify-center py-8 text-center',
            glassBlur,
            glassOpacity,
            glassBorder,
            glassRadius,
            glassNoise,
            glassSpecular,
            glassRimLight,
            glassInnerGlow,
            'bg-white/60 dark:bg-white/10'
          )}
        >
          <div className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center mb-3',
            glassBlur,
            glassOpacity,
            glassBorder,
            glassRadius,
            glassNoise,
            glassSpecular,
            glassRimLight,
            'bg-white/60 dark:bg-white/10'
          )}>
            <CheckCircle2 className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Nenhuma tarefa pendente
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Adicione uma tarefa acima
          </p>
        </motion.div>
      )}

      {/* Completed Section */}
      {completedTodos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className={cn(
              'flex items-center gap-2 px-1 group',
              glassBlur,
              glassOpacity,
              glassBorder,
              glassRadius,
              glassNoise,
              glassSpecular,
              glassRimLight,
              glassHoverScale,
              'bg-white/60 dark:bg-white/10'
            )}
          >
            <motion.div
              animate={{ rotate: showCompleted ? 0 : -90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </motion.div>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Concluídas
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              ({completedTodos.length})
            </span>

            {/* Clear Completed Button */}
            <motion.span
              onClick={(e) => {
                e.stopPropagation()
                clearCompleted()
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'ml-auto opacity-0 group-hover:opacity-100 flex items-center gap-1 px-2 py-1 rounded-md text-xs text-red-500 transition-all cursor-pointer',
                glassBlur,
                glassOpacity,
                glassBorder,
                glassRadius,
                glassNoise,
                glassSpecular,
                glassRimLight,
                glassHoverScale,
                glassTapScale,
                'bg-white/60 dark:bg-white/10'
              )}
            >
              <Trash2 className="w-3 h-3" />
              Limpar
            </motion.span>
          </button>

          <AnimatePresence>
            {showCompleted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-2 overflow-hidden"
              >
                {completedTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={toggleComplete}
                    onTogglePin={togglePin}
                    onDelete={deleteTodo}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
