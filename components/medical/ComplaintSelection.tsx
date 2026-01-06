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
  BookOpen,
  ChevronRight,
  Zap,
  Check,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  buildSearchIndex,
  searchComplaints,
  getSearchSuggestions,
  type ComplaintFilters,
} from '@/lib/services/complaintSearchService'
import { analytics, addToSearchHistory } from '@/lib/analytics/events'
import { Patient, ComplaintGroup } from '@/lib/types/medical'
import type { ComplaintApiPayload } from '@/lib/types/complaints-api'
import { useComplaints } from '@/hooks/use-complaints'
import { buildComplaintGroups } from '@/lib/data/complaint-groups'
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

const getIconColor = (color: string): string => {
  const colorMap: Record<string, string> = {
    red: '#DC2626',
    blue: '#2563EB',
    purple: '#9333EA',
    orange: '#EA580C',
    teal: '#0F766E',
    amber: '#D97706',
    rose: '#E11D48',
    pink: '#DB2777',
    sky: '#0369A1',
    indigo: '#4F46E5',
    slate: '#475569',
    lime: '#65A30D',
    yellow: '#CA8A04',
    emerald: '#059669',
    cyan: '#0891B2',
    neutral: '#525252',
    gray: '#6B7280',
  }
  return colorMap[color] || '#64748B'
}

