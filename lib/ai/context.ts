import type { CheckboxCategory } from '@prisma/client'

type CheckboxData = {
  id: string
  category: CheckboxCategory
  displayText: string
  narrativeText: string
  isRedFlag: boolean
  isNegative: boolean
}

type SessionContext = {
  syndromeName: string
  syndromeDescription?: string
  checkedItems: CheckboxData[]
  generatedText: string
  redFlags: CheckboxData[]
}

const CATEGORY_LABELS: Record<CheckboxCategory, string> = {
  QP: 'Queixa Principal',
  HDA: 'História da Doença Atual',
  ANTECEDENTES: 'Antecedentes Pessoais',
  MEDICACOES: 'Medicações em Uso',
  ALERGIAS: 'Alergias',
  HABITOS: 'Hábitos de Vida',
  EXAME_FISICO: 'Exame Físico',
  NEGATIVAS: 'Negativas Pertinentes',
}

/**
 * Build context string from anamnese session for the AI chat
 */
export function buildContext(session: SessionContext): string {
  const sections: string[] = []

  // Syndrome info
  sections.push(`**Síndrome Clínica:** ${session.syndromeName}`)
  if (session.syndromeDescription) {
    sections.push(`**Descrição:** ${session.syndromeDescription}`)
  }

  // Group checked items by category
  const grouped: Record<string, CheckboxData[]> = {}
  for (const item of session.checkedItems) {
    const category = item.category
    const existing = grouped[category]
    if (existing) {
      existing.push(item)
    } else {
      grouped[category] = [item]
    }
  }

  // Build sections
  for (const [category, items] of Object.entries(grouped)) {
    if (!items || items.length === 0) continue
    const label = CATEGORY_LABELS[category as CheckboxCategory] || category
    const texts = items.map((item) => {
      const marker = item.isRedFlag ? '⚠️ ' : ''
      return `${marker}${item.displayText}`
    })
    sections.push(`\n**${label}:**\n- ${texts.join('\n- ')}`)
  }

  // Add generated narrative
  if (session.generatedText) {
    sections.push(`\n**Anamnese Narrativa:**\n${session.generatedText}`)
  }

  // Add red flags explicitly
  if (session.redFlags.length > 0) {
    const flagTexts = session.redFlags.map((rf) => rf.displayText)
    sections.push(
      `\n**⚠️ Sinais de Alarme Identificados:**\n- ${flagTexts.join('\n- ')}`
    )
  }

  return sections.join('\n')
}

/**
 * Extract red flags from checked items
 */
export function extractRedFlags(checkedItems: CheckboxData[]): string[] {
  return checkedItems
    .filter((item) => item.isRedFlag)
    .map((item) => item.displayText)
}

/**
 * Build a minimal context for quick queries (token efficient)
 */
export function buildMinimalContext(session: SessionContext): string {
  const parts: string[] = []

  parts.push(`Síndrome: ${session.syndromeName}`)

  const symptoms = session.checkedItems
    .filter((item) => item.category === 'QP' || item.category === 'HDA')
    .map((item) => item.displayText)
    .join(', ')

  if (symptoms) {
    parts.push(`Sintomas: ${symptoms}`)
  }

  const redFlags = session.redFlags.map((rf) => rf.displayText).join(', ')
  if (redFlags) {
    parts.push(`Red Flags: ${redFlags}`)
  }

  return parts.join(' | ')
}
