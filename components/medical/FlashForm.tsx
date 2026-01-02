'use client'

import React, { useState } from 'react'
import { FlashInput } from '@/lib/data/flashTemplates'
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
  onSubmit?: () => void // Optional for when integrated in a live-updating workspace
}

export const FlashForm: React.FC<FlashFormProps> = ({ initialData, onUpdate, templateId, onSubmit }) => {
  const [formData, setFormData] = useState(initialData)

  const handleChange = (field: keyof FlashInput['dados_variaveis'], value: string) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    onUpdate(newData) // Live update for the workspace
  }

  const isFaringo = templateId === 'faringoamigdalite'

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="px-2">
        <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Sinais Vitais & Dados</h2>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em]">Entrada de dados • Atualização em tempo real</p>
      </div>

      {/* Main Form Fields */}
      <div className="space-y-5">
        <DurationSelector
          value={formData.tempo_sintomas}
          onChange={(v) => handleChange('tempo_sintomas', v)}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputGroup
            label="Temp (°C)"
            icon={<Thermometer className="w-3.5 h-3.5 text-red-500" />}
            value={formData.temperatura || ''}
            onChange={(v) => handleChange('temperatura', v)}
            placeholder="37.8"
            type="number"
          />
          <InputGroup
            label="FC (bpm)"
            icon={<Heart className="w-3.5 h-3.5 text-rose-500" />}
            value={formData.fc || ''}
            onChange={(v) => handleChange('fc', v)}
            placeholder="80"
            type="number"
          />
          <InputGroup
            label="FR (irpm)"
            icon={<Wind className="w-3.5 h-3.5 text-sky-500" />}
            value={formData.fr || ''}
            onChange={(v) => handleChange('fr', v)}
            placeholder="16"
            type="number"
          />
          <InputGroup
            label="SpO2 (%)"
            icon={<Droplets className="w-3.5 h-3.5 text-cyan-500" />}
            value={formData.spo2 || ''}
            onChange={(v) => handleChange('spo2', v)}
            placeholder="98"
            type="number"
          />
        </div>

        <div className="flex gap-4 items-end bg-slate-500/5 p-5 rounded-3xl border border-slate-200/50 dark:border-white/5">
          <InputGroup
            label="PA Sistólica"
            value={formData.pa_sistolica || ''}
            onChange={(v) => handleChange('pa_sistolica', v)}
            placeholder="120"
            type="number"
          />
          <span className="pb-4 text-slate-300 font-black">X</span>
          <InputGroup
            label="PA Diastólica"
            value={formData.pa_diastolica || ''}
            onChange={(v) => handleChange('pa_diastolica', v)}
            placeholder="80"
            type="number"
          />
        </div>

        <InputGroup
          label="Nível de Consciência (Glasgow)"
          icon={<Brain className="w-3.5 h-3.5 text-purple-500" />}
          value={formData.glasgow || '15'}
          onChange={(v) => handleChange('glasgow', v)}
          placeholder="15"
          type="number"
        />

        {isFaringo && (
          <div className="bg-purple-500/5 dark:bg-purple-900/10 rounded-[32px] p-5 border border-purple-100 dark:border-purple-900/30 animate-in zoom-in duration-500">
            <h3 className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-4">Específico: Score de Centor</h3>
            <InputGroup
              label="Centor Score"
              value={formData.centor_score || ''}
              onChange={(v) => handleChange('centor_score', v)}
              placeholder="0-4"
              type="number"
            />
          </div>
        )}
      </div>

      {onSubmit && (
        <div className="pt-6">
          <button
            onClick={onSubmit}
            className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            Finalizar Atendimento <ArrowRight className="w-4 h-4" />
          </button>
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
  <div className="space-y-1.5 flex-1">
    <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 ml-1 flex items-center gap-1 uppercase tracking-wider">
      {icon} {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:font-normal placeholder:text-slate-300 dark:placeholder:text-slate-700"
    />
  </div>
)

const DurationSelector: React.FC<{
  value: string
  onChange: (value: string) => void
}> = ({ value, onChange }) => {
  const presets = ['1d', '2d', '3d', '5d', '7d', '>7d']
  
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 ml-1 flex items-center gap-1 uppercase tracking-[0.15em]">
        <Clock className="w-3.5 h-3.5 text-blue-500" /> Tempo de Sintomas
      </label>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)}
            className={`
              px-4 py-2.5 rounded-xl text-xs font-black transition-all border
              ${value === preset
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-blue-300'
              }
            `}
          >
            {preset}
          </button>
        ))}
        <button 
          onClick={() => onChange('')}
          className="px-4 py-2.5 rounded-xl text-xs font-black border border-slate-200 dark:border-white/10 text-slate-400 hover:text-blue-500 transition-colors"
        >
          Outro
        </button>
      </div>
    </div>
  )
}
