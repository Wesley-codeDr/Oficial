import { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Wind, Activity as ActivityIcon, Plus, Sparkles, Zap, Shield } from 'lucide-react'
import { prisma } from '@/lib/db/prisma'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass-card'

export const metadata: Metadata = {
  title: 'Dashboard | WellWave',
  description: 'Selecione uma síndrome para iniciar a anamnese.',
}

async function getSyndromes() {
  return prisma.syndrome.findMany({
    where: { isActive: true },
    orderBy: { orderIndex: 'asc' },
    include: {
      _count: {
        select: { checkboxes: true },
      },
    },
  })
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
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: Shield,
    title: 'Seguro',
    description: 'Dados protegidos',
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    icon: Sparkles,
    title: 'IA',
    description: 'Inteligência artificial',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
]

export default async function DashboardPage() {
  const syndromes = await getSyndromes()

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Nova Anamnese
        </h1>
        <p className="text-muted-foreground">
          Selecione a síndrome clínica para iniciar o preenchimento da anamnese.
        </p>
      </motion.div>

      {/* Features Pills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex flex-wrap gap-3"
      >
        {features.map((feature, index) => {
          const FeatureIcon = feature.icon
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + index * 0.05, duration: 0.3 }}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full
                backdrop-blur-md
                bg-gradient-to-r ${feature.gradient}
                border border-white/30 dark:border-white/10
                shadow-sm
              `}
            >
              <FeatureIcon className="h-4 w-4" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {feature.title}
              </span>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Syndromes Grid */}
      {syndromes.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {syndromes.map((syndrome, index) => {
            const IconComponent = iconMap[syndrome.icon || 'activity'] || ActivityIcon

            return (
              <motion.div
                key={syndrome.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.08, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              >
                <Link href={`/anamnese/${syndrome.code.toLowerCase()}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      h-full relative overflow-hidden
                      liquid-glass-material
                      bg-white/55 dark:bg-slate-900/55
                      border border-white/40 dark:border-white/10
                      rounded-2xl
                      shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)]
                      dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)]
                      transition-all duration-[500ms] ease-[cubic-bezier(0.25,1,0.5,1)]
                      group
                    `}
                  >
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex flex-col items-center space-y-4 text-center">
                        {/* Icon */}
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 border border-white/30 dark:border-white/10"
                        >
                          <IconComponent className="h-7 w-7 text-blue-600 dark:text-blue-400 transition-colors" />
                        </motion.div>

                        {/* Title & Description */}
                        <div className="space-y-1">
                          <h2 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {syndrome.name}
                          </h2>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {syndrome.description}
                          </p>
                        </div>

                        {/* Count Badge */}
                        <div className="inline-flex items-center rounded-full bg-slate-100/80 dark:bg-slate-800/50 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 border border-white/30 dark:border-white/10">
                          {syndrome._count.checkboxes} itens de avaliação
                        </div>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`
            liquid-glass-material
            bg-white/55 dark:bg-slate-900/55
            border border-white/40 dark:border-white/10
            rounded-3xl
            p-8 text-center
            shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)]
          `}
        >
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100/50 dark:bg-slate-800/30"
            >
              <Plus className="h-8 w-8 text-slate-400 dark:text-slate-500" />
            </motion.div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Nenhuma síndrome disponível
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Execute o seed do banco de dados para adicionar as síndromes iniciais.
              </p>
            </div>
            <motion.code
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block rounded-xl bg-slate-900/10 dark:bg-slate-100/10 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 font-mono"
            >
              pnpm db:seed
            </motion.code>
          </div>
        </motion.div>
      )}
    </div>
  )
}
