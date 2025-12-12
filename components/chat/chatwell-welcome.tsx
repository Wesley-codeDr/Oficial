'use client'

import { motion, type Variants } from 'framer-motion'
import { Stethoscope, Brain, FileText, Activity, type LucideIcon } from 'lucide-react'
import { ChatWellAvatar } from './chatwell-avatar'
import { cn } from '@/lib/utils'
import { WELCOME_PROMPTS, type WelcomePromptId } from '@/lib/ai/prompts'

interface ChatWellWelcomeProps {
  onSuggestionClick?: (suggestion: string) => void
  className?: string
}

// Map WELCOME_PROMPTS IDs to icons - keeps UI metadata separate from canonical prompts
const promptIconMap: Record<WelcomePromptId, LucideIcon> = {
  differential: Stethoscope,
  treatment: Brain,
  exams: FileText,
  redflags: Activity,
}

// Derive quickSuggestions from WELCOME_PROMPTS (canonical source)
const quickSuggestions = WELCOME_PROMPTS.map((item) => ({
  icon: promptIconMap[item.id],
  label: item.label,
  prompt: item.prompt,
}))

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 30,
    },
  },
}

export function ChatWellWelcome({ onSuggestionClick, className }: ChatWellWelcomeProps) {
  return (
    <motion.div
      className={cn('flex flex-col items-center justify-center py-12 sm:py-16', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Avatar - Minimal */}
      <motion.div variants={itemVariants} className="mb-5">
        <ChatWellAvatar size="lg" isAnimating />
      </motion.div>

      {/* Title - Clean */}
      <motion.h2 
        variants={itemVariants} 
        className="text-[22px] font-semibold tracking-tight text-foreground mb-1"
      >
        Como posso ajudar?
      </motion.h2>

      {/* Subtitle - Subtle */}
      <motion.p
        variants={itemVariants}
        className="text-[15px] text-muted-foreground/70 mb-10"
      >
        Suporte clínico baseado em evidências
      </motion.p>

      {/* Quick Suggestions - Apple 2025 Grid */}
      <motion.div variants={itemVariants} className="w-full max-w-md px-5">
        <div className="grid grid-cols-2 gap-2.5">
          {quickSuggestions.map((suggestion, index) => {
            const Icon = suggestion.icon

            return (
              <motion.button
                key={index}
                className={cn(
                  'group flex flex-col items-start gap-2 p-4 rounded-2xl text-left',
                  'bg-white/70 dark:bg-white/[0.04]',
                  'border border-black/[0.04] dark:border-white/[0.06]',
                  'transition-all duration-200 ease-out',
                  'hover:bg-white dark:hover:bg-white/[0.07]',
                  'hover:border-black/[0.08] dark:hover:border-white/[0.10]',
                  'hover:shadow-sm',
                  'active:scale-[0.98]'
                )}
                onClick={() => onSuggestionClick?.(suggestion.prompt)}
                whileTap={{ scale: 0.98 }}
              >
                <Icon 
                  className="h-5 w-5 text-muted-foreground/50 group-hover:text-foreground/70 transition-colors" 
                  strokeWidth={1.5}
                />
                <span className="text-[13px] font-medium text-foreground/80 leading-snug">
                  {suggestion.label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Disclaimer - Whisper quiet, Apple style */}
      <motion.p
        variants={itemVariants}
        className="mt-10 text-[11px] text-muted-foreground/40 text-center max-w-xs leading-relaxed"
      >
        Suporte à decisão clínica · Não substitui avaliação médica
      </motion.p>
    </motion.div>
  )
}
