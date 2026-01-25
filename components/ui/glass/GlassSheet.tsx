'use client'

import * as React from 'react'
import { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  glassMaterial,
  glassRadius,
  glassTransition,
} from '@/lib/design-system/glass-tokens'

/**
 * GlassSheet - iOS 26 style bottom sheet / modal component
 * Based on Apple's Liquid Glass 2026 design (share sheets, action menus)
 *
 * Features:
 * - Elevated glass variant with backdrop blur
 * - Slide up animation from bottom with spring physics
 * - Drag to dismiss support
 * - Grab handle indicator
 * - Support for various content types (share menu, action list, etc.)
 */

// ==================== ANIMATION VARIANTS ====================

const overlayVariants = {
  hidden: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
  },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(8px)',
    transition: {
      duration: 0.3,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: {
      duration: 0.2,
      ease: [0.25, 1, 0.5, 1],
    },
  },
}

const sheetVariants = {
  hidden: {
    y: '100%',
    opacity: 0.8,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
  exit: {
    y: '100%',
    opacity: 0.8,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

// ==================== ROOT COMPONENTS ====================

const GlassSheet = DialogPrimitive.Root
const GlassSheetTrigger = DialogPrimitive.Trigger
const GlassSheetClose = DialogPrimitive.Close
const GlassSheetPortal = DialogPrimitive.Portal

// ==================== OVERLAY ====================

const GlassSheetOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} asChild {...props}>
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
  </DialogPrimitive.Overlay>
))
GlassSheetOverlay.displayName = DialogPrimitive.Overlay.displayName

// ==================== CONTENT ====================

interface GlassSheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Show the grab handle indicator */
  showHandle?: boolean
  /** Show close button */
  showCloseButton?: boolean
  /** Height variant */
  height?: 'auto' | 'half' | 'full'
}

const heightClasses = {
  auto: 'max-h-[90vh]',
  half: 'h-[50vh]',
  full: 'h-[95vh]',
}

const GlassSheetContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  GlassSheetContentProps
>(
  (
    {
      className,
      children,
      showHandle = true,
      showCloseButton = true,
      height = 'auto',
      ...props
    },
    ref
  ) => {
    return (
      <GlassSheetPortal>
        <GlassSheetOverlay />
        <DialogPrimitive.Content ref={ref} asChild {...props}>
          <motion.div
            className={cn(
              'fixed inset-x-0 bottom-0 z-50',
              'flex flex-col',
              heightClasses[height],
              // Glass styling - elevated variant
              'liquid-glass-elevated',
              'bg-white/75 dark:bg-slate-900/80',
              // Border
              'border-t border-white/30 dark:border-white/10',
              // Radius - iOS 26 style large
              'rounded-t-[32px]',
              // Shadow
              'shadow-[0_-25px_60px_-12px_rgba(0,0,0,0.25)]',
              // Focus
              'focus:outline-none',
              className
            )}
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Inner glow line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-t-[32px]" />

            {/* Grab handle */}
            {showHandle && (
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-slate-400/50 dark:bg-slate-500/50" />
              </div>
            )}

            {/* Close button */}
            {showCloseButton && (
              <DialogPrimitive.Close
                className={cn(
                  'absolute right-4 top-4',
                  'w-8 h-8 rounded-full',
                  'flex items-center justify-center',
                  'bg-slate-200/50 dark:bg-slate-700/50',
                  'text-slate-500 dark:text-slate-400',
                  'hover:bg-slate-200/80 dark:hover:bg-slate-700/80',
                  glassTransition.fast,
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50'
                )}
              >
                <X className="w-4 h-4" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-safe-area-inset-bottom custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </DialogPrimitive.Content>
      </GlassSheetPortal>
    )
  }
)
GlassSheetContent.displayName = DialogPrimitive.Content.displayName

// ==================== HEADER ====================

const GlassSheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col items-center gap-2 pt-2 pb-4',
      'border-b border-slate-200/50 dark:border-slate-700/50',
      className
    )}
    {...props}
  />
)
GlassSheetHeader.displayName = 'GlassSheetHeader'

// ==================== TITLE ====================

const GlassSheetTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold text-slate-900 dark:text-white',
      className
    )}
    {...props}
  />
))
GlassSheetTitle.displayName = DialogPrimitive.Title.displayName

// ==================== DESCRIPTION ====================

const GlassSheetDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-slate-500 dark:text-slate-400', className)}
    {...props}
  />
))
GlassSheetDescription.displayName = DialogPrimitive.Description.displayName

// ==================== FOOTER ====================

const GlassSheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col gap-2 p-4',
      'border-t border-slate-200/50 dark:border-slate-700/50',
      'mt-auto',
      className
    )}
    {...props}
  />
)
GlassSheetFooter.displayName = 'GlassSheetFooter'

// ==================== SHARE GRID ====================

interface GlassSheetShareGridProps {
  children: React.ReactNode
  className?: string
}

const GlassSheetShareGrid = ({ children, className }: GlassSheetShareGridProps) => (
  <div className={cn('grid grid-cols-4 gap-3 py-4', className)}>
    {children}
  </div>
)
GlassSheetShareGrid.displayName = 'GlassSheetShareGrid'

// ==================== SHARE ITEM ====================

interface GlassSheetShareItemProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  className?: string
}

const GlassSheetShareItem = ({
  icon,
  label,
  onClick,
  className,
}: GlassSheetShareItemProps) => (
  <motion.button
    type="button"
    onClick={onClick}
    className={cn(
      'flex flex-col items-center gap-2 p-2',
      'rounded-2xl',
      'hover:bg-slate-100/50 dark:hover:bg-slate-800/50',
      glassTransition.fast,
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50',
      className
    )}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div
      className={cn(
        'w-14 h-14 rounded-full',
        'flex items-center justify-center',
        'bg-gradient-to-b from-slate-100 to-slate-200',
        'dark:from-slate-700 dark:to-slate-800',
        'shadow-sm',
        '[&>svg]:w-6 [&>svg]:h-6 text-slate-600 dark:text-slate-300'
      )}
    >
      {icon}
    </div>
    <span className="text-xs text-slate-600 dark:text-slate-400 text-center line-clamp-2">
      {label}
    </span>
  </motion.button>
)
GlassSheetShareItem.displayName = 'GlassSheetShareItem'

// ==================== EXPORTS ====================

export {
  GlassSheet,
  GlassSheetTrigger,
  GlassSheetClose,
  GlassSheetPortal,
  GlassSheetOverlay,
  GlassSheetContent,
  GlassSheetHeader,
  GlassSheetTitle,
  GlassSheetDescription,
  GlassSheetFooter,
  GlassSheetShareGrid,
  GlassSheetShareItem,
}
