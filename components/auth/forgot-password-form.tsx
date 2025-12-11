'use client'

import { useActionState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Loader2, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { forgotPassword, type AuthState } from '@/lib/auth/actions'

const initialState: AuthState = {}

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotPassword, initialState)

  if (state.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6 text-center"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Email enviado!</h2>
          <p className="text-muted-foreground">
            Se o email estiver cadastrado, voce recebera um link para redefinir sua senha.
            Verifique sua caixa de entrada e spam.
          </p>
        </div>
        <Button asChild variant="outline" className="w-full">
          <Link href="/login">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o login
          </Link>
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.form
      action={formAction}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Esqueceu sua senha?</h2>
        <p className="text-muted-foreground">
          Digite seu email e enviaremos um link para redefinir sua senha.
        </p>
      </div>

      {state.error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive"
        >
          {state.error}
        </motion.div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="medico@hospital.com"
            className="pl-10"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          'Enviar link de recuperacao'
        )}
      </Button>

      <Button asChild variant="ghost" className="w-full">
        <Link href="/login">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para o login
        </Link>
      </Button>
    </motion.form>
  )
}
