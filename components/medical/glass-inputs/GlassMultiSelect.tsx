'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Symptom } from '@/lib/types/medical'
import { applePhysics } from '@/lib/design-system/animation-tokens'
import { cn } from '@/lib/utils'

interface GlassMultiSelectProps {
  item: Symptom
  value: string[]
  onChange: (val: string[]) => void
}

export const GlassMultiSelect: React.FC<GlassMultiSelectProps> = ({ item, value, onChange }) => {
  const currentValues = Array.isArray(value) ? value : [];

  const toggleOption = (opt: string) => {
    if (currentValues.includes(opt)) {
      onChange(currentValues.filter(v => v !== opt));
    } else {
      onChange([...currentValues, opt]);
    }
  };

  return (
    <div className="px-7 py-7 border-b border-white/4 first:rounded-t-[32px] last:rounded-b-[32px] last:border-0 relative overflow-hidden glass-texture">
       <div className="mb-4 px-1 relative z-10">
         <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest opacity-60">
           {item.label}
         </span>
       </div>
       <div className="flex flex-wrap gap-2.5 relative z-10">
          {item.options?.map(opt => {
             const isSelected = currentValues.includes(opt);
             return (
                <motion.button
                  key={opt}
                  whileTap={applePhysics.haptic}
                  transition={applePhysics.default}
                  onClick={() => toggleOption(opt)}
                  className={cn(
                    "px-5 py-2.5 rounded-[16px] text-[13px] font-bold transition-all duration-300 border relative overflow-hidden active:scale-95",
                    isSelected 
                      ? "bg-blue-600 text-white border-blue-400 shadow-[0_8px_15px_rgba(37,99,235,0.2)] rim-highlight" 
                      : "bg-black/5 dark:bg-white/2 text-slate-600 dark:text-slate-400 border-white/5 hover:border-white/20 hover:bg-black/10 dark:hover:bg-white/10"
                  )}
                >
                  {opt}
                </motion.button>
             );
          })}
       </div>
    </div>
  )
}

GlassMultiSelect.displayName = 'GlassMultiSelect'
