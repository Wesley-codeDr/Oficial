type LogLevel = 'info' | 'warn' | 'error'

type LogContext = {
  userId?: string
  route?: string
  event?: string
  [key: string]: unknown
}

function formatContext(context: LogContext, error?: unknown) {
  if (!error) return context

  const errorDetails =
    error instanceof Error
      ? { name: error.name, message: error.message, stack: error.stack }
      : { error }

  return { ...context, ...errorDetails }
}

function log(level: LogLevel, message: string, context: LogContext = {}, error?: unknown) {
  const payload = formatContext(context, error)

  switch (level) {
    case 'info':
      console.info(message, payload)
      break
    case 'warn':
      console.warn(message, payload)
      break
    case 'error':
      console.error(message, payload)
      break
  }
}

export const logger = {
  info: (message: string, context: LogContext = {}) => log('info', message, context),
  warn: (message: string, context: LogContext = {}) => log('warn', message, context),
  error: (message: string, context: LogContext = {}, error?: unknown) =>
    log('error', message, context, error),
}

export type { LogContext }
