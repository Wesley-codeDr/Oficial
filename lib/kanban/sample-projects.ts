import { KanbanTask, KanbanStatus } from '@/lib/types/medical'
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
        patientName: 'Dor Torácica - Leito 5',
        age: '62a',
        gender: 'M',
        complaint: 'Aguardando ECG',
        acuity: 'red',
        waitTime: '5min',
        status: 'exam',
      },
      {
        patientName: 'Cefaleia - Leito 2',
        age: '45a',
        gender: 'F',
        complaint: 'Aguardando analgesia',
        acuity: 'orange',
        waitTime: '12min',
        status: 'wait',
      },
      {
        patientName: 'Dispneia - Sala de Emergência',
        age: '78a',
        gender: 'M',
        complaint: 'Em Ventilação Não Invasiva (VNI)',
        acuity: 'red',
        waitTime: '2min',
        status: 'reval',
      },
      {
        patientName: 'Síncope - Leito 8',
        age: '30a',
        gender: 'F',
        complaint: 'Aguardando Troponina',
        acuity: 'yellow',
        waitTime: '25min',
        status: 'wait',
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
        patientName: 'UI: Refatorar Header',
        age: '--',
        gender: 'M',
        complaint: 'Melhorar glassmorphism',
        acuity: 'yellow',
        waitTime: '0min',
        status: 'exam',
      },
      {
        patientName: 'Bug: Sync com Obsidian',
        age: '--',
        gender: 'M',
        complaint: 'Erro ao salvar metadados',
        acuity: 'red',
        waitTime: '0min',
        status: 'wait',
      }
    ]
  }
]

export function createBoardFromSample(sample: SampleProject): KanbanTask[] {
  return sample.tasks.map((task) => ({
    ...task,
    id: generateIdWithPrefix('task-'),
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
