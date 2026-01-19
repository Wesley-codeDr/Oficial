import { Metadata } from 'next'
import { KanbanBoard } from '@/components/kanban'

export const metadata: Metadata = {
  title: 'Kanban | WellWave',
  description: 'Gerencie suas tarefas visualmente com o quadro Kanban.',
}

export default function KanbanPage() {
  return (
    <div className="container mx-auto max-w-7xl py-4 px-2 sm:px-4 h-[calc(100vh-4rem)]">
      <KanbanBoard />
    </div>
  )
}
