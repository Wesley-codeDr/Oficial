'use client'

import { useState, useMemo, useTransition, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckboxCategory } from '@prisma/client'
import { Save, RotateCcw, FileText, List, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CheckboxGroup } from './checkbox-group'
import { NarrativePreview } from './narrative-preview'
import { RedFlagAlert } from './red-flag-alert'
import { ComplaintSelector } from './complaint-selector'
import { PriorityCheckboxPanel } from './priority-checkbox-panel'
import { generateNarrative, detectRedFlags, type OutputMode } from '@/lib/anamnese/generate-narrative'
import { saveAnamneseSession, markSessionAsCopied } from '@/lib/anamnese/actions'
import { useToast } from '@/hooks/use-toast'
import { analytics } from '@/lib/analytics'
import { usePatientStore } from '@/stores/patient-store'
import { useComplaint } from '@/hooks/use-complaints'
import type { CheckboxCategory as CheckboxCategoryType } from '@/lib/types/medical'

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

  // Get patient context from store
  const gender = usePatientStore((state) => state.gender)
  const isPediatric = usePatientStore((state) => state.isPediatric)
  const painIntensity = usePatientStore((state) => state.painIntensity)
  const evolutionType = usePatientStore((state) => state.evolutionType)
  const onsetType = usePatientStore((state) => state.onsetType)

  const patientContext = useMemo(() => ({
    gender,
    isPediatric,
    painIntensity: painIntensity > 0 ? painIntensity : undefined,
    evolutionType,
    onsetType,
  }), [gender, isPediatric, painIntensity, evolutionType, onsetType])

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [outputMode, setOutputMode] = useState<OutputMode>('SUMMARY')
  const [savedSessionId, setSavedSessionId] = useState<string | null>(null)

  // State for complaint selector and priority checkboxes
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null)
  const [prioritySelectedCheckboxes, setPrioritySelectedCheckboxes] = useState<Set<string>>(new Set())

  // Load complaint data when selected
  const { data: selectedComplaint } = useComplaint(selectedComplaintId || '')

  // Group checkboxes by category
  const groupedCheckboxes = useMemo(() => {
    const groups: Record<CheckboxCategory, CheckboxData[]> = {} as Record<
      CheckboxCategory,
      CheckboxData[]
    >

    for (const category of CATEGORY_ORDER) {
      groups[category] = syndrome.checkboxes
        .filter((cb) => cb.category === category)
        .sort((a, b) => a.orderIndex - b.orderIndex)
    }

    return groups
  }, [syndrome.checkboxes])

  // Get selected checkboxes data
  const selectedCheckboxes = useMemo(() => {
    return syndrome.checkboxes.filter((cb) => selectedIds.has(cb.id))
  }, [syndrome.checkboxes, selectedIds])

  // Generate narrative (with complaint context)
  const narrative = useMemo(() => {
    const complaintContext = selectedComplaint
      ? {
          complaintId: selectedComplaint.id,
          complaintTitle: selectedComplaint.name_pt,
          complaintGroup: selectedComplaint.group,
          complaintEBM: selectedComplaint.extendedContentEBM,
        }
      : undefined

    return generateNarrative(selectedCheckboxes, outputMode, patientContext, complaintContext)
  }, [selectedCheckboxes, outputMode, patientContext, selectedComplaint])

  // Detect red flags (from checkboxes + complaint EBM)
  const redFlags = useMemo(() => {
    const checkboxRedFlags = detectRedFlags(selectedCheckboxes)

    // Add red flags from complaint EBM
    if (selectedComplaint?.extendedContentEBM?.redFlags) {
      const complaintRedFlags = selectedComplaint.extendedContentEBM.redFlags.map(rf => ({
        description: rf.description,
        severity: rf.severity,
        immediateAction: rf.immediateAction,
        source: 'complaint' as const,
      }))
      return [...checkboxRedFlags, ...complaintRedFlags]
    }

    return checkboxRedFlags
  }, [selectedCheckboxes, selectedComplaint])

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
    // Reset saved session when changing selection
    setSavedSessionId(null)
  }

  const handleReset = () => {
    setSelectedIds(new Set())
    setSavedSessionId(null)
    setSelectedComplaintId(null)
    setPrioritySelectedCheckboxes(new Set())
  }

  // Handlers for complaint selector
  const handleComplaintSelect = useCallback((complaintId: string) => {
    setSelectedComplaintId(complaintId)
    // Clear priority checkboxes when changing complaint
    setPrioritySelectedCheckboxes(new Set())
    // Track analytics
    analytics.complaintSelection(complaintId, '')
  }, [])

  const handleComplaintClear = useCallback(() => {
    setSelectedComplaintId(null)
    setPrioritySelectedCheckboxes(new Set())
  }, [])

  // Helper function to find checkbox ID by label and category
  const findCheckboxIdByLabel = useCallback((category: CheckboxCategory, label: string): string | null => {
    const checkbox = syndrome.checkboxes.find(
      cb => cb.category === category && cb.displayText === label
    )
    return checkbox?.id || null
  }, [syndrome.checkboxes])

  // Handler for priority checkboxes
  const handlePriorityToggle = useCallback((label: string, category: CheckboxCategoryType) => {
    const key = `${category}:${label}`
    const checkboxId = findCheckboxIdByLabel(category, label)

    // Se não encontrar o checkbox, logar e retornar
    if (!checkboxId) {
      console.warn(`Checkbox not found: ${category} - ${label}`)
      return
    }

    // Atualizar estado visual do painel prioritário
    setPrioritySelectedCheckboxes(prev => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })

    // CRÍTICO: Sincronizar com selectedIds para gerar narrativa
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(checkboxId)) {
        next.delete(checkboxId)
      } else {
        next.add(checkboxId)
      }
      return next
    })

    // Reset saved session when changing selection
    setSavedSessionId(null)
  }, [findCheckboxIdByLabel])

  // Sincronizar prioritySelectedCheckboxes quando selectedIds muda (sincronização reversa)
  useEffect(() => {
    if (!selectedComplaintId) return // Só sincroniza se houver queixa selecionada

    setPrioritySelectedCheckboxes(prev => {
      const next = new Set(prev)
      let changed = false

      // Para cada ID selecionado, adicionar ao set prioritário se não existir
      selectedIds.forEach(id => {
        const checkbox = syndrome.checkboxes.find(cb => cb.id === id)
        if (checkbox) {
          const key = `${checkbox.category}:${checkbox.displayText}`
          if (!next.has(key)) {
            next.add(key)
            changed = true
          }
        }
      })

      // Remover do set prioritário se não estiver em selectedIds
      Array.from(next).forEach(key => {
        const [category, ...labelParts] = key.split(':')
        const label = labelParts.join(':')
        const checkboxId = findCheckboxIdByLabel(category as CheckboxCategory, label)
        if (checkboxId && !selectedIds.has(checkboxId)) {
          next.delete(key)
          changed = true
        }
      })

      return changed ? next : prev
    })
  }, [selectedIds, syndrome.checkboxes, findCheckboxIdByLabel, selectedComplaintId])

  const handleSave = () => {
    if (selectedIds.size === 0) {
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
          checkedItems: Array.from(selectedIds),
          generatedText: narrative,
          outputMode,
          redFlagsDetected: redFlags.map((rf) => rf.id),
        })

        setSavedSessionId(session.id)

        // Track analytics events
        analytics.anamneseCompleted(
          syndrome.code,
          selectedIds.size,
          redFlags.length > 0,
          outputMode
        )
        analytics.sessionSaved(syndrome.code, session.id)

        // Track red flags if detected
        redFlags.forEach((rf) => {
          analytics.redFlagDetected(syndrome.code, rf.displayText, 'WARNING')
        })

        toast({
          title: 'Anamnese salva!',
          description: 'A anamnese foi salva no seu historico.',
        })
      } catch (_error) {
        toast({
          title: 'Erro ao salvar',
          description: 'Ocorreu um erro ao salvar a anamnese. Tente novamente.',
          variant: 'destructive',
        })
      }
    })
  }

  const handleCopy = () => {
    if (savedSessionId) {
      // Track copy event
      analytics.anamnaseCopied(syndrome.code, savedSessionId)

      startTransition(async () => {
        try {
          await markSessionAsCopied(savedSessionId)
        } catch (_error) {
          // Silent fail - not critical
        }
      })
    }
  }

  const handleOpenChat = () => {
    if (!savedSessionId) {
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
          body: JSON.stringify({ sessionId: savedSessionId }),
        })

        if (!response.ok) {
          throw new Error('Failed to create conversation')
        }

        const conversation = await response.json()
        router.push(`/chat/${conversation.id}`)
      } catch (_error) {
        toast({
          title: 'Erro ao abrir chat',
          description: 'Nao foi possivel iniciar o chat. Tente novamente.',
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr,450px]">
      {/* Left Panel - Checkboxes */}
      <div className="space-y-8">
        
        {/* Complaint Selector */}
        <div className="glass-molded rim-light-ios26 inner-glow-ios26 noise-grain rounded-[32px] p-6 shadow-xl">
          <ComplaintSelector
            selectedComplaintId={selectedComplaintId}
            onComplaintSelect={handleComplaintSelect}
            onClear={handleComplaintClear}
          />
        </div>

        {/* Priority Checkboxes Panel */}
        {selectedComplaintId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-molded rim-light-ios26 inner-glow-ios26 noise-grain rounded-[32px] p-6 shadow-xl"
          >
            <PriorityCheckboxPanel
              complaintId={selectedComplaintId}
              selectedCheckboxes={prioritySelectedCheckboxes}
              onToggle={handlePriorityToggle}
            />
          </motion.div>
        )}

        {/* Mode Toggle and Main Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-2">
          <div className="flex items-center gap-2 p-1.5 glass-pill rounded-2xl">
            <button
              onClick={() => setOutputMode('SUMMARY')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all',
                outputMode === 'SUMMARY'
                  ? 'glass-pill bg-blue-500/90 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-white/10'
              )}
            >
              <List className="h-3.5 w-3.5" />
              Resumido
            </button>
            <button
              onClick={() => setOutputMode('DETAILED')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all',
                outputMode === 'DETAILED'
                  ? 'glass-pill bg-blue-500/90 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-white/10'
              )}
            >
              <FileText className="h-3.5 w-3.5" />
              Detalhado
            </button>
          </div>

          <div className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2 glass-pill px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            {selectedIds.size} Iten{selectedIds.size !== 1 ? 's' : ''} Selecionado{selectedIds.size !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Red Flag Alert */}
        <RedFlagAlert redFlags={redFlags} />

        {/* Checkbox Groups */}
        <div className="space-y-10 px-1">
          {CATEGORY_ORDER.map((category) => (
            <CheckboxGroup
              key={category}
              title={CATEGORY_LABELS[category]}
              items={groupedCheckboxes[category]}
              selectedIds={selectedIds}
              onToggle={handleToggle}
            />
          ))}
        </div>

        {/* Sticky Action Footer for Mobile/Small Screens */}
        <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-8 pb-12">
          <button
            onClick={handleReset}
            disabled={selectedIds.size === 0}
            className={cn(
              'glass-pill px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2',
              selectedIds.size === 0
                ? 'text-slate-400 cursor-not-allowed'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white/20 hover:scale-105'
            )}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Limpar
          </button>

          <button
            onClick={handleSave}
            disabled={isPending || selectedIds.size === 0}
            className={cn(
              'px-8 py-3.5 rounded-[20px] font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-3',
              isPending || selectedIds.size === 0
                ? 'glass-pill bg-slate-500/20 text-slate-400 cursor-not-allowed'
                : 'btn-primary-glass text-white hover:scale-105 shadow-xl shadow-blue-500/10 active:scale-95'
            )}
          >
            {isPending ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isPending ? 'Gravando...' : 'Finalizar Log'}
          </button>

          <button
            onClick={handleOpenChat}
            disabled={isPending || !savedSessionId}
            className={cn(
              'glass-pill px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2',
              isPending || !savedSessionId
                ? 'text-slate-400 cursor-not-allowed'
                : 'text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 hover:scale-105'
            )}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Consultar EBM</span>
          </button>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="lg:sticky lg:top-8 lg:self-start">
        <NarrativePreview
          narrative={narrative}
          redFlagCount={redFlags.length}
          onCopy={handleCopy}
          className="h-full min-h-[500px]"
        />
      </div>
    </div>
  )
}
