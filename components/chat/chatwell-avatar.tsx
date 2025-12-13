'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ChatWellAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isAnimating?: boolean
  className?: string
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
  xl: 'h-20 w-20',
}

const iconSizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-7 w-7',
  xl: 'h-10 w-10',
}

export function ChatWellAvatar({ 
  size = 'md', 
  isAnimating = false,
  className 
}: ChatWellAvatarProps) {
  // Apple HIG: Container neutro, cor apenas no ícone
  return (
    <motion.div
      className={cn(
        'relative flex items-center justify-center rounded-full',
        'bg-white/70 dark:bg-white/10',
        'backdrop-blur-xl border border-black/[0.08] dark:border-white/10',
        'shadow-sm',
        sizeClasses[size],
        className
      )}
      animate={isAnimating ? {
        scale: [1, 1.05, 1],
        // Apple HIG: Shadow sutil durante animação
        boxShadow: [
          '0 4px 16px rgba(0,0,0,0.08)',
          '0 8px 24px rgba(0,0,0,0.12)',
          '0 4px 16px rgba(0,0,0,0.08)',
        ]
      } : {}}
      transition={{
        duration: 2,
        repeat: isAnimating ? Infinity : 0,
        ease: 'easeInOut',
      }}
    >
      {/* Inner glow ring - Sutil */}
      <motion.div
        className={cn(
          'absolute inset-1 rounded-full',
          'bg-healthcare-primary/20 dark:bg-healthcare-primary/30',
          'blur-sm'
        )}
        animate={isAnimating ? {
          opacity: [0.3, 0.6, 0.3],
        } : {}}
        transition={{
          duration: 1.5,
          repeat: isAnimating ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />

      {/* Animated rings - Sutil */}
      {isAnimating && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border border-healthcare-primary/30"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-healthcare-primary/20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: 2,
              delay: 0.3,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        </>
      )}

      {/* Medical cross icon */}
      <div className={cn('relative z-10 text-healthcare-primary dark:text-healthcare-primary-light', iconSizes[size])}>
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <motion.path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
            fill="currentColor"
            fillOpacity="0.15"
          />
          <motion.path
            d="M12 6v12M6 12h12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            animate={isAnimating ? {
              opacity: [1, 0.7, 1],
            } : {}}
            transition={{
              duration: 1,
              repeat: isAnimating ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />
        </svg>
      </div>
    </motion.div>
  )
}

/** User avatar for chat */
export function UserAvatar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-full',
        'bg-gradient-to-br from-slate-500/20 to-slate-600/20',
        'backdrop-blur-xl border border-white/20 dark:border-white/10',
        'shadow-[0_4px_16px_rgba(0,0,0,0.08)]',
        className
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-slate-600 dark:text-slate-300">
        <path
          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}
