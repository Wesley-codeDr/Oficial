'use client'

import { useState, useEffect, useCallback } from 'react'

export interface Session {
  id: string
  userId: string
  syndromeId: string
  checkedItems: string[]
  generatedText: string | null
  outputMode: 'SUMMARY' | 'DETAILED'
  redFlagsDetected: string[] | null
  wasCopied: boolean
  startedAt: string
  completedAt: string | null
  syndrome: {
    id: string
    name: string
    code: string
    icon: string | null
  }
}

interface SessionsResponse {
  sessions: Session[]
  total: number
  limit: number
  offset: number
  hasMore: boolean
}

interface UseSessionsOptions {
  status?: 'pending' | 'completed' | 'all'
  limit?: number
  autoFetch?: boolean
}

export function useSessions(options: UseSessionsOptions = {}) {
  const { status = 'all', limit = 20, autoFetch = true } = options

  const [data, setData] = useState<SessionsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(autoFetch)
  const [error, setError] = useState<string | null>(null)

  const fetchSessions = useCallback(async (offset = 0) => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams({
        status,
        limit: String(limit),
        offset: String(offset),
      })

      const response = await fetch(`/api/sessions?${params}`)

      if (!response.ok) {
        throw new Error('Failed to fetch sessions')
      }

      const result = await response.json()
      setData(result)
      setError(null)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [status, limit])

  useEffect(() => {
    if (autoFetch) {
      fetchSessions()
    }
  }, [fetchSessions, autoFetch])

  const loadMore = useCallback(async () => {
    if (!data || !data.hasMore) return null
    return fetchSessions(data.offset + data.limit)
  }, [data, fetchSessions])

  const createSession = useCallback(async (syndromeId: string) => {
    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ syndromeId }),
      })

      if (!response.ok) {
        throw new Error('Failed to create session')
      }

      const session = await response.json()

      // Refetch to update list
      await fetchSessions()

      return session
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return null
    }
  }, [fetchSessions])

  return {
    sessions: data?.sessions ?? [],
    total: data?.total ?? 0,
    hasMore: data?.hasMore ?? false,
    isLoading,
    error,
    refetch: () => fetchSessions(0),
    loadMore,
    createSession,
  }
}
