import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'

// GET /api/chief-complaints/groups - List all active groups with complaint counts
export async function GET() {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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
      { error: 'Failed to list groups' },
      { status: 500 }
    )
  }
}




