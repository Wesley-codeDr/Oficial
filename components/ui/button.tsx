"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, type HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold ring-offset-background transition-all duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0087FF]/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary: `
          bg-gradient-to-br from-[#0087FF] via-[#006FD6] to-[#0057AD]
          text-white
          shadow-[0_8px_32px_rgba(0,135,255,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]
          hover:shadow-[0_12px_40px_rgba(0,135,255,0.45),inset_0_1px_0_rgba(255,255,255,0.3)]
          hover:-translate-y-1
          hover:brightness-110
          active:translate-y-0 active:shadow-[0_4px_16px_rgba(0,135,255,0.3)]
          before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none
          relative overflow-hidden
        `,
        "medical-green": `
          bg-gradient-to-br from-[#00D68F] via-[#00B894] to-[#009975]
          text-white
          shadow-[0_8px_32px_rgba(0,184,148,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]
          hover:shadow-[0_12px_40px_rgba(0,184,148,0.45),inset_0_1px_0_rgba(255,255,255,0.3)]
          hover:-translate-y-1
          hover:brightness-110
          active:translate-y-0 active:shadow-[0_4px_16px_rgba(0,184,148,0.3)]
          before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none
          relative overflow-hidden
        `,
        "medical-teal": `
          bg-gradient-to-br from-[#14B8A6] via-[#0D9488] to-[#0F766E]
          text-white
          shadow-[0_8px_32px_rgba(20,184,166,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]
          hover:shadow-[0_12px_40px_rgba(20,184,166,0.45),inset_0_1px_0_rgba(255,255,255,0.3)]
          hover:-translate-y-1
          hover:brightness-110
          active:translate-y-0 active:shadow-[0_4px_16px_rgba(20,184,166,0.3)]
          before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none
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
          before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none
          relative overflow-hidden
        `,
        outline: `
          backdrop-blur-[80px] saturate-[200%]
          bg-white/25 dark:bg-slate-900/30
          border-[1.5px] border-white/50 dark:border-white/15
          text-slate-800 dark:text-slate-100
          shadow-[0_8px_32px_rgba(0,78,146,0.08),inset_0_1px_1px_rgba(255,255,255,0.5)]
          dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
          hover:bg-white/40 dark:hover:bg-slate-900/45
          hover:scale-[1.02]
          hover:shadow-[0_12px_40px_rgba(0,78,146,0.12),inset_0_1px_1px_rgba(255,255,255,0.6)]
          hover:border-white/70 dark:hover:border-white/25
        `,
        secondary: `
          backdrop-blur-[80px] saturate-[200%]
          bg-white/35 dark:bg-slate-900/40
          border-[1.5px] border-white/45 dark:border-white/12
          text-slate-700 dark:text-slate-200
          shadow-[0_8px_32px_rgba(0,78,146,0.06),inset_0_1px_1px_rgba(255,255,255,0.5)]
          dark:shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)]
          hover:bg-white/50 dark:hover:bg-slate-900/55
          hover:scale-[1.02]
          hover:border-[#0087FF]/30
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
          bg-[rgba(0,135,255,0.1)] dark:bg-[rgba(10,159,255,0.15)]
          border-[1.5px] border-[rgba(0,135,255,0.25)] dark:border-[rgba(10,159,255,0.3)]
          text-[#0057AD] dark:text-[#66B7FF]
          shadow-[0_8px_32px_rgba(0,135,255,0.1),inset_0_1px_1px_rgba(255,255,255,0.4)]
          hover:bg-[rgba(0,135,255,0.18)] dark:hover:bg-[rgba(10,159,255,0.22)]
          hover:scale-[1.02]
          hover:shadow-[0_12px_40px_rgba(0,135,255,0.2)]
          hover:border-[rgba(0,135,255,0.4)]
        `,
        link: "text-[#0087FF] dark:text-[#339FFF] underline-offset-4 hover:underline font-medium",
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
