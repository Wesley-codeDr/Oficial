'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Info, ChevronDown } from 'lucide-react'
import { useChat, type Message } from '@/hooks/use-chat'
import { MessageBubble } from './message-bubble'
import { TypingIndicator } from './typing-indicator'
import { ChatInput } from './chat-input'
import { ChatWellWelcome } from './chatwell-welcome'
import { SmartSuggestions, generateContextSuggestions, type SuggestionType } from './smart-suggestions'
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
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [contextualSuggestions, setContextualSuggestions] = useState<Array<{
    id: string
    type: SuggestionType
    text: string
    prompt: string
  }>>([])

  const {
    messages,
    input,
    setInput,
    handleSubmit,
    sendMessage,
    isLoading,
    error,
    stop,
  } = useChat({
    conversationId,
    initialMessages,
  })

  // Auto-scroll to bottom on new messages
  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Generate contextual suggestions after assistant response
  useEffect(() => {
    if (messages.length > 0 && !isLoading) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage && lastMessage.role === 'assistant') {
        const suggestions = generateContextSuggestions(lastMessage.content)
        setContextualSuggestions(suggestions)
      }
    }
  }, [messages, isLoading])

  // Track scroll position for "scroll to bottom" button
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
      setShowScrollButton(!isNearBottom && messages.length > 3)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [messages.length])

  // Handle suggestion click
  const handleSuggestionClick = useCallback((prompt: string) => {
    setInput(prompt)
    // Optional: auto-submit
    // sendMessage(prompt)
  }, [setInput])

  // Handle welcome suggestion click (auto-submit)
  const handleWelcomeSuggestionClick = useCallback((prompt: string) => {
    sendMessage(prompt)
  }, [sendMessage])

  const hasMessages = messages.length > 0

  return (
    <div className={cn('relative flex h-full flex-col', className)}>
      {/* Context Banner */}
      <AnimatePresence>
        {contextSummary && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="shrink-0 border-b border-white/10"
          >
            <div className={cn(
              'px-4 py-3',
              'bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-teal-500/5',
              'backdrop-blur-sm'
            )}>
              <div className="flex items-start gap-3 mx-auto max-w-3xl">
                <div className="p-1.5 rounded-lg bg-blue-500/10">
                  <Info className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-0.5">
                    Contexto Clínico
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {contextSummary}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto custom-scrollbar"
      >
        <div className="mx-auto max-w-3xl px-4 py-6">
          {/* Welcome Screen */}
          <AnimatePresence mode="wait">
            {!hasMessages && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ChatWellWelcome onSuggestionClick={handleWelcomeSuggestionClick} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message List */}
          <AnimatePresence mode="popLayout">
            {hasMessages && (
              <motion.div
                key="messages"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
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
                <AnimatePresence>
                  {isLoading && messages[messages.length - 1]?.role === 'user' && (
                    <TypingIndicator />
                  )}
                </AnimatePresence>

                {/* Smart Suggestions */}
                <AnimatePresence>
                  {!isLoading && contextualSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: 0.3 }}
                      className="pt-2"
                    >
                      <SmartSuggestions
                        suggestions={contextualSuggestions}
                        onSuggestionClick={handleSuggestionClick}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={cn(
                        'flex items-center gap-3 p-4 rounded-2xl',
                        'bg-red-500/10 border border-red-500/20',
                        'backdrop-blur-xl'
                      )}
                    >
                      <div className="p-2 rounded-xl bg-red-500/10">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-red-600 dark:text-red-400">
                          Erro ao processar
                        </p>
                        <p className="text-sm text-red-500/80">{error}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Scroll to Bottom Button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollToBottom()}
            className={cn(
              'absolute bottom-32 right-8 z-10',
              'flex items-center justify-center',
              'h-10 w-10 rounded-full',
              'bg-white/80 dark:bg-white/10',
              'backdrop-blur-xl',
              'border border-white/40 dark:border-white/10',
              'shadow-[0_4px_16px_rgba(0,0,0,0.08)]',
              'text-muted-foreground',
              'hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]',
              'transition-all duration-300'
            )}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className={cn(
        'shrink-0 border-t border-white/10',
        'bg-gradient-to-t from-background via-background/95 to-background/80',
        'backdrop-blur-lg',
        'p-4 pt-6'
      )}>
        <div className="mx-auto max-w-3xl">
          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            onStop={stop}
            isLoading={isLoading}
            placeholder="Pergunte sobre diagnósticos, condutas ou tire dúvidas baseadas em evidências..."
          />
        </div>
      </div>
    </div>
  )
}
