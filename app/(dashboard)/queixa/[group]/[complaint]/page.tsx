'use client'

/**
 * Complaint Detail Page
 *
 * Shows detailed information about a selected chief complaint.
 * Allows confirmation and navigation to anamnese or calculator.
 */

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { GlassCard } from '@/components/ui/glass-card'
import { ComplaintDetail } from '@/components/chief-complaint'
import { getChiefComplaintByCode, createChiefComplaintSession } from '@/lib/chief-complaint/actions'
import type { PatientContext, ChiefComplaintWithRelations } from '@/types/chief-complaint'

interface PageProps {
  params: Promise<{ group: string; complaint: string }>
}

export default function ComplaintPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [complaint, setComplaint] = useState<ChiefComplaintWithRelations | null>(null)
  const [patientContext, setPatientContext] = useState<PatientContext | null>(null)
  const [loading, setLoading] = useState(true)
  const [confirming, setConfirming] = useState(false)

  useEffect(() => {
    // Get patient context from sessionStorage
    const storedContext = sessionStorage.getItem('chiefComplaintContext')
    if (storedContext) {
      setPatientContext(JSON.parse(storedContext))
    } else {
      // Redirect back to main page if no context
      router.push('/queixa')
      return
    }

    // Load complaint
    const loadData = async () => {
      setLoading(true)
      const complaintCode = resolvedParams.complaint.toUpperCase()
      const complaintData = await getChiefComplaintByCode(complaintCode)

      if (complaintData) {
        setComplaint(complaintData)
      } else {
        router.push(`/queixa/${resolvedParams.group}`)
      }
      setLoading(false)
    }

    loadData()
  }, [resolvedParams.complaint, resolvedParams.group, router])

  const handleConfirm = async () => {
    if (!complaint || !patientContext) return

    setConfirming(true)
    try {
      // TODO: Get actual user ID from auth
      // For now, we'll just redirect to anamnese if syndrome linked
      if (complaint.syndrome) {
        router.push(`/anamnese/${complaint.syndrome.code.toLowerCase()}`)
      } else {
        // Show success message and redirect to dashboard
        router.push('/dashboard')
      }
    } finally {
      setConfirming(false)
    }
  }

  const handleBack = () => {
    router.push(`/queixa/${resolvedParams.group}`)
  }

  const handleStartAnamnese = () => {
    if (complaint?.syndrome) {
      router.push(`/anamnese/${complaint.syndrome.code.toLowerCase()}`)
    }
  }

  const handleOpenCalculator = (calculatorId: string) => {
    // Open calculator in new tab or modal
    // TODO: Implement calculator route
    window.open(`/calculadoras/${calculatorId}`, '_blank')
  }

  if (loading || !complaint || !patientContext) {
    return (
      <div className="container mx-auto max-w-4xl py-8">
        <GlassCard hover={false} className="p-6">
          <div className="flex items-center justify-center py-12">
            <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </GlassCard>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl space-y-8 py-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Queixa Principal</h1>
        <p className="text-muted-foreground">Confirme a selecao da queixa principal.</p>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="flex size-8 items-center justify-center rounded-full bg-green-500 text-white">
            ✓
          </div>
          <span className="text-sm font-medium">Contexto</span>
        </div>
        <div className="h-px flex-1 bg-border" />
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="flex size-8 items-center justify-center rounded-full bg-green-500 text-white">
            ✓
          </div>
          <span className="text-sm font-medium">Grupo</span>
        </div>
        <div className="h-px flex-1 bg-border" />
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="flex size-8 items-center justify-center rounded-full bg-green-500 text-white">
            ✓
          </div>
          <span className="text-sm font-medium">Queixa</span>
        </div>
        <div className="h-px flex-1 bg-border" />
        <div className="flex items-center gap-2 text-primary">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            4
          </div>
          <span className="text-sm font-medium">Confirmar</span>
        </div>
      </div>

      {/* Content */}
      <GlassCard hover={false} className="p-6">
        <ComplaintDetail
          complaint={complaint}
          patientContext={patientContext}
          onConfirm={handleConfirm}
          onBack={handleBack}
          onStartAnamnese={complaint.syndrome ? handleStartAnamnese : undefined}
          onOpenCalculator={complaint.defaultCalculatorId ? handleOpenCalculator : undefined}
        />
      </GlassCard>

      {confirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}
    </div>
  )
}
