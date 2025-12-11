'use client'

import { QueryProvider } from './query-provider'
import { ThemeProvider } from './theme-provider'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  )
}

export { QueryProvider } from './query-provider'
export { ThemeProvider } from './theme-provider'
