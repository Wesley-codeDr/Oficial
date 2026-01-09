/**
 * Chat Conversations API Endpoint Integration Tests
 *
 * Tests for /api/chat/conversations endpoints covering:
 * - POST /api/chat/conversations - Create new conversation
 * - GET /api/chat/conversations - List user's conversations
 * - Authentication and authorization
 * - Session context handling
 * - Error handling
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// ============================================================================
// Mocks with vi.hoisted
// ============================================================================

// Use vi.hoisted to define mocks before they're used in vi.mock
const mocks = vi.hoisted(() => ({
  conversationCreate: vi.fn(),
  conversationFindMany: vi.fn(),
  sessionFindUnique: vi.fn(),
  userFindUnique: vi.fn(),
  userCreate: vi.fn(),
  auditCreate: vi.fn(),
  getUser: vi.fn(),
}))

vi.mock('@/lib/db/prisma', () => ({
  prisma: {
    chatConversation: {
      create: mocks.conversationCreate,
      findMany: mocks.conversationFindMany,
    },
    anamneseSession: {
      findUnique: mocks.sessionFindUnique,
    },
    user: {
      findUnique: mocks.userFindUnique,
      create: mocks.userCreate,
    },
    auditLog: {
      create: mocks.auditCreate,
    },
  },
}))

vi.mock('@/lib/supabase/server', () => ({
  getUser: () => mocks.getUser(),
}))

vi.mock('@/lib/ai/context', () => ({
  buildContext: vi.fn(),
  extractRedFlags: vi.fn(),
}))

// ============================================================================
// Test Data
// ============================================================================

// Mock user data
const mockUser = {
  id: 'user-123',
  email: 'doctor@hospital.com',
  user_metadata: {
    full_name: 'Dr. Test',
    crm_number: '12345',
    crm_state: 'SP',
  },
}

// Mock conversation data
const mockConversation = {
  id: 'conv-123',
  userId: 'user-123',
  sessionId: null,
  contextSnapshot: null,
  title: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockConversationWithSession = {
  ...mockConversation,
  sessionId: 'session-123',
  contextSnapshot: {
    syndromeName: 'Dor Torácica',
    syndromeDescription: 'Evaluation of chest pain',
    checkedItems: [
      {
        id: 'cb-1',
        category: 'QP',
        displayText: 'Dor precordial',
        narrativeText: 'Paciente apresenta dor precordial',
        isRedFlag: true,
        isNegative: false,
      },
    ],
    generatedText: 'Generated narrative text',
    redFlags: ['Dor precordial'],
  },
  session: {
    id: 'session-123',
    syndrome: {
      name: 'Dor Torácica',
      code: 'DOR_TORACICA',
    },
  },
}

// Mock session data
const mockSession = {
  id: 'session-123',
  userId: 'user-123',
  syndromeId: 'syndrome-123',
  checkedItems: ['cb-1'],
  generatedText: 'Generated narrative text',
  syndrome: {
    name: 'Dor Torácica',
    description: 'Evaluation of chest pain',
    checkboxes: [
      {
        id: 'cb-1',
        category: 'QP',
        displayText: 'Dor precordial',
        narrativeText: 'Paciente apresenta dor precordial',
        isRedFlag: true,
        isNegative: false,
      },
      {
        id: 'cb-2',
        category: 'HDA',
        displayText: 'Início súbito',
        narrativeText: 'Início súbito dos sintomas',
        isRedFlag: false,
        isNegative: false,
      },
    ],
  },
}

// Import routes after mocks
import { POST, GET } from '@/app/api/chat/conversations/route'

// ============================================================================
// Test Utilities
// ============================================================================

function createMockRequestWithBody(body: Record<string, unknown>): Request {
  return new Request('http://localhost:3000/api/chat/conversations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

function createMockGetRequest(searchParams: Record<string, string> = {}): Request {
  const url = new URL('http://localhost:3000/api/chat/conversations')
  Object.entries(searchParams).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })
  return new Request(url.toString(), { method: 'GET' })
}

// ============================================================================
// POST /api/chat/conversations Tests
// ============================================================================

describe('POST /api/chat/conversations', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.getUser.mockResolvedValue(mockUser)
    mocks.userFindUnique.mockResolvedValue({ id: mockUser.id })
    mocks.conversationCreate.mockResolvedValue(mockConversation)
    mocks.auditCreate.mockResolvedValue({})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Authentication', () => {
    it('should return 401 when user is not authenticated', async () => {
      mocks.getUser.mockResolvedValue(null)

      const request = createMockRequestWithBody({})
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('should allow authenticated users', async () => {
      mocks.getUser.mockResolvedValue(mockUser)

      const request = createMockRequestWithBody({})
      const response = await POST(request)

      expect(response.status).toBe(200)
    })
  })

  describe('Creating conversation without session', () => {
    it('should create a new conversation', async () => {
      const request = createMockRequestWithBody({})
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.id).toBe(mockConversation.id)
    })

    it('should create conversation with null sessionId', async () => {
      const request = createMockRequestWithBody({})
      await POST(request)

      expect(mocks.conversationCreate).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: mockUser.id,
          sessionId: null,
        }),
      })
    })

    it('should create audit log entry', async () => {
      const request = createMockRequestWithBody({})
      await POST(request)

      expect(mocks.auditCreate).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: mockUser.id,
          action: 'CHAT_CONVERSATION_CREATED',
          resourceType: 'ChatConversation',
        }),
      })
    })
  })

  describe('Creating conversation with session', () => {
    beforeEach(() => {
      mocks.sessionFindUnique.mockResolvedValue(mockSession)
      mocks.conversationCreate.mockResolvedValue(mockConversationWithSession)
    })

    it('should create conversation linked to session', async () => {
      const request = createMockRequestWithBody({ sessionId: 'session-123' })
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.sessionId).toBe('session-123')
    })

    it('should fetch session data for context', async () => {
      const request = createMockRequestWithBody({ sessionId: 'session-123' })
      await POST(request)

      expect(mocks.sessionFindUnique).toHaveBeenCalledWith({
        where: { id: 'session-123', userId: mockUser.id },
        include: {
          syndrome: {
            include: {
              checkboxes: true,
            },
          },
        },
      })
    })

    it('should include context snapshot with session data', async () => {
      const request = createMockRequestWithBody({ sessionId: 'session-123' })
      await POST(request)

      expect(mocks.conversationCreate).toHaveBeenCalledWith({
        data: expect.objectContaining({
          contextSnapshot: expect.objectContaining({
            syndromeName: 'Dor Torácica',
            checkedItems: expect.any(Array),
            redFlags: expect.any(Array),
          }),
        }),
      })
    })

    it('should extract red flags from checked items', async () => {
      const request = createMockRequestWithBody({ sessionId: 'session-123' })
      await POST(request)

      const createCall = mocks.conversationCreate.mock.calls[0][0]
      expect(createCall.data.contextSnapshot.redFlags).toContain('Dor precordial')
    })

    it('should handle non-existent session gracefully', async () => {
      mocks.sessionFindUnique.mockResolvedValue(null)

      const request = createMockRequestWithBody({ sessionId: 'non-existent' })
      const response = await POST(request)

      // Should still create conversation, just without context
      expect(response.status).toBe(200)
    })
  })

  describe('User creation', () => {
    it('should create user if not exists', async () => {
      mocks.userFindUnique.mockResolvedValue(null)
      mocks.userCreate.mockResolvedValue({ id: mockUser.id })

      const request = createMockRequestWithBody({})
      await POST(request)

      expect(mocks.userCreate).toHaveBeenCalledWith({
        data: expect.objectContaining({
          id: mockUser.id,
          email: mockUser.email,
        }),
      })
    })

    it('should not create user if already exists', async () => {
      mocks.userFindUnique.mockResolvedValue({ id: mockUser.id })

      const request = createMockRequestWithBody({})
      await POST(request)

      expect(mocks.userCreate).not.toHaveBeenCalled()
    })
  })

  describe('Error handling', () => {
    it('should handle database errors', async () => {
      mocks.conversationCreate.mockRejectedValue(new Error('Database error'))

      const request = createMockRequestWithBody({})
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to create conversation')
    })
  })
})

// ============================================================================
// GET /api/chat/conversations Tests
// ============================================================================

describe('GET /api/chat/conversations', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.getUser.mockResolvedValue(mockUser)
    mocks.conversationFindMany.mockResolvedValue([
      {
        ...mockConversation,
        session: null,
        _count: { messages: 5 },
      },
      {
        ...mockConversationWithSession,
        _count: { messages: 10 },
      },
    ])
  })

  describe('Authentication', () => {
    it('should return 401 when user is not authenticated', async () => {
      mocks.getUser.mockResolvedValue(null)

      const request = createMockGetRequest()
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })
  })

  describe('Listing conversations', () => {
    it('should return list of conversations', async () => {
      const request = createMockGetRequest()
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBe(2)
    })

    it('should filter by user ID', async () => {
      const request = createMockGetRequest()
      await GET(request)

      expect(mocks.conversationFindMany).toHaveBeenCalledWith({
        where: { userId: mockUser.id },
        orderBy: { updatedAt: 'desc' },
        take: expect.any(Number),
        include: expect.any(Object),
      })
    })

    it('should order by updatedAt desc', async () => {
      const request = createMockGetRequest()
      await GET(request)

      expect(mocks.conversationFindMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { updatedAt: 'desc' },
        })
      )
    })

    it('should include session info', async () => {
      const request = createMockGetRequest()
      await GET(request)

      expect(mocks.conversationFindMany).toHaveBeenCalledWith(
        expect.objectContaining({
          include: expect.objectContaining({
            session: expect.any(Object),
          }),
        })
      )
    })

    it('should include message count', async () => {
      const request = createMockGetRequest()
      await GET(request)

      expect(mocks.conversationFindMany).toHaveBeenCalledWith(
        expect.objectContaining({
          include: expect.objectContaining({
            _count: { select: { messages: true } },
          }),
        })
      )
    })
  })

  describe('Pagination', () => {
    it('should support limit parameter', async () => {
      const request = createMockGetRequest({ limit: '10' })
      await GET(request)

      expect(mocks.conversationFindMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 10,
        })
      )
    })

    it('should use default limit of 20', async () => {
      const request = createMockGetRequest()
      await GET(request)

      expect(mocks.conversationFindMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 20,
        })
      )
    })
  })

  describe('Error handling', () => {
    it('should handle database errors', async () => {
      mocks.conversationFindMany.mockRejectedValue(new Error('Database error'))

      const request = createMockGetRequest()
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to list conversations')
    })
  })
})

// ============================================================================
// Response Format Tests
// ============================================================================

describe('Response Format', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.getUser.mockResolvedValue(mockUser)
    mocks.userFindUnique.mockResolvedValue({ id: mockUser.id })
    mocks.conversationCreate.mockResolvedValue(mockConversation)
    mocks.conversationFindMany.mockResolvedValue([mockConversation])
    mocks.auditCreate.mockResolvedValue({})
  })

  it('should return JSON content type for POST', async () => {
    const request = createMockRequestWithBody({})
    const response = await POST(request)

    expect(response.headers.get('content-type')).toContain('application/json')
  })

  it('should return JSON content type for GET', async () => {
    const request = createMockGetRequest()
    const response = await GET(request)

    expect(response.headers.get('content-type')).toContain('application/json')
  })
})

// ============================================================================
// Integration Scenarios
// ============================================================================

describe('Integration Scenarios', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.getUser.mockResolvedValue(mockUser)
    mocks.userFindUnique.mockResolvedValue({ id: mockUser.id })
    mocks.sessionFindUnique.mockResolvedValue(mockSession)
    mocks.conversationCreate.mockResolvedValue(mockConversationWithSession)
    mocks.conversationFindMany.mockResolvedValue([mockConversationWithSession])
    mocks.auditCreate.mockResolvedValue({})
  })

  it('should create conversation with full session context and list it', async () => {
    // Create conversation
    const createRequest = createMockRequestWithBody({ sessionId: 'session-123' })
    const createResponse = await POST(createRequest)
    expect(createResponse.status).toBe(200)

    // List conversations
    const listRequest = createMockGetRequest()
    const listResponse = await GET(listRequest)
    const data = await listResponse.json()

    expect(listResponse.status).toBe(200)
    expect(data.length).toBeGreaterThan(0)
    expect(data[0].sessionId).toBe('session-123')
  })
})
