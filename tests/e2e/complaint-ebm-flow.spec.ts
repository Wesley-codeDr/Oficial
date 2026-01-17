/**
 * E2E Tests: Complaint Selection → Anamnese with EBM Content
 *
 * Testa o fluxo completo implementado no MVP:
 * 1. Seleção de queixa com indicadores EBM
 * 2. Visualização de red flags e EBM content
 * 3. Geração de narrativa enriquecida com contexto EBM
 * 4. Detecção automática de red flags
 *
 * MVP Score Target: < 90s para completar anamnese
 */

import { test, expect } from '@playwright/test'

// ============================================================================
// Test Data - Using seeded complaints
// ============================================================================

const EBM_COMPLAINTS = {
  chestPain: {
    code: 'CV_CHEST_PAIN_TYPICAL',
    title: 'Dor Torácica Típica',
    redFlagCount: 4,
    calculators: ['HEART Score', 'TIMI Score', 'GRACE Score'],
  },
  dyspnea: {
    code: 'RC_DYSPNEA_ACUTE',
    title: 'Dispneia Aguda',
    redFlagCount: 3,
    calculators: ['CURB-65', 'Wells Score (TEP)', 'PSI Score'],
  },
  headache: {
    code: 'NC_HEADACHE_THUNDERCLAP',
    title: 'Cefaleia em Trovoada',
    redFlagCount: 3,
    calculators: ['NIHSS', 'Hunt & Hess Score', 'Fisher Grade'],
  },
}

// ============================================================================
// Unauthenticated Tests (UI Structure & API)
// ============================================================================

test.describe('Complaint EBM Flow - API & Data Validation', () => {
  test('API should return complaints with EBM content', async ({ request }) => {
    const response = await request.get('/api/complaints')

    expect(response.ok()).toBeTruthy()

    const data = await response.json()
    expect(Array.isArray(data)).toBeTruthy()
    expect(data.length).toBeGreaterThan(0)

    // Find complaint with EBM content
    const ebmComplaint = data.find((c: any) =>
      c.code === EBM_COMPLAINTS.chestPain.code
    )

    expect(ebmComplaint).toBeDefined()
    expect(ebmComplaint.extendedContentEBM).toBeDefined()
    expect(ebmComplaint.extendedContentEBM.redFlags).toHaveLength(
      EBM_COMPLAINTS.chestPain.redFlagCount
    )
    expect(ebmComplaint.extendedContentEBM.calculadoras).toEqual(
      expect.arrayContaining(['HEART Score'])
    )
  })

  test('API should return complaint details with full EBM structure', async ({ request }) => {
    const response = await request.get(
      `/api/complaints?code=${EBM_COMPLAINTS.chestPain.code}`
    )

    expect(response.ok()).toBeTruthy()

    const data = await response.json()
    const complaint = Array.isArray(data) ? data[0] : data

    // Validate complete EBM structure
    const ebm = complaint.extendedContentEBM
    expect(ebm).toBeDefined()

    // Red flags validation
    expect(ebm.redFlags).toBeDefined()
    expect(ebm.redFlags.length).toBeGreaterThan(0)
    expect(ebm.redFlags[0]).toHaveProperty('severity')
    expect(ebm.redFlags[0]).toHaveProperty('immediateAction')

    // Differential diagnosis validation
    expect(ebm.diagnosticoDiferencial).toBeDefined()
    expect(ebm.diagnosticoDiferencial.length).toBeGreaterThan(0)
    expect(ebm.diagnosticoDiferencial[0]).toHaveProperty('condition')
    expect(ebm.diagnosticoDiferencial[0]).toHaveProperty('probability')

    // EBM references validation
    expect(ebm.ebmReferences).toBeDefined()
    expect(ebm.ebmReferences.length).toBeGreaterThan(0)

    // Calculators validation
    expect(ebm.calculadoras).toBeDefined()
    expect(ebm.calculadoras.length).toBeGreaterThan(0)

    // Last review validation
    expect(ebm.lastEBMReview).toBeDefined()
    const reviewDate = new Date(ebm.lastEBMReview)
    const monthsAgo = Math.floor((Date.now() - reviewDate.getTime()) / (1000 * 60 * 60 * 24 * 30))
    expect(monthsAgo).toBeLessThan(6) // Should be reviewed within 6 months
  })
})

// ============================================================================
// Authenticated Tests (Requires auth fixture)
// ============================================================================

