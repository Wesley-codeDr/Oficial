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
    <div className="chat-container flex flex-col h-full max-w-[900px] mx-auto overflow-hidden relative">
      {/* MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 p-6">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  chat-message relative max-w-[80%] p-4 shadow-sm transition-all
                  ${
                    msg.sender === 'user'
                      ? 'bg-[var(--color-primary-500)] text-white rounded-[16px] rounded-br-[4px]'
                      : 'bg-[var(--color-gray-100)] text-[var(--color-text-primary)] rounded-[16px] rounded-bl-[4px]'
                  }
                `}
              >
                <p className="text-[14px] leading-relaxed font-normal whitespace-pre-wrap">{msg.text}</p>
                <span
                  className={`
                    text-[9px] font-medium mt-1 block uppercase tracking-wider opacity-60
                    ${msg.sender === 'user' ? 'text-white/80' : 'text-[var(--color-text-secondary)]'}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start w-full"
          >
            <div
              className="bg-[var(--color-gray-100)] px-4 py-2 rounded-[16px] rounded-bl-[4px] flex items-center gap-1"
            >
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA */}
      <div className="p-6 pt-0">
        <div className="chat-input-container bg-[var(--color-bg-primary)] border border-[var(--color-gray-200)] rounded-xl p-3 flex items-center gap-3 shadow-md focus-within:border-[var(--color-primary-400)] transition-all">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem..."
            className="chat-input flex-1 bg-transparent border-none outline-none text-[var(--color-text-primary)] text-sm font-normal resize-none h-10 py-2"
            rows={1}
          />

          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="chat-send-btn w-11 h-11 rounded-full bg-[var(--color-primary-500)] text-white flex items-center justify-center hover:bg-[var(--color-primary-600)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
