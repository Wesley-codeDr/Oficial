import React, { useState } from 'react'
import { User, Baby, ArrowRight, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FlashPatientEntryProps {
  onComplete: (data: {
    category: 'adult' | 'pediatric'
    gender: 'M' | 'F'
    isPregnant: boolean
  }) => void
}

export const FlashPatientEntry: React.FC<FlashPatientEntryProps> = ({ onComplete }) => {
  const [category, setCategory] = useState<'adult' | 'pediatric' | null>(null)
  const [gender, setGender] = useState<'M' | 'F' | null>(null)
  const [isPregnant, setIsPregnant] = useState(false)

  const handleComplete = () => {
    if (category && gender) {
      onComplete({ category, gender, isPregnant })
    }
  }

  const handleGenderSelect = (selectedGender: 'M' | 'F') => {
    setGender(selectedGender)
    if (selectedGender === 'M') {
      setIsPregnant(false)
    }
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-10">
        
        {/* Header Section - Minimal & Clear Typography */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white mb-2">
              Anamnese WellWave
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
              Selecione o perfil do paciente para iniciar
            </p>
          </motion.div>
        </div>

        {/* Category Selection - Spatial & Interactive */}
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => setCategory('adult')}
            className={`
              relative group flex flex-col items-center gap-6 p-8 rounded-[32px] outline-none
              transition-all duration-300 ease-out
              ${category === 'adult' 
                ? 'bg-blue-500/10 border-blue-500/30 ring-1 ring-blue-500/50 shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]' 
                : 'bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-white/5 hover:bg-white/60 dark:hover:bg-slate-700/60 hover:scale-[1.02] hover:shadow-xl shadow-lg backdrop-blur-xl'
              }
            `}
          >
            <div className={`
              w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300
              ${category === 'adult' 
                ? 'bg-blue-500 text-white shadow-lg scale-110' 
                : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:scale-105'
              }
            `}>
              <User className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <span className={`text-xl font-semibold tracking-wide transition-colors duration-300
              ${category === 'adult' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'}
            `}>
              Adulto
            </span>
            
            {category === 'adult' && (
              <motion.div
                layoutId="check-cat"
                className="absolute top-6 right-6 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Check className="w-5 h-5 stroke-[3px]" />
              </motion.div>
            )}
          </button>

          <button
            onClick={() => setCategory('pediatric')}
            className={`
              relative group flex flex-col items-center gap-6 p-8 rounded-[32px] outline-none
              transition-all duration-300 ease-out
              ${category === 'pediatric' 
                ? 'bg-purple-500/10 border-purple-500/30 ring-1 ring-purple-500/50 shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]' 
                : 'bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-white/5 hover:bg-white/60 dark:hover:bg-slate-700/60 hover:scale-[1.02] hover:shadow-xl shadow-lg backdrop-blur-xl'
              }
            `}
          >
            <div className={`
              w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300
              ${category === 'pediatric' 
                ? 'bg-purple-500 text-white shadow-lg scale-110' 
                : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:scale-105'
              }
            `}>
              <Baby className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <span className={`text-xl font-semibold tracking-wide transition-colors duration-300
              ${category === 'pediatric' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-600 dark:text-slate-300'}
            `}>
              Pediátrico
            </span>

            {category === 'pediatric' && (
              <motion.div
                layoutId="check-cat"
                className="absolute top-6 right-6 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Check className="w-5 h-5 stroke-[3px]" />
              </motion.div>
            )}
          </button>
        </div>

        {/* Gender Selection - Fluid & Consistent */}
        <div className={`transition-all duration-700 ease-out ${category ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleGenderSelect('F')}
                className={`
                  relative flex flex-col sm:flex-row items-center justify-center gap-3 p-6 rounded-[24px] outline-none group
                  transition-all duration-300 ease-out
                  ${gender === 'F'
                    ? 'bg-rose-500/10 border-rose-500/30 ring-1 ring-rose-500/50 shadow-lg'
                    : 'bg-white/30 dark:bg-slate-800/30 border border-white/20 dark:border-white/5 hover:bg-white/50 dark:hover:bg-slate-700/50 hover:scale-[1.02] backdrop-blur-md'
                  }
                `}
              >
                <span className={`text-lg font-semibold transition-colors ${gender === 'F' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-600 dark:text-slate-400'}`}>
                  Feminino
                </span>
              </button>

              <button
                onClick={() => handleGenderSelect('M')}
                className={`
                  relative flex flex-col sm:flex-row items-center justify-center gap-3 p-6 rounded-[24px] outline-none group
                  transition-all duration-300 ease-out
                  ${gender === 'M'
                    ? 'bg-indigo-500/10 border-indigo-500/30 ring-1 ring-indigo-500/50 shadow-lg'
                    : 'bg-white/30 dark:bg-slate-800/30 border border-white/20 dark:border-white/5 hover:bg-white/50 dark:hover:bg-slate-700/50 hover:scale-[1.02] backdrop-blur-md'
                  }
                `}
              >
                <span className={`text-lg font-semibold transition-colors ${gender === 'M' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}>
                  Masculino
                </span>
              </button>
            </div>

            {/* Gestante Toggle - Contextual */}
            <AnimatePresence>
              {gender === 'F' && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "anticipate" }}
                  className="overflow-hidden"
                >
                  <button
                    onClick={() => setIsPregnant(!isPregnant)}
                    className={`
                      w-full flex items-center justify-center gap-4 p-5 rounded-[24px] outline-none group
                      transition-all duration-300 ease-out border
                      ${isPregnant 
                        ? 'bg-pink-500/10 border-pink-500/30 ring-1 ring-pink-500/50 shadow-lg' 
                        : 'bg-white/30 dark:bg-slate-800/30 border-white/20 dark:border-white/5 hover:bg-white/50 dark:hover:bg-slate-700/50'
                      }
                    `}
                  >
                    <div className={`
                      p-2 rounded-full transition-colors duration-300
                      ${isPregnant ? 'bg-pink-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}
                    `}>
                      <Baby className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <span className={`text-lg font-medium ${isPregnant ? 'text-pink-600 dark:text-pink-400' : 'text-slate-600 dark:text-slate-400'}`}>
                      Paciente Gestante? <span className="font-bold">{isPregnant ? 'Sim' : 'Não'}</span>
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Button - Prominent & Purposeful */}
        <div className="flex justify-center pt-8">
          <button
            onClick={handleComplete}
            disabled={!category || !gender}
            className={`
               group relative flex items-center gap-3 px-12 py-5 rounded-full text-lg font-semibold
               transition-all duration-500 ease-out shadow-xl
               ${!category || !gender 
                 ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-70' 
                 : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20'
               }
            `}
          >
            <span>Iniciar Anamnese</span>
            <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${category && gender ? 'group-hover:translate-x-1' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  )
}
