/**
 * Transforma dados de queixas do Obsidian para configuração de formulário
 *
 * Este módulo converte o formato de complaintsData.ts para estruturas
 * que podem ser usadas tanto pelo AnamnesisView quanto pelo anamnese-form.
 */

import { complaintsData } from '@/lib/data/complaintsData'

// Tipos para a estrutura do formulário
export interface FormSection {
  id: string
  title: string
  type: 'checkbox' | 'segmented' | 'text' | 'info'
  items: FormItem[]
  order: number
}

export interface FormItem {
  id: string
  label: string
  narrativeText?: string
  isRedFlag: boolean
  isRequired: boolean
  tooltip?: string
  options?: { value: string; label: string }[]
}

export interface FormConfig {
  complaintId: string
  title: string
  subtitle: string
  riskLevel: 'low' | 'medium' | 'high'
  group: string
  sections: FormSection[]
  redFlagRules: RedFlagRule[]
  calculators: CalculatorConfig[]
  initialConduct: string
  icd10Codes: string[]
}

export interface RedFlagRule {
  id: string
  description: string
  triggerSymptoms: string[]
  severity: 'warning' | 'danger' | 'critical'
  action: string
}

export interface CalculatorConfig {
  id: string
  name: string
  description: string
  link?: string
}

/**
 * Busca uma queixa por ID
 */
export function getComplaintById(id: string) {
  return complaintsData.complaints.find(c => c.id === id)
}

/**
 * Busca queixas por grupo
 */
export function getComplaintsByGroup(group: string) {
  return complaintsData.complaints.filter(c => c.group === group)
}

/**
 * Converte dados de uma queixa para configuração de formulário
 */
export function complaintToFormConfig(complaintId: string): FormConfig | null {
  const complaint = getComplaintById(complaintId)
  if (!complaint) return null

  const extended = complaint.extendedContent || {}

  // Gera seções do formulário
  const sections: FormSection[] = [
    // Seção: Queixa Principal (Info)
    {
      id: 'queixa_principal',
      title: 'Queixa Principal',
      type: 'info',
      order: 1,
      items: [{
        id: 'qp_main',
        label: complaint.title,
        narrativeText: complaint.subtitle,
        isRedFlag: false,
        isRequired: true
      }]
    },

    // Seção: Sintomas Relacionados (Checkboxes)
    {
      id: 'sintomas_relacionados',
      title: 'Sintomas Associados',
      type: 'checkbox',
      order: 2,
      items: (complaint.relatedSymptoms || []).map((symptom, idx) => ({
        id: `symptom_${idx}`,
        label: symptom,
        narrativeText: symptom,
        isRedFlag: false,
        isRequired: false
      }))
    },

    // Seção: Red Flags (Checkboxes com destaque)
    {
      id: 'red_flags',
      title: 'Sinais de Alarme',
      type: 'checkbox',
      order: 3,
      items: (extended.redFlags || []).map((rf, idx) => ({
        id: `redflag_${idx}`,
        label: rf,
        narrativeText: `⚠️ ${rf}`,
        isRedFlag: true,
        isRequired: false,
        tooltip: 'Sinal de alarme - requer atenção imediata'
      }))
    },

    // Seção: Diagnóstico Diferencial (Info/Referência)
    ...(extended.diagnosticoDiferencial && extended.diagnosticoDiferencial.length > 0 ? [{
      id: 'diagnostico_diferencial',
      title: 'Diagnóstico Diferencial',
      type: 'checkbox' as const,
      order: 4,
      items: extended.diagnosticoDiferencial.map((dd, idx) => ({
        id: `dd_${idx}`,
        label: dd,
        narrativeText: dd,
        isRedFlag: false,
        isRequired: false
      }))
    }] : [])
  ]

  // Extrai calculadoras
  const calculators: CalculatorConfig[] = (extended.calculadoras || []).map((calc, idx) => {
    // Remove formatação markdown (**nome**)
    const cleanName = calc.replace(/\*\*/g, '').trim()
    const parts = cleanName.split(' - ')
    return {
      id: `calc_${idx}`,
      name: parts[0] || cleanName,
      description: parts[1] || ''
    }
  })

  // Gera regras de red flag para detecção automática
  const redFlagRules: RedFlagRule[] = (extended.redFlags || []).map((rf, idx) => ({
    id: `rule_${idx}`,
    description: rf,
    triggerSymptoms: extractTriggerSymptoms(rf, complaint.relatedSymptoms || []),
    severity: determineSeverity(rf),
    action: getRecommendedAction(rf)
  }))

  return {
    complaintId: complaint.id,
    title: complaint.title,
    subtitle: complaint.subtitle,
    riskLevel: complaint.riskLevel as 'low' | 'medium' | 'high',
    group: complaint.group,
    sections,
    redFlagRules,
    calculators,
    initialConduct: extended.condutaInicial || '',
    icd10Codes: complaint.icd10Codes || []
  }
}

