'use client'

import Link from 'next/link'
import { Heart, Wind, Activity as ActivityIcon, Plus, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass-card'
import { GlassButton } from '@/components/ui/glass-button'
import { GlassBadge } from '@/components/ui/glass-badge'
import { useRef, useEffect, useState } from 'react'

interface Syndrome {
  id: string
  name: string
  code: string
  description: string | null
  icon: string | null
  _count: {
    checkboxes: number
  }
}

interface DashboardClientProps {
  syndromes: Syndrome[]
}

const iconMap: Record<string, typeof Heart> = {
  heart: Heart,
  wind: Wind,
  activity: ActivityIcon,
}

const features = [
  {
    icon: Zap,
    title: 'Rápido',
    description: 'Anamnese em minutos',
    gradient: 'from-[#FF9500]/20 to-[#FF9500]/20',
    iconGradient: 'from-[#FF9500] to-[#FF9500]',
    glow: 'orange' as const,
  },
  {
    icon: Shield,
    title: 'Seguro',
    description: 'Dados protegidos',
    gradient: 'from-[#34C759]/20 to-[#34C759]/20',
    iconGradient: 'from-[#34C759] to-[#34C759]',
    glow: 'green' as const,
  },
  {
    icon: Sparkles,
    title: 'IA',
    description: 'Inteligência artificial',
    gradient: 'from-[#AF52DE]/20 to-[#AF52DE]/20',
    iconGradient: 'from-[#AF52DE] to-[#AF52DE]',
    glow: 'purple' as const,
  },
]

// Animated Background Gradient Blobs
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Primary blob - Apple System Blue */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0,122,255,0.4) 0%, rgba(0,122,255,0) 70%)',
          filter: 'blur(80px)',
          top: '-10%',
          right: '-5%',
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary blob - Apple System Teal */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25 dark:opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(90,200,250,0.35) 0%, rgba(90,200,250,0) 70%)',
          filter: 'blur(60px)',
          bottom: '10%',
          left: '-10%',
        }}
        animate={{
          x: [0, -40, 60, 0],
          y: [0, 50, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Tertiary blob - Apple System Purple */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20 dark:opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(175,82,222,0.35) 0%, rgba(175,82,222,0) 70%)',
          filter: 'blur(70px)',
          top: '40%',
          left: '30%',
        }}
        animate={{
          x: [0, 70, -50, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Noise overlay for organic texture */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

// Enhanced Feature Pill with glass morphism
function FeaturePill({ feature, index }: { feature: typeof features[0]; index: number }) {
  const FeatureIcon = feature.icon
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        delay: 0.2 + index * 0.08,
        duration: 0.5,
        type: 'spring',
        stiffness: 300,
        damping: 25
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glow effect on hover */}
      <motion.div
        className={`absolute inset-0 rounded-[14px] bg-gradient-to-r ${feature.gradient} blur-xl`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div
        className={`
          relative flex items-center gap-2.5 px-5 py-3 rounded-[14px]
          liquid-glass-regular rim-light-ios26 inner-glow-ios26
          border border-white/50 dark:border-white/12
          transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-default
          overflow-hidden
        `}
      >
        {/* Inner specular highlight */}
        <div className="absolute inset-x-[10%] top-0 h-[50%] bg-gradient-to-b from-white/60 to-transparent dark:from-white/20 rounded-t-full pointer-events-none" />

        {/* Icon with gradient */}
        <div className={`relative w-5 h-5 flex items-center justify-center rounded-full bg-gradient-to-br ${feature.iconGradient} p-0.5`}>
          <div className="w-full h-full bg-white/90 dark:bg-slate-900/80 rounded-full flex items-center justify-center">
            <FeatureIcon className="h-3 w-3 text-slate-700 dark:text-slate-200" />
          </div>
        </div>

        <span className="text-sm font-semibold text-slate-800 dark:text-white tracking-tight">
          {feature.title}
        </span>
      </div>
    </motion.div>
  )
}

// Enhanced Syndrome Card with depth and interactions
function SyndromeCard({ syndrome, index }: { syndrome: Syndrome; index: number }) {
  const IconComponent = iconMap[syndrome.icon || 'activity'] || ActivityIcon
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.3 + index * 0.1,
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="group"
    >
      <Link href={`/anamnese/${syndrome.code.toLowerCase()}`}>
        <motion.div
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="relative h-full"
        >
          {/* Card glow effect */}
          <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

          <div
            className="relative h-full rounded-[24px] p-6 overflow-hidden
              liquid-glass-regular rim-light-ios26 liquid-glass-specular
              border border-white/50 dark:border-white/12
              transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)]"
          >
            {/* Noise texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.02]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                mixBlendMode: 'overlay',
              }}
            />

            {/* Specular and rim light provided via utility classes */}

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center space-y-5 text-center">
              {/* Icon with enhanced glass background */}
              <motion.div
                whileHover={{ rotate: 8, scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="relative"
              >
                {/* Icon glow */}
                <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex h-16 w-16 items-center justify-center rounded-[16px]
                  liquid-glass-regular rim-light-ios26 inner-glow-ios26
                  border border-white/50 dark:border-white/12
                  transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                >
                  <IconComponent className="h-8 w-8 text-[#007AFF] dark:text-blue-400 transition-all duration-300" />
                </div>
              </motion.div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {syndrome.name}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-[200px]">
                  {syndrome.description}
                </p>
              </div>

              {/* Count Badge - Enhanced glass pill */}
              <div className="inline-flex items-center gap-1.5 rounded-[14px] px-4 py-2 text-xs font-bold
                liquid-glass-subtle
                bg-white/60 dark:bg-slate-800/50
                border border-white/50 dark:border-white/12
                shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.7)]
                dark:shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]
                text-slate-700 dark:text-slate-300
                group-hover:bg-blue-50/80 dark:group-hover:bg-blue-500/15
                group-hover:text-blue-700 dark:group-hover:text-blue-300
                group-hover:border-blue-200/50 dark:group-hover:border-blue-400/20
                transition-all duration-300"
              >
                <span>{syndrome._count.checkboxes} itens</span>
                <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export function DashboardClient({ syndromes }: DashboardClientProps) {
  const [_mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <AnimatedBackground />

      <div className="relative z-10 space-y-10 pb-12">
        {/* Header Section with enhanced typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="space-y-3"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
              backdrop-blur-xl bg-blue-500/10 dark:bg-blue-400/15
              border border-blue-200/50 dark:border-blue-400/20
              text-xs font-semibold text-blue-600 dark:text-blue-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            Pronto para uso
          </motion.div>

          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
            Nova Anamnese
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
            Selecione a síndrome clínica para iniciar o preenchimento da anamnese.
          </p>
        </motion.div>

        {/* Features Pills - Enhanced iOS 26 Glass Pills */}
        <div className="flex flex-wrap gap-3">
          {features.map((feature, index) => (
            <FeaturePill key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Syndromes Grid - Enhanced Cards */}
        {syndromes.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {syndromes.map((syndrome, index) => (
              <SyndromeCard key={syndrome.id} syndrome={syndrome} index={index} />
            ))}
          </div>
        ) : (
          /* Empty State - Enhanced Glass Card */
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <GlassCard
              variant="elevated"
              hover={false}
              className="p-10 text-center max-w-md mx-auto"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl
                    backdrop-blur-xl
                    bg-gradient-to-br from-slate-100/60 to-slate-200/40 dark:from-slate-800/50 dark:to-slate-700/30
                    border border-white/40 dark:border-white/12
                    shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.5)]"
                >
                  <Plus className="h-10 w-10 text-slate-400 dark:text-slate-500" />
                </motion.div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Nenhuma síndrome disponível
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Execute o seed do banco de dados para adicionar as síndromes iniciais.
                  </p>
                </div>

                <motion.code
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="inline-block rounded-2xl
                    backdrop-blur-xl
                    bg-slate-900/8 dark:bg-slate-100/8
                    border border-slate-200/50 dark:border-white/10
                    px-5 py-3 text-sm text-slate-700 dark:text-slate-300 font-mono
                    shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                >
                  pnpm db:seed
                </motion.code>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  )
}
