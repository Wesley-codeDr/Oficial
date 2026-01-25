import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

function createPrismaClient(): PrismaClient {
  const connectionUrl = process.env.DATABASE_URL
  const isAccelerate = connectionUrl?.startsWith('prisma://')

  const logOption = process.env.NODE_ENV === 'development'
    ? ['query', 'error', 'warn']
    : ['error']

  if (isAccelerate && connectionUrl) {
    // Accelerate Mode
    // We cast the options to any because the generated client types might be strict
    // depending on how it was generated, but we know Prisma 7 requires 'accelerateUrl'
    // when 'url' is missing from schema.
    const client = new PrismaClient({
      log: logOption,
      accelerateUrl: connectionUrl
    } as any)

    return client.$extends(withAccelerate()) as unknown as PrismaClient
  } else {
    // Standard Mode (Driver Adapter)
    // Note: In Prisma 7, if the schema lacks a 'url' property (which is deprecated in schema),
    // we must pass either 'accelerateUrl' or 'adapter' to the constructor.
    // Standard connection strings via 'datasources' are no longer supported directly
    // in this configuration. Using the PG adapter ensures compatibility.
    const pool = new Pool({ connectionString: connectionUrl })
    const adapter = new PrismaPg(pool)

    return new PrismaClient({
      log: logOption,
      adapter
    } as any)
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
