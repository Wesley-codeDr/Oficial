import { CheckboxCategory } from '@prisma/client'

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
  suffix: string
}

const CATEGORY_CONFIG: Record<CheckboxCategory, CategoryConfig> = {
  QP: {
    title: 'Queixa principal',
    summaryPrefix: 'Queixa principal: ',
    detailPrefix: '',
    separator: ', ',
    suffix: '.',
  },
  HDA: {
    title: 'Historia da doenca atual',
    summaryPrefix: 'Historia da doenca atual: ',
    detailPrefix: '',
    separator: ', ',
    suffix: '.',
  },
  ANTECEDENTES: {
    title: 'Antecedentes pessoais',
    summaryPrefix: 'Antecedentes pessoais: ',
    detailPrefix: '',
    separator: ', ',
    suffix: '.',
  },
  MEDICACOES: {
    title: 'Medicacoes em uso',
    summaryPrefix: 'Medicacoes em uso: ',
    detailPrefix: '',
    separator: ', ',
    suffix: '.',
  },
  ALERGIAS: {
    title: 'Alergias',
    summaryPrefix: 'Alergias: ',
    detailPrefix: '',
    separator: ', ',
    suffix: '.',
  },
  HABITOS: {
    title: 'Habitos de vida',
    summaryPrefix: 'Habitos de vida: ',
    detailPrefix: '',
    separator: ', ',
    suffix: '.',
  },
  EXAME_FISICO: {
    title: 'Exame fisico',
    summaryPrefix: 'Ao exame fisico: ',
    detailPrefix: '',
    separator: ', ',
    suffix: '.',
  },
  NEGATIVAS: {
    title: 'Negativas pertinentes',
    summaryPrefix: 'Nega: ',
    detailPrefix: 'Nega: ',
    separator: ', ',
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

export function generateNarrative(
  selectedCheckboxes: CheckboxData[],
  mode: OutputMode = 'SUMMARY'
): string {
  if (selectedCheckboxes.length === 0) {
    return ''
  }

  // Group checkboxes by category
  const grouped = selectedCheckboxes.reduce(
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

  for (const category of CATEGORY_ORDER) {
    const checkboxes = grouped[category]
    if (!checkboxes || checkboxes.length === 0) continue

    const config = CATEGORY_CONFIG[category]
    const narratives = checkboxes.map((cb) => cb.narrativeText)

    let sectionText: string
    const prefix = mode === 'DETAILED' ? config.detailPrefix : config.summaryPrefix

    if (mode === 'DETAILED') {
      // Detailed mode: includes section headers
      const content = prefix + narratives.join(config.separator) + config.suffix
      sectionText = `**${config.title}:**\n${content}`
    } else {
      // Summary mode: more compact, no headers
      sectionText = prefix + narratives.join(config.separator) + config.suffix
    }

    sections.push(sectionText)
  }

  return mode === 'DETAILED' ? sections.join('\n\n') : sections.join(' ')
}

export function detectRedFlags(selectedCheckboxes: CheckboxData[]): CheckboxData[] {
  return selectedCheckboxes.filter((cb) => cb.isRedFlag)
}

export function formatRedFlagAlert(redFlags: CheckboxData[]): string {
  if (redFlags.length === 0) return ''

  const alerts = redFlags.map((rf) => `- ${rf.displayText}`).join('\n')

  return `⚠️ SINAIS DE ALARME DETECTADOS:\n${alerts}`
}
