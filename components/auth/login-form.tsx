'use client'

import { useActionState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Loader2, ArrowRight, AlertCircle } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login, type AuthState } from '@/lib/auth/actions'

const initialState: AuthState = {}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 20,
    },
  },
}

// Enhanced input styles with glass effect and glow
const inputStyles = [
  'h-12 pl-12 pr-4',
  'bg-white/40 dark:bg-white/5',
  'border border-white/50 dark:border-white/10',
  'backdrop-blur-md',
  'rounded-xl',
  'text-foreground placeholder:text-muted-foreground/70',
  'transition-all duration-300 ease-out',
  'focus:bg-white/60 dark:focus:bg-white/10',
  'focus:border-primary/40 dark:focus:border-primary/50',
  'focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/30',
  'focus:shadow-[0_0_20px_rgba(0,122,255,0.15)]',
  'dark:focus:shadow-[0_0_20px_rgba(0,122,255,0.25)]',
  'hover:bg-white/50 dark:hover:bg-white/8',
  'hover:border-white/60 dark:hover:border-white/15',
].join(' ')

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState)

  return (
    <motion.form
      action={formAction}
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Enhanced Error State */}
      {state.error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 dark:bg-red-500/15 p-4 backdrop-blur-md shadow-lg shadow-red-500/5"
        >
          <div className="flex-shrink-0 mt-0.5">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">Erro ao entrar</p>
            <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-0.5">{state.error}</p>
          </div>
        </motion.div>
      )}

      {/* Email Field */}
      <motion.div variants={itemVariants} className="space-y-2.5">
        <Label htmlFor="email" className="text-sm font-semibold text-foreground/90 tracking-tight">
          Email
        </Label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <Mail className="h-[18px] w-[18px] text-muted-foreground/60 transition-colors duration-300 group-focus-within:text-primary" />
          </div>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="medico@hospital.com"
            className={inputStyles}
            required
            autoComplete="email"
          />
        </div>
      </motion.div>

      {/* Password Field */}
      <motion.div variants={itemVariants} className="space-y-2.5">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="password"
            className="text-sm font-semibold text-foreground/90 tracking-tight"
          >
            Senha
          </Label>
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Esqueceu a senha?
          </Link>
        </div>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <Lock className="h-[18px] w-[18px] text-muted-foreground/60 transition-colors duration-300 group-focus-within:text-primary" />
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className={inputStyles}
            required
            autoComplete="current-password"
          />
        </div>
      </motion.div>

      {/* Submit Button with Enhanced Gradient and Lift Effect */}
      <motion.div variants={itemVariants} className="pt-3">
        <Button
          type="submit"
          size="lg"
          className="w-full h-[52px] rounded-xl font-semibold text-[15px] tracking-tight bg-gradient-to-r from-primary via-primary to-blue-600 hover:from-primary/95 hover:via-primary/95 hover:to-blue-600/95 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-300 ease-out disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
          disabled={isPending}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Entrando...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>Entrar</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </span>
          )}
        </Button>
      </motion.div>

      {/* Register Link */}
      <motion.p variants={itemVariants} className="text-center text-sm text-muted-foreground pt-2">
        Ainda não tem conta?{' '}
        <Link
          href="/register"
          className="font-semibold text-primary hover:text-primary/80 transition-colors duration-200 underline-offset-4 hover:underline"
        >
          Criar conta
        </Link>
      </motion.p>
    </motion.form>
  )
}
