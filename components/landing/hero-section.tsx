'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  fadeInUp,
  staggerContainer,
  staggerChild,
  pulseGlow,
  appleSpring,
} from '@/lib/animations/presets'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 dark:from-[#0a0a0a] dark:via-[#0d0d0f] dark:to-[#0a0a0a]" />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 via-cyan-300/15 to-transparent rounded-full blur-[120px]"
          animate={pulseGlow}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/15 via-pink-300/10 to-transparent rounded-full blur-[100px]"
          animate={{
            ...pulseGlow,
            transition: {
              ...pulseGlow.transition,
              delay: 1,
            },
          }}
        />
        
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <motion.div
        className="max-w-7xl w-full px-6 sm:px-8 lg:px-12 mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div variants={fadeInUp} className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              variants={staggerChild}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Plataforma em constante evolução
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={staggerChild}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] mb-6"
            >
              <span className="text-slate-900 dark:text-white">
                Anamnese digital
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                inteligente
              </span>
              <br />
              <span className="text-slate-900 dark:text-white">
                para emergências
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={staggerChild}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Plataforma de IA que acelera, organiza e documenta atendimentos no
              pronto-socorro, integrando médico, paciente e dados clínicos em
              segundos.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={staggerChild}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="h-14 px-8 rounded-2xl text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-[1.02]"
              >
                <Link href="/dashboard">
                  Ver Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 rounded-2xl text-base font-bold border-slate-200 dark:border-slate-700 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
              >
                <Link href="/login">Login</Link>
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={staggerChild}
              className="flex items-center gap-6 mt-10 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Conforme LGPD</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">90s por anamnese</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Mockup */}
          <motion.div
            variants={fadeInUp}
            className="relative"
          >
            <motion.div
              className="relative z-10"
              whileHover={{ y: -5 }}
              transition={appleSpring}
            >
              {/* Browser Frame */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
                {/* Browser Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white dark:bg-slate-700 rounded-lg px-4 py-1.5 text-xs text-slate-400 text-center">
                      wellwave.app/dashboard
                    </div>
                  </div>
                </div>
                
                {/* Mockup Content */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                  {/* Simplified Dashboard Preview */}
                  <div className="absolute inset-4 grid grid-cols-3 gap-3">
                    {/* Sidebar Mock */}
                    <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-3 space-y-2">
                      <div className="h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"></div>
                      <div className="h-6 bg-slate-200/50 dark:bg-slate-700/50 rounded w-3/4"></div>
                      <div className="h-6 bg-slate-200/50 dark:bg-slate-700/50 rounded w-1/2"></div>
                      <div className="h-6 bg-slate-200/50 dark:bg-slate-700/50 rounded w-2/3"></div>
                    </div>
                    
                    {/* Main Content Mock */}
                    <div className="col-span-2 space-y-3">
                      <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-3 h-1/2">
                        <div className="h-4 bg-slate-200/50 dark:bg-slate-700/50 rounded w-1/3 mb-3"></div>
                        <div className="grid grid-cols-2 gap-2 h-[calc(100%-28px)]">
                          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl"></div>
                          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl"></div>
                        </div>
                      </div>
                      <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-3 h-[calc(50%-12px)]">
                        <div className="h-4 bg-slate-200/50 dark:bg-slate-700/50 rounded w-1/4 mb-2"></div>
                        <div className="flex gap-2 h-[calc(100%-24px)]">
                          <div className="flex-1 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg"></div>
                          <div className="flex-1 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-lg"></div>
                          <div className="flex-1 bg-gradient-to-br from-rose-500/10 to-red-500/10 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -right-4 top-1/4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 border border-slate-200/50 dark:border-slate-700/50"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Anamnese Gerada</p>
                    <p className="text-xs text-slate-500">em 45 segundos</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -left-4 bottom-1/4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 border border-slate-200/50 dark:border-slate-700/50"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">ChatWell ativo</p>
                    <p className="text-xs text-slate-500">IA pronta para ajudar</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-slate-400"
            animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </section>
  )
}




