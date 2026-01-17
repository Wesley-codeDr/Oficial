'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// ==================== TYPES ====================

export interface GlassSelectOption {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface GlassSelectProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
  'children'
> {
  placeholder?: string
  options: GlassSelectOption[]
  variant?: 'default' | 'error'
  glassIntensity?: 'light' | 'medium' | 'heavy'
  className?: string
  id?: string
}

// ==================== SUB-COMPONENTS ====================

const GlassSelect = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  GlassSelectProps
>(
  (
    {
      placeholder = 'Selecione uma opção',
      options,
      variant = 'default',
      glassIntensity = 'medium',
      value,
      onValueChange,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const selectedOption = options.find((opt) => opt.value === value)

    // Glass intensity styles
    const intensityStyles = {
      light: 'bg-white/40 dark:bg-slate-900/45',
      medium: 'bg-white/55 dark:bg-slate-900/65',
      heavy: 'bg-white/70 dark:bg-slate-900/75',
    }

    // Variant styles
    const variantStyles = {
      default: 'border-white/50 dark:border-white/12',
      error: 'border-red-500/50 dark:border-red-500/50',
    }

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
            'backdrop-blur-[40px] saturate-[180%]',
            intensityStyles[glassIntensity],
            // Border
            'border-[1.5px]',
            variantStyles[variant],
            // Radius
            'rounded-[16px]',
            // Typography
            'text-sm font-medium',
            'text-slate-900 dark:text-slate-100',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
            // Shadows
            'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)]',
            'shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]',
            'dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)]',
            'dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]',
            // Focus
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-blue-500/20',
            'dark:focus:ring-blue-500/30',
            variant === 'error' && 'focus:ring-red-500/20 dark:focus:ring-red-500/30',
            // Hover
            'hover:bg-white/65 dark:hover:bg-slate-900/70',
            // Transitions
            'transition-all duration-[300ms] ease-[cubic-bezier(0.25,1,0.5,1)]',
            // Disabled
            'disabled:opacity-50',
            'disabled:cursor-not-allowed'
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <motion.div
              initial={false}
              animate={{
                rotate: isOpen ? 180 : 0,
              }}
              transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              <ChevronDown className="h-4 w-4 text-slate-500 dark:text-slate-400 transition-colors" />
            </motion.div>
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              <SelectPrimitive.Viewport
                className={cn(
                  // Base styles
                  'relative p-2',
                  'max-h-[300px] overflow-y-auto',
                  // Custom scrollbar
                  'custom-scrollbar',
                  // Glass material (stronger blur for dropdown)
                  'backdrop-blur-[60px] saturate-[180%]',
                  intensityStyles[glassIntensity].replace(
                    glassIntensity === 'light'
                      ? '/35'
                      : glassIntensity === 'medium'
                        ? '/45'
                        : '/55',
                    glassIntensity === 'light' ? '/55' : glassIntensity === 'medium' ? '/65' : '/75'
                  ),
                  // Border
                  'border border-white/40 dark:border-white/20',
                  // Radius
                  'rounded-[20px]',
                  // Shadow
                  'shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)]',
                  'dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]'
                )}
              >
                {options.map((option, index) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={cn(
                      // Base styles
                      'relative flex w-full items-center gap-3',
                      'px-3 py-2.5',
                      'rounded-[12px]',
                      // Typography
                      'text-sm font-medium',
                      'text-slate-900 dark:text-slate-100',
                      'data-[disabled]:text-slate-400 dark:data-[disabled]:text-slate-500',
                      // Hover & focus
                      'hover:bg-white/50 dark:hover:bg-white/15',
                      'focus:outline-none',
                      'focus:bg-white/50 dark:focus:bg-white/15',
                      // Transitions
                      'transition-all duration-[200ms]',
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
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
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
