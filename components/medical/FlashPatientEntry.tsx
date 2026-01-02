import React, { useState, useEffect } from 'react'
import { User, Baby, ArrowRight, Check, ChevronRight } from 'lucide-react'
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

  // Auto-complete if everything is set and it's not a pregnant-potential case
  useEffect(() => {
    if (category && gender) {
      if (gender === 'M' || category === 'pediatric') {
        const timer = setTimeout(handleComplete, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [category, gender]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="max-w-xl w-full space-y-8">
        
        {/* Header Section - More Compact */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-slate-900 dark:text-white">
              Identificação do Paciente
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest opacity-70">
              Fluxo Inteligente WellWave
            </p>
          </motion.div>
        </div>

        {/* Unified Selection Capsule */}
        <div className="space-y-4">
          
          {/* 1. Category Selection - Compact Stack */}
          <div className="space-y-3">
             <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">1. Perfil Etário</p>
             <div className="grid grid-cols-2 gap-3">
                <SelectionPill 
                  isActive={category === 'adult'} 
                  onClick={() => setCategory('adult')}
                  icon={User}
                  label="Adulto"
                  color="blue"
                />
                <SelectionPill 
                  isActive={category === 'pediatric'} 
                  onClick={() => setCategory('pediatric')}
                  icon={Baby}
                  label="Pediátrico"
                  color="purple"
                />
             </div>
          </div>

          {/* 2. Gender Selection - Appears after Category */}
          <AnimatePresence>
            {category && (
              <motion.div 
                initial={{ opacity: 0, height: 0, y: 10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 pt-4"
              >
                 <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">2. Sexo Biológico</p>
                 <div className="grid grid-cols-2 gap-3">
                    <SelectionPill 
                      isActive={gender === 'F'} 
                      onClick={() => handleGenderSelect('F')}
                      label="Feminino"
                      color="rose"
                    />
                    <SelectionPill 
                      isActive={gender === 'M'} 
                      onClick={() => handleGenderSelect('M')}
                      label="Masculino"
                      color="indigo"
                    />
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. Pregnant Toggle - Only if needed */}
          <AnimatePresence>
            {gender === 'F' && category === 'adult' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="pt-4"
              >
                <button
                  onClick={() => setIsPregnant(!isPregnant)}
                  className={`
                    w-full flex items-center justify-between p-4 rounded-3xl outline-none
                    transition-all duration-300 border
                    ${isPregnant 
                      ? 'bg-pink-500/10 border-pink-500/30 ring-1 ring-pink-500/50' 
                      : 'bg-white/40 dark:bg-slate-800/40 border-white/20 dark:border-white/5 hover:bg-white/60 dark:hover:bg-slate-700/60'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${isPregnant ? 'bg-pink-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
                      <Baby className="w-4 h-4" />
                    </div>
                    <span className={`text-sm font-black ${isPregnant ? 'text-pink-600 dark:text-pink-400' : 'text-slate-500 dark:text-slate-400'}`}>
                      PACIENTE GESTANTE?
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black ${isPregnant ? 'bg-pink-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
                    {isPregnant ? 'SIM' : 'NÃO'}
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button - More Integrated */}
        <div className="pt-4">
          <button
            onClick={handleComplete}
            disabled={!category || !gender}
            className={`
               w-full group relative flex items-center justify-center gap-3 py-5 rounded-[32px] text-base font-black uppercase tracking-widest
               transition-all duration-500 shadow-xl
               ${!category || !gender 
                 ? 'bg-slate-100 dark:bg-slate-800/50 text-slate-400 cursor-not-allowed border border-white/10' 
                 : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-[1.02] shadow-blue-500/20 active:scale-95'
               }
            `}
          >
            <span>Prosseguir para Queixa</span>
            <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${category && gender ? 'group-hover:translate-x-1' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  )
}

interface SelectionPillProps {
  isActive: boolean
  onClick: () => void
  icon?: any
  label: string
  color: 'blue' | 'purple' | 'rose' | 'indigo'
}

const SelectionPill: React.FC<SelectionPillProps> = ({ isActive, onClick, icon: Icon, label, color }) => {
  const colorMap = {
    blue: 'border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10 ring-blue-500/50',
    purple: 'border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10 ring-purple-500/50',
    rose: 'border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-500/10 ring-rose-500/50',
    indigo: 'border-indigo-500/30 text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 ring-indigo-500/50'
  }

  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center justify-center gap-3 p-5 rounded-[32px] outline-none
        transition-all duration-400 ease-out border backdrop-blur-xl
        ${isActive 
          ? `${colorMap[color]} ring-1 shadow-lg` 
          : 'bg-white/40 dark:bg-white/5 border-white/20 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:scale-[1.02]'
        }
      `}
    >
      {Icon && (
        <div className={`
          w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300
          ${isActive ? 'bg-current text-white scale-110 shadow-md' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}
        `}>
          <Icon className="w-5 h-5" />
        </div>
      )}
      <span className={`text-sm font-black uppercase tracking-tighter ${isActive ? 'opacity-100' : 'opacity-70'}`}>
        {label}
      </span>
      
      {isActive && (
        <motion.div
          layoutId={`check-${label}`}
          className="absolute top-3 right-3 w-5 h-5 bg-current rounded-full flex items-center justify-center text-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <Check className="w-3 h-3 stroke-[4px]" />
        </motion.div>
      )}
    </button>
  )
}
