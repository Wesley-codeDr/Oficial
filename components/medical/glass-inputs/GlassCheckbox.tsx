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
      whileTap={{ scale: 0.98 }}
      animate={value ? { scale: 1.01 } : { scale: 1 }}
      transition={applePhysics.haptic}
      onClick={() => onChange(!value)}
      className={`
        group w-full flex items-center justify-between px-5 py-4 first:rounded-t-[28px] last:rounded-b-[28px] border-b border-white/5 last:border-0 transition-all duration-500 relative overflow-hidden
        ${value 
          ? 'bg-gradient-to-r from-blue-500/12 via-blue-500/8 to-transparent dark:from-blue-500/10 dark:via-blue-500/5 dark:to-transparent shadow-[0_0_30px_rgba(37,99,235,0.08)] z-10' 
          : 'hover:bg-black/3 dark:hover:bg-white/3 bg-transparent'
        }
      `}
    >
      {/* Selection glow background */}
      <AnimatePresence>
        {value && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={applePhysics.glass}
            className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4 relative z-10">
        {/* Custom Ultra-Liquid Checkbox - More compact */}
        <motion.div
          animate={value ? { scale: 1.05 } : { scale: 1 }}
          transition={applePhysics.haptic}
          className={`
            w-6 h-6 rounded-[10px] flex items-center justify-center transition-all duration-500 border relative overflow-hidden rim-light-ios26 inner-glow-ios26 shrink-0
            ${value
              ? (item.isRedFlag
                  ? 'bg-gradient-to-br from-rose-500 to-rose-600 border-rose-300/50 shadow-[0_0_24px_rgba(244,63,94,0.35)]'
                  : 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-300/50 shadow-[0_0_24px_rgba(37,99,235,0.35)]')
              : 'glass-pill group-hover:border-white/35 group-hover:bg-white/15 dark:group-hover:bg-white/8'
            }
          `}
        >
           <AnimatePresence mode="wait">
             {value && (
               <motion.div
                 key="check"
                 initial={{ scale: 0, opacity: 0, rotate: -45 }}
                 animate={{ scale: 1, opacity: 1, rotate: 0 }}
                 exit={{ scale: 0, opacity: 0, rotate: 45 }}
                 transition={applePhysics.haptic}
                 className="relative z-10"
               >
                 <Check className="w-3.5 h-3.5 text-white stroke-[3.5px]" />
               </motion.div>
             )}
           </AnimatePresence>
        </motion.div>
        
        <div className="flex flex-col items-start gap-0.5">
          {/* Enhanced text - larger and bolder when selected */}
          <motion.span 
            animate={value ? { x: 2 } : { x: 0 }}
            transition={applePhysics.default}
            className={`text-left tracking-tight transition-all duration-500 ${
              value 
                ? 'text-[16px] text-slate-900 dark:text-white font-bold' 
                : 'text-[14px] text-slate-500 dark:text-slate-400 font-medium'
            }`}
          >
            {item.label}
          </motion.span>
          
          {tooltipText && (
            <div 
              className="group/tooltip relative flex items-center gap-1.5 transition-colors cursor-help"
              onClick={(e) => e.stopPropagation()}
            >
               <span className="text-[8px] text-blue-500/50 font-bold uppercase tracking-widest">Info</span>
               <div className="w-3 h-3 rounded-full bg-blue-500/10 flex items-center justify-center group-hover/tooltip:bg-blue-500 transition-colors">
                  <Info className="w-2 h-2 text-blue-500 group-hover/tooltip:text-white" />
               </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {item.isRedFlag && value && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
            transition={applePhysics.default}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/25 text-[8px] font-bold text-rose-500 uppercase tracking-wider shadow-sm relative z-10"
          >
             <AlertTriangle className="w-2.5 h-2.5" />
             Crítico
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
})

GlassCheckbox.displayName = 'GlassCheckbox'

