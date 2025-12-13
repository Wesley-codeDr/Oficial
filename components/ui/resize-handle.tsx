'use client'

import { PanelResizeHandle } from 'react-resizable-panels'
import { cn } from '@/lib/utils'

export function ResizeHandle({
  className,
  ...props
}: React.ComponentProps<typeof PanelResizeHandle>) {
  return (
    <PanelResizeHandle
      className={cn(
        'relative w-2 bg-transparent transition-colors hover:bg-slate-200/80 dark:hover:bg-slate-800/80 active:bg-ios-blue/20',
        className
      )}
      {...props}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
    </PanelResizeHandle>
  )
}
