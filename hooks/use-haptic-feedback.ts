'use client'

import { useCallback, useRef, useState } from 'react'
import { useAnimation, TargetAndTransition } from 'framer-motion'
import { hapticFeedback } from '@/lib/design-system/micro-interactions'

export type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning'

export interface UseHapticFeedbackOptions {
  debounceMs?: number
  defaultType?: HapticType
}

export interface UseHapticFeedbackReturn {
  controls: ReturnType<typeof useAnimation>
  trigger: (type?: HapticType) => Promise<void>
  triggerLight: () => Promise<void>
  triggerMedium: () => Promise<void>
  triggerHeavy: () => Promise<void>
  triggerSuccess: () => Promise<void>
  triggerError: () => Promise<void>
  triggerWarning: () => Promise<void>
  isAnimating: boolean
}

export function useHapticFeedback(options: UseHapticFeedbackOptions = {}): UseHapticFeedbackReturn {
  const { debounceMs = 100, defaultType = 'light' } = options

  const controls = useAnimation()
  const [isAnimating, setIsAnimating] = useState(false)
  const lastTriggerRef = useRef<number>(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const trigger = useCallback(
    async (type: HapticType = defaultType): Promise<void> => {
      const now = Date.now()

      if (now - lastTriggerRef.current < debounceMs) {
        return
      }

      lastTriggerRef.current = now
      setIsAnimating(true)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      try {
        const animation = JSON.parse(JSON.stringify(hapticFeedback[type])) as TargetAndTransition
        await controls.start(animation)
      } finally {
        timeoutRef.current = setTimeout(() => {
          setIsAnimating(false)
        }, 50)
      }
    },
    [controls, debounceMs, defaultType]
  )

  const triggerLight = useCallback(() => trigger('light'), [trigger])
  const triggerMedium = useCallback(() => trigger('medium'), [trigger])
  const triggerHeavy = useCallback(() => trigger('heavy'), [trigger])
  const triggerSuccess = useCallback(() => trigger('success'), [trigger])
  const triggerError = useCallback(() => trigger('error'), [trigger])
  const triggerWarning = useCallback(() => trigger('warning'), [trigger])

  return {
    controls,
    trigger,
    triggerLight,
    triggerMedium,
    triggerHeavy,
    triggerSuccess,
    triggerError,
    triggerWarning,
    isAnimating,
  }
}
