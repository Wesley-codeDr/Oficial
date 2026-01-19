'use client'

/**
 * useAutoSave Hook
 *
 * Provides auto-save functionality with:
 * - Debounced saves to avoid excessive API calls
 * - Network status detection
 * - Last saved timestamp tracking
 * - Recovery queue for failed saves
 * - Visual feedback state management
 */

import { useState, useEffect, useCallback, useRef } from 'react'

// ============================================================================
// Types
// ============================================================================

export type AutoSaveStatus =
  | 'idle' // No changes to save
  | 'pending' // Changes detected, waiting for debounce
  | 'saving' // Currently saving to server
  | 'saved' // Successfully saved
  | 'error' // Save failed
  | 'offline' // Network unavailable
  | 'recovering' // Attempting to recover from failure

export interface AutoSaveState {
  /** Current auto-save status */
  status: AutoSaveStatus
  /** Last successful save timestamp */
  lastSavedAt: Date | null
  /** Error message if save failed */
  error: string | null
  /** Number of pending changes in recovery queue */
  pendingChanges: number
  /** Whether network is available */
  isOnline: boolean
}

export interface UseAutoSaveOptions<T> {
  /** Data to auto-save */
  data: T
  /** Save function that persists data */
  onSave: (data: T) => Promise<void>
  /** Debounce delay in milliseconds (default: 2000) */
  debounceMs?: number
  /** Whether auto-save is enabled (default: true) */
  enabled?: boolean
  /** Minimum data validation before save */
  isValid?: (data: T) => boolean
  /** Callback when save succeeds */
  onSaveSuccess?: () => void
  /** Callback when save fails */
  onSaveError?: (error: Error) => void
  /** Callback when network status changes */
  onNetworkChange?: (isOnline: boolean) => void
}

export interface UseAutoSaveReturn extends AutoSaveState {
  /** Force an immediate save */
  saveNow: () => Promise<void>
  /** Reset error state */
  clearError: () => void
  /** Retry failed saves */
  retryFailedSaves: () => Promise<void>
  /** Check if there are unsaved changes */
  hasUnsavedChanges: boolean
}

// ============================================================================
// Configuration
// ============================================================================

const DEFAULT_DEBOUNCE_MS = 2000
const RECOVERY_RETRY_DELAY = 5000
const MAX_RECOVERY_ATTEMPTS = 3

// ============================================================================
// Hook Implementation
// ============================================================================

