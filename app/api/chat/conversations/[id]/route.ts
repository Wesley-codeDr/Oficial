import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { withApiAuth } from '@/lib/api/auth'
import { createApiError } from '@/lib/api/errors'
import { logger } from '@/lib/logging'

// GET /api/chat/conversations/[id] - Get conversation with messages
export const GET = withApiAuth(async (
  req: Request,
  { params }: { params: { id: string } },
  user
) => {
  try {
    const { id } = params

    // Use findFirst to support composite where clause
    const conversation = await prisma.chatConversation.findFirst({
      where: { id, userId: user.id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
        session: {
          select: {
            id: true,
            generatedText: true,
            syndrome: {
              select: {
                name: true,
                code: true,
                description: true,
              },
            },
          },
        },
      },
    })

    if (!conversation) {
      return NextResponse.json(
        createApiError('NOT_FOUND', 'Conversation not found'),
        { status: 404 }
      )
    }

    return NextResponse.json(conversation)
  } catch (error) {
    logger.error('Error fetching conversation', {
      route: '/api/chat/conversations/[id]',
      event: 'GET',
      userId: user.id,
    }, error)
    return NextResponse.json(
      createApiError('INTERNAL_ERROR', 'Failed to fetch conversation'),
      { status: 500 }
    )
  }
})

// DELETE /api/chat/conversations/[id] - Delete conversation
export const DELETE = withApiAuth(async (
  req: Request,
  { params }: { params: { id: string } },
  user
) => {
  try {
    const { id } = params

    // Verify ownership using findFirst
    const conversation = await prisma.chatConversation.findFirst({
      where: { id, userId: user.id },
    })

    if (!conversation) {
      return NextResponse.json(
        createApiError('NOT_FOUND', 'Conversation not found'),
        { status: 404 }
      )
    }

    await prisma.chatConversation.delete({
      where: { id },
    })

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'CHAT_CONVERSATION_DELETED',
        resourceType: 'ChatConversation',
        resourceId: id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Error deleting conversation', {
      route: '/api/chat/conversations/[id]',
      event: 'DELETE',
      userId: user.id,
    }, error)
    return NextResponse.json(
      createApiError('INTERNAL_ERROR', 'Failed to delete conversation'),
      { status: 500 }
    )
  }
})
