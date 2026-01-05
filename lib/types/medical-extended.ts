/**
 * Extended Medical Types for Flash + Anamnese Well Dual System
 *
 * This module extends the existing medical type system to support both:
 * - Flash templates (quick 2-3 min emergency entry)
 * - Anamnese Well (detailed 5-10 min checkbox-based documentation)
 */

import type { Complaint } from './medical'

// ============================================================================
// FLASH TEMPLATE TYPES
// ============================================================================

/**
 * Flash Template for rapid emergency documentation (2-3 minutes)
 * Pre-filled text with variables for quick customization
 */
export interface FlashTemplate {
  /** Pre-filled Queixa Principal with variables like {tipo_dor}, {tempo} */
  qp: string

  /** Pre-filled História da Doença Atual with symptom characteristics */
  hda: string

  /** Pre-filled Exame Físico with vital signs variables: {pa}, {fc}, {spo2} */
  ef: string

  /** Pre-filled Hipótese Diagnóstica */
  hd: string

  /** Pre-filled Conduta with numbered steps */
  conduta: string

  /** Immediate action protocol (first 10 minutes) */
  acaoImediata: string

  /** Estimated time to complete this template (in minutes) */
  tempoEstimado: number
}

// ============================================================================
// ANAMNESE WELL CHECKBOX TYPES
// ============================================================================

/**
 * Section indicator for where a checkbox should appear
 */
export type CheckboxSection = 'FLASH' | 'DETAILED' | 'BOTH'

/**
 * Medical history categories (CFM-compliant)
 */
export type CheckboxCategory =
  | 'QP'              // Queixa Principal
  | 'HDA'             // História da Doença Atual
  | 'ANTECEDENTES'    // Antecedentes pessoais
  | 'MEDICACOES'      // Medicações em uso
  | 'ALERGIAS'        // Alergias
  | 'HABITOS'         // Hábitos de vida
  | 'EXAME_FISICO'    // Exame Físico
  | 'NEGATIVAS'       // Negativas pertinentes

/**
 * Individual checkbox item for Anamnese Well
 */
export interface AnamneseCheckbox {
  /** Category this checkbox belongs to */
  category: CheckboxCategory

  /** Text displayed to the physician next to the checkbox */
  displayText: string

  /** Text inserted into the medical narrative when checked */
  narrativeText: string

  /** Where this checkbox appears: FLASH only, DETAILED only, or BOTH */
  section: CheckboxSection

  /** Whether this field is required for CFM compliance */
  isRequired: boolean

  /** Whether this checkbox indicates a red flag/warning sign */
  isRedFlag: boolean
}

/**
 * Mapping of priority checkboxes by category
 * Used to indicate which checkboxes are most important for Flash mode
 */
export interface PriorityCheckboxMapping {
  QP?: string[]
  HDA?: string[]
  ANTECEDENTES?: string[]
  MEDICACOES?: string[]
  ALERGIAS?: string[]
  HABITOS?: string[]
  EXAME_FISICO?: string[]
  NEGATIVAS?: string[]
}

// ============================================================================
// RED FLAG TYPES
// ============================================================================

/**
 * Red flag severity levels
 */
export type RedFlagSeverity = 'critical' | 'warning' | 'caution'

/**
 * Extended red flag with immediate action guidance
 */
export interface RedFlagExtended {
  /** Description of the red flag sign/symptom */
  description: string

  /** Severity level */
  severity: RedFlagSeverity

  /** Immediate action to take when this red flag is detected */
  immediateAction: string

  /** Time window for action (in minutes) */
  timeToAction?: number
}

// ============================================================================
// MEDICATION TYPES (SUS/RENAME)
// ============================================================================

/**
 * Medication routes (Brazilian standard)
 */
export type MedicationRoute = 'VO' | 'IV' | 'IM' | 'SC' | 'Inalatório' | 'SL' | 'Tópico' | 'Retal' | 'Nasal' | 'Ocular'

/**
 * RENAME lists (Relação Nacional de Medicamentos Essenciais)
 */
export type RENAMEList = 'A' | 'B' | 'C'

/**
 * Evidence levels (Oxford CEBM)
 */
export type EvidenceLevel = 'A' | 'B' | 'C' | 'D'

/**
 * Medication with SUS/RENAME compliance
 */
