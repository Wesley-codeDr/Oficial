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
    variant?: "default" | "glass" | "elevated" | "subtle"
  }
>(({ className, variant = "glass", ...props }, ref) => {
  const variantClasses = {
    default: "bg-card text-card-foreground border border-border shadow-sm",
    glass: [
      "backdrop-blur-[60px] saturate-[180%]",
      "bg-white/35 dark:bg-slate-900/40",
      "border border-white/40 dark:border-white/12",
      "shadow-[0_8px_32px_rgba(0,78,146,0.08),inset_0_1px_1px_rgba(255,255,255,0.5)]",
      "dark:shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.1)]",
    ].join(" "),
    elevated: [
      "backdrop-blur-[80px] saturate-[200%]",
      "bg-white/45 dark:bg-slate-900/50",
      "border border-white/50 dark:border-white/15",
      "shadow-[0_25px_50px_-12px_rgba(0,78,146,0.12),0_8px_24px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.6)]",
      "dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]",
    ].join(" "),
    subtle: [
      "backdrop-blur-[40px] saturate-[150%]",
      "bg-white/20 dark:bg-slate-900/25",
      "border border-white/25 dark:border-white/08",
      "shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.3)]",
      "dark:shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]",
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
