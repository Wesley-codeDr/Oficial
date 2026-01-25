import { Metadata } from 'next'
import Link from 'next/link'
import { formatDistanceToNow } from '@/lib/utils'
import { Heart, Wind, Activity, CheckCircle, AlertTriangle, FileText } from 'lucide-react'

import { GlassCard } from '@/components/ui/glass-card'
import { GlassButton } from '@/components/ui/glass-button'
import { GlassBadge } from '@/components/ui/glass-badge'
import { CopyButton } from '@/components/anamnese/copy-button'
import { getUserSessions } from '@/lib/anamnese/actions'
import { HistoryEmptyState } from './history-empty-state'

export const metadata: Metadata = {
  title: 'Historico | WellWave',
  description: 'Veja o historico de anamneses realizadas.',
}

const iconMap: Record<string, typeof Heart> = {
  heart: Heart,
  wind: Wind,
  activity: Activity,
}

export default async function HistoryPage() {
  const sessions = await getUserSessions(50)

  return (
    <div className="container mx-auto max-w-4xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Historico</h1>
        <p className="text-muted-foreground">
          Veja todas as anamneses realizadas.
        </p>
      </div>

      {sessions.length === 0 ? (
        <HistoryEmptyState />
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => {
            const IconComponent = iconMap[session.syndrome.icon || 'activity'] || Activity
            const redFlagCount = Array.isArray(session.redFlagsDetected)
              ? session.redFlagsDetected.length
              : 0
            const checkboxCount = Array.isArray(session.checkedItems)
              ? session.checkedItems.length
              : 0

            return (
              <GlassCard key={session.id} hover={false} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-primary/10">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{session.syndrome.name}</h3>
                      {redFlagCount > 0 && (
                        <GlassBadge variant="danger" size="sm">
                          <AlertTriangle className="h-3 w-3" />
                          {redFlagCount}
                        </GlassBadge>
                      )}
                      {session.wasCopied && (
                        <GlassBadge variant="success" size="sm">
                          <CheckCircle className="h-3 w-3" />
                          Copiado
                        </GlassBadge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{checkboxCount} itens</span>
                      <span>{session.outputMode === 'DETAILED' ? 'Detalhado' : 'Resumido'}</span>
                      <span>
                        {formatDistanceToNow(new Date(session.createdAt))}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CopyButton text={session.generatedText || ''} />
                  </div>
                </div>

                {session.generatedText && (
                  <div className="mt-4 rounded-[16px] bg-muted/50 p-3">
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {session.generatedText}
                    </p>
                  </div>
                )}
              </GlassCard>
            )
          })}
        </div>
      )}
    </div>
  )
}
