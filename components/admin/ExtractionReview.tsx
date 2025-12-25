'use client'

import { useState } from 'react'
import { Save, Trash2 } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import type { ExtractedData } from '@/lib/services/extractionService'
import { saveDraft } from '@/app/actions/import-actions'

interface ExtractionReviewProps {
  extractionId: string
  initialData: ExtractedData
  sourceText: string
}

export function ExtractionReview({ extractionId, initialData, sourceText }: ExtractionReviewProps) {
  const [data, setData] = useState<ExtractedData>(initialData)
  const [activeTab, setActiveTab] = useState<'symptoms' | 'redflags' | 'source'>('symptoms')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage(null)
    try {
      const result = await saveDraft(extractionId, data)
      if (result.success) {
        setSaveMessage({ type: 'success', text: 'Rascunho salvo com sucesso!' })
      } else {
        setSaveMessage({ type: 'error', text: `Erro ao salvar rascunho: ${result.error}` })
      }
    } catch {
      setSaveMessage({ type: 'error', text: 'Erro ao salvar rascunho.' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
      {/* Left Column: Editor */}
      <div className="flex flex-col gap-6 h-full overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('symptoms')}
              className={`glass-btn-small ${activeTab === 'symptoms' ? 'selected' : ''}`}
            >
              Perguntas ({data.questions?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('redflags')}
              className={`glass-btn-small ${activeTab === 'redflags' ? 'selected' : ''}`}
            >
              Red Flags ({data.redFlags?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('source')}
              className={`glass-btn-small lg:hidden ${activeTab === 'source' ? 'selected' : ''}`}
            >
              Ver Fonte
            </button>
          </div>

          <div className="flex items-center gap-4">
            {saveMessage && (
              <span
                className={`text-sm ${saveMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}
              >
                {saveMessage.text}
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="glass-btn-small glass-btn-small-primary"
            >
              {isSaving ? 'Salvando...' : 'Salvar Rascunho'}
              <Save className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pr-2 pb-20 space-y-4">
          <GlassCard className="mb-4">
            <label className="block text-sm font-medium text-slate-500 mb-1">
              Nome da Síndrome
            </label>
            <input
              type="text"
              value={data.syndromeName}
              onChange={(e) => setData({ ...data, syndromeName: e.target.value })}
              className="w-full bg-transparent text-2xl font-bold text-slate-800 border-none focus:ring-0 p-0 placeholder-slate-300"
              placeholder="Ex: Dor Torácica"
            />
            <input
              type="text"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              className="w-full bg-transparent text-slate-500 border-none focus:ring-0 p-0 mt-2"
              placeholder="Descrição breve..."
            />
          </GlassCard>

          {activeTab === 'symptoms' && (
            <div className="space-y-3">
              {data.questions.map((q, idx) => (
                <GlassCard key={idx} className="relative group">
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-red-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid gap-3">
                    <div className="flex gap-3">
                      <span className="px-2 py-1 rounded text-xs font-bold bg-blue-100 text-blue-700 h-fit">
                        {q.category}
                      </span>
                      <input
                        value={q.displayText}
                        onChange={(e) => {
                          const newQ = [...data.questions]
                          newQ[idx].displayText = e.target.value
                          setData({ ...data, questions: newQ })
                        }}
                        className="flex-1 font-medium bg-transparent border-b border-transparent focus:border-blue-300 focus:outline-none"
                      />
                    </div>

                    <div className="pl-10">
                      <label className="text-xs text-slate-400">Narrativa:</label>
                      <input
                        value={q.narrativeText}
                        onChange={(e) => {
                          const newQ = [...data.questions]
                          newQ[idx].narrativeText = e.target.value
                          setData({ ...data, questions: newQ })
                        }}
                        className="w-full text-sm text-slate-600 bg-transparent border-none focus:ring-0 p-0"
                      />
                    </div>

                    <div className="flex gap-4 pl-10 pt-2">
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={q.isRequired}
                          onChange={(e) => {
                            const newQ = [...data.questions]
                            newQ[idx].isRequired = e.target.checked
                            setData({ ...data, questions: newQ })
                          }}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        Obrigatória
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={q.isRedFlag}
                          onChange={(e) => {
                            const newQ = [...data.questions]
                            newQ[idx].isRedFlag = e.target.checked
                            setData({ ...data, questions: newQ })
                          }}
                          className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                        />
                        Red Flag
                      </label>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}

          {activeTab === 'redflags' && (
            <div className="space-y-3">
              {data.redFlags.map((rf, idx) => (
                <GlassCard key={idx} className="border-l-4 border-l-red-500">
                  <div className="grid gap-2">
                    <input
                      value={rf.name}
                      onChange={(e) => {
                        const newRF = [...data.redFlags]
                        newRF[idx].name = e.target.value
                        setData({ ...data, redFlags: newRF })
                      }}
                      className="font-bold text-red-700 bg-transparent border-none focus:ring-0 p-0"
                      placeholder="Nome do Sinal de Alarme"
                    />
                    <textarea
                      value={rf.message}
                      onChange={(e) => {
                        const newRF = [...data.redFlags]
                        newRF[idx].message = e.target.value
                        setData({ ...data, redFlags: newRF })
                      }}
                      className="w-full text-sm text-slate-600 bg-transparent border-none resize-none focus:ring-0 p-0"
                      placeholder="Mensagem de alerta..."
                    />
                    <div className="flex gap-2 mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded font-bold ${
                          rf.severity === 'CRITICAL'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {rf.severity}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}

          {activeTab === 'source' && (
            <div className="lg:hidden bg-white/50 p-4 rounded-xl border border-white/60 text-sm text-slate-600 font-mono whitespace-pre-wrap h-full overflow-y-auto">
              {sourceText}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Source Viewer (Desktop only) */}
      <div className="hidden lg:block h-full overflow-hidden bg-white/40 backdrop-blur-sm rounded-3xl border border-white/50 shadow-inner p-6">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 sticky top-0">
          Documento Original
        </h3>
        <div className="h-full overflow-y-auto pb-20 text-slate-700 leading-relaxed whitespace-pre-wrap font-serif">
          {sourceText}
        </div>
      </div>
    </div>
  )
}
