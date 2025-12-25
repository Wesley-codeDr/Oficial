import React, { useState } from 'react'
import { User, Baby, ArrowRight, Check } from 'lucide-react'
import { motion } from 'framer-motion'

interface FlashPatientEntryProps {
  onComplete: (data: { category: 'adult' | 'pediatric'; gender: 'M' | 'F' }) => void
}

export const FlashPatientEntry: React.FC<FlashPatientEntryProps> = ({ onComplete }) => {
  const [category, setCategory] = useState<'adult' | 'pediatric' | null>(null)
  const [gender, setGender] = useState<'M' | 'F' | null>(null)

  const handleComplete = () => {
    if (category && gender) {
      onComplete({ category, gender })
    }
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-400 bg-clip-text text-transparent tracking-tight">
            Anamnese WellWave
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
            Selecione o perfil do paciente para iniciar o atendimento rápido.
          </p>
        </div>

        {/* Category Selection */}
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => setCategory('adult')}
            className={`
              relative p-6 rounded-[24px] border-2 transition-all duration-300 flex flex-col items-center gap-4 group outline-none
              ${
                category === 'adult'
                  ? 'bg-blue-500/10 border-blue-500 shadow-lg shadow-blue-500/20 scale-[1.02]'
                  : 'bg-white/40 dark:bg-slate-800/40 border-transparent hover:bg-white/60 dark:hover:bg-slate-800/60 hover:scale-[1.02]'
              }
            `}
          >
            <div
              className={`
              w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300
              ${category === 'adult' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}
            `}
            >
              <User className="w-8 h-8" />
            </div>
            <span
              className={`text-lg font-bold ${category === 'adult' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}
            >
              Adulto
            </span>

            {category === 'adult' && (
              <motion.div
                layoutId="check-cat"
                className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white"
              >
                <Check className="w-4 h-4 stroke-[3px]" />
              </motion.div>
            )}
          </button>

          <button
            onClick={() => setCategory('pediatric')}
            className={`
              relative p-6 rounded-[24px] border-2 transition-all duration-300 flex flex-col items-center gap-4 group outline-none
              ${
                category === 'pediatric'
                  ? 'bg-purple-500/10 border-purple-500 shadow-lg shadow-purple-500/20 scale-[1.02]'
                  : 'bg-white/40 dark:bg-slate-800/40 border-transparent hover:bg-white/60 dark:hover:bg-slate-800/60 hover:scale-[1.02]'
              }
            `}
          >
            <div
              className={`
              w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300
              ${category === 'pediatric' ? 'bg-purple-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}
            `}
            >
              <Baby className="w-8 h-8" />
            </div>
            <span
              className={`text-lg font-bold ${category === 'pediatric' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-700 dark:text-slate-300'}`}
            >
              Pediátrico
            </span>

            {category === 'pediatric' && (
              <motion.div
                layoutId="check-cat"
                className="absolute top-4 right-4 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white"
              >
                <Check className="w-4 h-4 stroke-[3px]" />
              </motion.div>
            )}
          </button>
        </div>

        {/* Gender Selection - Only show if category is selected (optional, but cleaner) */}
        <div
          className={`transition-all duration-500 ${category ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 grayscale pointer-events-none'}`}
        >
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={() => setGender('F')}
              className={`
                relative p-4 rounded-[20px] border-2 transition-all duration-300 flex items-center justify-center gap-3 outline-none
                ${
                  gender === 'F'
                    ? 'bg-rose-500/10 border-rose-500 shadow-md shadow-rose-500/10'
                    : 'bg-white/40 dark:bg-slate-800/40 border-transparent hover:bg-white/60 dark:hover:bg-slate-800/60'
                }
              `}
            >
              <span
                className={`text-lg font-bold ${gender === 'F' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Feminino
              </span>
            </button>

            <button
              onClick={() => setGender('M')}
              className={`
                relative p-4 rounded-[20px] border-2 transition-all duration-300 flex items-center justify-center gap-3 outline-none
                ${
                  gender === 'M'
                    ? 'bg-indigo-500/10 border-indigo-500 shadow-md shadow-indigo-500/10'
                    : 'bg-white/40 dark:bg-slate-800/40 border-transparent hover:bg-white/60 dark:hover:bg-slate-800/60'
                }
              `}
            >
              <span
                className={`text-lg font-bold ${gender === 'M' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Masculino
              </span>
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleComplete}
            disabled={!category || !gender}
            className={`
               group relative flex items-center gap-3 px-8 py-4 rounded-[20px] font-bold text-lg transition-all duration-300
               ${
                 category && gender
                   ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl hover:scale-105 active:scale-95'
                   : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
               }
            `}
          >
            <span>Iniciar Anamnese</span>
            <ArrowRight
              className={`w-5 h-5 transition-transform duration-300 ${category && gender ? 'group-hover:translate-x-1' : ''}`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
