'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  PlusCircle, FolderClock, Settings,
  Activity, PanelLeftClose, PanelLeftOpen, LayoutGrid,
  LogOut, Sun, Moon, Calculator, ChevronDown, ChevronRight
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSidebar, SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_EXPANDED_WIDTH } from '@/lib/contexts/sidebar-context';

// Custom ChatWell icon with "W" inside speech bubble
const ChatWellIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Speech bubble outline */}
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    {/* W letter inside */}
    <path d="M8 9l1.5 5.5L12 11l2.5 3.5L16 9" strokeWidth="inherit" />
  </svg>
);

// Types for navigation items
interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

interface SidebarGroup {
  id: string;
  label?: string;
  items: SidebarItem[];
  collapsible?: boolean;
}

interface SidebarGroups {
  main: SidebarItem[];
  records: SidebarItem[];
  system: SidebarItem[];
}

// NavItem Component - Apple HIG compliant
interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
  isCollapsed: boolean;
}

function NavItem({ icon: Icon, label, href, isActive, isCollapsed }: NavItemProps) {
  return (
    <li>
      <Link
        href={href}
        title={isCollapsed ? label : undefined}
        className={cn(
          'relative flex items-center w-full transition-all duration-200 ease-out group',
          // Apple HIG - Rounded corners for tap targets
          'rounded-xl',
          // Apple HIG focus states with accent color
          'outline-none focus-visible:ring-2 focus-visible:ring-healthcare-primary/50',
          'focus-visible:ring-offset-1 focus-visible:ring-offset-transparent',
          isCollapsed ? 'justify-center px-0 py-2.5 mx-1' : 'px-3 py-2.5'
        )}
      >
        {/* Active/Hover Background - Apple HIG Liquid Glass style */}
        <motion.div
          className={cn(
            'absolute inset-0 rounded-xl transition-colors duration-200',
            isActive
              ? 'sidebar-nav-item-active'
              : 'bg-transparent group-hover:bg-white/40 dark:group-hover:bg-white/5'
          )}
          layoutId={isActive ? undefined : undefined}
        />

        {/* Icon - Apple HIG uses accent color for active state */}
        <div className={cn(
          'relative z-10 flex items-center justify-center transition-transform duration-200',
          'group-active:scale-95'
        )}>
          <Icon
            className={cn(
              'w-[20px] h-[20px] transition-all duration-200',
              isActive
                ? 'text-healthcare-primary dark:text-healthcare-primary-light stroke-[2px]'
                : 'text-slate-500 dark:text-slate-400 stroke-[1.5px] group-hover:text-slate-700 dark:group-hover:text-slate-300'
            )}
          />
        </div>

        {/* Label - Apple HIG typography */}
        <div
          className={cn(
            'flex items-center overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
            isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-3'
          )}
        >
          <span
            className={cn(
              'text-[13px] relative z-10 transition-colors duration-200 tracking-[-0.01em]',
              isActive
                ? 'font-semibold text-slate-900 dark:text-white'
                : 'font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
            )}
          >
            {label}
          </span>
        </div>
      </Link>
    </li>
  );
}

// Section Header - Apple HIG style
interface SectionHeaderProps {
  label: string;
  isCollapsed: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  collapsible?: boolean;
}

function SectionHeader({ label, isCollapsed, isExpanded, onToggle, collapsible = false }: SectionHeaderProps) {
  if (isCollapsed) return null;
  
  return (
    <button
      onClick={collapsible ? onToggle : undefined}
      disabled={!collapsible}
      className={cn(
        'w-full flex items-center justify-between px-3 py-1.5 transition-all duration-200',
        collapsible && 'cursor-pointer hover:bg-white/20 dark:hover:bg-white/5 rounded-lg group',
        !collapsible && 'cursor-default'
      )}
    >
      <span className="sidebar-section-header">
        {label}
      </span>
      {collapsible && (
        <motion.div
          initial={false}
          animate={{ rotate: isExpanded ? 0 : -90 }}
          transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
        >
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400" />
        </motion.div>
      )}
    </button>
  );
}

