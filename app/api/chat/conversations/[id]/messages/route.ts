import { NextResponse } from 'next/server'
import { streamText, type Message } from 'ai'
import { prisma } from '@/lib/db/prisma'
import { withApiAuth } from '@/lib/api/auth'
import { getChatModel, MODEL_CONFIG } from '@/lib/ai/config'
import { buildSystemPrompt } from '@/lib/ai/prompts'
import { buildContext, truncateMessageHistory } from '@/lib/ai/context'
import {
  validateMinimumData,
  validateUserMessage,
  postProcessResponse,
} from '@/lib/ai/guardrails'
import { extractCitations } from '@/lib/ai/citations'
import { createValidationError, createMinimumDataError, createApiError } from '@/lib/api/errors'
import { safeParseContextSnapshot } from '@/lib/ai/context-snapshot'
import { checkRateLimit, checkRateLimitInMemory } from '@/lib/rate-limit/rate-limiter'
import { buildContextFromSession } from '@/lib/chat/context'
import type { CheckboxCategory } from '@prisma/client'
import { logger } from '@/lib/logging'

// Use in-memory rate limiter only in development or when explicitly enabled
const USE_IN_MEMORY_RATE_LIMIT = process.env.USE_IN_MEMORY_RATE_LIMIT === 'true' || process.env.NODE_ENV === 'development'

