#!/usr/bin/env tsx
import { PrismaClient } from '@prisma/client'

async function main() {
  const prisma = new PrismaClient()

  const codes = ['RC_DYSPNEA_CHRONIC_EXAC', 'NC_STROKE_SUSPECTED', 'GI_GI_BLEEDING_UPPER']

  for (const code of codes) {
    const complaint = await prisma.chief_complaints.findFirst({
      where: { code },
      select: {
        id: true,
        code: true,
        name_pt: true,
        is_high_acuity: true,
        additional_data: true,
      },
    })

    if (!complaint) {
      console.log(`❌ ${code}: NÃO ENCONTRADO no banco`)
    } else {
      const hasEBM = complaint.additional_data &&
        typeof complaint.additional_data === 'object' &&
        'extendedContentEBM' in complaint.additional_data &&
        complaint.additional_data.extendedContentEBM !== null

      console.log(`${hasEBM ? '✅' : '❌'} ${code}: ${complaint.name_pt}`)
      console.log(`   is_high_acuity: ${complaint.is_high_acuity}`)
      console.log(`   has extendedContentEBM: ${hasEBM}`)
    }
  }

  await prisma.$disconnect()
}

main()
