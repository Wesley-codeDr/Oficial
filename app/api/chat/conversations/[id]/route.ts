import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'
import { createApiError } from '@/lib/api/errors'

// GET /api/chat/conversations/[id] - Get conversation with messages
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json(
        createApiError('UNAUTHORIZED', 'Unauthorized'),
        { status: 401 }
      )
    }

    const { id } = await params

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
    console.error('Error fetching conversation:', error)
    return NextResponse.json(
      createApiError('INTERNAL_ERROR', 'Failed to fetch conversation'),
      { status: 500 }
    )
  }
}

// DELETE /api/chat/conversations/[id] - Delete conversation
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json(
        createApiError('UNAUTHORIZED', 'Unauthorized'),
        { status: 401 }
      )
    }

    const { id } = await params

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
    console.error('Error deleting conversation:', error)
    return NextResponse.json(
      createApiError('INTERNAL_ERROR', 'Failed to delete conversation'),
      { status: 500 }
    )
  }
}
