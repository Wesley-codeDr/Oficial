/**
 * CRM Validation Utilities
 * 
 * Shared validation functions for CRM data.
 * This file does NOT use 'use server' as these are pure validation functions.
 */

export interface CrmValidationError {
  field: 'crm_number' | 'crm_state' | 'both'
  message: string
}

/**
 * Validate CRM data from user metadata
 * 
 * Validates that CRM number and state are present and valid.
 * Returns detailed error information for better user feedback.
 * 
 * @param userMetadata - User metadata from Supabase Auth
 * @returns Validated CRM data
 * @throws Error with detailed message about which fields are missing or invalid
 */
export function validateCrmData(userMetadata: {
  crm_number?: string | null
  crm_state?: string | null
}): { crmNumber: string; crmState: string } {
  const crmNumber = userMetadata.crm_number
  const crmState = userMetadata.crm_state

  // Check for missing fields
  const missingFields: string[] = []
  if (!crmNumber || crmNumber.trim() === '') {
    missingFields.push('número do CRM')
  }
  if (!crmState || crmState.trim() === '') {
    missingFields.push('UF do CRM')
  }

  if (missingFields.length > 0) {
    const fieldsText = missingFields.join(' e ')
    throw new Error(
      `Dados de CRM incompletos: ${fieldsText} não informado(s). Por favor, complete seu perfil com informações válidas de CRM.`
    )
  }

  // Validate CRM number format (should not be placeholder)
  if (crmNumber === '000000' || crmNumber.length < 4) {
    throw new Error(
      'Número de CRM inválido. Por favor, informe um número de CRM válido (mínimo 4 dígitos).'
    )
  }

  // Validate CRM state format (must be exactly 2 characters)
  const normalizedState = crmState.trim().toUpperCase()
  if (normalizedState.length !== 2) {
    throw new Error(
      'UF do CRM inválida. Por favor, informe a UF com exatamente 2 caracteres (ex: SP, RJ, MG).'
    )
  }

  // Validate state is a valid Brazilian state code
  const validStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ]
  if (!validStates.includes(normalizedState)) {
    throw new Error(
      `UF do CRM inválida: "${normalizedState}". Por favor, informe uma UF válida do Brasil.`
    )
  }

  return {
    crmNumber: crmNumber.trim(),
    crmState: normalizedState,
  }
}



