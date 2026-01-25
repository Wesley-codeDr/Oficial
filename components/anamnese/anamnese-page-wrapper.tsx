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

export function AnamnesePageWrapper({ syndrome }: { syndrome: SyndromeData }) {
  const { reset } = usePatientStore()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Check if context is set on mount
  useEffect(() => {
    // Reset context for each new anamnese session
    // This ensures user always sets context for current patient
    reset()
    setIsModalOpen(true)
  }, [reset])

  const handleModalComplete = () => {
    setIsModalOpen(false)
  }

  // Don't render anything until we've checked the store
  if (!isModalOpen) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    )
  }

  return (
    <>
      <PatientContextModal isOpen={isModalOpen} onComplete={handleModalComplete} />
      {!isModalOpen && <AnamneseForm syndrome={syndrome} />}
    </>
  )
}
