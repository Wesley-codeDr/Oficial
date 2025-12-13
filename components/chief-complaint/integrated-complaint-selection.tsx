'use client'

/**
 * Integrated Complaint Selection
 *
 * Unified component for chief complaint selection.
 * Displays groups in a grid, expands inline to show complaints,
 * and shows complaint details before navigation to anamnese.
 */

import { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Search,
  Heart,
  Wind,
  Brain,
  Activity,
  Droplets,
  Bone,
  Thermometer,
  FlaskConical,
  Scan,
  Eye,
  Ear,
  Baby,
  Skull,
  AlertTriangle,
  Sun,
  ClipboardList,
  Clock,
  ShieldAlert,
  Tag,
  Calculator,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  FileText,
  X,
} from 'lucide-react'
import type {
  ChiefComplaintGroupWithCount,
  ChiefComplaintWithTags,
  ChiefComplaintWithRelations,
  PatientContext,
  ChiefComplaintTag,
} from '@/types/chief-complaint'
import { TAG_LABELS } from '@/lib/chief-complaint/constants'

interface IntegratedComplaintSelectionProps {
  groups: ChiefComplaintGroupWithCount[]
  patientContext: PatientContext | null
  onLoadComplaints: (groupCode: string) => Promise<ChiefComplaintWithTags[]>
  onLoadComplaintDetails: (complaintId: string) => Promise<ChiefComplaintWithRelations>
}

const ICON_MAP: Record<string, React.ReactNode> = {
  heart: <Heart className="size-5" />,
  wind: <Wind className="size-5" />,
  brain: <Brain className="size-5" />,
  activity: <Activity className="size-5" />,
  droplets: <Droplets className="size-5" />,
  bone: <Bone className="size-5" />,
  thermometer: <Thermometer className="size-5" />,
  'flask-conical': <FlaskConical className="size-5" />,
  scan: <Scan className="size-5" />,
  eye: <Eye className="size-5" />,
  ear: <Ear className="size-5" />,
  baby: <Baby className="size-5" />,
  skull: <Skull className="size-5" />,
  'alert-triangle': <AlertTriangle className="size-5" />,
  sun: <Sun className="size-5" />,
  'clipboard-list': <ClipboardList className="size-5" />,
}

