'use client'

import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'

import { cn } from '@/lib/utils'

interface SortableSectionProps {
  id: string
  children: React.ReactNode
}

export function SortableSection({ id, children }: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 0,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {children}
      <div
        {...attributes}
        {...listeners}
        className={cn(
          'absolute top-1/2 -left-8 -translate-y-1/2 p-2 cursor-grab text-slate-400 hover:text-slate-600 transition-colors',
          { 'cursor-grabbing': isDragging }
        )}
      >
        <GripVertical className="w-5 h-5" />
      </div>
    </div>
  )
}
