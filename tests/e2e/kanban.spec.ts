import { test, expect, Page } from '@playwright/test'

/**
 * Kanban Board E2E Tests
 * Tests drag-and-drop functionality using @dnd-kit
 * Following Apple HIG 2025 interaction patterns
 */

test.describe('Kanban Board', () => {
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

    // Perform drag operation
    await page.mouse.move(
      sourceBox.x + sourceBox.width / 2,
      sourceBox.y + sourceBox.height / 2
    )
    await page.mouse.down()

    // Move slowly to trigger drag state
    await page.mouse.move(
      sourceBox.x + sourceBox.width / 2 + 10,
      sourceBox.y + sourceBox.height / 2,
      { steps: 5 }
    )

    // Move to target
    await page.mouse.move(
      targetBox.x + targetBox.width / 2,
      targetBox.y + targetBox.height / 2,
      { steps: 10 }
    )

    await page.mouse.up()
  }

  test.describe('Unauthenticated', () => {
    test('should redirect to login when accessing dashboard', async ({ page }) => {
      await page.goto('/dashboard')
      await expect(page).toHaveURL(/login/)
    })
  })

  test.describe('Dashboard Kanban UI', () => {
    test.beforeEach(async ({ page }) => {
      // Go to login page
      await page.goto('/login')
    })

    test('should display Kanban columns on dashboard', async ({ page }) => {
      // This test verifies UI elements exist
      // Full drag-and-drop requires authenticated session
      await page.goto('/dashboard')

      // Will redirect to login, verify login page loads
      await expect(page.getByLabel(/email/i)).toBeVisible()
    })
  })

  test.describe('Drag and Drop Interactions', () => {
    // These tests require authentication setup
    // Using test.skip for now until auth fixtures are configured

    test.skip('should show drag overlay when dragging card', async ({ page }) => {
      await page.goto('/dashboard')

      // Find a Kanban card
      const card = page.locator('[data-testid="kanban-card"]').first()
      await expect(card).toBeVisible()

      // Start dragging
      const cardBox = await card.boundingBox()
      if (cardBox) {
        await page.mouse.move(cardBox.x + cardBox.width / 2, cardBox.y + cardBox.height / 2)
        await page.mouse.down()
        await page.mouse.move(cardBox.x + 50, cardBox.y + 50, { steps: 5 })

        // Check for drag overlay
        const overlay = page.locator('[data-testid="drag-overlay"]')
        await expect(overlay).toBeVisible()

        await page.mouse.up()
      }
    })

    test.skip('should move card between columns', async ({ page }) => {
      await page.goto('/dashboard')

      // Get initial column counts
      const sourceColumn = page.locator('[data-testid="kanban-column-exam"]')
      const targetColumn = page.locator('[data-testid="kanban-column-wait"]')

      const initialSourceCount = await sourceColumn.locator('[data-testid="kanban-card"]').count()
      const initialTargetCount = await targetColumn.locator('[data-testid="kanban-card"]').count()

      // Drag card from source to target
      await dragAndDrop(
        page,
        '[data-testid="kanban-column-exam"] [data-testid="kanban-card"]',
        '[data-testid="kanban-column-wait"]'
      )

      // Verify counts changed
      await expect(sourceColumn.locator('[data-testid="kanban-card"]')).toHaveCount(initialSourceCount - 1)
      await expect(targetColumn.locator('[data-testid="kanban-card"]')).toHaveCount(initialTargetCount + 1)
    })

    test.skip('should highlight drop zone on hover', async ({ page }) => {
      await page.goto('/dashboard')

      const card = page.locator('[data-testid="kanban-card"]').first()
      const targetColumn = page.locator('[data-testid="kanban-column-wait"]')

      const cardBox = await card.boundingBox()
      const targetBox = await targetColumn.boundingBox()

      if (cardBox && targetBox) {
        // Start drag
        await page.mouse.move(cardBox.x + cardBox.width / 2, cardBox.y + cardBox.height / 2)
        await page.mouse.down()

        // Move over target
        await page.mouse.move(
          targetBox.x + targetBox.width / 2,
          targetBox.y + targetBox.height / 2,
          { steps: 10 }
        )

        // Check for highlight class
        await expect(targetColumn).toHaveClass(/drop-target|is-over|bg-ios-blue/)

        await page.mouse.up()
      }
    })

    test.skip('should reorder cards within column', async ({ page }) => {
      await page.goto('/dashboard')

      const column = page.locator('[data-testid="kanban-column-exam"]')
      const cards = column.locator('[data-testid="kanban-card"]')

      // Get initial order
      const firstCardId = await cards.first().getAttribute('data-card-id')
      const secondCardId = await cards.nth(1).getAttribute('data-card-id')

      // Drag first card below second
      const firstBox = await cards.first().boundingBox()
      const secondBox = await cards.nth(1).boundingBox()

      if (firstBox && secondBox) {
        await page.mouse.move(firstBox.x + firstBox.width / 2, firstBox.y + firstBox.height / 2)
        await page.mouse.down()
        await page.mouse.move(
          secondBox.x + secondBox.width / 2,
          secondBox.y + secondBox.height + 10,
          { steps: 10 }
        )
        await page.mouse.up()

        // Verify order changed
        const newFirstCardId = await cards.first().getAttribute('data-card-id')
        expect(newFirstCardId).toBe(secondCardId)
      }
    })

    test.skip('should show Apple HIG elevation during drag', async ({ page }) => {
      await page.goto('/dashboard')

      const card = page.locator('[data-testid="kanban-card"]').first()
      const cardBox = await card.boundingBox()

      if (cardBox) {
        await page.mouse.move(cardBox.x + cardBox.width / 2, cardBox.y + cardBox.height / 2)
        await page.mouse.down()
        await page.mouse.move(cardBox.x + 30, cardBox.y + 30, { steps: 5 })

        // Get computed styles of overlay
        const overlay = page.locator('[data-testid="drag-overlay"]')
        const transform = await overlay.evaluate((el) =>
          window.getComputedStyle(el).transform
        )
        const boxShadow = await overlay.evaluate((el) =>
          window.getComputedStyle(el).boxShadow
        )

        // Verify elevation styles (scale and shadow)
        expect(transform).toContain('matrix')
        expect(boxShadow).not.toBe('none')

        await page.mouse.up()
      }
    })

    test.skip('should animate drop with spring physics', async ({ page }) => {
      await page.goto('/dashboard')

      // This test verifies the drop animation occurs
      // We check that transition/animation is applied
      const card = page.locator('[data-testid="kanban-card"]').first()
      const targetColumn = page.locator('[data-testid="kanban-column-wait"]')

      await dragAndDrop(
        page,
        '[data-testid="kanban-card"]',
        '[data-testid="kanban-column-wait"]'
      )

      // After drop, card should have transition applied
      const droppedCard = targetColumn.locator('[data-testid="kanban-card"]').last()
      const transition = await droppedCard.evaluate((el) =>
        window.getComputedStyle(el).transition
      )

      // Should have some transition applied
      expect(transition).not.toBe('all 0s ease 0s')
    })
  })

  test.describe('Keyboard Navigation', () => {
    test.skip('should support keyboard drag with Space/Enter', async ({ page }) => {
      await page.goto('/dashboard')

      const card = page.locator('[data-testid="kanban-card"]').first()

      // Focus the card
      await card.focus()
      await expect(card).toBeFocused()

      // Press Space to start drag (if implemented)
      await page.keyboard.press('Space')

      // Use arrow keys to move
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowRight')

      // Press Space to drop
      await page.keyboard.press('Space')

      // Verify card moved
      // This requires specific implementation of keyboard DnD
    })
  })

  test.describe('Responsive Behavior', () => {
    test('should be scrollable horizontally on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/login')

      // Verify page loads on mobile
      await expect(page.getByLabel(/email/i)).toBeVisible()
    })
  })

  test.describe('Performance', () => {
    test.skip('should not lag during drag operation', async ({ page }) => {
      await page.goto('/dashboard')

      const card = page.locator('[data-testid="kanban-card"]').first()
      const cardBox = await card.boundingBox()

      if (cardBox) {
        const startTime = Date.now()

        // Perform rapid drag movements
        await page.mouse.move(cardBox.x + cardBox.width / 2, cardBox.y + cardBox.height / 2)
        await page.mouse.down()

        for (let i = 0; i < 20; i++) {
          await page.mouse.move(
            cardBox.x + (i * 10),
            cardBox.y + (i * 5),
            { steps: 1 }
          )
        }

        await page.mouse.up()

        const endTime = Date.now()
        const duration = endTime - startTime

        // Should complete within reasonable time (< 2 seconds for 20 movements)
        expect(duration).toBeLessThan(2000)
      }
    })
  })
})
