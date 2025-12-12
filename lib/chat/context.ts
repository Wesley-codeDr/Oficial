/**
 * Chat Context Helpers
 * 
 * Utilities for building chat context from sessions and snapshots.
 * Centralizes context reconstruction logic for maintainability.
 */

import { prisma } from '@/lib/db/prisma'
import { buildContext } from '@/lib/ai/context'
import { validateMinimumData } from '@/lib/ai/guardrails'
import { createMinimumDataError } from '@/lib/api/errors'
import type { CheckboxCategory } from '@prisma/client'

export interface ContextResult {
  contextText: string
  redFlags: string[]
  checkedItems: Array<{
    id: string
    category: CheckboxCategory
    displayText: string
    narrativeText: string
    isRedFlag: boolean
    isNegative: boolean
  }>
}

export interface ContextError {
  code: 'SESSION_NOT_FOUND' | 'INCOMPLETE_SESSION_DATA' | 'INVALID_SESSION_DATA' | 'MINIMUM_DATA_REQUIRED'
  message: string
  status: number
}

/**
 * Build context from an AnamneseSession
 * 
 * Fetches the session, verifies ownership, maps checked items,
 * validates minimum data, and builds the context string.
 * 
 * @param sessionId - ID of the anamnese session
 * @param userId - ID of the user (for ownership verification)
 * @returns Context result with text and red flags, or error
 */
export async function buildContextFromSession(
  sessionId: string,
  userId: string
): Promise<{ success: true; data: ContextResult } | { success: false; error: ContextError }> {
  // Fetch session with syndrome and checkboxes
  const session = await prisma.anamneseSession.findUnique({
    where: { id: sessionId },
    include: {
      syndrome: {
        include: {
          checkboxes: true,
        },
      },
    },
  })

  // Verify ownership
  if (!session || session.userId !== userId) {
    return {
      success: false,
      error: {
        code: 'SESSION_NOT_FOUND',
        message: 'Sessão não encontrada ou sem permissão de acesso.',
        status: 404,
      },
    }
  }

  // Validate session structure
  if (!session.syndrome || !session.syndrome.checkboxes || session.syndrome.checkboxes.length === 0) {
    return {
      success: false,
      error: {
        code: 'INCOMPLETE_SESSION_DATA',
        message: 'Os dados da sessão estão incompletos. Por favor, regenere ou salve a anamnese novamente.',
        status: 409,
      },
    }
  }

  // Validate checkedItems format
  const checkedIds = session.checkedItems as string[]
  if (!Array.isArray(checkedIds)) {
    return {
      success: false,
      error: {
        code: 'INVALID_SESSION_DATA',
        message: 'Formato de dados da sessão inválido. Por favor, regenere ou salve a anamnese novamente.',
        status: 409,
      },
    }
  }

  // Filter checkboxes to only those that were checked
  const checkedItems = session.syndrome.checkboxes.filter((cb) => checkedIds.includes(cb.id))

  // Map to validation format
  const checkedItemsForValidation = checkedItems.map((cb) => ({
    id: cb.id,
    category: cb.category as CheckboxCategory,
    displayText: cb.displayText,
    narrativeText: cb.narrativeText,
    isRedFlag: cb.isRedFlag,
    isNegative: cb.isNegative,
  }))

  // Validate minimum data
  const dataValidation = validateMinimumData(checkedItemsForValidation)
  if (!dataValidation.isValid) {
    return {
      success: false,
      error: {
        code: 'MINIMUM_DATA_REQUIRED',
        message: dataValidation.errors.join('; '),
        status: 400,
      },
    }
  }

  // Extract red flags
  const redFlagItems = checkedItems.filter((cb) => cb.isRedFlag)

  // Build context text
  const contextText = buildContext({
    syndromeName: session.syndrome.name,
    syndromeDescription: session.syndrome.description || undefined,
    checkedItems: checkedItemsForValidation,
    generatedText: session.generatedText || '',
    redFlags: redFlagItems.map((cb) => ({
      id: cb.id,
      category: cb.category,
      displayText: cb.displayText,
      narrativeText: cb.narrativeText,
      isRedFlag: cb.isRedFlag,
      isNegative: cb.isNegative,
    })),
  })

  const redFlags = redFlagItems.map((rf) => rf.displayText)

  return {
    success: true,
    data: {
      contextText,
      redFlags,
      checkedItems: checkedItemsForValidation,
    },
  }
}

