'use client'

import { useRef, useEffect, useState, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Square, Sparkles, Paperclip, Image, FileText, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AttachedFile {
  id: string
  file: File
  type: 'image' | 'pdf'
  preview?: string
}

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (e: React.FormEvent, files?: AttachedFile[]) => void
  onStop?: () => void
  isLoading?: boolean
  disabled?: boolean
  placeholder?: string
  className?: string
  enableAttachments?: boolean
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  onStop,
  isLoading,
  disabled,
  placeholder = 'Pergunte sobre o caso clínico...',
  className,
  enableAttachments = true,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const pdfInputRef = useRef<HTMLInputElement>(null)
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([])
  const [showAttachMenu, setShowAttachMenu] = useState(false)

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`
    }
  }, [value])

  // Focus on mount
  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'pdf') => {
    const files = e.target.files
    if (!files) return

    const newFiles: AttachedFile[] = []
    
    Array.from(files).forEach((file) => {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      
      if (type === 'image') {
        const preview = URL.createObjectURL(file)
        newFiles.push({ id, file, type, preview })
      } else {
        newFiles.push({ id, file, type })
      }
    })

    setAttachedFiles((prev) => [...prev, ...newFiles])
    setShowAttachMenu(false)
    
    // Reset input
    e.target.value = ''
  }

  // Remove attached file
  const removeFile = (id: string) => {
    setAttachedFiles((prev) => {
      const file = prev.find((f) => f.id === id)
      if (file?.preview) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter((f) => f.id !== id)
    })
  }

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      attachedFiles.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview)
      })
    }
  }, [])

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isLoading && (value.trim() || attachedFiles.length > 0)) {
        handleFormSubmit(e as unknown as React.FormEvent)
      }
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(e, attachedFiles.length > 0 ? attachedFiles : undefined)
    // Clear attachments after submit
    attachedFiles.forEach((f) => {
      if (f.preview) URL.revokeObjectURL(f.preview)
    })
    setAttachedFiles([])
  }

  const hasValue = value.trim().length > 0
  const hasContent = hasValue || attachedFiles.length > 0

  return (
    <form onSubmit={handleFormSubmit} className={cn('relative', className)}>
      {/* Hidden file inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFileSelect(e, 'image')}
        className="hidden"
        aria-label="Selecionar imagens"
      />
      <input
        ref={pdfInputRef}
        type="file"
        accept=".pdf,application/pdf"
        multiple
        onChange={(e) => handleFileSelect(e, 'pdf')}
        className="hidden"
        aria-label="Selecionar arquivos PDF"
      />

      {/* Attached Files Preview */}
      <AnimatePresence>
        {attachedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-2 flex flex-wrap gap-2"
          >
            {attachedFiles.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={cn(
                  'relative group flex items-center gap-2 px-3 py-2 rounded-xl',
                  'bg-white/70 dark:bg-white/5',
                  'border border-white/40 dark:border-white/10',
                  'backdrop-blur-xl'
                )}
              >
                {file.type === 'image' && file.preview ? (
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                    <FileText className="h-5 w-5 text-red-500" />
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-medium text-foreground truncate max-w-[120px]">
                    {file.file.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {(file.file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  aria-label={`Remover ${file.file.name}`}
                  className={cn(
                    'absolute -top-1.5 -right-1.5',
                    'flex h-5 w-5 items-center justify-center rounded-full',
                    'bg-red-500 text-white',
                    'opacity-0 group-hover:opacity-100',
                    'transition-opacity duration-200',
                    'hover:bg-red-600'
                  )}
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={cn(
          'relative flex items-end gap-2 rounded-3xl',
          'bg-white/70 dark:bg-white/5',
          'backdrop-blur-xl',
          'border border-white/40 dark:border-white/10',
          'shadow-[0_8px_32px_rgba(0,0,0,0.06)]',
          'transition-all duration-300',
          'focus-within:border-blue-500/40 focus-within:shadow-[0_8px_32px_rgba(10,132,255,0.12)]',
          'p-2'
        )}
        layout
      >
        {/* AI Badge */}
        <div className="absolute -top-3 left-4">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full',
              'bg-gradient-to-r from-blue-500/20 to-cyan-500/20',
              'border border-blue-500/20',
              'text-xs font-medium text-blue-600 dark:text-blue-400'
            )}
          >
            <Sparkles className="h-3 w-3" />
            ChatWell IA
          </motion.div>
        </div>

        {/* Attachment Button */}
        {enableAttachments && (
          <div className="relative pb-1 pl-1">
            <motion.button
              type="button"
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-2xl',
                'text-muted-foreground',
                'hover:bg-slate-100 dark:hover:bg-white/10',
                'transition-colors duration-200',
                showAttachMenu && 'bg-slate-100 dark:bg-white/10'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Paperclip className="h-5 w-5" />
              <span className="sr-only">Anexar arquivo</span>
            </motion.button>

            {/* Attachment Menu */}
            <AnimatePresence>
              {showAttachMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={cn(
                    'absolute bottom-full left-0 mb-2',
                    'flex flex-col gap-1 p-2 rounded-2xl',
                    'bg-white/90 dark:bg-slate-800/90',
                    'backdrop-blur-xl',
                    'border border-white/40 dark:border-white/10',
                    'shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
                    'min-w-[160px]'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl',
                      'text-sm font-medium text-foreground',
                      'hover:bg-slate-100 dark:hover:bg-white/10',
                      'transition-colors duration-150'
                    )}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                      <Image className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span>Foto</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => pdfInputRef.current?.click()}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl',
                      'text-sm font-medium text-foreground',
                      'hover:bg-slate-100 dark:hover:bg-white/10',
                      'transition-colors duration-150'
                    )}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                      <FileText className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                    <span>PDF</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          rows={1}
          className={cn(
            'flex-1 resize-none bg-transparent',
            'px-4 py-3 pt-4',
            'text-sm leading-relaxed',
            'outline-none',
            'placeholder:text-muted-foreground/60',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'text-foreground'
          )}
          style={{ maxHeight: '160px' }}
        />

        {/* Action Buttons */}
        <div className="flex shrink-0 items-center gap-1 pb-1 pr-1">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.button
                key="stop"
                type="button"
                onClick={onStop}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-2xl',
                  'bg-red-500/10 text-red-500',
                  'hover:bg-red-500/20',
                  'transition-colors duration-200'
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Square className="h-4 w-4" />
                <span className="sr-only">Parar</span>
              </motion.button>
            ) : (
              <motion.button
                key="send"
                type="submit"
                disabled={!hasContent || disabled}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-2xl',
                  'transition-all duration-300',
                  hasContent
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-[0_4px_16px_rgba(10,132,255,0.3)]'
                    : 'bg-slate-100 dark:bg-white/10 text-muted-foreground',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={hasContent ? { scale: 1.05 } : {}}
                whileTap={hasContent ? { scale: 0.95 } : {}}
              >
                <Send className={cn('h-4 w-4', hasContent && '-rotate-45')} />
                <span className="sr-only">Enviar</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Helper text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-2 text-center text-xs text-muted-foreground/60"
      >
        <kbd className="px-1.5 py-0.5 rounded bg-muted/50 text-[10px] font-mono">Enter</kbd>
        {' '}para enviar{' '}•{' '}
        <kbd className="px-1.5 py-0.5 rounded bg-muted/50 text-[10px] font-mono">Shift+Enter</kbd>
        {' '}para nova linha
      </motion.p>
    </form>
  )
}
