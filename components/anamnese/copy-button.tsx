'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
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
      variant={copied ? 'default' : 'outline'}
      size="sm"
      onClick={handleCopy}
      disabled={!text}
      className={cn(copied && 'bg-green-600 hover:bg-green-600', className)}
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
