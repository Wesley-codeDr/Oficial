'use client'

import { ExternalLink, BookOpen, FileText, GraduationCap } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import type { Citation } from '@/lib/ai/citations'
import { useTheme } from 'next-themes'
import * as Tokens from '@/lib/theme/tokens'
import {
  useGlassBlur,
  useGlassOpacity,
  useGlassBorder,
  useGlassRadius,
  useGlassNoise,
  useGlassSpecular,
  useGlassRimLight,
  useGlassHoverScale,
  useGlassTapScale,
} from '@/lib/theme/hooks'

interface CitationCardProps {
  citation: Citation
}

const typeIcons = {
  study: FileText,
  guideline: BookOpen,
  review: GraduationCap,
  other: FileText,
}

export function CitationCard({ citation }: CitationCardProps) {
  const { theme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  
  const glassBlur = useGlassBlur()
  const glassOpacity = useGlassOpacity('default', isDark)
  const glassBorder = useGlassBorder('default', isDark)
  const glassRadius = useGlassRadius('default')
  const glassNoise = useGlassNoise()
  const glassSpecular = useGlassSpecular()
  const glassRimLight = useGlassRimLight()
  const glassHoverScale = useGlassHoverScale()
  const glassTapScale = useGlassTapScale()
  
  const Icon = typeIcons[citation.type] || FileText

  return (
    <GlassCard hover className="p-3">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium">{citation.authors}</p>
          {citation.journal && (
            <p className="text-xs text-muted-foreground">
              {citation.journal}
              {citation.year && ` (${citation.year})`}
            </p>
          )}
          <div className="flex items-center gap-2">
            {citation.pmid && (
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${citation.pmid}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-1 text-xs',
                  glassHoverScale,
                  glassTapScale,
                  'text-blue-500 hover:underline'
                )}
              >
                PMID: {citation.pmid}
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {citation.doi && (
              <a
                href={`https://doi.org/${citation.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-1 text-xs',
                  glassHoverScale,
                  glassTapScale,
                  'text-blue-500 hover:underline'
                )}
              >
                DOI
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

interface CitationListProps {
  citations: Citation[]
}

export function CitationList({ citations }: CitationListProps) {
  if (citations.length === 0) return null

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">
        Referencias ({citations.length})
      </h4>
      <div className="grid gap-2">
        {citations.map((citation) => (
          <CitationCard key={citation.id} citation={citation} />
        ))}
      </div>
    </div>
  )
}
