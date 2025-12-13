'use client';

/**
 * Sortable KPI Card
 * KPI card wrapper with @dnd-kit sortable integration
 */

import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { APPLE_TRANSITION } from '@/lib/dnd/animations';
import { appleSpring } from '@/lib/animations/presets';

interface SortableKpiCardProps {
  id: string;
  children: React.ReactElement | React.ReactNode;
  isDragging?: boolean;
}

/**
 * Sortable KPI Card with Apple HIG styling
 * Uses @dnd-kit for drag-and-drop, Framer Motion for hover effects
 */
export function SortableKpiCard({
  id,
  children,
  isDragging = false,
}: SortableKpiCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id,
    data: {
      type: 'kpi-card',
    },
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition || APPLE_TRANSITION,
  };

  const isCurrentlyDragging = isDragging || isSortableDragging;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group transition-all duration-200',
        isCurrentlyDragging && 'opacity-40 scale-95 z-50',
        'touch-none'
      )}
      whileHover={!isCurrentlyDragging ? { scale: 1.02 } : {}}
      transition={appleSpring}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="listitem"
      aria-roledescription="Reordenavel"
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
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ios-blue',
          isCurrentlyDragging && 'opacity-0'
        )}
        {...attributes}
        {...listeners}
        role="button"
        tabIndex={0}
        aria-label="Reordenar indicador"
        aria-roledescription="Alca de arrasto"
      >
        <GripVertical className="w-4 h-4 text-slate-500 dark:text-slate-400" />
      </div>

      {/* Card content */}
      <div className={cn('relative', isCurrentlyDragging && 'pointer-events-none')}>
        {children}
      </div>
    </motion.div>
  );
}