export interface MedicationRENAME {
  /** Generic medication name (DCB - Denominação Comum Brasileira) */
  genericName: string

  /** Dosage and frequency */
  dose: string

  /** Route of administration */
  route: MedicationRoute

  /** Whether this medication is available in SUS */
  susAvailable: boolean

  /** RENAME list classification (if applicable) */
  renameList?: RENAMEList

  /** Evidence level for this indication */
  evidenceLevel: EvidenceLevel

  /** Commercial name (optional, for reference) */
  commercialName?: string

  /** Special considerations or warnings */
  warnings?: string[]
}

// ============================================================================
// CALCULATOR TYPES
// ============================================================================

/**
 * Clinical decision calculator/score
 */
export interface ClinicalCalculator {
  /** Calculator name (e.g., "HEART Score", "CURB-65") */
  name: string

  /** Purpose/indication for using this calculator */
  purpose: string

  /** Evidence level supporting this tool */
  evidenceLevel: EvidenceLevel

  /** Link to MDCalc or other calculator tool */
  url?: string
}

// ============================================================================
// DIFFERENTIAL DIAGNOSIS TYPES
// ============================================================================

/**
 * Diagnosis probability levels
 */
export type DiagnosisProbability = 'high' | 'medium' | 'low'

/**
 * Differential diagnosis entry
 */
export interface DifferentialDiagnosis {
  /** Condition name */
  condition: string

  /** ICD-10 code */
  icd10: string

  /** Probability level for this differential */
  probability: DiagnosisProbability

  /** Key clinical features that distinguish this diagnosis */
  keyFeatures: string[]

  /** Whether this is a "must not miss" diagnosis */
  mustNotMiss?: boolean
}

// ============================================================================
// EBM REFERENCE TYPES
// ============================================================================

/**
 * Citation sources (Brazilian and international)
 */
export type CitationSource =
  | 'sbc'                  // Sociedade Brasileira de Cardiologia
  | 'sbpt'                 // Sociedade Brasileira de Pneumologia e Tisiologia
  | 'amb'                  // Associação Médica Brasileira
  | 'ms'                   // Ministério da Saúde
  | 'uptodate'             // UpToDate
  | 'dynamed'              // DynaMed
  | 'cochrane'             // Cochrane Library
  | 'pubmed'               // PubMed/MEDLINE
  | 'sbim'                 // Sociedade Brasileira de Infectologia
  | 'sbn'                  // Sociedade Brasileira de Nefrologia
  | 'other'

/**
 * Evidence-based medicine reference
 */
export interface EBMReference {
  /** Source of the reference */
  source: CitationSource

  /** Title of the guideline/article */
  title: string

  /** Publication year */
  year: number

  /** URL to the reference (if available) */
  url?: string

  /** DOI or PMID (if applicable) */
  doi?: string

  /** Evidence quality rating */
  evidenceQuality?: 'high' | 'moderate' | 'low' | 'very_low'
}

// ============================================================================
// GUIDELINE EXTRACTION TYPES
// ============================================================================

/**
 * Complete guideline extraction result
 * Contains both Flash template and Anamnese Well checkboxes
 */
export interface GuidelineExtraction {
  /** Name of the clinical complaint/syndrome */
  complaintName: string

  /** Medical system group (CV, RC, NC, etc.) */
  group: string

  /** Risk level (for high-risk ER complaints, always 'high') */
  riskLevel: 'high'

  /** ICD-10 codes for this complaint */
  icd10Codes: string[]

  /** Flash template for rapid documentation */
  flashTemplate: FlashTemplate

  /** Detailed checkboxes for complete anamnesis */
  anamneseCheckboxes: AnamneseCheckbox[]

  /** Extended red flags with immediate action guidance */
  redFlags: RedFlagExtended[]

  /** SUS/RENAME-compatible medications */
  medications: MedicationRENAME[]

  /** Clinical calculators/scores */
  calculators: ClinicalCalculator[]

  /** Differential diagnoses */
  differentialDiagnosis: DifferentialDiagnosis[]

  /** Evidence-based medicine references */
  references: EBMReference[]
}

// ============================================================================
// EXTENDED COMPLAINT TYPES
// ============================================================================

/**
 * Extended Complaint interface with Flash + Anamnese Well support
 * Extends the existing Complaint type from medical.ts
 */
