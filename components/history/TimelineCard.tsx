'use client'

import { motion } from 'framer-motion'
import { Heart, Wind, Activity, AlertTriangle, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GlassBadge } from '@/components/ui/glass-badge'
import { CopyButton } from '@/components/anamnese/copy-button'
import { scrollRevealVariants } from '@/lib/design-system/animation-choreography'

interface TimelineCardProps {
  session: {
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
  index: number
}

const iconMap: Record<string, typeof Heart> = {
  heart: Heart,
  wind: Wind,
  activity: Activity,
}

export function TimelineCard({ session, index }: TimelineCardProps) {
  const IconComponent = iconMap[session.syndrome.icon || 'activity'] || Activity
  const redFlagCount = Array.isArray(session.redFlagsDetected)
    ? session.redFlagsDetected.length
    : 0
  const checkboxCount = Array.isArray(session.checkedItems)
    ? session.checkedItems.length
    : 0

  const time = new Date(session.createdAt).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <motion.div
      variants={scrollRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay: 0.1 * index,
      }}
      className="relative flex gap-4"
    >
      {/* Timeline Dot & Line */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.1 * index + 0.1,
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
          className={cn(
            'relative z-10 flex h-10 w-10 items-center justify-center rounded-full',
            'backdrop-blur-glass',
            'bg-white/60 dark:bg-slate-800/60',
            'border-2 border-white/80 dark:border-white/30',
            'shadow-glass-light',
            redFlagCount > 0 && 'border-healthcare-critical/60 bg-healthcare-critical-glass'
          )}
        >
          {redFlagCount > 0 && (
            <motion.div
              className="absolute inset-0 rounded-full bg-healthcare-critical"
              animate={{
                opacity: [0.3, 0, 0.3],
                scale: [1, 1.4, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: 'easeInOut',
              }}
            />
          )}
          <IconComponent
            className={cn(
              'h-5 w-5',
              redFlagCount > 0
                ? 'text-healthcare-critical dark:text-healthcare-critical-dark'
                : 'text-healthcare-primary dark:text-healthcare-primary-dark'
            )}
          />
        </motion.div>

        {/* Connecting Line */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{
            delay: 0.1 * index + 0.2,
            duration: 0.4,
          }}
          className="w-0.5 flex-1 bg-gradient-to-b from-white/40 to-transparent dark:from-white/20"
        />
      </div>

      {/* Card Content */}
      <div className="flex-1 pb-8">
        <motion.div
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={cn(
            'relative overflow-hidden rounded-glass-lg p-5',
            'backdrop-blur-glass',
            'bg-white/40 dark:bg-slate-900/40',
            'border border-white/50 dark:border-white/20',
            'shadow-glass-light dark:shadow-glass-dark',
            'group cursor-default'
          )}
        >
          {/* Noise Texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              mixBlendMode: 'overlay',
            }}
          />

          {/* Header */}
          <div className="relative z-10 flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  {session.syndrome.name}
                </h3>
                {redFlagCount > 0 && (
                  <GlassBadge variant="healthcare-critical" size="sm" urgent>
                    <AlertTriangle className="h-3 w-3" />
                    {redFlagCount}
                  </GlassBadge>
                )}
                {session.wasCopied && (
                  <GlassBadge variant="healthcare-success" size="sm">
                    <CheckCircle className="h-3 w-3" />
                    Copiado
                  </GlassBadge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                <span className="font-semibold">{time}</span>
                <span>•</span>
                <span>{checkboxCount} itens</span>
                <span>•</span>
                <span>{session.outputMode === 'DETAILED' ? 'Detalhado' : 'Resumido'}</span>
              </div>
            </div>

            <CopyButton text={session.generatedText || ''} />
          </div>

          {/* Preview Text */}
          {session.generatedText && (
            <motion.div
              initial={{ height: 60 }}
              whileHover={{ height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="relative z-10 overflow-hidden"
            >
              <div className="rounded-glass-sm bg-white/50 dark:bg-slate-800/50 p-3 border border-white/30">
                <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-3 group-hover:line-clamp-none transition-all">
                  {session.generatedText}
                </p>
              </div>
            </motion.div>
          )}

          {/* Hover Glow */}
          <motion.div
            className="absolute inset-0 rounded-glass-lg bg-gradient-to-r from-healthcare-primary/10 to-healthcare-info/10 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
