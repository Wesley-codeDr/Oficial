import { Metadata } from 'next'
import { RegisterForm } from '@/components/auth/register-form'

export const metadata: Metadata = {
  title: 'Criar Conta | WellWave',
  description: 'Crie sua conta WellWave para comecar a documentar anamneses medicas de forma rapida e segura.',
}

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Criar conta
        </h1>
        <p className="text-muted-foreground">
          Registre-se para comecar a usar o WellWave
        </p>
      </div>
      <RegisterForm />
    </div>
  )
}
