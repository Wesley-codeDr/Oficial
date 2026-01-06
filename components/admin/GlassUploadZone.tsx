'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, CheckCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { uploadDocument } from '@/app/actions/import-actions'
import { useRouter } from 'next/navigation'

type ExtractionMode = 'syndrome' | 'guideline'

export function GlassUploadZone() {
  const [mode, setMode] = useState<ExtractionMode>('syndrome')
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const fileInputRef = useRef<globalThis.HTMLInputElement>(null)
  const router = useRouter()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = async (file: globalThis.File) => {
    if (file.type !== 'application/pdf' && file.type !== 'text/plain') {
      setErrorMessage('Apenas arquivos PDF ou TXT são permitidos.')
      setUploadStatus('error')
      return
    }

    setIsUploading(true)
    setUploadStatus('idle')
    setErrorMessage(null)

    const formData = new globalThis.FormData()
    formData.append('file', file)

    const result = await uploadDocument(formData, mode)

    setIsUploading(false)

    if (result.success) {
      setUploadStatus('success')
      // Refresh to show new list
      router.refresh()
    } else {
      setUploadStatus('error')
    }
  }

  return (
    <div className="space-y-4">
      {/* Mode Selector */}
      <div className="flex gap-3 rounded-2xl glass-pill p-2">
        <button
          onClick={() => setMode('syndrome')}
          className={cn(
            'flex-1 rounded-xl px-6 py-3 text-sm font-medium transition-all duration-200',
            mode === 'syndrome'
              ? 'glass-pill bg-blue-500/90 text-white shadow-lg shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-white/20 dark:hover:bg-white/10'
          )}
        >
          <div className="flex flex-col items-center gap-1">
            <span>Syndrome Extraction</span>
            <span className="text-xs opacity-70">Standard medical protocol</span>
          </div>
        </button>
        <button
          onClick={() => setMode('guideline')}
          className={cn(
            'flex-1 rounded-xl px-6 py-3 text-sm font-medium transition-all duration-200',
            mode === 'guideline'
              ? 'btn-primary-glass text-white shadow-lg'
              : 'text-slate-600 dark:text-slate-400 hover:bg-white/20 dark:hover:bg-white/10'
          )}
        >
          <div className="flex flex-col items-center gap-1">
            <span>Brazilian Guideline (Flash + Anamnese)</span>
            <span className="text-xs opacity-70">Dual template generation</span>
          </div>
        </button>
      </div>

      {/* Upload Zone */}
      <motion.div
        className={cn(
          'relative overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-300',
          'glass-molded rim-light-ios26 inner-glow-ios26',
          isDragging
            ? 'border-blue-500 bg-blue-500/10 scale-[1.02] ring-2 ring-blue-500/20'
            : 'border-white/40 dark:border-white/20 hover:border-white/60'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.txt"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      <div className="flex flex-col items-center justify-center p-12 text-center">
        <AnimatePresence mode="wait">
          {isUploading ? (
            <motion.div
              key="uploading"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-blue-500/20 blur-xl" />
                <Loader2 className="h-16 w-16 animate-spin text-primary-blue" />
              </div>
              <p className="text-lg font-medium text-slate-700">Processando documento...</p>
              <p className="text-sm text-slate-500">Extraindo texto e analisando com IA</p>
            </motion.div>
          ) : uploadStatus === 'success' ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="rounded-full glass-pill bg-green-500/20 p-4">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-lg font-medium text-slate-700 dark:text-slate-200">Upload concluído!</p>
              <button
                onClick={() => setUploadStatus('idle')}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                Enviar outro arquivo
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="rounded-2xl glass-pill rim-light-ios26 p-6">
                <Upload className="h-12 w-12 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                  {mode === 'guideline'
                    ? 'Arraste sua diretriz médica brasileira aqui'
                    : 'Arraste seu documento aqui'}
                </h3>
                <p className="mt-2 text-slate-500 dark:text-slate-400">
                  {mode === 'guideline'
                    ? 'SBC, SBPT, AMB, Ministério da Saúde (PDF ou TXT)'
                    : 'Suporta PDF e TXT (Protocolos, Diretrizes, Artigos)'}
                </p>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary-glass text-white px-8 py-3 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-105 transition-all"
              >
                <FileText className="h-4 w-4" />
                Selecionar Arquivo
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mode Info Badge */}
        {mode === 'guideline' && uploadStatus === 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl glass-pill px-4 py-3 text-xs text-slate-600 dark:text-slate-400"
          >
            <strong>Guideline Mode:</strong> Generates Flash template (2-3 min) + Anamnese Well checkboxes (30-50 items) from Brazilian medical guidelines.
          </motion.div>
        )}
      </div>
    </motion.div>
    </div>
  )
}
