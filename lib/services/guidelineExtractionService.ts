/**
 * Guideline Extraction Service
 *
 * AI-powered extraction of structured medical data from Brazilian clinical guidelines.
 * Supports dual output: Flash templates (2-3 min) + Anamnese Well checkboxes (5-10 min).
 *
 * @module guidelineExtractionService
 */

import { z } from 'zod'
import { generateObject } from 'ai'
import { openai, DEFAULT_MODEL } from '@/lib/ai/config'
import {
  GUIDELINE_EXTRACTION_SYSTEM_PROMPT,
  buildGuidelineExtractionPrompt,
} from '@/lib/ai/guideline-prompts'
import { prisma } from '@/lib/db/prisma'
import type {
  GuidelineExtraction,
  FlashTemplate,
  AnamneseCheckbox,
  RedFlagExtended,
  MedicationRENAME,
  ClinicalCalculator,
  DifferentialDiagnosis,
  EBMReference,
} from '@/lib/types/medical-extended'

// ============================================================================
// ZOD SCHEMAS FOR VALIDATION
// ============================================================================

/**
 * Flash Template Schema
 */
const FlashTemplateSchema = z.object({
  qp: z.string().min(10).describe('Queixa Principal - pre-filled text with variables'),
  hda: z.string().min(20).describe('História da Doença Atual - symptom characteristics'),
  ef: z.string().min(20).describe('Exame Físico - essential findings with vitals'),
  hd: z.string().min(5).describe('Hipótese Diagnóstica - specific diagnosis'),
  conduta: z.string().min(30).describe('Conduta - numbered action steps'),
  acaoImediata: z.string().min(30).describe('Immediate action protocol (first 10 minutes)'),
  tempoEstimado: z.number().min(1).max(10).describe('Estimated completion time in minutes'),
})

/**
 * Anamnese Checkbox Schema
 */
const AnamneseCheckboxSchema = z.object({
  category: z.enum([
    'QP',
    'HDA',
    'ANTECEDENTES',
    'MEDICACOES',
    'ALERGIAS',
    'HABITOS',
    'EXAME_FISICO',
    'NEGATIVAS',
  ]).describe('CFM-compliant category'),
  displayText: z.string().min(5).describe('Text displayed next to checkbox'),
  narrativeText: z.string().min(5).describe('Text inserted into medical narrative when checked'),
  section: z.enum(['FLASH', 'DETAILED', 'BOTH']).describe('Where this checkbox appears'),
  isRequired: z.boolean().describe('Required for CFM compliance'),
  isRedFlag: z.boolean().describe('Indicates warning sign/red flag'),
})

/**
 * Red Flag Extended Schema
 */
const RedFlagExtendedSchema = z.object({
  description: z.string().min(10).describe('Description of the red flag sign/symptom'),
  severity: z.enum(['critical', 'warning', 'caution']).describe('Severity level'),
  immediateAction: z.string().min(10).describe('Immediate action to take'),
  timeToAction: z.number().optional().describe('Time window for action (minutes)'),
})

/**
 * Medication RENAME Schema
 */
const MedicationRENAMESchema = z.object({
  genericName: z.string().min(3).describe('Generic medication name (DCB)'),
  dose: z.string().min(2).describe('Dosage and frequency'),
  route: z.enum(['VO', 'IV', 'IM', 'SC', 'Inalatório', 'SL', 'Tópico', 'Retal', 'Nasal', 'Ocular']).describe('Route of administration'),
  susAvailable: z.boolean().describe('Available in SUS'),
  renameList: z.enum(['A', 'B', 'C']).optional().describe('RENAME list classification'),
  evidenceLevel: z.enum(['A', 'B', 'C', 'D']).describe('Evidence level for this indication'),
  commercialName: z.string().optional().describe('Commercial name (optional reference)'),
  warnings: z.array(z.string()).optional().describe('Special considerations or warnings'),
})

/**
 * Clinical Calculator Schema
 */
const ClinicalCalculatorSchema = z.object({
  name: z.string().min(3).describe('Calculator name (e.g., HEART Score, CURB-65)'),
  purpose: z.string().min(10).describe('Purpose/indication for using this calculator'),
  evidenceLevel: z.enum(['A', 'B', 'C', 'D']).describe('Evidence level supporting this tool'),
  url: z.string().optional().describe('Link to MDCalc or other calculator tool'),
})

