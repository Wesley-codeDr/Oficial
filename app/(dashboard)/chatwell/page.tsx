import type { Metadata } from 'next'
import { ChatWellDemo } from '@/components/chat/chatwell-demo'

export const metadata: Metadata = {
  title: 'ChatWell | WellWave',
  description: 'Assistente médico profissional com IA',
}

export default function ChatWellPage() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <ChatWellDemo />
    </main>
  )
}
