'use client'

import { useState } from 'react'
import { Activity, User, Bell, Menu, X, Layout } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useScrollGlass } from '@/hooks/use-scroll-glass'

interface DashboardHeaderProps {
  userName?: string
  userAvatar?: string
  notifications?: number
}

export function DashboardHeader({ userName, userAvatar, notifications = 0 }: DashboardHeaderProps) {
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Scroll-aware glass values (fallback to Apple defaults if hook is unavailable)
  const glass = typeof useScrollGlass === 'function' ? useScrollGlass() : undefined
  const isScrolled = glass?.isScrolled ?? false
  const blur = glass?.blur ?? 40
  const opacity = glass?.opacity ?? 0.25

  const navItems = [
    { icon: Activity, label: 'Nova Anamnese', href: '/dashboard' },
    { icon: Layout, label: 'Kanban', href: '/kanban' },
    { icon: Bell, label: 'EBM Chat', href: '/chat' },
  ]

  return (
    <>
      {/* Header - Apple Liquid Glass 2026 Navbar */}
      <header className="sticky top-0 z-50 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="relative h-16 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden liquid-glass-regular rim-light-ios26 liquid-glass-specular noise-grain border-b border-white/50 dark:border-white/12"
        >
          {/* Subtle inner glow overlay */}
          <div className="absolute inset-0 pointer-events-none inner-glow-ios26 transition-opacity duration-500" style={{ opacity: isScrolled ? 1 : 0.6 }} />

          <div className="flex h-full items-center justify-between px-4 lg:px-6">
            {/* Left - Logo & Nav */}
            <div className="flex items-center gap-6">
              {/* Mobile menu button - Apple Glass */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="lg:hidden flex h-10 w-10 items-center justify-center rounded-[14px] liquid-glass-regular rim-light-ios26"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </motion.button>

              {/* Logo - Apple system blue */}
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 transition-all duration-300 hover:opacity-90 group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex h-9 w-9 items-center justify-center rounded-[14px] liquid-glass-regular rim-light-ios26"
                >
                  <Activity className="h-5 w-5 text-[#007AFF] drop-shadow-sm" />
                  <span className="text-lg font-semibold text-slate-900 dark:text-white hidden sm:block">Dashboard</span>
                </motion.div>
              </Link>

              {/* Desktop Nav - Apple Glass Pills */}
              <nav className="hidden lg:flex items-center gap-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <motion.div key={item.href} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href={item.href}
                        className={`
                          flex items-center gap-2 px-4 py-2.5 rounded-[20px]
                          text-sm font-medium
                          transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                          liquid-glass-regular rim-light-ios26 inner-glow-ios26
                          text-slate-700 dark:text-white
                          hover:text-[#007AFF]
                          border-white/50 dark:border-white/12
                        `}
                      >
                        <Icon className="h-4 w-4 text-[#0A84FF]" />
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-2">
              {/* Notifications - Apple Glass Button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className="relative flex h-10 w-10 items-center justify-center rounded-[14px] liquid-glass-regular rim-light-ios26 inner-glow-ios26"
              >
                <Bell className="h-5 w-5 text-[#007AFF]" />
                {notifications > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#34C759] text-white"
                  >
                    {notifications}
                  </motion.span>
                )}
              </motion.button>

              {/* User Menu - Apple Glass Card */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer"
              >
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {userName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">Médico</p>
                </div>
                <motion.div
                  className="h-11 w-11 rounded-full p-[2px] liquid-glass-elevated rim-light-ios26 transition-shadow duration-300"
                >
                  <div className="h-full w-full rounded-full bg-white dark:bg-slate-800 overflow-hidden">
                    {userAvatar ? (
                      <img src={userAvatar} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <User className="h-5 w-5 text-[#007AFF]" />
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
              {/* Online Indicator - Apple */}
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#34C759]" />
            </div>
          </div>

          {/* Mobile Menu Overlay - Apple Glass Sidebar */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                {/* Backdrop with blur */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
                >
                  {/* Sidebar Panel */}
                  <motion.div
                    initial={{ opacity: 0, x: -280 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -280 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed left-0 top-0 z-50 h-full w-72 lg:hidden overflow-hidden"
                  >
                    {/* Glass Panel */}
                    <div
                      className="h-full w-full"
                      style={{
                        backdropFilter: 'blur(40px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                        backgroundColor: 'rgba(255,255,255, 0.35)',
                        borderRight: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '8px 0 32px rgba(0, 0, 0, 0.1), inset -1px 0 rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      {/* Header */}
                      <div className="flex h-16 items-center justify-between px-4 border-b border-white/50 dark:border-white/12">
                        <span className="text-lg font-semibold text-slate-900 dark:text-white">Menu</span>
                        <motion.button
                          onClick={() => setIsMobileMenuOpen(false)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex h-10 w-10 items-center justify-center rounded-xl liquid-glass-regular rim-light-ios26 transition-all duration-300"
                        >
                          <X className="h-5 w-5 text-[#007AFF]" />
                        </motion.button>
                      </div>

                      {/* Navigation Links - Apple Styled */}
                      <nav className="flex flex-col p-4 space-y-2">
                        {navItems.map((item, index) => {
                          const Icon = item.icon
                          return (
                            <motion.div
                              key={item.href}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                            >
                              <Link
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`
                                  flex items-center gap-3 px-4 py-3.5 rounded-2xl
                                  text-base font-medium
                                  transition-all duration-300
                                  liquid-glass-regular rim-light-ios26 inner-glow-ios26
                                  text-slate-700 dark:text-white
                                  hover:text-[#007AFF]
                                  border-white/50 dark:border-white/12
                                `}
                              >
                                <Icon className="h-5 w-5 text-[#0A84FF]" />
                                <span className="text-slate-900 dark:text-white">{item.label}</span>
                              </Link>
                            </motion.div>
                          )
                        })}
                      </nav>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </header>
    </>
  )
}
