/**
 * Prisma Client Mock for Unit and Integration Testing
 *
 * This module provides a deeply mocked Prisma client using jest-mock-extended.
 * All Prisma models and methods are automatically mocked.
 *
 * Usage:
 * ```typescript
 * import { prismaMock } from '@/tests/mocks/prisma'
 *
 * // In your test:
 * prismaMock.user.findUnique.mockResolvedValue({ id: '1', email: 'test@test.com' })
 * ```
 */

import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'
import { beforeEach, vi } from 'vitest'

// Create a deep mock of PrismaClient
export type MockPrismaClient = DeepMockProxy<PrismaClient>

export const prismaMock = mockDeep<PrismaClient>()

// Reset all mocks before each test
beforeEach(() => {
  mockReset(prismaMock)
})

// Mock the prisma module
vi.mock('@/lib/db/prisma', () => ({
  prisma: prismaMock,
  default: prismaMock,
}))

/**
 * Helper to create mock user data
 */
export function createMockUser(overrides: Partial<{
  id: string
  email: string
  fullName: string | null
  crmNumber: string | null
  crmState: string | null
  specialty: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}> = {}) {
  return {
    id: 'test-user-id',
    email: 'test@example.com',
    fullName: 'Test User',
    crmNumber: '12345',
    crmState: 'SP',
    specialty: 'Clínica Médica',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
}

/**
 * Helper to create mock syndrome data
 */
export function createMockSyndrome(overrides: Partial<{
  id: string
  name: string
  code: string
  description: string | null
  icon: string | null
  orderIndex: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}> = {}) {
  return {
    id: 'syndrome-1',
    name: 'Dor Torácica',
    code: 'DOR_TORACICA',
    description: 'Síndrome de dor torácica',
    icon: 'heart',
    orderIndex: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
}

/**
 * Helper to create mock checkbox data
 */
export function createMockCheckbox(overrides: Partial<{
  id: string
  syndromeId: string
  category: string
  displayText: string
  narrativeText: string
  isRequired: boolean
  isRedFlag: boolean
  isNegative: boolean
  orderIndex: number
  createdAt: Date
  updatedAt: Date
}> = {}) {
  return {
    id: 'checkbox-1',
    syndromeId: 'syndrome-1',
    category: 'QP',
    displayText: 'Dor precordial',
    narrativeText: 'Paciente refere dor precordial',
    isRequired: false,
    isRedFlag: false,
    isNegative: false,
    orderIndex: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
}

/**
 * Helper to create mock anamnese session data
 */
export function createMockAnamneseSession(overrides: Partial<{
  id: string
  userId: string
  syndromeId: string
  checkedItems: unknown
  generatedText: string | null
  outputMode: string
  redFlagsDetected: unknown
  createdAt: Date
  updatedAt: Date
}> = {}) {
  return {
    id: 'session-1',
    userId: 'test-user-id',
    syndromeId: 'syndrome-1',
    checkedItems: ['checkbox-1', 'checkbox-2'],
    generatedText: 'Paciente refere dor precordial.',
    outputMode: 'DETAILED',
    redFlagsDetected: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
}

/**
 * Helper to create mock chat conversation data
 */
export function createMockConversation(overrides: Partial<{
  id: string
  sessionId: string | null
  userId: string
  title: string | null
  contextSnapshot: unknown
  createdAt: Date
  updatedAt: Date
}> = {}) {
  return {
    id: 'conversation-1',
    sessionId: null,
    userId: 'test-user-id',
    title: 'Test Conversation',
    contextSnapshot: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
}

/**
 * Helper to create mock chat message data
 */
export function createMockMessage(overrides: Partial<{
  id: string
  conversationId: string
  role: 'USER' | 'ASSISTANT'
  content: string
  citations: unknown
  createdAt: Date
}> = {}) {
  return {
    id: 'message-1',
    conversationId: 'conversation-1',
    role: 'USER' as const,
    content: 'What are the red flags for chest pain?',
    citations: null,
    createdAt: new Date(),
    ...overrides,
  }
}

/**
 * Helper to create mock complaint data
 */
export function createMockComplaint(overrides: Partial<{
  id: string
  group_id: string | null
  code: string
  name_pt: string
  name_en: string | null
  icd10_codes: string[]
  syndrome_id: string | null
  created_at: Date
  updated_at: Date
}> = {}) {
  return {
    id: 'complaint-1',
    group_id: null,
    code: 'DOR_TORACICA',
    name_pt: 'Dor Torácica',
    name_en: 'Chest Pain',
    icd10_codes: ['R07.9'],
    syndrome_id: 'syndrome-1',
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  }
}

export default prismaMock
