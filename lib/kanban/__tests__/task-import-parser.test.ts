/**
 * Unit tests for Task Import Parser
 */
import { describe, test, expect } from 'vitest'
import {
  detectFormat,
  parseContent,
  convertToKanbanTasks,
  getImportStats,
} from '../task-import-parser'

describe('Task Import Parser', () => {
  describe('detectFormat', () => {
    test('should detect markdown list format', () => {
      const content = `- Task one
- Task two
- Task three`

      const result = detectFormat(content)

      expect(result.format).toBe('markdown')
      expect(result.taskCount).toBe(3)
      expect(result.confidence).toBeGreaterThan(80)
    })

    test('should detect markdown checkbox format', () => {
      const content = `- [ ] Pending task
- [x] Completed task
- [ ] Another pending`

      const result = detectFormat(content)

      expect(result.format).toBe('markdown')
      expect(result.taskCount).toBe(3)
    })

    test('should detect numbered list format', () => {
      const content = `1. First task
2. Second task
3. Third task`

      const result = detectFormat(content)

      expect(result.format).toBe('numbered-list')
      expect(result.taskCount).toBe(3)
    })

    test('should detect plain text format', () => {
      const content = `Task one
Task two
Task three`

      const result = detectFormat(content)

      expect(result.format).toBe('plain-text')
      expect(result.taskCount).toBe(3)
    })

    test('should return unknown for empty content', () => {
      const result = detectFormat('')

      expect(result.format).toBe('unknown')
      expect(result.taskCount).toBe(0)
    })
  })

  describe('parseContent', () => {
    test('should parse markdown list', () => {
      const content = `- Task one
- Task two #frontend
- [x] Completed task`

      const tasks = parseContent(content, 'markdown')

      expect(tasks.length).toBe(3)
      expect(tasks[0].title).toBe('Task one')
      expect(tasks[1].labels).toContain('frontend')
      expect(tasks[2].status).toBe('done')
    })

    test('should detect priority keywords', () => {
      const content = `- Critical bug fix urgent
- High priority feature
- Normal task`

      const tasks = parseContent(content, 'markdown')

      expect(tasks[0].priority).toBe('critical')
      expect(tasks[1].priority).toBe('high')
      expect(tasks[2].priority).toBe('medium')
    })

    test('should detect status keywords', () => {
      const content = `- In progress task
- Done completed task
- Backlog later task
- Todo pending task`

      const tasks = parseContent(content, 'plain-text')

      expect(tasks[0].status).toBe('in_progress')
      expect(tasks[1].status).toBe('done')
      expect(tasks[2].status).toBe('backlog')
      expect(tasks[3].status).toBe('todo')
    })

    test('should extract labels from hashtags', () => {
      const content = `- Task #frontend #urgent
- Another task #backend`

      const tasks = parseContent(content, 'markdown')

      expect(tasks[0].labels).toContain('frontend')
      expect(tasks[0].labels).toContain('urgent')
      expect(tasks[1].labels).toContain('backend')
    })

    test('should parse numbered list', () => {
      const content = `1. First task
2. Second task
3. Third task`

      const tasks = parseContent(content, 'numbered-list')

      expect(tasks.length).toBe(3)
      expect(tasks[0].title).toBe('First task')
      expect(tasks[2].title).toBe('Third task')
    })

    test('should parse CSV format', () => {
      const content = `title,status,priority
Task One,todo,high
Task Two,done,low
Task Three,in_progress,medium`

      const tasks = parseContent(content, 'csv')

      expect(tasks.length).toBe(3)
      expect(tasks[0].title).toBe('Task One')
      expect(tasks[0].status).toBe('todo')
      expect(tasks[0].priority).toBe('high')
      expect(tasks[1].status).toBe('done')
    })
  })

  describe('convertToKanbanTasks', () => {
    test('should convert parsed tasks to kanban format', () => {
      const parsedTasks = [
        {
          title: 'Test task',
          status: 'todo' as const,
          priority: 'high' as const,
          labels: ['test'],
        },
      ]

      const kanbanTasks = convertToKanbanTasks(parsedTasks)

      expect(kanbanTasks.length).toBe(1)
      expect(kanbanTasks[0].title).toBe('Test task')
      expect(kanbanTasks[0].status).toBe('todo')
      expect(kanbanTasks[0].priority).toBe('high')
      expect(kanbanTasks[0].labels).toEqual(['test'])
    })
  })

  describe('getImportStats', () => {
    test('should calculate import statistics', () => {
      const parsedTasks = [
        { title: 'Task 1', status: 'todo' as const, priority: 'high' as const, labels: ['test'], dueDate: '2024-01-15' },
        { title: 'Task 2', status: 'done' as const, priority: 'low' as const, labels: [] },
        { title: 'Task 3', status: 'in_progress' as const, priority: 'critical' as const, labels: ['urgent'] },
      ]

      const stats = getImportStats(parsedTasks)

      expect(stats.totalTasks).toBe(3)
      expect(stats.byStatus.todo).toBe(1)
      expect(stats.byStatus.done).toBe(1)
      expect(stats.byStatus.in_progress).toBe(1)
      expect(stats.byPriority.high).toBe(1)
      expect(stats.byPriority.critical).toBe(1)
      expect(stats.withDueDate).toBe(1)
      expect(stats.withLabels).toBe(2)
    })
  })

  describe('Trello JSON parsing', () => {
    test('should parse Trello card array', () => {
      const trelloJson = JSON.stringify([
        { name: 'Card 1', desc: 'Description 1', closed: false },
        { name: 'Card 2', desc: 'Description 2', closed: true },
      ])

      const result = detectFormat(trelloJson)
      expect(result.format).toBe('trello-json')
      expect(result.taskCount).toBe(2)

      const tasks = parseContent(trelloJson, 'trello-json')
      expect(tasks[0].title).toBe('Card 1')
      expect(tasks[0].description).toBe('Description 1')
      expect(tasks[1].status).toBe('done')
    })
  })

  describe('Google Tasks JSON parsing', () => {
    test('should parse Google Tasks format', () => {
      const googleTasksJson = JSON.stringify({
        kind: 'tasks#tasks',
        items: [
          { title: 'Google Task 1', status: 'needsAction' },
          { title: 'Google Task 2', status: 'completed' },
        ],
      })

      const result = detectFormat(googleTasksJson)
      expect(result.format).toBe('google-tasks')
      expect(result.taskCount).toBe(2)

      const tasks = parseContent(googleTasksJson, 'google-tasks')
      expect(tasks[0].title).toBe('Google Task 1')
      expect(tasks[1].status).toBe('done')
    })
  })

  describe('Todoist JSON parsing', () => {
    test('should parse Todoist format', () => {
      const todoistJson = JSON.stringify([
        { content: 'Todoist Task 1', priority: 1, checked: false },
        { content: 'Todoist Task 2', priority: 4, checked: true },
      ])

      const result = detectFormat(todoistJson)
      expect(result.format).toBe('todoist')
      expect(result.taskCount).toBe(2)

      const tasks = parseContent(todoistJson, 'todoist')
      expect(tasks[0].title).toBe('Todoist Task 1')
      expect(tasks[0].priority).toBe('critical')
      expect(tasks[1].status).toBe('done')
    })
  })
})
