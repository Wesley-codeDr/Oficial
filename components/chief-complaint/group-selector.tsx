'use client'

/**
 * Chief Complaint Group Selector
 *
 * Displays a grid of 18 macro groups for chief complaint selection.
 * Includes search functionality and patient context banner.
 */

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
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
} from 'lucide-react'
import type { ChiefComplaintGroupWithCount, PatientContext } from '@/types/chief-complaint'

interface GroupSelectorProps {
  groups: ChiefComplaintGroupWithCount[]
  patientContext: PatientContext
  onSelect: (groupCode: string) => void
}

const ICON_MAP: Record<string, React.ReactNode> = {
  heart: <Heart className="size-6" />,
  wind: <Wind className="size-6" />,
  brain: <Brain className="size-6" />,
  activity: <Activity className="size-6" />,
  droplets: <Droplets className="size-6" />,
  bone: <Bone className="size-6" />,
  thermometer: <Thermometer className="size-6" />,
  'flask-conical': <FlaskConical className="size-6" />,
  scan: <Scan className="size-6" />,
  eye: <Eye className="size-6" />,
  ear: <Ear className="size-6" />,
  baby: <Baby className="size-6" />,
  skull: <Skull className="size-6" />,
  'alert-triangle': <AlertTriangle className="size-6" />,
  sun: <Sun className="size-6" />,
  'clipboard-list': <ClipboardList className="size-6" />,
}

const AGE_LABELS: Record<string, string> = {
  pediatric: 'Pediatrico',
  adult: 'Adulto',
  elderly: 'Idoso',
  neonate: 'Neonato',
  obstetric: 'Obstetrico',
}

const CONTEXT_LABELS: Record<string, string> = {
  post_surgical: 'Pos-Cirurgico',
  oncological: 'Oncologico',
  immunocompromised: 'Imunocomprometido',
  pregnancy: 'Gestante',
  dialysis: 'Dialitico',
  transplant: 'Transplantado',
}

export function GroupSelector({ groups, patientContext, onSelect }: GroupSelectorProps) {
  const [search, setSearch] = useState('')

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

  return (
    <div className="space-y-6">
      {/* Patient Context Banner */}
      <div className="flex items-center gap-3 rounded-lg border bg-accent/30 p-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Paciente:</span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {AGE_LABELS[patientContext.ageGroup]}
          </span>
        </div>
        {patientContext.specialConditions.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">|</span>
            {patientContext.specialConditions.map((condition) => (
              <span
                key={condition}
                className="rounded-full bg-orange-500/10 px-2 py-0.5 text-xs font-medium text-orange-600"
              >
                {CONTEXT_LABELS[condition]}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar grupo (ex: cardiovascular, trauma...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {filteredGroups.map((group, index) => (
          <motion.button
            key={group.id}
            onClick={() => onSelect(group.code)}
            className={cn(
              'group relative flex flex-col items-center gap-3 rounded-xl border-2 border-border bg-card p-4 transition-all',
              'hover:border-primary/50 hover:shadow-lg'
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Icon */}
            <div
              className="flex size-12 items-center justify-center rounded-full transition-colors"
              style={{ backgroundColor: `${group.color}20`, color: group.color ?? '#6b7280' }}
            >
              {ICON_MAP[group.icon ?? 'clipboard-list'] || <ClipboardList className="size-6" />}
            </div>

            {/* Code Badge */}
            <span
              className="absolute right-2 top-2 rounded-md px-1.5 py-0.5 text-[10px] font-bold"
              style={{ backgroundColor: `${group.color}15`, color: group.color ?? '#6b7280' }}
            >
              {group.code}
            </span>

            {/* Name */}
            <span className="text-center text-sm font-medium leading-tight">{group.namePt}</span>

            {/* Count */}
            <span className="text-xs text-muted-foreground">{group._count.complaints} queixas</span>
          </motion.button>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Nenhum grupo encontrado para "{search}"</p>
        </div>
      )}
    </div>
  )
}
