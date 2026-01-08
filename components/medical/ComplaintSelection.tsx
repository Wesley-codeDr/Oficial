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
      {/* Liquid Search Header - iOS 26 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="shrink-0 mb-6 relative z-30 px-2"
      >
        <div className="flex items-center gap-3 max-w-5xl mx-auto">
          {selectedGroupCode && !searchTerm && (
            <button
              onClick={handleBack}
              className={`
                w-12 h-12 rounded-2xl flex items-center justify-center shrink-0
                backdrop-blur-[40px] saturate-[180%]
                bg-white/55 dark:bg-slate-900/65
                border-[1.5px] border-white/50 dark:border-white/12
                shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)]
                shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]
                dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)]
                dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]
                text-slate-500 dark:text-slate-400
                hover:bg-white/70 dark:hover:bg-slate-900/75
                hover:scale-105
                active:scale-95
                transition-all duration-[300ms] ease-[cubic-bezier(0.25,1,0.5,1)]
              `}
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
              className={`
                w-full h-14 pl-16 pr-8 rounded-[32px]
                backdrop-blur-[40px] saturate-[180%]
                bg-white/55 dark:bg-slate-900/65
                border-[1.5px] border-white/50 dark:border-white/12
                shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)]
                shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]
                dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)]
                dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]
                text-base font-black
                text-slate-800 dark:text-slate-100
                placeholder:text-slate-300 dark:placeholder:text-slate-700
                focus:outline-none
                focus:ring-4 focus:ring-blue-500/10
                hover:bg-white/65 dark:hover:bg-slate-900/70
                transition-all duration-[300ms] ease-[cubic-bezier(0.25,1,0.5,1)]
              `}
              autoFocus={!selectedGroupCode}
            />

            <AnimatePresence>
              {suggestionsOpen && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                  className={`
                    absolute mt-4 left-4 right-4 z-40 overflow-hidden py-2
                    backdrop-blur-[60px] saturate-[180%]
                    bg-white/75 dark:bg-slate-900/75
                    border border-white/40 dark:border-white/20
                    rounded-[28px]
                    shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)]
                    dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]
                  `}
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
      </motion.div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-10 scroll-smooth">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
            />
          </div>
        ) : isError ? (
          <div className="h-full flex items-center justify-center">
            <div className={`
              liquid-glass-material
              bg-red-500/10 dark:bg-red-500/5
              border-red-500/30 dark:border-red-500/20
              rounded-3xl p-8 text-center
              shadow-[0_25px_50px_-12px_rgba(239,68,68,0.15)]
            `}>
              <p className="text-sm font-bold text-red-600 dark:text-red-400">
                Não foi possível carregar as queixas.
              </p>
            </div>
          </div>
        ) : selectedGroupCode || searchTerm ? (
          /* Selected Group or Search Results */
          <div className="space-y-3">
            {filteredComplaints.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`
                  liquid-glass-material
                  bg-slate-100/50 dark:bg-slate-800/50
                  border-slate-200/50 dark:border-slate-700/50
                  rounded-3xl p-8 text-center
                `}
              >
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Nenhum resultado encontrado para "{searchTerm}"
                </p>
              </motion.div>
            ) : (
              filteredComplaints.map((complaint, index) => {
                const IconComponent = ICON_MAP[complaint.icon] || Activity
                const iconColor = getIconColor(complaint.iconColor || 'blue')

                return (
                  <motion.button
                    key={complaint.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    onClick={() => onSelect(complaint.id, complaint.group)}
                    className={`
                      w-full text-left p-5 rounded-2xl
                      backdrop-blur-[40px] saturate-[180%]
                      bg-white/55 dark:bg-slate-900/65
                      border-[1.5px] border-white/40 dark:border-white/12
                      shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)]
                      dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]
                      hover:scale-[1.02] hover:shadow-lg
                      hover:bg-white/70 dark:hover:bg-slate-900/75
                      transition-all duration-[300ms] ease-[cubic-bezier(0.25,1,0.5,1)]
                      group
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: `${iconColor}15`, border: `1px solid ${iconColor}30` }}>
                        <IconComponent className="w-6 h-6" style={{ color: iconColor }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {complaint.label}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                          {complaint.description}
                        </p>
                      </div>
                      {complaint.riskLevel === 'high' && (
                        <div className="shrink-0 px-3 py-1 rounded-full bg-red-500/10 dark:bg-red-500/20 border border-red-500/30">
                          <span className="text-[10px] font-black uppercase tracking-wider text-red-600 dark:text-red-400">
                            Alto risco
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.button>
                )
              })
            )}
          </div>
        ) : (
          /* Default View - Top Symptoms & Groups */
          <div className="space-y-6">
            {/* Top Recommended Symptoms */}
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 px-2"
              >
                Recomendado para você
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topSms.map((complaint, index) => {
                  const IconComponent = ICON_MAP[complaint.icon] || Activity
                  const iconColor = getIconColor(complaint.iconColor || 'blue')

                  return (
                    <motion.button
                      key={complaint.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 + index * 0.05, duration: 0.3 }}
                      onClick={() => onSelect(complaint.id, complaint.group)}
                      className={`
                        w-full text-left p-4 rounded-2xl
                        backdrop-blur-[40px] saturate-[180%]
                        bg-white/55 dark:bg-slate-900/65
                        border-[1.5px] border-white/40 dark:border-white/12
                        shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)]
                        dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]
                        hover:scale-[1.03] hover:shadow-lg
                        hover:bg-white/70 dark:hover:bg-slate-900/75
                        transition-all duration-[300ms] ease-[cubic-bezier(0.25,1,0.5,1)]
                        group
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${iconColor}15`, border: `1px solid ${iconColor}30` }}>
                          <IconComponent className="w-5 h-5" style={{ color: iconColor }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {complaint.label}
                          </h3>
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Groups Grid */}
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 px-2"
              >
                Por Categoria
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {groups.map((group, index) => {
                  const IconComponent = ICON_MAP[group.icon] || Activity
                  const isRecommended = group.recommendedFor?.includes(targetCategory)

                  return (
                    <motion.button
                      key={group.code}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + index * 0.05, duration: 0.3 }}
                      onClick={() => setSelectedGroupCode(group.code)}
                      className={`
                        w-full text-left p-4 rounded-2xl relative overflow-hidden
                        backdrop-blur-[40px] saturate-[180%]
                        ${isRecommended
                          ? 'bg-gradient-to-br from-blue-500/15 to-purple-500/15 dark:from-blue-500/10 dark:to-purple-500/10'
                          : 'bg-white/55 dark:bg-slate-900/65'
                        }
                        border-[1.5px] ${isRecommended
                          ? 'border-blue-500/40 dark:border-blue-500/20'
                          : 'border-white/40 dark:border-white/12'
                        }
                        shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)]
                        dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]
                        hover:scale-[1.02] hover:shadow-lg
                        hover:bg-white/70 dark:hover:bg-slate-900/75
                        transition-all duration-[300ms] ease-[cubic-bezier(0.25,1,0.5,1)]
                        group
                      `}
                    >
                      {isRecommended && (
                        <div className="absolute top-2 right-2">
                          <div className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/40">
                            <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                              Recomendado
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-white/50 dark:bg-white/10 border border-white/30 dark:border-white/10">
                          <IconComponent className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-slate-900 dark:text-slate-100 truncate">
                            {group.label}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {group.description}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Protocol Drawer */}
      {selectedProtocolComplaint && (
        <ProtocolDrawer
          isOpen={protocolDrawerOpen}
          onClose={() => {
            setProtocolDrawerOpen(false)
            setSelectedProtocolComplaint(null)
          }}
          complaint={selectedProtocolComplaint}
        />
      )}
    </div>
  )
}
