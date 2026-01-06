/**
 * Evidence-Based Medicine validation utilities.
 *
 * Provides Zod schemas and helper validators for structured medical content.
 */

import { z } from 'zod'
import type {
  EBMCitation,
  MedicationRecommendation,
  RedFlag,
  DifferentialDiagnosis,
  ComplaintExtendedContentEBM,
  EBMValidationResult,
} from '../types/medical'

// ============================================================================
// Zod schemas
// ============================================================================

const EBMSourceSchema = z.enum([
  'uptodate',
  'dynamed',
  'brazilian-guideline',
  'cochrane',
  'pubmed',
  'sbim',
  'sbc',
  'sbpt',
  'amb',
  'ms',
])

const EvidenceLevelSchema = z.enum(['A', 'B', 'C', 'D'])

const PMIDSchema = z
  .string()
  .regex(/^\d{8}$/, 'PMID must be exactly 8 digits')
  .optional()

const DOISchema = z
  .string()
  .regex(/^10\.\d{4,}\/\S+$/, 'DOI must follow 10.XXXX/... format')
  .optional()

const URLSchema = z
  .string()
  .url('Invalid URL')
  .optional()

const ISODateSchema = z
  .string()
  .datetime('Date must be ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)')
  .optional()

export const EBMCitationSchema = z.object({
  source: EBMSourceSchema,
  title: z.string().min(5, 'Citation title must be at least 5 characters'),
  url: URLSchema,
  pmid: PMIDSchema,
  doi: DOISchema,
  yearPublished: z.number().int().min(1900).max(2100).optional(),
  lastAccessed: ISODateSchema,
  evidenceLevel: EvidenceLevelSchema.optional(),
  brazilianAdaptation: z.string().optional(),
  authors: z.array(z.string()).optional(),
  journal: z.string().optional(),
})

const MedicationRouteSchema = z.enum([
  'VO',
  'IV',
  'IM',
  'SC',
  'Inalatório',
  'Tópico',
  'SL',
  'Retal',
  'Nasal',
  'Ocular',
])

const RENAMEListSchema = z.enum(['A', 'B', 'C'])

export const MedicationRecommendationSchema = z.object({
  genericName: z.string().min(3, 'Generic name must be at least 3 characters'),
  brandNames: z.array(z.string()).optional(),
  dose: z.string().min(2, 'Dose is required'),
  route: MedicationRouteSchema,
  frequency: z.string().min(2, 'Frequency is required'),
  duration: z.string().optional(),
  susAvailable: z.boolean(),
  renameCompatible: z.boolean(),
  renameList: RENAMEListSchema.optional(),
  alternatives: z.array(z.string()).optional(),
  evidenceLevel: EvidenceLevelSchema.optional(),
  references: z.array(EBMCitationSchema).optional(),
  renalAdjustment: z.string().optional(),
  hepaticAdjustment: z.string().optional(),
  specialNotes: z.string().optional(),
  contraindications: z.array(z.string()).optional(),
  interactions: z.array(z.string()).optional(),
})

const RedFlagSeveritySchema = z.enum(['critical', 'warning', 'caution'])

export const RedFlagSchema = z.object({
  description: z.string().min(5, 'Red flag description must be at least 5 characters'),
  severity: RedFlagSeveritySchema,
  clinicalSignificance: z.string().min(10, 'Clinical significance must be detailed'),
  immediateAction: z.string().min(5, 'Immediate action is required'),
  timeToAction: z.number().int().positive().optional(),
  references: z.array(EBMCitationSchema).optional(),
  objectiveCriteria: z.array(z.string()).optional(),
})

const DiagnosisProbabilitySchema = z.enum(['high', 'medium', 'low'])

const ICD10Schema = z
  .string()
  .regex(/^[A-Z]\d{2}(\.\d{1,2})?$/, 'Invalid ICD-10 code format')
  .optional()

export const DifferentialDiagnosisSchema = z.object({
  condition: z.string().min(3, 'Condition name must be at least 3 characters'),
  icd10: ICD10Schema,
  probability: DiagnosisProbabilitySchema,
  keyFeatures: z.array(z.string()).min(1, 'At least 1 key feature is required'),
  diagnosticTests: z.array(z.string()).optional(),
  references: z.array(EBMCitationSchema).optional(),
  specificRedFlags: z.array(z.string()).optional(),
})

