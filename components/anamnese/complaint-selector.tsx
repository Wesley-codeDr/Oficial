'use client'

import { useState, useMemo } from 'react'
import { Search, ChevronDown, X, AlertTriangle, Stethoscope, CheckCircle2, Calendar } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { buildComplaintGroups } from '@/lib/data/complaint-groups'
import { useComplaints } from '@/hooks/use-complaints'
import type { ComplaintApiPayload } from '@/lib/types/complaints-api'
import { Badge } from '@/components/ui/badge'
import * as Tokens from '@/lib/theme/tokens'
import {
  useGlassBlur,
  useGlassOpacity,
  useGlassBorder,
  useGlassShadow,
  useGlassRadius,
  useGlassNoise,
  useGlassSpecular,
  useGlassRimLight,
  useGlassHoverScale,
  useGlassTapScale,
} from '@/lib/theme/hooks'

interface ComplaintSelectorProps {
  selectedComplaintId: string | null
  onComplaintSelect: (complaintId: string) => void
  onClear: () => void
}

const GROUP_COLORS: Record<string, string> = {
  CV: 'text-red-600 dark:text-red-400',
  RC: 'text-blue-600 dark:text-blue-400',
  NC: 'text-purple-600 dark:text-purple-400',
  GI: 'text-orange-600 dark:text-orange-400',
  GU: 'text-teal-600 dark:text-teal-400',
  MSK: 'text-amber-600 dark:text-amber-400',
  INF: 'text-rose-600 dark:text-rose-400',
  OBG: 'text-pink-600 dark:text-pink-400',
  PED: 'text-sky-600 dark:text-sky-400',
  PSI: 'text-indigo-600 dark:text-indigo-400',
  TR: 'text-slate-600 dark:text-slate-400',
  TOX: 'text-lime-600 dark:text-lime-400',
  DERM: 'text-yellow-600 dark:text-yellow-400',
  ORL: 'text-emerald-600 dark:text-emerald-400',
  OFT: 'text-cyan-600 dark:text-cyan-400',
  ENV: 'text-neutral-600 dark:text-neutral-400',
  GEN: 'text-gray-600 dark:text-gray-400',
  PROTO_SEPSE: 'text-rose-600 dark:text-rose-400',
  PROTO_AVC: 'text-purple-600 dark:text-purple-400',
  PROTO_IC: 'text-blue-600 dark:text-blue-400',
  PROTO_TEP: 'text-cyan-600 dark:text-cyan-400',
}

