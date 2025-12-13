import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    navigationTimeout: 30000,
    actionTimeout: 10000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'pnpm run dev',
    url: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    env: {
      MOCK_AI: process.env.MOCK_AI || 'true',
      AI_PROVIDER: process.env.AI_PROVIDER || 'mock',
      OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'test-key',
      RATE_LIMIT_FAIL_OPEN: process.env.RATE_LIMIT_FAIL_OPEN || 'false',
    },
    reuseExistingServer: !process.env.CI,
  },
})