export const ComplaintSelection: React.FC<ComplaintSelectionProps> = ({ onSelect, patient }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGroupCode, setSelectedGroupCode] = useState<string | null>(null)
  const [filters, setFilters] = useState<ComplaintFilters>({})
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [protocolDrawerOpen, setProtocolDrawerOpen] = useState(false)
  const [selectedProtocolComplaint, setSelectedProtocolComplaint] = useState<ComplaintApiPayload | null>(null)

  const { data: complaintsResponse, isLoading, isError } = useComplaints({ limit: 500, isActive: true })
  const complaints = useMemo(() => complaintsResponse?.data ?? [], [complaintsResponse?.data])
  const searchIndex = useMemo(() => buildSearchIndex(complaints, 'runtime'), [complaints])
  const complaintById = useMemo(() => {
    return new Map(complaints.map((complaint) => [complaint.id, complaint]))
  }, [complaints])

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
    const typedGroups = buildComplaintGroups(complaints) as ComplaintGroup[]
    return [...typedGroups].sort((a, b) => {
      const aRec = a.recommendedFor?.includes(targetCategory) ?? false
      const bRec = b.recommendedFor?.includes(targetCategory) ?? false
      if (aRec && !bRec) return -1
      if (!aRec && bRec) return 1
      return (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
    })
  }, [complaints, targetCategory])

  const activeGroup = useMemo(() => {
    return groups.find((g) => g.code === selectedGroupCode)
  }, [groups, selectedGroupCode])

  const groupComplaints = useMemo(() => {
    if (!selectedGroupCode) return []
    return complaints
      .filter((c) => c.group === selectedGroupCode)
      .sort((a, b) => {
        const riskScore = (r: string) => (r === 'high' ? 3 : r === 'medium' ? 2 : 1)
        return riskScore(b.riskLevel) - riskScore(a.riskLevel)
      })
  }, [complaints, selectedGroupCode])

  const topSms = useMemo(() => {
    return complaints
      .filter(c =>
        (targetCategory === 'adult' && c.isTopForAdult) ||
        (targetCategory === 'child' && c.isTopForChild) ||
        c.riskLevel === 'high'
      )
      .slice(0, 4)
  }, [complaints, targetCategory])

  const filteredComplaints = useMemo(() => {
    if (!searchTerm) return []
    const effectiveFilters: ComplaintFilters = {
      ...filters,
      groupCodes: selectedGroupCode ? [selectedGroupCode] : filters.groupCodes,
    }
    const results = searchComplaints(searchIndex, searchTerm, effectiveFilters, 12)
    addToSearchHistory(searchTerm, results.length)
    analytics.complaintSearch(searchTerm, results.length)
    return results
      .map((result) => complaintById.get(result.complaintId))
      .filter((complaint): complaint is ComplaintApiPayload => Boolean(complaint))
  }, [searchIndex, searchTerm, filters, selectedGroupCode, complaintById])

  const suggestions = useMemo(() => {
    if (!searchTerm || searchTerm.trim().length < 2) return [] as string[]
    return getSearchSuggestions(searchIndex, searchTerm, 6)
  }, [searchIndex, searchTerm])

  const handleBack = () => {
    setSelectedGroupCode(null)
    setSearchTerm('')
    setFilters({})
  }

  const hasComplaints = complaints.length > 0

  return (
    <div className="h-full flex flex-col relative overflow-hidden p-2 sm:p-4">
      {/* Liquid Search Header */}
      <div className="shrink-0 mb-6 relative z-30 px-2">
        <div className="flex items-center gap-3 max-w-5xl mx-auto">
          {selectedGroupCode && !searchTerm && (
            <button
              onClick={handleBack}
              className="w-12 h-12 rounded-2xl glass-pill rim-light-ios26 hover:bg-white/20 text-slate-500 dark:text-slate-400 transition-all shadow-sm hover:scale-105 active:scale-95 flex items-center justify-center shrink-0"
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
              className="w-full liquid-glass-material rim-light-ios26 inner-glow-ios26 rounded-[32px] py-5 pl-16 pr-8 text-base font-black text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all hover:bg-white/20 dark:hover:bg-white/5"
              autoFocus={!selectedGroupCode}
            />

            <AnimatePresence>
              {suggestionsOpen && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  className="absolute mt-4 left-4 right-4 liquid-glass-material rim-light-ios26 inner-glow-ios26 rounded-[28px] shadow-2xl z-40 overflow-hidden py-2"
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
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-sm font-semibold text-slate-400">
            Carregando queixas...
          </div>
        ) : isError ? (
          <div className="h-full flex items-center justify-center text-sm font-semibold text-rose-500">
            Nao foi possivel carregar as queixas.
          </div>
        ) : !hasComplaints ? (
          <div className="h-full flex items-center justify-center text-sm font-semibold text-slate-400">
            Nenhuma queixa encontrada.
          </div>
        ) : searchTerm ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                Localizações Encontradas
              </h3>
              <span className="text-[10px] font-black text-blue-500 glass-pill px-3 py-1 uppercase tracking-widest">
                {filteredComplaints.length} Resultados
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-6xl mx-auto">
            <div className="flex items-center gap-6 mb-8 px-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg glass-pill transition-transform duration-500 hover:rotate-6">
                {React.createElement(ICON_MAP[activeGroup.icon] || Activity, {
                  className: 'w-7 h-7',
                  style: { color: getIconColor(activeGroup.color) },
                })}
              </div>
              <div className="space-y-0.5">
                <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter">
                  {activeGroup.label}
                </h2>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.15em] opacity-70">
                  {activeGroup.description ? `${activeGroup.description} • ` : ''}{groupComplaints.length} Opções
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groupComplaints.map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
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
                      complaint={complaint}
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
                  const isRecommended = group.recommendedFor.includes(targetCategory)

                  return (
                    <button
                      key={group.code}
                      onClick={() => setSelectedGroupCode(group.code)}
                      className="group relative flex flex-col items-center justify-center p-5 rounded-[28px] text-center transition-all duration-400
                                glass-molded rim-light-ios26 inner-glow-ios26
                                hover:bg-white/20 dark:hover:bg-white/5 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all duration-500 group-hover:scale-110 glass-pill">
                        <Icon className="w-6 h-6 stroke-[2px]" style={{ color: getIconColor(group.color) }} />
                      </div>

                      <h3 className="text-[13px] font-black text-slate-800 dark:text-slate-100 leading-tight group-hover:text-blue-600 transition-colors">
                        {group.label}
                      </h3>

                      {isRecommended && (
                        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 glass-pill bg-blue-500/90 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/20 ring-4 ring-white/50 dark:ring-slate-900/50 animate-in zoom-in duration-500">
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
  complaint: ComplaintApiPayload
  onClick: () => void
  onViewProtocol?: (complaint: ComplaintApiPayload) => void
  styleVariant?: 'default' | 'premium'
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint, onClick, onViewProtocol, styleVariant = 'default' }) => {
  const isHighRisk = complaint.riskLevel === 'high'
  const hasEBMContent = Boolean(
    complaint.extendedContentEBM?.ebmReferences?.length ||
    complaint.extendedContentEBM?.lastEBMReview ||
    complaint.extendedContent?.rawMarkdown?.includes('## ⚡ AÇÃO IMEDIATA')
  )

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'relative flex flex-col p-5 rounded-[28px] cursor-pointer transition-all duration-400',
        'glass-molded rim-light-ios26 inner-glow-ios26',
        styleVariant === 'premium' && 'ring-1 ring-blue-500/10 bg-gradient-to-br from-blue-500/5 to-transparent',
        isHighRisk ? 'ring-2 ring-red-500/20 border-red-500/30' : 'hover:shadow-lg hover:shadow-blue-500/5'
      )}
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
            <span key={chip} className="px-2 py-0.5 glass-pill text-[9px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-tighter">
              {chip}
            </span>
          ))}
          {hasEBMContent && (
             <span className="px-2 py-0.5 glass-pill text-green-600 dark:text-green-400 text-[9px] font-black uppercase">EBM</span>
          )}
        </div>


        <div className="flex gap-2">
           <button className={cn(
             'flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all',
             isHighRisk
               ? 'btn-primary-glass bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/20'
               : 'btn-primary-glass'
           )}>
             Atender
           </button>
           {hasEBMContent && onViewProtocol && (
             <button
                onClick={(e) => { e.stopPropagation(); onViewProtocol(complaint); }}
                className="w-10 h-10 flex items-center justify-center rounded-xl glass-pill text-slate-400 hover:text-blue-500 transition-all hover:scale-110"
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
