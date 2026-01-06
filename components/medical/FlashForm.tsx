'use client'

import React, { useState } from 'react'
import { FlashInput } from '@/lib/data/flashTemplates'
import { motion } from 'framer-motion'
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
} from 'lucide-react'

interface FlashFormProps {
  initialData: FlashInput['dados_variaveis']
  onUpdate: (data: FlashInput['dados_variaveis']) => void
  templateId: string
  onSubmit?: () => void
}

export const FlashForm: React.FC<FlashFormProps> = ({ initialData, onUpdate, templateId, onSubmit }) => {
  const [formData, setFormData] = useState(initialData)

  const handleChange = (field: keyof FlashInput['dados_variaveis'], value: string) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    onUpdate(newData)
  }

  const isFaringo = templateId === 'faringoamigdalite'

  return (
    <div className="flex flex-col p-6 md:p-8 space-y-10 overflow-y-auto custom-scrollbar">
      <div className="px-2 space-y-1">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">Sinais Vitais & Dados</h2>
        <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.3em] opacity-80">Entrada de dados • Fluxo Vision 2025</p>
      </div>

      <div className="space-y-10">
        <DurationSelector
          value={formData.tempo_sintomas}
          onChange={(v) => handleChange('tempo_sintomas', v)}
        />

        <div className="grid grid-cols-2 gap-5">
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

        <div className="relative p-8 rounded-[32px] liquid-glass-material rim-light-ios26 inner-glow-ios26 overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/30" />
          <div className="flex gap-6 items-end">
            <InputGroup
              label="PA Sistólica"
              value={formData.pa_sistolica || ''}
              onChange={(v) => handleChange('pa_sistolica', v)}
              placeholder="120"
              type="number"
            />
            <span className="pb-5 text-slate-400 font-black text-xs opacity-40">X</span>
            <InputGroup
              label="PA Diastólica"
              value={formData.pa_diastolica || ''}
              onChange={(v) => handleChange('pa_diastolica', v)}
              placeholder="80"
              type="number"
            />
          </div>
        </div>

        <InputGroup
          label="Nível de Consciência (Glasgow)"
          icon={<Brain className="w-4 h-4 text-purple-500" />}
          value={formData.glasgow || '15'}
          onChange={(v) => handleChange('glasgow', v)}
          placeholder="15"
          type="number"
        />

        {isFaringo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-[32px] liquid-glass-material rim-light-ios26 inner-glow-ios26 border border-purple-500/20 shadow-lg shadow-purple-500/5"
          >
            <h3 className="text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-[0.2em] mb-6 opacity-80">Específico: Score de Centor</h3>
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

      {onSubmit && (
        <div className="pt-6 pb-2">
          <motion.button
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={applePhysics.haptic}
            transition={applePhysics.glass}
            onClick={onSubmit}
            className="w-full h-16 btn-primary-glass text-white rounded-[32px] font-black text-base shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-95 transition-all overflow-hidden relative group"
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

const InputGroup: React.FC<{
  label: string
  icon?: React.ReactNode
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}> = ({ label, icon, value, onChange, placeholder, type = 'text' }) => (
  <div className="space-y-3 flex-1 group/field">
    <label className="text-[10px] font-black text-slate-500 dark:text-slate-500 ml-1.5 flex items-center gap-2.5 uppercase tracking-widest opacity-60 group-focus-within/field:opacity-100 transition-opacity">
      {icon} {label}
    </label>
    <div className="relative group/input">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full liquid-glass-material rim-light-ios26 rounded-[24px] px-6 py-4 text-slate-900 dark:text-white font-bold text-base focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:font-medium placeholder:text-slate-300 dark:placeholder:text-slate-700"
      />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-focus-within/input:opacity-100 transition-all rounded-full" />
    </div>
  </div>
)

const DurationSelector: React.FC<{
  value: string
  onChange: (value: string) => void
}> = ({ value, onChange }) => {
  const presets = ['1d', '2d', '3d', '5d', '7d', '>7d']
  
  return (
    <div className="space-y-5">
      <label className="text-[10px] font-black text-slate-500 dark:text-slate-500 ml-1.5 flex items-center gap-2.5 uppercase tracking-widest opacity-60">
        <Clock className="w-4 h-4 text-blue-500" /> Tempo de Sintomas
      </label>
      <div className="flex flex-wrap gap-3">
        {presets.map((preset) => (
          <motion.button
            key={preset}
            whileTap={applePhysics.haptic}
            transition={applePhysics.default}
            onClick={() => onChange(preset)}
            className={`
              px-6 py-3 rounded-full text-[13px] font-black transition-all glass-pill
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
          className="px-6 py-3 rounded-full text-[13px] font-black glass-pill text-slate-400 hover:text-blue-500 hover:bg-white/20 dark:hover:bg-white/10 transition-all"
        >
          Outro
        </motion.button>
      </div>
    </div>
  )
}