/**
 * Extrai sintomas que podem disparar um red flag
 */
function extractTriggerSymptoms(redFlag: string, relatedSymptoms: string[]): string[] {
  const rfLower = redFlag.toLowerCase()

  // Mapeia termos comuns para sintomas
  const keywordMap: Record<string, string[]> = {
    'dispneia': ['falta de ar', 'dispneia', 'dificuldade respirar'],
    'febre': ['febre', 'temperatura'],
    'dor': ['dor', 'desconforto'],
    'cianose': ['cianose', 'roxo', 'azulado'],
    'sudorese': ['sudorese', 'suor', 'transpirando'],
    'confusão': ['confusão', 'desorientado', 'alteração consciência'],
    'síncope': ['síncope', 'desmaio', 'perda consciência'],
    'hipotensão': ['hipotensão', 'pressão baixa'],
    'taquicardia': ['taquicardia', 'coração acelerado', 'palpitação']
  }

  const triggers: string[] = []

  for (const [key, keywords] of Object.entries(keywordMap)) {
    if (keywords.some(kw => rfLower.includes(kw))) {
      // Encontra sintoma relacionado correspondente
      const matchingSymptom = relatedSymptoms.find(s =>
        s.toLowerCase().includes(key) ||
        keywords.some(kw => s.toLowerCase().includes(kw))
      )
      if (matchingSymptom) {
        triggers.push(matchingSymptom)
      }
    }
  }

  return triggers
}

/**
 * Determina severidade baseada no texto do red flag
 */
function determineSeverity(redFlag: string): 'warning' | 'danger' | 'critical' {
  const rfLower = redFlag.toLowerCase()

  // Termos críticos
  const criticalTerms = [
    'parada', 'pco', 'choque', 'coma', 'anúria', 'apneia',
    'glasgow < 8', 'hipotensão refratária', 'hemorragia maciça'
  ]

  // Termos de perigo
  const dangerTerms = [
    'spo2 < 90', 'alteração consciência', 'hipotensão',
    'instabilidade', 'sangramento', 'déficit neurológico',
    'convulsão', 'síncope', 'cianose'
  ]

  if (criticalTerms.some(term => rfLower.includes(term))) {
    return 'critical'
  }

  if (dangerTerms.some(term => rfLower.includes(term))) {
    return 'danger'
  }

  return 'warning'
}

/**
 * Retorna ação recomendada baseada no red flag
 */
function getRecommendedAction(redFlag: string): string {
  const rfLower = redFlag.toLowerCase()

  if (rfLower.includes('consciência') || rfLower.includes('glasgow')) {
    return 'Avaliar via aérea, considerar intubação'
  }

  if (rfLower.includes('spo2') || rfLower.includes('cianose')) {
    return 'Ofertar O2 suplementar imediatamente'
  }

  if (rfLower.includes('hipotensão') || rfLower.includes('choque')) {
    return 'Acesso venoso calibroso, ressuscitação volêmica'
  }

  if (rfLower.includes('febre') && rfLower.includes('rigidez')) {
    return 'Considerar punção lombar após estabilização'
  }

  if (rfLower.includes('convulsão')) {
    return 'Benzodiazepínico IV, proteção de via aérea'
  }

  if (rfLower.includes('sangue') || rfLower.includes('hemorragia')) {
    return 'Reservar hemoderivados, acesso calibroso'
  }

  return 'Avaliação médica urgente'
}

/**
 * Lista todas as queixas disponíveis
 */
export function getAllComplaints() {
  return complaintsData.complaints.map(c => ({
    id: c.id,
    title: c.title,
    subtitle: c.subtitle,
    group: c.group,
    riskLevel: c.riskLevel,
    hasExtendedContent: !!(c.extendedContent &&
      (c.extendedContent.redFlags?.length || c.extendedContent.condutaInicial))
  }))
}

/**
 * Agrupa queixas por sistema corporal
 */
export function getComplaintsGroupedBySystem() {
  const groups: Record<string, typeof complaintsData.complaints> = {}

  for (const complaint of complaintsData.complaints) {
    if (!groups[complaint.group]) {
      groups[complaint.group] = []
    }
    groups[complaint.group]!.push(complaint)
  }

  return groups
}
