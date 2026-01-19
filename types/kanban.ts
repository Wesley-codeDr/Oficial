// Kanban Board Types for WellWave
// Task/Project management for healthcare professionals

export type KanbanColumnStatus = 'backlog' | 'todo' | 'in_progress' | 'review' | 'done'

export interface KanbanTask {
  id: string
  title: string
  description?: string
  status: KanbanColumnStatus
  priority: 'low' | 'medium' | 'high' | 'critical'
  labels: string[]
  dueDate?: string
  createdAt: string
  updatedAt: string
}

export interface KanbanColumn {
  id: KanbanColumnStatus
  title: string
  color: string
  tasks: KanbanTask[]
}

export interface KanbanBoard {
  id: string
  name: string
  description?: string
  columns: KanbanColumn[]
  createdAt: string
  updatedAt: string
}

export interface SampleProject {
  id: string
  name: string
  description: string
  icon: string
  useCase: 'software' | 'personal' | 'content' | 'medical'
  tasks: Omit<KanbanTask, 'id' | 'createdAt' | 'updatedAt'>[]
}

// Column configuration
export const KANBAN_COLUMNS: Omit<KanbanColumn, 'tasks'>[] = [
  { id: 'backlog', title: 'Backlog', color: 'slate' },
  { id: 'todo', title: 'A Fazer', color: 'blue' },
  { id: 'in_progress', title: 'Em Progresso', color: 'amber' },
  { id: 'review', title: 'Revisão', color: 'purple' },
  { id: 'done', title: 'Concluído', color: 'green' },
]

// Priority colors
export const PRIORITY_COLORS: Record<KanbanTask['priority'], string> = {
  low: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  medium: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  high: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  critical: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
}

// Priority labels in Portuguese
export const PRIORITY_LABELS: Record<KanbanTask['priority'], string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
  critical: 'Crítica',
}
