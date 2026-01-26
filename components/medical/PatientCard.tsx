'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Copy, FileText, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { StatusIndicator, StatusIndicatorStatus } from './StatusIndicator'
import { GlassBadge } from '@/components/ui/glass-badge'
import { GlassButton } from '@/components/ui/glass-button'
import { patientCardExpandChoreography } from '@/lib/design-system/animation-choreography'

/**
 * Patient Card Component - Compound Component Pattern
 *
 * Features:
 * - Expandable sections (accordion)
 * - Metadata badges
 * - Quick actions menu
 * - Status indicator
 * - Avatar/initials
 * - Timestamps
 *
 * Usage:
 * <PatientCard>
 *   <PatientCard.Header>
 *     <PatientCard.Avatar initials="JD" />
 *     <PatientCard.Info name="João" condition="Dor torácica" />
 *     <StatusIndicator status="urgent" />
 *   </PatientCard.Header>
 *   <PatientCard.Metadata>
 *     <PatientCard.Badge>IAM</PatientCard.Badge>
 *     <PatientCard.TimeAgo time="2h atrás" />
 *   </PatientCard.Metadata>
 *   <PatientCard.ExpandableContent>
 *     Preview do texto...
 *   </PatientCard.ExpandableContent>
 *   <PatientCard.Actions>
 *     <Button>Copy</Button>
 *   </PatientCard.Actions>
 * </PatientCard>
 */

// ============================================================================
// TYPES
// ============================================================================

export interface PatientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /** Card é expansível */
  expandable?: boolean
  /** Estado inicial de expansão */
  defaultExpanded?: boolean
}

export interface PatientCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface PatientCardAvatarProps {
  initials: string
  src?: string
  alt?: string
  gradient?: string
}

export interface PatientCardInfoProps {
  name: string
  condition?: string
  subtitle?: string
}

export interface PatientCardMetadataProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface PatientCardBadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'critical'
}

export interface PatientCardTimeAgoProps {
  time: string
}

export interface PatientCardExpandableContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface PatientCardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

// ============================================================================
// CONTEXT
// ============================================================================

interface PatientCardContextValue {
  isExpanded: boolean
  toggleExpanded: () => void
  expandable: boolean
}

const PatientCardContext = React.createContext<PatientCardContextValue | undefined>(undefined)

function usePatientCardContext() {
  const context = React.useContext(PatientCardContext)
  if (!context) {
    throw new Error('PatientCard compound components must be used within PatientCard')
  }
  return context
}

// ============================================================================
// ROOT COMPONENT
// ============================================================================

