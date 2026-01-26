'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Heart, Wind, Activity, ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeaturedSyndromeCardProps {
  syndrome: {
    id: string
    name: string
    code: string
    description: string | null
    icon: string | null
    _count: {
      checkboxes: number
    }
  }
  className?: string
}

const iconMap: Record<string, typeof Heart> = {
  heart: Heart,
  wind: Wind,
  activity: Activity,
}

export function FeaturedSyndromeCard({ syndrome, className }: FeaturedSyndromeCardProps) {
  const IconComponent = iconMap[syndrome.icon || 'activity'] || Activity
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Enhanced 3D tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 300,
    damping: 30,
  })

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
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.6,
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
      className={cn('group', className)}
    >
      <Link href={`/anamnese/${syndrome.code.toLowerCase()}`}>
        <motion.div
          whileHover={{ y: -16 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="relative h-full"
        >
          {/* Intense Glow Effect */}
          <motion.div
            className="absolute -inset-4 rounded-glass-xl bg-gradient-to-br from-healthcare-primary/30 via-healthcare-info/30 to-healthcare-success/30 blur-3xl"
            animate={{
              opacity: isHovered ? 0.8 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.4 }}
          />

          <div
            className={cn(
              'relative h-full rounded-glass-xl p-10',
              'backdrop-blur-glass',
              'bg-gradient-to-br from-white/60 via-white/40 to-white/50',
              'dark:from-slate-900/60 dark:via-slate-900/40 dark:to-slate-900/50',
              'border-2 border-white/50 dark:border-white/20',
              'shadow-glass-light dark:shadow-glass-dark',
              'overflow-hidden',
              'transition-all duration-500'
            )}
          >
            {/* Noise Texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                mixBlendMode: 'overlay',
              }}
            />

            {/* Specular Highlight */}
            <div className="absolute inset-x-[10%] top-0 h-[40%] bg-gradient-to-b from-white/60 to-transparent dark:from-white/20 rounded-t-full pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Enhanced Icon */}
              <motion.div
                whileHover={{ rotate: 12, scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="relative flex-shrink-0"
              >
                {/* Icon Glow */}
                <motion.div
                  className="absolute inset-0 rounded-glass-lg bg-gradient-to-br from-healthcare-primary/40 to-healthcare-info/40 blur-2xl"
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1.3 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div
                  className={cn(
                    'relative flex h-24 w-24 items-center justify-center rounded-glass-lg',
                    'backdrop-blur-glass',
                    'bg-gradient-to-br from-healthcare-primary-glass to-healthcare-info-glass',
                    'border-2 border-white/60 dark:border-white/30',
                    'shadow-glass-light',
                    'transition-all duration-500'
                  )}
                >
                  <IconComponent className="h-12 w-12 text-healthcare-primary dark:text-healthcare-primary-dark transition-all duration-300" />
                </div>
              </motion.div>

              {/* Text Content */}
              <div className="flex-1 space-y-4 text-center md:text-left">
                {/* Featured Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-glass-pill backdrop-blur-glass bg-healthcare-warning-glass border border-healthcare-warning/30"
                >
                  <Sparkles className="w-3 h-3 text-healthcare-warning dark:text-healthcare-warning-dark" />
                  <span className="text-xs font-bold text-healthcare-warning dark:text-healthcare-warning-dark uppercase tracking-wider">
                    Destaque
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                  className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-healthcare-primary dark:group-hover:text-healthcare-primary-dark transition-colors duration-300"
                >
                  {syndrome.name}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.3 }}
                  className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl"
                >
                  {syndrome.description}
                </motion.p>

                {/* Stats & CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.3 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <div
                    className={cn(
                      'inline-flex items-center gap-2 rounded-glass-lg px-4 py-2',
                      'backdrop-blur-glass',
                      'bg-white/60 dark:bg-slate-800/50',
                      'border border-white/50 dark:border-white/20',
                      'text-sm font-bold text-slate-700 dark:text-slate-300'
                    )}
                  >
                    {syndrome._count.checkboxes} itens disponíveis
                  </div>

                  <motion.div
                    className={cn(
                      'inline-flex items-center gap-2 rounded-glass-lg px-5 py-2',
                      'backdrop-blur-glass',
                      'bg-healthcare-primary-glass',
                      'border border-healthcare-primary/30',
                      'text-sm font-bold text-healthcare-primary dark:text-healthcare-primary-dark',
                      'group-hover:bg-healthcare-primary group-hover:text-white',
                      'transition-all duration-300'
                    )}
                  >
                    <span>Iniciar agora</span>
                    <motion.div
                      animate={{
                        x: isHovered ? 4 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
