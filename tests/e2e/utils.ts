import { Page, expect } from '@playwright/test'

export async function registerAndLoginUser(page: Page) {
  const uniqueId = Date.now().toString()
  const email = `testuser${uniqueId}@example.com`
  const password = 'Password123!'
  const fullName = `Test User ${uniqueId}`
  const crmNumber = '12345'
  const crmState = 'SP'

  console.log(`Registering user: ${email}`)

  await page.goto('/register')

  // Fill registration form
  await page.fill('input[name="fullName"]', fullName)
  await page.fill('input[name="email"]', email)
  await page.fill('input[name="crmNumber"]', crmNumber)

  // Handle GlassSelect for State
  // The Select trigger usually has role="combobox" in Radix UI
  const stateSelectTrigger = page.locator('button[role="combobox"]').first()
  await stateSelectTrigger.click()

  // Select option "SP"
  await page.getByRole('option', { name: crmState, exact: true }).click()

  await page.fill('input[name="password"]', password)

  // Submit registration
  await page.click('button[type="submit"]')

  // Expect success message
  await expect(page.getByText('Conta criada com sucesso!')).toBeVisible({ timeout: 15000 })

  // Go to login
  await page.click('text=Ir para o login')

  // Login
  await page.fill('input[name="email"]', email)
  await page.fill('input[name="password"]', password)
  await page.click('button[type="submit"]')

  // Wait for dashboard redirect
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 30000 })

  return { email, password }
}
