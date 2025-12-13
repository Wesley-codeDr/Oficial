'use client';

import * as React from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronDown, GripVertical } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SIDEBAR, ANIMATION_DURATION, ANIMATION_EASING } from '../constants';
import { useLiquidGlass } from '../hooks/useLiquidGlass';

// ============================================
// TYPES
// ============================================

/**
 * Sidebar size variants
 * Affects row height, text size, and glyph size
 */
export type SidebarSize = 'small' | 'medium' | 'large';

/**
 * Sidebar item configuration
 */
export interface SidebarItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon component or element */
  icon?: LucideIcon | React.ReactNode;
  /** Badge count */
  badge?: number;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Nested items (for disclosure groups) */
  children?: SidebarItem[];
  /** Whether group is initially expanded */
  defaultExpanded?: boolean;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Sidebar section configuration
 */
export interface SidebarSection {
  /** Section identifier */
  id: string;
  /** Section title (optional) */
  title?: string;
  /** Items in this section */
  items: SidebarItem[];
  /** Whether section is collapsible */
  collapsible?: boolean;
  /** Whether section is initially collapsed */
  defaultCollapsed?: boolean;
}

export interface GlassSidebarProps {
  /** Sidebar sections */
  sections: SidebarSection[];
  /** Currently selected item ID */
  selectedId?: string;
  /** Callback when item is selected */
  onSelect?: (id: string) => void;
  /** Sidebar size variant */
  size?: SidebarSize;
  /** Whether sidebar is visible */
  isVisible?: boolean;
  /** Callback to toggle visibility */
  onVisibilityChange?: (visible: boolean) => void;
  /** Whether to allow customization (drag to reorder) */
  allowCustomization?: boolean;
  /** Sidebar position */
  position?: 'leading' | 'trailing';
  /** Whether to use compact mode (icons only) */
  compact?: boolean;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Additional class names */
  className?: string;
}

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const SIZE_CONFIG: Record<SidebarSize, {
  rowHeight: number;
  fontSize: number;
  iconSize: number;
  padding: number;
}> = {
  small: { rowHeight: 28, fontSize: 12, iconSize: 16, padding: 8 },
  medium: { rowHeight: 32, fontSize: 13, iconSize: 18, padding: 10 },
  large: { rowHeight: 38, fontSize: 14, iconSize: 20, padding: 12 },
};

// ============================================
// SIDEBAR ITEM COMPONENT
// ============================================

interface SidebarItemRowProps {
  item: SidebarItem;
  isSelected: boolean;
  isExpanded?: boolean;
  onSelect: () => void;
  onToggleExpand?: () => void;
  size: SidebarSize;
  depth: number;
  reduceMotion: boolean;
  allowDrag?: boolean;
}

function SidebarItemRow({
  item,
  isSelected,
  isExpanded,
  onSelect,
  onToggleExpand,
  size,
  depth,
  reduceMotion,
  allowDrag,
}: SidebarItemRowProps) {
  const config = SIZE_CONFIG[size];
  const hasChildren = item.children && item.children.length > 0;
  const indentPadding = depth * 16;

  // Render icon
  const renderIcon = () => {
    if (!item.icon) return null;

    // Check if it's a Lucide icon (function component)
    if (typeof item.icon === 'function') {
      const IconComponent = item.icon as LucideIcon;
      return (
        <IconComponent
          size={config.iconSize}
          className={cn(
            'flex-shrink-0 transition-colors',
            isSelected ? 'text-primary' : 'text-muted-foreground'
          )}
        />
      );
    }

    // It's a React element
    return item.icon;
  };

  return (
    <motion.button
      className={cn(
        'group w-full flex items-center gap-2',
        'rounded-lg transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:opacity-50 disabled:pointer-events-none',
        isSelected
          ? 'bg-primary/10 text-primary'
          : 'text-foreground hover:bg-white/40 dark:hover:bg-white/10'
      )}
      style={{
        height: config.rowHeight,
        paddingLeft: config.padding + indentPadding,
        paddingRight: config.padding,
        fontSize: config.fontSize,
      }}
      onClick={() => {
        if (hasChildren && onToggleExpand) {
          onToggleExpand();
        } else {
          onSelect();
        }
      }}
      disabled={item.disabled}
      whileTap={reduceMotion ? {} : { scale: 0.98 }}
      layout
    >
      {/* Drag handle */}
      {allowDrag && (
        <GripVertical
          size={14}
          className="flex-shrink-0 opacity-0 group-hover:opacity-50 cursor-grab"
        />
      )}

      {/* Disclosure indicator */}
      {hasChildren && (
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.15 }}
          className="flex-shrink-0"
        >
          <ChevronRight size={14} className="text-muted-foreground" />
        </motion.div>
      )}

      {/* Icon */}
      {renderIcon()}

      {/* Label */}
      <span className="flex-1 truncate text-left font-medium">
        {item.label}
      </span>

      {/* Badge */}
      {item.badge !== undefined && item.badge > 0 && (
        <span
          className={cn(
            'flex-shrink-0 min-w-[20px] h-5 px-1.5',
            'flex items-center justify-center',
            'bg-primary text-primary-foreground',
            'text-xs font-medium rounded-full'
          )}
        >
          {item.badge > 99 ? '99+' : item.badge}
        </span>
      )}
    </motion.button>
  );
}

