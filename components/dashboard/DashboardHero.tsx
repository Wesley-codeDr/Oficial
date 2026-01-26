'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { dashboardChoreography } from '@/lib/design-system/animation-choreography'

export function DashboardHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: dashboardChoreography.header.delay / 1000,
        duration: dashboardChoreography.header.duration / 1000,
        ease: [0.25, 1, 0.5, 1],
      }}
      className="relative overflow-hidden rounded-glass-xl p-8 backdrop-blur-glass bg-gradient-to-br from-healthcare-primary-glass to-healthcare-info-glass border border-white/30 shadow-glass-light"
    >
      {/* Background Parallax Elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,122,255,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 space-y-4">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-glass-pill backdrop-blur-glass bg-healthcare-success-glass border border-healthcare-success/30"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-healthcare-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-healthcare-success" />
          </span>
          <span className="text-xs font-semibold text-healthcare-success dark:text-healthcare-success-dark">
            Sistema Online
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-none"
        >
          Nova Anamnese
        </motion.h1>

        {/* Hero Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed"
        >
          Selecione a síndrome clínica para iniciar o preenchimento da anamnese médica com
          inteligência artificial e conformidade CFM.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex flex-wrap gap-4 pt-2"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-glass-lg backdrop-blur-glass bg-white/40 dark:bg-slate-800/40 border border-white/30">
            <Sparkles className="w-4 h-4 text-healthcare-primary" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              IA Médica
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-glass-lg backdrop-blur-glass bg-white/40 dark:bg-slate-800/40 border border-white/30">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Conforme CFM
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-glass-lg backdrop-blur-glass bg-white/40 dark:bg-slate-800/40 border border-white/30">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              LGPD Compliance
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
