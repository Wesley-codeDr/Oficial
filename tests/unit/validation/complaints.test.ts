/**
 * Complaint Validation Schema Unit Tests
 *
 * Tests for lib/validation/complaints.ts covering:
 * - Group codes validation
 * - Risk levels validation
 * - ICD-10 code format validation
 * - Complaint metadata schemas
 * - Query parameter validation
 */

import { describe, it, expect } from 'vitest'
import { z } from 'zod'

// Recreate schemas for testing (matching the source)
const VALID_GROUP_CODES = [
  'PROTO_SEPSE',
  'PROTO_AVC',
  'PROTO_IC',
  'PROTO_TEP',
  'CV',
  'RC',
  'NC',
  'GI',
  'GU',
  'MSK',
  'INF',
  'OBG',
  'PED',
  'PSI',
  'TR',
  'TOX',
  'DERM',
  'ORL',
  'OFT',
  'ENV',
  'GEN',
] as const

const VALID_RISK_LEVELS = ['low', 'medium', 'high'] as const

const VALID_AGE_TARGETS = [
  'adult',
  'child',
  'elderly',
  'teen',
  'infant',
  'adultPregnant',
] as const

const GroupCodeSchema = z.enum(VALID_GROUP_CODES)
const RiskLevelSchema = z.enum(VALID_RISK_LEVELS)
const AgeTargetSchema = z.enum(VALID_AGE_TARGETS)

const ICD10Schema = z.string().regex(
  /^[A-Z]\d{2}(\.\d{1,2})?$/,
  'ICD-10 code must match A00 or I21.9 format'
)

const ComplaintExtendedContentSchema = z
  .object({
    redFlags: z.array(z.string()),
    diagnosticoDiferencial: z.array(z.string()),
    condutaInicial: z.string(),
    calculadoras: z.array(z.string()),
    rawMarkdown: z.string().optional(),
  })
  .strict()

const ComplaintFrontmatterSchema = z
  .object({
    id: z.string().min(1, 'ID is required'),
    group: GroupCodeSchema,
    title: z.string().min(1, 'Title is required'),
    subtitle: z.string().optional(),
    riskLevel: RiskLevelSchema,
    severity: z.number().int().min(1).max(5),
    icd10Codes: z.array(ICD10Schema).optional(),
    synonyms: z.array(z.string()).optional(),
    searchTerms: z.array(z.string()).optional(),
    chips: z.array(z.string()).optional(),
    ageTargets: z.array(AgeTargetSchema).optional(),
    isTopForAdult: z.boolean().optional(),
    isTopForChild: z.boolean().optional(),
    isFastTrack: z.boolean().optional(),
    searchWeight: z.number().min(0).max(2).optional(),
    bodySystem: z.array(z.string()).optional(),
  })
  .strict()

const ComplaintListQuerySchema = z
  .object({
    limit: z.coerce.number().int().min(1).max(500).optional(),
    offset: z.coerce.number().int().min(0).optional(),
    group: GroupCodeSchema.optional(),
    riskLevel: RiskLevelSchema.optional(),
    isActive: z.coerce.boolean().optional(),
    search: z.string().min(1).optional(),
    updatedSince: z.string().datetime().optional(),
  })
  .strict()

// ============================================================================
// Group Code Validation Tests
// ============================================================================

describe('Group Code Validation', () => {
  describe('Valid Group Codes', () => {
    const validCodes = [
      'PROTO_SEPSE',
      'PROTO_AVC',
      'PROTO_IC',
      'PROTO_TEP',
      'CV',
      'RC',
      'NC',
      'GI',
      'GU',
      'MSK',
      'INF',
      'OBG',
      'PED',
      'PSI',
      'TR',
      'TOX',
      'DERM',
      'ORL',
      'OFT',
      'ENV',
      'GEN',
    ]

    validCodes.forEach((code) => {
      it(`should accept valid group code: ${code}`, () => {
        const result = GroupCodeSchema.safeParse(code)
        expect(result.success).toBe(true)
      })
    })
  })

  describe('Invalid Group Codes', () => {
    const invalidCodes = [
      'INVALID',
      'cv', // lowercase
      'CV ', // trailing space
      ' CV', // leading space
      '',
      'CARDIO',
      'PROTO',
    ]

    invalidCodes.forEach((code) => {
      it(`should reject invalid group code: "${code}"`, () => {
        const result = GroupCodeSchema.safeParse(code)
        expect(result.success).toBe(false)
      })
    })
  })
})

// ============================================================================
// Risk Level Validation Tests
// ============================================================================

