import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'
import type { ShiftTodo, StickyNote, ShiftInfo, TaskPriority, StickyNoteColor } from '@/types/shift-todo'
import { generateIdWithPrefix } from '@/lib/utils'

interface ShiftTodoState {
  // Data
  todos: ShiftTodo[]
  stickyNotes: StickyNote[]
  shiftInfo: ShiftInfo | null
  isLoaded: boolean

  // Todo Actions
  addTodo: (content: string, priority?: TaskPriority) => void
  toggleComplete: (id: string) => void
  togglePin: (id: string) => void
  deleteTodo: (id: string) => void
  updateTodo: (id: string, updates: Partial<ShiftTodo>) => void
  reorderTodos: (todos: ShiftTodo[]) => void
  clearCompleted: () => void

  // Sticky Note Actions
  addStickyNote: (content: string, color?: StickyNoteColor) => void
  updateStickyNote: (id: string, updates: Partial<StickyNote>) => void
  deleteStickyNote: (id: string) => void

  // Shift Actions
  startShift: (doctorName: string, specialty?: string) => void
  endShift: () => void
}

function generateId(): string {
  return generateIdWithPrefix('todo-')
}

function generateStickyNoteId(): string {
  return generateIdWithPrefix('note-')
}

export const useShiftTodoStore = create<ShiftTodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      stickyNotes: [],
      shiftInfo: null,
      isLoaded: false,

      addTodo: (content, priority = 'normal') => {
        const todos = get().todos
        const maxOrder = todos.length > 0 ? Math.max(...todos.map(t => t.order)) : 0

        const newTodo: ShiftTodo = {
          id: generateId(),
          content,
          priority,
          status: 'pending',
          isPinned: false,
          createdAt: new Date().toISOString(),
          order: maxOrder + 1,
        }

        set((state) => ({
          todos: [...state.todos, newTodo],
          isLoaded: true,
        }))
      },

      toggleComplete: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  status: todo.status === 'pending' ? 'completed' : 'pending',
                  completedAt: todo.status === 'pending' ? new Date().toISOString() : undefined,
                }
              : todo
          ),
        }))
      },

      togglePin: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, isPinned: !todo.isPinned } : todo
          ),
        }))
      },

      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }))
      },

      updateTodo: (id, updates) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updates } : todo
          ),
        }))
      },

      reorderTodos: (todos) => {
        set({ todos })
      },

      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.status !== 'completed'),
        }))
      },

      addStickyNote: (content, color = 'yellow') => {
        const newNote: StickyNote = {
          id: generateStickyNoteId(),
          content,
          color,
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          stickyNotes: [...state.stickyNotes, newNote],
        }))
      },

      updateStickyNote: (id, updates) => {
        set((state) => ({
          stickyNotes: state.stickyNotes.map((note) =>
            note.id === id ? { ...note, ...updates } : note
          ),
        }))
      },

      deleteStickyNote: (id) => {
        set((state) => ({
          stickyNotes: state.stickyNotes.filter((note) => note.id !== id),
        }))
      },

      startShift: (doctorName, specialty) => {
        set({
          shiftInfo: {
            startTime: new Date().toISOString(),
            doctorName,
            specialty,
          },
        })
      },

      endShift: () => {
        set({ shiftInfo: null })
      },
    }),
    {
      name: 'wellwave-shift-todo',
      partialize: (state) => ({
        todos: state.todos,
        stickyNotes: state.stickyNotes,
        shiftInfo: state.shiftInfo,
        isLoaded: state.isLoaded,
      }),
    }
  )
)

// Selector hooks for common queries
export const usePinnedTodos = () => {
  const todos = useShiftTodoStore((state) => state.todos)
  return todos
    .filter((t) => t.isPinned && t.status === 'pending')
    .sort((a, b) => a.order - b.order)
}

export const usePendingTodos = () => {
  const todos = useShiftTodoStore((state) => state.todos)
  return todos
    .filter((t) => !t.isPinned && t.status === 'pending')
    .sort((a, b) => a.order - b.order)
}

export const useCompletedTodos = () => {
  const todos = useShiftTodoStore((state) => state.todos)
  return todos
    .filter((t) => t.status === 'completed')
    .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
}

export const useStickyNotes = () =>
  useShiftTodoStore((state) => state.stickyNotes)

export const useShiftInfo = () =>
  useShiftTodoStore((state) => state.shiftInfo)

export const useTodoStats = () =>
  useShiftTodoStore(
    useShallow((state) => ({
      total: state.todos.length,
      pending: state.todos.filter((t) => t.status === 'pending').length,
      completed: state.todos.filter((t) => t.status === 'completed').length,
      urgent: state.todos.filter((t) => t.priority === 'urgent' && t.status === 'pending').length,
    }))
  )
