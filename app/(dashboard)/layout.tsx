'use client'

import { redirect } from 'next/navigation'
import { motion } from 'framer-motion'
import { getUser } from '@/lib/supabase/server'
import { DashboardHeader } from '@/components/layout/DashboardHeader'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario'

  return (
    <div className="flex min-h-screen flex-col">
      {/* Glass Header */}
      <DashboardHeader userName={userName} />

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-7xl mx-auto"
        >
          {children}
        </motion.div>
      </main>

      {/* Glass Footer */}
      <footer className={`
        relative z-10
        flex h-12 items-center justify-center border-t
        backdrop-blur-[60px] saturate-[180%]
        bg-white/60 dark:bg-slate-900/60
        border-white/40 dark:border-white/10
        transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
      `}>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          &copy; {new Date().getFullYear()} WellWave - Documentação médica inteligente
        </p>
      </footer>
    </div>
  )
}
