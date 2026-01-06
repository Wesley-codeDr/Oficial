#!/usr/bin/env tsx
import { PrismaClient } from '@prisma/client'

async function main() {
  const prisma = new PrismaClient()

  const withEBM = await prisma.chief_complaints.findMany({
    where: {
      is_high_acuity: true,
      additional_data: {
        path: ['extendedContentEBM'],
        not: null,
      },
    },
    select: {
      code: true,
      name_pt: true,
      group_id: true,
    },
    orderBy: { code: 'asc' },
  })

  console.log('\n✅ Queixas High-Acuity com EBM Content:\n')
  withEBM.forEach((c, i) => {
    console.log(`${i + 1}. ${c.code} - ${c.name_pt}`)
  })
  console.log(`\nTotal: ${withEBM.length} queixas`)

  await prisma.$disconnect()
}

main()
