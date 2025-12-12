import { test as base, expect, type Page } from '@playwright/test'

// Test user credentials (should be created in test environment)
const TEST_USER = {
  email: process.env.TEST_USER_EMAIL || 'test@wellwave.com',
  password: process.env.TEST_USER_PASSWORD || 'testpassword123',
}

/**
 * Login helper function that can be used in tests
 */
export async function loginTestUser(page: Page): Promise<void> {
  await page.goto('/login')
  
  await page.getByLabel(/email/i).fill(TEST_USER.email)
  await page.getByLabel(/senha/i).fill(TEST_USER.password)
  await page.getByRole('button', { name: /entrar/i }).click()
  
  // Wait for redirect to dashboard or authenticated route
  await page.waitForURL(/\/(dashboard|chat|queixa|history)/, { timeout: 15000 })
}

/**
 * Extended test fixture with authenticated user
 */
export const test = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    await loginTestUser(page)
    await use(page)
  },
})

export { expect }

