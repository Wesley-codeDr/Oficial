'use client'

import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Apple HIG Right-to-Left Number Guidelines
 * @see https://developer.apple.com/design/human-interface-guidelines/right-to-left
 * 
 * "Don't reverse the order of numerals in a specific number.
 * Regardless of the current language or the surrounding content,
 * the digits in a specific number — such as '541,' a phone number,
 * or a credit card number — always appear in the same order."
 */

interface RTLNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The number value to display */
  value: number | string
  /** Format type */
  format?: 'default' | 'phone' | 'currency' | 'percent' | 'ordinal' | 'id'
  /** Locale for formatting (optional) */
  locale?: string
  /** Currency code for currency format */
  currency?: string
  /** Number of decimal places */
  decimals?: number
  /** Whether to use grouping separators (1,000) */
  useGrouping?: boolean
}

/**
 * RTL-aware Number Display
 * 
 * Ensures numbers are displayed correctly in RTL contexts.
 * Following Apple HIG, specific numbers like phone numbers and IDs
 * never reverse their digit order.
 * 
 * @example
 * ```tsx
 * // Phone number - never reverses
 * <RTLNumber value="123-456-7890" format="phone" />
 * 
 * // Currency - adapts to locale
 * <RTLNumber value={1234.56} format="currency" currency="USD" />
 * 
 * // Order/ID number - never reverses
 * <RTLNumber value={123456} format="id" />
 * ```
 */
export function RTLNumber({
  value,
  format = 'default',
  locale,
  currency = 'BRL',
  decimals,
  useGrouping = true,
  className,
  ...props
}: RTLNumberProps) {
  const formattedValue = React.useMemo(() => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    
    if (isNaN(numValue)) {
      // Return original string if not a valid number (like phone numbers)
      return String(value)
    }

    switch (format) {
      case 'phone':
        // Phone numbers always displayed as-is
        return String(value)
      
      case 'currency':
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency,
          minimumFractionDigits: decimals ?? 2,
          maximumFractionDigits: decimals ?? 2,
        }).format(numValue)
      
      case 'percent':
        return new Intl.NumberFormat(locale, {
          style: 'percent',
          minimumFractionDigits: decimals ?? 0,
          maximumFractionDigits: decimals ?? 2,
        }).format(numValue / 100)
      
      case 'ordinal':
        // Simple ordinal for Portuguese
        return `${numValue}º`
      
      case 'id':
        // ID numbers never get grouping
        return String(numValue)
      
      default:
        return new Intl.NumberFormat(locale, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
          useGrouping,
        }).format(numValue)
    }
  }, [value, format, locale, currency, decimals, useGrouping])

  return (
    <span
      className={cn(
        // Apple HIG: Numbers preserve their order
        'number-preserve',
        className
      )}
      dir="ltr" // Always LTR for number display
      {...props}
    >
      {formattedValue}
    </span>
  )
}

/**
 * Phone Number Display
 * 
 * Specialized component for phone numbers that never reverse.
 */
interface PhoneNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: string
  /** Whether to format the number */
  format?: boolean
}

export function PhoneNumber({ value, format = false, className, ...props }: PhoneNumberProps) {
  const formatted = React.useMemo(() => {
    if (!format) return value
    
    // Basic phone formatting (can be enhanced)
    const cleaned = value.replace(/\D/g, '')
    
    if (cleaned.length === 11) {
      // Brazilian format: (XX) XXXXX-XXXX
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
    }
    
    if (cleaned.length === 10) {
      // US format: (XXX) XXX-XXXX
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }
    
    return value
  }, [value, format])

  return (
    <span 
      className={cn('number-preserve', className)} 
      dir="ltr"
      {...props}
    >
      {formatted}
    </span>
  )
}

/**
 * Credit Card Number Display
 * 
 * Displays masked credit card numbers correctly in RTL.
 */
interface CreditCardNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: string
  /** Show only last 4 digits */
  masked?: boolean
}

export function CreditCardNumber({ value, masked = true, className, ...props }: CreditCardNumberProps) {
  const display = React.useMemo(() => {
    const cleaned = value.replace(/\D/g, '')
    
    if (masked) {
      const last4 = cleaned.slice(-4)
      return `•••• •••• •••• ${last4}`
    }
    
    // Format with spaces every 4 digits
    return cleaned.replace(/(.{4})/g, '$1 ').trim()
  }, [value, masked])

  return (
    <span 
      className={cn('number-preserve font-mono', className)} 
      dir="ltr"
      {...props}
    >
      {display}
    </span>
  )
}

/**
 * Order/ID Number Display
 * 
 * For order numbers, IDs, reference numbers that should never reverse.
 */
interface OrderNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: string | number
  /** Prefix (e.g., "Order #", "ID:") */
  prefix?: string
}

export function OrderNumber({ value, prefix, className, ...props }: OrderNumberProps) {
  return (
    <span className={cn('inline-flex items-center gap-1', className)} {...props}>
      {prefix && <span>{prefix}</span>}
      <span className="number-preserve" dir="ltr">
        {value}
      </span>
    </span>
  )
}



