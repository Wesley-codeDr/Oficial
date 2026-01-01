'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, User, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ClaudeChatInput } from '@/components/ui/claude-style-chat-input'
import { GlassContainer } from '@/components/ui/glass-container'
import type { ChatPayload } from '@/types/chat-input'
import { springConfig } from '@/lib/animations'

// ===== TYPES =====

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  model?: string
  timestamp: Date
  attachmentsCount?: number
  snippetsCount?: number
}

// ===== DEMO RESPONSES =====

const DEMO_RESPONSES: Record<string, string> = {
  anamnese: `**Anamnese Estruturada**

Com base nas informações fornecidas, segue a coleta estruturada:

**Queixa Principal (QP):** [Aguardando mais detalhes]

**História da Doença Atual (HDA):**
- Início: [a definir]
- Duração: [a definir]
- Fatores de melhora/piora: [a definir]

**Antecedentes Pessoais:**
- Doenças crônicas: [verificar]
- Medicações em uso: [verificar]
- Alergias: [verificar]

*Por favor, forneça mais detalhes sobre a queixa do paciente.*`,

  diagnostico: `**Análise Diagnóstica**

Baseado nas informações clínicas:

**Hipóteses Diagnósticas:**
1. [Necessário mais dados clínicos]
2. [Aguardando resultados de exames]

**Exames Sugeridos:**
- Hemograma completo
- PCR / VHS
- Exames específicos conforme suspeita

**Red Flags a Observar:**
- [ ] Sinais de instabilidade hemodinâmica
- [ ] Alterações neurológicas
- [ ] Febre persistente

*Forneça mais detalhes para refinamento diagnóstico.*`,

  conduta: `**Sugestão de Conduta**

**Medidas Imediatas:**
1. Estabilização do paciente
2. Monitorização de sinais vitais
3. Acesso venoso periférico

**Tratamento Proposto:**
- [Dependente do diagnóstico]
- Analgesia conforme necessidade
- Hidratação adequada

**Orientações:**
- Reavaliação em [período]
- Sinais de alarme
- Retorno se piora

*Complete com dados clínicos para conduta específica.*`,

  prescricao: `**Modelo de Prescrição**

1. **Dipirona** 1g IV 6/6h (se dor ou febre)
2. **Ondansetrona** 4mg IV (se náuseas)
3. **SF 0,9%** 500ml IV em 2h

**Observações:**
- Verificar alergias antes de administrar
- Ajustar conforme função renal
- Monitorar resposta clínica

*Confirme dados do paciente e alergias.*`,
}

// ===== MESSAGE COMPONENT =====

interface MessageBubbleProps {
  message: Message
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className={cn('flex gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}
    >
      {/* Avatar */}
      <div
        className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gradient-to-br from-violet-500 to-purple-600 text-white'
        )}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3',
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/10'
        )}
      >
        {/* Model badge for assistant */}
        {!isUser && message.model && (
          <div className="flex items-center gap-1 mb-2">
            <Sparkles className="w-3 h-3 text-blue-500" />
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
              {message.model}
            </span>
          </div>
        )}

        {/* Message content */}
        <div
          className={cn(
            'prose prose-sm max-w-none',
            isUser
              ? 'prose-invert'
              : 'dark:prose-invert prose-slate'
          )}
        >
          {message.content.split('\n').map((line, i) => (
            <p key={i} className="mb-1 last:mb-0">
              {line.startsWith('**') && line.endsWith('**') ? (
                <strong>{line.slice(2, -2)}</strong>
              ) : line.startsWith('- ') ? (
                <span className="block pl-2">• {line.slice(2)}</span>
              ) : line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') ? (
                <span className="block pl-2">{line}</span>
              ) : (
                line
              )}
            </p>
          ))}
        </div>

        {/* Attachments indicator */}
        {isUser && (message.attachmentsCount ?? 0) > 0 && (
          <p className="text-xs text-blue-200 mt-2">
            {message.attachmentsCount} arquivo(s) anexado(s)
          </p>
        )}

        {/* Timestamp */}
        <p
          className={cn(
            'text-xs mt-2',
            isUser ? 'text-blue-200' : 'text-slate-400 dark:text-slate-500'
          )}
        >
          {message.timestamp.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </motion.div>
  )
}

// ===== MAIN DEMO COMPONENT =====

export function ChatWellDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSendMessage = useCallback((payload: ChatPayload) => {
    // Add user message
    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: payload.message || '[Conteúdo anexado]',
      timestamp: new Date(),
      attachmentsCount: payload.attachments.length,
      snippetsCount: payload.snippets.length,
    }
    setMessages((prev) => [...prev, userMessage])

    // Simulate typing
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false)

      const modelName =
        payload.model === 'anamnese'
          ? 'Anamnese AI'
          : payload.model === 'diagnostico'
            ? 'Diagnóstico AI'
            : payload.model === 'conduta'
              ? 'Conduta AI'
              : 'Prescrição AI'

      const responseContent =
        DEMO_RESPONSES[payload.model] ??
        'Resposta do assistente médico...'

      const assistantMessage: Message = {
        id: `msg_${Date.now()}_assistant`,
        role: 'assistant',
        content: responseContent,
        model: modelName,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1500)
  }, [])

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center py-6">
        <div className="inline-flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            ChatWell
          </h1>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Assistente médico profissional
        </p>
      </div>

      {/* Messages area */}
      <GlassContainer
        variant="panel"
        size="lg"
        className="flex-1 overflow-hidden"
      >
        <div className="h-full overflow-y-auto px-4 py-4 space-y-4">
          {/* Empty state */}
          {messages.length === 0 && !isTyping && (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Como posso ajudar?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                Descreva o caso clínico, anexe documentos ou selecione um modelo
                especializado para começar.
              </p>
            </div>
          )}

          {/* Messages */}
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                    <span
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    />
                    <span
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </GlassContainer>

      {/* Input area */}
      <div className="py-4">
        <ClaudeChatInput
          onSendMessage={handleSendMessage}
          placeholder="Descreva a queixa, contexto clínico e o que você precisa."
        />
      </div>
    </div>
  )
}

export default ChatWellDemo
