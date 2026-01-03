'use client'

import React from 'react'
import { Symptom } from '@/lib/types/medical'

interface GlassInputProps {
  item: Symptom
  value: string
  onChange: (val: string) => void
}

export const GlassInput: React.FC<GlassInputProps> = React.memo(({ item, value, onChange }) => {
  return (
     <div className="px-7 py-7 border-b border-white/[0.04] first:rounded-t-[32px] last:rounded-b-[32px] last:border-0 relative group/text overflow-hidden glass-texture">
        <label className="block text-[10px] font-[800] text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3.5 ml-1 opacity-60 group-hover/text:opacity-100 transition-opacity relative z-10">
           {item.label}
        </label>
        <div className="relative z-10">
          <input 
             type="text"
             value={value || ''}
             onChange={(e) => onChange(e.target.value)}
             placeholder={item.placeholder || 'Detalhes...'}
             className="w-full bg-black/[0.03] dark:bg-white/[0.01] border border-white/5 rounded-[18px] px-5 py-3.5 text-[15px] font-[600] text-slate-800 dark:text-white placeholder:text-slate-400/50 dark:placeholder:text-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all backdrop-blur-2xl rim-highlight"
          />
        </div>
     </div>
  )
})

GlassInput.displayName = 'GlassInput'
