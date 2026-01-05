import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Info, AlertTriangle } from 'lucide-react'
import { Symptom } from '@/lib/types/medical'
import { applePhysics } from '@/lib/design-system/animation-tokens'

interface GlassCheckboxProps {
  item: Symptom
  value: boolean
  onChange: (val: boolean) => void
  tooltipText?: string
}

export const GlassCheckbox: React.FC<GlassCheckboxProps> = React.memo(({ item, value, onChange, tooltipText }) => {
  return (
    <motion.button 
      whileTap={applePhysics.haptic}
      onClick={() => onChange(!value)}
      className={`
        group w-full flex items-center justify-between px-7 py-6 first:rounded-t-[32px] last:rounded-b-[32px] border-b border-white/4 last:border-0 transition-all duration-300 relative overflow-hidden glass-texture
        ${value 
          ? 'bg-blue-500/8 dark:bg-blue-500/6' 
          : 'hover:bg-black/2 dark:hover:bg-white/2 bg-transparent'}
      `}
    >
      <div className="flex items-center gap-6 relative z-10">
        {/* Custom Ultra-Liquid Checkbox */}
        <div className={`
           w-7.5 h-7.5 rounded-[12px] flex items-center justify-center transition-all duration-500 border relative overflow-hidden shadow-sm rim-highlight
           ${value 
             ? (item.isRedFlag 
                 ? 'bg-rose-500 border-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.3)]' 
                 : 'bg-blue-600 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.3)]')
             : 'bg-black/5 dark:bg-white/5 border-white/10 group-hover:border-white/30'
           }
        `}>
           <AnimatePresence mode="wait">
             {value && (
               <motion.div
                 key="check"
                 initial={{ scale: 0.5, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 exit={{ scale: 0.5, opacity: 0 }}
                 transition={applePhysics.haptic}
                 className="relative z-10"
               >
                 <Check className="w-4 h-4 text-white stroke-[4px]" />
               </motion.div>
             )}
           </AnimatePresence>
        </div>
        
        <div className="flex flex-col items-start gap-0.5">
          <span className={`text-[15px] text-left tracking-tight transition-all duration-500 ${value ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500 dark:text-slate-400 font-medium'}`}>
            {item.label}
          </span>
          
          {tooltipText && (
            <div 
              className="group/tooltip relative flex items-center gap-2 transition-colors cursor-help"
              onClick={(e) => e.stopPropagation()}
            >
               <span className="text-[9px] text-blue-500/60 font-extrabold uppercase tracking-widest">Info Adicional</span>
               <div className="w-3.5 h-3.5 rounded-full bg-blue-500/10 flex items-center justify-center group-hover/tooltip:bg-blue-500 transition-colors">
                  <Info className="w-2.5 h-2.5 text-blue-500 group-hover/tooltip:text-white" />
               </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {item.isRedFlag && value && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
            transition={applePhysics.default}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[9px] font-extrabold text-rose-500 uppercase tracking-widest shadow-sm relative z-10"
          >
             <AlertTriangle className="w-3 h-3" />
             Crítico
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
})

GlassCheckbox.displayName = 'GlassCheckbox'
