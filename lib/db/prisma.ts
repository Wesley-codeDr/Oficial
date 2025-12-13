import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { logger } from '@/lib/logging'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL?.trim()
  if (!url) {
    throw new Error(
      'DATABASE_URL is not configured. Set it in your environment (see .env.example) so Prisma can connect to the database.'
    )
  }
  return url
}

function createPrismaClient() {
  const databaseUrl = getDatabaseUrl()
  const adapter = new PrismaPg({ connectionString: databaseUrl })

  if (process.env.NODE_ENV === 'development') {
    try {
      const parsed = new URL(databaseUrl)
      logger.info('Using database connection', {
        route: 'prisma:init',
        event: 'database-config',
        host: parsed.host,
        database: parsed.pathname,
      })
    } catch {
      // If parsing fails, continue without logging sensitive details
    }
  }

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
