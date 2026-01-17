
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Navigate to the login page
  await page.goto('/login');

  // Fill in the email and password
  await page.getByLabel(/email/i).fill(process.env.TEST_USER_EMAIL!);
  await page.getByLabel(/senha/i).fill(process.env.TEST_USER_PASSWORD!);

  // Click the login button
  await page.getByRole('button', { name: /entrar/i }).click();

  // Wait for the dashboard to load
  await expect(page.url()).toContain('/dashboard');

  // Save the authentication state
  await page.context().storageState({ path: authFile });
});

