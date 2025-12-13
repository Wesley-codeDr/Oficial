'use server'

import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { validateCrmData } from '@/lib/auth/validation'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  fullName: z.string().min(3, 'Nome completo obrigatório'),
  crmNumber: z.string().min(4, 'CRM obrigatório'),
  crmState: z.string().length(2, 'UF do CRM deve ter 2 caracteres'),
})

export type AuthState = {
  error?: string
  success?: boolean
}

export async function login(_prevState: AuthState, formData: FormData): Promise<AuthState> {
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const validated = loginSchema.safeParse(rawData)
  if (!validated.success) {
    return { error: validated.error.errors[0]?.message ?? 'Dados invalidos' }
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
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    fullName: formData.get('fullName') as string,
    crmNumber: formData.get('crmNumber') as string,
    crmState: formData.get('crmState') as string,
  }

  const validated = registerSchema.safeParse(rawData)
  if (!validated.success) {
    return { error: validated.error.errors[0]?.message ?? 'Dados invalidos' }
  }

  // Additional CRM validation using shared helper for consistency
  try {
    validateCrmData({
      crm_number: validated.data.crmNumber,
      crm_state: validated.data.crmState,
    })
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : 'Dados de CRM inválidos. Verifique o número e a UF do CRM.' 
    }
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
  const email = formData.get('email') as string

  if (!email || !z.string().email().safeParse(email).success) {
    return { error: 'Email inválido' }
  }

  const supabase = await createServerClient()

  // Validate NEXT_PUBLIC_APP_URL in production
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  if (!baseUrl) {
    if (process.env.NODE_ENV === 'production') {
      console.error('NEXT_PUBLIC_APP_URL is not set in production')
      return { error: 'Erro de configuração. Entre em contato com o suporte.' }
    }
    // Development fallback with warning
    console.warn('NEXT_PUBLIC_APP_URL not set, using localhost fallback')
  }

  const redirectUrl = `${baseUrl || 'http://localhost:3000'}/auth/callback?type=recovery&next=/reset-password`

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  })

  if (error) {
    return { error: 'Erro ao enviar email. Tente novamente.' }
  }

  return { success: true }
}
