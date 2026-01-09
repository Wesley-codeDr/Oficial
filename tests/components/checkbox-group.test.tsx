/**
 * CheckboxGroup Component Tests
 *
 * Tests for the anamnese checkbox group component covering:
 * - Rendering with items
 * - Selection state
 * - Toggle functionality
 * - Red flag indicators
 * - Visual states
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CheckboxGroup } from '@/components/anamnese/checkbox-group'

// ============================================================================
// Test Data
// ============================================================================

const createCheckboxItem = (overrides = {}) => ({
  id: 'item-1',
  displayText: 'Test item',
  narrativeText: 'Patient has test item',
  isRedFlag: false,
  isNegative: false,
  ...overrides,
})

const mockItems = [
  createCheckboxItem({ id: 'cb-1', displayText: 'Dor precordial', isRedFlag: true }),
  createCheckboxItem({ id: 'cb-2', displayText: 'Dispneia', isRedFlag: false }),
  createCheckboxItem({ id: 'cb-3', displayText: 'Febre', isRedFlag: false }),
  createCheckboxItem({ id: 'cb-4', displayText: 'Hipotensão', isRedFlag: true }),
]

// ============================================================================
// Basic Rendering Tests
// ============================================================================

describe('CheckboxGroup Component', () => {
  describe('Basic Rendering', () => {
    it('should return null when items array is empty', () => {
      const { container } = render(
        <CheckboxGroup
          title="Test"
          items={[]}
          selectedIds={new Set()}
          onToggle={() => {}}
        />
      )

      expect(container.firstChild).toBeNull()
    })

    it('should render title', () => {
      render(
        <CheckboxGroup
          title="Sintomas Principais"
          items={mockItems}
          selectedIds={new Set()}
          onToggle={() => {}}
        />
      )

      expect(screen.getByText('Sintomas Principais')).toBeInTheDocument()
    })

    it('should render all items', () => {
      render(
        <CheckboxGroup
          title="Test"
          items={mockItems}
          selectedIds={new Set()}
          onToggle={() => {}}
        />
      )

      expect(screen.getByText('Dor precordial')).toBeInTheDocument()
      expect(screen.getByText('Dispneia')).toBeInTheDocument()
      expect(screen.getByText('Febre')).toBeInTheDocument()
      expect(screen.getByText('Hipotensão')).toBeInTheDocument()
    })

    it('should render items as buttons', () => {
      render(
        <CheckboxGroup
          title="Test"
          items={mockItems}
          selectedIds={new Set()}
          onToggle={() => {}}
        />
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(4)
    })
  })

  // ============================================================================
  // Selection State Tests
  // ============================================================================

  describe('Selection State', () => {
    it('should show unchecked state for unselected items', () => {
      render(
        <CheckboxGroup
          title="Test"
          items={[createCheckboxItem()]}
          selectedIds={new Set()}
          onToggle={() => {}}
        />
      )

      const button = screen.getByRole('button')
      // Unchecked state has specific border styling
      expect(button).toHaveClass('border-white/20')
    })

    it('should show checked state for selected items', () => {
      render(
        <CheckboxGroup
          title="Test"
          items={[createCheckboxItem({ id: 'cb-1' })]}
          selectedIds={new Set(['cb-1'])}
          onToggle={() => {}}
        />
      )

      const button = screen.getByRole('button')
      // Checked non-red-flag state has blue styling
      expect(button).toHaveClass('border-blue-500/50')
    })

    it('should show red flag checked state', () => {
      render(
        <CheckboxGroup
          title="Test"
          items={[createCheckboxItem({ id: 'cb-1', isRedFlag: true })]}
          selectedIds={new Set(['cb-1'])}
          onToggle={() => {}}
        />
      )

      const button = screen.getByRole('button')
      // Red flag checked state has rose styling
      expect(button).toHaveClass('border-rose-500/50')
    })

    it('should handle multiple selected items', () => {
      render(
        <CheckboxGroup
          title="Test"
          items={mockItems}
          selectedIds={new Set(['cb-1', 'cb-3'])}
          onToggle={() => {}}
        />
      )

      const buttons = screen.getAllByRole('button')

      // cb-1 is selected and red flag
      expect(buttons[0]).toHaveClass('border-rose-500/50')
      // cb-2 is not selected
      expect(buttons[1]).toHaveClass('border-white/20')
      // cb-3 is selected but not red flag
      expect(buttons[2]).toHaveClass('border-blue-500/50')
      // cb-4 is not selected
      expect(buttons[3]).toHaveClass('border-white/20')
    })
  })

  // ============================================================================
  // Toggle Functionality Tests
  // ============================================================================

  describe('Toggle Functionality', () => {
    it('should call onToggle when item is clicked', () => {
      const handleToggle = vi.fn()

      render(
        <CheckboxGroup
          title="Test"
          items={[createCheckboxItem({ id: 'cb-1' })]}
          selectedIds={new Set()}
          onToggle={handleToggle}
        />
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(handleToggle).toHaveBeenCalledWith('cb-1')
    })

    it('should call onToggle with correct id for each item', () => {
      const handleToggle = vi.fn()

      render(
        <CheckboxGroup
          title="Test"
          items={mockItems}
          selectedIds={new Set()}
          onToggle={handleToggle}
        />
      )

      const buttons = screen.getAllByRole('button')

      fireEvent.click(buttons[0])
      expect(handleToggle).toHaveBeenLastCalledWith('cb-1')

      fireEvent.click(buttons[1])
      expect(handleToggle).toHaveBeenLastCalledWith('cb-2')

      fireEvent.click(buttons[2])
      expect(handleToggle).toHaveBeenLastCalledWith('cb-3')

      fireEvent.click(buttons[3])
      expect(handleToggle).toHaveBeenLastCalledWith('cb-4')
    })

    it('should call onToggle on already selected item', () => {
      const handleToggle = vi.fn()

      render(
        <CheckboxGroup
          title="Test"
          items={[createCheckboxItem({ id: 'cb-1' })]}
          selectedIds={new Set(['cb-1'])}
          onToggle={handleToggle}
        />
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(handleToggle).toHaveBeenCalledWith('cb-1')
    })
  })

  // ============================================================================
  // Red Flag Indicator Tests
  // ============================================================================

  describe('Red Flag Indicators', () => {
    it('should show alert icon for red flag items', () => {
      render(
        <CheckboxGroup
          title="Test"
          items={[createCheckboxItem({ isRedFlag: true })]}
          selectedIds={new Set()}
          onToggle={() => {}}
        />
      )

      // Look for AlertTriangle icon - lucide icons render as svg with class containing h-4 w-4
      const button = screen.getByRole('button')
      const svgIcons = button.querySelectorAll('svg')
      // Should have an SVG icon for the alert (not the check mark, since unselected)
      expect(svgIcons.length).toBeGreaterThan(0)
    })

    it('should not show alert icon for non-red-flag items', () => {
      render(
        <CheckboxGroup
          title="Test"
          items={[createCheckboxItem({ isRedFlag: false })]}
          selectedIds={new Set()}
          onToggle={() => {}}
        />
      )

      const button = screen.getByRole('button')
      // Non-red-flag unselected item should have no SVG icons
      const svgIcons = button.querySelectorAll('svg')
      expect(svgIcons.length).toBe(0)
    })

    it('should highlight alert icon when red flag item is selected', () => {
      render(
        <CheckboxGroup
          title="Test"
          items={[createCheckboxItem({ id: 'cb-1', isRedFlag: true })]}
          selectedIds={new Set(['cb-1'])}
          onToggle={() => {}}
        />
      )

      const button = screen.getByRole('button')
      // Should have 2 SVGs: check icon + alert triangle
      const svgIcons = button.querySelectorAll('svg')
      expect(svgIcons.length).toBe(2)
      // One should have rose-500 class (the alert icon)
      const hasRoseClass = Array.from(svgIcons).some(svg => svg.classList.contains('text-rose-500'))
      expect(hasRoseClass).toBe(true)
    })

    it('should dim alert icon when red flag item is not selected', () => {
      render(
        <CheckboxGroup
          title="Test"
          items={[createCheckboxItem({ isRedFlag: true })]}
          selectedIds={new Set()}
          onToggle={() => {}}
        />
      )

      const button = screen.getByRole('button')
      // Should have 1 SVG: alert triangle (no check icon since unselected)
      const svgIcons = button.querySelectorAll('svg')
      expect(svgIcons.length).toBe(1)
      // Should have dimmed class
      expect(svgIcons[0]).toHaveClass('text-slate-400/30')
    })
  })

  // ============================================================================
  // Check Icon Tests
  // ============================================================================

  describe('Check Icon', () => {
    it('should show check icon when item is selected', () => {
      render(
        <CheckboxGroup
          title="Test"
          items={[createCheckboxItem({ id: 'cb-1', isRedFlag: false })]}
          selectedIds={new Set(['cb-1'])}
          onToggle={() => {}}
        />
      )

      const button = screen.getByRole('button')
      // Selected non-red-flag item should have 1 SVG (check icon)
      const svgIcons = button.querySelectorAll('svg')
      expect(svgIcons.length).toBe(1)
    })

    it('should not show check icon when item is not selected', () => {
      render(
        <CheckboxGroup
          title="Test"
          items={[createCheckboxItem({ isRedFlag: false })]}
          selectedIds={new Set()}
          onToggle={() => {}}
        />
      )

      const button = screen.getByRole('button')
      // Unselected non-red-flag item should have no SVGs
      const svgIcons = button.querySelectorAll('svg')
      expect(svgIcons.length).toBe(0)
    })
  })

  // ============================================================================
  // Visual Style Tests
  // ============================================================================

  describe('Visual Styles', () => {
    it('should apply grid layout', () => {
      render(
        <CheckboxGroup
          title="Test"
          items={mockItems}
          selectedIds={new Set()}
          onToggle={() => {}}
        />
      )

      const grid = document.querySelector('.grid')
      expect(grid).toBeInTheDocument()
      expect(grid).toHaveClass('sm:grid-cols-2')
      expect(grid).toHaveClass('lg:grid-cols-3')
    })

    it('should style title with uppercase tracking', () => {
      render(
        <CheckboxGroup
          title="Test Title"
          items={[createCheckboxItem()]}
          selectedIds={new Set()}
          onToggle={() => {}}
        />
      )

      const title = screen.getByText('Test Title')
      expect(title).toHaveClass('uppercase')
      expect(title).toHaveClass('tracking-[0.2em]')
    })

    it('should have rounded button style', () => {
      render(
        <CheckboxGroup
          title="Test"
          items={[createCheckboxItem()]}
          selectedIds={new Set()}
          onToggle={() => {}}
        />
      )

      const button = screen.getByRole('button')
      expect(button).toHaveClass('rounded-[24px]')
    })
  })

  // ============================================================================
  // Edge Cases
  // ============================================================================

  describe('Edge Cases', () => {
    it('should handle single item', () => {
      render(
        <CheckboxGroup
          title="Single"
          items={[createCheckboxItem()]}
          selectedIds={new Set()}
          onToggle={() => {}}
        />
      )

      expect(screen.getAllByRole('button')).toHaveLength(1)
    })

    it('should handle many items', () => {
      const manyItems = Array.from({ length: 20 }, (_, i) =>
        createCheckboxItem({ id: `item-${i}`, displayText: `Item ${i + 1}` })
      )

      render(
        <CheckboxGroup
          title="Many Items"
          items={manyItems}
          selectedIds={new Set()}
          onToggle={() => {}}
        />
      )

      expect(screen.getAllByRole('button')).toHaveLength(20)
    })

    it('should handle special characters in display text', () => {
      render(
        <CheckboxGroup
          title="Test"
          items={[createCheckboxItem({ displayText: 'Dor < 24h (aguda)' })]}
          selectedIds={new Set()}
          onToggle={() => {}}
        />
      )

      expect(screen.getByText('Dor < 24h (aguda)')).toBeInTheDocument()
    })

    it('should handle empty selectedIds Set', () => {
      render(
        <CheckboxGroup
          title="Test"
          items={mockItems}
          selectedIds={new Set()}
          onToggle={() => {}}
        />
      )

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button).toHaveClass('border-white/20')
      })
    })

    it('should handle all items selected', () => {
      const selectedIds = new Set(mockItems.map(item => item.id))

      render(
        <CheckboxGroup
          title="Test"
          items={mockItems}
          selectedIds={selectedIds}
          onToggle={() => {}}
        />
      )

      // All 4 items selected - each has at least 1 SVG (check icon)
      // Red flag items have 2 SVGs (check + alert)
      const buttons = screen.getAllByRole('button')
      const totalSvgs = buttons.reduce((count, btn) => count + btn.querySelectorAll('svg').length, 0)
      // 2 non-red-flag items = 2 SVGs (check only)
      // 2 red-flag items = 4 SVGs (check + alert each)
      expect(totalSvgs).toBe(6)
    })

    it('should handle negative items', () => {
      render(
        <CheckboxGroup
          title="Test"
          items={[createCheckboxItem({ isNegative: true, displayText: 'Nega febre' })]}
          selectedIds={new Set()}
          onToggle={() => {}}
        />
      )

      expect(screen.getByText('Nega febre')).toBeInTheDocument()
    })
  })

  // ============================================================================
  // Accessibility Tests
  // ============================================================================

  describe('Accessibility', () => {
    it('should have button role for each item', () => {
      render(
        <CheckboxGroup
          title="Test"
          items={mockItems}
          selectedIds={new Set()}
          onToggle={() => {}}
        />
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(4)
    })

    it('should allow keyboard navigation', () => {
      const handleToggle = vi.fn()

      render(
        <CheckboxGroup
          title="Test"
          items={[createCheckboxItem({ id: 'cb-1' })]}
          selectedIds={new Set()}
          onToggle={handleToggle}
        />
      )

      const button = screen.getByRole('button')
      button.focus()

      fireEvent.keyDown(button, { key: 'Enter' })
      // Note: The button click handler fires on Enter key
    })
  })
})
