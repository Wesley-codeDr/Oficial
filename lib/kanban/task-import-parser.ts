/**
 * Task Import Parser Library
 *
 * Detects and parses task data from various formats:
 * - Plain text (line-separated, markdown lists, numbered lists)
 * - Trello JSON export
 * - Google Tasks export
 * - Todoist export
 * - CSV format
 */

import type { KanbanTask, KanbanColumnStatus } from '@/types/kanban'

// Source format types
export type ImportSourceFormat =
  | 'markdown'
  | 'plain-text'
  | 'numbered-list'
  | 'trello-json'
  | 'google-tasks'
  | 'todoist'
  | 'csv'
  | 'unknown'

// Detection result
export interface FormatDetectionResult {
  format: ImportSourceFormat
  confidence: number // 0-100
  taskCount: number
  preview: string[]
}

// Parsed task (intermediate format before KanbanTask)
export interface ParsedTask {
  title: string
  description?: string
  status: KanbanColumnStatus
  priority: KanbanTask['priority']
  labels: string[]
  dueDate?: string
}

// Priority detection keywords
const PRIORITY_KEYWORDS: Record<KanbanTask['priority'], string[]> = {
  critical: ['critical', 'urgent', 'asap', '🔴', '!!!', 'p0', 'blocker', 'crítico', 'urgente'],
  high: ['high', 'important', '🟠', '!!', 'p1', 'alta', 'importante'],
  medium: ['medium', 'normal', '🟡', '!', 'p2', 'média'],
  low: ['low', 'minor', '🟢', 'p3', 'baixa', 'menor'],
}

// Status detection keywords
const STATUS_KEYWORDS: Record<KanbanColumnStatus, string[]> = {
  done: ['done', 'completed', 'finished', 'closed', '✅', '✓', '[x]', 'concluído', 'feito', 'finalizado'],
  review: ['review', 'testing', 'qa', 'revisão', 'teste'],
  in_progress: ['in progress', 'doing', 'working', 'started', 'em progresso', 'fazendo', 'em andamento'],
  todo: ['todo', 'to do', 'pending', 'a fazer', 'pendente'],
  backlog: ['backlog', 'later', 'someday', 'ice box', 'depois', 'futuro'],
}

// Label extraction patterns
const LABEL_PATTERNS = [
  /#(\w+)/g,              // #tag
  /\[([^\]]+)\]/g,        // [tag]
  /@(\w+)/g,              // @category
]

// Date patterns
const DATE_PATTERNS = [
  /(\d{4}-\d{2}-\d{2})/,                    // ISO: 2024-01-15
  /(\d{2}\/\d{2}\/\d{4})/,                  // US: 01/15/2024
  /(\d{2}\/\d{2}\/\d{4})/,                  // BR: 15/01/2024
  /due:?\s*(\d{4}-\d{2}-\d{2})/i,           // due: 2024-01-15
  /deadline:?\s*(\d{4}-\d{2}-\d{2})/i,      // deadline: 2024-01-15
]

/**
 * Detect the format of clipboard/pasted content
 */
export function detectFormat(content: string): FormatDetectionResult {
  const trimmed = content.trim()

  if (!trimmed) {
    return { format: 'unknown', confidence: 0, taskCount: 0, preview: [] }
  }

  // Try JSON formats first
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      const json = JSON.parse(trimmed)

      // Trello JSON detection
      if (isTrelloJson(json)) {
        const tasks = parseTrelloJson(json)
        return {
          format: 'trello-json',
          confidence: 95,
          taskCount: tasks.length,
          preview: tasks.slice(0, 3).map(t => t.title),
        }
      }

      // Google Tasks detection
      if (isGoogleTasksJson(json)) {
        const tasks = parseGoogleTasksJson(json)
        return {
          format: 'google-tasks',
          confidence: 95,
          taskCount: tasks.length,
          preview: tasks.slice(0, 3).map(t => t.title),
        }
      }

      // Todoist detection
      if (isTodoistJson(json)) {
        const tasks = parseTodoistJson(json)
        return {
          format: 'todoist',
          confidence: 95,
          taskCount: tasks.length,
          preview: tasks.slice(0, 3).map(t => t.title),
        }
      }
    } catch {
      // Not valid JSON, continue to text formats
    }
  }

  // CSV detection
  if (isCSV(trimmed)) {
    const tasks = parseCSV(trimmed)
    return {
      format: 'csv',
      confidence: 85,
      taskCount: tasks.length,
      preview: tasks.slice(0, 3).map(t => t.title),
    }
  }

  // Markdown list detection
  if (isMarkdownList(trimmed)) {
    const tasks = parseMarkdownList(trimmed)
    return {
      format: 'markdown',
      confidence: 90,
      taskCount: tasks.length,
      preview: tasks.slice(0, 3).map(t => t.title),
    }
  }

  // Numbered list detection
  if (isNumberedList(trimmed)) {
    const tasks = parseNumberedList(trimmed)
    return {
      format: 'numbered-list',
      confidence: 85,
      taskCount: tasks.length,
      preview: tasks.slice(0, 3).map(t => t.title),
    }
  }

  // Plain text (line-separated)
  const tasks = parsePlainText(trimmed)
  return {
    format: 'plain-text',
    confidence: 70,
    taskCount: tasks.length,
    preview: tasks.slice(0, 3).map(t => t.title),
  }
}

