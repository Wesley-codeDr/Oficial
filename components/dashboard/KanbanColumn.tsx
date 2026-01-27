/**
 * KanbanColumn Component
 *
 * Column component for kanban board
 */

'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import type { KanbanTask, KanbanStatus } from '@/lib/types/medical'
import { DASHBOARD_CONFIG } from '@/lib/config/dashboard'
import { KanbanCard } from './KanbanCard'

interface KanbanColumnProps {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  tasks: KanbanTask[]
  isDropTarget: boolean
  draggedTaskId: string | null
  density?: 'compact' | 'comfortable'
  onDragStart?: (e: React.DragEvent, id: string) => void
  onDragEnd?: (e: React.DragEvent) => void
  onDragOver?: (e: React.DragEvent<HTMLDivElement>, columnId: string) => void
  onDragLeave?: () => void
  onDrop?: (e: React.DragEvent<HTMLDivElement>, columnId: string) => void
  onStatusChange?: (taskId: string, newStatus: string) => void
}

export const KanbanColumn = ({
  id,
  title,
  icon: Icon,
  tasks,
  isDropTarget,
  draggedTaskId,
  density = 'comfortable',
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  onStatusChange,
}: KanbanColumnProps) => {
  const isCompact = density === 'compact'

  return (
    <div
      className={`flex flex-col h-full min-w-[320px] w-full p-3 transition-all duration-700
        bg-[var(--color-bg-primary)]
        border border-[var(--color-gray-100)]
        rounded-[24px] overflow-visible inner-glow-ios26
        ${isDropTarget ? 'bg-blue-100/40! dark:bg-blue-900/30! scale-[1.01] ring-2 ring-blue-400/50' : ''}
        `}
      style={{
        boxShadow: `var(--shadow-sm)`
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop?.(e, id)}
    >
      <div className="caustics-2026 absolute inset-0 pointer-events-none" />
      <div
        className={`relative z-10 flex items-center justify-between ${isCompact ? 'px-4 py-3' : 'px-5 py-5'}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`rounded-[20px] text-slate-500 dark:text-slate-400 ${isCompact ? 'p-2' : 'p-2.5'} bg-gray-50 dark:bg-white/5`}
          >
            <Icon className="w-5 h-5 stroke-[2px]" />
          </div>
          <h4 className="text-[15px] font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            {title}
            <span className="ml-2.5 text-[11px] font-bold text-slate-400 bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-[14px]">
              {tasks.length}
            </span>
          </h4>
        </div>
        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-2 rounded-[14px] hover:bg-white/30 dark:hover:bg-white/10">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14a2 2 0 0 1-1 0 0l-4-4 4 4 0 0 1 1 0 0 0zm-1 0h2a1 1 0 1 0 0 0 1 1 0 0l-4 4 4-4 0 0 0-0 1 1 0 0zm-1 0h2a1 1 0 1 0 0 0 1 1 0 0l-4 4 4-4 0 0 0-0 1 1 0z" />
          </svg>
        </button>
      </div>

      {/* Task List */}
      <div
        className={`flex-1 overflow-y-auto overflow-x-visible px-2 pb-2 custom-scrollbar ${isCompact ? 'space-y-2' : 'space-y-3'}`}
      >
        {tasks.map((task: KanbanTask) => (
          <KanbanCard
            key={task.id}
            task={task}
            isDragging={draggedTaskId === task.id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onStatusChange={onStatusChange}
            density={density}
          />
        ))}
      </div>

      {/* Add Task Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 rounded-[x24] border-2 border-dashed border-slate-300/40 dark:border-white/5 text-slate-400 dark:text-slate-500 font-bold text-sm flex items-center justify-center gap-3 hover:bg-white/40 dark:hover:bg-white/5 hover:border-blue-400/50 dark:hover:border-blue-500/30 transition-all group overflow-hidden relative"
      >
        <div className="w-7 h-7 rounded-full bg-slate-200/50 dark:bg-slate-700/50 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-sm">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14a2 2 0 0 1-1 0 0l-4-4 4 4 0 0zm-1 0h2a1 1 0 1 0 0 1 1 0 0l-4 4 4-4 0 0 0-0 1 1 0zm-1 0h2a1 1 0 1 0 0 1 1 0 0l-4 4 4-4 0 0 0-0 1 1 0z" />
          </svg>
        </div>
        <span className="group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">Novo Atendimento</span>
      </motion.button>
    </div>
  )
}

