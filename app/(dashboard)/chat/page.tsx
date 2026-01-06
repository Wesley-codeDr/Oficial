import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MessageSquare, ChevronRight } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { formatDistanceToNow } from '@/lib/utils'
import { NewChatButton } from './new-chat-button'

export const metadata: Metadata = {
  title: 'Chat EBM | WellWave',
  description: 'Assistente de suporte a decisao clinica baseado em evidencias.',
}

async function getConversations() {
  const user = await getUser()
  if (!user) return []

  return prisma.chatConversation.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
    take: 20,
    include: {
      session: {
        select: {
          syndrome: {
            select: { name: true, code: true },
          },
        },
      },
      messages: {
        take: 1,
        orderBy: { createdAt: 'asc' },
        where: { role: 'USER' },
      },
      _count: {
        select: { messages: true },
      },
    },
  })
}

export default async function ChatListPage() {
  const user = await getUser()
  if (!user) {
    redirect('/login')
  }

  const conversations = await getConversations()

  return (
    <div className="container mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Chat EBM</h1>
          <p className="text-muted-foreground">
            Assistente de suporte a decisao clinica baseado em evidencias.
          </p>
        </div>
        <NewChatButton />
      </div>

      {/* Warning Banner */}
      <GlassCard hover={false} className="border-yellow-500/50 bg-yellow-50/50 p-4 dark:bg-yellow-900/10">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Aviso:</strong> Este assistente e para suporte a decisao clinica.
          Todas as respostas sao baseadas em evidencias cientificas, mas o julgamento
          clinico do medico deve sempre prevalecer.
        </p>
      </GlassCard>

      {/* Conversations List */}
      {conversations.length === 0 ? (
        <GlassCard hover={false} className="p-8 text-center">
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Nenhuma conversa ainda</h2>
              <p className="text-muted-foreground">
                Inicie uma nova conversa para tirar duvidas clinicas.
              </p>
            </div>
            <NewChatButton variant="primary" />
          </div>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {conversations.map((conversation) => {
            const firstMessage = conversation.messages[0]
            const preview = firstMessage?.content.slice(0, 100) || 'Nova conversa'

            return (
              <Link key={conversation.id} href={`/chat/${conversation.id}`}>
                <GlassCard className="group cursor-pointer p-4 transition-all hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-medium">
                          {preview}
                          {firstMessage && firstMessage.content.length > 100 && '...'}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {conversation.session && (
                          <span className="rounded-full bg-muted px-2 py-0.5">
                            {conversation.session.syndrome.name}
                          </span>
                        )}
                        <span>{conversation._count.messages} mensagens</span>
                        <span>
                          {formatDistanceToNow(new Date(conversation.updatedAt))}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </GlassCard>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
