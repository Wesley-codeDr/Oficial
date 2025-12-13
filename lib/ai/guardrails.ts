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

  // Comprehensive safety patterns for harmful content
  // Organized by category for maintainability
  const harmfulPatterns = {
    selfHarm: [
      /como (me )?matar/i,
      /como (me )?suicid/i,
      /quero (me )?matar/i,
      /quero (me )?suicid/i,
      /vou (me )?matar/i,
      /vou (me )?suicid/i,
      /auto( |-)?les/i,
      /cortar (os )?pulsos/i,
      /enforcar/i,
      /pular (de|do|da)/i,
    ],
    violence: [
      /como matar (alguém|outra pessoa)/i,
      /como assassinar/i,
      /como torturar/i,
      /como fazer mal/i,
      /violência/i,
      /agredir/i,
    ],
    substanceAbuse: [
      /overdose proposital/i,
      /overdose intencional/i,
      /como usar drogas/i,
      /como injetar/i,
      /dose letal/i,
    ],
    medicalMisuse: [
      /veneno/i,
      /substância tóxica/i,
      /medicamento em excesso/i,
      /dose excessiva/i,
    ],
  }

  // Check all pattern categories
  for (const [category, patterns] of Object.entries(harmfulPatterns)) {
    for (const pattern of patterns) {
      if (pattern.test(message)) {
        if (category === 'selfHarm') {
          errors.push(
            'Não é possível processar esta solicitação. Se você ou alguém está em crise, procure ajuda imediatamente: CVV 188 (24h) ou SAMU 192.'
          )
        } else {
          errors.push(
            'Não é possível processar esta solicitação. Por favor, reformule sua pergunta de forma apropriada para um contexto médico.'
          )
        }
        break
      }
    }
    if (errors.length > 0) break // Stop checking after first match
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
