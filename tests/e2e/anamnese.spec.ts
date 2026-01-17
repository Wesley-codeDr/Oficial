import { test, expect } from '@playwright/test'
import { registerAndLoginUser } from './utils'

test.describe('Anamnese Flow (Public Access Check)', () => {
  test('should redirect unauthenticated user from anamnese page', async ({ page }) => {
    // Use waitUntil: 'commit' for faster response on redirect
    await page.goto('/anamnese/CHEST_PAIN', { waitUntil: 'commit' })

    // Should redirect to login since anamnese requires authentication
    // Wait for URL to change to login page
    await expect(page).toHaveURL(/login/, { timeout: 30000 })
  })

  test('should redirect unauthenticated user from dashboard', async ({ page }) => {
    await page.goto('/dashboard', { waitUntil: 'commit' })

    await expect(page).toHaveURL(/login/, { timeout: 30000 })
  })

  test('should redirect unauthenticated user from history', async ({ page }) => {
    await page.goto('/history', { waitUntil: 'commit' })

    await expect(page).toHaveURL(/login/, { timeout: 30000 })
  })
})

// Tests that require authentication would be structured like this
// These would need proper test fixtures with authenticated sessions
test.describe('Anamnese Flow (Authenticated)', () => {
  test.skip('should display syndrome selection page', async ({ page }) => {
    // TODO: Implement authenticated test
    // This test needs a proper auth fixture
  })

  test.skip('should show checkboxes for selected syndrome', async ({ page }) => {
    // TODO: Implement authenticated test
  })

  test('should generate narrative when checkboxes selected', async ({ page }) => {
    // Authenticate
    await registerAndLoginUser(page)

    // Navigate to Chest Pain syndrome
    await page.goto('/anamnese/CHEST_PAIN')

    // Handle Patient Context Modal
    // It opens automatically on load
    await expect(page.getByText('Contexto Clínico')).toBeVisible({ timeout: 10000 })

    // Start Anamnese
    await page.click('text=Iniciar Anamnese')

    // Wait for modal to close
    await expect(page.getByText('Contexto Clínico')).toBeHidden()

    // Select "Dor precordial" (QP)
    // Using a more specific selector if possible to avoid ambiguity,
    // but text locator is usually fine for buttons/divs with text.
    // The checkboxes are rendered as buttons with the text inside.
    await page.click('text=Dor precordial')

    // Select "Inicio subito" (QP)
    await page.click('text=Inicio subito')

    // Verify narrative preview
    // The narrative text is rendered in a <p> tag within the preview area.
    // We check if the narrative contains the selected texts converted to narrative format.
    // "Dor precordial" -> "dor precordial"
    // "Inicio subito" -> "inicio subito"

    // Wait for the narrative to update
    await expect(page.locator('.prose p')).toContainText('dor precordial')
    await expect(page.locator('.prose p')).toContainText('inicio subito')
  })

  test.skip('should detect red flags automatically', async ({ page }) => {
    // TODO: Implement authenticated test
  })

  test.skip('should allow switching between summary and detailed mode', async ({ page }) => {
    // TODO: Implement authenticated test
  })

  test.skip('should copy generated text to clipboard', async ({ page }) => {
    // TODO: Implement authenticated test
  })

  test.skip('should save session to history', async ({ page }) => {
    // TODO: Implement authenticated test
  })
})
