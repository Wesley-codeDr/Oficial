'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Heart, Wind, Activity, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { dashboardChoreography } from '@/lib/design-system/animation-choreography'

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

interface DashboardMasonryGridProps {
  syndromes: Syndrome[]
}

const iconMap: Record<string, typeof Heart> = {
  heart: Heart,
  wind: Wind,
  activity: Activity,
}

function SyndromeCard({ syndrome, index, isTall = false }: { syndrome: Syndrome; index: number; isTall?: boolean }) {
  const IconComponent = iconMap[syndrome.icon || 'activity'] || Activity
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
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
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: (dashboardChoreography.gridCards.delay + index * dashboardChoreography.gridCards.stagger) / 1000,
        duration: dashboardChoreography.gridCards.duration / 1000,
        ease: [0.25, 1, 0.5, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={cn('group', isTall && 'md:row-span-2')}
    >
      <Link href={`/anamnese/${syndrome.code.toLowerCase()}`}>
        <motion.div
          whileHover={{ y: -12 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="relative h-full"
        >
          {/* Card Glow Effect */}
          <motion.div
            className="absolute -inset-[1px] rounded-glass-lg bg-gradient-to-br from-healthcare-primary/20 via-transparent to-healthcare-info/20 blur-md"
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          <div
            className={cn(
              'relative h-full rounded-glass-lg p-6',
              'backdrop-blur-glass',
              'bg-white/40 dark:bg-slate-900/40',
              'border border-white/50 dark:border-white/20',
              'shadow-glass-light dark:shadow-glass-dark',
              'overflow-hidden',
              'transition-all duration-500',
              isTall ? 'min-h-[400px]' : 'min-h-[280px]'
            )}
          >
            {/* Noise Texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.02]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                mixBlendMode: 'overlay',
              }}
            />

            {/* Specular Highlight */}
            <div className="absolute inset-x-[10%] top-0 h-[50%] bg-gradient-to-b from-white/60 to-transparent dark:from-white/20 rounded-t-full pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center space-y-5 text-center h-full">
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 8, scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="relative"
              >
                {/* Icon Glow */}
                <motion.div
                  className="absolute inset-0 rounded-glass-md bg-gradient-to-br from-healthcare-primary/30 to-healthcare-info/30 blur-xl"
                  animate={{
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div
                  className={cn(
                    'relative flex items-center justify-center rounded-glass-md',
                    'backdrop-blur-glass',
                    'bg-white/60 dark:bg-slate-800/50',
                    'border border-white/50 dark:border-white/20',
                    'shadow-glass-light',
                    'transition-all duration-500',
                    isTall ? 'h-20 w-20' : 'h-16 w-16'
                  )}
                >
                  <IconComponent
                    className={cn(
                      'text-healthcare-primary dark:text-healthcare-primary-dark transition-all duration-300',
                      isTall ? 'h-10 w-10' : 'h-8 w-8'
                    )}
                  />
                </div>
              </motion.div>

              {/* Title & Description */}
              <div className="space-y-2 flex-1 flex flex-col justify-center">
                <h2
                  className={cn(
                    'font-bold text-slate-900 dark:text-white tracking-tight',
                    'group-hover:text-healthcare-primary dark:group-hover:text-healthcare-primary-dark',
                    'transition-colors duration-300',
                    isTall ? 'text-xl' : 'text-lg'
                  )}
                >
                  {syndrome.name}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-[250px]">
                  {syndrome.description}
                </p>
              </div>

              {/* Count Badge */}
              <div
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-glass-pill px-4 py-2',
                  'backdrop-blur-glass',
                  'bg-white/60 dark:bg-slate-800/50',
                  'border border-white/50 dark:border-white/20',
                  'shadow-glass-light',
                  'text-xs font-bold text-slate-700 dark:text-slate-300',
                  'group-hover:bg-healthcare-primary-glass',
                  'group-hover:text-healthcare-primary dark:group-hover:text-healthcare-primary-dark',
                  'group-hover:border-healthcare-primary/30',
                  'transition-all duration-300'
                )}
              >
                <span>{syndrome._count.checkboxes} itens</span>
                <motion.div
                  animate={{
                    x: isHovered ? 2 : 0,
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="h-3 w-3" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export function DashboardMasonryGrid({ syndromes }: DashboardMasonryGridProps) {
  if (syndromes.length === 0) {
    return null
  }

  // Create masonry pattern: [tall, normal, normal, normal, tall, normal...]
  const pattern = syndromes.map((_, index) => {
    // Make every 3rd card tall (0, 3, 6...)
    return index % 3 === 0
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:auto-rows-fr">
      {syndromes.map((syndrome, index) => (
        <SyndromeCard
          key={syndrome.id}
          syndrome={syndrome}
          index={index}
          isTall={pattern[index]}
        />
      ))}
    </div>
  )
}
