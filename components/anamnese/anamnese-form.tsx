'use client'

import { useState, useMemo, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckboxCategory } from '@prisma/client'
import {
  RotateCcw,
  Search,
  Activity,
  AlertTriangle,
  Stethoscope,
  Pill,
  Heart,
  Leaf,
  ClipboardList,
  XCircle,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CheckboxItem } from './apple-inputs'
import { CollapsiblePreview } from './collapsible-preview'
import { SectionNavItem } from './section-nav-item'
import { RedFlagAlert } from './red-flag-alert'
import { generateNarrative, detectRedFlags, type OutputMode } from '@/lib/anamnese/generate-narrative'
import { saveAnamneseSession, markSessionAsCopied } from '@/lib/anamnese/actions'
import { useToast } from '@/hooks/use-toast'
import { analytics } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import { useAnamneseStore } from '@/stores/anamnese-store'

type CheckboxData = {
  id: string
  category: CheckboxCategory
  displayText: string
  narrativeText: string
  isRedFlag: boolean
  isNegative: boolean
  orderIndex: number
}

type SyndromeData = {
  id: string
  name: string
  code: string
  checkboxes: CheckboxData[]
}

interface AnamneseFormProps {
  syndrome: SyndromeData
}

const CATEGORY_LABELS: Record<CheckboxCategory, string> = {
  QP: 'Queixa Principal',
  HDA: 'Historia da Doenca Atual',
  ANTECEDENTES: 'Antecedentes Pessoais',
  MEDICACOES: 'Medicacoes em Uso',
  ALERGIAS: 'Alergias',
  HABITOS: 'Habitos de Vida',
  EXAME_FISICO: 'Exame Fisico',
  NEGATIVAS: 'Negativas Pertinentes',
}

const CATEGORY_ICONS: Record<CheckboxCategory, typeof Activity> = {
  QP: ClipboardList,
  HDA: Activity,
  ANTECEDENTES: AlertTriangle,
  MEDICACOES: Pill,
  ALERGIAS: XCircle,
  HABITOS: Leaf,
  EXAME_FISICO: Stethoscope,
  NEGATIVAS: Heart,
}

const CATEGORY_ORDER: CheckboxCategory[] = [
  'QP',
  'HDA',
  'ANTECEDENTES',
  'MEDICACOES',
  'ALERGIAS',
  'HABITOS',
  'EXAME_FISICO',
  'NEGATIVAS',
]

