import { Metadata } from 'next'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Login | WellWave',
  description: 'Acesse sua conta WellWave para gerenciar anamneses medicas.',
}

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Bem-vindo de volta
        </h1>
        <p className="text-muted-foreground">
          Entre com suas credenciais para acessar o sistema
        </p>
      </div>
      <LoginForm />
    </div>
  )
}
