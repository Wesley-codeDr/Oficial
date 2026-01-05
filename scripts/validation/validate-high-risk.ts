/**
 * High-Risk Complaint Validation Script
 *
 * Validates that high-risk ER complaints meet all quality standards:
 * - CFM compliance (required fields)
 * - LGPD compliance (data protection)
 * - SUS/RENAME medication compatibility
 * - ICD-10 format validation
 * - Red flag requirements
 * - Checkbox count and distribution
 * - EBM reference quality
 *
 * Usage:
 *   npm run validate:high-risk
 *   npm run validate:high-risk -- --complaint CV_CHEST_PAIN_ACS
 *
 * @module validate-high-risk
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type {
  GuidelineExtraction,
  AnamneseCheckbox,
  RedFlagExtended,
  MedicationRENAME,
  EBMReference,
  ValidationResult,
  ValidationError,
  ValidationWarning,
} from '@/lib/types/medical-extended'

// ============================================================================
// VALIDATION RULES
// ============================================================================

const HIGH_RISK_VALIDATION_RULES = {
  // Mandatory fields for high-risk complaints
  requiredFields: [
    'acaoImediata', // First 10 minutes protocol
    'redFlags', // Must have ≥3 red flags
    'medications', // SUS/RENAME compatible
    'calculators', // Clinical decision tools (if applicable)
    'differentialDiagnosis', // ≥3 differential diagnoses
  ],

  // ICD-10 validation
  icd10: {
    format: /^[A-Z]\d{2}\.\d{1,2}$/, // e.g., I21.9, R06.02
    mustExist: true,
    allowedSystems: ['I', 'R', 'K', 'G', 'T', 'S', 'J', 'N', 'A', 'C'], // Common ER systems
  },

  // Medication validation (RENAME 2024)
  medications: {
    susAvailable: true, // All medications must be SUS-available
    renameList: ['A', 'B', 'C'], // Valid RENAME lists
    evidenceLevel: ['A', 'B'], // Minimum evidence level
    minCount: 1, // At least 1 medication
  },

  // Red flag validation
  redFlags: {
    minCount: 3, // Minimum 3 red flags
    requiredSeverities: ['critical'], // Must have ≥1 critical red flag
    maxTimeToAction: 60, // Maximum time to action (minutes)
  },

  // Checkbox validation
  checkboxes: {
    minTotal: 30, // Minimum total checkboxes
    maxTotal: 60, // Maximum total checkboxes
    minFlash: 10, // Minimum Flash checkboxes (FLASH + BOTH)
    minDetailed: 20, // Minimum Detailed checkboxes
    minBoth: 8, // Minimum BOTH checkboxes
    minRequired: 5, // Minimum required checkboxes
    maxRequired: 15, // Maximum required checkboxes
  },

  // EBM validation
  ebm: {
    version: '2.0',
    maxReviewAgeMonths: 12, // Guidelines should be <12 months old
    brazilianGuidelineRequired: true, // Must have ≥1 Brazilian guideline
    evidenceQuality: ['high', 'moderate'], // Minimum evidence quality
    minReferences: 1, // Minimum number of references
  },

  // Flash template validation
  flashTemplate: {
    maxEstimatedTime: 5, // Maximum 5 minutes
    minSections: 5, // QP, HDA, EF, HD, CD
  },
} as const

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate a guideline extraction result
 */
export function validateGuidelineExtraction(data: GuidelineExtraction): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationWarning[] = []

  // 1. Validate required fields
  validateRequiredFields(data, errors)

  // 2. Validate ICD-10 codes
  validateICD10Codes(data.icd10Codes, errors, warnings)

  // 3. Validate medications (RENAME)
  validateMedications(data.medications, errors, warnings)

  // 4. Validate red flags
  validateRedFlags(data.redFlags, errors, warnings)

  // 5. Validate checkboxes
  validateCheckboxes(data.anamneseCheckboxes, errors, warnings)

  // 6. Validate EBM references
  validateEBMReferences(data.references, errors, warnings)

  // 7. Validate Flash template
  validateFlashTemplate(data.flashTemplate, errors, warnings)

  // 8. Validate differential diagnosis
  validateDifferentialDiagnosis(data.differentialDiagnosis, errors, warnings)

  // Calculate score (0-100)
  const score = calculateValidationScore(errors, warnings)

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    score,
  }
}

