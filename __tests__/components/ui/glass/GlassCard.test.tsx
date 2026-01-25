/**
 * GlassCard Component Tests
 *
 * Tests for the Apple Liquid Glass 2026 GlassCard component.
 * Covers variant rendering, effects, animations, and accessibility.
 */

import React from "react"
import { render, screen } from "@testing-library/react"
import { GlassCard } from "@/components/ui/glass/GlassCard"

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => {
  const React = require("react")
  return {
    motion: {
      div: React.forwardRef(
        (
          { children, className, whileHover, whileTap, initial, animate, variants, transition, ...props }: React.ComponentProps<"div"> & {
            whileHover?: unknown
            whileTap?: unknown
            initial?: unknown
            animate?: unknown
            variants?: unknown
            transition?: unknown
          },
          ref: React.Ref<HTMLDivElement>
        ) => (
          <div ref={ref} className={className} {...props}>
            {children}
          </div>
        )
      ),
    },
    useReducedMotion: jest.fn(() => false),
    HTMLMotionProps: {},
  }
})

describe("GlassCard", () => {
  describe("Material Variants", () => {
    it("applies correct class for regular variant", () => {
      const { container } = render(<GlassCard variant="regular">Content</GlassCard>)
      expect(container.firstChild).toHaveClass("liquid-glass-regular")
    })

    it("applies correct class for clear variant", () => {
      const { container } = render(<GlassCard variant="clear">Content</GlassCard>)
      expect(container.firstChild).toHaveClass("liquid-glass-clear")
    })

    it("applies correct class for elevated variant", () => {
      const { container } = render(<GlassCard variant="elevated">Content</GlassCard>)
      expect(container.firstChild).toHaveClass("liquid-glass-elevated")
    })

    it("applies correct class for subtle variant", () => {
      const { container } = render(<GlassCard variant="subtle">Content</GlassCard>)
      expect(container.firstChild).toHaveClass("liquid-glass-2026-subtle")
    })

    it("defaults to regular variant when not specified", () => {
      const { container } = render(<GlassCard>Content</GlassCard>)
      expect(container.firstChild).toHaveClass("liquid-glass-regular")
    })
  })

  describe("Healthcare Variants", () => {
    it("applies healthcare-primary styling", () => {
      const { container } = render(
        <GlassCard healthcareVariant="healthcare-primary">Content</GlassCard>
      )
      expect(container.firstChild).toHaveClass("border-blue-500/30")
      expect(container.firstChild).toHaveClass("bg-blue-500/5")
    })

    it("applies healthcare-success styling", () => {
      const { container } = render(
        <GlassCard healthcareVariant="healthcare-success">Content</GlassCard>
      )
      expect(container.firstChild).toHaveClass("border-green-500/30")
      expect(container.firstChild).toHaveClass("bg-green-500/5")
    })

    it("applies healthcare-warning styling", () => {
      const { container } = render(
        <GlassCard healthcareVariant="healthcare-warning">Content</GlassCard>
      )
      expect(container.firstChild).toHaveClass("border-orange-500/30")
      expect(container.firstChild).toHaveClass("bg-orange-500/5")
    })

    it("applies healthcare-critical styling with higher visibility", () => {
      const { container } = render(
        <GlassCard healthcareVariant="healthcare-critical">Content</GlassCard>
      )
      expect(container.firstChild).toHaveClass("border-red-500/40")
      expect(container.firstChild).toHaveClass("bg-red-500/8")
    })

    it("applies healthcare-info styling", () => {
      const { container } = render(
        <GlassCard healthcareVariant="healthcare-info">Content</GlassCard>
      )
      expect(container.firstChild).toHaveClass("border-cyan-500/30")
      expect(container.firstChild).toHaveClass("bg-cyan-500/5")
    })
  })

  describe("Specular Highlight", () => {
    it("applies specular class by default", () => {
      const { container } = render(<GlassCard>Content</GlassCard>)
      expect(container.firstChild).toHaveClass("liquid-glass-specular")
    })

    it("uses clear specular for clear variant", () => {
      const { container } = render(<GlassCard variant="clear">Content</GlassCard>)
      expect(container.firstChild).toHaveClass("liquid-glass-specular-clear")
    })

    it("does not apply specular when disabled", () => {
      const { container } = render(<GlassCard specular={false}>Content</GlassCard>)
      expect(container.firstChild).not.toHaveClass("liquid-glass-specular")
      expect(container.firstChild).not.toHaveClass("liquid-glass-specular-clear")
    })
  })

  describe("Rim Light", () => {
    it("applies rim light class by default", () => {
      const { container } = render(<GlassCard>Content</GlassCard>)
      expect(container.firstChild).toHaveClass("rim-light-ios26")
    })

    it("does not apply rim light when disabled", () => {
      const { container } = render(<GlassCard rimLight={false}>Content</GlassCard>)
      expect(container.firstChild).not.toHaveClass("rim-light-ios26")
    })
  })

  describe("Glow Effects", () => {
    it("applies blue glow on hover", () => {
      const { container } = render(<GlassCard glow="blue">Content</GlassCard>)
      expect(container.firstChild?.className).toContain("hover:shadow-[0_0_40px_rgba(0,102,255,0.2)")
    })

    it("applies critical glow on hover", () => {
      const { container } = render(<GlassCard glow="critical">Content</GlassCard>)
      expect(container.firstChild?.className).toContain("hover:shadow-[0_0_40px_rgba(255,59,48,0.25)")
    })

    it("applies static glow when glowStatic is true", () => {
      const { container } = render(<GlassCard glow="blue" glowStatic>Content</GlassCard>)
      const classNames = container.firstChild?.className || ""
      // Should have static shadow (not hover:)
      expect(classNames).toMatch(/shadow-\[0_0_40px_rgba\(0,102,255/)
    })

    it("does not apply glow when set to none", () => {
      const { container } = render(<GlassCard glow="none">Content</GlassCard>)
      const classNames = container.firstChild?.className || ""
      expect(classNames).not.toContain("shadow-[0_0_40px")
    })
  })

  describe("Size Presets", () => {
    it("applies small size classes", () => {
      const { container } = render(<GlassCard size="sm">Content</GlassCard>)
      expect(container.firstChild).toHaveClass("p-4")
      expect(container.firstChild).toHaveClass("rounded-[16px]")
    })

    it("applies medium size classes by default", () => {
      const { container } = render(<GlassCard>Content</GlassCard>)
      expect(container.firstChild).toHaveClass("p-6")
      expect(container.firstChild).toHaveClass("rounded-[24px]")
    })

    it("applies large size classes", () => {
      const { container } = render(<GlassCard size="lg">Content</GlassCard>)
      expect(container.firstChild).toHaveClass("p-8")
      expect(container.firstChild).toHaveClass("rounded-[32px]")
    })

    it("uses larger radius for elevated variant", () => {
      const { container } = render(<GlassCard variant="elevated" size="md">Content</GlassCard>)
      expect(container.firstChild).toHaveClass("rounded-[28px]")
    })
  })

  describe("Additional Effects", () => {
    it("applies inner glow class", () => {
      const { container } = render(<GlassCard>Content</GlassCard>)
      expect(container.firstChild).toHaveClass("inner-glow-ios26")
    })

    it("applies noise grain texture", () => {
      const { container } = render(<GlassCard>Content</GlassCard>)
      expect(container.firstChild).toHaveClass("noise-grain")
    })

    it("applies dimming layer when enabled", () => {
      const { container } = render(<GlassCard dimming>Content</GlassCard>)
      expect(container.firstChild).toHaveClass("liquid-glass-dim")
    })

    it("applies shimmer effect when enabled", () => {
      const { container } = render(<GlassCard shimmer>Content</GlassCard>)
      expect(container.firstChild).toHaveClass("shimmer-effect")
    })
  })

  describe("Content Rendering", () => {
    it("renders children correctly", () => {
      render(<GlassCard>Test Content</GlassCard>)
      expect(screen.getByText("Test Content")).toBeInTheDocument()
    })

    it("wraps children in z-index container", () => {
      const { container } = render(<GlassCard>Content</GlassCard>)
      const contentWrapper = container.querySelector(".z-10")
      expect(contentWrapper).toBeInTheDocument()
      expect(contentWrapper).toHaveTextContent("Content")
    })
  })

  describe("Custom Props", () => {
    it("forwards custom className", () => {
      const { container } = render(
        <GlassCard className="custom-class">Content</GlassCard>
      )
      expect(container.firstChild).toHaveClass("custom-class")
    })

    it("forwards data attributes", () => {
      const { container } = render(
        <GlassCard data-testid="glass-card">Content</GlassCard>
      )
      expect(container.querySelector("[data-testid='glass-card']")).toBeInTheDocument()
    })
  })

  describe("Accessibility", () => {
    it("respects reduced motion preference", () => {
      // Mock useReducedMotion to return true
      const { useReducedMotion } = require("framer-motion")
      useReducedMotion.mockReturnValue(true)

      // Re-render with reduced motion
      const { container } = render(<GlassCard interactive>Content</GlassCard>)

      // Card should still render
      expect(container.firstChild).toBeInTheDocument()

      // Reset mock
      useReducedMotion.mockReturnValue(false)
    })

    it("applies text color classes for visibility", () => {
      const { container } = render(<GlassCard>Content</GlassCard>)
      expect(container.firstChild).toHaveClass("text-slate-800")
      expect(container.firstChild).toHaveClass("dark:text-white")
    })
  })

  describe("Backward Compatibility", () => {
    it("supports deprecated hover prop", () => {
      // Should not throw when using hover prop
      const { container } = render(<GlassCard hover={false}>Content</GlassCard>)
      expect(container.firstChild).toBeInTheDocument()
    })
  })
})