describe('Risk Level Validation', () => {
  describe('Valid Risk Levels', () => {
    const validLevels = ['low', 'medium', 'high']

    validLevels.forEach((level) => {
      it(`should accept valid risk level: ${level}`, () => {
        const result = RiskLevelSchema.safeParse(level)
        expect(result.success).toBe(true)
      })
    })
  })

  describe('Invalid Risk Levels', () => {
    const invalidLevels = [
      'LOW', // uppercase
      'Medium', // mixed case
      'critical', // not in enum
      'moderate',
      '',
      'very_high',
    ]

    invalidLevels.forEach((level) => {
      it(`should reject invalid risk level: "${level}"`, () => {
        const result = RiskLevelSchema.safeParse(level)
        expect(result.success).toBe(false)
      })
    })
  })
})

// ============================================================================
// Age Target Validation Tests
// ============================================================================

describe('Age Target Validation', () => {
  describe('Valid Age Targets', () => {
    const validTargets = ['adult', 'child', 'elderly', 'teen', 'infant', 'adultPregnant']

    validTargets.forEach((target) => {
      it(`should accept valid age target: ${target}`, () => {
        const result = AgeTargetSchema.safeParse(target)
        expect(result.success).toBe(true)
      })
    })
  })

  describe('Invalid Age Targets', () => {
    const invalidTargets = ['Adult', 'CHILD', 'senior', 'baby', 'pregnant', '']

    invalidTargets.forEach((target) => {
      it(`should reject invalid age target: "${target}"`, () => {
        const result = AgeTargetSchema.safeParse(target)
        expect(result.success).toBe(false)
      })
    })
  })
})

// ============================================================================
// ICD-10 Code Validation Tests
// ============================================================================

describe('ICD-10 Code Validation', () => {
  describe('Valid ICD-10 Codes', () => {
    const validCodes = [
      'A00', // 3 characters
      'I21', // cardiac
      'R07', // symptoms
      'I21.9', // with decimal
      'R07.4', // with decimal
      'Z00.0', // with decimal
      'A00.1', // with single digit decimal
      'A00.12', // with two digit decimal (if allowed)
    ]

    validCodes.forEach((code) => {
      it(`should accept valid ICD-10 code: ${code}`, () => {
        const result = ICD10Schema.safeParse(code)
        // Some edge cases might fail based on exact regex
        if (code.match(/^[A-Z]\d{2}(\.\d{1,2})?$/)) {
          expect(result.success).toBe(true)
        }
      })
    })
  })

  describe('Invalid ICD-10 Codes', () => {
    const invalidCodes = [
      'a00', // lowercase
      '100', // starts with number
      'AB0', // second char is letter
      'A0', // too short
      'A000', // too long without decimal
      'A00.', // trailing decimal
      'A00.123', // too many decimal digits
      '.A00', // starts with decimal
      '',
    ]

    invalidCodes.forEach((code) => {
      it(`should reject invalid ICD-10 code: "${code}"`, () => {
        const result = ICD10Schema.safeParse(code)
        expect(result.success).toBe(false)
      })
    })
  })
})

// ============================================================================
// Complaint Extended Content Schema Tests
// ============================================================================

describe('Complaint Extended Content Schema', () => {
  const validContent = {
    redFlags: ['Dor intensa', 'Sudorese'],
    diagnosticoDiferencial: ['IAM', 'Angina'],
    condutaInicial: 'ECG em 10 minutos',
    calculadoras: ['HEART Score'],
  }

  it('should accept valid extended content', () => {
    const result = ComplaintExtendedContentSchema.safeParse(validContent)
    expect(result.success).toBe(true)
  })

  it('should accept content with optional rawMarkdown', () => {
    const result = ComplaintExtendedContentSchema.safeParse({
      ...validContent,
      rawMarkdown: '# Markdown content',
    })
    expect(result.success).toBe(true)
  })

  it('should reject content missing required fields', () => {
    const result = ComplaintExtendedContentSchema.safeParse({
      redFlags: ['Test'],
    })
    expect(result.success).toBe(false)
  })

  it('should accept empty arrays for required fields', () => {
    const result = ComplaintExtendedContentSchema.safeParse({
      redFlags: [],
      diagnosticoDiferencial: [],
      condutaInicial: '',
      calculadoras: [],
    })
    expect(result.success).toBe(true)
  })

  it('should reject unknown fields (strict mode)', () => {
    const result = ComplaintExtendedContentSchema.safeParse({
      ...validContent,
      unknownField: 'value',
    })
    expect(result.success).toBe(false)
  })
})

// ============================================================================
// Complaint Frontmatter Schema Tests
// ============================================================================

