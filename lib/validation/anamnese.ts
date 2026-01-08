/**
 * Anamnese validation schemas using Zod.
 * Used for PDF export and related operations.
 */

import { z } from 'zod'

/**
 * Schema for PDF export request validation.
 * Validates the sessionId parameter.
 */
export const ExportPdfRequestSchema = z
  .object({
    sessionId: z.string().cuid('ID de sessão inválido'),
  })
  .strict()

/**
 * TypeScript type inferred from the schema.
 */
export type ExportPdfRequest = z.infer<typeof ExportPdfRequestSchema>

export const AnamnesisPdfDataSchema = z.object({
  id: z.string(),
  userId: z.string(),
  syndromeId: z.string(),
  generatedText: z.string().nullable(),
  redFlagsDetected: z.unknown().nullable(),
  outputMode: z.string(),
  createdAt: z.date(),
  syndrome: z.object({
    name: z.string(),
  }),
  user: z.object({
    email: z.string(),
  }),
})

/**
 * TypeScript type for PDF data.
 */
export type AnamnesisPdfData = z.infer<typeof AnamnesisPdfDataSchema>
