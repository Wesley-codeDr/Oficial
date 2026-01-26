/**
 * ChatWell - Claude-style Chat Input Types
 * Professional medical chat interface types
 */

import { generateIdWithPrefix } from '@/lib/utils'

// ===== ATTACHMENT TYPES =====

export type AttachmentType = 'image' | 'document' | 'code'

export interface AttachedFile {
  id: string
  file: File
  preview?: string // Object URL for image previews
  type: AttachmentType
}

export interface PastedSnippet {
  id: string
  content: string
  timestamp: Date
}

// ===== MODEL TYPES =====

export interface MedicalAIModel {
  id: string
  name: string
  description: string
  icon?: string
}

// ===== PAYLOAD TYPES =====

export interface ChatPayload {
  message: string
  attachments: AttachedFile[]
  snippets: PastedSnippet[]
  model: string
  isThinkingEnabled: boolean
}

// ===== COMPONENT PROPS =====

export interface ClaudeChatInputProps {
  /**
   * Callback when user sends a message
   */
  onSendMessage: (payload: ChatPayload) => void
  /**
   * Placeholder text for the input
   * @default "Descreva a queixa, contexto clínico e o que você precisa."
   */
  placeholder?: string
  /**
   * Available AI models for selection
   */
  models?: MedicalAIModel[]
  /**
   * Default selected model ID
   */
  defaultModel?: string
  /**
   * Whether the input is disabled
   */
  disabled?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
}

// ===== DEFAULT MODELS =====

export const DEFAULT_MEDICAL_MODELS: MedicalAIModel[] = [
  {
    id: 'anamnese',
    name: 'Anamnese AI',
    description: 'Coleta estruturada de história clínica',
  },
  {
    id: 'diagnostico',
    name: 'Diagnóstico AI',
    description: 'Diagnóstico diferencial baseado em evidências',
  },
  {
    id: 'conduta',
    name: 'Conduta AI',
    description: 'Sugestões de tratamento e manejo',
  },
  {
    id: 'prescricao',
    name: 'Prescrição AI',
    description: 'Auxílio na prescrição médica',
  },
]

// ===== UTILITY TYPES =====

/**
 * Determines file type from MIME type
 */
export function getAttachmentType(mimeType: string): AttachmentType {
  if (mimeType.startsWith('image/')) {
    return 'image'
  }
  if (
    mimeType.includes('javascript') ||
    mimeType.includes('typescript') ||
    mimeType.includes('json') ||
    mimeType.includes('xml') ||
    mimeType.includes('html') ||
    mimeType.includes('css') ||
    mimeType.includes('text/plain')
  ) {
    return 'code'
  }
  return 'document'
}

/**
 * Generates a unique ID for attachments using UUID v4
 * 
 * @returns Unique attachment ID in format 'att_{uuid}'
 * 
 * @example
 * ```typescript
 * const attachmentId = generateAttachmentId() // 'att-550e8400-e29b-41d4-a716-446655440000'
 * ```
 */
export function generateAttachmentId(): string {
  return generateIdWithPrefix('att-')
}

/**
 * Threshold for creating snippet cards (characters)
 */
export const SNIPPET_THRESHOLD = 500
