'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { WelcomeHeader } from './WelcomeHeader'
import { ShiftTodoList } from './ShiftTodoList'
import { StickyNotes } from './StickyNotes'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import * as Tokens from '@/lib/theme/tokens'
import {
  useGlassBlur,
  useGlassOpacity,
  useGlassBorder,
  useGlassRadius,
  useGlassNoise,
  useGlassSpecular,
  useGlassRimLight,
  useGlassInnerGlow,
  useGlassHoverScale,
  useGlassTapScale,
} from '@/lib/theme/hooks'

type Density = 'compact' | 'comfortable' | 'spacious'

interface WelcomePanelProps {
  density?: Density
  doctorName: string
  patientsAttended?: number
  className?: string
}


export function WelcomePanel({
  density = 'comfortable',
  doctorName,
  patientsAttended = 0,
  className,
}: WelcomePanelProps) {
  const { theme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  
  const glassBlur = useGlassBlur()
  const glassOpacity = useGlassOpacity('default', isDark)
  const glassBorder = useGlassBorder('default', isDark)
  const glassRadius = useGlassRadius('default')
  const glassNoise = useGlassNoise()
  const glassSpecular = useGlassSpecular()
  const glassRimLight = useGlassRimLight()
  const glassInnerGlow = useGlassInnerGlow()
  const glassHoverScale = useGlassHoverScale()
  const glassTapScale = useGlassTapScale()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'relative mx-4 transition-all duration-300',
        className
      )}
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
        border: '1px solid #E5E7EB',
        borderRadius: '16px',
        padding: '24px 32px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Dark mode override */}
      <div className={cn(
        'hidden dark:block absolute inset-0 -z-10 rounded-[16px] bg-[#212529]',
        glassBlur,
        'border-white/5'
      )} />

      {/* Welcome Header */}
      <WelcomeHeader
        doctorName={doctorName}
        patientsAttended={patientsAttended}
      />

      {/* Two Column Layout - Apple grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-8 mt-10">
        {/* Todo List - Primary */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Section Title - Apple style */}
          <div className={cn(
            'mb-6',
            glassBlur,
            glassOpacity,
            glassBorder,
            glassRadius,
            glassNoise,
            glassSpecular,
            glassRimLight,
            glassInnerGlow,
            'bg-white/60 dark:bg-white/10'
          )}>
            <h2 className="text-[13px] font-semibold text-[#86868b] dark:text-[#a1a1a6] uppercase tracking-wide">
              Tarefas do Plantão
            </h2>
          </div>
          <ShiftTodoList />
        </motion.div>

        {/* Sticky Notes - Secondary */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="p-6 rounded-[16px]"
          style={{
            background: 'var(--medical-neutral-50)',
            border: '1px solid #E5E7EB',
          }}
        >
          <div className="dark:hidden" />
          <div className="hidden dark:block absolute inset-0 rounded-[16px]" style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }} />
          <StickyNotes />
        </motion.div>
      </div>
    </motion.div>
  )
}
