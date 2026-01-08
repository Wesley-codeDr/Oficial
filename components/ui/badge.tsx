import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-[300ms] ease-[cubic-bezier(0.25,1,0.5,1)] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: `
          backdrop-blur-[40px] saturate-[180%]
          bg-blue-500/15 dark:bg-blue-500/20
          border-blue-500/30 dark:border-blue-500/25
          text-blue-700 dark:text-blue-300
          hover:bg-blue-500/25 dark:hover:bg-blue-500/30
          hover:scale-105
          hover:shadow-md hover:shadow-blue-500/20
        `,
        secondary: `
          backdrop-blur-[40px] saturate-[180%]
          bg-slate-500/15 dark:bg-slate-500/20
          border-slate-500/30 dark:border-slate-500/25
          text-slate-700 dark:text-slate-300
          hover:bg-slate-500/25 dark:hover:bg-slate-500/30
          hover:scale-105
          hover:shadow-md hover:shadow-slate-500/20
        `,
        destructive: `
          backdrop-blur-[40px] saturate-[180%]
          bg-rose-500/15 dark:bg-rose-500/20
          border-rose-500/30 dark:border-rose-500/25
          text-rose-700 dark:text-rose-300
          hover:bg-rose-500/25 dark:hover:bg-rose-500/30
          hover:scale-105
          hover:shadow-md hover:shadow-rose-500/20
        `,
        success: `
          backdrop-blur-[40px] saturate-[180%]
          bg-green-500/15 dark:bg-green-500/20
          border-green-500/30 dark:border-green-500/25
          text-green-700 dark:text-green-300
          hover:bg-green-500/25 dark:hover:bg-green-500/30
          hover:scale-105
          hover:shadow-md hover:shadow-green-500/20
        `,
        outline: `
          backdrop-blur-[40px] saturate-[180%]
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