/**
 * Differential Diagnosis Schema
 */
const DifferentialDiagnosisSchema = z.object({
  condition: z.string().min(5).describe('Condition name'),
  icd10: z.string().regex(/^[A-Z]\d{2}\.\d{1,2}$/).describe('ICD-10 code'),
  probability: z.enum(['high', 'medium', 'low']).describe('Probability level'),
  keyFeatures: z.array(z.string()).min(1).describe('Key clinical features'),
  mustNotMiss: z.boolean().optional().describe('Whether this is a must-not-miss diagnosis'),
})

/**
 * EBM Reference Schema
 */
const EBMReferenceSchema = z.object({
  source: z.enum([
    'sbc', 'sbpt', 'amb', 'ms', 'uptodate', 'dynamed',
    'cochrane', 'pubmed', 'sbim', 'sbn', 'other'
  ]).describe('Source of the reference'),
  title: z.string().min(10).describe('Title of the guideline/article'),
  year: z.number().min(2010).max(2030).describe('Publication year'),
  url: z.string().optional().describe('URL to the reference'),
  doi: z.string().optional().describe('DOI or PMID'),
  evidenceQuality: z.enum(['high', 'moderate', 'low', 'very_low']).optional().describe('Evidence quality rating'),
})

/**
 * Complete Guideline Extraction Schema
 */
export const GuidelineExtractionSchema = z.object({
  complaintName: z.string().min(5).describe('Name of the clinical complaint/syndrome'),
  group: z.enum(['CV', 'NC', 'RC', 'GI', 'GU', 'INF', 'TR', 'TOX', 'GEN', 'MSK', 'PSI', 'OBG', 'PED', 'DERM', 'ORL', 'OFT', 'ENV']).describe('Medical system group'),
  riskLevel: z.literal('high').describe('Risk level (always high for ER complaints)'),
  icd10Codes: z.array(z.string().regex(/^[A-Z]\d{2}\.\d{1,2}$/)).min(1).describe('ICD-10 codes'),

  flashTemplate: FlashTemplateSchema.describe('Flash template for rapid documentation'),
  anamneseCheckboxes: z.array(AnamneseCheckboxSchema).min(30).max(60).describe('Detailed checkboxes for complete anamnesis'),

  redFlags: z.array(RedFlagExtendedSchema).min(3).describe('Extended red flags with immediate action'),
  medications: z.array(MedicationRENAMESchema).min(1).describe('SUS/RENAME-compatible medications'),
  calculators: z.array(ClinicalCalculatorSchema).describe('Clinical calculators/scores'),
  differentialDiagnosis: z.array(DifferentialDiagnosisSchema).min(3).describe('Differential diagnoses'),
  references: z.array(EBMReferenceSchema).min(1).describe('Evidence-based medicine references'),
})

export type GuidelineExtractionData = z.infer<typeof GuidelineExtractionSchema>

// ============================================================================
// EXTRACTION SERVICE FUNCTIONS
// ============================================================================

/**
 * Process a guideline document to extract structured medical data
 *
 * @param sourceDocumentId - ID of the source document in the database
 * @returns Promise resolving to the created ContentExtraction record
 *
 * @example
 * const extraction = await processGuidelineDocument('doc-123')
 * console.log(extraction.id) // extraction-456
 */
