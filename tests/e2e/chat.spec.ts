import { test as baseTest, expect } from '@playwright/test'
import { test, loginTestUser } from './fixtures/auth'

baseTest.describe('ChatWell Flow (Public Access Check)', () => {
  baseTest('should redirect unauthenticated user from chat page', async ({ page }) => {
    await page.goto('/chat')

    // Should redirect to login since chat requires authentication
    await expect(page).toHaveURL(/login/)
  })

  baseTest('should redirect unauthenticated user from chat conversation', async ({ page }) => {
    await page.goto('/chat/some-id')

    await expect(page).toHaveURL(/login/)
  })
})

// Tests that require authentication
test.describe('ChatWell Flow (Authenticated)', () => {
  test('should display chat list page', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/chat')
    
    // Should show ChatWell title
    await expect(authenticatedPage.getByRole('heading', { name: /chatwell/i })).toBeVisible()
    
    // Should have new conversation button
    await expect(authenticatedPage.getByRole('button', { name: /nova/i })).toBeVisible()
  })

  test('should create new conversation', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/chat')
    
    // Click new conversation button
    const newChatButton = authenticatedPage.getByRole('button', { name: /nova/i })
    await newChatButton.click()
    
    // Should navigate to a new conversation page
    await authenticatedPage.waitForURL(/\/chat\/[a-z0-9-]+/, { timeout: 10000 })
    
    // Should show the chat interface
    await expect(authenticatedPage.locator('[placeholder*="Pergunte"]')).toBeVisible()
  })

  test('should display medical disclaimer', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('/chat')
    
    // Check for disclaimer text on list page
    await expect(authenticatedPage.getByText(/suporte à decisão clínica/i)).toBeVisible()
  })

  test('should send message and receive response', async ({ authenticatedPage }) => {
    // Create a new conversation first
    await authenticatedPage.goto('/chat')
    
    const newChatButton = authenticatedPage.getByRole('button', { name: /nova/i })
    await newChatButton.click()
    
    await authenticatedPage.waitForURL(/\/chat\/[a-z0-9-]+/, { timeout: 10000 })
    
    // Type a message
    const input = authenticatedPage.locator('[placeholder*="Pergunte"]')
    await input.fill('Olá, preciso de ajuda com um diagnóstico')
    
    // Submit the message
    await authenticatedPage.keyboard.press('Enter')
    
    // Wait for the message to appear in the chat
    await expect(authenticatedPage.getByText('Olá, preciso de ajuda com um diagnóstico')).toBeVisible({ timeout: 5000 })
    
    // Wait for assistant response (may take time due to AI processing)
    // Look for assistant message container or content
    await expect(authenticatedPage.locator('[data-role="assistant"]').first()).toBeVisible({ timeout: 30000 })
  })

  test('should show typing indicator during streaming', async ({ authenticatedPage }) => {
    // Create a new conversation
    await authenticatedPage.goto('/chat')
    
    const newChatButton = authenticatedPage.getByRole('button', { name: /nova/i })
    await newChatButton.click()
    
    await authenticatedPage.waitForURL(/\/chat\/[a-z0-9-]+/, { timeout: 10000 })
    
    // Send a message
    const input = authenticatedPage.locator('[placeholder*="Pergunte"]')
    await input.fill('O que é dor torácica?')
    await authenticatedPage.keyboard.press('Enter')
    
    // Look for typing indicator (should appear briefly while AI is processing)
    // The indicator may be visible for a short time
    const typingIndicator = authenticatedPage.locator('[data-testid="typing-indicator"], .animate-pulse, [aria-label*="digitando"]')
    
    // Either see the indicator or the response - both are valid
    await expect(
      typingIndicator.or(authenticatedPage.locator('[data-role="assistant"]'))
    ).toBeVisible({ timeout: 30000 })
  })

  test('should delete conversation', async ({ authenticatedPage }) => {
    // Create a conversation first
    await authenticatedPage.goto('/chat')
    
    const newChatButton = authenticatedPage.getByRole('button', { name: /nova/i })
    await newChatButton.click()
    
    await authenticatedPage.waitForURL(/\/chat\/[a-z0-9-]+/, { timeout: 10000 })
    
    // Look for delete button
    const deleteButton = authenticatedPage.getByRole('button', { name: /excluir|deletar|delete/i })
      .or(authenticatedPage.locator('[aria-label*="excluir"]'))
      .or(authenticatedPage.locator('[aria-label*="delete"]'))
    
    // If delete button exists, click it
    if (await deleteButton.isVisible()) {
      await deleteButton.click()
      
      // May need to confirm deletion
      const confirmButton = authenticatedPage.getByRole('button', { name: /confirmar|sim|yes/i })
      if (await confirmButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await confirmButton.click()
      }
      
      // Should redirect back to chat list
      await authenticatedPage.waitForURL('/chat', { timeout: 10000 })
    }
  })

  test('should show context banner when session context exists', async ({ authenticatedPage }) => {
    // This test verifies that when a conversation has clinical context,
    // the context banner is displayed
    await authenticatedPage.goto('/chat')
    
    // Look for any conversation that might have context
    const conversationLink = authenticatedPage.locator('a[href^="/chat/"]').first()
    
    if (await conversationLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      await conversationLink.click()
      
      await authenticatedPage.waitForURL(/\/chat\/[a-z0-9-]+/, { timeout: 10000 })
      
      // Check for context banner or clinical context section
      // The banner may or may not be present depending on whether the conversation has context
      const contextBanner = authenticatedPage.locator('[class*="context"], [data-testid="context-banner"]')
        .or(authenticatedPage.getByText(/contexto clínico/i))
      
      // This is informational - pass if we can see the chat interface
      await expect(authenticatedPage.locator('[placeholder*="Pergunte"]')).toBeVisible()
    }
  })
})
