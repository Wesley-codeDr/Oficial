import React, { useState, useMemo } from 'react'
import { FlashPatientEntry } from './FlashPatientEntry'
import { FlashTemplateSelection } from './FlashTemplateSelection'
import { FlashForm } from './FlashForm'
import { FlashPreview } from './FlashPreview'
import { AnamnesisWorkspace } from './AnamnesisWorkspace'
import { Patient } from '@/lib/types/medical'
import { generateFlashRecord, FlashInput, flashTemplates } from '@/lib/data/flashTemplates'
import {
  getCheckboxesForTemplate,
} from '@/lib/data/flashCheckboxes'
import { generateProfessionalMedicalText } from '@/lib/data/flashTextGenerator'
import { ArrowLeft, Sparkles, MessageSquare, Calculator, User, Baby } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatWell } from './ChatWell'
import { HeartScoreCalculator } from './HeartScoreCalculator'
import { applePhysics } from '@/lib/design-system/animation-tokens'

interface FlashAnamnesisFlowProps {
  onExit: () => void
  patient: Patient
  setPatient: React.Dispatch<React.SetStateAction<Patient>>
  onApplyScore?: (scoreResult: string) => void
}

type Step = 'identity' | 'selection' | 'workspace'

export const FlashAnamnesisFlow: React.FC<FlashAnamnesisFlowProps> = ({
  onExit,
  patient,
  setPatient,
  onApplyScore
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

  // Estado para checkboxes específicos por queixa
  const [checkedBoxes, setCheckedBoxes] = useState<Set<string>>(new Set())

  const [activeTool, setActiveTool] = useState<'chat' | 'calculators' | null>(null)

  const handleApplyScoreInternal = (scoreResult: string) => {
    // Append score to the current variables or handle as a separate field if applicable
    // In Flash flow, we might want to append to a general 'observacoes' field if exists
    // For now, potentially pass it up if onApplyScore is provided
    if (onApplyScore) {
      onApplyScore(scoreResult)
    }
    setActiveTool(null)
  }

  const handleIdentityComplete = (data: {
    category: 'adult' | 'pediatric'
    gender: 'M' | 'F'
    isPregnant: boolean
    age?: number
    phone?: string
    allergies?: string
  }) => {
    setPatient((prev) => ({
      ...prev,
      category: data.category,
      gender: data.gender,
      isPregnant: data.isPregnant,
      age: data.age?.toString() || prev.age,
      phoneNumber: data.phone || prev.phoneNumber,
      allergies: data.allergies ? [data.allergies] : prev.allergies
    }))
    setStep('selection')
  }

  const handleTemplateSelect = (id: string) => {
    handleTemplateSelectInternal(id)
  }

  const handleFormUpdate = (data: FlashInput['dados_variaveis']) => {
    setVariables(data)
  }

  const handleCheckboxChange = (newCheckedIds: Set<string>) => {
    setCheckedBoxes(newCheckedIds)
  }

  // Reset checkboxes when template changes
  const handleTemplateSelectInternal = (id: string) => {
    setSelectedTemplateId(id)
    setCheckedBoxes(new Set()) // Reset checkboxes for new template
    setStep('workspace')
  }

  const generatedRecord = useMemo(() => {
    if (!selectedTemplateId) return null

    // Obtém checkboxes do template
    const templateCheckboxes = getCheckboxesForTemplate(selectedTemplateId)

    // Se tem checkboxes específicos, usa o gerador de texto profissional
    if (templateCheckboxes.length > 0 && checkedBoxes.size > 0) {
      // Gera texto médico profissional
      const professionalText = generateProfessionalMedicalText({
        templateId: selectedTemplateId,
        checkedIds: checkedBoxes,
        gender: patient.gender,
        variables: variables as Record<string, string>,
      })

      // Obtém CID do template base
      const templateData = flashTemplates[selectedTemplateId]
      const cid = templateData?.template?.cid || ''
      const cidDescricao = templateData?.template?.cid_descricao || ''

      return {
        queixa_principal: professionalText.queixa_principal,
        exame_fisico: professionalText.exame_fisico,
        hipotese_diagnostica: professionalText.hipotese_diagnostica,
        conduta: professionalText.conduta,
        cid: cid,
        cid_descricao: cidDescricao,
      }
    }

    // Fallback para geração padrão do template (quando não há checkboxes marcados)
    return generateFlashRecord({
      paciente: {
        sexo: patient.gender,
        idade: patient.age,
        unidade_idade: 'anos',
        gestante: patient.isPregnant,
      },
      queixa_selecionada: selectedTemplateId,
      dados_variaveis: variables,
    })
  }, [selectedTemplateId, patient, variables, checkedBoxes])

  const steps = ['identity', 'selection', 'workspace'] as const;
  const currentIndex = steps.indexOf(step);

  return (
    <div className="h-full flex flex-col glass-elevated rounded-[40px] border border-white/40 dark:border-white/5 shadow-2xl overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none z-50 rounded-[40px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-linear-to-b from-blue-500/5 to-transparent pointer-events-none" />
      
      {/* Continuous Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 z-50 flex gap-1 px-8 pt-5">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 h-1 rounded-full bg-slate-200/30 dark:bg-white/10 overflow-hidden relative border border-white/5">
            <motion.div 
              initial={false}
              animate={{ 
                width: i < currentIndex ? '100%' : i === currentIndex ? '100%' : '0%',
                opacity: i <= currentIndex ? 1 : 0.3,
                backgroundColor: i === currentIndex ? '#3b82f6' : i < currentIndex ? '#10b981' : '#cbd5e1'
              }}
              className="h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              transition={{ ...applePhysics.layout, duration: 0.8 }}
            />
          </div>
        ))}
      </div>

      {/* Navigation Header */}
      <AnimatePresence>
        {step !== 'identity' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="shrink-0 px-8 pt-10 pb-2 flex items-center justify-between z-20"
          >
            <button
              onClick={() => {
                if (step === 'selection') setStep('identity')
                else if (step === 'workspace') setStep('selection')
              }}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-full bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/10 flex items-center justify-center text-slate-500 group-hover:text-blue-500 transition-all group-hover:scale-105 active:scale-95 shadow-sm">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="font-black text-[11px] uppercase tracking-widest text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors">Voltar</span>
            </button>
            
            <div className="flex items-center gap-4">
              {/* Contextual Patient Info - REPLICADO DO HEADER */}
              <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/5 border border-white/20">
                <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                  {patient.category === 'pediatric' ? <Baby className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{patient.age || '--'} ANOS</span>
                  <div className="w-px h-3 bg-white/20" />
                  <span className={`text-[10px] font-black uppercase ${patient.gender === 'F' ? 'text-pink-500' : 'text-blue-500'}`}>{patient.gender === 'F' ? 'FEM' : 'MASC'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                 <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                 <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    Fase: {step === 'workspace' ? 'Documentação' : 'Triagem'}
                 </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)', y: 10 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)', y: -10, position: 'absolute', width: '100%', height: '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            {step === 'identity' && <FlashPatientEntry onComplete={handleIdentityComplete} />}
            {step === 'selection' && <FlashTemplateSelection onSelect={handleTemplateSelect} />}
            {step === 'workspace' && selectedTemplateId && generatedRecord && (
              <div className="h-full relative overflow-hidden">
                <AnamnesisWorkspace
                  activeTool={activeTool}
                  onActiveToolChange={setActiveTool}
                  leftContent={
                    <FlashForm
                      initialData={variables}
                      onUpdate={handleFormUpdate}
                      templateId={selectedTemplateId}
                      onSubmit={onExit}
                      checkedBoxes={checkedBoxes}
                      onCheckboxChange={handleCheckboxChange}
                    />
                  }
                  rightContent={
                    <div className="h-full flex flex-col relative">
                      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
                        <FlashPreview
                          record={generatedRecord}
                          onReset={onExit}
                        />
                      </div>

                      {/* Floating Tools Toolbar (VisionOS Style) - REPLICADO DA ANAMNESE */}
                      <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none z-50">
                        <div className="flex items-center gap-1.5 p-1.5 liquid-glass-material bg-white/40! dark:bg-black/40! backdrop-blur-3xl rounded-[26px] border border-white/40 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] pointer-events-auto group/toolbar">
                            {/* Chat Button */}
                            <button
                              onClick={() => setActiveTool(activeTool === 'chat' ? null : 'chat')}
                              className={`
                                h-12 px-5 rounded-[20px] flex items-center gap-2.5 transition-all duration-500 relative overflow-hidden group/btn
                                ${activeTool === 'chat' 
                                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-105' 
                                  : 'bg-transparent text-slate-500 hover:bg-white/20 hover:text-slate-900 dark:hover:text-white'}
                              `}
                            >
                              <MessageSquare className={`w-5 h-5 transition-transform duration-500 ${activeTool === 'chat' ? 'scale-110' : 'group-hover/btn:rotate-12'}`} />
                              <span className="text-[12px] font-black uppercase tracking-widest">ChatWW</span>
                              {activeTool === 'chat' && (
                                <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent pointer-events-none animate-in fade-in duration-300" />
                              )}
                            </button>

                            <div className="w-px h-6 bg-white/10 mx-0.5" />

                            {/* Score Button */}
                            <button
                              onClick={() => setActiveTool(activeTool === 'calculators' ? null : 'calculators')}
                              className={`
                                h-12 px-5 rounded-[20px] flex items-center gap-2.5 transition-all duration-500 relative overflow-hidden group/btn
                                ${activeTool === 'calculators' 
                                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/40 scale-105' 
                                  : 'bg-transparent text-slate-500 hover:bg-white/20 hover:text-slate-900 dark:hover:text-white'}
                              `}
                            >
                              <Calculator className={`w-5 h-5 transition-transform duration-500 ${activeTool === 'calculators' ? 'scale-110' : 'group-hover/btn:rotate-12'}`} />
                              <span className="text-[12px] font-black uppercase tracking-widest">Scores</span>
                              {activeTool === 'calculators' && (
                                <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent pointer-events-none animate-in fade-in duration-300" />
                              )}
                            </button>
                        </div>
                      </div>
                    </div>
                  }
                  sidebarContent={{
                    chat: <ChatWell />,
                    calculators: (
                      <HeartScoreCalculator 
                        isOpen={true}
                        onClose={() => setActiveTool(null)}
                        patient={patient}
                        onApply={handleApplyScoreInternal}
                      />
                    )
                  }}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

