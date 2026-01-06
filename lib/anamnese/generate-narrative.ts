/**
 * Gerador de Narrativa Médica
 *
 * Transforma checkboxes selecionados em texto corrido técnico-médico
 * pronto para copiar e colar no prontuário eletrônico.
 *
 * O texto gerado segue padrões de documentação médica profissional
 * com terminologia técnica e proteção jurídica implícita.
 *
 * Suporta:
 * - Concordância de gênero (masculino/feminino)
 * - Pacientes pediátricos ("Acompanhante refere...")
 * - Escala de intensidade (leve/moderada/forte)
 * - Transformação de termos leigos para técnicos
 */

import { CheckboxCategory } from '@prisma/client'
import {
  PatientContext,
  getRefersPrefix,
  intensityToText,
  evolutionToText,
  applyGenderConcordance,
  applyLeigoTransform,
  COMPLETE_NARRATIVES,
  CATEGORY_VERBS,
} from './narrative-templates'

// Re-export PatientContext for external use
export type { PatientContext } from './narrative-templates'

type CheckboxData = {
  id: string
  category: CheckboxCategory
  displayText: string
  narrativeText: string
  isRedFlag: boolean
  isNegative: boolean
}

type CategoryConfig = {
  title: string
  summaryPrefix: string
  detailPrefix: string
  separator: string
  lastSeparator: string
  suffix: string
}

/**
 * Configuração de formatação por categoria
 * Otimizada para gerar texto corrido fluido com verbos padrão médicos
 *
 * Padrão de escrita:
 * - Refere: sintomas relatados pelo paciente (HDA)
 * - Apresenta: achados clínicos ativos (EXAME_FISICO)
 * - Evidencia: sinais objetivos do exame físico
 * - História de: antecedentes e história pregressa
 * - Nega: negativas pertinentes
 */
const CATEGORY_CONFIG: Record<CheckboxCategory, CategoryConfig> = {
  QP: {
    title: 'Queixa Principal',
    summaryPrefix: 'Paciente comparece ao serviço de emergência com queixa de ',
    detailPrefix: 'Paciente comparece ao serviço de emergência com queixa de ',
    separator: ' e ',
    lastSeparator: ' e ',
    suffix: '.',
  },
  HDA: {
    title: 'História da Doença Atual',
    summaryPrefix: 'Refere ',
    detailPrefix: 'Refere ',
    separator: ', ',
    lastSeparator: ', ',
    suffix: '.',
  },
  ANTECEDENTES: {
    title: 'Antecedentes Pessoais',
    summaryPrefix: 'História de ',
    detailPrefix: 'História de ',
    separator: ', ',
    lastSeparator: ' e ',
    suffix: '.',
  },
  MEDICACOES: {
    title: 'Medicações em Uso',
    summaryPrefix: 'Em uso de ',
    detailPrefix: 'Em uso de ',
    separator: ', ',
    lastSeparator: ' e ',
    suffix: '.',
  },
  ALERGIAS: {
    title: 'Alergias',
    summaryPrefix: 'Refere alergia a ',
    detailPrefix: 'Refere alergia a ',
    separator: ', ',
    lastSeparator: ' e ',
    suffix: '.',
  },
  HABITOS: {
    title: 'Hábitos de Vida',
    summaryPrefix: 'Refere ',
    detailPrefix: 'Refere ',
    separator: ', ',
    lastSeparator: ', ',
    suffix: '.',
  },
  EXAME_FISICO: {
    title: 'Exame Físico',
    summaryPrefix: 'Apresenta ',
    detailPrefix: 'Apresenta ',
    separator: '. ',
    lastSeparator: '. ',
    suffix: '.',
  },
  NEGATIVAS: {
    title: 'Negativas Pertinentes',
    summaryPrefix: 'Nega ',
    detailPrefix: 'Nega ',
    separator: ', ',
    lastSeparator: ' e ',
    suffix: '.',
  },
}

