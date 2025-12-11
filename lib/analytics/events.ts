import * as Sentry from '@sentry/nextjs'

// Event types for analytics tracking
export type AnalyticsEvent =
  | { name: 'anamnese_started'; properties: { syndromeCode: string; syndromeName: string } }
  | { name: 'anamnese_completed'; properties: { syndromeCode: string; checkboxCount: number; hasRedFlags: boolean; outputMode: string } }
  | { name: 'anamnese_copied'; properties: { syndromeCode: string; sessionId: string } }
  | { name: 'chat_started'; properties: { hasAnamneseContext: boolean; sessionId?: string } }
  | { name: 'chat_message_sent'; properties: { conversationId: string; messageLength: number } }
  | { name: 'chat_response_received'; properties: { conversationId: string; hasCitations: boolean; responseLength: number } }
  | { name: 'red_flag_detected'; properties: { syndromeCode: string; flagName: string; severity: 'WARNING' | 'CRITICAL' } }
  | { name: 'session_saved'; properties: { syndromeCode: string; sessionId: string } }
  | { name: 'user_login'; properties: { method: 'email' | 'oauth' } }
  | { name: 'user_register'; properties: { specialty?: string } }
  | { name: 'error_boundary_triggered'; properties: { errorDigest?: string; page: string } }

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
    console.log('[Analytics]', event.name, event.properties)
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
}
