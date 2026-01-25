import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'
import { buildContext, extractRedFlags } from '@/lib/ai/context'

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
      const session = await prisma.anamneseSession.findUnique({
        where: { id: sessionId, userId: user.id },
        include: {
          syndrome: {
            include: {
              checkboxes: true,
            },
          },
        },
      })

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
    // upsert is atomic and reduces database round trips
    const dbUser = await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        email: user.email!,
        fullName: user.user_metadata?.full_name || 'Usuario',
        crmNumber: user.user_metadata?.crm_number || '000000',
        crmState: user.user_metadata?.crm_state || 'SP',
      },
    })

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
    const limit = parseInt(searchParams.get('limit') || '20', 10)

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
