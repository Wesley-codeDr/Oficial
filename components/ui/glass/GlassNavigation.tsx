"use client"

import * as React from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * GlassNavigation - Apple Liquid Glass 2026 Scroll-Responsive Navigation
 *
 * Implements iOS 26 navigation behavior:
 * - Headers shrink from 64px to 48px on scroll
 * - Tab bars shrink icons and fade labels
 * - Smooth spring animations (200ms Apple easing)
 * - Edge blur effects at scroll boundaries
 *
 * @see https://developer.apple.com/design/human-interface-guidelines/navigation
 */

type GlassNavigationVariant = "header" | "tabBar" | "sidebar"

interface GlassNavigationProps {
  /** Navigation variant */
  variant?: GlassNavigationVariant
  /** Child content */
  children: React.ReactNode
  /** Scroll threshold to trigger shrink (default: 50px) */
  scrollThreshold?: number
  /** Height when expanded (default: 64px for header, 56px for tabBar) */
  expandedHeight?: number
  /** Height when collapsed (default: 48px for header, 44px for tabBar) */
  collapsedHeight?: number
  /** Enable sticky positioning */
  sticky?: boolean
  /** Show edge blur gradient effect */
  showEdgeBlur?: boolean
  /** Additional className */
  className?: string
  /** Position for tabBar variant */
  position?: "top" | "bottom"
  /** Custom scroll container ref (defaults to window) */
  scrollContainerRef?: React.RefObject<HTMLElement>
}

interface TabBarItemProps {
  /** Icon element */
  icon: React.ReactNode
  /** Label text */
  label: string
  /** Active state */
  active?: boolean
  /** Click handler */
  onClick?: () => void
  /** Is navigation collapsed */
  isCollapsed?: boolean
  /** Additional className */
  className?: string
}

/**
 * TabBarItem - Individual tab bar item with shrink behavior
 */
const TabBarItem = React.forwardRef<HTMLButtonElement, TabBarItemProps>(
  ({ icon, label, active = false, onClick, isCollapsed = false, className }, ref) => {
    return (
      <motion.button
        ref={ref}
        onClick={onClick}
        className={cn(
          "flex flex-col items-center justify-center min-w-[44px] min-h-[44px]",
          "transition-colors duration-200",
          active
            ? "text-blue-500 dark:text-blue-400"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200",
          className
        )}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Icon with size animation */}
        <motion.div
          className="flex items-center justify-center"
          animate={{
            width: isCollapsed ? 20 : 24,
            height: isCollapsed ? 20 : 24,
          }}
          transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
        >
          {icon}
        </motion.div>

        {/* Label with opacity animation */}
        <motion.span
          className="text-xs font-medium mt-1 whitespace-nowrap overflow-hidden"
          animate={{
            opacity: isCollapsed ? 0 : 1,
            height: isCollapsed ? 0 : "auto",
            marginTop: isCollapsed ? 0 : 4,
          }}
          transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
        >
          {label}
        </motion.span>
      </motion.button>
    )
  }
)
TabBarItem.displayName = "TabBarItem"

/**
 * EdgeBlur - Gradient blur effect at scroll boundaries
 */
const EdgeBlur: React.FC<{ position: "top" | "bottom"; visible: boolean }> = ({
  position,
  visible,
}) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "absolute left-0 right-0 h-10 pointer-events-none z-10",
          position === "top" ? "top-full" : "bottom-full",
          position === "top"
            ? "bg-gradient-to-b from-white/30 to-transparent dark:from-slate-900/30"
            : "bg-gradient-to-t from-white/30 to-transparent dark:from-slate-900/30"
        )}
        style={{
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      />
    )}
  </AnimatePresence>
)

/**
 * GlassNavigation - Main component
 */