// ============================================
// SIDEBAR SECTION COMPONENT
// ============================================

interface SidebarSectionGroupProps {
  section: SidebarSection;
  selectedId?: string;
  onSelect: (id: string) => void;
  size: SidebarSize;
  reduceMotion: boolean;
  allowCustomization?: boolean;
}

function SidebarSectionGroup({
  section,
  selectedId,
  onSelect,
  size,
  reduceMotion,
  allowCustomization,
}: SidebarSectionGroupProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(section.defaultCollapsed ?? false);
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(() => {
    const initial = new Set<string>();
    section.items.forEach((item) => {
      if (item.defaultExpanded && item.children) {
        initial.add(item.id);
      }
    });
    return initial;
  });

  const toggleItemExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const renderItems = (items: SidebarItem[], depth: number = 0) => {
    return items.map((item) => {
      const isExpanded = expandedItems.has(item.id);
      const hasChildren = item.children && item.children.length > 0;

      return (
        <React.Fragment key={item.id}>
          <SidebarItemRow
            item={item}
            isSelected={selectedId === item.id}
            isExpanded={isExpanded}
            onSelect={() => onSelect(item.id)}
            onToggleExpand={hasChildren ? () => toggleItemExpanded(item.id) : undefined}
            size={size}
            depth={depth}
            reduceMotion={reduceMotion}
            allowDrag={allowCustomization}
          />

          {/* Nested children */}
          <AnimatePresence>
            {hasChildren && isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
                className="overflow-hidden"
              >
                {renderItems(item.children!, depth + 1)}
              </motion.div>
            )}
          </AnimatePresence>
        </React.Fragment>
      );
    });
  };

  return (
    <div className="py-1">
      {/* Section title */}
      {section.title && (
        <button
          className={cn(
            'w-full flex items-center gap-1 px-3 py-1.5',
            'text-xs font-semibold uppercase tracking-wider',
            'text-muted-foreground',
            section.collapsible && 'hover:text-foreground cursor-pointer'
          )}
          onClick={() => section.collapsible && setIsCollapsed(!isCollapsed)}
          disabled={!section.collapsible}
        >
          {section.collapsible && (
            <motion.div
              animate={{ rotate: isCollapsed ? -90 : 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.15 }}
            >
              <ChevronDown size={12} />
            </motion.div>
          )}
          {section.title}
        </button>
      )}

      {/* Section items */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={section.collapsible ? { height: 0, opacity: 0 } : false}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="space-y-0.5 px-2"
          >
            {renderItems(section.items)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// GLASS SIDEBAR COMPONENT
// ============================================

/**
 * GlassSidebar - Liquid Glass styled sidebar navigation
 *
 * A sidebar floats above content in the Liquid Glass layer without being
 * anchored to the edges of the view. It provides a broad, flat view of
 * an app's information hierarchy.
 *
 * @example
 * ```tsx
 * <GlassSidebar
 *   sections={[
 *     {
 *       id: 'main',
 *       title: 'Navigation',
 *       items: [
 *         { id: 'home', label: 'Home', icon: Home },
 *         { id: 'explore', label: 'Explore', icon: Compass },
 *       ],
 *     },
 *   ]}
 *   selectedId={activeItem}
 *   onSelect={setActiveItem}
 *   size="medium"
 * />
 * ```
 */
export function GlassSidebar({
  sections,
  selectedId,
  onSelect,
  size = 'medium',
  isVisible = true,
  onVisibilityChange,
  allowCustomization = false,
  position = 'leading',
  compact = false,
  header,
  footer,
  className,
}: GlassSidebarProps) {
  const { accessibility } = useLiquidGlass();
  const sidebarRef = React.useRef<HTMLElement>(null);

  // Swipe to hide (iPadOS-style edge swipe)
  const dragX = useMotionValue(0);
  const sidebarWidth = compact ? SIDEBAR.widthCompact : SIDEBAR.width;

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = sidebarWidth * 0.5;
    const shouldHide = position === 'leading'
      ? info.offset.x < -threshold
      : info.offset.x > threshold;

    if (shouldHide && onVisibilityChange) {
      onVisibilityChange(false);
    }
    dragX.set(0);
  };

  // Animation variants
  const sidebarVariants = {
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        duration: accessibility.reduceMotion ? 0 : ANIMATION_DURATION.expand / 1000,
      },
    },
    hidden: {
      x: position === 'leading' ? -sidebarWidth : sidebarWidth,
      opacity: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        duration: accessibility.reduceMotion ? 0 : ANIMATION_DURATION.collapse / 1000,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          ref={sidebarRef}
          className={cn(
            'flex-shrink-0 h-full flex flex-col',
            'overflow-hidden',
            // Liquid Glass styling
            !accessibility.useFallback && [
              'bg-white/60 dark:bg-[rgb(28,28,30)]/70',
              'backdrop-blur-[40px] backdrop-saturate-[200%]',
              position === 'leading'
                ? 'border-r border-white/30 dark:border-white/10'
                : 'border-l border-white/30 dark:border-white/10',
              'rounded-2xl m-2',
              'shadow-lg shadow-black/5',
            ],
            // Fallback styling
            accessibility.useFallback && [
              'bg-white/95 dark:bg-[rgb(28,28,30)]/95',
              position === 'leading'
                ? 'border-r border-black/10 dark:border-white/10'
                : 'border-l border-black/10 dark:border-white/10',
            ],
            className
          )}
          style={{
            width: sidebarWidth,
          }}
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          drag={onVisibilityChange ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          role="navigation"
          aria-label="Sidebar"
        >
          {/* Header */}
          {header && (
            <div className="flex-shrink-0 px-4 py-3 border-b border-black/5 dark:border-white/5">
              {header}
            </div>
          )}

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
            {sections.map((section) => (
              <SidebarSectionGroup
                key={section.id}
                section={section}
                selectedId={selectedId}
                onSelect={onSelect || (() => {})}
                size={size}
                reduceMotion={accessibility.reduceMotion || false}
                allowCustomization={allowCustomization}
              />
            ))}
          </div>

          {/* Footer */}
          {footer && (
            <div className="flex-shrink-0 px-4 py-3 border-t border-black/5 dark:border-white/5">
              {footer}
            </div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

// ============================================
// SIDEBAR TOGGLE BUTTON
// ============================================

export interface SidebarToggleProps {
  /** Whether sidebar is visible */
  isVisible: boolean;
  /** Toggle callback */
  onToggle: () => void;
  /** Button position */
  position?: 'leading' | 'trailing';
  /** Additional class names */
  className?: string;
}

/**
 * SidebarToggle - Button to show/hide sidebar
 *
 * @example
 * ```tsx
 * <SidebarToggle
 *   isVisible={sidebarVisible}
 *   onToggle={() => setSidebarVisible(!sidebarVisible)}
 * />
 * ```
 */
export function SidebarToggle({
  isVisible,
  onToggle,
  position = 'leading',
  className,
}: SidebarToggleProps) {
  const { accessibility } = useLiquidGlass();

  return (
    <motion.button
      className={cn(
        'flex items-center justify-center',
        'w-9 h-9 rounded-lg',
        'text-muted-foreground hover:text-foreground',
        !accessibility.useFallback && [
          'bg-white/40 dark:bg-white/10',
          'backdrop-blur-sm',
          'hover:bg-white/60 dark:hover:bg-white/20',
        ],
        accessibility.useFallback && [
          'bg-muted/50',
          'hover:bg-muted',
        ],
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
      onClick={onToggle}
      whileTap={accessibility.reduceMotion ? {} : { scale: 0.95 }}
      aria-label={isVisible ? 'Hide sidebar' : 'Show sidebar'}
      aria-expanded={isVisible}
    >
      <motion.svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        animate={{ scaleX: isVisible ? 1 : -1 }}
        transition={{ duration: accessibility.reduceMotion ? 0 : 0.15 }}
      >
        <rect
          x="2"
          y="3"
          width="14"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <line
          x1={position === 'leading' ? '7' : '11'}
          y1="3"
          x2={position === 'leading' ? '7' : '11'}
          y2="15"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </motion.svg>
    </motion.button>
  );
}

// ============================================
// SIDEBAR LAYOUT COMPONENT
// ============================================

export interface SidebarLayoutProps {
  /** Sidebar content */
  sidebar: React.ReactNode;
  /** Main content */
  children: React.ReactNode;
  /** Whether sidebar is visible */
  sidebarVisible?: boolean;
  /** Callback when sidebar visibility changes */
  onSidebarVisibilityChange?: (visible: boolean) => void;
  /** Sidebar position */
  sidebarPosition?: 'leading' | 'trailing';
  /** Whether to use background extension effect */
  backgroundExtension?: boolean;
  /** Additional class names for container */
  className?: string;
}

/**
 * SidebarLayout - Layout container with sidebar and content
 *
 * Extends content beneath the sidebar using background extension effect
 * to reinforce the floating appearance of the sidebar.
 *
 * @example
 * ```tsx
 * <SidebarLayout
 *   sidebar={<GlassSidebar sections={[...]} />}
 *   backgroundExtension
 * >
 *   <MainContent />
 * </SidebarLayout>
 * ```
 */
export function SidebarLayout({
  sidebar,
  children,
  sidebarVisible = true,
  onSidebarVisibilityChange,
  sidebarPosition = 'leading',
  backgroundExtension = true,
  className,
}: SidebarLayoutProps) {
  const { accessibility } = useLiquidGlass();

  return (
    <div
      className={cn(
        'flex h-full w-full',
        sidebarPosition === 'trailing' && 'flex-row-reverse',
        className
      )}
    >
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarVisible && sidebar}
      </AnimatePresence>

      {/* Main content with optional background extension */}
      <main className="flex-1 relative overflow-hidden">
        {/* Background extension effect */}
        {backgroundExtension && sidebarVisible && !accessibility.useFallback && (
          <div
            className="absolute inset-y-0 pointer-events-none z-0"
            style={{
              [sidebarPosition === 'leading' ? 'left' : 'right']: 0,
              width: SIDEBAR.width,
              backdropFilter: `blur(${SIDEBAR.backgroundExtensionBlur}px) saturate(120%)`,
              WebkitBackdropFilter: `blur(${SIDEBAR.backgroundExtensionBlur}px) saturate(120%)`,
              maskImage: `linear-gradient(${
                sidebarPosition === 'leading' ? 'to right' : 'to left'
              }, black 0%, transparent 100%)`,
              WebkitMaskImage: `linear-gradient(${
                sidebarPosition === 'leading' ? 'to right' : 'to left'
              }, black 0%, transparent 100%)`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Content */}
        <div className="relative z-10 h-full">
          {children}
        </div>
      </main>
    </div>
  );
}

export default GlassSidebar;
