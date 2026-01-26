'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { healthcareColors } from '@/lib/design-system/glass-tokens'
import { redFlagChoreography } from '@/lib/design-system/animation-choreography'

/**
 * Medical Alert Component - Healthcare-specific alerts
 *
 * Variants:
 * - critical: Red, pulse animation, audio feedback (red flags)
 * - warning: Orange, subtle glow
 * - info: Blue, sem animação intensa
 *
 * Features:
 * - Pulse animation (1.5s loop) para critical
 * - Glow effect para urgência
 * - Icon animado
 * - Dismissible com slide-out
 * - Opcional: Audio feedback
 * - Opcional: Haptic feedback visual
 */

export type MedicalAlertVariant = 'critical' | 'warning' | 'info'

export interface MedicalAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: MedicalAlertVariant
  children: React.ReactNode
  /** Ativar animação de pulso (apenas critical) */
  animate?: boolean
  /** Tocar som de alerta (apenas critical) */
  playSound?: boolean
  /** Feedback visual de haptic */
  haptic?: boolean
  /** Permitir fechar o alerta */
  dismissible?: boolean
  /** Callback quando alerta é fechado */
  onDismiss?: () => void
  /** Título do alerta */
  title?: string
}

const variantConfig = {
  critical: {
    icon: AlertCircle,
    bg: 'bg-healthcare-critical-glass dark:bg-[rgba(255,59,48,0.15)]',
    border: 'border-healthcare-critical/30 dark:border-healthcare-critical-dark/40',
    text: 'text-healthcare-critical dark:text-healthcare-critical-dark',
    iconBg: 'bg-healthcare-critical/15',
    glow: 'shadow-[0_0_20px_rgba(255,59,48,0.3)]',
    glowColor: 'rgba(255, 59, 48, 0.3)',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-healthcare-warning-glass dark:bg-[rgba(255,149,0,0.15)]',
    border: 'border-healthcare-warning/30 dark:border-healthcare-warning-dark/40',
    text: 'text-healthcare-warning dark:text-healthcare-warning-dark',
    iconBg: 'bg-healthcare-warning/15',
    glow: 'shadow-[0_0_16px_rgba(255,149,0,0.2)]',
    glowColor: 'rgba(255, 149, 0, 0.2)',
  },
  info: {
    icon: Info,
    bg: 'bg-healthcare-info-glass dark:bg-[rgba(90,200,250,0.15)]',
    border: 'border-healthcare-info/30 dark:border-healthcare-info-dark/40',
    text: 'text-healthcare-info dark:text-healthcare-info-dark',
    iconBg: 'bg-healthcare-info/15',
    glow: '',
    glowColor: 'rgba(90, 200, 250, 0.2)',
  },
}

export const MedicalAlert = React.forwardRef<HTMLDivElement, MedicalAlertProps>(
  (
    {
      variant = 'info',
      children,
      animate = variant === 'critical',
      playSound = false,
      haptic = variant === 'critical',
      dismissible = true,
      onDismiss,
      title,
      className,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true)
    const [audioPlayed, setAudioPlayed] = React.useState(false)
    const config = variantConfig[variant]
    const Icon = config.icon

    // Play sound effect (apenas uma vez)
    React.useEffect(() => {
      if (playSound && variant === 'critical' && !audioPlayed) {
        // Criar beep de alerta simples
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()

          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)

          oscillator.frequency.value = 800 // Hz
          oscillator.type = 'sine'

          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + 0.3)

          setAudioPlayed(true)
        } catch (error) {
          console.warn('Audio playback failed:', error)
        }
      }
    }, [playSound, variant, audioPlayed])

    const handleDismiss = () => {
      setIsVisible(false)
      setTimeout(() => {
        onDismiss?.()
      }, 300)
    }

    if (!isVisible && onDismiss) {
      return null
    }

    return (
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            ref={ref}
            initial={{
              opacity: 0,
              scale: 0.9,
              y: -10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              x: 100,
            }}
            transition={
              variant === 'critical'
                ? redFlagChoreography.background
                : { duration: 0.3, ease: [0.25, 1, 0.5, 1] }
            }
            className={cn(
              'relative overflow-hidden',
              'backdrop-blur-[40px] saturate-[180%]',
              config.bg,
              'border',
              config.border,
              'rounded-glass-md p-4',
              animate && config.glow,
              'flex items-start gap-3',
              'transition-all duration-200',
              className
            )}
            {...props}
          >
            {/* Background pulse animation para critical */}
            {animate && variant === 'critical' && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  background: `radial-gradient(circle at center, ${config.glowColor}, transparent 70%)`,
                }}
              />
            )}

            {/* Icon com animação */}
            <motion.div
              className={cn(
                'flex-shrink-0 w-10 h-10 rounded-glass-sm',
                'flex items-center justify-center',
                config.iconBg,
                config.text
              )}
              initial={variant === 'critical' ? { scale: 0, rotate: -180 } : { scale: 1 }}
              animate={
                variant === 'critical'
                  ? { scale: 1, rotate: 0 }
                  : animate
                  ? {
                      scale: [1, 1.1, 1],
                    }
                  : { scale: 1 }
              }
              transition={
                variant === 'critical'
                  ? redFlagChoreography.icon
                  : animate
                  ? {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                  : undefined
              }
            >
              <Icon className="w-5 h-5" />
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {title && (
                <motion.h4
                  className={cn('font-semibold text-sm mb-1', config.text)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  {title}
                </motion.h4>
              )}
              <motion.div
                className={cn('text-sm', config.text, 'opacity-90')}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={
                  variant === 'critical'
                    ? redFlagChoreography.text
                    : { delay: 0.15, duration: 0.25 }
                }
              >
                {children}
              </motion.div>
            </div>

            {/* Dismiss button */}
            {dismissible && (
              <motion.button
                onClick={handleDismiss}
                className={cn(
                  'flex-shrink-0 p-1.5 rounded-glass-sm',
                  'hover:bg-white/10 dark:hover:bg-white/5',
                  'transition-colors duration-200',
                  config.text,
                  'opacity-60 hover:opacity-100'
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Fechar alerta"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}

            {/* Haptic feedback indicator */}
            {haptic && variant === 'critical' && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{
                  background: `linear-gradient(90deg, transparent, ${healthcareColors.critical.light}, transparent)`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scaleX: [0, 1, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)

MedicalAlert.displayName = 'MedicalAlert'
