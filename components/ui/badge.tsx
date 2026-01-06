import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 glass-pill",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/20 text-primary backdrop-blur-xl hover:bg-primary/30",
        secondary:
          "border-transparent bg-secondary/50 text-secondary-foreground backdrop-blur-xl hover:bg-secondary/60",
        destructive:
          "border-transparent bg-destructive/20 text-destructive backdrop-blur-xl hover:bg-destructive/30",
        outline: "text-foreground glass-pill",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
