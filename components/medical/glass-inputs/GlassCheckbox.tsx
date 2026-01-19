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
        group w-full flex items-center justify-between px-5 py-4 first:rounded-t-[28px] last:rounded-b-[28px] border-b border-white/10 last:border-0 transition-all duration-300 relative overflow-hidden
        ${value
          ? 'bg-[rgba(0,122,255,0.08)] dark:bg-[rgba(0,122,255,0.12)] z-10'
          : 'hover:bg-white/10 dark:hover:bg-white/5 bg-transparent'
        }
      `}
    >
      {/* Selection glow background - subtle */}
      <AnimatePresence>
        {value && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={applePhysics.glass}
            className="absolute inset-0 bg-[rgba(0,122,255,0.03)] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4 relative z-10">
        {/* Custom Liquid Glass Checkbox - using tinted glass, not solid colors */}
        <motion.div
          animate={value ? { scale: 1.05 } : { scale: 1 }}
          transition={applePhysics.haptic}
          className={`
            w-6 h-6 rounded-[10px] flex items-center justify-center transition-all duration-300 border relative overflow-hidden shrink-0
            ${value
              ? (item.isRedFlag
                  ? 'bg-[rgba(255,59,48,0.25)] dark:bg-[rgba(255,59,48,0.35)] border-[rgba(255,59,48,0.4)] shadow-[0_4px_16px_rgba(255,59,48,0.2)]'
                  : 'bg-[rgba(0,122,255,0.25)] dark:bg-[rgba(0,122,255,0.35)] border-[rgba(0,122,255,0.4)] shadow-[0_4px_16px_rgba(0,122,255,0.2)]')
              : 'bg-white/30 dark:bg-white/10 border-white/40 dark:border-white/20 group-hover:border-white/50 group-hover:bg-white/40'
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
                 <Check className={`w-3.5 h-3.5 stroke-[3.5px] ${item.isRedFlag ? 'text-[#FF3B30]' : 'text-[#007AFF]'}`} />
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

