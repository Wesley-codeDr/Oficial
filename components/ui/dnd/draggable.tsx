'use client';

/**
 * Apple HIG-style Draggable Component
 * Generic wrapper for making elements draggable
 */

import React, { forwardRef } from 'react';
import { useDraggable, type UniqueIdentifier } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { dragOverlayStyles, placeholderStyles } from '@/lib/dnd/animations';

interface DraggableProps {
  id: UniqueIdentifier;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  data?: Record<string, unknown>;
  handle?: boolean;
}

/**
 * Apple HIG-style Draggable wrapper
 *
 * @example
 * ```tsx
 * <Draggable id="item-1">
 *   <Card>Content</Card>
 * </Draggable>
 * ```
 */
export const Draggable = forwardRef<HTMLDivElement, DraggableProps>(
  function Draggable(
    { id, children, className, disabled = false, data, handle = false },
    ref
  ) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      isDragging,
    } = useDraggable({
      id,
      disabled,
      data,
    });

    const style: React.CSSProperties = {
      transform: CSS.Translate.toString(transform),
      ...(isDragging ? placeholderStyles.default : {}),
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
          isDragging && 'z-50',
          className
        )}
        {...attributes}
        {...containerListeners}
      >
        {children}
      </div>
    );
  }
);

/**
 * Drag Handle Component
 * Use within Draggable when handle={true}
 */
interface DragHandleProps {
  children: React.ReactNode;
  className?: string;
  listeners?: ReturnType<typeof useDraggable>['listeners'];
  attributes?: ReturnType<typeof useDraggable>['attributes'];
}

export function DragHandle({
  children,
  className,
  listeners,
  attributes,
}: DragHandleProps) {
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
 * Hook to get drag handle props
 * Use with useDraggable when you need a separate handle
 */
export function useDragHandle(id: UniqueIdentifier, disabled = false) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled,
  });

  return {
    handleProps: { ...listeners, ...attributes },
    setNodeRef,
    transform,
    isDragging,
  };
}
