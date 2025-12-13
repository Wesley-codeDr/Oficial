'use client';

/**
 * Apple HIG-style Sortable Item
 * Wrapper for items in a sortable list
 */

import React, { forwardRef } from 'react';
import { useSortable, type AnimateLayoutChanges, defaultAnimateLayoutChanges } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { APPLE_TRANSITION, placeholderStyles } from '@/lib/dnd/animations';
import type { UniqueIdentifier } from '@dnd-kit/core';

/**
 * Custom animate layout changes that feels more Apple-like
 */
const appleAnimateLayoutChanges: AnimateLayoutChanges = (args) => {
  const { isSorting, wasDragging } = args;

  if (isSorting || wasDragging) {
    return defaultAnimateLayoutChanges(args);
  }

  return true;
};

interface SortableItemProps {
  id: UniqueIdentifier;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  data?: Record<string, unknown>;
  handle?: boolean;
  style?: React.CSSProperties;
}

/**
 * Apple HIG-style Sortable Item
 *
 * @example
 * ```tsx
 * <SortableContext items={items}>
 *   {items.map(item => (
 *     <SortableItem key={item.id} id={item.id}>
 *       <Card>{item.content}</Card>
 *     </SortableItem>
 *   ))}
 * </SortableContext>
 * ```
 */
export const SortableItem = forwardRef<HTMLDivElement, SortableItemProps>(
  function SortableItem(
    { id, children, className, disabled = false, data, handle = false, style: customStyle },
    ref
  ) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
      isSorting,
    } = useSortable({
      id,
      disabled,
      data,
      animateLayoutChanges: appleAnimateLayoutChanges,
    });

    const style: React.CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition: transition || APPLE_TRANSITION,
      ...(isDragging ? placeholderStyles.default : {}),
      ...customStyle,
    };

    // If using handle, don't spread listeners on the container
    const containerListeners = handle ? {} : listeners;

    return (
      <div
        ref={(node) => {
          setNodeRef(node);
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        style={style}
        className={cn(
          'touch-none',
          !handle && 'cursor-grab active:cursor-grabbing',
          isDragging && 'relative z-50',
          isSorting && 'transition-transform',
          className
        )}
        {...attributes}
        {...containerListeners}
        data-sortable-id={id}
        data-is-dragging={isDragging}
      >
        {children}
      </div>
    );
  }
);

/**
 * Sortable Handle Component
 * Use within SortableItem when handle={true}
 */
interface SortableHandleProps {
  id: UniqueIdentifier;
  children: React.ReactNode;
  className?: string;
}

export function SortableHandle({ id, children, className }: SortableHandleProps) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <div
      className={cn(
        'cursor-grab active:cursor-grabbing touch-none',
        'select-none',
        className
      )}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}

/**
 * Hook to use sortable with more control
 */
export function useAppleSortable(id: UniqueIdentifier, disabled = false) {
  const sortable = useSortable({
    id,
    disabled,
    animateLayoutChanges: appleAnimateLayoutChanges,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition || APPLE_TRANSITION,
    opacity: sortable.isDragging ? 0.4 : 1,
    filter: sortable.isDragging ? 'grayscale(50%)' : 'none',
  };

  return {
    ...sortable,
    style,
    containerProps: {
      ref: sortable.setNodeRef,
      style,
      ...sortable.attributes,
      ...(sortable.listeners || {}),
      className: cn(
        'touch-none cursor-grab active:cursor-grabbing',
        sortable.isDragging && 'relative z-50'
      ),
    },
  };
}
