'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass-card'
import { EmptyStateIllustration } from '@/components/ui/empty-state-illustration'
import { NewChatButton } from './new-chat-button'
import { applePhysics } from '@/lib/design-system/animation-tokens'

export function ChatEmptyState() {
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
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-500/15 to-emerald-500/15 rounded-full scale-150" />
          <EmptyStateIllustration variant="chat-conversation" size="lg" className="mx-auto" />
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...applePhysics.glass, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            Nenhuma conversa ainda
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Inicie uma nova conversa para tirar duvidas clinicas baseadas em evidencias cientificas.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...applePhysics.glass, delay: 0.3 }}
        >
          <NewChatButton variant="primary" />
        </motion.div>
      </motion.div>
    </GlassCard>
  )
}
