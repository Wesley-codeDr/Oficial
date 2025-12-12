import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'
import { buildContext, extractRedFlags } from '@/lib/ai/context'
import { validateCrmData } from '@/lib/auth/validation'

// POST /api/chat/conversations - Create a new conversation
export async function POST(req: Request) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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
        return NextResponse.json({ error: 'Session not found' }, { status: 404 })
      }

      if (session) {
        const checkedIds = session.checkedItems as string[]
        const checkedItems = session.syndrome.checkboxes.filter((cb) =>
          checkedIds.includes(cb.id)
        )
        const redFlags = checkedItems.filter((cb) => cb.isRedFlag)

        contextSnapshot = {
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
    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    })

    if (!dbUser) {
      // Validate CRM data using shared helper
      try {
        const { crmNumber, crmState } = validateCrmData(user.user_metadata || {})
        dbUser = await prisma.user.create({
          data: {
            id: user.id,
            email: user.email!,
            fullName: user.user_metadata?.full_name || 'Usuario',
            crmNumber,
            crmState,
          },
        })
      } catch (error) {
        return NextResponse.json(
          {
            error: error instanceof Error ? error.message : 'Dados de CRM inválidos',
          },
          { status: 400 }
        )
      }
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
      { error: 'Failed to create conversation' },
      { status: 500 }
    )
  }
}

// GET /api/chat/conversations - List user's conversations
export async function GET(req: Request) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const rawLimit = parseInt(searchParams.get('limit') || '20', 10)

    // Enforce maximum page size and validate values
    const MAX_LIMIT = 100
    const limit = Math.min(Math.max(1, rawLimit), MAX_LIMIT)

    if (rawLimit < 1 || rawLimit > MAX_LIMIT) {
      return NextResponse.json(
        { error: `Limit must be between 1 and ${MAX_LIMIT}` },
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
      { error: 'Failed to list conversations' },
      { status: 500 }
    )
  }
}