test.describe('Complaint EBM Flow - UI Components', () => {
  test('should display complaint selector with EBM indicators', async ({
    page,
  }) => {
    // Navigate to anamnese page
    await page.goto('/anamnese')

    // Should show complaint selector
    await expect(page.getByText(/selecione a queixa/i)).toBeVisible()

    // Should show EBM badge for complaints with EBM content
    const ebmBadge = page.locator('text=EBM').first()
    await expect(ebmBadge).toBeVisible()

    // Should show red flag count for high-risk complaints
    const redFlagBadge = page.locator('text=🚨').first()
    await expect(redFlagBadge).toBeVisible()
  })

  test('should show complaint detail panel when complaint selected', async ({
    page,
  }) => {
    await page.goto('/anamnese')

    // Select a complaint with EBM content
    await page.click(`text=${EBM_COMPLAINTS.chestPain.title}`)

    // Should show EBM content panel
    await expect(page.getByText(/red flags/i)).toBeVisible()
    await expect(page.getByText(/diagnósticos diferenciais/i)).toBeVisible()
    await expect(page.getByText(/referências ebm/i)).toBeVisible()

    // Should show specific red flag
    await expect(page.getByText(/dor torácica típica/i)).toBeVisible()

    // Should show calculators
    await expect(page.getByText(/HEART Score/i)).toBeVisible()
  })

  test('should generate narrative with EBM context', async ({ page }) => {
    await page.goto('/anamnese')

    // Select complaint
    await page.click(`text=${EBM_COMPLAINTS.chestPain.title}`)

    // Select some checkboxes (mock patient data)
    await page.click('[data-testid="checkbox-qp"]')
    await page.click('[data-testid="checkbox-hda"]')

    // Switch to detailed mode to see EBM context
    await page.click('text=Detalhado')

    // Generated narrative should include EBM context
    const narrative = await page.locator('[data-testid="narrative-output"]').textContent()

    expect(narrative).toContain('Diagnósticos Diferenciais Principais')
    expect(narrative).toContain('Protocolo de conduta inicial disponível')
  })

  test('should detect and highlight red flags automatically', async ({
    page,
  }) => {
    await page.goto('/anamnese')

    // Select high-risk complaint
    await page.click(`text=${EBM_COMPLAINTS.chestPain.title}`)

    // Select a checkbox that triggers red flag
    await page.click('[data-testid="checkbox-red-flag"]')

    // Should show red flag alert
    await expect(page.getByText(/sinais de alarme/i)).toBeVisible()
    await expect(page.locator('[data-testid="red-flag-alert"]')).toBeVisible()

    // Alert should be prominent (red/warning color)
    const alert = page.locator('[data-testid="red-flag-alert"]')
    await expect(alert).toHaveClass(/red|warning|alert/i)
  })

  test('should show sync status indicator', async ({ page }) => {
    await page.goto('/anamnese')

    // Should show sync status badge
    const syncBadge = page.locator('[data-testid="sync-status-badge"]')
    await expect(syncBadge).toBeVisible()

    // Should update status (polling every 30s)
    // For test purposes, just verify it's present
    await expect(syncBadge).toHaveText(/sync|online|offline/i)
  })

  test('should complete anamnese flow in under 90 seconds', async ({
    page,
  }) => {
    const startTime = Date.now()

    await page.goto('/anamnese')

    // 1. Select complaint
    await page.click(`text=${EBM_COMPLAINTS.chestPain.title}`)

    // 2. Fill patient context
    await page.click('[data-testid="gender-male"]')
    await page.fill('[data-testid="age-input"]', '55')

    // 3. Select checkboxes (simulate typical workflow)
    await page.click('[data-testid="checkbox-qp"]')
    await page.click('[data-testid="checkbox-hda-1"]')
    await page.click('[data-testid="checkbox-hda-2"]')
    await page.click('[data-testid="checkbox-ef"]')

    // 4. Generate narrative
    await page.click('text=Gerar')

    // 5. Copy to clipboard
    await page.click('[data-testid="copy-button"]')

    const endTime = Date.now()
    const duration = (endTime - startTime) / 1000 // seconds

    // Should complete in under 90 seconds
    expect(duration).toBeLessThan(90)

    console.log(`✅ Anamnese completed in ${duration.toFixed(2)}s`)
  })
})

// ============================================================================
// Integration Tests (Component Interaction)
// ============================================================================

test.describe('Complaint EBM Flow - Integration', () => {
  test('should sync red flags from complaint EBM with checkbox red flags', async ({
    page,
  }) => {
    await page.goto('/anamnese')

    // Select complaint with red flags
    await page.click(`text=${EBM_COMPLAINTS.chestPain.title}`)

    // Red flags from complaint EBM should be visible
    const complaintRedFlags = await page.locator('[data-testid="complaint-red-flags"]').count()
    expect(complaintRedFlags).toBeGreaterThan(0)

    // Select a checkbox that also has red flag
    await page.click('[data-testid="checkbox-red-flag"]')

    // Combined red flags should show both sources
    const totalRedFlags = await page.locator('[data-testid="red-flag-item"]').count()
    expect(totalRedFlags).toBeGreaterThanOrEqual(complaintRedFlags + 1)
  })

  test('should update narrative when switching output mode', async ({ page }) => {
    await page.goto('/anamnese')

    await page.click(`text=${EBM_COMPLAINTS.chestPain.title}`)
    await page.click('[data-testid="checkbox-qp"]')

    // Summary mode
    await page.click('text=Resumo')
    const summaryText = await page.locator('[data-testid="narrative-output"]').textContent()

    // Should be concise
    expect(summaryText?.length || 0).toBeLessThan(1000)

    // Detailed mode
    await page.click('text=Detalhado')
    const detailedText = await page.locator('[data-testid="narrative-output"]').textContent()

    // Should include EBM context and be longer
    expect(detailedText?.length || 0).toBeGreaterThan(summaryText?.length || 0)
    expect(detailedText).toContain('Diagnósticos Diferenciais')
  })
})

// ============================================================================
// Performance Tests
// ============================================================================

test.describe('Complaint EBM Flow - Performance', () => {
  test('API response time should be under 2 seconds', async ({ request }) => {
    const startTime = Date.now()

    const response = await request.get('/api/complaints')

    const duration = Date.now() - startTime

    expect(response.ok()).toBeTruthy()
    expect(duration).toBeLessThan(2000) // 2 seconds

    console.log(`✅ API responded in ${duration}ms`)
  })

  test('API should return EBM content efficiently', async ({ request }) => {
    const startTime = Date.now()

    const response = await request.get(
      `/api/complaints?code=${EBM_COMPLAINTS.chestPain.code}`
    )

    const duration = Date.now() - startTime
    const data = await response.json()

    expect(response.ok()).toBeTruthy()
    expect(duration).toBeLessThan(1000) // 1 second

    // Verify EBM content is present (not null)
    const complaint = Array.isArray(data) ? data[0] : data
    expect(complaint.extendedContentEBM).toBeDefined()

    console.log(`✅ EBM content loaded in ${duration}ms`)
  })
})
