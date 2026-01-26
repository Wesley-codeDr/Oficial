# Guia de Exemplos - Apple Liquid Glass 2026

Este guia contém exemplos práticos de implementação do sistema de tema Apple Liquid Glass 2026.

## Índice

1. [Exemplo 1: Dashboard Card](#exemplo-1-dashboard-card)
2. [Exemplo 2: Chat Message](#exemplo-2-chat-message)
3. [Exemplo 3: Kanban Task](#exemplo-3-kanban-task)
4. [Exemplo 4: Medical Form](#exemplo-4-medical-form)
5. [Exemplo 5: Modal Dialog](#exemplo-5-modal-dialog)
6. [Exemplo 6: Theme Toggle](#exemplo-6-theme-toggle)

## Exemplo 1: Dashboard Card

Card de resumo com animações de hover e tap, mostrando tendência de crescimento.

```typescript
'use client';

import { HoverScale } from '@/components/animation/MicroInteractions';
import { GlassPanel } from '@/components/glass/GlassPanel';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export function DashboardCard({ title, value, icon, trend = 'neutral' }: DashboardCardProps) {
  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '→',
  };

  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400',
  };

  return (
    <HoverScale>
      <GlassPanel variant="default">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {icon}
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            {trend !== 'neutral' && (
              <span className={`text-xs font-bold ${trendColors[trend]}`}>
                {trendIcons[trend]}
              </span>
            )}
          </div>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </GlassPanel>
    </HoverScale>
  );
}
```

**Features:**
- Hover scale (1.02x)
- Tap scale (0.95x)
- Glassmorphism com backdrop-blur e saturate
- Indicador de tendência com ícones
- Animações suaves com física de mola

## Exemplo 2: Chat Message

Bubble de mensagem de chat com animação de fade in e suporte para envio do usuário.

```typescript
'use client';

import { GlassPanel } from '@/components/glass/GlassPanel';
import { FadeIn } from '@/components/animation/MicroInteractions';

interface MessageBubbleProps {
  message: string;
  sender: 'user' | 'assistant';
  timestamp: string;
}

export function MessageBubble({ message, sender, timestamp }: MessageBubbleProps) {
  return (
    <FadeIn>
      <GlassPanel variant={sender === 'user' ? 'elevated' : 'default'}>
        <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className="max-w-[70%]">
            <p className="text-sm">{message}</p>
            <p className="text-xs text-gray-400 mt-1">{timestamp}</p>
          </div>
        </div>
      </GlassPanel>
    </FadeIn>
  );
}
```

**Features:**
- Fade in animation (opacity: 0 → 1, scale: 0.9 → 1)
- Glassmorphism diferenciado por tipo de mensagem
- Layout responsivo (justify-end para usuário, justify-start para assistente)
- Timestamp em cor cinza claro

## Exemplo 3: Kanban Task

Card de tarefa de Kanban com animações de slide up e tap scale, indicando prioridade.

```typescript
'use client';

import { GlassPanel } from '@/components/glass/GlassPanel';
import { TapScale, SlideUp } from '@/components/animation/MicroInteractions';

interface KanbanTaskProps {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  onEdit: () => void;
  onDelete: () => void;
}

export function KanbanTask({ title, description, priority, onEdit, onDelete }: KanbanTaskProps) {
  const glassClasses = 'glass-default'; // useGlassClasses('default');

  const priorityColors = {
    low: 'text-blue-400',
    medium: 'text-yellow-400',
    high: 'text-red-400',
  };

  const priorityBorders = {
    low: 'border-blue-400',
    medium: 'border-yellow-400',
    high: 'border-red-400',
  };

  return (
    <SlideUp>
      <TapScale>
        <GlassPanel variant="default">
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold">{title}</h3>
              <div className="flex gap-2">
                <button 
                  onClick={onEdit}
                  className="text-xs hover:opacity-80"
                >
                  Editar
                </button>
                <button 
                  onClick={onDelete}
                  className="text-xs text-red-400 hover:opacity-80"
                >
                  Excluir
                </button>
              </div>
            </div>
            <p className={`text-xs px-2 py-1 rounded ${priorityColors[priority]} ${priorityBorders[priority]}`}>
              Prioridade: {priority}
            </p>
            <p className="text-sm mt-2">{description}</p>
          </div>
        </GlassPanel>
      </TapScale>
    </SlideUp>
  );
}
```

**Features:**
- Slide up animation (y: 20 → 0, opacity: 0 → 1, scale: 0.9 → 1)
- Tap scale (0.95x)
- Indicadores de prioridade com cores e bordas
- Animações suaves com física de mola

## Exemplo 4: Medical Form

Formulário médico com variant glass e validação de campo.

```typescript
'use client';

import { GlassPanel } from '@/components/glass/GlassPanel';
import { Shimmer } from '@/components/animation/MicroInteractions';

interface MedicalFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export function MedicalForm({ onSubmit, isLoading }: MedicalFormProps) {
  return (
    <GlassPanel variant="medical">
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const data = Object.fromEntries(formData);
          onSubmit(data);
        }}
        className="space-y-4"
      >
        <div>
          <label className="text-sm mb-1">Nome do Paciente</label>
          <input 
            type="text" 
            name="name" 
            className="w-full p-2 rounded-md bg-white/10 backdrop-blur-sm"
            placeholder="Digite o nome completo"
            required
          />
        </div>

        <div>
          <label className="text-sm mb-1">Idade</label>
          <input 
            type="number" 
            name="age" 
            className="w-full p-2 rounded-md bg-white/10 backdrop-blur-sm"
            min="0" 
            max="120"
            required
          />
        </div>

        <div>
          <label className="text-sm mb-1">Histórico Médico</label>
          <textarea 
            name="history" 
            className="w-full p-2 rounded-md bg-white/10 backdrop-blur-sm"
            rows="3"
            placeholder="Histórico de condições anteriores"
            required
          />
        </div>

        {isLoading ? (
          <Shimmer>
            <button 
              type="submit"
              disabled
              className="w-full p-3 rounded-md bg-blue-500 text-white font-medium opacity-50 cursor-not-allowed"
            >
              Enviando...
            </button>
          </Shimmer>
        ) : (
          <button 
            type="submit"
            className="w-full p-3 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
          >
            Enviar
          </button>
        )}
      </form>
    </GlassPanel>
  );
}
```

**Features:**
- Medical variant (opacidade otimizada para componentes médicos)
- Shimmer effect durante loading
- Inputs com glassmorphism suave
- Validação de campos obrigatórios
- Estados de hover e disabled

## Exemplo 5: Modal Dialog

Modal dialog com animações de entrada e saída usando AnimatedPresence.

```typescript
'use client';

import { GlassPanel } from '@/components/glass/GlassPanel';
import { AnimatedPresence } from '@/components/animation/MicroInteractions';

interface ModalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function ModalDialog({ isOpen, onClose, title, children }: ModalDialogProps) {
  return (
    <AnimatedPresence show={isOpen}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <AnimatedPresence show={isOpen}>
          <GlassPanel variant="elevated">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="mb-4">
                {children}
              </div>
              <button 
                onClick={onClose}
                className="w-full p-3 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Fechar
              </button>
            </div>
          </div>
        </GlassPanel>
      </div>
    </AnimatedPresence>
  );
}
```

**Features:**
- Animações de entrada e saída (scale + opacity)
- Backdrop escuro para foco
- GlassPanel elevado com backdrop-blur
- Botão de fechar com hover
- Animações suaves com física de mola

## Exemplo 6: Theme Toggle

Botão para alternar entre light mode e dark mode.

```typescript
'use client';

import { useTheme } from '@/lib/theme/hooks';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button 
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-4 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
      title={theme === 'dark' ? 'Mudar para Light Mode' : 'Mudar para Dark Mode'}
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
```

**Features:**
- Alternância entre light mode e dark mode
- Ícones dinâmicos (☀️ para light, 🌙 para dark)
- Glassmorphism no botão
- Hover effect com aumento de opacidade

## Exemplos Combinados

### Dashboard com Múltiplos Cards

```typescript
'use client';

import { DashboardCard } from './DashboardCard';

export function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Pacientes Ativos"
        value="1,234"
        icon="👥"
        trend="up"
      />
      <DashboardCard
        title="Consultas Hoje"
        value="456"
        icon="📋"
        trend="up"
      />
      <DashboardCard
        title="Receita Mensal"
        value="R$ 45.678,00"
        icon="💰"
        trend="down"
      />
    </div>
  );
}
```

### Chat com Múltiplas Mensagens

```typescript
'use client';

import { useState } from 'react';
import { MessageBubble } from './MessageBubble';

export function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá! Como posso ajudar?', sender: 'assistant', time: '10:00' },
    { id: 2, text: 'Preciso de ajuda com anamnese', sender: 'user', time: '10:05' },
  ]);

  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: input,
        sender: 'user',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="space-y-4 mb-4">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg.text}
            sender={msg.sender}
            timestamp={msg.time}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="w-full p-4 rounded-full bg-white/10 backdrop-blur-md pr-12 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="absolute right-4 top-1/2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
```

## Boas Práticas

### 1. Compor com Componentes Reutilizáveis

Use sempre os componentes reutilizáveis do sistema de tema para manter consistência.

```typescript
// ✅ BOM
import { GlassPanel, HoverScale, FadeIn } from '@/components';

export function MyComponent() {
  return (
    <HoverScale>
      <GlassPanel variant="default">
        <FadeIn>
          <div>Conteúdo</div>
        </FadeIn>
      </GlassPanel>
    </HoverScale>
  );
}
```

### 2. Acessibilidade

Adicione suporte para prefers-reduced-motion e prefers-reduced-transparency.

```typescript
'use client';

import { GlassPanel } from '@/components/glass/GlassPanel';
import { motion } from 'framer-motion';

export function AccessibleComponent({ children }: { children: React.ReactNode }) {
  return (
    <GlassPanel variant="default">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // Desabilitar animações para usuários que preferem
        transition={{ duration: 0.01 }}
      >
        {children}
      </motion.div>
    </GlassPanel>
  );
}
```

### 3. Performance

Otimize componentes com GPU acceleration e CSS containment.

```typescript
export function OptimizedComponent() {
  return (
    <div className="gpu-accelerated">
      <div className="contain-layout-style-paint">
        <div className="will-change-transform-opacity">
          <h1>Componente Otimizado</h1>
        </div>
      </div>
    </div>
  );
}
```

### 4. Testing

Teste componentes em ambos light mode e dark mode.

```typescript
import { useTheme } from '@/lib/theme/hooks';

export function MyComponent() {
  const { theme } = useTheme();
  
  return (
    <div className={theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}>
      <GlassPanel variant="default">
        <h1>Conteúdo adaptado ao tema</h1>
      </GlassPanel>
    </div>
  );
}
```

## Recursos Adicionais

- [Guia de Início Rápido](./QUICKSTART.md)
- [Guia de Uso Completo](./USO_COMPLETO.md)
- [Guia de Componentes](./COMPONENTES.md)
- [Documentação Oficial](../README.md)
- [Tokens de Design](../../lib/theme/tokens.ts)
- [Hooks de Tema](../../lib/theme/hooks.ts)

## Suporte

Para dúvidas ou problemas, consulte a documentação ou abra uma issue no repositório.
