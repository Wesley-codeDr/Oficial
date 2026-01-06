'use client'

import { cn } from '@/lib/utils'
import { User, Bot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface MessageBubbleProps {
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}

export function MessageBubble({ role, content, isStreaming }: MessageBubbleProps) {
  const isUser = role === 'user'

  return (
    <div
      className={cn(
        'flex gap-3',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full glass-pill rim-light-ios26',
          isUser ? 'bg-primary/20 text-primary backdrop-blur-xl' : 'bg-muted/50 backdrop-blur-xl'
        )}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          'flex max-w-[80%] flex-col gap-1 rounded-2xl px-4 py-2 glass-pill rim-light-ios26 inner-glow-ios26',
          isUser
            ? 'bg-primary/20 text-primary-foreground backdrop-blur-xl'
            : 'bg-muted/50 text-foreground backdrop-blur-xl'
        )}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              // Style code blocks
              code: ({ className, children, ...props }) => {
                const isInline = !className
                return isInline ? (
                  <code
                    className="rounded bg-black/10 px-1 py-0.5 text-sm dark:bg-white/10"
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <code className={cn('block overflow-x-auto', className)} {...props}>
                    {children}
                  </code>
                )
              },
              // Style links
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-600"
                >
                  {children}
                </a>
              ),
              // Style lists
              ul: ({ children }) => (
                <ul className="list-disc pl-4">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-4">{children}</ol>
              ),
              // Style blockquotes (warnings/disclaimers)
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-yellow-500 bg-yellow-50 pl-4 dark:bg-yellow-900/20">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Streaming indicator */}
        {isStreaming && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="animate-pulse">Digitando</span>
            <span className="animate-bounce">...</span>
          </div>
        )}
      </div>
    </div>
  )
}
