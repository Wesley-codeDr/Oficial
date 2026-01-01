/**
 * Sistema de Validação EBM (Evidence-Based Medicine)
 *
 * Valida conteúdo médico estruturado para garantir:
 * - Integridade de citações (PMID, DOI, níveis de evidência)
 * - Compatibilidade com SUS/RENAME
 * - Formato correto de doses medicamentosas
 * - Códigos ICD-10 válidos
 * - Red flags com severidade apropriada
 */

import { z } from 'zod'
import type {
  EBMCitation,
  MedicationRecommendation,
  RedFlag,
  DifferentialDiagnosis,
  ComplaintExtendedContentEBM,
  EBMValidationResult,
} from '../../../lib/types/medical'

// ============================================================================
// Schemas Zod para Validação
// ============================================================================

/**
 * Schema para EBMSource
 */
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

/**
 * Schema para EvidenceLevel (Oxford CEBM)
 */
const EvidenceLevelSchema = z.enum(['A', 'B', 'C', 'D'])

/**
 * Schema para PMID (PubMed ID)
 * Formato: 8 dígitos numéricos
 */
const PMIDSchema = z
  .string()
  .regex(/^\d{8}$/, 'PMID deve conter exatamente 8 dígitos')
  .optional()

/**
 * Schema para DOI (Digital Object Identifier)
 * Formato: 10.XXXX/... (simplificado)
 */
const DOISchema = z
  .string()
  .regex(/^10\.\d{4,}\/\S+$/, 'DOI deve seguir formato 10.XXXX/...')
  .optional()

/**
 * Schema para URL válida
 */
const URLSchema = z
  .string()
  .url('URL inválida')
  .optional()

/**
 * Schema para data ISO 8601
 */
const ISODateSchema = z
  .string()
  .datetime('Data deve estar em formato ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)')
  .optional()

/**
 * Schema para EBMCitation
 */
