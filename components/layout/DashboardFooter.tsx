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
        glass-ww-elevated
        bg-ww-neutral/60 dark:bg-ww-primary/60
        border-ww-primary/40 dark:border-ww-primary/10
        transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
      `}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="text-xs text-ww-secondary dark:text-ww-secondary-dark"
      >
        &copy; {copyrightYear} {appName} - Documentação médica inteligente
      </motion.p>
    </footer>
  )
}
