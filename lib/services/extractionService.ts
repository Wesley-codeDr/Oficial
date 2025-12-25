import { z } from 'zod'
import { generateObject } from 'ai'
import { openai, DEFAULT_MODEL } from '@/lib/ai/config'
import { EXTRACTION_SYSTEM_PROMPT, buildExtractionPrompt } from '@/lib/ai/extraction-prompts'
import { prisma } from '@/lib/db/prisma'

// Define the schema for the extraction
export const ExtractionSchema = z.object({
  syndromeName: z.string().describe('Name of the clinical syndrome or chief complaint'),
  description: z.string().describe('Brief description of the protocol scope'),
  questions: z.array(
    z.object({
      category: z.enum([
        'QP',
        'HDA',
        'ANTECEDENTES',
        'MEDICACOES',
        'ALERGIAS',
        'HABITOS',
        'EXAME_FISICO',
        'NEGATIVAS',
      ]),
      displayText: z.string().describe('Text displayed next to the checkbox'),
      narrativeText: z.string().describe('Text to be inserted into the narrative when checked'),
      isRequired: z.boolean().default(false),
      isRedFlag: z.boolean().default(false),
      isNegative: z.boolean().default(false),
    })
  ),
  redFlags: z.array(
    z.object({
      name: z.string(),
      description: z.string().optional(),
      severity: z.enum(['WARNING', 'CRITICAL']),
      message: z.string().describe('Alert message to show the physician'),
    })
  ),
})

export type ExtractedData = z.infer<typeof ExtractionSchema>

export async function processSourceDocument(sourceDocumentId: string) {
  // 1. Fetch document
  const document = await prisma.sourceDocument.findUnique({
    where: { id: sourceDocumentId },
  })

  if (!document) {
    throw new Error('Source document not found')
  }

  try {
    // 2. Call AI to extract structured data
    const { object } = await generateObject({
      model: openai(DEFAULT_MODEL),
      system: EXTRACTION_SYSTEM_PROMPT,
      prompt: buildExtractionPrompt(document.content),
      schema: ExtractionSchema,
    })

    // 3. Save extraction result
    const extraction = await prisma.contentExtraction.create({
      data: {
        sourceDocumentId: document.id,
        extractedData: object as unknown as Record<string, unknown>, // Cast for Prisma Json type
        status: 'REVIEW_NEEDED',
      },
    })

    // 4. Update document status
    await prisma.sourceDocument.update({
      where: { id: document.id },
      data: { status: 'PROCESSED' },
    })

    return extraction
  } catch (error) {
    console.error('Error processing document:', error)

    await prisma.sourceDocument.update({
      where: { id: document.id },
      data: { status: 'ERROR' },
    })

    throw error
  }
}