export const EBMCitationSchema = z.object({
  source: EBMSourceSchema,
  title: z.string().min(5, 'Título da citação deve ter no mínimo 5 caracteres'),
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

/**
 * Schema para via de administração
 */
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

/**
 * Schema para lista RENAME
 */
const RENAMEListSchema = z.enum(['A', 'B', 'C'])

/**
 * Schema para MedicationRecommendation
 */
export const MedicationRecommendationSchema = z.object({
  genericName: z
    .string()
    .min(3, 'Nome genérico deve ter no mínimo 3 caracteres'),
  brandNames: z.array(z.string()).optional(),
  dose: z.string().min(2, 'Dose deve ser especificada'),
  route: MedicationRouteSchema,
  frequency: z.string().min(2, 'Frequência deve ser especificada'),
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

/**
 * Schema para RedFlagSeverity
 */
const RedFlagSeveritySchema = z.enum(['critical', 'warning', 'caution'])

/**
 * Schema para RedFlag
 */
export const RedFlagSchema = z.object({
  description: z
    .string()
    .min(5, 'Descrição do red flag deve ter no mínimo 5 caracteres'),
  severity: RedFlagSeveritySchema,
  clinicalSignificance: z
    .string()
    .min(10, 'Significado clínico deve ser detalhado'),
  immediateAction: z.string().min(5, 'Ação imediata deve ser especificada'),
  timeToAction: z.number().int().positive().optional(),
  references: z.array(EBMCitationSchema).optional(),
  objectiveCriteria: z.array(z.string()).optional(),
})

/**
 * Schema para probabilidade de diagnóstico
 */
const DiagnosisProbabilitySchema = z.enum(['high', 'medium', 'low'])

/**
 * Schema para código ICD-10
 * Formato: Letra maiúscula seguida de 2 dígitos, opcionalmente .XX
 * Exemplos: A00, I21.9, J45.0
 */
const ICD10Schema = z
  .string()
  .regex(
    /^[A-Z]\d{2}(\.\d{1,2})?$/,
    'Código ICD-10 inválido. Formato esperado: A00 ou I21.9'
  )
  .optional()

/**
 * Schema para DifferentialDiagnosis
 */
export const DifferentialDiagnosisSchema = z.object({
  condition: z.string().min(3, 'Nome da condição deve ter no mínimo 3 caracteres'),
  icd10: ICD10Schema,
  probability: DiagnosisProbabilitySchema,
  keyFeatures: z
    .array(z.string())
    .min(1, 'Deve haver pelo menos 1 característica distintiva'),
  diagnosticTests: z.array(z.string()).optional(),
  references: z.array(EBMCitationSchema).optional(),
  specificRedFlags: z.array(z.string()).optional(),
})

/**
 * Schema para qualidade de evidência (GRADE)
 */
const EvidenceQualitySchema = z.enum(['high', 'moderate', 'low', 'very-low'])

/**
 * Schema para RiskStratification
 */
export const RiskStratificationSchema = z.object({
  criteria: z.string().min(3, 'Nome do critério/score deve ser especificado'),
  lowRisk: z.string().min(5, 'Definição de baixo risco deve ser detalhada'),
  moderateRisk: z.string().min(5, 'Definição de risco moderado deve ser detalhada'),
  highRisk: z.string().min(5, 'Definição de alto risco deve ser detalhada'),
  reference: EBMCitationSchema.optional(),
  calculatorUrl: URLSchema,
})

/**
 * Schema para ComplaintExtendedContentEBM
 */
export const ComplaintExtendedContentEBMSchema = z.object({
  redFlags: z.array(RedFlagSchema),
  diagnosticoDiferencial: z.array(DifferentialDiagnosisSchema),
  condutaInicial: z.string().min(10, 'Conduta inicial deve ser detalhada'),
  calculadoras: z.array(z.string()),
  rawMarkdown: z.string().optional(),

  // Campos EBM
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
// Funções de Validação Específicas
// ============================================================================

/**
 * Valida se medicação marcada como RENAME-compatível tem lista especificada
 */
function validateRENAMEConsistency(
  medication: MedicationRecommendation
): string[] {
  const errors: string[] = []

  if (medication.renameCompatible && !medication.renameList) {
    errors.push(
      `Medicação "${medication.genericName}" marcada como RENAME-compatível mas sem lista especificada (A/B/C)`
    )
  }

  if (!medication.renameCompatible && medication.renameList) {
    errors.push(
      `Medicação "${medication.genericName}" tem lista RENAME mas não está marcada como compatível`
    )
  }

  return errors
}

/**
 * Valida se medicação disponível no SUS é RENAME-compatível
 */
function validateSUSConsistency(medication: MedicationRecommendation): string[] {
  const errors: string[] = []

  // Medicação SUS geralmente deve ser RENAME (com exceções)
  if (medication.susAvailable && !medication.renameCompatible) {
    errors.push(
      `Medicação "${medication.genericName}" disponível no SUS mas não marcada como RENAME. Revisar.`
    )
  }

  return errors
}

/**
 * Valida se red flags críticos têm tempo de ação especificado
 */
function validateCriticalRedFlags(redFlag: RedFlag): string[] {
  const warnings: string[] = []

  if (redFlag.severity === 'critical' && !redFlag.timeToAction) {
    warnings.push(
      `Red flag crítico "${redFlag.description}" sem tempo de ação especificado. Recomenda-se adicionar.`
    )
  }

  return warnings
}

/**
 * Valida se citações têm identificadores rastreáveis (PMID ou DOI)
 */
function validateCitationTraceability(citation: EBMCitation): string[] {
  const warnings: string[] = []

  if (!citation.pmid && !citation.doi && !citation.url) {
    warnings.push(
      `Citação "${citation.title}" sem identificador rastreável (PMID, DOI ou URL)`
    )
  }

  return warnings
}

/**
 * Valida se diagnósticos diferenciais de alta probabilidade têm ICD-10
 */
function validateHighProbabilityDiagnoses(
  diagnosis: DifferentialDiagnosis
): string[] {
  const warnings: string[] = []

  if (diagnosis.probability === 'high' && !diagnosis.icd10) {
    warnings.push(
      `Diagnóstico de alta probabilidade "${diagnosis.condition}" sem código ICD-10`
    )
  }

  return warnings
}

// ============================================================================
// Função Principal de Validação
// ============================================================================

/**
 * Valida conteúdo EBM de uma queixa médica
 *
 * @param content Conteúdo EBM a validar
 * @returns Resultado da validação com erros, avisos e campos validados
 */
export function validateEBMContent(
  content: Partial<ComplaintExtendedContentEBM>
): EBMValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const validatedFields: string[] = []

  try {
    // Validação estrutural com Zod
    const result = ComplaintExtendedContentEBMSchema.safeParse(content)

    if (!result.success) {
      // Coletar erros do Zod
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

    // Validações customizadas adicionais
    const validContent = result.data

    // Validar medicações
    if (validContent.medications) {
      validContent.medications.forEach((med) => {
        errors.push(...validateRENAMEConsistency(med))
        warnings.push(...validateSUSConsistency(med))
      })
      validatedFields.push('medications')
    }

    // Validar red flags
    if (validContent.redFlags) {
      validContent.redFlags.forEach((flag) => {
        warnings.push(...validateCriticalRedFlags(flag))
      })
      validatedFields.push('redFlags')
    }

    // Validar citações
    if (validContent.ebmReferences) {
      validContent.ebmReferences.forEach((citation) => {
        warnings.push(...validateCitationTraceability(citation))
      })
      validatedFields.push('ebmReferences')
    }

    // Validar diagnósticos diferenciais
    if (validContent.diagnosticoDiferencial) {
      validContent.diagnosticoDiferencial.forEach((diagnosis) => {
        warnings.push(...validateHighProbabilityDiagnoses(diagnosis))
      })
      validatedFields.push('diagnosticoDiferencial')
    }

    // Validar campos obrigatórios EBM
    if (validContent.lastEBMReview) {
      validatedFields.push('lastEBMReview')
    } else {
      warnings.push('Campo "lastEBMReview" não especificado. Recomenda-se adicionar.')
    }

    if (validContent.evidenceQuality) {
      validatedFields.push('evidenceQuality')
    }

    // Validar consistência RENAME
    if (validContent.renameMedicationsOnly && validContent.medications) {
      const nonRenameMeds = validContent.medications.filter(
        (med) => !med.renameCompatible
      )
      if (nonRenameMeds.length > 0) {
        errors.push(
          `Marcado como "renameMedicationsOnly" mas contém medicações não-RENAME: ${nonRenameMeds.map((m) => m.genericName).join(', ')}`
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
      errors: [`Erro inesperado na validação: ${error instanceof Error ? error.message : String(error)}`],
      warnings: [],
      validatedFields: [],
      validatedAt: new Date().toISOString(),
    }
  }
}

/**
 * Valida apenas citações EBM
 */
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
        errors.push(`Citação ${index + 1} - ${issue.path.join('.')}: ${issue.message}`)
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

/**
 * Valida apenas medicações
 */
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
          `Medicação ${index + 1} (${med.genericName}) - ${issue.path.join('.')}: ${issue.message}`
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

/**
 * Valida apenas red flags
 */
export function validateRedFlags(redFlags: RedFlag[]): EBMValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const validatedFields: string[] = []

  redFlags.forEach((flag, index) => {
    const result = RedFlagSchema.safeParse(flag)

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        errors.push(`Red Flag ${index + 1} - ${issue.path.join('.')}: ${issue.message}`)
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

// ============================================================================
// Utilitários de Validação
// ============================================================================

/**
 * Formata resultado de validação para exibição no console
 */
export function formatValidationResult(result: EBMValidationResult): string {
  const lines: string[] = []

  lines.push('═'.repeat(80))
  lines.push(
    result.valid
      ? '✅ VALIDAÇÃO EBM PASSOU'
      : '❌ VALIDAÇÃO EBM FALHOU'
  )
  lines.push('═'.repeat(80))

  if (result.errors.length > 0) {
    lines.push('\n🚨 ERROS CRÍTICOS:')
    result.errors.forEach((error, i) => {
      lines.push(`  ${i + 1}. ${error}`)
    })
  }

  if (result.warnings.length > 0) {
    lines.push('\n⚠️  AVISOS:')
    result.warnings.forEach((warning, i) => {
      lines.push(`  ${i + 1}. ${warning}`)
    })
  }

  if (result.validatedFields.length > 0) {
    lines.push(`\n✓ Campos validados: ${result.validatedFields.length}`)
    lines.push(`  ${result.validatedFields.join(', ')}`)
  }

  lines.push(`\n⏰ Validado em: ${result.validatedAt}`)
  lines.push('═'.repeat(80))

  return lines.join('\n')
}
