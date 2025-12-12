'use client'

/**
 * Queixa Principal Page
 *
 * Main entry point for chief complaint selection.
 * Flow: Context Selection -> Group Selection -> Complaint List -> Detail
 */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GlassCard } from '@/components/ui/glass-card'
import { ContextSelector, GroupSelector } from '@/components/chief-complaint'
import { getChiefComplaintGroups } from '@/lib/chief-complaint/actions'
import type { PatientContext, ChiefComplaintGroupWithCount } from '@/types/chief-complaint'

type Step = 'context' | 'groups'

export default function QueixaPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('context')
  const [patientContext, setPatientContext] = useState<PatientContext | null>(null)
  const [groups, setGroups] = useState<ChiefComplaintGroupWithCount[]>([])
  const [loading, setLoading] = useState(false)

  // Load groups when moving to group selection
  useEffect(() => {
    if (step === 'groups' && groups.length === 0) {
      setLoading(true)
      getChiefComplaintGroups()
        .then(setGroups)
        .finally(() => setLoading(false))
    }
  }, [step, groups.length])

  const handleContextSelect = (context: PatientContext) => {
    setPatientContext(context)
    setStep('groups')
  }

  const handleGroupSelect = (groupCode: string) => {
    if (patientContext) {
      // Store context in sessionStorage for use in nested pages
      sessionStorage.setItem('chiefComplaintContext', JSON.stringify(patientContext))
      router.push(`/queixa/${groupCode.toLowerCase()}`)
    }
  }

  return (
    <div className="container mx-auto max-w-6xl space-y-8 py-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Queixa Principal</h1>
        <p className="text-muted-foreground">
          {step === 'context'
            ? 'Selecione o contexto do paciente para continuar.'
            : 'Selecione o grupo da queixa principal.'}
        </p>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center gap-4">
        <div
          className={`flex items-center gap-2 ${step === 'context' ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <div
            className={`flex size-8 items-center justify-center rounded-full ${step === 'context' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
          >
            1
          </div>
          <span className="text-sm font-medium">Contexto</span>
        </div>
        <div className="h-px flex-1 bg-border" />
        <div
          className={`flex items-center gap-2 ${step === 'groups' ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <div
            className={`flex size-8 items-center justify-center rounded-full ${step === 'groups' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
          >
            2
          </div>
          <span className="text-sm font-medium">Grupo</span>
        </div>
        <div className="h-px flex-1 bg-border" />
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="flex size-8 items-center justify-center rounded-full bg-muted">3</div>
          <span className="text-sm font-medium">Queixa</span>
        </div>
        <div className="h-px flex-1 bg-border" />
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="flex size-8 items-center justify-center rounded-full bg-muted">4</div>
          <span className="text-sm font-medium">Confirmar</span>
        </div>
      </div>

      {/* Content */}
      <GlassCard hover={false} className="p-6">
        {step === 'context' && <ContextSelector onSelect={handleContextSelect} />}

        {step === 'groups' && patientContext && (
          <>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : (
              <GroupSelector
                groups={groups}
                patientContext={patientContext}
                onSelect={handleGroupSelect}
              />
            )}
          </>
        )}
      </GlassCard>
    </div>
  )
}
