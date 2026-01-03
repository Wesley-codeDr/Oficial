'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Symptom } from '@/lib/types/medical'
import { applePhysics } from '@/lib/design-system/animation-tokens'

interface GlassRangeProps {
  item: Symptom
  value: string
  onChange: (val: string) => void
}

export const GlassRange: React.FC<GlassRangeProps> = React.memo(({ item, value, onChange }) => {
  const numVal = parseInt(value) || 0;
  const min = item.min ?? 0;
  const max = item.max ?? 10;
  const percentage = ((numVal - min) / (max - min)) * 100;
  
  return (
    <div className="px-7 py-8 border-b border-white/[0.04] first:rounded-t-[32px] last:rounded-b-[32px] last:border-0 relative group/range overflow-hidden glass-texture">
       <div className="flex justify-between items-center mb-9 px-1 relative z-10">
         <div className="flex flex-col gap-1">
            <span className="text-[10px] font-[800] text-slate-400 dark:text-slate-500 uppercase tracking-widest opacity-60 leading-none">
              {item.label}
            </span>
            <span className="text-2xl font-[900] text-slate-900 dark:text-white leading-none tracking-tight">
              {value}
            </span>
         </div>
         <div className="w-14 h-14 rounded-[20px] bg-blue-600/5 dark:bg-blue-400/10 border border-blue-500/10 flex flex-col items-center justify-center transition-all duration-500 group-hover/range:scale-105 rim-highlight">
            <span className="text-xl font-[900] text-blue-600 dark:text-blue-400 leading-none">{value}</span>
            <span className="text-[8px] font-[900] text-blue-600/60 dark:text-blue-400/60 uppercase tracking-tighter mt-1">EVA</span>
         </div>
       </div>
       <div className="relative h-2 flex items-center group/slider cursor-pointer mx-1 z-10">
          <div className="absolute w-full h-2 bg-black/5 dark:bg-white/3 rounded-full border border-white/5 overflow-hidden shadow-inner">
             <motion.div 
               className="h-full bg-linear-to-r from-blue-400 to-blue-600" 
               animate={{ width: `${percentage}%` }}
               transition={applePhysics.default}
             />
          </div>
          <input 
            type="range"
            min={min} max={max} step={item.step || 1}
            value={numVal}
            onChange={(e) => onChange(e.target.value)}
            className="absolute w-full h-full opacity-0 cursor-pointer z-30"
          />
          <motion.div 
             className="absolute h-8 w-8 bg-white dark:bg-slate-50 rounded-full shadow-lg border border-white/20 pointer-events-none transition-transform group-hover/slider:scale-110 z-20 flex items-center justify-center rim-highlight"
             animate={{ left: `calc(${percentage}% - 16px)` }}
             transition={applePhysics.gesture}
          >
             <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          </motion.div>
       </div>
    </div>
  )
})

GlassRange.displayName = 'GlassRange'