/**
 * Parse content into tasks based on detected or specified format
 */
export function parseContent(content: string, format?: ImportSourceFormat): ParsedTask[] {
  const trimmed = content.trim()
  const detectedFormat = format || detectFormat(trimmed).format

  switch (detectedFormat) {
    case 'trello-json':
      return parseTrelloJson(JSON.parse(trimmed))
    case 'google-tasks':
      return parseGoogleTasksJson(JSON.parse(trimmed))
    case 'todoist':
      return parseTodoistJson(JSON.parse(trimmed))
    case 'csv':
      return parseCSV(trimmed)
    case 'markdown':
      return parseMarkdownList(trimmed)
    case 'numbered-list':
      return parseNumberedList(trimmed)
    case 'plain-text':
    default:
      return parsePlainText(trimmed)
  }
}

/**
 * Convert parsed tasks to KanbanTask format
 */
export function convertToKanbanTasks(parsedTasks: ParsedTask[]): Omit<KanbanTask, 'id' | 'createdAt' | 'updatedAt'>[] {
  return parsedTasks.map(task => ({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    labels: task.labels,
    dueDate: task.dueDate,
  }))
}

// ============ Format Detection Helpers ============

function isTrelloJson(json: unknown): boolean {
  if (Array.isArray(json)) {
    return json.some(item =>
      typeof item === 'object' &&
      item !== null &&
      ('name' in item || 'cards' in item)
    )
  }
  if (typeof json === 'object' && json !== null) {
    const obj = json as Record<string, unknown>
    return 'cards' in obj || 'lists' in obj || 'board' in obj
  }
  return false
}

function isGoogleTasksJson(json: unknown): boolean {
  if (typeof json === 'object' && json !== null) {
    const obj = json as Record<string, unknown>
    return 'kind' in obj && typeof obj.kind === 'string' &&
           (obj.kind.includes('tasks') || 'items' in obj)
  }
  if (Array.isArray(json)) {
    return json.some(item =>
      typeof item === 'object' &&
      item !== null &&
      'title' in item &&
      ('status' in item || 'completed' in item)
    )
  }
  return false
}

function isTodoistJson(json: unknown): boolean {
  if (Array.isArray(json)) {
    return json.some(item =>
      typeof item === 'object' &&
      item !== null &&
      'content' in item &&
      ('project_id' in item || 'priority' in item)
    )
  }
  return false
}

function isCSV(content: string): boolean {
  const lines = content.split('\n').filter(l => l.trim())
  if (lines.length < 2) return false

  // Check if first line looks like a header with commas
  const firstLine = lines[0]
  if (!firstLine) return false
  const commaCount = (firstLine.match(/,/g) || []).length

  // Must have at least one comma and header-like content
  if (commaCount < 1) return false

  // Check if other lines have similar comma count
  const secondLine = lines[1]
  if (!secondLine) return false
  const secondCommaCount = (secondLine.match(/,/g) || []).length

  return Math.abs(commaCount - secondCommaCount) <= 1
}

