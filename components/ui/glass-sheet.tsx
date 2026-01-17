'use client'

import * as React from 'react'
import { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * GlassSheet - iOS 26 style bottom sheet / modal component
 * Based on Apple's Liquid Glass 2026 design (share sheets, action menus)
 *
 * Features:
 * - Frosted glass background with heavy blur
 * - Slide up animation from bottom
 * - Drag to dismiss support
 * - Grab handle indicator
 * - Support for various content types (share menu, action list, etc.)
 */

const GlassSheet = DialogPrimitive.Root

const GlassSheetTrigger = DialogPrimitive.Trigger

const GlassSheetClose = DialogPrimitive.Close

const GlassSheetPortal = DialogPrimitive.Portal

const GlassSheetOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50',
      'bg-black/40 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
GlassSheetOverlay.displayName = DialogPrimitive.Overlay.displayName

interface GlassSheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Show the grab handle indicator */
  showHandle?: boolean
  /** Show close button */
  showCloseButton?: boolean
  /** Height variant */
  height?: 'auto' | 'half' | 'full'
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
    const heightClasses = {
      auto: 'max-h-[90vh]',
      half: 'h-[50vh]',
      full: 'h-[95vh]',
    }

    return (
      <GlassSheetPortal>
        <GlassSheetOverlay />
        <DialogPrimitive.Content
          ref={ref}
          asChild
          {...props}
        >
          <motion.div
            className={cn(
              'fixed inset-x-0 bottom-0 z-50',
              'flex flex-col',
              heightClasses[height],
              // Glass styling
              'bg-white/75 dark:bg-slate-900/80',
              'backdrop-blur-[80px] saturate-[180%]',
              'border-t border-white/30 dark:border-white/10',
              'rounded-t-[32px]',
              // Shadow
              'shadow-[0_-25px_60px_-12px_rgba(0,0,0,0.25)]',
              // Inner glow
              'before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent',
              className
            )}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 40,
            }}
          >
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
                  'transition-colors duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50'
                )}
              >
                <X className="w-4 h-4" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-safe-area-inset-bottom">
              {children}
            </div>
          </motion.div>
        </DialogPrimitive.Content>
      </GlassSheetPortal>
    )
  }
)
GlassSheetContent.displayName = DialogPrimitive.Content.displayName

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

const GlassSheetDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      'text-sm text-slate-500 dark:text-slate-400',
      className
    )}
    {...props}
  />
))
GlassSheetDescription.displayName = DialogPrimitive.Description.displayName

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

/**
 * GlassSheetShareGrid - iOS share sheet style grid of actions
 */
interface GlassSheetShareGridProps {
  children: React.ReactNode
  className?: string
}

const GlassSheetShareGrid = ({ children, className }: GlassSheetShareGridProps) => (
  <div
    className={cn(
      'grid grid-cols-4 gap-3 py-4',
      className
    )}
  >
    {children}
  </div>
)
GlassSheetShareGrid.displayName = 'GlassSheetShareGrid'

/**
 * GlassSheetShareItem - Individual share action item
 */
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
      'transition-colors duration-200',
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
