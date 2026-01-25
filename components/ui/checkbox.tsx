"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cva, type VariantProps } from "class-variance-authority"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  [
    "peer h-5 w-5 shrink-0 rounded-lg border shadow-sm",
    "transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "liquid-glass-subtle",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "border-[#007AFF]/30 dark:border-[#0A84FF]/30",
          "focus-visible:ring-[#007AFF]/30",
          "data-[state=checked]:bg-[#007AFF] data-[state=checked]:border-[#007AFF]",
          "dark:data-[state=checked]:bg-[#0A84FF] dark:data-[state=checked]:border-[#0A84FF]",
          "data-[state=checked]:text-white",
        ].join(" "),
        success: [
          "border-[#34C759]/30 dark:border-[#30D158]/30",
          "focus-visible:ring-[#34C759]/30",
          "data-[state=checked]:bg-[#34C759] data-[state=checked]:border-[#34C759]",
          "dark:data-[state=checked]:bg-[#30D158] dark:data-[state=checked]:border-[#30D158]",
          "data-[state=checked]:text-white",
        ].join(" "),
        warning: [
          "border-[#FF9500]/30 dark:border-[#FF9F0A]/30",
          "focus-visible:ring-[#FF9500]/30",
          "data-[state=checked]:bg-[#FF9500] data-[state=checked]:border-[#FF9500]",
          "dark:data-[state=checked]:bg-[#FF9F0A] dark:data-[state=checked]:border-[#FF9F0A]",
          "data-[state=checked]:text-white",
        ].join(" "),
        critical: [
          "border-[#FF3B30]/30 dark:border-[#FF453A]/30",
          "focus-visible:ring-[#FF3B30]/30",
          "data-[state=checked]:bg-[#FF3B30] data-[state=checked]:border-[#FF3B30]",
          "dark:data-[state=checked]:bg-[#FF453A] dark:data-[state=checked]:border-[#FF453A]",
          "data-[state=checked]:text-white",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
    VariantProps<typeof checkboxVariants>
>(({ className, variant, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ variant }), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" strokeWidth={3} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox, checkboxVariants }
