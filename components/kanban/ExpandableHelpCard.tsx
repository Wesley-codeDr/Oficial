'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  X,
  Keyboard,
  MousePointer2,
  Zap,
  HelpCircle,
  Lightbulb,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { applePhysics } from '@/lib/design-system/animation-tokens'

export interface HelpTip {
  id: string
  icon: React.ElementType
  title: string
  description: string
  category: 'keyboard' | 'drag-drop' | 'integration' | 'general'
}

interface ExpandableHelpCardProps {
  tips: HelpTip[]
  storageKey: string
  className?: string
  compact?: boolean
}

const CATEGORY_COLORS: Record<HelpTip['category'], string> = {
  keyboard: 'from-blue-500/20 to-cyan-500/10 border-blue-300/30',
  'drag-drop': 'from-purple-500/20 to-pink-500/10 border-purple-300/30',
  integration: 'from-amber-500/20 to-orange-500/10 border-amber-300/30',
  general: 'from-slate-500/20 to-slate-500/10 border-slate-300/30',
}

const CATEGORY_ICONS: Record<HelpTip['category'], React.ElementType> = {
  keyboard: Keyboard,
  'drag-drop': MousePointer2,
  integration: Zap,
  general: Lightbulb,
}

export function ExpandableHelpCard({
  tips,
  storageKey,
  className,
  compact = false,
}: ExpandableHelpCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [expandedTipId, setExpandedTipId] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load dismissed state from localStorage
  useEffect(() => {
    const dismissed = localStorage.getItem(`help-dismissed-${storageKey}`)
    if (dismissed === 'true') {
      setIsDismissed(true)
    }
    setIsHydrated(true)
  }, [storageKey])

  // Save dismissed state to localStorage
  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem(`help-dismissed-${storageKey}`, 'true')
  }

  // Recall help cards
  const handleRecall = () => {
    setIsDismissed(false)
    localStorage.removeItem(`help-dismissed-${storageKey}`)
  }

  // Don't render until hydrated to avoid hydration mismatch
  if (!isHydrated) {
    return null
  }

  // Show help icon if dismissed
  if (isDismissed) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleRecall}
        className={cn(
          'flex items-center justify-center p-2 rounded-lg',
          'bg-white/20 dark:bg-white/5',
          'border border-white/30 dark:border-white/10',
          'hover:bg-white/30 dark:hover:bg-white/10',
          'transition-colors cursor-pointer',
          className
        )}
        aria-label="Mostrar dicas de ajuda"
        data-testid="help-recall-button"
      >
        <HelpCircle className="h-4 w-4 text-slate-400 dark:text-slate-500" />
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={applePhysics.glass}
      className={cn(
        'w-full rounded-xl overflow-hidden',
        'bg-gradient-to-br',
        'bg-white/15 dark:bg-white/5',
        'border border-white/25 dark:border-white/10',
        'backdrop-blur-sm',
        className
      )}
      data-testid="expandable-help-card"
    >
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'w-full flex items-center justify-between p-3',
          'hover:bg-white/10 dark:hover:bg-white/5',
          'transition-colors cursor-pointer'
        )}
        aria-expanded={isExpanded}
        data-testid="help-card-toggle"
      >
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'p-1.5 rounded-lg',
              'bg-gradient-to-br from-blue-500/20 to-purple-500/20',
              'border border-white/20'
            )}
          >
            <Lightbulb className="h-3 w-3 text-slate-500 dark:text-slate-400" />
          </div>
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
            {compact ? 'Dicas' : 'Dicas e atalhos'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              handleDismiss()
            }}
            className="p-1 rounded-md hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
            aria-label="Dispensar dicas"
            data-testid="help-dismiss-button"
          >
            <X className="h-3 w-3 text-slate-400 dark:text-slate-500" />
          </motion.button>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={applePhysics.haptic}
          >
            <ChevronDown className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </motion.div>
        </div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={applePhysics.soft}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-2">
              {tips.map((tip, index) => {
                const TipIcon = tip.icon
                const CategoryIcon = CATEGORY_ICONS[tip.category]
                const isThisTipExpanded = expandedTipId === tip.id

                return (
                  <motion.button
                    key={tip.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...applePhysics.soft, delay: index * 0.05 }}
                    onClick={() =>
                      setExpandedTipId(isThisTipExpanded ? null : tip.id)
                    }
                    className={cn(
                      'w-full text-left p-2 rounded-lg',
                      'bg-gradient-to-r',
                      CATEGORY_COLORS[tip.category],
                      'border',
                      'hover:scale-[1.02] active:scale-[0.98]',
                      'transition-transform cursor-pointer'
                    )}
                    data-testid={`help-tip-${tip.id}`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <TipIcon className="h-3 w-3 text-slate-500 dark:text-slate-400" />
                        <CategoryIcon className="h-2.5 w-2.5 text-slate-400 dark:text-slate-500 opacity-60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-medium text-slate-600 dark:text-slate-300 leading-tight">
                          {tip.title}
                        </p>
                        <AnimatePresence>
                          {isThisTipExpanded && (
                            <motion.p
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={applePhysics.haptic}
                              className="text-[9px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed"
                            >
                              {tip.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <motion.div
                        animate={{ rotate: isThisTipExpanded ? 180 : 0 }}
                        transition={applePhysics.haptic}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="h-3 w-3 text-slate-400 dark:text-slate-500" />
                      </motion.div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
