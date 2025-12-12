import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ChevronRight, Sparkles } from 'lucide-react'
import { formatDistanceToNow } from '@/lib/utils'
import { NewChatButton } from './new-chat-button'

export const metadata: Metadata = {
  title: 'ChatWell | WellWave',
  description:
    'Assistente médico de suporte à decisão clínica baseado em Medicina Baseada em Evidências.',
}

async function getConversations(userId: string) {
  return prisma.chatConversation.findMany({
    where: { userId },
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

  const conversations = await getConversations(user.id)

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Main Content Area - Apple 2025 Minimal */}
      <div className="flex-1 w-full max-w-[640px] mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-6">
        
        {/* Header - Ultra Minimal Apple Style */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-[34px] font-semibold tracking-[-0.02em] text-foreground">
              ChatWell
            </h1>
            <NewChatButton />
          </div>
        </header>

        {/* Conversations List */}
        {conversations.length === 0 ? (
          <EmptyState />
        ) : (
          <section>
            {/* Section Header - Subtle */}
            <div className="flex items-center gap-2 mb-3 px-1">
              <span className="text-[13px] font-medium text-muted-foreground/60 uppercase tracking-wide">
                Recentes
              </span>
            </div>
            
            {/* Conversation Items - Clean List */}
            <div className="space-y-0.5">
              {conversations.map((conversation, index) => {
                const firstMessage = conversation.messages[0]
                const preview = firstMessage?.content || 'Nova conversa'
                const syndromeName = conversation.session?.syndrome?.name
                const isFirst = index === 0
                const isLast = index === conversations.length - 1

                return (
                  <Link 
                    key={conversation.id} 
                    href={`/chat/${conversation.id}`}
                    className="group block"
                  >
                    <div 
                      className={`
                        relative flex items-center gap-3 px-4 py-3.5
                        bg-white/60 dark:bg-white/[0.03]
                        backdrop-blur-xl
                        transition-all duration-200 ease-out
                        hover:bg-white/80 dark:hover:bg-white/[0.06]
                        active:scale-[0.99]
                        ${isFirst ? 'rounded-t-2xl' : ''}
                        ${isLast ? 'rounded-b-2xl' : ''}
                        ${!isLast ? 'border-b border-black/[0.04] dark:border-white/[0.04]' : ''}
                      `}
                    >
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <p className="text-[15px] font-medium text-foreground truncate leading-snug">
                          {preview.length > 55 ? `${preview.slice(0, 55)}…` : preview}
                        </p>
                        
                        {/* Metadata - Compact */}
                        <p className="text-[13px] text-muted-foreground/60 mt-0.5 truncate">
                          {[
                            syndromeName,
                            `${conversation._count.messages} msg`,
                            formatDistanceToNow(new Date(conversation.updatedAt))
                          ].filter(Boolean).join(' · ')}
                        </p>
                      </div>

                      {/* Chevron - Subtle */}
                      <ChevronRight 
                        className="h-4 w-4 text-muted-foreground/25 shrink-0 transition-all duration-200 group-hover:text-muted-foreground/50 group-hover:translate-x-0.5" 
                        strokeWidth={2}
                      />
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>

      {/* Footer Disclaimer - Whisper Quiet */}
      <footer className="w-full max-w-[640px] mx-auto px-5 sm:px-8 pb-6 pt-2">
        <p className="text-[11px] text-muted-foreground/40 text-center leading-relaxed">
          Suporte à decisão clínica · Não substitui avaliação médica
        </p>
      </footer>
    </div>
  )
}

/** Empty State - Minimal & Inviting */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-24">
      {/* Gradient Icon Container */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl" />
        <div className="relative p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/10">
          <Sparkles 
            className="h-7 w-7 text-blue-500" 
            strokeWidth={1.5} 
          />
        </div>
      </div>
      
      {/* Text - Clear Hierarchy */}
      <h2 className="text-[20px] font-semibold text-foreground mb-2 tracking-tight">
        Pronto para começar
      </h2>
      <p className="text-[15px] text-muted-foreground/70 max-w-[260px] text-center mb-8 leading-relaxed">
        Tire dúvidas clínicas com suporte baseado em evidências científicas.
      </p>
      
      {/* CTA - Primary Action */}
      <NewChatButton variant="default" size="lg" />
    </div>
  )
}
