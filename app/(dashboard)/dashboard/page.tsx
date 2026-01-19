import { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Wind, Activity as ActivityIcon, Plus, Sparkles, Zap, Shield } from 'lucide-react'
import { prisma } from '@/lib/db/prisma'
import { DashboardClient } from './dashboard-client'

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

export default async function DashboardPage() {
  const syndromes = await getSyndromes()

  return <DashboardClient syndromes={syndromes} />
}
