/**
 * Logging Utility for WellWave
 *
 * Provides structured logging with Sentry integration for error tracking.
 *
 * Usage:
 * ```typescript
 * import { logger } from '@/lib/logging'
 *
 * try {
 *   await someOperation()
 * } catch (error) {
 *   logger.error('Erro ao realizar operação', error, { context: 'operation' })
 * }
 * ```
 */

import * as Sentry from '@sentry/nextjs'

/**
 * Log levels
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}

/**
 * Log entry structure
 */
interface LogEntry {
  level: LogLevel
  message: string
  error?: unknown
  context?: Record<string, unknown>
  timestamp: Date
}

/**
 * Logger class with structured logging
 */
class Logger {
  private context: string

  constructor(context: string = 'App') {
    this.context = context
  }

  /**
   * Create log entry
   */
  private createLogEntry(
    level: LogLevel,
    message: string,
    error?: unknown,
    context?: Record<string, unknown>
  ): LogEntry {
    return {
      level,
      message,
      error,
      context,
      timestamp: new Date(),
    }
  }

  /**
   * Format log entry for console
   */
  private formatLogEntry(entry: LogEntry): string {
    const timestamp = entry.timestamp.toISOString()
    const contextStr = entry.context ? `[${this.context}]` : ''
    const contextDataStr = entry.context
      ? ` ${JSON.stringify(entry.context)}`
      : ''
    return `[${timestamp}] [${entry.level.toUpperCase()}] ${contextStr} ${entry.message}${contextDataStr}`
  }

  /**
   * Log debug message
   */
  debug(message: string, context?: Record<string, unknown>): void {
    const entry = this.createLogEntry(LogLevel.DEBUG, message, undefined, context)
    console.debug(this.formatLogEntry(entry))
  }

  /**
   * Log info message
   */
  info(message: string, context?: Record<string, unknown>): void {
    const entry = this.createLogEntry(LogLevel.INFO, message, undefined, context)
    console.info(this.formatLogEntry(entry))
  }

  /**
   * Log warning message
   */
  warn(message: string, context?: Record<string, unknown>): void {
    const entry = this.createLogEntry(LogLevel.WARN, message, undefined, context)
    console.warn(this.formatLogEntry(entry))
  }

  /**
   * Log error message with error object
   */
  error(message: string, error?: unknown, context?: Record<string, unknown>): void {
    const entry = this.createLogEntry(LogLevel.ERROR, message, error, context)
    console.error(this.formatLogEntry(entry), error)

    // Capture error in Sentry
    if (error instanceof Error) {
      Sentry.captureException(error, {
        level: 'error',
        tags: {
          context: this.context,
          ...context,
        },
      })
    } else {
      Sentry.captureMessage(message, {
        level: 'error',
        extra: {
          error,
          context,
        },
        tags: {
          context: this.context,
        },
      })
    }
  }

  /**
   * Log fatal error message
   */
  fatal(message: string, error?: unknown, context?: Record<string, unknown>): void {
    const entry = this.createLogEntry(LogLevel.FATAL, message, error, context)
    console.error(this.formatLogEntry(entry), error)

    // Capture fatal error in Sentry
    if (error instanceof Error) {
      Sentry.captureException(error, {
        level: 'fatal',
        tags: {
          context: this.context,
          ...context,
        },
      })
    } else {
      Sentry.captureMessage(message, {
        level: 'fatal',
        extra: {
          error,
          context,
        },
        tags: {
          context: this.context,
        },
      })
    }
  }
}

/**
 * Create logger instance with context
 */
export function createLogger(context: string): Logger {
  return new Logger(context)
}

/**
 * Default logger instance
 */
export const logger = new Logger('App')

/**
 * Specific loggers for different parts of the app
 */
export const authLogger = new Logger('Auth')
export const apiLogger = new Logger('API')
export const anamneseLogger = new Logger('Anamnese')
export const chatLogger = new Logger('Chat')
export const pdfLogger = new Logger('PDF')
export const storageLogger = new Logger('Storage')
export const uiLogger = new Logger('UI')

/**
 * Helper function to log errors with user-friendly message
 */
export function logError(
  message: string,
  error: unknown,
  context?: Record<string, unknown>
): void {
  logger.error(message, error, context)
}

/**
 * Helper function to log errors and return user-friendly message
 */
export function logAndReturnError(
  message: string,
  error: unknown,
  userMessage: string,
  context?: Record<string, unknown>
): string {
  logger.error(message, error, context)
  return userMessage
}

/**
 * Helper function to log errors and return error object
 */
export function logAndReturnErrorObject(
  message: string,
  error: unknown,
  context?: Record<string, unknown>
): Error {
  logger.error(message, error, context)
  
  if (error instanceof Error) {
    return error
  }
  
  return new Error(message)
}