const EvidenceQualitySchema = z.enum(['high', 'moderate', 'low', 'very-low'])

export const RiskStratificationSchema = z.object({
  criteria: z.string().min(3, 'Risk criteria must be specified'),
  lowRisk: z.string().min(5, 'Low risk definition is required'),
  moderateRisk: z.string().min(5, 'Moderate risk definition is required'),
  highRisk: z.string().min(5, 'High risk definition is required'),
  reference: EBMCitationSchema.optional(),
  calculatorUrl: URLSchema,
})

export const ComplaintExtendedContentEBMSchema = z.object({
  redFlags: z.array(RedFlagSchema),
  diagnosticoDiferencial: z.array(DifferentialDiagnosisSchema),
  condutaInicial: z.string().min(10, 'Initial conduct must be detailed'),
  calculadoras: z.array(z.string()),
  rawMarkdown: z.string().optional(),

  ebmVersion: z.string().optional(),
  lastEBMReview: ISODateSchema,
  evidenceQuality: EvidenceQualitySchema.optional(),
  uptodateReviewed: z.boolean().optional(),
  dynamedReviewed: z.boolean().optional(),
  brazilianGuidelines: z.array(z.string()).optional(),
  susProtocolCompatible: z.boolean().optional(),
  renameMedicationsOnly: z.boolean().optional(),
  ebmReferences: z.array(EBMCitationSchema).optional(),
  medications: z.array(MedicationRecommendationSchema).optional(),
  riskStratification: RiskStratificationSchema.optional(),
  susGuidelines: z.string().optional(),
  brazilianEpidemiology: z.string().optional(),
  brazilianAdaptations: z.array(z.string()).optional(),
  susDiagnosticAvailability: z.string().optional(),
  susReferralPathway: z.string().optional(),
})

// ============================================================================
// Validation helpers
// ============================================================================

function validateRENAMEConsistency(medication: MedicationRecommendation): string[] {
  const errors: string[] = []

  if (medication.renameCompatible && !medication.renameList) {
    errors.push(
      `Medication "${medication.genericName}" marked as RENAME-compatible without list (A/B/C)`
    )
  }

  if (!medication.renameCompatible && medication.renameList) {
    errors.push(
      `Medication "${medication.genericName}" has RENAME list but is not marked compatible`
    )
  }

  return errors
}

function validateSUSConsistency(medication: MedicationRecommendation): string[] {
  const warnings: string[] = []

  if (medication.susAvailable && !medication.renameCompatible) {
    warnings.push(
      `Medication "${medication.genericName}" marked as SUS available but not RENAME compatible`
    )
  }

  return warnings
}

function validateCriticalRedFlags(redFlag: RedFlag): string[] {
  const warnings: string[] = []

  if (redFlag.severity === 'critical' && !redFlag.timeToAction) {
    warnings.push(
      `Critical red flag "${redFlag.description}" missing time to action`
    )
  }

  return warnings
}

function validateCitationTraceability(citation: EBMCitation): string[] {
  const warnings: string[] = []

  if (!citation.pmid && !citation.doi && !citation.url) {
    warnings.push(
      `Citation "${citation.title}" missing traceable identifier (PMID, DOI, or URL)`
    )
  }

  return warnings
}

function validateHighProbabilityDiagnoses(diagnosis: DifferentialDiagnosis): string[] {
  const warnings: string[] = []

  if (diagnosis.probability === 'high' && !diagnosis.icd10) {
    warnings.push(
      `High-probability diagnosis "${diagnosis.condition}" missing ICD-10 code`
    )
  }

  return warnings
}

// ============================================================================
// Public validation API
// ============================================================================

