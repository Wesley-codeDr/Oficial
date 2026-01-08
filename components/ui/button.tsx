"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, type HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-all duration-[300ms] ease-[cubic-bezier(0.25,1,0.5,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: `
          bg-gradient-to-r from-blue-500 to-blue-600
          text-white
          shadow-lg shadow-blue-500/30
          hover:shadow-xl hover:shadow-blue-500/40
          hover:-translate-y-0.5
          hover:from-blue-600 hover:to-blue-700
          active:translate-y-0 active:shadow-md
        `,
        destructive: `
          bg-gradient-to-r from-rose-500 to-rose-600
          text-white
          shadow-lg shadow-rose-500/30
          hover:shadow-xl hover:shadow-rose-500/40
          hover:-translate-y-0.5
          hover:from-rose-600 hover:to-rose-700
          active:translate-y-0 active:shadow-md
        `,
        outline: `
          backdrop-blur-[40px] saturate-[180%]
          bg-white/55 dark:bg-slate-900/65
          border-[1.5px] border-white/50 dark:border-white/12
          text-slate-900 dark:text-slate-100
          shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]
          dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)]
          dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]
          hover:bg-white/70 dark:hover:bg-slate-900/75
          hover:scale-[1.02]
          hover:shadow-lg
        `,
        secondary: `
          backdrop-blur-[40px] saturate-[180%]
          bg-white/45 dark:bg-slate-900/55
          border-[1.5px] border-white/40 dark:border-white/10
          text-slate-700 dark:text-slate-200
          shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]
          dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]
          dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]
          hover:bg-black/5 dark:hover:bg-white/10
          hover:scale-[1.02]
        `,
        ghost: `
          backdrop-blur-sm
          bg-white/30 dark:bg-white/5
          text-slate-700 dark:text-slate-200
          hover:bg-white/60 dark:hover:bg-white/15
          hover:scale-[1.02]
        `,
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-9 rounded-xl gap-1.5 px-3 has-[>svg]:px-2.5",
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
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    />
  )
}

export { Button, buttonVariants, type ButtonProps }
