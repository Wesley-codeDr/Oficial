'use client'

import { useState, useEffect, useCallback } from 'react'

export interface DashboardStats {
  thoracicPainCount: number
  patientsPerHour: number
  pendingReevaluations: number
  todaySessions: number
  totalRedFlags: number
  syndromeBreakdown: Array<{ syndromeId: string; _count: number }>
  timestamp: string
}

interface UseDashboardStatsOptions {
  refreshInterval?: number // in milliseconds
  enabled?: boolean
}

export function useDashboardStats(options: UseDashboardStatsOptions = {}) {
  const { refreshInterval = 30000, enabled = true } = options

  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    if (!enabled) return

    try {
      const response = await fetch('/api/dashboard/stats')

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats')
      }

      const data = await response.json()
      setStats(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [enabled])

  useEffect(() => {
    fetchStats()

    if (refreshInterval > 0 && enabled) {
      const interval = setInterval(fetchStats, refreshInterval)
      return () => clearInterval(interval)
    }
    return undefined
  }, [fetchStats, refreshInterval, enabled])

  const refetch = useCallback(() => {
    setIsLoading(true)
    return fetchStats()
  }, [fetchStats])

  return {
    stats,
    isLoading,
    error,
    refetch,
  }
}
