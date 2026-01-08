'use client'

import { motion } from 'framer-motion'

interface DashboardFooterProps {
  copyrightYear?: number
  appName?: string
}

export function DashboardFooter({ 
  copyrightYear = new Date().getFullYear(),
  appName = 'WellWave' 
}: DashboardFooterProps) {
  return (
    <footer 
      className={`
        relative z-10
        flex h-12 items-center justify-center border-t
        backdrop-blur-[60px] saturate-[180%]
        bg-white/60 dark:bg-slate-900/60
        border-white/40 dark:border-white/10
        transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
      `}
    >
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="text-xs text-slate-500 dark:text-slate-400"
      >
        &copy; {copyrightYear} {appName} - Documentação médica inteligente
      </motion.p>
    </footer>
  )
}
