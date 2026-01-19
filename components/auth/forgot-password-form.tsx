'use client'

import { useActionState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle, ArrowLeft, AlertCircle } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { GlassInput } from '@/components/ui/glass-input'
import { Label } from '@/components/ui/label'
import { forgotPassword, type AuthState } from '@/lib/auth/actions'

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

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotPassword, initialState)

  if (state.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="space-y-6 text-center"
      >
        {/* Success Icon - Glass Pill iOS 26 */}
        <div className="glass-pill mx-auto flex h-16 w-16 items-center justify-center !rounded-2xl !bg-green-500/10 dark:!bg-green-500/15 !border-green-500/30 shadow-lg shadow-green-500/10">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 icon-glow-subtle" />
        </div>
        <div className="space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-semibold text-slate-900 dark:text-slate-100"
          >
            Email enviado!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-slate-600 dark:text-slate-400"
          >
            Se o email estiver cadastrado, voce recebera um link para redefinir sua senha.
            Verifique sua caixa de entrada e spam.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Back to Login Button - Glass Primary Green iOS 26 */}
          <Button
            asChild
            className={`
              w-full h-[52px] rounded-2xl
              btn-primary-glass
              font-semibold text-[15px] tracking-tight
              !bg-gradient-to-r !from-green-500 !to-green-600
              text-white
              !shadow-[0_8px_24px_-6px_rgba(34,197,94,0.4),0_0_0_1px_rgba(255,255,255,0.1)_inset,0_1px_0_0_rgba(255,255,255,0.2)_inset]
              hover:!shadow-[0_12px_32px_-8px_rgba(34,197,94,0.5),0_0_0_1px_rgba(255,255,255,0.15)_inset,0_1px_0_0_rgba(255,255,255,0.3)_inset]
              hover:-translate-y-0.5
              active:translate-y-0 active:scale-[0.98]
              transition-all duration-300 ease-out
            `}
          >
            <Link href="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o login
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.form
      action={formAction}
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Esqueceu sua senha?</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Digite seu email e enviaremos um link para redefinir sua senha.
        </p>
      </motion.div>

      {/* Enhanced Error State - Glass Pill iOS 26 */}
      {state.error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="glass-pill flex items-start gap-3 !rounded-2xl !bg-red-500/10 dark:!bg-red-500/15 !border-red-500/30 p-4 shadow-lg shadow-red-500/10"
        >
          <div className="flex-shrink-0 mt-0.5">
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 icon-glow-subtle" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">Erro ao enviar</p>
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

      {/* Submit Button - Glass Primary iOS 26 */}
      <motion.div variants={itemVariants} className="pt-3">
        <Button
          type="submit"
          size="lg"
          className={`
            w-full h-[52px] rounded-2xl
            btn-primary-glass
            font-semibold text-[15px] tracking-tight
            text-white
            shadow-lg shadow-blue-500/30
            hover:shadow-xl hover:shadow-blue-500/40
            hover:-translate-y-0.5
            active:translate-y-0 active:scale-[0.98]
            transition-all duration-300 ease-out
            disabled:opacity-60 disabled:cursor-not-allowed
            disabled:hover:translate-y-0 disabled:hover:shadow-lg
          `}
          loading={isPending}
        >
          Enviar link de recuperacao
        </Button>
      </motion.div>

      {/* Back to Login Link - Glass Ghost Button iOS 26 */}
      <motion.div variants={itemVariants}>
        <Button
          asChild
          variant="ghost"
          className={`
            w-full h-[48px] rounded-2xl
            glass-btn-ghost
            font-medium text-[14px] tracking-tight
            text-slate-600 dark:text-slate-400
            hover:text-slate-900 dark:hover:text-slate-100
            hover:bg-white/40 dark:hover:bg-white/10
            transition-all duration-300 ease-out
            group
          `}
        >
          <Link href="/login">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Voltar para o login
          </Link>
        </Button>
      </motion.div>
    </motion.form>
  )
}
