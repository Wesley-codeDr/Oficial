import type {
  Syndrome,
  Checkbox,
  RedFlagRule,
  AnamneseSession,
  ChatConversation,
  ChatMessage,
  CheckboxCategory,
  RedFlagSeverity,
  OutputMode,
  MessageRole,
} from '@prisma/client'

// Re-export Prisma types
export type {
  Syndrome,
  Checkbox,
  RedFlagRule,
  AnamneseSession,
  ChatConversation,
  ChatMessage,
}

export { CheckboxCategory, RedFlagSeverity, OutputMode, MessageRole }

// Extended types with relations
export type SyndromeWithCheckboxes = Syndrome & {
  checkboxes: Checkbox[]
  redFlagRules: RedFlagRule[]
}

export type SyndromeWithCounts = Syndrome & {
  _count: {
    checkboxes: number
  }
}

export type CheckboxesByCategory = {
  [K in CheckboxCategory]?: Checkbox[]
}

export type AnamneseSessionWithRelations = AnamneseSession & {
  syndrome: Syndrome
  conversation?: ChatConversation | null
}

export type ChatConversationWithMessages = ChatConversation & {
  messages: ChatMessage[]
}

// Text generation types
export interface GenerationResult {
  text: string
  redFlags: DetectedRedFlag[]
  missingRequired: string[]
}

export interface DetectedRedFlag {
  ruleId: string
  name: string
  severity: RedFlagSeverity
  message: string
}

// Red flag condition types
export type RedFlagCondition =
  | { type: 'AND'; conditions: RedFlagCondition[] }
  | { type: 'OR'; conditions: RedFlagCondition[] }
  | { type: 'checkbox'; id: string; value: boolean }
  | { type: 'checkbox_category'; category: CheckboxCategory; hasRedFlag: boolean }
  | { type: 'checkbox_text'; contains: string }
  | { type: 'count'; category: CheckboxCategory; hasRedFlag: boolean; minimum: number }

// Citation type for EBM chat
export interface Citation {
  author: string
  title: string
  journal: string
  year: number
  pmid?: string
  doi?: string
}

// Anamnese section types
export interface AnamneseSection {
  title: string
  content: string
}

export interface FormattedAnamnese {
  sections: AnamneseSection[]
  fullText: string
}