export function useAutoSave<T>({
  data,
  onSave,
  debounceMs = DEFAULT_DEBOUNCE_MS,
  enabled = true,
  isValid = () => true,
  onSaveSuccess,
  onSaveError,
  onNetworkChange,
}: UseAutoSaveOptions<T>): UseAutoSaveReturn {
  // State
  const [status, setStatus] = useState<AutoSaveStatus>('idle')
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isOnline, setIsOnline] = useState(true)
  const [pendingChanges, setPendingChanges] = useState(0)

  // Refs for memoization
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastSavedDataRef = useRef<string | null>(null)
  const recoveryQueueRef = useRef<T[]>([])
  const recoveryAttemptsRef = useRef(0)
  const isMountedRef = useRef(true)

  // Track if data has changed since last save
  const currentDataStr = JSON.stringify(data)
  const hasUnsavedChanges =
    lastSavedDataRef.current !== null && lastSavedDataRef.current !== currentDataStr

  // Network status detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      onNetworkChange?.(true)
      // Try to recover failed saves when back online
      if (recoveryQueueRef.current.length > 0) {
        setStatus('recovering')
      }
    }

    const handleOffline = () => {
      setIsOnline(false)
      setStatus('offline')
      onNetworkChange?.(false)
    }

    // Check initial state
    setIsOnline(navigator.onLine)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [onNetworkChange])

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  // Core save function
  const performSave = useCallback(
    async (dataToSave: T) => {
      if (!isMountedRef.current) return

      // Check network
      if (!navigator.onLine) {
        setStatus('offline')
        recoveryQueueRef.current.push(dataToSave)
        setPendingChanges(recoveryQueueRef.current.length)
        return
      }

      // Validate data
      if (!isValid(dataToSave)) {
        return
      }

      setStatus('saving')
      setError(null)

      try {
        await onSave(dataToSave)

        if (!isMountedRef.current) return

        const now = new Date()
        setLastSavedAt(now)
        setStatus('saved')
        lastSavedDataRef.current = JSON.stringify(dataToSave)
        recoveryAttemptsRef.current = 0
        onSaveSuccess?.()

        // Reset to idle after showing saved status
        setTimeout(() => {
          if (isMountedRef.current) {
            setStatus('idle')
          }
        }, 2000)
      } catch (err) {
        if (!isMountedRef.current) return

        const errorMessage =
          err instanceof Error ? err.message : 'Falha ao salvar. Tentando novamente...'
        setError(errorMessage)
        setStatus('error')
        onSaveError?.(err instanceof Error ? err : new Error(errorMessage))

        // Add to recovery queue
        recoveryQueueRef.current.push(dataToSave)
        setPendingChanges(recoveryQueueRef.current.length)
      }
    },
    [onSave, isValid, onSaveSuccess, onSaveError]
  )

  // Debounced auto-save effect
  useEffect(() => {
    if (!enabled) return
    if (!hasUnsavedChanges && status !== 'idle') return

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Skip if data hasn't changed from last save
    if (currentDataStr === lastSavedDataRef.current) {
      return
    }

    // Set pending status
    setStatus('pending')

    // Set new debounce timer
    debounceTimerRef.current = setTimeout(() => {
      performSave(data)
    }, debounceMs)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [currentDataStr, enabled, debounceMs, performSave, data, hasUnsavedChanges, status])

  // Recovery mechanism
  useEffect(() => {
    if (status !== 'recovering' || !isOnline) return
    if (recoveryQueueRef.current.length === 0) {
      setStatus('idle')
      setPendingChanges(0)
      return
    }

    const attemptRecovery = async () => {
      if (recoveryAttemptsRef.current >= MAX_RECOVERY_ATTEMPTS) {
        setStatus('error')
        setError('Múltiplas tentativas falharam. Por favor, salve manualmente.')
        return
      }

      recoveryAttemptsRef.current++

      const latestData = recoveryQueueRef.current[recoveryQueueRef.current.length - 1]

      try {
        await onSave(latestData)
        recoveryQueueRef.current = []
        setPendingChanges(0)
        setLastSavedAt(new Date())
        lastSavedDataRef.current = JSON.stringify(latestData)
        setStatus('saved')
        recoveryAttemptsRef.current = 0

        setTimeout(() => {
          if (isMountedRef.current) {
            setStatus('idle')
          }
        }, 2000)
      } catch {
        // Wait and retry
        setTimeout(attemptRecovery, RECOVERY_RETRY_DELAY)
      }
    }

    attemptRecovery()
  }, [status, isOnline, onSave])

  // Public methods
  const saveNow = useCallback(async () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    await performSave(data)
  }, [data, performSave])

  const clearError = useCallback(() => {
    setError(null)
    setStatus('idle')
  }, [])

  const retryFailedSaves = useCallback(async () => {
    if (recoveryQueueRef.current.length === 0) return

    recoveryAttemptsRef.current = 0
    setStatus('recovering')
  }, [])

  return {
    status,
    lastSavedAt,
    error,
    pendingChanges,
    isOnline,
    saveNow,
    clearError,
    retryFailedSaves,
    hasUnsavedChanges,
  }
}

// ============================================================================
// Utility Hook: useNetworkStatus
// ============================================================================

export interface NetworkStatus {
  isOnline: boolean
  wasOffline: boolean
  lastOnlineAt: Date | null
}

export function useNetworkStatus(): NetworkStatus {
  const [isOnline, setIsOnline] = useState(true)
  const [wasOffline, setWasOffline] = useState(false)
  const [lastOnlineAt, setLastOnlineAt] = useState<Date | null>(null)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setLastOnlineAt(new Date())
    }

    const handleOffline = () => {
      setIsOnline(false)
      setWasOffline(true)
    }

    setIsOnline(navigator.onLine)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return { isOnline, wasOffline, lastOnlineAt }
}
