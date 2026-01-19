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

/**
 * Apple Liquid Glass iOS 26 Button Variants
 * Universal: blur(40px) saturate(180%)
 * Border-radius: 14px for buttons
 */
const glassButtonVariants = cva(
  [
    'relative inline-flex items-center justify-center gap-2',
    // iOS 26 radius (14px for buttons)
    'whitespace-nowrap rounded-[14px] text-sm font-semibold',
    'ring-offset-background transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0',
    // iOS 26 blur specs (40px, 180%)
    'backdrop-blur-[20px]',
    'overflow-hidden',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-white/30 dark:bg-[rgba(30,30,30,0.35)]',
          'text-[#007AFF] dark:text-[#0A84FF] font-semibold',
          'border border-white/40 dark:border-white/20',
          'shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.2)]',
          'dark:shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.1)]',
          'hover:bg-white/40 dark:hover:bg-[rgba(30,30,30,0.45)]',
          'hover:scale-[1.02]',
        ].join(' '),
        secondary: [
          'bg-white/30 dark:bg-[rgba(30,30,30,0.3)]',
          'text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.9)] font-semibold',
          'border border-white/40 dark:border-white/15',
          'shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.2)]',
          'dark:shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)]',
          'hover:bg-white/40 dark:hover:bg-[rgba(30,30,30,0.4)]',
          'hover:scale-[1.02]',
        ].join(' '),
        destructive: [
          'bg-[rgba(255,59,48,0.15)] dark:bg-[rgba(255,59,48,0.2)]',
          'text-[#FF3B30] dark:text-[#FF453A]',
          'border border-[rgba(255,59,48,0.3)] dark:border-[rgba(255,59,48,0.35)]',
          'shadow-[0_4px_24px_rgba(255,59,48,0.3)]',
          'hover:bg-[rgba(255,59,48,0.2)] dark:hover:bg-[rgba(255,59,48,0.25)]',
          'hover:scale-[1.02]',
        ].join(' '),
        outline: [
          'bg-white/20 dark:bg-[rgba(30,30,30,0.2)]',
          'text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.9)]',
          'border border-white/30 dark:border-white/15',
          'shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.15)]',
          'hover:bg-white/30 dark:hover:bg-[rgba(30,30,30,0.3)]',
          'hover:scale-[1.02]',
        ].join(' '),
        ghost: [
          'bg-transparent',
          'text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.9)]',
          'border border-transparent',
          'hover:bg-white/20 dark:hover:bg-[rgba(30,30,30,0.2)]',
          'hover:border-white/20 dark:hover:border-white/10',
        ].join(' '),
      },
      size: {
        // iOS 26 radius for each size
        sm: 'h-9 px-3 text-xs rounded-[12px] gap-1.5 has-[>svg]:px-2.5',
        default: 'h-11 px-5 py-2.5 rounded-[14px] has-[>svg]:px-4',
        lg: 'h-13 px-8 text-base rounded-[18px] has-[>svg]:px-6',
        icon: 'size-11 rounded-[14px]',
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

/**
 * iOS 26 Haptic Tap Animation
 * scale(1.02) with 0.2s transition
 */
const hapticTapAnimation = {
  scale: [1, 0.98, 1.02, 1],
  transition: {
    duration: 0.2,
    ease: [0.25, 1, 0.5, 1] as const,
    times: [0, 0.2, 0.6, 1],
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
        // iOS 26 transition
        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
        {...props}
      >
        {/* iOS 26 Light reflection - top edge */}
        <div
          className="absolute top-0 left-[10%] right-[10%] h-[1px] pointer-events-none z-[20]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
          }}
        />

        {/* Interactive mouse-follow glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                200px circle at ${mouseX}px ${mouseY}px,
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
