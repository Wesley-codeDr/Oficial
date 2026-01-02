'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Calculator, X } from 'lucide-react'

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
  const [leftWidth, setLeftWidth] = useState(50) // percentage
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
        className="h-full overflow-hidden transition-[width] duration-75 ease-out"
      >
        <div className="h-full overflow-y-auto custom-scrollbar bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-l-[40px] border-r border-white/10">
          {leftContent}
        </div>
      </div>

      {/* Resize Handle */}
      <div
        onMouseDown={startResizing}
        className={`w-1.5 h-full cursor-col-resize group relative flex items-center justify-center transition-colors z-30 ${
          isResizing ? 'bg-blue-500' : 'bg-transparent hover:bg-blue-500/30'
        }`}
      >
        <div className="absolute h-12 w-1.5 bg-slate-300 dark:bg-slate-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Right Pane: Preview / Editor */}
      <div 
        style={{ width: `${100 - leftWidth}%` }}
        className="h-full overflow-hidden transition-[width] duration-75 ease-out"
      >
        <div className="h-full overflow-y-auto custom-scrollbar bg-white/5 dark:bg-black/5 backdrop-blur-sm rounded-r-[40px] relative">
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
    transition={{ type: 'spring', damping: 25, stiffness: 150 }}
    className="absolute top-6 bottom-6 right-24 w-80 md:w-[420px] rounded-[44px] liquid-glass-material !bg-white/15 dark:!bg-black/30 backdrop-blur-[60px] border-white/30 dark:border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.2)] z-50 flex flex-col overflow-hidden glass-texture"
  >
    {/* Rim Light / Inner Border */}
    <div className="absolute inset-0 rounded-[44px] pointer-events-none border border-white/20 z-10" />

    <div className="flex items-center justify-between p-7 border-b border-white/10 bg-white/5 relative z-20">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 animate-pulse-slow">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-[15px] font-black text-slate-800 dark:text-white uppercase tracking-widest leading-none">ChatWW</h3>
          <p className="text-[10px] text-blue-500 dark:text-blue-400 font-bold uppercase tracking-wider mt-1.5 opacity-80">Processamento em Tempo Real</p>
        </div>
      </div>
      <button 
        onClick={onClose} 
        className="w-10 h-10 rounded-full bg-slate-200/50 dark:bg-white/10 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500/80 flex items-center justify-center transition-all duration-300"
      >
        <X className="w-4 h-4" />
      </button>
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
    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    className="absolute top-1/2 -translate-y-1/2 right-24 w-96 rounded-[40px] liquid-glass-material !bg-white/60 dark:!bg-slate-900/60 backdrop-blur-[50px] border-white dark:border-white/10 shadow-[0_45px_150px_rgba(0,0,0,0.25)] z-50 flex flex-col overflow-hidden glass-texture"
  >
    <div className="flex items-center justify-between p-7 border-b border-white/10 dark:border-white/5 bg-emerald-500/5">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest leading-none">Scores Clínicos</h3>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider mt-1.5 opacity-80">Evidência em Tempo Real</p>
        </div>
      </div>
      <button 
        onClick={onClose} 
        className="w-10 h-10 rounded-full bg-slate-200/50 dark:bg-white/10 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500/80 flex items-center justify-center transition-all duration-300"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
    <div className="flex-1 overflow-y-auto p-6 max-h-[60vh] custom-scrollbar">
      {content}
    </div>
  </motion.div>
)
