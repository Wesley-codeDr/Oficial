'use client';

import * as React from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import type { TabBarMinimizeBehavior } from '../types';
import { TAB_BAR, ANIMATION_DURATION } from '../constants';
import { useLiquidGlass } from '../hooks/useLiquidGlass';

// ============================================
// TYPES
// ============================================

export interface GlassTabItem {
  /** Unique identifier */
  id: string;
  /** Tab label */
  label: string;
  /** Tab icon */
  icon: React.ReactNode;
  /** Whether this is the search tab */
  isSearch?: boolean;
  /** Badge count */
  badge?: number;
  /** Whether tab is disabled */
  disabled?: boolean;
}

export interface GlassTabBarProps {
  /** Tab items */
  items: GlassTabItem[];
  /** Currently active tab ID */
  activeId: string;
  /** Callback when tab changes */
  onChange: (id: string) => void;
  /** Minimize behavior on scroll */
  minimizeBehavior?: TabBarMinimizeBehavior;
  /** Whether tab bar adapts to sidebar in larger contexts */
  sidebarAdaptable?: boolean;
  /** Target scroll container ref */
  scrollContainerRef?: React.RefObject<HTMLElement>;
  /** Additional class names */
  className?: string;
}

// ============================================
// TAB ITEM COMPONENT
// ============================================

interface TabItemProps {
  item: GlassTabItem;
  isActive: boolean;
  isMinimized: boolean;
  onClick: () => void;
  reduceMotion: boolean;
}

function TabItem({ item, isActive, isMinimized, onClick, reduceMotion }: TabItemProps) {
  return (
    <motion.button
      className={cn(
        'relative flex flex-col items-center justify-center',
        'min-w-[64px] px-3 py-2',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:opacity-50 disabled:pointer-events-none',
        isActive
          ? 'text-primary'
          : 'text-muted-foreground hover:text-foreground'
      )}
      onClick={onClick}
      disabled={item.disabled}
      whileTap={reduceMotion ? {} : { scale: 0.95 }}
      layout
    >
      {/* Icon container with glass effect on active */}
      <motion.div
        className={cn(
          'relative flex items-center justify-center',
          'w-8 h-8 rounded-full',
          isActive && 'bg-primary/10'
        )}
        layout
      >
        {item.icon}

        {/* Badge */}
        {item.badge !== undefined && item.badge > 0 && (
          <span
            className={cn(
              'absolute -top-1 -right-1',
              'min-w-[18px] h-[18px] px-1',
              'flex items-center justify-center',
              'bg-destructive text-destructive-foreground',
              'text-[10px] font-medium',
              'rounded-full'
            )}
          >
            {item.badge > 99 ? '99+' : item.badge}
          </span>
        )}
      </motion.div>

      {/* Label (hidden when minimized) */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.span
            className="text-[10px] font-medium mt-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.15 }}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ============================================
// GLASS TAB BAR
// ============================================

/**
 * GlassTabBar - Liquid Glass styled tab bar
 *
 * Tab bars float in the Liquid Glass layer and can minimize when scrolling
 * to help elevate the underlying content.
 *
 * @example
 * ```tsx
 * <GlassTabBar
 *   items={[
 *     { id: 'home', label: 'Home', icon: <HomeIcon /> },
 *     { id: 'explore', label: 'Explore', icon: <CompassIcon /> },
 *     { id: 'search', label: 'Search', icon: <SearchIcon />, isSearch: true },
 *   ]}
 *   activeId={activeTab}
 *   onChange={setActiveTab}
 *   minimizeBehavior="onScrollDown"
 * />
 * ```
 */
export function GlassTabBar({
  items,
  activeId,
  onChange,
  minimizeBehavior = 'never',
  sidebarAdaptable = false,
  scrollContainerRef,
  className,
}: GlassTabBarProps) {
  const { accessibility } = useLiquidGlass();
  const [isMinimized, setIsMinimized] = React.useState(false);
  const lastScrollY = React.useRef(0);

  // Separate search tab from other tabs
  const regularTabs = items.filter((item) => !item.isSearch);
  const searchTab = items.find((item) => item.isSearch);

  // Handle scroll-based minimize behavior
  const { scrollY } = useScroll({
    container: scrollContainerRef,
  });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (minimizeBehavior === 'never' || accessibility.reduceMotion) return;

    const scrollingDown = latest > lastScrollY.current;
    lastScrollY.current = latest;

    if (minimizeBehavior === 'onScrollDown') {
      setIsMinimized(scrollingDown && latest > 50);
    } else if (minimizeBehavior === 'onScrollUp') {
      setIsMinimized(!scrollingDown && latest > 50);
    }
  });

  // Tab bar height animation
  const barHeight = isMinimized ? TAB_BAR.heightMinimized : TAB_BAR.height;

  return (
    <motion.nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'flex items-center justify-center',
        'safe-area-bottom',
        !accessibility.useFallback && [
          'bg-white/78 dark:bg-[rgb(28,28,30)]/78',
          'backdrop-blur-[40px] backdrop-saturate-[200%]',
          'border-t border-black/5 dark:border-white/5',
        ],
        accessibility.useFallback && [
          'bg-white/95 dark:bg-[rgb(28,28,30)]/95',
          'border-t border-black/10 dark:border-white/10',
        ],
        className
      )}
      initial={false}
      animate={{ height: barHeight }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
        duration: accessibility.reduceMotion ? 0 : ANIMATION_DURATION.minimize / 1000,
      }}
      role="tablist"
      aria-label="Main navigation"
    >
      {/* Regular tabs */}
      <div className="flex items-center justify-center flex-1">
        {regularTabs.map((item) => (
          <TabItem
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            isMinimized={isMinimized}
            onClick={() => onChange(item.id)}
            reduceMotion={accessibility.reduceMotion || false}
          />
        ))}
      </div>

      {/* Search tab (separated to trailing position) */}
      {searchTab && (
        <>
          <div
            className="w-px h-6 bg-black/10 dark:bg-white/10 mx-2"
            aria-hidden="true"
          />
          <TabItem
            item={searchTab}
            isActive={activeId === searchTab.id}
            isMinimized={isMinimized}
            onClick={() => onChange(searchTab.id)}
            reduceMotion={accessibility.reduceMotion || false}
          />
        </>
      )}
    </motion.nav>
  );
}

