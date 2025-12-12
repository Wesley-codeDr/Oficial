'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  UserPlus,
  Brain,
  MessageSquareText,
  FileCheck,
  ArrowRight,
} from 'lucide-react'
import {
  fadeInUp,
  staggerContainer,
  staggerChild,
  appleSpring,
} from '@/lib/animations/presets'

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Início da Anamnese',
    description:
      'O médico ou paciente inicia a anamnese com dados básicos e queixa principal. A interface guia o processo.',
    color: 'blue',
  },
  {
    number: '02',
    icon: Brain,
    title: 'IA Estrutura os Dados',
    description:
      'Inteligência artificial processa e organiza os dados clínicos em tempo real, identificando padrões e red flags.',
    color: 'purple',
  },
  {
    number: '03',
    icon: MessageSquareText,
    title: 'Chat Inteligente',
    description:
      'O médico interage com o ChatWell para tirar dúvidas, obter sugestões de hipóteses e condutas baseadas em evidência.',
    color: 'green',
  },
  {
    number: '04',
    icon: FileCheck,
    title: 'Documentação Pronta',
    description:
      'Documentação médica completa, estruturada e auditável gerada automaticamente. Pronta para o prontuário.',
    color: 'orange',
  },
]

const colorMap = {
  blue: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-600',
    border: 'border-blue-500/20',
    gradient: 'from-blue-500 to-cyan-500',
  },
  purple: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-600',
    border: 'border-purple-500/20',
    gradient: 'from-purple-500 to-pink-500',
  },
  green: {
    bg: 'bg-green-500/10',
    text: 'text-green-600',
    border: 'border-green-500/20',
    gradient: 'from-green-500 to-emerald-500',
  },
  orange: {
    bg: 'bg-orange-500/10',
    text: 'text-orange-600',
    border: 'border-orange-500/20',
    gradient: 'from-orange-500 to-amber-500',
  },
}

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="como-funciona"
      ref={containerRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 dark:from-slate-900/50 dark:via-[#0a0a0a] dark:to-slate-900/50" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16 lg:mb-24"
        >
          <motion.span
            variants={staggerChild}
            className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-4"
          >
            Como Funciona
          </motion.span>
          <motion.h2
            variants={staggerChild}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6"
          >
            Simples como deve ser
          </motion.h2>
          <motion.p
            variants={staggerChild}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Um fluxo pensado para a realidade do pronto-socorro. Do primeiro
            contato à documentação completa em minutos.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-orange-500"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          {/* Steps */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-100px' }}
            className="grid lg:grid-cols-4 gap-8 lg:gap-6"
          >
            {steps.map((step, index) => {
              const colors = colorMap[step.color as keyof typeof colorMap]
              return (
                <motion.div
                  key={step.number}
                  variants={staggerChild}
                  className="relative"
                >
                  {/* Mobile Arrow */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden absolute -bottom-4 left-1/2 -translate-x-1/2">
                      <ArrowRight className="w-5 h-5 text-slate-300 rotate-90" />
                    </div>
                  )}

                  <motion.div
                    className="bg-white dark:bg-slate-900/80 rounded-3xl p-6 lg:p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-lg h-full"
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={appleSpring}
                  >
                    {/* Step Number Circle */}
                    <div className="relative mb-6">
                      <motion.div
                        className={`w-16 h-16 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center mx-auto lg:mx-0`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={appleSpring}
                      >
                        <step.icon className={`w-7 h-7 ${colors.text}`} />
                      </motion.div>
                      {/* Number Badge */}
                      <div
                        className={`absolute -top-2 -right-2 lg:-top-1 lg:-right-1 w-8 h-8 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white text-xs font-bold shadow-lg`}
                      >
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 text-center lg:text-left">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-center lg:text-left leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}




