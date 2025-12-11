'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type RedFlag = {
  id: string
  displayText: string
}

interface RedFlagAlertProps {
  redFlags: RedFlag[]
  className?: string
}

export function RedFlagAlert({ redFlags, className }: RedFlagAlertProps) {
  const [dismissed, setDismissed] = useState(false)

  if (redFlags.length === 0 || dismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0, y: -20, height: 0 }}
        className={cn(
          'rounded-lg border border-destructive/50 bg-destructive/10 p-4',
          className
        )}
      >
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/20">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-destructive">
                Sinais de Alarme Detectados
              </h4>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setDismissed(true)}
                className="h-6 w-6 text-destructive/70 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Os seguintes achados requerem atencao especial e podem indicar
              condicao grave:
            </p>
            <ul className="space-y-1">
              {redFlags.map((flag) => (
                <motion.li
                  key={flag.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                  {flag.displayText}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
