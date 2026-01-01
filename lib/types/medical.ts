export interface Symptom {
  id: string
  label: string
  type: 'boolean' | 'multiSelect' | 'scale' | 'range' | 'text' | 'segment'
  options?: string[]
  checked?: boolean
  negative?: boolean
  value?: string | number | boolean
  isRedFlag?: boolean
  min?: number
  max?: number
  step?: number
  placeholder?: string
}

// Categorias de checkboxes para anamnese
export type CheckboxCategory =
  | 'QP'
  | 'HDA'
  | 'ANTECEDENTES'
  | 'MEDICACOES'
  | 'ALERGIAS'
  | 'HABITOS'
  | 'EXAME_FISICO'
  | 'NEGATIVAS'

// Mapeamento de checkboxes prioritários por categoria
export interface PriorityCheckboxMapping {
  QP?: string[]
  HDA?: string[]
  ANTECEDENTES?: string[]
  MEDICACOES?: string[]
  ALERGIAS?: string[]
  HABITOS?: string[]
  EXAME_FISICO?: string[]
  NEGATIVAS?: string[]
}

// Conteúdo estendido de uma queixa
export interface ComplaintExtendedContent {
  redFlags: string[]
  diagnosticoDiferencial: string[]
  condutaInicial: string
  calculadoras: string[]
  rawMarkdown?: string
}

// Grupo de queixas
export interface ComplaintGroup {
  code: string
  label: string
  description: string
  icon: string
  color: string
  sortOrder: number
  recommendedFor: string[]
}

export interface Complaint {
  id: string
  group: string
  title: string
  subtitle: string
  ageTargets: string[]
  riskLevel: 'high' | 'medium' | 'low'
  isTopForAdult: boolean
  isTopForChild: boolean
  isFastTrack: boolean
  chips: string[]
  searchTerms: string[]
  synonyms?: string[]
  relatedSymptoms?: string[]
  bodySystem?: string[]
  severity?: number
  commonMisconceptions?: string[]
  icd10Codes?: string[]
  searchWeight?: number
  extendedContent?: ComplaintExtendedContent
  priorityCheckboxes?: PriorityCheckboxMapping
}

export interface ComplaintFilters {
  patientCategory?: string[]
  riskLevel?: ('high' | 'medium' | 'low')[]
  bodySystem?: string[]
  groupCodes?: string[]
  minSeverity?: number
  onlyFastTrack?: boolean
}

export interface AnamnesisSection {
  id: string
  title: string
  items: Symptom[]
}

export interface Patient {
  id: string
  // name removed in favor of anonymous categories
  age: string
  gender: 'M' | 'F'
  category: 'adult' | 'elderly' | 'pediatric'
  isPregnant: boolean
  phoneNumber: string
  allergies: string[]
  medications: string[] // List of current medications
  entryTime: string // ISO string
  status: 'waiting' | 'in_progress' | 'discharged'
}

export interface NoteBlock {
  id: string
  title: string
  content: string
  iconName: 'heart' | 'list' | 'x' | 'stethoscope' | 'alert' | 'brain' | 'siren' // Added 'siren'
  alerts?: string[]
}

// Kanban Types
export type KanbanStatus = 'exam' | 'wait' | 'reval' | 'done'

export interface KanbanTask {
  id: string
  patientName: string
  age: string
  gender: 'M' | 'F'
  complaint: string
  acuity: 'red' | 'orange' | 'yellow' | 'green'
  waitTime: string
  status: KanbanStatus
}

// Dashboard Preferences
export interface DashboardPreferences {
  visibleKpiCards: string[] // ids: 'thoracic', 'patients', 'revals', 'ecg'
  kpiOrder: string[]
  visibleKanbanColumns: string[] // ids: 'exam', 'wait', 'reval', 'done'
  showGreeting: boolean
  showAlertRow: boolean
  density: 'default' | 'compact'
}

// ============================================================================
// Evidence-Based Medicine (EBM) Types
// ============================================================================

/**
 * Fonte de citação médica para medicina baseada em evidências
 */
export type EBMSource =
  | 'uptodate'
  | 'dynamed'
  | 'brazilian-guideline'
  | 'cochrane'
  | 'pubmed'
  | 'sbim'
  | 'sbc'
  | 'sbpt'
  | 'amb'
  | 'ms'

