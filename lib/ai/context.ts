import type { Message as AiMessage } from 'ai'
import type { AnamneseSession, Checkbox, CheckboxCategory, Syndrome } from '@prisma/client'
import { MODEL_CONFIG } from './config'
import type { ContextSnapshot } from './context-snapshot'

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

type SessionWithContext = Pick<AnamneseSession, 'checkedItems' | 'generatedText'> & {
  syndrome: Syndrome & { checkboxes: Checkbox[] }
}

export interface BuiltSessionContext {
  context: SessionContext
  snapshot: ContextSnapshot
  checkedItems: CheckboxData[]
  redFlags: CheckboxData[]
}

/**
 * Build a normalized context structure (and snapshot) from a loaded session.
 * All AI/chat context should flow through this helper to keep semantics consistent.
 */
export function buildSessionContext(session: SessionWithContext): BuiltSessionContext {
  const checkedIds = Array.isArray(session.checkedItems) ? (session.checkedItems as string[]) : []
  const checkedItems = session.syndrome.checkboxes.filter((cb) => checkedIds.includes(cb.id))

  const normalizedCheckedItems: CheckboxData[] = checkedItems.map((cb) => ({
    id: cb.id,
    category: cb.category,
    displayText: cb.displayText,
    narrativeText: cb.narrativeText,
    isRedFlag: cb.isRedFlag,
    isNegative: cb.isNegative,
  }))

  const redFlagItems = normalizedCheckedItems.filter((item) => item.isRedFlag)

  const context: SessionContext = {
    syndromeName: session.syndrome.name,
    syndromeDescription: session.syndrome.description || undefined,
    checkedItems: normalizedCheckedItems,
    generatedText: session.generatedText || '',
    redFlags: redFlagItems,
  }

  const snapshot: ContextSnapshot = {
    version: 1,
    syndromeName: context.syndromeName,
    syndromeDescription: context.syndromeDescription,
    checkedItems: normalizedCheckedItems,
    generatedText: context.generatedText,
    redFlags: redFlagItems.map((rf) => rf.displayText),
  }

  return {
    context,
    snapshot,
    checkedItems: normalizedCheckedItems,
    redFlags: redFlagItems,
  }
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

type ChatMessage = Pick<AiMessage, 'id' | 'role' | 'content'>

/**
 * Limit the number of messages sent to the model to avoid runaway token counts.
 * Defaults to the 20 most recent messages or a rough token budget derived from MODEL_CONFIG.
 */
export function truncateMessageHistory<T extends ChatMessage>(
  messages: T[],
  maxMessages = 20,
  tokenBudget = MODEL_CONFIG.maxTokens * 4
): T[] {
  const estimateTokens = (text: string) => Math.ceil(text.trim().split(/\s+/).length * 1.25)
  const reversed = [...messages].reverse()
  const kept: T[] = []
  let runningTokens = 0

  for (const message of reversed) {
    const tokens = estimateTokens(message.content)
    const withinBudget = runningTokens + tokens <= tokenBudget || kept.length === 0

    if (kept.length < maxMessages && withinBudget) {
      kept.push(message)
      runningTokens += tokens
    } else {
      break
    }
  }

  return kept.reverse()
}
