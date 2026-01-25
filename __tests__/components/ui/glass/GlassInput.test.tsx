/**
 * GlassInput Component Tests
 *
 * Tests for the Apple Liquid Glass 2026 GlassInput component
 * covering state rendering, focus behavior, labels, helper text,
 * icons, and accessibility attributes.
 */

import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { GlassInput } from "@/components/ui/glass/GlassInput"

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, transition, whileHover, whileTap, ...validProps } = props
      return <div {...validProps}>{children}</div>
    },
    label: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, transition, ...validProps } = props
      return <label {...validProps}>{children}</label>
    },
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, exit, transition, ...validProps } = props
      return <p {...validProps}>{children}</p>
    },
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<Record<string, unknown>>) => <>{children}</>,
  HTMLMotionProps: {},
}))

// Test icons
const TestIcon = () => <span data-testid="test-icon">Icon</span>
const SearchIcon = () => <span data-testid="search-icon">Search</span>
const ClearIcon = () => <span data-testid="clear-icon">X</span>

describe("GlassInput", () => {
  // ==================== BASIC RENDERING ====================

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      render(<GlassInput data-testid="glass-input" />)
      expect(screen.getByTestId("glass-input")).toBeInTheDocument()
    })

    it("renders with default props", () => {
      render(<GlassInput placeholder="Enter text" />)
      expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument()
    })

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLInputElement>()
      render(<GlassInput ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })

    it("accepts and displays value", () => {
      render(<GlassInput value="Test value" onChange={() => {}} />)
      expect(screen.getByDisplayValue("Test value")).toBeInTheDocument()
    })

    it("accepts defaultValue", () => {
      render(<GlassInput defaultValue="Default text" />)
      expect(screen.getByDisplayValue("Default text")).toBeInTheDocument()
    })
  })

  // ==================== STATE RENDERING (Task 3.11) ====================

  describe("State Rendering", () => {
    it("renders default state correctly", () => {
      const { container } = render(<GlassInput state="default" data-testid="input" />)
      const wrapper = container.querySelector(".liquid-glass-2026")
      expect(wrapper).toBeInTheDocument()
    })

    it("renders error state with appropriate styling", () => {
      render(<GlassInput state="error" helperText="Error message" />)
      const helperText = screen.getByText("Error message")
      expect(helperText).toBeInTheDocument()
      expect(helperText).toHaveAttribute("role", "alert")
    })

    it("renders success state", () => {
      render(<GlassInput state="success" helperText="Success!" />)
      expect(screen.getByText("Success!")).toBeInTheDocument()
    })

    it("renders warning state", () => {
      render(<GlassInput state="warning" helperText="Warning message" />)
      expect(screen.getByText("Warning message")).toBeInTheDocument()
    })

    it("applies error aria-invalid attribute", () => {
      render(<GlassInput state="error" data-testid="error-input" />)
      expect(screen.getByTestId("error-input")).toHaveAttribute("aria-invalid", "true")
    })
  })

  // ==================== VARIANT RENDERING (Task 3.11) ====================

  describe("Variant Rendering", () => {
    it("renders regular variant", () => {
      const { container } = render(<GlassInput variant="regular" />)
      expect(container.querySelector(".liquid-glass-2026-regular")).toBeInTheDocument()
    })

    it("renders clear variant", () => {
      const { container } = render(<GlassInput variant="clear" />)
      expect(container.querySelector(".liquid-glass-2026-clear")).toBeInTheDocument()
    })

    it("renders elevated variant", () => {
      const { container } = render(<GlassInput variant="elevated" />)
      expect(container.querySelector(".liquid-glass-2026-elevated")).toBeInTheDocument()
    })

    it("renders subtle variant", () => {
      const { container } = render(<GlassInput variant="subtle" />)
      expect(container.querySelector(".liquid-glass-2026-subtle")).toBeInTheDocument()
    })
  })

  // ==================== FOCUS BEHAVIOR (Task 3.12) ====================

  describe("Focus Behavior", () => {
    it("calls onFocus handler when focused", async () => {
      const handleFocus = jest.fn()
      render(<GlassInput onFocus={handleFocus} data-testid="focus-input" />)

      const input = screen.getByTestId("focus-input")
      fireEvent.focus(input)

      expect(handleFocus).toHaveBeenCalledTimes(1)
    })

    it("calls onBlur handler when blurred", async () => {
      const handleBlur = jest.fn()
      render(<GlassInput onBlur={handleBlur} data-testid="blur-input" />)

      const input = screen.getByTestId("blur-input")
      fireEvent.focus(input)
      fireEvent.blur(input)

      expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it("applies focus styling when focused", async () => {
      const user = userEvent.setup()
      render(<GlassInput data-testid="focus-style-input" />)

      const input = screen.getByTestId("focus-style-input")
      await user.click(input)

      // Input should be focused
      expect(document.activeElement).toBe(input)
    })
  })

  // ==================== LABEL SUPPORT (Task 3.13) ====================

  describe("Label Support", () => {
    it("renders static label above input", () => {
      render(<GlassInput label="Username" labelPosition="static" />)
      expect(screen.getByText("Username")).toBeInTheDocument()
    })

    it("renders floating label", () => {
      render(<GlassInput label="Email" labelPosition="floating" />)
      expect(screen.getByText("Email")).toBeInTheDocument()
    })

    it("associates label with input via htmlFor", () => {
      render(<GlassInput id="test-input" label="Test Label" />)
      const label = screen.getByText("Test Label")
      expect(label).toHaveAttribute("for", "test-input")
    })

    it("shows required indicator when required", () => {
      render(<GlassInput label="Required Field" required />)
      expect(screen.getByText("*")).toBeInTheDocument()
    })

    it("input has aria-labelledby when label provided", () => {
      render(<GlassInput id="aria-test" label="Aria Label" data-testid="aria-input" />)
      const input = screen.getByTestId("aria-input")
      expect(input).toHaveAttribute("aria-labelledby", "aria-test-label")
    })
  })

  // ==================== HELPER TEXT SUPPORT (Task 3.13) ====================

  describe("Helper Text Support", () => {
    it("renders helper text below input", () => {
      render(<GlassInput helperText="This is helper text" />)
      expect(screen.getByText("This is helper text")).toBeInTheDocument()
    })

    it("shows error message in helper text on error state", () => {
      render(<GlassInput state="error" helperText="Email is required" />)
      const helper = screen.getByText("Email is required")
      expect(helper).toBeInTheDocument()
      expect(helper).toHaveAttribute("role", "alert")
    })

    it("input has aria-describedby when helper text provided", () => {
      render(
        <GlassInput
          id="described-input"
          helperText="Helper text"
          data-testid="described"
        />
      )
      const input = screen.getByTestId("described")
      expect(input).toHaveAttribute("aria-describedby", "described-input-helper")
    })

    it("helper text has aria-live for error state", () => {
      render(<GlassInput state="error" helperText="Error!" />)
      const helper = screen.getByText("Error!")
      expect(helper).toHaveAttribute("aria-live", "polite")
    })
  })

  // ==================== ICON SUPPORT (Task 3.14) ====================

  describe("Icon Support", () => {
    it("renders left icon", () => {
      render(<GlassInput leftIcon={<SearchIcon />} />)
      expect(screen.getByTestId("search-icon")).toBeInTheDocument()
    })

    it("renders right icon", () => {
      render(<GlassInput rightIcon={<ClearIcon />} />)
      expect(screen.getByTestId("clear-icon")).toBeInTheDocument()
    })

    it("renders both icons simultaneously", () => {
      render(
        <GlassInput
          leftIcon={<SearchIcon />}
          rightIcon={<ClearIcon />}
        />
      )
      expect(screen.getByTestId("search-icon")).toBeInTheDocument()
      expect(screen.getByTestId("clear-icon")).toBeInTheDocument()
    })

    it("calls onRightIconClick when right icon is clicked", async () => {
      const handleClick = jest.fn()
      render(
        <GlassInput
          rightIcon={<ClearIcon />}
          onRightIconClick={handleClick}
        />
      )

      const iconButton = screen.getByRole("button")
      fireEvent.click(iconButton)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("right icon button has proper aria-label", () => {
      render(
        <GlassInput
          rightIcon={<ClearIcon />}
          onRightIconClick={() => {}}
        />
      )
      const iconButton = screen.getByRole("button")
      expect(iconButton).toHaveAttribute("aria-label", "Input action")
    })

    it("left icon has aria-hidden", () => {
      const { container } = render(<GlassInput leftIcon={<SearchIcon />} />)
      const iconWrapper = container.querySelector('[aria-hidden="true"]')
      expect(iconWrapper).toBeInTheDocument()
    })
  })

  // ==================== SIZE VARIANTS ====================

  describe("Size Variants", () => {
    it("renders small size", () => {
      render(<GlassInput size="sm" data-testid="sm-input" />)
      const input = screen.getByTestId("sm-input")
      expect(input).toHaveClass("h-9")
    })

    it("renders medium size (default)", () => {
      render(<GlassInput size="md" data-testid="md-input" />)
      const input = screen.getByTestId("md-input")
      expect(input).toHaveClass("h-11")
    })

    it("renders large size", () => {
      render(<GlassInput size="lg" data-testid="lg-input" />)
      const input = screen.getByTestId("lg-input")
      expect(input).toHaveClass("h-13")
    })
  })

  // ==================== ACCESSIBILITY ATTRIBUTES ====================

  describe("Accessibility Attributes", () => {
    it("has aria-required when required", () => {
      render(<GlassInput required data-testid="required-input" />)
      expect(screen.getByTestId("required-input")).toHaveAttribute("aria-required", "true")
    })

    it("has aria-invalid set to false for non-error states", () => {
      render(<GlassInput state="success" data-testid="valid-input" />)
      expect(screen.getByTestId("valid-input")).toHaveAttribute("aria-invalid", "false")
    })

    it("supports custom id", () => {
      render(<GlassInput id="custom-id" data-testid="custom-input" />)
      expect(screen.getByTestId("custom-input")).toHaveAttribute("id", "custom-id")
    })

    it("generates unique id when not provided", () => {
      render(<GlassInput data-testid="auto-id-input" />)
      const input = screen.getByTestId("auto-id-input")
      expect(input.id).toContain("glass-input")
    })
  })

  // ==================== DISABLED STATE ====================

  describe("Disabled State", () => {
    it("applies disabled attribute to input", () => {
      render(<GlassInput disabled data-testid="disabled-input" />)
      expect(screen.getByTestId("disabled-input")).toBeDisabled()
    })

    it("prevents right icon click when disabled", async () => {
      const handleClick = jest.fn()
      render(
        <GlassInput
          disabled
          rightIcon={<ClearIcon />}
          onRightIconClick={handleClick}
        />
      )

      const iconButton = screen.getByRole("button")
      fireEvent.click(iconButton)

      expect(handleClick).not.toHaveBeenCalled()
    })

    it("applies disabled styling to label", () => {
      render(<GlassInput disabled label="Disabled Label" />)
      const label = screen.getByText("Disabled Label")
      expect(label).toHaveClass("opacity-50")
    })
  })

  // ==================== INPUT TYPES ====================

  describe("Input Types", () => {
    it("supports text type", () => {
      render(<GlassInput type="text" data-testid="text-input" />)
      expect(screen.getByTestId("text-input")).toHaveAttribute("type", "text")
    })

    it("supports password type", () => {
      render(<GlassInput type="password" data-testid="password-input" />)
      expect(screen.getByTestId("password-input")).toHaveAttribute("type", "password")
    })

    it("supports email type", () => {
      render(<GlassInput type="email" data-testid="email-input" />)
      expect(screen.getByTestId("email-input")).toHaveAttribute("type", "email")
    })

    it("supports number type", () => {
      render(<GlassInput type="number" data-testid="number-input" />)
      expect(screen.getByTestId("number-input")).toHaveAttribute("type", "number")
    })
  })

  // ==================== EFFECTS PROPS ====================

  describe("Effects Props", () => {
    it("renders with inner glow by default", () => {
      const { container } = render(<GlassInput innerGlow />)
      // Inner glow creates an additional div with specific styles
      const glassContainer = container.querySelector(".liquid-glass-2026")
      expect(glassContainer).toBeInTheDocument()
    })

    it("renders without inner glow when disabled", () => {
      const { container } = render(<GlassInput innerGlow={false} />)
      // Component still renders
      expect(container.querySelector("input")).toBeInTheDocument()
    })

    it("renders with rim light", () => {
      const { container } = render(<GlassInput rimLight />)
      expect(container.querySelector(".rim-light-2026")).toBeInTheDocument()
    })

    it("renders with specular effect", () => {
      const { container } = render(<GlassInput specular />)
      expect(container.querySelector(".specular-2026")).toBeInTheDocument()
    })
  })

  // ==================== KEYBOARD INTERACTION ====================

  describe("Keyboard Interaction", () => {
    it("can be focused with Tab key", async () => {
      const user = userEvent.setup()
      render(
        <>
          <button>Before</button>
          <GlassInput data-testid="tabbed-input" />
        </>
      )

      await user.tab() // Focus button
      await user.tab() // Focus input

      expect(screen.getByTestId("tabbed-input")).toHaveFocus()
    })

    it("accepts keyboard input", async () => {
      const user = userEvent.setup()
      render(<GlassInput data-testid="keyboard-input" />)

      const input = screen.getByTestId("keyboard-input")
      await user.click(input)
      await user.type(input, "Hello World")

      expect(input).toHaveValue("Hello World")
    })
  })
})
