// Task Templates for Kanban Board
// Pre-defined templates to help users quickly create common task types

import type { KanbanTask, KanbanColumnStatus } from '@/types/kanban'

export interface TaskTemplate {
  id: string
  name: string
  description: string
  icon: 'bug' | 'lightbulb' | 'clock' | 'check-square'
  task: Omit<KanbanTask, 'id'>
}

export const TASK_TEMPLATES: TaskTemplate[] = [
  {
    id: 'bug-report',
    name: 'Bug Report',
    description: 'Reportar um bug ou problema',
    icon: 'bug',
    task: {
      title: 'Bug: [Descrição breve]',
      description: `## Descrição do Bug
Descreva o bug de forma clara e concisa.

## Passos para Reproduzir
1. Ir para '...'
2. Clicar em '...'
3. Rolar até '...'
4. Ver o erro

## Comportamento Esperado
O que deveria acontecer.

## Comportamento Atual
O que realmente acontece.

## Capturas de Tela
Se aplicável, adicione screenshots.

## Ambiente
- Navegador:
- Sistema: `,
      status: 'todo',
      priority: 'high',
      labels: ['bug'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: 'feature-request',
    name: 'Feature Request',
    description: 'Sugerir uma nova funcionalidade',
    icon: 'lightbulb',
    task: {
      title: 'Feature: [Nome da funcionalidade]',
      description: `## Descrição
Uma descrição clara da funcionalidade desejada.

## Problema
Qual problema essa feature resolve?

## Solução Proposta
Descreva como você gostaria que funcionasse.

## Benefícios
- Benefício 1
- Benefício 2
- Benefício 3

## Alternativas Consideradas
Outras soluções que você considerou.`,
      status: 'backlog',
      priority: 'medium',
      labels: ['feature', 'enhancement'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: 'meeting-notes',
    name: 'Notas de Reunião',
    description: 'Registrar notas de reunião',
    icon: 'clock',
    task: {
      title: 'Reunião: [Tema]',
      description: `## Informações da Reunião
- **Data:** ${new Date().toLocaleDateString('pt-BR')}
- **Participantes:**

## Pauta
1.
2.
3.

## Discussões
-

## Decisões Tomadas
-

## Próximos Passos
- [ ]
- [ ]
- [ ]

## Próxima Reunião
Data/Hora: `,
      status: 'in_progress',
      priority: 'medium',
      labels: ['meeting', 'notes'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: 'general-task',
    name: 'Tarefa Geral',
    description: 'Criar uma tarefa simples',
    icon: 'check-square',
    task: {
      title: 'Tarefa: [Título]',
      description: `## Descrição
O que precisa ser feito.

## Critérios de Aceite
- [ ] Critério 1
- [ ] Critério 2
- [ ] Critério 3

## Observações
Informações adicionais relevantes.`,
      status: 'todo',
      priority: 'medium',
      labels: ['task'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
]

// Helper to get a template by ID
export function getTemplateById(id: string): TaskTemplate | undefined {
  return TASK_TEMPLATES.find((t) => t.id === id)
}

// Helper to create a task from template with a specific status
export function createTaskFromTemplate(
  template: TaskTemplate,
  statusOverride?: KanbanColumnStatus
): Omit<KanbanTask, 'id'> {
  return {
    ...template.task,
    status: statusOverride ?? template.task.status,
  }
}
