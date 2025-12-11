'use server'

import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'
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

  // Check if user exists in our database, create if not
  let dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  })

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email!,
        fullName: user.user_metadata?.full_name || 'Usuario',
        crmNumber: user.user_metadata?.crm_number || '000000',
        crmState: user.user_metadata?.crm_state || 'SP',
      },
    })
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

  await prisma.anamneseSession.update({
    where: { id: sessionId, userId: user.id },
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