export function AnamneseForm({ syndrome }: AnamneseFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  // Use centralized store for core state
  const {
    checkedItems,
    outputMode,
    sessionId,
    setOutputMode,
    setSessionId,
    toggleCheckbox,
    setGeneratedText,
    setRedFlags,
    clearSession,
  } = useAnamneseStore()

  // Keep UI-specific state local
  const [activeSectionId, setActiveSectionId] = useState<CheckboxCategory | null>(null)
  const [searchFilter, setSearchFilter] = useState('')

  // Group checkboxes by category
  const groupedCheckboxes = useMemo(() => {
    const groups: Record<CheckboxCategory, CheckboxData[]> = {} as Record<CheckboxCategory, CheckboxData[]>

    for (const category of CATEGORY_ORDER) {
      groups[category] = syndrome.checkboxes
        .filter((cb) => cb.category === category)
        .sort((a, b) => a.orderIndex - b.orderIndex)
    }

    return groups
  }, [syndrome.checkboxes])

  // Filter sections that have items
  const activeSections = useMemo(() => {
    return CATEGORY_ORDER.filter((cat) => groupedCheckboxes[cat].length > 0)
  }, [groupedCheckboxes])

  // Set initial active section
  useEffect(() => {
    if (activeSections.length > 0 && !activeSectionId) {
      const firstSection = activeSections[0]
      if (firstSection) {
        setActiveSectionId(firstSection)
      }
    }
  }, [activeSections, activeSectionId])

  // Scroll tracking
  useEffect(() => {
    const container = document.getElementById('form-container')
    if (!container) return

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect()
      const triggerZone = 150

      const isBottom = Math.abs(container.scrollHeight - container.clientHeight - container.scrollTop) < 20
      if (isBottom && activeSections.length > 0) {
        const lastSection = activeSections[activeSections.length - 1]
        if (lastSection) {
          setActiveSectionId(lastSection)
        }
        return
      }

      let newActiveId: CheckboxCategory | null = null

      activeSections.forEach((section) => {
        const el = document.getElementById(`sec-${section}`)
        if (el) {
          const rect = el.getBoundingClientRect()
          const relativeTop = rect.top - containerRect.top
          if (relativeTop <= triggerZone) {
            newActiveId = section
          }
        }
      })

      if (newActiveId) {
        setActiveSectionId(newActiveId)
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [activeSections])

  // Get selected checkboxes data from store
  const selectedCheckboxes = useMemo(() => {
    return syndrome.checkboxes.filter((cb) => checkedItems.has(cb.id))
  }, [syndrome.checkboxes, checkedItems])

  // Generate narrative and update store
  const narrative = useMemo(() => {
    const generated = generateNarrative(selectedCheckboxes, outputMode)
    // Update store with generated text
    setGeneratedText(generated)
    return generated
  }, [selectedCheckboxes, outputMode, setGeneratedText])

  // Detect red flags and update store
  const redFlags = useMemo(() => {
    const detected = detectRedFlags(selectedCheckboxes)
    // Update store with red flags
    setRedFlags(detected)
    return detected
  }, [selectedCheckboxes, setRedFlags])

  const handleToggle = (id: string) => {
    toggleCheckbox(id)
    setSessionId(null) // Clear session when selection changes
  }

  const handleReset = () => {
    clearSession()
  }

  const handleSave = () => {
    if (checkedItems.size === 0) {
      toast({
        title: 'Nenhum item selecionado',
        description: 'Selecione pelo menos um item para salvar.',
        variant: 'destructive',
      })
      return
    }

    startTransition(async () => {
      try {
        const session = await saveAnamneseSession({
          syndromeId: syndrome.id,
          checkedItems: Array.from(checkedItems),
          generatedText: narrative,
          outputMode,
          redFlagsDetected: redFlags.map((rf) => rf.id),
        })

        setSessionId(session.id)

        analytics.anamneseCompleted(syndrome.code, checkedItems.size, redFlags.length > 0, outputMode)
        analytics.sessionSaved(syndrome.code, session.id)

        redFlags.forEach((rf) => {
          analytics.redFlagDetected(syndrome.code, rf.displayText, 'WARNING')
        })

        toast({
          title: 'Anamnese salva!',
          description: 'A anamnese foi salva no seu historico.',
        })
      } catch {
        toast({
          title: 'Erro ao salvar',
          description: 'Ocorreu um erro ao salvar a anamnese. Tente novamente.',
          variant: 'destructive',
        })
      }
    })
  }

  const handleCopy = () => {
    if (sessionId) {
      analytics.anamnaseCopied(syndrome.code, sessionId)

      startTransition(async () => {
        try {
          await markSessionAsCopied(sessionId)
        } catch {
          // Silent fail - not critical
        }
      })
    }
  }

  const handleOpenChat = () => {
    if (!sessionId) {
      toast({
        title: 'Salve a anamnese primeiro',
        description: 'Salve a anamnese antes de abrir o chat para ter contexto.',
        variant: 'destructive',
      })
      return
    }

    startTransition(async () => {
      try {
        const response = await fetch('/api/chat/conversations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })

        if (!response.ok) {
          throw new Error('Failed to create conversation')
        }

        const conversation = await response.json()
        router.push(`/chat/${conversation.id}`)
      } catch {
        toast({
          title: 'Erro ao abrir chat',
          description: 'Nao foi possivel iniciar o chat. Tente novamente.',
          variant: 'destructive',
        })
      }
    })
  }

  const scrollToSection = (id: CheckboxCategory, smoothScroll: boolean = true) => {
    setActiveSectionId(id)
    const container = document.getElementById('form-container')
    const el = document.getElementById(`sec-${id}`)

    if (container && el) {
      const elementRect = el.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const offsetTop = elementRect.top - containerRect.top
      const currentScroll = container.scrollTop
      const headerOffset = 24

      const targetPos = currentScroll + offsetTop - headerOffset

      container.scrollTo({
        top: Math.max(0, targetPos),
        behavior: smoothScroll ? 'smooth' : 'auto',
      })
    }
  }

  // Check if section has red flags selected
  const sectionHasRedFlag = (category: CheckboxCategory) => {
    return groupedCheckboxes[category].some((item) => item.isRedFlag && checkedItems.has(item.id))
  }

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] animate-in fade-in zoom-in-95 duration-500">
      {/* Main Content Area - 2 columns */}
      <div className="flex flex-1 gap-5 overflow-hidden">
        {/* 1. SIDEBAR (Apple Settings Style) */}
        <div className="w-64 shrink-0 flex flex-col h-full py-2">
          <div className="mb-4 px-2">
            <h3 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 pl-2">
              Roteiro
            </h3>
            <div className="relative group">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400 group-focus-within:text-ios-blue transition-colors" />
              <input
                type="text"
                placeholder="Filtrar..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-white/5 rounded-2xl py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ios-blue/10 focus:bg-white dark:focus:bg-slate-800 transition-all backdrop-blur-sm dark:text-white"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-2 pb-4 px-1">
            {activeSections.map((section) => (
              <SectionNavItem
                key={section}
                label={CATEGORY_LABELS[section]}
                icon={CATEGORY_ICONS[section]}
                isActive={activeSectionId === section}
                hasRedFlag={sectionHasRedFlag(section)}
                onClick={() => scrollToSection(section, true)}
              />
            ))}
          </div>

          {/* Clear Button */}
          <div className="mt-2 px-2">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={checkedItems.size === 0}
              className="w-full h-10 rounded-xl"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Limpar Selecao
            </Button>
          </div>
        </div>

        {/* 2. MAIN FORM AREA */}
        <div
          id="form-container"
          className="flex-1 h-full overflow-y-auto custom-scrollbar scroll-smooth pr-2 pb-32 mask-gradient-bottom"
        >
          {/* Red Flag Alert */}
          <RedFlagAlert redFlags={redFlags} />

          <div className="space-y-6 pt-2 pb-8 max-w-4xl">
            {activeSections.map((section) => {
              const Icon = CATEGORY_ICONS[section]
              const items = groupedCheckboxes[section].filter(
                (item) => !searchFilter || item.displayText.toLowerCase().includes(searchFilter.toLowerCase())
              )

              if (items.length === 0 && searchFilter) return null

              return (
                <div
                  key={section}
                  id={`sec-${section}`}
                  className="scroll-mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
                >
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h2 className="text-[19px] font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                        {CATEGORY_LABELS[section]}
                      </h2>
                    </div>
                  </div>

                  <div className="bg-white/80 dark:bg-[#1c1c1e]/60 backdrop-blur-xl rounded-[32px] border border-white/60 dark:border-white/5 shadow-[0_18px_45px_rgba(15,23,42,0.05)] overflow-hidden">
                    {items.map((item) => (
                      <CheckboxItem
                        key={item.id}
                        id={item.id}
                        label={item.displayText}
                        isRedFlag={item.isRedFlag}
                        value={checkedItems.has(item.id)}
                        onChange={() => handleToggle(item.id)}
                      />
                    ))}
                    {items.length === 0 && (
                      <div className="p-8 text-center text-slate-400 italic text-sm">Nenhum item nesta secao.</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 3. DRAWER - Preview at bottom */}
      <CollapsiblePreview
        narrative={narrative}
        redFlagCount={redFlags.length}
        outputMode={outputMode}
        onOutputModeChange={setOutputMode}
        onCopy={handleCopy}
        onOpenChat={handleOpenChat}
        onSave={handleSave}
        isSaving={isPending}
        canSave={checkedItems.size > 0}
        canOpenChat={!!sessionId}
      />
    </div>
  )
}
