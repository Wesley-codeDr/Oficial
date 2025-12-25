import React from 'react'
import { flashTemplates } from '@/lib/data/flashTemplates'
import { Stethoscope, ArrowRight, Thermometer, Zap } from 'lucide-react'

interface FlashTemplateSelectionProps {
  onSelect: (templateId: string) => void
}

export const FlashTemplateSelection: React.FC<FlashTemplateSelectionProps> = ({ onSelect }) => {
  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto custom-scrollbar">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
          Selecione a Queixa
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Escolha um modelo para iniciar o preenchimento rápido.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
        {Object.values(flashTemplates).map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className="group relative flex flex-col p-6 rounded-[24px] bg-white/40 dark:bg-slate-800/40 border border-white/50 dark:border-white/5 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl text-left"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                <Zap className="w-6 h-6" />
              </div>
              <div className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-[10px] font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                {template.categoria}
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {template.nome}
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4">
              {template.template.queixa_principal}
            </p>

            <div className="mt-auto flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
              Selecionar <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
