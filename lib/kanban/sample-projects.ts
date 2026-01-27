import { KanbanTask, KanbanColumnStatus } from '@/types/kanban'
import { generateIdWithPrefix } from '@/lib/utils'

export interface SampleProject {
  id: string
  name: string
  description: string
  icon: string
  useCase: 'software' | 'personal' | 'content' | 'medical'
  tasks: Omit<KanbanTask, 'id'>[]
}

export const SAMPLE_PROJECTS: SampleProject[] = [
  {
    id: 'medical-urgent',
    name: 'Urgência e Emergência',
    description: 'Fluxo de atendimento de pacientes em estado crítico e monitoramento de leitos.',
    icon: '🚨',
    useCase: 'medical',
    tasks: [
      {
        title: 'Dor Torácica - Leito 5',
        description: 'Aguardando ECG',
        status: 'in_progress',
        priority: 'critical',
        labels: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        title: 'Cefaleia - Leito 2',
        description: 'Aguardando analgesia',
        status: 'todo',
        priority: 'high',
        labels: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        title: 'Dispneia - Sala de Emergência',
        description: 'Em Ventilação Não Invasiva (VNI)',
        status: 'review',
        priority: 'critical',
        labels: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        title: 'Síncope - Leito 8',
        description: 'Aguardando Troponina',
        status: 'todo',
        priority: 'medium',
        labels: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ]
  },
  {
    id: 'software-dev',
    name: 'Desenvolvimento Mobile',
    description: 'Acompanhamento de sprints e bugs do aplicativo médico.',
    icon: '📱',
    useCase: 'software',
    tasks: [
      {
        title: 'UI: Refatorar Header',
        description: 'Melhorar glassmorphism',
        status: 'backlog',
        priority: 'medium',
        labels: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        title: 'Bug: Sync com Obsidian',
        description: 'Erro ao salvar metadados',
        status: 'todo',
        priority: 'high',
        labels: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ]
  }
]

export function createBoardFromSample(sample: SampleProject): KanbanTask[] {
  return sample.tasks.map((task) => ({
    ...task,
    id: generateIdWithPrefix('task-'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }))
}

// Get sample project by use case
export function getSampleProjectByUseCase(useCase: SampleProject['useCase']): SampleProject | undefined {
  return SAMPLE_PROJECTS.find((p) => p.useCase === useCase)
}

// Detect best sample project based on context
export function detectBestSampleProject(): SampleProject {
  return SAMPLE_PROJECTS.find((p) => p.id === 'medical-urgent') || (SAMPLE_PROJECTS[0] as SampleProject)
}
