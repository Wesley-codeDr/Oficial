import type { SampleProject, KanbanTask, KanbanColumnStatus } from '@/types/kanban'

// Sample projects for different use cases
export const SAMPLE_PROJECTS: SampleProject[] = [
  {
    id: 'software-project',
    name: 'Projeto de Software',
    description: 'Um projeto de desenvolvimento de software típico com sprints e releases',
    icon: 'code',
    useCase: 'software',
    tasks: [
      // Backlog
      {
        title: 'Implementar autenticação OAuth',
        description: 'Adicionar login com Google e GitHub',
        status: 'backlog',
        priority: 'medium',
        labels: ['feature', 'auth'],
      },
      {
        title: 'Otimizar queries do banco de dados',
        description: 'Revisar índices e queries lentas',
        status: 'backlog',
        priority: 'low',
        labels: ['performance'],
      },
      {
        title: 'Adicionar testes E2E',
        description: 'Cobertura de testes para fluxos críticos',
        status: 'backlog',
        priority: 'medium',
        labels: ['testing', 'quality'],
      },
      // Todo
      {
        title: 'Corrigir bug de validação de formulário',
        description: 'Mensagens de erro não aparecem corretamente',
        status: 'todo',
        priority: 'high',
        labels: ['bug', 'urgent'],
      },
      {
        title: 'Atualizar documentação da API',
        description: 'Documentar novos endpoints do módulo de relatórios',
        status: 'todo',
        priority: 'medium',
        labels: ['docs'],
      },
      // In Progress
      {
        title: 'Desenvolver dashboard de métricas',
        description: 'Criar componentes de visualização de dados',
        status: 'in_progress',
        priority: 'high',
        labels: ['feature', 'frontend'],
      },
      {
        title: 'Refatorar módulo de notificações',
        description: 'Melhorar arquitetura para suportar múltiplos canais',
        status: 'in_progress',
        priority: 'medium',
        labels: ['refactor', 'backend'],
      },
      // Review
      {
        title: 'PR: Implementar dark mode',
        description: 'Aguardando code review do time',
        status: 'review',
        priority: 'low',
        labels: ['feature', 'ui'],
      },
      // Done
      {
        title: 'Configurar CI/CD',
        description: 'Pipeline de deploy automatizado',
        status: 'done',
        priority: 'high',
        labels: ['devops'],
      },
      {
        title: 'Setup do projeto',
        description: 'Configuração inicial do repositório',
        status: 'done',
        priority: 'high',
        labels: ['setup'],
      },
    ],
  },
  {
    id: 'personal-tasks',
    name: 'Tarefas Pessoais',
    description: 'Organize suas tarefas pessoais e rotina diária',
    icon: 'user',
    useCase: 'personal',
    tasks: [
      // Backlog
      {
        title: 'Organizar armário',
        description: 'Separar roupas para doação',
        status: 'backlog',
        priority: 'low',
        labels: ['casa'],
      },
      {
        title: 'Planejar viagem de férias',
        description: 'Pesquisar destinos e hotéis',
        status: 'backlog',
        priority: 'medium',
        labels: ['lazer'],
      },
      // Todo
      {
        title: 'Agendar consulta médica',
        description: 'Checkup anual',
        status: 'todo',
        priority: 'high',
        labels: ['saúde'],
      },
      {
        title: 'Pagar contas do mês',
        description: 'Energia, água, internet',
        status: 'todo',
        priority: 'critical',
        labels: ['finanças'],
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        title: 'Comprar presente de aniversário',
        description: 'Aniversário da Maria - dia 20',
        status: 'todo',
        priority: 'medium',
        labels: ['social'],
      },
      // In Progress
      {
        title: 'Curso online de inglês',
        description: 'Módulo 3 - Conversação',
        status: 'in_progress',
        priority: 'medium',
        labels: ['estudos'],
      },
      {
        title: 'Academia 3x por semana',
        description: 'Manter rotina de exercícios',
        status: 'in_progress',
        priority: 'high',
        labels: ['saúde'],
      },
      // Review
      {
        title: 'Revisar orçamento mensal',
        description: 'Analisar gastos e economias',
        status: 'review',
        priority: 'medium',
        labels: ['finanças'],
      },
      // Done
      {
        title: 'Renovar CNH',
        description: 'Documentos entregues',
        status: 'done',
        priority: 'high',
        labels: ['documentos'],
      },
    ],
  },
  {
    id: 'content-calendar',
    name: 'Calendário de Conteúdo',
    description: 'Planeje e organize sua produção de conteúdo',
    icon: 'calendar',
    useCase: 'content',
    tasks: [
      // Backlog
      {
        title: 'Série: Dicas de produtividade',
        description: '5 posts sobre gestão de tempo',
        status: 'backlog',
        priority: 'medium',
        labels: ['série', 'blog'],
      },
      {
        title: 'Podcast: Entrevista com especialista',
        description: 'Agendar gravação',
        status: 'backlog',
        priority: 'low',
        labels: ['podcast'],
      },
      // Todo
      {
        title: 'Post: Como usar IA no trabalho',
        description: 'Artigo com exemplos práticos',
        status: 'todo',
        priority: 'high',
        labels: ['blog', 'trending'],
      },
      {
        title: 'Vídeo: Tutorial de Excel',
        description: 'Fórmulas avançadas para iniciantes',
        status: 'todo',
        priority: 'medium',
        labels: ['youtube'],
      },
      {
        title: 'Newsletter semanal',
        description: 'Curadoria de conteúdo da semana',
        status: 'todo',
        priority: 'high',
        labels: ['email'],
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      // In Progress
      {
        title: 'E-book: Guia de carreira em tech',
        description: 'Capítulo 3: Preparando o currículo',
        status: 'in_progress',
        priority: 'high',
        labels: ['ebook', 'lead-magnet'],
      },
      {
        title: 'Stories: Bastidores da semana',
        description: 'Conteúdo para Instagram',
        status: 'in_progress',
        priority: 'medium',
        labels: ['social'],
      },
      // Review
      {
        title: 'Revisar: Post sobre burnout',
        description: 'Aguardando aprovação do editor',
        status: 'review',
        priority: 'medium',
        labels: ['blog'],
      },
      // Done
      {
        title: 'Carrossel: 10 ferramentas gratuitas',
        description: 'Publicado com 5k likes',
        status: 'done',
        priority: 'high',
        labels: ['social', 'instagram'],
      },
      {
        title: 'Webinar: Introdução ao tema',
        description: 'Gravação disponível',
        status: 'done',
        priority: 'high',
        labels: ['webinar'],
      },
    ],
  },
  {
    id: 'medical-project',
    name: 'Gestão de Consultório',
    description: 'Organize tarefas administrativas e clínicas do consultório',
    icon: 'stethoscope',
    useCase: 'medical',
    tasks: [
      // Backlog
      {
        title: 'Implementar prontuário eletrônico',
        description: 'Pesquisar soluções de PEP certificadas',
        status: 'backlog',
        priority: 'medium',
        labels: ['tecnologia', 'compliance'],
      },
      {
        title: 'Treinamento de equipe',
        description: 'Capacitação em atendimento humanizado',
        status: 'backlog',
        priority: 'low',
        labels: ['rh', 'qualidade'],
      },
      // Todo
      {
        title: 'Renovar alvará sanitário',
        description: 'Documentação para vigilância sanitária',
        status: 'todo',
        priority: 'critical',
        labels: ['documentos', 'legal'],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        title: 'Atualizar protocolos de emergência',
        description: 'Revisar fluxos de atendimento de urgência',
        status: 'todo',
        priority: 'high',
        labels: ['protocolo', 'segurança'],
      },
      {
        title: 'Comprar materiais de consumo',
        description: 'Luvas, máscaras, seringas',
        status: 'todo',
        priority: 'high',
        labels: ['suprimentos'],
      },
      // In Progress
      {
        title: 'Organizar agenda de dezembro',
        description: 'Definir horários de plantão e folgas',
        status: 'in_progress',
        priority: 'high',
        labels: ['agenda', 'gestão'],
      },
      {
        title: 'Auditoria de prontuários',
        description: 'Verificar completude dos registros',
        status: 'in_progress',
        priority: 'medium',
        labels: ['qualidade', 'compliance'],
      },
      // Review
      {
        title: 'Novo protocolo de triagem',
        description: 'Aguardando aprovação da coordenação',
        status: 'review',
        priority: 'high',
        labels: ['protocolo'],
      },
      // Done
      {
        title: 'Calibração de equipamentos',
        description: 'Manutenção preventiva realizada',
        status: 'done',
        priority: 'high',
        labels: ['manutenção'],
      },
      {
        title: 'Atualização do cadastro ANS',
        description: 'Credenciamento renovado',
        status: 'done',
        priority: 'critical',
        labels: ['documentos', 'planos'],
      },
    ],
  },
]

// Helper to generate unique IDs
function generateId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

// Convert sample project to KanbanBoard format
export function createBoardFromSample(sample: SampleProject): KanbanTask[] {
  const now = new Date().toISOString()

  return sample.tasks.map((task) => ({
    ...task,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  }))
}

// Get sample project by use case
export function getSampleProjectByUseCase(useCase: SampleProject['useCase']): SampleProject | undefined {
  return SAMPLE_PROJECTS.find((p) => p.useCase === useCase)
}

// Detect best sample project based on context (can be expanded with more heuristics)
export function detectBestSampleProject(): SampleProject {
  // Default to medical since this is a medical application
  const medical = SAMPLE_PROJECTS.find((p) => p.useCase === 'medical')
  if (medical) return medical
  // Fallback to first project (always exists in our static data)
  return SAMPLE_PROJECTS[0] as SampleProject
}
