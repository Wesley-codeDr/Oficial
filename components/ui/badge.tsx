import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-[300ms] ease-[cubic-bezier(0.25,1,0.5,1)] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Healthcare primary (default)
        default: `
          liquid-glass-subtle
          bg-healthcare-primary/15 dark:bg-healthcare-primary-dark/20
          border-healthcare-primary/30 dark:border-healthcare-primary-dark/25
          text-healthcare-primary dark:text-healthcare-primary-dark
          hover:bg-healthcare-primary/25 dark:hover:bg-healthcare-primary-dark/30
          hover:scale-105
          hover:shadow-md hover:shadow-healthcare-primary/20
        `,
        // Healthcare neutral (secondary)
        secondary: `
          liquid-glass-subtle
          bg-healthcare-neutral/15 dark:bg-healthcare-neutral-dark/20
          border-healthcare-neutral/30 dark:border-healthcare-neutral-dark/25
          text-healthcare-neutral dark:text-healthcare-neutral-dark
          hover:bg-healthcare-neutral/25 dark:hover:bg-healthcare-neutral-dark/30
          hover:scale-105
          hover:shadow-md hover:shadow-healthcare-neutral/20
        `,
        // Healthcare critical (destructive)
        destructive: `
          liquid-glass-subtle
          bg-healthcare-critical/15 dark:bg-healthcare-critical-dark/20
          border-healthcare-critical/30 dark:border-healthcare-critical-dark/25
          text-healthcare-critical dark:text-healthcare-critical-dark
          hover:bg-healthcare-critical/25 dark:hover:bg-healthcare-critical-dark/30
          hover:scale-105
          hover:shadow-md hover:shadow-healthcare-critical/20
        `,
        // Healthcare success
        success: `
          liquid-glass-subtle
          bg-healthcare-success/15 dark:bg-healthcare-success-dark/20
          border-healthcare-success/30 dark:border-healthcare-success-dark/25
          text-healthcare-success dark:text-healthcare-success-dark
          hover:bg-healthcare-success/25 dark:hover:bg-healthcare-success-dark/30
          hover:scale-105
          hover:shadow-md hover:shadow-healthcare-success/20
        `,
        // Healthcare warning
        warning: `
          liquid-glass-subtle
          bg-healthcare-warning/15 dark:bg-healthcare-warning-dark/20
          border-healthcare-warning/30 dark:border-healthcare-warning-dark/25
          text-healthcare-warning dark:text-healthcare-warning-dark
          hover:bg-healthcare-warning/25 dark:hover:bg-healthcare-warning-dark/30
          hover:scale-105
          hover:shadow-md hover:shadow-healthcare-warning/20
        `,
        // Healthcare info
        info: `
          liquid-glass-subtle
          bg-healthcare-info/15 dark:bg-healthcare-info-dark/20
          border-healthcare-info/30 dark:border-healthcare-info-dark/25
          text-healthcare-info dark:text-healthcare-info-dark
          hover:bg-healthcare-info/25 dark:hover:bg-healthcare-info-dark/30
          hover:scale-105
          hover:shadow-md hover:shadow-healthcare-info/20
        `,
        outline: `
          liquid-glass-subtle
          bg-white/45 dark:bg-slate-900/55
          border-white/50 dark:border-white/12
          text-slate-900 dark:text-slate-100
          hover:bg-white/70 dark:hover:bg-slate-900/75
          hover:scale-105
          hover:shadow-md
        `,
      },
      size: {
        default: "px-3 py-1 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
