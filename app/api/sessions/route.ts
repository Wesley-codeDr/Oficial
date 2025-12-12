import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'

// GET /api/sessions - List user's anamnese sessions
export async function GET(req: Request) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)
    const status = searchParams.get('status') // 'pending' | 'completed' | 'all'

    const where: Record<string, unknown> = { userId: user.id }

    if (status === 'pending') {
      where.completedAt = null
    } else if (status === 'completed') {
      where.completedAt = { not: null }
    }

    const [sessions, total] = await Promise.all([
      prisma.anamneseSession.findMany({
        where,
        orderBy: { startedAt: 'desc' },
        take: limit,
        skip: offset,
        include: {
          syndrome: {
            select: {
              id: true,
              name: true,
              code: true,
              icon: true,
            },
          },
        },
      }),
      prisma.anamneseSession.count({ where }),
    ])

    return NextResponse.json({
      sessions,
      total,
      limit,
      offset,
      hasMore: offset + sessions.length < total,
    })
  } catch (error) {
    console.error('Error listing sessions:', error)
    return NextResponse.json(
      { error: 'Failed to list sessions' },
      { status: 500 }
    )
  }
}

// POST /api/sessions - Create a new session
export async function POST(req: Request) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { syndromeId } = body as { syndromeId: string }

    if (!syndromeId) {
      return NextResponse.json(
        { error: 'syndromeId is required' },
        { status: 400 }
      )
    }

    // Verify syndrome exists
    const syndrome = await prisma.syndrome.findUnique({
      where: { id: syndromeId },
    })

    if (!syndrome) {
      return NextResponse.json(
        { error: 'Syndrome not found' },
        { status: 404 }
      )
    }

    // Ensure user exists in database
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
        syndromeId,
        checkedItems: [],
        outputMode: 'SUMMARY',
      },
      include: {
        syndrome: true,
      },
    })

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'ANAMNESE_SESSION_STARTED',
        resourceType: 'AnamneseSession',
        resourceId: session.id,
        metadata: { syndromeId },
      },
    })

    return NextResponse.json(session, { status: 201 })
  } catch (error) {
    console.error('Error creating session:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}
