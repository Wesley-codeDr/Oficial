'use client'

import { useState } from 'react'
import { Activity, User, Settings, LogOut, Bell, Menu, X, Layout } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { logout } from '@/lib/auth/actions'
import { Button } from '@/components/ui/button'
import { useScrollGlass, getDarkModeGlassStyles } from '@/hooks/use-scroll-glass'

interface DashboardHeaderProps {
  userName?: string
  userAvatar?: string
  notifications?: number
}

export function DashboardHeader({ userName, userAvatar, notifications = 0 }: DashboardHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Scroll-responsive glass effect
  const { isScrolled, blur, opacity, styles } = useScrollGlass({
    threshold: 10,
    maxBlur: 80,
    minBlur: 40,
    maxOpacity: 0.35,
    minOpacity: 0.2,
  })

  const navItems = [
    { icon: Activity, label: 'Nova Anamnese', href: '/dashboard' },
    { icon: Layout, label: 'Kanban', href: '/kanban' },
    { icon: Bell, label: 'EBM Chat', href: '/chat' },
  ]

  return (
    <>
      {/* Header - iOS 26 Liquid Glass Navbar - ENHANCED */}
      <header className="sticky top-0 z-50 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="relative h-16 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden"
          style={{
            backdropFilter: `blur(${blur}px) saturate(220%)`,
            WebkitBackdropFilter: `blur(${blur}px) saturate(220%)`,
            backgroundColor: `rgba(255, 255, 255, ${opacity})`,
            borderBottom: `1px solid rgba(255, 255, 255, ${isScrolled ? 0.5 : 0.3})`,
            boxShadow: isScrolled
              ? '0 8px 32px rgba(0, 78, 146, 0.12), 0 4px 16px rgba(0, 135, 255, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.6) inset, 0 1.5px 0 rgba(255, 255, 255, 0.9) inset'
              : '0 4px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
          }}
        >
          {/* Enhanced Specular highlight - animated top edge glow */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
            animate={{
              backgroundPosition: ['0% 50%', '200% 50%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 15%, rgba(255,255,255,0.9) 35%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.9) 65%, rgba(255,255,255,0.3) 85%, transparent 100%)',
              backgroundSize: '200% 100%',
              opacity: isScrolled ? 1 : 0.7,
              filter: 'blur(0.5px)',
            }}
          />
          {/* NEW: Caustics effect - subtle light refraction */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: `
                radial-gradient(ellipse 25% 15% at 15% 85%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse 20% 12% at 75% 75%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
                radial-gradient(ellipse 15% 18% at 90% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
              `,
            }}
          />
          {/* NEW: Inner glow for depth */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              opacity: isScrolled ? 1 : 0.5,
              background: 'radial-gradient(ellipse 100% 50% at 50% 0%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)',
            }}
          />

          <div className="flex h-full items-center justify-between px-4 lg:px-6">
            {/* Left - Logo & Nav */}
            <div className="flex items-center gap-6">
              {/* Mobile menu button - Apple Liquid Glass 2026 */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="lg:hidden flex h-10 w-10 items-center justify-center rounded-[14px]
                  backdrop-blur-[var(--lg-regular-blur)] saturate-[var(--lg-regular-saturate)]
                  bg-white/40 dark:bg-white/10
                  hover:bg-white/60 dark:hover:bg-white/15
                  border border-white/35 dark:border-white/12
                  shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.6)]
                  transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
                aria-label="Toggle menu"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </motion.button>

              {/* Logo - Apple Liquid Glass 2026 with glow */}
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 transition-all duration-300 hover:opacity-90 group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex h-9 w-9 items-center justify-center rounded-[14px]
                    bg-gradient-to-br from-blue-500 to-purple-600
                    shadow-[0_4px_16px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.3)]
                    group-hover:shadow-[0_8px_24px_rgba(59,130,246,0.5),inset_0_1px_0_rgba(255,255,255,0.4)]"
                >
                  <Activity className="h-5 w-5 text-white drop-shadow-sm" />
                </motion.div>
                <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                  WellWave
                </span>
              </Link>

              {/* Desktop Nav - Glass pills */}
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
                          backdrop-blur-[var(--lg-regular-blur)] saturate-[var(--lg-regular-saturate)]
                          bg-white/30 dark:bg-white/5
                          hover:bg-white/60 dark:hover:bg-white/15
                          border border-transparent hover:border-white/35 dark:hover:border-white/12
                          shadow-[0_2px_8px_rgba(0,0,0,0.02)]
                          hover:shadow-[0_8px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)]
                          text-slate-600 dark:text-slate-300
                          hover:text-slate-900 dark:hover:text-slate-100
                        `}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-2">
              {/* Notifications - Apple Liquid Glass 2026 button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className="relative flex h-10 w-10 items-center justify-center rounded-[14px]
                  backdrop-blur-[var(--lg-regular-blur)] saturate-[var(--lg-regular-saturate)]
                  bg-white/40 dark:bg-white/10
                  hover:bg-white/60 dark:hover:bg-white/15
                  border border-white/35 dark:border-white/12
                  shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.6)]
                  transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
              >
                <Bell className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                {notifications > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full
                      bg-gradient-to-br from-red-500 to-rose-600
                      text-xs font-bold text-white
                      shadow-[0_2px_8px_rgba(239,68,68,0.5)]
                      border border-white/30"
                  >
                    {notifications}
                  </motion.span>
                )}
              </motion.button>

              {/* User Menu - Enhanced glass card */}
              <div className="flex items-center gap-3 pl-2">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {userName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Medico</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative group cursor-pointer"
                >
                  <div className="h-11 w-11 rounded-full p-[2px]
                    bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500
                    shadow-[0_4px_16px_rgba(139,92,246,0.3)]
                    group-hover:shadow-[0_8px_24px_rgba(139,92,246,0.5)]
                    transition-shadow duration-300"
                  >
                    <div className="h-full w-full rounded-full bg-white dark:bg-slate-800 overflow-hidden
                      border-2 border-white/50 dark:border-slate-700/50 rim-light-ios26">
                      {userAvatar ? (
                        <img src={userAvatar} alt="Avatar" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                          <User className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Online indicator */}
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full
                    bg-green-500 border-2 border-white dark:border-slate-800
                    shadow-[0_2px_8px_rgba(34,197,94,0.5)]"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Menu Overlay - Liquid Glass Sidebar */}
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
              />

              {/* Sidebar panel - Liquid Glass */}
              <motion.div
                initial={{ opacity: 0, x: -280 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -280 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed left-0 top-0 z-50 h-full w-72 lg:hidden overflow-hidden"
              >
                {/* Glass panel */}
                <div
                  className="h-full w-full"
                  style={{
                    backdropFilter: 'blur(80px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(80px) saturate(200%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.45)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '8px 0 32px rgba(0, 0, 0, 0.1), inset -1px 0 0 rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {/* Header */}
                  <div className="flex h-16 items-center justify-between px-4 border-b border-white/20 dark:border-white/10">
                    <span className="text-lg font-semibold text-slate-900 dark:text-white">Menu</span>
                    <motion.button
                      onClick={() => setIsMobileMenuOpen(false)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl
                        bg-white/40 dark:bg-white/10
                        hover:bg-white/60 dark:hover:bg-white/15
                        border border-white/30
                        transition-all duration-300"
                    >
                      <X className="h-5 w-5" />
                    </motion.button>
                  </div>

                  {/* Navigation links */}
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
                              bg-white/30 dark:bg-white/5
                              hover:bg-white/60 dark:hover:bg-white/15
                              border border-transparent hover:border-white/40
                              shadow-[0_2px_8px_rgba(0,0,0,0.02)]
                              hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]
                              text-slate-700 dark:text-slate-200
                              hover:text-slate-900 dark:hover:text-white
                            `}
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl
                              bg-gradient-to-br from-blue-500/20 to-purple-500/20
                              border border-white/30">
                              <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span>{item.label}</span>
                          </Link>
                        </motion.div>
                      )
                    })}
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Dark mode styles (applied via CSS) */}
      <style jsx global>{`
        .dark header > div:first-child {
          background-color: rgba(15, 23, 42, ${opacity}) !important;
          border-bottom-color: rgba(255, 255, 255, ${isScrolled ? 0.12 : 0.08}) !important;
          box-shadow: ${isScrolled
            ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 1px 0 rgba(255, 255, 255, 0.15) inset'
            : '0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'} !important;
        }
        .dark .fixed.left-0.top-0.z-50 > div {
          background-color: rgba(15, 23, 42, 0.75) !important;
          border-right-color: rgba(255, 255, 255, 0.1) !important;
        }

        /* Reduce transparency accessibility fallback */
        @media (prefers-reduced-transparency: reduce) {
          header > div:first-child {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            background-color: rgba(255, 255, 255, 0.95) !important;
          }
          .dark header > div:first-child {
            background-color: rgba(15, 23, 42, 0.95) !important;
          }
        }
      `}</style>
    </>
  )
}
