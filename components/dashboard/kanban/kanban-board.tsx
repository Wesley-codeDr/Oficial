'use client';

/**
 * Apple HIG-style Kanban Board
 * Complete Kanban implementation using @dnd-kit
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  pointerWithin,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
  type UniqueIdentifier,
  type CollisionDetection,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { LucideIcon } from 'lucide-react';
import { useAppleSensors } from '@/lib/dnd/sensors';
import { dropAnimationConfig } from '@/lib/dnd/animations';
import { SortableKanbanCard } from './sortable-kanban-card';
import { KanbanColumnContainer } from './kanban-column-container';
import { KanbanCardOverlay } from './kanban-card-overlay';
import type { KanbanTask, KanbanStatus } from '@/types/frontend';

interface ColumnConfig {
  id: KanbanStatus;
  title: string;
  icon: LucideIcon;
}

interface KanbanBoardProps {
  tasks: KanbanTask[];
  columns: ColumnConfig[];
  onTaskMove: (taskId: string, newStatus: KanbanStatus) => void;
  /** Reorder tasks within a single column; receives a full task array with only the column order changed */
  onTaskReorder: (tasks: KanbanTask[]) => void;
  onNewTask?: () => void;
  density?: 'default' | 'compact';
}

/**
 * Custom collision detection that prioritizes columns over cards
 */
const kanbanCollisionDetection: CollisionDetection = (args) => {
  // First, try to find a column
  const pointerCollisions = pointerWithin(args);
  const closestCollisions = closestCorners(args);

  // Combine results, prioritizing pointer collisions
  const collisions = pointerCollisions.length > 0 ? pointerCollisions : closestCollisions;

  return collisions;
};

/**
 * Apple HIG-style Kanban Board
 *
 * Features:
 * - Drag cards between columns
 * - Reorder cards within columns
 * - Apple-style visual feedback
 * - Smooth spring animations
 *
 * @example
 * ```tsx
 * <KanbanBoard
 *   tasks={tasks}
 *   columns={[
 *     { id: 'todo', title: 'To Do', icon: ListIcon },
 *     { id: 'done', title: 'Done', icon: CheckIcon },
 *   ]}
 *   onTaskMove={(id, status) => moveTask(id, status)}
 *   onTaskReorder={(tasks) => setTasks(tasks)} // Only called for same-column reordering
 * />
 * ```
 */
export function KanbanBoard({
  tasks,
  columns,
  onTaskMove,
  onTaskReorder,
  onNewTask,
  density = 'default',
}: KanbanBoardProps) {
  const sensors = useAppleSensors();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overColumnId, setOverColumnId] = useState<KanbanStatus | null>(null);

  // Get the active task for the drag overlay
  const activeTask = useMemo(
    () => (activeId ? tasks.find((t) => t.id === activeId) : null),
    [activeId, tasks]
  );

  // Group tasks by column
  const tasksByColumn = useMemo(() => {
    const grouped: Record<KanbanStatus, KanbanTask[]> = {
      exam: [],
      wait: [],
      reval: [],
      done: [],
    };

    tasks.forEach((task) => {
      if (grouped[task.status]) {
        grouped[task.status].push(task);
      }
    });

    return grouped;
  }, [tasks]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { over } = event;

    if (!over) {
      setOverColumnId(null);
      return;
    }

    // Check if hovering over a column
    const overData = over.data.current;
    if (overData?.type === 'column') {
      setOverColumnId(overData.status as KanbanStatus);
    } else if (overData?.type === 'card') {
      // If hovering over a card, use that card's column
      const overTask = tasks.find((t) => t.id === over.id);
      if (overTask) {
        setOverColumnId(overTask.status);
      }
    }
  }, [tasks]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);
    setOverColumnId(null);

    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const overData = over.data.current;

    // Dropped on a column
    if (overData?.type === 'column') {
      const newStatus = overData.status as KanbanStatus;
      if (activeTask.status !== newStatus) {
        onTaskMove(activeTask.id, newStatus);
      }
      return;
    }

    // Dropped on another card
    if (overData?.type === 'card') {
      const overTask = tasks.find((t) => t.id === over.id);
      if (!overTask) return;

      // If different columns, move to new column
      if (activeTask.status !== overTask.status) {
        onTaskMove(activeTask.id, overTask.status);
        return;
      }

      if (active.id === over.id) {
        return;
      }

      // Same column, reorder using column-scoped indices
      const columnStatus = activeTask.status;
      const columnTasks = tasks.filter((t) => t.status === columnStatus);
      const oldIndex = columnTasks.findIndex((t) => t.id === active.id);
      const newIndex = columnTasks.findIndex((t) => t.id === over.id);

      if (oldIndex === -1 || newIndex === -1) {
        return;
      }

      const reorderedColumn = arrayMove(columnTasks, oldIndex, newIndex);
      const reorderedQueue = [...reorderedColumn];

      const newTasks = tasks.map((task) => {
        if (task.status !== columnStatus) return task;
        const nextTask = reorderedQueue.shift();
        return nextTask ?? task;
      });

      onTaskReorder(newTasks);
    }
  }, [tasks, onTaskMove, onTaskReorder]);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
    setOverColumnId(null);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={kanbanCollisionDetection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex h-full gap-6 min-w-[1200px]">
        {columns.map((column) => {
          const columnTasks = tasksByColumn[column.id] || [];
          const taskIds = columnTasks.map((t) => t.id);

          return (
            <KanbanColumnContainer
              key={column.id}
              id={column.id}
              title={column.title}
              icon={column.icon}
              taskCount={columnTasks.length}
              isDropTarget={overColumnId === column.id && activeTask?.status !== column.id}
              density={density}
              onNewTask={onNewTask}
            >
              <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                {columnTasks.map((task) => (
                  <SortableKanbanCard
                    key={task.id}
                    task={task}
                    density={density}
                    isDragging={activeId === task.id}
                  />
                ))}
              </SortableContext>
            </KanbanColumnContainer>
          );
        })}
      </div>

      <DragOverlay dropAnimation={dropAnimationConfig}>
        {activeTask ? (
          <KanbanCardOverlay task={activeTask} density={density} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
