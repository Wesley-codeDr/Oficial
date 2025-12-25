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
      text: 'Olá! Sou o Well, seu assistente médico inteligente. Como posso ajudar você hoje?',
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
        text: 'Entendido. Estou analisando sua solicitação com base nos protocolos clínicos mais recentes. Um momento, por favor.',
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
    <div className="h-full flex flex-col p-4 md:p-6 overflow-hidden max-w-5xl mx-auto w-full">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6 p-4 rounded-3xl glass border border-white/30 dark:border-white/10 shadow-lg z-10"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 text-white">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              Chat Well
            </h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Online • IA Médica Avançada
              </span>
            </div>
          </div>
        </div>
        <button
          aria-label="Mais opções do Chat Well"
          className="p-2 rounded-xl hover:bg-white/20 dark:hover:bg-white/5 transition-colors text-slate-500 dark:text-slate-400"
        >
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </motion.div>

      {/* MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2 pb-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  relative max-w-[80%] md:max-w-[70%] p-5 rounded-3xl shadow-sm
                  ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-sm shadow-blue-500/20'
                      : 'glass border border-white/40 dark:border-white/5 text-slate-800 dark:text-slate-100 rounded-tl-sm'
                  }
                `}
              >
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <span
                  className={`
                    text-[10px] font-medium mt-2 block opacity-70
                    ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'}
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start w-full"
          >
            <div
              role="status"
              aria-live="polite"
              aria-label="Well está digitando"
              className="glass border border-white/30 dark:border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1"
            >
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA */}
      <div className="mt-4 relative z-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-2 rounded-[24px] glass border border-white/40 dark:border-white/10 shadow-2xl shadow-blue-900/5 flex items-end gap-2"
        >
          <button
            aria-label="Anexar arquivo"
            className="p-3 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-700/50 text-slate-500 dark:text-slate-400 transition-colors shrink-0"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem para o Well..."
            aria-label="Campo de mensagem"
            className="w-full bg-transparent border-none focus:ring-0 p-3 text-slate-800 dark:text-white placeholder:text-slate-400 resize-none max-h-32 min-h-[44px] custom-scrollbar"
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
              p-3 rounded-xl transition-all duration-300 shrink-0
              ${
                inputValue.trim()
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:scale-105'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
              }
            `}
            aria-label="Enviar mensagem"
            aria-disabled={!inputValue.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </motion.div>
        <div className="text-center mt-2">
          <p className="text-[10px] text-slate-400 dark:text-slate-500">
            O Well pode cometer erros. Considere verificar informações importantes.
          </p>
        </div>
      </div>
    </div>
  )
}
