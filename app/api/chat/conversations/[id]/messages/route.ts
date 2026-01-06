import { streamText, type CoreMessage } from 'ai'
import { prisma } from '@/lib/db/prisma'
import { getUser } from '@/lib/supabase/server'
import { openai, DEFAULT_MODEL, MODEL_CONFIG } from '@/lib/ai/config'
import { buildSystemPrompt } from '@/lib/ai/prompts'
import { buildContext, extractRedFlags } from '@/lib/ai/context'
import {
  validateMinimumData,
  validateUserMessage,
  DISCLAIMER_TEXT,
} from '@/lib/ai/guardrails'
import { extractCitations } from '@/lib/ai/citations'

// POST /api/chat/conversations/[id]/messages - Send message and get streaming response
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUser()

    if (!user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const { id: conversationId } = await params
    const body = await req.json()
    const { content } = body as { content: string }

    // Validate user message
    const messageValidation = validateUserMessage(content)
    if (!messageValidation.isValid) {
      return new Response(
        JSON.stringify({ error: messageValidation.errors[0] }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Fetch conversation with context
    const conversation = await prisma.chatConversation.findUnique({
      where: { id: conversationId, userId: user.id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!conversation) {
      return new Response('Conversation not found', { status: 404 })
    }

    // Save user message
    await prisma.chatMessage.create({
      data: {
        conversationId,
        role: 'USER',
        content,
      },
    })

    // Build context from snapshot
    let contextText = ''
    let redFlags: string[] = []

    if (conversation.contextSnapshot) {
      const snapshot = conversation.contextSnapshot as {
        syndromeName: string
        syndromeDescription?: string
        checkedItems: Array<{
          id: string
          category: string
          displayText: string
          narrativeText: string
          isRedFlag: boolean
          isNegative: boolean
        }>
        generatedText: string
        redFlags: string[]
      }

      contextText = buildContext({
        syndromeName: snapshot.syndromeName,
        syndromeDescription: snapshot.syndromeDescription,
        checkedItems: snapshot.checkedItems as Parameters<typeof buildContext>[0]['checkedItems'],
        generatedText: snapshot.generatedText,
        redFlags: snapshot.checkedItems.filter((c) => c.isRedFlag) as Parameters<typeof buildContext>[0]['redFlags'],
      })
      redFlags = snapshot.redFlags || []
    }

    // Build message history for context
    const messageHistory: CoreMessage[] = conversation.messages.map((msg) => ({
      role: msg.role === 'USER' ? 'user' : 'assistant',
      content: msg.content,
    }))

    // Add current message
    messageHistory.push({
      role: 'user',
      content,
    })

    // Build system prompt with context
    const systemPrompt = buildSystemPrompt(contextText, redFlags)

    // Stream the response
    const result = streamText({
      model: openai(DEFAULT_MODEL),
      system: systemPrompt,
      messages: messageHistory,
      temperature: MODEL_CONFIG.temperature,
      maxCompletionTokens: MODEL_CONFIG.maxTokens,
      onFinish: async ({ text }) => {
        // Save assistant message after streaming completes
        const citations = extractCitations(text)

        await prisma.chatMessage.create({
          data: {
            conversationId,
            role: 'ASSISTANT',
            content: text,
            citations: citations.length > 0 ? citations : undefined,
          },
        })

        // Update conversation timestamp
        await prisma.chatConversation.update({
          where: { id: conversationId },
          data: { updatedAt: new Date() },
        })

        // Audit log
        await prisma.auditLog.create({
          data: {
            userId: user.id,
            action: 'CHAT_MESSAGE_SENT',
            resourceType: 'ChatConversation',
            resourceId: conversationId,
            metadata: {
              messageLength: content.length,
              responseLength: text.length,
              citationCount: citations.length,
            },
          },
        })
      },
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Error in chat:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

// GET /api/chat/conversations/[id]/messages - Get messages for a conversation
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUser()

    if (!user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const { id: conversationId } = await params

    // Verify ownership
    const conversation = await prisma.chatConversation.findUnique({
      where: { id: conversationId, userId: user.id },
    })

    if (!conversation) {
      return new Response('Conversation not found', { status: 404 })
    }

    const messages = await prisma.chatMessage.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
    })

    return Response.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
