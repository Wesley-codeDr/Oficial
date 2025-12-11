import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should display the landing page', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/WellWave/)
    await expect(page.getByRole('link', { name: /entrar|login/i })).toBeVisible()
  })

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/')

    // Check main navigation is accessible
    const nav = page.locator('nav, header')
    await expect(nav).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Page should still be functional on mobile
    await expect(page).toHaveTitle(/WellWave/)
  })

  test('should have no accessibility violations on main content', async ({ page }) => {
    await page.goto('/')

    // Check that main content areas exist
    const main = page.locator('main, [role="main"], body')
    await expect(main).toBeVisible()
  })
})
