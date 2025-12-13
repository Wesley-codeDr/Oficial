import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SortableList } from '../sortable-list'
import { GripVertical, User, Clock, AlertTriangle } from 'lucide-react'

/**
 * SortableList Component Stories
 *
 * Apple HIG 2025 compliant sortable list component.
 * Provides drag-and-drop reordering with smooth animations.
 */
const meta: Meta<typeof SortableList> = {
  title: 'DnD/SortableList',
  component: SortableList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A sortable list component following Apple Human Interface Guidelines 2025.

## Features
- Vertical or horizontal sorting
- Smooth reorder animations
- Drag overlay with elevation effect
- Touch and mouse support
- Keyboard navigation ready

## Usage
\`\`\`tsx
const [items, setItems] = useState(['A', 'B', 'C'])

<SortableList
  items={items}
  onReorder={setItems}
  renderItem={(item) => <Card>{item}</Card>}
/>
\`\`\`
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-slate-100 dark:bg-slate-900 rounded-xl min-w-[400px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SortableList>

// Sample item type
interface TaskItem {
  id: string
  title: string
  status: 'pending' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
}

// Sample task card component
const TaskCard = ({ task }: { task: TaskItem }) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
  }

  return (
    <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 group cursor-grab active:cursor-grabbing">
      <GripVertical className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors" />
      <div className="flex-1">
        <p className="font-medium text-slate-800 dark:text-slate-200">{task.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: () => {
    const [items, setItems] = useState<TaskItem[]>([
      { id: '1', title: 'Review patient files', status: 'pending', priority: 'high' },
      { id: '2', title: 'Schedule follow-up', status: 'pending', priority: 'medium' },
      { id: '3', title: 'Update documentation', status: 'in-progress', priority: 'low' },
      { id: '4', title: 'Team meeting', status: 'done', priority: 'medium' },
    ])

    return (
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
          Tasks (Drag to reorder)
        </h3>
        <SortableList
          items={items.map(item => item.id)}
          onReorder={(newOrder) => {
            const reordered = newOrder.map(id => items.find(item => item.id === id)!)
            setItems(reordered)
          }}
          renderItem={(id) => {
            const task = items.find(item => item.id === id)!
            return <TaskCard task={task} />
          }}
        />
      </div>
    )
  },
}

// Simple string list
export const SimpleList: Story = {
  render: () => {
    const [items, setItems] = useState(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'])

    return (
      <SortableList
        items={items}
        onReorder={setItems}
        renderItem={(item) => (
          <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <GripVertical className="w-4 h-4 text-slate-300" />
            <span className="text-slate-700 dark:text-slate-300">{item}</span>
          </div>
        )}
      />
    )
  },
}

// Patient queue example
interface Patient {
  id: string
  name: string
  waitTime: string
  acuity: 'red' | 'orange' | 'yellow' | 'green'
}

const PatientCard = ({ patient }: { patient: Patient }) => {
  const acuityColors = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
  }

  return (
    <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
      <div className={`w-3 h-3 rounded-full ${acuityColors[patient.acuity]}`} />
      <User className="w-5 h-5 text-slate-400" />
      <div className="flex-1">
        <p className="font-medium text-slate-800 dark:text-slate-200">{patient.name}</p>
      </div>
      <div className="flex items-center gap-1 text-slate-500 text-sm">
        <Clock className="w-4 h-4" />
        <span>{patient.waitTime}</span>
      </div>
    </div>
  )
}

export const PatientQueue: Story = {
  render: () => {
    const [patients, setPatients] = useState<Patient[]>([
      { id: 'p1', name: 'João Silva', waitTime: '45min', acuity: 'red' },
      { id: 'p2', name: 'Maria Santos', waitTime: '30min', acuity: 'orange' },
      { id: 'p3', name: 'Pedro Oliveira', waitTime: '20min', acuity: 'yellow' },
      { id: 'p4', name: 'Ana Costa', waitTime: '15min', acuity: 'green' },
    ])

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            Fila de Espera
          </h3>
          <span className="text-sm text-slate-500">{patients.length} pacientes</span>
        </div>
        <SortableList
          items={patients.map(p => p.id)}
          onReorder={(newOrder) => {
            const reordered = newOrder.map(id => patients.find(p => p.id === id)!)
            setPatients(reordered)
          }}
          renderItem={(id) => {
            const patient = patients.find(p => p.id === id)!
            return <PatientCard patient={patient} />
          }}
        />
      </div>
    )
  },
}

// Horizontal list
export const HorizontalList: Story = {
  render: () => {
    const [items, setItems] = useState(['1', '2', '3', '4', '5'])

    return (
      <SortableList
        items={items}
        onReorder={setItems}
        direction="horizontal"
        renderItem={(item) => (
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center text-white font-bold text-xl">
            {item}
          </div>
        )}
      />
    )
  },
}

// With disabled items
export const WithDisabledItems: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: '1', label: 'Draggable 1', disabled: false },
      { id: '2', label: 'Locked Item', disabled: true },
      { id: '3', label: 'Draggable 2', disabled: false },
      { id: '4', label: 'Draggable 3', disabled: false },
    ])

    return (
      <SortableList
        items={items.map(i => i.id)}
        onReorder={(newOrder) => {
          const reordered = newOrder.map(id => items.find(i => i.id === id)!)
          setItems(reordered)
        }}
        renderItem={(id) => {
          const item = items.find(i => i.id === id)!
          return (
            <div
              className={`p-4 rounded-xl border ${
                item.disabled
                  ? 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 opacity-60'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                {!item.disabled && <GripVertical className="w-4 h-4 text-slate-300" />}
                <span className={item.disabled ? 'text-slate-400' : 'text-slate-700 dark:text-slate-300'}>
                  {item.label}
                </span>
                {item.disabled && (
                  <span className="text-xs bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded">
                    Locked
                  </span>
                )}
              </div>
            </div>
          )
        }}
      />
    )
  },
}
