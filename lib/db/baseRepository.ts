import { prisma } from './prisma'
import { getUser } from '../supabase/server'

export class BaseRepository {
  protected prisma = prisma

  async audit(action: string, resourceType: string, resourceId?: string, metadata?: any) {
    const user = await getUser()
    
    await this.prisma.auditLog.create({
      data: {
        userId: user?.id,
        action,
        resourceType,
        resourceId,
        metadata,
      },
    })
  }
}
