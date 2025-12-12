import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { requireApiUser } from '@/lib/api/auth'
import { buildContext, extractRedFlags } from '@/lib/ai/context'
import { createApiError, createValidationError } from '@/lib/api/errors'

// POST /api/chat/conversations - Create a new conversation
export async function POST(req: Request) {
  try {
    const auth = await requireApiUser()
    if (auth.error) return auth.error
    const { user } = auth

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
        const checkedIds = session.checkedItems as string[]
        const checkedItems = session.syndrome.checkboxes.filter((cb) =>
          checkedIds.includes(cb.id)
        )
        const redFlags = checkedItems.filter((cb) => cb.isRedFlag)

        contextSnapshot = {
          version: 1, // Explicitly set version for schema compliance
          syndromeName: session.syndrome.name,
          syndromeDescription: session.syndrome.description,
          checkedItems: checkedItems.map((cb) => ({
            id: cb.id,
            category: cb.category,
            displayText: cb.displayText,
            narrativeText: cb.narrativeText,
            isRedFlag: cb.isRedFlag,
            isNegative: cb.isNegative,
          })),
          generatedText: session.generatedText || '',
          redFlags: redFlags.map((rf) => rf.displayText),
        }
      }
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
    console.error('Error creating conversation:', error)
    return NextResponse.json(
      createApiError('INTERNAL_ERROR', 'Failed to create conversation'),
      { status: 500 }
    )
  }
}

// GET /api/chat/conversations - List user's conversations
export async function GET(req: Request) {
  try {
    const auth = await requireApiUser()
    if (auth.error) return auth.error
    const { user } = auth

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
    console.error('Error listing conversations:', error)
    return NextResponse.json(
      createApiError('INTERNAL_ERROR', 'Failed to list conversations'),
      { status: 500 }
    )
  }
}
