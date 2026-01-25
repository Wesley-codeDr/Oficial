'use client'

import React, { useState, useEffect } from 'react'
import {
  FileText,
  MessageCircle,
  FileSignature,
  FolderClock,
  Settings,
  Activity,
  LayoutGrid,
  LogOut,
  Sun,
  Moon,
  Eye,
  Zap,
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { motion } from 'framer-motion'
import { LiquidGlassIcon } from '@/components/ui/LiquidGlassIcon'

// --- Types for Dynamic Navigation ---
export interface SidebarItem {
  id: string
  label: string
  icon: React.ElementType
}

export interface SidebarGroups {
  main: SidebarItem[]
  records: SidebarItem[]
  system: SidebarItem[]
}

// --- NavItem Component with Liquid Glass Icons ---
interface NavItemProps {
  id: string
  icon: React.ElementType
  label: string
  isActive: boolean
  isCollapsed: boolean
  onClick: () => void
}

const NavItem: React.FC<NavItemProps> = ({ id, icon: Icon, label, isActive, isCollapsed, onClick }) => {
  return (
    <li className="relative group/item flex justify-center w-full">
      <motion.button
        onClick={onClick}
        title={isCollapsed ? label : undefined}
        aria-label={label}
        aria-current={isActive ? 'page' : undefined}
        className={`
          relative flex items-center transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] outline-none
          ${isCollapsed ? 'justify-center w-[52px] h-[52px]' : 'w-full px-4 py-2.5'}
          rounded-lg
          ${isActive ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-600)]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-gray-50)] hover:text-[var(--color-text-primary)]'}
        `}
        whileHover={{ x: isCollapsed ? 0 : 4 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Icon Container */}
        <div className={`flex items-center justify-center shrink-0 ${isActive ? 'text-[var(--color-primary-500)]' : ''}`}>
          <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} stroke-[2px] transition-colors`} />
        </div>

        {/* Label */}
        {!isCollapsed && (
          <span className="ml-3 text-[14px] font-medium tracking-tight whitespace-nowrap overflow-hidden">
            {label}
          </span>
        )}
      </motion.button>
    </li>
  )
}

// --- Default Configuration ---
const defaultMainItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Visão Geral', icon: LayoutGrid },
  { id: 'anamnese', label: 'Well Anamnese', icon: FileText },
  { id: 'flash', label: 'Flash', icon: Zap },
  { id: 'chat-well', label: 'ChatWW', icon: MessageCircle },
]

const defaultRecordItems: SidebarItem[] = [
  { id: 'prescricao', label: 'Prescrição', icon: FileSignature },
  { id: 'historico', label: 'Histórico', icon: FolderClock },
]

const defaultSystemItems: SidebarItem[] = [
  { id: 'protocolos', label: 'Biblioteca', icon: Activity },
  { id: 'acessibilidade', label: 'Acessibilidade', icon: Eye },
  { id: 'config', label: 'Ajustes', icon: Settings },
]

// --- Sidebar Component ---
interface SidebarProps {
  currentView?: string
  onNavigate?: (viewId: string) => void
  // Allows injecting custom menu items with dynamic icons
  menuGroups?: SidebarGroups
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  menuGroups = {
    main: defaultMainItems,
    records: defaultRecordItems,
    system: defaultSystemItems,
  },
}) => {
  const { theme, toggleTheme } = useTheme()
  const [localActiveId, setLocalActiveId] = useState('dashboard')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  // Mark as mounted to avoid hydration mismatch
  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Responsive: Auto-collapse on small screens
  useEffect(() => {
    if (!hasMounted) return

    const runtime = globalThis as {
      innerWidth?: number
      addEventListener?: (type: string, listener: () => void) => void
      removeEventListener?: (type: string, listener: () => void) => void
    }

    const handleResize = () => {
      if ((runtime.innerWidth ?? 0) < 1024) {
        setIsCollapsed(true)
      } else {
        setIsCollapsed(false)
      }
    }

    // Initial Check
    handleResize()

    runtime.addEventListener?.('resize', handleResize)
    return () => runtime.removeEventListener?.('resize', handleResize)
  }, [hasMounted])

  // Sync with parent view if provided
  useEffect(() => {
    if (currentView) {
      if (currentView === 'selection' || currentView === 'protocol') setLocalActiveId('anamnese')
      else if (currentView === 'library') setLocalActiveId('protocolos')
      else setLocalActiveId(currentView)
    }
  }, [currentView])

  const handleNavigation = (id: string) => {
    setLocalActiveId(id)
    if (onNavigate) onNavigate(id)
  }

  // Prevent hydration mismatch by only animating after mount
  const asideAnimation = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] as const },
  }

  // Compute width class - use stable value until mounted to prevent hydration mismatch
  const widthClass = !hasMounted
    ? 'w-[88px] lg:w-[280px]' // Server-safe default
    : isCollapsed
      ? 'w-[88px]'
      : 'w-[88px] lg:w-[280px]'

  return (
    <aside
      suppressHydrationWarning={true}
      className={`${widthClass} h-screen
        bg-[var(--color-bg-primary)]
        dark:bg-[var(--color-bg-sidebar)]
        border-right border-[var(--color-gray-100)]
        flex flex-col shrink-0
        transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] z-40 relative`}
      style={{
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* NEW: Ambient light gradient for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 40%, rgba(0, 135, 255, 0.05) 100%)',
        }}
      />

      {/* NEW: Caustics effect on sidebar */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background: `
            radial-gradient(ellipse 30% 20% at 15% 85%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 25% 15% at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 20% 25% at 90% 25%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)
          `,
        }}
      />
      <motion.div
        className="w-full h-full flex flex-col"
        initial={hasMounted ? asideAnimation.initial : false}
        animate={hasMounted ? asideAnimation.animate : false}
        transition={asideAnimation.transition}
      >
        {/* Brand Section - Animated WellWave Style */}
        <div
          className={`h-32 flex items-center transition-all duration-700 cursor-pointer logo-container group/brand ${isCollapsed ? 'justify-center w-full' : 'justify-start pl-8'}`}
          onClick={() => {
            setIsCollapsed(!isCollapsed)
            handleNavigation('dashboard')
          }}
        >
          <div className={`flex items-center select-none group transition-all duration-500 ${isCollapsed ? 'gap-0' : 'gap-3'}`}>
            {/* LOGO CONTAINER GLASS */}
            <motion.div
              className="logo-glass-container w-12 h-12 shrink-0"
              animate={{ y: [0, -2, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{
                y: -2,
                scale: 1.05,
                transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
              whileTap={{ scale: 0.98, transition: { duration: 0.12 } }}
            >
              <img
                src="/logo-wellwave.png"
                alt="WellWave Logo"
                className="logo-icon object-contain relative z-10"
              />
            </motion.div>

            <div
              className={`
                flex flex-col justify-center h-[44px] overflow-hidden whitespace-nowrap 
                transition-all duration-[700ms] ease-[cubic-bezier(0.19,1,0.22,1)] 
                ${
                  isCollapsed
                    ? 'max-w-0 opacity-0 -translate-x-4'
                    : 'max-w-0 opacity-0 -translate-x-4 lg:max-w-[180px] lg:opacity-100 lg:translate-x-0'
                }
              `}
            >
              <h1 className="logo-title leading-none">
                <span className="logo-title__well logo-shine">Well</span>
                <span className="logo-title__wave logo-shine ml-0.5">Wave</span>
              </h1>
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold tracking-[0.2em] uppercase mt-1 ml-0.5 opacity-80">
                Professional
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Groups */}
        <nav
          className={`flex-1 overflow-y-auto space-y-10 py-6 custom-scrollbar relative z-10 transition-all duration-500 ${isCollapsed ? 'px-0' : 'px-4'}`}
          role="navigation"
          aria-label="Navegação principal"
        >
          {/* Main Group */}
          <ul className="space-y-1" role="list">
            {menuGroups.main.map((item) => (
              <NavItem
                key={item.id}
                id={item.id}
                icon={item.icon}
                label={item.label}
                isActive={localActiveId === item.id}
                isCollapsed={isCollapsed}
                onClick={() => handleNavigation(item.id)}
              />
            ))}
          </ul>

          <div
            className={`h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent ${isCollapsed ? 'mx-2' : 'mx-6'}`}
          ></div>

          <ul className="space-y-1" role="list" aria-label="Registros">
            {menuGroups.records.map((item) => (
              <NavItem
                key={item.id}
                id={item.id}
                icon={item.icon}
                label={item.label}
                isActive={localActiveId === item.id}
                isCollapsed={isCollapsed}
                onClick={() => handleNavigation(item.id)}
              />
            ))}
          </ul>

          <div
            className={`h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent ${isCollapsed ? 'mx-2' : 'mx-6'}`}
            role="separator"
          ></div>

          <ul className="space-y-1" role="list" aria-label="Sistema">
            {menuGroups.system.map((item) => (
              <NavItem
                key={item.id}
                id={item.id}
                icon={item.icon}
                label={item.label}
                isActive={localActiveId === item.id}
                isCollapsed={isCollapsed}
                onClick={() => handleNavigation(item.id)}
              />
            ))}
          </ul>
        </nav>

        {/* Footer Area with NEW APPLE SWITCH and Profile */}
        <div
          className={`mt-auto mb-6 flex flex-col gap-6 transition-all duration-500 ${isCollapsed ? 'items-center px-0' : 'px-4'}`}
        >
          {/* VisionOS 2025 Toggle Switch */}
          <div
            className={`
            flex items-center justify-between
            transition-all duration-500
            ${isCollapsed ? 'w-auto justify-center' : 'w-full p-1'}
        `}
          >
            {/* Label (Only when expanded) */}
            {!isCollapsed && (
              <div className="flex flex-col pl-2">
                <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200 tracking-tight">
                  Aparência
                </span>
              </div>
            )}

            {/* The Switch */}
            <button
              onClick={toggleTheme}
              className={`
                  group relative h-[36px] w-[64px] rounded-full
                  transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                  cursor-pointer outline-none
                  ${
                    theme === 'dark'
                      ? 'bg-[#2c2c2e]/80 border border-white/5 shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)]'
                      : 'bg-[#e5e5ea] border border-black/5 shadow-[inset_0_2px_6px_rgba(0,0,0,0.05)]'
                  }
               `}
              title={theme === 'dark' ? 'Mudar para Claro' : 'Mudar para Escuro'}
              aria-label={`Mudar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
              aria-pressed={theme === 'dark'}
              role="switch"
            >
              {/* The Thumb (Knob) */}
              {/* Size 22px is ~61% of Track Height (36px) - Perfect Apple Proportions */}
              <div
                className={`
                  absolute top-[7px] left-[7px]
                  h-[22px] w-[22px] rounded-full
                  flex items-center justify-center
                  shadow-[0_2px_8px_rgba(0,0,0,0.15),0_1px_2px_rgba(0,0,0,0.1)]
                  border border-white/20
                  backdrop-blur-md z-10
                  transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                  group-hover:scale-110
                  ${
                    theme === 'dark'
                      ? 'translate-x-[28px] bg-[#636366] text-indigo-300'
                      : 'translate-x-0 bg-white text-amber-500'
                  }
               `}
              >
                {theme === 'dark' ? (
                  <Moon className="w-[10px] h-[10px] fill-current" />
                ) : (
                  <Sun className="w-[10px] h-[10px] fill-current" />
                )}
              </div>

              {/* Track Glow/Highlight (Subtle) */}
              <div
                className={`
                  absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
                  ${theme === 'dark' ? 'bg-gradient-to-tr from-blue-500/10 to-purple-500/5' : 'bg-gradient-to-tr from-amber-500/10 to-orange-500/5'}
               `}
              />
            </button>
          </div>

          {/* User Profile */}
          <div
            className={`
          flex items-center rounded-[24px] transition-all duration-500 group w-full
          ${
            isCollapsed
              ? 'justify-center p-2 bg-transparent hover:bg-white/10 dark:hover:bg-white/5'
              : 'p-3 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/5 hover:bg-white/20 dark:hover:bg-white/10 shadow-sm cursor-pointer'
          }
        `}
          >
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-ww-neutral dark:bg-ww-primary overflow-hidden ring-1 ring-ww-primary/30 dark:ring-ww-primary/10 shadow-ww-md">
                <img
                  src="https://picsum.photos/200"
                  alt="User"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white/80 dark:border-slate-900 rounded-full"></div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] whitespace-nowrap ${isCollapsed ? 'max-w-0 opacity-0 -translate-x-4' : 'max-w-[140px] opacity-100 ml-3 hidden lg:block'}`}
            >
              <p className="text-[13px] font-bold text-slate-800 dark:text-slate-100 leading-tight">
                Dr. André
              </p>
              <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                CRM 12345/SP
              </p>
            </div>

            {!isCollapsed && (
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <LogOut className="w-4 h-4 text-slate-400 hover:text-red-500 transition-colors" />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </aside>
  )
}
