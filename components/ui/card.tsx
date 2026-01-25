"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Card Component - Apple Liquid Glass 2026 Style
 * 
 * Glassmorphism-styled card components with specular highlights
 * and subtle animations.
 * 
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content goes here</CardContent>
 *   <CardFooter>Footer actions</CardFooter>
 * </Card>
 * ```
 */

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "glass" | "elevated" | "subtle" | "healthcare-success" | "healthcare-warning" | "healthcare-critical" | "healthcare-info"
  }
>(({ className, variant = "glass", ...props }, ref) => {
  const variantClasses = {
    default: "bg-ww-neutral text-ww-primary border border-ww-neutral shadow-sm",
    glass: [
      "glass-ww-default",
      "bg-ww-neutral/35 dark:bg-ww-primary/40",
      "border border-ww-neutral/50 dark:border-ww-primary/12",
      "shadow-[0_8px_32px_rgba(0,34,125,0.08),inset_0_1px_1px_rgba(31,168,227,0.5)]",
      "dark:shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(31,168,227,0.1)]",
    ].join(" "),
    elevated: [
      "liquid-glass-default",
      "bg-white/45 dark:bg-slate-900/50",
      "border border-white/50 dark:border-white/15",
      "shadow-[0_25px_50px_-12px_rgba(0,78,146,0.12),0_8px_24px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.6)]",
      "dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]",
    ].join(" "),
    subtle: [
      "liquid-glass-subtle",
      "bg-white/20 dark:bg-slate-900/25",
      "border border-white/25 dark:border-white/08",
      "shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.3)]",
      "dark:shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]",
    ].join(" "),
    // Healthcare semantic variants
    "healthcare-success": [
      "liquid-glass-subtle",
      "bg-healthcare-success-glass dark:bg-healthcare-success-glass",
      "border border-healthcare-success/20 dark:border-healthcare-success-dark/20",
      "shadow-[0_8px_32px_rgba(0,200,83,0.1),inset_0_1px_0_rgba(255,255,255,0.3)]",
    ].join(" "),
    "healthcare-warning": [
      "liquid-glass-subtle",
      "bg-healthcare-warning-glass dark:bg-healthcare-warning-glass",
      "border border-healthcare-warning/20 dark:border-healthcare-warning-dark/20",
      "shadow-[0_8px_32px_rgba(255,149,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)]",
    ].join(" "),
    "healthcare-critical": [
      "liquid-glass-subtle",
      "bg-healthcare-critical-glass dark:bg-healthcare-critical-glass",
      "border border-healthcare-critical/20 dark:border-healthcare-critical-dark/20",
      "shadow-[0_8px_32px_rgba(255,59,48,0.1),inset_0_1px_0_rgba(255,255,255,0.3)]",
    ].join(" "),
    "healthcare-info": [
      "liquid-glass-subtle",
      "bg-healthcare-info-glass dark:bg-healthcare-info-glass",
      "border border-healthcare-info/20 dark:border-healthcare-info-dark/20",
      "shadow-[0_8px_32px_rgba(90,200,250,0.1),inset_0_1px_0_rgba(255,255,255,0.3)]",
    ].join(" "),
  }

  return (
    <div
      ref={ref}
      data-slot="card"
      className={cn(
        "relative rounded-3xl text-slate-800 dark:text-white",
        "transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-header"
    className={cn(
      "flex flex-col gap-1.5 p-6",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-title"
    className={cn(
      "font-semibold text-lg leading-none tracking-tight text-slate-900 dark:text-white",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-description"
    className={cn(
      "text-sm text-slate-600 dark:text-slate-400",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-content"
    className={cn("p-6 pt-0", className)}
    {...props}
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-footer"
    className={cn(
      "flex items-center p-6 pt-0",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
