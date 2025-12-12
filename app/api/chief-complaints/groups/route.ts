import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { requireApiUser } from '@/lib/api/auth'
import { createApiError } from '@/lib/api/errors'

// GET /api/chief-complaints/groups - List all active groups with complaint counts
export async function GET() {
  try {
    const auth = await requireApiUser()
    if (auth.error) return auth.error
    const { user } = auth

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
  } catch (error) {
    console.error('Error listing chief complaint groups:', error)
    return NextResponse.json(
      createApiError('INTERNAL_ERROR', 'Failed to list groups'),
      { status: 500 }
    )
  }
}





