import { Metadata } from 'next'
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'

export const metadata: Metadata = {
  title: 'Recuperar Senha | WellWave',
  description: 'Recupere sua senha do WellWave.',
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
