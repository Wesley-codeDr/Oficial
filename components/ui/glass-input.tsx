'use client'

import * as React from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

// ==================== TYPES ====================

export interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'error' | 'success'
  glassIntensity?: 'light' | 'medium' | 'heavy'
  onRightIconClick?: () => void
}

// ==================== COMPONENT ====================

const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      className,
      type = 'text',
      leftIcon,
      rightIcon,
      variant = 'default',
      glassIntensity = 'medium',
      onRightIconClick,
      disabled,
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
      const { left, top } = currentTarget.getBoundingClientRect()
      mouseX.set(clientX - left)
      mouseY.set(clientY - top)
    }

    // Variant styles
    const variantStyles = {
      default: 'border-white/50 dark:border-white/12 focus:border-blue-500/50 dark:focus:border-blue-500/50',
      error: 'border-red-500/50 dark:border-red-500/50 focus:border-red-500/70 dark:focus:border-red-500/70',
      success: 'border-green-500/50 dark:border-green-500/50 focus:border-green-500/70 dark:focus:border-green-500/70',
    }

    // Glass intensity styles
    const intensityStyles = {
      light: 'bg-white/40 dark:bg-slate-900/45',
      medium: 'bg-white/55 dark:bg-slate-900/65',
      heavy: 'bg-white/70 dark:bg-slate-900/75',
    }

    // Focus ring styles
    const focusRingStyles = {
      default: 'focus:shadow-[0_0_20px_rgba(0,122,255,0.15)] dark:focus:shadow-[0_0_25px_rgba(0,122,255,0.25)]',
      error: 'focus:shadow-[0_0_20px_rgba(255,59,48,0.15)] dark:focus:shadow-[0_0_25px_rgba(255,59,48,0.25)]',
      success: 'focus:shadow-[0_0_20px_rgba(52,199,89,0.15)] dark:focus:shadow-[0_0_25px_rgba(52,199,89,0.25)]',
    }

    return (
      <motion.div
        className="relative group"
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Glow effect on focus */}
        <motion.div
          className={cn(
            'absolute inset-0 rounded-[16px] opacity-0 blur-xl transition-opacity duration-300',
            variant === 'error' && 'bg-red-500/20',
            variant === 'success' && 'bg-green-500/20',
            variant === 'default' && 'bg-blue-500/20'
          )}
          style={{
            background: useMotionTemplate`
              radial-gradient(
                150px circle at ${mouseX}px ${mouseY}px,
                ${variant === 'error' ? 'rgba(255, 59, 48, 0.3)' : 
                  variant === 'success' ? 'rgba(52, 199, 89, 0.3)' : 
                  'rgba(0, 122, 255, 0.3)'},
                transparent 80%
              )
            `,
          }}
          whileFocus={{ opacity: 1 }}
        />

        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <motion.div
              className={cn(
                'transition-colors duration-300',
                disabled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500 dark:text-slate-400'
              )}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {leftIcon}
            </motion.div>
          </div>
        )}

        {/* Input Field */}
        <input
          type={type}
          ref={ref}
          disabled={disabled}
          className={cn(
            // Base styles
            'relative z-10 w-full h-12',
            // Glass material
            'backdrop-blur-[40px] saturate-[180%]',
            'border-[1.5px]',
            'rounded-[16px]',
            'px-4',
            // Typography
            'text-sm font-medium',
            'text-slate-900 dark:text-slate-100',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
            // Background & border
            intensityStyles[glassIntensity],
            variantStyles[variant],
            // Shadows
            'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)]',
            'shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]',
            'dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)]',
            'dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]',
            // Focus
            'focus:outline-none',
            'focus:ring-0',
            focusRingStyles[variant],
            // Transitions
            'transition-all duration-[300ms] ease-[cubic-bezier(0.25,1,0.5,1)]',
            // Hover
            'group-hover:bg-white/65 dark:group-hover:bg-slate-900/70',
            'group-hover:shadow-lg',
            // Disabled
            'disabled:opacity-50',
            'disabled:cursor-not-allowed',
            // Padding adjustment for icons
            leftIcon && 'pl-12',
            rightIcon && 'pr-12',
            className
          )}
          {...props}
        />

        {/* Right Icon */}
        {rightIcon && (
          <motion.button
            type="button"
            onClick={onRightIconClick}
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2 z-10',
              'transition-colors duration-300',
              disabled ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100',
              onRightIconClick && 'cursor-pointer'
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            disabled={disabled || !onRightIconClick}
          >
            {rightIcon}
          </motion.button>
        )}
      </motion.div>
    )
  }
)

GlassInput.displayName = 'GlassInput'

export { GlassInput }