export function ComplaintSelector({
  selectedComplaintId,
  onComplaintSelect,
  onClear,
}: ComplaintSelectorProps) {
  const { theme, systemTheme } = useTheme()
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')

  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  const { data: complaintsResponse, isLoading, isError } = useComplaints({ limit: 500, isActive: true })
  const complaints = useMemo(() => complaintsResponse?.data ?? [], [complaintsResponse?.data])
  const groups = useMemo(() => buildComplaintGroups(complaints), [complaints])

  // Get theme classes
  const glassBlur = useGlassBlur()
  const glassOpacity = useGlassOpacity('default', isDark)
  const glassBorder = useGlassBorder(isDark)
  const glassShadow = useGlassShadow('default', isDark)
  const glassRadius = useGlassRadius('MD')
  const glassNoise = useGlassNoise()
  const glassSpecular = useGlassSpecular()
  const glassRimLight = useGlassRimLight()
  const glassHoverScale = useGlassHoverScale()
  const glassTapScale = useGlassTapScale()

  // Queixa selecionada
  const selectedComplaint = useMemo(() => {
    if (!selectedComplaintId) return null
    return complaints.find(c => c.id === selectedComplaintId)
  }, [selectedComplaintId, complaints])

  // Queixas filtradas
  const filteredComplaints = useMemo(() => {
    let result: ComplaintApiPayload[] = complaints

    // Filtrar por grupo
    if (selectedGroup) {
      result = result.filter(c => c.group === selectedGroup)
    }

    // Filtrar por busca
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.synonyms?.some(s => s.toLowerCase().includes(q))
      )
    }

    // Ordenar por risco e nome
    return [...result].sort((a, b) => {
      const riskOrder: Record<string, number> = { high: 0, medium: 1, low: 2 }
      const riskDiff = (riskOrder[a.riskLevel] ?? 2) - (riskOrder[b.riskLevel] ?? 2)
      if (riskDiff !== 0) return riskDiff
      return a.title.localeCompare(b.title)
    })
  }, [complaints, selectedGroup, searchTerm])

  // Grupos com contagem
  const groupsWithCount = useMemo(() => {
    return groups.map(g => ({
      ...g,
      count: complaints.filter(c => c.group === g.code).length
    })).filter(g => g.count > 0)
  }, [groups, complaints])

  const handleSelect = (complaintId: string) => {
    onComplaintSelect(complaintId)
    setIsOpen(false)
    setSearchTerm('')
    setSelectedGroup(null)
  }

  const handleClear = () => {
    onClear()
    setSearchTerm('')
    setSelectedGroup(null)
  }

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between gap-3 px-4 py-3',
          glassBlur,
          glassOpacity,
          glassBorder,
          glassRadius,
          glassNoise,
          glassSpecular,
          glassRimLight,
          'transition-all',
          glassHoverScale,
          selectedComplaint
            ? cn('ring-2 ring-blue-500/50', useGlassShadow('primary', isDark))
            : 'hover:ring-2 hover:ring-blue-300/50'
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center',
            glassBlur,
            glassOpacity,
            glassBorder,
            glassRadius,
            glassNoise,
            glassSpecular,
            selectedComplaint && 'bg-blue-500/10'
          )}>
            <Stethoscope className={`w-5 h-5 ${selectedComplaint ? 'text-blue-600' : 'text-slate-500'}`} />
          </div>

          <div className="text-left min-w-0">
            {selectedComplaint ? (
              <>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium ${GROUP_COLORS[selectedComplaint.group] || 'text-gray-500'}`}>
                    {groups.find(g => g.code === selectedComplaint.group)?.label || selectedComplaint.group}
                  </span>
                  <span className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded-full font-medium',
                    glassBlur,
                    glassOpacity,
                    glassBorder,
                    glassRadius,
                    glassNoise,
                    glassSpecular,
                    selectedComplaint.riskLevel === 'high' && 'text-red-600 dark:text-red-400',
                    selectedComplaint.riskLevel === 'medium' && 'text-amber-600 dark:text-amber-400',
                    selectedComplaint.riskLevel === 'low' && 'text-green-600 dark:text-green-400'
                  )}>
                    {selectedComplaint.riskLevel === 'high' ? 'ALTO' :
                      selectedComplaint.riskLevel === 'medium' ? 'MÉDIO' : 'BAIXO'}
                  </span>
                </div>
                <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {selectedComplaint.title}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Selecione a queixa principal
                </p>
                <p className="font-medium text-slate-700 dark:text-slate-300">
                  Clique para buscar por queixa
                </p>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {selectedComplaint && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleClear()
              }}
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          )}
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className={cn(
          'absolute z-50 top-full left-0 right-0 mt-2 overflow-hidden',
          glassBlur,
          glassOpacity,
          glassBorder,
          glassShadow,
          glassRadius,
          glassNoise,
          glassSpecular,
          glassRimLight
        )}>
          {/* Search Input */}
          <div className={cn(
            'p-3',
            glassBorder.replace('border-', 'border-b-')
          )}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar queixa, sintoma ou síndrome..."
                className={cn(
                  'w-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all',
                  glassBlur,
                  glassOpacity,
                  glassBorder,
                  glassRadius,
                  glassNoise,
                  glassSpecular
                )}
                autoFocus
              />
            </div>
          </div>

          {/* Groups Pills */}
          <div className={cn(
            'p-2 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto',
            glassBorder.replace('border-', 'border-b-')
          )}>
            <button
              type="button"
              onClick={() => setSelectedGroup(null)}
              className={cn(
                'px-2.5 py-1 rounded-full text-xs font-medium transition-all',
                glassBlur,
                glassOpacity,
                glassBorder,
                glassRadius,
                glassNoise,
                glassSpecular,
                glassHoverScale,
                !selectedGroup
                  ? cn('bg-blue-500/90 text-white', useGlassShadow('primary', isDark))
                  : 'hover:bg-white/20 text-slate-600 dark:text-slate-300'
              )}
            >
              Todos ({complaints.length})
            </button>
            {groupsWithCount.slice(0, 12).map(group => (
              <button
                key={group.code}
                type="button"
                onClick={() => setSelectedGroup(group.code === selectedGroup ? null : group.code)}
                className={cn(
                  'px-2.5 py-1 rounded-full text-xs font-medium transition-all',
                  glassBlur,
                  glassOpacity,
                  glassBorder,
                  glassRadius,
                  glassNoise,
                  glassSpecular,
                  glassHoverScale,
                  selectedGroup === group.code
                    ? cn('bg-blue-500/90 text-white', useGlassShadow('primary', isDark))
                    : 'hover:bg-white/20 text-slate-600 dark:text-slate-300'
                )}
              >
                {group.label} ({group.count})
              </button>
            ))}
          </div>

          {/* Complaints List */}
          <div className="max-h-72 overflow-y-auto">
            {isLoading ? (
              <div className="p-6 text-center text-slate-500">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p>Carregando queixas...</p>
              </div>
            ) : isError ? (
              <div className="p-6 text-center text-rose-500">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-60" />
                <p>Não foi possível carregar as queixas</p>
              </div>
            ) : filteredComplaints.length === 0 ? (
              <div className="p-6 text-center text-slate-500">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p>Nenhuma queixa encontrada</p>
              </div>
            ) : (
              <div className="p-2">
                {filteredComplaints.map(complaint => (
                  <button
                    key={complaint.id}
                    type="button"
                    onClick={() => handleSelect(complaint.id)}
                    className={cn(
                      'w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all',
                      glassBlur,
                      glassOpacity,
                      glassBorder,
                      glassRadius,
                      glassNoise,
                      glassSpecular,
                      glassHoverScale,
                      glassTapScale,
                      selectedComplaintId === complaint.id
                        ? cn('bg-blue-500/10 ring-1 ring-blue-500/20', useGlassShadow('primary', isDark))
                        : 'hover:bg-white/10 dark:hover:bg-white/5'
                    )}
                  >
                    {/* Risk Indicator */}
                    <div className={`
                      w-2 h-2 rounded-full mt-2 shrink-0
                      ${complaint.riskLevel === 'high' ? 'bg-red-500 animate-pulse' :
                        complaint.riskLevel === 'medium' ? 'bg-amber-500' : 'bg-green-500'}
                    `} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className={`text-xs font-medium ${GROUP_COLORS[complaint.group] || 'text-gray-500'}`}>
                          {groups.find(g => g.code === complaint.group)?.label || complaint.group}
                        </span>
                        {complaint.riskLevel === 'high' && (
                          <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                        )}
                        {/* Red Flags Count */}
                        {complaint.extendedContentEBM?.redFlags && complaint.extendedContentEBM.redFlags.length > 0 && (
                          <Badge variant="destructive" className="h-4 px-1.5 text-[10px] gap-0.5 bg-red-600 text-white">
                            🚨 {complaint.extendedContentEBM.redFlags.length}
                          </Badge>
                        )}
                        {/* EBM Verified Badge */}
                        {complaint.extendedContentEBM?.lastEBMReview && (() => {
                          const reviewDate = new Date(complaint.extendedContentEBM.lastEBMReview)
                          const now = new Date()
                          const monthsDiff = Math.floor((now.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24 * 30))
                          const isRecent = monthsDiff < 6

                          return isRecent && (
                            <Badge variant="outline" className="h-4 px-1.5 text-[10px] gap-0.5 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 border-green-200 dark:border-green-800">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              EBM
                            </Badge>
                          )
                        })()}
                      </div>
                      <p className="font-medium text-slate-800 dark:text-slate-200">
                        {complaint.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {complaint.subtitle}
                      </p>
                      {/* Last Review Date (se disponível) */}
                      {complaint.extendedContentEBM?.lastEBMReview && (
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
                          <Calendar className="w-2.5 h-2.5" />
                          <span>
                            Rev. {new Date(complaint.extendedContentEBM.lastEBMReview).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className={cn(
            'p-2',
            glassBorder.replace('border-', 'border-t-'),
            glassBlur,
            glassOpacity,
            glassNoise,
            glassSpecular
          )}>
            <p className="text-xs text-center text-slate-500">
              {filteredComplaints.length} queixa(s) disponível(is)
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
