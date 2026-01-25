'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { useShiftTodoStore, useStickyNotes } from '@/stores/shift-todo-store'
import type { StickyNoteColor } from '@/types/shift-todo'
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

interface StickyNotesProps {
  className?: string
}

const colorOptions: StickyNoteColor[] = ['yellow', 'blue', 'green', 'pink', 'purple']

// Apple-style color palette
const noteColors: Record<StickyNoteColor, { bg: string; text: string; dot: string }> = {
  yellow: { bg: 'rgba(255, 214, 10, 0.15)', text: '#996f00', dot: '#ffd60a' },
  blue: { bg: 'rgba(0, 113, 227, 0.12)', text: '#0051a8', dot: '#0071e3' },
  green: { bg: 'rgba(48, 209, 88, 0.12)', text: '#1b7a37', dot: '#30d158' },
  pink: { bg: 'rgba(255, 45, 85, 0.12)', text: '#c41e3a', dot: '#ff2d55' },
  purple: { bg: 'rgba(175, 82, 222, 0.12)', text: '#7c3aad', dot: '#af52de' },
}

export function StickyNotes({ className }: StickyNotesProps) {
  const [isAdding, setIsAdding] = React.useState(false)
  const [newContent, setNewContent] = React.useState('')
  const [selectedColor, setSelectedColor] = React.useState<StickyNoteColor>('yellow')
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const { theme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  
  const stickyNotes = useStickyNotes()
  const { addStickyNote, deleteStickyNote } = useShiftTodoStore()
  
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

  const handleAdd = () => {
    if (!newContent.trim()) return
    addStickyNote(newContent.trim(), selectedColor)
    setNewContent('')
    setIsAdding(false)
  }

  React.useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isAdding])

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className={cn(
        'flex items-center justify-between',
        glassBlur,
        glassOpacity,
        glassBorder,
        glassRadius,
        glassNoise,
        glassSpecular,
        glassRimLight,
        'bg-white/60 dark:bg-white/10'
      )}>
        <h3
          className="text-[13px] font-semibold text-[#86868b] dark:text-[#a1a1a6] uppercase tracking-wide"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
        >
          Notas Rápidas
        </h3>

        <motion.button
          onClick={() => setIsAdding(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'p-1.5 rounded-full transition-colors',
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
          <Plus className="w-4 h-4 text-[#8e8e93]" />
        </motion.button>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {/* Add New Note */}
          {isAdding && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="col-span-2 p-4 rounded-[16px]"
              style={{
                background: noteColors[selectedColor].bg,
                border: '1px solid rgba(0, 0, 0, 0.04)',
              }}
            >
              <textarea
                ref={inputRef}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleAdd()
                  }
                  if (e.key === 'Escape') {
                    setIsAdding(false)
                    setNewContent('')
                  }
                }}
                placeholder="Escreva uma nota..."
                className="w-full h-20 bg-transparent text-[14px] resize-none focus:outline-none"
                style={{
                  color: noteColors[selectedColor].text,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  lineHeight: 1.5,
                }}
              />

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/5">
                {/* Color dots */}
                <div className="flex gap-2">
                  {colorOptions.map((color) => (
                    <motion.button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-5 h-5 rounded-full transition-all"
                      style={{
                        background: noteColors[color].dot,
                        boxShadow: selectedColor === color ? `0 0 0 2px white, 0 0 0 4px ${noteColors[color].dot}` : 'none',
                      }}
                    />
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsAdding(false)
                      setNewContent('')
                    }}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-[12px] font-medium text-[#8e8e93] hover:bg-black/5 transition-colors',
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
                    Cancelar
                  </button>
                  <motion.button
                    onClick={handleAdd}
                    disabled={!newContent.trim()}
                    whileHover={newContent.trim() ? { scale: 1.02 } : {}}
                    whileTap={newContent.trim() ? { scale: 0.98 } : {}}
                    className={cn(
                      'px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all',
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
                      background: newContent.trim() ? '#0071e3' : 'rgba(142, 142, 147, 0.12)',
                      color: newContent.trim() ? 'white' : '#8e8e93',
                      cursor: newContent.trim() ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Salvar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Existing Notes */}
          {stickyNotes.map((note) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="group relative p-4 rounded-[16px]"
              style={{
                background: noteColors[note.color].bg,
                border: '1px solid rgba(0, 0, 0, 0.04)',
              }}
            >
              <p
                className="text-[13px] whitespace-pre-wrap break-words pr-4"
                style={{
                  color: noteColors[note.color].text,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  lineHeight: 1.5,
                }}
              >
                {note.content}
              </p>

              {/* Delete button */}
              <motion.button
                onClick={() => deleteStickyNote(note.id)}
                whileHover={{ scale: 1.1 }}
                className={cn(
                  'absolute -top-2 -right-2 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity',
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
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                }}
              >
                <X className="w-3 h-3 text-[#8e8e93] hover:text-[#ff453a] transition-colors" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {stickyNotes.length === 0 && !isAdding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            'flex flex-col items-center justify-center py-8 text-center',
            glassBlur,
            glassOpacity,
            glassBorder,
            glassRadius,
            glassNoise,
            glassSpecular,
            glassRimLight,
            glassInnerGlow,
            'bg-white/60 dark:bg-white/10'
          )}
        >
          <p
            className="text-[13px] text-[#8e8e93]"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
          >
            Nenhuma nota ainda
          </p>
          <p
            className="text-[11px] text-[#aeaeb2] mt-0.5"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
          >
            Clique em + para adicionar
          </p>
        </motion.div>
      )}
    </div>
  )
}
