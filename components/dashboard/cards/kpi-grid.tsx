'use client';

/**
 * Apple HIG-style KPI Grid
 * Sortable grid of KPI cards using @dnd-kit
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  type DragStartEvent,
  type DragEndEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useAppleSensors } from '@/lib/dnd/sensors';
import { dropAnimationConfig } from '@/lib/dnd/animations';
import { SortableKpiCard } from './sortable-kpi-card';

interface KpiItem {
  id: string;
  card: React.ReactElement;
}

interface KpiGridProps {
  items: KpiItem[];
  onReorder: (newOrder: string[]) => void;
  className?: string;
}

/**
 * Apple HIG-style KPI Grid with drag-and-drop reordering
 *
 * @example
 * ```tsx
 * <KpiGrid
 *   items={[
 *     { id: 'metric1', card: <MetricCard {...} /> },
 *     { id: 'metric2', card: <MetricCard {...} /> },
 *   ]}
 *   onReorder={(newOrder) => saveOrder(newOrder)}
 * />
 * ```
 */
export function KpiGrid({
  items,
  onReorder,
  className,
}: KpiGridProps) {
  const sensors = useAppleSensors();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const itemIds = useMemo(() => items.map((item) => item.id), [items]);

  const activeItem = useMemo(
    () => (activeId ? items.find((item) => item.id === activeId) : null),
    [activeId, items]
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);

    if (over && active.id !== over.id) {
      const currentItemIds = items.map((item) => item.id);
      const oldIndex = currentItemIds.indexOf(active.id as string);
      const newIndex = currentItemIds.indexOf(over.id as string);

      if (oldIndex === -1 || newIndex === -1) return;

      const newOrder = arrayMove(currentItemIds, oldIndex, newIndex);
      onReorder(newOrder);
    }
  }, [items, onReorder]);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={itemIds} strategy={rectSortingStrategy}>
        <div className={className}>
          {items.map((item) => (
            <SortableKpiCard
              key={item.id}
              id={item.id}
              isDragging={activeId === item.id}
            >
              {item.card}
            </SortableKpiCard>
          ))}
        </div>
      </SortableContext>

      <DragOverlay dropAnimation={dropAnimationConfig}>
        {activeItem ? (
          <div
            className="transform scale-105 rotate-2"
            style={{
              boxShadow: '0 25px 50px -10px rgba(0, 0, 0, 0.2), 0 15px 30px -5px rgba(0, 0, 0, 0.1)',
              cursor: 'grabbing',
            }}
          >
            {activeItem.card}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
