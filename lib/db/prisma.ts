import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // During build time, DATABASE_URL might not be available
  // Prisma Client will use the URL from the schema file
  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    // Don't initialize database connection during build
    ...(process.env.NEXT_PHASE === 'phase-production-build' ? { errorFormat: 'minimal' } : {}),
  })

  // Apply Accelerate extension for connection pooling and caching
  // Only if we're using Accelerate URL (starts with prisma+postgres://)
  if (process.env.DATABASE_URL?.startsWith('prisma+postgres://')) {
    return client.$extends(withAccelerate())
  }

  return client
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
