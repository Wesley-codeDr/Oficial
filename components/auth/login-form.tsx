'use client'

import { useActionState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Loader2, ArrowRight, AlertCircle } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { GlassInput } from '@/components/ui/glass-input'
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
          className="flex items-start gap-3 rounded-2xl bg-red-500/10 backdrop-blur-sm border border-red-500/30 p-4 shadow-lg shadow-red-500/5"
        >
          <div className="flex-shrink-0 mt-0.5">
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">Erro ao entrar</p>
            <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-0.5">{state.error}</p>
          </div>
        </motion.div>
      )}

      {/* Email Field */}
      <motion.div variants={itemVariants} className="space-y-2.5">
        <Label htmlFor="email" className="text-sm font-semibold text-slate-900 dark:text-slate-100/90 tracking-tight">
          Email
        </Label>
        <GlassInput
          id="email"
          name="email"
          type="email"
          placeholder="medico@hospital.com"
          leftIcon={<Mail className="h-[18px] w-[18px]" />}
          required
          autoComplete="email"
          glassIntensity="medium"
        />
      </motion.div>

      {/* Password Field */}
      <motion.div variants={itemVariants} className="space-y-2.5">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="password"
            className="text-sm font-semibold text-slate-900 dark:text-slate-100/90 tracking-tight"
          >
            Senha
          </Label>
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors duration-200"
          >
            Esqueceu a senha?
          </Link>
        </div>
        <GlassInput
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="h-[18px] w-[18px]" />}
          required
          autoComplete="current-password"
          glassIntensity="medium"
        />
      </motion.div>

      {/* Submit Button with Enhanced Gradient and Lift Effect */}
      <motion.div variants={itemVariants} className="pt-3">
        <Button 
          type="submit" 
          size="lg" 
          className={`
            w-full h-[52px] rounded-2xl
            font-semibold text-[15px] tracking-tight
            bg-gradient-to-r from-blue-500 to-blue-600
            text-white
            shadow-lg shadow-blue-500/30
            hover:shadow-xl hover:shadow-blue-500/40
            hover:-translate-y-0.5
            hover:from-blue-600 hover:to-blue-700
            active:translate-y-0 active:shadow-md
            transition-all duration-300 ease-out
            disabled:opacity-60 disabled:cursor-not-allowed
            disabled:hover:translate-y-0 disabled:hover:shadow-lg
            group
          `}
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
      <motion.p variants={itemVariants} className="text-center text-sm text-slate-500 dark:text-slate-400 pt-2">
        Ainda não tem conta?{' '}
        <Link
          href="/register"
          className="font-semibold text-blue-500 hover:text-blue-600 transition-colors duration-200 underline-offset-4 hover:underline"
        >
          Criar conta
        </Link>
      </motion.p>
    </motion.form>
  )
}
