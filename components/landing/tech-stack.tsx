'use client'

import { motion } from 'framer-motion'
import { Code2, Lock, Gauge, Cloud } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import {
  fadeInUp,
  staggerContainer,
  staggerChild,
  appleSpring,
} from '@/lib/animations/presets'

const technologies = [
  { name: 'Next.js 15', category: 'Framework' },
  { name: 'React 19', category: 'UI Library' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Framer Motion', category: 'Animations' },
  { name: 'Radix UI', category: 'Components' },
  { name: 'Prisma', category: 'ORM' },
  { name: 'Vercel AI SDK', category: 'AI Integration' },
]

const qualities = [
  {
    icon: Gauge,
    title: 'Alta Performance',
    description: 'Otimizado para resposta instantânea, mesmo em conexões lentas.',
    color: 'blue',
  },
  {
    icon: Lock,
    title: 'Segurança Máxima',
    description: 'Criptografia de ponta a ponta e conformidade com padrões médicos.',
    color: 'green',
  },
  {
    icon: Cloud,
    title: 'Escalabilidade',
    description: 'Arquitetura cloud-native pronta para crescer com sua demanda.',
    color: 'purple',
  },
  {
    icon: Code2,
    title: 'Código Limpo',
    description: 'Desenvolvimento seguindo as melhores práticas da indústria.',
    color: 'orange',
  },
]

const colorMap = {
  blue: 'bg-blue-500/10 text-blue-600',
  green: 'bg-green-500/10 text-green-600',
  purple: 'bg-purple-500/10 text-purple-600',
  orange: 'bg-orange-500/10 text-orange-600',
}

export function TechStack() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 dark:from-slate-900/50 dark:via-[#0a0a0a] dark:to-slate-900/50" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.span
            variants={staggerChild}
            className="inline-block px-4 py-1.5 rounded-full bg-slate-900/10 dark:bg-white/10 text-slate-700 dark:text-slate-200 text-sm font-semibold mb-4"
          >
            Stack Tecnológico
          </motion.span>
          <motion.h2
            variants={staggerChild}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6"
          >
            Tecnologias{' '}
            <span className="bg-gradient-to-r from-slate-600 to-slate-800 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              modernas
            </span>
          </motion.h2>
          <motion.p
            variants={staggerChild}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Construído com as melhores ferramentas para garantir performance,
            segurança e escalabilidade.
          </motion.p>
        </motion.div>

        {/* Tech Pills */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={staggerChild}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={appleSpring}
              className="group relative"
            >
              <div className="px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all cursor-pointer">
                <span className="font-semibold text-slate-900 dark:text-white">
                  {tech.name}
                </span>
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {tech.category}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-white rotate-45 -mt-1" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quality Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {qualities.map((quality, index) => (
            <motion.div key={quality.title} variants={staggerChild}>
              <GlassCard
                variant="default"
                padding="lg"
                className="text-center h-full"
                whileHover={{ y: -4 }}
                transition={appleSpring}
              >
                <motion.div
                  className={`w-14 h-14 rounded-2xl ${colorMap[quality.color as keyof typeof colorMap]} flex items-center justify-center mx-auto mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={appleSpring}
                >
                  <quality.icon className="w-7 h-7" />
                </motion.div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {quality.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {quality.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}








