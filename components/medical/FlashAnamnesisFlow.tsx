import React, { useState } from 'react'
import { FlashPatientEntry } from './FlashPatientEntry'
import { FlashTemplateSelection } from './FlashTemplateSelection'
import { FlashForm } from './FlashForm'
import { FlashPreview } from './FlashPreview'
import { Patient } from '@/lib/types/medical'
import { generateFlashRecord, FlashInput } from '@/lib/data/flashTemplates'
import { ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FlashAnamnesisFlowProps {
  onExit: () => void
  patient: Patient
  setPatient: React.Dispatch<React.SetStateAction<Patient>>
}

type Step = 'identity' | 'selection' | 'form' | 'preview'

export const FlashAnamnesisFlow: React.FC<FlashAnamnesisFlowProps> = ({
  onExit,
  patient,
  setPatient,
}) => {
  const [step, setStep] = useState<Step>('identity')
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  const [variables, setVariables] = useState<FlashInput['dados_variaveis']>({
    tempo_sintomas: '',
    temperatura: '',
    pa_sistolica: '',
    pa_diastolica: '',
    fc: '',
    fr: '',
    spo2: '',
    glasgow: '15',
    centor_score: '',
  })

  const handleIdentityComplete = (data: {
    category: 'adult' | 'pediatric'
    gender: 'M' | 'F'
    isPregnant: boolean
  }) => {
    setPatient((prev) => ({
      ...prev,
      category: data.category,
      gender: data.gender,
      isPregnant: data.isPregnant,
    }))
    setStep('selection')
  }

  const handleTemplateSelect = (id: string) => {
    setSelectedTemplateId(id)
    setStep('form')
  }

  const handleFormSubmit = (data: FlashInput['dados_variaveis']) => {
    setVariables(data)
    setStep('preview')
  }

  const generatedRecord = selectedTemplateId
    ? generateFlashRecord({
        paciente: {
          sexo: patient.gender,
          idade: patient.age,
          unidade_idade: 'anos',
          gestante: patient.isPregnant,
        },
        queixa_selecionada: selectedTemplateId,
        dados_variaveis: variables,
      })
    : null

  return (
    <div className="h-full flex flex-col bg-white/40 dark:bg-slate-800/40 backdrop-blur-3xl backdrop-saturate-[180%] rounded-[36px] border border-white/60 dark:border-white/5 shadow-sm overflow-hidden animate-in fade-in zoom-in-[0.99] duration-300">
      {/* Header / Navigation */}
      {step !== 'identity' && (
        <div className="shrink-0 px-6 pt-6 pb-2 flex items-center justify-between z-20">
          <button
            onClick={() => {
              if (step === 'selection') setStep('identity')
              else if (step === 'form') setStep('selection')
              else if (step === 'preview') setStep('form')
            }}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold">Voltar</span>
          </button>
          <div className="flex gap-1">
            {['identity', 'selection', 'form', 'preview'].map((s, i) => {
              const currentIndex = ['identity', 'selection', 'form', 'preview'].indexOf(step)
              const isActive = i <= currentIndex
              return (
                <div
                  key={s}
                  className={`h-1.5 w-8 rounded-full transition-all duration-500 ${isActive ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-700'}`}
                />
              )
            })}
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {/* STEP 1: IDENTITY */}
          {step === 'identity' && (
            <motion.div
              key="identity"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <FlashPatientEntry onComplete={handleIdentityComplete} />
            </motion.div>
          )}

          {/* STEP 2: SELECTION */}
          {step === 'selection' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <FlashTemplateSelection onSelect={handleTemplateSelect} />
            </motion.div>
          )}

          {/* STEP 3: FORM */}
          {step === 'form' && selectedTemplateId && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <FlashForm
                initialData={variables}
                onSubmit={handleFormSubmit}
                templateId={selectedTemplateId}
              />
            </motion.div>
          )}

          {/* STEP 4: PREVIEW */}
          {step === 'preview' && generatedRecord && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <FlashPreview record={generatedRecord} onReset={() => onExit()} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
