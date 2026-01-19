'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { EmptyStateIllustration } from '@/components/ui/empty-state-illustration'
import { applePhysics } from '@/lib/design-system/animation-tokens'

export function HistoryEmptyState() {
  return (
    <GlassCard hover={false} className="p-8 text-center overflow-visible">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={applePhysics.glass}
      >
        {/* Animated Illustration */}
        <motion.div
          className="relative mx-auto"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ ...applePhysics.glass, delay: 0.1 }}
        >
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-teal-500/15 to-emerald-500/15 rounded-full scale-150" />
          <EmptyStateIllustration variant="medical-records" size="lg" className="mx-auto" />
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...applePhysics.glass, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            Nenhuma anamnese ainda
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Comece criando sua primeira anamnese e acompanhe o historico de todos os seus atendimentos.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...applePhysics.glass, delay: 0.3 }}
        >
          <Button asChild className="px-6">
            <Link href="/dashboard">Criar Anamnese</Link>
          </Button>
        </motion.div>
      </motion.div>
    </GlassCard>
  )
}