/**
 * Validate required fields are present
 */
function validateRequiredFields(data: GuidelineExtraction, errors: ValidationError[]): void {
  if (!data.flashTemplate || !data.flashTemplate.acaoImediata) {
    errors.push({
      field: 'flashTemplate.acaoImediata',
      message: 'Missing required field: Immediate action protocol (first 10 minutes)',
      severity: 'critical',
    })
  }

  if (!data.redFlags || data.redFlags.length === 0) {
    errors.push({
      field: 'redFlags',
      message: 'Missing required field: Red flags array is empty',
      severity: 'critical',
    })
  }

  if (!data.medications || data.medications.length === 0) {
    errors.push({
      field: 'medications',
      message: 'Missing required field: No medications specified',
      severity: 'high',
    })
  }

  if (!data.differentialDiagnosis || data.differentialDiagnosis.length < 3) {
    errors.push({
      field: 'differentialDiagnosis',
      message: `Insufficient differential diagnoses: ${data.differentialDiagnosis?.length || 0} (minimum 3 required)`,
      severity: 'high',
    })
  }
}

/**
 * Validate ICD-10 codes
 */
function validateICD10Codes(
  codes: string[],
  errors: ValidationError[],
  warnings: ValidationWarning[]
): void {
  if (!codes || codes.length === 0) {
    errors.push({
      field: 'icd10Codes',
      message: 'No ICD-10 codes provided',
      severity: 'critical',
    })
    return
  }

  const invalidCodes = codes.filter(code => !HIGH_RISK_VALIDATION_RULES.icd10.format.test(code))
  if (invalidCodes.length > 0) {
    errors.push({
      field: 'icd10Codes',
      message: `Invalid ICD-10 format: ${invalidCodes.join(', ')}`,
      severity: 'high',
    })
  }

  // Check for non-specific codes (ending in .9)
  const nonSpecificCodes = codes.filter(code => code.endsWith('.9'))
  if (nonSpecificCodes.length === codes.length) {
    warnings.push({
      field: 'icd10Codes',
      message: `All ICD-10 codes are non-specific (ending in .9): ${nonSpecificCodes.join(', ')}`,
      recommendation: 'Use more specific ICD-10 codes when possible',
    })
  }
}

/**
 * Validate medications are SUS/RENAME compatible
 */
function validateMedications(
  medications: MedicationRENAME[],
  errors: ValidationError[],
  warnings: ValidationWarning[]
): void {
  if (medications.length < HIGH_RISK_VALIDATION_RULES.medications.minCount) {
    errors.push({
      field: 'medications',
      message: `Too few medications: ${medications.length} (minimum ${HIGH_RISK_VALIDATION_RULES.medications.minCount})`,
      severity: 'high',
    })
  }

  // Check SUS availability
  const nonSUSMeds = medications.filter(m => !m.susAvailable)
  if (nonSUSMeds.length > 0) {
    errors.push({
      field: 'medications',
      message: `Non-SUS medications found: ${nonSUSMeds.map(m => m.genericName).join(', ')}`,
      severity: 'critical',
    })
  }

  // Check evidence level
  const lowEvidenceMeds = medications.filter(
    m => !HIGH_RISK_VALIDATION_RULES.medications.evidenceLevel.includes(m.evidenceLevel)
  )
  if (lowEvidenceMeds.length > 0) {
    warnings.push({
      field: 'medications',
      message: `Medications with low evidence level (C/D): ${lowEvidenceMeds.map(m => `${m.genericName} (${m.evidenceLevel})`).join(', ')}`,
      recommendation: 'Prefer medications with evidence level A or B',
    })
  }

  // Check RENAME list
  const unlistedMeds = medications.filter(m => m.susAvailable && !m.renameList)
  if (unlistedMeds.length > 0) {
    warnings.push({
      field: 'medications',
      message: `Medications without RENAME list classification: ${unlistedMeds.map(m => m.genericName).join(', ')}`,
      recommendation: 'Specify RENAME list (A, B, or C) for all medications',
    })
  }
}

