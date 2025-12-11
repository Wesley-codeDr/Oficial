import { describe, it, expect } from 'vitest'
import {
  generateNarrative,
  detectRedFlags,
  formatRedFlagAlert,
  type OutputMode,
} from '@/lib/anamnese/generate-narrative'
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

describe('generateNarrative', () => {
  describe('empty input', () => {
    it('should return empty string when no checkboxes selected', () => {
      const result = generateNarrative([], 'SUMMARY')
      expect(result).toBe('')
    })
  })

  describe('SUMMARY mode', () => {
    it('should generate summary text for single QP checkbox', () => {
      const checkboxes = [
        createCheckbox({
          category: 'QP',
          narrativeText: 'dor precordial',
        }),
      ]

      const result = generateNarrative(checkboxes, 'SUMMARY')

      expect(result).toContain('Paciente refere')
      expect(result).toContain('dor precordial')
    })

    it('should join multiple checkboxes with comma in same category', () => {
      const checkboxes = [
        createCheckbox({
          id: 'cb-1',
          category: 'QP',
          narrativeText: 'dor precordial',
        }),
        createCheckbox({
          id: 'cb-2',
          category: 'QP',
          narrativeText: 'irradiacao para MSE',
        }),
      ]

      const result = generateNarrative(checkboxes, 'SUMMARY')

      expect(result).toContain('dor precordial')
      expect(result).toContain('irradiacao para MSE')
    })

    it('should generate text for multiple categories', () => {
      const checkboxes = [
        createCheckbox({
          id: 'cb-1',
          category: 'QP',
          narrativeText: 'dor precordial',
        }),
        createCheckbox({
          id: 'cb-2',
          category: 'ANTECEDENTES',
          narrativeText: 'hipertensao arterial',
        }),
      ]

      const result = generateNarrative(checkboxes, 'SUMMARY')

      expect(result).toContain('dor precordial')
      expect(result).toContain('hipertensao arterial')
    })

    it('should handle NEGATIVAS category with proper prefix', () => {
      const checkboxes = [
        createCheckbox({
          category: 'NEGATIVAS',
          narrativeText: 'dispneia',
          isNegative: true,
        }),
      ]

      const result = generateNarrative(checkboxes, 'SUMMARY')

      expect(result).toContain('Nega')
      expect(result).toContain('dispneia')
    })
  })

  describe('DETAILED mode', () => {
    it('should include section headers in detailed mode', () => {
      const checkboxes = [
        createCheckbox({
          category: 'QP',
          narrativeText: 'dor precordial',
        }),
      ]

      const result = generateNarrative(checkboxes, 'DETAILED')

      expect(result).toContain('**QUEIXA PRINCIPAL:**')
      expect(result).toContain('dor precordial')
    })

    it('should separate sections with double newlines', () => {
      const checkboxes = [
        createCheckbox({
          id: 'cb-1',
          category: 'QP',
          narrativeText: 'dor precordial',
        }),
        createCheckbox({
          id: 'cb-2',
          category: 'HDA',
          narrativeText: 'inicio subito',
        }),
      ]

      const result = generateNarrative(checkboxes, 'DETAILED')

      expect(result).toContain('**QUEIXA PRINCIPAL:**')
      expect(result).toContain('**HISTORIA DA DOENCA ATUAL:**')
      expect(result).toContain('\n\n')
    })
  })

  describe('category ordering', () => {
    it('should order categories correctly: QP -> HDA -> ANTECEDENTES', () => {
      const checkboxes = [
        createCheckbox({
          id: 'cb-1',
          category: 'ANTECEDENTES',
          narrativeText: 'antecedente text',
        }),
        createCheckbox({
          id: 'cb-2',
          category: 'QP',
          narrativeText: 'qp text',
        }),
        createCheckbox({
          id: 'cb-3',
          category: 'HDA',
          narrativeText: 'hda text',
        }),
      ]

      const result = generateNarrative(checkboxes, 'DETAILED')

      const qpIndex = result.indexOf('QUEIXA PRINCIPAL')
      const hdaIndex = result.indexOf('HISTORIA DA DOENCA ATUAL')
      const antecedentesIndex = result.indexOf('ANTECEDENTES PESSOAIS')

      expect(qpIndex).toBeLessThan(hdaIndex)
      expect(hdaIndex).toBeLessThan(antecedentesIndex)
    })
  })
})

describe('detectRedFlags', () => {
  it('should return empty array when no red flags', () => {
    const checkboxes = [
      createCheckbox({ isRedFlag: false }),
    ]

    const result = detectRedFlags(checkboxes)

    expect(result).toHaveLength(0)
  })

  it('should return checkboxes marked as red flags', () => {
    const checkboxes = [
      createCheckbox({ id: 'cb-1', isRedFlag: true, displayText: 'Red flag 1' }),
      createCheckbox({ id: 'cb-2', isRedFlag: false, displayText: 'Normal' }),
      createCheckbox({ id: 'cb-3', isRedFlag: true, displayText: 'Red flag 2' }),
    ]

    const result = detectRedFlags(checkboxes)

    expect(result).toHaveLength(2)
    expect(result[0]?.displayText).toBe('Red flag 1')
    expect(result[1]?.displayText).toBe('Red flag 2')
  })
})

describe('formatRedFlagAlert', () => {
  it('should return empty string when no red flags', () => {
    const result = formatRedFlagAlert([])

    expect(result).toBe('')
  })

  it('should format red flags as alert message', () => {
    const redFlags = [
      createCheckbox({ displayText: 'Dor precordial intensa' }),
      createCheckbox({ displayText: 'Irradiacao para MSE' }),
    ]

    const result = formatRedFlagAlert(redFlags)

    expect(result).toContain('SINAIS DE ALARME')
    expect(result).toContain('Dor precordial intensa')
    expect(result).toContain('Irradiacao para MSE')
  })
})
