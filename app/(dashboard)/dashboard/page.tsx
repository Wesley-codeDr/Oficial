import { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Wind, Activity as ActivityIcon, Plus } from 'lucide-react'
import { prisma } from '@/lib/db/prisma'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'

export const metadata: Metadata = {
  title: 'Dashboard | WellWave',
  description: 'Selecione uma sindrome para iniciar a anamnese.',
}

async function getSyndromes() {
  return prisma.syndrome.findMany({
    where: { isActive: true },
    orderBy: { orderIndex: 'asc' },
    include: {
      _count: {
        select: { checkboxes: true },
      },
    },
  })
}

const iconMap: Record<string, typeof Heart> = {
  heart: Heart,
  wind: Wind,
  activity: ActivityIcon,
}

export default async function DashboardPage() {
  const syndromes = await getSyndromes()

  return (
    <div className="container mx-auto max-w-4xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Nova Anamnese</h1>
        <p className="text-muted-foreground">
          Selecione a sindrome clinica para iniciar o preenchimento da anamnese.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {syndromes.map((syndrome) => {
          const IconComponent = iconMap[syndrome.icon || 'activity'] || ActivityIcon

          return (
            <Link key={syndrome.id} href={`/anamnese/${syndrome.code.toLowerCase()}`}>
              <GlassCard className="group h-full cursor-pointer p-6 transition-all hover:scale-[1.02] hover:shadow-lg">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <IconComponent className="h-7 w-7 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="font-semibold">{syndrome.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {syndrome.description}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {syndrome._count.checkboxes} itens de avaliacao
                  </div>
                </div>
              </GlassCard>
            </Link>
          )
        })}
      </div>

      {syndromes.length === 0 && (
        <GlassCard className="p-8 text-center">
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Nenhuma sindrome disponivel</h2>
              <p className="text-muted-foreground">
                Execute o seed do banco de dados para adicionar as sindromes iniciais.
              </p>
            </div>
            <code className="inline-block rounded bg-muted px-3 py-1 text-sm">
              pnpm db:seed
            </code>
          </div>
        </GlassCard>
      )}
    </div>
  )
}
