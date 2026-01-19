import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { KanbanTask, KanbanColumnStatus } from '@/types/kanban'
import { SAMPLE_PROJECTS, createBoardFromSample } from '@/lib/kanban/sample-projects'
import type { SampleProject } from '@/types/kanban'

interface KanbanState {
  // Data
  tasks: KanbanTask[]
  boardName: string
  boardDescription: string
  isLoaded: boolean

  // Actions
  setTasks: (tasks: KanbanTask[]) => void
  addTask: (task: Omit<KanbanTask, 'id' | 'createdAt' | 'updatedAt'>) => void
  addTasks: (tasks: Omit<KanbanTask, 'id' | 'createdAt' | 'updatedAt'>[]) => void
  updateTask: (id: string, updates: Partial<KanbanTask>) => void
  deleteTask: (id: string) => void
  moveTask: (taskId: string, newStatus: KanbanColumnStatus) => void
  loadSampleProject: (projectId: string) => void
  clearBoard: () => void
  setBoardInfo: (name: string, description?: string) => void
}

function generateId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set, get) => ({
      tasks: [],
      boardName: 'Meu Quadro',
      boardDescription: '',
      isLoaded: false,

      setTasks: (tasks) => set({ tasks, isLoaded: true }),

      addTask: (taskData) => {
        const now = new Date().toISOString()
        const newTask: KanbanTask = {
          ...taskData,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
        }
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }))
      },

      addTasks: (tasksData) => {
        const now = new Date().toISOString()
        const newTasks: KanbanTask[] = tasksData.map((taskData) => ({
          ...taskData,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
        }))
        set((state) => ({
          tasks: [...state.tasks, ...newTasks],
          isLoaded: true,
        }))
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updates, updatedAt: new Date().toISOString() }
              : task
          ),
        }))
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }))
      },

      moveTask: (taskId, newStatus) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
              : task
          ),
        }))
      },

      loadSampleProject: (projectId) => {
        const project = SAMPLE_PROJECTS.find((p) => p.id === projectId)
        if (!project) return

        const tasks = createBoardFromSample(project)
        set({
          tasks,
          boardName: project.name,
          boardDescription: project.description,
          isLoaded: true,
        })
      },

      clearBoard: () => {
        set({
          tasks: [],
          boardName: 'Meu Quadro',
          boardDescription: '',
          isLoaded: true,
        })
      },

      setBoardInfo: (name, description = '') => {
        set({ boardName: name, boardDescription: description })
      },
    }),
    {
      name: 'wellwave-kanban',
      partialize: (state) => ({
        tasks: state.tasks,
        boardName: state.boardName,
        boardDescription: state.boardDescription,
        isLoaded: state.isLoaded,
      }),
    }
  )
)

// Selector hooks for common queries
export const useKanbanTasks = () => useKanbanStore((state) => state.tasks)
export const useKanbanTasksByStatus = (status: KanbanColumnStatus) =>
  useKanbanStore((state) => state.tasks.filter((t) => t.status === status))
export const useKanbanBoardInfo = () =>
  useKanbanStore((state) => ({
    name: state.boardName,
    description: state.boardDescription,
  }))
export const useIsKanbanEmpty = () =>
  useKanbanStore((state) => state.tasks.length === 0)
