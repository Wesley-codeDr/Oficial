'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatWellAvatar } from './chatwell-avatar'
import { cn } from '@/lib/utils'

interface TypingIndicatorProps {
  className?: string
}

export function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn('flex gap-3', className)}
    >
      {/* Avatar */}
      <ChatWellAvatar size="md" isAnimating />

      {/* Typing bubble */}
      <motion.div
        className={cn(
          'flex items-center gap-3 px-5 py-4 rounded-2xl',
          'bg-white/60 dark:bg-white/5',
          'backdrop-blur-xl',
          'border border-white/30 dark:border-white/10',
          'shadow-[0_4px_24px_rgba(0,0,0,0.04)]'
        )}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Animated dots */}
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-500"
              animate={{
                y: [0, -6, 0],
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Status text */}
        <motion.span
          className="text-sm text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Analisando evidências...
        </motion.span>
      </motion.div>
    </motion.div>
  )
}

/** Processing states for more detailed feedback */
const processingStates = [
  'Analisando evidências...',
  'Consultando diretrizes...',
  'Verificando estudos clínicos...',
  'Preparando resposta...',
]

/** Interval in ms to cycle through states */
const STATE_CYCLE_INTERVAL = 2000

export function DetailedTypingIndicator({ className }: TypingIndicatorProps) {
  const [currentStateIndex, setCurrentStateIndex] = useState(0)

  // Cycle through processing states
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStateIndex((prev) => (prev + 1) % processingStates.length)
    }, STATE_CYCLE_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  const currentState = processingStates[currentStateIndex]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn('flex gap-3', className)}
    >
      <ChatWellAvatar size="md" isAnimating />

      <motion.div
        className={cn(
          'flex flex-col gap-2 px-5 py-4 rounded-2xl min-w-[200px]',
          'bg-white/60 dark:bg-white/5',
          'backdrop-blur-xl',
          'border border-white/30 dark:border-white/10',
          'shadow-[0_4px_24px_rgba(0,0,0,0.04)]'
        )}
      >
        {/* Progress bar */}
        <div className="h-1 w-full rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 8,
              ease: 'linear',
            }}
          />
        </div>

        {/* Cycling status messages */}
        <div className="flex items-center gap-2">
          <motion.div
            className="h-2 w-2 rounded-full bg-blue-500"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <AnimatePresence mode="wait">
            <motion.span
              key={currentState}
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {currentState}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}
