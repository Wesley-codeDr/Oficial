import {
  Keyboard,
  MousePointer2,
  Zap,
  ArrowLeftRight,
  Plus,
  GripVertical,
  Layers,
  Timer,
  Tags,
  Sparkles,
  Link,
  Bell,
} from 'lucide-react'
import type { HelpTip } from '@/components/kanban/ExpandableHelpCard'
import type { KanbanColumnStatus } from '@/types/kanban'

/**
 * Help tips configuration for Kanban empty states
 * Organized by column status with context-aware tips
 */

// General tips available for all columns
export const GENERAL_HELP_TIPS: HelpTip[] = [
  {
    id: 'keyboard-n',
    icon: Plus,
    title: 'N para nova tarefa',
    description:
      'Pressione N em qualquer momento para criar uma nova tarefa rapidamente.',
    category: 'keyboard',
  },
  {
    id: 'drag-reorder',
    icon: GripVertical,
    title: 'Arraste para reordenar',
    description:
      'Clique e arraste o ícone de grip na lateral para reordenar tarefas dentro da mesma coluna.',
    category: 'drag-drop',
  },
  {
    id: 'keyboard-arrows',
    icon: ArrowLeftRight,
    title: 'Setas para mover',
    description:
      'Use as setas do teclado para navegar entre colunas quando uma tarefa estiver selecionada.',
    category: 'keyboard',
  },
]

// Column-specific tips
export const COLUMN_HELP_TIPS: Record<KanbanColumnStatus, HelpTip[]> = {
  backlog: [
    {
      id: 'backlog-ideas',
      icon: Sparkles,
      title: 'Capture ideias rapidamente',
      description:
        'O backlog é ideal para ideias brutas. Não se preocupe com detalhes agora, refine depois.',
      category: 'general',
    },
    {
      id: 'backlog-templates',
      icon: Layers,
      title: 'Use templates',
      description:
        'Templates aceleram a criação. Clique nos botões abaixo para criar tarefas pré-formatadas.',
      category: 'integration',
    },
    {
      id: 'drag-to-todo',
      icon: MousePointer2,
      title: 'Arraste para priorizar',
      description:
        'Quando uma ideia estiver pronta para execução, arraste para "A Fazer".',
      category: 'drag-drop',
    },
  ],
  todo: [
    {
      id: 'todo-priority',
      icon: Tags,
      title: 'Defina prioridades',
      description:
        'Use tags de prioridade (crítica, alta, média, baixa) para organizar o que fazer primeiro.',
      category: 'general',
    },
    {
      id: 'keyboard-enter',
      icon: Keyboard,
      title: 'Enter para iniciar',
      description:
        'Com uma tarefa selecionada, pressione Enter para movê-la para "Em Progresso".',
      category: 'keyboard',
    },
    {
      id: 'drag-progress',
      icon: MousePointer2,
      title: 'Arraste quando começar',
      description:
        'Arraste tarefas para "Em Progresso" quando iniciar o trabalho nelas.',
      category: 'drag-drop',
    },
  ],
  in_progress: [
    {
      id: 'progress-focus',
      icon: Timer,
      title: 'Limite o WIP',
      description:
        'Mantenha poucas tarefas em progresso. Foco em terminar antes de começar novas.',
      category: 'general',
    },
    {
      id: 'keyboard-d',
      icon: Keyboard,
      title: 'D para concluir',
      description:
        'Pressione D com uma tarefa selecionada para movê-la para revisão rapidamente.',
      category: 'keyboard',
    },
    {
      id: 'drag-review',
      icon: MousePointer2,
      title: 'Arraste para revisão',
      description:
        'Quando terminar, arraste para "Em Revisão" antes de marcar como concluída.',
      category: 'drag-drop',
    },
  ],
  review: [
    {
      id: 'review-checklist',
      icon: Layers,
      title: 'Revise antes de finalizar',
      description:
        'Use esta coluna para verificar qualidade antes de marcar como concluído.',
      category: 'general',
    },
    {
      id: 'keyboard-space',
      icon: Keyboard,
      title: 'Espaço para aprovar',
      description:
        'Pressione Espaço para mover uma tarefa revisada para "Concluído".',
      category: 'keyboard',
    },
    {
      id: 'integration-notifications',
      icon: Bell,
      title: 'Notificações de revisão',
      description:
        'Configure notificações para ser lembrado de tarefas aguardando revisão.',
      category: 'integration',
    },
  ],
  done: [
    {
      id: 'done-celebrate',
      icon: Sparkles,
      title: 'Celebre conquistas',
      description:
        'Tarefas concluídas representam progresso. Revise periodicamente suas realizações.',
      category: 'general',
    },
    {
      id: 'keyboard-backspace',
      icon: Keyboard,
      title: 'Backspace para reabrir',
      description:
        'Se precisar retrabalhar algo, pressione Backspace para mover de volta.',
      category: 'keyboard',
    },
    {
      id: 'integration-archive',
      icon: Link,
      title: 'Arquivamento automático',
      description:
        'Tarefas antigas podem ser arquivadas automaticamente para manter o quadro limpo.',
      category: 'integration',
    },
  ],
}

/**
 * Get help tips for a specific column
 * Returns a mix of column-specific and general tips
 */
export function getHelpTipsForColumn(status: KanbanColumnStatus): HelpTip[] {
  const columnTips = COLUMN_HELP_TIPS[status] || []
  // Mix column-specific tips with one general tip for variety
  const generalTip = GENERAL_HELP_TIPS[Math.floor(Math.random() * GENERAL_HELP_TIPS.length)]
  return [...columnTips, generalTip]
}

/**
 * Get all available help tips
 */
export function getAllHelpTips(): HelpTip[] {
  const allColumnTips = Object.values(COLUMN_HELP_TIPS).flat()
  return [...allColumnTips, ...GENERAL_HELP_TIPS]
}
