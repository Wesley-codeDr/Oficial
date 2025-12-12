'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  PlusCircle, FolderClock, Settings,
  Activity, PanelLeftClose, PanelLeftOpen, LayoutGrid,
  LogOut, Sun, Moon, Calculator
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
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

interface SidebarGroups {
  main: SidebarItem[];
  records: SidebarItem[];
  system: SidebarItem[];
}

// NavItem Component
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
          'relative flex items-center w-full my-1 transition-all duration-300 ease-out group outline-none',
          isCollapsed ? 'justify-center px-0 py-3' : 'px-4 py-3'
        )}
      >
        {/* Active Pill Background */}
        {isActive && (
          <div className={cn(
            'absolute inset-0 bg-white dark:bg-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-white/5 rounded-[18px] transition-all duration-300',
            isCollapsed ? 'mx-2' : 'mx-0'
          )} />
        )}

        {/* Hover Effect Background */}
        {!isActive && (
          <div className={cn(
            'absolute inset-0 bg-white/0 group-hover:bg-white/40 dark:group-hover:bg-white/5 rounded-[18px] transition-all duration-300',
            isCollapsed ? 'mx-2' : 'mx-0'
          )} />
        )}

        {/* Icon */}
        <div className={cn(
          'relative z-10 flex items-center justify-center transition-transform duration-300',
          isActive ? 'scale-105' : 'group-hover:scale-105 group-active:scale-95'
        )}>
          <Icon
            className={cn(
              'w-[22px] h-[22px] transition-all duration-300',
              isActive
                ? 'text-blue-600 dark:text-blue-400 stroke-[2.5px]'
                : 'text-slate-500 dark:text-slate-400 stroke-[1.5px] group-hover:text-slate-700 dark:group-hover:text-slate-200'
            )}
          />
        </div>

        {/* Label */}
        <div
          className={cn(
            'flex items-center overflow-hidden whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
            isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-3.5'
          )}
        >
          <span
            className={cn(
              'text-[14px] tracking-tight relative z-10 transition-colors duration-300',
              isActive
                ? 'font-bold text-slate-800 dark:text-white'
                : 'font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'
            )}
          >
            {label}
          </span>
        </div>
      </Link>
    </li>
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

