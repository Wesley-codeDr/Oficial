/**
 * RedFlagAlert Component Tests
 *
 * Tests for the medical red flag alert component covering:
 * - Rendering with different severity levels
 * - Grouping flags by severity
 * - Dismiss functionality
 * - Expand/collapse behavior
 * - Action buttons
 * - determineSeverity function
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { RedFlagAlert } from '@/components/anamnese/red-flag-alert'

// ============================================================================
// Test Data
// ============================================================================

const createRedFlag = (overrides = {}) => ({
  id: 'flag-1',
  displayText: 'Test red flag',
  ...overrides,
})

const criticalFlags = [
  { id: 'crit-1', displayText: 'Paciente em parada cardíaca' },
  { id: 'crit-2', displayText: 'PCR em andamento' },
  { id: 'crit-3', displayText: 'Choque hipovolêmico' },
]

const dangerFlags = [
  { id: 'dang-1', displayText: 'SpO2 < 90% em ar ambiente' },
  { id: 'dang-2', displayText: 'Alteração de consciência aguda' },
  { id: 'dang-3', displayText: 'Hipotensão arterial' },
]

const warningFlags = [
  { id: 'warn-1', displayText: 'Febre persistente' },
  { id: 'warn-2', displayText: 'Dor torácica atípica' },
]

// ============================================================================
// Basic Rendering Tests
// ============================================================================

describe('RedFlagAlert Component', () => {
  describe('Basic Rendering', () => {
    it('should return null when redFlags array is empty', () => {
      const { container } = render(<RedFlagAlert redFlags={[]} />)

      expect(container.firstChild).toBeNull()
    })

    it('should render when redFlags are provided', () => {
      render(<RedFlagAlert redFlags={[createRedFlag()]} />)

      expect(screen.getByText(/sinal detectado/i)).toBeInTheDocument()
    })

    it('should display correct count for single flag', () => {
      render(<RedFlagAlert redFlags={[createRedFlag()]} />)

      expect(screen.getByText('1 sinal detectado')).toBeInTheDocument()
    })

    it('should display correct count for multiple flags', () => {
      render(<RedFlagAlert redFlags={warningFlags} />)

      expect(screen.getByText('2 sinais detectados')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      const { container } = render(
        <RedFlagAlert redFlags={[createRedFlag()]} className="custom-class" />
      )

      const alert = container.firstChild as HTMLElement
      expect(alert).toHaveClass('custom-class')
    })
  })

  // ============================================================================
  // Severity Detection Tests
  // ============================================================================

  describe('Severity Detection', () => {
    it('should detect critical severity for cardiac arrest terms', () => {
      render(<RedFlagAlert redFlags={[{ id: '1', displayText: 'Parada cardíaca' }]} />)

      expect(screen.getByText('🚨 ALERTA CRÍTICO')).toBeInTheDocument()
      expect(screen.getByText('AÇÃO IMEDIATA')).toBeInTheDocument()
    })

    it('should detect critical severity for PCR', () => {
      render(<RedFlagAlert redFlags={[{ id: '1', displayText: 'PCR presenciada' }]} />)

      expect(screen.getByText('🚨 ALERTA CRÍTICO')).toBeInTheDocument()
    })

    it('should detect critical severity for shock', () => {
      render(<RedFlagAlert redFlags={[{ id: '1', displayText: 'Choque séptico' }]} />)

      expect(screen.getByText('🚨 ALERTA CRÍTICO')).toBeInTheDocument()
    })

    it('should detect critical severity for coma', () => {
      render(<RedFlagAlert redFlags={[{ id: '1', displayText: 'Paciente em coma' }]} />)

      expect(screen.getByText('🚨 ALERTA CRÍTICO')).toBeInTheDocument()
    })

    it('should detect danger severity for SpO2 < 90', () => {
      render(<RedFlagAlert redFlags={[{ id: '1', displayText: 'SpO2 < 90%' }]} />)

      expect(screen.getByText('⚠️ Sinais de Alarme')).toBeInTheDocument()
    })

    it('should detect danger severity for consciousness changes', () => {
      render(<RedFlagAlert redFlags={[{ id: '1', displayText: 'Alteração consciência' }]} />)

      expect(screen.getByText('⚠️ Sinais de Alarme')).toBeInTheDocument()
    })

    it('should detect danger severity for hypotension', () => {
      render(<RedFlagAlert redFlags={[{ id: '1', displayText: 'Hipotensão severa' }]} />)

      expect(screen.getByText('⚠️ Sinais de Alarme')).toBeInTheDocument()
    })

    it('should detect danger severity for syncope', () => {
      render(<RedFlagAlert redFlags={[{ id: '1', displayText: 'Síncope recente' }]} />)

      expect(screen.getByText('⚠️ Sinais de Alarme')).toBeInTheDocument()
    })

    it('should detect danger severity for seizure', () => {
      render(<RedFlagAlert redFlags={[{ id: '1', displayText: 'Convulsão ativa' }]} />)

      expect(screen.getByText('⚠️ Sinais de Alarme')).toBeInTheDocument()
    })

    it('should default to warning severity for unrecognized terms', () => {
      render(<RedFlagAlert redFlags={[{ id: '1', displayText: 'Febre alta' }]} />)

      expect(screen.getByText('ℹ️ Atenção')).toBeInTheDocument()
    })

    it('should use explicit severity when provided', () => {
      render(
        <RedFlagAlert
          redFlags={[{ id: '1', displayText: 'Simple flag', severity: 'critical' }]}
        />
      )

      expect(screen.getByText('🚨 ALERTA CRÍTICO')).toBeInTheDocument()
    })
  })

  // ============================================================================
  // Grouping Tests
  // ============================================================================

  describe('Flag Grouping', () => {
    it('should show highest severity title when mixed flags', () => {
      const mixedFlags = [
        ...criticalFlags.slice(0, 1),
        ...warningFlags.slice(0, 1),
      ]

      render(<RedFlagAlert redFlags={mixedFlags} />)

      // Should show critical (highest)
      expect(screen.getByText('🚨 ALERTA CRÍTICO')).toBeInTheDocument()
    })

    it('should show danger title when no critical flags', () => {
      const mixedFlags = [
        ...dangerFlags.slice(0, 1),
        ...warningFlags.slice(0, 1),
      ]

      render(<RedFlagAlert redFlags={mixedFlags} />)

      expect(screen.getByText('⚠️ Sinais de Alarme')).toBeInTheDocument()
    })

    it('should display all flag texts', () => {
      render(<RedFlagAlert redFlags={warningFlags} />)

      expect(screen.getByText('Febre persistente')).toBeInTheDocument()
      expect(screen.getByText('Dor torácica atípica')).toBeInTheDocument()
    })

    it('should remove emoji prefix from display text', () => {
      render(
        <RedFlagAlert
          redFlags={[{ id: '1', displayText: '⚠️ Flag with emoji' }]}
        />
      )

      expect(screen.getByText('Flag with emoji')).toBeInTheDocument()
    })
  })

  // ============================================================================
  // Dismiss Functionality Tests
  // ============================================================================

  describe('Dismiss Functionality', () => {
    it('should render dismiss button', () => {
      render(<RedFlagAlert redFlags={[createRedFlag()]} />)

      const buttons = screen.getAllByRole('button')
      const dismissButton = buttons.find(btn => btn.querySelector('svg.lucide-x'))
      expect(dismissButton).toBeInTheDocument()
    })

    it('should hide alert when dismiss is clicked', () => {
      const { container } = render(<RedFlagAlert redFlags={[createRedFlag()]} />)

      // Find the dismiss button (button with X icon)
      const buttons = screen.getAllByRole('button')
      const dismissButton = buttons.find(btn => btn.querySelector('svg.lucide-x'))

      if (dismissButton) {
        fireEvent.click(dismissButton)
      }

      // After dismiss, container should be empty
      expect(container.firstChild).toBeNull()
    })
  })

  // ============================================================================
  // Expand/Collapse Tests
  // ============================================================================

  describe('Expand/Collapse Behavior', () => {
    it('should be expanded by default', () => {
      render(<RedFlagAlert redFlags={warningFlags} />)

      // Content should be visible
      expect(screen.getByText('Febre persistente')).toBeInTheDocument()
      expect(screen.getByText('Dor torácica atípica')).toBeInTheDocument()
    })

    it('should show expand/collapse button for multiple flags', () => {
      render(<RedFlagAlert redFlags={warningFlags} />)

      // Look for chevron icon
      const chevronUp = document.querySelector('svg.lucide-chevron-up')
      expect(chevronUp).toBeInTheDocument()
    })

    it('should not show expand/collapse button for single flag', () => {
      render(<RedFlagAlert redFlags={[createRedFlag()]} />)

      const chevronUp = document.querySelector('svg.lucide-chevron-up')
      const chevronDown = document.querySelector('svg.lucide-chevron-down')

      expect(chevronUp).not.toBeInTheDocument()
      expect(chevronDown).not.toBeInTheDocument()
    })
  })

  // ============================================================================
  // Action Button Tests
  // ============================================================================

  describe('Action Buttons', () => {
    const flagWithAction = {
      id: 'action-flag',
      displayText: 'Flag with action',
      action: 'Take immediate action',
    }

    it('should not show action button when showActions is false', () => {
      render(<RedFlagAlert redFlags={[flagWithAction]} showActions={false} />)

      expect(screen.queryByText(/Take immediate action/i)).not.toBeInTheDocument()
    })

    it('should show action button when showActions is true', () => {
      render(<RedFlagAlert redFlags={[flagWithAction]} showActions={true} />)

      expect(screen.getByText(/Take immediate action/i)).toBeInTheDocument()
    })

    it('should call onActionClick when action button is clicked', () => {
      const handleAction = vi.fn()

      render(
        <RedFlagAlert
          redFlags={[flagWithAction]}
          showActions={true}
          onActionClick={handleAction}
        />
      )

      const actionButton = screen.getByText(/Take immediate action/i)
      fireEvent.click(actionButton)

      expect(handleAction).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'action-flag',
          displayText: 'Flag with action',
          action: 'Take immediate action',
        })
      )
    })
  })

  // ============================================================================
  // Visual Indicator Tests
  // ============================================================================

  describe('Visual Indicators', () => {
    it('should show AÇÃO IMEDIATA badge for critical severity', () => {
      render(<RedFlagAlert redFlags={criticalFlags.slice(0, 1)} />)

      expect(screen.getByText('AÇÃO IMEDIATA')).toBeInTheDocument()
    })

    it('should not show AÇÃO IMEDIATA badge for danger severity', () => {
      render(<RedFlagAlert redFlags={dangerFlags.slice(0, 1)} />)

      expect(screen.queryByText('AÇÃO IMEDIATA')).not.toBeInTheDocument()
    })

    it('should not show AÇÃO IMEDIATA badge for warning severity', () => {
      render(<RedFlagAlert redFlags={warningFlags.slice(0, 1)} />)

      expect(screen.queryByText('AÇÃO IMEDIATA')).not.toBeInTheDocument()
    })
  })

  // ============================================================================
  // Edge Cases
  // ============================================================================

  describe('Edge Cases', () => {
    it('should handle flags with only id and displayText', () => {
      const minimalFlag = { id: 'min-1', displayText: 'Minimal flag' }

      render(<RedFlagAlert redFlags={[minimalFlag]} />)

      expect(screen.getByText('Minimal flag')).toBeInTheDocument()
    })

    it('should handle case-insensitive severity detection', () => {
      render(
        <RedFlagAlert
          redFlags={[{ id: '1', displayText: 'PARADA CARDÍACA' }]}
        />
      )

      expect(screen.getByText('🚨 ALERTA CRÍTICO')).toBeInTheDocument()
    })

    it('should handle special characters in display text', () => {
      render(
        <RedFlagAlert
          redFlags={[{ id: '1', displayText: 'Temp: 38.5°C - Febre' }]}
        />
      )

      expect(screen.getByText('Temp: 38.5°C - Febre')).toBeInTheDocument()
    })

    it('should handle many flags', () => {
      const manyFlags = Array.from({ length: 10 }, (_, i) => ({
        id: `flag-${i}`,
        displayText: `Flag number ${i + 1}`,
      }))

      render(<RedFlagAlert redFlags={manyFlags} />)

      expect(screen.getByText('10 sinais detectados')).toBeInTheDocument()
    })
  })
})
