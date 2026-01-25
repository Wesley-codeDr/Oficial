import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex h-9 w-full rounded-xl border bg-white/50 dark:bg-slate-900/50 px-3 py-1 text-base shadow-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-ww-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm liquid-glass-subtle",
  {
    variants: {
      variant: {
        default: [
          "border-[#8E8E93]/50 dark:border-white/10",
          "focus-visible:ring-2 focus-visible:ring-[#007AFF]/30 focus-visible:border-[#007AFF]/50",
        ].join(" "),
        success: [
          "border-[#34C759]/50 dark:border-[#30D158]/30",
          "focus-visible:ring-2 focus-visible:ring-[#34C759]/30 focus-visible:border-[#34C759]/50",
          "bg-[#34C759]/8",
        ].join(" "),
        warning: [
          "border-[#FF9500]/50 dark:border-[#FF9F0A]/30",
          "focus-visible:ring-2 focus-visible:ring-[#FF9500]/30 focus-visible:border-[#FF9500]/50",
          "bg-[#FF9500]/8",
        ].join(" "),
        error: [
          "border-[#FF3B30]/50 dark:border-[#FF453A]/30",
          "focus-visible:ring-2 focus-visible:ring-[#FF3B30]/30 focus-visible:border-[#FF3B30]/50",
          "bg-[#FF3B30]/8",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {}

function Input({ className, type, variant, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }
