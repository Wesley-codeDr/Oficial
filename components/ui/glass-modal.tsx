'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { applePhysics } from '@/lib/design-system/animation-tokens'

/**
 * GlassModal Component
 * 
 * Apple Liquid Glass 2026 styled modal with full glassmorphism treatment.
 * Features backdrop blur, specular highlights, rim lights, and spring animations.
 * 
 * @example
 * ```tsx
 * <GlassModal open={open} onOpenChange={setOpen}>
 *   <GlassModalTrigger asChild>
 *     <Button>Open Modal</Button>
 *   </GlassModalTrigger>
 *   <GlassModalContent>
 *     <GlassModalHeader>
 *       <GlassModalTitle>Modal Title</GlassModalTitle>
 *       <GlassModalDescription>Modal description here</GlassModalDescription>
 *     </GlassModalHeader>
 *     <div className="p-6">Content here</div>
 *     <GlassModalFooter>
 *       <Button>Confirm</Button>
 *     </GlassModalFooter>
 *   </GlassModalContent>
 * </GlassModal>
 * ```
 */

const GlassModal = DialogPrimitive.Root

const GlassModalTrigger = DialogPrimitive.Trigger

const GlassModalPortal = DialogPrimitive.Portal

const GlassModalClose = DialogPrimitive.Close

const GlassModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn('glass-overlay', className)}
    {...props}
  />
))
GlassModalOverlay.displayName = DialogPrimitive.Overlay.displayName

interface GlassModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Hide the default close button */
  hideCloseButton?: boolean
  /** Size variant of the modal */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[90vw] max-h-[90vh]',
}

const GlassModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  GlassModalContentProps
>(({ className, children, hideCloseButton = false, size = 'md', ...props }, ref) => (
  <GlassModalPortal>
    <AnimatePresence>
      <GlassModalOverlay asChild>
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </GlassModalOverlay>
      <DialogPrimitive.Content
        ref={ref}
        asChild
        {...props}
      >
        <motion.div
          initial={{ 
            opacity: 0, 
            scale: 0.92, 
            y: 20,
            filter: 'blur(8px)'
          }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            filter: 'blur(0px)'
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.95, 
            y: 12,
            filter: 'blur(6px)'
          }}
          transition={applePhysics.glass}
          className={cn(
            'glass-modal',
            'fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-medical-blue-500/30 focus-visible:ring-offset-2',
            sizeClasses[size],
            className
          )}
        >
          {children}
          {!hideCloseButton && (
            <GlassModalClose className="glass-close-btn">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </GlassModalClose>
          )}
        </motion.div>
      </DialogPrimitive.Content>
    </AnimatePresence>
  </GlassModalPortal>
))
GlassModalContent.displayName = DialogPrimitive.Content.displayName

const GlassModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('glass-modal-header', className)}
    {...props}
  />
)
GlassModalHeader.displayName = 'GlassModalHeader'

const GlassModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'glass-modal-footer',
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3',
      className
    )}
    {...props}
  />
)
GlassModalFooter.displayName = 'GlassModalFooter'

const GlassModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-xl font-semibold leading-none tracking-tight',
      'text-slate-900 dark:text-slate-100',
      className
    )}
    {...props}
  />
))
GlassModalTitle.displayName = DialogPrimitive.Title.displayName

const GlassModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      'text-sm text-slate-600 dark:text-slate-400',
      'mt-2 leading-relaxed',
      className
    )}
    {...props}
  />
))
GlassModalDescription.displayName = DialogPrimitive.Description.displayName

const GlassModalBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('glass-modal-content', className)}
    {...props}
  />
)
GlassModalBody.displayName = 'GlassModalBody'

export {
  GlassModal,
  GlassModalPortal,
  GlassModalOverlay,
  GlassModalClose,
  GlassModalTrigger,
  GlassModalContent,
  GlassModalHeader,
  GlassModalFooter,
  GlassModalTitle,
  GlassModalDescription,
  GlassModalBody,
}
