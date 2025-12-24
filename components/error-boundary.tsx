'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import * as Sentry from '@sentry/nextjs'
import { analytics } from '@/lib/analytics'

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const pathname = usePathname()
  const handleGoHome = () => {
    const location = (globalThis as { location?: Location }).location
    location?.assign('/')
  }

  useEffect(() => {
    // Log error to Sentry
    Sentry.captureException(error)
    // Track error in analytics
    analytics.errorBoundaryTriggered(error.digest, pathname)
    // Also log to console in development
    console.error('Error caught by boundary:', error)
  }, [error, pathname])

  return (
    <div className="flex min-h-[400px] items-center justify-center p-4">
      <GlassCard className="max-w-md p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>

        <h2 className="mb-2 text-xl font-semibold">
          Algo deu errado
        </h2>

        <p className="mb-6 text-muted-foreground">
          Ocorreu um erro inesperado. Nossa equipe foi notificada e está
          trabalhando para resolver o problema.
        </p>

        {error.digest && (
          <p className="mb-4 font-mono text-xs text-muted-foreground">
            Ref: {error.digest}
          </p>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button onClick={reset} variant="default">
            <RefreshCw className="mr-2 h-4 w-4" />
            Tentar novamente
          </Button>
          <Button
            onClick={handleGoHome}
            variant="outline"
          >
            Voltar ao início
          </Button>
        </div>
      </GlassCard>
    </div>
  )
}

export function GlobalError({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    Sentry.captureException(error)
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <div className="max-w-md rounded-lg border bg-card p-8 text-center shadow-lg">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>

            <h2 className="mb-2 text-xl font-semibold">
              Erro crítico
            </h2>

            <p className="mb-6 text-gray-600">
              Ocorreu um erro crítico no sistema. Por favor, tente recarregar
              a página ou entre em contato com o suporte.
            </p>

            <button
              onClick={reset}
              className="rounded-lg bg-primary px-4 py-2 font-medium text-white hover:bg-primary/90"
            >
              Recarregar página
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
