'use client'

import { QueryProvider } from './query-provider'
import { ThemeProvider } from './theme-provider'
import { DirectionProvider } from '@/lib/contexts/direction-context'

interface ProvidersProps {
  children: React.ReactNode
  /** Default language for the app (affects RTL detection) */
  defaultLanguage?: string
}

/**
 * Root providers for the application
 * 
 * Includes:
 * - ThemeProvider: Light/Dark mode support
 * - DirectionProvider: RTL/LTR support (Apple HIG compliant)
 * - QueryProvider: React Query for data fetching
 */
export function Providers({ children, defaultLanguage = 'pt-BR' }: ProvidersProps) {
  return (
    <ThemeProvider>
      <DirectionProvider defaultLanguage={defaultLanguage}>
        <QueryProvider>{children}</QueryProvider>
      </DirectionProvider>
    </ThemeProvider>
  )
}

export { QueryProvider } from './query-provider'
export { ThemeProvider } from './theme-provider'
export { DirectionProvider } from '@/lib/contexts/direction-context'
