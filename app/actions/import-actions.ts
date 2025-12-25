'use server'

import { prisma } from '@/lib/db/prisma'
import { extractText } from '@/lib/utils/text-extraction'
import { processSourceDocument } from '@/lib/services/extractionService'
import { revalidatePath } from 'next/cache'
import type { CheckboxCategory, RedFlagSeverity } from '@prisma/client'

export async function uploadDocument(formData: globalThis.FormData) {
  const file = formData.get('file') as globalThis.File

  if (!file) {
    return { error: 'No file provided' }
  }

  try {
    // 1. Extract text (this runs on server)
    const text = await extractText(file)

    // 2. Create SourceDocument record
    const document = await prisma.sourceDocument.create({
      data: {
        title: file.name,
        type: file.type === 'application/pdf' ? 'PDF' : 'TXT',
        content: text,
        status: 'PENDING',
      },
    })

    // 3. Trigger extraction immediately (optional, or can be separate step)
    // For better UX, we might want to do this async or let the user trigger it
    // But for MVP, let's just trigger it.
    await processSourceDocument(document.id)

    revalidatePath('/admin/import')
    return { success: true, documentId: document.id }
  } catch (error) {
    console.error('Upload error:', error)
    return { error: 'Failed to upload and process file' }
  }
}

export async function getSourceDocuments() {
  return await prisma.sourceDocument.findMany({
    orderBy: { createdAt: 'desc' },
    include: { extractions: true },
  })
}

export async function getExtraction(id: string) {
  return await prisma.contentExtraction.findUnique({
    where: { id },
    include: { sourceDocument: true },
  })
}

interface DraftData {
  syndromeName: string
  description: string
  questions: Array<{
    category: CheckboxCategory
    displayText: string
    narrativeText: string
    isRequired: boolean
    isRedFlag: boolean
    isNegative: boolean
  }>
  redFlags: Array<{
    name: string
    severity: RedFlagSeverity
    message: string
  }>
}

export async function saveDraft(extractionId: string, data: DraftData) {
  try {
    // Upsert the draft syndrome
    const draft = await prisma.draftSyndrome.upsert({
      where: { contentExtractionId: extractionId },
      update: {
        name: data.syndromeName,
        description: data.description,
        data: data,
        updatedAt: new Date(),
      },
      create: {
        contentExtractionId: extractionId,
        name: data.syndromeName,
        description: data.description,
        data: data,
        status: 'DRAFT',
      },
    })

    return { success: true, draftId: draft.id }
  } catch (error) {
    console.error('Error saving draft:', error)
    return { success: false, error: 'Failed to save draft' }
  }
}

export async function publishDraft(draftId: string) {
  try {
    const draft = await prisma.draftSyndrome.findUnique({
      where: { id: draftId },
    })

    if (!draft) throw new Error('Draft not found')

    const draftData = draft.data as DraftData

    // Create the Syndrome
    // Note: This needs to handle unique constraint on 'code'.
    // For now, we'll generate a code from the name.
    const code = draftData.syndromeName.toUpperCase().replace(/\s+/g, '_').slice(0, 20)

    const syndrome = await prisma.syndrome.create({
      data: {
        name: draftData.syndromeName,
        code: code,
        description: draftData.description,
        orderIndex: 99, // Put at end
        checkboxes: {
          create: draftData.questions.map((q, idx: number) => ({
            category: q.category,
            displayText: q.displayText,
            narrativeText: q.narrativeText,
            isRequired: q.isRequired,
            isRedFlag: q.isRedFlag,
            isNegative: q.isNegative,
            orderIndex: idx,
          })),
        },
        redFlagRules: {
          create: draftData.redFlags.map((rf) => ({
            name: rf.name,
            severity: rf.severity,
            message: rf.message,
            conditionJson: {}, // Placeholder logic
          })),
        },
      },
    })

    // Update draft status
    await prisma.draftSyndrome.update({
      where: { id: draftId },
      data: { status: 'PUBLISHED' },
    })

    return { success: true, syndromeId: syndrome.id }
  } catch (error) {
    console.error('Error publishing draft:', error)
    return { success: false, error: 'Failed to publish draft' }
  }
}
