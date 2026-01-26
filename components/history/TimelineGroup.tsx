'use client'

import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { TimelineCard } from './TimelineCard'
import { historyChoreography } from '@/lib/design-system/animation-choreography'

interface TimelineGroupProps {
  dateLabel: string
  sessions: Array<{
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
  }>
  groupIndex: number
}

export function TimelineGroup({ dateLabel, sessions, groupIndex }: TimelineGroupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: (historyChoreography.timelineGroups.delay + groupIndex * historyChoreography.timelineGroups.stagger) / 1000,
        duration: historyChoreography.timelineGroups.duration / 1000,
        ease: [0.25, 1, 0.5, 1],
      }}
      className="space-y-4"
    >
      {/* Date Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: (historyChoreography.timelineGroups.delay + groupIndex * historyChoreography.timelineGroups.stagger) / 1000 + 0.1,
          duration: 0.3,
        }}
        className="sticky top-16 z-20 flex items-center gap-3 backdrop-blur-glass bg-white/80 dark:bg-slate-900/80 px-4 py-3 rounded-glass-lg border border-white/30 shadow-glass-light"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-glass-sm bg-healthcare-primary-glass border border-healthcare-primary/30">
          <Calendar className="h-4 w-4 text-healthcare-primary dark:text-healthcare-primary-dark" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          {dateLabel}
        </h2>
        <span className="ml-auto text-sm font-semibold text-slate-500 dark:text-slate-400">
          {sessions.length} {sessions.length === 1 ? 'anamnese' : 'anamneses'}
        </span>
      </motion.div>

      {/* Timeline Cards */}
      <div className="space-y-1 pl-4">
        {sessions.map((session, index) => (
          <TimelineCard key={session.id} session={session} index={index} />
        ))}
      </div>
    </motion.div>
  )
}
