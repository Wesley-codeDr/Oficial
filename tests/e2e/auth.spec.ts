import { test, expect } from '@playwright/test'

// Reset storage state for auth tests to ensure no user is logged in
test.use({ storageState: { cookies: [], origins: [] } })

test.describe('Authentication', () => {
  test('should show login page', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' })

    await expect(page).toHaveTitle(/WellWave/)
    // The "Bem-vindo de volta" heading is hidden on mobile (lg:block)
    // Check for the WellWave branding which is always visible
    await expect(page.getByText('WellWave').first()).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/senha/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /entrar/i })).toBeVisible()
  })

  test('should show register page', async ({ page }) => {
    await page.goto('/register', { waitUntil: 'domcontentloaded' })

    await expect(page).toHaveTitle(/Registro.*WellWave|WellWave/)
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/senha/i)).toBeVisible()
  })

  test('should show forgot password page', async ({ page }) => {
    await page.goto('/forgot-password', { waitUntil: 'domcontentloaded' })

    await expect(page).toHaveTitle(/WellWave/)
    // Check for the forgot password heading and email input
    await expect(page.getByText(/esqueceu sua senha/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
  })

  test('should redirect unauthenticated user to login', async ({ page }) => {
    await page.goto('/dashboard', { waitUntil: 'commit' })

    // Should be redirected to login
    await expect(page).toHaveURL(/login/, { timeout: 30000 })
  })

  test('should have link to register from login page', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' })

    const registerLink = page.getByRole('link', { name: /criar conta/i })
    await expect(registerLink).toBeVisible()
    await expect(registerLink).toHaveAttribute('href', '/register')
  })

  test('should have link to forgot password from login page', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' })

    // The link text is "Esqueceu a senha?" - use partial match
    const forgotLink = page.getByRole('link', { name: /esquec/i })
    await expect(forgotLink).toBeVisible()
    await expect(forgotLink).toHaveAttribute('href', '/forgot-password')
  })

  test('should require email field', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' })

    const emailInput = page.getByLabel(/email/i)
    await expect(emailInput).toHaveAttribute('required', '')
  })

  test('should require password field', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' })

    const passwordInput = page.getByLabel(/senha/i)
    await expect(passwordInput).toHaveAttribute('required', '')
  })
})
