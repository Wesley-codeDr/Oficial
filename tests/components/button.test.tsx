/**
 * Button Component Tests
 *
 * Tests for the Button component covering:
 * - Rendering with different variants
 * - Rendering with different sizes
 * - Click event handling
 * - asChild prop with Slot
 * - Custom className support
 * - Accessibility attributes
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button, buttonVariants } from '@/components/ui/button'

// ============================================================================
// Basic Rendering Tests
// ============================================================================

describe('Button Component', () => {
  describe('Basic Rendering', () => {
    it('should render a button element', () => {
      render(<Button>Click me</Button>)

      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toBeInTheDocument()
    })

    it('should render children content', () => {
      render(<Button>Test Content</Button>)

      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should have data-slot attribute', () => {
      render(<Button>Button</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('data-slot', 'button')
    })

    it('should apply custom className', () => {
      render(<Button className="custom-class">Button</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })
  })

  // ============================================================================
  // Variant Tests
  // ============================================================================

  describe('Variants', () => {
    it('should render with primary variant by default', () => {
      render(<Button>Primary</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('btn-primary-glass')
    })

    it('should render with destructive variant', () => {
      render(<Button variant="destructive">Destructive</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('from-rose-500/90')
    })

    it('should render with outline variant', () => {
      render(<Button variant="outline">Outline</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('border')
      expect(button).toHaveClass('glass-pill')
    })

    it('should render with secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('glass-pill')
      expect(button).toHaveClass('glass-molded-3d')
    })

    it('should render with ghost variant', () => {
      render(<Button variant="ghost">Ghost</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('glass-btn-ghost')
    })

    it('should render with link variant', () => {
      render(<Button variant="link">Link</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-primary')
      expect(button).toHaveClass('underline-offset-4')
    })
  })

  // ============================================================================
  // Size Tests
  // ============================================================================

  describe('Sizes', () => {
    it('should render with default size', () => {
      render(<Button>Default</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-10')
      expect(button).toHaveClass('px-4')
    })

    it('should render with sm size', () => {
      render(<Button size="sm">Small</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-9')
      expect(button).toHaveClass('px-3')
    })

    it('should render with lg size', () => {
      render(<Button size="lg">Large</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-12')
      expect(button).toHaveClass('px-8')
    })

    it('should render with icon size', () => {
      render(<Button size="icon">Icon</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('size-10')
    })

    it('should render with icon-sm size', () => {
      render(<Button size="icon-sm">Icon SM</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('size-8')
    })

    it('should render with icon-lg size', () => {
      render(<Button size="icon-lg">Icon LG</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('size-12')
    })
  })

  // ============================================================================
  // Event Handling Tests
  // ============================================================================

  describe('Event Handling', () => {
    it('should handle click events', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click</Button>)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should not fire click when disabled', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick} disabled>Disabled</Button>)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  // ============================================================================
  // Disabled State Tests
  // ============================================================================

  describe('Disabled State', () => {
    it('should have disabled attribute when disabled', () => {
      render(<Button disabled>Disabled</Button>)

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should have opacity-50 class when disabled', () => {
      render(<Button disabled>Disabled</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('disabled:opacity-50')
    })
  })

  // ============================================================================
  // asChild Prop Tests
  // ============================================================================

  describe('asChild Prop', () => {
    it('should render as Slot when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      )

      const link = screen.getByRole('link', { name: /link button/i })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/test')
    })

    it('should apply button styles to child element', () => {
      render(
        <Button asChild variant="primary">
          <a href="/test">Styled Link</a>
        </Button>
      )

      const link = screen.getByRole('link')
      expect(link).toHaveClass('btn-primary-glass')
    })

    it('should have data-slot on Slot component', () => {
      render(
        <Button asChild>
          <a href="/test">Link</a>
        </Button>
      )

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('data-slot', 'button')
    })
  })

  // ============================================================================
  // buttonVariants Function Tests
  // ============================================================================

  describe('buttonVariants Function', () => {
    it('should return default classes without options', () => {
      const classes = buttonVariants()

      expect(classes).toContain('btn-primary-glass')
      expect(classes).toContain('h-10')
    })

    it('should return variant-specific classes', () => {
      const classes = buttonVariants({ variant: 'destructive' })

      expect(classes).toContain('from-rose-500/90')
    })

    it('should return size-specific classes', () => {
      const classes = buttonVariants({ size: 'lg' })

      expect(classes).toContain('h-12')
      expect(classes).toContain('px-8')
    })

    it('should combine variant and size', () => {
      const classes = buttonVariants({ variant: 'outline', size: 'sm' })

      expect(classes).toContain('border')
      expect(classes).toContain('h-9')
    })

    it('should include custom className', () => {
      const classes = buttonVariants({ className: 'my-custom-class' })

      expect(classes).toContain('my-custom-class')
    })
  })

  // ============================================================================
  // Accessibility Tests
  // ============================================================================

  describe('Accessibility', () => {
    it('should be focusable', () => {
      render(<Button>Focus Me</Button>)

      const button = screen.getByRole('button')
      button.focus()

      expect(button).toHaveFocus()
    })

    it('should not be focusable when disabled', () => {
      render(<Button disabled>Cannot Focus</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('disabled:pointer-events-none')
    })

    it('should support aria-label', () => {
      render(<Button aria-label="Close dialog">×</Button>)

      const button = screen.getByRole('button', { name: /close dialog/i })
      expect(button).toBeInTheDocument()
    })
  })

  // ============================================================================
  // Combined Props Tests
  // ============================================================================

  describe('Combined Props', () => {
    it('should handle multiple props together', () => {
      const handleClick = vi.fn()
      render(
        <Button
          variant="destructive"
          size="lg"
          className="extra-class"
          onClick={handleClick}
          aria-label="Delete item"
        >
          Delete
        </Button>
      )

      const button = screen.getByRole('button', { name: /delete item/i })

      expect(button).toHaveClass('from-rose-500/90')
      expect(button).toHaveClass('h-12')
      expect(button).toHaveClass('extra-class')

      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalled()
    })
  })
})
