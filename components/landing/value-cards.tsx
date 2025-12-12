'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, HeartPulse, Workflow } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import {
  fadeInUp,
  staggerContainer,
  staggerChild,
  appleSpring,
} from '@/lib/animations/presets'

const values = [
  {
    icon: Zap,
    title: 'Rápido e Eficiente',
    description:
      'Reduza drasticamente o tempo de documentação médica. De 5 minutos para menos de 90 segundos por anamnese.',
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-500/10',
  },
  {
    icon: Workflow,
    title: 'Fluxo Assistencial Inteligente',
    description:
      'Anamnese estruturada, chat médico-IA integrado e suporte completo ao pronto-socorro em uma única plataforma.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-500/10',
  },
  {
    icon: Shield,
    title: 'Compliance Total',
    description:
      'Conformidade garantida com CFM, LGPD e auditorias médicas. Documentação à prova de questionamentos.',
    gradient: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-500/10',
  },
  {
    icon: HeartPulse,
    title: 'Interface Pensada para Médicos',
    description:
      'Design intuitivo criado especificamente para uso em cenários de alta pressão e emergências médicas.',
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-500/10',
  },
]

export function ValueCards() {
  return (
    <section id="produto" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/80 to-transparent dark:via-slate-900/30" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.span
            variants={staggerChild}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4"
          >
            Proposta de Valor
          </motion.span>
          <motion.h2
            variants={staggerChild}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6"
          >
            Por que escolher o{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              WellWave
            </span>
            ?
          </motion.h2>
          <motion.p
            variants={staggerChild}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Uma plataforma completa que transforma a documentação médica em um
            processo simples, rápido e seguro.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {values.map((value, index) => (
            <motion.div key={value.title} variants={staggerChild}>
              <GlassCard
                variant="elevated"
                padding="lg"
                className="group relative overflow-hidden h-full"
                whileHover={{ y: -6, scale: 1.01 }}
                transition={appleSpring}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-2xl ${value.iconBg} flex items-center justify-center mb-5`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={appleSpring}
                  >
                    <value.icon className={`w-7 h-7 ${value.iconColor}`} />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}




