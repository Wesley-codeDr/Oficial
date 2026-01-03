"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum width constraint */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /** Responsive padding */
  padding?: "none" | "sm" | "md" | "lg";
  /** Center content horizontally */
  centered?: boolean;
}

const maxWidthClasses = {
  sm: "max-w-screen-sm",   // 640px
  md: "max-w-screen-md",   // 768px
  lg: "max-w-screen-lg",   // 1024px
  xl: "max-w-screen-xl",   // 1280px
  "2xl": "max-w-screen-2xl", // 1536px
  full: "max-w-full",
};

const paddingClasses = {
  none: "",
  sm: "px-3 xs:px-4 sm:px-6",       // 12px → 16px → 24px
  md: "px-4 xs:px-6 sm:px-8 md:px-10", // 16px → 24px → 32px → 40px
  lg: "px-6 xs:px-8 sm:px-10 md:px-12 lg:px-16", // 24px → 32px → 40px → 48px → 64px
};

/**
 * ResponsiveContainer Component
 *
 * Standardized responsive wrapper with automatic padding adjustment
 * Optimized for 320px+ devices with progressive enhancement
 *
 * @example
 * <ResponsiveContainer maxWidth="lg" padding="md">
 *   <YourContent />
 * </ResponsiveContainer>
 *
 * @example
 * // For 320px devices (minimal padding)
 * <ResponsiveContainer maxWidth="full" padding="sm" centered>
 *   <CompactMobileUI />
 * </ResponsiveContainer>
 */
export function ResponsiveContainer({
  children,
  className,
  maxWidth = "2xl",
  padding = "md",
  centered = true,
}: ResponsiveContainerProps) {
  return (
    <div
      className={cn(
        // Base styles
        "w-full",
        // Max width
        maxWidthClasses[maxWidth],
        // Padding
        paddingClasses[padding],
        // Centering
        centered && "mx-auto",
        // Custom classes
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * ResponsiveSection Component
 *
 * Section wrapper with vertical spacing and background support
 * Combines ResponsiveContainer with section semantics
 *
 * @example
 * <ResponsiveSection spacing="lg" background="glass">
 *   <SectionContent />
 * </ResponsiveSection>
 */
export interface ResponsiveSectionProps extends ResponsiveContainerProps {
  /** Vertical spacing */
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  /** Background style */
  background?: "none" | "white" | "slate" | "glass";
  /** Element tag */
  as?: "div" | "section" | "article" | "main";
}

const spacingClasses = {
  none: "",
  sm: "py-4 xs:py-6 sm:py-8",             // 16px → 24px → 32px
  md: "py-6 xs:py-8 sm:py-12 md:py-16",  // 24px → 32px → 48px → 64px
  lg: "py-8 xs:py-12 sm:py-16 md:py-20 lg:py-24", // 32px → 48px → 64px → 80px → 96px
  xl: "py-12 xs:py-16 sm:py-20 md:py-28 lg:py-32", // 48px → 64px → 80px → 112px → 128px
};

const backgroundClasses = {
  none: "",
  white: "bg-white dark:bg-slate-900",
  slate: "bg-slate-50 dark:bg-slate-800",
  glass: "bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10",
};

export function ResponsiveSection({
  children,
  className,
  maxWidth = "2xl",
  padding = "md",
  centered = true,
  spacing = "md",
  background = "none",
  as: Component = "section",
}: ResponsiveSectionProps) {
  return (
    <Component
      className={cn(
        // Base styles
        "w-full",
        // Spacing
        spacingClasses[spacing],
        // Background
        backgroundClasses[background],
        // Custom classes
        className
      )}
    >
      <ResponsiveContainer
        maxWidth={maxWidth}
        padding={padding}
        centered={centered}
      >
        {children}
      </ResponsiveContainer>
    </Component>
  );
}

/**
 * ResponsiveGrid Component
 *
 * Auto-responsive grid that adapts columns based on screen size
 *
 * @example
 * <ResponsiveGrid columns={{ xs: 1, sm: 2, lg: 4 }} gap="md">
 *   {items.map(item => <GridItem key={item.id} {...item} />)}
 * </ResponsiveGrid>
 */
export interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  /** Columns per breakpoint */
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
  /** Gap between items */
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
}

const gapClasses = {
  none: "gap-0",
  xs: "gap-2",
  sm: "gap-3 sm:gap-4",
  md: "gap-4 sm:gap-5 md:gap-6",
  lg: "gap-5 sm:gap-6 md:gap-8",
  xl: "gap-6 sm:gap-8 md:gap-10 lg:gap-12",
};

export function ResponsiveGrid({
  children,
  className,
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = "md",
}: ResponsiveGridProps) {
  const gridColsClasses = [
    columns.xs && `grid-cols-${columns.xs}`,
    columns.sm && `sm:grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
    columns["2xl"] && `2xl:grid-cols-${columns["2xl"]}`,
  ].filter(Boolean).join(" ");

  return (
    <div
      className={cn(
        "grid",
        gridColsClasses,
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
}
