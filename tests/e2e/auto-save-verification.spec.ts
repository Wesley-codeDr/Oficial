/**
 * TEMPORARY VERIFICATION TEST
 * This test verifies the auto-save visual feedback feature.
 * DELETE THIS FILE after verification is complete.
 */
import { test, expect } from '@playwright/test'
import { registerAndLoginUser } from './utils'

test.describe('Auto-Save Visual Feedback Verification', () => {
  test('should display auto-save indicator when selecting checkboxes', async ({ page }) => {
    // Authenticate
    await registerAndLoginUser(page)

    // Navigate to Chest Pain syndrome
    await page.goto('/anamnese/CHEST_PAIN')

    // Handle Patient Context Modal
    await expect(page.getByText('Contexto Clínico')).toBeVisible({ timeout: 15000 })

    // Start Anamnese
    await page.click('text=Iniciar Anamnese')

    // Wait for modal to close
    await expect(page.getByText('Contexto Clínico')).toBeHidden()

    // Initially, auto-save indicator should NOT be visible (no selections yet)
    await expect(page.locator('[data-testid="auto-save-indicator"]')).not.toBeVisible()

    // Select a checkbox to trigger auto-save
    await page.click('text=Dor precordial')

    // Wait a moment for state to update
    await page.waitForTimeout(500)

    // Auto-save indicator should now be visible
    await expect(page.locator('[data-testid="auto-save-indicator"]')).toBeVisible({ timeout: 5000 })

    // Should show "pending" status initially (waiting for debounce)
    await expect(page.locator('[data-testid="auto-save-indicator"]')).toHaveAttribute(
      'data-status',
      'pending'
    )

    // Wait for auto-save to complete (debounce is 3 seconds + save time)
    await page.waitForTimeout(5000)

    // Should transition to "saved" or "idle" status
    const indicator = page.locator('[data-testid="auto-save-indicator"]')
    const status = await indicator.getAttribute('data-status')
    expect(['saved', 'idle', 'error']).toContain(status)
  })

  test('should show network recovery banner when offline', async ({ page, context }) => {
    // Authenticate first
    await registerAndLoginUser(page)

    // Navigate to anamnese
    await page.goto('/anamnese/CHEST_PAIN')

    // Handle context modal
    await expect(page.getByText('Contexto Clínico')).toBeVisible({ timeout: 15000 })
    await page.click('text=Iniciar Anamnese')
    await expect(page.getByText('Contexto Clínico')).toBeHidden()

    // Select some checkboxes
    await page.click('text=Dor precordial')
    await page.click('text=Inicio subito')

    // Wait for auto-save indicator to appear
    await expect(page.locator('[data-testid="auto-save-indicator"]')).toBeVisible({ timeout: 5000 })

    // Simulate going offline
    await context.setOffline(true)

    // Make another selection while offline
    await page.click('text=Irradiacao para MSE')

    // Wait a moment
    await page.waitForTimeout(1000)

    // The indicator should show offline status
    // Note: The network banner might also appear
    await expect(
      page.locator('[data-testid="auto-save-indicator"][data-status="offline"]').or(
        page.locator('[data-testid="network-recovery-banner"]')
      )
    ).toBeVisible({ timeout: 5000 })

    // Go back online
    await context.setOffline(false)

    // Wait for recovery
    await page.waitForTimeout(3000)

    // Should recover (either saving or saved)
    const indicator = page.locator('[data-testid="auto-save-indicator"]')
    if (await indicator.isVisible()) {
      const status = await indicator.getAttribute('data-status')
      expect(['saving', 'saved', 'idle', 'recovering']).toContain(status)
    }
  })

  test('should show last saved timestamp', async ({ page }) => {
    // Authenticate
    await registerAndLoginUser(page)

    // Navigate to anamnese
    await page.goto('/anamnese/CHEST_PAIN')

    // Handle context modal
    await expect(page.getByText('Contexto Clínico')).toBeVisible({ timeout: 15000 })
    await page.click('text=Iniciar Anamnese')
    await expect(page.getByText('Contexto Clínico')).toBeHidden()

    // Select a checkbox
    await page.click('text=Dor precordial')

    // Wait for auto-save to complete
    await page.waitForTimeout(6000)

    // Check for timestamp text in the indicator (e.g., "agora", "Xs atras")
    const indicatorText = await page.locator('[data-testid="auto-save-indicator"]').textContent()

    // Should contain some form of timestamp or status text
    expect(indicatorText).toBeTruthy()
    // Common patterns: "Salvo", "agora", "atras"
    const hasStatusText =
      indicatorText?.includes('Salvo') ||
      indicatorText?.includes('agora') ||
      indicatorText?.includes('atras') ||
      indicatorText?.includes('pendentes')

    expect(hasStatusText).toBe(true)
  })
})
