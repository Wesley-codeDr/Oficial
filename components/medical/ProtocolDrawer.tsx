'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Activity } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Complaint {
  id: string
  title: string
  riskLevel: 'low' | 'medium' | 'high'
  extendedContent?: {
    rawMarkdown?: string
  }
}

interface ProtocolDrawerProps {
  complaint: Complaint | null
  isOpen: boolean
  onClose: () => void
}

/**
 * Extrai seção específica do markdown
 */
function extractSection(markdown: string, sectionTitle: string): string {
  // Remove emojis para busca flexível
  const cleanTitle = sectionTitle.replace(/[\u{1F000}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/gu, '').trim()
  const escapedTitle = cleanTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  const regex = new RegExp(`##\\s*[^\\n]*${escapedTitle}[\\s\\S]*?(?=\\n##\\s|$)`, 'i')
  const match = markdown.match(regex)

  if (!match) return ''
  return match[0]
}

/**
 * Extrai múltiplas seções do markdown
 */
function extractSections(markdown: string) {
  return {
    acaoImediata: extractSection(markdown, 'AÇÃO IMEDIATA'),
    redFlags: extractSection(markdown, 'Red Flags'),
    calculadoras: extractSection(markdown, 'Calculadoras Clínicas'),
    medicamentos: extractSection(markdown, 'Protocolo Medicamentoso'),
    diagnosticoDiferencial: extractSection(markdown, 'Diagnóstico Diferencial'),
    adaptacoesSUS: extractSection(markdown, 'Adaptações'),
    referencias: extractSection(markdown, 'Referências EBM'),
  }
}

/**
 * Badge variant por risco
 */
function getRiskVariant(riskLevel: string): 'destructive' | 'default' | 'secondary' {
  switch (riskLevel) {
    case 'high':
      return 'destructive'
    case 'medium':
      return 'default'
    default:
      return 'secondary'
  }
}

export function ProtocolDrawer({ complaint, isOpen, onClose }: ProtocolDrawerProps) {
  if (!complaint) return null

  const markdown = complaint.extendedContent?.rawMarkdown || ''
  const sections = extractSections(markdown)

  // Detecta se é EBM v2.0 (tem seção de Ação Imediata)
  const isEBMv2 = !!sections.acaoImediata

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-3xl p-0 border-l border-white/20 dark:border-white/10 liquid-glass-material backdrop-blur-3xl shadow-2xl glass-texture"
      >
        <div className="h-full flex flex-col">
          <SheetHeader className="p-8 pb-6 border-b border-white/20 dark:border-white/10 shrink-0">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] opacity-80 mb-2">
                  Protocolo Baseado em Evidência
                </p>
                <SheetTitle className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter leading-tight">
                  {complaint.title}
                </SheetTitle>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge 
                  variant={getRiskVariant(complaint.riskLevel)}
                  className="px-4 py-1.5 rounded-xl font-black uppercase tracking-wider shadow-lg"
                >
                  Risco {complaint.riskLevel === 'high' ? 'Alto' : complaint.riskLevel === 'medium' ? 'Médio' : 'Baixo'}
                </Badge>
                {isEBMv2 && (
                   <span className="text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-500/10 px-2 py-0.5 rounded-lg border border-green-500/20">
                    EBM v2.0
                  </span>
                )}
              </div>
            </div>
          </SheetHeader>

          {!isEBMv2 ? (
            <div className="flex-1 flex items-center justify-center p-12 text-center">
              <div className="max-w-md space-y-6">
                 <div className="w-20 h-20 rounded-[28px] bg-slate-500/10 flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-xl">
                    <Activity className="w-10 h-10 text-slate-400" />
                 </div>
                 <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Conteúdo em Atualização</h3>
                 <p className="text-slate-500 dark:text-slate-400 font-bold text-sm leading-relaxed">
                   Este protocolo está sendo migrado para o padrão EBM v2.0. As diretrizes básicas estão integradas à tela de anamnese.
                 </p>
              </div>
            </div>
          ) : (
            <ScrollArea className="flex-1 custom-scrollbar">
              <div className="p-8 space-y-8 pb-32">
                <div className="grid grid-cols-1 gap-6">
                  {/* Seção Ação Imediata - DESTAQUE TOTAL */}
                  {sections.acaoImediata && (
                    <div className="liquid-glass-material bg-amber-500/10! dark:bg-amber-500/5! border-amber-500/30! p-8 rounded-[32px] shadow-amber-500/10 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
                         <span className="text-6xl italic font-black">10'</span>
                      </div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
                          <span className="text-2xl">⚡</span>
                        </div>
                        <h3 className="text-xl font-black text-amber-700 dark:text-amber-400 tracking-tight">
                          Ação Imediata (&lt;10min)
                        </h3>
                      </div>
                      <div className="prose prose-sm dark:prose-invert max-w-none text-amber-900/80 dark:text-amber-100/80 font-bold leading-relaxed">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {sections.acaoImediata}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}

                  <Accordion type="multiple" defaultValue={['red-flags']} className="space-y-5">
                    {/* Red Flags */}
                    {sections.redFlags && (
                      <AccordionItem value="red-flags" className="border-none">
                        <AccordionTrigger className="liquid-glass-material hover:no-underline px-6 py-4 rounded-[24px] glass-texture rim-highlight">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🚩</span>
                            <span className="text-base font-black tracking-tight text-slate-700 dark:text-slate-200">Red Flags (Alerta)</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 px-2">
                          <div className="prose prose-sm dark:prose-invert max-w-none bg-red-500/5 dark:bg-white/5 p-6 rounded-[24px] border border-red-500/10 text-red-700 dark:text-red-300 font-semibold leading-relaxed">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {sections.redFlags}
                            </ReactMarkdown>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )}

                    {/* Calculadoras Clínicas */}
                    {sections.calculadoras && (
                      <AccordionItem value="calculadoras" className="border-none">
                        <AccordionTrigger className="liquid-glass-material hover:no-underline px-6 py-4 rounded-[24px]">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">📊</span>
                            <span className="text-base font-black tracking-tight text-slate-700 dark:text-slate-200">Scores & Calculadoras</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 px-2">
                          <div className="prose prose-sm dark:prose-invert max-w-none p-6 rounded-[24px] bg-blue-500/5 dark:bg-white/5 border border-blue-500/10 text-slate-600 dark:text-slate-300 font-semibold">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {sections.calculadoras}
                            </ReactMarkdown>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )}

                    {/* Protocolo Medicamentoso */}
                    {sections.medicamentos && (
                      <AccordionItem value="medicamentos" className="border-none">
                        <AccordionTrigger className="liquid-glass-material hover:no-underline px-6 py-4 rounded-[24px]">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">💊</span>
                            <span className="text-base font-black tracking-tight text-slate-700 dark:text-slate-200">Prescrição Guiada</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 px-2">
                          <div className="prose prose-sm dark:prose-invert max-w-none p-6 rounded-[24px] bg-indigo-500/5 dark:bg-white/5 border border-indigo-500/10 text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {sections.medicamentos}
                            </ReactMarkdown>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )}

                    {/* Diagnóstico Diferencial */}
                    {sections.diagnosticoDiferencial && (
                      <AccordionItem value="dd" className="border-none">
                        <AccordionTrigger className="liquid-glass-material hover:no-underline px-6 py-4 rounded-[24px]">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">💡</span>
                            <span className="text-base font-black tracking-tight text-slate-700 dark:text-slate-200">Hipóteses Diferenciais</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 px-2">
                          <div className="prose prose-sm dark:prose-invert max-w-none p-6 rounded-[24px] bg-slate-500/5 dark:bg-white/5 border border-slate-500/10 text-slate-600 dark:text-slate-400 font-semibold italic">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {sections.diagnosticoDiferencial}
                            </ReactMarkdown>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )}

                    {/* Referências EBM */}
                    {sections.referencias && (
                      <AccordionItem value="referencias" className="border-none">
                        <AccordionTrigger className="liquid-glass-material hover:no-underline px-6 py-4 rounded-[24px]">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🔗</span>
                            <span className="text-base font-black tracking-tight text-slate-700 dark:text-slate-200">Referências MBE</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 px-2">
                          <div className="prose prose-sm dark:prose-invert max-w-none p-6 rounded-[24px] text-slate-400 text-[11px] font-bold">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {sections.referencias}
                            </ReactMarkdown>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>
                </div>
              </div>
            </ScrollArea>
          )}

          {/* Bottom Action */}
          <div className="p-8 border-t border-white/20 dark:border-white/10 liquid-glass-material bg-white/40! dark:bg-black/20! backdrop-blur-xl shrink-0 glass-texture">
             <button
               onClick={() => {
                 onClose()
                 // We need to trigger the selection from here if the user wants to start attendance
               }}
               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-[24px] shadow-xl shadow-blue-500/20 active:scale-95 transition-all text-base tracking-tight"
             >
               Iniciar Atendimento Baseado no Protocolo
             </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

