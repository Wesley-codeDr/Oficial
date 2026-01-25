"use client"

import { useEffect, useState } from 'react'
import { getClient } from '../../lib/supabase/client'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import * as Theme from '@/lib/theme'

export interface CollaborationPanelProps {
  sessionId: string
}

interface PresenceUser {
  id: string
  name?: string
  role?: string
}

interface PresenceMeta {
  name?: string
  role?: string
}

export function CollaborationPanel({ sessionId }: CollaborationPanelProps) {
  const { theme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  // Get theme-specific classes
  const glassBlur = Theme.useGlassBlur('subtle')
  const glassOpacity = Theme.useGlassOpacity('subtle', isDark)
  const glassBorder = Theme.useGlassBorder('subtle', isDark)
  const glassShadow = Theme.useGlassShadow('subtle', isDark)
  const glassRadius = Theme.useGlassRadius('LG')
  const glassNoise = Theme.useGlassNoise()
  const glassSpecular = Theme.useGlassSpecular('subtle')
  const glassRimLight = Theme.useGlassRimLight()

  const [users, setUsers] = useState<PresenceUser[]>([])

  useEffect(() => {
    const supabase = getClient()
    const channel = supabase.channel(`anamnese:${sessionId}`, {
      config: { presence: { key: Math.random().toString(36).slice(2) } },
    })

    channel.on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState() as Record<string, PresenceMeta[] | undefined>
      const list: PresenceUser[] = []
      for (const key of Object.keys(state)) {
        const metas = state[key] ?? []
        metas.forEach((meta) => list.push({ id: key, name: meta?.name, role: meta?.role }))
      }
      setUsers(list)
    })

    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({ name: 'Clinician', role: 'Medico' })
      }
    })

    return () => {
      channel.unsubscribe()
    }
  }, [sessionId])

  return (
    <aside
      className={cn(
        'relative overflow-hidden p-4',
        glassBlur,
        glassOpacity,
        glassBorder,
        glassShadow,
        glassRadius,
        glassNoise,
        glassSpecular,
        glassRimLight
      )}
      aria-label="Colaboração multiprofissional"
    >
      <div className="text-[13px] font-semibold uppercase tracking-wider text-[rgba(0,0,0,0.5)] dark:text-[rgba(255,255,255,0.5)]">
        Participantes
      </div>
      <ul className="mt-2 space-y-1.5" aria-live="polite">
        {users.map((u) => (
          <li key={u.id} className="text-[14px] text-[rgba(0,0,0,0.85)] dark:text-white">
            {u.name ?? 'Usuário'}{u.role ? ` — ${u.role}` : ''}
          </li>
        ))}
        {!users.length && (
          <li className="text-[14px] text-[rgba(0,0,0,0.45)] dark:text-[rgba(255,255,255,0.5)]">
            Sem participantes
          </li>
        )}
      </ul>
    </aside>
  )
}
