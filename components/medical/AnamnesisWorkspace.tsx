'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Calculator, X } from 'lucide-react'
import { applePhysics } from '@/lib/design-system/animation-tokens'

interface AnamnesisWorkspaceProps {
  leftContent: React.ReactNode
  rightContent: React.ReactNode
  sidebarContent?: {
    chat?: React.ReactNode
    calculators?: React.ReactNode
  }
  activeTool: 'chat' | 'calculators' | null
  onActiveToolChange: (tool: 'chat' | 'calculators' | null) => void
}

export const AnamnesisWorkspace: React.FC<AnamnesisWorkspaceProps> = ({
  leftContent,
  rightContent,
  sidebarContent,
  activeTool,
  onActiveToolChange
}) => {
  const [leftWidth, setLeftWidth] = useState(70) // percentage - checkboxes get more space initially
  const [isResizing, setIsResizing] = useState(false)
  
  const containerRef = useRef<globalThis.HTMLDivElement>(null)

  const startResizing = useCallback((e: React.MouseEvent) => {
    setIsResizing(true)
    e.preventDefault()
  }, [])

  const stopResizing = useCallback(() => {
    setIsResizing(false)
  }, [])

  const resize = useCallback(
    (e: globalThis.MouseEvent) => {
      if (isResizing && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100
        
        // Boundaries
        if (newLeftWidth > 20 && newLeftWidth < 80) {
          setLeftWidth(newLeftWidth)
        }
      }
    },
    [isResizing]
  )

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResizing)
    } else {
      window.removeEventListener('mousemove', resize)
      window.removeEventListener('mouseup', stopResizing)
    }
    return () => {
      window.removeEventListener('mousemove', resize)
      window.removeEventListener('mouseup', stopResizing)
    }
  }, [isResizing, resize, stopResizing])

  return (
    <div 
      ref={containerRef}
      className="h-full flex relative overflow-hidden bg-transparent"
    >
      {/* Left Pane: Form */}
      <div 
        style={{ width: `${leftWidth}%` }}
        className="h-full overflow-hidden transition-[width] duration-75 ease-out relative z-10"
      >
        <div className="h-full overflow-y-auto custom-scrollbar bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-l-[40px] border-r border-white/10 glass-texture">
          {leftContent}
        </div>
      </div>

      {/* Resize Handle */}
      <div
        onMouseDown={startResizing}
        className={`w-1.5 h-full cursor-col-resize overflow-y-auto group relative flex items-center justify-center transition-all z-30 ${
          isResizing ? 'bg-blue-500/40' : 'bg-transparent hover:bg-blue-500/20'
        }`}
      >
        <div className="absolute h-16 w-1 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity rim-highlight" />
        {/* Subtle shadow separator */}
        <div className="absolute inset-y-0 -left-4 w-4 bg-linear-to-r from-transparent to-black/5 dark:to-white/5 pointer-events-none" />
        <div className="absolute inset-y-0 -right-4 w-4 bg-linear-to-l from-transparent to-black/5 dark:to-white/5 pointer-events-none" />
      </div>

      {/* Right Pane: Preview / Editor */}
      <div 
        style={{ width: `${100 - leftWidth}%` }}
        className="h-full overflow-hidden transition-[width] duration-75 ease-out relative z-10"
      >
        <div className="h-full overflow-y-auto custom-scrollbar bg-white/5 dark:bg-black/10 backdrop-blur-lg rounded-r-[40px] relative glass-texture">
          {rightContent}
        </div>
      </div>

      {/* Premium Overlays */}
      <AnimatePresence>
        {activeTool === 'chat' && (
          <GlassChat 
            onClose={() => onActiveToolChange(null)}
            content={sidebarContent?.chat}
          />
        )}
        {activeTool === 'calculators' && (
          <CalculatorWidget 
            onClose={() => onActiveToolChange(null)}
            content={sidebarContent?.calculators}
          />
        )}
      </AnimatePresence>
    </div>
  )
}



const GlassChat: React.FC<{ onClose: () => void; content: React.ReactNode }> = ({ onClose, content }) => (
  <motion.div
    initial={{ x: 60, scale: 0.9, opacity: 0, filter: 'blur(20px)' }}
    animate={{ x: 0, scale: 1, opacity: 1, filter: 'blur(0px)' }}
    exit={{ x: 60, scale: 0.9, opacity: 0, filter: 'blur(20px)' }}
    transition={applePhysics.soft}
    className="absolute top-6 bottom-6 right-24 w-80 md:w-[420px] rounded-[24px] glass-elevated bg-white/15! dark:bg-black/30! shadow-[0_45px_120px_rgba(0,0,0,0.25)] z-50 flex flex-col overflow-hidden glass-texture ring-1 ring-white/10"
  >
    {/* Specular Rim Light */}
    <div className="absolute inset-0 rounded-[24px] pointer-events-none border border-white/20 z-10 rim-highlight" />

    <div className="flex items-center justify-between p-7 border-b border-white/10 bg-white/5 relative z-20">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 animate-pulse-slow rim-highlight">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-[15px] font-black text-slate-800 dark:text-white uppercase tracking-widest leading-none">ChatWW</h3>
          <p className="text-[10px] text-blue-500 dark:text-blue-400 font-extrabold uppercase tracking-wider mt-1.5 opacity-80">Processamento em Tempo Real</p>
        </div>
      </div>
      <motion.button 
        whileTap={applePhysics.haptic}
        onClick={onClose} 
        className="w-10 h-10 rounded-full bg-slate-200/50 dark:bg-white/10 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 flex items-center justify-center transition-all duration-300 border border-transparent hover:border-rose-400/30"
      >
        <X className="w-4 h-4" />
      </motion.button>
    </div>
    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar relative z-20">
      {content}
    </div>
  </motion.div>
)

const CalculatorWidget: React.FC<{ onClose: () => void; content: React.ReactNode }> = ({ onClose, content }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)', y: 20 }}
    animate={{ scale: 1, opacity: 1, filter: 'blur(0px)', y: 0 }}
    exit={{ scale: 0.8, opacity: 0, filter: 'blur(10px)', y: 20 }}
    transition={applePhysics.spatial}
    className="absolute top-1/2 -translate-y-1/2 right-8 w-[520px] max-w-[90vw] rounded-[24px] glass-elevated bg-white/40! dark:bg-slate-900/40! shadow-[0_50px_150px_rgba(0,0,0,0.35)] z-50 flex flex-col overflow-hidden glass-texture ring-1 ring-white/15"
  >
    <div className="flex items-center justify-between p-7 border-b border-white/10 dark:border-white/5 bg-emerald-500/5 relative z-20">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-500/20 rim-highlight">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest leading-none">Scores Clínicos</h3>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold uppercase tracking-wider mt-1.5 opacity-80">Evidência em Tempo Real</p>
        </div>
      </div>
      <motion.button 
        whileTap={applePhysics.haptic}
        onClick={onClose} 
        className="w-10 h-10 rounded-full bg-slate-200/50 dark:bg-white/10 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 flex items-center justify-center transition-all duration-300 border border-transparent hover:border-rose-400/30"
      >
        <X className="w-4 h-4" />
      </motion.button>
    </div>
    <div className="flex-1 overflow-y-auto p-6 max-h-[70vh] custom-scrollbar relative z-20">
      {content}
    </div>
  </motion.div>
)
