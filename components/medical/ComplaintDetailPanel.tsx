'use client'

/**
 * ComplaintDetailPanel
 *
 * Componente para exibir detalhes completos de uma queixa com EBM content:
 * - Red flags estruturados com severidade
 * - Diagnósticos diferenciais com ICD-10
 * - Referências EBM científicas
 * - Medicações RENAME
 * - Conduta inicial protocolada
 * - Last review date
 */

import React from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Pill,
  BookOpen,
  Calendar,
  CheckCircle2,
  ExternalLink,
  FileText,
} from 'lucide-react'
import type { ComplaintApiPayload } from '@/lib/types/complaints-api'
import type { RedFlagSeverity } from '@/lib/types/medical'
import { cn } from '@/lib/utils'

// ============================================================================
// Types
// ============================================================================

interface ComplaintDetailPanelProps {
  complaint: ComplaintApiPayload
  className?: string
}

// ============================================================================
// Helper Components
// ============================================================================

/**
 * Badge de severidade de red flag
 */
function RedFlagSeverityBadge({ severity }: { severity: RedFlagSeverity }) {
  const variants = {
    critical: {
      icon: AlertTriangle,
      label: 'Crítico',
      variant: 'destructive' as const,
      className: 'bg-red-600 text-white',
    },
    warning: {
      icon: AlertCircle,
      label: 'Alerta',
      variant: 'default' as const,
      className: 'bg-orange-500 text-white',
    },
    caution: {
      icon: Info,
      label: 'Atenção',
      variant: 'secondary' as const,
      className: 'bg-yellow-500 text-black',
    },
  }

  const config = variants[severity] || variants.caution
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className={cn('gap-1', config.className)}>
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  )
}

/**
 * Badge de probabilidade de diagnóstico
 */
