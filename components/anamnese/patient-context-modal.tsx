'use client'

import React, { useState } from 'react'
import { User, Baby, ChevronRight } from 'lucide-react'
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
  const [painIntensity, setPainIntensity] = useState(0)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [evolutionType, setEvolutionType] = useState<'agudo' | 'subagudo' | 'crônico' | undefined>()
  const [onsetType, setOnsetType] = useState<'súbito' | 'progressivo' | 'insidioso' | undefined>()

  if (!isOpen) return null

  const handleComplete = () => {
    setContext({
      gender,
      isPediatric,
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

  const intensityColor = (value: number): string => {
    if (value === 0) return 'bg-slate-200 dark:bg-slate-700'
    if (value <= 3) return 'bg-green-500'
    if (value <= 6) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-2xl rounded-[32px] shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200/50 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">
                Contexto do Paciente
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Informe para personalizar a narrativa
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Gender Selection */}
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Sexo Biológico
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('M')}
                className={`
                  flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200
                  ${gender === 'M'
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300'
                    : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                  }
                `}
              >
                <span className="text-2xl">&#9794;</span>
                <span className="font-bold">Masculino</span>
              </button>
              <button
                type="button"
                onClick={() => setGender('F')}
                className={`
                  flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200
                  ${gender === 'F'
                    ? 'bg-pink-50 dark:bg-pink-900/20 border-pink-500 text-pink-700 dark:text-pink-300'
                    : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                  }
                `}
              >
                <span className="text-2xl">&#9792;</span>
                <span className="font-bold">Feminino</span>
              </button>
            </div>
          </section>

          {/* Patient Type */}
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Faixa Etária
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsPediatric(false)}
                className={`
                  flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200
                  ${!isPediatric
                    ? 'bg-slate-100 dark:bg-slate-800 border-slate-500 text-slate-700 dark:text-slate-200'
                    : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                  }
                `}
              >
                <User className="w-5 h-5" />
                <span className="font-bold">Adulto</span>
              </button>
              <button
                type="button"
                onClick={() => setIsPediatric(true)}
                className={`
                  flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200
                  ${isPediatric
                    ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500 text-purple-700 dark:text-purple-300'
                    : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                  }
                `}
              >
                <Baby className="w-5 h-5" />
                <span className="font-bold">Pediátrico</span>
              </button>
            </div>
            {isPediatric && (
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 px-1">
                A narrativa usará "Acompanhante refere..."
              </p>
            )}
          </section>

          {/* Pain Intensity */}
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Intensidade da Dor (opcional)
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {painIntensity}/10
                </span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  painIntensity === 0
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    : painIntensity <= 3
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : painIntensity <= 6
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                }`}>
                  {intensityLabel(painIntensity)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={painIntensity}
                onChange={(e) => setPainIntensity(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-blue-500"
                style={{
                  background: `linear-gradient(to right, ${
                    painIntensity === 0 ? '#e2e8f0' :
                    painIntensity <= 3 ? '#22c55e' :
                    painIntensity <= 6 ? '#eab308' : '#ef4444'
                  } ${painIntensity * 10}%, #e2e8f0 ${painIntensity * 10}%)`,
                }}
              />
            </div>
          </section>

          {/* Advanced Options Toggle */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <ChevronRight className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} />
            Opções avançadas
          </button>

          {/* Advanced Options */}
          {showAdvanced && (
            <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
              {/* Evolution Type */}
              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Evolução do Quadro
                </h3>
                <div className="flex gap-2">
                  {(['agudo', 'subagudo', 'crônico'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setEvolutionType(evolutionType === type ? undefined : type)}
                      className={`
                        flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all capitalize
                        ${evolutionType === type
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }
                      `}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </section>

              {/* Onset Type */}
              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Tipo de Início
                </h3>
                <div className="flex gap-2">
                  {(['súbito', 'progressivo', 'insidioso'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setOnsetType(onsetType === type ? undefined : type)}
                      className={`
                        flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all capitalize
                        ${onsetType === type
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }
                      `}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
          <button
            onClick={handleComplete}
            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            Iniciar Anamnese
          </button>
        </div>
      </div>
    </div>
  )
}
