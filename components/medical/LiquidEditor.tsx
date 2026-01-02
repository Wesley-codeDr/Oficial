'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Pencil, Type } from 'lucide-react'

interface LiquidEditorProps {
  title: string
  content: string
  onSave: (value: string) => void
  readOnly?: boolean
}

export const LiquidEditor: React.FC<LiquidEditorProps> = ({
  title,
  content,
  onSave,
  readOnly = false
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(content)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Sync temp value if content changes externally
  useEffect(() => {
    if (!isEditing) setTempValue(content)
  }, [content, isEditing])

  // Auto-resize
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [isEditing, tempValue])

  const handleSave = () => {
    setIsEditing(false)
    onSave(tempValue)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setTempValue(content)
  }

  return (
    <div 
      className={`group relative rounded-[32px] transition-all duration-500 border ${
        isEditing 
          ? 'bg-white dark:bg-slate-900 border-blue-500/50 shadow-2xl scale-[1.01] z-10' 
          : 'bg-white/40 dark:bg-white/5 border-white/40 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/10 hover:shadow-lg'
      }`}
    >
      {/* Visual Header */}
      <div className="px-6 pt-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            isEditing ? 'bg-blue-500 text-white' : 'bg-slate-200/50 dark:bg-white/5 text-slate-400'
          }`}>
            <Type className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{title}</h3>
            {isEditing && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[9px] font-bold text-blue-500 uppercase tracking-wider"
              >
                Modo de Edição Ativo
              </motion.span>
            )}
          </div>
        </div>

        {!readOnly && !isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 opacity-0 group-hover:opacity-100 transition-all hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            <Pencil className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="px-6 py-5">
        {isEditing ? (
          <div className="space-y-4">
            <textarea
              ref={textareaRef}
              autoFocus
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 p-0 text-slate-800 dark:text-white text-base leading-relaxed font-semibold placeholder:text-slate-300 dark:placeholder:text-slate-700 resize-none overflow-hidden"
              placeholder={`Escreva aqui a ${title.toLowerCase()}...`}
            />
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
              <button 
                onClick={handleCancel}
                className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
              >
                Descartar
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Check className="w-3.5 h-3.5" /> Salvar Alterações
              </button>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => !readOnly && setIsEditing(true)}
            className={`text-slate-800 dark:text-slate-200 text-base leading-relaxed font-semibold cursor-text whitespace-pre-wrap ${
              !content && 'italic text-slate-400 opacity-50'
            }`}
          >
            {content || `Nenhuma ${title.toLowerCase()} registrada.`}
          </div>
        )}
      </div>

      {/* Decorative Blur Accent */}
      {isEditing && (
        <div className="absolute -inset-px rounded-[32px] bg-linear-to-br from-blue-500/20 to-transparent pointer-events-none -z-10" />
      )}
    </div>
  )
}
