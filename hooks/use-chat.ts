'use client'

import { useState, useCallback } from 'react'
import { useChat as useAIChat } from '@ai-sdk/react'
import { analytics } from '@/lib/analytics'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt?: Date
}

type UseChatOptions = {
  conversationId: string
  initialMessages?: Message[]
  onError?: (error: Error) => void
}

export function useChat({ conversationId, initialMessages = [], onError }: UseChatOptions) {
  const [error, setError] = useState<string | null>(null)

  const {
    messages,
    input,
    setInput,
    handleSubmit: aiHandleSubmit,
    isLoading,
    stop,
    reload,
    append,
  } = useAIChat({
    api: `/api/chat/conversations/${conversationId}/messages`,
    initialMessages: initialMessages.map((m) => ({
      id: m.id,
      role: m.role,
      content: m.content,
    })),
    onError: (err) => {
      setError(err.message)
      onError?.(err)
    },
    onFinish: (message) => {
      setError(null)
      // Track response received
      analytics.chatResponseReceived(
        conversationId,
        message.content.includes('[') && message.content.includes(']'), // Check for citations
        message.content.length
      )
    },
  })

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!input.trim()) return
      setError(null)
      // Track message sent
      analytics.chatMessageSent(conversationId, input.length)
      aiHandleSubmit(e)
    },
    [input, aiHandleSubmit, conversationId]
  )

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return
      setError(null)
      await append({
        role: 'user',
        content,
      })
    },
    [append]
  )

  return {
    messages,
    input,
    setInput,
    handleSubmit,
    sendMessage,
    isLoading,
    error,
    stop,
    reload,
  }
}

export type { Message }
