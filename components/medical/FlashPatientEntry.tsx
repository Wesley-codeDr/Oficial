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
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="glass-heading">Anamnese WellWave</h2>
          <p className="glass-subtitle">
            Selecione o perfil do paciente para iniciar o atendimento rápido.
          </p>
        </div>

        {/* Category Selection */}
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => setCategory('adult')}
            className={`
              glass-btn-secondary flex flex-col items-center gap-4 group outline-none
              ${category === 'adult' ? 'selected' : ''}
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
              glass-btn-secondary flex flex-col items-center gap-4 group outline-none
              ${category === 'pediatric' ? 'selected' : ''}
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

        {/* Gender Selection */}
        <div
          className={`space-y-6 transition-all duration-500 ${category ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 grayscale pointer-events-none'}`}
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Feminino */}
            <button
              onClick={() => handleGenderSelect('F')}
              className={`
                glass-btn-secondary flex flex-col sm:flex-row items-center justify-center gap-3 outline-none group
                ${gender === 'F' ? 'selected' : ''}
              `}
            >
              <span
                className={`text-lg font-bold ${gender === 'F' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Feminino
              </span>
            </button>

            {/* Masculino */}
            <button
              onClick={() => handleGenderSelect('M')}
              className={`
                glass-btn-secondary flex flex-col sm:flex-row items-center justify-center gap-3 outline-none group
                ${gender === 'M' ? 'selected' : ''}
              `}
            >
              <span
                className={`text-lg font-bold ${gender === 'M' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Masculino
              </span>
            </button>
          </div>

          {/* Gestante Toggle (Conditional) */}
          <AnimatePresence>
            {gender === 'F' && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="overflow-hidden"
              >
                <button
                  onClick={() => setIsPregnant(!isPregnant)}
                  className={`
                    glass-btn-secondary w-full flex items-center justify-center gap-3 outline-none group
                    ${isPregnant ? 'selected' : ''}
                  `}
                >
                  <div
                    className={`
                    p-1.5 rounded-full transition-colors
                    ${isPregnant ? 'bg-pink-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}
                  `}
                  >
                    <Baby className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-lg font-bold ${isPregnant ? 'text-pink-600 dark:text-pink-400' : 'text-slate-600 dark:text-slate-400'}`}
                  >
                    Paciente Gestante? {isPregnant ? 'Sim' : 'Não'}
                  </span>
                  {isPregnant && (
                    <motion.div
                      layoutId="check-preg"
                      className="ml-2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white"
                    >
                      <Check className="w-4 h-4 stroke-[3px]" />
                    </motion.div>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleComplete}
            disabled={!category || !gender}
            className={`
               glass-btn-primary group relative flex items-center gap-3
               ${!category || !gender ? 'disabled' : ''}
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
