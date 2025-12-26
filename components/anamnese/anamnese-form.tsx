'use client'

import { useState, useMemo, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { CheckboxCategory } from '@prisma/client'
import { Save, RotateCcw, FileText, List, MessageSquare } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CheckboxGroup } from './checkbox-group'
import { NarrativePreview } from './narrative-preview'
import { RedFlagAlert } from './red-flag-alert'
import { generateNarrative, detectRedFlags, type OutputMode } from '@/lib/anamnese/generate-narrative'
import { saveAnamneseSession, markSessionAsCopied } from '@/lib/anamnese/actions'
import { useToast } from '@/hooks/use-toast'
import { analytics } from '@/lib/analytics'
import { usePatientStore } from '@/stores/patient-store'

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

  // Generate narrative
  const narrative = useMemo(() => {
    return generateNarrative(selectedCheckboxes, outputMode, patientContext)
  }, [selectedCheckboxes, outputMode, patientContext])

  // Detect red flags
  const redFlags = useMemo(() => {
    return detectRedFlags(selectedCheckboxes)
  }, [selectedCheckboxes])

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
      } catch (error) {
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
        } catch (error) {
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
      } catch (error) {
        toast({
          title: 'Erro ao abrir chat',
          description: 'Nao foi possivel iniciar o chat. Tente novamente.',
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
      {/* Left Panel - Checkboxes */}
      <div className="space-y-6">
        {/* Mode Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={outputMode === 'SUMMARY' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setOutputMode('SUMMARY')}
          >
            <List className="mr-2 h-4 w-4" />
            Resumido (PS)
          </Button>
          <Button
            variant={outputMode === 'DETAILED' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setOutputMode('DETAILED')}
          >
            <FileText className="mr-2 h-4 w-4" />
            Detalhado
          </Button>
        </div>

        {/* Red Flag Alert */}
        <RedFlagAlert redFlags={redFlags} />

        {/* Checkbox Groups */}
        <div className="space-y-8">
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

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 border-t pt-6">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={selectedIds.size === 0}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Limpar
          </Button>
          <Button onClick={handleSave} disabled={isPending || selectedIds.size === 0}>
            <Save className="mr-2 h-4 w-4" />
            {isPending ? 'Salvando...' : 'Salvar'}
          </Button>
          <Button
            variant="secondary"
            onClick={handleOpenChat}
            disabled={isPending || !savedSessionId}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat EBM
          </Button>
          <div className="ml-auto text-sm text-muted-foreground">
            {selectedIds.size} item{selectedIds.size !== 1 ? 's' : ''} selecionado
            {selectedIds.size !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-120px)]">
        <NarrativePreview
          narrative={narrative}
          redFlagCount={redFlags.length}
          onCopy={handleCopy}
          className="h-full"
        />
      </div>
    </div>
  )
}
