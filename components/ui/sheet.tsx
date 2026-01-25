"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Sheet Component
 * 
 * Apple Liquid Glass 2026 styled side panel / drawer.
 * Features glassmorphism with backdrop blur, edge glow, and smooth slide animations.
 */

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "glass-overlay",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  [
    "fixed z-50 gap-4 p-6",
    // Glass styling base
    "liquid-glass-default",
    "bg-white/75 dark:bg-slate-900/80",
    "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)]",
    "dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)]",
    // Inner glow
    "before:absolute before:inset-0 before:rounded-inherit before:pointer-events-none",
    "before:bg-gradient-to-b before:from-white/20 before:to-transparent",
    // Transition
    "transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:duration-300 data-[state=open]:duration-500",
  ].join(" "),
  {
    variants: {
      side: {
        top: [
          "inset-x-0 top-0",
          "border-b border-white/40 dark:border-white/10",
          "rounded-b-[32px]",
          "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        ].join(" "),
        bottom: [
          "inset-x-0 bottom-0",
          "border-t border-white/40 dark:border-white/10",
          "rounded-t-[32px]",
          "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        ].join(" "),
        left: [
          "inset-y-0 left-0 h-full w-3/4 sm:max-w-sm",
          "glass-sheet glass-sheet-left",
          "border-r border-white/40 dark:border-white/10",
          "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        ].join(" "),
        right: [
          "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm",
          "glass-sheet",
          "border-l border-white/40 dark:border-white/10",
          "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
        ].join(" "),
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  /** Hide the default close button */
  hideCloseButton?: boolean
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, hideCloseButton = false, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      {!hideCloseButton && (
        <SheetPrimitive.Close className={cn(
          "absolute right-4 top-4",
          "w-8 h-8 flex items-center justify-center",
          "rounded-full",
          // Glass button styling
          "bg-black/5 dark:bg-white/10",
          "liquid-glass-subtle",
          "border border-white/30 dark:border-white/15",
          "text-slate-500 dark:text-slate-400",
          // Hover state
          "hover:bg-black/10 dark:hover:bg-white/15",
          "hover:text-slate-700 dark:hover:text-slate-200",
          "hover:scale-105",
          // Focus state
          "focus:outline-none focus-visible:ring-2",
          "focus-visible:ring-medical-blue-500/30 focus-visible:ring-offset-2",
          // Active state
          "active:scale-95",
          // Disabled state
          "disabled:pointer-events-none disabled:opacity-50",
          // Transition
          "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        )}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      )}
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      "pb-4 mb-4",
      "border-b border-white/20 dark:border-white/10",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3",
      "pt-4 mt-4",
      "border-t border-white/20 dark:border-white/10",
      "bg-white/10 dark:bg-black/10",
      "-mx-6 px-6 -mb-6 pb-6",
      "rounded-b-[32px]",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold",
      "text-slate-900 dark:text-slate-100",
      className
    )}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn(
      "text-sm text-slate-600 dark:text-slate-400",
      "leading-relaxed",
      className
    )}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