function isMarkdownList(content: string): boolean {
  const lines = content.split('\n')
  const listPatterns = /^\s*[-*•+]\s+|\s*\[[ x]\]\s+/i
  const listLines = lines.filter(line => listPatterns.test(line))
  return listLines.length >= 1 && listLines.length / lines.length > 0.3
}

function isNumberedList(content: string): boolean {
  const lines = content.split('\n')
  const numberedPattern = /^\s*\d+[.\)\-]\s+/
  const numberedLines = lines.filter(line => numberedPattern.test(line))
  return numberedLines.length >= 1 && numberedLines.length / lines.length > 0.3
}

// ============ Parsers ============

function parseTrelloJson(json: unknown): ParsedTask[] {
  const tasks: ParsedTask[] = []

  // Handle array of cards
  if (Array.isArray(json)) {
    for (const item of json) {
      if (typeof item === 'object' && item !== null) {
        const card = item as Record<string, unknown>
        if ('name' in card && typeof card.name === 'string') {
          tasks.push(createTaskFromTrelloCard(card))
        }
        // Handle lists with cards
        if ('cards' in card && Array.isArray(card.cards)) {
          for (const c of card.cards) {
            if (typeof c === 'object' && c !== null && 'name' in c) {
              tasks.push(createTaskFromTrelloCard(c as Record<string, unknown>))
            }
          }
        }
      }
    }
  }

  // Handle single board object
  if (typeof json === 'object' && json !== null && !Array.isArray(json)) {
    const board = json as Record<string, unknown>
    if ('cards' in board && Array.isArray(board.cards)) {
      for (const card of board.cards) {
        if (typeof card === 'object' && card !== null && 'name' in card) {
          tasks.push(createTaskFromTrelloCard(card as Record<string, unknown>))
        }
      }
    }
  }

  return tasks
}

function createTaskFromTrelloCard(card: Record<string, unknown>): ParsedTask {
  const name = String(card.name || '')
  const desc = card.desc ? String(card.desc) : undefined
  const labels = Array.isArray(card.labels)
    ? card.labels.map(l => typeof l === 'object' && l !== null && 'name' in l ? String((l as Record<string, unknown>).name) : '').filter(Boolean)
    : []

  return {
    title: name,
    description: desc,
    status: card.closed ? 'done' : 'todo',
    priority: detectPriority(name + ' ' + (desc || '')),
    labels,
    dueDate: card.due ? String(card.due).split('T')[0] : undefined,
  }
}

function parseGoogleTasksJson(json: unknown): ParsedTask[] {
  const tasks: ParsedTask[] = []

  // Handle Google Tasks API response
  if (typeof json === 'object' && json !== null && 'items' in json) {
    const obj = json as Record<string, unknown>
    if (Array.isArray(obj.items)) {
      for (const item of obj.items) {
        if (typeof item === 'object' && item !== null && 'title' in item) {
          tasks.push(createTaskFromGoogleTask(item as Record<string, unknown>))
        }
      }
    }
  }

  // Handle array of tasks
  if (Array.isArray(json)) {
    for (const item of json) {
      if (typeof item === 'object' && item !== null && 'title' in item) {
        tasks.push(createTaskFromGoogleTask(item as Record<string, unknown>))
      }
    }
  }

  return tasks
}

function createTaskFromGoogleTask(task: Record<string, unknown>): ParsedTask {
  const title = String(task.title || '')
  const notes = task.notes ? String(task.notes) : undefined
  const status = task.status === 'completed' || task.completed ? 'done' : 'todo'

  return {
    title,
    description: notes,
    status,
    priority: detectPriority(title + ' ' + (notes || '')),
    labels: extractLabels(title),
    dueDate: task.due ? String(task.due).split('T')[0] : undefined,
  }
}

