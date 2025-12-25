import React, { useState, useRef, useEffect } from 'react'
import { Copy, Check, FileText, ArrowLeft, RefreshCcw, X, Type } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { motion } from 'framer-motion'

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
  type EditableRecord = Omit<FlashPreviewProps['record'], 'hipotese_diagnostica'> & {
    hipotese_diagnostica: string | string[]
  }
  const [editableRecord, setEditableRecord] = useState<EditableRecord>(record)

  const handleUpdate = (field: keyof EditableRecord, value: string) => {
    setEditableRecord((prev) => ({ ...prev, [field]: value }))
  }

  // Text formatter based on mode
  const formatText = (text: string | string[]) => {
    const str = Array.isArray(text) ? text.join(', ') : text
    return isUppercaseMode ? str.toUpperCase() : str
  }

  const handleCopy = (text: string, label: string) => {
    const finalText = isUppercaseMode ? text.toUpperCase() : text
    ;(globalThis as any).navigator?.clipboard?.writeText(finalText)
    setCopiedSection(label)
    toast({ title: 'Copiado!', description: `${label} copiado para a área de transferência.` })
    globalThis.setTimeout(() => setCopiedSection(null), 2000)
  }

  const fullText = `
QP: ${formatText(editableRecord.queixa_principal)}

EF: ${formatText(editableRecord.exame_fisico)}

HD: ${formatText(editableRecord.hipotese_diagnostica)}

CD: ${formatText(editableRecord.conduta)}

CID: ${editableRecord.cid} - ${editableRecord.cid_descricao}
  `.trim()

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto custom-scrollbar">
      <div className="max-w-4xl mx-auto w-full space-y-8 pb-20">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
            Prontuário Gerado
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Revise e copie os dados para o sistema.
          </p>
        </div>

        {/* Action Bar (Glassmorphism) */}
        <div className="flex justify-center">
          <div className="p-1.5 bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl flex items-center gap-2 shadow-lg shadow-black/5">
            <button
              onClick={() => setIsUppercaseMode(!isUppercaseMode)}
              className={`
                  nav-btn glass-btn-small
                  relative overflow-hidden
                  ${isUppercaseMode ? 'selected' : ''}
                `}
            >
              <Type className="w-4 h-4" />
              <span className="hidden sm:inline">CAIXA ALTA</span>
              {isUppercaseMode && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-transparent"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>

            <div className="w-px h-8 bg-slate-300 dark:bg-slate-700 mx-1" />

            <button
              onClick={() => handleCopy(fullText, 'Tudo')}
              className="nav-btn glass-btn-small glass-btn-small-primary"
            >
              {copiedSection === 'Tudo' ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              Copiar Tudo
            </button>

            <div className="w-px h-8 bg-slate-300 dark:bg-slate-700 mx-1" />

            <button
              onClick={onReset}
              className="nav-btn glass-btn-small hover:text-red-600 dark:hover:text-red-400"
            >
              <RefreshCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Novo</span>
            </button>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 gap-6">
          <SectionCard
            title="Queixa Principal"
            content={formatText(editableRecord.queixa_principal)}
            onUpdate={(val: string) => handleUpdate('queixa_principal', val)}
            onCopy={() => handleCopy(formatText(editableRecord.queixa_principal), 'QP')}
            isCopied={copiedSection === 'QP'}
          />
          <SectionCard
            title="Exame Físico"
            content={formatText(editableRecord.exame_fisico)}
            onUpdate={(val: string) => handleUpdate('exame_fisico', val)}
            onCopy={() => handleCopy(formatText(editableRecord.exame_fisico), 'EF')}
            isCopied={copiedSection === 'EF'}
          />
          <SectionCard
            title="Hipótese Diagnóstica"
            content={formatText(editableRecord.hipotese_diagnostica)}
            onUpdate={(val: string) => handleUpdate('hipotese_diagnostica', val)}
            onCopy={() => handleCopy(formatText(editableRecord.hipotese_diagnostica), 'HD')}
            isCopied={copiedSection === 'HD'}
          />
          <SectionCard
            title="Conduta"
            content={formatText(editableRecord.conduta)}
            onUpdate={(val: string) => handleUpdate('conduta', val)}
            onCopy={() => handleCopy(formatText(editableRecord.conduta), 'Conduta')}
            isCopied={copiedSection === 'Conduta'}
          />
          <div className="flex gap-4">
            <div className="flex-1">
              <SectionCard
                title="CID"
                content={`${editableRecord.cid} - ${editableRecord.cid_descricao}`}
                onUpdate={() => {}}
                readOnly
                onCopy={() =>
                  handleCopy(`${editableRecord.cid} - ${editableRecord.cid_descricao}`, 'CID')
                }
                isCopied={copiedSection === 'CID'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SectionCardProps {
  title: string
  content: string
  onUpdate: (value: string) => void
  onCopy: () => void
  isCopied: boolean
  readOnly?: boolean
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  content,
  onUpdate,
  onCopy,
  isCopied,
  readOnly = false,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(content)
  const textareaRef = useRef<React.ElementRef<'textarea'>>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [isEditing, tempValue])

  const handleDoubleClick = () => {
    if (!readOnly) {
      setTempValue(content)
      setIsEditing(true)
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    onUpdate(tempValue)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setTempValue(content)
  }

  const handleBlur = (e: React.FocusEvent) => {
    // If we are clicking on our own buttons (which preventDefault on mousedown),
    // this blur won't trigger or we don't need to worry about it conflicting.
    // Standard behavior: click outside -> save.
    handleSave()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel()
    }
    // Save on Ctrl+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSave()
    }
  }

  return (
    <div
      className={`
            relative rounded-2xl p-5 transition-all duration-300 group
            ${
              isEditing
                ? 'bg-white dark:bg-slate-900 ring-2 ring-blue-500 shadow-xl scale-[1.01] z-10'
                : 'bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/40 dark:border-white/5 shadow-sm hover:shadow-md'
            }
        `}
      onDoubleClick={handleDoubleClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 select-none">
          {title}
          {!readOnly && !isEditing && (
            <span className="text-[10px] normal-case bg-slate-100 dark:bg-slate-700/50 px-2 py-0.5 rounded text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
              Duplo clique para editar
            </span>
          )}
          {isEditing && (
            <span className="text-[10px] normal-case text-blue-500 font-bold animate-pulse">
              Editando...
            </span>
          )}
        </h3>
        {!isEditing && (
          <button
            onClick={onCopy}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all opacity-0 group-hover:opacity-100"
          >
            {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="relative">
          <textarea
            ref={textareaRef}
            autoFocus
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none focus:ring-0 p-0 text-slate-800 dark:text-slate-200 text-base leading-relaxed font-medium resize-none overflow-hidden"
            style={{ minHeight: '60px' }}
          />
          <div className="flex justify-end gap-2 mt-4 animate-in fade-in slide-in-from-top-2">
            <button
              onMouseDown={(e) => e.preventDefault()} // Prevent blur
              onClick={handleCancel}
              className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Cancelar
            </button>
            <button
              onMouseDown={(e) => e.preventDefault()} // Prevent blur
              onClick={handleSave}
              className="px-3 py-1.5 text-xs font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-1"
            >
              <Check className="w-3 h-3" /> Salvar
            </button>
          </div>
        </div>
      ) : (
        <div className="text-slate-800 dark:text-slate-200 text-base leading-relaxed whitespace-pre-wrap font-medium cursor-text">
          {content}
        </div>
      )}
    </div>
  )
}
