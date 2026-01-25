'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import * as Theme from '@/lib/theme'

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const { theme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  // Get theme-specific classes
  const glassHoverScale = Theme.useGlassHoverScale()
  const glassTapScale = Theme.useGlassTapScale()

  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!text) return

    try {
      const clipboard = (globalThis as { navigator?: Navigator }).navigator?.clipboard
      if (!clipboard?.writeText) return

      await clipboard.writeText(text)
      setCopied(true)
      globalThis.setTimeout?.(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Button
      variant={copied ? 'secondary' : 'outline'}
      size="sm"
      onClick={handleCopy}
      disabled={!text}
      className={cn(
        copied && 'bg-emerald-600 hover:bg-emerald-600',
        glassHoverScale,
        glassTapScale,
        className
      )}
    >
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Copiado!
        </>
      ) : (
        <>
          <Copy className="mr-2 h-4 w-4" />
          Copiar
        </>
      )}
    </Button>
  )
}
