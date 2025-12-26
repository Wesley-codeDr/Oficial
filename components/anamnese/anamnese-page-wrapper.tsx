'use client'

import { useState, useEffect } from 'react'
import { usePatientStore } from '@/stores/patient-store'
import { AnamneseForm } from './anamnese-form'
import { PatientContextModal } from './patient-context-modal'
import type { CheckboxCategory } from '@prisma/client'

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

interface AnamnesePageWrapperProps {
  syndrome: SyndromeData
}

export function AnamnesePageWrapper({ syndrome }: AnamnesePageWrapperProps) {
  const { isContextSet, reset } = usePatientStore()
  const [showModal, setShowModal] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // Check if context is set on mount
  useEffect(() => {
    // Reset context for each new anamnese session
    // This ensures the user always sets the context for the current patient
    reset()
    setShowModal(true)
    setIsReady(true)
  }, [reset])

  const handleModalComplete = () => {
    setShowModal(false)
  }

  // Don't render anything until we've checked the store
  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    )
  }

  return (
    <>
      <PatientContextModal isOpen={showModal} onComplete={handleModalComplete} />
      {!showModal && <AnamneseForm syndrome={syndrome} />}
    </>
  )
}
