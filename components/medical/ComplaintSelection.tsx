'use client'

import React, { useState, useMemo } from 'react'
import {
  Search,
  ArrowLeft,
  HeartPulse,
  Wind,
  Brain,
  Utensils,
  Droplets,
  Bone,
  Thermometer,
  Baby,
  BrainCircuit,
  Siren,
  Biohazard,
  Hand,
  Ear,
  Eye,
  Sun,
  MoreHorizontal,
  Activity,
  AlertTriangle,
} from 'lucide-react'
import { complaintsData } from '@/lib/data/complaintsData'
import {
  searchComplaints,
  getSearchSuggestions,
  type ComplaintFilters,
} from '@/lib/services/complaintSearchService'
import { getComplaintById } from '@/lib/data/searchIndex'
import { analytics, addToSearchHistory } from '@/lib/analytics/events'
import { Patient, Complaint } from '@/lib/types/medical'

interface ComplaintSelectionProps {
  onSelect: (complaintId: string, groupCode: string) => void
  patient: Patient
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  HeartPulse,
  Wind,
  Brain,
  Utensils,
  Droplets,
  Bone,
  Thermometer,
  Baby,
  BrainCircuit,
  Siren,
  Biohazard,
  Hand,
  Ear,
  Eye,
  Sun,
  MoreHorizontal,
  Activity,
}

const getColorClasses = (color: string) => {
  const map: Record<string, string> = {
    red: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/20 border-red-200 dark:border-red-500/30',
    blue: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/20 border-blue-200 dark:border-blue-500/30',
    purple:
      'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-500/20 border-purple-200 dark:border-purple-500/30',
    orange:
      'text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/20 border-orange-200 dark:border-orange-500/30',
    teal: 'text-teal-700 dark:text-teal-400 bg-teal-100 dark:bg-teal-500/20 border-teal-200 dark:border-teal-500/30',
    amber:
      'text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/20 border-amber-200 dark:border-amber-500/30',
    rose: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-500/20 border-rose-200 dark:border-rose-500/30',
    pink: 'text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-500/20 border-pink-200 dark:border-pink-500/30',
    sky: 'text-sky-700 dark:text-sky-400 bg-sky-100 dark:bg-sky-500/20 border-sky-200 dark:border-sky-500/30',
    indigo:
      'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-500/20 border-indigo-200 dark:border-indigo-500/30',
    slate:
      'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-500/20 border-slate-200 dark:border-slate-500/30',
    lime: 'text-lime-700 dark:text-lime-400 bg-lime-100 dark:bg-lime-500/20 border-lime-200 dark:border-lime-500/30',
    yellow:
      'text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-500/20 border-yellow-200 dark:border-yellow-500/30',
    emerald:
      'text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20 border-emerald-200 dark:border-emerald-500/30',
    cyan: 'text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-500/20 border-cyan-200 dark:border-cyan-500/30',
    neutral:
      'text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-500/20 border-neutral-200 dark:border-neutral-500/30',
    gray: 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-500/20 border-gray-200 dark:border-gray-500/30',
  }
  return map[color] || map.gray
}

