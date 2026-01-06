import { NextRequest, NextResponse } from 'next/server'
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'
import { mapDbComplaintToApiPayload } from '@/lib/db/complaints'
import { ComplaintListQuerySchema } from '@/lib/validation/complaints'

export async function GET(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const query = Object.fromEntries(request.nextUrl.searchParams.entries())
    const parsedQuery = ComplaintListQuerySchema.safeParse(query)

    if (!parsedQuery.success) {
      return NextResponse.json(
        { error: 'Invalid query', details: parsedQuery.error.issues },
        { status: 400 }
      )
    }

    const {
      limit = 100,
      offset = 0,
      group,
      riskLevel,
      isActive,
      search,
      updatedSince,
    } = parsedQuery.data

    const where: Prisma.chief_complaintsWhereInput = {}

    if (typeof isActive === 'boolean') {
      where.is_active = isActive
    }

    if (group) {
      where.chief_complaint_groups = {
        is: { code: group },
      }
    }

    if (riskLevel) {
      where.additional_data = {
        path: ['metadata', 'riskLevel'],
        equals: riskLevel,
      }
    }

    if (updatedSince) {
      where.updated_at = {
        gt: new Date(updatedSince),
      }
    }

    if (search) {
      where.OR = [
        {
          name_pt: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          synonyms: {
            has: search,
          },
        },
      ]
    }

    const [records, total] = await prisma.$transaction([
      prisma.chief_complaints.findMany({
        where,
        include: {
          chief_complaint_groups: true,
        },
        orderBy: {
          order_index: 'asc',
        },
        skip: offset,
        take: limit,
      }),
      prisma.chief_complaints.count({ where }),
    ])

    return NextResponse.json({
      data: records.map(mapDbComplaintToApiPayload),
      total,
      limit,
      offset,
    })
  } catch (error) {
    console.error('Error listing complaints:', error)
    return NextResponse.json(
      { error: 'Failed to list complaints' },
      { status: 500 }
    )
  }
}
