/**
 * Playwright Authentication Fixture
 *
 * This module provides authenticated browser contexts for E2E testing.
 * It simulates a logged-in user by setting Supabase auth cookies/storage.
 *
 * Usage:
 * ```typescript
 * // In your test file:
 * import { test, expect, TEST_USER } from '../fixtures/auth'
 *
 * test('authenticated test', async ({ authenticatedPage }) => {
 *   await authenticatedPage.goto('/dashboard')
 *   // User is now authenticated
 * })
 * ```
 */

import { test as base, Page, BrowserContext } from '@playwright/test'

// ============================================================================
// Test User Configuration
// ============================================================================

/**
 * Test user data for E2E tests
 */
export const TEST_USER = {
  id: 'e2e-test-user-id-12345',
  email: 'e2e-test@wavewell.com',
  name: 'E2E Test User',
  fullName: 'E2E Test User',
  crmNumber: '123456',
  crmState: 'SP',
  specialty: 'Clínica Médica',
}

// ============================================================================
// Auth Token Generation
// ============================================================================

/**
 * Generate a Supabase-compatible auth token structure
 */
function createAuthToken() {
  const now = Date.now()
  const expiresAt = Math.floor(now / 1000) + 3600 // 1 hour from now

  return {
    access_token: `e2e-access-token-${now}`,
    refresh_token: `e2e-refresh-token-${now}`,
    expires_in: 3600,
    expires_at: expiresAt,
    token_type: 'bearer',
    user: {
      id: TEST_USER.id,
      aud: 'authenticated',
      role: 'authenticated',
      email: TEST_USER.email,
      email_confirmed_at: new Date().toISOString(),
      phone: '',
      confirmed_at: new Date().toISOString(),
      last_sign_in_at: new Date().toISOString(),
      app_metadata: {
        provider: 'email',
        providers: ['email'],
      },
      user_metadata: {
        name: TEST_USER.name,
        full_name: TEST_USER.fullName,
        crm_number: TEST_USER.crmNumber,
        crm_state: TEST_USER.crmState,
        specialty: TEST_USER.specialty,
      },
      identities: [
        {
          id: TEST_USER.id,
          user_id: TEST_USER.id,
          identity_data: {
            email: TEST_USER.email,
            sub: TEST_USER.id,
          },
          provider: 'email',
          last_sign_in_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  }
}

/**
 * Get the Supabase storage key based on the URL
 * Supabase uses a specific naming convention for auth tokens
 */
function getSupabaseStorageKey(): string {
  // Default key pattern for localhost development
  // Format: sb-{project-ref}-auth-token
  // For localhost, it's typically: sb-localhost-auth-token
  return 'sb-localhost-auth-token'
}

// ============================================================================
// Fixture Types
// ============================================================================

type AuthFixtures = {
  /**
   * A browser context with authentication cookies/storage pre-configured
   */
  authenticatedContext: BrowserContext

  /**
   * A page within the authenticated context
   */
  authenticatedPage: Page
}

// ============================================================================
// Extended Test with Auth Fixtures
// ============================================================================

/**
 * Extended Playwright test with authentication fixtures
 */
export const test = base.extend<AuthFixtures>({
  /**
   * Create an authenticated browser context
   */
  authenticatedContext: async ({ browser }, use) => {
    const authToken = createAuthToken()
    const storageKey = getSupabaseStorageKey()

    // Create context with pre-configured storage state
    const context = await browser.newContext({
      storageState: {
        cookies: [
          {
            name: storageKey,
            value: JSON.stringify(authToken),
            domain: 'localhost',
            path: '/',
            httpOnly: false,
            secure: false,
            sameSite: 'Lax',
            expires: authToken.expires_at,
          },
          // Also set as base64 encoded cookie (some Supabase versions use this)
          {
            name: `${storageKey}-code-verifier`,
            value: '',
            domain: 'localhost',
            path: '/',
            httpOnly: false,
            secure: false,
            sameSite: 'Lax',
            expires: authToken.expires_at,
          },
        ],
        origins: [
          {
            origin: 'http://localhost:3000',
            localStorage: [
              {
                name: storageKey,
                value: JSON.stringify(authToken),
              },
              // Store the user separately for easy access
              {
                name: 'wavewell-test-user',
                value: JSON.stringify(TEST_USER),
              },
            ],
          },
        ],
      },
    })

    await use(context)
    await context.close()
  },

  /**
   * Create an authenticated page
   */
  authenticatedPage: async ({ authenticatedContext }, use) => {
    const page = await authenticatedContext.newPage()

    // Optional: Add request interception for API calls that verify auth
    // This can help bypass actual auth verification in tests
    await page.route('**/api/auth/**', async (route) => {
      const url = route.request().url()

      // Mock auth session endpoint
      if (url.includes('/auth/session')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            user: TEST_USER,
            session: createAuthToken(),
          }),
        })
        return
      }

      // Mock user endpoint
      if (url.includes('/auth/user')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ user: TEST_USER }),
        })
        return
      }

      // Continue with other requests
      await route.continue()
    })

    await use(page)
  },
})

// ============================================================================
// Re-export expect for convenience
// ============================================================================

export { expect } from '@playwright/test'

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Create a custom authenticated context with specific user data
 */
export async function createAuthenticatedContext(
  browser: BrowserContext['browser'],
  customUser: Partial<typeof TEST_USER> = {}
): Promise<BrowserContext> {
  const user = { ...TEST_USER, ...customUser }
  const authToken = createAuthToken()
  authToken.user.id = user.id
  authToken.user.email = user.email
  authToken.user.user_metadata = {
    name: user.name,
    full_name: user.fullName,
    crm_number: user.crmNumber,
    crm_state: user.crmState,
    specialty: user.specialty,
  }

  const storageKey = getSupabaseStorageKey()

  return browser!.newContext({
    storageState: {
      cookies: [
        {
          name: storageKey,
          value: JSON.stringify(authToken),
          domain: 'localhost',
          path: '/',
          httpOnly: false,
          secure: false,
          sameSite: 'Lax',
          expires: authToken.expires_at,
        },
      ],
      origins: [
        {
          origin: 'http://localhost:3000',
          localStorage: [
            {
              name: storageKey,
              value: JSON.stringify(authToken),
            },
          ],
        },
      ],
    },
  })
}

/**
 * Wait for authentication to be ready in the page
 * Use this after navigation if the app needs time to hydrate auth state
 */
export async function waitForAuth(page: Page, timeout: number = 5000): Promise<void> {
  await page.waitForFunction(
    (storageKey) => {
      const token = localStorage.getItem(storageKey)
      return token !== null
    },
    getSupabaseStorageKey(),
    { timeout }
  )
}

/**
 * Clear authentication from a page/context
 */
export async function clearAuth(page: Page): Promise<void> {
  const storageKey = getSupabaseStorageKey()

  await page.evaluate((key) => {
    localStorage.removeItem(key)
    // Clear all cookies
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
    })
  }, storageKey)
}

// ============================================================================
// Default Export
// ============================================================================

export default {
  test,
  expect,
  TEST_USER,
  createAuthenticatedContext,
  waitForAuth,
  clearAuth,
}
