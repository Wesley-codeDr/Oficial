"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, type HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[40px] text-sm font-semibold ring-offset-background transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary: `
          bg-gradient-to-br from-medical-blue-400 via-medical-blue-500 to-medical-blue-600
          text-white
          shadow-[0_8px_32px_rgba(0,122,255,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]
          hover:shadow-[0_12px_40px_rgba(0,122,255,0.45),inset_0_1px_0_rgba(255,255,255,0.3)]
          hover:-translate-y-1
          hover:brightness-110
          active:translate-y-0 active:shadow-[0_4px_16px_rgba(0,122,255,0.3)]
          before:absolute before:inset-0 before:rounded-[40px] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none
          relative overflow-hidden
        `,
        "medical-green": `
          bg-gradient-to-br from-medical-green-400 via-medical-green-500 to-medical-green-600
          text-white
          shadow-[0_8px_32px_rgba(52,199,89,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]
          hover:shadow-[0_12px_40px_rgba(52,199,89,0.45),inset_0_1px_0_rgba(255,255,255,0.3)]
          hover:-translate-y-1
          hover:brightness-110
          active:translate-y-0 active:shadow-[0_4px_16px_rgba(52,199,89,0.3)]
          before:absolute before:inset-0 before:rounded-[40px] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none
          relative overflow-hidden
        `,
        "medical-teal": `
          bg-gradient-to-br from-medical-teal-400 via-medical-teal-500 to-medical-teal-600
          text-white
          shadow-[0_8px_32px_rgba(48,176,199,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]
          hover:shadow-[0_12px_40px_rgba(48,176,199,0.45),inset_0_1px_0_rgba(255,255,255,0.3)]
          hover:-translate-y-1
          hover:brightness-110
          active:translate-y-0 active:shadow-[0_4px_16px_rgba(48,176,199,0.3)]
          before:absolute before:inset-0 before:rounded-[40px] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none
          relative overflow-hidden
        `,
        destructive: `
          bg-gradient-to-br from-[#FF453A] via-[#FF3B30] to-[#E6332B]
          text-white
          shadow-[0_8px_32px_rgba(255,59,48,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]
          hover:shadow-[0_12px_40px_rgba(255,59,48,0.45),inset_0_1px_0_rgba(255,255,255,0.3)]
          hover:-translate-y-1
          hover:brightness-110
          active:translate-y-0 active:shadow-[0_4px_16px_rgba(255,59,48,0.3)]
          before:absolute before:inset-0 before:rounded-[40px] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none
          relative overflow-hidden
        `,
        outline: `
          backdrop-blur-[80px] saturate-[200%]
          bg-white/25 dark:bg-slate-900/30
          border-[1.5px] border-white/50 dark:border-white/15
          text-slate-800 dark:text-slate-100
          shadow-[0_8px_32px_rgba(0,122,255,0.08),inset_0_1px_1px_rgba(255,255,255,0.5)]
          dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
          hover:bg-white/40 dark:hover:bg-slate-900/45
          hover:scale-[1.02]
          hover:shadow-[0_12px_40px_rgba(0,122,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.6)]
          hover:border-white/70 dark:hover:border-white/25
        `,
        secondary: `
          backdrop-blur-[80px] saturate-[200%]
          bg-white/35 dark:bg-slate-900/40
          border-[1.5px] border-white/45 dark:border-white/12
          text-slate-700 dark:text-slate-200
          shadow-[0_8px_32px_rgba(0,122,255,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)]
          dark:shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)]
          hover:bg-white/50 dark:hover:bg-slate-900/55
          hover:scale-[1.02]
          hover:border-medical-blue-500/30
        `,
        ghost: `
          backdrop-blur-[40px]
          bg-white/20 dark:bg-white/5
          text-slate-700 dark:text-slate-200
          hover:bg-white/45 dark:hover:bg-white/12
          hover:scale-[1.02]
          border border-transparent
          hover:border-white/30
        `,
        "glass-medical": `
          backdrop-blur-[80px] saturate-[200%]
          bg-medical-blue-500/10 dark:bg-medical-blue-400/15
          border-[1.5px] border-medical-blue-500/25 dark:border-medical-blue-400/30
          text-medical-blue-700 dark:text-medical-blue-300
          shadow-[0_8px_32px_rgba(0,122,255,0.1),inset_0_1px_1px_rgba(255,255,255,0.4)]
          hover:bg-medical-blue-500/18 dark:hover:bg-medical-blue-400/22
          hover:scale-[1.02]
          hover:shadow-[0_12px_40px_rgba(0,122,255,0.2)]
          hover:border-medical-blue-500/40
        `,
        link: "text-medical-blue-500 dark:text-medical-blue-400 underline-offset-4 hover:underline font-medium",
      },
      size: {
        default: "h-11 px-6 py-2 has-[>svg]:px-3",
        sm: "h-9 rounded-[32px] gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-14 rounded-[40px] px-8 text-lg has-[>svg]:px-6",
        icon: "size-11 rounded-full",
        "icon-sm": "size-9 rounded-full",
        "icon-lg": "size-14 rounded-full",
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
