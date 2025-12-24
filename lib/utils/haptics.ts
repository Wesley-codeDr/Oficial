import { motion } from '../design/tokens'

export type HapticType = 'selection' | 'success' | 'warning' | 'error'

interface HapticElement {
  classList: {
    add(className: string): void
    remove(className: string): void
  }
}

/**
 * Attempt to provide haptic-like feedback on web.
 * - Uses Vibration API if available (not supported on iOS Safari)
 * - Falls back to microinteraction CSS animation triggers
 */
export function triggerHaptic(type: HapticType) {
  const patternMap: Record<HapticType, number[]> = {
    selection: [5],
    success: [8, 3, 8],
    warning: [12, 4, 12],
    error: [24, 8, 24],
  }
  const pattern = patternMap[type]

  if (typeof globalThis === 'undefined') return

  const runtime = globalThis as {
    navigator?: { vibrate?: (pattern: number[]) => boolean }
    document?: { body?: HapticElement }
    setTimeout?: (handler: () => void, timeout?: number) => number
  }

  const navigatorVibrate = runtime.navigator
  if (typeof navigatorVibrate?.vibrate === 'function') {
    try {
      navigatorVibrate.vibrate(pattern)
      return
    } catch (error) {
      console.warn('Haptic vibrate failed, falling back to CSS animation', error)
    }
  }

  const body = runtime.document?.body
  if (!body) return

  // Fallback: trigger a body-level microinteraction via CSS class
  body.classList.add(`haptic-${type}`)
  runtime.setTimeout?.(() => {
    body.classList.remove(`haptic-${type}`)
  }, (motion.duration.fast ?? 0.15) * 1000)
}
