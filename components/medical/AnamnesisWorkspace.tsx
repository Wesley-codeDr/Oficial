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
}

export const AnamnesisWorkspace: React.FC<AnamnesisWorkspaceProps> = ({
  leftContent,
  rightContent,
  sidebarContent
}) => {
  const [leftWidth, setLeftWidth] = useState(50) // percentage
  const [isResizing, setIsResizing] = useState(false)
  const [activeTool, setActiveTool] = useState<'chat' | 'calculators' | null>(null)
  
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

      {/* Floating Toolbar Toggles (Right Side) */}
      <div className="absolute top-1/2 -translate-y-1/2 right-6 flex flex-col gap-4 z-[60]">
        <ToolToggle 
          icon={<MessageSquare className="w-5 h-5" />}
          active={activeTool === 'chat'}
          onClick={() => setActiveTool(activeTool === 'chat' ? null : 'chat')}
          label="Welly AI"
          accent="blue"
        />
        <ToolToggle 
          icon={<Calculator className="w-5 h-5" />}
          active={activeTool === 'calculators'}
          onClick={() => setActiveTool(activeTool === 'calculators' ? null : 'calculators')}
          label="Scores"
          accent="emerald"
        />
      </div>

      {/* Premium Overlays */}
      <AnimatePresence>
        {activeTool === 'chat' && (
          <GlassChat 
            onClose={() => setActiveTool(null)}
            content={sidebarContent?.chat}
          />
        )}
        {activeTool === 'calculators' && (
          <CalculatorWidget 
            onClose={() => setActiveTool(null)}
            content={sidebarContent?.calculators}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const ToolToggle: React.FC<{ 
  icon: React.ReactNode; 
  active: boolean; 
  onClick: () => void; 
  label: string;
  accent: 'blue' | 'emerald'
}> = ({ icon, active, onClick, label, accent }) => (
  <button
    onClick={onClick}
    className={`group relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-500 border
      ${active 
        ? accent === 'blue' ? 'bg-blue-600 border-blue-400 text-white shadow-xl shadow-blue-500/40' : 'bg-emerald-600 border-emerald-400 text-white shadow-xl shadow-emerald-500/40' 
        : 'bg-white/30 dark:bg-black/40 border-white/30 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-black hover:scale-110 active:scale-90 shadow-lg backdrop-blur-md'
      }`}
  >
    {icon}
    <div className="absolute right-full mr-4 px-3 py-2 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 pointer-events-none whitespace-nowrap shadow-2xl border border-white/10">
      {label}
    </div>
  </button>
)

// -- Premium Floating Components (Internal for unity or could be external) --

const GlassChat: React.FC<{ onClose: () => void; content: React.ReactNode }> = ({ onClose, content }) => (
  <motion.div
    initial={{ x: 400, opacity: 0, filter: 'blur(20px)' }}
    animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
    exit={{ x: 400, opacity: 0, filter: 'blur(20px)' }}
    transition={{ type: 'spring', damping: 28, stiffness: 180 }}
    className="absolute top-6 bottom-6 right-24 w-80 md:w-96 rounded-[40px] bg-white/10 dark:bg-white/5 backdrop-blur-[40px] border border-white/30 dark:border-white/10 shadow-[0_32px_128px_rgba(0,0,0,0.1)] z-50 flex flex-col overflow-hidden glass-texture"
  >
    <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">Welly AI</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Líquido & Transparente</p>
        </div>
      </div>
      <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 dark:bg-black/20 flex items-center justify-center transition-colors">
        <X className="w-4 h-4 text-slate-500" />
      </button>
    </div>
    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
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
    className="absolute top-1/2 -translate-y-1/2 right-24 w-80 rounded-[32px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl border border-white dark:border-white/10 shadow-[0_32px_128px_rgba(0,0,0,0.2)] z-50 flex flex-col overflow-hidden scale-hover"
  >
    <div className="flex items-center justify-between p-5 border-b border-white/10 dark:border-white/5 bg-emerald-500/5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
          <Calculator className="w-4 h-4" />
        </div>
        <h3 className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Calculadoras</h3>
      </div>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
    <div className="p-5 overflow-y-auto max-h-[60vh] custom-scrollbar">
      {content}
    </div>
  </motion.div>
)
