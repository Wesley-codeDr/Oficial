'use client'

import React, { useState, useMemo } from 'react'
import { FlashInput } from '@/lib/data/flashTemplates'
import {
  getCheckboxesForTemplate,
  FlashCheckbox,
  hasRedFlags,
  getActiveRedFlags
} from '@/lib/data/flashCheckboxes'
import { motion, AnimatePresence } from 'framer-motion'
import { applePhysics } from '@/lib/design-system/animation-tokens'
import {
  ArrowRight,
  Activity,
  Thermometer,
  Clock,
  Brain,
  Heart,
  Wind,
  Droplets,
  AlertTriangle,
  Stethoscope,
  FileText,
  CheckCircle2,
  Circle,
} from 'lucide-react'

interface FlashFormProps {
  initialData: FlashInput['dados_variaveis']
  onUpdate: (data: FlashInput['dados_variaveis']) => void
  templateId: string
  onSubmit?: () => void
  checkedBoxes: Set<string>
  onCheckboxChange: (checkedIds: Set<string>) => void
}

export const FlashForm: React.FC<FlashFormProps> = ({
  initialData,
  onUpdate,
  templateId,
  onSubmit,
  checkedBoxes,
  onCheckboxChange,
}) => {
  const [formData, setFormData] = useState(initialData)

  // Obtém checkboxes específicos para este template
  const templateCheckboxes = useMemo(() => {
    return getCheckboxesForTemplate(templateId)
  }, [templateId])

  // Agrupa checkboxes por categoria
  const groupedCheckboxes = useMemo(() => {
    const groups: Record<string, FlashCheckbox[]> = {
      sintomas: [],
      exame_fisico: [],
      red_flags: [],
      antecedentes: [],
    }

    templateCheckboxes.forEach(cb => {
      if (cb.isRedFlag) {
        groups.red_flags.push(cb)
      } else if (groups[cb.category]) {
        groups[cb.category].push(cb)
      }
    })

    return groups
  }, [templateCheckboxes])

  // Verifica se há red flags ativos
  const activeRedFlags = useMemo(() => {
    return getActiveRedFlags(templateCheckboxes, checkedBoxes)
  }, [templateCheckboxes, checkedBoxes])

  const handleChange = (field: keyof FlashInput['dados_variaveis'], value: string) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    onUpdate(newData)
  }

  const handleCheckboxToggle = (checkboxId: string) => {
    const newChecked = new Set(checkedBoxes)
    if (newChecked.has(checkboxId)) {
      newChecked.delete(checkboxId)
    } else {
      newChecked.add(checkboxId)
    }
    onCheckboxChange(newChecked)
  }

  const isFaringo = templateId === 'faringoamigdalite'

  const categoryLabels: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
    sintomas: {
      label: 'Sintomas',
      icon: <FileText className="w-4 h-4" />,
      color: 'blue'
    },
    exame_fisico: {
      label: 'Exame Físico',
      icon: <Stethoscope className="w-4 h-4" />,
      color: 'emerald'
    },
    red_flags: {
      label: 'Red Flags',
      icon: <AlertTriangle className="w-4 h-4" />,
      color: 'red'
    },
    antecedentes: {
      label: 'Antecedentes',
      icon: <Activity className="w-4 h-4" />,
      color: 'purple'
    },
  }

  return (
    <div className="flex flex-col p-6 md:p-8 space-y-8 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="px-2 space-y-1">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
          Dados Clínicos
        </h2>
        <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.3em] opacity-80">
          Checkboxes específicos • MBE
        </p>
      </div>

      {/* Red Flags Alert Banner */}
      <AnimatePresence>
        {activeRedFlags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 shadow-lg shadow-red-500/10"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-black text-red-600 dark:text-red-400 text-sm">
                  {activeRedFlags.length} Red Flag{activeRedFlags.length > 1 ? 's' : ''} Detectado{activeRedFlags.length > 1 ? 's' : ''}
                </h3>
                <ul className="mt-1 space-y-0.5">
                  {activeRedFlags.map(rf => (
                    <li key={rf.id} className="text-xs text-red-600/80 dark:text-red-400/80">
                      • {rf.label.replace('🚨 ', '')}
                      {rf.mbeReference && (
                        <span className="text-red-500/60 ml-1">({rf.mbeReference})</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8">
        {/* Tempo de Sintomas */}
        <DurationSelector
          value={formData.tempo_sintomas}
          onChange={(v) => handleChange('tempo_sintomas', v)}
        />

        {/* Checkboxes Específicos por Categoria */}
        {templateCheckboxes.length > 0 && (
          <div className="space-y-6">
            {Object.entries(groupedCheckboxes).map(([category, checkboxes]) => {
              if (checkboxes.length === 0) return null

              const config = categoryLabels[category]
              const isRedFlagCategory = category === 'red_flags'

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`
                    p-6 rounded-[28px] relative overflow-hidden
                    ${isRedFlagCategory
                      ? 'bg-red-500/5 border-2 border-red-500/20'
                      : 'liquid-glass-material rim-light-ios26'}
                  `}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className={`
                      w-8 h-8 rounded-xl flex items-center justify-center
                      ${isRedFlagCategory
                        ? 'bg-red-500/20 text-red-500'
                        : `bg-${config.color}-500/10 text-${config.color}-500`}
                    `}>
                      {config.icon}
                    </div>
                    <h3 className={`
                      text-[11px] font-black uppercase tracking-widest
                      ${isRedFlagCategory
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-slate-500'}
                    `}>
                      {config.label}
                    </h3>
                    {isRedFlagCategory && (
                      <span className="text-[9px] font-bold text-red-500/60 uppercase tracking-wider ml-auto">
                        Atenção especial
                      </span>
                    )}
                  </div>

                  {/* Checkboxes Grid */}
                  <div className="grid grid-cols-1 gap-2.5">
                    {checkboxes.map((checkbox) => (
                      <CheckboxItem
                        key={checkbox.id}
                        checkbox={checkbox}
                        isChecked={checkedBoxes.has(checkbox.id)}
                        onToggle={() => handleCheckboxToggle(checkbox.id)}
                        isRedFlag={checkbox.isRedFlag}
                      />
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Sinais Vitais */}
        <div className="p-6 rounded-[28px] liquid-glass-material rim-light-ios26">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
              Sinais Vitais
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputGroup
              label="Temp (°C)"
              icon={<Thermometer className="w-4 h-4 text-rose-500" />}
              value={formData.temperatura || ''}
              onChange={(v) => handleChange('temperatura', v)}
              placeholder="37.8"
              type="number"
            />
            <InputGroup
              label="FC (bpm)"
              icon={<Heart className="w-4 h-4 text-pink-500" />}
              value={formData.fc || ''}
              onChange={(v) => handleChange('fc', v)}
              placeholder="80"
              type="number"
            />
            <InputGroup
              label="FR (irpm)"
              icon={<Wind className="w-4 h-4 text-emerald-500" />}
              value={formData.fr || ''}
              onChange={(v) => handleChange('fr', v)}
              placeholder="16"
              type="number"
            />
            <InputGroup
              label="SpO2 (%)"
              icon={<Droplets className="w-4 h-4 text-blue-500" />}
              value={formData.spo2 || ''}
              onChange={(v) => handleChange('spo2', v)}
              placeholder="98"
              type="number"
            />
          </div>
        </div>

        {/* Pressão Arterial */}
        <div className="relative p-6 rounded-[28px] liquid-glass-material rim-light-ios26 inner-glow-ios26 overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/30" />
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
              Pressão Arterial
            </h3>
          </div>
          <div className="flex gap-4 items-end">
            <InputGroup
              label="PA Sistólica"
              value={formData.pa_sistolica || ''}
              onChange={(v) => handleChange('pa_sistolica', v)}
              placeholder="120"
              type="number"
            />
            <span className="pb-4 text-slate-400 font-black text-xs opacity-40">×</span>
            <InputGroup
              label="PA Diastólica"
              value={formData.pa_diastolica || ''}
              onChange={(v) => handleChange('pa_diastolica', v)}
              placeholder="80"
              type="number"
            />
          </div>
        </div>

        {/* Glasgow */}
        <InputGroup
          label="Nível de Consciência (Glasgow)"
          icon={<Brain className="w-4 h-4 text-purple-500" />}
          value={formData.glasgow || '15'}
          onChange={(v) => handleChange('glasgow', v)}
          placeholder="15"
          type="number"
        />

        {/* Campo específico: Centor Score para Faringoamigdalite */}
        {isFaringo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-[28px] liquid-glass-material rim-light-ios26 inner-glow-ios26 border border-purple-500/20 shadow-lg shadow-purple-500/5"
          >
            <h3 className="text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-[0.2em] mb-4 opacity-80">
              Específico: Score de Centor
            </h3>
            <InputGroup
              label="Centor Score"
              value={formData.centor_score || ''}
              onChange={(v) => handleChange('centor_score', v)}
              placeholder="0-4"
              type="number"
            />
          </motion.div>
        )}
      </div>

      {/* Submit Button */}
      {onSubmit && (
        <div className="pt-4 pb-2">
          <motion.button
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={applePhysics.haptic}
            transition={applePhysics.glass}
            onClick={onSubmit}
            className="w-full h-16 btn-primary-glass text-white rounded-[28px] font-black text-base shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-95 transition-all overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span>Finalizar Atendimento</span>
            <ArrowRight className="w-5 h-5 stroke-[3px] group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      )}
    </div>
  )
}

/**
 * Componente de Checkbox Individual
 */
const CheckboxItem: React.FC<{
  checkbox: FlashCheckbox
  isChecked: boolean
  onToggle: () => void
  isRedFlag?: boolean
}> = ({ checkbox, isChecked, onToggle, isRedFlag }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={`
        w-full flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all
        ${isChecked
          ? isRedFlag
            ? 'bg-red-500/20 border-2 border-red-500/40 shadow-lg shadow-red-500/10'
            : 'bg-blue-500/15 border-2 border-blue-500/30 shadow-md shadow-blue-500/10'
          : 'bg-white/30 dark:bg-white/5 border border-white/30 dark:border-white/10 hover:bg-white/50 dark:hover:bg-white/10'
        }
      `}
    >
      {/* Checkbox Icon */}
      <div className={`
        w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all
        ${isChecked
          ? isRedFlag
            ? 'bg-red-500 text-white'
            : 'bg-blue-500 text-white'
          : 'bg-white/50 dark:bg-white/10 text-slate-300 dark:text-slate-600'
        }
      `}>
        {isChecked ? (
          <CheckCircle2 className="w-4 h-4" />
        ) : (
          <Circle className="w-4 h-4" />
        )}
      </div>

      {/* Label */}
      <span className={`
        text-sm font-semibold flex-1
        ${isChecked
          ? isRedFlag
            ? 'text-red-700 dark:text-red-300'
            : 'text-blue-700 dark:text-blue-300'
          : 'text-slate-600 dark:text-slate-400'
        }
      `}>
        {checkbox.label}
      </span>

      {/* MBE Reference Badge */}
      {checkbox.mbeReference && isChecked && (
        <span className={`
          text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full
          ${isRedFlag
            ? 'bg-red-500/20 text-red-600 dark:text-red-400'
            : 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
          }
        `}>
          MBE
        </span>
      )}
    </motion.button>
  )
}

/**
 * Input Group Component
 */
const InputGroup: React.FC<{
  label: string
  icon?: React.ReactNode
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}> = ({ label, icon, value, onChange, placeholder, type = 'text' }) => (
  <div className="space-y-2 flex-1 group/field">
    <label className="text-[10px] font-black text-slate-500 dark:text-slate-500 ml-1.5 flex items-center gap-2 uppercase tracking-widest opacity-60 group-focus-within/field:opacity-100 transition-opacity">
      {icon} {label}
    </label>
    <div className="relative group/input">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full liquid-glass-material rim-light-ios26 rounded-2xl px-4 py-3 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:font-medium placeholder:text-slate-300 dark:placeholder:text-slate-700"
      />
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-focus-within/input:opacity-100 transition-all rounded-full" />
    </div>
  </div>
)

/**
 * Duration Selector Component
 */
const DurationSelector: React.FC<{
  value: string
  onChange: (value: string) => void
}> = ({ value, onChange }) => {
  const presets = ['1d', '2d', '3d', '5d', '7d', '>7d']

  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-slate-500 dark:text-slate-500 ml-1.5 flex items-center gap-2 uppercase tracking-widest opacity-60">
        <Clock className="w-4 h-4 text-blue-500" /> Tempo de Sintomas
      </label>
      <div className="flex flex-wrap gap-2.5">
        {presets.map((preset) => (
          <motion.button
            key={preset}
            whileTap={applePhysics.haptic}
            transition={applePhysics.default}
            onClick={() => onChange(preset)}
            className={`
              px-5 py-2.5 rounded-full text-[12px] font-black transition-all glass-pill
              ${value === preset
                  ? 'bg-blue-500/90 text-white shadow-lg shadow-blue-500/30 scale-105 z-10'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-white/20 dark:hover:bg-white/10'
              }
            `}
          >
            {preset}
          </motion.button>
        ))}
        <motion.button
          whileTap={applePhysics.haptic}
          onClick={() => onChange('')}
          className="px-5 py-2.5 rounded-full text-[12px] font-black glass-pill text-slate-400 hover:text-blue-500 hover:bg-white/20 dark:hover:bg-white/10 transition-all"
        >
          Outro
        </motion.button>
      </div>
    </div>
  )
}
