'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { useDirection } from '@/lib/contexts/direction-context'

/**
 * Apple HIG Right-to-Left Container Components
 * @see https://developer.apple.com/design/human-interface-guidelines/right-to-left
 * 
 * Utility containers that automatically adapt to RTL/LTR direction.
 */

interface RTLContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /** Force a specific direction */
  forceDirection?: 'ltr' | 'rtl'
  /** Whether to reverse flex direction in RTL */
  reverseInRTL?: boolean
  /** Base flex direction */
  direction?: 'row' | 'column'
}

/**
 * RTL-aware Container
 * 
 * A container that automatically handles direction-based layouts.
 * 
 * @example
 * ```tsx
 * <RTLContainer reverseInRTL>
 *   <Icon />
 *   <Text />
 * </RTLContainer>
 * ```
 */
export function RTLContainer({
  children,
  forceDirection,
  reverseInRTL = false,
  direction = 'row',
  className,
  ...props
}: RTLContainerProps) {
  const { isRTL, direction: currentDirection } = useDirection()
  
  const effectiveDirection = forceDirection || currentDirection
  const shouldReverse = reverseInRTL && isRTL && direction === 'row'

  return (
    <div
      dir={forceDirection}
      className={cn(
        'flex',
        direction === 'row' ? (shouldReverse ? 'flex-row-reverse' : 'flex-row') : 'flex-col',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Text Container with Language-aware Alignment
 * 
 * Apple HIG: "Align a paragraph based on its language, not on the current context."
 */
interface LanguageTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /** Language of the text content */
  lang?: string
  /** Whether this is a paragraph (3+ lines) */
  isParagraph?: boolean
}

export function LanguageText({
  children,
  lang,
  isParagraph = false,
  className,
  ...props
}: LanguageTextProps) {
  const { isRTL: contextIsRTL } = useDirection()
  
  // Determine if text language is RTL
  const isRTLLanguage = lang
    ? ['ar', 'he', 'fa', 'ur', 'yi', 'ps', 'sd', 'ckb', 'ug'].includes(lang.split('-')[0] ?? '')
    : contextIsRTL

  // Apple HIG: Paragraphs align based on their language, not context
  // Short text (1-2 lines) aligns with context direction
  const textAlign = isParagraph ? (isRTLLanguage ? 'text-right' : 'text-left') : undefined

  return (
    <div
      lang={lang}
      dir={lang ? (isRTLLanguage ? 'rtl' : 'ltr') : undefined}
      className={cn(textAlign, className)}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * List Container with Consistent Alignment
 * 
 * Apple HIG: "Use a consistent alignment for all text items in a list."
 */
interface RTLListProps extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  children: React.ReactNode
  /** List type */
  as?: 'ul' | 'ol'
  /** Custom marker */
  marker?: React.ReactNode
}

export function RTLList({
  children,
  as: Component = 'ul',
  marker,
  className,
  ...props
}: RTLListProps) {
  const { isRTL } = useDirection()

  return (
    <Component
      className={cn(
        'list-rtl-aware',
        isRTL ? 'ps-6' : 'ps-6',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

/**
 * Image Container with Position Handling
 * 
 * Apple HIG: "Reverse the positions of images when their order is meaningful."
 */
interface RTLImageGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /** Whether image order is meaningful and should reverse in RTL */
  orderMeaningful?: boolean
}

export function RTLImageGrid({
  children,
  orderMeaningful = false,
  className,
  ...props
}: RTLImageGridProps) {
  const { isRTL } = useDirection()

  return (
    <div
      className={cn(
        'flex flex-wrap gap-4',
        orderMeaningful && isRTL && 'flex-row-reverse',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Sidebar-aware Content Container
 * 
 * Adjusts content positioning based on sidebar location (left in LTR, right in RTL).
 */
interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /** Sidebar width */
  sidebarWidth?: number
  /** Whether sidebar is visible */
  sidebarVisible?: boolean
}

export function SidebarContent({
  children,
  sidebarWidth = 256,
  sidebarVisible = true,
  className,
  ...props
}: SidebarContentProps) {
  const { isRTL } = useDirection()

  return (
    <div
      className={cn(
        'transition-all duration-300',
        className
      )}
      style={{
        [isRTL ? 'marginRight' : 'marginLeft']: sidebarVisible ? `${sidebarWidth}px` : 0,
        [isRTL ? 'marginLeft' : 'marginRight']: 0,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Breadcrumb with RTL-aware Separators
 * 
 * Apple HIG: Separators should flip in RTL.
 */
interface RTLBreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  /** Custom separator */
  separator?: React.ReactNode
}

export function RTLBreadcrumb({
  children,
  separator = '/',
  className,
  ...props
}: RTLBreadcrumbProps) {
  const { isRTL } = useDirection()
  const items = React.Children.toArray(children)

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center text-sm', className)}
      {...props}
    >
      <ol className={cn('flex items-center gap-2', isRTL && 'flex-row-reverse')}>
        {items.map((child, index) => (
          <li key={index} className="flex items-center gap-2">
            {child}
            {index < items.length - 1 && (
              <span 
                className={cn(
                  'text-muted-foreground',
                  isRTL && 'breadcrumb-separator'
                )}
                aria-hidden
              >
                {separator}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}




