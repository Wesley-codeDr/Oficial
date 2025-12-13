import type { Meta, StoryObj } from '@storybook/react'
import { DndContext, DragEndEvent, useDraggable } from '@dnd-kit/core'
import { useState, ReactNode } from 'react'
import { Droppable } from '../droppable'
import { AppleDragOverlay } from '../drag-overlay'
import { useAppleSensors } from '@/lib/dnd/sensors'
import { Inbox, CheckCircle, Clock, AlertTriangle } from 'lucide-react'

/**
 * Droppable Component Stories
 *
 * Apple HIG 2025 compliant drop zone component.
 * Provides visual feedback when items are dragged over.
 */
const meta: Meta<typeof Droppable> = {
  title: 'DnD/Droppable',
  component: Droppable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A droppable zone component following Apple Human Interface Guidelines 2025.

## Features
- Visual feedback on drag over
- Accepts specific item types
- Customizable drop indicators
- Accessible announcements

## Usage
\`\`\`tsx
<Droppable id="drop-zone" accepts={['task', 'card']}>
  <div className="drop-area">
    Drop items here
  </div>
</Droppable>
\`\`\`
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-slate-100 dark:bg-slate-900 rounded-xl min-h-[400px] min-w-[600px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Droppable>

// Draggable item wrapper
const DraggableItem = ({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing transition-opacity ${isDragging ? 'opacity-40' : ''}`}
    >
      {children}
    </div>
  )
}

// Task card component
const TaskCard = ({ title, priority }: { title: string; priority: 'low' | 'medium' | 'high' }) => {
  const priorityColors = {
    low: 'border-l-green-500',
    medium: 'border-l-yellow-500',
    high: 'border-l-red-500',
  }

  return (
    <div className={`p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 border-l-4 ${priorityColors[priority]}`}>
      <p className="font-medium text-slate-800 dark:text-white text-sm">{title}</p>
    </div>
  )
}

export const Default: Story = {
  render: () => {
    const sensors = useAppleSensors()
    const [droppedItems, setDroppedItems] = useState<string[]>([])
    const [activeId, setActiveId] = useState<string | null>(null)

    const handleDragEnd = (event: DragEndEvent) => {
      setActiveId(null)
      if (event.over?.id === 'drop-zone' && !droppedItems.includes(event.active.id as string)) {
        setDroppedItems(prev => [...prev, event.active.id as string])
      }
    }

    const availableTasks = [
      { id: 'task-1', title: 'Review patient records', priority: 'high' as const },
      { id: 'task-2', title: 'Update documentation', priority: 'medium' as const },
      { id: 'task-3', title: 'Schedule follow-up', priority: 'low' as const },
    ].filter(task => !droppedItems.includes(task.id))

    return (
      <DndContext
        sensors={sensors}
        onDragStart={(e) => setActiveId(e.active.id as string)}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-8">
          {/* Source area */}
          <div className="space-y-3 w-64">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Available Tasks
            </h3>
            {availableTasks.map(task => (
              <DraggableItem key={task.id} id={task.id}>
                <TaskCard title={task.title} priority={task.priority} />
              </DraggableItem>
            ))}
            {availableTasks.length === 0 && (
              <p className="text-sm text-slate-400 italic">All tasks moved</p>
            )}
          </div>

          {/* Drop zone */}
          <Droppable id="drop-zone">
            <div className="w-64 min-h-[200px] p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl bg-white/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2 mb-4">
                <Inbox className="w-5 h-5 text-slate-400" />
                <h3 className="text-sm font-semibold text-slate-500">Drop Zone</h3>
              </div>
              <div className="space-y-2">
                {droppedItems.map(id => {
                  const task = [
                    { id: 'task-1', title: 'Review patient records', priority: 'high' as const },
                    { id: 'task-2', title: 'Update documentation', priority: 'medium' as const },
                    { id: 'task-3', title: 'Schedule follow-up', priority: 'low' as const },
                  ].find(t => t.id === id)!
                  return <TaskCard key={id} title={task.title} priority={task.priority} />
                })}
              </div>
            </div>
          </Droppable>
        </div>

        <AppleDragOverlay>
          {activeId && (
            <TaskCard
              title={[
                { id: 'task-1', title: 'Review patient records' },
                { id: 'task-2', title: 'Update documentation' },
                { id: 'task-3', title: 'Schedule follow-up' },
              ].find(t => t.id === activeId)?.title || ''}
              priority="medium"
            />
          )}
        </AppleDragOverlay>
      </DndContext>
    )
  },
}

