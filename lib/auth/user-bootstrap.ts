/**
 * User Bootstrap Utilities
 * 
 * Shared helper for ensuring users exist in the database with validated CRM data.
 * This consolidates the duplicated user bootstrap logic across API handlers and server actions.
 */

import { prisma } from '@/lib/db/prisma'
import { validateCrmData } from './validation'
import type { User as SupabaseUser } from '@supabase/supabase-js'

/**
 * Custom error class for CRM validation failures
 * Allows callers to distinguish validation errors from database errors
 */
export class CrmValidationError extends Error {
  readonly isCrmValidationError = true
  
  constructor(message: string) {
    super(message)
    this.name = 'CrmValidationError'
  }
}

// User-facing message for CRM validation failures (detailed messages are internal only)
export const CRM_PUBLIC_ERROR_MESSAGE =
  'Dados de CRM inválidos. Por favor, revise seu CRM e UF no perfil.'

/**
 * Type guard to check if an error is a CrmValidationError
 */
export function isCrmValidationError(error: unknown): error is CrmValidationError {
  return (
    error instanceof CrmValidationError ||
    (error instanceof Error && 'isCrmValidationError' in error && (error as any).isCrmValidationError === true)
  )
}

/**
 * Ensure user exists in database with validated CRM data
 * 
 * Checks if user exists in database. If not, validates CRM data from user metadata
 * and creates the user record. If CRM validation fails, throws an error.
 * 
 * This function consolidates the duplicated "ensure user exists" logic found in:
 * - lib/anamnese/actions.ts
 * - app/api/sessions/route.ts
 * - app/api/chat/conversations/route.ts
 * 
 * @param user - Supabase user object from getUser()
 * @returns The database user record
 * @throws Error if CRM data is invalid or missing
 * 
 * @example
 * ```ts
 * const user = await getUser()
 * if (!user) throw new Error('Unauthorized')
 * const dbUser = await ensureDbUser(user)
 * ```
 */
export async function ensureDbUser(user: SupabaseUser) {
  // Check if user exists in database
  let dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  })

  if (!dbUser) {
    // Validate CRM data using shared helper
    // This throws CrmValidationError for validation failures
    let crmNumber: string
    let crmState: string
    try {
      const validated = validateCrmData(user.user_metadata || {})
      crmNumber = validated.crmNumber
      crmState = validated.crmState
    } catch (error) {
      // Wrap validation errors in CrmValidationError for easy identification
      if (error instanceof Error) {
        throw new CrmValidationError(error.message)
      }
      throw new CrmValidationError('Dados de CRM inválidos')
    }
    
    // Create user with validated CRM data
    // Database errors here will propagate as-is (not wrapped)
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email!,
        fullName: user.user_metadata?.full_name || 'Usuario',
        crmNumber,
        crmState,
      },
    })
  }

  return dbUser
}

