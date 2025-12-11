import type { CheckboxCategory } from '@prisma/client'

type CheckboxData = {
  id: string
  category: CheckboxCategory
  displayText: string
  narrativeText: string
  isRedFlag: boolean
  isNegative: boolean
}

type ValidationResult = {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

// Minimum requirements for AI consultation
const MINIMUM_REQUIREMENTS = {
  minCheckboxes: 3,
  requiredCategories: ['QP'] as CheckboxCategory[],
}

/**
 * Validate if there's enough data for AI consultation
 */
export function validateMinimumData(
  checkedItems: CheckboxData[]
): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Check minimum checkbox count
  if (checkedItems.length < MINIMUM_REQUIREMENTS.minCheckboxes) {
    errors.push(
      `Selecione pelo menos ${MINIMUM_REQUIREMENTS.minCheckboxes} itens para consultar o assistente.`
    )
  }

  // Check required categories
  const categories = new Set(checkedItems.map((item) => item.category))
  for (const required of MINIMUM_REQUIREMENTS.requiredCategories) {
    if (!categories.has(required)) {
      errors.push(`A categoria "Queixa Principal" é obrigatória.`)
    }
  }

  // Warning if no negatives
  const hasNegatives = checkedItems.some((item) => item.isNegative)
  if (!hasNegatives) {
    warnings.push('Considere adicionar negativas pertinentes para melhor contexto.')
  }

  // Warning if no physical exam
  const hasExam = checkedItems.some((item) => item.category === 'EXAME_FISICO')
  if (!hasExam) {
    warnings.push('Adicionar dados do exame físico melhora a qualidade das sugestões.')
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Disclaimer text to be appended to all responses
 */
export const DISCLAIMER_TEXT = `---
⚠️ **IMPORTANTE:** Este conteúdo é para suporte à decisão clínica e NÃO substitui o julgamento médico. O profissional de saúde é responsável por todas as decisões clínicas.`

/**
 * Rate limiting configuration
 */
export const RATE_LIMIT = {
  maxRequestsPerMinute: 20,
  maxRequestsPerHour: 100,
  maxTokensPerRequest: 4096,
}

/**
 * Check if user message contains potentially harmful content
 */
export function validateUserMessage(message: string): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Check message length
  if (message.length > 2000) {
    errors.push('Mensagem muito longa. Limite de 2000 caracteres.')
  }

  if (message.trim().length < 5) {
    errors.push('Mensagem muito curta. Por favor, seja mais específico.')
  }

  // Check for potentially harmful requests
  const harmfulPatterns = [
    /como matar/i,
    /veneno/i,
    /suicid/i,
    /overdose proposital/i,
  ]

  for (const pattern of harmfulPatterns) {
    if (pattern.test(message)) {
      errors.push(
        'Não é possível processar esta solicitação. Se você ou alguém está em crise, procure ajuda: CVV 188.'
      )
      break
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Post-process AI response to ensure safety
 */
export function postProcessResponse(response: string): string {
  let processed = response

  // Ensure disclaimer is present
  if (!processed.includes('suporte à decisão clínica')) {
    processed += '\n\n' + DISCLAIMER_TEXT
  }

  return processed
}
