import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { requireApiUser } from '@/lib/api/auth'
import { createValidationError, createApiError } from '@/lib/api/errors'

// GET /api/sessions - List user's anamnese sessions
export async function GET(req: Request) {
  try {
    const auth = await requireApiUser()
    if (auth.error) return auth.error
    const { user } = auth

    const { searchParams } = new URL(req.url)
    const rawLimit = searchParams.get('limit')
    const rawOffset = searchParams.get('offset')
    const rawStatus = searchParams.get('status')

    // Validate status parameter
    const validStatuses = ['pending', 'completed', 'all'] as const
    type StatusType = typeof validStatuses[number]
    
    let status: StatusType = 'all' // Default to 'all' if not provided
    if (rawStatus) {
      if (!validStatuses.includes(rawStatus as StatusType)) {
        const errorResponse = createValidationError('Parâmetro status inválido', [
          {
            field: 'status',
            message: `Status deve ser um dos seguintes valores: ${validStatuses.join(', ')}`,
          },
        ])
        return NextResponse.json(errorResponse, { status: 400 })
      }
      status = rawStatus as StatusType
    }

    // Validate and parse limit
    const MAX_LIMIT = 100
    const limitValue = rawLimit ? parseInt(rawLimit, 10) : 20

    if (isNaN(limitValue) || limitValue < 1 || limitValue > MAX_LIMIT) {
      const errorResponse = createValidationError('Parâmetro limit inválido', [
        {
          field: 'limit',
          message: `Limit deve ser um número entre 1 e ${MAX_LIMIT}`,
        },
      ])
      return NextResponse.json(errorResponse, { status: 400 })
    }

    // Validate and parse offset
    const offsetValue = rawOffset ? parseInt(rawOffset, 10) : 0

    if (isNaN(offsetValue) || offsetValue < 0) {
      const errorResponse = createValidationError('Parâmetro offset inválido', [
        {
          field: 'offset',
          message: 'Offset deve ser um número maior ou igual a 0',
        },
      ])
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const limit = limitValue
    const offset = offsetValue

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
      status, // Include normalized status in response
      hasMore: offset + sessions.length < total,
    })
  } catch (error) {
    console.error('Error listing sessions:', error)
    return NextResponse.json(
      createApiError('INTERNAL_ERROR', 'Failed to list sessions'),
      { status: 500 }
    )
  }
}

// POST /api/sessions - Create a new session
export async function POST(req: Request) {
  try {
    const auth = await requireApiUser()
    if (auth.error) return auth.error
    const { user } = auth

    const body = await req.json()
    const { syndromeId } = body as { syndromeId: string }

    if (!syndromeId) {
      return NextResponse.json(
        createValidationError('syndromeId is required', [
          { field: 'syndromeId', message: 'syndromeId is required' },
        ]),
        { status: 400 }
      )
    }

    // Verify syndrome exists
    const syndrome = await prisma.syndrome.findUnique({
      where: { id: syndromeId },
    })

    if (!syndrome) {
      return NextResponse.json(
        createApiError('NOT_FOUND', 'Syndrome not found'),
        { status: 404 }
      )
    }

    // Ensure user exists in database
    const { ensureDbUser, isCrmValidationError } = await import('@/lib/auth/user-bootstrap')
    try {
      await ensureDbUser(user)
    } catch (error) {
      // Distinguish CRM validation errors from database errors
      if (isCrmValidationError(error)) {
        return NextResponse.json(
          createValidationError(
            error.message || 'Dados de CRM inválidos',
            [{ field: 'crm', message: error.message || 'Dados de CRM inválidos' }]
          ),
          { status: 400 }
        )
      }
      // Database or other unexpected errors return 500
      console.error('Unexpected error in ensureDbUser:', error)
      return NextResponse.json(
        createApiError('INTERNAL_ERROR', 'Failed to create session'),
        { status: 500 }
      )
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
      createApiError('INTERNAL_ERROR', 'Failed to create session'),
      { status: 500 }
    )
  }
}
