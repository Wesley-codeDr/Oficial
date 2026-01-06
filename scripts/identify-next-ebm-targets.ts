import { PrismaClient } from '@prisma/client'

async function main() {
  const prisma = new PrismaClient()

  try {
    // Get all high-acuity complaints
    const allHighAcuity = await prisma.chief_complaints.findMany({
      where: {
        is_high_acuity: true,
      },
      select: {
        code: true,
        name_pt: true,
        group_id: true,
        order_index: true,
        additional_data: true,
      },
      orderBy: [
        { order_index: 'asc' },
      ],
    })

    // Filter out those without EBM content
    const needsEBM = allHighAcuity
      .filter((complaint) => {
        const data = complaint.additional_data as any
        return !data?.extendedContentEBM || Object.keys(data.extendedContentEBM || {}).length === 0
      })
      .slice(0, 17)
      .map(({ additional_data, ...rest }) => rest)

    console.log('🎯 Próximas 17 Queixas High-Acuity para EBM Content:')
    console.log('='.repeat(80))
    console.log('')

    // Group by category
    const byGroup: Record<string, typeof needsEBM> = {}
    needsEBM.forEach((complaint) => {
      const group = complaint.group_id || 'OUTROS'
      if (!byGroup[group]) byGroup[group] = []
      byGroup[group].push(complaint)
    })

    let totalCount = 0
    Object.entries(byGroup).forEach(([group, complaints]) => {
      console.log(`\n### ${group} (${complaints.length} queixas)`)
      console.log('')
      complaints.forEach((c, idx) => {
        totalCount++
        console.log(`${totalCount}. **${c.code}** - ${c.name_pt}`)
      })
    })

    console.log('\n' + '='.repeat(80))
    console.log(`\nTotal: ${needsEBM.length} queixas identificadas`)
    console.log('\n📋 Próximo passo:')
    console.log('   Executar: pnpm tsx scripts/seed-ebm-next-batch.ts')
    console.log('')
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
