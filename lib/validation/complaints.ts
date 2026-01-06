/**
 * Complaint metadata and sync validation utilities.
 */

import { z } from 'zod'
import { ComplaintExtendedContentEBMSchema } from './ebm'

export const VALID_GROUP_CODES = [
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

export const VALID_RISK_LEVELS = ['low', 'medium', 'high'] as const

export const VALID_AGE_TARGETS = [
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

export const ComplaintExtendedContentSchema = z
  .object({
    redFlags: z.array(z.string()),
    diagnosticoDiferencial: z.array(z.string()),
    condutaInicial: z.string(),
    calculadoras: z.array(z.string()),
    rawMarkdown: z.string().optional(),
  })
  .strict()

export const ComplaintMetadataSchema = z
  .object({
    subtitle: z.string().optional(),
    riskLevel: RiskLevelSchema.optional(),
    severity: z.number().int().min(1).max(5).optional(),
    ageTargets: z.array(AgeTargetSchema).optional(),
    isTopForAdult: z.boolean().optional(),
    isTopForChild: z.boolean().optional(),
    isFastTrack: z.boolean().optional(),
    chips: z.array(z.string()).optional(),
    searchTerms: z.array(z.string()).optional(),
    bodySystem: z.array(z.string()).optional(),
    relatedSymptoms: z.array(z.string()).optional(),
    commonMisconceptions: z.array(z.string()).optional(),
    searchWeight: z.number().min(0).max(2).optional(),
  })
  .strict()

export const ComplaintSyncMetadataSchema = z
  .object({
    contentHash: z.string().optional(),
    lastSyncedAt: z.string().datetime().optional(),
    syncSource: z.enum(['obsidian', 'app', 'system']).optional(),
  })
  .strict()

export const ComplaintAdditionalDataSchema = z
  .object({
    metadata: ComplaintMetadataSchema.optional(),
    extendedContent: ComplaintExtendedContentSchema.partial().optional(),
    extendedContentEBM: ComplaintExtendedContentEBMSchema.partial().optional(),
    sync: ComplaintSyncMetadataSchema.optional(),
  })
  .strict()

export const ComplaintFrontmatterSchema = z
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
    relatedSymptoms: z.array(z.string()).optional(),
    commonMisconceptions: z.array(z.string()).optional(),
  })
  .strict()

export const ComplaintUpdateSchema = z
  .object({
    title: z.string().min(1).optional(),
    subtitle: z.string().optional(),
    definition: z.string().optional(),
    groupCode: GroupCodeSchema.optional(),
    synonyms: z.array(z.string()).optional(),
    icd10Codes: z.array(ICD10Schema).optional(),
    isTimeSensitive: z.boolean().optional(),
    isHighAcuity: z.boolean().optional(),
    requiresIsolation: z.boolean().optional(),
    isActive: z.boolean().optional(),
    orderIndex: z.number().int().optional(),
    additionalData: ComplaintAdditionalDataSchema.optional(),
  })
  .strict()

export const ComplaintListQuerySchema = z
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

export const ComplaintChangesQuerySchema = z
  .object({
    since: z.string().datetime().optional(),
    limit: z.coerce.number().int().min(1).max(500).optional(),
  })
  .strict()

export type ComplaintFrontmatterInput = z.infer<typeof ComplaintFrontmatterSchema>
export type ComplaintAdditionalData = z.infer<typeof ComplaintAdditionalDataSchema>

export interface ComplaintValidationIssue {
  field: string
  message: string
  severity: 'error' | 'warning'
}

export interface ComplaintValidationResult {
  valid: boolean
  errors: ComplaintValidationIssue[]
  warnings: ComplaintValidationIssue[]
  validatedAt: string
}

export function validateComplaintFrontmatter(
  input: Partial<ComplaintFrontmatterInput>
): ComplaintValidationResult {
  const errors: ComplaintValidationIssue[] = []
  const warnings: ComplaintValidationIssue[] = []

  const result = ComplaintFrontmatterSchema.safeParse(input)

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      errors.push({
        field: issue.path.join('.'),
        message: issue.message,
        severity: 'error',
      })
    })
  } else {
    const data = result.data

    if (!data.icd10Codes || data.icd10Codes.length === 0) {
      warnings.push({
        field: 'icd10Codes',
        message: 'ICD-10 codes are recommended',
        severity: 'warning',
      })
    }

    if (!data.synonyms || data.synonyms.length === 0) {
      warnings.push({
        field: 'synonyms',
        message: 'Synonyms are recommended for search',
        severity: 'warning',
      })
    }

    if (!data.searchTerms || data.searchTerms.length === 0) {
      warnings.push({
        field: 'searchTerms',
        message: 'Search terms are recommended for search',
        severity: 'warning',
      })
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    validatedAt: new Date().toISOString(),
  }
}
