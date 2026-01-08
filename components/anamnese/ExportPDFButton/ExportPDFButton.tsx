'use client'

import { FileDown, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useExportPdf } from './useExportPdf'
import { useToast } from '@/hooks/use-toast'

interface ExportPDFButtonProps {
  sessionId: string
  disabled?: boolean
  className?: string
}

export function ExportPDFButton({ sessionId, disabled = false, className }: ExportPDFButtonProps) {
  const { mutate: exportPdf, isPending } = useExportPdf()
  const { toast } = useToast()

  const handleExport = () => {
    exportPdf(
      { sessionId },
      {
        onSuccess: () => {
          toast({
            title: 'PDF exportado',
            description: 'O arquivo foi baixado com sucesso.',
          })
        },
        onError: (error: Error) => {
          toast({
            variant: 'destructive',
            title: 'Erro ao exportar',
            description: error.message || 'Não foi possível gerar o PDF.',
          })
        },
      }
    )
  }

  return (
    <Button
      onClick={handleExport}
      disabled={disabled || isPending}
      variant="outline"
      size="default"
      className={className}
      aria-label="Exportar anamnese como PDF"
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Gerando PDF...
        </>
      ) : (
        <>
          <FileDown className="mr-2 h-4 w-4" />
          Exportar PDF
        </>
      )}
    </Button>
  )
}
