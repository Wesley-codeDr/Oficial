'use server'

import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'
import { logger } from '@/lib/logging'
import { revalidatePath } from 'next/cache'

export async function getSyndromeByCode(code: string) {
  return prisma.syndrome.findUnique({
    where: { code: code.toUpperCase() },
    include: {
      checkboxes: {
        orderBy: [{ category: 'asc' }, { orderIndex: 'asc' }],
      },
      redFlagRules: {
        where: { isActive: true },
      },
    },
  })
}

export async function saveAnamneseSession(data: {
  syndromeId: string
  checkedItems: string[]
  generatedText: string
  outputMode: 'SUMMARY' | 'DETAILED'
  redFlagsDetected: string[]
}) {
  const user = await getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  // Ensure user exists in database with validated CRM data
  // Only catch CRM validation errors, let database errors propagate
  const { ensureDbUser, isCrmValidationError, CRM_PUBLIC_ERROR_MESSAGE } = await import('@/lib/auth/user-bootstrap')
  try {
    await ensureDbUser(user)
  } catch (error) {
    // Only handle CRM validation errors, re-throw others
    if (isCrmValidationError(error)) {
      logger.error('CRM validation failed while saving anamnese session', {
        userId: user.id,
        route: 'anamnese/save-session',
        event: 'ensureDbUser',
      }, error)
      throw new Error(CRM_PUBLIC_ERROR_MESSAGE)
    }
    // Re-throw database or other unexpected errors
    throw error
  }

  const session = await prisma.anamneseSession.create({
    data: {
      userId: user.id,
      syndromeId: data.syndromeId,
      checkedItems: data.checkedItems,
      generatedText: data.generatedText,
      outputMode: data.outputMode,
      redFlagsDetected: data.redFlagsDetected,
      completedAt: new Date(),
    },
  })

  // Create audit log
  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'ANAMNESE_CREATED',
      resourceType: 'AnamneseSession',
      resourceId: session.id,
      metadata: {
        syndromeId: data.syndromeId,
        checkboxCount: data.checkedItems.length,
        redFlagCount: data.redFlagsDetected.length,
        outputMode: data.outputMode,
      },
    },
  })

  revalidatePath('/history')

  return session
}

export async function markSessionAsCopied(sessionId: string) {
  const user = await getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  // First verify ownership, then update
  const session = await prisma.anamneseSession.findUnique({
    where: { id: sessionId },
  })

  if (!session || session.userId !== user.id) {
    throw new Error('Session not found')
  }

  await prisma.anamneseSession.update({
    where: { id: sessionId },
    data: { wasCopied: true },
  })

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'ANAMNESE_COPIED',
      resourceType: 'AnamneseSession',
      resourceId: sessionId,
    },
  })
}

export async function getUserSessions(limit = 10) {
  const user = await getUser()

  if (!user) {
    return []
  }

  return prisma.anamneseSession.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      syndrome: {
        select: {
          name: true,
          code: true,
          icon: true,
        },
      },
    },
  })
}
