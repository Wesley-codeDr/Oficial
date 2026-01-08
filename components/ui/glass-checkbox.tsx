'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

// ==================== TYPES ====================

export interface GlassCheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  glassIntensity?: 'light' | 'medium' | 'heavy'
}

// ==================== COMPONENTS ====================

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
      checked,
      onCheckedChange,
      disabled,
      ...props
    },
    ref
  ) => {
    // Size configurations
    const sizeConfig = {
      sm: {
        checkbox: 'w-5 h-5',
        check: 'w-3.5 h-3.5',
        label: 'text-sm',
        description: 'text-xs',
      },
      md: {
        checkbox: 'w-6 h-6',
        check: 'w-4 h-4',
        label: 'text-base',
        description: 'text-sm',
      },
      lg: {
        checkbox: 'w-7 h-7',
        check: 'w-5 h-5',
        label: 'text-lg',
        description: 'text-base',
      },
    }

    // Glass intensity styles
    const intensityStyles = {
      light: 'bg-white/35 dark:bg-slate-800/35',
      medium: 'bg-white/45 dark:bg-slate-900/45',
      heavy: 'bg-white/55 dark:bg-slate-900/55',
    }

    return (
      <label className={cn('flex items-start gap-3 cursor-pointer group/checkbox', disabled && 'cursor-not-allowed opacity-50')}>
        <CheckboxPrimitive.Root
          ref={ref}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className={cn(
            'relative shrink-0',
            'flex items-center justify-center',
            'transition-all duration-[300ms] ease-[cubic-bezier(0.25,1,0.5,1)]',
            // Base glass material
            'backdrop-blur-[20px] saturate-[150%]',
            intensityStyles[glassIntensity],
            // Border
            'border-2',
            'border-white/50 dark:border-white/12',
            // Shadow
            'shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]',
            'dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]',
            // Radius (squircle feel)
            'rounded-lg',
            // Size
            sizeConfig[size].checkbox,
            // Focus
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-blue-500/30',
            'focus:ring-offset-0',
            'focus:ring-offset-transparent',
            // Hover
            'group-hover/checkbox:scale-105',
            'group-hover/checkbox:border-white/70 dark:group-hover/checkbox:border-white/20',
            // Data state for styling
            'data-[state=checked]:bg-gradient-to-br',
            'data-[state=checked]:from-blue-500',
            'data-[state=checked]:to-purple-600',
            'data-[state=checked]:border-transparent',
            'data-[state=checked]:shadow-[0_4px_15px_rgba(0,122,255,0.4)]',
            'dark:data-[state=checked]:shadow-[0_4px_15px_rgba(0,122,255,0.5)]',
            className
          )}
          {...props}
        >
          {/* Checkmark Icon */}
          <CheckboxPrimitive.Indicator
            asChild
            forceMount
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 25,
                mass: 0.5,
              }}
            >
              <Check
                className={cn(
                  'text-white',
                  'stroke-[3px]',
                  sizeConfig[size].check
                )}
              />
            </motion.div>
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        {/* Label and Description */}
        {(label || description) && (
          <div className="flex-1 pt-0.5">
            {label && (
              <span
                className={cn(
                  'font-medium',
                  'text-slate-900 dark:text-slate-100',
                  'transition-colors duration-300',
                  sizeConfig[size].label,
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
                  sizeConfig[size].description
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
