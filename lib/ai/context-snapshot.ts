/**
 * Context Snapshot Validation
 * 
 * Strict validation schema for chat conversation context snapshots.
 * Ensures data integrity when reading contextSnapshot from database.
 */

import { z } from 'zod'
import type { CheckboxCategory } from '@prisma/client'

/**
 * Zod schema for validating a single checked item in context snapshot
 */
const checkedItemSchema = z.object({
  id: z.string().min(1, 'Item ID is required'),
  category: z.enum([
    'QP',
    'HDA',
    'ANTECEDENTES',
    'MEDICACOES',
    'ALERGIAS',
    'HABITOS',
    'EXAME_FISICO',
    'NEGATIVAS',
  ]) as z.ZodType<CheckboxCategory>,
  displayText: z.string().min(1, 'Display text is required'),
  narrativeText: z.string().min(1, 'Narrative text is required'),
  isRedFlag: z.boolean(),
  isNegative: z.boolean(),
})

/**
 * Zod schema for validating context snapshot structure
 * 
 * Version defaults to 1 for backward compatibility with legacy snapshots.
 * Currently only version 1 is supported. Future versions will require schema updates.
 */
export const contextSnapshotSchema = z.object({
  version: z.number().int().min(1).max(1).default(1), // Default to 1 for backward compatibility
  syndromeName: z.string().min(1, 'Syndrome name is required'),
  syndromeDescription: z.string().optional(),
  checkedItems: z.array(checkedItemSchema).min(1, 'At least one checked item is required'),
  generatedText: z.string().optional().default(''),
  redFlags: z.array(z.string()).optional().default([]),
})

/**
 * Type inferred from the schema
 */
export type ContextSnapshot = z.infer<typeof contextSnapshotSchema>

/**
 * Parse and validate a context snapshot from JSON
 * 
 * @param snapshot - Raw JSON data from database
 * @returns Parsed and validated snapshot, or throws ZodError
 */
export function parseContextSnapshot(snapshot: unknown): ContextSnapshot {
  return contextSnapshotSchema.parse(snapshot)
}

/**
 * Safe parse context snapshot with error handling
 * 
 * @param snapshot - Raw JSON data from database
 * @returns Success result with parsed data, or error result with validation errors
 */
export function safeParseContextSnapshot(snapshot: unknown): {
  success: boolean
  data?: ContextSnapshot
  error?: {
    code: 'INVALID_CONTEXT_SNAPSHOT' | 'INCOMPLETE_CONTEXT_SNAPSHOT' | 'UNSUPPORTED_SNAPSHOT_VERSION'
    message: string
    details?: z.ZodError
  }
} {
  try {
    const data = parseContextSnapshot(snapshot)
    
    // Version validation is now handled by the schema (max(1))
    // This check remains for backward compatibility with any legacy data
    if (data.version > 1) {
      return {
        success: false,
        error: {
          code: 'UNSUPPORTED_SNAPSHOT_VERSION',
          message: 'Versão do contexto não suportada. Por favor, crie uma nova conversa.',
        },
      }
    }

    // Additional validation: check required fields
    if (!data.syndromeName || data.checkedItems.length === 0) {
      return {
        success: false,
        error: {
          code: 'INCOMPLETE_CONTEXT_SNAPSHOT',
          message: 'O contexto da conversa está incompleto. Por favor, crie uma nova conversa.',
        },
      }
    }

    return { success: true, data }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: {
          code: 'INVALID_CONTEXT_SNAPSHOT',
          message: 'O contexto da conversa está em formato inválido. Por favor, crie uma nova conversa.',
          details: error,
        },
      }
    }
    
    return {
      success: false,
      error: {
        code: 'INVALID_CONTEXT_SNAPSHOT',
        message: 'O contexto da conversa está em formato inválido. Por favor, crie uma nova conversa.',
      },
    }
  }
}

