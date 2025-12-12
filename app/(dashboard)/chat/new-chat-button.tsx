'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Plus, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'

interface NewChatButtonProps {
  sessionId?: string
  variant?: 'default' | 'outline' | 'minimal'
  size?: 'default' | 'lg'
}

export function NewChatButton({
  sessionId,
  variant = 'outline',
  size = 'default',
}: NewChatButtonProps) {
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
        toast({
          variant: 'destructive',
          title: 'Erro ao criar conversa',
          description: 'Não foi possível criar uma nova conversa. Tente novamente.',
        })
      }
    })
  }

  // Primary CTA - Used in empty states (Apple 2025 filled style)
  if (variant === 'default') {
    return (
      <motion.button
        onClick={handleNewChat}
        disabled={isPending}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'bg-foreground text-background',
          'font-medium rounded-full',
          'shadow-sm',
          'transition-all duration-200 ease-out',
          'hover:opacity-90 hover:shadow-md',
          'active:scale-[0.97] active:opacity-80',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none',
          size === 'lg' ? 'h-[50px] px-7 text-[16px]' : 'h-11 px-5 text-[15px]'
        )}
        whileTap={{ scale: 0.97 }}
      >
        {isPending ? (
          <Loader2 className="h-[18px] w-[18px] animate-spin" />
        ) : (
          <Plus className="h-[18px] w-[18px]" strokeWidth={2.5} />
        )}
        <span>Nova Conversa</span>
      </motion.button>
    )
  }

  // Minimal - Icon only for compact spaces
  if (variant === 'minimal') {
    return (
      <motion.button
        onClick={handleNewChat}
        disabled={isPending}
        className={cn(
          'inline-flex items-center justify-center',
          'h-9 w-9 rounded-full',
          'text-muted-foreground hover:text-foreground',
          'bg-transparent hover:bg-black/[0.04] dark:hover:bg-white/[0.06]',
          'active:bg-black/[0.08] dark:active:bg-white/[0.08]',
          'transition-all duration-150 ease-out',
          'disabled:opacity-40 disabled:cursor-not-allowed'
        )}
        whileTap={{ scale: 0.92 }}
        aria-label="Nova conversa"
      >
        {isPending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Plus className="h-5 w-5" strokeWidth={1.8} />
        )}
      </motion.button>
    )
  }

  // Outline - Apple 2025 SF Symbol style button
  return (
    <motion.button
      onClick={handleNewChat}
      disabled={isPending}
      className={cn(
        'inline-flex items-center justify-center gap-1.5',
        'h-9 px-3.5 rounded-full',
        'bg-black/[0.04] dark:bg-white/[0.06]',
        'hover:bg-black/[0.07] dark:hover:bg-white/[0.09]',
        'active:bg-black/[0.10] dark:active:bg-white/[0.12]',
        'text-[14px] font-medium text-foreground',
        'transition-all duration-150 ease-out',
        'disabled:opacity-40 disabled:cursor-not-allowed'
      )}
      whileTap={{ scale: 0.96 }}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Plus className="h-4 w-4" strokeWidth={2.5} />
      )}
      <span>Nova</span>
    </motion.button>
  )
}
