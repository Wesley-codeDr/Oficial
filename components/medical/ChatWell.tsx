import React, { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Sparkles, MoreHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export const ChatWell: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou o ChatWW, seu assistente médico inteligente. Como posso ajudar você hoje?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<any>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot response
    globalThis.setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Entendido. Estou analisando sua solicitação com base nos protocolos clínicos mais recentes e no contexto atual do paciente. Um momento, por favor.',
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="h-full flex flex-col overflow-hidden w-full relative">
      {/* MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 px-2 py-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, scale: 0.9, y: 10, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ type: 'spring', damping: 20, stiffness: 150 }}
              className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  relative max-w-[85%] p-4 rounded-[28px] shadow-lg transition-all duration-300
                  ${
                    msg.sender === 'user'
                      ? 'bg-linear-to-br from-blue-600 to-indigo-600 text-white rounded-tr-sm shadow-blue-500/20'
                      : 'liquid-glass-material !bg-white/40 dark:!bg-white/5 border-white/40 dark:border-white/10 text-slate-800 dark:text-slate-100 rounded-tl-sm glass-texture'
                  }
                `}
              >
                {/* Subtle highlight for bot messages */}
                {msg.sender === 'bot' && (
                  <div className="absolute inset-0 rounded-[28px] border border-white/30 pointer-events-none" />
                )}
                
                <p className="text-[14px] leading-relaxed font-medium whitespace-pre-wrap">{msg.text}</p>
                <span
                  className={`
                    text-[9px] font-black mt-2 block uppercase tracking-widest opacity-60
                    ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-500'}
                  `}
                >
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-start w-full"
          >
            <div
              className="liquid-glass-material !bg-white/30 dark:!bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA */}
      <div className="p-4 pt-2 relative z-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-2 rounded-[32px] liquid-glass-material !bg-white/40 dark:!bg-black/30 backdrop-blur-3xl border-white/40 dark:border-white/10 shadow-2xl flex items-end gap-2 group focus-within:ring-2 focus-within:ring-blue-500/30 transition-all duration-500"
        >
          <button
            className="p-3.5 rounded-2xl hover:bg-blue-500/10 text-slate-500 dark:text-slate-400 transition-all duration-300 shrink-0 hover:scale-110 active:scale-95"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Perguntar ao ChatWW..."
            className="w-full bg-transparent border-none focus:ring-0 p-3.5 text-slate-800 dark:text-white placeholder:text-slate-500 font-medium resize-none max-h-32 min-h-[48px] custom-scrollbar text-[14px]"
            rows={1}
            style={{ height: 'auto' }}
            onInput={(e) => {
              const target = e.target as any
              target.style.height = 'auto'
              target.style.height = target.scrollHeight + 'px'
            }}
          />

          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={`
              p-3.5 rounded-2xl transition-all duration-500 shrink-0
              ${
                inputValue.trim()
                  ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/40 hover:scale-110 active:scale-90 scale-105'
                  : 'bg-slate-200 dark:bg-white/5 text-slate-400 cursor-not-allowed'
              }
            `}
          >
            <Send className="w-5 h-5" />
          </button>
        </motion.div>
        
        <p className="text-[9px] text-center mt-3 text-slate-400 font-black uppercase tracking-widest opacity-60">
          IA MÉDICA DE ALTA FIDELIDADE • APPLE VISION PROTOCOL
        </p>
      </div>
    </div>
  )
}
