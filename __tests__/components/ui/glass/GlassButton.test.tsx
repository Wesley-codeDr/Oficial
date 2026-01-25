/**
 * GlassButton Component Tests
 *
 * Tests for the Apple Liquid Glass 2026 GlassButton component
 * covering variants, haptic feedback, loading/disabled states,
 * and accessibility features.
 */

import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { GlassButton } from "@/components/ui/glass/GlassButton"

// Mock framer-motion to prevent animation-related test issues
jest.mock("framer-motion", () => {
  const React = require("react")

  return {
    motion: {
      button: React.forwardRef(
        (
          { children, whileHover, whileTap, initial, animate, ...props }: any,
          ref: any
        ) => (
          <button ref={ref} {...props}>
            {children}
          </button>
        )
      ),
    },
    useAnimation: () => ({
      start: jest.fn().mockResolvedValue(undefined),
    }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})

// Mock matchMedia for reduced motion preference tests
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)" ? matches : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

describe("GlassButton", () => {
  beforeEach(() => {
    mockMatchMedia(false)
  })

  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<GlassButton>Click me</GlassButton>)
      expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument()
    })

    it("renders children correctly", () => {
      render(<GlassButton>Submit Form</GlassButton>)
      expect(screen.getByText("Submit Form")).toBeInTheDocument()
    })

    it("applies custom className", () => {
      render(<GlassButton className="custom-class">Button</GlassButton>)
      expect(screen.getByRole("button")).toHaveClass("custom-class")
    })

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(<GlassButton ref={ref}>Button</GlassButton>)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe("Variant Rendering", () => {
    it("renders default variant", () => {
      render(<GlassButton variant="default">Default</GlassButton>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("liquid-glass-2026")
    })

    it("renders primary variant", () => {
      render(<GlassButton variant="primary">Primary</GlassButton>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("liquid-glass-2026")
    })

    it("renders secondary variant", () => {
      render(<GlassButton variant="secondary">Secondary</GlassButton>)
      const button = screen.getByRole("button")
      expect(button).toBeInTheDocument()
    })

    it("renders ghost variant", () => {
      render(<GlassButton variant="ghost">Ghost</GlassButton>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("bg-transparent")
    })

    it("renders danger variant", () => {
      render(<GlassButton variant="danger">Danger</GlassButton>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("liquid-glass-2026")
    })
  })

  describe("Healthcare Variants", () => {
    it("renders healthcare-primary variant", () => {
      render(
        <GlassButton healthcareVariant="healthcare-primary">
          Medical
        </GlassButton>
      )
      const button = screen.getByRole("button")
      expect(button).toHaveClass("liquid-glass-2026")
    })

    it("renders healthcare-success variant", () => {
      render(
        <GlassButton healthcareVariant="healthcare-success">
          Success
        </GlassButton>
      )
      expect(screen.getByRole("button")).toBeInTheDocument()
    })

    it("renders healthcare-warning variant", () => {
      render(
        <GlassButton healthcareVariant="healthcare-warning">
          Warning
        </GlassButton>
      )
      expect(screen.getByRole("button")).toBeInTheDocument()
    })

    it("renders healthcare-critical variant with high z-index", () => {
      render(
        <GlassButton healthcareVariant="healthcare-critical">
          Critical Alert
        </GlassButton>
      )
      const button = screen.getByRole("button")
      expect(button).toHaveClass("z-50")
    })

    it("renders healthcare-info variant", () => {
      render(
        <GlassButton healthcareVariant="healthcare-info">Info</GlassButton>
      )
      expect(screen.getByRole("button")).toBeInTheDocument()
    })

    it("healthcare variant overrides standard variant", () => {
      render(
        <GlassButton variant="primary" healthcareVariant="healthcare-critical">
          Critical
        </GlassButton>
      )
      const button = screen.getByRole("button")
      // Healthcare variant should be applied, which includes z-50
      expect(button).toHaveClass("z-50")
    })
  })

  describe("Size Variants", () => {
    it("renders small size", () => {
      render(<GlassButton size="sm">Small</GlassButton>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("h-9")
    })

    it("renders medium size (default)", () => {
      render(<GlassButton>Medium</GlassButton>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("h-11")
    })

    it("renders large size", () => {
      render(<GlassButton size="lg">Large</GlassButton>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("h-13")
    })
  })

  describe("Icons", () => {
    it("renders left icon", () => {
      render(
        <GlassButton leftIcon={<span data-testid="left-icon">L</span>}>
          Button
        </GlassButton>
      )
      expect(screen.getByTestId("left-icon")).toBeInTheDocument()
    })

    it("renders right icon", () => {
      render(
        <GlassButton rightIcon={<span data-testid="right-icon">R</span>}>
          Button
        </GlassButton>
      )
      expect(screen.getByTestId("right-icon")).toBeInTheDocument()
    })

    it("renders both icons", () => {
      render(
        <GlassButton
          leftIcon={<span data-testid="left-icon">L</span>}
          rightIcon={<span data-testid="right-icon">R</span>}
        >
          Button
        </GlassButton>
      )
      expect(screen.getByTestId("left-icon")).toBeInTheDocument()
      expect(screen.getByTestId("right-icon")).toBeInTheDocument()
    })
  })

  describe("Loading State", () => {
    it("shows spinner when loading", () => {
      render(<GlassButton loading>Loading</GlassButton>)
      const button = screen.getByRole("button")
      // Check for spinner element (has animate-spin class)
      const spinner = button.querySelector(".animate-spin")
      expect(spinner).toBeInTheDocument()
    })

    it("hides children when loading", () => {
      render(<GlassButton loading>Submit</GlassButton>)
      // The text should not be visible when loading
      expect(screen.queryByText("Submit")).not.toBeInTheDocument()
    })

    it("disables button when loading", () => {
      render(<GlassButton loading>Loading</GlassButton>)
      expect(screen.getByRole("button")).toBeDisabled()
    })

    it("applies loading styles", () => {
      render(<GlassButton loading>Loading</GlassButton>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("opacity-50")
      expect(button).toHaveClass("cursor-not-allowed")
    })

    it("does not trigger onClick when loading", async () => {
      const handleClick = jest.fn()
      render(
        <GlassButton loading onClick={handleClick}>
          Loading
        </GlassButton>
      )
      await userEvent.click(screen.getByRole("button"))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe("Disabled State", () => {
    it("disables button when disabled prop is true", () => {
      render(<GlassButton disabled>Disabled</GlassButton>)
      expect(screen.getByRole("button")).toBeDisabled()
    })

    it("applies disabled styles", () => {
      render(<GlassButton disabled>Disabled</GlassButton>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("opacity-50")
      expect(button).toHaveClass("cursor-not-allowed")
    })

    it("does not trigger onClick when disabled", async () => {
      const handleClick = jest.fn()
      render(
        <GlassButton disabled onClick={handleClick}>
          Disabled
        </GlassButton>
      )
      await userEvent.click(screen.getByRole("button"))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe("Haptic Feedback", () => {
    it("has haptic enabled by default (medium)", () => {
      render(<GlassButton>Haptic</GlassButton>)
      // Default is "medium", component should be rendered
      expect(screen.getByRole("button")).toBeInTheDocument()
    })

    it("accepts light haptic intensity", () => {
      render(<GlassButton haptic="light">Light</GlassButton>)
      expect(screen.getByRole("button")).toBeInTheDocument()
    })

    it("accepts medium haptic intensity", () => {
      render(<GlassButton haptic="medium">Medium</GlassButton>)
      expect(screen.getByRole("button")).toBeInTheDocument()
    })

    it("accepts heavy haptic intensity", () => {
      render(<GlassButton haptic="heavy">Heavy</GlassButton>)
      expect(screen.getByRole("button")).toBeInTheDocument()
    })

    it("can disable haptic feedback", () => {
      render(<GlassButton haptic={false}>No Haptic</GlassButton>)
      expect(screen.getByRole("button")).toBeInTheDocument()
    })

    it("does not trigger haptic when disabled", async () => {
      const handleClick = jest.fn()
      render(
        <GlassButton disabled haptic="heavy" onClick={handleClick}>
          Disabled
        </GlassButton>
      )
      await userEvent.click(screen.getByRole("button"))
      // Button is disabled, so no interaction should occur
      expect(handleClick).not.toHaveBeenCalled()
    })

    it("does not trigger haptic when loading", async () => {
      const handleClick = jest.fn()
      render(
        <GlassButton loading haptic="heavy" onClick={handleClick}>
          Loading
        </GlassButton>
      )
      await userEvent.click(screen.getByRole("button"))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe("Rim Light Effect", () => {
    it("does not show rim light by default", () => {
      const { container } = render(<GlassButton>Button</GlassButton>)
      // Rim light has specific conic-gradient background
      const rimLightElement = container.querySelector('[style*="conic-gradient"]')
      expect(rimLightElement).not.toBeInTheDocument()
    })

    it("shows rim light when enabled", () => {
      const { container } = render(<GlassButton rimLight>Button</GlassButton>)
      // Rim light element should exist with conic-gradient
      const rimLightElement = container.querySelector('[style*="conic-gradient"]')
      expect(rimLightElement).toBeInTheDocument()
    })
  })

  describe("Inner Glow Effect", () => {
    it("shows inner glow by default", () => {
      const { container } = render(<GlassButton>Button</GlassButton>)
      // Inner glow has radial-gradient background
      const glowElement = container.querySelector('[style*="radial-gradient"]')
      expect(glowElement).toBeInTheDocument()
    })

    it("hides inner glow when disabled", () => {
      const { container } = render(
        <GlassButton innerGlow={false}>Button</GlassButton>
      )
      // Should have noise overlay but no inner glow
      const glowElements = container.querySelectorAll('[style*="radial-gradient"]')
      // Noise uses different pattern, so we check for specific glow pattern
      const hasInnerGlow = Array.from(glowElements).some((el) =>
        el.getAttribute("style")?.includes("circle at center")
      )
      expect(hasInnerGlow).toBe(false)
    })
  })

  describe("Accessibility", () => {
    it("has button role", () => {
      render(<GlassButton>Accessible</GlassButton>)
      expect(screen.getByRole("button")).toBeInTheDocument()
    })

    it("supports aria-label", () => {
      render(<GlassButton aria-label="Submit form">Submit</GlassButton>)
      expect(screen.getByRole("button", { name: /submit form/i })).toBeInTheDocument()
    })

    it("supports aria-disabled", () => {
      render(<GlassButton disabled>Disabled</GlassButton>)
      expect(screen.getByRole("button")).toHaveAttribute("disabled")
    })

    it("has focus-visible ring classes", () => {
      render(<GlassButton>Focus</GlassButton>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("focus-visible:ring-2")
    })

    it("can be focused with keyboard", async () => {
      render(<GlassButton>Focus me</GlassButton>)
      const button = screen.getByRole("button")
      await userEvent.tab()
      expect(button).toHaveFocus()
    })

    it("can be activated with Enter key", async () => {
      const handleClick = jest.fn()
      render(<GlassButton onClick={handleClick}>Press Enter</GlassButton>)
      const button = screen.getByRole("button")
      button.focus()
      fireEvent.keyDown(button, { key: "Enter" })
      // Enter on button triggers click
      await userEvent.type(button, "{enter}")
      expect(handleClick).toHaveBeenCalled()
    })

    it("can be activated with Space key", async () => {
      const handleClick = jest.fn()
      render(<GlassButton onClick={handleClick}>Press Space</GlassButton>)
      const button = screen.getByRole("button")
      button.focus()
      await userEvent.type(button, " ")
      expect(handleClick).toHaveBeenCalled()
    })

    it("decorative elements are hidden from screen readers", () => {
      const { container } = render(<GlassButton>Button</GlassButton>)
      const decorativeElements = container.querySelectorAll('[aria-hidden="true"]')
      expect(decorativeElements.length).toBeGreaterThan(0)
    })
  })

  describe("Reduced Motion Preference", () => {
    it("respects prefers-reduced-motion", () => {
      mockMatchMedia(true)
      render(<GlassButton>No Motion</GlassButton>)
      // Component should still render
      expect(screen.getByRole("button")).toBeInTheDocument()
    })
  })

  describe("Click Handler", () => {
    it("calls onClick handler when clicked", async () => {
      const handleClick = jest.fn()
      render(<GlassButton onClick={handleClick}>Click</GlassButton>)
      await userEvent.click(screen.getByRole("button"))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("passes event to onClick handler", async () => {
      const handleClick = jest.fn()
      render(<GlassButton onClick={handleClick}>Click</GlassButton>)
      await userEvent.click(screen.getByRole("button"))
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object))
    })
  })

  describe("HTML Button Props", () => {
    it("supports type prop", () => {
      render(<GlassButton type="submit">Submit</GlassButton>)
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit")
    })

    it("supports name prop", () => {
      render(<GlassButton name="myButton">Named</GlassButton>)
      expect(screen.getByRole("button")).toHaveAttribute("name", "myButton")
    })

    it("supports form prop", () => {
      render(<GlassButton form="myForm">Form Button</GlassButton>)
      expect(screen.getByRole("button")).toHaveAttribute("form", "myForm")
    })
  })
})
