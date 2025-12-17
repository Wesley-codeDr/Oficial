'use client'

import { QueryProvider } from './query-provider'
import { ThemeProvider as NextThemeProvider } from './theme-provider'
import { ThemeProvider as MedicalThemeProvider } from '@/contexts/ThemeContext'
import { DashboardPreferencesProvider } from '@/contexts/DashboardPreferencesContext'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextThemeProvider>
      <MedicalThemeProvider>
        <DashboardPreferencesProvider>
          <QueryProvider>{children}</QueryProvider>
        </DashboardPreferencesProvider>
      </MedicalThemeProvider>
    </NextThemeProvider>
  )
}

export { QueryProvider } from './query-provider'
export { ThemeProvider } from './theme-provider'
