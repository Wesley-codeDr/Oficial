'use client'

import * as React from 'react'
import { Users } from 'lucide-react'
import { useShiftTimer } from '@/hooks/use-shift-timer'
import { cn } from '@/lib/utils'

interface WelcomeHeaderProps {
  doctorName?: string
  patientsAttended?: number
  className?: string
}

// Motivational quotes - Apple-style concise
const motivationalQuotes = [
  'Cada paciente é uma história que merece cuidado.',
  'Sua dedicação transforma vidas.',
  'A excelência está nos detalhes.',
  'Cuidar é a melhor forma de curar.',
  'Seu plantão faz a diferença.',
]

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'Bom dia'
  if (hour >= 12 && hour < 18) return 'Boa tarde'
  return 'Boa noite'
}

function getRandomQuote(): string {
  const today = new Date().toDateString()
  const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const index = seed % motivationalQuotes.length
  return motivationalQuotes[index] ?? motivationalQuotes[0] ?? 'Cada paciente é uma história que merece cuidado.'
}

export function WelcomeHeader({
  doctorName,
  patientsAttended = 0,
  className,
}: WelcomeHeaderProps) {
  const { elapsed, isActive } = useShiftTimer()
  const greeting = getGreeting()
  const quote = React.useMemo(getRandomQuote, [])
  
  const nameToDisplay = doctorName || 'Doutor'
  
  return (
    <div className={cn('welcome-card-header w-full flex flex-col gap-6', className)}>
      {/* Top Section: Avatar + Greeting and Badges */}
      <div className="flex justify-between items-start w-full">
        <div className="flex items-center gap-4">
          {/* Doctor Avatar */}
          <div className="doctor-avatar">
            {nameToDisplay.charAt(0)}
          </div>
          
          <div className="greeting-text">
            <h2 className="text-[28px] font-semibold text-[#1A1A2E] dark:text-[#f3f4f6] m-0 leading-tight">
              {greeting}, Dr. {nameToDisplay}
            </h2>
            <p className="text-[14px] font-normal text-[#6B7280] dark:text-[#9ca3af] m-0 mt-1">
              {quote}
            </p>
          </div>
        </div>

        {/* Status Badges - Top Right */}
        <div className="status-badges flex flex-col items-end gap-2">
          <div className={cn(
            'badge flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all',
            isActive ? 'badge-active' : 'badge-inactive'
          )}>
            <div className={cn('w-2 h-2 rounded-full', isActive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400')} />
            {isActive ? elapsed : 'Inativo'}
          </div>
          <div className="badge badge-patients flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium bg-[#DBEAFE] text-[#1E40AF] border-[#93C5FD]">
            <Users className="w-4 h-4" />
            {patientsAttended} atendidos
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider h-[1px] w-full bg-[#E5E7EB] dark:bg-[#374151] opacity-50" />

      {/* Contextual Footer Info */}
      <div className="flex items-center gap-4 text-[12px] font-semibold text-[#9CA3AF] uppercase tracking-[0.5px]">
        <span>Plantão iniciado às 19:00</span>
        <span className="text-[#E5E7EB] dark:text-[#374151]">|</span>
        <span>Turno: Noturno</span>
        <span className="text-[#E5E7EB] dark:text-[#374151]">|</span>
        <span>UPA Centro</span>
      </div>

      <style jsx>{`
        .doctor-avatar {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: linear-gradient(135deg, #0077B6 0%, #2A9D8F 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 20px;
          box-shadow: 0 4px 12px rgba(0, 119, 182, 0.2);
        }

        .badge {
          border: 1px solid transparent;
        }

        .badge-inactive {
          background: #FEF3C7;
          color: #92400E;
          border-color: #FCD34D;
        }

        .badge-active {
          background: #E8F5E9;
          color: #2E7D32;
          border-color: #A5D6A7;
        }

        .badge-patients {
          background: #DBEAFE;
          color: #1E40AF;
          border-color: #93C5FD;
        }
      `}</style>
    </div>
  )
}

