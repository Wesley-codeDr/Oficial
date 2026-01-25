'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, AlertTriangle, FileText, Maximize2, Minimize2, Sparkles } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { EmptyStateIllustration } from '@/components/ui/empty-state-illustration'
import * as Tokens from '@/lib/theme/tokens'
import {
  useGlassBlur,
  useGlassOpacity,
  useGlassBorder,
  useGlassShadow,
  useGlassRadius,
  useGlassNoise,
  useGlassSpecular,
  useGlassRimLight,
  useGlassHoverScale,
  useGlassTapScale,
} from '@/lib/theme/hooks'

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
  const { theme, systemTheme } = useTheme()
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')

  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  // Get theme classes
  const glassBlur = useGlassBlur()
  const glassOpacity = useGlassOpacity('default', isDark)
  const glassBorder = useGlassBorder(isDark)
  const glassShadow = useGlassShadow('default', isDark)
  const glassRadius = useGlassRadius('LG')
  const glassNoise = useGlassNoise()
  const glassSpecular = useGlassSpecular()
  const glassRimLight = useGlassRimLight()
  const glassHoverScale = useGlassHoverScale()
  const glassTapScale = useGlassTapScale()

  const handleCopy = async () => {
    if (!narrative) return

    try {
      const clipboard = globalThis?.navigator?.clipboard
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
          glassBlur,
          glassOpacity,
          glassBorder,
          glassShadow,
          glassRadius,
          glassNoise,
          glassSpecular,
          glassRimLight,
          expanded ? 'fixed inset-8 z-50' : 'relative',
          className
        )}
      >
        {/* Header Section */}
        <div className={cn(
          'px-8 py-6 border-b flex items-center justify-between',
          glassBlur,
          glassOpacity,
          glassBorder.replace('border-', 'border-b-'),
          glassNoise,
          glassSpecular,
          'bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 dark:border-white/10'
        )}>
          <div className="flex items-center gap-4">
            <div className={cn(
              'w-10 h-10 rounded-2xl flex items-center justify-center',
              glassBlur,
              glassOpacity,
              glassBorder,
              glassRadius,
              glassNoise,
              glassSpecular,
              'bg-blue-500/20 border-blue-500/30 text-blue-500'
            )}>
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
              className={cn(
                'p-2.5 rounded-xl transition-all text-slate-400 hover:text-slate-600 dark:hover:text-slate-200',
                glassBlur,
                glassOpacity,
                glassBorder,
                glassRadius,
                glassNoise,
                glassSpecular,
                glassHoverScale,
                glassTapScale,
                'bg-white/10 border-white/20 hover:bg-white/20'
              )}
            >
              {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={handleCopy}
              disabled={isEmpty}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300',
                copied 
                  ? cn('bg-emerald-500 text-white', useGlassShadow('success', isDark))
                  : cn('bg-blue-600 text-white hover:scale-105 active:scale-95 disabled:opacity-50 disabled:grayscale', useGlassShadow('primary', isDark))
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
              className={cn(
                'px-8 py-3 border-b flex items-center gap-3 overflow-hidden',
                glassBlur,
                glassOpacity,
                glassBorder.replace('border-', 'border-b-'),
                glassNoise,
                glassSpecular,
                'bg-rose-500/10 border-rose-500/20'
              )}
            >
              <AlertTriangle className="h-4 w-4 text-rose-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">
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
            <motion.div
              className="flex flex-col items-center justify-center h-48 text-center space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-full scale-125" />
                <EmptyStateIllustration variant="personal-productivity" size="sm" />
              </div>
              <motion.p
                className="text-xs font-bold uppercase tracking-widest text-slate-500"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Aguardando seleção de sintomas...
              </motion.p>
            </motion.div>
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
          <div className={cn(
            'px-8 py-4 border-t flex justify-between items-center',
            glassBlur,
            glassOpacity,
            glassBorder.replace('border-', 'border-t-'),
            glassNoise,
            glassSpecular,
            'bg-white/5 border-white/20 dark:border-white/10'
          )}>
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
            <div className={cn(
              'px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest',
              glassBlur,
              glassOpacity,
              glassBorder,
              glassRadius,
              glassNoise,
              glassSpecular,
              'bg-blue-500/10 border-blue-500/20 text-blue-500'
            )}>
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
