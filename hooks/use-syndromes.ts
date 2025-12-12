'use client'

import { useState, useEffect, useCallback } from 'react'

export interface Syndrome {
  id: string
  name: string
  code: string
  description: string | null
  icon: string | null
  orderIndex: number
  isActive: boolean
  _count: {
    checkboxes: number
  }
}

export function useSyndromes() {
  const [syndromes, setSyndromes] = useState<Syndrome[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSyndromes = useCallback(async () => {
    try {
      const response = await fetch('/api/syndromes')

      if (!response.ok) {
        throw new Error('Failed to fetch syndromes')
      }

      const data = await response.json()
      setSyndromes(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSyndromes()
  }, [fetchSyndromes])

  const refetch = useCallback(() => {
    setIsLoading(true)
    return fetchSyndromes()
  }, [fetchSyndromes])

  return {
    syndromes,
    isLoading,
    error,
    refetch,
  }
}
