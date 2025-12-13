'use client';

/**
 * Apple HIG-style Sortable List
 * Complete sortable list component with drag overlay
 */

import React, { useState, useCallback } from 'react';
import { DndContext, closestCenter, type DragEndEvent, type DragStartEvent, type UniqueIdentifier } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { cn } from '@/lib/utils';
import { useAppleSensors } from '@/lib/dnd/sensors';
import { SortableItem } from './sortable-item';
import { AppleDragOverlay } from './drag-overlay';

type SortingStrategy = 'vertical' | 'horizontal' | 'grid';

interface SortableListProps<T extends { id: UniqueIdentifier }> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  renderOverlay?: (item: T) => React.ReactNode;
  strategy?: SortingStrategy;
  className?: string;
  itemClassName?: string;
  disabled?: boolean;
  gap?: number;
}

const strategyMap = {
  vertical: verticalListSortingStrategy,
  horizontal: horizontalListSortingStrategy,
  grid: rectSortingStrategy,
};

/**
 * Apple HIG-style Sortable List
 *
 * Complete sortable list with:
 * - Apple-style sensors (delay, distance)
 * - Smooth reordering animations
 * - Drag overlay with elevation
 *
 * @example
 * ```tsx
 * <SortableList
 *   items={tasks}
 *   onReorder={setTasks}
 *   renderItem={(task) => <TaskCard task={task} />}
 *   renderOverlay={(task) => <TaskCard task={task} />}
 *   strategy="vertical"
 * />
 * ```
 */
export function SortableList<T extends { id: UniqueIdentifier }>({
  items,
  onReorder,
  renderItem,
  renderOverlay,
  strategy = 'vertical',
  className,
  itemClassName,
  disabled = false,
  gap = 8,
}: SortableListProps<T>) {
  const sensors = useAppleSensors();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const activeItem = activeId
    ? items.find((item) => item.id === activeId)
    : null;

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newItems = arrayMove(items, oldIndex, newIndex);
        onReorder(newItems);
      }
    }

    setActiveId(null);
  }, [items, onReorder]);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const sortingStrategy = strategyMap[strategy];

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items} strategy={sortingStrategy}>
        <div
          className={cn(
            'relative',
            strategy === 'vertical' && 'flex flex-col',
            strategy === 'horizontal' && 'flex flex-row',
            strategy === 'grid' && 'grid',
            className
          )}
          style={{ gap }}
        >
          {items.map((item, index) => (
            <SortableItem
              key={item.id}
              id={item.id}
              className={itemClassName}
              disabled={disabled}
            >
              {renderItem(item, index)}
            </SortableItem>
          ))}
        </div>
      </SortableContext>

      <AppleDragOverlay>
        {activeItem && renderOverlay
          ? renderOverlay(activeItem)
          : activeItem
          ? renderItem(activeItem, items.findIndex((i) => i.id === activeItem.id))
          : null}
      </AppleDragOverlay>
    </DndContext>
  );
}

/**
 * Simpler version for basic lists
 */
interface SimpleSortableListProps {
  items: UniqueIdentifier[];
  onReorder: (items: UniqueIdentifier[]) => void;
  children: React.ReactNode;
  strategy?: SortingStrategy;
  className?: string;
}

export function SimpleSortableList({
  items,
  onReorder,
  children,
  strategy = 'vertical',
  className,
}: SimpleSortableListProps) {
  const sensors = useAppleSensors();

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        onReorder(arrayMove(items, oldIndex, newIndex));
      }
    }
  }, [items, onReorder]);

  const sortingStrategy = strategyMap[strategy];

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={sortingStrategy}>
        <div className={className}>{children}</div>
      </SortableContext>
    </DndContext>
  );
}
