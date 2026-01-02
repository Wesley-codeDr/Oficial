'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, AlertTriangle, FileText, Maximize2, Minimize2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NarrativePreviewProps {
  narrative: string
  redFlagCount: number
  onCopy: () => void
  className?: string
}

export function NarrativePreview({
  narrative,
  redFlagCount,
  onCopy,
  className,
}: NarrativePreviewProps) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleCopy = async () => {
    if (!narrative) return

    try {
      const clipboard = (globalThis as { navigator?: Navigator }).navigator?.clipboard
      if (!clipboard?.writeText) return

      await clipboard.writeText(narrative)
      setCopied(true)
      onCopy()
      globalThis.setTimeout?.(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const isEmpty = !narrative || narrative.trim().length === 0

  return (
    <>
      <div
        className={cn(
          'flex flex-col transition-all duration-700 ease-[0.22,1,0.36,1]',
          'liquid-glass-material rounded-[40px] border border-white/40 dark:border-white/10 shadow-2xl overflow-hidden',
          expanded ? 'fixed inset-8 z-50' : 'relative',
          className
        )}
      >
        {/* Header Section */}
        <div className="px-8 py-6 border-b border-white/20 dark:border-white/10 flex items-center justify-between bg-white/10 dark:bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-500">
               <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white leading-tight">Narrativa Gerada</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <Sparkles className="h-3 w-3 text-blue-500" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Motor de IA v2.5</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={handleCopy}
              disabled={isEmpty}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300',
                copied 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                  : 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:grayscale'
              )}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span key="copied" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5" /> Copiado!
                  </motion.span>
                ) : (
                  <motion.span key="copy" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
                    <Copy className="h-3.5 w-3.5" /> Copiar
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Alerts Section - Conditional */}
        <AnimatePresence>
          {redFlagCount > 0 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="px-8 py-3 bg-rose-500/10 border-b border-rose-500/20 flex items-center gap-3 overflow-hidden"
            >
              <AlertTriangle className="h-4 w-4 text-rose-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.1em] text-rose-600 dark:text-rose-400">
                Atenção: {redFlagCount} Red Flag{redFlagCount > 1 ? 's' : ''} detectada{redFlagCount > 1 ? 's' : ''}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <div
          className={cn(
            'flex-1 overflow-auto p-8 custom-scrollbar',
            expanded ? 'max-h-full' : 'max-h-[500px]'
          )}
        >
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-48 opacity-40 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-400 flex items-center justify-center">
                 <FileText className="h-6 w-6 text-slate-400" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Aguardando seleção de sintomas...
              </p>
            </div>
          ) : (
            <motion.div
              key={narrative}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8 }}
              className="prose prose-sm dark:prose-invert max-w-none"
            >
              <p className="whitespace-pre-wrap text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                {narrative}
              </p>
            </motion.div>
          )}
        </div>

        {/* Footer Statistics */}
        {!isEmpty && (
          <div className="px-8 py-4 bg-white/5 border-t border-white/20 dark:border-white/10 flex justify-between items-center">
            <div className="flex gap-4">
               <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Palavras</span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{narrative.split(/\s+/).length}</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Caracteres</span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{narrative.length}</span>
               </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[8px] font-black uppercase tracking-widest text-blue-500">
               EBM-Sync Active
            </div>
          </div>
        )}
      </div>

      {/* Expanded Mode Overlay */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xl"
            onClick={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
