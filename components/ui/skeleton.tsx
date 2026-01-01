import { cn } from '@/lib/utils'

/**
 * Skeleton Component
 *
 * Loading placeholder that shows a pulsing animation
 * while content is being fetched or rendered.
 *
 * @example
 * ```tsx
 * <Skeleton className="h-12 w-12 rounded-full" />
 * <Skeleton className="h-4 w-[250px]" />
 * ```
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}

/**
 * Card Skeleton
 *
 * Pre-built skeleton for card components
 */
function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('glass-card p-6 space-y-4', className)}>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-8 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
  )
}

/**
 * Dashboard Skeleton
 *
 * Loading state for dashboard with metrics grid
 */
function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-4 w-[400px]" />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>

      {/* Kanban Board */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-[200px]" />
        <div className="flex gap-6 overflow-x-auto pb-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="min-w-[350px] space-y-4">
              <Skeleton className="h-10 w-full" />
              {Array.from({ length: 3 }).map((_, j) => (
                <CardSkeleton key={j} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Table Skeleton
 *
 * Loading state for table components
 */
function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div className="flex gap-4 border-b pb-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>

      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          <Skeleton className="h-10 w-[150px]" />
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
      ))}
    </div>
  )
}

/**
 * Form Skeleton
 *
 * Loading state for form components
 */
function FormSkeleton({ fields = 5 }: { fields?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <div className="flex gap-4 justify-end pt-4">
        <Skeleton className="h-10 w-[100px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>
    </div>
  )
}

/**
 * Chat Skeleton
 *
 * Loading state for chat/conversation components
 */
function ChatSkeleton({ messages = 5 }: { messages?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: messages }).map((_, i) => (
        <div
          key={i}
          className={cn('flex gap-3', i % 2 === 0 ? 'justify-start' : 'justify-end')}
        >
          {i % 2 === 0 && <Skeleton className="h-10 w-10 rounded-full" />}
          <div className="space-y-2 max-w-[70%]">
            <Skeleton className={cn('h-4 w-[80px]', i % 2 !== 0 && 'ml-auto')} />
            <Skeleton className={cn('h-20 w-full rounded-lg', i % 2 === 0 ? 'rounded-tl-none' : 'rounded-tr-none')} />
          </div>
          {i % 2 !== 0 && <Skeleton className="h-10 w-10 rounded-full" />}
        </div>
      ))}
    </div>
  )
}

/**
 * List Skeleton
 *
 * Loading state for list components
 */
function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 glass-card">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-3 w-[150px]" />
          </div>
          <Skeleton className="h-8 w-[80px]" />
        </div>
      ))}
    </div>
  )
}

export {
  Skeleton,
  CardSkeleton,
  DashboardSkeleton,
  TableSkeleton,
  FormSkeleton,
  ChatSkeleton,
  ListSkeleton,
}
