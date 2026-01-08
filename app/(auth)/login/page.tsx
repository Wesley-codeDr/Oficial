'use client'

import { Activity, Shield, Zap, FileText, Brain, ClipboardCheck, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { LoginForm } from '@/components/auth/login-form'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
}

const features = [
  {
    icon: Brain,
    title: 'IA Avançada',
    description: 'Anamnese guiada por inteligência artificial de ponta',
    gradient: 'from-blue-500/10 to-purple-500/10',
    iconGradient: 'from-blue-500 to-purple-600',
  },
  {
    icon: ClipboardCheck,
    title: 'Completo',
    description: 'Histórico médico detalhado e organizado',
    gradient: 'from-green-500/10 to-emerald-500/10',
    iconGradient: 'from-green-500 to-emerald-600',
  },
  {
    icon: Shield,
    title: 'Seguro',
    description: 'Dados protegidos com criptografia de nível militar',
    gradient: 'from-orange-500/10 to-red-500/10',
    iconGradient: 'from-orange-500 to-red-600',
  },
]

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-col lg:flex-row lg:gap-0">
      {/* Branding Section - Left side on desktop, top on mobile */}
      <motion.div
        className="flex flex-col items-center justify-center px-6 py-8 lg:flex-1 lg:py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo with animated glow */}
        <motion.div 
          variants={itemVariants} 
          className="mb-6 relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="absolute inset-0 blur-2xl opacity-40 bg-gradient-to-br from-[#007AFF] to-[#5856D6] rounded-3xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#007AFF] to-[#5856D6] shadow-2xl shadow-primary/30">
            <Activity className="h-10 w-10 text-white" />
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360, 720],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="h-5 w-5 text-yellow-300 fill-yellow-300" />
            </motion.div>
          </div>
        </motion.div>

        {/* Company Name with gradient */}
        <motion.h1 variants={itemVariants} className="mb-3 text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-[#007AFF] via-[#5856D6] to-[#007AFF] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
            WellWave
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="mb-8 text-center text-lg text-slate-600 dark:text-slate-300"
        >
          Anamnese Inteligente para Médicos
        </motion.p>

        {/* Feature Highlights - visible on larger screens */}
        <motion.div variants={itemVariants} className="hidden w-full max-w-sm space-y-4 lg:block">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  flex items-start gap-4 rounded-2xl p-4 backdrop-blur-sm transition-all duration-300
                  hover:scale-[1.02] hover:shadow-lg
                  bg-gradient-to-br ${feature.gradient}
                  border border-white/30 dark:border-white/10
                `}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white/80 to-white/50 dark:from-white/20 dark:to-white/10 shadow-sm">
                  <IconComponent className={`h-5 w-5 bg-gradient-to-br ${feature.iconGradient} bg-clip-text text-transparent`} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">{feature.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Mobile feature badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 lg:hidden"
        >
          <div className="flex items-center gap-1.5 rounded-full bg-white/50 dark:bg-white/10 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 border border-white/30 dark:border-white/10">
            <Zap className="h-4 w-4 text-amber-500" />
            <span className="font-medium">Rápido</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/50 dark:bg-white/10 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 border border-white/30 dark:border-white/10">
            <Shield className="h-4 w-4 text-green-500" />
            <span className="font-medium">Seguro</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/50 dark:bg-white/10 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 border border-white/30 dark:border-white/10">
            <FileText className="h-4 w-4 text-blue-500" />
            <span className="font-medium">Completo</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Divider - horizontal on mobile, vertical on desktop */}
      <div className="relative px-6 py-4 lg:flex lg:items-center lg:px-0 lg:py-0">
        {/* Mobile horizontal divider */}
        <div className="relative lg:hidden">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/30 dark:border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white/70 dark:bg-slate-900/70 px-3 text-slate-400 dark:text-slate-500 backdrop-blur-sm rounded-full">
              Acesse sua conta
            </span>
          </div>
        </div>
        {/* Desktop vertical divider */}
        <div className="hidden h-64 w-px bg-gradient-to-b from-transparent via-white/30 dark:via-white/10 to-transparent lg:block" />
      </div>

      {/* Form Section - Right side on desktop, bottom on mobile */}
      <motion.div
        className="flex flex-1 flex-col justify-center px-6 py-8 lg:py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="w-full max-w-sm mx-auto lg:mx-0">
          {/* Form Header - desktop only */}
          <div className="mb-6 hidden lg:block">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-semibold text-slate-900 dark:text-slate-100"
            >
              Bem-vindo de volta
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-1 text-sm text-slate-600 dark:text-slate-400"
            >
              Entre com suas credenciais para continuar
            </motion.p>
          </div>

          <LoginForm />
        </motion.div>
      </motion.div>
    </div>
  )
}