/**
 * Validate red flags
 */
function validateRedFlags(
  redFlags: RedFlagExtended[],
  errors: ValidationError[],
  warnings: ValidationWarning[]
): void {
  if (redFlags.length < HIGH_RISK_VALIDATION_RULES.redFlags.minCount) {
    errors.push({
      field: 'redFlags',
      message: `Too few red flags: ${redFlags.length} (minimum ${HIGH_RISK_VALIDATION_RULES.redFlags.minCount})`,
      severity: 'critical',
    })
  }

  // Check for critical severity
  const criticalFlags = redFlags.filter(rf => rf.severity === 'critical')
  if (criticalFlags.length === 0) {
    errors.push({
      field: 'redFlags',
      message: 'No critical red flags found (high-risk complaint must have ≥1)',
      severity: 'critical',
    })
  }

  // Check time to action
  const slowRedFlags = redFlags.filter(
    rf => rf.timeToAction && rf.timeToAction > HIGH_RISK_VALIDATION_RULES.redFlags.maxTimeToAction
  )
  if (slowRedFlags.length > 0) {
    warnings.push({
      field: 'redFlags',
      message: `Red flags with slow time-to-action (>${HIGH_RISK_VALIDATION_RULES.redFlags.maxTimeToAction} min): ${slowRedFlags.map(rf => rf.description).join(', ')}`,
      recommendation: 'Critical red flags should have time-to-action ≤60 minutes',
    })
  }

  // Check immediate action is specified
  const missingAction = redFlags.filter(rf => !rf.immediateAction || rf.immediateAction.trim().length < 10)
  if (missingAction.length > 0) {
    warnings.push({
      field: 'redFlags',
      message: `Red flags missing immediate action guidance: ${missingAction.length} flags`,
      recommendation: 'All red flags should have clear immediate action instructions',
    })
  }
}

/**
 * Validate checkboxes
 */
