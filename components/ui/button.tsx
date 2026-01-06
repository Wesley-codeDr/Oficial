"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, type HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-all duration-300 ease-apple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "btn-primary-glass text-white",
        destructive:
          "btn-primary-glass bg-gradient-to-br from-rose-500/90 to-rose-600/90 text-white shadow-lg shadow-rose-500/30",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 hover:shadow-apple glass-pill liquid-glass-rim",
        secondary:
          "glass-pill glass-molded-3d liquid-glass-rim liquid-glass-interactive hover:bg-black/5 dark:hover:bg-white/10",
        ghost:
          "glass-btn-ghost hover:bg-white/10",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-2xl px-8 text-base has-[>svg]:px-6",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

type ButtonProps = Omit<HTMLMotionProps<"button">, "ref"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  if (asChild) {
    return (
      <Slot
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...(props as React.ComponentProps<typeof Slot>)}
      />
    )
  }

  return (
    <motion.button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    />
  )
}

export { Button, buttonVariants, type ButtonProps }
