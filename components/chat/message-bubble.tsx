'use client'

import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { 
  FileText, 
  Stethoscope, 
  BookOpen, 
  ClipboardList, 
  Lightbulb,
  AlertTriangle,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ChatWellAvatar, UserAvatar } from './chatwell-avatar'

interface MessageBubbleProps {
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}

/** Clinical section types in ChatWell responses */
type ClinicalSectionType = 
  | 'synthesis' 
  | 'diagnosis' 
  | 'evidence' 
  | 'conduct' 
  | 'suggestions'
  | 'general'

interface ClinicalSection {
  type: ClinicalSectionType
  title: string
  content: string
}

const sectionConfig: Record<ClinicalSectionType, {
  icon: typeof FileText
  color: string
  bgColor: string
  borderColor: string
  label: string
}> = {
  synthesis: {
    icon: FileText,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-l-blue-500',
    label: 'Síntese Clínica',
  },
  diagnosis: {
    icon: Stethoscope,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-l-purple-500',
    label: 'Hipóteses Diagnósticas',
  },
  evidence: {
    icon: BookOpen,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-l-emerald-500',
    label: 'Evidência Científica',
  },
  conduct: {
    icon: ClipboardList,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-l-orange-500',
    label: 'Conduta Sugerida',
  },
  suggestions: {
    icon: Lightbulb,
    color: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-l-cyan-500',
    label: 'Sugestões',
  },
  general: {
    icon: FileText,
    color: 'text-slate-600 dark:text-slate-400',
    bgColor: 'bg-slate-500/10',
    borderColor: 'border-l-slate-500',
    label: 'Resposta',
  },
}