// Navigation Section with disclosure
interface NavigationSectionProps {
  label?: string;
  items: SidebarItem[];
  isCollapsed: boolean;
  isActiveItem: (href: string) => boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

function NavigationSection({
  label,
  items,
  isCollapsed,
  isActiveItem,
  collapsible = false,
  defaultExpanded = true
}: NavigationSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Auto-expand if any item in section is active
  useEffect(() => {
    const hasActiveItem = items.some(item => isActiveItem(item.href));
    if (hasActiveItem && !isExpanded) {
      setIsExpanded(true);
    }
  }, [items, isActiveItem, isExpanded]);

  return (
    <div className="space-y-1">
      {label && (
        <SectionHeader
          label={label}
          isCollapsed={isCollapsed}
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
          collapsible={collapsible}
        />
      )}
      <AnimatePresence initial={false}>
        {(isExpanded || isCollapsed || !collapsible) && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="space-y-0.5 overflow-hidden"
          >
            {items.map(item => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={isActiveItem(item.href)}
                isCollapsed={isCollapsed}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// Default menu configuration
const defaultMainItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Visão Geral', icon: LayoutGrid, href: '/dashboard' },
  { id: 'anamnese', label: 'Nova Anamnese', icon: PlusCircle, href: '/queixa' },
  { id: 'chat-ebm', label: 'ChatWell', icon: ChatWellIcon, href: '/chat' },
];

const defaultRecordItems: SidebarItem[] = [
  { id: 'calculadoras', label: 'Calculadoras', icon: Calculator, href: '/calculadoras' },
  { id: 'historico', label: 'Histórico', icon: FolderClock, href: '/historico' },
];

const defaultSystemItems: SidebarItem[] = [
  { id: 'protocolos', label: 'Biblioteca', icon: Activity, href: '/protocolos' },
  { id: 'config', label: 'Ajustes', icon: Settings, href: '/configuracoes' },
];

// Sidebar Component - Apple HIG Compliant
interface SidebarProps {
  menuGroups?: SidebarGroups;
  userName?: string;
  userEmail?: string;
}

export function Sidebar({
  menuGroups = {
    main: defaultMainItems,
    records: defaultRecordItems,
    system: defaultSystemItems
  },
  userName = 'Médico',
  userEmail = ''
}: SidebarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { isCollapsed, toggle } = useSidebar();
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if current path is active
  const isActiveItem = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/';
    }
    return pathname?.startsWith(href) ?? false;
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Calculate width based on collapse state
  const sidebarWidth = isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH;

  return (
    <aside
      className={cn(
        // Apple HIG - Sidebar floats above content in Liquid Glass layer
        'fixed top-0 left-0 h-screen',
        // Apple HIG Liquid Glass - using utility class
        'sidebar-glass',
        // Structure
        'flex flex-col shrink-0',
        // Floating appearance with rounded corners and margin
        'rounded-r-3xl my-2 ml-2',
        // Smooth transitions following Apple HIG timing
        'transition-all duration-[500ms] ease-[cubic-bezier(0.32,0.72,0,1)]',
        // Layer above content
        'z-40'
      )}
      style={{ width: `${sidebarWidth}px` }}
    >
      {/* Toggle Button - Apple HIG style */}
      <button
        onClick={toggle}
        aria-label={isCollapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
        className={cn(
          "absolute -right-3 top-12 w-6 h-6",
          "bg-white dark:bg-[#2c2c2e] rounded-full",
          "border border-slate-200/50 dark:border-slate-600/50",
          "shadow-sm",
          "flex items-center justify-center",
          "text-slate-400 hover:text-healthcare-primary dark:hover:text-healthcare-primary-light",
          "transition-all duration-200 z-50 hidden lg:flex",
          "hover:scale-110 active:scale-95",
          // Apple HIG focus states
          "outline-none focus-visible:ring-2 focus-visible:ring-healthcare-primary/50",
          "focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-800"
        )}
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        >
          <PanelLeftClose className="w-3 h-3 stroke-[2px]" />
        </motion.div>
      </button>

      {/* Brand Section - Apple HIG style header */}
      <Link
        href="/dashboard"
        className={cn(
          'h-[72px] flex items-center transition-all duration-300 rounded-2xl mx-2 mt-2',
          // Apple HIG focus states
          'outline-none focus-visible:ring-2 focus-visible:ring-healthcare-primary/50',
          'focus-visible:ring-offset-1',
          isCollapsed ? 'justify-center' : 'justify-center lg:justify-start lg:pl-4'
        )}
      >
        <div className="flex items-center gap-3 select-none cursor-pointer group">
          {/* Logo Container - Apple HIG frosted glass style */}
          <motion.div
            className={cn(
              "relative flex items-center justify-center shrink-0 overflow-visible",
              "w-10 h-10 rounded-xl",
              "bg-gradient-to-br from-white/80 to-white/40",
              "dark:from-white/10 dark:to-white/5",
              "border border-white/50 dark:border-white/10",
              "shadow-sm"
            )}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
          >
            <svg viewBox="0 0 100 100" className="w-6 h-6 drop-shadow-sm overflow-visible">
              <defs>
                <linearGradient id="visionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>

              <motion.path
                d="M 15 38 C 26 88, 42 58, 50 48 C 58 58, 74 88, 85 38"
                fill="none"
                stroke="url(#visionGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 1.5,
                  ease: 'easeOut',
                  delay: 0.1
                }}
              />
            </svg>
          </motion.div>

          {/* Brand Text - Apple HIG typography */}
          <div className={cn(
            'flex flex-col justify-center overflow-hidden whitespace-nowrap',
            'transition-all duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)]',
            isCollapsed ? 'max-w-0 opacity-0' : 'max-w-[160px] opacity-100 hidden lg:flex'
          )}>
            <h1 className="text-[17px] font-semibold tracking-[-0.02em] flex items-baseline gap-0.5 leading-none">
              <span className="text-slate-800 dark:text-white">Well</span>
              <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent font-bold">
                Wave
              </span>
            </h1>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-[0.04em] uppercase mt-0.5">
              Professional
            </span>
          </div>
        </div>
      </Link>

      {/* Navigation Groups - Apple HIG hierarchy with disclosure */}
      <nav className={cn(
        "flex-1 overflow-y-auto py-2 custom-scrollbar relative z-10",
        "scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700",
        isCollapsed ? 'px-1' : 'px-2'
      )}>
        <div className="space-y-4">
          {/* Main Navigation */}
          <NavigationSection
            items={menuGroups.main}
            isCollapsed={isCollapsed}
            isActiveItem={isActiveItem}
          />

          {/* Separator - Apple HIG subtle divider */}
          <div className={cn(
            'h-px bg-slate-200/60 dark:bg-white/10',
            isCollapsed ? 'mx-3' : 'mx-3'
          )} />

          {/* Records Section - with disclosure */}
          <NavigationSection
            label="Registros"
            items={menuGroups.records}
            isCollapsed={isCollapsed}
            isActiveItem={isActiveItem}
            collapsible
            defaultExpanded
          />

          {/* Separator */}
          <div className={cn(
            'h-px bg-slate-200/60 dark:bg-white/10',
            isCollapsed ? 'mx-3' : 'mx-3'
          )} />

          {/* System Section - with disclosure */}
          <NavigationSection
            label="Sistema"
            items={menuGroups.system}
            isCollapsed={isCollapsed}
            isActiveItem={isActiveItem}
            collapsible
            defaultExpanded
          />
        </div>
      </nav>

      {/* Footer Area - Apple HIG style */}
      <div className={cn(
        'mt-auto px-2 pb-2 flex flex-col gap-2 transition-all duration-300',
        isCollapsed ? 'items-center px-1' : ''
      )}>
        {/* Theme Toggle - Apple HIG segmented control style */}
        {mounted && (
          <div className={cn(
            'flex items-center justify-between transition-all duration-300 p-2 rounded-xl',
            'bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10',
            isCollapsed ? 'w-auto justify-center bg-transparent border-transparent' : 'w-full'
          )}>
            {!isCollapsed && (
              <span className="text-[12px] font-medium text-slate-500 dark:text-slate-400 pl-1">
                Aparência
              </span>
            )}

            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
              className={cn(
                'group relative h-7 w-14 rounded-full',
                'transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
                'cursor-pointer',
                // Apple HIG focus states
                'outline-none focus-visible:ring-2 focus-visible:ring-healthcare-primary/50',
                'focus-visible:ring-offset-1',
                theme === 'dark'
                  ? 'bg-[#3a3a3c] border border-white/10'
                  : 'bg-slate-200 border border-black/5'
              )}
            >
              <motion.div
                className={cn(
                  'absolute top-[3px] left-[3px] h-[22px] w-[22px] rounded-full',
                  'flex items-center justify-center',
                  'shadow-sm border border-white/20',
                  theme === 'dark'
                    ? 'bg-[#636366] text-indigo-300'
                    : 'bg-white text-amber-500'
                )}
                animate={{ x: theme === 'dark' ? 24 : 0 }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              >
                {theme === 'dark' ? (
                  <Moon className="w-3 h-3" />
                ) : (
                  <Sun className="w-3 h-3" />
                )}
              </motion.div>
            </button>
          </div>
        )}

        {/* User Profile - Apple HIG list item style */}
        <div className={cn(
          'flex items-center rounded-xl transition-all duration-200 group w-full',
          'active:scale-[0.98]',
          isCollapsed
            ? 'justify-center p-1.5 hover:bg-white/40 dark:hover:bg-white/5'
            : 'p-2 bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 cursor-pointer'
        )}>
          <div className="relative shrink-0">
            <div className={cn(
              "flex items-center justify-center overflow-hidden",
              "bg-gradient-to-br from-blue-500 to-indigo-500",
              "ring-2 ring-white/50 dark:ring-slate-700/50 shadow-sm",
              isCollapsed ? "w-8 h-8 rounded-lg" : "w-9 h-9 rounded-xl"
            )}>
              <span className="text-white font-semibold text-[11px]">
                {userName.slice(0, 2).toUpperCase()}
              </span>
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full" />
          </div>

          <div className={cn(
            'overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)] whitespace-nowrap',
            isCollapsed ? 'max-w-0 opacity-0' : 'max-w-[120px] opacity-100 ml-2.5 hidden lg:block'
          )}>
            <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-100 leading-tight truncate">
              {userName}
            </p>
            <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate">
              {userEmail || 'WellWave Pro'}
            </p>
          </div>

          {!isCollapsed && (
            <motion.div
              className="ml-auto hidden lg:block"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <LogOut className="w-4 h-4 text-slate-400 hover:text-red-500 transition-colors" />
            </motion.div>
          )}
        </div>
      </div>
    </aside>
  );
}
