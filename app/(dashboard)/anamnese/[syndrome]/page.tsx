import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { AnamnesePageWrapper } from '@/components/anamnese/anamnese-page-wrapper'
import { getSyndromeByCode } from '@/lib/anamnese/actions'

interface AnamnesePageProps {
  params: Promise<{ syndrome: string }>
}

export async function generateMetadata({ params }: AnamnesePageProps): Promise<Metadata> {
  const { syndrome: syndromeCode } = await params
  const syndrome = await getSyndromeByCode(syndromeCode)

  if (!syndrome) {
    return { title: 'Sindrome nao encontrada | WellWave' }
  }

  return {
    title: `${syndrome.name} | WellWave`,
    description: `Preencha a anamnese para ${syndrome.name}.`,
  }
}

export default async function AnamnesePage({ params }: AnamnesePageProps) {
  const { syndrome: syndromeCode } = await params
  const syndrome = await getSyndromeByCode(syndromeCode)

  if (!syndrome) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{syndrome.name}</h1>
          <p className="text-muted-foreground">{syndrome.description}</p>
        </div>
      </div>

      {/* Form with Patient Context Modal */}
      <AnamnesePageWrapper syndrome={syndrome} />
    </div>
  )
}
