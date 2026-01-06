import { PrismaClient } from '@prisma/client'

async function main() {
  const prisma = new PrismaClient()

  try {
    // Count total complaints
    const total = await prisma.chief_complaints.count()

    // Count with EBM
    const withEBM = await prisma.chief_complaints.count({
      where: {
        additional_data: {
          path: ['extendedContentEBM'],
          not: {},
        },
      },
    })

    // Get high-acuity complaints
    const highAcuity = await prisma.chief_complaints.count({
      where: { is_high_acuity: true },
    })

    console.log('📊 Database EBM Status:')
    console.log('─'.repeat(50))
    console.log(`Total Complaints: ${total}`)
    console.log(`High-Acuity Complaints: ${highAcuity}`)
    console.log(`With EBM Content: ${withEBM}`)
    console.log(`Remaining (High-Acuity): ${highAcuity - withEBM}`)
    console.log(`Progress: ${Math.round((withEBM / highAcuity) * 100)}% of high-acuity`)
    console.log('─'.repeat(50))
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
