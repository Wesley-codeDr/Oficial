'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { Button, type ButtonProps } from '@/components/ui/button'

interface NewChatButtonProps {
  sessionId?: string
  variant?: ButtonProps['variant']
}

export function NewChatButton({ sessionId, variant = 'outline' }: NewChatButtonProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleNewChat = async () => {
    startTransition(async () => {
      try {
        const response = await fetch('/api/chat/conversations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })

        if (!response.ok) {
          throw new Error('Failed to create conversation')
        }

        const conversation = await response.json()
        router.push(`/chat/${conversation.id}`)
      } catch (error) {
        console.error('Error creating conversation:', error)
      }
    })
  }

  return (
    <Button variant={variant} onClick={handleNewChat} disabled={isPending}>
      <Plus className="mr-2 h-4 w-4" />
      {isPending ? 'Criando...' : 'Nova Conversa'}
    </Button>
  )
}
