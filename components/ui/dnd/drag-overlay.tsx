'use client';

/**
 * Apple HIG-style Drag Overlay
 * Visual feedback component shown during drag operations
 */

import React from 'react';
import { DragOverlay as DndKitDragOverlay, type DragOverlayProps as DndKitDragOverlayProps } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { dropAnimationConfig, dragOverlayStyles } from '@/lib/dnd/animations';

interface AppleDragOverlayProps extends Omit<DndKitDragOverlayProps, 'dropAnimation'> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'subtle';
}

/**
 * Apple HIG-style Drag Overlay
 *
 * Provides visual feedback during drag with:
 * - Elevation effect (scale + shadow)
 * - Smooth drop animation with spring physics
 * - Cursor change to grabbing
 *
 * @example
 * ```tsx
 * const [activeId, setActiveId] = useState(null);
 *
 * <DndContext onDragStart={({ active }) => setActiveId(active.id)}>
 *   <Items />
 *   <AppleDragOverlay>
 *     {activeId ? <ItemPreview id={activeId} /> : null}
 *   </AppleDragOverlay>
 * </DndContext>
 * ```
 */
export function AppleDragOverlay({
  children,
  className,
  variant = 'default',
  ...props
}: AppleDragOverlayProps) {
  const styles = dragOverlayStyles[variant];

  return (
    <DndKitDragOverlay
      dropAnimation={dropAnimationConfig}
      {...props}
    >
      {children ? (
        <div
          className={cn(
            'pointer-events-none',
            'transition-shadow duration-200',
            className
          )}
          style={{
            ...styles,
            willChange: 'transform, box-shadow',
          }}
        >
          {children}
        </div>
      ) : null}
    </DndKitDragOverlay>
  );
}

/**
 * Simplified overlay wrapper that clones the dragged element
 * Use when you want the overlay to look exactly like the original
 */
interface CloneDragOverlayProps {
  activeElement: React.ReactNode | null;
  className?: string;
}

export function CloneDragOverlay({
  activeElement,
  className,
}: CloneDragOverlayProps) {
  return (
    <AppleDragOverlay className={className}>
      {activeElement}
    </AppleDragOverlay>
  );
}

/**
 * Overlay with rotation effect
 * Adds slight rotation during drag for a more dynamic feel
 */
interface RotatingDragOverlayProps extends AppleDragOverlayProps {
  rotation?: number;
}

export function RotatingDragOverlay({
  children,
  className,
  rotation = 3,
  ...props
}: RotatingDragOverlayProps) {
  return (
    <DndKitDragOverlay
      dropAnimation={dropAnimationConfig}
      {...props}
    >
      {children ? (
        <div
          className={cn(
            'pointer-events-none',
            'transition-all duration-200',
            className
          )}
          style={{
            transform: `scale(1.05) rotate(${rotation}deg)`,
            boxShadow: '0 25px 50px -10px rgba(0, 0, 0, 0.2), 0 15px 30px -5px rgba(0, 0, 0, 0.1)',
            willChange: 'transform, box-shadow',
          }}
        >
          {children}
        </div>
      ) : null}
    </DndKitDragOverlay>
  );
}

/**
 * Overlay with glassmorphism effect
 * Adds blur and transparency for a premium look
 */
interface GlassDragOverlayProps extends AppleDragOverlayProps {
  blur?: number;
}

export function GlassDragOverlay({
  children,
  className,
  blur = 20,
  ...props
}: GlassDragOverlayProps) {
  return (
    <DndKitDragOverlay
      dropAnimation={dropAnimationConfig}
      {...props}
    >
      {children ? (
        <div
          className={cn(
            'pointer-events-none',
            'bg-white/80 dark:bg-slate-900/80',
            'border border-white/20 dark:border-white/10',
            'transition-all duration-200',
            className
          )}
          style={{
            transform: 'scale(1.03)',
            backdropFilter: `blur(${blur}px)`,
            boxShadow: '0 20px 40px -5px rgba(0, 0, 0, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.08)',
            willChange: 'transform, box-shadow',
          }}
        >
          {children}
        </div>
      ) : null}
    </DndKitDragOverlay>
  );
}
