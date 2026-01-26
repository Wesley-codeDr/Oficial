'use client'

import { useMutation } from '@tanstack/react-query'
import { pdfLogger } from '@/lib/logging'

interface ExportPdfParams {
  sessionId: string
}

interface ExportPdfError {
  error: string
  details?: unknown
}

/**
 * Export anamnese session to PDF
 *
 * @param sessionId - The session ID to export
 * @throws Error if export fails
 * @example
 * try {
 *   await exportPdf({ sessionId: 'abc-123' })
 * } catch (error) {
 *   console.error('Failed to export PDF:', error)
 * }
 */
async function exportPdf({ sessionId }: ExportPdfParams): Promise<void> {
  try {
    const response = await fetch('/api/anamnese/export-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    })

    if (!response.ok) {
      const errorData: ExportPdfError = await response.json()
      throw new Error(errorData.error || 'Falha ao exportar PDF')
    }

    const blob = await response.blob()

    // Validate blob before creating URL
    if (!blob || blob.size === 0) {
      throw new Error('Falha ao gerar PDF: arquivo vazio ou inválido')
    }

    const contentDisposition = response.headers.get('Content-Disposition')
    const filenameMatch = contentDisposition?.match(/filename="(.+)"/)
    const filename = filenameMatch?.[1] || 'anamnese.pdf'

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    pdfLogger.info('PDF exportado com sucesso', {
      sessionId,
      filename,
      blobSize: blob.size,
    })
  } catch (error) {
    pdfLogger.error('Erro ao exportar PDF', error, {
      sessionId,
    })

    // Re-throw error for caller to handle
    throw error
  }
}

/**
 * Hook for exporting PDF
 *
 * @returns React Query mutation hook
 * @example
 * function MyComponent() {
 *   const exportMutation = useExportPdf()
 *
 *   return (
 *     <button onClick={() => exportMutation.mutate({ sessionId: 'abc-123' })}>
 *       Exportar PDF
 *     </button>
 *   )
 * }
 */
export function useExportPdf() {
  return useMutation({
    mutationKey: ['export-pdf'],
    mutationFn: exportPdf,
  })
}
