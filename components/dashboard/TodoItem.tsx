'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Pin, Trash2 } from 'lucide-react'
import type { ShiftTodo } from '@/types/shift-todo'
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

interface TodoItemProps {
  todo: ShiftTodo
  onToggleComplete: (id: string) => void
  onTogglePin: (id: string) => void
  onDelete: (id: string) => void
}

// Apple color system
const priorityColors = {
  urgent: { border: '#ff453a', bg: 'rgba(255, 69, 58, 0.08)' },
  normal: { border: '#0071e3', bg: 'rgba(0, 113, 227, 0.08)' },
  low: { border: '#8e8e93', bg: 'rgba(142, 142, 147, 0.08)' },
}

export function TodoItem({
  todo,
  onToggleComplete,
  onTogglePin,
  onDelete,
}: TodoItemProps) {
  const [isDeleting, setIsDeleting] = React.useState(false)
  const isCompleted = todo.status === 'completed'
  const colors = priorityColors[todo.priority]
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

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => onDelete(todo.id), 300)
  }

  return (
    <AnimatePresence mode="popLayout">
      {!isDeleting && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -80, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            'group relative flex items-center gap-4 px-5 py-4 rounded-[16px]',
            'cursor-grab active:cursor-grabbing',
            isCompleted && 'opacity-50'
          )}
          style={{
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
            transition: 'box-shadow 300ms ease, transform 300ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)'
          }}
        >
          {/* Dark mode background */}
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
            style={{
              background: 'rgba(29, 29, 31, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          />

          {/* Priority indicator line */}
          <div
            className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full"
            style={{ background: colors.border }}
          />

          {/* Checkbox - Apple style */}
          <motion.button
            onClick={() => onToggleComplete(todo.id)}
            whileTap={{ scale: 0.9 }}
            className={cn(
              'relative flex-shrink-0 w-[22px] h-[22px] rounded-full flex items-center justify-center',
              'transition-all duration-300 ease-out'
            )}
            style={{
              background: isCompleted ? '#30d158' : 'transparent',
              border: isCompleted ? 'none' : `2px solid ${colors.border}`,
              boxShadow: isCompleted ? '0 2px 8px rgba(48, 209, 88, 0.3)' : 'none',
            }}
          >
            <AnimatePresence>
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Content */}
          <span
            className={cn(
              'flex-1 text-[15px] text-[#1d1d1f] dark:text-[#f5f5f7]',
              isCompleted && 'line-through text-[#8e8e93]'
            )}
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              lineHeight: 1.4,
            }}
          >
            {todo.content}
          </span>

          {/* Actions - Appear on hover */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {/* Pin */}
            <motion.button
              onClick={() => onTogglePin(todo.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                'p-2 rounded-full transition-colors duration-200',
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
                background: todo.isPinned ? 'rgba(255, 159, 10, 0.12)' : 'transparent',
                color: todo.isPinned ? '#ff9f0a' : '#8e8e93',
              }}
            >
              <Pin
                className="w-4 h-4"
                fill={todo.isPinned ? 'currentColor' : 'none'}
              />
            </motion.button>

            {/* Delete */}
            <motion.button
              onClick={handleDelete}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                'p-2 rounded-full text-[#8e8e93] hover:text-[#ff453a] hover:bg-[rgba(255,69,58,0.08)] transition-colors duration-200',
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
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Pinned badge */}
          {todo.isPinned && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
              style={{ background: '#ff9f0a' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