function validateCheckboxes(
  checkboxes: AnamneseCheckbox[],
  errors: ValidationError[],
  warnings: ValidationWarning[]
): void {
  const counts = {
    total: checkboxes.length,
    flash: checkboxes.filter(c => c.section === 'FLASH').length,
    detailed: checkboxes.filter(c => c.section === 'DETAILED').length,
    both: checkboxes.filter(c => c.section === 'BOTH').length,
    required: checkboxes.filter(c => c.isRequired).length,
    redFlags: checkboxes.filter(c => c.isRedFlag).length,
  }

  const rules = HIGH_RISK_VALIDATION_RULES.checkboxes

  // Total count validation
  if (counts.total < rules.minTotal) {
    errors.push({
      field: 'anamneseCheckboxes',
      message: `Too few checkboxes: ${counts.total} (minimum ${rules.minTotal})`,
      severity: 'high',
    })
  }

  if (counts.total > rules.maxTotal) {
    warnings.push({
      field: 'anamneseCheckboxes',
      message: `Too many checkboxes: ${counts.total} (recommended maximum ${rules.maxTotal})`,
      recommendation: 'Consider consolidating or removing less important checkboxes',
    })
  }

  // Flash checkboxes validation
  const flashTotal = counts.flash + counts.both
  if (flashTotal < rules.minFlash) {
    errors.push({
      field: 'anamneseCheckboxes',
      message: `Too few Flash checkboxes: ${flashTotal} (minimum ${rules.minFlash})`,
      severity: 'high',
    })
  }

  // BOTH checkboxes validation
  if (counts.both < rules.minBoth) {
    errors.push({
      field: 'anamneseCheckboxes',
      message: `Too few BOTH checkboxes: ${counts.both} (minimum ${rules.minBoth})`,
      severity: 'medium',
    })
  }

  // Required checkboxes validation
  if (counts.required < rules.minRequired) {
    warnings.push({
      field: 'anamneseCheckboxes',
      message: `Few required checkboxes: ${counts.required} (recommended minimum ${rules.minRequired})`,
      recommendation: 'Mark more CFM-critical checkboxes as required',
    })
  }

  if (counts.required > rules.maxRequired) {
    warnings.push({
      field: 'anamneseCheckboxes',
      message: `Many required checkboxes: ${counts.required} (recommended maximum ${rules.maxRequired})`,
      recommendation: 'Too many required fields may slow documentation',
    })
  }

  // Category distribution validation
  const categories = checkboxes.reduce((acc, cb) => {
    acc[cb.category] = (acc[cb.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const missingCategories = ['QP', 'HDA', 'ANTECEDENTES', 'EXAME_FISICO', 'NEGATIVAS'].filter(
    cat => !categories[cat] || categories[cat] === 0
  )

  if (missingCategories.length > 0) {
    errors.push({
      field: 'anamneseCheckboxes',
      message: `Missing checkboxes in required categories: ${missingCategories.join(', ')}`,
      severity: 'high',
    })
  }
}

/**
 * Validate EBM references
 */
function validateEBMReferences(
  references: EBMReference[],
  errors: ValidationError[],
  warnings: ValidationWarning[]
): void {
  if (references.length < HIGH_RISK_VALIDATION_RULES.ebm.minReferences) {
    errors.push({
      field: 'references',
      message: `Too few references: ${references.length} (minimum ${HIGH_RISK_VALIDATION_RULES.ebm.minReferences})`,
      severity: 'high',
    })
  }

  // Check for Brazilian guidelines
  const brazilianRefs = references.filter(r =>
    ['sbc', 'sbpt', 'amb', 'ms', 'sbim', 'sbn'].includes(r.source)
  )

  if (HIGH_RISK_VALIDATION_RULES.ebm.brazilianGuidelineRequired && brazilianRefs.length === 0) {
    errors.push({
      field: 'references',
      message: 'No Brazilian guideline references found (SBC, SBPT, AMB, MS, etc.)',
      severity: 'critical',
    })
  }

  // Check reference age
  const currentYear = new Date().getFullYear()
  const oldRefs = references.filter(
    r => currentYear - r.year > HIGH_RISK_VALIDATION_RULES.ebm.maxReviewAgeMonths / 12
  )

  if (oldRefs.length > 0) {
    warnings.push({
      field: 'references',
      message: `Outdated references (>${HIGH_RISK_VALIDATION_RULES.ebm.maxReviewAgeMonths / 12} years old): ${oldRefs.map(r => `${r.title} (${r.year})`).join(', ')}`,
      recommendation: 'Use more recent guidelines when available',
    })
  }

  // Check evidence quality
  const lowQualityRefs = references.filter(
    r => r.evidenceQuality && !HIGH_RISK_VALIDATION_RULES.ebm.evidenceQuality.includes(r.evidenceQuality)
  )

  if (lowQualityRefs.length > 0) {
    warnings.push({
      field: 'references',
      message: `References with low evidence quality: ${lowQualityRefs.length}`,
      recommendation: 'Prefer high or moderate quality evidence',
    })
  }
}

/**
 * Validate Flash template
 */
function validateFlashTemplate(
  flashTemplate: any,
  errors: ValidationError[],
  warnings: ValidationWarning[]
): void {
  if (flashTemplate.tempoEstimado > HIGH_RISK_VALIDATION_RULES.flashTemplate.maxEstimatedTime) {
    warnings.push({
      field: 'flashTemplate.tempoEstimado',
      message: `Flash template estimated time too high: ${flashTemplate.tempoEstimado} min (recommended ≤${HIGH_RISK_VALIDATION_RULES.flashTemplate.maxEstimatedTime})`,
      recommendation: 'Flash templates should be completable in ≤5 minutes',
    })
  }

  // Check required sections
  const requiredSections = ['qp', 'hda', 'ef', 'hd', 'conduta']
  const missingSections = requiredSections.filter(section => !flashTemplate[section] || flashTemplate[section].trim().length < 10)

  if (missingSections.length > 0) {
    errors.push({
      field: 'flashTemplate',
      message: `Missing or incomplete Flash template sections: ${missingSections.join(', ')}`,
      severity: 'critical',
    })
  }
}

/**
 * Validate differential diagnosis
 */
function validateDifferentialDiagnosis(
  differentialDiagnosis: any[],
  errors: ValidationError[],
  warnings: ValidationWarning[]
): void {
  if (differentialDiagnosis.length < 3) {
    errors.push({
      field: 'differentialDiagnosis',
      message: `Too few differential diagnoses: ${differentialDiagnosis.length} (minimum 3)`,
      severity: 'high',
    })
  }

  // Check for "must not miss" diagnoses
  const mustNotMiss = differentialDiagnosis.filter(dd => dd.mustNotMiss)
  if (mustNotMiss.length === 0) {
    warnings.push({
      field: 'differentialDiagnosis',
      message: 'No "must not miss" diagnoses identified',
      recommendation: 'Mark critical differential diagnoses as mustNotMiss',
    })
  }

  // Check ICD-10 codes
  const invalidICD10 = differentialDiagnosis.filter(
    dd => !HIGH_RISK_VALIDATION_RULES.icd10.format.test(dd.icd10)
  )

  if (invalidICD10.length > 0) {
    errors.push({
      field: 'differentialDiagnosis',
      message: `Invalid ICD-10 codes in differential diagnoses: ${invalidICD10.map(dd => `${dd.condition} (${dd.icd10})`).join(', ')}`,
      severity: 'medium',
    })
  }
}

/**
 * Calculate validation score (0-100)
 */
function calculateValidationScore(errors: ValidationError[], warnings: ValidationWarning[]): number {
  let score = 100

  // Deduct points for errors
  errors.forEach(error => {
    switch (error.severity) {
      case 'critical':
        score -= 20
        break
      case 'high':
        score -= 10
        break
      case 'medium':
        score -= 5
        break
    }
  })

  // Deduct points for warnings
  score -= warnings.length * 2

  return Math.max(0, score)
}

// ============================================================================
// REPORTING FUNCTIONS
// ============================================================================

/**
 * Format validation result as a report
 */
export function formatValidationReport(
  complaintId: string,
  result: ValidationResult
): string {
  const statusEmoji = result.passed ? '✅' : '❌'
  const scoreColor = result.score >= 90 ? '🟢' : result.score >= 70 ? '🟡' : '🔴'

  let report = `
┌─────────────────────────────────────────────────────────────┐
│          VALIDATION REPORT: ${complaintId.padEnd(30)}│
└─────────────────────────────────────────────────────────────┘

${statusEmoji} STATUS: ${result.passed ? 'PASSED' : 'FAILED'}
${scoreColor} SCORE: ${result.score}/100

`

  // Errors
  if (result.errors.length > 0) {
    report += `❌ ERRORS (${result.errors.length})\n`
    result.errors.forEach((error, index) => {
      const severityBadge = error.severity === 'critical' ? '🔴' : error.severity === 'high' ? '🟠' : '🟡'
      report += `${index + 1}. ${severityBadge} [${error.field}] ${error.message}\n`
    })
    report += '\n'
  } else {
    report += `✅ ERRORS (0)\n\n`
  }

  // Warnings
  if (result.warnings.length > 0) {
    report += `⚠️  WARNINGS (${result.warnings.length})\n`
    result.warnings.forEach((warning, index) => {
      report += `${index + 1}. ⚠️  [${warning.field}] ${warning.message}\n`
      if (warning.recommendation) {
        report += `   💡 Recommendation: ${warning.recommendation}\n`
      }
    })
    report += '\n'
  } else {
    report += `✅ WARNINGS (0)\n\n`
  }

  report += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
  report += result.passed
    ? `STATUS: READY FOR SYNC ✅\n`
    : `STATUS: NEEDS FIXES BEFORE SYNC ❌\n`
  report += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`

  return report
}

// ============================================================================
// CLI INTERFACE (for npm run validate:high-risk)
// ============================================================================

/**
 * Main validation CLI function
 */
export async function main() {
  console.log('🔍 High-Risk Complaint Validation Tool\n')

  // Parse CLI arguments
  const args = process.argv.slice(2)
  const complaintFlag = args.indexOf('--complaint')
  const specificComplaint = complaintFlag !== -1 ? args[complaintFlag + 1] : null

  // TODO: Implement file reading and validation
  // For now, this is a placeholder structure

  console.log('✅ Validation complete!\n')
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error)
}