// Kanban columns example
export const KanbanColumns: Story = {
  render: () => {
    const sensors = useAppleSensors()
    const [activeId, setActiveId] = useState<string | null>(null)
    const [columns, setColumns] = useState({
      todo: ['task-1', 'task-2'],
      inProgress: ['task-3'],
      done: [],
    })

    const tasks = {
      'task-1': { title: 'Avaliar paciente', priority: 'high' as const },
      'task-2': { title: 'Solicitar exames', priority: 'medium' as const },
      'task-3': { title: 'Prescrever medicação', priority: 'low' as const },
    }

    const handleDragEnd = (event: DragEndEvent) => {
      setActiveId(null)
      const { active, over } = event
      if (!over) return

      const taskId = active.id as string
      const targetColumn = over.id as keyof typeof columns

      // Find source column
      let sourceColumn: keyof typeof columns | null = null
      for (const [col, items] of Object.entries(columns)) {
        if (items.includes(taskId)) {
          sourceColumn = col as keyof typeof columns
          break
        }
      }

      if (sourceColumn && sourceColumn !== targetColumn) {
        setColumns(prev => ({
          ...prev,
          [sourceColumn!]: prev[sourceColumn!].filter(id => id !== taskId),
          [targetColumn]: [...prev[targetColumn], taskId],
        }))
      }
    }

    const columnConfig = {
      todo: { title: 'A Fazer', icon: Clock, color: 'text-slate-500' },
      inProgress: { title: 'Em Progresso', icon: AlertTriangle, color: 'text-yellow-500' },
      done: { title: 'Concluído', icon: CheckCircle, color: 'text-green-500' },
    }

    return (
      <DndContext
        sensors={sensors}
        onDragStart={(e) => setActiveId(e.active.id as string)}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4">
          {(Object.keys(columns) as Array<keyof typeof columns>).map(columnId => {
            const config = columnConfig[columnId]
            const Icon = config.icon

            return (
              <Droppable key={columnId} id={columnId}>
                <div className="w-56 min-h-[300px] p-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-white/10">
                  <div className="flex items-center gap-2 mb-4 px-2">
                    <Icon className={`w-5 h-5 ${config.color}`} />
                    <h3 className="font-semibold text-slate-700 dark:text-slate-200">
                      {config.title}
                    </h3>
                    <span className="ml-auto text-xs bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full text-slate-500 dark:text-slate-400">
                      {columns[columnId].length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {columns[columnId].map(taskId => (
                      <DraggableItem key={taskId} id={taskId}>
                        <TaskCard
                          title={tasks[taskId as keyof typeof tasks].title}
                          priority={tasks[taskId as keyof typeof tasks].priority}
                        />
                      </DraggableItem>
                    ))}
                  </div>
                </div>
              </Droppable>
            )
          })}
        </div>

        <AppleDragOverlay>
          {activeId && tasks[activeId as keyof typeof tasks] && (
            <TaskCard
              title={tasks[activeId as keyof typeof tasks].title}
              priority={tasks[activeId as keyof typeof tasks].priority}
            />
          )}
        </AppleDragOverlay>
      </DndContext>
    )
  },
}

// With accept filter
export const WithAcceptFilter: Story = {
  render: () => {
    const sensors = useAppleSensors()
    const [activeId, setActiveId] = useState<string | null>(null)
    const [message, setMessage] = useState('')

    const handleDragEnd = (event: DragEndEvent) => {
      setActiveId(null)
      if (event.over) {
        setMessage(`Dropped ${event.active.id} on ${event.over.id}`)
      } else {
        setMessage('Dropped outside')
      }
    }

    return (
      <DndContext
        sensors={sensors}
        onDragStart={(e) => setActiveId(e.active.id as string)}
        onDragEnd={handleDragEnd}
      >
        <div className="space-y-6">
          {/* Draggable items with different types */}
          <div className="flex gap-4">
            <DraggableItem id="urgent-task">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
                <p className="font-medium text-red-700 dark:text-red-300 text-sm">Urgent Task</p>
                <p className="text-xs text-red-500">Type: urgent</p>
              </div>
            </DraggableItem>

            <DraggableItem id="normal-task">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="font-medium text-blue-700 dark:text-blue-300 text-sm">Normal Task</p>
                <p className="text-xs text-blue-500">Type: normal</p>
              </div>
            </DraggableItem>
          </div>

          {/* Drop zones with different accepts */}
          <div className="flex gap-4">
            <Droppable id="urgent-zone">
              <div className="w-48 h-32 p-4 border-2 border-dashed border-red-300 dark:border-red-700 rounded-xl bg-red-50/50 dark:bg-red-900/20 flex items-center justify-center">
                <p className="text-sm text-red-500 text-center">
                  Urgent Only Zone
                </p>
              </div>
            </Droppable>

            <Droppable id="any-zone">
              <div className="w-48 h-32 p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-center">
                <p className="text-sm text-slate-500 text-center">
                  Accepts All
                </p>
              </div>
            </Droppable>
          </div>

          {message && (
            <p className="text-sm text-slate-600 dark:text-slate-400 p-2 bg-slate-200 dark:bg-slate-700 rounded">
              {message}
            </p>
          )}
        </div>

        <AppleDragOverlay>
          {activeId === 'urgent-task' && (
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
              <p className="font-medium text-red-700 dark:text-red-300 text-sm">Urgent Task</p>
            </div>
          )}
          {activeId === 'normal-task' && (
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="font-medium text-blue-700 dark:text-blue-300 text-sm">Normal Task</p>
            </div>
          )}
        </AppleDragOverlay>
      </DndContext>
    )
  },
}

// Visual states
export const VisualStates: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          Droppable Visual States
        </h3>

        <div className="grid grid-cols-3 gap-6">
          {/* Idle state */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Idle</p>
            <div className="w-full h-32 p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl bg-white/50 dark:bg-slate-800/50 flex items-center justify-center">
              <p className="text-sm text-slate-400">Drop items here</p>
            </div>
          </div>

          {/* Hover state */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Drag Over</p>
            <div className="w-full h-32 p-4 border-2 border-ios-blue rounded-xl bg-ios-blue/10 transform scale-[1.01] flex items-center justify-center shadow-lg shadow-ios-blue/10">
              <p className="text-sm text-ios-blue font-medium">Release to drop</p>
            </div>
          </div>

          {/* With content */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">With Content</p>
            <div className="w-full h-32 p-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 flex flex-col gap-2">
              <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded text-xs">Item 1</div>
              <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded text-xs">Item 2</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
