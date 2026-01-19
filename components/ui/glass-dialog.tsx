'use client'

import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { applePhysics } from '@/lib/design-system/animation-tokens'

/**
 * GlassDialog Component
 * 
 * Apple Liquid Glass 2026 styled alert dialog for confirmations and alerts.
 * Features glassmorphism treatment with specular highlights and smooth animations.
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

const GlassDialog = AlertDialogPrimitive.Root

const GlassDialogTrigger = AlertDialogPrimitive.Trigger

const GlassDialogPortal = AlertDialogPrimitive.Portal

const GlassDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn('glass-overlay', className)}
    {...props}
  />
))
GlassDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

type DialogVariant = 'default' | 'warning' | 'danger' | 'success' | 'info'

interface GlassDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {
  /** Visual variant of the dialog */
  variant?: DialogVariant
  /** Show an icon matching the variant */
  showIcon?: boolean
}

const variantIcons: Record<DialogVariant, React.ComponentType<{ className?: string }>> = {
  default: Info,
  info: Info,
  warning: AlertTriangle,
  danger: XCircle,
  success: CheckCircle,
}

const variantIconColors: Record<DialogVariant, string> = {
  default: 'text-medical-blue-500',
  info: 'text-medical-blue-500',
  warning: 'text-orange-500',
  danger: 'text-rose-500',
  success: 'text-medical-green-500',
}

const variantIconBg: Record<DialogVariant, string> = {
  default: 'bg-medical-blue-500/10',
  info: 'bg-medical-blue-500/10',
  warning: 'bg-orange-500/10',
  danger: 'bg-rose-500/10',
  success: 'bg-medical-green-500/10',
}

const GlassDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  GlassDialogContentProps
>(({ className, children, variant = 'default', showIcon = true, ...props }, ref) => {
  const IconComponent = variantIcons[variant]

  return (
    <GlassDialogPortal>
      <AnimatePresence>
        <GlassDialogOverlay asChild>
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </GlassDialogOverlay>
        <AlertDialogPrimitive.Content
          ref={ref}
          asChild
          {...props}
        >
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.96,
              filter: 'blur(12px)'
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              filter: 'blur(0px)'
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.96,
              filter: 'blur(8px)'
            }}
            transition={applePhysics.soft}
            className={cn(
              'glass-dialog',
              'fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2',
              'p-6',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue-500/30 focus-visible:ring-offset-2',
              className
            )}
          >
            {showIcon && (
              <div className={cn(
                'mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full',
                variantIconBg[variant]
              )}>
                <IconComponent className={cn('h-7 w-7', variantIconColors[variant])} />
              </div>
            )}
            {children}
          </motion.div>
        </AlertDialogPrimitive.Content>
      </AnimatePresence>
    </GlassDialogPortal>
  )
})
GlassDialogContent.displayName = AlertDialogPrimitive.Content.displayName

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

const GlassDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & {
    variant?: 'primary' | 'destructive' | 'medical-green'
  }
>(({ className, variant = 'primary', ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants({ variant, size: 'default' }), 'min-w-[120px]', className)}
    {...props}
  />
))
GlassDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const GlassDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: 'outline', size: 'default' }), 'min-w-[120px]', className)}
    {...props}
  />
))
GlassDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

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
