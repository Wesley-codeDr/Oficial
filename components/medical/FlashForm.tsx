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
      <div className="space-y-6">
        <DurationSelector
          value={formData.tempo_sintomas}
          onChange={(v) => handleChange('tempo_sintomas', v)}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputGroup
            label="Temp (°C)"
            icon={<Thermometer className="w-3.5 h-3.5 text-apple-red" />}
            value={formData.temperatura || ''}
            onChange={(v) => handleChange('temperatura', v)}
            placeholder="37.8"
            type="number"
          />
          <InputGroup
            label="FC (bpm)"
            icon={<Heart className="w-3.5 h-3.5 text-apple-pink" />}
            value={formData.fc || ''}
            onChange={(v) => handleChange('fc', v)}
            placeholder="80"
            type="number"
          />
          <InputGroup
            label="FR (irpm)"
            icon={<Wind className="w-3.5 h-3.5 text-apple-teal" />}
            value={formData.fr || ''}
            onChange={(v) => handleChange('fr', v)}
            placeholder="16"
            type="number"
          />
          <InputGroup
            label="SpO2 (%)"
            icon={<Droplets className="w-3.5 h-3.5 text-apple-blue" />}
            value={formData.spo2 || ''}
            onChange={(v) => handleChange('spo2', v)}
            placeholder="98"
            type="number"
          />
        </div>

        <div className="flex gap-4 items-end bg-slate-500/5 p-6 rounded-apple-card border border-white/40 dark:border-white/10 glass-texture rim-highlight">
          <InputGroup
            label="PA Sistólica"
            value={formData.pa_sistolica || ''}
            onChange={(v) => handleChange('pa_sistolica', v)}
            placeholder="120"
            type="number"
          />
          <span className="pb-4 text-slate-300 font-apple-black text-xs opacity-50">X</span>
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
          icon={<Brain className="w-3.5 h-3.5 text-apple-purple" />}
          value={formData.glasgow || '15'}
          onChange={(v) => handleChange('glasgow', v)}
          placeholder="15"
          type="number"
        />

        {isFaringo && (
          <div className="bg-apple-purple/5 dark:bg-apple-purple/10 rounded-apple-card p-6 border border-apple-purple/20 animate-in zoom-in duration-500 glass-texture rim-highlight">
            <h3 className="text-[11px] font-apple-black text-apple-purple uppercase tracking-apple-caps mb-4 opacity-80">Específico: Score de Centor</h3>
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
        <div className="pt-8">
          <button
            onClick={onSubmit}
            className="w-full h-14 bg-linear-to-br from-apple-blue to-[#0066CC] text-white rounded-apple-cta font-apple-semibold text-[15px] shadow-xl shadow-apple-blue/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 rim-highlight"
          >
            Finalizar Atendimento <ArrowRight className="w-4.5 h-4.5 stroke-[2.5px]" />
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
  <div className="space-y-2 flex-1">
    <label className="text-[11px] font-apple-semibold text-slate-500 dark:text-slate-400 ml-1.5 flex items-center gap-2 uppercase tracking-apple-label opacity-70">
      {icon} {label}
    </label>
    <div className="relative group/input">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/60 dark:bg-black/25 border border-white/40 dark:border-white/10 rounded-apple-input px-5 py-3.5 text-slate-800 dark:text-white font-apple-medium text-[15px] focus:outline-none focus:ring-4 focus:ring-apple-blue/15 focus:border-apple-blue/30 transition-all placeholder:font-apple-normal placeholder:text-slate-300 dark:placeholder:text-slate-700 glass-texture rim-highlight"
      />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-apple-blue/30 to-transparent opacity-0 group-focus-within/input:opacity-100 transition-opacity" />
    </div>
  </div>
)

const DurationSelector: React.FC<{
  value: string
  onChange: (value: string) => void
}> = ({ value, onChange }) => {
  const presets = ['1d', '2d', '3d', '5d', '7d', '>7d']
  
  return (
    <div className="space-y-3.5">
      <label className="text-[11px] font-apple-semibold text-slate-500 dark:text-slate-400 ml-1.5 flex items-center gap-2 uppercase tracking-apple-label opacity-70">
        <Clock className="w-3.5 h-3.5 text-apple-blue" /> Tempo de Sintomas
      </label>
      <div className="flex flex-wrap gap-2.5">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)}
            className={`
              px-4.5 py-2.5 rounded-[18px] text-[12px] font-apple-bold transition-all border rim-highlight
              ${value === preset
                  ? 'bg-apple-blue text-white border-apple-blue shadow-lg shadow-apple-blue/20 scale-105'
                  : 'bg-white/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-white/40 dark:border-white/10 hover:border-apple-blue/50 hover:bg-white/80 dark:hover:bg-white/10'
              }
            `}
          >
            {preset}
          </button>
        ))}
        <button 
          onClick={() => onChange('')}
          className="px-4.5 py-2.5 rounded-[18px] text-[12px] font-apple-bold border border-white/40 dark:border-white/10 text-slate-400 hover:text-apple-blue hover:bg-white/50 dark:hover:bg-white/5 transition-all rim-highlight"
        >
          Outro
        </button>
      </div>
    </div>
  )
}
