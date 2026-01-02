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

// --- NavItem Component ---
interface NavItemProps {
  icon: React.ElementType
  label: string
  isActive: boolean
  isCollapsed: boolean
  onClick: () => void
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isActive, isCollapsed, onClick }) => {
  return (
    <li className="relative group/item flex justify-center">
      <motion.button
        onClick={onClick}
        title={isCollapsed ? label : undefined}
        aria-label={label}
        aria-current={isActive ? 'page' : undefined}
        className={`
          relative flex items-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] outline-none
          ${isCollapsed ? 'justify-center w-[60px] h-[60px]' : 'w-full px-4 py-3'}
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Background Layer - Liquid Glass Hover/Active */}
        <motion.div
          className={`
            absolute inset-0 rounded-[20px] transition-all duration-500
            ${isActive 
              ? 'bg-white/15 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-sm' 
              : 'bg-transparent group-hover/item:bg-white/5 dark:group-hover/item:bg-white/5'}
          `}
        />

        {/* Icon Container */}
        <motion.div
          className={`relative z-10 flex items-center justify-center transition-all duration-500 ${isCollapsed ? 'w-full' : ''}`}
          animate={{ scale: isActive ? 1.1 : 1 }}
        >
          <div
            className={`
              flex items-center justify-center w-10 h-10 rounded-[14px] transition-all duration-500
              ${
                isActive
                  ? 'bg-primary/20 backdrop-blur-md shadow-lg shadow-primary/20 text-primary border border-primary/20'
                  : 'text-slate-500 dark:text-slate-400 group-hover/item:text-primary'
              }
           `}
          >
            <Icon
              className={`
                 w-5 h-5 transition-all duration-500 icon-volumetric
                 ${isActive ? 'stroke-[2.2px] fill-current/10 icon-glow-blue' : 'stroke-[1.8px]'}
               `}
            />
          </div>
        </motion.div>

        {/* Label */}
        <motion.div
          className="flex items-center overflow-hidden whitespace-nowrap"
          animate={{ width: isCollapsed ? 0 : 'auto', opacity: isCollapsed ? 0 : 1, marginLeft: isCollapsed ? 0 : 12 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        >
          <span
            className={`
              text-[14px] tracking-tight relative z-10 transition-colors duration-300
              ${
                isActive
                  ? 'font-semibold text-slate-900 dark:text-white'
                  : 'font-medium text-slate-500 dark:text-slate-400 group-hover/item:text-slate-900 dark:group-hover/item:text-slate-100'
              }
            `}
          >
            {label}
          </span>
        </motion.div>
      </motion.button>
    </li>
  )
}

// --- Default Configuration ---
const defaultMainItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Visão Geral', icon: LayoutGrid },
  { id: 'anamnese', label: 'Nova Anamnese', icon: FileText },
  { id: 'flash', label: 'Flash', icon: Zap },
  { id: 'chat-well', label: 'Chat Well', icon: MessageCircle },
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
  const asideProps = hasMounted
    ? {
        initial: { x: '-100%' },
        animate: { x: 0 },
        transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
      }
    : {}

  return (
    <motion.aside
      {...asideProps}
      className={`
        ${isCollapsed ? 'w-[88px]' : 'w-[88px] lg:w-[280px]'}
        h-[calc(100vh-1rem)] liquid-glass-material glass-texture
        flex flex-col shrink-0
        my-2 ml-2 rounded-[32px]
        transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-40 relative
        hover:shadow-2xl hover:shadow-blue-500/5
      `}
    >

      {/* Brand Section - Apple 2025 Style */}
      <div
        className={`h-32 flex items-center transition-all duration-700 cursor-pointer group/brand ${isCollapsed ? 'justify-center w-full' : 'justify-start pl-8'}`}
        onClick={() => {
          setIsCollapsed(!isCollapsed)
          handleNavigation('dashboard')
        }}
      >
        {/* Adjusted GAP to 4 (16px) for better spacing */}
        <div className={`flex items-center select-none group transition-all duration-500 ${isCollapsed ? 'gap-0' : 'gap-4'}`}>
          {/* LOGO CONTAINER GLASS */}
          <motion.div
            className={`
              relative flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 rounded-[20px] shadow-sm dark:bg-white/5 dark:border-white/10 shrink-0 overflow-hidden group-hover/brand:bg-white/30 dark:group-hover/brand:bg-white/10 transition-all duration-500
              ${isCollapsed ? 'w-[60px] h-[60px]' : 'w-14 h-14'}
            `}
            animate={{ y: [0, -2, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <img 
              src="/logo-wellwave.png" 
              alt="WellWave Logo"
              className="w-10 h-10 object-contain relative z-10"
            />
          </motion.div>

          <div
            className={`
             flex flex-col justify-center h-[44px] overflow-hidden whitespace-nowrap 
             transition-all duration-[700ms] ease-[cubic-bezier(0.19,1,0.22,1)] 
             ${isCollapsed ? 'max-w-0 opacity-0 -translate-x-4' : 'max-w-[180px] opacity-100 translate-x-0 hidden lg:flex'}
          `}
          >
            <h1 className="text-[20px] font-bold tracking-tight flex items-baseline gap-0.5 leading-none">
              <span className="text-[#1d1d1f] dark:text-[#f5f5f7] transition-colors duration-300">
                Well
              </span>
              <motion.span
                className="bg-gradient-to-r from-sky-500 via-indigo-500 via-sky-400 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent font-bold tracking-tight"
                animate={{
                  opacity: [1, 0.85, 1],
                  backgroundPosition: ['0% 50%', '200% 50%'],
                }}
                transition={{
                  opacity: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                  backgroundPosition: { duration: 8, repeat: Infinity, ease: 'linear' },
                }}
              >
                Wave
              </motion.span>
            </h1>
            {/* Adjusted Tracking and Opacity for Hierarchy */}
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
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden ring-1 ring-white/30 dark:ring-white/10 shadow-md">
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
    </motion.aside>
  )
}
