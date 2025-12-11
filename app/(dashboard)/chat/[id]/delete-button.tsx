'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface DeleteConversationButtonProps {
  conversationId: string
}

export function DeleteConversationButton({ conversationId }: DeleteConversationButtonProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir esta conversa?')) {
      return
    }

    startTransition(async () => {
      try {
        const response = await fetch(`/api/chat/conversations/${conversationId}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error('Failed to delete conversation')
        }

        toast({
          title: 'Conversa excluida',
          description: 'A conversa foi excluida com sucesso.',
        })

        router.push('/chat')
        router.refresh()
      } catch (error) {
        toast({
          title: 'Erro',
          description: 'Nao foi possivel excluir a conversa.',
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isPending}
      className="text-muted-foreground hover:text-destructive"
    >
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Excluir conversa</span>
    </Button>
  )
}
