'use client'

import { useActionState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, User, FileText, MapPin, Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { GlassInput } from '@/components/ui/glass-input'
import { GlassSelect } from '@/components/ui/glass-select'
import { Label } from '@/components/ui/label'
import { register, type AuthState } from '@/lib/auth/actions'

const initialState: AuthState = {}

const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
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

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(register, initialState)

  if (state.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="space-y-6 text-center"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10 backdrop-blur-sm border border-green-500/30 shadow-lg shadow-green-500/10">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <div className="space-y-2">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-semibold text-slate-900 dark:text-slate-100"
          >
            Conta criada com sucesso!
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-slate-600 dark:text-slate-400"
          >
            Enviamos um email de confirmacao para o endereco cadastrado.
            Por favor, verifique sua caixa de entrada.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            asChild 
            className={`
              w-full h-11 rounded-2xl
              font-semibold text-[15px] tracking-tight
              bg-gradient-to-r from-green-500 to-green-600
              text-white
              shadow-lg shadow-green-500/30
              hover:shadow-xl hover:shadow-green-500/40
              hover:scale-105
              active:scale-95
              transition-all duration-300 ease-out
            `}
          >
            <Link href="/login">Ir para o login</Link>
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  // Prepare state options for GlassSelect
  const stateOptions = BRAZILIAN_STATES.map(state => ({
    value: state,
    label: state,
  }))

  return (
    <motion.form
      action={formAction}
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Error State */}
      {state.error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="flex items-start gap-3 rounded-2xl bg-red-500/10 backdrop-blur-sm border border-red-500/30 p-4 shadow-lg shadow-red-500/5"
        >
          <div className="flex-shrink-0 mt-0.5 text-red-500 dark:text-red-400">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">Erro ao criar conta</p>
            <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-0.5">{state.error}</p>
          </div>
        </motion.div>
      )}

      {/* Full Name */}
      <motion.div variants={itemVariants} className="space-y-2.5">
        <Label htmlFor="fullName" className="text-sm font-semibold text-slate-900 dark:text-slate-100/90 tracking-tight">
          Nome Completo
        </Label>
        <GlassInput
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Dr. João Silva"
          leftIcon={<User className="h-[18px] w-[18px]" />}
          required
          autoComplete="name"
          glassIntensity="medium"
        />
      </motion.div>

      {/* Email */}
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

      {/* CRM Number and State */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
        <div className="space-y-2.5">
          <Label htmlFor="crmNumber" className="text-sm font-semibold text-slate-900 dark:text-slate-100/90 tracking-tight">
            Numero CRM
          </Label>
          <GlassInput
            id="crmNumber"
            name="crmNumber"
            type="text"
            placeholder="123456"
            leftIcon={<FileText className="h-[18px] w-[18px]" />}
            required
            glassIntensity="medium"
          />
        </div>
        <div className="space-y-2.5">
          <Label htmlFor="crmState" className="text-sm font-semibold text-slate-900 dark:text-slate-100/90 tracking-tight">
            UF
          </Label>
          <GlassSelect
            id="crmState"
            name="crmState"
            placeholder="Selecione"
            options={stateOptions}
            required
            glassIntensity="medium"
          />
        </div>
      </motion.div>

      {/* Password */}
      <motion.div variants={itemVariants} className="space-y-2.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-semibold text-slate-900 dark:text-slate-100/90 tracking-tight">
            Senha
          </Label>
        </div>
        <GlassInput
          id="password"
          name="password"
          type="password"
          placeholder="Minimo 6 caracteres"
          leftIcon={<Lock className="h-[18px] w-[18px]" />}
          required
          autoComplete="new-password"
          minLength={6}
          glassIntensity="medium"
        />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">Minimo de 6 caracteres</p>
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants} className="pt-3">
        <Button 
          type="submit" 
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
              <span>Criando conta...</span>
            </span>
          ) : (
            'Criar conta'
          )}
        </Button>
      </motion.div>

      {/* Login Link */}
      <motion.p variants={itemVariants} className="text-center text-sm text-slate-500 dark:text-slate-400 pt-2">
        Já tem uma conta?{' '}
        <Link
          href="/login"
          className="font-semibold text-blue-500 hover:text-blue-600 transition-colors duration-200 underline-offset-4 hover:underline"
        >
          Entrar
        </Link>
      </motion.p>
    </motion.form>
  )
}