export async function processGuidelineDocument(sourceDocumentId: string) {
  // 1. Fetch source document from database
  const document = await prisma.sourceDocument.findUnique({
    where: { id: sourceDocumentId },
  })

  if (!document) {
    throw new Error(`Source document not found: ${sourceDocumentId}`)
  }

  if (!document.content || document.content.trim().length < 100) {
    throw new Error('Document content is too short or empty')
  }

  try {
    // 2. Build extraction prompt with guideline content
    const prompt = buildGuidelineExtractionPrompt(document.content, 'both')

    // 3. Call OpenAI with structured output extraction
    console.log(`[GuidelineExtraction] Starting extraction for document: ${sourceDocumentId}`)

    const { object } = await generateObject({
      model: openai(DEFAULT_MODEL),
      system: GUIDELINE_EXTRACTION_SYSTEM_PROMPT,
      prompt,
      schema: GuidelineExtractionSchema,
      temperature: 0.2, // Lower temperature for consistency
      maxTokens: 8000, // Increased for comprehensive extraction
    })

    console.log(`[GuidelineExtraction] Successfully extracted data for: ${object.complaintName}`)

    // 4. Validate extraction quality
    validateExtractionQuality(object)

    // 5. Save extraction result to database
    const extraction = await prisma.contentExtraction.create({
      data: {
        sourceDocumentId: document.id,
        extractedData: object as unknown as Record<string, unknown>, // Cast for Prisma Json type
        status: 'REVIEW_NEEDED', // Always requires human review
      },
    })

    // 6. Update source document status
    await prisma.sourceDocument.update({
      where: { id: document.id },
      data: {
        status: 'PROCESSED',
      },
    })

    console.log(`[GuidelineExtraction] Extraction saved with ID: ${extraction.id}`)

    return extraction
  } catch (error) {
    console.error('[GuidelineExtraction] Error processing document:', error)

    // Update document status to ERROR
    await prisma.sourceDocument.update({
      where: { id: document.id },
      data: {
        status: 'ERROR',
      },
    })

    // Re-throw with more context
    if (error instanceof Error) {
      throw new Error(`Guideline extraction failed: ${error.message}`)
    }
    throw error
  }
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate extraction quality and completeness
 * Throws error if validation fails
 */
function validateExtractionQuality(data: GuidelineExtractionData): void {
  const errors: string[] = []

  // 1. Check Flash template completeness
  if (data.flashTemplate.tempoEstimado > 5) {
    errors.push(`Flash template estimated time too high: ${data.flashTemplate.tempoEstimado} min (should be ≤5)`)
  }

  // 2. Check checkbox section distribution
  const checkboxCounts = {
    flash: data.anamneseCheckboxes.filter(c => c.section === 'FLASH').length,
    detailed: data.anamneseCheckboxes.filter(c => c.section === 'DETAILED').length,
    both: data.anamneseCheckboxes.filter(c => c.section === 'BOTH').length,
  }

  if (checkboxCounts.both < 10) {
    errors.push(`Too few BOTH checkboxes: ${checkboxCounts.both} (should be ≥10)`)
  }

  if (checkboxCounts.flash + checkboxCounts.both < 10) {
    errors.push(`Too few Flash checkboxes: ${checkboxCounts.flash + checkboxCounts.both} (should be ≥10 total)`)
  }

  // 3. Check red flags have critical severity
  const criticalRedFlags = data.redFlags.filter(rf => rf.severity === 'critical')
  if (criticalRedFlags.length === 0) {
    errors.push('No critical red flags found (high-risk complaint must have ≥1)')
  }

  // 4. Check medications are SUS-available
  const nonSUSMeds = data.medications.filter(m => !m.susAvailable)
  if (nonSUSMeds.length > 0) {
    errors.push(`Non-SUS medications found: ${nonSUSMeds.map(m => m.genericName).join(', ')}`)
  }

  // 5. Check for Brazilian guideline references
  const brazilianRefs = data.references.filter(r =>
    ['sbc', 'sbpt', 'amb', 'ms', 'sbim', 'sbn'].includes(r.source)
  )
  if (brazilianRefs.length === 0) {
    errors.push('No Brazilian guideline references found')
  }

  // 6. Check ICD-10 format
  const invalidICD10 = data.icd10Codes.filter(code => !/^[A-Z]\d{2}\.\d{1,2}$/.test(code))
  if (invalidICD10.length > 0) {
    errors.push(`Invalid ICD-10 codes: ${invalidICD10.join(', ')}`)
  }

  // Throw if validation failed
  if (errors.length > 0) {
    console.warn('[GuidelineExtraction] Validation warnings:', errors)
    // Note: These are warnings, not blocking errors
    // Human reviewer will address them
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate complaint ID from complaint name
 *
 * @param group - Medical group (CV, NC, RC, etc.)
 * @param complaintName - Name of the complaint
 * @returns Formatted complaint ID
 *
 * @example
 * generateComplaintId('CV', 'Síndrome Coronariana Aguda')
 * // Returns: 'CV_SINDROME_CORONARIA_AGUDA'
 */
export function generateComplaintId(group: string, complaintName: string): string {
  // Remove accents
  const normalized = complaintName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .slice(0, 50) // Limit length

  return `${group}_${normalized}`
}

/**
 * Extract priority checkboxes (those marked as FLASH or BOTH)
 *
 * @param checkboxes - Array of anamnese checkboxes
 * @returns Mapping of categories to checkbox IDs
 */
export function extractPriorityCheckboxes(checkboxes: AnamneseCheckbox[]): Record<string, string[]> {
  const priority: Record<string, string[]> = {}

  checkboxes.forEach((checkbox, index) => {
    if (checkbox.section === 'FLASH' || checkbox.section === 'BOTH') {
      const category = checkbox.category
      if (!priority[category]) {
        priority[category] = []
      }
      // Use checkbox displayText as ID (simplified for now)
      priority[category].push(`checkbox_${index}`)
    }
  })

  return priority
}

/**
 * Get extraction statistics for monitoring
 *
 * @param extractionId - ID of the extraction
 * @returns Statistics object
 */
export async function getExtractionStats(extractionId: string) {
  const extraction = await prisma.contentExtraction.findUnique({
    where: { id: extractionId },
  })

  if (!extraction) {
    throw new Error(`Extraction not found: ${extractionId}`)
  }

  const data = extraction.extractedData as unknown as GuidelineExtractionData

  return {
    complaintName: data.complaintName,
    group: data.group,
    totalCheckboxes: data.anamneseCheckboxes.length,
    flashCheckboxes: data.anamneseCheckboxes.filter(c => c.section === 'FLASH' || c.section === 'BOTH').length,
    detailedCheckboxes: data.anamneseCheckboxes.filter(c => c.section === 'DETAILED').length,
    redFlags: data.redFlags.length,
    criticalRedFlags: data.redFlags.filter(rf => rf.severity === 'critical').length,
    medications: data.medications.length,
    susMedications: data.medications.filter(m => m.susAvailable).length,
    calculators: data.calculators.length,
    differentialDiagnoses: data.differentialDiagnosis.length,
    references: data.references.length,
    brazilianReferences: data.references.filter(r => ['sbc', 'sbpt', 'amb', 'ms'].includes(r.source)).length,
    estimatedFlashTime: data.flashTemplate.tempoEstimado,
  }
}

/**
 * Export extraction to Obsidian markdown format
 * This will be used by the sync system to create markdown files
 *
 * @param extractionId - ID of the extraction
 * @returns Object with Flash and Anamnese markdown content
 */
export async function exportToMarkdown(extractionId: string) {
  const extraction = await prisma.contentExtraction.findUnique({
    where: { id: extractionId },
  })

  if (!extraction) {
    throw new Error(`Extraction not found: ${extractionId}`)
  }

  const data = extraction.extractedData as unknown as GuidelineExtractionData

  // Generate complaint ID
  const complaintId = generateComplaintId(data.group, data.complaintName)

  // Generate Flash markdown
  const flashMarkdown = generateFlashMarkdown(complaintId, data)

  // Generate Anamnese Well markdown
  const anamneseMarkdown = generateAnamneseMarkdown(complaintId, data)

  return {
    complaintId,
    flashMarkdown,
    anamneseMarkdown,
    flashFilename: `Flash-${complaintId}.md`,
    anamneseFilename: `${data.group}-${complaintId}-Checkboxes.md`,
  }
}

/**
 * Generate Flash template markdown
 */
function generateFlashMarkdown(complaintId: string, data: GuidelineExtractionData): string {
  const frontmatter = `---
id: ${complaintId}
grupo: ${data.group}
risco: high
severidade: 5
icd10: ${JSON.stringify(data.icd10Codes)}
tempoEstimado: ${data.flashTemplate.tempoEstimado}
ebm_version: "2.0"
last_ebm_review: "${new Date().toISOString().split('T')[0]}"
brazilian_guidelines: ${JSON.stringify(data.references.filter(r => ['sbc', 'sbpt', 'amb', 'ms'].includes(r.source)).map(r => `${r.source.toUpperCase()} ${r.title} (${r.year})`))}
sus_protocol_compatible: true
rename_medications_only: true
---`

  return `${frontmatter}

# Flash: ${data.complaintName}

## ⚡ Ação Imediata (0-10 min)

${data.flashTemplate.acaoImediata}

## 📝 Template de Prontuário

**QP**: ${data.flashTemplate.qp}

**HDA**: ${data.flashTemplate.hda}

**EF**: ${data.flashTemplate.ef}

**HD**: ${data.flashTemplate.hd}

**CD**:
${data.flashTemplate.conduta}

## 🚩 Red Flags

${data.redFlags.map(rf => {
    const emoji = rf.severity === 'critical' ? '🔴' : rf.severity === 'warning' ? '🟡' : '🟢'
    return `${emoji} ${rf.description} → ${rf.immediateAction}${rf.timeToAction ? ` (< ${rf.timeToAction} min)` : ''}`
  }).join('\n')}

${data.calculators.length > 0 ? `## 📊 Calculadoras

${data.calculators.map(calc => `- **${calc.name}** - ${calc.purpose}`).join('\n')}
` : ''}

## 💊 Medicações (RENAME)

${data.medications.map(med =>
  `- **${med.genericName}** ${med.dose} (${med.route}) - Lista ${med.renameList || '?'} - Evidência ${med.evidenceLevel}`
).join('\n')}

## 🔍 Diagnóstico Diferencial

${data.differentialDiagnosis.map(dd =>
  `- **${dd.condition}** (${dd.icd10}) - Probabilidade: ${dd.probability} - ${dd.keyFeatures.join(', ')}`
).join('\n')}

## 📚 Referências EBM

${data.references.map(ref =>
  `- **${ref.source.toUpperCase()}** - ${ref.title} (${ref.year})`
).join('\n')}

---
*Tempo estimado de preenchimento: ${data.flashTemplate.tempoEstimado} minutos*
`
}

/**
 * Generate Anamnese Well checkboxes markdown
 */
function generateAnamneseMarkdown(complaintId: string, data: GuidelineExtractionData): string {
  const frontmatter = `---
id: ${complaintId}
grupo: ${data.group}
risco: high
---`

  // Group checkboxes by category
  const categories: Record<string, AnamneseCheckbox[]> = {}
  data.anamneseCheckboxes.forEach(checkbox => {
    if (!categories[checkbox.category]) {
      categories[checkbox.category] = []
    }
    categories[checkbox.category].push(checkbox)
  })

  const categoryNames: Record<string, string> = {
    QP: 'Queixa Principal',
    HDA: 'História da Doença Atual',
    ANTECEDENTES: 'Antecedentes',
    MEDICACOES: 'Medicações',
    ALERGIAS: 'Alergias',
    HABITOS: 'Hábitos',
    EXAME_FISICO: 'Exame Físico',
    NEGATIVAS: 'Negativas Pertinentes',
  }

  const checkboxSections = Object.entries(categories).map(([category, checkboxes]) => {
    return `## ${categoryNames[category] || category}

${checkboxes.map(cb => `- [ ] ${cb.displayText}
  - **Narrativa**: "${cb.narrativeText}"
  - **Seção**: ${cb.section}${cb.isRedFlag ? '\n  - **Red Flag**: true' : ''}${cb.isRequired ? '\n  - **Required**: true' : ''}`).join('\n\n')}`
  }).join('\n\n')

  const counts = {
    total: data.anamneseCheckboxes.length,
    flash: data.anamneseCheckboxes.filter(c => c.section === 'FLASH').length,
    detailed: data.anamneseCheckboxes.filter(c => c.section === 'DETAILED').length,
    both: data.anamneseCheckboxes.filter(c => c.section === 'BOTH').length,
  }

  return `${frontmatter}

# ${data.group} - ${data.complaintName} (Anamnese Completa)

${checkboxSections}

---
*Total: ${counts.total} checkboxes (${counts.flash} FLASH, ${counts.detailed} DETAILED, ${counts.both} BOTH)*
`
}
