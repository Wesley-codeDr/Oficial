/**
 * useDragAndDrop Hook
 *
 * Custom hook for drag and drop functionality
 */

import { useState, useCallback } from 'react'
import type { DragEvent } from 'react'

export interface UseDragAndDropOptions {
  onDragStart?: (e: DragEvent, taskId: string) => void
  onDragEnd?: (e: DragEvent) => void
  onDragOver?: (e: DragEvent, columnId: string) => void
  onDragLeave?: () => void
  onDrop?: (e: DragEvent, columnId: string) => void
}

export interface UseDragAndDropReturn {
  draggedTaskId: string | null
  dragOverColumn: string | null
  handleDragStart: (e: DragEvent, taskId: string) => void
  handleDragEnd: (e: DragEvent) => void
  handleDragOver: (e: DragEvent, columnId: string) => void
  handleDragLeave: () => void
  handleDrop: (e: DragEvent, columnId: string) => void
}

export function useDragAndDrop(options: UseDragAndDropOptions = {}): UseDragAndDropReturn {
  const {
    onDragStart,
    onDragEnd,
    onDragOver,
    onDragLeave,
    onDrop,
  } = options

  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null)

  const handleDragStart = useCallback((e: DragEvent, taskId: string) => {
    globalThis.setTimeout?.(() => {
      setDraggedTaskId(taskId)
    }, 0)
    e.dataTransfer.effectAllowed = 'move'
    onDragStart?.(e, taskId)
  }, [onDragStart])

  const handleDragEnd = useCallback((e: DragEvent) => {
    setDraggedTaskId(null)
    setDragOverColumn(null)
    onDragEnd?.(e)
  }, [onDragEnd])

  const handleDragOver = useCallback((e: DragEvent, columnId: string) => {
    e.preventDefault()
    if (dragOverColumn !== columnId) {
      setDragOverColumn(columnId)
    }
    onDragOver?.(e, columnId)
  }, [dragOverColumn, onDragOver])

  const handleDragLeave = useCallback(() => {
    setDragOverColumn(null)
    onDragLeave?.()
  }, [onDragLeave])

  const handleDrop = useCallback((e: DragEvent, columnId: string) => {
    e.preventDefault()
    setDragOverColumn(null)
    if (draggedTaskId) {
      onDrop?.(e, columnId)
      setDraggedTaskId(null)
    }
  }, [draggedTaskId, onDrop])

  return {
    draggedTaskId,
    dragOverColumn,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  }
}