const CATEGORY_ORDER: CheckboxCategory[] = [
  'QP',
  'HDA',
  'ANTECEDENTES',
  'MEDICACOES',
  'ALERGIAS',
  'HABITOS',
  'EXAME_FISICO',
  'NEGATIVAS',
]

export type OutputMode = 'SUMMARY' | 'DETAILED'

/**
 * Contexto de queixa para enriquecimento da narrativa com EBM
 */
export type ComplaintContext = {
  complaintId: string
  complaintTitle: string
  complaintGroup: string
  complaintEBM?: {
    redFlags?: Array<{
      description: string
      severity: 'critical' | 'warning' | 'caution'
      immediateAction?: string
    }>
    diagnosticoDiferencial?: Array<{
      condition: string
      icd10?: string
      probability: 'high' | 'medium' | 'low'
    }>
    condutaInicial?: string
    ebmReferences?: Array<{
      title: string
      source: string
    }>
  }
}

/**
 * Junta itens com separador apropriado e "e" antes do último
 */
function joinWithLastSeparator(
  items: string[],
  separator: string,
  lastSeparator: string
): string {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0] ?? ''
  if (items.length === 2) return (items[0] ?? '') + lastSeparator + (items[1] ?? '')

  const lastItem = items[items.length - 1] ?? ''
  const otherItems = items.slice(0, -1)
  return otherItems.join(separator) + lastSeparator + lastItem
}

/**
 * Processa a narrativa de um checkbox para remover prefixos redundantes
 */
function cleanNarrative(text: string, category: CheckboxCategory): string {
  // Remove "ALERTA: " do início para red flags (será adicionado separadamente)
  if (text.startsWith('ALERTA: ')) {
    return text.substring(8)
  }

  // Remove prefixos redundantes baseados na categoria
  const prefixesToRemove: Record<CheckboxCategory, string[]> = {
    QP: [
      'Paciente comparece ao serviço de emergência com queixa de ',
      'paciente comparece ao serviço de emergência com queixa de ',
      'Paciente comparece com queixa de ',
      'paciente comparece com queixa de ',
    ],
    HDA: ['Refere ', 'refere '],
    NEGATIVAS: ['Nega ', 'nega '],
    ANTECEDENTES: ['Antecedentes: ', 'antecedentes: ', 'Antecedentes pessoais: '],
    MEDICACOES: ['Em uso de ', 'em uso de ', 'Medicações em uso: '],
    ALERGIAS: ['Alergia a ', 'alergia a ', 'Alergias: '],
    HABITOS: ['Hábitos: '],
    EXAME_FISICO: ['Ao exame: ', 'ao exame: ', 'Ao exame físico: '],
  }

  const prefixes = prefixesToRemove[category] || []
  for (const prefix of prefixes) {
    if (text.startsWith(prefix)) {
      return text.substring(prefix.length)
    }
  }

  return text
}

/**
 * Gera narrativa médica completa a partir dos checkboxes selecionados
 *
 * @param selectedCheckboxes - Lista de checkboxes selecionados
 * @param mode - Modo de saída: SUMMARY (texto corrido) ou DETAILED (com títulos)
 * @param context - Contexto do paciente (gênero, pediátrico, intensidade)
 * @param complaintContext - Contexto da queixa com dados EBM (opcional)
 */
