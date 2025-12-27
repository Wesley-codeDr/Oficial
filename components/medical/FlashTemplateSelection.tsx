import React, { useMemo } from 'react'
import { flashTemplates, FlashTemplate } from '@/lib/data/flashTemplates'
import {
  ArrowRight,
  Stethoscope,
  Ear,
  Heart,
  Brain,
  Bone,
  Droplet,
  Eye,
  Activity,
  Wind,
  Pill,
} from 'lucide-react'

interface FlashTemplateSelectionProps {
  onSelect: (templateId: string) => void
}

// Configuração de categorias com ícones e cores
const categoryConfig: Record<
  string,
  { label: string; icon: React.ElementType; color: string; bgColor: string }
> = {
  respiratorio: {
    label: 'Respiratório',
    icon: Wind,
    color: 'text-sky-600 dark:text-sky-400',
    bgColor: 'bg-sky-500/10 group-hover:bg-sky-500',
  },
  orl: {
    label: 'Otorrinolaringologia',
    icon: Ear,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-500/10 group-hover:bg-purple-500',
  },
  gastrointestinal: {
    label: 'Gastrointestinal',
    icon: Pill,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-500/10 group-hover:bg-amber-500',
  },
  urologico: {
    label: 'Urológico',
    icon: Droplet,
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-500/10 group-hover:bg-yellow-500',
  },
  neurologico: {
    label: 'Neurológico',
    icon: Brain,
    color: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-500/10 group-hover:bg-pink-500',
  },
  musculoesqueletico: {
    label: 'Musculoesquelético',
    icon: Bone,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-500/10 group-hover:bg-orange-500',
  },
  dermatologico: {
    label: 'Dermatológico / Alérgico',
    icon: Activity,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-500/10 group-hover:bg-red-500',
  },
  oftalmologico: {
    label: 'Oftalmológico',
    icon: Eye,
    color: 'text-teal-600 dark:text-teal-400',
    bgColor: 'bg-teal-500/10 group-hover:bg-teal-500',
  },
  psiquiatrico: {
    label: 'Psiquiátrico',
    icon: Heart,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-500/10 group-hover:bg-indigo-500',
  },
}

// Ordem de exibição das categorias (por prevalência)
const categoryOrder = [
  'respiratorio',
  'gastrointestinal',
  'neurologico',
  'musculoesqueletico',
  'urologico',
  'orl',
  'dermatologico',
  'oftalmologico',
  'psiquiatrico',
]

export const FlashTemplateSelection: React.FC<FlashTemplateSelectionProps> = ({ onSelect }) => {
  // Agrupa templates por categoria
  const templatesByCategory = useMemo(() => {
    const grouped: Record<string, FlashTemplate[]> = {}

    Object.values(flashTemplates).forEach((template) => {
      const cat = template.categoria
      if (!grouped[cat]) {
        grouped[cat] = []
      }
      grouped[cat].push(template)
    })

    return grouped
  }, [])

  // Ordena categorias conforme ordem definida
  const sortedCategories = useMemo(() => {
    return categoryOrder.filter((cat) => templatesByCategory[cat]?.length > 0)
  }, [templatesByCategory])

  return (
    <div className="h-full flex flex-col p-6 md:p-8 overflow-y-auto custom-scrollbar">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
          Selecione a Queixa
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg">
          {Object.keys(flashTemplates).length} modelos disponíveis organizados por categoria
        </p>
      </div>

      <div className="space-y-8 max-w-6xl mx-auto w-full">
        {sortedCategories.map((categoryKey) => {
          const config = categoryConfig[categoryKey] || {
            label: categoryKey,
            icon: Stethoscope,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-500/10 group-hover:bg-blue-500',
          }
          const Icon = config.icon
          const templates = templatesByCategory[categoryKey]

          return (
            <section key={categoryKey}>
              {/* Header da categoria */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl ${config.bgColor.split(' ')[0]} ${config.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">
                  {config.label}
                </h3>
                <span className="ml-auto text-sm text-slate-400 dark:text-slate-500">
                  {templates.length} {templates.length === 1 ? 'modelo' : 'modelos'}
                </span>
              </div>

              {/* Grid de templates */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => onSelect(template.id)}
                    className="group relative flex flex-col p-5 rounded-[20px] bg-white/40 dark:bg-slate-800/40 border border-white/50 dark:border-white/5 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl text-left"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`p-2.5 rounded-xl ${config.bgColor} ${config.color} group-hover:text-white transition-colors duration-300`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-[9px] font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                        {template.template.cid}
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                      {template.nome}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                      {template.template.hipotese_diagnostica[0]}
                    </p>

                    <div className="mt-auto flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                      Selecionar <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
