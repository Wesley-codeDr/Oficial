'use client'

import { motion } from 'framer-motion'
import { NarrativePreview } from './narrative-preview'
import { cn } from '@/lib/utils'

interface FormFloatingPreviewProps {
  narrative: string
  redFlagCount: number
  onCopy: () => void
  className?: string
}

export function FormFloatingPreview({
  narrative,
  redFlagCount,
  onCopy,
  className,
}: FormFloatingPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.6,
        duration: 0.3,
        ease: [0.25, 1, 0.5, 1],
      }}
      className={cn(
        'sticky top-8',
        'backdrop-blur-glass',
        'bg-white/40 dark:bg-slate-900/40',
        'border border-white/20',
        'rounded-glass-xl',
        'shadow-glass-light dark:shadow-glass-dark',
        'overflow-hidden',
        className
      )}
    >
      <NarrativePreview
        narrative={narrative}
        redFlagCount={redFlagCount}
        onCopy={onCopy}
        className="h-full min-h-[600px]"
      />
    </motion.div>
  )
}
