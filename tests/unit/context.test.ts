import { describe, it, expect } from 'vitest'
import { buildContext, extractRedFlags, buildMinimalContext } from '@/lib/ai/context'
import type { CheckboxCategory } from '@prisma/client'

// Test data factory matching SessionContext structure
type CheckboxData = {
  id: string
  category: CheckboxCategory
  displayText: string
  narrativeText: string
  isRedFlag: boolean
  isNegative: boolean
}

const createCheckbox = (
  overrides: Partial<CheckboxData> = {}
): CheckboxData => ({
  id: overrides.id || 'cb-1',
  category: overrides.category || 'QP',
  displayText: overrides.displayText || 'Test symptom',
  narrativeText: overrides.narrativeText || 'test narrative text',
  isRedFlag: overrides.isRedFlag || false,
  isNegative: overrides.isNegative || false,
})

const createSessionContext = (
  overrides: Partial<{
    syndromeName: string
    syndromeDescription?: string
    checkedItems: CheckboxData[]
    generatedText: string
    redFlags: CheckboxData[]
  }> = {}
) => ({
  syndromeName: overrides.syndromeName || 'Dor Torácica',
  syndromeDescription: overrides.syndromeDescription,
  checkedItems: overrides.checkedItems || [],
  generatedText: overrides.generatedText || 'Texto da anamnese gerado.',
  redFlags: overrides.redFlags || [],
})

describe('buildContext', () => {
  it('should build context from session data', () => {
    const session = createSessionContext({
      syndromeName: 'Dor Torácica',
      generatedText: 'Paciente refere dor precordial.',
      checkedItems: [
        createCheckbox({
          id: 'cb-1',
          category: 'QP',
          displayText: 'Dor precordial',
          narrativeText: 'dor precordial',
        }),
      ],
      redFlags: [],
    })

    const result = buildContext(session)

    expect(result).toContain('Dor Torácica')
    expect(result).toContain('Dor precordial')
  })

  it('should include red flags section when present', () => {
    const redFlagItem = createCheckbox({
      displayText: 'Dor intensa irradiando para MSE',
      isRedFlag: true,
    })
    const session = createSessionContext({
      redFlags: [redFlagItem],
      checkedItems: [],
    })

    const result = buildContext(session)

    expect(result).toContain('Sinais de Alarme')
    expect(result).toContain('Dor intensa irradiando para MSE')
  })

  it('should not include red flags section when empty', () => {
    const session = createSessionContext({
      redFlags: [],
      checkedItems: [],
    })

    const result = buildContext(session)

    expect(result).not.toContain('Sinais de Alarme')
  })

  it('should group checkboxes by category', () => {
    const session = createSessionContext({
      checkedItems: [
        createCheckbox({
          id: 'cb-1',
          category: 'QP',
          displayText: 'Queixa 1',
        }),
        createCheckbox({
          id: 'cb-2',
          category: 'HDA',
          displayText: 'HDA item',
        }),
        createCheckbox({
          id: 'cb-3',
          category: 'QP',
          displayText: 'Queixa 2',
        }),
      ],
      redFlags: [],
    })

    const result = buildContext(session)

    // Both QP items should be grouped together
    expect(result).toContain('Queixa 1')
    expect(result).toContain('Queixa 2')
    expect(result).toContain('HDA item')
  })

  it('should mark red flag items with warning emoji', () => {
    const session = createSessionContext({
      checkedItems: [
        createCheckbox({
          displayText: 'Critical symptom',
          isRedFlag: true,
        }),
      ],
      redFlags: [],
    })

    const result = buildContext(session)

    expect(result).toContain('⚠️ Critical symptom')
  })
})

describe('extractRedFlags', () => {
  it('should extract red flags from checked items array', () => {
    const checkedItems: CheckboxData[] = [
      createCheckbox({ id: 'cb-1', isRedFlag: true, displayText: 'Red Flag 1' }),
      createCheckbox({ id: 'cb-2', isRedFlag: false, displayText: 'Normal' }),
      createCheckbox({ id: 'cb-3', isRedFlag: true, displayText: 'Red Flag 2' }),
    ]

    const result = extractRedFlags(checkedItems)

    expect(result).toHaveLength(2)
    expect(result[0]).toBe('Red Flag 1')
    expect(result[1]).toBe('Red Flag 2')
  })

  it('should return empty array when no red flags', () => {
    const checkedItems: CheckboxData[] = [
      createCheckbox({ isRedFlag: false }),
    ]

    const result = extractRedFlags(checkedItems)

    expect(result).toHaveLength(0)
  })
})

describe('buildMinimalContext', () => {
  it('should build minimal context with just syndrome and symptoms', () => {
    const session = createSessionContext({
      syndromeName: 'Dispneia',
      checkedItems: [
        createCheckbox({
          category: 'QP',
          displayText: 'Falta de ar',
        }),
      ],
      redFlags: [],
      generatedText: 'Paciente com dispneia.',
    })

    const result = buildMinimalContext(session)

    expect(result).toContain('Dispneia')
    expect(result).toContain('Falta de ar')
    expect(result.length).toBeLessThan(buildContext(session).length)
  })

  it('should include red flags in minimal context', () => {
    const session = createSessionContext({
      syndromeName: 'Test',
      checkedItems: [],
      redFlags: [createCheckbox({ displayText: 'Critical Sign' })],
    })

    const result = buildMinimalContext(session)

    expect(result).toContain('Red Flags')
    expect(result).toContain('Critical Sign')
  })

  it('should use pipe separator between parts', () => {
    const session = createSessionContext({
      syndromeName: 'Test',
      checkedItems: [createCheckbox({ category: 'QP', displayText: 'Symptom' })],
      redFlags: [],
    })

    const result = buildMinimalContext(session)

    expect(result).toContain(' | ')
  })
})
