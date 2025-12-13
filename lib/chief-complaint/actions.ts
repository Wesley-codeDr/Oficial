'use server'

/**
 * Chief Complaint Server Actions
 *
 * Server actions for managing chief complaint groups, complaints, and sessions.
 * Provides search, filter, and CRUD operations.
 */

import { prisma } from '@/lib/db/prisma'
import { revalidatePath } from 'next/cache'
import type {
  ChiefComplaintGroupWithCount,
  ChiefComplaintGroupWithComplaints,
  ChiefComplaintWithTags,
  ChiefComplaintWithRelations,
  ChiefComplaintSearchParams,
  ChiefComplaintSearchResult,
  PatientContext,
} from '@/types/chief-complaint'
import { TagCategory } from '@prisma/client'

// ============================================
// GROUP ACTIONS
// ============================================

/**
 * Get all active chief complaint groups with complaint count
 */
export async function getChiefComplaintGroups(): Promise<ChiefComplaintGroupWithCount[]> {
  return prisma.chiefComplaintGroup.findMany({
    where: { isActive: true },
    orderBy: { orderIndex: 'asc' },
    include: {
      _count: {
        select: { complaints: true },
      },
    },
  })
}

/**
 * Get a single group by code with its complaints
 */
export async function getChiefComplaintGroupByCode(
  code: string
): Promise<ChiefComplaintGroupWithComplaints | null> {
  return prisma.chiefComplaintGroup.findUnique({
    where: { code: code.toUpperCase() },
    include: {
      complaints: {
        where: { isActive: true },
        orderBy: [{ isHighAcuity: 'desc' }, { isTimeSensitive: 'desc' }, { orderIndex: 'asc' }],
      },
      _count: {
        select: { complaints: true },
      },
    },
  })
}

// ============================================
// COMPLAINT ACTIONS
// ============================================

/**
 * Get a single complaint by ID with all relations
 */
export async function getChiefComplaintById(
  id: string
): Promise<ChiefComplaintWithRelations | null> {
  return prisma.chiefComplaint.findUnique({
    where: { id },
    include: {
      group: true,
      tags: true,
      syndrome: true,
    },
  })
}

/**
 * Get a single complaint by code with all relations
 */
export async function getChiefComplaintByCode(
  code: string
): Promise<ChiefComplaintWithRelations | null> {
  return prisma.chiefComplaint.findUnique({
    where: { code: code.toUpperCase() },
    include: {
      group: true,
      tags: true,
      syndrome: true,
    },
  })
}

/**
 * Search chief complaints with filters
 */
export async function searchChiefComplaints(
  params: ChiefComplaintSearchParams
): Promise<ChiefComplaintSearchResult> {
  const {
    groupCode,
    tags,
    search,
    isTimeSensitive,
    isHighAcuity,
    requiresIsolation,
    limit = 50,
    offset = 0,
  } = params

  // Build where clause
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    isActive: true,
  }

  // Filter by group
  if (groupCode) {
    where.group = { code: groupCode.toUpperCase() }
  }

  // Filter by flags
  if (isTimeSensitive !== undefined) {
    where.isTimeSensitive = isTimeSensitive
  }
  if (isHighAcuity !== undefined) {
    where.isHighAcuity = isHighAcuity
  }
  if (requiresIsolation !== undefined) {
    where.requiresIsolation = requiresIsolation
  }

  // Full-text search in name, synonyms, definition
  if (search && search.trim()) {
    const searchTerm = search.trim().toLowerCase()
    where.OR = [
      { namePt: { contains: searchTerm, mode: 'insensitive' } },
      { nameEn: { contains: searchTerm, mode: 'insensitive' } },
      { definition: { contains: searchTerm, mode: 'insensitive' } },
      { synonyms: { has: searchTerm } },
    ]
  }

  // Filter by tags
  if (tags && tags.length > 0) {
    where.tags = {
      some: {
        OR: tags.flatMap((tagFilter) =>
          tagFilter.values.map((value) => ({
            category: tagFilter.category,
            value,
          }))
        ),
      },
    }
  }

  // Execute query
  const [complaints, total] = await Promise.all([
    prisma.chiefComplaint.findMany({
      where,
      include: { tags: true },
      orderBy: [{ isHighAcuity: 'desc' }, { isTimeSensitive: 'desc' }, { orderIndex: 'asc' }],
      take: limit,
      skip: offset,
    }),
    prisma.chiefComplaint.count({ where }),
  ])

  return {
    complaints,
    total,
    hasMore: offset + complaints.length < total,
  }
}

/**
 * Get complaints by group code
 */
export async function getComplaintsByGroup(groupCode: string): Promise<ChiefComplaintWithTags[]> {
  return prisma.chiefComplaint.findMany({
    where: {
      isActive: true,
      group: { code: groupCode.toUpperCase() },
    },
    include: { tags: true },
    orderBy: [{ isHighAcuity: 'desc' }, { isTimeSensitive: 'desc' }, { orderIndex: 'asc' }],
  })
}

/**
 * Get time-sensitive complaints (for quick access)
 */
