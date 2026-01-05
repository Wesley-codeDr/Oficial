'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Symptom } from '@/lib/types/medical'
import { applePhysics } from '@/lib/design-system/animation-tokens'

interface GlassSegmentedProps {
  item: Symptom
  value: string
  onChange: (val: string) => void
}

export const GlassSegmented: React.FC<GlassSegmentedProps> = React.memo(({ item, value, onChange }) => {
  return (
    <div className="px-7 py-7 border-b border-white/4 first:rounded-t-[32px] last:rounded-b-[32px] last:border-0 relative group/segmented overflow-hidden glass-texture">
       <div className="mb-4 flex items-center justify-between px-1 relative z-10">
         <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest opacity-60 group-hover/segmented:opacity-100 transition-opacity">
           {item.label}
         </span>
         {value && (
            <div className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-[9px] font-black text-blue-500 uppercase tracking-widest border border-blue-500/20 animate-in fade-in zoom-in-95 duration-300 rim-highlight">
              {value}
            </div>
         )}
       </div>
       <div className="flex bg-black/3 dark:bg-white/2 p-1.5 rounded-[20px] relative z-0 border border-white/5 backdrop-blur-md">
          {item.options?.map(opt => {
             const isActive = value === opt;
             return (
                <motion.button
                  key={opt}
                  whileTap={applePhysics.haptic}
                  onClick={() => onChange(opt)}
                  className={`
                    flex-1 py-3 rounded-[16px] text-[13px] font-bold transition-all duration-300 relative z-10 uppercase tracking-tight
                    ${isActive 
                      ? 'text-slate-900 dark:text-white' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    }
                  `}
                >
                  {isActive && (
                    <motion.div 
                      layoutId={`segmented-indicator-${item.label}`}
                      transition={applePhysics.default}
                      className="absolute inset-0 bg-white dark:bg-white/10 rounded-[16px] shadow-sm border border-white dark:border-white/10 z-[-1] rim-highlight"
                    >
                      {/* Liquid Bloom Effect */}
                      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-50" />
                    </motion.div>
                  )}
                  {opt}
                </motion.button>
             );
          })}
       </div>
    </div>
  )
})

GlassSegmented.displayName = 'GlassSegmented'