// ============================================
// GLASS TOOLBAR
// ============================================

export interface GlassToolbarItem {
  /** Unique identifier */
  id: string;
  /** Item label (for accessibility) */
  label: string;
  /** Item icon */
  icon: React.ReactNode;
  /** Group ID (items with same group share background) */
  group?: string;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
}

export interface GlassToolbarProps {
  /** Toolbar items */
  items: GlassToolbarItem[];
  /** Alignment */
  alignment?: 'leading' | 'center' | 'trailing';
  /** Enable scroll edge effect */
  scrollEdgeEffect?: boolean;
  /** Additional class names */
  className?: string;
}

/**
 * GlassToolbar - Liquid Glass styled toolbar with grouping
 *
 * @example
 * ```tsx
 * <GlassToolbar
 *   items={[
 *     { id: 'undo', label: 'Undo', icon: <UndoIcon />, group: 'history' },
 *     { id: 'redo', label: 'Redo', icon: <RedoIcon />, group: 'history' },
 *     { id: 'markup', label: 'Markup', icon: <MarkupIcon />, group: 'tools' },
 *     { id: 'more', label: 'More', icon: <MoreIcon />, group: 'tools' },
 *   ]}
 * />
 * ```
 */
export function GlassToolbar({
  items,
  alignment = 'center',
  scrollEdgeEffect = true,
  className,
}: GlassToolbarProps) {
  const { accessibility } = useLiquidGlass();

  // Group items by their group ID
  const groups = React.useMemo(() => {
    const groupMap = new Map<string, GlassToolbarItem[]>();

    items.forEach((item) => {
      const groupId = item.group || item.id;
      const existing = groupMap.get(groupId) || [];
      groupMap.set(groupId, [...existing, item]);
    });

    return Array.from(groupMap.entries());
  }, [items]);

  const alignmentClasses: Record<string, string> = {
    leading: 'justify-start',
    center: 'justify-center',
    trailing: 'justify-end',
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3',
        'h-11',
        !accessibility.useFallback && [
          'bg-white/75 dark:bg-[rgb(28,28,30)]/75',
          'backdrop-blur-[40px] backdrop-saturate-[200%]',
          'border-b border-black/5 dark:border-white/5',
        ],
        accessibility.useFallback && [
          'bg-white/95 dark:bg-[rgb(28,28,30)]/95',
          'border-b border-black/10 dark:border-white/10',
        ],
        alignmentClasses[alignment],
        className
      )}
      role="toolbar"
      aria-label="Toolbar"
    >
      {groups.map(([groupId, groupItems]) => (
        <div
          key={groupId}
          className={cn(
            'flex items-center gap-0.5 p-1',
            groupItems.length > 1 && [
              'bg-white/40 dark:bg-white/10',
              'rounded-xl',
            ]
          )}
        >
          {groupItems.map((item) => (
            <button
              key={item.id}
              className={cn(
                'flex items-center justify-center',
                'w-9 h-9 rounded-lg',
                'text-muted-foreground hover:text-foreground',
                'hover:bg-white/60 dark:hover:bg-white/10',
                'transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                'disabled:opacity-50 disabled:pointer-events-none'
              )}
              onClick={item.onClick}
              disabled={item.disabled}
              aria-label={item.label}
            >
              {item.icon}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GlassTabBar;
