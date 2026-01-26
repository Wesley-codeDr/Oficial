'use client'

import { useState, useMemo, useTransition, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { CheckboxCategory } from '@prisma/client'
import { Save, RotateCcw, FileText, List, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CheckboxGroup } from './checkbox-group'
import { NarrativePreview } from './narrative-preview'
import { RedFlagAlert } from './red-flag-alert'
import { EmergencyWarningOverlay } from './emergency-warning-overlay'
import { ComplaintSelector } from './complaint-selector'
import { PriorityCheckboxPanel } from './priority-checkbox-panel'
import { CFMProgressIndicator } from './cfm-progress-indicator'
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
import { anamneseLogger, logAndReturnError } from '@/lib/logging'
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

  // Track if first interaction happened (for auto-save trigger)
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

  // Emergency detection - Real-time monitoring for critical symptoms
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
      // Track emergency detection analytics
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

  // Generate narrative (with complaint context)
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

  // Detect red flags (from checkboxes + complaint EBM)
  const redFlags = useMemo(() => {
    const checkboxRedFlags = detectRedFlags(selectedCheckboxes)

    // Add red flags from complaint EBM
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

  // Normalize red flags for RedFlagAlert component
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
    debounceMs: 3000, // 3 seconds debounce
    enabled: hasInteractedRef.current && selectedIds.size > 0,
    isValid: (data) => data.checkedItems.length > 0,
    onSaveSuccess: () => {
      // Silent success - indicator shows status
    },
    onSaveError: (error) => {
      anamneseLogger.error('Auto-save failed', error, {
        syndromeId: syndrome.id,
        checkedItemsCount: selectedIds.size,
      })
    },
  })

  const handleToggle = (id: string) => {
    // Mark first interaction for auto-save
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
    // Reset saved session when changing selection
    setSavedSessionId(null)
  }

  const handleReset = () => {
    setSelectedIds(new Set())
    setSavedSessionId(null)
    setDraftSessionId(null)
    setSelectedComplaintId(null)
    setPrioritySelectedCheckboxes(new Set())
    hasInteractedRef.current = false
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
  const findCheckboxIdByLabel = useCallback(
    (category: CheckboxCategory, label: string): string | null => {
      const checkbox = syndrome.checkboxes.find(
        (cb) => cb.category === category && cb.displayText === label
      )
      return checkbox?.id || null
    },
    [syndrome.checkboxes]
  )

  // Handler for priority checkboxes
  const handlePriorityToggle = useCallback(
    (label: string, category: CheckboxCategoryType) => {
      // Mark first interaction for auto-save
      hasInteractedRef.current = true

      const key = `${category}:${label}`
      const checkboxId = findCheckboxIdByLabel(category, label)

      // Se não encontrar o checkbox, logar e retornar
      if (!checkboxId) {
        anamneseLogger.warn(`Checkbox not found: ${category} - ${label}`, undefined, {
          syndromeId: syndrome.id,
        })
        return
      }

      // Atualizar estado visual do painel prioritário
      setPrioritySelectedCheckboxes((prev) => {
        const next = new Set(prev)
        if (next.has(key)) {
          next.delete(key)
        } else {
          next.add(key)
        }
        return next
      })

      // CRÍTICO: Sincronizar com selectedIds para gerar narrativa
      setSelectedIds((prev) => {
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
    },
    [findCheckboxIdByLabel]
  )

  // Sincronizar prioritySelectedCheckboxes quando selectedIds muda (sincronização reversa)
  useEffect(() => {
    if (!selectedComplaintId) return // Só sincroniza se houver queixa selecionada

    setPrioritySelectedCheckboxes((prev) => {
      const next = new Set(prev)
      let changed = false

      // Para cada ID selecionado, adicionar ao set prioritário se não existir
      selectedIds.forEach((id) => {
        const checkbox = syndrome.checkboxes.find((cb) => cb.id === id)
        if (checkbox) {
          const key = `${checkbox.category}:${checkbox.displayText}`
          if (!next.has(key)) {
            next.add(key)
            changed = true
          }
        }
      })

      // Remover do set prioritário se não estiver em selectedIds
      Array.from(next).forEach((key) => {
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
          redFlagsDetected: redFlags.map((rf) => ('id' in rf ? rf.id : rf.description)),
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
          const displayText = 'displayText' in rf ? rf.displayText : rf.description
          analytics.redFlagDetected(syndrome.code, displayText, 'WARNING')
        })

        toast({
          title: 'Anamnese salva!',
          description: 'A anamnese foi salva no seu histórico.',
        })
      } catch (error) {
        anamneseLogger.error('Erro ao salvar anamnese', error, {
          syndromeId: syndrome.id,
          checkedItemsCount: selectedIds.size,
          outputMode,
          redFlagsCount: redFlags.length,
        })

        toast({
          title: 'Erro ao salvar',
          description: 'Ocorreu um erro ao salvar a anamnese. Tente novamente.',
          variant: 'destructive',
        })
      }
    })
  }

  const handleCopy = () => {
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
        analytics.anamneseCopied(syndrome.code, savedSessionId)
        await markSessionAsCopied(savedSessionId)
      } catch (error) {
        anamneseLogger.error('Erro ao copiar anamnese', error, {
          syndromeId: syndrome.code,
          sessionId: savedSessionId,
        })

        toast({
          title: 'Erro ao copiar',
          description: 'Ocorreu um erro ao copiar a anamnese. Tente novamente.',
          variant: 'destructive',
        })
      }
    })
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
      } catch (error) {
        anamneseLogger.error('Erro ao abrir chat', error, {
          sessionId: savedSessionId,
          syndromeId: syndrome.id,
        })

        toast({
          title: 'Erro ao abrir chat',
          description: 'Não foi possível iniciar o chat. Tente novamente.',
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <div className="grid gap-8 grid-cols-1 lg:grid-cols-[1fr,minmax(350px,450px)]">
      {/* Network Recovery Banner - spans full width */}
      <div className="lg:col-span-2">
        <NetworkRecoveryBanner
          isOnline={isOnline}
          status={autoSaveStatus}
          pendingChanges={pendingChanges}
          error={autoSaveError}
          onRetry={retryFailedSaves}
        />
      </div>

      {/* Network Status Toast (shows on status change) */}
      <NetworkStatusToast isOnline={isOnline} />

      {/* Left Panel - Checkboxes */}
      <div className="space-y-8">
        {/* Auto-Save Status Indicator */}
        {selectedIds.size > 0 && (
          <div className="flex items-center justify-end px-2">
            <AutoSaveIndicator
              status={autoSaveStatus}
              lastSavedAt={lastSavedAt}
              isOnline={isOnline}
              pendingChanges={pendingChanges}
              error={autoSaveError}
              onRetry={retryFailedSaves}
            />
          </div>
        )}

        {/* Complaint Selector - Task 5.6: Subtle glass for form containers */}
        <div className={cn(
          'relative overflow-hidden',
          'liquid-glass-2026-subtle',
          'rounded-2xl',
          'p-6'
        )}>
          <ComplaintSelector
            selectedComplaintId={selectedComplaintId}
            onComplaintSelect={handleComplaintSelect}
            onClear={handleComplaintClear}
          />
        </div>

        {/* Priority Checkboxes Panel - Task 5.6: Subtle glass for form containers */}
        {selectedComplaintId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'relative overflow-hidden',
              'liquid-glass-2026-subtle',
              'rounded-2xl',
              'p-6'
            )}
          >
            <PriorityCheckboxPanel
              complaintId={selectedComplaintId}
              selectedCheckboxes={prioritySelectedCheckboxes}
              onToggle={handlePriorityToggle}
            />
          </motion.div>
        )}

        {/* Mode Toggle and Main Controls - Task 5.6: Subtle glass for form controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-2">
          <div className={cn(
            'flex flex-wrap items-center gap-2'
          )}>
            {/* Mode Toggle */}
            <div className={cn(
              'flex items-center gap-2',
              'liquid-glass-2026-subtle',
              'rounded-lg',
              'p-2'
            )}>
              <button
                onClick={() => setOutputMode('SUMMARY')}
                className={cn(
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                  outputMode === 'SUMMARY'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                )}
              >
                Resumo
              </button>
              <button
                onClick={() => setOutputMode('DETAILED')}
                className={cn(
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                  outputMode === 'DETAILED'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                )}
              >
                Detalhado
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className={cn(
                'p-2 rounded-lg',
                'liquid-glass-2026-subtle',
                'hover:bg-muted',
                'transition-colors'
              )}
              title="Resetar seleção"
            >
              <RotateCcw className="h-5 w-5" />
            </button>

            <button
              onClick={handleSave}
              disabled={isPending || selectedIds.size === 0}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg',
                'bg-primary text-primary-foreground',
                'hover:bg-primary/90',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-colors'
              )}
            >
              <Save className="h-5 w-5" />
              {isPending ? 'Salvando...' : 'Salvar'}
            </button>

            <button
              onClick={handleCopy}
              disabled={!savedSessionId || isPending}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg',
                'liquid-glass-2026-subtle',
                'hover:bg-muted',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-colors'
              )}
              title="Copiar para área de transferência"
            >
              <FileText className="h-5 w-5" />
            </button>

            <button
              onClick={handleOpenChat}
              disabled={!savedSessionId || isPending}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg',
                'liquid-glass-2026-subtle',
                'hover:bg-muted',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-colors'
              )}
              title="Abrir chat com contexto da anamnese"
            >
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Export PDF Button */}
        <ExportPDFButton
          sessionId={savedSessionId}
          syndrome={syndrome}
          narrative={narrative}
          selectedCheckboxes={selectedCheckboxes}
          redFlags={redFlags}
          patientContext={patientContext}
        />
      </div>

      {/* Right Panel - Preview */}
      <div className="space-y-8">
        {/* Narrative Preview */}
        <div className={cn(
          'relative overflow-hidden',
          'liquid-glass-2026-subtle',
          'rounded-2xl',
          'p-6'
        )}>
          <h3 className="text-lg font-semibold mb-4">Narrativa Gerada</h3>
          <NarrativePreview narrative={narrative} />
        </div>

        {/* CFM Progress Indicator */}
        <CFMProgressIndicator
          selectedByCategory={selectedByCategory}
          totalByCategory={totalByCategory}
        />

        {/* Red Flags Alert */}
        {redFlags.length > 0 && (
          <RedFlagAlert redFlags={normalizedRedFlags} />
        )}

        {/* Emergency Warning Overlay */}
        {hasEmergency && (
          <EmergencyWarningOverlay
            emergencies={detectedEmergencies}
            highestSeverity={highestSeverity}
            requiresImmediateAction={requiresImmediateAction}
            onDismiss={dismissEmergency}
            onDismissAll={dismissAll}
          />
        )}
      </div>
    </div>
  )
}
