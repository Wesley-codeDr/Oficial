/**
 * Supabase Client Mock for Unit and Integration Testing
 *
 * This module provides mocks for both server and browser Supabase clients.
 * Includes mock user and session data for authenticated test scenarios.
 *
 * Usage:
 * ```typescript
 * import { supabaseMock, mockUser, mockSession } from '@/tests/mocks/supabase'
 *
 * // Mock successful auth:
 * supabaseMock.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null })
 * ```
 */

import { vi } from 'vitest'

// ============================================================================
// Mock User and Session Data
// ============================================================================

/**
 * Mock authenticated user
 */
export const mockUser = {
  id: 'test-user-id',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'test@example.com',
  email_confirmed_at: new Date().toISOString(),
  phone: '',
  confirmed_at: new Date().toISOString(),
  last_sign_in_at: new Date().toISOString(),
  app_metadata: {
    provider: 'email',
    providers: ['email'],
  },
  user_metadata: {
    name: 'Test User',
    full_name: 'Test User',
  },
  identities: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

/**
 * Mock authenticated session
 */
export const mockSession = {
  access_token: 'test-access-token',
  refresh_token: 'test-refresh-token',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: 'bearer',
  user: mockUser,
}

/**
 * Create a custom mock user with overrides
 */
export function createMockUser(overrides: Partial<typeof mockUser> = {}) {
  return { ...mockUser, ...overrides }
}

/**
 * Create a custom mock session with overrides
 */
export function createMockSession(overrides: Partial<typeof mockSession> = {}) {
  return { ...mockSession, ...overrides }
}

// ============================================================================
// Supabase Client Mock
// ============================================================================

/**
 * Mock Supabase client with all commonly used methods
 */
export const supabaseMock = {
  auth: {
    getUser: vi.fn().mockResolvedValue({
      data: { user: mockUser },
      error: null,
    }),
    getSession: vi.fn().mockResolvedValue({
      data: { session: mockSession },
      error: null,
    }),
    signInWithPassword: vi.fn().mockResolvedValue({
      data: { user: mockUser, session: mockSession },
      error: null,
    }),
    signUp: vi.fn().mockResolvedValue({
      data: { user: mockUser, session: mockSession },
      error: null,
    }),
    signOut: vi.fn().mockResolvedValue({
      error: null,
    }),
    resetPasswordForEmail: vi.fn().mockResolvedValue({
      data: {},
      error: null,
    }),
    updateUser: vi.fn().mockResolvedValue({
      data: { user: mockUser },
      error: null,
    }),
    onAuthStateChange: vi.fn().mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    }),
    exchangeCodeForSession: vi.fn().mockResolvedValue({
      data: { session: mockSession },
      error: null,
    }),
  },
  from: vi.fn((table: string) => createTableMock(table)),
  storage: {
    from: vi.fn(() => ({
      upload: vi.fn().mockResolvedValue({ data: { path: 'test-path' }, error: null }),
      download: vi.fn().mockResolvedValue({ data: new Blob(), error: null }),
      remove: vi.fn().mockResolvedValue({ data: [], error: null }),
      getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl: 'https://example.com/file' } }),
    })),
  },
  rpc: vi.fn().mockResolvedValue({ data: null, error: null }),
}

/**
 * Create a chainable table mock for database operations
 */
function createTableMock(_table: string) {
  const chainMock: Record<string, ReturnType<typeof vi.fn>> = {}

  const methods = [
    'select',
    'insert',
    'update',
    'delete',
    'upsert',
    'eq',
    'neq',
    'gt',
    'gte',
    'lt',
    'lte',
    'like',
    'ilike',
    'is',
    'in',
    'contains',
    'containedBy',
    'range',
    'order',
    'limit',
    'single',
    'maybeSingle',
    'filter',
    'match',
    'or',
    'and',
    'not',
    'textSearch',
  ]

  methods.forEach((method) => {
    chainMock[method] = vi.fn().mockReturnValue(chainMock)
  })

  // Terminal methods that return promises
  chainMock.then = vi.fn().mockImplementation((resolve) =>
    resolve({ data: [], error: null })
  )

  return chainMock
}

// ============================================================================
// Server Functions Mock
// ============================================================================

/**
 * Mock for createServerClient function
 */
export const createServerClientMock = vi.fn().mockResolvedValue(supabaseMock)

/**
 * Mock for createAdminClient function
 */
export const createAdminClientMock = vi.fn().mockReturnValue(supabaseMock)

/**
 * Mock for getUser function
 */
export const getUserMock = vi.fn().mockResolvedValue(mockUser)

/**
 * Mock for getSession function
 */
export const getSessionMock = vi.fn().mockResolvedValue(mockSession)

/**
 * Mock for requireAuth function
 */
export const requireAuthMock = vi.fn().mockResolvedValue(mockUser)

// ============================================================================
// Module Mocks
// ============================================================================

// Mock the server Supabase module
vi.mock('@/lib/supabase/server', () => ({
  createServerClient: createServerClientMock,
  createAdminClient: createAdminClientMock,
  getUser: getUserMock,
  getSession: getSessionMock,
  requireAuth: requireAuthMock,
}))

// Mock the browser Supabase module
vi.mock('@/lib/supabase/client', () => ({
  createClient: vi.fn(() => supabaseMock),
  getClient: vi.fn(() => supabaseMock),
}))

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Reset all Supabase mocks to their default state
 */
export function resetSupabaseMocks() {
  // Reset auth mocks to successful state
  supabaseMock.auth.getUser.mockResolvedValue({
    data: { user: mockUser },
    error: null,
  })
  supabaseMock.auth.getSession.mockResolvedValue({
    data: { session: mockSession },
    error: null,
  })
  supabaseMock.auth.signInWithPassword.mockResolvedValue({
    data: { user: mockUser, session: mockSession },
    error: null,
  })
  supabaseMock.auth.signUp.mockResolvedValue({
    data: { user: mockUser, session: mockSession },
    error: null,
  })
  supabaseMock.auth.signOut.mockResolvedValue({ error: null })

  // Reset server function mocks
  getUserMock.mockResolvedValue(mockUser)
  getSessionMock.mockResolvedValue(mockSession)
  requireAuthMock.mockResolvedValue(mockUser)
}

/**
 * Mock unauthenticated state
 */
export function mockUnauthenticated() {
  supabaseMock.auth.getUser.mockResolvedValue({
    data: { user: null },
    error: { message: 'Not authenticated', status: 401 },
  })
  supabaseMock.auth.getSession.mockResolvedValue({
    data: { session: null },
    error: null,
  })
  getUserMock.mockResolvedValue(null)
  getSessionMock.mockResolvedValue(null)
  requireAuthMock.mockRejectedValue(new Error('UNAUTHORIZED'))
}

/**
 * Mock authentication error
 */
export function mockAuthError(message: string = 'Invalid login credentials') {
  supabaseMock.auth.signInWithPassword.mockResolvedValue({
    data: { user: null, session: null },
    error: { message, status: 400 },
  })
}

/**
 * Mock registration error
 */
export function mockRegistrationError(message: string = 'User already registered') {
  supabaseMock.auth.signUp.mockResolvedValue({
    data: { user: null, session: null },
    error: { message, status: 400 },
  })
}

export default supabaseMock
