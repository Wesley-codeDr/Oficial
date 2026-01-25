'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  glassMaterial,
  glassRadius,
  glassTransition,
  glassFocusRing,
  appleSystemColors,
} from '@/lib/design-system/glass-tokens'

// ==================== TYPES ====================

export interface GlassSelectOption {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

export type GlassSelectHealthcareVariant =
  | 'default'
  | 'healthcare-primary'
  | 'healthcare-success'
  | 'healthcare-warning'
  | 'healthcare-critical'
  | 'healthcare-info'

export interface GlassSelectProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, 'children'> {
  /** Placeholder text when no value is selected */
  placeholder?: string
  /** Options to display in the dropdown */
  options: GlassSelectOption[]
  /** Visual variant for validation states */
  variant?: 'default' | 'error' | 'success'
  /** Glass intensity (background opacity level) */
  glassIntensity?: 'light' | 'medium' | 'heavy'
  /** Healthcare semantic variant for medical contexts */
  healthcareVariant?: GlassSelectHealthcareVariant
  /** Additional class names for the trigger */
  className?: string
  /** ID for the select trigger */
  id?: string
}

// ==================== INTENSITY STYLES ====================

const intensityStyles = {
  light: 'bg-white/40 dark:bg-slate-900/45',
  medium: 'bg-white/55 dark:bg-slate-900/65',
  heavy: 'bg-white/70 dark:bg-slate-900/75',
}

// ==================== VARIANT STYLES ====================

const variantStyles = {
  default: 'border-white/50 dark:border-white/12',
  error: 'border-red-500/50 dark:border-red-500/50',
  success: 'border-green-500/50 dark:border-green-500/50',
}

const variantFocusRing = {
  default: 'focus:ring-blue-500/20 dark:focus:ring-blue-500/30',
  error: 'focus:ring-red-500/20 dark:focus:ring-red-500/30',
  success: 'focus:ring-green-500/20 dark:focus:ring-green-500/30',
}

// ==================== HEALTHCARE VARIANT STYLES ====================

const healthcareStyles: Record<GlassSelectHealthcareVariant, string> = {
  default: '',
  'healthcare-primary': 'border-blue-500/30 dark:border-blue-500/40',
  'healthcare-success': 'border-green-500/30 dark:border-green-500/40',
  'healthcare-warning': 'border-orange-500/30 dark:border-orange-500/40',
  'healthcare-critical': 'border-red-500/30 dark:border-red-500/40',
  'healthcare-info': 'border-teal-400/30 dark:border-teal-400/40',
}

// ==================== ANIMATION VARIANTS ====================

const dropdownVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: 0.15,
      ease: [0.25, 1, 0.5, 1],
    },
  },
}

const checkmarkVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
}

// ==================== COMPONENT ====================

const GlassSelect = React.forwardRef<HTMLButtonElement, GlassSelectProps>(
  (
    {
      placeholder = 'Selecione uma opção',
      options,
      variant = 'default',
      glassIntensity = 'medium',
      healthcareVariant = 'default',
      value,
      onValueChange,
      disabled,
      id,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)

    // Combine variant styles with healthcare variant
    const borderStyles = healthcareVariant !== 'default'
      ? healthcareStyles[healthcareVariant]
      : variantStyles[variant]

    return (
      <SelectPrimitive.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        open={isOpen}
        onOpenChange={setIsOpen}
        {...props}
      >
        <SelectPrimitive.Trigger
          ref={ref}
          id={id}
          className={cn(
            // Base styles
            'relative flex w-full items-center justify-between',
            'h-12 px-4',
            // Glass material
            'liquid-glass-subtle',
            intensityStyles[glassIntensity],
            // Border
            'border-[1.5px]',
            borderStyles,
            // Radius - iOS 26 style
            glassRadius.md,
            // Typography
            'text-sm font-medium',
            'text-slate-900 dark:text-slate-100',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
            // Shadows
            'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)]',
            'shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]',
            'dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)]',
            'dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]',
            // Focus - accessible 3px ring
            'focus:outline-none',
            'focus:ring-[3px]',
            variantFocusRing[variant],
            // Hover
            'hover:bg-white/65 dark:hover:bg-slate-900/70',
            // Transitions
            glassTransition.default,
            glassTransition.easeApple,
            // Disabled
            'disabled:opacity-50',
            'disabled:cursor-not-allowed',
            className
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              <ChevronDown className="h-4 w-4 text-slate-500 dark:text-slate-400 transition-colors" />
            </motion.div>
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content asChild position="popper" sideOffset={8}>
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                // Base styles
                'relative z-50 min-w-[8rem] overflow-hidden',
                // Glass material - elevated variant for dropdown
                'liquid-glass-elevated',
                intensityStyles[glassIntensity],
                // Border
                'border border-white/40 dark:border-white/20',
                // Radius - iOS 26 style
                glassRadius.lg,
                // Shadow
                'shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)]',
                'dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]'
              )}
            >
              <SelectPrimitive.Viewport className="p-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                {options.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={cn(
                      // Base styles
                      'relative flex w-full items-center gap-3',
                      'px-3 py-2.5',
                      glassRadius.sm,
                      // Typography
                      'text-sm font-medium',
                      'text-slate-900 dark:text-slate-100',
                      'data-[disabled]:text-slate-400 dark:data-[disabled]:text-slate-500',
                      // Hover & focus
                      'hover:bg-white/50 dark:hover:bg-white/15',
                      'focus:outline-none',
                      'focus:bg-white/50 dark:focus:bg-white/15',
                      // Transitions
                      glassTransition.fast,
                      'cursor-pointer',
                      'data-[disabled]:cursor-not-allowed',
                      // Selected state
                      'data-[state=checked]:bg-blue-500/10',
                      'dark:data-[state=checked]:bg-blue-500/20',
                      'data-[state=checked]:text-blue-600 dark:data-[state=checked]:text-blue-400'
                    )}
                  >
                    {/* Icon */}
                    {option.icon && (
                      <span className="shrink-0 text-slate-500 dark:text-slate-400">
                        {option.icon}
                      </span>
                    )}

                    {/* Label */}
                    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>

                    {/* Checkmark for selected */}
                    <SelectPrimitive.ItemIndicator className="ml-auto">
                      <motion.div
                        variants={checkmarkVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </motion.div>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    )
  }
)

GlassSelect.displayName = 'GlassSelect'

export { GlassSelect }
