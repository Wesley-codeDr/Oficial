/**
 * Input Sanitization Utility
 *
 * Sanitizes user input to prevent XSS attacks and other injection vulnerabilities.
 *
 * Usage:
 * ```typescript
 * import { sanitizeHtml, sanitizeString, sanitizeObject } from '@/lib/sanitize'
 *
 * const cleanHtml = sanitizeHtml(userInput)
 * const cleanString = sanitizeString(userInput)
 * const cleanObject = sanitizeObject(userData)
 * ```
 */

/**
 * Sanitize HTML input by removing potentially dangerous tags and attributes
 * This is a basic implementation. For production, consider using DOMPurify.
 *
 * @param html - HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== 'string') {
    return ''
  }

  // Remove script tags and their content
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

  // Remove dangerous event handlers
  sanitized = sanitized.replace(/on\w+="[^"]*"/gi, '')
  sanitized = sanitized.replace(/on\w+='[^']*'/gi, '')

  // Remove dangerous tags
  const dangerousTags = ['iframe', 'object', 'embed', 'form', 'input', 'button']
  dangerousTags.forEach((tag) => {
    const regex = new RegExp(`<${tag}\b[^<]*(?:(?!<\/${tag}>)<[^<]*)*<\/${tag}>`, 'gi')
    sanitized = sanitized.replace(regex, '')
    sanitized = sanitized.replace(new RegExp(`<${tag}\b[^>]*>`, 'gi'), '')
  })

  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '')

  // Remove data: protocol (except for images)
  sanitized = sanitized.replace(/data:(?!image\/)/gi, '')

  return sanitized
}

/**
 * Sanitize string input by removing potentially dangerous characters
 *
 * @param str - String to sanitize
 * @returns Sanitized string
 */
export function sanitizeString(str: string): string {
  if (!str || typeof str !== 'string') {
    return ''
  }

  // Remove null bytes
  let sanitized = str.replace(/\0/g, '')

  // Remove control characters (except newline, tab, carriage return)
  // eslint-disable-next-line no-control-regex
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')

  // Trim whitespace
  sanitized = sanitized.trim()

  return sanitized
}

/**
 * Sanitize email address
 *
 * @param email - Email address to sanitize
 * @returns Sanitized email address
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return ''
  }

  const sanitized = email.toLowerCase().trim()

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(sanitized)) {
    return ''
  }

  return sanitized
}

/**
 * Sanitize URL
 *
 * @param url - URL to sanitize
 * @returns Sanitized URL
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    return ''
  }

  let sanitized = url.trim()

  // Remove javascript: protocol
  sanitized = sanitized.replace(/^javascript:/i, '')

  // Remove data: protocol (except for images)
  sanitized = sanitized.replace(/^data:(?!image\/)/i, '')

  // Ensure URL starts with http:// or https://
  if (sanitized && !sanitized.match(/^https?:\/\//i)) {
    sanitized = `https://${sanitized}`
  }

  return sanitized
}

/**
 * Sanitize object by recursively sanitizing all string values
 *
 * @param obj - Object to sanitize
 * @returns Sanitized object
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      sanitized[key] = value
    } else if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value)
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) => {
        if (typeof item === 'string') {
          return sanitizeString(item)
        } else if (typeof item === 'object' && item !== null) {
          return sanitizeObject(item as Record<string, unknown>)
        }
        return item
      })
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value as Record<string, unknown>)
    } else {
      sanitized[key] = value
    }
  }

  return sanitized as T
}

/**
 * Sanitize markdown input
 *
 * @param markdown - Markdown string to sanitize
 * @returns Sanitized markdown string
 */
export function sanitizeMarkdown(markdown: string): string {
  if (!markdown || typeof markdown !== 'string') {
    return ''
  }

  let sanitized = markdown

  // Remove HTML tags
  sanitized = sanitized.replace(/<[^>]*>/g, '')

  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '')

  // Remove data: protocol
  sanitized = sanitized.replace(/data:/gi, '')

  return sanitized
}

/**
 * Sanitize user input for chat messages
 *
 * @param message - Chat message to sanitize
 * @returns Sanitized message
 */
export function sanitizeChatMessage(message: string): string {
  if (!message || typeof message !== 'string') {
    return ''
  }

  let sanitized = message

  // Remove HTML tags
  sanitized = sanitized.replace(/<[^>]*>/g, '')

  // Remove potentially dangerous patterns
  sanitized = sanitized.replace(/javascript:/gi, '')
  sanitized = sanitized.replace(/data:/gi, '')

  // Limit length (prevent DoS)
  const maxLength = 10000
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength)
  }

  return sanitized.trim()
}

/**
 * Sanitize search query
 *
 * @param query - Search query to sanitize
 * @returns Sanitized query
 */
export function sanitizeSearchQuery(query: string): string {
  if (!query || typeof query !== 'string') {
    return ''
  }

  let sanitized = query.trim()

  // Remove potentially dangerous characters
  sanitized = sanitized.replace(/[<>{}]/g, '')

  // Limit length
  const maxLength = 500
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength)
  }

  return sanitized
}

/**
 * Validate and sanitize phone number
 *
 * @param phone - Phone number to sanitize
 * @returns Sanitized phone number
 */
export function sanitizePhone(phone: string): string {
  if (!phone || typeof phone !== 'string') {
    return ''
  }

  // Remove all non-digit characters
  const sanitized = phone.replace(/\D/g, '')

  // Validate length (Brazilian phone numbers)
  if (sanitized.length === 10 || sanitized.length === 11) {
    return sanitized
  }

  return ''
}

/**
 * Validate and sanitize CPF (Brazilian tax ID)
 *
 * @param cpf - CPF to sanitize
 * @returns Sanitized CPF or empty string if invalid
 */
export function sanitizeCPF(cpf: string): string {
  if (!cpf || typeof cpf !== 'string') {
    return ''
  }

  // Remove all non-digit characters
  const sanitized = cpf.replace(/\D/g, '')

  // Validate length
  if (sanitized.length !== 11) {
    return ''
  }

  // Validate CPF algorithm
  let sum = 0
  let remainder

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(sanitized.substring(i - 1, i)) * (11 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) {
    remainder = 0
  }

  if (remainder !== parseInt(sanitized.substring(9, 10))) {
    return ''
  }

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(sanitized.substring(i - 1, i)) * (12 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) {
    remainder = 0
  }

  if (remainder !== parseInt(sanitized.substring(10, 11))) {
    return ''
  }

  return sanitized
}

/**
 * Sanitize CRM (Brazilian medical council number)
 *
 * @param crm - CRM to sanitize
 * @returns Sanitized CRM
 */
export function sanitizeCRM(crm: string): string {
  if (!crm || typeof crm !== 'string') {
    return ''
  }

  // Remove all non-digit characters
  const sanitized = crm.replace(/\D/g, '')

  // Validate length (CRM numbers are typically 4-9 digits)
  if (sanitized.length < 4 || sanitized.length > 9) {
    return ''
  }

  return sanitized
}
