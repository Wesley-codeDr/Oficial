/**
 * Analytics Module
 * 
 * Centraliza tracking de eventos de analytics para o sistema WellWave.
 * Usa Sentry como backend de analytics por enquanto.
 * Futuramente pode ser migrado para uma solução dedicada.
 */

import * as Sentry from '@sentry/nextjs'

export interface AnalyticsEvent {
  event: string
  properties?: Record<string, unknown>
  userId?: string
}

/**
 * Envia um evento de analytics para Sentry
 */
function trackEvent(event: string, properties?: Record<string, unknown>, userId?: string) {
  Sentry.captureMessage(event, {
    level: 'info',
    extra: {
      ...properties,
      userId,
      timestamp: new Date().toISOString(),
    },
    tags: {
      analytics: 'true',
    },
  })
}

/**
 * Analytics para anamnese
 */
export const anamneseAnalytics = {
  /**
   * Rastreia quando uma anamnese é completada
   */
  completed: (syndromeCode: string, checkboxCount: number, hasRedFlags: boolean, outputMode: string) => {
    trackEvent('anamnese_completed', {
      syndromeCode,
      checkboxCount,
      hasRedFlags,
      outputMode,
    })
  },

  /**
   * Rastreia quando uma anamnese é copiada
   */
  copied: (syndromeCode: string, sessionId: string) => {
    trackEvent('anamnese_copied', {
      syndromeCode,
      sessionId,
    })
  },

  /**
   * Rastreia quando uma sessão é salva
   */
  sessionSaved: (syndromeCode: string, sessionId: string) => {
    trackEvent('anamnese_session_saved', {
      syndromeCode,
      sessionId,
    })
  },
}

/**
 * Analytics para red flags
 */
export const redFlagAnalytics = {
  /**
   * Rastreia quando uma red flag é detectada
   */
  detected: (syndromeCode: string, description: string, severity: 'WARNING' | 'CRITICAL') => {
    Sentry.captureMessage('Red Flag Detected', {
      level: severity === 'CRITICAL' ? 'error' : 'warning',
      extra: {
        syndromeCode,
        description,
        severity,
        timestamp: new Date().toISOString(),
      },
      tags: {
        redFlag: 'true',
        syndrome: syndromeCode,
        severity,
      },
    })
  },
}

/**
 * Analytics para queixas
 */
export const complaintAnalytics = {
  /**
   * Rastreia quando uma queixa é selecionada
   */
  selected: (complaintId: string, group?: string) => {
    trackEvent('complaint_selected', {
      complaintId,
      group,
    })
  },

  /**
   * Rastreia busca de queixas
   */
  searched: (searchTerm: string, resultCount: number) => {
    trackEvent('complaint_searched', {
      searchTerm,
      resultCount,
    })
  },
}

/**
 * Analytics para chat
 */
export const chatAnalytics = {
  /**
   * Rastreia quando uma mensagem é enviada
   */
  messageSent: (conversationId: string) => {
    trackEvent('chat_message_sent', {
      conversationId,
    })
  },

  /**
   * Rastreia quando uma conversa é criada
   */
  conversationCreated: (sessionId?: string) => {
    trackEvent('chat_conversation_created', {
      sessionId,
    })
  },
}

/**
 * Analytics para exportação de PDF
 */
export const exportAnalytics = {
  /**
   * Rastreia quando um PDF é exportado
   */
  pdfExported: (sessionId: string, syndromeCode?: string) => {
    trackEvent('pdf_exported', {
      sessionId,
      syndromeCode,
    })
  },
}

/**
 * Analytics para erros
 */
export const errorAnalytics = {
  /**
   * Rastreia erros de aplicação
   */
  captured: (error: Error, context?: Record<string, unknown>) => {
    Sentry.captureException(error, {
      extra: {
        ...context,
        timestamp: new Date().toISOString(),
      },
    })
  },

  /**
   * Rastreia erros de API
   */
  apiError: (endpoint: string, method: string, statusCode?: number, error?: Error) => {
    Sentry.captureMessage('API Error', {
      level: 'error',
      extra: {
        endpoint,
        method,
        statusCode,
        errorMessage: error?.message,
        timestamp: new Date().toISOString(),
      },
      tags: {
        api: 'true',
        endpoint,
        method,
        statusCode: statusCode?.toString(),
      },
    })
  },
}

/**
 * Analytics para performance
 */
export const performanceAnalytics = {
  /**
   * Rastreia tempo de carregamento de página
   */
  pageLoad: (page: string, loadTime: number) => {
    trackEvent('page_load', {
      page,
      loadTime,
    })
  },

  /**
   * Rastreia tempo de resposta de API
   */
  apiResponseTime: (endpoint: string, method: string, responseTime: number) => {
    trackEvent('api_response_time', {
      endpoint,
      method,
      responseTime,
    })
  },
}

/**
 * Analytics para usuário
 */
export const userAnalytics = {
  /**
   * Rastreia login de usuário
   */
  loggedIn: (userId: string, method: 'email' | 'oauth') => {
    trackEvent('user_logged_in', {
      userId,
      method,
    })
  },

  /**
   * Rastreia logout de usuário
   */
  loggedOut: (userId: string) => {
    trackEvent('user_logged_out', {
      userId,
    })
  },

  /**
   * Rastreia registro de usuário
   */
  registered: (userId: string) => {
    trackEvent('user_registered', {
      userId,
    })
  },
}

/**
 * Exportação padrão de analytics
 */
export const analytics = {
  anamnese: anamneseAnalytics,
  redFlag: redFlagAnalytics,
  complaint: complaintAnalytics,
  chat: chatAnalytics,
  export: exportAnalytics,
  error: errorAnalytics,
  performance: performanceAnalytics,
  user: userAnalytics,
}
