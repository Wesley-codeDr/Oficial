'use client'

import { useRef, useEffect } from 'react'
import { AlertTriangle, Info } from 'lucide-react'
import { useChat, type Message } from '@/hooks/use-chat'
import { MessageBubble } from './message-bubble'
import { TypingIndicator } from './typing-indicator'
import { ChatInput } from './chat-input'
import { GlassCard } from '@/components/ui/glass-card'
import { cn } from '@/lib/utils'

interface ChatInterfaceProps {
  conversationId: string
  initialMessages?: Message[]
  contextSummary?: string
  className?: string
}

export function ChatInterface({
  conversationId,
  initialMessages = [],
  contextSummary,
  className,
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    messages,
    input,
    setInput,
    handleSubmit,
    isLoading,
    error,
    stop,
  } = useChat({
    conversationId,
    initialMessages,
  })

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className={cn('flex h-full flex-col', className)}>
      {/* Context Banner */}
      {contextSummary && (
        <div className="shrink-0 border-b bg-muted/50 px-4 py-2">
          <div className="flex items-start gap-2 text-sm">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-muted-foreground">
              <span className="font-medium">Contexto:</span> {contextSummary}
            </p>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-3xl space-y-4">
          {/* Welcome Message */}
          {messages.length === 0 && (
            <GlassCard hover={false} className="mx-auto max-w-lg p-6 text-center">
              <div className="space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Info className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Assistente EBM</h3>
                  <p className="text-sm text-muted-foreground">
                    Tire duvidas clinicas com base em evidencias. Pergunte sobre
                    diagnosticos diferenciais, condutas ou interpretacao de exames.
                  </p>
                </div>
                <div className="rounded-lg bg-yellow-50 p-3 text-left dark:bg-yellow-900/20">
                  <p className="text-xs text-yellow-800 dark:text-yellow-200">
                    <strong>Aviso:</strong> Este assistente e para suporte a decisao
                    clinica e nao substitui o julgamento medico.
                  </p>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Message List */}
          {messages.map((message, index) => {
            // Filter only user and assistant messages
            if (message.role !== 'user' && message.role !== 'assistant') {
              return null
            }
            return (
              <MessageBubble
                key={message.id}
                role={message.role}
                content={message.content}
                isStreaming={
                  isLoading &&
                  index === messages.length - 1 &&
                  message.role === 'assistant'
                }
              />
            )
          })}

          {/* Loading Indicator */}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <TypingIndicator />
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertTriangle className="h-4 w-4" />
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="shrink-0 border-t bg-background/80 p-4 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl">
          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            onStop={stop}
            isLoading={isLoading}
            placeholder="Pergunte sobre o caso clinico ou tire duvidas baseadas em evidencias..."
          />
        </div>
      </div>
    </div>
  )
}
