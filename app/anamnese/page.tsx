import { randomUUID } from 'crypto'
import { defaultCategories } from '../../lib/anamnese/categories'
import { Suspense } from 'react'
import { CollaborationPanel } from '../../components/anamnese/CollaborationPanel'

// Client wrappers
import ClientAnamnese from './ClientAnamnese'

export const dynamic = 'force-dynamic'

export default async function AnamnesePage() {
  // In a real app, fetch patient/session data server-side
  const categories = defaultCategories
  const sessionId = randomUUID()

  return (
    <div className="mx-auto max-w-2xl px-4 py-4">
      <h1 className="text-[22px] font-semibold">Anamnese</h1>
      <p className="text-[14px] text-[rgba(60,60,67,0.6)] dark:text-[rgba(235,235,245,0.6)]">Fluxo otimizado conforme Apple HIG iOS17</p>
      <Suspense fallback={<div>Carregando...</div>}>
        <ClientAnamnese categories={categories} />
      </Suspense>
      <CollaborationPanel sessionId={sessionId} />
    </div>
  )
}
