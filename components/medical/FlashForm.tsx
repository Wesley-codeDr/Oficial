import React, { useState, useEffect } from 'react'
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
  onSubmit: (data: FlashInput['dados_variaveis']) => void
  templateId: string
}

export const FlashForm: React.FC<FlashFormProps> = ({ initialData, onSubmit, templateId }) => {
  const [formData, setFormData] = useState(initialData)

  const handleChange = (field: keyof FlashInput['dados_variaveis'], value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFaringo = templateId === 'faringoamigdalite'

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto custom-scrollbar">
      <div className="max-w-4xl mx-auto w-full space-y-8 pb-20">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
            Dados Variáveis
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Preencha os sinais vitais e dados específicos.
          </p>
        </div>

        {/* Vital Signs Grid */}
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-[32px] p-6 border border-white/40 dark:border-white/5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4" /> Sinais Vitais & Gerais
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="sm:col-span-2 lg:col-span-4">
              <DurationSelector
                value={formData.tempo_sintomas}
                onChange={(v) => handleChange('tempo_sintomas', v)}
              />
            </div>

            <InputGroup
              label="Temperatura (°C)"
              icon={<Thermometer className="w-4 h-4 text-red-500" />}
              value={formData.temperatura || ''}
              onChange={(v) => handleChange('temperatura', v)}
              placeholder="37.8"
              type="number"
            />
            <InputGroup
              label="Frequência Cardíaca (bpm)"
              icon={<Heart className="w-4 h-4 text-rose-500" />}
              value={formData.fc || ''}
              onChange={(v) => handleChange('fc', v)}
              placeholder="80"
              type="number"
            />
            <InputGroup
              label="Frequência Respiratória (irpm)"
              icon={<Wind className="w-4 h-4 text-sky-500" />}
              value={formData.fr || ''}
              onChange={(v) => handleChange('fr', v)}
              placeholder="16"
              type="number"
            />
            <InputGroup
              label="Saturação O2 (%)"
              icon={<Droplets className="w-4 h-4 text-cyan-500" />}
              value={formData.spo2 || ''}
              onChange={(v) => handleChange('spo2', v)}
              placeholder="98"
              type="number"
            />
            <div className="flex gap-2">
              <InputGroup
                label="PA Sistólica"
                value={formData.pa_sistolica || ''}
                onChange={(v) => handleChange('pa_sistolica', v)}
                placeholder="120"
                type="number"
              />
              <span className="self-end pb-4 text-slate-400">x</span>
              <InputGroup
                label="PA Diastólica"
                value={formData.pa_diastolica || ''}
                onChange={(v) => handleChange('pa_diastolica', v)}
                placeholder="80"
                type="number"
              />
            </div>
            <InputGroup
              label="Glasgow"
              icon={<Brain className="w-4 h-4 text-purple-500" />}
              value={formData.glasgow || '15'}
              onChange={(v) => handleChange('glasgow', v)}
              placeholder="15"
              type="number"
            />
          </div>
        </div>

        {/* Specific Fields */}
        {isFaringo && (
          <div className="bg-purple-500/5 dark:bg-purple-900/10 backdrop-blur-xl rounded-[32px] p-6 border border-purple-100 dark:border-purple-900/30">
            <h3 className="text-sm font-bold text-purple-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              Específico: Faringoamigdalite
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <InputGroup
                label="Score de Centor"
                value={formData.centor_score || ''}
                onChange={(v) => handleChange('centor_score', v)}
                placeholder="0-4"
                type="number"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            onClick={() => onSubmit(formData)}
            className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[20px] font-bold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all flex items-center gap-2"
          >
            Gerar Prontuário <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

interface InputGroupProps {
  label: string
  icon?: React.ReactNode
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  autoFocus?: boolean
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = 'text',
  autoFocus = false,
}) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1 flex items-center gap-1">
      {icon} {label}
    </label>
    <input
      autoFocus={autoFocus}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-300"
    />
  </div>
)

const DurationSelector: React.FC<{
  value: string
  onChange: (value: string) => void
}> = ({ value, onChange }) => {
  const presets = ['1 dia', '2 dias', '3 dias', '5 dias', '7 dias', '> 7 dias']
  const [isCustom, setIsCustom] = useState(!presets.includes(value) && value !== '')

  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1 flex items-center gap-1">
        <Clock className="w-4 h-4 text-blue-500" /> Tempo de Sintomas
      </label>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => {
              onChange(preset)
              setIsCustom(false)
            }}
            className={`
              preset-btn
              px-4 py-2 rounded-xl text-sm font-bold transition-all border-2
              ${
                value === preset && !isCustom
                  ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
              }
            `}
          >
            {preset}
          </button>
        ))}
        <button
          onClick={() => {
            setIsCustom(true)
            onChange('')
          }}
          className={`
              preset-btn
              px-4 py-2 rounded-xl text-sm font-bold transition-all border-2
              ${
                isCustom
                  ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
              }
            `}
        >
          Outro
        </button>
      </div>

      {isCustom && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Digite o tempo (ex: 4 horas)"
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-300"
            autoFocus
          />
        </div>
      )}
    </div>
  )
}
