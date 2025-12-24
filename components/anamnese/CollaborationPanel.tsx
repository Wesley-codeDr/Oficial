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
    <aside className="p-2 rounded-[12px] bg-[#F2F2F7] dark:bg-[#2C2C2E]" aria-label="Colaboração multiprofissional">
      <div className="text-[13px] text-[rgba(60,60,67,0.6)] dark:text-[rgba(235,235,245,0.6)]">Participantes</div>
      <ul className="mt-1 space-y-1" aria-live="polite">
        {users.map((u) => (
          <li key={u.id} className="text-[14px] text-black dark:text-white">{u.name ?? 'Usuário'}{u.role ? ` — ${u.role}` : ''}</li>
        ))}
        {!users.length && <li className="text-[14px] text-[rgba(60,60,67,0.6)] dark:text-[rgba(235,235,245,0.6)]">Sem participantes</li>}
      </ul>
    </aside>
  )
}
