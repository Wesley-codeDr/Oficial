import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, CaseUpper, Printer, Check, Copy, AlertTriangle, Brain, FileText, Heart, List, Siren, Stethoscope, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NoteBlock } from '@/lib/types/medical'

interface SmartNotePanelProps {
  noteBlocks: NoteBlock[]
  isUppercaseMode: boolean
  setIsUppercaseMode: (v: boolean) => void
  onPrint: () => void
  editingBlockId: string | null
  setEditingBlockId: (id: string | null) => void
  manualEdits: Record<string, string>
  setManualEdits: React.Dispatch<React.SetStateAction<Record<string, string>>>
  copyBlock: (content: string, id: string) => void
  copiedId: string | null
  footer?: React.ReactNode
}

const BlockIcon = ({ name }: { name: NoteBlock['iconName'] }) => {
  const icons = {
    heart: <Heart className="w-4 h-4 text-red-500" />,
    list: <List className="w-4 h-4 text-blue-500" />,
    x: <XCircle className="w-4 h-4 text-slate-500" />,
    stethoscope: <Stethoscope className="w-4 h-4 text-emerald-500" />,
    alert: <AlertTriangle className="w-4 h-4 text-orange-500" />,
    brain: <Brain className="w-4 h-4 text-purple-500" />,
    siren: <Siren className="w-4 h-4 text-rose-500 animate-pulse" />,
  }
  return icons[name] || <FileText className="w-4 h-4 text-slate-500" />
}

export const SmartNotePanel: React.FC<SmartNotePanelProps> = ({
  noteBlocks,
  isUppercaseMode,
  setIsUppercaseMode,
  onPrint,
  editingBlockId,
  setEditingBlockId,
  manualEdits,
  setManualEdits,
  copyBlock,
  copiedId,
  footer
}) => {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-transparent">
      {/* Header */}
      <div className="px-6 py-8 border-b border-white/20 dark:border-white/10 flex justify-between items-center bg-transparent shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[14px] bg-linear-to-br from-purple-500/80 to-indigo-600/80 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
            <Sparkles className="w-5 h-5 stroke-[2px]" />
          </div>
          <div>
            <h3 className="font-bold text-[16px] text-slate-800 dark:text-white tracking-tight leading-none">
              Nota Inteligente
            </h3>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1.5 opacity-80">
              Processamento Real-time
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsUppercaseMode(!isUppercaseMode)} 
            title="Maiúsculas"
            className="w-10 h-10 rounded-xl hover:bg-white/20 dark:hover:bg-white/5 transition-all"
          >
              <CaseUpper className={`w-4 h-4 ${isUppercaseMode ? 'text-blue-500' : ''}`} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onPrint} 
            title="Imprimir"
            className="w-10 h-10 rounded-xl hover:bg-white/20 dark:hover:bg-white/5 transition-all"
          >
              <Printer className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 pb-28 space-y-5 overflow-y-auto custom-scrollbar bg-transparent">
        <AnimatePresence mode="popLayout">
          {noteBlocks.map((block) => (
            <motion.div 
              key={block.id} 
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onDoubleClick={() => setEditingBlockId(block.id)}
              className={`
                group relative rounded-[24px] border p-5 transition-all duration-300
                bg-white/40 dark:bg-white/5 backdrop-blur-md border-white/40 dark:border-white/10 
                hover:shadow-xl hover:bg-white/60 dark:hover:bg-white/10 hover:scale-[1.01]
                ${editingBlockId === block.id ? 'ring-2 ring-blue-500/50 bg-white/80 dark:bg-white/10 z-20' : ''}
              `}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${block.id === 'safety_check' ? 'bg-rose-500/20 text-rose-500' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}>
                    <BlockIcon name={block.iconName} />
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${block.id === 'safety_check' ? 'text-rose-500' : 'text-slate-400 dark:text-slate-500'}`}>
                    {block.title}
                  </span>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  {editingBlockId === block.id ? (
                    <button 
                      onClick={() => setEditingBlockId(null)}
                      className="p-2 rounded-xl bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition-all"
                      title="Salvar"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  ) : (
                    <button 
                      onClick={() => copyBlock(block.content, block.id)}
                      className="p-2 rounded-xl hover:bg-blue-500/10 hover:text-blue-500 text-slate-400 transition-all"
                      title="Copiar bloco"
                    >
                      {copiedId === block.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
              
              {editingBlockId === block.id ? (
                <textarea
                  autoFocus
                  value={manualEdits[block.id] !== undefined ? manualEdits[block.id] : block.content}
                  onChange={(e) => setManualEdits(prev => ({ ...prev, [block.id]: e.target.value }))}
                  onBlur={() => setEditingBlockId(null)}
                  className="w-full bg-transparent border-0 focus:ring-0 p-0 text-[15px] leading-relaxed font-medium text-slate-800 dark:text-white resize-none min-h-[100px] outline-none"
                  placeholder="Edite o texto aqui..."
                />
              ) : (
                <p className={`
                  text-[15px] leading-relaxed transition-all tracking-tight select-text
                  ${isUppercaseMode ? 'uppercase' : ''}
                  ${block.id === 'safety_check' ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-700 dark:text-slate-200 font-medium'}
                `}>
                  {block.content.split(/(\*\*.+?\*\*)/g).map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={part + i}>{part.slice(2, -2)}</strong>
                    }
                    return part
                  })}
                </p>
              )}

              {block.alerts && block.alerts.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {block.alerts.map((alert, i) => (
                    <motion.span 
                      key={i}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wide"
                    >
                      {alert}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {footer && (
        <div className="p-6 border-t border-white/20 dark:border-white/10 bg-transparent relative z-10 shrink-0">
          {footer}
        </div>
      )}
    </div>
  )
}
