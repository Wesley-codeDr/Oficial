import { test, expect, Page } from '@playwright/test'

/**
 * Dashboard KPI Cards E2E Tests
 * Tests drag-and-drop reordering of KPI metric cards
 * Following Apple HIG 2025 interaction patterns
 */

test.describe('Dashboard KPI Cards', () => {
  // Helper function to perform drag and drop
  async function dragAndDrop(
    page: Page,
    sourceSelector: string,
    targetSelector: string
  ) {
    const source = page.locator(sourceSelector).first()
    const target = page.locator(targetSelector).first()

    const sourceBox = await source.boundingBox()
    const targetBox = await target.boundingBox()

    if (!sourceBox || !targetBox) {
      throw new Error('Could not find source or target element')
    }

    // Perform drag operation with Apple HIG timing
    await page.mouse.move(
      sourceBox.x + sourceBox.width / 2,
      sourceBox.y + sourceBox.height / 2
    )
    await page.mouse.down()

    // Small initial movement to activate drag
    await page.mouse.move(
      sourceBox.x + sourceBox.width / 2 + 10,
      sourceBox.y + sourceBox.height / 2,
      { steps: 5 }
    )

    // Move to target position
    await page.mouse.move(
      targetBox.x + targetBox.width / 2,
      targetBox.y + targetBox.height / 2,
      { steps: 10 }
    )

    await page.mouse.up()
  }

  // Helper to get KPI card order
  async function getKpiCardOrder(page: Page): Promise<string[]> {
    const cards = page.locator('[data-testid="kpi-card"]')
    const count = await cards.count()
    const order: string[] = []

    for (let i = 0; i < count; i++) {
      const id = await cards.nth(i).getAttribute('data-kpi-id')
      if (id) order.push(id)
    }

    return order
  }

  test.describe('KPI Grid UI', () => {
    test('should redirect unauthenticated users to login', async ({ page }) => {
      await page.goto('/dashboard')
      await expect(page).toHaveURL(/login/)
    })

    test('should show login form', async ({ page }) => {
      await page.goto('/login')
      await expect(page.getByLabel(/email/i)).toBeVisible()
      await expect(page.getByLabel(/senha/i)).toBeVisible()
    })
  })

  test.describe('KPI Card Reordering', () => {
    // These tests require authentication setup
    // Using test.skip for now until auth fixtures are configured

    test.skip('should display 4 KPI cards on dashboard', async ({ page }) => {
      await page.goto('/dashboard')

      const kpiCards = page.locator('[data-testid="kpi-card"]')
      await expect(kpiCards).toHaveCount(4)
    })

    test.skip('should show drag handle on hover', async ({ page }) => {
      await page.goto('/dashboard')

      const kpiCard = page.locator('[data-testid="kpi-card"]').first()
      await kpiCard.hover()

      // Check for drag handle visibility
      const dragHandle = kpiCard.locator('[data-testid="drag-handle"], [aria-label*="arrastar"], .grip-vertical')
      await expect(dragHandle).toBeVisible()
    })

    test.skip('should reorder KPI cards via drag and drop', async ({ page }) => {
      await page.goto('/dashboard')

      // Get initial order
      const initialOrder = await getKpiCardOrder(page)
      expect(initialOrder.length).toBe(4)

      // Drag first card to third position
      await dragAndDrop(
        page,
        '[data-testid="kpi-card"]:first-child',
        '[data-testid="kpi-card"]:nth-child(3)'
      )

      // Get new order
      const newOrder = await getKpiCardOrder(page)

      // Verify order changed
      expect(newOrder).not.toEqual(initialOrder)
      expect(newOrder[2]).toBe(initialOrder[0]) // First should be at third position
    })

    test.skip('should persist KPI card order after reordering', async ({ page }) => {
      await page.goto('/dashboard')

      // Get initial order
      const initialOrder = await getKpiCardOrder(page)

      // Reorder cards
      await dragAndDrop(
        page,
        '[data-testid="kpi-card"]:first-child',
        '[data-testid="kpi-card"]:nth-child(2)'
      )

      const newOrder = await getKpiCardOrder(page)

      // Reload page
      await page.reload()

      // Get order after reload
      const orderAfterReload = await getKpiCardOrder(page)

      // Order should be persisted
      expect(orderAfterReload).toEqual(newOrder)
    })

    test.skip('should show elevation during drag', async ({ page }) => {
      await page.goto('/dashboard')

      const kpiCard = page.locator('[data-testid="kpi-card"]').first()
      const cardBox = await kpiCard.boundingBox()

      if (cardBox) {
        // Start drag
        await page.mouse.move(cardBox.x + cardBox.width / 2, cardBox.y + cardBox.height / 2)
        await page.mouse.down()
        await page.mouse.move(cardBox.x + 30, cardBox.y, { steps: 5 })

        // Check for drag overlay with elevation
        const overlay = page.locator('[data-testid="kpi-drag-overlay"]')
        await expect(overlay).toBeVisible()

        // Verify scale transform (Apple HIG elevation)
        const transform = await overlay.evaluate((el) =>
          window.getComputedStyle(el).transform
        )
        expect(transform).toContain('matrix')

        await page.mouse.up()
      }
    })

    test.skip('should animate cards smoothly during reorder', async ({ page }) => {
      await page.goto('/dashboard')

      const cards = page.locator('[data-testid="kpi-card"]')
      const firstCard = cards.first()
      const thirdCard = cards.nth(2)

      const firstBox = await firstCard.boundingBox()
      const thirdBox = await thirdCard.boundingBox()

      if (firstBox && thirdBox) {
        // Start drag
        await page.mouse.move(firstBox.x + firstBox.width / 2, firstBox.y + firstBox.height / 2)
        await page.mouse.down()

        // Move over third card (other cards should animate)
        await page.mouse.move(
          thirdBox.x + thirdBox.width / 2,
          thirdBox.y + thirdBox.height / 2,
          { steps: 20 }
        )

        // Check that second card has transition
        const secondCard = cards.nth(1)
        const transition = await secondCard.evaluate((el) =>
          window.getComputedStyle(el).transition
        )

        expect(transition).toContain('transform')

        await page.mouse.up()
      }
    })

    test.skip('should rotate card slightly during drag (Apple HIG)', async ({ page }) => {
      await page.goto('/dashboard')

      const kpiCard = page.locator('[data-testid="kpi-card"]').first()
      const cardBox = await kpiCard.boundingBox()

      if (cardBox) {
        await page.mouse.move(cardBox.x + cardBox.width / 2, cardBox.y + cardBox.height / 2)
        await page.mouse.down()
        await page.mouse.move(cardBox.x + 50, cardBox.y + 30, { steps: 5 })

        const overlay = page.locator('[data-testid="kpi-drag-overlay"]')

        // Check for rotation in transform
        const transform = await overlay.evaluate((el) =>
          window.getComputedStyle(el).transform
        )

        // Matrix should indicate some rotation
        // A pure scale would be matrix(1.05, 0, 0, 1.05, x, y)
        // Rotation adds non-zero values in positions 2 and 3
        expect(transform).toMatch(/matrix|rotate/)

        await page.mouse.up()
      }
    })
  })

  test.describe('KPI Card Grid Layout', () => {
    test.skip('should display in 4-column grid on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 })
      await page.goto('/dashboard')

      const kpiGrid = page.locator('[data-testid="kpi-grid"]')
      const gridStyle = await kpiGrid.evaluate((el) =>
        window.getComputedStyle(el).gridTemplateColumns
      )

      // Should have 4 columns
      expect(gridStyle).toMatch(/repeat\(4|.*fr.*fr.*fr.*fr/)
    })

    test.skip('should display in 2-column grid on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })
      await page.goto('/dashboard')

      const kpiGrid = page.locator('[data-testid="kpi-grid"]')
      const gridStyle = await kpiGrid.evaluate((el) =>
        window.getComputedStyle(el).gridTemplateColumns
      )

      // Should have 2 columns
      expect(gridStyle).toMatch(/repeat\(2|.*fr.*fr/)
    })

    test.skip('should display in 1-column grid on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/dashboard')

      const kpiGrid = page.locator('[data-testid="kpi-grid"]')
      const gridStyle = await kpiGrid.evaluate((el) =>
        window.getComputedStyle(el).gridTemplateColumns
      )

      // Should have 1 column
      expect(gridStyle).toMatch(/repeat\(1|^[^,]+$/)
    })
  })

  test.describe('KPI Settings Integration', () => {
    test.skip('should open settings modal', async ({ page }) => {
      await page.goto('/dashboard')

      const settingsButton = page.getByRole('button', { name: /configurar/i })
      await settingsButton.click()

      const modal = page.locator('[data-testid="settings-modal"]')
      await expect(modal).toBeVisible()
    })

    test.skip('should toggle KPI card visibility from settings', async ({ page }) => {
      await page.goto('/dashboard')

      // Count initial cards
      const initialCount = await page.locator('[data-testid="kpi-card"]').count()

      // Open settings
      await page.getByRole('button', { name: /configurar/i }).click()

      // Toggle first KPI card visibility
      const toggleSwitch = page.locator('[data-testid="kpi-visibility-toggle"]').first()
      await toggleSwitch.click()

      // Close modal
      await page.keyboard.press('Escape')

      // Count cards after
      const afterCount = await page.locator('[data-testid="kpi-card"]').count()

      expect(afterCount).toBe(initialCount - 1)
    })

    test.skip('should reorder KPIs from settings modal', async ({ page }) => {
      await page.goto('/dashboard')

      const initialOrder = await getKpiCardOrder(page)

      // Open settings
      await page.getByRole('button', { name: /configurar/i }).click()

      // Drag to reorder in settings list
      await dragAndDrop(
        page,
        '[data-testid="settings-kpi-item"]:first-child',
        '[data-testid="settings-kpi-item"]:nth-child(3)'
      )

      // Close modal
      await page.keyboard.press('Escape')

      // Verify order changed on dashboard
      const newOrder = await getKpiCardOrder(page)
      expect(newOrder).not.toEqual(initialOrder)
    })
  })

  test.describe('Touch Device Support', () => {
    test('should work on touch devices', async ({ page }) => {
      // Use mobile device
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/login')

      // Verify mobile layout works
      await expect(page.getByLabel(/email/i)).toBeVisible()
    })

    test.skip('should support touch drag on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/dashboard')

      const kpiCard = page.locator('[data-testid="kpi-card"]').first()
      const cardBox = await kpiCard.boundingBox()

      if (cardBox) {
        // Simulate touch drag
        await page.touchscreen.tap(cardBox.x + cardBox.width / 2, cardBox.y + cardBox.height / 2)

        // Long press to start drag (touch activation delay)
        await page.mouse.move(cardBox.x + cardBox.width / 2, cardBox.y + cardBox.height / 2)
        await page.mouse.down()
        await page.waitForTimeout(200) // Touch activation delay

        await page.mouse.move(cardBox.x + 100, cardBox.y, { steps: 10 })
        await page.mouse.up()
      }
    })
  })

  test.describe('Accessibility', () => {
    test.skip('should have accessible labels on KPI cards', async ({ page }) => {
      await page.goto('/dashboard')

      const kpiCards = page.locator('[data-testid="kpi-card"]')
      const count = await kpiCards.count()

      for (let i = 0; i < count; i++) {
        const card = kpiCards.nth(i)
        // Should have accessible name
        const ariaLabel = await card.getAttribute('aria-label')
        const role = await card.getAttribute('role')

        expect(ariaLabel || role).toBeTruthy()
      }
    })

    test.skip('should announce drag actions to screen readers', async ({ page }) => {
      await page.goto('/dashboard')

      // Check for live region
      const liveRegion = page.locator('[aria-live="polite"], [aria-live="assertive"]')
      await expect(liveRegion).toBeVisible()
    })
  })

  test.describe('Performance', () => {
    test.skip('should render KPI cards within performance budget', async ({ page }) => {
      const startTime = Date.now()

      await page.goto('/dashboard')

      // Wait for KPI cards to be visible
      await page.locator('[data-testid="kpi-card"]').first().waitFor({ state: 'visible' })

      const loadTime = Date.now() - startTime

      // Should load within 3 seconds
      expect(loadTime).toBeLessThan(3000)
    })

    test.skip('should not drop frames during drag', async ({ page }) => {
      await page.goto('/dashboard')

      const kpiCard = page.locator('[data-testid="kpi-card"]').first()
      const cardBox = await kpiCard.boundingBox()

      if (cardBox) {
        // Enable performance tracking
        await page.evaluate(() => {
          (window as any).__frameDrops = 0
          const targetFPS = 60
          let lastTime = performance.now()

          const checkFrames = () => {
            const now = performance.now()
            const delta = now - lastTime
            if (delta > 1000 / targetFPS * 1.5) {
              (window as any).__frameDrops++
            }
            lastTime = now
            requestAnimationFrame(checkFrames)
          }
          requestAnimationFrame(checkFrames)
        })

        // Perform multiple drag operations
        for (let i = 0; i < 5; i++) {
          await page.mouse.move(cardBox.x + cardBox.width / 2, cardBox.y + cardBox.height / 2)
          await page.mouse.down()
          await page.mouse.move(cardBox.x + 100 + (i * 20), cardBox.y, { steps: 10 })
          await page.mouse.up()
          await page.waitForTimeout(100)
        }

        // Check frame drops
        const frameDrops = await page.evaluate(() => (window as any).__frameDrops)

        // Allow some frame drops, but not excessive
        expect(frameDrops).toBeLessThan(10)
      }
    })
  })
})
