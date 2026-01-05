'use client'

import React, { useState } from 'react'
import { User, ChevronRight, Phone as PhoneIcon, ShieldAlert, Calculator, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePatientStore } from '@/stores/patient-store'

interface PatientContextModalProps {
  isOpen: boolean
  onComplete: () => void
}

export const PatientContextModal: React.FC<PatientContextModalProps> = ({
  isOpen,
  onComplete,
}) => {
  const { setContext, markContextSet } = usePatientStore()

  const [gender, setGender] = useState<'M' | 'F'>('M')
  const [isPediatric, setIsPediatric] = useState(false)
  const [age, setAge] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [allergies, setAllergies] = useState<string>('')
  const [painIntensity, setPainIntensity] = useState(0)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [evolutionType, setEvolutionType] = useState<'agudo' | 'subagudo' | 'crônico' | undefined>()
  const [onsetType, setOnsetType] = useState<'súbito' | 'progressivo' | 'insidioso' | undefined>()

  if (!isOpen) return null

  const handleComplete = () => {
    setContext({
      gender,
      isPediatric: age ? parseInt(age) < 18 : isPediatric,
      age,
      phoneNumber: phone,
      allergies,
      painIntensity: painIntensity > 0 ? painIntensity : undefined,
      evolutionType,
      onsetType,
    })
    markContextSet()
    onComplete()
  }

  const intensityLabel = (value: number): string => {
    if (value === 0) return 'Sem dor'
    if (value <= 3) return 'Leve'
    if (value <= 6) return 'Moderada'
    return 'Intensa'
  }

  const getIntensityColorClass = (value: number) => {
    if (value === 0) return 'text-slate-500 bg-slate-100 dark:bg-slate-800'
    if (value <= 3) return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30'
    if (value <= 6) return 'text-amber-500 bg-amber-500/10 border-amber-500/30'
    return 'text-rose-500 bg-rose-500/10 border-rose-500/30'
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
        className="w-full max-w-md bg-white/70 dark:bg-[#1c1c1e]/60 backdrop-blur-[60px] rounded-[48px] shadow-2xl border border-white/40 dark:border-white/10 overflow-hidden z-10"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/20 dark:border-white/5 bg-white/20 dark:bg-white/5">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/20">
              <User className="w-5 h-5" />
            </div>
            <div>
               <h2 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
                Contexto Clínico
              </h2>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.2em]">
                Otimizando a Narrativa
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          
          {/* 1. Sexo e Idade */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              1. Identificação Essencial
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setGender('M')}
                className={`flex flex-col items-center justify-center gap-2 p-5 rounded-[32px] border transition-all duration-300
                  ${gender === 'M' 
                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-600 dark:text-blue-400' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
              >
                <span className="text-2xl font-black">♂</span>
                <span className="text-xs font-black uppercase tracking-widest">Homem</span>
              </button>
              <button
                onClick={() => setGender('F')}
                className={`flex flex-col items-center justify-center gap-2 p-5 rounded-[32px] border transition-all duration-300
                  ${gender === 'F' 
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-600 dark:text-rose-400' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
              >
                <span className="text-2xl font-black">♀</span>
                <span className="text-xs font-black uppercase tracking-widest">Mulher</span>
              </button>
            </div>

            <div className="relative group">
                <input 
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Idade (opcional)"
                  className="w-full age-input-glass pl-12 text-sm"
                />
                <Calculator className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">ANOS</span>
            </div>
          </section>

          {/* 2. Contato e Alergias */}
          <section className="space-y-3">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              2. Informações Adicionais
            </h3>
            <div className="grid grid-cols-1 gap-3">
                <div className="relative group">
                    <input 
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Telefone (opcional)"
                      className="w-full age-input-glass pl-10 text-sm"
                    />
                    <PhoneIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <div className="relative group">
                    <input 
                      type="text"
                      value={allergies}
                      onChange={(e) => setAllergies(e.target.value)}
                      placeholder="Alergias (opcional)"
                      className="w-full age-input-glass pl-10 text-sm"
                    />
                    <ShieldAlert className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
                </div>
            </div>
          </section>

          {/* 3. Dor */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                3. Intensidade da Dor
              </h3>
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${getIntensityColorClass(painIntensity)}`}>
                {intensityLabel(painIntensity)}
              </div>
            </div>
            
            <div className="relative h-12 flex items-center">
              <input
                type="range"
                min="0" max="10"
                value={painIntensity}
                onChange={(e) => setPainIntensity(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500"
              />
              <div className="absolute -bottom-1 w-full flex justify-between px-0.5 pointer-events-none">
                {[0, 2, 4, 6, 8, 10].map(val => (
                  <span key={val} className="text-[8px] font-black text-slate-400">{val}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Advanced Toggles */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 hover:text-blue-600 transition-colors"
            >
              <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${showAdvanced ? 'rotate-90' : ''}`} />
              Parâmetros Avançados
            </button>

            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6 overflow-hidden"
                >
                  <section className="space-y-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Evolução</p>
                    <div className="flex gap-2">
                      {(['agudo', 'subagudo', 'crônico'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setEvolutionType(evolutionType === type ? undefined : type)}
                          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase border transition-all
                            ${evolutionType === type ? 'bg-blue-500 text-white border-transparent' : 'bg-white/5 border-white/10 text-slate-400'}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Início</p>
                    <div className="flex gap-2">
                      {(['súbito', 'progressivo', 'insidioso'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setOnsetType(onsetType === type ? undefined : type)}
                          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase border transition-all
                            ${onsetType === type ? 'bg-blue-500 text-white border-transparent' : 'bg-white/5 border-white/10 text-slate-400'}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 pt-4">
          <button
            onClick={handleComplete}
            className="w-full py-5 rounded-[24px] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
          >
            Iniciar Anamnese
          </button>
          <div className="mt-4 flex items-center justify-center gap-2 opacity-40">
               <Info className="w-3 h-3" />
               <p className="text-[8px] font-black uppercase tracking-widest">Identificação Básica Opcional</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
