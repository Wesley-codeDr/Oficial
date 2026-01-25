'use client'

import { useRef, useEffect, KeyboardEvent } from 'react'
import { Send, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import * as Tokens from '@/lib/theme/tokens'
import {
  useGlassBlur,
  useGlassOpacity,
  useGlassBorder,
  useGlassRadius,
  useGlassNoise,
  useGlassSpecular,
  useGlassRimLight,
  useGlassHoverScale,
  useGlassTapScale,
} from '@/lib/theme/hooks'

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  onStop?: () => void
  isLoading?: boolean
  disabled?: boolean
  placeholder?: string
  className?: string
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  onStop,
  isLoading,
  disabled,
  placeholder = 'Digite sua pergunta...',
  className,
}: ChatInputProps) {
  const { theme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  
  const glassBlur = useGlassBlur()
  const glassOpacity = useGlassOpacity('default', isDark)
  const glassBorder = useGlassBorder('default', isDark)
  const glassRadius = useGlassRadius('default')
  const glassNoise = useGlassNoise()
  const glassSpecular = useGlassSpecular()
  const glassRimLight = useGlassRimLight()
  const glassHoverScale = useGlassHoverScale()
  const glassTapScale = useGlassTapScale()
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
    }
  }, [value])

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isLoading && value.trim()) {
        onSubmit(e as unknown as React.FormEvent)
      }
    }
  }

  return (
    <form onSubmit={onSubmit} className={cn('relative', className)}>
      <div className={cn(
        'relative flex items-end gap-2 rounded-2xl p-2',
        glassBlur,
        glassOpacity,
        glassBorder,
        glassRadius,
        glassNoise,
        glassSpecular,
        glassRimLight
      )}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          rows={1}
          className="flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
          style={{ maxHeight: '200px' }}
        />
        <div className="flex shrink-0 items-center gap-1">
          {isLoading ? (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={onStop}
              className={cn(
                'h-8 w-8',
                glassBlur,
                glassOpacity,
                glassBorder,
                glassRadius,
                glassNoise,
                glassSpecular,
                glassHoverScale,
                glassTapScale,
                'hover:bg-white/20 dark:hover:bg-white/10'
              )}
            >
              <Square className="h-4 w-4" />
              <span className="sr-only">Parar</span>
            </Button>
          ) : (
            <Button
              type="submit"
              size="icon"
              disabled={!value.trim() || disabled}
              className={cn(
                'h-8 w-8 text-white disabled:opacity-50',
                glassBlur,
                glassOpacity,
                glassBorder,
                glassRadius,
                glassNoise,
                glassSpecular,
                glassHoverScale,
                glassTapScale,
                'bg-blue-500 hover:bg-blue-600'
              )}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Enviar</span>
            </Button>
          )}
        </div>
      </div>
      <p className="mt-1 text-center text-xs text-muted-foreground">
        Pressione Enter para enviar, Shift+Enter para nova linha
      </p>
    </form>
  )
}
