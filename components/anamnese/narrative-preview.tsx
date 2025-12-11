'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, AlertTriangle, FileText, Maximize2, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
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
      await navigator.clipboard.writeText(narrative)
      setCopied(true)
      onCopy()
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const isEmpty = !narrative || narrative.trim().length === 0

  return (
    <GlassCard
      hover={false}
      className={cn(
        'flex flex-col transition-all duration-300',
        expanded ? 'fixed inset-4 z-50' : 'relative',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Texto Gerado</h3>
          {redFlagCount > 0 && (
            <span className="flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
              <AlertTriangle className="h-3 w-3" />
              {redFlagCount} alerta{redFlagCount > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant={copied ? 'default' : 'outline'}
            size="sm"
            onClick={handleCopy}
            disabled={isEmpty}
            className={cn(copied && 'bg-green-600 hover:bg-green-600')}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1"
                >
                  <Check className="h-4 w-4" />
                  Copiado!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copiar
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          'flex-1 overflow-auto pt-4',
          expanded ? 'max-h-full' : 'max-h-[300px]'
        )}
      >
        {isEmpty ? (
          <div className="flex h-32 items-center justify-center text-muted-foreground">
            <p className="text-center text-sm">
              Selecione os itens ao lado para gerar o texto da anamnese.
            </p>
          </div>
        ) : (
          <motion.div
            key={narrative}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="prose prose-sm dark:prose-invert max-w-none"
          >
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              {narrative}
            </p>
          </motion.div>
        )}
      </div>

      {/* Word count */}
      {!isEmpty && (
        <div className="border-t pt-3 text-xs text-muted-foreground">
          {narrative.split(/\s+/).length} palavras | {narrative.length} caracteres
        </div>
      )}

      {/* Backdrop for expanded mode */}
      {expanded && (
        <div
          className="fixed inset-0 -z-10 bg-background/80 backdrop-blur-sm"
          onClick={() => setExpanded(false)}
        />
      )}
    </GlassCard>
  )
}