export function generateNarrative(
  selectedCheckboxes: CheckboxData[],
  mode: OutputMode = 'SUMMARY',
  context?: PatientContext,
  complaintContext?: ComplaintContext
): string {
  if (selectedCheckboxes.length === 0) {
    return ''
  }

  // Contexto padrão se não fornecido
  const patientContext: PatientContext = context ?? {
    gender: 'M',
    isPediatric: false,
  }

  // Separa red flags dos outros checkboxes
  const regularCheckboxes = selectedCheckboxes.filter(cb => !cb.isRedFlag)
  const redFlagCheckboxes = selectedCheckboxes.filter(cb => cb.isRedFlag)

  // Agrupa por categoria
  const grouped = regularCheckboxes.reduce(
    (acc, checkbox) => {
      if (!acc[checkbox.category]) {
        acc[checkbox.category] = []
      }
      acc[checkbox.category].push(checkbox)
      return acc
    },
    {} as Record<CheckboxCategory, CheckboxData[]>
  )

  const sections: string[] = []

  // Processa cada categoria na ordem
  for (const category of CATEGORY_ORDER) {
    const checkboxes = grouped[category]
    if (!checkboxes || checkboxes.length === 0) continue

    const config = CATEGORY_CONFIG[category]

    // Para EXAME_FISICO, separa itens por verbo (Apresenta vs Evidencia)
    if (category === 'EXAME_FISICO') {
      const apresentaItems: string[] = []
      const evidenciaItems: string[] = []

      for (const cb of checkboxes) {
        let text = cleanNarrative(cb.narrativeText, category)
        text = applyLeigoTransform(text)
        text = applyGenderConcordance(text, patientContext.gender)

        // Verifica se o checkbox tem verbo específico definido
        const completeNarrative = COMPLETE_NARRATIVES[cb.displayText]
        if (completeNarrative?.verb === 'SINAIS_OBJETIVOS') {
          evidenciaItems.push(text)
        } else {
          apresentaItems.push(text)
        }
      }

      // Monta seção de "Apresenta" se houver itens
      if (apresentaItems.length > 0) {
        const apresentaContent = joinWithLastSeparator(apresentaItems, config.separator, config.lastSeparator)
        let apresentaText = mode === 'DETAILED'
          ? `**${config.title}:**\n${CATEGORY_VERBS.ACHADOS_CLINICOS} ${apresentaContent}${config.suffix}`
          : `${CATEGORY_VERBS.ACHADOS_CLINICOS} ${apresentaContent}${config.suffix}`
        apresentaText = applyGenderConcordance(apresentaText, patientContext.gender)
        sections.push(apresentaText)
      }

      // Monta seção de "Evidencia" se houver itens
      if (evidenciaItems.length > 0) {
        const evidenciaContent = joinWithLastSeparator(evidenciaItems, config.separator, config.lastSeparator)
        let evidenciaText = mode === 'DETAILED'
          ? `${CATEGORY_VERBS.SINAIS_OBJETIVOS} ${evidenciaContent}${config.suffix}`
          : `${CATEGORY_VERBS.SINAIS_OBJETIVOS} ${evidenciaContent}${config.suffix}`
        evidenciaText = applyGenderConcordance(evidenciaText, patientContext.gender)
        sections.push(evidenciaText)
      }

      continue
    }

    // Limpa e processa narrativas
    const narratives = checkboxes.map(cb => {
      let text = cleanNarrative(cb.narrativeText, category)

      // Aplica transformação de termos leigos para técnicos
      text = applyLeigoTransform(text)

      // Aplica concordância de gênero
      text = applyGenderConcordance(text, patientContext.gender)

      return text
    })

    // Determina o prefixo baseado no contexto
    let prefix = mode === 'DETAILED' ? config.detailPrefix : config.summaryPrefix

    // Para HDA: usa "Acompanhante refere" se for pediátrico
    if (category === 'HDA') {
      const refersPrefix = getRefersPrefix(patientContext.isPediatric)
      prefix = prefix.replace('Refere', refersPrefix)
    }

    // Monta o conteúdo
    let content = joinWithLastSeparator(narratives, config.separator, config.lastSeparator)

    // Adiciona modificadores de intensidade e evolução (apenas para HDA)
    if (category === 'HDA') {
      const modifiers: string[] = []

      // Adiciona evolução temporal se disponível
      if (patientContext.evolutionType || patientContext.onsetType) {
        const evolutionText = evolutionToText(
          patientContext.evolutionType,
          patientContext.onsetType
        )
        if (evolutionText) modifiers.push(evolutionText)
      }

      // Adiciona intensidade se disponível
      if (patientContext.painIntensity && patientContext.painIntensity > 0) {
        const intensityText = intensityToText(patientContext.painIntensity)
        if (intensityText) modifiers.push(intensityText)
      }

      // Concatena modificadores ao conteúdo
      if (modifiers.length > 0) {
        content = content + ', ' + modifiers.join(', ')
      }
    }

    let sectionText: string

    if (mode === 'DETAILED') {
      // Modo detalhado: com cabeçalhos de seção
      sectionText = `**${config.title}:**\n${prefix}${content}${config.suffix}`
    } else {
      // Modo resumido: texto corrido
      sectionText = prefix + content + config.suffix
    }

    // Aplica concordância de gênero ao texto final da seção
    sectionText = applyGenderConcordance(sectionText, patientContext.gender)

    sections.push(sectionText)
  }

  // Adiciona red flags ao final com destaque
  if (redFlagCheckboxes.length > 0) {
    const redFlagNarratives = redFlagCheckboxes.map(cb => {
      let text = cleanNarrative(cb.narrativeText, 'HDA')
      text = applyLeigoTransform(text)
      text = applyGenderConcordance(text, patientContext.gender)
      return text
    })

    const redFlagSection = mode === 'DETAILED'
      ? `**⚠️ SINAIS DE ALARME:**\n${redFlagNarratives.map(rf => `• ${rf}`).join('\n')}`
      : `ALERTA: ${redFlagNarratives.join('; ')}.`

    sections.push(redFlagSection)
  }

  // Adiciona contexto EBM se disponível (apenas em modo DETAILED)
  if (mode === 'DETAILED' && complaintContext?.complaintEBM) {
    const ebm = complaintContext.complaintEBM

    // Adiciona diagnósticos diferenciais de alta probabilidade
    if (ebm.diagnosticoDiferencial && ebm.diagnosticoDiferencial.length > 0) {
      const highProbDD = ebm.diagnosticoDiferencial
        .filter(dd => dd.probability === 'high')
        .slice(0, 3) // Máximo 3 diagnósticos

      if (highProbDD.length > 0) {
        const ddList = highProbDD.map(dd => {
          const icd = dd.icd10 ? ` (${dd.icd10})` : ''
          return `• ${dd.condition}${icd}`
        }).join('\n')

        sections.push(`**📋 Diagnósticos Diferenciais Principais:**\n${ddList}`)
      }
    }

    // Adiciona nota sobre protocolo disponível
    if (ebm.condutaInicial) {
      sections.push(`**📖 Nota:** Protocolo de conduta inicial disponível no sistema.`)
    }
  }

  // Junta as seções
  const separator = mode === 'DETAILED' ? '\n\n' : ' '
  return sections.join(separator)
}

