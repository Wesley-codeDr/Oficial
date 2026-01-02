import React, { useState, useMemo } from 'react'
import { FlashPatientEntry } from './FlashPatientEntry'
import { FlashTemplateSelection } from './FlashTemplateSelection'
import { FlashForm } from './FlashForm'
import { FlashPreview } from './FlashPreview'
import { AnamnesisWorkspace } from './AnamnesisWorkspace'
import { Patient } from '@/lib/types/medical'
import { generateFlashRecord, FlashInput } from '@/lib/data/flashTemplates'
import { ArrowLeft, Sparkles, Send, Activity, Brain } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FlashAnamnesisFlowProps {
  onExit: () => void
  patient: Patient
  setPatient: React.Dispatch<React.SetStateAction<Patient>>
}

type Step = 'identity' | 'selection' | 'workspace'

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
    setStep('workspace')
  }

  const handleFormUpdate = (data: FlashInput['dados_variaveis']) => {
    setVariables(data)
  }

  const generatedRecord = useMemo(() => {
    if (!selectedTemplateId) return null
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
  }, [selectedTemplateId, patient, variables])

  const steps = ['identity', 'selection', 'workspace'] as const;
  const currentIndex = steps.indexOf(step);

  return (
    <div className="h-full flex flex-col bg-white/20 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[40px] border border-white/40 dark:border-white/5 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-linear-to-b from-blue-500/5 to-transparent pointer-events-none" />
      
      {/* Continuous Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 z-50 flex gap-0.5 px-6 pt-4">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 h-1.5 rounded-full bg-slate-200/50 dark:bg-white/5 overflow-hidden">
            <motion.div 
              initial={false}
              animate={{ 
                width: i < currentIndex ? '100%' : i === currentIndex ? '100%' : '0%',
                opacity: i <= currentIndex ? 1 : 0.3,
                backgroundColor: i === currentIndex ? '#3b82f6' : i < currentIndex ? '#10b981' : '#cbd5e1'
              }}
              className="h-full rounded-full"
              transition={{ duration: 0.8, ease: "circOut" }}
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
            
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
               <Sparkles className="w-3.5 h-3.5 text-blue-500" />
               <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  Fase: {step === 'workspace' ? 'Documentação' : 'Triagem'}
               </span>
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
              <AnamnesisWorkspace
                leftContent={
                  <FlashForm
                    initialData={variables}
                    onUpdate={handleFormUpdate}
                    templateId={selectedTemplateId}
                    onSubmit={onExit}
                  />
                }
                rightContent={
                  <FlashPreview 
                    record={generatedRecord} 
                    onReset={onExit} 
                  />
                }
                sidebarContent={{
                  chat: <ChatAssistant />,
                  calculators: <RiskCalculators />
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// Sidebar Components
const ChatAssistant: React.FC = () => (
  <div className="h-full flex flex-col gap-6">
    <div className="flex-1 space-y-6">
      <div className="bg-blue-500/5 dark:bg-blue-500/10 p-5 rounded-[32px] rounded-tl-none border border-blue-500/20 shadow-sm">
        <p className="text-xs font-bold text-slate-700 dark:text-slate-100 leading-relaxed">
          Olá! Estou analisando os dados do paciente. Alguma dúvida sobre a conduta para este caso de <span className="text-blue-500 font-black italic">faringoamigdalite</span>?
        </p>
      </div>
      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md p-5 rounded-[32px] rounded-tr-none ml-auto max-w-[85%] border border-white/20 shadow-sm shrink-0">
        <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
           Quais as contraindicações para corticóide neste paciente?
        </p>
      </div>
    </div>
    <div className="relative mt-auto pb-4">
      <input 
        type="text" 
        placeholder="Perguntar à IA..."
        className="w-full bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-[24px] py-4 pl-5 pr-14 text-sm font-bold focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all placeholder:text-slate-400"
      />
      <button className="absolute right-2 top-2 w-11 h-11 bg-blue-600 text-white rounded-[18px] flex items-center justify-center shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all">
        <Send className="w-5 h-5" />
      </button>
    </div>
  </div>
)

const RiskCalculators: React.FC = () => (
  <div className="space-y-5">
    <CalculatorCard 
      icon={<Activity className="w-4 h-4" />}
      title="Centor Score (Modificado)"
      score="3 Pontos"
      risk="Risco: 28-35% de Strep A"
      color="text-amber-500"
    />
    <CalculatorCard 
      icon={<Brain className="w-4 h-4" />}
      title="qSOFA"
      score="0"
      risk="Baixo risco de sepse"
      color="text-emerald-500"
    />
  </div>
)

const CalculatorCard: React.FC<{ icon: React.ReactNode; title: string, score: string, risk: string, color: string }> = ({ icon, title, score, risk, color }) => (
  <div className="p-6 rounded-[32px] bg-white/20 dark:bg-white/5 border border-white/50 dark:border-white/10 shadow-lg backdrop-blur-md hover:bg-white/40 dark:hover:bg-white/10 transition-all cursor-pointer group">
    <div className="flex items-center gap-4 mb-3">
      <div className={`w-10 h-10 rounded-xl bg-slate-100/50 dark:bg-black/20 flex items-center justify-center ${color} shadow-inner`}>
        {icon}
      </div>
      <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{title}</h4>
    </div>
    <div className="flex items-end justify-between">
      <div className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter">{score}</div>
      <div className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-white/50 dark:bg-black/30 border border-white/20 ${color}`}>{risk}</div>
    </div>
  </div>
)
