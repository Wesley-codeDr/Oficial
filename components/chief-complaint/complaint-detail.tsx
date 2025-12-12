'use client'

/**
 * Chief Complaint Detail
 *
 * Displays detailed information about a selected chief complaint.
 * Shows tags, ICD-10 codes, synonyms, and links to anamnese/calculators.
 */

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Clock,
  AlertTriangle,
  ShieldAlert,
  Tag,
  Calculator,
  FileText,
  ExternalLink,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react'
import type { ChiefComplaintWithRelations, PatientContext, ChiefComplaintTag } from '@/types/chief-complaint'
import { TagCategory } from '@/types/chief-complaint'
import { TAG_LABELS, TAG_CATEGORY_LABELS } from '@/lib/chief-complaint/constants'

interface ComplaintDetailProps {
  complaint: ChiefComplaintWithRelations
  patientContext: PatientContext
  onConfirm: () => void
  onBack: () => void
  onStartAnamnese?: () => void
  onOpenCalculator?: (calculatorId: string) => void
}

const CATEGORY_ORDER: TagCategory[] = ['AGE', 'SYSTEM', 'SYNDROME', 'RISK', 'CONTEXT']

const CATEGORY_COLORS: Record<TagCategory, string> = {
  AGE: 'bg-green-500/10 text-green-600 border-green-200',
  SYSTEM: 'bg-blue-500/10 text-blue-600 border-blue-200',
  SYNDROME: 'bg-purple-500/10 text-purple-600 border-purple-200',
  RISK: 'bg-red-500/10 text-red-600 border-red-200',
  CONTEXT: 'bg-orange-500/10 text-orange-600 border-orange-200',
}

export function ComplaintDetail({
  complaint,
  patientContext,
  onConfirm,
  onBack,
  onStartAnamnese,
  onOpenCalculator,
}: ComplaintDetailProps) {
  // Group tags by category
  const tagsByCategory = complaint.tags.reduce<Record<TagCategory, ChiefComplaintTag[]>>(
    (acc: Record<TagCategory, ChiefComplaintTag[]>, tag: ChiefComplaintTag) => {
      if (!acc[tag.category]) {
        acc[tag.category] = []
      }
      acc[tag.category].push(tag)
      return acc
    },
    {} as Record<TagCategory, ChiefComplaintTag[]>
  )

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="size-4" />
        </Button>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{complaint.namePt}</h1>
            <span className="rounded bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground">
              {complaint.code}
            </span>
          </div>
          {complaint.nameEn && (
            <p className="text-sm text-muted-foreground">{complaint.nameEn}</p>
          )}
        </div>

        {/* Risk Indicators */}
        <div className="flex gap-2">
          {complaint.isTimeSensitive && (
            <div
              className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1"
              title="Tempo-dependente"
            >
              <Clock className="size-4 text-amber-500" />
              <span className="text-xs font-medium text-amber-600">Tempo-dependente</span>
            </div>
          )}
          {complaint.isHighAcuity && (
            <div
              className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1"
              title="Alta acuidade"
            >
              <AlertTriangle className="size-4 text-red-500" />
              <span className="text-xs font-medium text-red-600">Alta Acuidade</span>
            </div>
          )}
          {complaint.requiresIsolation && (
            <div
              className="flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1"
              title="Requer isolamento"
            >
              <ShieldAlert className="size-4 text-purple-500" />
              <span className="text-xs font-medium text-purple-600">Isolamento</span>
            </div>
          )}
        </div>
      </div>

      {/* Group Info */}
      <div
        className="flex items-center gap-3 rounded-lg p-3"
        style={
          {
            backgroundColor: `${complaint.group.color}10`,
            '--group-color': complaint.group.color ?? '#6b7280',
          } as React.CSSProperties & { '--group-color': string }
        }
      >
        <div
          className="flex size-10 items-center justify-center rounded-full"
          style={
            {
              backgroundColor: `${complaint.group.color}20`,
              color: 'var(--group-color)',
            } as React.CSSProperties
          }
        >
          <span className="text-sm font-bold">{complaint.group.code}</span>
        </div>
        <div>
          <p
            className="font-medium"
            style={{ color: 'var(--group-color)' } as React.CSSProperties}
          >
            {complaint.group.namePt}
          </p>
          <p className="text-xs text-muted-foreground">{complaint.group.description}</p>
        </div>
      </div>

      {/* Definition */}
      {complaint.definition && (
        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">Definicao</h3>
          <p className="text-sm">{complaint.definition}</p>
        </div>
      )}

      {/* ICD-10 Codes */}
      {complaint.icd10Codes.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">Codigos CID-10</h3>
          <div className="flex flex-wrap gap-2">
            {complaint.icd10Codes.map((code: string) => (
              <span
                key={code}
                className="rounded-lg border bg-blue-500/5 px-3 py-1.5 text-sm font-mono text-blue-600"
              >
                {code}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Synonyms */}
      {complaint.synonyms.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">Sinonimos</h3>
          <div className="flex flex-wrap gap-2">
            {complaint.synonyms.map((syn: string) => (
              <span
                key={syn}
                className="flex items-center gap-1.5 rounded-lg border bg-muted/50 px-3 py-1.5 text-sm"
              >
                <Tag className="size-3 text-muted-foreground" />
                {syn}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tags by Category */}
      {CATEGORY_ORDER.map(
        (category) =>
          tagsByCategory[category] &&
          tagsByCategory[category].length > 0 && (
            <div key={category}>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                {TAG_CATEGORY_LABELS[category]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tagsByCategory[category].map((tag: ChiefComplaintTag) => (
                  <span
                    key={tag.id}
                    className={cn(
                      'rounded-lg border px-3 py-1.5 text-sm font-medium',
                      CATEGORY_COLORS[category]
                    )}
                  >
                    {TAG_LABELS[tag.value] || tag.value}
                  </span>
                ))}
              </div>
            </div>
          )
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 border-t pt-6">
        {/* Confirm Selection */}
        <Button onClick={onConfirm} size="lg" className="gap-2">
          <CheckCircle className="size-4" />
          Confirmar Selecao
        </Button>

        {/* Link to Anamnese (if syndrome linked) */}
        {complaint.syndrome && onStartAnamnese && (
          <Button variant="outline" size="lg" onClick={onStartAnamnese} className="gap-2">
            <FileText className="size-4" />
            Iniciar Anamnese ({complaint.syndrome.name})
          </Button>
        )}

        {/* Link to Calculator */}
        {complaint.defaultCalculatorId && onOpenCalculator && (
          <Button
            variant="outline"
            size="lg"
            onClick={() => onOpenCalculator(complaint.defaultCalculatorId!)}
            className="gap-2"
          >
            <Calculator className="size-4" />
            Abrir Calculadora
            <ExternalLink className="size-3" />
          </Button>
        )}
      </div>
    </motion.div>
  )
}
