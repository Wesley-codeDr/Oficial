'use client'

import { useState, useMemo, useTransition, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { CheckboxCategory } from '@prisma/client'
import { Save, RotateCcw, FileText, List, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { FormCategoryNav } from './FormCategoryNav'
import { FormCheckboxZone } from './FormCheckboxZone'
import { FormFloatingPreview } from './FormFloatingPreview'
import { FormCFMIndicator } from './FormCFMIndicator'
import { FormRedFlagsPanel } from './FormRedFlagsPanel'
import { ComplaintSelector } from './complaint-selector'
import { PriorityCheckboxPanel } from './priority-checkbox-panel'
import { EmergencyWarningOverlay } from './emergency-warning-overlay'
import { ExportPDFButton } from './ExportPDFButton'
import {
  generateNarrative,
  detectRedFlags,
  type OutputMode,
} from '@/lib/anamnese/generate-narrative'
import { saveAnamneseSession, saveAnamneseDraft, markSessionAsCopied } from '@/lib/anamnese/actions'
import { useToast } from '@/hooks/use-toast'
import { useAutoSave } from '@/hooks/use-auto-save'
import { AutoSaveIndicator } from '@/components/ui/auto-save-indicator'
import { NetworkRecoveryBanner, NetworkStatusToast } from '@/components/ui/network-recovery-banner'
import { analytics } from '@/lib/analytics'
import { usePatientStore } from '@/stores/patient-store'
import { useComplaint } from '@/hooks/use-complaints'
import { useCFMProgress } from '@/hooks/use-cfm-progress'
import { useEmergencyDetection } from '@/hooks/use-emergency-detection'

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

interface FormOrchestratorProps {
  syndrome: SyndromeData
}

const CATEGORY_LABELS: Record<CheckboxCategory, string> = {
  QP: 'Queixa Principal',
  HDA: 'História da Doença Atual',
  ANTECEDENTES: 'Antecedentes Pessoais',
  MEDICACOES: 'Medicações em Uso',
  ALERGIAS: 'Alergias',
  HABITOS: 'Hábitos de Vida',
  EXAME_FISICO: 'Exame Físico',
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

export function FormOrchestrator({ syndrome }: FormOrchestratorProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  // Active category for navigation
  const [activeCategory, setActiveCategory] = useState<CheckboxCategory>('QP')

  // Get patient context from store
  const gender = usePatientStore((state) => state.gender)
  const isPediatric = usePatientStore((state) => state.isPediatric)
  const painIntensity = usePatientStore((state) => state.painIntensity)
  const evolutionType = usePatientStore((state) => state.evolutionType)
  const onsetType = usePatientStore((state) => state.onsetType)

  const patientContext = useMemo(
    () => ({
      gender,
      isPediatric,
      painIntensity: painIntensity > 0 ? painIntensity : undefined,
      evolutionType,
      onsetType,
    }),
    [gender, isPediatric, painIntensity, evolutionType, onsetType]
  )

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [outputMode, setOutputMode] = useState<OutputMode>('SUMMARY')
  const [savedSessionId, setSavedSessionId] = useState<string | null>(null)
  const [draftSessionId, setDraftSessionId] = useState<string | null>(null)

  // State for complaint selector and priority checkboxes
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null)
  const [prioritySelectedCheckboxes, setPrioritySelectedCheckboxes] = useState<Set<string>>(
    new Set()
  )

  // Track if first interaction happened
  const hasInteractedRef = useRef(false)

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

  // Calculate CFM block progress
  const { selectedByCategory, totalByCategory } = useCFMProgress(syndrome.checkboxes, selectedIds)

  // Emergency detection
  const {
    detectedEmergencies,
    highestSeverity,
    hasEmergency,
    requiresImmediateAction,
    dismissEmergency,
    dismissAll,
    checkSymptoms,
  } = useEmergencyDetection({
    enableAudio: true,
    enableHaptic: true,
    onEmergencyDetected: (emergencies) => {
      emergencies.forEach((emergency) => {
        analytics.redFlagDetected(
          syndrome.code,
          emergency.indicator.label,
          emergency.indicator.severity.toUpperCase() as 'WARNING' | 'CRITICAL'
        )
      })
    },
  })

  // Check symptoms when selected checkboxes change
  useEffect(() => {
    const symptomLabels = selectedCheckboxes.map((cb) => cb.displayText)
    checkSymptoms(symptomLabels)
  }, [selectedCheckboxes, checkSymptoms])

  // Generate narrative
  const narrative = useMemo(() => {
    const complaintContext = selectedComplaint
      ? {
          complaintId: selectedComplaint.id,
          complaintTitle: selectedComplaint.title,
          complaintGroup: selectedComplaint.group,
          complaintEBM: selectedComplaint.extendedContentEBM,
        }
      : undefined

    return generateNarrative(selectedCheckboxes, outputMode, patientContext, complaintContext)
  }, [selectedCheckboxes, outputMode, patientContext, selectedComplaint])

  // Detect red flags
  const redFlags = useMemo(() => {
    const checkboxRedFlags = detectRedFlags(selectedCheckboxes)

    if (selectedComplaint?.extendedContentEBM?.redFlags) {
      const complaintRedFlags = selectedComplaint.extendedContentEBM.redFlags.map((rf) => ({
        description: rf.description,
        severity: rf.severity,
        immediateAction: rf.immediateAction,
        source: 'complaint' as const,
      }))
      return [...checkboxRedFlags, ...complaintRedFlags]
    }

    return checkboxRedFlags
  }, [selectedCheckboxes, selectedComplaint])

  // Normalize red flags
  const normalizedRedFlags = useMemo(() => {
    return redFlags.map((rf, index) => ({
      id: 'id' in rf ? rf.id : `ebm-rf-${index}`,
      displayText: 'displayText' in rf ? rf.displayText : rf.description,
      severity: 'severity' in rf ? (rf.severity as 'warning' | 'danger' | 'critical') : undefined,
      action: 'immediateAction' in rf ? rf.immediateAction : undefined,
    }))
  }, [redFlags])

  // Auto-save data structure
  const autoSaveData = useMemo(
    () => ({
      draftId: draftSessionId,
      syndromeId: syndrome.id,
      checkedItems: Array.from(selectedIds),
      generatedText: narrative,
      outputMode,
      redFlagsDetected: redFlags.map((rf) => ('id' in rf ? rf.id : rf.description)),
    }),
    [draftSessionId, syndrome.id, selectedIds, narrative, outputMode, redFlags]
  )

  // Auto-save hook
  const {
    status: autoSaveStatus,
    lastSavedAt,
    isOnline,
    pendingChanges,
    error: autoSaveError,
    retryFailedSaves,
  } = useAutoSave({
    data: autoSaveData,
    onSave: async (data) => {
      const result = await saveAnamneseDraft(data)
      if (result.isNew) {
        setDraftSessionId(result.session.id)
      }
    },
    debounceMs: 3000,
    enabled: hasInteractedRef.current && selectedIds.size > 0,
    isValid: (data) => data.checkedItems.length > 0,
    onSaveSuccess: () => {},
    onSaveError: (error) => {
      console.error('Auto-save failed:', error)
    },
  })

  // Handlers
  const handleToggle = useCallback((id: string) => {
    hasInteractedRef.current = true
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os itens selecionados?')) {
      setSelectedIds(new Set())
      analytics.anamneseReset(syndrome.code)
    }
  }

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
          redFlagsDetected: redFlags.map((rf) => ('id' in rf ? rf.id : rf.description)),
        })

        setSavedSessionId(session.id)

        analytics.anamneseCompleted(
          syndrome.code,
          selectedIds.size,
          redFlags.length > 0,
          outputMode
        )
        analytics.sessionSaved(syndrome.code, session.id)

        toast({
          title: 'Anamnese salva!',
          description: 'A anamnese foi salva no seu histórico.',
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
      analytics.anamnaseCopied(syndrome.code, savedSessionId)
      startTransition(async () => {
        try {
          await markSessionAsCopied(savedSessionId)
        } catch (_error) {
          // Error already handled by toast notification
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
          description: 'Não foi possível iniciar o chat. Tente novamente.',
          variant: 'destructive',
        })
      }
    })
  }

  const handleComplaintSelect = useCallback((id: string) => {
    setSelectedComplaintId(id)
  }, [])

  const handleComplaintClear = useCallback(() => {
    setSelectedComplaintId(null)
    setPrioritySelectedCheckboxes(new Set())
  }, [])

  const handlePriorityToggle = useCallback(
    (key: string) => {
      setPrioritySelectedCheckboxes((prev) => {
        const next = new Set(prev)
        if (next.has(key)) {
          next.delete(key)
        } else {
          next.add(key)
        }
        return next
      })

      const [category, ...labelParts] = key.split(':')
      const label = labelParts.join(':')
      const checkbox = syndrome.checkboxes.find(
        (cb) => cb.category === category && cb.displayText === label
      )
      if (checkbox) {
        handleToggle(checkbox.id)
      }
    },
    [syndrome.checkboxes, handleToggle]
  )

  return (
    <>
      {/* Network Recovery Banner */}
      <div className="mb-6">
        <NetworkRecoveryBanner
          isOnline={isOnline}
          status={autoSaveStatus}
          pendingChanges={pendingChanges}
          error={autoSaveError}
          onRetry={retryFailedSaves}
        />
      </div>

      <NetworkStatusToast isOnline={isOnline} />

      {/* Multi-Zone Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_400px] gap-6">
        {/* LEFT ZONE: Category Navigation (Sticky) */}
        <aside className="hidden lg:block">
          <div className="sticky top-8 space-y-6">
            <FormCategoryNav
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              selectedByCategory={selectedByCategory}
              totalByCategory={totalByCategory}
            />

            {/* Auto-Save Indicator */}
            {selectedIds.size > 0 && (
              <AutoSaveIndicator
                status={autoSaveStatus}
                lastSavedAt={lastSavedAt}
                isOnline={isOnline}
                pendingChanges={pendingChanges}
                error={autoSaveError}
                onRetry={retryFailedSaves}
              />
            )}
          </div>
        </aside>

        {/* CENTER ZONE: Main Checkbox Area */}
        <main className="space-y-6">
          {/* Complaint Selector */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="backdrop-blur-glass bg-white/40 dark:bg-slate-900/40 border border-white/20 rounded-glass-lg p-6"
          >
            <ComplaintSelector
              selectedComplaintId={selectedComplaintId}
              onComplaintSelect={handleComplaintSelect}
              onClear={handleComplaintClear}
            />
          </motion.div>

          {/* Priority Checkboxes */}
          {selectedComplaintId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-glass bg-white/40 dark:bg-slate-900/40 border border-white/20 rounded-glass-lg p-6"
            >
              <PriorityCheckboxPanel
                complaintId={selectedComplaintId}
                selectedCheckboxes={prioritySelectedCheckboxes}
                onToggle={handlePriorityToggle}
              />
            </motion.div>
          )}

          {/* Emergency Warning */}
          {hasEmergency && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <EmergencyWarningOverlay
                emergencies={detectedEmergencies}
                highestSeverity={highestSeverity}
                requiresImmediateAction={requiresImmediateAction}
                onDismiss={dismissAll}
                onDismissOne={dismissEmergency}
                position="inline"
              />
            </motion.div>
          )}

          {/* Output Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="flex items-center justify-between gap-4"
          >
            <div className="backdrop-blur-glass bg-white/40 dark:bg-slate-900/40 border border-white/20 rounded-glass-lg p-1.5 flex gap-2">
              <button
                onClick={() => setOutputMode('SUMMARY')}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-glass-sm text-xs font-bold uppercase tracking-wider transition-all',
                  outputMode === 'SUMMARY'
                    ? 'bg-healthcare-primary text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-white/20'
                )}
              >
                <List className="h-3.5 w-3.5" />
                Resumido
              </button>
              <button
                onClick={() => setOutputMode('DETAILED')}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-glass-sm text-xs font-bold uppercase tracking-wider transition-all',
                  outputMode === 'DETAILED'
                    ? 'bg-healthcare-primary text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-white/20'
                )}
              >
                <FileText className="h-3.5 w-3.5" />
                Detalhado
              </button>
            </div>

            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 backdrop-blur-glass bg-white/40 dark:bg-slate-900/40 border border-white/20 rounded-glass-lg px-4 py-2">
              {selectedIds.size} item{selectedIds.size !== 1 ? 's' : ''}
            </div>
          </motion.div>

          {/* Checkbox Zone */}
          <FormCheckboxZone
            category={activeCategory}
            categoryLabel={CATEGORY_LABELS[activeCategory]}
            checkboxes={groupedCheckboxes[activeCategory]}
            selectedIds={selectedIds}
            onToggle={handleToggle}
          />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-white/20">
            <button
              onClick={handleReset}
              disabled={selectedIds.size === 0}
              className={cn(
                'px-4 py-2.5 rounded-glass-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2',
                'backdrop-blur-glass bg-white/40 dark:bg-slate-900/40 border border-white/20',
                selectedIds.size === 0
                  ? 'text-slate-400 cursor-not-allowed'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 hover:scale-105'
              )}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Limpar
            </button>

            <button
              onClick={handleSave}
              disabled={isPending || selectedIds.size === 0}
              className={cn(
                'px-8 py-3 rounded-glass-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-3',
                isPending || selectedIds.size === 0
                  ? 'bg-slate-500/20 text-slate-400 cursor-not-allowed'
                  : 'bg-healthcare-primary text-white shadow-xl hover:scale-105 active:scale-95'
              )}
            >
              {isPending ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isPending ? 'Salvando...' : 'Finalizar'}
            </button>

            <button
              onClick={handleOpenChat}
              disabled={isPending || !savedSessionId}
              className={cn(
                'px-4 py-2.5 rounded-glass-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2',
                'backdrop-blur-glass bg-white/40 dark:bg-slate-900/40 border border-white/20',
                isPending || !savedSessionId
                  ? 'text-slate-400 cursor-not-allowed'
                  : 'text-healthcare-primary hover:bg-healthcare-primary/10 hover:scale-105'
              )}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Consultar EBM
            </button>

            {savedSessionId && (
              <ExportPDFButton
                sessionId={savedSessionId}
                disabled={isPending}
                className="px-4 py-2.5 rounded-glass-lg text-xs font-bold uppercase tracking-wider backdrop-blur-glass bg-white/40 dark:bg-slate-900/40 border border-white/20"
              />
            )}
          </div>
        </main>

        {/* RIGHT ZONE: Floating Panels */}
        <aside className="hidden lg:block space-y-6">
          <div className="sticky top-8 space-y-6">
            {/* CFM Progress Indicator */}
            <FormCFMIndicator
              selectedByCategory={selectedByCategory}
              totalByCategory={totalByCategory}
            />

            {/* Red Flags Panel */}
            <FormRedFlagsPanel redFlags={normalizedRedFlags} />

            {/* Preview Panel */}
            <FormFloatingPreview
              narrative={narrative}
              redFlagCount={redFlags.length}
              onCopy={handleCopy}
            />
          </div>
        </aside>
      </div>
    </>
  )
}
