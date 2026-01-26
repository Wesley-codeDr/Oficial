import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { KanbanTask, KanbanStatus } from '@/lib/types/medical'
import { SAMPLE_PROJECTS, createBoardFromSample, detectBestSampleProject } from '@/lib/kanban/sample-projects'
import { generateIdWithPrefix } from '@/lib/utils'

interface KanbanState {
  // Data
  tasks: KanbanTask[]
  boardName: string
  boardDescription: string
  isLoaded: boolean

  // Actions
  setTasks: (tasks: KanbanTask[]) => void
  addTask: (task: Omit<KanbanTask, 'id'>) => void
  addTasks: (tasks: Omit<KanbanTask, 'id'>[]) => void
  updateTask: (id: string, updates: Partial<KanbanTask>) => void
  deleteTask: (id: string) => void
  moveTask: (taskId: string, newStatus: KanbanStatus) => void
  loadSampleProject: (projectId: string) => void
  clearBoard: () => void
  setBoardInfo: (name: string, description?: string) => void
}

function generateId(): string {
  return generateIdWithPrefix('task-')
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set, _get) => {
      const bestSample = detectBestSampleProject()
      const initialTasks = createBoardFromSample(bestSample)
      
      return {
        tasks: initialTasks,
        boardName: bestSample.name,
        boardDescription: bestSample.description,
        isLoaded: true,

        setTasks: (tasks) => set({ tasks, isLoaded: true }),

        addTask: (taskData) => {
          const newTask: KanbanTask = {
            ...taskData,
            id: generateId(),
          }
          set((state) => ({
            tasks: [...state.tasks, newTask],
          }))
        },

        addTasks: (tasksData) => {
          const newTasks: KanbanTask[] = tasksData.map((taskData) => ({
            ...taskData,
            id: generateId(),
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
                ? { ...task, ...updates }
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
                ? { ...task, status: newStatus }
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
          const bestSample = detectBestSampleProject()
          const tasks = createBoardFromSample(bestSample)
          
          set({
            tasks,
            boardName: bestSample.name,
            boardDescription: bestSample.description,
            isLoaded: true,
          })
        },

        setBoardInfo: (name, description = '') => {
          set({ boardName: name, boardDescription: description })
        },
      }
    },
    {
      name: 'wellwave-kanban-v2', // Changed name to force reset to correct data structure
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
export const useKanbanTasksByStatus = (status: KanbanStatus) =>
  useKanbanStore((state) => state.tasks.filter((t) => t.status === status))
export const useIsKanbanEmpty = () => useKanbanStore((state) => state.tasks.length === 0)
export const useKanbanBoardInfo = () =>
  useKanbanStore((state) => ({
    name: state.boardName,
    description: state.boardDescription,
  }))
