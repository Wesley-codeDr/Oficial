import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'

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
    const limit = parseInt(searchParams.get('limit') || '50', 10)

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

// GET /api/chief-complaints/groups - List all groups
export async function POST(req: Request) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { action } = body as { action: string }

    if (action === 'list-groups') {
      const groups = await prisma.chiefComplaintGroup.findMany({
        where: { isActive: true },
        orderBy: { orderIndex: 'asc' },
        include: {
          _count: {
            select: { complaints: true },
          },
        },
      })

      return NextResponse.json(groups)
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error in chief complaints action:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
