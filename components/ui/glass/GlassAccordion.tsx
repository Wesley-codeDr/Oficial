"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * GlassAccordion - Apple Liquid Glass 2026 Accordion
 *
 * Implements iOS 26 accordion behavior:
 * - Glass morphism panels with backdrop blur
 * - Smooth height animations on expand/collapse
 * - Chevron rotation animation
 * - Single or multiple selection modes
 * - Icon support in accordion headers
 *
 * Built on top of Radix UI Accordion for accessibility
 */

type GlassAccordionType = "single" | "multiple"
type GlassAccordionVariant = "regular" | "clear" | "elevated" | "subtle"

interface AccordionItemData {
  /** Unique identifier */
  id: string
  /** Header title */
  title: React.ReactNode
  /** Content when expanded */
  content: React.ReactNode
  /** Optional icon for header */
  icon?: React.ReactNode
  /** Whether the item is disabled */
  disabled?: boolean
}

interface GlassAccordionProps {
  /** Accordion items data */
  items: AccordionItemData[]
  /** Selection type */
  type?: GlassAccordionType
  /** Glass material variant */
  variant?: GlassAccordionVariant
  /** Default expanded items (array of ids) */
  defaultExpanded?: string[]
  /** Controlled expanded items */
  expanded?: string | string[]
  /** Callback when expanded items change */
  onExpandedChange?: (value: string | string[]) => void
  /** Whether to collapse other items when one is expanded (for single type) */
  collapsible?: boolean
  /** Additional className */
  className?: string
  /** Gap between items */
  gap?: "none" | "sm" | "md" | "lg"
}

// Variant classes for accordion container
const variantClasses: Record<GlassAccordionVariant, string> = {
  regular: "liquid-glass-2026-regular",
  clear: "liquid-glass-2026-clear",
  elevated: "liquid-glass-2026-elevated",
  subtle: "liquid-glass-2026-subtle",
}

// Gap classes
const gapClasses: Record<string, string> = {
  none: "gap-0",
  sm: "gap-1",
  md: "gap-2",
  lg: "gap-4",
}

/**
 * GlassAccordion - Main container component
 */
const GlassAccordion: React.FC<GlassAccordionProps> = ({
  items,
  type = "single",
  variant = "regular",
  defaultExpanded,
  expanded,
  onExpandedChange,
  collapsible = true,
  className,
  gap = "sm",
}) => {
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  // Common props for Radix Accordion
  const commonProps = {
    className: cn("flex flex-col", gapClasses[gap], className),
  }

  if (type === "single") {
    return (
      <AccordionPrimitive.Root
        type="single"
        defaultValue={defaultExpanded?.[0]}
        value={expanded as string | undefined}
        onValueChange={onExpandedChange as ((value: string) => void) | undefined}
        collapsible={collapsible}
        {...commonProps}
      >
        {items.map((item) => (
          <GlassAccordionItem
            key={item.id}
            item={item}
            variant={variant}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </AccordionPrimitive.Root>
    )
  }

  return (
    <AccordionPrimitive.Root
      type="multiple"
      defaultValue={defaultExpanded}
      value={expanded as string[] | undefined}
      onValueChange={onExpandedChange as ((value: string[]) => void) | undefined}
      {...commonProps}
    >
      {items.map((item) => (
        <GlassAccordionItem
          key={item.id}
          item={item}
          variant={variant}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </AccordionPrimitive.Root>
  )
}
GlassAccordion.displayName = "GlassAccordion"

/**
 * GlassAccordionItem - Individual accordion item
 */
interface GlassAccordionItemProps {
  item: AccordionItemData
  variant: GlassAccordionVariant
  prefersReducedMotion: boolean
}

const GlassAccordionItem: React.FC<GlassAccordionItemProps> = ({
  item,
  variant,
  prefersReducedMotion,
}) => {
  return (
    <AccordionPrimitive.Item
      value={item.id}
      disabled={item.disabled}
      className={cn(
        // Base styles
        "overflow-hidden",
        // Glass morphism
        "liquid-glass-2026",
        variantClasses[variant],
        // Border radius
        "rounded-xl",
        // Border
        "border border-white/20 dark:border-white/10",
        // Disabled state
        item.disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <GlassAccordionTrigger
        icon={item.icon}
        disabled={item.disabled}
        prefersReducedMotion={prefersReducedMotion}
      >
        {item.title}
      </GlassAccordionTrigger>
      <GlassAccordionContent prefersReducedMotion={prefersReducedMotion}>
        {item.content}
      </GlassAccordionContent>
    </AccordionPrimitive.Item>
  )
}

/**
 * GlassAccordionTrigger - Accordion header/trigger
 */
interface GlassAccordionTriggerProps {
  children: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
  prefersReducedMotion: boolean
  className?: string
}

const GlassAccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  GlassAccordionTriggerProps
>(({ children, icon, disabled, prefersReducedMotion, className }, ref) => {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base styles
          "flex flex-1 items-center justify-between py-4 px-4",
          // Typography
          "text-base font-medium text-slate-800 dark:text-slate-100",
          // Focus state
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2",
          // Hover state
          "hover:bg-white/10 dark:hover:bg-white/5",
          // Transition
          "transition-colors duration-200",
          // Cursor
          disabled ? "cursor-not-allowed" : "cursor-pointer",
          // Data state for chevron rotation
          "[&[data-state=open]>svg.accordion-chevron]:rotate-180",
          className
        )}
      >
        <div className="flex items-center gap-3">
          {/* Optional icon */}
          {icon && (
            <span className="flex items-center justify-center w-5 h-5 text-slate-600 dark:text-slate-400">
              {icon}
            </span>
          )}
          {/* Title */}
          <span>{children}</span>
        </div>

        {/* Chevron with rotation animation */}
        <ChevronDown
          className={cn(
            "accordion-chevron h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400",
            prefersReducedMotion
              ? "transition-none"
              : "transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]"
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})
GlassAccordionTrigger.displayName = "GlassAccordionTrigger"

/**
 * GlassAccordionContent - Animated content panel
 */
interface GlassAccordionContentProps {
  children: React.ReactNode
  prefersReducedMotion: boolean
  className?: string
}

const GlassAccordionContent = React.forwardRef<
  HTMLDivElement,
  GlassAccordionContentProps
>(({ children, prefersReducedMotion, className }, ref) => {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden",
        // Animation classes for Radix
        prefersReducedMotion
          ? ""
          : "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      )}
    >
      <div
        className={cn(
          // Padding
          "px-4 pb-4 pt-0",
          // Typography
          "text-sm text-slate-600 dark:text-slate-300",
          // Border top
          "border-t border-white/10 dark:border-white/5",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
})
GlassAccordionContent.displayName = "GlassAccordionContent"

/**
 * Standalone components for custom accordion building
 */
const GlassAccordionRoot = AccordionPrimitive.Root

export {
  GlassAccordion,
  GlassAccordionRoot,
  GlassAccordionItem,
  GlassAccordionTrigger,
  GlassAccordionContent,
}

export type {
  GlassAccordionProps,
  GlassAccordionType,
  GlassAccordionVariant,
  AccordionItemData,
}