// Sidebar Component
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

  // Calcular largura baseada no estado de collapse
  const sidebarWidth = isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH;

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen bg-white/40 dark:bg-[#1c1c1e]/60 backdrop-blur-3xl backdrop-saturate-[180%]',
        'flex flex-col shrink-0 border-r border-white/20 dark:border-white/10',
        'shadow-[inset_-1px_0_0_rgba(255,255,255,0.1)]',
        'rounded-r-[40px] my-2 ml-2',
        'transition-all duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] z-40'
      )}
      style={{
        width: `${sidebarWidth}px`,
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={toggle}
        className="absolute -right-3 top-12 w-7 h-7 bg-white dark:bg-slate-700 rounded-full border border-slate-100 dark:border-slate-600 shadow-md flex items-center justify-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all z-50 hidden lg:flex hover:scale-110 active:scale-95 group"
      >
        <div className="transition-transform duration-500 group-hover:rotate-180">
          {isCollapsed ? (
            <PanelLeftOpen className="w-3.5 h-3.5 stroke-[2px]" />
          ) : (
            <PanelLeftClose className="w-3.5 h-3.5 stroke-[2px]" />
          )}
        </div>
      </button>

      {/* Brand Section */}
      <Link
        href="/dashboard"
        className={cn(
          'h-32 flex items-center transition-all duration-700',
          isCollapsed ? 'justify-center' : 'justify-center lg:justify-start lg:pl-8'
        )}
      >
        <div className="flex items-center gap-4 select-none cursor-pointer group">
          {/* Logo Container */}
          <motion.div
            className="relative flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-sm p-3 dark:bg-white/5 dark:border-white/10 shrink-0 overflow-visible"
            animate={{ x: [0, 4, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeOut'
            }}
          >
            <svg viewBox="0 0 100 100" className="w-[26px] h-[26px] drop-shadow-md overflow-visible">
              <defs>
                <linearGradient id="visionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="50%" stopColor="white" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
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
                  duration: 2,
                  ease: 'easeOut',
                  delay: 0.1
                }}
              />
            </svg>
          </motion.div>

          <div className={cn(
            'flex flex-col justify-center h-[44px] overflow-hidden whitespace-nowrap',
            'transition-all duration-[700ms] ease-[cubic-bezier(0.19,1,0.22,1)]',
            isCollapsed ? 'max-w-0 opacity-0 -translate-x-4' : 'max-w-[180px] opacity-100 translate-x-0 hidden lg:flex'
          )}>
            <h1 className="text-[20px] font-bold tracking-tight flex items-baseline gap-0.5 leading-none">
              <span className="text-[#1d1d1f] dark:text-[#f5f5f7] transition-colors duration-300">Well</span>
              <span className="wordmark-wave-gradient animate-gradient font-bold tracking-tight">
                Wave
              </span>
            </h1>
            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold tracking-[0.2em] uppercase mt-1 ml-0.5 opacity-80">
              Professional
            </span>
          </div>
        </div>
      </Link>

      {/* Navigation Groups */}
      <nav className="flex-1 px-4 overflow-y-auto space-y-6 py-2 custom-scrollbar relative z-10">
        {/* Main Group */}
        <ul className="space-y-1">
          {menuGroups.main.map(item => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={isActiveItem(item.href)}
              isCollapsed={isCollapsed}
            />
          ))}
        </ul>

        <div className={cn(
          'h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent',
          isCollapsed ? 'mx-2' : 'mx-6'
        )} />

        <ul className="space-y-1">
          {menuGroups.records.map(item => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={isActiveItem(item.href)}
              isCollapsed={isCollapsed}
            />
          ))}
        </ul>

        <div className={cn(
          'h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent',
          isCollapsed ? 'mx-2' : 'mx-6'
        )} />

        <ul className="space-y-1">
          {menuGroups.system.map(item => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={isActiveItem(item.href)}
              isCollapsed={isCollapsed}
            />
          ))}
        </ul>
      </nav>

      {/* Footer Area */}
      <div className={cn(
        'mt-auto mb-4 px-4 flex flex-col gap-4 transition-all duration-300',
        isCollapsed ? 'items-center px-2' : ''
      )}>
        {/* Theme Toggle */}
        {mounted && (
          <div className={cn(
            'flex items-center justify-between transition-all duration-500',
            isCollapsed ? 'w-auto justify-center' : 'w-full p-1'
          )}>
            {!isCollapsed && (
              <div className="flex flex-col pl-2">
                <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200 tracking-tight">
                  Aparência
                </span>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className={cn(
                'group relative h-[36px] w-[64px] rounded-full',
                'transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
                'cursor-pointer outline-none',
                theme === 'dark'
                  ? 'bg-[#2c2c2e]/80 border border-white/5 shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)]'
                  : 'bg-[#e5e5ea] border border-black/5 shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)]'
              )}
              title={theme === 'dark' ? 'Mudar para Claro' : 'Mudar para Escuro'}
            >
              <div className={cn(
                'absolute top-[7px] left-[7px] h-[22px] w-[22px] rounded-full',
                'flex items-center justify-center',
                'shadow-[0_2px_8px_rgba(0,0,0,0.15),0_1px_2px_rgba(0,0,0,0.1)]',
                'border border-white/20 backdrop-blur-md z-10',
                'transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
                'group-hover:scale-110',
                theme === 'dark'
                  ? 'translate-x-[28px] bg-[#636366] text-indigo-300'
                  : 'translate-x-0 bg-white text-amber-500'
              )}>
                {theme === 'dark' ? (
                  <Moon className="w-[10px] h-[10px] fill-current" />
                ) : (
                  <Sun className="w-[10px] h-[10px] fill-current" />
                )}
              </div>
            </button>
          </div>
        )}

        {/* User Profile Placeholder */}
        <div className={cn(
          'flex items-center rounded-[24px] transition-all duration-300 group w-full',
          isCollapsed
            ? 'justify-center p-2 bg-transparent hover:bg-white/50 dark:hover:bg-white/5'
            : 'p-3 bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/5 hover:bg-white/80 dark:hover:bg-white/10 shadow-sm cursor-pointer'
        )}>
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 overflow-hidden ring-2 ring-white dark:ring-slate-800 shadow-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">{userName.slice(0, 2).toUpperCase()}</span>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full" />
          </div>

          <div className={cn(
            'overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] whitespace-nowrap',
            isCollapsed ? 'max-w-0 opacity-0 -translate-x-4' : 'max-w-[140px] opacity-100 ml-3 hidden lg:block'
          )}>
            <p className="text-[13px] font-bold text-slate-800 dark:text-slate-100 leading-tight truncate">{userName}</p>
            <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5 truncate">{userEmail || 'WellWave Pro'}</p>
          </div>

          {!isCollapsed && (
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden lg:block">
              <LogOut className="w-4 h-4 text-slate-400 hover:text-red-500 transition-colors" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
