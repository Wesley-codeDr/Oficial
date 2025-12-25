'use client'

import { Activity, Shield, Zap, FileText, Brain, ClipboardCheck } from 'lucide-react'
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
    description: 'Anamnese guiada por inteligência artificial',
  },
  {
    icon: ClipboardCheck,
    title: 'Completo',
    description: 'Histórico médico detalhado e organizado',
  },
  {
    icon: Shield,
    title: 'Seguro',
    description: 'Dados protegidos com criptografia',
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
        {/* Logo */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#007AFF] to-[#5856D6] shadow-2xl shadow-primary/30">
            <Activity className="h-10 w-10 text-white" />
          </div>
        </motion.div>

        {/* Company Name */}
        <motion.h1 variants={itemVariants} className="mb-3 text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-[#007AFF] via-[#5856D6] to-[#007AFF] bg-clip-text text-transparent">
            WellWave
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="mb-8 text-center text-lg text-muted-foreground"
        >
          Anamnese Inteligente para Médicos
        </motion.p>

        {/* Feature Highlights - visible on larger screens */}
        <motion.div variants={itemVariants} className="hidden w-full max-w-sm space-y-4 lg:block">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-4 rounded-2xl bg-white/30 p-4 backdrop-blur-sm dark:bg-white/5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Mobile feature badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 lg:hidden"
        >
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Zap className="h-4 w-4 text-primary" />
            <span>Rápido</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" />
            <span>Seguro</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <FileText className="h-4 w-4 text-primary" />
            <span>Completo</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Divider - horizontal on mobile, vertical on desktop */}
      <div className="relative px-6 py-4 lg:flex lg:items-center lg:px-0 lg:py-0">
        {/* Mobile horizontal divider */}
        <div className="relative lg:hidden">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/30" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white/70 dark:bg-slate-900/70 px-3 text-muted-foreground/60 backdrop-blur-sm rounded">
              Acesse sua conta
            </span>
          </div>
        </div>
        {/* Desktop vertical divider */}
        <div className="hidden h-64 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent lg:block" />
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
            <h2 className="text-2xl font-semibold text-foreground">Bem-vindo de volta</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Entre com suas credenciais para continuar
            </p>
          </div>

          <LoginForm />
        </motion.div>
      </motion.div>
    </div>
  )
}
