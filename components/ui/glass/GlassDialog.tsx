'use client'

import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, CheckCircle, Info, XCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import {
  glassMaterial,
  glassRadius,
  glassTransition,
  appleSystemColors,
} from '@/lib/design-system/glass-tokens'

/**
 * GlassDialog Component
 *
 * Apple Liquid Glass 2026 styled alert dialog for confirmations and alerts.
 * Features elevated glass variant with backdrop blur and smooth animations.
 *
 * @example
 * ```tsx
 * <GlassDialog>
 *   <GlassDialogTrigger asChild>
 *     <Button variant="destructive">Delete</Button>
 *   </GlassDialogTrigger>
 *   <GlassDialogContent variant="warning">
 *     <GlassDialogHeader>
 *       <GlassDialogTitle>Are you sure?</GlassDialogTitle>
 *       <GlassDialogDescription>
 *         This action cannot be undone.
 *       </GlassDialogDescription>
 *     </GlassDialogHeader>
 *     <GlassDialogFooter>
 *       <GlassDialogCancel>Cancel</GlassDialogCancel>
 *       <GlassDialogAction>Continue</GlassDialogAction>
 *     </GlassDialogFooter>
 *   </GlassDialogContent>
 * </GlassDialog>
 * ```
 */

// ==================== TYPES ====================

type DialogVariant = 'default' | 'warning' | 'danger' | 'success' | 'info'

type HealthcareVariant =
  | 'healthcare-primary'
  | 'healthcare-success'
  | 'healthcare-warning'
  | 'healthcare-critical'
  | 'healthcare-info'

// ==================== ANIMATION VARIANTS ====================

const overlayVariants = {
  hidden: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
  },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(12px)',
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const contentVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    filter: 'blur(12px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    filter: 'blur(8px)',
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// ==================== VARIANT CONFIGURATIONS ====================

const variantIcons: Record<DialogVariant, React.ComponentType<{ className?: string }>> = {
  default: Info,
  info: Info,
  warning: AlertTriangle,
  danger: XCircle,
  success: CheckCircle,
}

const variantIconColors: Record<DialogVariant, string> = {
  default: 'text-blue-500',
  info: 'text-blue-500',
  warning: 'text-orange-500',
  danger: 'text-red-500',
  success: 'text-green-500',
}

const variantIconBg: Record<DialogVariant, string> = {
  default: 'bg-blue-500/10',
  info: 'bg-blue-500/10',
  warning: 'bg-orange-500/10',
  danger: 'bg-red-500/10',
  success: 'bg-green-500/10',
}

// ==================== ROOT COMPONENTS ====================

const GlassDialog = AlertDialogPrimitive.Root
const GlassDialogTrigger = AlertDialogPrimitive.Trigger
const GlassDialogPortal = AlertDialogPrimitive.Portal

// ==================== OVERLAY ====================

const GlassDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay ref={ref} asChild {...props}>
    <motion.div
      className={cn(
        'fixed inset-0 z-50',
        'bg-black/40',
        className
      )}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    />
  </AlertDialogPrimitive.Overlay>
))
GlassDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

// ==================== CONTENT ====================

interface GlassDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {
  /** Visual variant of the dialog */
  variant?: DialogVariant
  /** Healthcare semantic variant */
  healthcareVariant?: HealthcareVariant
  /** Show an icon matching the variant */
  showIcon?: boolean
}

const GlassDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  GlassDialogContentProps
>(
  (
    {
      className,
      children,
      variant = 'default',
      healthcareVariant,
      showIcon = true,
      ...props
    },
    ref
  ) => {
    const IconComponent = variantIcons[variant]

    return (
      <GlassDialogPortal>
        <AnimatePresence>
          <GlassDialogOverlay />
          <AlertDialogPrimitive.Content ref={ref} asChild {...props}>
            <motion.div
              className={cn(
                // Positioning
                'fixed left-1/2 top-1/2 z-50',
                'w-full max-w-md',
                '-translate-x-1/2 -translate-y-1/2',
                // Glass styling - elevated variant
                'liquid-glass-elevated',
                'bg-white/80 dark:bg-slate-900/85',
                // Border
                'border border-white/40 dark:border-white/20',
                // Radius - iOS 26 style
                glassRadius['2xl'],
                // Shadow
                'shadow-[0_25px_60px_-12px_rgba(0,0,0,0.25)]',
                // Padding
                'p-6',
                // Focus
                'focus:outline-none',
                'focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:ring-offset-2',
                className
              )}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Inner glow line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-t-[32px]" />

              {/* Icon */}
              {showIcon && (
                <div
                  className={cn(
                    'mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full',
                    variantIconBg[variant]
                  )}
                >
                  <IconComponent
                    className={cn('h-7 w-7', variantIconColors[variant])}
                  />
                </div>
              )}

              {children}
            </motion.div>
          </AlertDialogPrimitive.Content>
        </AnimatePresence>
      </GlassDialogPortal>
    )
  }
)
GlassDialogContent.displayName = AlertDialogPrimitive.Content.displayName

// ==================== HEADER ====================

const GlassDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-2 text-center', className)}
    {...props}
  />
)
GlassDialogHeader.displayName = 'GlassDialogHeader'

// ==================== FOOTER ====================

const GlassDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center',
      className
    )}
    {...props}
  />
)
GlassDialogFooter.displayName = 'GlassDialogFooter'

// ==================== TITLE ====================

const GlassDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold text-slate-900 dark:text-slate-100',
      className
    )}
    {...props}
  />
))
GlassDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

// ==================== DESCRIPTION ====================

const GlassDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn(
      'text-sm text-slate-600 dark:text-slate-400 leading-relaxed',
      className
    )}
    {...props}
  />
))
GlassDialogDescription.displayName = AlertDialogPrimitive.Description.displayName

// ==================== ACTION ====================

const GlassDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & {
    variant?: 'primary' | 'destructive' | 'medical-green'
  }
>(({ className, variant = 'primary', ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(
      buttonVariants({ variant, size: 'default' }),
      'min-w-[120px]',
      className
    )}
    {...props}
  />
))
GlassDialogAction.displayName = AlertDialogPrimitive.Action.displayName

// ==================== CANCEL ====================

const GlassDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: 'outline', size: 'default' }),
      'min-w-[120px]',
      className
    )}
    {...props}
  />
))
GlassDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

// ==================== EXPORTS ====================

export {
  GlassDialog,
  GlassDialogPortal,
  GlassDialogOverlay,
  GlassDialogTrigger,
  GlassDialogContent,
  GlassDialogHeader,
  GlassDialogFooter,
  GlassDialogTitle,
  GlassDialogDescription,
  GlassDialogAction,
  GlassDialogCancel,
}