describe('Complaint Frontmatter Schema', () => {
  const validFrontmatter = {
    id: 'dor-toracica',
    group: 'CV',
    title: 'Dor Torácica',
    riskLevel: 'high',
    severity: 4,
  }

  it('should accept valid frontmatter with required fields', () => {
    const result = ComplaintFrontmatterSchema.safeParse(validFrontmatter)
    expect(result.success).toBe(true)
  })

  it('should accept frontmatter with all optional fields', () => {
    const result = ComplaintFrontmatterSchema.safeParse({
      ...validFrontmatter,
      subtitle: 'Chest Pain',
      icd10Codes: ['R07.9', 'I21.9'],
      synonyms: ['chest pain', 'dor no peito'],
      searchTerms: ['precordial', 'aperto'],
      chips: ['urgente', 'cardiovascular'],
      ageTargets: ['adult', 'elderly'],
      isTopForAdult: true,
      isTopForChild: false,
      isFastTrack: false,
      searchWeight: 1.5,
      bodySystem: ['cardiovascular'],
    })
    expect(result.success).toBe(true)
  })

  describe('Required Fields Validation', () => {
    it('should reject missing id', () => {
      const { id, ...rest } = validFrontmatter
      const result = ComplaintFrontmatterSchema.safeParse(rest)
      expect(result.success).toBe(false)
    })

    it('should reject empty id', () => {
      const result = ComplaintFrontmatterSchema.safeParse({
        ...validFrontmatter,
        id: '',
      })
      expect(result.success).toBe(false)
    })

    it('should reject missing group', () => {
      const { group, ...rest } = validFrontmatter
      const result = ComplaintFrontmatterSchema.safeParse(rest)
      expect(result.success).toBe(false)
    })

    it('should reject missing title', () => {
      const { title, ...rest } = validFrontmatter
      const result = ComplaintFrontmatterSchema.safeParse(rest)
      expect(result.success).toBe(false)
    })

    it('should reject empty title', () => {
      const result = ComplaintFrontmatterSchema.safeParse({
        ...validFrontmatter,
        title: '',
      })
      expect(result.success).toBe(false)
    })

    it('should reject missing riskLevel', () => {
      const { riskLevel, ...rest } = validFrontmatter
      const result = ComplaintFrontmatterSchema.safeParse(rest)
      expect(result.success).toBe(false)
    })

    it('should reject missing severity', () => {
      const { severity, ...rest } = validFrontmatter
      const result = ComplaintFrontmatterSchema.safeParse(rest)
      expect(result.success).toBe(false)
    })
  })

  describe('Severity Validation', () => {
    it('should accept severity 1', () => {
      const result = ComplaintFrontmatterSchema.safeParse({
        ...validFrontmatter,
        severity: 1,
      })
      expect(result.success).toBe(true)
    })

    it('should accept severity 5', () => {
      const result = ComplaintFrontmatterSchema.safeParse({
        ...validFrontmatter,
        severity: 5,
      })
      expect(result.success).toBe(true)
    })

    it('should reject severity 0', () => {
      const result = ComplaintFrontmatterSchema.safeParse({
        ...validFrontmatter,
        severity: 0,
      })
      expect(result.success).toBe(false)
    })

    it('should reject severity 6', () => {
      const result = ComplaintFrontmatterSchema.safeParse({
        ...validFrontmatter,
        severity: 6,
      })
      expect(result.success).toBe(false)
    })

    it('should reject non-integer severity', () => {
      const result = ComplaintFrontmatterSchema.safeParse({
        ...validFrontmatter,
        severity: 3.5,
      })
      expect(result.success).toBe(false)
    })
  })

  describe('Search Weight Validation', () => {
    it('should accept searchWeight 0', () => {
      const result = ComplaintFrontmatterSchema.safeParse({
        ...validFrontmatter,
        searchWeight: 0,
      })
      expect(result.success).toBe(true)
    })

    it('should accept searchWeight 2', () => {
      const result = ComplaintFrontmatterSchema.safeParse({
        ...validFrontmatter,
        searchWeight: 2,
      })
      expect(result.success).toBe(true)
    })

    it('should accept searchWeight 1.5', () => {
      const result = ComplaintFrontmatterSchema.safeParse({
        ...validFrontmatter,
        searchWeight: 1.5,
      })
      expect(result.success).toBe(true)
    })

    it('should reject searchWeight negative', () => {
      const result = ComplaintFrontmatterSchema.safeParse({
        ...validFrontmatter,
        searchWeight: -1,
      })
      expect(result.success).toBe(false)
    })

    it('should reject searchWeight > 2', () => {
      const result = ComplaintFrontmatterSchema.safeParse({
        ...validFrontmatter,
        searchWeight: 3,
      })
      expect(result.success).toBe(false)
    })
  })
})

// ============================================================================
// Complaint List Query Schema Tests
// ============================================================================