/** Parse clinical sections from markdown content */
function parseClinicalSections(content: string): ClinicalSection[] {
  const sections: ClinicalSection[] = []
  
  // Split by H3 headers (### Section)
  const parts = content.split(/(?=###\s)/g)
  
  for (const part of parts) {
    if (!part.trim()) continue
    
    // Check for section headers
    const headerMatch = part.match(/^###\s+\d*\.?\s*(.+?)[\n\r]/)
    
    if (headerMatch && headerMatch[1]) {
      const title = headerMatch[1].toLowerCase().trim()
      const sectionContent = part.replace(/^###\s+\d*\.?\s*.+?[\n\r]/, '').trim()
      
      let type: ClinicalSectionType = 'general'
      
      if (title.includes('síntese') || title.includes('sintese') || title.includes('resumo')) {
        type = 'synthesis'
      } else if (title.includes('diagnóstic') || title.includes('diagnostic') || title.includes('hipótese')) {
        type = 'diagnosis'
      } else if (title.includes('evidência') || title.includes('evidencia') || title.includes('científic')) {
        type = 'evidence'
      } else if (title.includes('conduta') || title.includes('tratament') || title.includes('manejo')) {
        type = 'conduct'
      } else if (title.includes('sugestão') || title.includes('sugestao') || title.includes('sugest')) {
        type = 'suggestions'
      }
      
      sections.push({
        type,
        title: headerMatch[1].trim(),
        content: sectionContent,
      })
    } else {
      // Content without a header
      sections.push({
        type: 'general',
        title: '',
        content: part.trim(),
      })
    }
  }
  
  // If no sections found, return the whole content as general
  if (sections.length === 0) {
    return [{
      type: 'general',
      title: '',
      content: content,
    }]
  }
  
  return sections
}

/** Clinical Section Card Component */
function ClinicalSectionCard({ section, index }: { section: ClinicalSection; index: number }) {
  const config = sectionConfig[section.type]
  const Icon = config.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-white/60 dark:bg-white/5',
        'backdrop-blur-xl',
        'border border-white/30 dark:border-white/10',
        'shadow-[0_4px_24px_rgba(0,0,0,0.04)]',
        'border-l-4',
        config.borderColor
      )}
    >
      {/* Header */}
      {section.title && (
        <div className={cn(
          'flex items-center gap-2 px-4 py-3',
          'border-b border-white/20 dark:border-white/5',
          config.bgColor
        )}>
          <div className={cn('p-1.5 rounded-lg', config.bgColor)}>
            <Icon className={cn('h-4 w-4', config.color)} />
          </div>
          <span className={cn('text-sm font-semibold', config.color)}>
            {section.title}
          </span>
        </div>
      )}
      
      {/* Content */}
      <div className="p-4">
        <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-li:text-foreground/90">
          <ReactMarkdown
            components={{
              code: ({ className, children, ...props }) => {
                const isInline = !className
                return isInline ? (
                  <code
                    className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <code className={cn('block overflow-x-auto', className)} {...props}>
                    {children}
                  </code>
                )
              },
              a: ({ href, children }) => {
                // Security: only allow http/https URLs
                const isValidUrl = href && (href.startsWith('http://') || href.startsWith('https://'))
                if (!isValidUrl) {
                  return <span className="text-blue-500">{children}</span>
                }
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 underline underline-offset-2"
                  >
                    {children}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )
              },
              ul: ({ children }) => (
                <ul className="list-disc pl-4 space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-4 space-y-1">{children}</ol>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20 pl-4 py-2 italic text-amber-800 dark:text-amber-200">
                  {children}
                </blockquote>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">{children}</strong>
              ),
              // Style citations [Author - Journal - Year]
              p: ({ children }) => {
                const text = String(children)
                // Check for citation pattern
                if (text.match(/\[.+?\s*[-–]\s*.+?\s*[-–]\s*\d{4}\]/)) {
                  return (
                    <p className="flex items-start gap-2">
                      <BookOpen className="h-4 w-4 mt-0.5 text-emerald-500 shrink-0" />
                      <span>{children}</span>
                    </p>
                  )
                }
                return <p>{children}</p>
              },
            }}
          >
            {section.content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  )
}

export function MessageBubble({ role, content, isStreaming }: MessageBubbleProps) {
  const isUser = role === 'user'
  
  // Parse sections for assistant messages
  const sections = useMemo(() => {
    if (isUser) return []
    return parseClinicalSections(content)
  }, [content, isUser])
  
  // Determine if this is a structured clinical response
  const isStructuredResponse = sections.length > 1 || 
    (sections.length === 1 && sections[0] && sections[0].type !== 'general')

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex gap-3',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
      role="listitem"
      aria-label={isUser ? 'Mensagem do usuário' : 'Mensagem do ChatWell'}
      data-role={role}
    >
      {/* Avatar */}
      <div className="shrink-0">
        {isUser ? (
          <UserAvatar />
        ) : (
          <ChatWellAvatar size="md" isAnimating={isStreaming} />
        )}
      </div>

      {/* Message Content */}
      <div className={cn('flex flex-col gap-3 max-w-[85%]', isUser && 'items-end')}>
        {isUser ? (
          // User message - simple glass bubble
          <div
            className={cn(
              'rounded-2xl px-4 py-3',
              'bg-gradient-to-br from-blue-500 to-blue-600',
              'text-white shadow-[0_4px_16px_rgba(10,132,255,0.25)]'
            )}
          >
            <p className="text-sm leading-relaxed">{content}</p>
          </div>
        ) : isStructuredResponse ? (
          // Structured clinical response
          <div className="space-y-3 w-full">
            {sections.map((section, index) => (
              <ClinicalSectionCard 
                key={`${section.type}-${index}`} 
                section={section} 
                index={index}
              />
            ))}
          </div>
        ) : (
          // Simple assistant message
          <div
            className={cn(
              'rounded-2xl px-4 py-3',
              'bg-white/60 dark:bg-white/5',
              'backdrop-blur-xl',
              'border border-white/30 dark:border-white/10',
              'shadow-[0_4px_24px_rgba(0,0,0,0.04)]'
            )}
          >
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  a: ({ href, children }) => {
                    const isValidUrl = href && (href.startsWith('http://') || href.startsWith('https://'))
                    if (!isValidUrl) {
                      return <span className="text-blue-500">{children}</span>
                    }
                    return (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 underline"
                      >
                        {children}
                      </a>
                    )
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Streaming indicator */}
        <AnimatePresence>
          {isStreaming && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <motion.div
                className="h-1.5 w-1.5 rounded-full bg-blue-500"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <span className="text-blue-500 font-medium">Processando...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
