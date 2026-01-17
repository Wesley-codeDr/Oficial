import { test as setup, expect } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
  // Try to login first
  await page.goto('/login')

  // Fill login form
  await page.getByLabel('Email').fill('test-user@example.com')
  await page.getByLabel('Senha').fill('Password123!')
  await page.getByRole('button', { name: 'Entrar' }).click()

  // Check if login was successful (redirected to dashboard or similar)
  // If not (e.g. invalid credentials because user doesn't exist), try to register
  try {
    // Wait for a short time to see if we are redirected or see an error
    // If we see "Bem-vindo de volta" (login page header) or error message, we assume failed login
    // Ideally we wait for URL change or error message

    // We expect to be redirected to /dashboard or similar authenticated page
    // The middleware redirects to /dashboard if authenticated
    await expect(page).not.toHaveURL(/login/, { timeout: 3000 })
  } catch (e) {
    // Login failed, try to register
    console.log('Login failed, attempting to register new user...')

    await page.goto('/register')

    await page.getByLabel('Nome Completo').fill('Test User')
    await page.getByLabel('Email').fill('test-user@example.com')
    await page.getByLabel('Numero CRM').fill('123456')
    // Select CRM State (it's a select, might need specific handling for GlassSelect/Radix)
    // The GlassSelect likely uses a hidden select or custom trigger
    // Let's try to find the trigger button or use standard fill if it exposes a standard select (unlikely with Radix)
    // Looking at GlassSelect usage in register-form.tsx:
    // <GlassSelect ... options={stateOptions} ... />
    // Radix UI Select usually has a trigger role "combobox" or similar.
    // Let's try to click the trigger and select an option.
    // The label "UF" is associated with the select.

    // Attempting to select via label or directly finding the trigger
    await page.click('button[role="combobox"]') // Generic assumption for Radix Select trigger
    await page.getByRole('option', { name: 'SP' }).click() // Select SP

    await page.getByLabel('Senha').fill('Password123!')

    await page.getByRole('button', { name: 'Criar conta' }).click()

    // After registration, we might be redirected to login or auto-logged in.
    // The RegisterForm shows a success message with link to login: "Ir para o login"
    // So we need to click that link and then login again.

    await expect(page.getByText('Conta criada com sucesso!')).toBeVisible({ timeout: 10000 })
    await page.getByRole('link', { name: 'Ir para o login' }).click()

    // Now login again with the new account
    await page.getByLabel('Email').fill('test-user@example.com')
    await page.getByLabel('Senha').fill('Password123!')
    await page.getByRole('button', { name: 'Entrar' }).click()
  }

  // Verify we are logged in
  await expect(page).not.toHaveURL(/login/)
  // Maybe check for dashboard element
  // await expect(page.getByText('Dashboard')).toBeVisible() // Or similar

  // Save storage state
  await page.context().storageState({ path: authFile })
})