function parseTodoistJson(json: unknown): ParsedTask[] {
  const tasks: ParsedTask[] = []

  if (Array.isArray(json)) {
    for (const item of json) {
      if (typeof item === 'object' && item !== null && 'content' in item) {
        const task = item as Record<string, unknown>
        const content = String(task.content || '')
        const description = task.description ? String(task.description) : undefined

        // Todoist priority: 1 = urgent, 4 = normal
        let priority: KanbanTask['priority'] = 'medium'
        if (typeof task.priority === 'number') {
          if (task.priority === 1) priority = 'critical'
          else if (task.priority === 2) priority = 'high'
          else if (task.priority === 3) priority = 'medium'
          else priority = 'low'
        }

        const labels = Array.isArray(task.labels)
          ? task.labels.map(l => String(l))
          : []

        tasks.push({
          title: content,
          description,
          status: task.checked || task.is_completed ? 'done' : 'todo',
          priority,
          labels,
          dueDate: task.due ? (typeof task.due === 'object' && task.due !== null && 'date' in task.due ? String((task.due as Record<string, unknown>).date) : String(task.due)) : undefined,
        })
      }
    }
  }

  return tasks
}

function parseCSV(content: string): ParsedTask[] {
  const lines = content.split('\n').filter(l => l.trim())
  if (lines.length < 2) return []

  const firstLine = lines[0]
  if (!firstLine) return []

  const headers = firstLine.split(',').map(h => h.trim().toLowerCase())
  const tasks: ParsedTask[] = []

  // Find column indices
  const titleIdx = headers.findIndex(h => ['title', 'name', 'task', 'content', 'título', 'tarefa'].includes(h))
  const descIdx = headers.findIndex(h => ['description', 'desc', 'notes', 'descrição', 'notas'].includes(h))
  const statusIdx = headers.findIndex(h => ['status', 'state', 'estado'].includes(h))
  const priorityIdx = headers.findIndex(h => ['priority', 'prioridade'].includes(h))
  const labelsIdx = headers.findIndex(h => ['labels', 'tags', 'etiquetas'].includes(h))
  const dueDateIdx = headers.findIndex(h => ['due', 'due date', 'deadline', 'prazo', 'data'].includes(h))

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (!line) continue

    const values = parseCSVLine(line)
    const title = titleIdx >= 0 ? values[titleIdx] : values[0]

    if (!title?.trim()) continue

    tasks.push({
      title: title.trim(),
      description: descIdx >= 0 ? values[descIdx]?.trim() : undefined,
      status: statusIdx >= 0 ? mapStatusString(values[statusIdx]) : 'todo',
      priority: priorityIdx >= 0 ? mapPriorityString(values[priorityIdx]) : detectPriority(title),
      labels: labelsIdx >= 0 && values[labelsIdx] ? values[labelsIdx].split(/[;|]/).map(l => l.trim()).filter(Boolean) : extractLabels(title),
      dueDate: dueDateIdx >= 0 ? values[dueDateIdx]?.trim() : undefined,
    })
  }

  return tasks
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)

  return result.map(v => v.trim().replace(/^"|"$/g, ''))
}

function parseMarkdownList(content: string): ParsedTask[] {
  const lines = content.split('\n')
  const tasks: ParsedTask[] = []

  for (const line of lines) {
    const trimmed = line.trim()

    // Match: - [ ] Task, - [x] Task, - Task, * Task, • Task, + Task
    const match = trimmed.match(/^[-*•+]\s*(?:\[([ x])\]\s*)?(.+)$/i)

    if (match) {
      const isCompleted = match[1]?.toLowerCase() === 'x'
      const taskText = match[2]?.trim()

      if (taskText) {
        tasks.push({
          title: cleanTaskTitle(taskText),
          description: undefined,
          status: isCompleted ? 'done' : detectStatus(taskText),
          priority: detectPriority(taskText),
          labels: extractLabels(taskText),
          dueDate: extractDate(taskText),
        })
      }
    }
  }

  return tasks
}

function parseNumberedList(content: string): ParsedTask[] {
  const lines = content.split('\n')
  const tasks: ParsedTask[] = []

  for (const line of lines) {
    const trimmed = line.trim()

    // Match: 1. Task, 1) Task, 1 - Task
    const match = trimmed.match(/^\d+[.\)\-]\s*(.+)$/)

    if (match) {
      const taskText = match[1]?.trim()

      if (taskText) {
        tasks.push({
          title: cleanTaskTitle(taskText),
          description: undefined,
          status: detectStatus(taskText),
          priority: detectPriority(taskText),
          labels: extractLabels(taskText),
          dueDate: extractDate(taskText),
        })
      }
    }
  }

  return tasks
}

