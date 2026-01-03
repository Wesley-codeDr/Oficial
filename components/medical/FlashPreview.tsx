'use client'

import React, { useState } from 'react'
import { Copy, Check, RefreshCcw, Type, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { LiquidEditor } from './LiquidEditor'

interface FlashPreviewProps {
  record: {
    queixa_principal: string
    exame_fisico: string
    hipotese_diagnostica: string[]
    conduta: string
    cid: string
    cid_descricao: string
  }
  onReset: () => void
}

export const FlashPreview: React.FC<FlashPreviewProps> = ({ record, onReset }) => {
  const { toast } = useToast()
  const [copiedSection, setCopiedSection] = useState<string | null>(null)
  const [isUppercaseMode, setIsUppercaseMode] = useState(false)

  // Local state to support editing
  const [editableRecord, setEditableRecord] = useState({
    ...record,
    hipotese_diagnostica: Array.isArray(record.hipotese_diagnostica) 
      ? record.hipotese_diagnostica.join(', ') 
      : record.hipotese_diagnostica
  })

  const handleUpdate = (field: string, value: string) => {
    setEditableRecord((prev) => ({ ...prev, [field]: value }))
  }

  const handleCopy = (text: string, label: string) => {
    const finalText = isUppercaseMode ? text.toUpperCase() : text
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(finalText).catch(() => {
        toast({ title: 'Erro', description: 'Não foi possível copiar.', variant: 'destructive' })
      })
    }
    setCopiedSection(label)
    toast({ title: 'Copiado!', description: `${label} copiado para a área de transferência.` })
    globalThis.setTimeout(() => setCopiedSection(null), 2000)
  }

  const fullText = `
${editableRecord.queixa_principal}

${editableRecord.exame_fisico}

Hipótese diagnóstica: ${editableRecord.hipotese_diagnostica}.

Conduta: ${editableRecord.conduta}.

CID: ${editableRecord.cid} - ${editableRecord.cid_descricao}
  `.trim()

  return (
    <div className="h-full flex flex-col p-6 space-y-8 pb-32">
      {/* Header Info */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Prontuário Vision</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em]">Gerado por IA • Liquid Preview</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-1.5 liquid-glass-material backdrop-blur-3xl border border-white/50 dark:border-white/10 rounded-2xl shadow-sm glass-texture rim-highlight">
          <button
            onClick={() => setIsUppercaseMode(!isUppercaseMode)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isUppercaseMode ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-blue-500'
            }`}
            title="Alternar Caixa Alta"
          >
            <Type className="w-4 h-4" />
          </button>
          
          <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-1" />
          
          <button
            onClick={() => handleCopy(fullText, 'Tudo')}
            className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            {copiedSection === 'Tudo' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copiar Tudo
          </button>
        </div>
      </div>

      {/* Editable Sections */}
      <div className="grid grid-cols-1 gap-5">
        <LiquidEditor 
          title="Queixa Principal"
          content={isUppercaseMode ? editableRecord.queixa_principal.toUpperCase() : editableRecord.queixa_principal}
          onSave={(val) => handleUpdate('queixa_principal', val)}
        />
        
        <LiquidEditor 
          title="Exame Físico"
          content={isUppercaseMode ? editableRecord.exame_fisico.toUpperCase() : editableRecord.exame_fisico}
          onSave={(val) => handleUpdate('exame_fisico', val)}
        />
        
        <LiquidEditor 
          title="Hipótese Diagnóstica"
          content={isUppercaseMode ? editableRecord.hipotese_diagnostica.toUpperCase() : editableRecord.hipotese_diagnostica}
          onSave={(val) => handleUpdate('hipotese_diagnostica', val)}
        />
        
        <LiquidEditor 
          title="Conduta"
          content={isUppercaseMode ? editableRecord.conduta.toUpperCase() : editableRecord.conduta}
          onSave={(val) => handleUpdate('conduta', val)}
        />

        <div className="relative rounded-[32px] p-6 bg-slate-500/5 border border-slate-200/50 dark:border-white/5 flex items-center justify-between group">
           <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">CID-10 Principal</h3>
              <p className="text-sm font-black text-slate-700 dark:text-slate-200">{editableRecord.cid} - {editableRecord.cid_descricao}</p>
           </div>
           <button 
              onClick={() => handleCopy(`${editableRecord.cid} - ${editableRecord.cid_descricao}`, 'CID')}
              className="p-3 rounded-xl bg-white/60 dark:bg-white/5 text-slate-400 opacity-0 group-hover:opacity-100 transition-all hover:text-blue-500 shadow-sm"
           >
              {copiedSection === 'CID' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
           </button>
        </div>
      </div>

      {/* Floating Action Hint */}
      <div className="flex justify-center pt-10">
        <button 
          onClick={onReset}
          className="flex items-center gap-3 px-8 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-red-500 transition-all font-bold text-sm border border-slate-200/50 dark:border-white/5 group"
        >
          <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
          Encerrar e Iniciar Novo
        </button>
      </div>
    </div>
  )
}
