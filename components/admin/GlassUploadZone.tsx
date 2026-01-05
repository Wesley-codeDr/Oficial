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
      <div className="flex gap-3 rounded-2xl bg-white/10 p-2 backdrop-blur-md">
        <button
          onClick={() => setMode('syndrome')}
          className={cn(
            'flex-1 rounded-xl px-6 py-3 text-sm font-medium transition-all duration-200',
            mode === 'syndrome'
              ? 'bg-white text-slate-800 shadow-lg'
              : 'text-slate-600 hover:bg-white/20 hover:text-slate-700'
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
              ? 'bg-gradient-to-r from-primary-blue to-blue-600 text-white shadow-lg'
              : 'text-slate-600 hover:bg-white/20 hover:text-slate-700'
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
          isDragging
            ? 'border-primary-blue bg-blue-50/10 scale-[1.02]'
            : 'border-white/40 hover:border-white/60 bg-white/5',
          'backdrop-blur-md'
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
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <p className="text-lg font-medium text-slate-700">Upload concluído!</p>
              <button
                onClick={() => setUploadStatus('idle')}
                className="text-sm font-medium text-primary-blue hover:underline"
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
              <div className="rounded-2xl bg-white/10 p-6 shadow-glass">
                <Upload className="h-12 w-12 text-slate-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">
                  {mode === 'guideline'
                    ? 'Arraste sua diretriz médica brasileira aqui'
                    : 'Arraste seu documento aqui'}
                </h3>
                <p className="mt-2 text-slate-500">
                  {mode === 'guideline'
                    ? 'SBC, SBPT, AMB, Ministério da Saúde (PDF ou TXT)'
                    : 'Suporta PDF e TXT (Protocolos, Diretrizes, Artigos)'}
                </p>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="glass-btn-small glass-btn-small-primary px-8 py-3"
              >
                <FileText className="mr-2 h-4 w-4" />
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
            className="mt-4 rounded-xl bg-blue-50/50 px-4 py-3 text-xs text-slate-600 backdrop-blur-sm"
          >
            <strong>Guideline Mode:</strong> Generates Flash template (2-3 min) + Anamnese Well checkboxes (30-50 items) from Brazilian medical guidelines.
          </motion.div>
        )}
      </div>
    </motion.div>
    </div>
  )
}
