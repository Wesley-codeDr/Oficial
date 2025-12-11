import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { ChatInterface } from '@/components/chat/chat-interface'
import { buildMinimalContext } from '@/lib/ai/context'
import { DeleteConversationButton } from './delete-button'

interface ChatPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ChatPageProps): Promise<Metadata> {
  return {
    title: 'Chat EBM | WellWave',
    description: 'Conversa com o assistente EBM.',
  }
}

async function getConversation(id: string, userId: string) {
  return prisma.chatConversation.findUnique({
    where: { id, userId },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
      },
      session: {
        select: {
          id: true,
          generatedText: true,
          syndrome: {
            select: { name: true, code: true, description: true },
          },
        },
      },
    },
  })
}

export default async function ChatPage({ params }: ChatPageProps) {
  const user = await getUser()
  if (!user) {
    redirect('/login')
  }

  const { id } = await params
  const conversation = await getConversation(id, user.id)

  if (!conversation) {
    notFound()
  }

  // Build context summary for display
  let contextSummary: string | undefined
  if (conversation.contextSnapshot) {
    const snapshot = conversation.contextSnapshot as {
      syndromeName: string
      checkedItems: Array<{ displayText: string; isRedFlag: boolean }>
      redFlags: string[]
    }

    const redFlagCount = snapshot.redFlags?.length || 0
    contextSummary = `${snapshot.syndromeName}${redFlagCount > 0 ? ` (${redFlagCount} sinais de alarme)` : ''}`
  } else if (conversation.session) {
    contextSummary = conversation.session.syndrome.name
  }

  // Format messages for chat interface
  const initialMessages = conversation.messages.map((msg) => ({
    id: msg.id,
    role: msg.role === 'USER' ? 'user' as const : 'assistant' as const,
    content: msg.content,
    createdAt: msg.createdAt,
  }))

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/chat">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="font-semibold">Chat EBM</h1>
            {contextSummary && (
              <p className="text-sm text-muted-foreground">{contextSummary}</p>
            )}
          </div>
        </div>
        <DeleteConversationButton conversationId={id} />
      </div>

      {/* Chat Interface */}
      <ChatInterface
        conversationId={id}
        initialMessages={initialMessages}
        contextSummary={contextSummary}
        className="flex-1"
      />
    </div>
  )
}
