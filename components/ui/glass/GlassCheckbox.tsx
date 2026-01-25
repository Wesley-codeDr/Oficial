'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  glassMaterial,
  glassRadius,
  glassTransition,
  glassFocusRing,
  appleSystemColors,
} from '@/lib/design-system/glass-tokens'

// ==================== TYPES ====================

export type GlassCheckboxHealthcareVariant =
  | 'default'
  | 'healthcare-primary'
  | 'healthcare-success'
  | 'healthcare-warning'
  | 'healthcare-critical'
  | 'healthcare-info'

export interface GlassCheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /** Text label for the checkbox */
  label?: string
  /** Description text below the label */
  description?: string
  /** Size of the checkbox */
  size?: 'sm' | 'md' | 'lg'
  /** Glass intensity (background opacity level) */
  glassIntensity?: 'light' | 'medium' | 'heavy'
  /** Healthcare semantic variant for medical contexts */
  healthcareVariant?: GlassCheckboxHealthcareVariant
}

// ==================== SIZE CONFIGURATIONS ====================

const sizeConfig = {
  sm: {
    checkbox: 'w-5 h-5',
    check: 'w-3.5 h-3.5',
    label: 'text-sm',
    description: 'text-xs',
    strokeWidth: 2.5,
  },
  md: {
    checkbox: 'w-6 h-6',
    check: 'w-4 h-4',
    label: 'text-base',
    description: 'text-sm',
    strokeWidth: 3,
  },
  lg: {
    checkbox: 'w-7 h-7',
    check: 'w-5 h-5',
    label: 'text-lg',
    description: 'text-base',
    strokeWidth: 3,
  },
}

// ==================== INTENSITY STYLES ====================

const intensityStyles = {
  light: 'bg-white/35 dark:bg-slate-800/35',
  medium: 'bg-white/45 dark:bg-slate-900/45',
  heavy: 'bg-white/55 dark:bg-slate-900/55',
}

// ==================== HEALTHCARE VARIANT STYLES ====================

const healthcareVariantStyles: Record<GlassCheckboxHealthcareVariant, {
  checked: string
  glow: string
  color: string
}> = {
  default: {
    checked: 'from-blue-500 to-purple-600',
    glow: `0 4px 15px ${appleSystemColors.blue}66`,
    color: appleSystemColors.blue,
  },
  'healthcare-primary': {
    checked: 'from-blue-500 to-blue-600',
    glow: `0 4px 15px ${appleSystemColors.blue}66`,
    color: appleSystemColors.blue,
  },
  'healthcare-success': {
    checked: 'from-green-500 to-green-600',
    glow: `0 4px 15px ${appleSystemColors.green}66`,
    color: appleSystemColors.green,
  },
  'healthcare-warning': {
    checked: 'from-orange-500 to-orange-600',
    glow: `0 4px 15px ${appleSystemColors.orange}66`,
    color: appleSystemColors.orange,
  },
  'healthcare-critical': {
    checked: 'from-red-500 to-red-600',
    glow: `0 4px 15px ${appleSystemColors.red}66`,
    color: appleSystemColors.red,
  },
  'healthcare-info': {
    checked: 'from-teal-400 to-teal-500',
    glow: `0 4px 15px ${appleSystemColors.teal}66`,
    color: appleSystemColors.teal,
  },
}

// ==================== ANIMATION VARIANTS ====================

const checkmarkVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 25,
      mass: 0.5,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
}

// ==================== COMPONENT ====================

const GlassCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  GlassCheckboxProps
>(
  (
    {
      className,
      label,
      description,
      size = 'md',
      glassIntensity = 'medium',
      healthcareVariant = 'default',
      checked,
      onCheckedChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizes = sizeConfig[size]
    const variant = healthcareVariantStyles[healthcareVariant]

    return (
      <label
        className={cn(
          'flex items-start gap-3 cursor-pointer group/checkbox',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <CheckboxPrimitive.Root
          ref={ref}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className={cn(
            // Base structure
            'relative shrink-0',
            'flex items-center justify-center',
            // Transitions
            glassTransition.default,
            glassTransition.easeApple,
            // Glass material - subtle variant
            'liquid-glass-subtle',
            intensityStyles[glassIntensity],
            // Border
            'border-2',
            'border-white/50 dark:border-white/12',
            // Shadow
            'shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]',
            'dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]',
            // Radius - iOS 26 squircle
            glassRadius.sm,
            // Size
            sizes.checkbox,
            // Focus ring - accessible 3px outline
            'focus:outline-none',
            'focus:ring-[3px]',
            'focus:ring-blue-500/30',
            'focus:ring-offset-2',
            'focus:ring-offset-white dark:focus:ring-offset-slate-900',
            // Hover
            'group-hover/checkbox:scale-105',
            'group-hover/checkbox:border-white/70 dark:group-hover/checkbox:border-white/20',
            // Checked state - gradient background
            'data-[state=checked]:bg-gradient-to-br',
            `data-[state=checked]:${variant.checked}`,
            'data-[state=checked]:border-transparent',
            className
          )}
          style={{
            boxShadow: checked
              ? variant.glow
              : 'inset 0 1px 2px rgba(0,0,0,0.1)',
          }}
          {...props}
        >
          {/* Checkmark Icon with Animation */}
          <AnimatePresence mode="wait">
            {checked && (
              <CheckboxPrimitive.Indicator asChild forceMount>
                <motion.div
                  variants={checkmarkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex items-center justify-center"
                >
                  <Check
                    className={cn('text-white', sizes.check)}
                    strokeWidth={sizes.strokeWidth}
                  />
                </motion.div>
              </CheckboxPrimitive.Indicator>
            )}
          </AnimatePresence>
        </CheckboxPrimitive.Root>

        {/* Label and Description */}
        {(label || description) && (
          <div className="flex-1 pt-0.5">
            {label && (
              <span
                className={cn(
                  'font-medium',
                  'text-slate-900 dark:text-slate-100',
                  glassTransition.default,
                  sizes.label,
                  'group-hover/checkbox:text-slate-700 dark:group-hover/checkbox:text-slate-200'
                )}
              >
                {label}
              </span>
            )}
            {description && (
              <p
                className={cn(
                  'text-slate-500 dark:text-slate-400',
                  'mt-0.5',
                  'leading-relaxed',
                  sizes.description
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </label>
    )
  }
)

GlassCheckbox.displayName = 'GlassCheckbox'

export { GlassCheckbox }
