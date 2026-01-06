'use server'

import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { z } from 'zod'
import { authLimiter } from '@/lib/rate-limit'

// Strong password schema
const passwordSchema = z
  .string()
  .min(12, 'Senha deve ter no mínimo 12 caracteres')
  .regex(/[A-Z]/, 'Deve conter ao menos uma letra maiúscula')
  .regex(/[a-z]/, 'Deve conter ao menos uma letra minúscula')
  .regex(/[0-9]/, 'Deve conter ao menos um número')
  .regex(/[^A-Za-z0-9]/, 'Deve conter ao menos um caractere especial (!@#$%^&*)')

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: passwordSchema,
  fullName: z.string().min(3, 'Nome completo obrigatório'),
  crmNumber: z.string().min(4, 'CRM obrigatório'),
  crmState: z.string().length(2, 'UF do CRM deve ter 2 caracteres'),
})

export type AuthState = {
  error?: string
  success?: boolean
}

export async function login(_prevState: AuthState, formData: FormData): Promise<AuthState> {
  // Rate limiting check
  try {
    const headersList = await headers()
    const mockRequest = new Request('http://localhost', {
      headers: headersList,
    })
    await authLimiter.check(mockRequest, 5) // 5 tentativas por minuto
  } catch (rateLimitError) {
    return {
      error: 'Muitas tentativas de login. Aguarde alguns minutos antes de tentar novamente.'
    }
  }

  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const validated = loginSchema.safeParse(rawData)
  if (!validated.success) {
    const firstError = validated.error.errors?.[0]
    const errorMessage = firstError?.message || 'Dados inválidos. Verifique os campos.'
    return { error: errorMessage }
  }

  const supabase = await createServerClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: validated.data.email,
    password: validated.data.password,
  })

  if (error) {
    return { error: 'Email ou senha incorretos' }
  }

  redirect('/dashboard')
}

export async function register(_prevState: AuthState, formData: FormData): Promise<AuthState> {
  // Rate limiting check
  try {
    const headersList = await headers()
    const mockRequest = new Request('http://localhost', {
      headers: headersList,
    })
    await authLimiter.check(mockRequest, 3) // 3 tentativas por minuto (mais restritivo)
  } catch (rateLimitError) {
    return {
      error: 'Muitas tentativas de registro. Aguarde alguns minutos antes de tentar novamente.'
    }
  }

  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    fullName: formData.get('fullName') as string,
    crmNumber: formData.get('crmNumber') as string,
    crmState: formData.get('crmState') as string,
  }

  const validated = registerSchema.safeParse(rawData)
  if (!validated.success) {
    const firstError = validated.error.errors?.[0]
    const errorMessage = firstError?.message || 'Dados inválidos. Verifique os campos.'
    return { error: errorMessage }
  }

  const supabase = await createServerClient()

  const { error } = await supabase.auth.signUp({
    email: validated.data.email,
    password: validated.data.password,
    options: {
      data: {
        full_name: validated.data.fullName,
        crm_number: validated.data.crmNumber,
        crm_state: validated.data.crmState,
      },
    },
  })

  if (error) {
    if (error.message.includes('already registered')) {
      return { error: 'Este email já está cadastrado' }
    }
    return { error: 'Erro ao criar conta. Tente novamente.' }
  }

  return { success: true }
}

export async function logout() {
  const supabase = await createServerClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function forgotPassword(_prevState: AuthState, formData: FormData): Promise<AuthState> {
  // Rate limiting check
  try {
    const headersList = await headers()
    const mockRequest = new Request('http://localhost', {
      headers: headersList,
    })
    await authLimiter.check(mockRequest, 3) // 3 tentativas por minuto
  } catch (rateLimitError) {
    return {
      error: 'Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.'
    }
  }

  const email = formData.get('email') as string

  if (!email || !z.string().email().safeParse(email).success) {
    return { error: 'Email inválido' }
  }

  const supabase = await createServerClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/reset-password`,
  })

  if (error) {
    // Não revela se o email existe ou não (segurança)
    return { success: true }
  }

  return { success: true }
}
