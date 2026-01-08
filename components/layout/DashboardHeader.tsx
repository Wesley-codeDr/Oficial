'use client'

import { Activity, User, Settings, LogOut, Bell, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { logout } from '@/lib/auth/actions'
import { Button } from '@/components/ui/button'

interface DashboardHeaderProps {
  userName?: string
  userAvatar?: string
  notifications?: number
}

export function DashboardHeader({ userName, userAvatar, notifications = 0 }: DashboardHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { icon: Activity, label: 'Nova Anamnese', href: '/dashboard' },
    { icon: Bell, label: 'EBM Chat', href: '/chat' },
  ]

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full">
        {/* Glass backdrop */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            relative h-16
            backdrop-blur-[60px] saturate-[180%]
            bg-white/70 dark:bg-slate-900/70
            border-b border-white/40 dark:border-white/10
            transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
          `}
        >
          <div className="flex h-full items-center justify-between px-4 lg:px-6">
            {/* Left - Logo & Nav */}
            <div className="flex items-center gap-6">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/15 transition-all"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              {/* Logo */}
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 transition-all duration-300 hover:opacity-80 hover:scale-[1.02]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
                  <Activity className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                  WellWave
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-xl
                        text-sm font-medium
                        transition-all duration-300
                        hover:bg-white/70 dark:hover:bg-white/15
                        hover:shadow-md
                        text-slate-600 dark:text-slate-300
                        hover:text-slate-900 dark:hover:text-slate-100
                      `}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <button
                className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/15 transition-all hover:scale-105"
              >
                <Bell className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-md">
                    {notifications}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="flex items-center gap-3 pl-2">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {userName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Médico</p>
                </div>
                <div className="relative group">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-[2px]">
                    <div className="h-full w-full rounded-full bg-white dark:bg-slate-800 overflow-hidden">
                      {userAvatar ? (
                        <img src={userAvatar} alt="Avatar" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <User className="h-5 w-5 text-slate-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              />
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed left-0 top-0 z-50 h-full w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-white/40 dark:border-white/10 lg:hidden"
              >
                <div className="flex h-16 items-center justify-between px-4 border-b border-white/20 dark:border-white/10">
                  <span className="text-lg font-semibold">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white/70 dark:hover:bg-white/15 transition-all"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="flex flex-col p-4 space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`
                          flex items-center gap-3 px-4 py-3 rounded-xl
                          text-sm font-medium
                          transition-all duration-300
                          hover:bg-white/70 dark:hover:bg-white/15
                          text-slate-600 dark:text-slate-300
                          hover:text-slate-900 dark:hover:text-slate-100
                        `}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
