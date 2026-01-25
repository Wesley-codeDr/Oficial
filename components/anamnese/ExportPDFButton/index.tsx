'use client'

import { useMutation } from '@tanstack/react-query'
import { useTheme } from 'next-themes'

interface ExportPdfParams {
  sessionId: string
}

interface ExportPdfError {
  error: string
  details?: unknown
}

async function exportPdf({ sessionId }: ExportPdfParams): Promise<void> {
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
}

export function useExportPdf() {
  return useMutation({
    mutationKey: ['export-pdf'],
    mutationFn: exportPdf,
  })
}
