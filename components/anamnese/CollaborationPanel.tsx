"use client"

import { useEffect, useState } from 'react'
import { getClient } from '../../lib/supabase/client'

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
      className="p-4 rounded-[24px] backdrop-blur-[40px] saturate-[180%] bg-white/55 dark:bg-[rgba(30,30,30,0.55)] border border-white/40 dark:border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.3)]"
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
