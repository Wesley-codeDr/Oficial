/**
 * Complaints API Endpoint Integration Tests
 *
 * Tests for /api/complaints endpoints covering:
 * - GET /api/complaints - List complaints with filters
 * - GET /api/complaints/[id] - Get complaint by ID
 * - PUT /api/complaints/[id] - Update complaint
 * - Authentication and authorization
 * - Error handling
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'

// ============================================================================
// Mocks with vi.hoisted
// ============================================================================

// Use vi.hoisted to define mocks before they're used in vi.mock
const mocks = vi.hoisted(() => ({
  prismaFindMany: vi.fn(),
  prismaCount: vi.fn(),
  prismaFindFirst: vi.fn(),
  prismaUpdate: vi.fn(),
  prismaFindUnique: vi.fn(),
  prismaAuditCreate: vi.fn(),
  prismaTransaction: vi.fn(),
  getUser: vi.fn(),
}))

// Mock complaint group data
const mockComplaintGroup = {
  id: 'group-cv',
  code: 'CV',
  name_pt: 'Cardiovascular',
  name_en: 'Cardiovascular',
  description: 'Cardiovascular complaints',
}

// Mock complaint data
const mockDbComplaint = {
  id: 'complaint-1',
  code: 'DOR_TORACICA',
  name_pt: 'Dor Torácica',
  definition: 'Chest pain',
  group_id: 'group-cv',
  chief_complaint_groups: mockComplaintGroup,
  synonyms: ['chest pain', 'dor no peito'],
  icd10_codes: ['R07.9'],
  is_active: true,
  is_high_acuity: true,
  is_time_sensitive: true,
  requires_isolation: false,
  order_index: 1,
  additional_data: {
    metadata: {
      subtitle: 'Dor no peito',
      riskLevel: 'high',
      severity: 4,
    },
  },
  created_at: new Date(),
  updated_at: new Date(),
}

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

vi.mock('@/lib/db/prisma', () => ({
  prisma: {
    chief_complaints: {
      findMany: mocks.prismaFindMany,
      count: mocks.prismaCount,
      findFirst: mocks.prismaFindFirst,
      update: mocks.prismaUpdate,
    },
    chief_complaint_groups: {
      findUnique: mocks.prismaFindUnique,
    },
    auditLog: {
      create: mocks.prismaAuditCreate,
    },
    $transaction: mocks.prismaTransaction,
  },
}))

vi.mock('@/lib/supabase/server', () => ({
  getUser: () => mocks.getUser(),
}))

vi.mock('@/lib/db/complaints', () => ({
  mapDbComplaintToApiPayload: (complaint: typeof mockDbComplaint) => ({
    id: complaint.id,
    code: complaint.code,
    title: complaint.name_pt,
    group: complaint.chief_complaint_groups?.code,
    riskLevel: (complaint.additional_data as { metadata?: { riskLevel?: string } })?.metadata?.riskLevel || 'medium',
    isActive: complaint.is_active,
  }),
  parseAdditionalData: (data: unknown) => data || {},
  mergeAdditionalData: (current: unknown, update: unknown) => ({ ...current as object, ...update as object }),
}))

// Import routes after mocks
import { GET as getComplaints } from '@/app/api/complaints/route'
import { GET as getComplaintById, PUT as updateComplaint } from '@/app/api/complaints/[id]/route'

// ============================================================================
// Test Utilities
// ============================================================================

function createMockRequest(
  path: string,
  searchParams: Record<string, string> = {}
): NextRequest {
  const url = new URL(`http://localhost:3000${path}`)
  Object.entries(searchParams).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })
  return new NextRequest(url)
}

function createMockRequestWithBody(
  path: string,
  body: Record<string, unknown>,
  method: string = 'PUT'
): Request {
  return new Request(`http://localhost:3000${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

// ============================================================================
// GET /api/complaints Tests
// ============================================================================

describe('GET /api/complaints', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.getUser.mockResolvedValue(mockUser)
    mocks.prismaTransaction.mockResolvedValue([
      [mockDbComplaint],
      1,
    ])
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Authentication', () => {
    it('should return 401 when user is not authenticated', async () => {
      mocks.getUser.mockResolvedValue(null)

      const request = createMockRequest('/api/complaints')
      const response = await getComplaints(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('should allow authenticated users', async () => {
      mocks.getUser.mockResolvedValue(mockUser)

      const request = createMockRequest('/api/complaints')
      const response = await getComplaints(request)

      expect(response.status).toBe(200)
    })
  })

  describe('Basic listing', () => {
    it('should return list of complaints', async () => {
      const request = createMockRequest('/api/complaints')
      const response = await getComplaints(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data).toBeInstanceOf(Array)
      expect(data.data.length).toBe(1)
    })

    it('should return total count', async () => {
      const request = createMockRequest('/api/complaints')
      const response = await getComplaints(request)
      const data = await response.json()

      expect(data.total).toBe(1)
    })

    it('should return pagination info', async () => {
      const request = createMockRequest('/api/complaints')
      const response = await getComplaints(request)
      const data = await response.json()

      expect(data).toHaveProperty('limit')
      expect(data).toHaveProperty('offset')
    })
  })

  describe('Query parameters', () => {
    it('should support limit parameter', async () => {
      const request = createMockRequest('/api/complaints', { limit: '10' })
      await getComplaints(request)

      expect(mocks.prismaTransaction).toHaveBeenCalled()
    })

    it('should support offset parameter', async () => {
      const request = createMockRequest('/api/complaints', { offset: '20' })
      await getComplaints(request)

      expect(mocks.prismaTransaction).toHaveBeenCalled()
    })

    it('should support group filter', async () => {
      const request = createMockRequest('/api/complaints', { group: 'CV' })
      await getComplaints(request)

      expect(mocks.prismaTransaction).toHaveBeenCalled()
    })

    it('should support riskLevel filter', async () => {
      const request = createMockRequest('/api/complaints', { riskLevel: 'high' })
      await getComplaints(request)

      expect(mocks.prismaTransaction).toHaveBeenCalled()
    })

    it('should support search parameter', async () => {
      const request = createMockRequest('/api/complaints', { search: 'dor' })
      await getComplaints(request)

      expect(mocks.prismaTransaction).toHaveBeenCalled()
    })

    it('should support updatedSince filter', async () => {
      const request = createMockRequest('/api/complaints', {
        updatedSince: '2024-01-01T00:00:00Z',
      })
      await getComplaints(request)

      expect(mocks.prismaTransaction).toHaveBeenCalled()
    })
  })

  describe('Query validation', () => {
    it('should reject invalid limit', async () => {
      const request = createMockRequest('/api/complaints', { limit: '0' })
      const response = await getComplaints(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid query')
    })

    it('should reject invalid group code', async () => {
      const request = createMockRequest('/api/complaints', { group: 'INVALID' })
      const response = await getComplaints(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid query')
    })

    it('should reject invalid riskLevel', async () => {
      const request = createMockRequest('/api/complaints', {
        riskLevel: 'critical',
      })
      const response = await getComplaints(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid query')
    })
  })

  describe('Error handling', () => {
    it('should handle database errors', async () => {
      mocks.prismaTransaction.mockRejectedValue(new Error('Database error'))

      const request = createMockRequest('/api/complaints')
      const response = await getComplaints(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to list complaints')
    })
  })
})

// ============================================================================
// GET /api/complaints/[id] Tests
// ============================================================================

describe('GET /api/complaints/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.getUser.mockResolvedValue(mockUser)
    mocks.prismaFindFirst.mockResolvedValue(mockDbComplaint)
  })

  describe('Authentication', () => {
    it('should return 401 when user is not authenticated', async () => {
      mocks.getUser.mockResolvedValue(null)

      const request = new Request('http://localhost:3000/api/complaints/complaint-1')
      const response = await getComplaintById(request, {
        params: Promise.resolve({ id: 'complaint-1' }),
      })
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })
  })

  describe('Fetching complaint', () => {
    it('should return complaint by ID', async () => {
      const request = new Request('http://localhost:3000/api/complaints/complaint-1')
      const response = await getComplaintById(request, {
        params: Promise.resolve({ id: 'complaint-1' }),
      })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.id).toBe('complaint-1')
    })

    it('should return complaint by code', async () => {
      const request = new Request('http://localhost:3000/api/complaints/DOR_TORACICA')
      const response = await getComplaintById(request, {
        params: Promise.resolve({ id: 'DOR_TORACICA' }),
      })

      expect(response.status).toBe(200)
      expect(mocks.prismaFindFirst).toHaveBeenCalled()
    })

    it('should return 404 when complaint not found', async () => {
      mocks.prismaFindFirst.mockResolvedValue(null)

      const request = new Request('http://localhost:3000/api/complaints/non-existent')
      const response = await getComplaintById(request, {
        params: Promise.resolve({ id: 'non-existent' }),
      })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error).toBe('Complaint not found')
    })
  })

  describe('Error handling', () => {
    it('should handle database errors', async () => {
      mocks.prismaFindFirst.mockRejectedValue(new Error('Database error'))

      const request = new Request('http://localhost:3000/api/complaints/complaint-1')
      const response = await getComplaintById(request, {
        params: Promise.resolve({ id: 'complaint-1' }),
      })
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to fetch complaint')
    })
  })
})

// ============================================================================
// PUT /api/complaints/[id] Tests
// ============================================================================

describe('PUT /api/complaints/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.getUser.mockResolvedValue(mockUser)
    mocks.prismaFindFirst.mockResolvedValue(mockDbComplaint)
    mocks.prismaUpdate.mockResolvedValue(mockDbComplaint)
    mocks.prismaFindUnique.mockResolvedValue(mockComplaintGroup)
    mocks.prismaAuditCreate.mockResolvedValue({})
  })

  describe('Authentication', () => {
    it('should return 401 when user is not authenticated', async () => {
      mocks.getUser.mockResolvedValue(null)

      const request = createMockRequestWithBody('/api/complaints/complaint-1', {
        title: 'New Title',
      })
      const response = await updateComplaint(request, {
        params: Promise.resolve({ id: 'complaint-1' }),
      })
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })
  })

  describe('Updating complaint', () => {
    it('should update complaint title', async () => {
      const request = createMockRequestWithBody('/api/complaints/complaint-1', {
        title: 'Updated Title',
      })
      const response = await updateComplaint(request, {
        params: Promise.resolve({ id: 'complaint-1' }),
      })

      expect(response.status).toBe(200)
      expect(mocks.prismaUpdate).toHaveBeenCalled()
    })

    it('should update multiple fields', async () => {
      const request = createMockRequestWithBody('/api/complaints/complaint-1', {
        title: 'Updated Title',
        subtitle: 'Updated Subtitle',
        isActive: false,
      })
      const response = await updateComplaint(request, {
        params: Promise.resolve({ id: 'complaint-1' }),
      })

      expect(response.status).toBe(200)
      expect(mocks.prismaUpdate).toHaveBeenCalled()
    })

    it('should create audit log entry', async () => {
      const request = createMockRequestWithBody('/api/complaints/complaint-1', {
        title: 'Updated Title',
      })
      await updateComplaint(request, {
        params: Promise.resolve({ id: 'complaint-1' }),
      })

      expect(mocks.prismaAuditCreate).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: mockUser.id,
          action: 'CHIEF_COMPLAINT_UPDATED',
          resourceType: 'ChiefComplaint',
          resourceId: 'complaint-1',
        }),
      })
    })
  })

  describe('Validation', () => {
    it('should return 400 for invalid body', async () => {
      const request = new Request('http://localhost:3000/api/complaints/complaint-1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid json',
      })
      const response = await updateComplaint(request, {
        params: Promise.resolve({ id: 'complaint-1' }),
      })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid body')
    })

    it('should return 400 when no fields to update', async () => {
      const request = createMockRequestWithBody('/api/complaints/complaint-1', {})
      const response = await updateComplaint(request, {
        params: Promise.resolve({ id: 'complaint-1' }),
      })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('No fields to update')
    })

    it('should return 404 when complaint not found', async () => {
      mocks.prismaFindFirst.mockResolvedValue(null)

      const request = createMockRequestWithBody('/api/complaints/non-existent', {
        title: 'New Title',
      })
      const response = await updateComplaint(request, {
        params: Promise.resolve({ id: 'non-existent' }),
      })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error).toBe('Complaint not found')
    })

    it('should return 400 for non-existent group code', async () => {
      // Use a valid schema group code but mock DB to return null
      mocks.prismaFindUnique.mockResolvedValue(null)

      const request = createMockRequestWithBody('/api/complaints/complaint-1', {
        groupCode: 'GEN', // Valid schema value but group doesn't exist in DB
      })
      const response = await updateComplaint(request, {
        params: Promise.resolve({ id: 'complaint-1' }),
      })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid group code')
    })
  })

  describe('Error handling', () => {
    it('should handle database errors', async () => {
      mocks.prismaUpdate.mockRejectedValue(new Error('Database error'))

      const request = createMockRequestWithBody('/api/complaints/complaint-1', {
        title: 'New Title',
      })
      const response = await updateComplaint(request, {
        params: Promise.resolve({ id: 'complaint-1' }),
      })
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to update complaint')
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
    mocks.prismaTransaction.mockResolvedValue([[mockDbComplaint], 1])
    mocks.prismaFindFirst.mockResolvedValue(mockDbComplaint)
  })

  it('should return JSON content type for list', async () => {
    const request = createMockRequest('/api/complaints')
    const response = await getComplaints(request)

    expect(response.headers.get('content-type')).toContain('application/json')
  })

  it('should return JSON content type for single complaint', async () => {
    const request = new Request('http://localhost:3000/api/complaints/complaint-1')
    const response = await getComplaintById(request, {
      params: Promise.resolve({ id: 'complaint-1' }),
    })

    expect(response.headers.get('content-type')).toContain('application/json')
  })
})