export interface ComplaintExtended extends Complaint {
  /** Flash template (optional, for high-risk complaints) */
  flashTemplate?: FlashTemplate

  /** Anamnese Well checkboxes (optional, for detailed documentation) */
  anamneseCheckboxes?: AnamneseCheckbox[]

  /** Priority checkbox mapping for Flash mode */
  priorityCheckboxes?: PriorityCheckboxMapping

  /** Extended red flags with immediate action */
  redFlagsExtended?: RedFlagExtended[]

  /** SUS/RENAME medications */
  medicationsRENAME?: MedicationRENAME[]

  /** Clinical calculators */
  clinicalCalculators?: ClinicalCalculator[]

  /** Differential diagnoses */
  differentialDiagnoses?: DifferentialDiagnosis[]

  /** EBM references */
  ebmReferences?: EBMReference[]
}

// ============================================================================
// VALIDATION TYPES
// ============================================================================

/**
 * Validation result for high-risk complaints
 */
export interface ValidationResult {
  /** Whether validation passed */
  passed: boolean

  /** List of errors (blocking issues) */
  errors: ValidationError[]

  /** List of warnings (non-blocking issues) */
  warnings: ValidationWarning[]

  /** Overall validation score (0-100) */
  score: number
}

export interface ValidationError {
  /** Field or section with error */
  field: string

  /** Error message */
  message: string

  /** Severity level */
  severity: 'critical' | 'high' | 'medium'
}

export interface ValidationWarning {
  /** Field or section with warning */
  field: string

  /** Warning message */
  message: string

  /** Recommendation for improvement */
  recommendation?: string
}

// ============================================================================
// MARKDOWN PARSING TYPES
// ============================================================================

/**
 * Parsed Flash markdown file
 */
export interface ParsedFlashMarkdown {
  /** Frontmatter metadata */
  frontmatter: {
    id: string
    grupo: string
    risco: 'high' | 'medium' | 'low'
    severidade: number
    icd10: string[]
    tempoEstimado: number
    ebm_version: string
    last_ebm_review: string
    brazilian_guidelines: string[]
    sus_protocol_compatible: boolean
    rename_medications_only: boolean
    [key: string]: unknown
  }

  /** Parsed Flash template content */
  content: FlashTemplate

  /** Red flags extracted from markdown */
  redFlags: RedFlagExtended[]

  /** Calculators extracted from markdown */
  calculators: ClinicalCalculator[]

  /** Medications extracted from markdown */
  medications: MedicationRENAME[]

  /** Differential diagnoses extracted from markdown */
  differentialDiagnosis: DifferentialDiagnosis[]

  /** EBM references extracted from markdown */
  references: EBMReference[]

  /** Raw markdown content */
  rawMarkdown: string
}

/**
 * Parsed Anamnese Well markdown file
 */
export interface ParsedAnamneseMarkdown {
  /** Frontmatter metadata */
  frontmatter: {
    id: string
    grupo: string
    risco: 'high' | 'medium' | 'low'
    [key: string]: unknown
  }

  /** Parsed checkboxes */
  checkboxes: AnamneseCheckbox[]

  /** Checkbox counts by section */
  checkboxCounts: {
    total: number
    flash: number
    detailed: number
    both: number
    byCategory: Record<CheckboxCategory, number>
  }

  /** Raw markdown content */
  rawMarkdown: string
}

// ============================================================================
// SYNC TYPES
// ============================================================================

/**
 * Sync conflict resolution strategy
 */
export type ConflictResolution = 'keep_flash' | 'keep_anamnese' | 'manual_merge' | 'skip'

/**
 * Sync conflict information
 */
export interface SyncConflict {
  /** Complaint ID with conflict */
  complaintId: string

  /** Flash template last modified timestamp */
  flashModified: string

  /** Anamnese checkboxes last modified timestamp */
  anamneseModified: string

  /** Conflicting fields */
  conflicts: {
    field: string
    flashValue: unknown
    anamneseValue: unknown
  }[]

  /** Recommended resolution */
  recommendedResolution: ConflictResolution
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  CheckboxSection,
  CheckboxCategory,
  RedFlagSeverity,
  MedicationRoute,
  RENAMEList,
  EvidenceLevel,
  DiagnosisProbability,
  CitationSource,
  ConflictResolution,
}
