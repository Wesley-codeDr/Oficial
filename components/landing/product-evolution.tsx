'use client'

import { motion } from 'framer-motion'
import {
  Sparkles,
  Stethoscope,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react'
import {
  fadeInUp,
  staggerContainer,
  staggerChild,
  appleSpring,
} from '@/lib/animations/presets'

const features = [
  'Anamnese digital estruturada',
  'Detecção automática de red flags',
  'Chat médico com IA (ChatWell)',
  'Suporte a múltiplas síndromes',
  'Documentação auditável',
  'Histórico de sessões',
]

export function ProductEvolution() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" />
      
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-[120px] opacity-50"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/15 to-green-500/15 rounded-full blur-[100px] opacity-50"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.span
              variants={staggerChild}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-sm font-semibold mb-6"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Produto em Evolução
            </motion.span>

            <motion.h2
              variants={staggerChild}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-6"
            >
              Construído para o{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                futuro da medicina
              </span>
            </motion.h2>

            <motion.p
              variants={staggerChild}
              className="text-lg text-slate-300 mb-8 leading-relaxed"
            >
              O WellWave está sendo desenvolvido com foco absoluto no
              pronto-socorro. Integramos anamnese estruturada, chat clínico
              inteligente e suporte médico em uma única plataforma que evolui
              junto com a prática real do médico.
            </motion.p>

            <motion.p
              variants={staggerChild}
              className="text-slate-400 mb-8"
            >
              Nossa missão é eliminar a burocracia da documentação médica,
              permitindo que médicos foquem no que realmente importa: o cuidado
              ao paciente.
            </motion.p>

            {/* Feature List */}
            <motion.div
              variants={staggerChild}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <span className="text-slate-200 text-sm">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            className="relative"
          >
            <div className="relative">
              {/* Main Card */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 lg:p-10"
                whileHover={{ scale: 1.02 }}
                transition={appleSpring}
              >
                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl lg:text-5xl font-black text-white mb-2">
                      90s
                    </div>
                    <div className="text-sm text-slate-400">
                      Tempo médio por anamnese
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl lg:text-5xl font-black text-white mb-2">
                      3+
                    </div>
                    <div className="text-sm text-slate-400">
                      Síndromes suportadas
                    </div>
                  </div>
                </div>

                {/* Feature Icons */}
                <div className="flex justify-around">
                  <motion.div
                    className="flex flex-col items-center gap-2"
                    whileHover={{ y: -5 }}
                    transition={appleSpring}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                      <Stethoscope className="w-7 h-7 text-blue-400" />
                    </div>
                    <span className="text-xs text-slate-400">Anamnese</span>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center gap-2"
                    whileHover={{ y: -5 }}
                    transition={appleSpring}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                      <MessageSquare className="w-7 h-7 text-purple-400" />
                    </div>
                    <span className="text-xs text-slate-400">ChatWell</span>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center gap-2"
                    whileHover={{ y: -5 }}
                    transition={appleSpring}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">
                      <TrendingUp className="w-7 h-7 text-green-400" />
                    </div>
                    <span className="text-xs text-slate-400">Analytics</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl px-4 py-2 shadow-xl"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <span className="text-white font-bold text-sm">Em evolução constante</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}