/**
 * Nível de evidência baseado no sistema Oxford CEBM
 * A: Estudos consistentes de nível 1
 * B: Estudos consistentes de nível 2 ou 3, ou extrapolações de nível 1
 * C: Estudos de nível 4, ou extrapolações de nível 2 ou 3
 * D: Evidência de nível 5, ou estudos inconsistentes/inconclusivos
 */
export type EvidenceLevel = 'A' | 'B' | 'C' | 'D'

/**
 * Citação estruturada para referências médicas com rastreabilidade
 */
export interface EBMCitation {
  /** Fonte da citação (UpToDate, DynaMed, diretriz brasileira, etc.) */
  source: EBMSource

  /** Título completo do artigo/guideline/tópico */
  title: string

  /** URL do recurso original (quando aplicável) */
  url?: string

  /** PubMed ID (8 dígitos) */
  pmid?: string

  /** Digital Object Identifier */
  doi?: string

  /** Ano de publicação */
  yearPublished?: number

  /** Data do último acesso (ISO 8601) */
  lastAccessed?: string

  /** Nível de evidência Oxford CEBM */
  evidenceLevel?: EvidenceLevel

  /** Notas sobre adaptações para contexto brasileiro */
  brazilianAdaptation?: string

  /** Autores principais (opcional, para citação completa) */
  authors?: string[]

  /** Periódico de publicação (para artigos) */
  journal?: string
}

/**
 * Via de administração de medicamento
 */
export type MedicationRoute =
  | 'VO'          // Via oral
  | 'IV'          // Intravenosa
  | 'IM'          // Intramuscular
  | 'SC'          // Subcutânea
  | 'Inalatório'  // Inalação
  | 'Tópico'      // Tópica/cutânea
  | 'SL'          // Sublingual
  | 'Retal'       // Retal
  | 'Nasal'       // Nasal
  | 'Ocular'      // Ocular

/**
 * Recomendação de medicamento com compatibilidade SUS/RENAME
 */
export interface MedicationRecommendation {
  /** Nome genérico (DCB - Denominação Comum Brasileira) */
  genericName: string

  /** Nomes comerciais comuns (opcional) */
  brandNames?: string[]

  /** Dose e posologia (ex: "300mg VO", "1mg/kg SC") */
  dose: string

  /** Via de administração */
  route: MedicationRoute

  /** Frequência de administração (ex: "12/12h", "1x/dia", "SOS") */
  frequency: string

  /** Duração do tratamento (ex: "7 dias", "até melhora clínica") */
  duration?: string

  /** Disponível no SUS/rede pública */
  susAvailable: boolean

  /** Compatível com RENAME (Relação Nacional de Medicamentos Essenciais) */
  renameCompatible: boolean

  /** Lista RENAME (A: essenciais, B: complementares, C: estratégicos) */
  renameList?: 'A' | 'B' | 'C'

  /** Medicamentos alternativos (caso indisponibilidade) */
  alternatives?: string[]

  /** Nível de evidência para esta recomendação */
  evidenceLevel?: EvidenceLevel

  /** Referências que suportam esta recomendação */
  references?: EBMCitation[]

  /** Ajustes para insuficiência renal */
  renalAdjustment?: string

  /** Ajustes para insuficiência hepática */
  hepaticAdjustment?: string

  /** Observações especiais (antimicrobiano, psicotrópico, alto custo) */
  specialNotes?: string

  /** Contraindicações absolutas */
  contraindications?: string[]

  /** Interações medicamentosas importantes */
  interactions?: string[]
}

/**
 * Severidade de um red flag clínico
 */
export type RedFlagSeverity =
  | 'critical'  // Risco de morte imediato - requer ação em minutos
  | 'warning'   // Risco alto - requer ação em < 1 hora
  | 'caution'   // Atenção necessária - monitoramento próximo

/**
 * Sinal de alerta clínico estruturado com severidade e conduta
 */
export interface RedFlag {
  /** Descrição do sinal de alerta */
  description: string

  /** Nível de severidade */
  severity: RedFlagSeverity

  /** Significado clínico e implicações */
  clinicalSignificance: string

