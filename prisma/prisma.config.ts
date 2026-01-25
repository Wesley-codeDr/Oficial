import type { PrismaClientOptions } from '@prisma/client'

const config = {
  datasourceUrl: process.env.DATABASE_URL,
}

export default config
