'use client'

import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { 
  Lightbulb, 
  ArrowRight, 
  FileSearch, 
  Pill, 
  AlertTriangle,
  Stethoscope,
  Settings,
  HelpCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type SuggestionType = 
  | 'diagnostic' 
  | 'treatment' 
  | 'exam' 
  | 'alert' 
  | 'context' 
  | 'settings'
  | 'follow-up'

interface Suggestion {
  id: string
  type: SuggestionType
  text: string
  prompt: string
}

interface SmartSuggestionsProps {
  suggestions: Suggestion[]
  onSuggestionClick: (prompt: string) => void
  isVisible?: boolean
  className?: string
}

const typeConfig: Record<SuggestionType, { 
  icon: typeof Lightbulb
  color: string
  bgColor: string
  borderColor: string
}> = {
  diagnostic: {
    icon: Stethoscope,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20 hover:border-blue-500/40',
  },
  treatment: {
    icon: Pill,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20 hover:border-emerald-500/40',
  },
  exam: {
    icon: FileSearch,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20 hover:border-purple-500/40',
  },
  alert: {
    icon: AlertTriangle,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20 hover:border-orange-500/40',
  },
  context: {
    icon: Settings,
    color: 'text-slate-600 dark:text-slate-400',
    bgColor: 'bg-slate-500/10',
    borderColor: 'border-slate-500/20 hover:border-slate-500/40',
  },
  settings: {
    icon: Settings,
    color: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20 hover:border-cyan-500/40',
  },
  'follow-up': {
    icon: HelpCircle,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20 hover:border-indigo-500/40',
  },
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    x: -10,
    scale: 0.95,
  },
}

export function SmartSuggestions({
  suggestions,
  onSuggestionClick,
  isVisible = true,
  className,
}: SmartSuggestionsProps) {
  if (suggestions.length === 0) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn('space-y-2', className)}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lightbulb className="h-3.5 w-3.5" />
            <span>Sugestões inteligentes</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => {
              const config = typeConfig[suggestion.type]
              const Icon = config.icon

              return (
                <motion.button
                  key={suggestion.id}
                  className={cn(
                    'group inline-flex items-center gap-2 px-3 py-2 rounded-xl',
                    'bg-white/60 dark:bg-white/5',
                    'backdrop-blur-lg border',
                    'transition-all duration-300',
                    'hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]',
                    config.borderColor
                  )}
                  onClick={() => onSuggestionClick(suggestion.prompt)}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={cn('p-1 rounded-lg', config.bgColor)}>
                    <Icon className={cn('h-3.5 w-3.5', config.color)} />
                  </div>
                  <span className="text-sm text-foreground/90">{suggestion.text}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Default follow-up suggestions after a response */
export const defaultFollowUpSuggestions: Suggestion[] = [
  {
    id: 'dd-1',
    type: 'diagnostic',
    text: 'Revisar diagnósticos diferenciais',
    prompt: 'Poderia detalhar mais os diagnósticos diferenciais para este caso?',
  },
  {
    id: 'tx-1',
    type: 'treatment',
    text: 'Ver opções de tratamento',
    prompt: 'Quais são as opções de tratamento baseadas em evidências para este caso?',
  },
  {
    id: 'exam-1',
    type: 'exam',
    text: 'Exames recomendados',
    prompt: 'Quais exames complementares seriam mais indicados com melhor custo-benefício?',
  },
  {
    id: 'alert-1',
    type: 'alert',
    text: 'Sinais de alerta',
    prompt: 'Quais são os red flags que devo monitorar neste paciente?',
  },
]

/** Context-aware suggestions */
export function generateContextSuggestions(lastMessage: string): Suggestion[] {
  const suggestions: Suggestion[] = []
  const lowerMessage = lastMessage.toLowerCase()

  // Cardiac-related
  if (lowerMessage.includes('dor torácica') || lowerMessage.includes('peito')) {
    suggestions.push({
      id: 'cardiac-1',
      type: 'exam',
      text: 'Interpretar ECG',
      prompt: 'Como interpretar o ECG neste contexto clínico?',
    })
    suggestions.push({
      id: 'cardiac-2',
      type: 'alert',
      text: 'Critérios para SCA',
      prompt: 'Quais são os critérios para suspeita de síndrome coronariana aguda?',
    })
  }

  // Neurological
  if (lowerMessage.includes('cefaleia') || lowerMessage.includes('dor de cabeça')) {
    suggestions.push({
      id: 'neuro-1',
      type: 'alert',
      text: 'Red flags neurológicos',
      prompt: 'Quais são os sinais de alerta para cefaleia secundária?',
    })
  }

  // Pediatric context
  if (lowerMessage.includes('criança') || lowerMessage.includes('pediátrico')) {
    suggestions.push({
      id: 'ped-1',
      type: 'context',
      text: 'Ajustar para idade',
      prompt: 'Poderia ajustar as recomendações considerando a faixa etária pediátrica?',
    })
  }

  // Elderly context
  if (lowerMessage.includes('idoso') || lowerMessage.includes('geriátrico')) {
    suggestions.push({
      id: 'ger-1',
      type: 'context',
      text: 'Considerar polifarmácia',
      prompt: 'Quais considerações especiais para pacientes idosos em relação a este caso?',
    })
  }

  // Add some default follow-ups if we don't have many context-specific ones
  if (suggestions.length < 3) {
    suggestions.push(...defaultFollowUpSuggestions.slice(0, 4 - suggestions.length))
  }

  return suggestions.slice(0, 4)
}
