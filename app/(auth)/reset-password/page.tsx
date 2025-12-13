'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Lock, Loader2, AlertTriangle } from 'lucide-react'

type PageState = 'validating' | 'valid' | 'invalid' | 'success'

function ResetPasswordContent() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pageState, setPageState] = useState<PageState>('validating')

  useEffect(() => {
    const supabase = createClient()

    // Listen for auth state changes to detect PASSWORD_RECOVERY event
    // This is the recommended way to detect password recovery flow
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        // User arrived via password recovery link - valid state
        setPageState('valid')
      } else if (event === 'SIGNED_IN' && session) {
        // Already signed in, check if this is a recovery session by trying getUser
        // If the user can be retrieved, the session is valid
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (user && !userError) {
          setPageState('valid')
        } else {
          setPageState('invalid')
        }
      } else if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        // These events don't affect our validation
      }
    })

    // Initial check: see if there's already a valid session from the callback
    const checkInitialState = async () => {
      // Give a brief moment for auth state to settle after redirect
      await new Promise((resolve) => setTimeout(resolve, 100))

      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError || !user) {
        // No valid user/session - token is invalid or expired
        setPageState('invalid')
      } else {
        // Valid user exists - the callback already established the recovery session
        setPageState('valid')
      }
    }

    checkInitialState()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      
      // Double-check we still have a valid session before updating
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        setError('Sessão expirada. Solicite um novo link de redefinição.')
        setPageState('invalid')
        setLoading(false)
        return
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      })

      if (updateError) {
        // Handle specific Supabase errors
        if (updateError.message.includes('expired') || updateError.message.includes('invalid')) {
          setError('Link de redefinição expirado. Solicite um novo link.')
          setPageState('invalid')
        } else {
          setError(updateError.message || 'Erro ao atualizar senha')
        }
        setLoading(false)
        return
      }

      setPageState('success')
      
      // Sign out after password reset for security
      await supabase.auth.signOut()
      
      setTimeout(() => {
        router.push('/login?password_reset=success')
      }, 2000)
    } catch (err) {
      setError('Erro inesperado. Tente novamente.')
      setLoading(false)
    }
  }

  // Loading/Validating state
  if (pageState === 'validating') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <div className="w-full max-w-md space-y-6 rounded-2xl border border-border/50 bg-card/50 p-8 shadow-lg backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Validando link de redefinição...</p>
          </div>
        </div>
      </div>
    )
  }

  // Invalid token state
  if (pageState === 'invalid') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <div className="w-full max-w-md space-y-6 rounded-2xl border border-border/50 bg-card/50 p-8 shadow-lg backdrop-blur-sm">
          <div className="text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-amber-500/10">
              <AlertTriangle className="size-8 text-amber-500" />
            </div>
            <h1 className="mb-2 text-2xl font-semibold">Link Inválido</h1>
            <p className="mb-6 text-muted-foreground">
              O link de redefinição de senha é inválido ou expirou. Por favor, solicite um novo link.
            </p>
            <div className="flex flex-col gap-3">
              <Button asChild className="w-full">
                <Link href="/forgot-password">Solicitar novo link</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar para o login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Success state
  if (pageState === 'success') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
        <div className="w-full max-w-md space-y-6 rounded-2xl border border-border/50 bg-card/50 p-8 shadow-lg backdrop-blur-sm">
          <div className="text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-500/10">
              <Lock className="size-8 text-green-500" />
            </div>
            <h1 className="mb-2 text-2xl font-semibold">Senha atualizada!</h1>
            <p className="text-muted-foreground">
              Sua senha foi redefinida com sucesso. Redirecionando para o login...
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Valid state - show form
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-border/50 bg-card/50 p-8 shadow-lg backdrop-blur-sm">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Redefinir Senha</h1>
          <p className="text-sm text-muted-foreground">
            Digite sua nova senha abaixo
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Nova Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Atualizando...
              </>
            ) : (
              'Atualizar Senha'
            )}
          </Button>
        </form>

        {/* Back to Login */}
        <div className="text-center">
          <Button variant="ghost" asChild>
            <Link href="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-border/50 bg-card/50 p-8 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResetPasswordContent />
    </Suspense>
  )
}
