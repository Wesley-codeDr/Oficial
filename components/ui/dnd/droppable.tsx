'use client';

/**
 * Apple HIG-style Droppable Component
 * Generic wrapper for creating drop zones
 */

import React, { forwardRef } from 'react';
import { useDroppable, type UniqueIdentifier } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { dropZoneStyles, dragStateClasses } from '@/lib/dnd/animations';

interface DroppableProps {
  id: UniqueIdentifier;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  data?: Record<string, unknown>;
  acceptOnly?: string[];
  variant?: 'default' | 'highlighted' | 'subtle';
}

/**
 * Apple HIG-style Droppable wrapper
 *
 * @example
 * ```tsx
 * <Droppable id="column-1" data={{ type: 'column', status: 'todo' }}>
 *   <div>Drop items here</div>
 * </Droppable>
 * ```
 */
export const Droppable = forwardRef<HTMLDivElement, DroppableProps>(
  function Droppable(
    {
      id,
      children,
      className,
      disabled = false,
      data,
      acceptOnly,
      variant = 'default',
    },
    ref
  ) {
    const { setNodeRef, isOver, active } = useDroppable({
      id,
      disabled,
      data,
    });

    // Check if the dragged item is accepted
    const isAccepted = acceptOnly
      ? active?.data.current?.type && acceptOnly.includes(active.data.current.type as string)
      : true;

    const getDropZoneClasses = () => {
      if (!active) return '';

      if (isOver) {
        if (isAccepted) {
          return variant === 'highlighted'
            ? dragStateClasses.isOver
            : 'bg-ios-blue/5 border-ios-blue/20';
        }
        return dragStateClasses.isOverReject;
      }

      // Show subtle highlight when any drag is active
      return 'border-dashed';
    };

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
        className={cn(
          'transition-all duration-200',
          getDropZoneClasses(),
          className
        )}
        data-droppable={id}
        data-is-over={isOver}
        data-is-accepted={isAccepted}
      >
        {children}
      </div>
    );
  }
);

/**
 * Drop Indicator Line
 * Shows where the item will be dropped
 */
interface DropIndicatorProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  visible?: boolean;
}

export function DropIndicator({
  className,
  orientation = 'horizontal',
  visible = true,
}: DropIndicatorProps) {
  if (!visible) return null;

  return (
    <div
      className={cn(
        'absolute bg-ios-blue rounded-full transition-all duration-200',
        orientation === 'horizontal' ? 'h-0.5 w-full left-0' : 'w-0.5 h-full top-0',
        'animate-pulse',
        className
      )}
      style={{
        boxShadow: '0 0 8px rgba(0, 122, 255, 0.4)',
      }}
    />
  );
}

/**
 * Drop Zone Overlay
 * Full overlay for drop zones with Apple styling
 */
interface DropZoneOverlayProps {
  isOver: boolean;
  isAccepted?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function DropZoneOverlay({
  isOver,
  isAccepted = true,
  children,
  className,
}: DropZoneOverlayProps) {
  if (!isOver) return null;

  return (
    <div
      className={cn(
        'absolute inset-0 rounded-[inherit] pointer-events-none',
        'transition-all duration-200',
        'border-2',
        isAccepted
          ? 'bg-ios-blue/5 border-ios-blue/30'
          : 'bg-ios-red/5 border-ios-red/30',
        className
      )}
    >
      {children}
    </div>
  );
}
