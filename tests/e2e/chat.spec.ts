import { test, expect } from '@playwright/test'

// Public access check - ensure no auth state is used
test.describe('Chat EBM Flow (Public Access Check)', () => {
  // Reset storage state for this block to simulate unauthenticated user
  test.use({ storageState: { cookies: [], origins: [] } })

  test('should redirect unauthenticated user from chat page', async ({ page }) => {
    await page.goto('/chat', { waitUntil: 'commit' })

    // Should redirect to login since chat requires authentication
    await expect(page).toHaveURL(/login/, { timeout: 30000 })
  })

  test('should redirect unauthenticated user from chat conversation', async ({ page }) => {
    await page.goto('/chat/some-id', { waitUntil: 'commit' })

    await expect(page).toHaveURL(/login/, { timeout: 30000 })
  })
})

// Tests that require authentication - will use the default storageState from config
test.describe('Chat EBM Flow (Authenticated)', () => {
  test('should display chat list page', async ({ page }) => {
    await page.goto('/chat')
    await expect(page).toHaveTitle(/Chat EBM/)
    await expect(page.getByRole('heading', { name: 'Chat EBM' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Nova Conversa' })).toBeVisible()
  })

  test('should create new conversation', async ({ page }) => {
    await page.goto('/chat')

    // Check if we are on the list page
    await expect(page.getByRole('button', { name: 'Nova Conversa' })).toBeVisible()

    // Click new chat
    await page.getByRole('button', { name: 'Nova Conversa' }).click()

    // Expect redirection to a new chat ID
    await expect(page).toHaveURL(/\/chat\/[\w-]+/)

    // Verify we are on the chat page
    await expect(page.getByPlaceholder('Pergunte sobre o caso clinico')).toBeVisible()
  })

  test('should display medical disclaimer', async ({ page }) => {
    await page.goto('/chat')
    await expect(page.getByText(/Aviso:/)).toBeVisible()
    await expect(page.getByText(/suporte a decisao clinica/)).toBeVisible()
  })

  test('should send message and receive response', async ({ page }) => {
    // Mock the AI response
    await page.route('/api/chat/conversations/*/messages', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body: 'Resposta simulada do assistente EBM.'
      })
    })

    await page.goto('/chat')
    await page.getByRole('button', { name: 'Nova Conversa' }).click()

    const input = page.getByPlaceholder('Pergunte sobre o caso clinico')
    await input.fill('Qual o tratamento para hipertensão?')

    // Click send
    await page.getByRole('button', { name: 'Enviar' }).click()

    // Check if user message appears
    await expect(page.getByText('Qual o tratamento para hipertensão?')).toBeVisible()

    // Check if assistant response appears
    await expect(page.getByText('Resposta simulada do assistente EBM.')).toBeVisible()
  })

  test('should show typing indicator during streaming', async ({ page }) => {
    // Mock delayed response
    await page.route('/api/chat/conversations/*/messages', async route => {
      // Delay the response
      await new Promise(resolve => setTimeout(resolve, 1000))
      await route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body: 'Resposta.'
      })
    })

    await page.goto('/chat')
    await page.getByRole('button', { name: 'Nova Conversa' }).click()

    const input = page.getByPlaceholder('Pergunte sobre o caso clinico')
    await input.fill('Teste typing')
    await page.keyboard.press('Enter')

    // Should show stop button (indicating loading)
    await expect(page.getByRole('button', { name: 'Parar' })).toBeVisible()
  })

  test('should display citations when present', async ({ page }) => {
    // Mock response with citations
    await page.route('/api/chat/conversations/*/messages', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body: 'O tratamento inclui IECA [1].\n\n[1] Diretriz Brasileira de Hipertensão.'
      })
    })

    await page.goto('/chat')
    await page.getByRole('button', { name: 'Nova Conversa' }).click()

    const input = page.getByPlaceholder('Pergunte sobre o caso clinico')
    await input.fill('Citações teste')
    await page.getByRole('button', { name: 'Enviar' }).click()

    await expect(page.getByText('O tratamento inclui IECA')).toBeVisible()
    await expect(page.getByText('Diretriz Brasileira')).toBeVisible()
  })

  test('should delete conversation', async ({ page }) => {
    // Need to handle confirm dialog
    page.on('dialog', dialog => dialog.accept())

    await page.goto('/chat')
    await page.getByRole('button', { name: 'Nova Conversa' }).click()

    // Wait for navigation to chat page
    await expect(page).toHaveURL(/\/chat\/[\w-]+/)

    // Find delete button by accessible name "Excluir conversa"
    await page.getByRole('button', { name: 'Excluir conversa' }).click()

    // Should redirect back to /chat list
    await expect(page).toHaveURL(/\/chat$/)

    // Optional: verify toast or absence of deleted chat (harder without ID tracking)
  })

  test.skip('should show context banner when linked from anamnese', async ({ page }) => {
    // TODO: Implement with auth fixture
    // This requires setting up an anamnese session and linking to chat.
    // Out of scope for current task as it requires significant data setup.
  })
})
