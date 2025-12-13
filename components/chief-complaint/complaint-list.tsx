'use client'

/**
 * Chief Complaint List
 *
 * Displays a searchable, filterable list of chief complaints within a group.
 * Shows badges for ICD-10 codes, synonyms, time-sensitivity, and high-acuity.
 */

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Search,
  Clock,
  AlertTriangle,
  ShieldAlert,
  Tag,
  Calculator,
  ChevronRight,
  Filter,
} from 'lucide-react'
import type {
  ChiefComplaintWithTags,
  ChiefComplaintGroup,
  PatientContext,
  ChiefComplaintTag,
} from '@/types/chief-complaint'
import { TAG_LABELS } from '@/lib/chief-complaint/constants'

interface ComplaintListProps {
  group: ChiefComplaintGroup
  complaints: ChiefComplaintWithTags[]
  patientContext: PatientContext
  onSelect: (complaint: ChiefComplaintWithTags) => void
  onBack: () => void
}

type FilterType = 'all' | 'time_sensitive' | 'high_acuity' | 'isolation'

export function ComplaintList({
  group,
  complaints,
  patientContext,
  onSelect,
  onBack,
}: ComplaintListProps) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')

  const filteredComplaints = useMemo(() => {
    let result = complaints

    // Apply filter
    if (filter === 'time_sensitive') {
      result = result.filter((c) => c.isTimeSensitive)
    } else if (filter === 'high_acuity') {
      result = result.filter((c) => c.isHighAcuity)
    } else if (filter === 'isolation') {
      result = result.filter((c) => c.requiresIsolation)
    }

    // Apply search
    if (search.trim()) {
      const term = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.namePt.toLowerCase().includes(term) ||
          c.nameEn?.toLowerCase().includes(term) ||
          c.synonyms.some((s: string) => s.toLowerCase().includes(term)) ||
          c.icd10Codes.some((code: string) => code.toLowerCase().includes(term)) ||
          c.definition?.toLowerCase().includes(term)
      )
    }

    return result
  }, [complaints, search, filter])

  const filterCounts = useMemo(() => {
    return {
      all: complaints.length,
      time_sensitive: complaints.filter((c) => c.isTimeSensitive).length,
      high_acuity: complaints.filter((c) => c.isHighAcuity).length,
      isolation: complaints.filter((c) => c.requiresIsolation).length,
    }
  }, [complaints])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            Voltar
          </Button>
          <div
            className="flex size-10 items-center justify-center rounded-full"
            style={{ backgroundColor: `${group.color}20`, color: group.color ?? '#6b7280' }}
          >
            <span className="text-sm font-bold">{group.code}</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold">{group.namePt}</h2>
            <p className="text-sm text-muted-foreground">{group.description}</p>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">{complaints.length} queixas</span>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, sinonimo ou CID-10..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className="gap-1"
          >
            <Filter className="size-3" />
            Todos ({filterCounts.all})
          </Button>
          <Button
            variant={filter === 'time_sensitive' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('time_sensitive')}
            className="gap-1"
          >
            <Clock className="size-3" />
            Tempo ({filterCounts.time_sensitive})
          </Button>
          <Button
            variant={filter === 'high_acuity' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('high_acuity')}
            className="gap-1"
          >
            <AlertTriangle className="size-3" />
            Alta ({filterCounts.high_acuity})
          </Button>
          {filterCounts.isolation > 0 && (
            <Button
              variant={filter === 'isolation' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('isolation')}
              className="gap-1"
            >
              <ShieldAlert className="size-3" />
              Isol. ({filterCounts.isolation})
            </Button>
          )}
        </div>
      </div>

      {/* Complaints List */}
      <div className="space-y-2">
        {filteredComplaints.map((complaint, index) => (
          <motion.button
            key={complaint.id}
            onClick={() => onSelect(complaint)}
            className={cn(
              'group flex w-full items-start gap-4 rounded-xl border bg-card p-4 text-left transition-all',
              'hover:border-primary/50 hover:shadow-md'
            )}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.02 }}
            whileHover={{ x: 4 }}
          >
            {/* Indicators */}
            <div className="flex flex-col gap-1">
              {complaint.isTimeSensitive && (
                <div
                  className="flex size-6 items-center justify-center rounded-full bg-amber-500/10"
                  title="Tempo-dependente"
                >
                  <Clock className="size-3 text-amber-500" />
                </div>
              )}
              {complaint.isHighAcuity && (
                <div
                  className="flex size-6 items-center justify-center rounded-full bg-red-500/10"
                  title="Alta acuidade"
                >
                  <AlertTriangle className="size-3 text-red-500" />
                </div>
              )}
              {complaint.requiresIsolation && (
                <div
                  className="flex size-6 items-center justify-center rounded-full bg-purple-500/10"
                  title="Requer isolamento"
                >
                  <ShieldAlert className="size-3 text-purple-500" />
                </div>
              )}
              {complaint.defaultCalculatorId && (
                <div
                  className="flex size-6 items-center justify-center rounded-full bg-blue-500/10"
                  title="Calculadora disponivel"
                >
                  <Calculator className="size-3 text-blue-500" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-2">
              {/* Name & Code */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{complaint.namePt}</h3>
                  {complaint.nameEn && (
                    <p className="text-xs text-muted-foreground">{complaint.nameEn}</p>
                  )}
                </div>
                <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                  {complaint.code}
                </span>
              </div>

              {/* Definition */}
              {complaint.definition && (
                <p className="line-clamp-2 text-sm text-muted-foreground">{complaint.definition}</p>
              )}

              {/* Tags Row */}
              <div className="flex flex-wrap gap-1">
                {/* ICD-10 Codes */}
                {complaint.icd10Codes.slice(0, 3).map((code: string) => (
                  <span
                    key={code}
                    className="rounded bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-mono text-blue-600"
                  >
                    {code}
                  </span>
                ))}
                {complaint.icd10Codes.length > 3 && (
                  <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-[10px] text-blue-600">
                    +{complaint.icd10Codes.length - 3}
                  </span>
                )}

                {/* Synonyms */}
                {complaint.synonyms.slice(0, 2).map((syn: string) => (
                  <span
                    key={syn}
                    className="flex items-center gap-0.5 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                  >
                    <Tag className="size-2" />
                    {syn}
                  </span>
                ))}
                {complaint.synonyms.length > 2 && (
                  <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                    +{complaint.synonyms.length - 2} sinonimos
                  </span>
                )}

                {/* System/Syndrome Tags */}
                {complaint.tags
                  .filter((t: ChiefComplaintTag) => t.category === 'SYNDROME')
                  .slice(0, 2)
                  .map((tag: ChiefComplaintTag) => (
                    <span
                      key={tag.id}
                      className="rounded bg-purple-500/10 px-1.5 py-0.5 text-[10px] text-purple-600"
                    >
                      {TAG_LABELS[tag.value] || tag.value}
                    </span>
                  ))}
              </div>
            </div>

            {/* Arrow */}
            <ChevronRight className="size-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.button>
        ))}
      </div>

      {filteredComplaints.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            Nenhuma queixa encontrada
            {search && ` para "${search}"`}
            {filter !== 'all' && ' com os filtros selecionados'}
          </p>
        </div>
      )}
    </div>
  )
}