// POST /api/chat/conversations/[id]/messages - Send message and get streaming response
export const POST = withApiAuth(async (
  req: Request,
  { params }: { params: { id: string } },
  user
) => {
  try {
    const { id: conversationId } = params
    const body = await req.json()
    const { content } = body as { content: string }

    // Validate user message
    const messageValidation = validateUserMessage(content)
    if (!messageValidation.isValid) {
      const errorResponse = createValidationError(
        'Mensagem inválida',
        messageValidation.errors.map((e) => ({ message: e }))
      )
      return NextResponse.json(errorResponse, { status: 400 })
    }

    // Check rate limit (distributed Postgres-based or in-memory fallback)
    const rateLimitCheck = USE_IN_MEMORY_RATE_LIMIT
      ? checkRateLimitInMemory(user.id)
      : await checkRateLimit(user.id)
    if (!rateLimitCheck.allowed) {
      const retryAfter = rateLimitCheck.retryAfter ?? 60
      const errorResponse = createApiError(
        'RATE_LIMIT_EXCEEDED',
        'Limite de requisições excedido. Tente novamente em alguns instantes.',
        undefined,
        { retryAfter }
      )
      return NextResponse.json(errorResponse, {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
        },
      })
    }

    // Fetch conversation with context using findFirst
    const conversation = await prisma.chatConversation.findFirst({
      where: { id: conversationId, userId: user.id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!conversation) {
      return NextResponse.json(createApiError('NOT_FOUND', 'Conversation not found'), {
        status: 404,
      })
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
    let checkedItemsForValidation: Array<{
      id: string
      category: CheckboxCategory
      displayText: string
      narrativeText: string
      isRedFlag: boolean
      isNegative: boolean
    }> = []

    if (conversation.contextSnapshot) {
      // Strict validation using Zod schema
      const parseResult = safeParseContextSnapshot(conversation.contextSnapshot)

      if (!parseResult.success) {
        const error = parseResult.error
        logger.error('Invalid contextSnapshot', {
          conversationId,
          userId: user.id,
          route: '/api/chat/conversations/[id]/messages',
          event: 'parseContextSnapshot',
        }, error)
        return NextResponse.json(
          createApiError(
            error?.code || 'INVALID_CONTEXT_SNAPSHOT',
            error?.message || 'O contexto da conversa está em formato inválido. Por favor, crie uma nova conversa.'
          ),
          { status: 400 }
        )
      }

      const typedSnapshot = parseResult.data!

      // Map validated items to CheckboxCategory type
      checkedItemsForValidation = typedSnapshot.checkedItems.map((item) => ({
        id: item.id,
        category: item.category,
        displayText: item.displayText,
        narrativeText: item.narrativeText,
        isRedFlag: item.isRedFlag,
        isNegative: item.isNegative,
      }))

      // Validate minimum data before proceeding
      const dataValidation = validateMinimumData(checkedItemsForValidation)
      if (!dataValidation.isValid) {
        const errorResponse = createMinimumDataError(
          dataValidation.errors,
          dataValidation.warnings
        )
        return NextResponse.json(errorResponse, { status: 400 })
      }

      contextText = buildContext({
        syndromeName: typedSnapshot.syndromeName,
        syndromeDescription: typedSnapshot.syndromeDescription,
        checkedItems: checkedItemsForValidation,
        generatedText: typedSnapshot.generatedText || '',
        redFlags: checkedItemsForValidation.filter((c) => c.isRedFlag),
      })
      redFlags = typedSnapshot.redFlags || []
    } else if (conversation.sessionId) {
      // If no snapshot but has session, build context from session
      const sessionContextResult = await buildContextFromSession(conversation.sessionId, user.id)

      if (!sessionContextResult.success) {
        logger.error('Failed to build context from session', {
          conversationId,
          sessionId: conversation.sessionId,
          userId: user.id,
          route: '/api/chat/conversations/[id]/messages',
          event: 'buildContextFromSession',
        }, sessionContextResult.error)
        return NextResponse.json(
          createApiError(sessionContextResult.error.code, sessionContextResult.error.message),
          { status: sessionContextResult.error.status }
        )
      }

      const sessionContext = sessionContextResult.data
      contextText = sessionContext.contextText
      redFlags = sessionContext.redFlags
      checkedItemsForValidation = sessionContext.checkedItems
    }

    // Build message history for context
    const messageHistory: Message[] = conversation.messages.map((msg) => ({
      id: msg.id,
      role: msg.role === 'USER' ? 'user' : 'assistant',
      content: msg.content,
    }))

    // Add current message
    messageHistory.push({
      id: 'current',
      role: 'user',
      content,
    })

    const boundedMessageHistory = truncateMessageHistory(messageHistory)

    // Build system prompt with context
    const systemPrompt = buildSystemPrompt(contextText, redFlags)

    // Stream the response
    const result = streamText({
      model: getChatModel(),
      system: systemPrompt,
      messages: boundedMessageHistory,
      temperature: MODEL_CONFIG.temperature,
      maxTokens: MODEL_CONFIG.maxTokens,
      onFinish: async ({ text }) => {
        try {
          // Post-process response to ensure disclaimer is present
          const processedText = postProcessResponse(text)
          const citations = extractCitations(processedText)

          // Save assistant message with post-processed content
          await prisma.chatMessage.create({
            data: {
              conversationId,
              role: 'ASSISTANT',
              content: processedText,
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
        } catch (streamPersistError) {
          logger.error('Failed to persist streamed chat message', {
            route: '/api/chat/conversations/[id]/messages',
            event: 'onFinish',
            userId: user.id,
            conversationId,
          }, streamPersistError)
        }
      },
    })

    return result.toDataStreamResponse()
  } catch (error) {
    logger.error('Error in chat stream', {
      route: '/api/chat/conversations/[id]/messages',
      event: 'POST',
      userId: user.id,
      conversationId: params.id,
    }, error)
    // Return structured error response with metadata for better diagnostics
    const errorResponse = createApiError('CHAT_STREAM_ERROR', 'Failed to process chat message')
    return NextResponse.json(errorResponse, { status: 500 })
  }
})

// GET /api/chat/conversations/[id]/messages - Get messages for a conversation
export const GET = withApiAuth(async (
  req: Request,
  { params }: { params: { id: string } },
  user
) => {
  try {
    const { id: conversationId } = params

    // Verify ownership using findFirst
    const conversation = await prisma.chatConversation.findFirst({
      where: { id: conversationId, userId: user.id },
    })

    if (!conversation) {
      return NextResponse.json(createApiError('NOT_FOUND', 'Conversation not found'), {
        status: 404,
      })
    }

    const messages = await prisma.chatMessage.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json(messages)
  } catch (error) {
    logger.error('Error fetching messages', {
      route: '/api/chat/conversations/[id]/messages',
      event: 'GET',
      userId: user.id,
    }, error)
    return NextResponse.json(createApiError('INTERNAL_ERROR', 'Failed to fetch messages'), {
      status: 500,
    })
  }
})