export const PatientCard = React.forwardRef<HTMLDivElement, PatientCardProps>(
  ({ children, expandable = true, defaultExpanded = false, className, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = React.useState(defaultExpanded)

    const toggleExpanded = React.useCallback(() => {
      if (expandable) {
        setIsExpanded((prev) => !prev)
      }
    }, [expandable])

    return (
      <PatientCardContext.Provider value={{ isExpanded, toggleExpanded, expandable }}>
        <motion.div
          ref={ref}
          className={cn(
            'relative overflow-hidden',
            'bg-surface-card backdrop-blur-[40px] saturate-[180%]',
            'border border-border-subtle',
            'rounded-glass-md',
            'shadow-card',
            'hover:shadow-card-hover hover:-translate-y-0.5',
            'transition-all duration-[280ms] ease-out',
            className
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          {...props}
        >
          {children}
        </motion.div>
      </PatientCardContext.Provider>
    )
  }
)

PatientCard.displayName = 'PatientCard'

// ============================================================================
// HEADER
// ============================================================================

const PatientCardHeader = React.forwardRef<HTMLDivElement, PatientCardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-3 p-4', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

PatientCardHeader.displayName = 'PatientCard.Header'

// ============================================================================
// AVATAR
// ============================================================================

const PatientCardAvatar: React.FC<PatientCardAvatarProps> = ({
  initials,
  src,
  alt,
  gradient = 'linear-gradient(135deg, #007AFF, #5AC8FA)',
}) => {
  return (
    <motion.div
      className="relative w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base overflow-hidden"
      style={{ background: gradient }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
    >
      {src ? (
        <img src={src} alt={alt || initials} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </motion.div>
  )
}

PatientCardAvatar.displayName = 'PatientCard.Avatar'

// ============================================================================
// INFO
// ============================================================================

const PatientCardInfo: React.FC<PatientCardInfoProps> = ({ name, condition, subtitle }) => {
  return (
    <div className="flex-1 min-w-0">
      <motion.h4
        className="font-semibold text-text-primary truncate"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.2 }}
      >
        {name}
      </motion.h4>
      {(condition || subtitle) && (
        <motion.p
          className="text-sm text-text-secondary truncate"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          {condition || subtitle}
        </motion.p>
      )}
    </div>
  )
}

PatientCardInfo.displayName = 'PatientCard.Info'

// ============================================================================
// METADATA
// ============================================================================

const PatientCardMetadata = React.forwardRef<HTMLDivElement, PatientCardMetadataProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2 px-4 pb-3', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

PatientCardMetadata.displayName = 'PatientCard.Metadata'

// ============================================================================
// BADGE
// ============================================================================

const PatientCardBadge: React.FC<PatientCardBadgeProps> = ({
  children,
  variant = 'default',
}) => {
  const variantMap: Record<string, any> = {
    default: 'default',
    primary: 'healthcare-primary',
    success: 'healthcare-success',
    warning: 'healthcare-warning',
    critical: 'healthcare-critical',
  }

  return (
    <GlassBadge variant={variantMap[variant]} size="sm">
      {children}
    </GlassBadge>
  )
}

PatientCardBadge.displayName = 'PatientCard.Badge'

// ============================================================================
// TIME AGO
// ============================================================================

const PatientCardTimeAgo: React.FC<PatientCardTimeAgoProps> = ({ time }) => {
  return <span className="text-xs text-text-muted font-medium">{time}</span>
}

PatientCardTimeAgo.displayName = 'PatientCard.TimeAgo'

// ============================================================================
// EXPANDABLE CONTENT
// ============================================================================

const PatientCardExpandableContent = React.forwardRef<
  HTMLDivElement,
  PatientCardExpandableContentProps
>(({ children, className, ...props }, ref) => {
  const { isExpanded, toggleExpanded, expandable } = usePatientCardContext()

  return (
    <>
      {expandable && (
        <button
          onClick={toggleExpanded}
          className={cn(
            'w-full px-4 py-2 flex items-center justify-between',
            'text-sm font-medium text-text-secondary',
            'hover:bg-surface-subtle transition-colors duration-200',
            'border-t border-border-subtle'
          )}
        >
          <span>{isExpanded ? 'Ocultar' : 'Ver'} detalhes</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
      )}

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            ref={ref}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={patientCardExpandChoreography.container}
            className="overflow-hidden"
          >
            <motion.div
              className={cn('px-4 py-3 border-t border-border-subtle', className)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={patientCardExpandChoreography.content}
              {...props}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

PatientCardExpandableContent.displayName = 'PatientCard.ExpandableContent'

// ============================================================================
// ACTIONS
// ============================================================================

const PatientCardActions = React.forwardRef<HTMLDivElement, PatientCardActionsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-2 px-4 py-3',
          'border-t border-border-subtle',
          'bg-surface-subtle/50',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

PatientCardActions.displayName = 'PatientCard.Actions'

// ============================================================================
// EXPORTS
// ============================================================================

PatientCard.Header = PatientCardHeader
PatientCard.Avatar = PatientCardAvatar
PatientCard.Info = PatientCardInfo
PatientCard.Metadata = PatientCardMetadata
PatientCard.Badge = PatientCardBadge
PatientCard.TimeAgo = PatientCardTimeAgo
PatientCard.ExpandableContent = PatientCardExpandableContent
PatientCard.Actions = PatientCardActions

export {
  PatientCardHeader,
  PatientCardAvatar,
  PatientCardInfo,
  PatientCardMetadata,
  PatientCardBadge,
  PatientCardTimeAgo,
  PatientCardExpandableContent,
  PatientCardActions,
}