export async function getTimeSensitiveComplaints(): Promise<ChiefComplaintWithTags[]> {
  return prisma.chiefComplaint.findMany({
    where: {
      isActive: true,
      isTimeSensitive: true,
    },
    include: { tags: true },
    orderBy: { orderIndex: 'asc' },
    take: 20,
  })
}

/**
 * Get high-acuity complaints (for quick access)
 */
export async function getHighAcuityComplaints(): Promise<ChiefComplaintWithTags[]> {
  return prisma.chiefComplaint.findMany({
    where: {
      isActive: true,
      isHighAcuity: true,
    },
    include: { tags: true },
    orderBy: { orderIndex: 'asc' },
    take: 20,
  })
}

// ============================================
// SESSION ACTIONS
// ============================================

/**
 * Create a new chief complaint session
 */
export async function createChiefComplaintSession(data: {
  userId: string
  chiefComplaintId: string
  patientContext: PatientContext
}) {
  const session = await prisma.chiefComplaintSession.create({
    data: {
      userId: data.userId,
      chiefComplaintId: data.chiefComplaintId,
      patientContext: data.patientContext as object,
    },
    include: {
      chiefComplaint: {
        include: {
          group: true,
          tags: true,
          syndrome: true,
        },
      },
    },
  })

  revalidatePath('/queixa')
  return session
}

/**
 * Update a chief complaint session
 */
export async function updateChiefComplaintSession(
  sessionId: string,
  data: {
    selectedFlow?: Record<string, unknown>
    calculatorResults?: Record<string, unknown>
    generatedText?: string
    redFlagsDetected?: string[]
    completedAt?: Date
  }
) {
  const session = await prisma.chiefComplaintSession.update({
    where: { id: sessionId },
    data: {
      selectedFlow: data.selectedFlow as object | undefined,
      calculatorResults: data.calculatorResults as object | undefined,
      generatedText: data.generatedText,
      redFlagsDetected: data.redFlagsDetected,
      completedAt: data.completedAt,
    },
    include: {
      chiefComplaint: {
        include: {
          group: true,
          tags: true,
          syndrome: true,
        },
      },
    },
  })

  revalidatePath('/queixa')
  return session
}

/**
 * Complete a chief complaint session
 */
export async function completeChiefComplaintSession(sessionId: string) {
  return updateChiefComplaintSession(sessionId, {
    completedAt: new Date(),
  })
}

/**
 * Get user's recent chief complaint sessions
 */
export async function getUserChiefComplaintSessions(userId: string, limit = 10) {
  return prisma.chiefComplaintSession.findMany({
    where: { userId },
    include: {
      chiefComplaint: {
        include: {
          group: true,
          tags: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}

/**
 * Get a single session by ID
 */
export async function getChiefComplaintSession(sessionId: string) {
  return prisma.chiefComplaintSession.findUnique({
    where: { id: sessionId },
    include: {
      chiefComplaint: {
        include: {
          group: true,
          tags: true,
          syndrome: true,
        },
      },
    },
  })
}

// ============================================
// TAG ACTIONS
// ============================================

/**
 * Get all unique tag values by category
 */
export async function getTagsByCategory(category: TagCategory) {
  const tags = await prisma.chiefComplaintTag.findMany({
    where: { category },
    distinct: ['value'],
    select: { value: true },
  })
  return tags.map((t: { value: string }) => t.value)
}

/**
 * Get complaints by specific tag
 */
export async function getComplaintsByTag(
  category: TagCategory,
  value: string
): Promise<ChiefComplaintWithTags[]> {
  return prisma.chiefComplaint.findMany({
    where: {
      isActive: true,
      tags: {
        some: {
          category,
          value,
        },
      },
    },
    include: { tags: true },
    orderBy: [{ isHighAcuity: 'desc' }, { isTimeSensitive: 'desc' }, { orderIndex: 'asc' }],
  })
}

// ============================================
// STATS & ANALYTICS
// ============================================

/**
 * Get chief complaint statistics
 */
export async function getChiefComplaintStats() {
  const [totalGroups, totalComplaints, timeSensitiveCount, highAcuityCount, tagCounts] =
    await Promise.all([
      prisma.chiefComplaintGroup.count({ where: { isActive: true } }),
      prisma.chiefComplaint.count({ where: { isActive: true } }),
      prisma.chiefComplaint.count({ where: { isActive: true, isTimeSensitive: true } }),
      prisma.chiefComplaint.count({ where: { isActive: true, isHighAcuity: true } }),
      prisma.chiefComplaintTag.groupBy({
        by: ['category'],
        _count: { category: true },
      }),
    ])

  return {
    totalGroups,
    totalComplaints,
    timeSensitiveCount,
    highAcuityCount,
    tagCounts: tagCounts.reduce<Record<TagCategory, number>>(
      (acc: Record<TagCategory, number>, curr: { category: TagCategory; _count: { category: number } }) => {
        acc[curr.category] = curr._count.category
        return acc
      },
      {} as Record<TagCategory, number>
    ),
  }
}
