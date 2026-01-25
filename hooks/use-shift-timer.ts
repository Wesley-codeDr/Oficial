'use client'

import { useState, useEffect, useCallback } from 'react'
import { useShiftInfo } from '@/stores/shift-todo-store'

interface ShiftTimerResult {
  elapsed: string // Formatted string like "2h 45m"
  elapsedMinutes: number
  elapsedHours: number
  isActive: boolean
}

export function useShiftTimer(): ShiftTimerResult {
  const shiftInfo = useShiftInfo()
  const [elapsedMinutes, setElapsedMinutes] = useState(0)

  const calculateElapsed = useCallback(() => {
    if (!shiftInfo?.startTime) return 0
    const start = new Date(shiftInfo.startTime).getTime()
    const now = Date.now()
    return Math.floor((now - start) / (1000 * 60))
  }, [shiftInfo?.startTime])

  useEffect(() => {
    if (!shiftInfo?.startTime) {
      setElapsedMinutes(0)
      return
    }

    // Initial calculation
    setElapsedMinutes(calculateElapsed())

    // Update every minute
    const interval = setInterval(() => {
      setElapsedMinutes(calculateElapsed())
    }, 60000)

    return () => clearInterval(interval)
  }, [shiftInfo?.startTime, calculateElapsed])

  const hours = Math.floor(elapsedMinutes / 60)
  const minutes = elapsedMinutes % 60

  const formatElapsed = (): string => {
    if (!shiftInfo?.startTime) return '0h 0m'
    if (hours === 0) return `${minutes}m`
    return `${hours}h ${minutes}m`
  }

  return {
    elapsed: formatElapsed(),
    elapsedMinutes,
    elapsedHours: hours,
    isActive: !!shiftInfo?.startTime,
  }
}
