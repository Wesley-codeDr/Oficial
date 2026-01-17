import { test as baseTest, expect } from '@playwright/test'
import { test as authTest } from '../fixtures/auth.fixture'

baseTest.describe('Chat EBM Flow (Public Access Check)', () => {
  baseTest('should redirect unauthenticated user from chat page', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'commit' })

    // Should redirect to login since chat requires authentication
    await expect(page).toHaveURL(/login/, { timeout: 30000 })
  })

  baseTest('should redirect unauthenticated user from chat conversation', async ({ page }) => {
    await page.goto('/chat/some-id', { waitUntil: 'commit' })

    await expect(page).toHaveURL(/login/, { timeout: 30000 })
  })
})

// Tests that require authentication
authTest.describe('Chat EBM Flow (Authenticated)', () => {
  authTest('should display chat list page', async ({ page }) => {
    await page.goto('/chat')
    await expect(page).toHaveURL(/\/chat$/)
    await expect(page.getByRole('heading', { name: 'Chat EBM' })).toBeVisible()
    await expect(page.getByRole('button', { name: /nova conversa/i })).toBeVisible()
  })

  authTest('should create new conversation', async ({ page }) => {
    // We do not mock the API here so we test the full flow including DB creation.
    // This requires a working backend and database.

    await page.goto('/chat')
    await page.getByRole('button', { name: /nova conversa/i }).click()

    // Should navigate to the new conversation (UUID pattern)
    await expect(page).toHaveURL(/\/chat\/[0-9a-fA-F-]+/)
  })

  authTest('should display medical disclaimer', async ({ page }) => {
    await page.goto('/chat')
    // Check for "Aviso:" or similar text in the disclaimer banner
    await expect(page.getByText(/aviso:/i)).toBeVisible()
    await expect(page.getByText(/suporte a decisao clinica/i)).toBeVisible()
  })

  authTest('should send message and receive response', async ({ page }) => {
    // Mock the AI chat response to avoid using OpenAI tokens and ensuring deterministic output
    await page.route('/api/chat', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body: 'Resposta simulada do assistente.'
      })
    })

    await page.goto('/chat')

    // Click new chat to start a valid session
    await page.getByRole('button', { name: /nova conversa/i }).click()

    // Wait for navigation
    await expect(page).toHaveURL(/\/chat\/.+/)

    // Now send a message
    const input = page.getByPlaceholder(/pergunte/i)
    await input.fill('Ola, isso e um teste')

    await page.getByRole('button', { name: /enviar/i }).click()

    // Verify response appears
    await expect(page.getByText('Resposta simulada do assistente.')).toBeVisible()
  })

  // Keeping other tests skipped but updated to authTest for consistency
  authTest.skip('should show typing indicator during streaming', async ({ page: _page }) => {
    // TODO: Implement with auth fixture
  })

  authTest.skip('should display citations when present', async ({ page: _page }) => {
    // TODO: Implement with auth fixture
  })

  authTest.skip('should delete conversation', async ({ page: _page }) => {
    // TODO: Implement with auth fixture
  })

  authTest.skip('should show context banner when linked from anamnese', async ({ page: _page }) => {
    // TODO: Implement with auth fixture
  })
})