const GlassNavigation = React.forwardRef<HTMLElement, GlassNavigationProps>(
  (
    {
      variant = "header",
      children,
      scrollThreshold = 50,
      expandedHeight,
      collapsedHeight,
      sticky = true,
      showEdgeBlur = true,
      className,
      position = "top",
      scrollContainerRef,
    },
    ref
  ) => {
    // Default heights based on variant (iOS 26 specifications)
    const defaultExpandedHeight = variant === "header" ? 64 : variant === "tabBar" ? 56 : 64
    const defaultCollapsedHeight = variant === "header" ? 48 : variant === "tabBar" ? 44 : 48

    const finalExpandedHeight = expandedHeight ?? defaultExpandedHeight
    const finalCollapsedHeight = collapsedHeight ?? defaultCollapsedHeight

    // Track scroll position
    const { scrollY } = useScroll({
      container: scrollContainerRef,
    })

    // Calculate isCollapsed state
    const [isCollapsed, setIsCollapsed] = React.useState(false)
    const [showTopEdge, setShowTopEdge] = React.useState(false)

    // Monitor scroll position
    React.useEffect(() => {
      const unsubscribe = scrollY.on("change", (latest) => {
        setIsCollapsed(latest > scrollThreshold)
        setShowTopEdge(latest > 0)
      })
      return () => unsubscribe()
    }, [scrollY, scrollThreshold])

    // Animated values
    const height = useTransform(
      scrollY,
      [0, scrollThreshold, scrollThreshold + 50],
      [finalExpandedHeight, finalExpandedHeight, finalCollapsedHeight]
    )

    const paddingVertical = useTransform(
      scrollY,
      [0, scrollThreshold, scrollThreshold + 50],
      [16, 16, 8]
    )

    // Reduced motion check
    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)
    React.useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(mediaQuery.matches)

      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
      mediaQuery.addEventListener("change", handler)
      return () => mediaQuery.removeEventListener("change", handler)
    }, [])

    // Position classes based on variant
    const positionClasses = {
      header: sticky ? "sticky top-0" : "relative",
      tabBar: sticky
        ? position === "bottom"
          ? "fixed bottom-0 left-0 right-0"
          : "sticky top-0"
        : "relative",
      sidebar: "fixed left-0 top-0 bottom-0",
    }

    return (
      <motion.nav
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(
          // Base styles
          "w-full z-50",
          positionClasses[variant],
          // Glass morphism
          "liquid-glass-2026 liquid-glass-2026-regular",
          // Border
          "border-b border-white/20 dark:border-white/10",
          className
        )}
        style={{
          height: prefersReducedMotion ? (isCollapsed ? finalCollapsedHeight : finalExpandedHeight) : height,
          paddingTop: prefersReducedMotion ? (isCollapsed ? 8 : 16) : paddingVertical,
          paddingBottom: prefersReducedMotion ? (isCollapsed ? 8 : 16) : paddingVertical,
          // Ensure GPU acceleration
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Content wrapper */}
        <div className="relative h-full px-4 flex items-center">
          {/* Pass isCollapsed to children via context or clone */}
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && typeof child.type !== "string") {
              return React.cloneElement(child as React.ReactElement<{ isCollapsed?: boolean }>, {
                isCollapsed,
              })
            }
            return child
          })}
        </div>

        {/* Edge blur effects */}
        {showEdgeBlur && variant === "header" && (
          <EdgeBlur position="top" visible={showTopEdge} />
        )}
        {showEdgeBlur && variant === "tabBar" && position === "bottom" && (
          <EdgeBlur position="bottom" visible={showTopEdge} />
        )}
      </motion.nav>
    )
  }
)
GlassNavigation.displayName = "GlassNavigation"

/**
 * GlassNavigationContent - Container for navigation content
 */
interface GlassNavigationContentProps {
  children: React.ReactNode
  className?: string
  isCollapsed?: boolean
}

const GlassNavigationContent: React.FC<GlassNavigationContentProps> = ({
  children,
  className,
  isCollapsed,
}) => (
  <div
    className={cn(
      "flex items-center justify-between w-full h-full",
      className
    )}
  >
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child) && typeof child.type !== "string") {
        return React.cloneElement(child as React.ReactElement<{ isCollapsed?: boolean }>, {
          isCollapsed,
        })
      }
      return child
    })}
  </div>
)
GlassNavigationContent.displayName = "GlassNavigationContent"

/**
 * GlassNavigationBrand - Brand/logo section
 */
interface GlassNavigationBrandProps {
  children: React.ReactNode
  className?: string
  isCollapsed?: boolean
}

const GlassNavigationBrand: React.FC<GlassNavigationBrandProps> = ({
  children,
  className,
}) => (
  <div className={cn("flex items-center gap-3", className)}>
    {children}
  </div>
)
GlassNavigationBrand.displayName = "GlassNavigationBrand"

/**
 * GlassNavigationLinks - Navigation links section
 */
interface GlassNavigationLinksProps {
  children: React.ReactNode
  className?: string
  isCollapsed?: boolean
}

const GlassNavigationLinks: React.FC<GlassNavigationLinksProps> = ({
  children,
  className,
  isCollapsed,
}) => (
  <div className={cn("flex items-center gap-1", className)}>
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child) && typeof child.type !== "string") {
        return React.cloneElement(child as React.ReactElement<{ isCollapsed?: boolean }>, {
          isCollapsed,
        })
      }
      return child
    })}
  </div>
)
GlassNavigationLinks.displayName = "GlassNavigationLinks"

/**
 * GlassNavigationActions - Actions section (buttons, etc.)
 */
interface GlassNavigationActionsProps {
  children: React.ReactNode
  className?: string
  isCollapsed?: boolean
}

const GlassNavigationActions: React.FC<GlassNavigationActionsProps> = ({
  children,
  className,
}) => (
  <div className={cn("flex items-center gap-2", className)}>
    {children}
  </div>
)
GlassNavigationActions.displayName = "GlassNavigationActions"

export {
  GlassNavigation,
  GlassNavigationContent,
  GlassNavigationBrand,
  GlassNavigationLinks,
  GlassNavigationActions,
  TabBarItem,
  EdgeBlur,
}

export type {
  GlassNavigationProps,
  GlassNavigationVariant,
  TabBarItemProps,
}
