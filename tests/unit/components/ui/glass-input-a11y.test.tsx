import React from "react"
import { render, screen } from "@testing-library/react"
import { GlassInput } from "@/components/ui/glass-input"
import { vi, describe, it, expect } from 'vitest'

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { initial, animate, transition, ...validProps } = props
      return <div {...validProps}>{children}</div>
    },
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { initial, animate, exit, transition, ...validProps } = props
      return <p {...validProps}>{children}</p>
    },
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<Record<string, unknown>>) => <>{children}</>,
  HTMLMotionProps: {},
}))

describe("GlassInput Accessibility", () => {
  it("links input to error message via aria-describedby when error is present", () => {
    render(
      <GlassInput
        error={true}
        errorMessage="Invalid email"
        data-testid="test-input"
        id="email-input"
      />
    )

    const input = screen.getByTestId("test-input")
    const errorMessage = screen.getByText("Invalid email")

    // Check if error message has an ID
    expect(errorMessage.id).toBeTruthy()
    // Check if input points to that ID
    expect(input).toHaveAttribute("aria-describedby", errorMessage.id)
  })

  it("sets aria-invalid='true' when error is present", () => {
    render(<GlassInput error={true} errorMessage="Error" data-testid="test-input" />)
    const input = screen.getByTestId("test-input")
    expect(input).toHaveAttribute("aria-invalid", "true")
  })

  it("does not set aria-invalid or aria-describedby when no error", () => {
    render(<GlassInput error={false} data-testid="test-input" />)
    const input = screen.getByTestId("test-input")
    expect(input).not.toHaveAttribute("aria-invalid")
    expect(input).not.toHaveAttribute("aria-describedby")
  })

  it("applies aria-label to right icon button", () => {
    const handleRightIconClick = vi.fn()
    render(
      <GlassInput
        rightIcon={<span>X</span>}
        onRightIconClick={handleRightIconClick}
        rightIconLabel="Clear input"
      />
    )

    const button = screen.getByRole("button", { name: "Clear input" })
    expect(button).toBeInTheDocument()
  })

  it("generates stable IDs for error linkage if no ID provided", () => {
    render(
      <GlassInput
        error={true}
        errorMessage="Error msg"
        data-testid="test-input"
      />
    )

    const input = screen.getByTestId("test-input")
    const errorMessage = screen.getByText("Error msg")

    expect(input.id).toBeTruthy()
    expect(errorMessage.id).toBeTruthy()
    expect(input).toHaveAttribute("aria-describedby", errorMessage.id)
  })
})