function ProbabilityBadge({ probability }: { probability: 'high' | 'medium' | 'low' }) {
  const variants = {
    high: { label: 'Alta', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
    medium: { label: 'Média', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
    low: { label: 'Baixa', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  }

  const config = variants[probability]

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  )
}

/**
 * Badge de lista RENAME
 */
function RENAMEBadge({ list }: { list: 'A' | 'B' | 'C' }) {
  const colors = {
    A: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    B: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    C: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  }

  return (
    <Badge variant="outline" className={colors[list]}>
      RENAME {list}
    </Badge>
  )
}

/**
 * Badge de evidência científica
 */
function EvidenceLevelBadge({ level }: { level: 'A' | 'B' | 'C' | 'D' }) {
  const colors = {
    A: 'bg-green-600 text-white',
    B: 'bg-blue-600 text-white',
    C: 'bg-yellow-600 text-white',
    D: 'bg-gray-600 text-white',
  }

  return (
    <Badge className={colors[level]}>
      Evidência {level}
    </Badge>
  )
}

/**
 * Badge "EBM Verificado"
 */
function EBMVerifiedBadge({ lastReview }: { lastReview?: string }) {
  if (!lastReview) return null

  const reviewDate = new Date(lastReview)
  const now = new Date()
  const monthsDiff = Math.floor((now.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24 * 30))

  const isRecent = monthsDiff < 6
  const isStale = monthsDiff > 12

  return (
    <Badge
      variant={isRecent ? 'default' : isStale ? 'destructive' : 'secondary'}
      className={cn('gap-1', {
        'bg-green-600 text-white': isRecent,
        'bg-yellow-600 text-white': !isRecent && !isStale,
        'bg-red-600 text-white': isStale,
      })}
    >
      <CheckCircle2 className="h-3 w-3" />
      EBM Verificado
    </Badge>
  )
}

// ============================================================================
// Main Component
// ============================================================================

export function ComplaintDetailPanel({ complaint, className }: ComplaintDetailPanelProps) {
  const ebm = complaint.extendedContentEBM
  const hasEBM = !!ebm

  // Se não tem EBM content, mostrar placeholder
  if (!hasEBM) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {complaint.name_pt}
          </CardTitle>
          {complaint.definition && (
            <CardDescription>{complaint.definition}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <Info className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Conteúdo EBM ainda não disponível para esta queixa</p>
            <p className="text-sm mt-2">Em breve adicionaremos referências científicas e protocolos</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl flex items-center gap-2">
              {complaint.name_pt}
            </CardTitle>
            {complaint.definition && (
              <CardDescription className="text-base">{complaint.definition}</CardDescription>
            )}
          </div>
          <div className="flex gap-2">
            <EBMVerifiedBadge lastReview={ebm.lastEBMReview} />
          </div>
        </div>

        {/* Metadados */}
        <div className="flex flex-wrap gap-2 mt-4">
          {complaint.icd10_codes && complaint.icd10_codes.length > 0 && (
            <Badge variant="outline">
              CID-10: {complaint.icd10_codes.join(', ')}
            </Badge>
          )}
          {ebm.lastEBMReview && (
            <Badge variant="outline" className="gap-1">
              <Calendar className="h-3 w-3" />
              Revisado em {new Date(ebm.lastEBMReview).toLocaleDateString('pt-BR')}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Accordion type="multiple" className="w-full" defaultValue={['red-flags', 'conduct']}>
          {/* ================================================================ */}
          {/* Red Flags */}
          {/* ================================================================ */}
          {ebm.redFlags && ebm.redFlags.length > 0 && (
            <AccordionItem value="red-flags">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Red Flags ({ebm.redFlags.length})
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  {ebm.redFlags.map((flag, index) => (
                    <div key={index} className="border-l-4 border-red-600 pl-4 py-2">
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-medium">{flag.description}</p>
                        <RedFlagSeverityBadge severity={flag.severity} />
                      </div>
                      {flag.clinicalSignificance && (
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Significado clínico:</strong> {flag.clinicalSignificance}
                        </p>
                      )}
                      {flag.immediateAction && (
                        <div className="bg-red-50 dark:bg-red-950 p-3 rounded-md mt-2">
                          <p className="text-sm font-medium text-red-900 dark:text-red-100">
                            ⚡ Ação Imediata:
                          </p>
                          <p className="text-sm text-red-800 dark:text-red-200 mt-1">
                            {flag.immediateAction}
                            {flag.timeToAction && ` (< ${flag.timeToAction} min)`}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* ================================================================ */}
          {/* Conduta Inicial */}
          {/* ================================================================ */}
          {ebm.condutaInicial && (
            <AccordionItem value="conduct">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Conduta Inicial
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="prose dark:prose-invert max-w-none pt-2">
                  <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-md">
                    {ebm.condutaInicial}
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* ================================================================ */}
          {/* Diagnósticos Diferenciais */}
          {/* ================================================================ */}
          {ebm.diagnosticoDiferencial && ebm.diagnosticoDiferencial.length > 0 && (
            <AccordionItem value="differential">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  Diagnósticos Diferenciais ({ebm.diagnosticoDiferencial.length})
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {ebm.diagnosticoDiferencial.map((dd, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{dd.condition}</h4>
                          {dd.icd10 && (
                            <p className="text-sm text-muted-foreground">CID-10: {dd.icd10}</p>
                          )}
                        </div>
                        <ProbabilityBadge probability={dd.probability} />
                      </div>
                      {dd.keyFeatures && dd.keyFeatures.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium mb-1">Características-chave:</p>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {dd.keyFeatures.map((feature, i) => (
                              <li key={i}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* ================================================================ */}
          {/* Medicações */}
          {/* ================================================================ */}
          {ebm.medications && ebm.medications.length > 0 && (
            <AccordionItem value="medications">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-green-600" />
                  Medicações ({ebm.medications.length})
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {ebm.medications.map((med, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{med.genericName}</h4>
                        <div className="flex gap-2">
                          {med.renameCompatible && med.renameList && (
                            <RENAMEBadge list={med.renameList} />
                          )}
                          {med.evidenceLevel && (
                            <EvidenceLevelBadge level={med.evidenceLevel} />
                          )}
                        </div>
                      </div>
                      <div className="text-sm space-y-1">
                        <p>
                          <strong>Dose:</strong> {med.dose} {med.route}
                        </p>
                        <p>
                          <strong>Frequência:</strong> {med.frequency}
                        </p>
                        {med.susAvailable && (
                          <Badge variant="outline" className="mt-2 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
                            ✅ Disponível no SUS
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* ================================================================ */}
          {/* Referências EBM */}
          {/* ================================================================ */}
          {ebm.ebmReferences && ebm.ebmReferences.length > 0 && (
            <AccordionItem value="references">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                  Referências EBM ({ebm.ebmReferences.length})
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {ebm.ebmReferences.map((ref, index) => (
                    <div key={index} className="border-l-4 border-indigo-600 pl-4 py-2">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-medium text-sm">{ref.title}</h4>
                        {ref.evidenceLevel && (
                          <EvidenceLevelBadge level={ref.evidenceLevel} />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>
                          <strong>Fonte:</strong> {ref.source}
                        </p>
                        {ref.pmid && (
                          <p>
                            <strong>PMID:</strong> {ref.pmid}
                          </p>
                        )}
                        {ref.doi && (
                          <p>
                            <strong>DOI:</strong> {ref.doi}
                          </p>
                        )}
                        {ref.url && (
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-primary hover:underline"
                          >
                            Acessar referência
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </CardContent>
    </Card>
  )
}