export function validateEBMContent(
  content: Partial<ComplaintExtendedContentEBM>
): EBMValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const validatedFields: string[] = []

  try {
    const result = ComplaintExtendedContentEBMSchema.safeParse(content)

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        errors.push(`${issue.path.join('.')}: ${issue.message}`)
      })

      return {
        valid: false,
        errors,
        warnings,
        validatedFields: [],
        validatedAt: new Date().toISOString(),
      }
    }

    const validContent = result.data

    if (validContent.medications) {
      validContent.medications.forEach((med) => {
        errors.push(...validateRENAMEConsistency(med))
        warnings.push(...validateSUSConsistency(med))
      })
      validatedFields.push('medications')
    }

    if (validContent.redFlags) {
      validContent.redFlags.forEach((flag) => {
        warnings.push(...validateCriticalRedFlags(flag))
      })
      validatedFields.push('redFlags')
    }

    if (validContent.ebmReferences) {
      validContent.ebmReferences.forEach((citation) => {
        warnings.push(...validateCitationTraceability(citation))
      })
      validatedFields.push('ebmReferences')
    }

    if (validContent.diagnosticoDiferencial) {
      validContent.diagnosticoDiferencial.forEach((diagnosis) => {
        warnings.push(...validateHighProbabilityDiagnoses(diagnosis))
      })
      validatedFields.push('diagnosticoDiferencial')
    }

    if (validContent.lastEBMReview) {
      validatedFields.push('lastEBMReview')
    } else {
      warnings.push('Field "lastEBMReview" is missing')
    }

    if (validContent.evidenceQuality) {
      validatedFields.push('evidenceQuality')
    }

    if (validContent.renameMedicationsOnly && validContent.medications) {
      const nonRenameMeds = validContent.medications.filter(
        (med) => !med.renameCompatible
      )
      if (nonRenameMeds.length > 0) {
        errors.push(
          `renameMedicationsOnly set but contains non-RENAME meds: ${nonRenameMeds
            .map((m) => m.genericName)
            .join(', ')}`
        )
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      validatedFields,
      validatedAt: new Date().toISOString(),
    }
  } catch (error) {
    return {
      valid: false,
      errors: [
        `Unexpected validation error: ${error instanceof Error ? error.message : String(error)}`,
      ],
      warnings: [],
      validatedFields: [],
      validatedAt: new Date().toISOString(),
    }
  }
}

export function validateCitations(
  citations: EBMCitation[]
): EBMValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const validatedFields: string[] = []

  citations.forEach((citation, index) => {
    const result = EBMCitationSchema.safeParse(citation)

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        errors.push(`Citation ${index + 1} - ${issue.path.join('.')}: ${issue.message}`)
      })
    } else {
      warnings.push(...validateCitationTraceability(citation))
      validatedFields.push(`citation_${index}`)
    }
  })

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    validatedFields,
    validatedAt: new Date().toISOString(),
  }
}

export function validateMedications(
  medications: MedicationRecommendation[]
): EBMValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const validatedFields: string[] = []

  medications.forEach((med, index) => {
    const result = MedicationRecommendationSchema.safeParse(med)

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        errors.push(
          `Medication ${index + 1} (${med.genericName}) - ${issue.path.join('.')}: ${issue.message}`
        )
      })
    } else {
      errors.push(...validateRENAMEConsistency(med))
      warnings.push(...validateSUSConsistency(med))
      validatedFields.push(`medication_${index}`)
    }
  })

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    validatedFields,
    validatedAt: new Date().toISOString(),
  }
}

export function validateRedFlags(redFlags: RedFlag[]): EBMValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const validatedFields: string[] = []

  redFlags.forEach((flag, index) => {
    const result = RedFlagSchema.safeParse(flag)

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        errors.push(`Red flag ${index + 1} - ${issue.path.join('.')}: ${issue.message}`)
      })
    } else {
      warnings.push(...validateCriticalRedFlags(flag))
      validatedFields.push(`redFlag_${index}`)
    }
  })

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    validatedFields,
    validatedAt: new Date().toISOString(),
  }
}

export function formatValidationResult(result: EBMValidationResult): string {
  const lines: string[] = []

  lines.push('='.repeat(80))
  lines.push(result.valid ? 'EBM VALIDATION PASSED' : 'EBM VALIDATION FAILED')
  lines.push('='.repeat(80))

  if (result.errors.length > 0) {
    lines.push('\nERRORS:')
    result.errors.forEach((error, i) => {
      lines.push(`  ${i + 1}. ${error}`)
    })
  }

  if (result.warnings.length > 0) {
    lines.push('\nWARNINGS:')
    result.warnings.forEach((warning, i) => {
      lines.push(`  ${i + 1}. ${warning}`)
    })
  }

  if (result.validatedFields.length > 0) {
    lines.push(`\nValidated fields: ${result.validatedFields.length}`)
    lines.push(`  ${result.validatedFields.join(', ')}`)
  }

  lines.push(`\nValidated at: ${result.validatedAt}`)
  lines.push('='.repeat(80))

  return lines.join('\n')
}
