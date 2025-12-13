import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { withApiAuth } from '@/lib/api/auth'
import { buildSessionContext } from '@/lib/ai/context'
import { createApiError, createValidationError } from '@/lib/api/errors'
import { CRM_PUBLIC_ERROR_MESSAGE, isCrmValidationError } from '@/lib/auth/user-bootstrap'
import { logger } from '@/lib/logging'

// POST /api/chat/conversations - Create a new conversation
export const POST = withApiAuth(async (req: Request, _ctx, user) => {
  try {
    const body = await req.json()
    const { sessionId } = body as { sessionId?: string }

    let contextSnapshot = null

    // If sessionId provided, fetch session data for context
    if (sessionId) {
      // First fetch by id, then verify ownership
      const session = await prisma.anamneseSession.findUnique({
        where: { id: sessionId },
        include: {
          syndrome: {
            include: {
              checkboxes: true,
            },
          },
        },
      })

      // Verify ownership
      if (session && session.userId !== user.id) {
        return NextResponse.json(
          createApiError('NOT_FOUND', 'Session not found'),
          { status: 404 }
        )
      }

      if (session) {
        const sessionContext = buildSessionContext(session)
        contextSnapshot = sessionContext.snapshot
      }
    }

    // Ensure user exists in database
    const { ensureDbUser } = await import('@/lib/auth/user-bootstrap')
    try {
      await ensureDbUser(user)
    } catch (error) {
      // Distinguish CRM validation errors from database errors
      if (isCrmValidationError(error)) {
        logger.error('CRM validation failed while creating conversation', {
          route: '/api/chat/conversations',
          event: 'POST.ensureDbUser',
          userId: user.id,
        }, error)
        return NextResponse.json(
          createValidationError(
            CRM_PUBLIC_ERROR_MESSAGE,
            [{ field: 'crm', message: CRM_PUBLIC_ERROR_MESSAGE }]
          ),
          { status: 400 }
        )
      }
      // Database or other unexpected errors return 500
      logger.error('Unexpected error in ensureDbUser', {
        route: '/api/chat/conversations',
        event: 'POST.ensureDbUser',
        userId: user.id,
      }, error)
      return NextResponse.json(
        createApiError('INTERNAL_ERROR', 'Failed to create conversation'),
        { status: 500 }
      )
    }

    const conversation = await prisma.chatConversation.create({
      data: {
        userId: user.id,
        sessionId: sessionId || null,
        contextSnapshot: contextSnapshot ?? undefined,
      },
    })

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'CHAT_CONVERSATION_CREATED',
        resourceType: 'ChatConversation',
        resourceId: conversation.id,
        metadata: { sessionId },
      },
    })

    return NextResponse.json(conversation)
  } catch (error) {
    logger.error('Error creating conversation', {
      route: '/api/chat/conversations',
      event: 'POST',
      userId: user.id,
    }, error)
    return NextResponse.json(
      createApiError('INTERNAL_ERROR', 'Failed to create conversation'),
      { status: 500 }
    )
  }
})

// GET /api/chat/conversations - List user's conversations
export const GET = withApiAuth(async (req: Request, _ctx, user) => {
  try {
    const { searchParams } = new URL(req.url)
    const rawLimit = parseInt(searchParams.get('limit') || '20', 10)

    // Enforce maximum page size and validate values
    const MAX_LIMIT = 100
    const limit = Math.min(Math.max(1, rawLimit), MAX_LIMIT)

    if (rawLimit < 1 || rawLimit > MAX_LIMIT) {
      return NextResponse.json(
        createValidationError(`Limit must be between 1 and ${MAX_LIMIT}`, [
          {
            field: 'limit',
            message: `Limit must be between 1 and ${MAX_LIMIT}`,
          },
        ]),
        { status: 400 }
      )
    }

    const conversations = await prisma.chatConversation.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      take: limit,
      include: {
        session: {
          select: {
            id: true,
            syndrome: {
              select: {
                name: true,
                code: true,
              },
            },
          },
        },
        _count: {
          select: { messages: true },
        },
      },
    })

    return NextResponse.json(conversations)
  } catch (error) {
    logger.error('Error listing conversations', {
      route: '/api/chat/conversations',
      event: 'GET',
      userId: user.id,
    }, error)
    return NextResponse.json(
      createApiError('INTERNAL_ERROR', 'Failed to list conversations'),
      { status: 500 }
    )
  }
})
