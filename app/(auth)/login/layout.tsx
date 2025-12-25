import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login | WellWave',
  description: 'Acesse sua conta WellWave para gerenciar anamneses médicas.',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
