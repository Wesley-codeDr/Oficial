import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'
import { createValidationError } from '@/lib/api/errors'

// GET /api/chief-complaints - List chief complaints with groups
export async function GET(req: Request) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const groupCode = searchParams.get('group')
    const search = searchParams.get('search')
    const rawLimit = searchParams.get('limit')

    // Validate and parse limit
    const MAX_LIMIT = 100
    const limitValue = rawLimit ? parseInt(rawLimit, 10) : 50

    if (isNaN(limitValue) || limitValue < 1 || limitValue > MAX_LIMIT) {
      const errorResponse = createValidationError('Parâmetro limit inválido', [
        {
          field: 'limit',
          message: `Limit deve ser um número entre 1 e ${MAX_LIMIT}`,
        },
      ])
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const limit = limitValue

    // Build where clause
    const where: Record<string, unknown> = { isActive: true }

    if (groupCode) {
      const group = await prisma.chiefComplaintGroup.findUnique({
        where: { code: groupCode },
      })
      if (group) {
        where.groupId = group.id
      }
    }

    if (search) {
      where.OR = [
        { namePt: { contains: search, mode: 'insensitive' } },
        { nameEn: { contains: search, mode: 'insensitive' } },
        { synonyms: { has: search } },
      ]
    }

    const complaints = await prisma.chiefComplaint.findMany({
      where,
      orderBy: { orderIndex: 'asc' },
      take: limit,
      include: {
        group: {
          select: {
            id: true,
            code: true,
            namePt: true,
            icon: true,
            color: true,
          },
        },
        tags: true,
      },
    })

    return NextResponse.json(complaints)
  } catch (error) {
    console.error('Error listing chief complaints:', error)
    return NextResponse.json(
      { error: 'Failed to list chief complaints' },
      { status: 500 }
    )
  }
}

// POST /api/chief-complaints - Reserved for future write operations
// Groups listing has been moved to GET /api/chief-complaints/groups
