'use client'

import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { ArrowRight, Sparkles, Zap, Shield, HeartPulse, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  fadeInUp, 
  scaleIn, 
  staggerContainer, 
  staggerChild,
  floatingAnimation,
  pulseGlow,
  appleSpring,
  liquidTransition
} from "@/lib/animations/presets"

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Apple 2025 Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-[#0a0a0a] dark:via-[#0d0d0f] dark:to-[#0a0a0a]" />
        {/* Subtle animated gradient orbs */}
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-ios-blue/10 to-ios-purple/10 rounded-full blur-3xl opacity-50 dark:opacity-30"
          animate={pulseGlow}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-ios-teal/10 to-ios-green/10 rounded-full blur-3xl opacity-50 dark:opacity-30"
          animate={{
            ...pulseGlow,
            transition: {
              ...pulseGlow.transition,
              delay: 1,
            }
          }}
        />
      </div>

      <motion.div 
        className="max-w-6xl w-full px-6 sm:px-8 lg:px-12 mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Hero Section */}
        <motion.div 
          variants={fadeInUp}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div 
            variants={staggerChild}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 mb-6 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-ios-blue" />
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              Estilo Apple 2025
            </span>
          </motion.div>
          
          <motion.h1 
            variants={staggerChild}
            className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 text-gradient tracking-tight leading-[1.1]"
          >
            WellWave
          </motion.h1>
          
          <motion.p 
            variants={staggerChild}
            className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-4 font-medium max-w-2xl mx-auto"
          >
            Anamnese Digital para Emergências
          </motion.p>
          
          <motion.p 
            variants={staggerChild}
            className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed"
          >
            Plataforma de anamnese digital com IA para pronto-socorro. 
            Gere documentação médica completa em segundos.
          </motion.p>

          <motion.div 
            variants={staggerChild}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              asChild
              size="lg" 
              className="h-12 px-8 rounded-[20px] text-base font-bold shadow-lg hover:shadow-xl transition-all glass-elevated"
            >
              <Link href="/login">
                Começar Agora
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="h-12 px-8 rounded-[20px] text-base font-bold glass hover:bg-white/60 dark:hover:bg-white/10"
            >
              <Link href="/dashboard">
                Ver Dashboard
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-12 lg:mb-16"
        >
          <motion.div variants={staggerChild}>
            <GlassCard 
              variant="elevated" 
              padding="lg" 
              className="group hover:scale-[1.02] transition-transform duration-500 relative overflow-hidden"
              whileHover={{ y: -4 }}
              transition={appleSpring}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-ios-blue/5 to-ios-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-start gap-4">
                <motion.div 
                  className="p-3 rounded-2xl bg-gradient-to-br from-ios-blue/20 to-ios-cyan/20 backdrop-blur-sm"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={appleSpring}
                >
                  <Zap className="w-6 h-6 text-ios-blue" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                    Rápido e Eficiente
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Reduza o tempo de documentação médica de 5 minutos para 90 segundos
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={staggerChild}>
            <GlassCard 
              variant="elevated" 
              padding="lg" 
              className="group hover:scale-[1.02] transition-transform duration-500 relative overflow-hidden"
              whileHover={{ y: -4 }}
              transition={appleSpring}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-ios-green/5 to-ios-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-start gap-4">
                <motion.div 
                  className="p-3 rounded-2xl bg-gradient-to-br from-ios-green/20 to-ios-teal/20 backdrop-blur-sm"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={appleSpring}
                >
                  <Shield className="w-6 h-6 text-ios-green" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                    Compliance Total
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    100% conforme CFM e LGPD. Documentação à prova de auditorias
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={staggerChild} className="md:col-span-2 lg:col-span-1">
            <GlassCard 
              variant="elevated" 
              padding="lg" 
              className="group hover:scale-[1.02] transition-transform duration-500 relative overflow-hidden"
              whileHover={{ y: -4 }}
              transition={appleSpring}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-ios-purple/5 to-ios-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-start gap-4">
                <motion.div 
                  className="p-3 rounded-2xl bg-gradient-to-br from-ios-purple/20 to-ios-pink/20 backdrop-blur-sm"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={appleSpring}
                >
                  <HeartPulse className="w-6 h-6 text-ios-purple" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                    Interface Intuitiva
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Design pensado para uso em situações de alta pressão
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div 
          variants={scaleIn}
          className="mt-8 lg:mt-12"
        >
          <GlassCard 
            variant="default" 
            padding="lg" 
            className="text-center relative overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={liquidTransition}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-ios-blue/5 via-ios-purple/5 to-ios-pink/5 opacity-50" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                Tecnologias Modernas
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Construído com as melhores ferramentas para performance e experiência do usuário
              </p>
              <motion.div 
                variants={staggerContainer}
                className="flex flex-wrap gap-3 justify-center"
              >
                {[
                  "Next.js 16",
                  "React 19",
                  "TypeScript",
                  "Tailwind CSS",
                  "Framer Motion",
                  "Radix UI",
                ].map((tech, index) => (
                  <motion.span
                    key={tech}
                    variants={staggerChild}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-ios-blue to-ios-purple text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={appleSpring}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          variants={fadeInUp}
          className="mt-12 lg:mt-16"
        >
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Pronto para transformar sua prática médica?
            </p>
            <Button 
              asChild
              size="lg"
              className="h-12 px-8 rounded-[20px] text-base font-bold shadow-lg hover:shadow-xl glass-elevated"
            >
              <Link href="/login">
                Começar Agora
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </main>
  )
}
