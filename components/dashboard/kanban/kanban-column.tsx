'use client';

import React from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { KanbanCard } from './kanban-card';
import type { KanbanTask, KanbanStatus } from '@/types/frontend';
import type { LucideIcon } from 'lucide-react';

interface KanbanColumnProps {
  id: KanbanStatus;
  title: string;
  icon: LucideIcon;
  tasks: KanbanTask[];
  isDropTarget: boolean;
  draggedTaskId: string | null;
  density?: 'default' | 'compact';
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, columnId: KanbanStatus) => void;
  onStatusChange: (taskId: string, newStatus: KanbanStatus) => void;
  onNewTask?: () => void;
}

export function KanbanColumn({
  id,
  title,
  icon: Icon,
  tasks,
  isDropTarget,
  draggedTaskId,
  density = 'default',
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  onStatusChange,
  onNewTask,
}: KanbanColumnProps) {
  const isCompact = density === 'compact';

  return (
    <div
      className={cn(
        'flex flex-col h-full min-w-[320px] w-full rounded-[40px] p-2 transition-all duration-500',
        // Apple HIG: Drop highlight sutil - cor na borda, não no material
        isDropTarget
          ? 'bg-black/[0.02] dark:bg-white/[0.03] border-2 border-dashed border-healthcare-primary/40 shadow-md scale-[1.01]'
          : 'bg-white/20 dark:bg-white/5 backdrop-blur-2xl border border-black/[0.06] dark:border-white/5 shadow-sm'
      )}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(e);
      }}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, id)}
    >
      {/* Minimalist Header */}
      <div className={cn('flex items-center justify-between', isCompact ? 'px-4 py-3' : 'px-5 py-5')}>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'rounded-2xl bg-white/50 dark:bg-white/10 shadow-sm border border-white/20 text-slate-500 dark:text-slate-400',
              isCompact ? 'p-2' : 'p-2.5'
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
          <h4 className="text-[16px] font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            {title}
            <span className="ml-2 text-xs font-semibold text-slate-400 bg-white/50 dark:bg-white/5 px-2 py-0.5 rounded-full">
              {tasks.length}
            </span>
          </h4>
        </div>
        <button
          type="button"
          aria-label="Mais opções da coluna"
          title="Mais opções da coluna"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <MoreHorizontal className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      {/* Task List */}
      <div
        className={cn(
          'flex-1 overflow-y-auto px-2 pb-2 custom-scrollbar',
          isCompact ? 'space-y-2' : 'space-y-3'
        )}
      >
        {tasks.map((task) => (
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

        <button
          onClick={onNewTask}
          className="w-full py-4 rounded-[24px] border border-dashed border-slate-300/60 dark:border-white/10 text-slate-400 dark:text-slate-500 font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/40 dark:hover:bg-white/5 transition-all group"
        >
          <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-500 dark:text-neutral-400 group-hover:bg-healthcare-primary group-hover:text-white transition-colors">
            <Plus className="w-3.5 h-3.5" />
          </div>
          Novo Atendimento
        </button>
      </div>
    </div>
  );
}
