import { describe, it, expect } from 'vitest'
import {
  validateMinimumData,
  validateUserMessage,
  postProcessResponse,
  DISCLAIMER_TEXT,
} from '@/lib/ai/guardrails'
import type { CheckboxCategory } from '@prisma/client'

// Test data factory
const createCheckbox = (
  overrides: Partial<{
    id: string
    category: CheckboxCategory
    displayText: string
    narrativeText: string
    isRedFlag: boolean
    isNegative: boolean
  }> = {}
) => ({
  id: overrides.id || 'cb-1',
  category: overrides.category || 'QP',
  displayText: overrides.displayText || 'Test symptom',
  narrativeText: overrides.narrativeText || 'test narrative text',
  isRedFlag: overrides.isRedFlag || false,
  isNegative: overrides.isNegative || false,
})

describe('validateMinimumData', () => {
  it('should fail when no checkboxes selected', () => {
    const result = validateMinimumData([])

    expect(result.isValid).toBe(false)
    expect(result.errors).toContain(
      'Selecione pelo menos 3 itens para consultar o assistente.'
    )
  })

  it('should fail when less than minimum checkboxes', () => {
    const checkboxes = [
      createCheckbox({ id: 'cb-1', category: 'QP' }),
      createCheckbox({ id: 'cb-2', category: 'QP' }),
    ]

    const result = validateMinimumData(checkboxes)

    expect(result.isValid).toBe(false)
  })

  it('should fail when QP category is missing', () => {
    const checkboxes = [
      createCheckbox({ id: 'cb-1', category: 'HDA' }),
      createCheckbox({ id: 'cb-2', category: 'HDA' }),
      createCheckbox({ id: 'cb-3', category: 'ANTECEDENTES' }),
    ]

    const result = validateMinimumData(checkboxes)

    expect(result.isValid).toBe(false)
    expect(result.errors.some((e) => e.includes('Queixa Principal'))).toBe(true)
  })

  it('should pass when minimum requirements are met', () => {
    const checkboxes = [
      createCheckbox({ id: 'cb-1', category: 'QP' }),
      createCheckbox({ id: 'cb-2', category: 'HDA' }),
      createCheckbox({ id: 'cb-3', category: 'ANTECEDENTES' }),
    ]

    const result = validateMinimumData(checkboxes)

    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('should warn when no negatives are included', () => {
    const checkboxes = [
      createCheckbox({ id: 'cb-1', category: 'QP' }),
      createCheckbox({ id: 'cb-2', category: 'HDA' }),
      createCheckbox({ id: 'cb-3', category: 'ANTECEDENTES' }),
    ]

    const result = validateMinimumData(checkboxes)

    expect(result.warnings.some((w) => w.includes('negativas'))).toBe(true)
  })

  it('should warn when no physical exam is included', () => {
    const checkboxes = [
      createCheckbox({ id: 'cb-1', category: 'QP' }),
      createCheckbox({ id: 'cb-2', category: 'HDA' }),
      createCheckbox({ id: 'cb-3', category: 'ANTECEDENTES' }),
    ]

    const result = validateMinimumData(checkboxes)

    expect(result.warnings.some((w) => w.includes('exame físico'))).toBe(true)
  })

  it('should not warn when negatives and exam are included', () => {
    const checkboxes = [
      createCheckbox({ id: 'cb-1', category: 'QP' }),
      createCheckbox({ id: 'cb-2', category: 'HDA' }),
      createCheckbox({ id: 'cb-3', category: 'NEGATIVAS', isNegative: true }),
      createCheckbox({ id: 'cb-4', category: 'EXAME_FISICO' }),
    ]

    const result = validateMinimumData(checkboxes)

    expect(result.warnings).toHaveLength(0)
  })
})

describe('validateUserMessage', () => {
  it('should fail for empty message', () => {
    const result = validateUserMessage('')

    expect(result.isValid).toBe(false)
  })

  it('should fail for very short message', () => {
    const result = validateUserMessage('hi')

    expect(result.isValid).toBe(false)
    expect(result.errors.some((e) => e.includes('curta'))).toBe(true)
  })

  it('should fail for very long message', () => {
    const longMessage = 'a'.repeat(2001)
    const result = validateUserMessage(longMessage)

    expect(result.isValid).toBe(false)
    expect(result.errors.some((e) => e.includes('longa'))).toBe(true)
  })

  it('should pass for valid message', () => {
    const result = validateUserMessage(
      'Qual o diagnostico diferencial para dor toracica?'
    )

    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('should block potentially harmful content', () => {
    const result = validateUserMessage('como posso me suicidar')

    expect(result.isValid).toBe(false)
    expect(result.errors.some((e) => e.includes('CVV'))).toBe(true)
  })
})

describe('postProcessResponse', () => {
  it('should add disclaimer if not present', () => {
    const response = 'Esta e uma resposta medica simples.'

    const result = postProcessResponse(response)

    expect(result).toContain('suporte à decisão clínica')
  })

  it('should not duplicate disclaimer if already present', () => {
    const response = `Resposta medica. ${DISCLAIMER_TEXT}`

    const result = postProcessResponse(response)

    const disclaimerCount = (
      result.match(/suporte à decisão clínica/g) || []
    ).length

    expect(disclaimerCount).toBe(1)
  })
})
