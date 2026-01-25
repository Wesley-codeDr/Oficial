'use client'

import { Bot } from 'lucide-react'
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
} from '@/lib/theme/hooks'

export function TypingIndicator() {
  const { theme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  
  const glassBlur = useGlassBlur()
  const glassOpacity = useGlassOpacity('default', isDark)
  const glassBorder = useGlassBorder('default', isDark)
  const glassRadius = useGlassRadius('default')
  const glassNoise = useGlassNoise()
  const glassSpecular = useGlassSpecular()
  const glassRimLight = useGlassRimLight()
  
  return (
    <div className="flex gap-3">
      <div className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
        glassBlur,
        glassOpacity,
        glassBorder,
        glassRadius,
        glassNoise,
        glassSpecular,
        'bg-muted'
      )}>
        <Bot className="h-4 w-4" />
      </div>
      <div className={cn(
        'flex items-center gap-1 rounded-2xl px-4 py-3',
        glassBlur,
        glassOpacity,
        glassBorder,
        glassRadius,
        glassNoise,
        glassSpecular,
        glassRimLight,
        'bg-muted'
      )}>
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
      </div>
    </div>
  )
}
