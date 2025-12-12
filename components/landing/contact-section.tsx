'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MessageSquare, Building2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import {
  fadeInUp,
  staggerContainer,
  staggerChild,
  appleSpring,
} from '@/lib/animations/presets'

const contactReasons = [
  { id: 'demo', label: 'Solicitar demonstração', icon: MessageSquare },
  { id: 'partnership', label: 'Proposta de parceria', icon: Building2 },
  { id: 'general', label: 'Contato geral', icon: Mail },
]

export function ContactSection() {
  const [selectedReason, setSelectedReason] = useState('demo')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section
      id="contato"
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/80 to-white dark:via-slate-900/30 dark:to-[#0a0a0a]" />

      {/* Decorative Gradient */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-[150px] opacity-50"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <motion.span
            variants={staggerChild}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4"
          >
            Entre em Contato
          </motion.span>
          <motion.h2
            variants={staggerChild}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6"
          >
            Vamos{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              conversar
            </span>
          </motion.h2>
          <motion.p
            variants={staggerChild}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto"
          >
            Tem interesse em conhecer o WellWave? Entre em contato para uma
            demonstração ou proposta de parceria.
          </motion.p>
        </motion.div>

        {/* Contact Form Card */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
        >
          <GlassCard variant="elevated" padding="lg" hover={false}>
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Mensagem enviada!
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Entraremos em contato em breve.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Reason */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
                    Motivo do contato
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {contactReasons.map((reason) => (
                      <motion.button
                        key={reason.id}
                        type="button"
                        onClick={() => setSelectedReason(reason.id)}
                        className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                          selectedReason === reason.id
                            ? 'border-blue-500 bg-blue-500/5'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={appleSpring}
                      >
                        <reason.icon
                          className={`w-5 h-5 ${
                            selectedReason === reason.id
                              ? 'text-blue-600'
                              : 'text-slate-400'
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            selectedReason === reason.id
                              ? 'text-blue-600'
                              : 'text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {reason.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"
                    >
                      Nome completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                      placeholder="Dr. João Silva"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                      placeholder="joao@hospital.com"
                    />
                  </div>
                </div>

                {/* Institution */}
                <div>
                  <label
                    htmlFor="institution"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"
                  >
                    Instituição / Hospital{' '}
                    <span className="text-slate-400 font-normal">(opcional)</span>
                  </label>
                  <input
                    type="text"
                    id="institution"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    placeholder="Hospital São Paulo"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                    placeholder="Conte-nos mais sobre seu interesse..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 rounded-2xl text-base font-bold shadow-lg hover:shadow-xl transition-all bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100"
                >
                  Enviar mensagem
                  <Send className="w-5 h-5 ml-2" />
                </Button>

                <p className="text-center text-sm text-slate-500">
                  Responderemos em até 24 horas úteis.
                </p>
              </form>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}




