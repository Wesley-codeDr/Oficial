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
  BookOpen,
  ChevronRight,
  Zap,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { complaintsData } from '@/lib/data/complaintsData'
import {
  searchComplaints,
  getSearchSuggestions,
  type ComplaintFilters,
} from '@/lib/services/complaintSearchService'
import { getComplaintById } from '@/lib/data/searchIndex'
import { analytics, addToSearchHistory } from '@/lib/analytics/events'
import { Patient, Complaint } from '@/lib/types/medical'
import { ProtocolDrawer } from './ProtocolDrawer'

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
    purple: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-500/20 border-purple-200 dark:border-purple-500/30',
    orange: 'text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/20 border-orange-200 dark:border-orange-500/30',
    teal: 'text-teal-700 dark:text-teal-400 bg-teal-100 dark:bg-teal-500/20 border-teal-200 dark:border-teal-500/30',
    amber: 'text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/20 border-amber-200 dark:border-amber-500/30',
    rose: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-500/20 border-rose-200 dark:border-rose-500/30',
    pink: 'text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-500/20 border-pink-200 dark:border-pink-500/30',
    sky: 'text-sky-700 dark:text-sky-400 bg-sky-100 dark:bg-sky-500/20 border-sky-200 dark:border-sky-500/30',
    indigo: 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-500/20 border-indigo-200 dark:border-indigo-500/30',
    slate: 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-500/20 border-slate-200 dark:border-slate-500/30',
    lime: 'text-lime-700 dark:text-lime-400 bg-lime-100 dark:bg-lime-500/20 border-lime-200 dark:border-lime-500/30',
    yellow: 'text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-500/20 border-yellow-200 dark:border-yellow-500/30',
    emerald: 'text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20 border-emerald-200 dark:border-emerald-500/30',
    cyan: 'text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-500/20 border-cyan-200 dark:border-cyan-500/30',
    neutral: 'text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-500/20 border-neutral-200 dark:border-neutral-500/30',
    gray: 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-500/20 border-gray-200 dark:border-gray-500/30',
  }
  return map[color] || map.gray
}