export const ComplaintSelection: React.FC<ComplaintSelectionProps> = ({ onSelect, patient }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGroupCode, setSelectedGroupCode] = useState<string | null>(null)
  const [filters, setFilters] = useState<ComplaintFilters>({})
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)

  const targetCategory = patient.isPregnant
    ? 'adultPregnant'
    : patient.category === 'pediatric'
      ? parseInt(patient.age || '0') < 1
        ? 'infant'
        : 'child'
      : patient.category === 'elderly'
        ? 'elderly'
        : 'adult'

  const groups = useMemo(() => {
    return [...complaintsData.groups].sort((a, b) => {
      const aRec = a.recommendedFor.includes(targetCategory)
      const bRec = b.recommendedFor.includes(targetCategory)
      if (aRec && !bRec) return -1
      if (!aRec && bRec) return 1
      return a.sortOrder - b.sortOrder
    })
  }, [targetCategory])

  const activeGroup = useMemo(() => {
    return complaintsData.groups.find((g) => g.code === selectedGroupCode)
  }, [selectedGroupCode])

  const groupComplaints = useMemo(() => {
    if (!selectedGroupCode) return []
    return complaintsData.complaints
      .filter((c) => c.group === selectedGroupCode)
      .sort((a, b) => {
        const riskScore = (r: string) => (r === 'high' ? 3 : r === 'medium' ? 2 : 1)
        return riskScore(b.riskLevel) - riskScore(a.riskLevel)
      })
  }, [selectedGroupCode])

  const filteredComplaints = useMemo(() => {
    if (!searchTerm) return []
    const effectiveFilters: ComplaintFilters = {
      ...filters,
      groupCodes: selectedGroupCode ? [selectedGroupCode] : filters.groupCodes,
    }
    const results = searchComplaints(searchTerm, effectiveFilters, 15)
    addToSearchHistory(searchTerm, results.length)
    analytics.complaintSearch(searchTerm, results.length)
    return results
      .map((r) => getComplaintById(r.complaintId))
      .filter((c): c is NonNullable<typeof c> => Boolean(c))
  }, [searchTerm, filters, selectedGroupCode])

  const suggestions = useMemo(() => {
    if (!searchTerm || searchTerm.trim().length < 2) return [] as string[]
    return getSearchSuggestions(searchTerm, 8)
  }, [searchTerm])

  const handleBack = () => {
    setSelectedGroupCode(null)
    setSearchTerm('')
    setFilters({})
  }

  return (
    <div className="h-full flex flex-col relative overflow-hidden p-6">
      {/* Floating Header */}
      <div className="shrink-0 mb-6 relative z-30">
        <div className="flex items-center gap-4">
          {selectedGroupCode && !searchTerm && (
            <button
              onClick={handleBack}
              className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500 transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setSuggestionsOpen(true)
              }}
              placeholder={
                selectedGroupCode
                  ? `Buscar em ${activeGroup?.label}...`
                  : 'Buscar queixa, sintoma ou síndrome...'
              }
              className="w-full bg-white/70 dark:bg-[#1c1c1e]/80 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-lg shadow-slate-200/20 dark:shadow-black/20 rounded-[24px] py-4 pl-14 pr-6 text-base font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all hover:shadow-xl"
              autoFocus={!selectedGroupCode}
            />

            {suggestionsOpen && suggestions.length > 0 && (
              <div className="absolute mt-2 left-0 right-0 bg-white dark:bg-[#1c1c1e] border border-white/50 dark:border-white/10 rounded-2xl shadow-lg z-40">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSearchTerm(s)
                      setSuggestionsOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Simple Filters */}
        <div className="mt-4 flex items-center gap-3 px-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, riskLevel: undefined }))}
              className="px-2 py-1 text-xs rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300"
            >
              Todos
            </button>
            <button
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, riskLevel: ['high'] }))}
              className="px-2 py-1 text-xs rounded-lg bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300"
            >
              Alto risco
            </button>
            <button
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, riskLevel: ['medium'] }))}
              className="px-2 py-1 text-xs rounded-lg bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300"
            >
              Médio
            </button>
            <button
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, riskLevel: ['low'] }))}
              className="px-2 py-1 text-xs rounded-lg bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
            >
              Baixo
            </button>
          </div>
          <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              checked={Boolean(filters.onlyFastTrack)}
              onChange={(e) => setFilters((prev) => ({ ...prev, onlyFastTrack: e.target.checked }))}
            />
            Fast track
          </label>
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar -mr-2 pr-2 pb-20 mask-image-b-gradient">
        {searchTerm ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 pl-1">
              Resultados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredComplaints.map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  onClick={() => {
                    analytics.complaintSelection(complaint.id, searchTerm)
                    addToSearchHistory(searchTerm, filteredComplaints.length, complaint.id)
                    onSelect(complaint.id, complaint.group)
                  }}
                />
              ))}
            </div>
          </div>
        ) : selectedGroupCode && activeGroup ? (
          <div className="animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="flex items-center gap-5 mb-8 px-2">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${getColorClasses(activeGroup.color)}`}
              >
                {React.createElement(ICON_MAP[activeGroup.icon] || Activity, {
                  className: 'w-7 h-7',
                })}
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                  {activeGroup.label}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {activeGroup.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupComplaints.map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  onClick={() => onSelect(complaint.id, complaint.group)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in zoom-in-95 duration-500">
            {groups.map((group) => {
              const Icon = ICON_MAP[group.icon] || Activity
              const classes = getColorClasses(group.color)
              const isRecommended = group.recommendedFor.includes(targetCategory)

              return (
                <button
                  key={group.code}
                  onClick={() => setSelectedGroupCode(group.code)}
                  className={`
                           group relative flex flex-col p-5 rounded-[26px] text-left transition-all duration-300
                           bg-white/40 dark:bg-[#1c1c1e]/60 backdrop-blur-md border border-white/50 dark:border-white/5 hover:border-white/80 dark:hover:border-white/20
                           hover:bg-white/60 dark:hover:bg-[#2c2c2e]/80 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 dark:hover:shadow-black/40 hover:-translate-y-1
                        `}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${classes}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    {isRecommended && (
                      <div className="bg-slate-100/80 dark:bg-slate-700/80 px-2 py-1 rounded-lg backdrop-blur-sm">
                        <Activity className="w-3.5 h-3.5 text-slate-500 dark:text-slate-300" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-[17px] font-bold text-slate-800 dark:text-slate-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">
                    {group.label}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 h-8 font-medium">
                    {group.description}
                  </p>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

interface ComplaintCardProps {
  complaint: Complaint
  onClick: () => void
}
const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint, onClick }) => {
  const isHighRisk = complaint.riskLevel === 'high'

  return (
    <button
      onClick={onClick}
      className={`
          flex flex-col items-start p-5 rounded-[24px] bg-white/60 dark:bg-[#1c1c1e]/60 backdrop-blur-md border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg text-left group w-full h-full
          ${
            isHighRisk
              ? 'border-red-100 dark:border-red-900/20 hover:border-red-200 hover:bg-red-50/30'
              : 'border-white/60 dark:border-white/10 hover:border-blue-200 dark:hover:border-blue-900 hover:bg-white/80 dark:hover:bg-[#2c2c2e]'
          }
       `}
    >
      <div className="w-full mb-1 flex items-center justify-between">
        <h4
          className={`text-[15px] font-bold ${isHighRisk ? 'text-red-600 dark:text-red-400' : 'text-slate-800 dark:text-white'}`}
        >
          {complaint.title}
        </h4>
        {isHighRisk && (
          <div className="p-1 bg-red-100 dark:bg-red-900/30 rounded-full">
            <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
          </div>
        )}
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-3 leading-relaxed">
        {complaint.subtitle}
      </p>
      <div className="mt-auto flex gap-1.5 flex-wrap">
        {complaint.chips.slice(0, 2).map((chip: string) => (
          <span
            key={chip}
            className="px-2 py-0.5 rounded-lg bg-slate-100/80 dark:bg-white/5 text-[10px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-white/10"
          >
            {chip}
          </span>
        ))}
      </div>
    </button>
  )
}
