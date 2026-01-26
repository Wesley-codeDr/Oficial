'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { TimelineGroup } from './TimelineGroup'
import { historyChoreography } from '@/lib/design-system/animation-choreography'

interface Session {
  id: string
  syndrome: {
    name: string
    icon: string | null
  }
  generatedText: string | null
  checkedItems: string[]
  redFlagsDetected: string[]
  outputMode: string
  wasCopied: boolean
  createdAt: Date
}

interface HistoryTimelineProps {
  sessions: Session[]
}

function getDateLabel(date: Date): string {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const weekAgo = new Date(today)
  weekAgo.setDate(weekAgo.getDate() - 7)

  const sessionDate = new Date(date)
  const sessionDay = new Date(
    sessionDate.getFullYear(),
    sessionDate.getMonth(),
    sessionDate.getDate()
  )

  if (sessionDay.getTime() === today.getTime()) {
    return 'Hoje'
  } else if (sessionDay.getTime() === yesterday.getTime()) {
    return 'Ontem'
  } else if (sessionDay >= weekAgo) {
    return 'Esta Semana'
  } else if (sessionDate.getMonth() === now.getMonth() && sessionDate.getFullYear() === now.getFullYear()) {
    return 'Este Mês'
  } else {
    return sessionDate.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    })
  }
}

export function HistoryTimeline({ sessions }: HistoryTimelineProps) {
  // Group sessions by date
  const groupedSessions = useMemo(() => {
    const groups = new Map<string, Session[]>()

    sessions.forEach((session) => {
      const label = getDateLabel(session.createdAt)
      if (!groups.has(label)) {
        groups.set(label, [])
      }
      groups.get(label)!.push(session)
    })

    // Sort each group by time (newest first)
    groups.forEach((sessionList) => {
      sessionList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    })

    return Array.from(groups.entries())
  }, [sessions])

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: historyChoreography.header.delay / 1000,
          duration: historyChoreography.header.duration / 1000,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="space-y-2"
      >
        <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Histórico
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {sessions.length} {sessions.length === 1 ? 'anamnese realizada' : 'anamneses realizadas'}
        </p>
      </motion.div>

      {/* Timeline Groups */}
      <div className="space-y-12">
        {groupedSessions.map(([dateLabel, groupSessions], index) => (
          <TimelineGroup
            key={dateLabel}
            dateLabel={dateLabel}
            sessions={groupSessions}
            groupIndex={index}
          />
        ))}
      </div>
    </div>
  )
}
