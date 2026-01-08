'use client'

import * as React from 'react'
import { forwardRef } from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  AnimatePresence,
  type HTMLMotionProps,
} from 'framer-motion'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { buttonAnimations } from '@/lib/design-system/micro-interactions'

const glassButtonVariants = cva(
  [
    'relative inline-flex items-center justify-center gap-2',
    'whitespace-nowrap rounded-2xl text-sm font-semibold',
    'ring-offset-background transition-all duration-[300ms] ease-[cubic-bezier(0.25,1,0.5,1)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0',
    'backdrop-blur-[40px] saturate-[180%]',
    'overflow-hidden',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-to-r from-blue-500/90 to-blue-600/90',
          'text-white',
          'border-[1.5px] border-white/20',
          'shadow-[0_25px_50px_-12px_rgba(0,122,255,0.25)]',
          'shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]',
          'hover:from-blue-500 hover:to-blue-600',
          'hover:shadow-[0_25px_50px_-12px_rgba(0,122,255,0.35)]',
        ].join(' '),
        secondary: [
          'bg-white/55 dark:bg-slate-900/65',
          'text-slate-700 dark:text-slate-200',
          'border-[1.5px] border-white/50 dark:border-white/12',
          'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)]',
          'shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]',
          'dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)]',
          'dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]',
          'hover:bg-white/70 dark:hover:bg-slate-900/75',
        ].join(' '),
        destructive: [
          'bg-gradient-to-r from-rose-500/90 to-rose-600/90',
          'text-white',
          'border-[1.5px] border-white/20',
          'shadow-[0_25px_50px_-12px_rgba(255,59,48,0.25)]',
          'shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]',
          'hover:from-rose-500 hover:to-rose-600',
          'hover:shadow-[0_25px_50px_-12px_rgba(255,59,48,0.35)]',
        ].join(' '),
        outline: [
          'bg-white/40 dark:bg-slate-900/45',
          'text-slate-900 dark:text-slate-100',
          'border-[1.5px] border-slate-300/60 dark:border-white/15',
          'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)]',
          'shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]',
          'dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]',
          'dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]',
          'hover:bg-white/60 dark:hover:bg-slate-900/60',
          'hover:border-slate-400/70 dark:hover:border-white/20',
        ].join(' '),
        ghost: [
          'bg-white/20 dark:bg-white/5',
          'text-slate-700 dark:text-slate-200',
          'border-[1.5px] border-transparent',
          'hover:bg-white/40 dark:hover:bg-white/10',
          'hover:border-white/30 dark:hover:border-white/10',
        ].join(' '),
      },
      size: {
        sm: 'h-9 px-3 text-xs rounded-xl gap-1.5 has-[>svg]:px-2.5',
        default: 'h-11 px-5 py-2.5 has-[>svg]:px-4',
        lg: 'h-13 px-8 text-base rounded-2xl has-[>svg]:px-6',
        icon: 'size-11 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

interface Ripple {
  id: number
  x: number
  y: number
}

export interface GlassButtonProps
  extends
    Omit<HTMLMotionProps<'button'>, 'ref' | 'children'>,
    VariantProps<typeof glassButtonVariants> {
  asChild?: boolean
  loading?: boolean
  children?: React.ReactNode
}

const RIPPLE_ANIMATION_DURATION = 600

function RippleEffect({
  ripples,
  variant,
}: {
  ripples: Ripple[]
  variant: GlassButtonProps['variant']
}) {
  const rippleColor =
    variant === 'primary' || variant === 'destructive'
      ? 'rgba(255, 255, 255, 0.4)'
      : 'rgba(0, 122, 255, 0.25)'

  return (
    <AnimatePresence>
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: rippleColor,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 400, height: 400, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        />
      ))}
    </AnimatePresence>
  )
}

function LoadingSpinner() {
  return (
    <motion.svg
      className="size-4"
      viewBox="0 0 24 24"
      fill="none"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </motion.svg>
  )
}

const hapticTapAnimation = {
  scale: [1, 0.95, 1.03, 1],
  transition: {
    duration: 0.25,
    times: [0, 0.25, 0.65, 1],
    ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
  },
}

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const [ripples, setRipples] = React.useState<Ripple[]>([])
    const rippleIdRef = React.useRef(0)

    const glowColor =
      variant === 'primary'
        ? 'rgba(0, 122, 255, 0.4)'
        : variant === 'destructive'
          ? 'rgba(255, 59, 48, 0.4)'
          : 'rgba(0, 122, 255, 0.25)'

    function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
      const { left, top } = e.currentTarget.getBoundingClientRect()
      mouseX.set(e.clientX - left)
      mouseY.set(e.clientY - top)
    }

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
      if (disabled || loading) return

      const rect = e.currentTarget.getBoundingClientRect()
      const newRipple: Ripple = {
        id: rippleIdRef.current++,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }

      setRipples((prev) => [...prev, newRipple])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, RIPPLE_ANIMATION_DURATION)

      onClick?.(e)
    }

    if (asChild) {
      return (
        <Slot
          ref={ref as React.Ref<HTMLElement>}
          data-slot="glass-button"
          className={cn(glassButtonVariants({ variant, size, className }))}
          {...(props as React.ComponentProps<typeof Slot>)}
        >
          {children}
        </Slot>
      )
    }

    const isDisabled = disabled || loading

    return (
      <motion.button
        ref={ref}
        data-slot="glass-button"
        className={cn(glassButtonVariants({ variant, size, className }))}
        disabled={isDisabled}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        whileHover={!isDisabled ? buttonAnimations.hover : undefined}
        whileTap={!isDisabled ? hapticTapAnimation : undefined}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        {...props}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                180px circle at ${mouseX}px ${mouseY}px,
                ${glowColor},
                transparent 70%
              )
            `,
          }}
        />

        <RippleEffect ripples={ripples} variant={variant} />

        <span
          className={cn(
            'relative z-10 flex items-center justify-center gap-2',
            loading && 'opacity-0'
          )}
        >
          {children}
        </span>

        {loading && (
          <span className="absolute inset-0 flex items-center justify-center z-10">
            <LoadingSpinner />
          </span>
        )}
      </motion.button>
    )
  }
)

GlassButton.displayName = 'GlassButton'

export { GlassButton, glassButtonVariants }
