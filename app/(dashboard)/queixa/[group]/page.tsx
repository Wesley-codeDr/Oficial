'use client'

/**
 * Group Complaints Page
 *
 * Displays list of chief complaints for a specific group.
 * Allows filtering and selection of a complaint.
 */

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { GlassCard } from '@/components/ui/glass-card'
import { ComplaintList } from '@/components/chief-complaint'
import {
  getChiefComplaintGroupByCode,
  getComplaintsByGroup,
} from '@/lib/chief-complaint/actions'
import type {
  PatientContext,
  ChiefComplaintGroup,
  ChiefComplaintWithTags,
} from '@/types/chief-complaint'

interface PageProps {
  params: Promise<{ group: string }>
}

export default function GroupPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [group, setGroup] = useState<ChiefComplaintGroup | null>(null)
  const [complaints, setComplaints] = useState<ChiefComplaintWithTags[]>([])
  const [patientContext, setPatientContext] = useState<PatientContext | null>(null)
  const [loading, setLoading] = useState(true)

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

    // Load group and complaints
    const loadData = async () => {
      setLoading(true)
      const groupCode = resolvedParams.group.toUpperCase()
      const [groupData, complaintsData] = await Promise.all([
        getChiefComplaintGroupByCode(groupCode),
        getComplaintsByGroup(groupCode),
      ])

      if (groupData) {
        setGroup(groupData)
        setComplaints(complaintsData)
      } else {
        router.push('/queixa')
      }
      setLoading(false)
    }

    loadData()
  }, [resolvedParams.group, router])

  const handleSelectComplaint = (complaint: ChiefComplaintWithTags) => {
    router.push(`/queixa/${resolvedParams.group}/${complaint.code.toLowerCase()}`)
  }

  const handleBack = () => {
    router.push('/queixa')
  }

  if (loading || !group || !patientContext) {
    return (
      <div className="container mx-auto max-w-6xl py-8">
        <GlassCard hover={false} className="p-6">
          <div className="flex items-center justify-center py-12">
            <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </GlassCard>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-6xl space-y-8 py-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Queixa Principal</h1>
        <p className="text-muted-foreground">Selecione a queixa especifica do paciente.</p>
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
        <div className="flex items-center gap-2 text-primary">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            3
          </div>
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
        <ComplaintList
          group={group}
          complaints={complaints}
          patientContext={patientContext}
          onSelect={handleSelectComplaint}
          onBack={handleBack}
        />
      </GlassCard>
    </div>
  )
}
