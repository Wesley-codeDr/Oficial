import { NextRequest, NextResponse } from 'next/server'
import type { Prisma } from '@prisma/client'
import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'
import { mapDbComplaintToApiPayload } from '@/lib/db/complaints'
import { ComplaintChangesQuerySchema } from '@/lib/validation/complaints'

export async function GET(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const query = Object.fromEntries(request.nextUrl.searchParams.entries())
    const parsedQuery = ComplaintChangesQuerySchema.safeParse(query)

    if (!parsedQuery.success) {
      return NextResponse.json(
        { error: 'Invalid query', details: parsedQuery.error.issues },
        { status: 400 }
      )
    }

    const { since, limit = 100 } = parsedQuery.data

    const where: Prisma.chief_complaintsWhereInput = {}
    if (since) {
      where.updated_at = {
        gt: new Date(since),
      }
    }

    const records = await prisma.chief_complaints.findMany({
      where,
      include: {
        chief_complaint_groups: true,
      },
      orderBy: {
        updated_at: 'asc',
      },
      take: limit,
    })

    const nextCursor = records.length
      ? records[records.length - 1].updated_at.toISOString()
      : since || null

    return NextResponse.json({
      data: records.map(mapDbComplaintToApiPayload),
      nextCursor,
    })
  } catch (error) {
    console.error('Error fetching complaint changes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch complaint changes' },
      { status: 500 }
    )
  }
}
