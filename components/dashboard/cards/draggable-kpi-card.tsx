'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DraggableKpiCardProps {
  id: string;
  children: React.ReactElement | React.ReactNode;
  isDragging?: boolean;
  isDragOver?: boolean;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, id: string) => void;
}

/**
 * Draggable wrapper for KPI cards
 * Provides drag and drop functionality with visual feedback
 * 
 * Uses native HTML drag-and-drop (draggable="true" with React.DragEvent handlers)
 * wrapped inside motion.div for hover animations only.
 * This approach ensures correct TypeScript types for drag event handlers.
 */
export function DraggableKpiCard({
  id,
  children,
  isDragging = false,
  isDragOver = false,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
}: DraggableKpiCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
    // Add slight delay to allow drag image to be set
    setTimeout(() => {
      onDragStart(e, id);
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    onDragOver(e);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDrop(e, id);
  };

  return (
    <motion.div
      className={cn(
        'relative group transition-all duration-200',
        isDragging && 'opacity-50 scale-95 z-50',
        isDragOver && 'scale-105 z-40'
      )}
      whileHover={{ scale: 1.02 }}
    >
      {/* Native HTML draggable wrapper for proper DragEvent types */}
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={onDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={onDragLeave}
        onDrop={handleDrop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'cursor-move',
          isDragging && 'cursor-grabbing'
        )}
        style={isDragging ? { cursor: 'grabbing' } : undefined}
      >
        {/* Drag Handle - Visible on hover */}
        <div
          className={cn(
            'absolute -top-2 -left-2 z-50 w-8 h-8 rounded-full',
            'bg-white/80 dark:bg-slate-800/80 backdrop-blur-md',
            'border border-slate-200 dark:border-slate-700',
            'flex items-center justify-center',
            'shadow-lg transition-all duration-200',
            'opacity-0 group-hover:opacity-100',
            'hover:scale-110 hover:bg-white dark:hover:bg-slate-700',
            'pointer-events-auto'
          )}
          style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
          aria-label="Arrastar para reordenar card"
        >
          <GripVertical className="w-4 h-4 text-slate-500 dark:text-slate-400" />
        </div>

        {/* Drop indicator */}
        {isDragOver && (
          <div className="absolute inset-0 rounded-[32px] border-2 border-dashed border-primary/50 bg-primary/5 z-30 pointer-events-none" />
        )}

        {/* Card content */}
        <div className={cn('relative', isDragging && 'pointer-events-none')}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