export const ComplaintSelection: React.FC<ComplaintSelectionProps> = ({ onSelect, patient }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGroupCode, setSelectedGroupCode] = useState<string | null>(null)
  const [filters, setFilters] = useState<ComplaintFilters>({})
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [protocolDrawerOpen, setProtocolDrawerOpen] = useState(false)
  const [selectedProtocolComplaint, setSelectedProtocolComplaint] = useState<Complaint | null>(null)

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

  const topSms = useMemo(() => {
    return complaintsData.complaints
      .filter(c => 
        (targetCategory === 'adult' && c.isTopForAdult) || 
        (targetCategory === 'child' && c.isTopForChild) ||
        c.riskLevel === 'high'
      )
      .slice(0, 4)
  }, [targetCategory])

  const filteredComplaints = useMemo(() => {
    if (!searchTerm) return []
    const effectiveFilters: ComplaintFilters = {
      ...filters,
      groupCodes: selectedGroupCode ? [selectedGroupCode] : filters.groupCodes,
    }
    const results = searchComplaints(searchTerm, effectiveFilters, 12)
    addToSearchHistory(searchTerm, results.length)
    analytics.complaintSearch(searchTerm, results.length)
    return results
      .map((r) => getComplaintById(r.complaintId))
      .filter((c): c is NonNullable<typeof c> => Boolean(c))
  }, [searchTerm, filters, selectedGroupCode])

  const suggestions = useMemo(() => {
    if (!searchTerm || searchTerm.trim().length < 2) return [] as string[]
    return getSearchSuggestions(searchTerm, 6)
  }, [searchTerm])

  const handleBack = () => {
    setSelectedGroupCode(null)
    setSearchTerm('')
    setFilters({})
  }

  return (
    <div className="h-full flex flex-col relative overflow-hidden p-2 sm:p-4">
      {/* Liquid Search Header */}
      <div className="shrink-0 mb-6 relative z-30 px-2">
        <div className="flex items-center gap-3 max-w-5xl mx-auto">
          {selectedGroupCode && !searchTerm && (
            <button
              onClick={handleBack}
              className="w-12 h-12 rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 hover:bg-white/60 text-slate-500 dark:text-slate-400 transition-all shadow-sm hover:scale-105 active:scale-95 flex items-center justify-center shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none transition-transform duration-500 group-focus-within:scale-110">
              <Search className="w-5 h-5 text-slate-300 dark:text-slate-600 group-focus-within:text-blue-500 transition-colors" />
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
                  ? `Filtrar em ${activeGroup?.label}...`
                  : 'Sintoma, queixa ou síndrome...'
              }
              className="w-full bg-white/60 dark:bg-black/30 backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-none rounded-[32px] py-5 pl-16 pr-8 text-base font-black text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all hover:bg-white dark:hover:bg-black/50"
              autoFocus={!selectedGroupCode}
            />

            <AnimatePresence>
              {suggestionsOpen && suggestions.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  className="absolute mt-4 left-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-[28px] shadow-2xl z-40 overflow-hidden py-2"
                >
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSearchTerm(s)
                        setSuggestionsOpen(false)
                      }}
                      className="w-full text-left px-8 py-4 text-sm font-black text-slate-700 dark:text-slate-200 hover:bg-blue-500/10 hover:text-blue-600 transition-colors flex items-center justify-between group"
                    >
                      {s}
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-10 scroll-smooth">
        {searchTerm ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                Localizações Encontradas
              </h3>
              <span className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 uppercase tracking-widest">
                {filteredComplaints.length} Resultados
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredComplaints.map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint as unknown as Complaint}
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
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-6xl mx-auto">
            <div className="flex items-center gap-6 mb-8 px-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ring-1 ring-white/20 transition-transform duration-500 hover:rotate-6 ${getColorClasses(activeGroup.color)}`}
              >
                {React.createElement(ICON_MAP[activeGroup.icon] || Activity, {
                  className: 'w-7 h-7',
                })}
              </div>
              <div className="space-y-0.5">
                <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter">
                  {activeGroup.label}
                </h2>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.15em] opacity-70">
                  {activeGroup.description} • {groupComplaints.length} Opções
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groupComplaints.map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint as unknown as Complaint}
                  onClick={() => onSelect(complaint.id, complaint.group)}
                  onViewProtocol={(c) => {
                    setSelectedProtocolComplaint(c)
                    setProtocolDrawerOpen(true)
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Quick Access */}
            {topSms.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-5 px-4">
                   <div className="flex items-center gap-2.5">
                      <Zap className="w-5 h-5 text-blue-500 fill-blue-500/10" />
                      <h3 className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-[0.2em]">Sugeridos para este Perfil</h3>
                   </div>
                   <div className="h-px flex-1 bg-slate-100 dark:bg-white/10 mx-6 opacity-30" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {topSms.map((complaint) => (
                    <ComplaintCard
                      key={`top-${complaint.id}`}
                      complaint={complaint as unknown as Complaint}
                      onClick={() => onSelect(complaint.id, complaint.group)}
                      styleVariant="premium"
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Categories Grid - Optimized Spacing */}
            <section>
              <div className="flex items-center gap-2.5 mb-5 px-4">
                <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                </div>
                <h3 className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-[0.2em]">Explorar Especialidades</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {groups.map((group) => {
                  const Icon = ICON_MAP[group.icon] || Activity
                  const classes = getColorClasses(group.color)
                  const isRecommended = group.recommendedFor.includes(targetCategory)

                  return (
                    <button
                      key={group.code}
                      onClick={() => setSelectedGroupCode(group.code)}
                      className="group relative flex flex-col items-center justify-center p-5 rounded-[28px] text-center transition-all duration-400
                                bg-white/30 dark:bg-black/20 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-sm
                                hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 group"
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all duration-500 group-hover:scale-110 shadow-sm ${classes}`}>
                        <Icon className="w-6 h-6 stroke-[2px]" />
                      </div>

                      <h3 className="text-[13px] font-black text-slate-800 dark:text-slate-100 leading-tight group-hover:text-blue-600 transition-colors">
                        {group.label}
                      </h3>
                      
                      {isRecommended && (
                        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/20 ring-4 ring-white dark:ring-slate-900 animate-in zoom-in duration-500">
                          <Check className="w-3.5 h-3.5 stroke-[4px]" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </section>
          </div>
        )}
      </div>

      <ProtocolDrawer
        complaint={selectedProtocolComplaint}
        isOpen={protocolDrawerOpen}
        onClose={() => setProtocolDrawerOpen(false)}
      />
    </div>
  )
}

interface ComplaintCardProps {
  complaint: Complaint
  onClick: () => void
  onViewProtocol?: (complaint: Complaint) => void
  styleVariant?: 'default' | 'premium'
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint, onClick, onViewProtocol, styleVariant = 'default' }) => {
  const isHighRisk = complaint.riskLevel === 'high'
  const hasEBMContent = complaint.extendedContent?.rawMarkdown &&
    complaint.extendedContent.rawMarkdown.includes('## ⚡ AÇÃO IMEDIATA')

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
          relative flex flex-col p-5 rounded-[28px] cursor-pointer transition-all duration-400 border border-white/50 dark:border-white/10
          ${styleVariant === 'premium' 
            ? 'bg-gradient-to-br from-blue-500/5 via-white/40 to-white/40 dark:from-blue-500/10 dark:via-black/20 dark:to-black/20 ring-1 ring-blue-500/10' 
            : 'bg-white/40 dark:bg-black/20 backdrop-blur-xl'
          }
          ${isHighRisk ? 'ring-2 ring-red-500/20 border-red-500/30' : 'hover:shadow-lg hover:shadow-blue-500/5'}
       `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
             {isHighRisk && <Siren className="w-4 h-4 text-red-500 animate-pulse shrink-0" />}
             <h4 className={`text-sm font-black tracking-tight truncate ${isHighRisk ? 'text-red-600 dark:text-red-400' : 'text-slate-800 dark:text-white'}`}>
                {complaint.title}
             </h4>
          </div>
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider line-clamp-1 opacity-70">
            {complaint.subtitle}
          </p>
        </div>
      </div>

      <div className="mt-auto space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {complaint.chips?.slice(0, 2).map((chip: string) => (
            <span key={chip} className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
              {chip}
            </span>
          ))}
          {hasEBMContent && (
             <span className="px-2 py-0.5 bg-green-500/10 text-green-600 dark:text-green-400 text-[9px] font-black uppercase rounded-lg">EBM</span>
          )}
        </div>
        
        <div className="flex gap-2">
           <button className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
             isHighRisk ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 group-hover:bg-blue-600'
           }`}>
             Atender
           </button>
           {hasEBMContent && onViewProtocol && (
             <button 
                onClick={(e) => { e.stopPropagation(); onViewProtocol(complaint); }}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 text-slate-400 hover:text-blue-500 transition-all"
             >
                <BookOpen className="w-4 h-4" />
             </button>
           )}
        </div>
      </div>
      
      {isHighRisk && (
        <div className="absolute top-0 right-8 w-8 h-1 bg-red-500 rounded-b-full shadow-lg shadow-red-500/50" />
      )}
    </motion.div>
  )
}
