'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, AlertCircle, Circle, ArrowDown } from 'lucide-react'
import type { TaskPriority } from '@/types/shift-todo'
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

interface TodoInputProps {
  onAdd: (content: string, priority: TaskPriority) => void
}

const priorityOptions: { value: TaskPriority; label: string; color: string; icon: React.ReactNode }[] = [
  { value: 'urgent', label: 'Urgente', color: '#ff453a', icon: <AlertCircle className="w-3.5 h-3.5" /> },
  { value: 'normal', label: 'Normal', color: '#0071e3', icon: <Circle className="w-3.5 h-3.5" /> },
  { value: 'low', label: 'Baixa', color: '#8e8e93', icon: <ArrowDown className="w-3.5 h-3.5" /> },
]

export function TodoInput({ onAdd }: TodoInputProps) {
  const [content, setContent] = React.useState('')
  const [priority, setPriority] = React.useState<TaskPriority>('normal')
  const [showPriority, setShowPriority] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { theme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  
  const currentPriority = priorityOptions.find((p) => p.value === priority)!
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    onAdd(content.trim(), priority)
    setContent('')
    setPriority('normal')
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div
        className={cn(
          'flex items-center gap-3 px-5 py-4 rounded-[16px] transition-all duration-300',
          glassBlur,
          glassOpacity,
          glassBorder,
          glassRadius,
          glassNoise,
          glassSpecular,
          glassRimLight,
          'bg-white/60 dark:bg-white/10'
        )}
      >
        {/* Dark mode */}
        <div
          className={cn(
            'hidden dark:block absolute inset-0 rounded-[16px] -z-10',
            glassBlur,
            glassOpacity,
            glassBorder,
            glassRadius,
            glassNoise,
            glassSpecular,
            'bg-white/60 dark:bg-white/10'
          )}
        />
        
        {/* Plus icon */}
        <div
          className={cn(
            'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center',
            glassBlur,
            glassOpacity,
            glassBorder,
            glassRadius,
            glassNoise,
            glassSpecular,
            glassRimLight,
            'bg-white/60 dark:bg-white/10'
          )}
        >
          <Plus className="w-4 h-4 text-[#8e8e93]" />
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Adicionar tarefa..."
          className="flex-1 bg-transparent text-[15px] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#8e8e93] focus:outline-none"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          }}
        />

        {/* Priority selector */}
        <div className="relative">
          <motion.button
            type="button"
            onClick={() => setShowPriority(!showPriority)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors',
              glassBlur,
              glassOpacity,
              glassBorder,
              glassRadius,
              glassNoise,
              glassSpecular,
              glassRimLight,
              glassHoverScale,
              glassTapScale,
              'bg-white/60 dark:bg-white/10'
            )}
            style={{
              background: `rgba(${priority === 'urgent' ? '255,69,58' : priority === 'normal' ? '0,113,227' : '142,142,147'}, 0.1)`,
              color: currentPriority.color,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}
          >
            {currentPriority.icon}
            <span className="hidden sm:inline">{currentPriority.label}</span>
          </motion.button>

          <AnimatePresence>
            {showPriority && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowPriority(false)}
                />

                {/* Dropdown */}
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className={cn(
                    'absolute right-0 top-full mt-2 z-20 py-1 rounded-[12px] min-w-[140px] overflow-hidden',
                    glassBlur,
                    glassOpacity,
                    glassBorder,
                    glassRadius,
                    glassNoise,
                    glassSpecular,
                    glassRimLight,
                    'bg-white/60 dark:bg-white/10'
                  )}
                  style={{
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                  }}
                >
                  {priorityOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setPriority(option.value)
                        setShowPriority(false)
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-[rgba(0,0,0,0.04)]"
                      style={{
                        color: option.color,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                        background: priority === option.value ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                      }}
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Submit button - Apple blue */}
        <motion.button
          type="submit"
          disabled={!content.trim()}
          whileHover={content.trim() ? { scale: 1.05 } : {}}
          whileTap={content.trim() ? { scale: 0.95 } : {}}
          className={cn(
            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
            glassBlur,
            glassOpacity,
            glassBorder,
            glassRadius,
            glassNoise,
            glassSpecular,
            glassRimLight,
            glassHoverScale,
            glassTapScale,
            'bg-white/60 dark:bg-white/10'
          )}
          style={{
            background: content.trim() ? '#0071e3' : 'rgba(142, 142, 147, 0.12)',
            boxShadow: content.trim() ? '0 2px 8px rgba(0, 113, 227, 0.3)' : 'none',
            cursor: content.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          <Plus className={cn('w-4 h-4', content.trim() ? 'text-white' : 'text-[#8e8e93]')} />
        </motion.button>
      </div>
    </form>
  )
}
