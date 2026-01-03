import React, { useState } from 'react'
import { User, Baby, Check, ChevronRight, UserCircle, ShieldAlert, Phone as PhoneIcon, LucideIcon, Info, Smile, Accessibility } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { applePhysics } from '@/lib/design-system/animation-tokens'

interface SelectionPillProps {
  isActive: boolean
  onClick: () => void
  icon?: LucideIcon
  label: string
  color: 'blue' | 'purple' | 'rose' | 'indigo'
}

const SelectionPill: React.FC<SelectionPillProps> = ({ isActive, onClick, icon: Icon, label, color }) => {
  const colorMap = {
    blue: {
      active: 'border-blue-500/50 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.2)]',
      iconBox: 'bg-blue-500 text-white shadow-blue-500/40',
      glow: 'after:bg-blue-500/20'
    },
    purple: {
      active: 'border-purple-500/50 bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.2)]',
      iconBox: 'bg-purple-500 text-white shadow-purple-500/40',
      glow: 'after:bg-purple-500/20'
    },
    rose: {
      active: 'border-rose-500/50 bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.2)]',
      iconBox: 'bg-rose-500 text-white shadow-rose-500/40',
      glow: 'after:bg-rose-500/20'
    },
    indigo: {
      active: 'border-indigo-500/50 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 shadow-[0_0_25px_rgba(99,102,241,0.2)]',
      iconBox: 'bg-indigo-500 text-white shadow-indigo-500/40',
      glow: 'after:bg-indigo-500/20'
    }
  }

  const styles = colorMap[color];

  return (
    <motion.button
      whileTap={applePhysics.haptic}
      transition={applePhysics.glass}
      onClick={onClick}
      className={`
        relative flex flex-col items-center justify-center gap-4 p-8 rounded-[40px] outline-none
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] border backdrop-blur-2xl
        after:absolute after:inset-0 after:rounded-[40px] after:opacity-0 after:transition-opacity after:duration-500
        ${isActive 
          ? `${styles.active} ring-1 scale-[1.02] z-10 after:opacity-100 ${styles.glow}` 
          : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:scale-[1.01] hover:border-white/20'
        }
      `}
    >
      {/* Dynamic Glow Layer */}
      <div className={`absolute -inset-px rounded-[40px] bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : ''}`} />
      
      {Icon && (
        <div className={`
          relative z-10 w-16 h-16 rounded-[24px] flex items-center justify-center transition-all duration-500
          ${isActive 
            ? `${styles.iconBox} scale-110 shadow-xl rotate-0` 
            : 'bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:scale-105'
          }
        `}>
          <Icon className={`w-7 h-7 transition-transform duration-500 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
        </div>
      )}
      
      <span className={`
        relative z-10 text-[13px] font-black uppercase tracking-[0.15em] transition-all duration-500
        ${isActive ? 'text-current translate-y-0 opacity-100' : 'opacity-60 translate-y-1'}
      `}>
        {label}
      </span>
      
      {isActive && (
        <motion.div
          layoutId={`check-${label}`}
          className={`absolute top-5 right-5 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-lg z-20 ${styles.iconBox}`}
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={applePhysics.default}
        >
          <Check className="w-4 h-4 stroke-[4px]" />
        </motion.div>
      )}
    </motion.button>
  )
}

interface FlashPatientEntryProps {
  onComplete: (data: {
    category: 'adult' | 'pediatric'
    gender: 'M' | 'F'
    isPregnant: boolean
    age?: number
  }) => void
}

export const FlashPatientEntry: React.FC<FlashPatientEntryProps> = ({ onComplete }) => {
  const [category, setCategory] = useState<'lactente' | 'crianca' | 'adulto' | 'idoso' | null>(null)
  const [gender, setGender] = useState<'M' | 'F' | null>(null)
  const [isPregnant, setIsPregnant] = useState(false)

  const handleComplete = () => {
    if (gender && category) {
      const finalCategory = (category === 'lactente' || category === 'crianca') ? 'pediatric' : 'adult'
      const ageMap = {
        lactente: 1,
        crianca: 8,
        adulto: 35,
        idoso: 75
      }

      onComplete({ 
        category: finalCategory, 
        gender, 
        isPregnant,
        age: ageMap[category]
      })
    }
  }

  const handleGenderSelect = (selectedGender: 'M' | 'F') => {
    setGender(selectedGender)
    if (selectedGender === 'M') {
      setIsPregnant(false)
    }
  }

  const isReady = !!gender && !!category

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 sm:p-8">
      <motion.div 
        initial={applePhysics.blur.initial}
        animate={applePhysics.blur.animate}
        className="max-w-xl w-full liquid-glass-material p-8 space-y-8 shadow-2xl"
      >
        {/* Header Section */}
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">
            Identificação
          </h2>
          <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.3em] opacity-80">
            Fluxo Vision 2025
          </p>
        </div>

        <div className="space-y-8">
          {/* 1. Sexo Biológico */}
          <div className="space-y-4">
             <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2 text-center">1. Sexo Biológico</p>
             <div className="grid grid-cols-2 gap-4">
                <SelectionPill 
                  isActive={gender === 'M'} 
                  onClick={() => handleGenderSelect('M')}
                  label="Homem"
                  color="blue"
                  icon={UserCircle}
                />
                <SelectionPill 
                  isActive={gender === 'F'} 
                  onClick={() => handleGenderSelect('F')}
                  label="Mulher"
                  color="rose"
                  icon={UserCircle}
                />
             </div>
          </div>

          {/* 2. Faixa Etária */}
          <AnimatePresence>
            {gender && (
              <motion.div 
                initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                className="space-y-4 pt-4 border-t border-white/10"
              >
                 <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2 text-center">2. Faixa Etária</p>
                 
                 <div className="grid grid-cols-2 gap-3">
                    <SelectionPill 
                      isActive={category === 'lactente'} 
                      onClick={() => setCategory('lactente')}
                      label="Lactente"
                      color="indigo"
                      icon={Baby}
                    />
                    <SelectionPill 
                      isActive={category === 'crianca'} 
                      onClick={() => setCategory('crianca')}
                      label="Criança"
                      color="indigo"
                      icon={Smile}
                    />
                    <SelectionPill 
                      isActive={category === 'adulto'} 
                      onClick={() => setCategory('adulto')}
                      label="Adulto"
                      color="indigo"
                      icon={UserCircle}
                    />
                    <SelectionPill 
                      isActive={category === 'idoso'} 
                      onClick={() => setCategory('idoso')}
                      label="Idoso"
                      color="indigo"
                      icon={Accessibility}
                    />
                 </div>

                 {/* 3. Gestante */}
                 {gender === 'F' && (category === 'adulto' || category === 'idoso') && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        className="pt-4"
                    >
                        <motion.button
                        whileTap={applePhysics.haptic}
                        onClick={() => setIsPregnant(!isPregnant)}
                        className={`
                            w-full flex items-center justify-between p-5 rounded-[28px] border transition-all duration-500
                            ${isPregnant 
                            ? 'bg-rose-500/10 border-rose-500/30 shadow-[0_10px_30px_rgba(244,63,94,0.1)]' 
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                            }
                        `}
                        >
                        <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-2xl transition-colors duration-500 ${isPregnant ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'}`}>
                            <Baby className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                            <p className={`text-[10px] font-black uppercase tracking-widest ${isPregnant ? 'text-rose-500' : 'text-slate-500'}`}>Condição Particular</p>
                            <h4 className={`text-sm font-black transition-colors duration-500 ${isPregnant ? 'text-rose-600 dark:text-rose-300' : 'text-slate-700 dark:text-slate-300'}`}>Gestante</h4>
                            </div>
                        </div>
                        <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-500 ${isPregnant ? 'bg-rose-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                            <motion.div 
                                animate={{ x: isPregnant ? 24 : 0 }}
                                transition={applePhysics.default}
                                className="w-4 h-4 bg-white rounded-full shadow-sm" 
                            />
                        </div>
                        </motion.button>
                    </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <motion.button
            whileTap={applePhysics.haptic}
            onClick={isReady ? handleComplete : undefined}
            className={`
               w-full group relative flex items-center justify-center gap-3 py-5 rounded-[32px] text-base font-black uppercase tracking-widest
               transition-all duration-500 shadow-xl
               ${!isReady 
                 ? 'bg-slate-100 dark:bg-slate-800/50 text-slate-400 cursor-not-allowed opacity-50' 
                 : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-[1.02] shadow-blue-500/20 active:scale-95'
               }
            `}
          >
            <span>Gerar Anamnese</span>
            <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isReady ? 'group-hover:translate-x-1' : ''}`} />
          </motion.button>
          
          <div className="mt-4 flex items-center justify-center gap-2 opacity-40 text-center">
               <Info className="w-3 h-3" />
               <p className="text-[9px] font-black uppercase tracking-widest">Selecione o sexo e a faixa etária para continuar</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}


