import type { Meta, StoryObj } from '@storybook/react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { useState } from 'react'
import { Draggable } from '../draggable'
import { Droppable } from '../droppable'

/**
 * Draggable Component Stories
 *
 * Apple HIG 2025 compliant draggable wrapper component.
 * Use this component to make any element draggable.
 */
const meta: Meta<typeof Draggable> = {
  title: 'DnD/Draggable',
  component: Draggable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A draggable wrapper component that follows Apple Human Interface Guidelines 2025.

## Features
- 150ms activation delay for touch interactions
- 8px activation distance to prevent accidental drags
- Visual feedback during drag (elevation, shadow)
- Smooth spring animations

## Usage
\`\`\`tsx
<Draggable id="item-1" data={{ type: 'card', content: 'Hello' }}>
  <YourComponent />
</Draggable>
\`\`\`
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-slate-100 dark:bg-slate-900 rounded-xl min-h-[400px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Draggable>

// Basic draggable card
const DraggableCard = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 cursor-grab active:cursor-grabbing">
    {children}
  </div>
)

export const Default: Story = {
  render: () => {
    return (
      <DndContext>
        <Draggable id="draggable-1">
          <DraggableCard>
            <p className="font-medium text-slate-800 dark:text-slate-200">
              Drag me!
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Click and drag to move
            </p>
          </DraggableCard>
        </Draggable>
      </DndContext>
    )
  },
}

export const WithDropZone: Story = {
  render: () => {
    const [isDropped, setIsDropped] = useState(false)

    const handleDragEnd = (event: DragEndEvent) => {
      if (event.over?.id === 'drop-zone') {
        setIsDropped(true)
      }
    }

    return (
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-8 items-start">
          {!isDropped && (
            <Draggable id="draggable-card">
              <DraggableCard>
                <p className="font-medium">Drag to drop zone</p>
              </DraggableCard>
            </Draggable>
          )}

          <Droppable id="drop-zone">
            <div className="w-48 h-48 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl flex items-center justify-center">
              {isDropped ? (
                <DraggableCard>
                  <p className="font-medium text-green-600">Dropped!</p>
                </DraggableCard>
              ) : (
                <p className="text-slate-400">Drop here</p>
              )}
            </div>
          </Droppable>
        </div>
      </DndContext>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    return (
      <DndContext>
        <Draggable id="disabled-draggable" disabled>
          <DraggableCard>
            <p className="font-medium text-slate-400">
              Disabled (cannot drag)
            </p>
          </DraggableCard>
        </Draggable>
      </DndContext>
    )
  },
}

export const WithCustomData: Story = {
  render: () => {
    const handleDragEnd = (event: DragEndEvent) => {
      console.log('Dragged data:', event.active.data.current)
    }

    return (
      <DndContext onDragEnd={handleDragEnd}>
        <Draggable
          id="data-draggable"
          data={{
            type: 'patient-card',
            patientId: 'P-12345',
            priority: 'high',
          }}
        >
          <DraggableCard>
            <p className="font-medium">Patient Card</p>
            <p className="text-sm text-slate-500">ID: P-12345</p>
            <p className="text-xs text-red-500 mt-1">High Priority</p>
          </DraggableCard>
        </Draggable>
      </DndContext>
    )
  },
}

export const MultipleDraggables: Story = {
  render: () => {
    return (
      <DndContext>
        <div className="flex gap-4">
          {[1, 2, 3].map((num) => (
            <Draggable key={num} id={`draggable-${num}`}>
              <DraggableCard>
                <p className="font-medium">Card {num}</p>
              </DraggableCard>
            </Draggable>
          ))}
        </div>
      </DndContext>
    )
  },
}
