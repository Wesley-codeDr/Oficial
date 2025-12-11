import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should show login page', async ({ page }) => {
    await page.goto('/login')

    await expect(page).toHaveTitle(/Login.*WellWave/)
    await expect(page.getByRole('heading', { name: /bem-vindo/i })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/senha/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /entrar/i })).toBeVisible()
  })

  test('should show register page', async ({ page }) => {
    await page.goto('/register')

    await expect(page).toHaveTitle(/Registro.*WellWave|WellWave/)
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/senha/i)).toBeVisible()
  })

  test('should show forgot password page', async ({ page }) => {
    await page.goto('/forgot-password')

    await expect(page).toHaveTitle(/WellWave/)
    await expect(page.getByLabel(/email/i)).toBeVisible()
  })

  test('should redirect unauthenticated user to login', async ({ page }) => {
    await page.goto('/dashboard')

    // Should be redirected to login
    await expect(page).toHaveURL(/login/)
  })

  test('should have link to register from login page', async ({ page }) => {
    await page.goto('/login')

    const registerLink = page.getByRole('link', { name: /criar conta/i })
    await expect(registerLink).toBeVisible()
    await expect(registerLink).toHaveAttribute('href', '/register')
  })

  test('should have link to forgot password from login page', async ({ page }) => {
    await page.goto('/login')

    const forgotLink = page.getByRole('link', { name: /esqueci/i })
    await expect(forgotLink).toBeVisible()
    await expect(forgotLink).toHaveAttribute('href', '/forgot-password')
  })

  test('should require email field', async ({ page }) => {
    await page.goto('/login')

    const emailInput = page.getByLabel(/email/i)
    await expect(emailInput).toHaveAttribute('required', '')
  })

  test('should require password field', async ({ page }) => {
    await page.goto('/login')

    const passwordInput = page.getByLabel(/senha/i)
    await expect(passwordInput).toHaveAttribute('required', '')
  })
})