  /** Ação imediata recomendada */
  immediateAction: string

  /** Tempo limite para ação (em minutos) */
  timeToAction?: number

  /** Referências que suportam esta classificação */
  references?: EBMCitation[]

  /** Critérios objetivos (quando aplicável) */
  objectiveCriteria?: string[]
}

/**
 * Probabilidade de diagnóstico diferencial
 */
export type DiagnosisProbability = 'high' | 'medium' | 'low'

/**
 * Diagnóstico diferencial estruturado com probabilidade
 */
export interface DifferentialDiagnosis {
  /** Nome da condição */
  condition: string

  /** Código ICD-10 */
  icd10?: string

  /** Probabilidade estimada para este diagnóstico */
  probability: DiagnosisProbability

  /** Características clínicas distintivas */
  keyFeatures: string[]

  /** Exames que ajudam a confirmar/excluir */
  diagnosticTests?: string[]

  /** Referências que suportam esta inclusão */
  references?: EBMCitation[]

  /** Bandeiras vermelhas específicas desta condição */
  specificRedFlags?: string[]
}

/**
 * Estratificação de risco clínico
 */
export interface RiskStratification {
  /** Nome do critério/score (ex: "HEART Score", "GRACE Score") */
  criteria: string

  /** Definição de baixo risco */
  lowRisk: string

  /** Definição de risco moderado */
  moderateRisk: string

  /** Definição de alto risco */
  highRisk: string

  /** Referência do score */
  reference?: EBMCitation

  /** URL para calculadora online (se disponível) */
  calculatorUrl?: string
}

/**
 * Conteúdo estendido de uma queixa - VERSÃO EBM-ENHANCED
 * Substitui a interface anterior com campos estruturados
 */
export interface ComplaintExtendedContentEBM {
  /** Red flags estruturados com severidade (substitui string[]) */
  redFlags: RedFlag[]

  /** Diagnósticos diferenciais estruturados (substitui string[]) */
  diagnosticoDiferencial: DifferentialDiagnosis[]

  /** Conduta inicial padronizada */
  condutaInicial: string

  /** Calculadoras clínicas relevantes */
  calculadoras: string[]

  /** Markdown original do Obsidian (preservado na sync) */
  rawMarkdown?: string

  // ========== NOVOS CAMPOS EBM ==========

  /** Versão do schema EBM (para compatibilidade futura) */
  ebmVersion?: string

  /** Data da última revisão médica (ISO 8601) */
  lastEBMReview?: string

  /** Qualidade geral da evidência (high/moderate/low/very-low) */
  evidenceQuality?: 'high' | 'moderate' | 'low' | 'very-low'

  /** Revisado contra UpToDate */
  uptodateReviewed?: boolean

  /** Revisado contra DynaMed */
  dynamedReviewed?: boolean

  /** Diretrizes brasileiras aplicáveis */
  brazilianGuidelines?: string[]

  /** Compatível com protocolos SUS */
  susProtocolCompatible?: boolean

  /** Recomendações usam apenas medicações RENAME */
  renameMedicationsOnly?: boolean

  /** Referências EBM principais */
  ebmReferences?: EBMCitation[]

  /** Medicações recomendadas com doses e SUS flags */
  medications?: MedicationRecommendation[]

  /** Estratificação de risco (scores clínicos) */
  riskStratification?: RiskStratification

  /** Diretrizes SUS específicas para esta condição */
  susGuidelines?: string

  /** Notas sobre epidemiologia brasileira */
  brazilianEpidemiology?: string

  /** Adaptações necessárias para realidade brasileira */
  brazilianAdaptations?: string[]

  /** Disponibilidade de recursos diagnósticos no SUS */
  susDiagnosticAvailability?: string

  /** Fluxo de encaminhamento SUS (quando aplicável) */
  susReferralPathway?: string
}

/**
 * Resultado de validação EBM
 */
export interface EBMValidationResult {
  /** Validação passou */
  valid: boolean

  /** Erros críticos que impedem uso */
  errors: string[]

  /** Avisos que não impedem mas precisam atenção */
  warnings: string[]

  /** Campos validados com sucesso */
  validatedFields: string[]

  /** Timestamp da validação */
  validatedAt: string
}