export function IntegratedComplaintSelection({
  groups,
  patientContext,
  onLoadComplaints,
  onLoadComplaintDetails,
}: IntegratedComplaintSelectionProps) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)
  const [complaints, setComplaints] = useState<Map<string, ChiefComplaintWithTags[]>>(new Map())
  const [selectedComplaint, setSelectedComplaint] = useState<ChiefComplaintWithRelations | null>(null)
  const [loadingGroup, setLoadingGroup] = useState<string | null>(null)
  const [loadingComplaint, setLoadingComplaint] = useState<string | null>(null)

  // Filter groups by search
  const filteredGroups = useMemo(() => {
    if (!search.trim()) return groups
    const term = search.toLowerCase()
    return groups.filter(
      (group) =>
        group.namePt.toLowerCase().includes(term) ||
        group.nameEn.toLowerCase().includes(term) ||
        group.code.toLowerCase().includes(term) ||
        group.description?.toLowerCase().includes(term)
    )
  }, [groups, search])

  // Handle group click - expand/collapse and load complaints
  const handleGroupClick = useCallback(async (groupCode: string) => {
    if (expandedGroup === groupCode) {
      setExpandedGroup(null)
      setSelectedComplaint(null)
      return
    }

    setExpandedGroup(groupCode)
    setSelectedComplaint(null)

    // Load complaints if not cached
    if (!complaints.has(groupCode)) {
      setLoadingGroup(groupCode)
      try {
        const loadedComplaints = await onLoadComplaints(groupCode)
        setComplaints((prev) => new Map(prev).set(groupCode, loadedComplaints))
      } catch (error) {
        console.error('Failed to load complaints:', error)
      } finally {
        setLoadingGroup(null)
      }
    }
  }, [expandedGroup, complaints, onLoadComplaints])

  // Handle complaint click - load details
  const handleComplaintClick = useCallback(async (complaint: ChiefComplaintWithTags) => {
    if (selectedComplaint?.id === complaint.id) {
      setSelectedComplaint(null)
      return
    }

    setLoadingComplaint(complaint.id)
    try {
      const details = await onLoadComplaintDetails(complaint.id)
      setSelectedComplaint(details)
    } catch (error) {
      console.error('Failed to load complaint details:', error)
    } finally {
      setLoadingComplaint(null)
    }
  }, [selectedComplaint, onLoadComplaintDetails])

  // Navigate to anamnese
  const handleStartAnamnese = useCallback(() => {
    if (selectedComplaint?.syndrome) {
      router.push(`/anamnese/${selectedComplaint.syndrome.code}`)
    }
  }, [selectedComplaint, router])

  const expandedGroupData = expandedGroup ? groups.find((g) => g.code === expandedGroup) : null
  const expandedComplaints = expandedGroup ? complaints.get(expandedGroup) ?? [] : []

  return (
    <div className="space-y-6">
      {/* Global Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Buscar grupo ou queixa (ex: dor toracica, cefaleia...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 pl-11 rounded-2xl bg-white/60 dark:bg-slate-800/60 border-slate-200/50 dark:border-white/5 backdrop-blur-sm"
        />
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {filteredGroups.map((group, index) => {
          const isExpanded = expandedGroup === group.code
          const isLoading = loadingGroup === group.code

          return (
            <motion.button
              key={group.id}
              onClick={() => handleGroupClick(group.code)}
              className={cn(
                'group relative flex flex-col items-center gap-2 rounded-2xl border-2 bg-white/80 dark:bg-[#1c1c1e]/60 p-4 transition-all backdrop-blur-sm',
                isExpanded
                  ? 'border-ios-blue bg-ios-blue/5 dark:bg-ios-blue/10 shadow-lg shadow-ios-blue/10'
                  : 'border-white/60 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 hover:shadow-md'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ scale: isExpanded ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Icon */}
              <div
                className={cn(
                  'flex size-10 items-center justify-center rounded-full transition-colors',
                  isExpanded && 'ring-2 ring-ios-blue/30'
                )}
                style={{ backgroundColor: `${group.color}20`, color: group.color ?? '#6b7280' }}
              >
                {isLoading ? (
                  <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  ICON_MAP[group.icon ?? 'clipboard-list'] || <ClipboardList className="size-5" />
                )}
              </div>

              {/* Code Badge */}
              <span
                className="absolute right-2 top-2 rounded-md px-1.5 py-0.5 text-[9px] font-bold"
                style={{ backgroundColor: `${group.color}15`, color: group.color ?? '#6b7280' }}
              >
                {group.code}
              </span>

              {/* Name */}
              <span className="text-center text-xs font-medium leading-tight text-slate-700 dark:text-slate-300">
                {group.namePt}
              </span>

              {/* Count */}
              <span className="text-[10px] text-slate-400">{group._count.complaints} queixas</span>

              {/* Expand indicator */}
              {isExpanded ? (
                <ChevronUp className="absolute bottom-1 size-3 text-ios-blue" />
              ) : (
                <ChevronDown className="absolute bottom-1 size-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* No results */}
      {filteredGroups.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-slate-400">Nenhum grupo encontrado para "{search}"</p>
        </div>
      )}

      {/* Expanded Group - Complaints List */}
      <AnimatePresence>
        {expandedGroup && expandedGroupData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="bg-white/80 dark:bg-[#1c1c1e]/60 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-white/5 p-4 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex size-8 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${expandedGroupData.color}20`, color: expandedGroupData.color ?? '#6b7280' }}
                  >
                    <span className="text-xs font-bold">{expandedGroupData.code}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white">{expandedGroupData.namePt}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{expandedGroupData.description}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setExpandedGroup(null)
                    setSelectedComplaint(null)
                  }}
                  className="h-8 w-8 p-0 rounded-full"
                >
                  <X className="size-4" />
                </Button>
              </div>

              {/* Complaints List */}
              {loadingGroup === expandedGroup ? (
                <div className="py-8 text-center">
                  <div className="inline-block size-6 animate-spin rounded-full border-2 border-ios-blue border-t-transparent" />
                  <p className="mt-2 text-sm text-slate-400">Carregando queixas...</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                  {expandedComplaints.map((complaint) => {
                    const isSelected = selectedComplaint?.id === complaint.id
                    const isLoadingDetails = loadingComplaint === complaint.id

                    return (
                      <motion.button
                        key={complaint.id}
                        onClick={() => handleComplaintClick(complaint)}
                        className={cn(
                          'w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all',
                          isSelected
                            ? 'border-ios-blue bg-ios-blue/5 dark:bg-ios-blue/10'
                            : 'border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/10 hover:bg-slate-50/50 dark:hover:bg-white/5'
                        )}
                        whileHover={{ x: isSelected ? 0 : 4 }}
                      >
                        {/* Indicators */}
                        <div className="flex flex-col gap-0.5">
                          {complaint.isTimeSensitive && (
                            <Clock className="size-3.5 text-amber-500" />
                          )}
                          {complaint.isHighAcuity && (
                            <AlertTriangle className="size-3.5 text-red-500" />
                          )}
                          {complaint.requiresIsolation && (
                            <ShieldAlert className="size-3.5 text-purple-500" />
                          )}
                          {complaint.defaultCalculatorId && (
                            <Calculator className="size-3.5 text-blue-500" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-slate-700 dark:text-slate-200 truncate">
                              {complaint.namePt}
                            </span>
                            {isLoadingDetails && (
                              <div className="size-3 animate-spin rounded-full border border-ios-blue border-t-transparent" />
                            )}
                          </div>
                          {complaint.nameEn && (
                            <span className="text-xs text-slate-400 truncate block">{complaint.nameEn}</span>
                          )}
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mt-1">
                            {complaint.icd10Codes.slice(0, 2).map((code: string) => (
                              <span
                                key={code}
                                className="rounded px-1 py-0.5 text-[9px] font-mono bg-blue-500/10 text-blue-600"
                              >
                                {code}
                              </span>
                            ))}
                            {complaint.synonyms.slice(0, 1).map((syn: string) => (
                              <span
                                key={syn}
                                className="flex items-center gap-0.5 rounded px-1 py-0.5 text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500"
                              >
                                <Tag className="size-2" />
                                {syn}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Arrow */}
                        <ChevronRight className={cn(
                          'size-4 transition-transform',
                          isSelected ? 'text-ios-blue rotate-90' : 'text-slate-300'
                        )} />
                      </motion.button>
                    )
                  })}

                  {expandedComplaints.length === 0 && (
                    <div className="py-8 text-center text-slate-400 text-sm">
                      Nenhuma queixa encontrada neste grupo
                    </div>
                  )}
                </div>
              )}

              {/* Selected Complaint Details */}
              <AnimatePresence>
                {selectedComplaint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-slate-100 dark:border-white/5 pt-4 space-y-4">
                      {/* Complaint Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-slate-800 dark:text-white">
                            {selectedComplaint.namePt}
                          </h4>
                          <span className="text-xs font-mono text-slate-400">{selectedComplaint.code}</span>
                        </div>
                        <div className="flex gap-1.5">
                          {selectedComplaint.isTimeSensitive && (
                            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs">
                              <Clock className="size-3" />
                              Tempo
                            </span>
                          )}
                          {selectedComplaint.isHighAcuity && (
                            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/10 text-red-600 text-xs">
                              <AlertTriangle className="size-3" />
                              Alta Acuidade
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Definition */}
                      {selectedComplaint.definition && (
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {selectedComplaint.definition}
                        </p>
                      )}

                      {/* ICD-10 */}
                      {selectedComplaint.icd10Codes.length > 0 && (
                        <div>
                          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">CID-10</span>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {selectedComplaint.icd10Codes.map((code: string) => (
                              <span key={code} className="px-2 py-1 rounded-lg bg-blue-500/10 text-blue-600 text-xs font-mono">
                                {code}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Synonyms */}
                      {selectedComplaint.synonyms.length > 0 && (
                        <div>
                          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Sinonimos</span>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {selectedComplaint.synonyms.map((syn: string) => (
                              <span key={syn} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs">
                                <Tag className="size-2.5" />
                                {syn}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3 pt-2">
                        {selectedComplaint.syndrome && (
                          <Button
                            onClick={handleStartAnamnese}
                            className="gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700"
                          >
                            <FileText className="size-4" />
                            Iniciar Anamnese
                          </Button>
                        )}
                        {selectedComplaint.defaultCalculatorId && (
                          <Button variant="outline" className="gap-2 rounded-xl">
                            <Calculator className="size-4" />
                            Calculadora
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
