// Shift Todo Types for WellWave Dashboard
// Task management during medical shifts

export type TaskPriority = 'urgent' | 'normal' | 'low'

export type TaskStatus = 'pending' | 'completed'

export interface ShiftTodo {
  id: string
  content: string
  priority: TaskPriority
  status: TaskStatus
  isPinned: boolean
  reminderTime?: string // ISO timestamp
  createdAt: string
  completedAt?: string
  order: number
}

export type StickyNoteColor = 'yellow' | 'blue' | 'green' | 'pink' | 'purple'

export interface StickyNote {
  id: string
  content: string
  color: StickyNoteColor
  createdAt: string
}

export interface ShiftInfo {
  startTime: string // ISO timestamp
  doctorName: string
  specialty?: string
}

// Priority colors for display
export const TASK_PRIORITY_COLORS: Record<TaskPriority, {
  bg: string
  text: string
  border: string
  dot: string
}> = {
  urgent: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
    dot: 'bg-red-500',
  },
  normal: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
    dot: 'bg-blue-500',
  },
  low: {
    bg: 'bg-slate-50 dark:bg-slate-800/50',
    text: 'text-slate-500 dark:text-slate-400',
    border: 'border-slate-200 dark:border-slate-700',
    dot: 'bg-slate-400',
  },
}

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  urgent: 'Urgente',
  normal: 'Normal',
  low: 'Baixa',
}

export const STICKY_NOTE_COLORS: Record<StickyNoteColor, {
  bg: string
  border: string
}> = {
  yellow: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    border: 'border-yellow-300 dark:border-yellow-700',
  },
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    border: 'border-blue-300 dark:border-blue-700',
  },
  green: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    border: 'border-emerald-300 dark:border-emerald-700',
  },
  pink: {
    bg: 'bg-pink-100 dark:bg-pink-900/30',
    border: 'border-pink-300 dark:border-pink-700',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    border: 'border-purple-300 dark:border-purple-700',
  },
}
