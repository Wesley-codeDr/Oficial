import type { Meta, StoryObj } from '@storybook/react'
import { DndContext, DragEndEvent, useDraggable } from '@dnd-kit/core'
import { useState, ReactNode } from 'react'
import { AppleDragOverlay, RotatingDragOverlay, GlassDragOverlay } from '../drag-overlay'
import { useAppleSensors } from '@/lib/dnd/sensors'

/**
 * DragOverlay Component Stories
 *
 * Apple HIG 2025 compliant drag overlay variants.
 * Shows the item being dragged with elevation and visual effects.
 */
const meta: Meta = {
  title: 'DnD/DragOverlay',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Drag overlay components following Apple Human Interface Guidelines 2025.

## Variants
- **AppleDragOverlay**: Standard elevation with shadow
- **RotatingDragOverlay**: Adds subtle rotation (2-3 degrees)
- **GlassDragOverlay**: Glassmorphism effect with blur

## Features
- Elevated shadow effect
- Smooth animations
- Follows cursor precisely
- Spring physics on drop
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-slate-100 dark:bg-slate-900 rounded-xl min-h-[300px] min-w-[500px]">
        <Story />
      </div>
    ),
  ],
}

export default meta

// Draggable wrapper for stories
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
      className={`cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-40' : ''}`}
    >
      {children}
    </div>
  )
}

// Sample card component
const SampleCard = ({ label }: { label: string }) => (
  <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 w-48">
    <p className="font-medium text-slate-800 dark:text-slate-200">{label}</p>
    <p className="text-sm text-slate-500 mt-1">Drag me around!</p>
  </div>
)

export const Default: StoryObj = {
  render: () => {
    const sensors = useAppleSensors()
    const [activeId, setActiveId] = useState<string | null>(null)

    return (
      <DndContext
        sensors={sensors}
        onDragStart={(e) => setActiveId(e.active.id as string)}
        onDragEnd={() => setActiveId(null)}
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-500 mb-4">
            Drag the card to see the default overlay effect
          </p>
          <DraggableItem id="default-card">
            <SampleCard label="Default Overlay" />
          </DraggableItem>
        </div>

        <AppleDragOverlay>
          {activeId && <SampleCard label="Default Overlay" />}
        </AppleDragOverlay>
      </DndContext>
    )
  },
}

export const WithRotation: StoryObj = {
  render: () => {
    const sensors = useAppleSensors()
    const [activeId, setActiveId] = useState<string | null>(null)

    return (
      <DndContext
        sensors={sensors}
        onDragStart={(e) => setActiveId(e.active.id as string)}
        onDragEnd={() => setActiveId(null)}
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-500 mb-4">
            Drag to see rotation effect (Apple HIG style)
          </p>
          <DraggableItem id="rotating-card">
            <SampleCard label="Rotating Overlay" />
          </DraggableItem>
        </div>

        <RotatingDragOverlay rotation={3}>
          {activeId && <SampleCard label="Rotating Overlay" />}
        </RotatingDragOverlay>
      </DndContext>
    )
  },
}

export const GlassEffect: StoryObj = {
  render: () => {
    const sensors = useAppleSensors()
    const [activeId, setActiveId] = useState<string | null>(null)

    return (
      <DndContext
        sensors={sensors}
        onDragStart={(e) => setActiveId(e.active.id as string)}
        onDragEnd={() => setActiveId(null)}
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-500 mb-4">
            Drag to see glassmorphism effect
          </p>
          <DraggableItem id="glass-card">
            <SampleCard label="Glass Overlay" />
          </DraggableItem>
        </div>

        <GlassDragOverlay>
          {activeId && <SampleCard label="Glass Overlay" />}
        </GlassDragOverlay>
      </DndContext>
    )
  },
}

// KPI Card example
const KpiCard = ({ title, value, trend }: { title: string; value: string; trend: 'up' | 'down' }) => (
  <div className="p-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 dark:border-white/10 w-56">
    <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
    <p className="text-3xl font-bold text-slate-800 dark:text-white mt-1">{value}</p>
    <div className={`flex items-center gap-1 mt-2 text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
      {trend === 'up' ? '↑' : '↓'}
      <span>{trend === 'up' ? '+12%' : '-5%'}</span>
    </div>
  </div>
)

export const KpiCardOverlay: StoryObj = {
  render: () => {
    const sensors = useAppleSensors()
    const [activeId, setActiveId] = useState<string | null>(null)

    return (
      <DndContext
        sensors={sensors}
        onDragStart={(e) => setActiveId(e.active.id as string)}
        onDragEnd={() => setActiveId(null)}
      >
        <div className="flex gap-4">
          <DraggableItem id="kpi-1">
            <KpiCard title="Dor Torácica" value="08" trend="up" />
          </DraggableItem>
          <DraggableItem id="kpi-2">
            <KpiCard title="Pcts/Hora" value="4.2" trend="down" />
          </DraggableItem>
        </div>

        <RotatingDragOverlay rotation={2}>
          {activeId === 'kpi-1' && <KpiCard title="Dor Torácica" value="08" trend="up" />}
          {activeId === 'kpi-2' && <KpiCard title="Pcts/Hora" value="4.2" trend="down" />}
        </RotatingDragOverlay>
      </DndContext>
    )
  },
}

// Kanban card example
const KanbanCard = ({ patient, complaint, acuity }: { patient: string; complaint: string; acuity: 'red' | 'orange' | 'yellow' | 'green' }) => {
  const acuityColors = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-400',
    green: 'bg-green-500',
  }

  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 w-64">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-3 h-3 rounded-full ${acuityColors[acuity]}`} />
        <p className="font-semibold text-slate-800 dark:text-white">{patient}</p>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{complaint}</p>
      <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
        <span>Espera: 25min</span>
        <span>|</span>
        <span>Sala: 03</span>
      </div>
    </div>
  )
}

export const KanbanCardOverlay: StoryObj = {
  render: () => {
    const sensors = useAppleSensors()
    const [activeId, setActiveId] = useState<string | null>(null)

    return (
      <DndContext
        sensors={sensors}
        onDragStart={(e) => setActiveId(e.active.id as string)}
        onDragEnd={() => setActiveId(null)}
      >
        <div className="flex gap-4">
          <DraggableItem id="kanban-1">
            <KanbanCard patient="João Silva" complaint="Dor torácica" acuity="red" />
          </DraggableItem>
          <DraggableItem id="kanban-2">
            <KanbanCard patient="Maria Santos" complaint="Cefaleia" acuity="yellow" />
          </DraggableItem>
        </div>

        <RotatingDragOverlay rotation={2}>
          {activeId === 'kanban-1' && <KanbanCard patient="João Silva" complaint="Dor torácica" acuity="red" />}
          {activeId === 'kanban-2' && <KanbanCard patient="Maria Santos" complaint="Cefaleia" acuity="yellow" />}
        </RotatingDragOverlay>
      </DndContext>
    )
  },
}

// Comparison of all overlay types
export const AllOverlayTypes: StoryObj = {
  render: () => {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
            Overlay Variants
          </h3>
          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                AppleDragOverlay
              </p>
              <div className="p-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] transform scale-105">
                <p className="text-sm text-slate-700">Standard elevation</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                RotatingDragOverlay
              </p>
              <div className="p-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.15)] transform scale-105 rotate-2">
                <p className="text-sm text-slate-700">With rotation</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                GlassDragOverlay
              </p>
              <div className="p-4 bg-white/60 backdrop-blur-2xl rounded-2xl shadow-lg border border-white/40 transform scale-105">
                <p className="text-sm text-slate-700">Glass effect</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