function parsePlainText(content: string): ParsedTask[] {
  const lines = content.split('\n').filter(l => l.trim())
  const tasks: ParsedTask[] = []

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed && trimmed.length >= 2) {
      tasks.push({
        title: cleanTaskTitle(trimmed),
        description: undefined,
        status: detectStatus(trimmed),
        priority: detectPriority(trimmed),
        labels: extractLabels(trimmed),
        dueDate: extractDate(trimmed),
      })
    }
  }

  return tasks
}

// ============ Utility Functions ============

function detectPriority(text: string): KanbanTask['priority'] {
  const lowerText = text.toLowerCase()

  for (const [priority, keywords] of Object.entries(PRIORITY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        return priority as KanbanTask['priority']
      }
    }
  }

  return 'medium'
}

function detectStatus(text: string): KanbanColumnStatus {
  const lowerText = text.toLowerCase()

  for (const [status, keywords] of Object.entries(STATUS_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        return status as KanbanColumnStatus
      }
    }
  }

  return 'todo'
}

function mapStatusString(status: string | undefined): KanbanColumnStatus {
  if (!status) return 'todo'
  return detectStatus(status)
}

function mapPriorityString(priority: string | undefined): KanbanTask['priority'] {
  if (!priority) return 'medium'
  return detectPriority(priority)
}

function extractLabels(text: string): string[] {
  const labels: string[] = []

  for (const pattern of LABEL_PATTERNS) {
    const matches = text.matchAll(pattern)
    for (const match of matches) {
      if (match[1] && !labels.includes(match[1])) {
        labels.push(match[1])
      }
    }
  }

  return labels
}

function extractDate(text: string): string | undefined {
  for (const pattern of DATE_PATTERNS) {
    const match = text.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  return undefined
}

function cleanTaskTitle(title: string): string {
  let cleaned = title

  // Remove priority markers
  cleaned = cleaned.replace(/\[(critical|high|medium|low|p[0-3])\]/gi, '')
  cleaned = cleaned.replace(/!{1,3}/g, '')

  // Remove status markers
  cleaned = cleaned.replace(/\[(done|completed|in progress|todo|backlog)\]/gi, '')

  // Remove label markers (keep in labels array)
  cleaned = cleaned.replace(/#\w+/g, '')
  cleaned = cleaned.replace(/@\w+/g, '')

  // Remove date markers
  cleaned = cleaned.replace(/due:?\s*\d{4}-\d{2}-\d{2}/gi, '')
  cleaned = cleaned.replace(/deadline:?\s*\d{4}-\d{2}-\d{2}/gi, '')

  // Clean up whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim()

  return cleaned
}

/**
 * Generate import statistics
 */
export interface ImportStats {
  totalTasks: number
  byStatus: Record<KanbanColumnStatus, number>
  byPriority: Record<KanbanTask['priority'], number>
  withDueDate: number
  withLabels: number
}

export function getImportStats(tasks: ParsedTask[]): ImportStats {
  const stats: ImportStats = {
    totalTasks: tasks.length,
    byStatus: { backlog: 0, todo: 0, in_progress: 0, review: 0, done: 0 },
    byPriority: { low: 0, medium: 0, high: 0, critical: 0 },
    withDueDate: 0,
    withLabels: 0,
  }

  for (const task of tasks) {
    stats.byStatus[task.status]++
    stats.byPriority[task.priority]++
    if (task.dueDate) stats.withDueDate++
    if (task.labels.length > 0) stats.withLabels++
  }

  return stats
}

/**
 * Format source name for display
 */
export const SOURCE_LABELS: Record<ImportSourceFormat, string> = {
  'markdown': 'Lista Markdown',
  'plain-text': 'Texto Simples',
  'numbered-list': 'Lista Numerada',
  'trello-json': 'Trello',
  'google-tasks': 'Google Tasks',
  'todoist': 'Todoist',
  'csv': 'Planilha CSV',
  'unknown': 'Desconhecido',
}

export const SOURCE_ICONS: Record<ImportSourceFormat, string> = {
  'markdown': 'FileText',
  'plain-text': 'AlignLeft',
  'numbered-list': 'ListOrdered',
  'trello-json': 'Trello',
  'google-tasks': 'CheckSquare',
  'todoist': 'Check',
  'csv': 'Table',
  'unknown': 'HelpCircle',
}
