'use client'

/**
 * Queixa Principal Page - Integrated Selection
 *
 * Unified page for chief complaint selection.
 * Flow: Context Header (collapsible) -> Group Grid -> Inline Expansion -> Anamnese
 */

import { useState, useEffect, useCallback } from 'react'
import { PatientContextHeader } from '@/components/chief-complaint/patient-context-header'
import { IntegratedComplaintSelection } from '@/components/chief-complaint/integrated-complaint-selection'
import {
  getChiefComplaintGroups,
  getComplaintsByGroup,
  getChiefComplaintById,
} from '@/lib/chief-complaint/actions'
import type {
  PatientContext,
  ChiefComplaintGroupWithCount,
  ChiefComplaintWithTags,
  ChiefComplaintWithRelations,
} from '@/types/chief-complaint'

export default function QueixaPage() {
  const [patientContext, setPatientContext] = useState<PatientContext | null>(null)
  const [groups, setGroups] = useState<ChiefComplaintGroupWithCount[]>([])
  const [loading, setLoading] = useState(true)

  // Load groups on mount
  useEffect(() => {
    getChiefComplaintGroups()
      .then(setGroups)
      .finally(() => setLoading(false))
  }, [])

  // Load context from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('chiefComplaintContext')
    if (stored) {
      try {
        setPatientContext(JSON.parse(stored))
      } catch {
        // Ignore parse errors
      }
    }
  }, [])

  // Callback to load complaints for a group
  const handleLoadComplaints = useCallback(async (groupCode: string): Promise<ChiefComplaintWithTags[]> => {
    return getComplaintsByGroup(groupCode)
  }, [])

  // Callback to load complaint details
  const handleLoadComplaintDetails = useCallback(async (complaintId: string): Promise<ChiefComplaintWithRelations> => {
    const complaint = await getChiefComplaintById(complaintId)
    if (!complaint) {
      throw new Error('Complaint not found')
    }
    return complaint
  }, [])

  // Handle context change
  const handleContextChange = useCallback((context: PatientContext) => {
    setPatientContext(context)
    sessionStorage.setItem('chiefComplaintContext', JSON.stringify(context))
  }, [])

  return (
    <div className="container mx-auto max-w-6xl space-y-6 py-6 px-4">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-[28px] font-bold tracking-tight text-slate-900 dark:text-white">
          Queixa Principal
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Selecione o grupo e a queixa principal para iniciar a anamnese.
        </p>
      </div>

      {/* Patient Context Header - Collapsible */}
      <PatientContextHeader
        context={patientContext}
        onContextChange={handleContextChange}
      />

      {/* Main Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="size-8 animate-spin rounded-full border-4 border-ios-blue border-t-transparent" />
            <span className="text-sm text-slate-400">Carregando grupos...</span>
          </div>
        </div>
      ) : (
        <IntegratedComplaintSelection
          groups={groups}
          patientContext={patientContext}
          onLoadComplaints={handleLoadComplaints}
          onLoadComplaintDetails={handleLoadComplaintDetails}
        />
      )}
    </div>
  )
}