/**
 * Detecta checkboxes marcados como red flag
 */
export function detectRedFlags(selectedCheckboxes: CheckboxData[]): CheckboxData[] {
  return selectedCheckboxes.filter((cb) => cb.isRedFlag)
}

/**
 * Formata alerta de red flags para exibição
 */
export function formatRedFlagAlert(redFlags: CheckboxData[]): string {
  if (redFlags.length === 0) return ''

  const alerts = redFlags.map((rf) => {
    // Remove o emoji e "ALERTA:" do início
    const cleanText = rf.narrativeText
      .replace(/^⚠️\s*/, '')
      .replace(/^ALERTA:\s*/i, '')
    return `• ${cleanText}`
  })

  return `⚠️ SINAIS DE ALARME DETECTADOS:\n${alerts.join('\n')}`
}

/**
 * Gera uma versão para prontuário (sem markdown, texto puro)
 *
 * @param selectedCheckboxes - Lista de checkboxes selecionados
 * @param context - Contexto do paciente (gênero, pediátrico, intensidade)
 */
export function generateProntuarioText(
  selectedCheckboxes: CheckboxData[],
  context?: PatientContext
): string {
  const narrative = generateNarrative(selectedCheckboxes, 'DETAILED', context)

  // Remove formatação markdown
  return narrative
    .replace(/\*\*/g, '')
    .replace(/\n\n/g, '\n')
    .trim()
}
