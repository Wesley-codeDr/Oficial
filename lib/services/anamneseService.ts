import { BaseRepository } from '../db/baseRepository'
import type { CheckboxCategory } from '@prisma/client'

export interface CheckboxData {
  id: string
  category: CheckboxCategory
  displayText: string
  narrativeText: string
  isRedFlag: boolean
  isNegative: boolean
}

export class AnamneseService extends BaseRepository {
  async getSessionContext(sessionId: string, userId: string) {
    const session = await this.prisma.anamneseSession.findUnique({
      where: { id: sessionId, userId },
      include: {
        syndrome: {
          include: {
            checkboxes: {
              orderBy: { orderIndex: 'asc' }
            },
          },
        },
      },
    })

    if (!session) return null

    const checkedIds = session.checkedItems as string[]
    const checkedItems = session.syndrome.checkboxes.filter((cb) =>
      checkedIds.includes(cb.id)
    )
    
    // Build tree structure if parentId exists (new feature)
    const redFlags = checkedItems.filter((cb) => cb.isRedFlag)

    return {
      syndromeId: session.syndromeId,
      syndromeName: session.syndrome.name,
      syndromeDescription: session.syndrome.description,
      checkedItems: checkedItems.map((cb) => ({
        id: cb.id,
        category: cb.category,
        displayText: cb.displayText,
        narrativeText: cb.narrativeText,
        isRedFlag: cb.isRedFlag,
        isNegative: cb.isNegative,
        parentId: (cb as any).parentId,
      })),
      generatedText: session.generatedText || '',
      redFlags: redFlags.map((rf) => rf.displayText),
    }
  }

  async createSession(userId: string, syndromeId: string, checkedItems: string[]) {
    const session = await this.prisma.anamneseSession.create({
      data: {
        userId,
        syndromeId,
        checkedItems,
      }
    })

    await this.audit('ANAMNESE_SESSION_CREATED', 'AnamneseSession', session.id)
    return session
  }
}
