"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, type HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

function LoadingSpinner() {
  return (
    <motion.svg
      className="size-4"
      viewBox="0 0 24 24"
      fill="none"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </motion.svg>
  )
}

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-all duration-[300ms] ease-[cubic-bezier(0.25,1,0.5,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: `
          bg-gradient-to-br from-ww-primary-600 via-ww-primary-700 to-ww-primary-800
          text-white
          shadow-[0_8px_32px_rgba(0,34,125,0.35),inset_0_1px_0_rgba(31,168,227,0.25)]
          hover:shadow-[0_12px_40px_rgba(0,34,125,0.45),inset_0_1px_0_rgba(31,168,227,0.3)]
          hover:-translate-y-1
          hover:brightness-110
          active:translate-y-0 active:shadow-[0_4px_16px_rgba(0,34,125,0.3)]
          before:absolute before:inset-0 before:rounded-[40px] before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none
          relative overflow-hidden
        `,
        "medical-green": `
          bg-gradient-to-br from-medical-green-500 via-medical-green-600 to-medical-green-700
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
          bg-gradient-to-br from-medical-teal-500 via-medical-teal-600 to-medical-teal-700
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
          bg-gradient-to-br from-healthcare-critical via-healthcare-critical to-healthcare-critical/90
          dark:from-healthcare-critical-dark dark:via-healthcare-critical-dark dark:to-healthcare-critical-dark/90
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
          glass-ww-default
          bg-ww-neutral/25 dark:bg-ww-primary/30
          border-[1.5px] border-ww-neutral/50 dark:border-ww-primary/15
          text-ww-primary dark:text-ww-primary-100
          shadow-[0_8px_32px_rgba(0,34,125,0.08),inset_0_1px_1px_rgba(31,168,227,0.5)]
          dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(31,168,227,0.1)]
          hover:bg-ww-neutral/40 dark:hover:bg-ww-primary/45
          hover:scale-[1.02]
          hover:shadow-[0_12px_40px_rgba(0,34,125,0.12),inset_0_1px_1px_rgba(31,168,227,0.6)]
          hover:border-ww-neutral/70 dark:hover:border-ww-primary/25
        `,
        secondary: `
          bg-ww-primary-900 dark:bg-ww-secondary-900
          border-[1.5px] border-ww-primary-800 dark:border-ww-secondary-800
          text-white dark:text-ww-secondary-100
          shadow-[0_8px_32px_rgba(0,34,125,0.06),inset_0_1px_1px_rgba(31,168,227,0.5)]
          dark:shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(31,168,227,0.08)]
          hover:bg-ww-primary-800 dark:hover:bg-ww-secondary-800
          hover:scale-[1.02]
          hover:shadow-[0_12px_40px_rgba(0,34,125,0.12),inset_0_1px_1px_rgba(31,168,227,0.6)]
          dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(31,168,227,0.12)]
          hover:border-ww-primary-700 dark:hover:border-ww-secondary-700
        `,
        ghost: `
          glass-ww-subtle
          bg-ww-neutral/20 dark:bg-ww-primary/5
          text-ww-primary dark:text-ww-primary-200
          hover:bg-ww-neutral/45 dark:hover:bg-ww-primary/12
          hover:scale-[1.02]
          border border-transparent
          hover:border-ww-neutral/30
        `,
        "glass-medical": `
          liquid-glass-default
          bg-medical-blue-500/10 dark:bg-medical-blue-400/15
          border-[1.5px] border-medical-blue-500/25 dark:border-medical-blue-400/30
          text-medical-blue-700 dark:text-medical-blue-300
          shadow-[0_8px_32px_rgba(0,122,255,0.1),inset_0_1px_1px_rgba(255,255,255,0.4)]
          hover:bg-medical-blue-500/18 dark:hover:bg-medical-blue-400/22
          hover:scale-[1.02]
          hover:shadow-[0_12px_40px_rgba(0,122,255,0.2)]
          hover:border-medical-blue-500/40
        `,
        link: "text-ww-secondary dark:text-ww-secondary-400 underline-offset-4 hover:underline font-medium",
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

type ButtonProps = Omit<HTMLMotionProps<"button">, "ref" | "children"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
    children?: React.ReactNode
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  if (asChild) {
    return (
      <Slot
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...(props as React.ComponentProps<typeof Slot>)}
      >
        {children}
      </Slot>
    )
  }

  const isDisabled = disabled || loading

  return (
    <motion.button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={isDisabled}
      {...props}
    >
      <span
        className={cn(
          "flex items-center justify-center gap-2",
          loading && "opacity-0"
        )}
      >
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner />
        </span>
      )}
    </motion.button>
  )
}

export { Button, buttonVariants, type ButtonProps }
