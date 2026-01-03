import React, { useMemo } from 'react'
import { flashTemplates, FlashTemplate } from '@/lib/data/flashTemplates'
import { motion } from 'framer-motion'
import { applePhysics } from '@/lib/design-system/animation-tokens'
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

  const sortedCategories = useMemo(() => {
    return categoryOrder.filter((cat) => templatesByCategory[cat]?.length > 0)
  }, [templatesByCategory])

  return (
    <div className="h-full flex flex-col p-6 md:p-10 overflow-y-auto custom-scrollbar">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2 mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
          Selecione a Queixa
        </h2>
        <p className="text-[11px] text-blue-500 font-black uppercase tracking-[0.3em] opacity-80">
          {Object.keys(flashTemplates).length} Modelos Inteligentes • Liquid Pick
        </p>
      </motion.div>

      <div className="space-y-12 max-w-6xl mx-auto w-full">
        {sortedCategories.map((categoryKey, catIdx) => {
          const config = categoryConfig[categoryKey] || {
            label: categoryKey,
            icon: Stethoscope,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-500/10 group-hover:bg-blue-500',
          }
          const Icon = config.icon
          const templates = templatesByCategory[categoryKey]

          return (
            <motion.section 
              key={categoryKey}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: catIdx * 0.1, ...applePhysics.soft }}
            >
              <div className="flex items-center gap-3 mb-6 px-2">
                <div className={`p-2.5 rounded-xl ${config.bgColor.split(' ')[0]} ${config.color} shadow-sm border border-white/20`}>
                  <Icon className="w-5 h-5 stroke-[2.5px]" />
                </div>
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight">
                  {config.label}
                </h3>
                <div className="h-px flex-1 bg-linear-to-r from-slate-200 dark:from-white/10 to-transparent ml-2" />
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full">
                  {templates.length} {templates.length === 1 ? 'modelo' : 'modelos'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {templates.map((template, tIdx) => (
                  <motion.button
                    key={template.id}
                    layoutId={template.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ 
                      scale: 1.025,
                      translateY: -5,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.12)"
                    }}
                    whileTap={applePhysics.haptic}
                    transition={{ ...applePhysics.glass, delay: (catIdx * 0.1) + (tIdx * 0.05) }}
                    onClick={() => onSelect(template.id)}
                    className="group relative flex flex-col p-6 rounded-[32px] liquid-glass-material text-left overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-2xl ${config.bgColor} ${config.color} group-hover:text-white transition-all duration-500 shadow-sm border border-white/20`}
                      >
                        <Icon className="w-6 h-6 stroke-[2px]" />
                      </div>
                      <div className="px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/10 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest border border-white/20">
                        {template.template.cid}
                      </div>
                    </div>

                    <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight tracking-tight">
                      {template.nome}
                    </h4>

                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {template.template.hipotese_diagnostica[0]}
                    </p>

                    <div className="mt-auto flex items-center text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 duration-500">
                      Selecionar Modelo <ArrowRight className="w-4 h-4 ml-2 stroke-[3px]" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.section>
          )
        })}
      </div>
    </div>
  )
}

