import React, { useState } from 'react'
import { Copy, Check, FileText, ArrowLeft, RefreshCcw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

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

  const handleCopy = (text: string, label: string) => {
    ;(globalThis as any).navigator?.clipboard?.writeText(text)
    setCopiedSection(label)
    toast({ title: 'Copiado!', description: `${label} copiado para a área de transferência.` })
    globalThis.setTimeout(() => setCopiedSection(null), 2000)
  }

  const fullText = `
QP: ${record.queixa_principal}

EF: ${record.exame_fisico}

HD: ${record.hipotese_diagnostica.join(', ')}

CD: ${record.conduta}

CID: ${record.cid} - ${record.cid_descricao}
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

        {/* Action Bar */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleCopy(fullText, 'Tudo')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-2"
          >
            {copiedSection === 'Tudo' ? (
              <Check className="w-5 h-5" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
            Copiar Tudo
          </button>
          <button
            onClick={onReset}
            className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
          >
            <RefreshCcw className="w-5 h-5" />
            Novo Atendimento
          </button>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 gap-6">
          <SectionCard
            title="Queixa Principal"
            content={record.queixa_principal}
            onCopy={() => handleCopy(record.queixa_principal, 'QP')}
            isCopied={copiedSection === 'QP'}
          />
          <SectionCard
            title="Exame Físico"
            content={record.exame_fisico}
            onCopy={() => handleCopy(record.exame_fisico, 'EF')}
            isCopied={copiedSection === 'EF'}
          />
          <SectionCard
            title="Hipótese Diagnóstica"
            content={record.hipotese_diagnostica.join(', ')}
            onCopy={() => handleCopy(record.hipotese_diagnostica.join(', '), 'HD')}
            isCopied={copiedSection === 'HD'}
          />
          <SectionCard
            title="Conduta"
            content={record.conduta}
            onCopy={() => handleCopy(record.conduta, 'Conduta')}
            isCopied={copiedSection === 'Conduta'}
          />
          <div className="flex gap-4">
            <div className="flex-1">
              <SectionCard
                title="CID"
                content={`${record.cid} - ${record.cid_descricao}`}
                onCopy={() => handleCopy(`${record.cid} - ${record.cid_descricao}`, 'CID')}
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
  onCopy: () => void
  isCopied: boolean
}

const SectionCard: React.FC<SectionCardProps> = ({ title, content, onCopy, isCopied }) => (
  <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 p-5 shadow-sm group hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{title}</h3>
      <button
        onClick={onCopy}
        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all opacity-0 group-hover:opacity-100"
      >
        {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
    <div className="text-slate-800 dark:text-slate-200 text-base leading-relaxed whitespace-pre-wrap font-medium">
      {content}
    </div>
  </div>
)
