'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Copy,
  Check,
  AlertTriangle,
  FileText,
  ChevronUp,
  ChevronDown,
  List,
  MessageSquare,
  Save,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { OutputMode } from '@/lib/anamnese/generate-narrative'

interface CollapsiblePreviewProps {
  narrative: string
  redFlagCount: number
  outputMode: OutputMode
  onOutputModeChange: (mode: OutputMode) => void
  onCopy: () => void
  onOpenChat: () => void
  onSave: () => void
  isSaving: boolean
  canSave: boolean
  canOpenChat: boolean
  className?: string
}

export function CollapsiblePreview({
  narrative,
  redFlagCount,
  outputMode,
  onOutputModeChange,
  onCopy,
  onOpenChat,
  onSave,
  isSaving,
  canSave,
  canOpenChat,
  className,
}: CollapsiblePreviewProps) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!narrative) return

    try {
      await navigator.clipboard.writeText(narrative)
      setCopied(true)
      onCopy()
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const isEmpty = !narrative || narrative.trim().length === 0
  const wordCount = isEmpty ? 0 : narrative.split(/\s+/).length
  const charCount = isEmpty ? 0 : narrative.length

  return (
    <>
      {/* Backdrop for expanded mode */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <motion.div
        layout
        className={cn(
          'relative z-50 flex flex-col',
          'bg-white/90 dark:bg-[#1c1c1e]/90 backdrop-blur-xl',
          'border-t border-white/60 dark:border-white/10',
          'shadow-[0_-8px_30px_rgba(0,0,0,0.08)]',
          'rounded-t-[24px]',
          'transition-all duration-300 ease-out',
          expanded ? 'h-[50vh]' : 'h-[120px]',
          className
        )}
      >
        {/* Drag Handle & Header */}
        <div
          className="flex items-center justify-between px-5 py-3 cursor-pointer select-none"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center gap-3">
            {/* Drag indicator */}
            <div className="w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />

            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Texto Gerado
              </span>
              {!isEmpty && (
                <span className="text-xs text-slate-400">
                  {wordCount} palavras
                </span>
              )}
            </div>

            {redFlagCount > 0 && (
              <span className="flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-600 animate-pulse">
                <AlertTriangle className="h-3 w-3" />
                {redFlagCount} alerta{redFlagCount > 1 ? 's' : ''}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Toggle */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onOutputModeChange('SUMMARY')
                }}
                className={cn(
                  'px-2.5 py-1 rounded-md text-[11px] font-medium transition-all',
                  outputMode === 'SUMMARY'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                )}
              >
                <List className="w-3 h-3 inline mr-1" />
                Resumido
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onOutputModeChange('DETAILED')
                }}
                className={cn(
                  'px-2.5 py-1 rounded-md text-[11px] font-medium transition-all',
                  outputMode === 'DETAILED'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                )}
              >
                <FileText className="w-3 h-3 inline mr-1" />
                Detalhado
              </button>
            </div>

            {/* Expand/Collapse */}
            <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {expanded ? (
                <ChevronDown className="h-4 w-4 text-slate-500" />
              ) : (
                <ChevronUp className="h-4 w-4 text-slate-500" />
              )}
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className={cn(
          'flex-1 overflow-hidden px-5',
          expanded ? 'pb-20' : 'pb-4'
        )}>
          {isEmpty ? (
            <div className="h-full flex items-center justify-center text-slate-400 text-sm">
              Selecione itens para gerar o texto da anamnese
            </div>
          ) : (
            <motion.div
              key={narrative}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                'h-full overflow-y-auto custom-scrollbar',
                expanded ? '' : 'line-clamp-2'
              )}
            >
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {narrative}
              </p>
            </motion.div>
          )}
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-gradient-to-t from-white dark:from-[#1c1c1e] via-white/95 dark:via-[#1c1c1e]/95 to-transparent">
          <div className="flex items-center justify-between gap-3">
            {/* Stats */}
            <div className="text-xs text-slate-400">
              {!isEmpty && (
                <span>{charCount} caracteres</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Copy Button */}
              <Button
                variant={copied ? 'default' : 'outline'}
                size="sm"
                onClick={handleCopy}
                disabled={isEmpty}
                className={cn(
                  'h-9 px-4 rounded-xl transition-all',
                  copied && 'bg-green-600 hover:bg-green-600 text-white border-green-600'
                )}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-1.5"
                    >
                      <Check className="h-4 w-4" />
                      Copiado
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-1.5"
                    >
                      <Copy className="h-4 w-4" />
                      Copiar
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>

              {/* Save Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={onSave}
                disabled={!canSave || isSaving}
                className="h-9 px-4 rounded-xl"
              >
                <Save className="h-4 w-4 mr-1.5" />
                {isSaving ? 'Salvando...' : 'Salvar'}
              </Button>

              {/* ChatWell Button */}
              <Button
                size="sm"
                onClick={onOpenChat}
                disabled={!canOpenChat}
                className="h-9 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white border-0"
              >
                <MessageSquare className="h-4 w-4 mr-1.5" />
                ChatWell
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