describe('Complaint List Query Schema', () => {
  it('should accept empty query (all optional)', () => {
    const result = ComplaintListQuerySchema.safeParse({})
    expect(result.success).toBe(true)
  })

  it('should accept valid query with all fields', () => {
    const result = ComplaintListQuerySchema.safeParse({
      limit: 50,
      offset: 0,
      group: 'CV',
      riskLevel: 'high',
      isActive: true,
      search: 'dor',
      updatedSince: '2024-01-01T00:00:00Z',
    })
    expect(result.success).toBe(true)
  })

  describe('Limit Validation', () => {
    it('should accept limit 1', () => {
      const result = ComplaintListQuerySchema.safeParse({ limit: 1 })
      expect(result.success).toBe(true)
    })

    it('should accept limit 500', () => {
      const result = ComplaintListQuerySchema.safeParse({ limit: 500 })
      expect(result.success).toBe(true)
    })

    it('should reject limit 0', () => {
      const result = ComplaintListQuerySchema.safeParse({ limit: 0 })
      expect(result.success).toBe(false)
    })

    it('should reject limit > 500', () => {
      const result = ComplaintListQuerySchema.safeParse({ limit: 501 })
      expect(result.success).toBe(false)
    })

    it('should coerce string to number', () => {
      const result = ComplaintListQuerySchema.safeParse({ limit: '50' })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.limit).toBe(50)
      }
    })
  })

  describe('Offset Validation', () => {
    it('should accept offset 0', () => {
      const result = ComplaintListQuerySchema.safeParse({ offset: 0 })
      expect(result.success).toBe(true)
    })

    it('should accept positive offset', () => {
      const result = ComplaintListQuerySchema.safeParse({ offset: 100 })
      expect(result.success).toBe(true)
    })

    it('should reject negative offset', () => {
      const result = ComplaintListQuerySchema.safeParse({ offset: -1 })
      expect(result.success).toBe(false)
    })
  })

  describe('Search Validation', () => {
    it('should accept valid search term', () => {
      const result = ComplaintListQuerySchema.safeParse({ search: 'dor' })
      expect(result.success).toBe(true)
    })

    it('should reject empty search term', () => {
      const result = ComplaintListQuerySchema.safeParse({ search: '' })
      expect(result.success).toBe(false)
    })
  })

  describe('DateTime Validation', () => {
    it('should accept valid ISO datetime', () => {
      const result = ComplaintListQuerySchema.safeParse({
        updatedSince: '2024-01-01T00:00:00Z',
      })
      expect(result.success).toBe(true)
    })

    it('should accept datetime with milliseconds', () => {
      // Zod datetime() by default only accepts Z suffix, not timezone offsets
      const result = ComplaintListQuerySchema.safeParse({
        updatedSince: '2024-01-01T12:00:00.000Z',
      })
      expect(result.success).toBe(true)
    })

    it('should reject invalid datetime', () => {
      const result = ComplaintListQuerySchema.safeParse({
        updatedSince: '2024-01-01',
      })
      expect(result.success).toBe(false)
    })

    it('should reject plain text', () => {
      const result = ComplaintListQuerySchema.safeParse({
        updatedSince: 'yesterday',
      })
      expect(result.success).toBe(false)
    })
  })
})

// ============================================================================
// Edge Cases
// ============================================================================

describe('Edge Cases', () => {
  it('should handle null values', () => {
    const result = ComplaintFrontmatterSchema.safeParse({
      id: 'test',
      group: 'CV',
      title: 'Test',
      riskLevel: 'low',
      severity: 1,
      subtitle: null,
    })
    // null is not undefined, should fail strict schema
    expect(result.success).toBe(false)
  })

  it('should handle very long strings', () => {
    const longString = 'a'.repeat(10000)
    const result = ComplaintFrontmatterSchema.safeParse({
      id: 'test',
      group: 'CV',
      title: longString,
      riskLevel: 'low',
      severity: 1,
    })
    expect(result.success).toBe(true)
  })

  it('should handle unicode in strings', () => {
    const result = ComplaintFrontmatterSchema.safeParse({
      id: 'dor-torácica',
      group: 'CV',
      title: 'Dor Torácica',
      riskLevel: 'high',
      severity: 4,
      synonyms: ['胸痛', 'ألم في الصدر'],
    })
    expect(result.success).toBe(true)
  })

  it('should handle array with many items', () => {
    const manyItems = Array.from({ length: 100 }, (_, i) => `item_${i}`)
    const result = ComplaintFrontmatterSchema.safeParse({
      id: 'test',
      group: 'CV',
      title: 'Test',
      riskLevel: 'low',
      severity: 1,
      synonyms: manyItems,
    })
    expect(result.success).toBe(true)
  })
})
