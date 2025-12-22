/* eslint-disable no-undef */
import * as Sentry from '@sentry/nextjs'

// Client-side only utilities for localStorage
const getLocalStorage = (): typeof window.localStorage | null => {
  if (typeof window === 'undefined') return null
  return window.localStorage
}

// Event types for analytics tracking
export type AnalyticsEvent =
  | { name: 'anamnese_started'; properties: { syndromeCode: string; syndromeName: string } }
  | {
      name: 'anamnese_completed'
      properties: {
        syndromeCode: string
        checkboxCount: number
        hasRedFlags: boolean
        outputMode: string
      }
    }
  | { name: 'anamnese_copied'; properties: { syndromeCode: string; sessionId: string } }
  | { name: 'chat_started'; properties: { hasAnamneseContext: boolean; sessionId?: string } }
  | { name: 'chat_message_sent'; properties: { conversationId: string; messageLength: number } }
  | {
      name: 'chat_response_received'
      properties: { conversationId: string; hasCitations: boolean; responseLength: number }
    }
  | {
      name: 'red_flag_detected'
      properties: { syndromeCode: string; flagName: string; severity: 'WARNING' | 'CRITICAL' }
    }
  | { name: 'session_saved'; properties: { syndromeCode: string; sessionId: string } }
  | { name: 'user_login'; properties: { method: 'email' | 'oauth' } }
  | { name: 'user_register'; properties: { specialty?: string } }
  | { name: 'error_boundary_triggered'; properties: { errorDigest?: string; page: string } }
  | { name: 'complaint_search'; properties: { searchTerm: string; resultCount: number } }
  | { name: 'complaint_selection'; properties: { complaintId: string; searchTerm: string } }
  | { name: 'complaint_view'; properties: { complaintId: string } }

// Track analytics event via Sentry breadcrumbs and custom metrics
export function trackEvent(event: AnalyticsEvent): void {
  // Add breadcrumb for debugging
  Sentry.addBreadcrumb({
    category: 'analytics',
    message: event.name,
    data: event.properties,
    level: 'info',
  })

  // Set custom tag for filtering
  Sentry.setTag('last_event', event.name)

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.warn('[Analytics]', event.name, event.properties)
  }

  // Track specific metrics
  switch (event.name) {
    case 'anamnese_completed':
      Sentry.setMeasurement('anamnese_checkbox_count', event.properties.checkboxCount, 'none')
      break
    case 'chat_message_sent':
      Sentry.setMeasurement('chat_message_length', event.properties.messageLength, 'none')
      break
    case 'chat_response_received':
      Sentry.setMeasurement('chat_response_length', event.properties.responseLength, 'none')
      break
    case 'red_flag_detected':
      // Capture red flags as events for monitoring
      Sentry.captureMessage(`Red Flag: ${event.properties.flagName}`, {
        level: event.properties.severity === 'CRITICAL' ? 'warning' : 'info',
        tags: {
          syndrome: event.properties.syndromeCode,
          severity: event.properties.severity,
        },
      })
      break
  }
}

// Helper functions for common events
export const analytics = {
  anamneseStarted: (syndromeCode: string, syndromeName: string) =>
    trackEvent({ name: 'anamnese_started', properties: { syndromeCode, syndromeName } }),

  anamneseCompleted: (
    syndromeCode: string,
    checkboxCount: number,
    hasRedFlags: boolean,
    outputMode: string
  ) =>
    trackEvent({
      name: 'anamnese_completed',
      properties: { syndromeCode, checkboxCount, hasRedFlags, outputMode },
    }),

  anamnaseCopied: (syndromeCode: string, sessionId: string) =>
    trackEvent({ name: 'anamnese_copied', properties: { syndromeCode, sessionId } }),

  chatStarted: (hasAnamneseContext: boolean, sessionId?: string) =>
    trackEvent({ name: 'chat_started', properties: { hasAnamneseContext, sessionId } }),

  chatMessageSent: (conversationId: string, messageLength: number) =>
    trackEvent({ name: 'chat_message_sent', properties: { conversationId, messageLength } }),

  chatResponseReceived: (conversationId: string, hasCitations: boolean, responseLength: number) =>
    trackEvent({
      name: 'chat_response_received',
      properties: { conversationId, hasCitations, responseLength },
    }),

  redFlagDetected: (syndromeCode: string, flagName: string, severity: 'WARNING' | 'CRITICAL') =>
    trackEvent({ name: 'red_flag_detected', properties: { syndromeCode, flagName, severity } }),

  sessionSaved: (syndromeCode: string, sessionId: string) =>
    trackEvent({ name: 'session_saved', properties: { syndromeCode, sessionId } }),

  userLogin: (method: 'email' | 'oauth') =>
    trackEvent({ name: 'user_login', properties: { method } }),

  userRegister: (specialty?: string) =>
    trackEvent({ name: 'user_register', properties: { specialty } }),

  errorBoundaryTriggered: (errorDigest: string | undefined, page: string) =>
    trackEvent({ name: 'error_boundary_triggered', properties: { errorDigest, page } }),

  complaintSearch: (searchTerm: string, resultCount: number) =>
    trackEvent({ name: 'complaint_search', properties: { searchTerm, resultCount } }),

  complaintSelection: (complaintId: string, searchTerm: string) =>
    trackEvent({ name: 'complaint_selection', properties: { complaintId, searchTerm } }),

  complaintView: (complaintId: string) =>
    trackEvent({ name: 'complaint_view', properties: { complaintId } }),
}

// Search History Management for localStorage
export interface SearchHistoryEntry {
  term: string
  timestamp: number
  resultCount: number
  selectedComplaintId?: string
}

const SEARCH_HISTORY_KEY = 'complaint_search_history'
const MAX_HISTORY_ENTRIES = 20

/**
 * Add a search to local history
 */
export function addToSearchHistory(
  term: string,
  resultCount: number,
  selectedComplaintId?: string
): void {
  const storage = getLocalStorage()
  if (!storage) return

  try {
    const history = getSearchHistory()
    const entry: SearchHistoryEntry = {
      term,
      timestamp: Date.now(),
      resultCount,
      selectedComplaintId,
    }

    // Remove duplicate terms (keep the latest)
    const filtered = history.filter((h) => h.term !== term)

    // Add new entry at the beginning
    filtered.unshift(entry)

    // Keep only the most recent entries
    const trimmed = filtered.slice(0, MAX_HISTORY_ENTRIES)

    storage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(trimmed))
  } catch (error) {
    console.warn('Failed to add search history:', error)
  }
}

/**
 * Get search history from localStorage
 */
export function getSearchHistory(): SearchHistoryEntry[] {
  const storage = getLocalStorage()
  if (!storage) return []

  try {
    const stored = storage.getItem(SEARCH_HISTORY_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.warn('Failed to get search history:', error)
    return []
  }
}

/**
 * Clear search history
 */
export function clearSearchHistory(): void {
  const storage = getLocalStorage()
  if (!storage) return

  try {
    storage.removeItem(SEARCH_HISTORY_KEY)
  } catch (error) {
    console.warn('Failed to clear search history:', error)
  }
}

/**
 * Get most popular search terms
 */
export function getPopularSearchTerms(limit: number = 10): string[] {
  const history = getSearchHistory()
  const termCounts = new Map<string, number>()

  for (const entry of history) {
    termCounts.set(entry.term, (termCounts.get(entry.term) || 0) + 1)
  }

  return Array.from(termCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([term]) => term)
}
