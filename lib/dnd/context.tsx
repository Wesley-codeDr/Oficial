'use client';

/**
 * Apple HIG-style DnD Context Provider
 * Wraps @dnd-kit DndContext with Apple design defaults
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  closestCorners,
  rectIntersection,
  pointerWithin,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
  type DragCancelEvent,
  type CollisionDetection,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useAppleSensors } from './sensors';
import { dropAnimationConfig } from './animations';

// Re-export strategies for convenience
export {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy,
};

/**
 * Collision detection strategies
 */
export const collisionStrategies = {
  closestCenter,
  closestCorners,
  rectIntersection,
  pointerWithin,
} as const;

/**
 * Context for tracking global drag state
 */
interface DragState {
  activeId: UniqueIdentifier | null;
  overId: UniqueIdentifier | null;
  isDragging: boolean;
}

const DragStateContext = createContext<DragState>({
  activeId: null,
  overId: null,
  isDragging: false,
});

export const useDragState = () => useContext(DragStateContext);

/**
 * Props for AppleDndProvider
 */
interface AppleDndProviderProps {
  children: React.ReactNode;
  onDragStart?: (event: DragStartEvent) => void;
  onDragOver?: (event: DragOverEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  onDragCancel?: (event: DragCancelEvent) => void;
  collisionDetection?: CollisionDetection;
  modifiers?: Parameters<typeof DndContext>[0]['modifiers'];
  overlay?: React.ReactNode;
}

/**
 * Apple HIG-style DnD Provider
 *
 * Features:
 * - Pre-configured Apple-style sensors (delay, distance)
 * - Global drag state tracking
 * - Customizable collision detection
 * - Built-in DragOverlay with Apple animations
 *
 * @example
 * ```tsx
 * <AppleDndProvider
 *   onDragEnd={handleDragEnd}
 *   overlay={<MyDragOverlay />}
 * >
 *   <SortableContext items={items}>
 *     {items.map(item => <SortableItem key={item.id} {...item} />)}
 *   </SortableContext>
 * </AppleDndProvider>
 * ```
 */
export function AppleDndProvider({
  children,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDragCancel,
  collisionDetection = closestCenter,
  modifiers,
  overlay,
}: AppleDndProviderProps) {
  const sensors = useAppleSensors();

  const [dragState, setDragState] = useState<DragState>({
    activeId: null,
    overId: null,
    isDragging: false,
  });

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setDragState({
      activeId: event.active.id,
      overId: null,
      isDragging: true,
    });
    onDragStart?.(event);
  }, [onDragStart]);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    setDragState(prev => ({
      ...prev,
      overId: event.over?.id ?? null,
    }));
    onDragOver?.(event);
  }, [onDragOver]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setDragState({
      activeId: null,
      overId: null,
      isDragging: false,
    });
    onDragEnd?.(event);
  }, [onDragEnd]);

  const handleDragCancel = useCallback((event: DragCancelEvent) => {
    setDragState({
      activeId: null,
      overId: null,
      isDragging: false,
    });
    onDragCancel?.(event);
  }, [onDragCancel]);

  return (
    <DragStateContext.Provider value={dragState}>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        modifiers={modifiers}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {children}

        {overlay && (
          <DragOverlay
            dropAnimation={dropAnimationConfig}
            style={{
              cursor: 'grabbing',
            }}
          >
            {dragState.activeId ? overlay : null}
          </DragOverlay>
        )}
      </DndContext>
    </DragStateContext.Provider>
  );
}

/**
 * Helper hook for sortable lists
 * Handles common reordering logic
 */
export function useSortableList<T extends { id: UniqueIdentifier }>(
  items: T[],
  onReorder: (items: T[]) => void
) {
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
  }, [items, onReorder]);

  return { handleDragEnd };
}

/**
 * Helper hook for Kanban-style boards
 * Handles moving items between columns
 */
export function useKanbanBoard<T extends { id: UniqueIdentifier; status: string }>(
  items: T[],
  onMove: (itemId: UniqueIdentifier, newStatus: string) => void,
  onReorder: (items: T[]) => void
) {
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeItem = items.find((item) => item.id === active.id);
    if (!activeItem) return;

    // Check if dropped on a column (status change)
    const overData = over.data.current;
    if (overData?.type === 'column' && overData.status !== activeItem.status) {
      onMove(active.id, overData.status);
      return;
    }

    // Check if reordering within same column
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newItems = arrayMove(items, oldIndex, newIndex);
        onReorder(newItems);
      }
    }
  }, [items, onMove, onReorder]);

  return { handleDragEnd };
}
