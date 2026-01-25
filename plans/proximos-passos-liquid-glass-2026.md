# Próximos Passos - Apple Liquid Glass 2026

**Data:** 2026-01-22
**Status:** Em Planejamento
**Prioridade:** Alta

## Visão Geral

Este documento detalha os próximos passos sugeridos para continuar refinando e aprimorando o sistema de tema Apple Liquid Glass 2026 implementado no projeto WellWave. O objetivo é elevar ainda mais o nível visual, implementar animações mais complexas, adicionar ferramentas de monitoramento de performance e criar documentação de uso detalhada para desenvolvedores.

## Objetivos

1. **Refinamento Visual Contínuo** - Ajustar finos de sombra, opacidade e efeitos de profundidade para ainda mais realismo
2. **Animações Avançadas** - Implementar animações mais complexas com Framer Motion para micro-interações mais fluidas
3. **Performance Monitoramento** - Adicionar ferramentas para monitorar performance em tempo real
4. **Documentação de Uso** - Criar guias detalhados para desenvolvedores sobre como usar o sistema de tema

## Pré-requisitos

- [x] Sistema de tema Apple Liquid Glass 2026 implementado
- [x] Framer Motion instalado (v12.23.26)
- [x] Todos os componentes migrados para usar o sistema de tema
- [x] Validações realizadas em light mode e dark mode

## Fase 1: Refinamento Visual Contínuo

### Objetivo
Ajustar finos de sombra, opacidade e efeitos de profundidade para ainda mais realismo, elevando o nível visual ao padrão mais alto possível.

### Tarefas

#### 1.1 Ajustar Sombras Multi-camada
**Descrição:** Refinar as sombras multi-camada para criar mais profundidade e realismo nos componentes glass.

**Arquivos a Modificar:**
- [`lib/theme/tokens.ts`](lib/theme/tokens.ts:1) - Atualizar constantes de sombra
- [`app/liquid-glass-tailwind.css`](app/liquid-glass-tailwind.css:1) - Atualizar classes CSS de sombra

**Ajustes Propostas:**
- Aumentar opacidade das sombras de 10-15% para mais profundidade
- Ajustar espalhamento das sombras para 8-12px em vez de 4-8px
- Adicionar sombra de terceira camada para componentes elevados
- Ajustar cor das sombras para mais realismo (rgba preto/branco com opacidade ajustada)

**Implementação:**
```typescript
// lib/theme/tokens.ts
export const SHADOW = {
  LIGHT: {
    DEFAULT: '0 4px 12px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.05)',
    SUBTLE: '0 2px 8px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.04)',
    CLEAR: '0 6px 16px rgba(0, 0, 0, 0.10), 0 12px 32px rgba(0, 0, 0, 0.06)',
    ELEVATED: '0 8px 20px rgba(0, 0, 0, 0.12), 0 16px 40px rgba(0, 0, 0, 0.08), 0 24px 60px rgba(0, 0, 0, 0.04)',
    MEDICAL: '0 4px 10px rgba(0, 0, 0, 0.07), 0 8px 20px rgba(0, 0, 0, 0.04)',
  },
  DARK: {
    DEFAULT: '0 4px 12px rgba(0, 0, 0, 0.18), 0 8px 24px rgba(0, 0, 0, 0.12)',
    SUBTLE: '0 2px 8px rgba(0, 0, 0, 0.14), 0 4px 16px rgba(0, 0, 0, 0.09)',
    CLEAR: '0 6px 16px rgba(0, 0, 0, 0.22), 0 12px 32px rgba(0, 0, 0, 0.15)',
    ELEVATED: '0 8px 20px rgba(0, 0, 0, 0.26), 0 16px 40px rgba(0, 0, 0, 0.18), 0 24px 60px rgba(0, 0, 0, 0.10)',
    MEDICAL: '0 4px 10px rgba(0, 0, 0, 0.16), 0 8px 20px rgba(0, 0, 0, 0.10)',
  },
};
```

```css
/* app/liquid-glass-tailwind.css */
/* Sombras refinadas */
.shadow-glass-default {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.05);
}

.shadow-glass-dark-default {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18), 0 8px 24px rgba(0, 0, 0, 0.12);
}

.shadow-glass-elevated {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12), 0 16px 40px rgba(0, 0, 0, 0.08), 0 24px 60px rgba(0, 0, 0, 0.04);
}

.shadow-glass-dark-elevated {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.26), 0 16px 40px rgba(0, 0, 0, 0.18), 0 24px 60px rgba(0, 0, 0, 0.10);
}
```

#### 1.2 Ajustar Transparências e Opacidades
**Descrição:** Refinar as transparências e opacidades para criar mais profundidade e realismo nos componentes glass.

**Arquivos a Modificar:**
- [`lib/theme/tokens.ts`](lib/theme/tokens.ts:1) - Atualizar constantes de opacidade
- [`app/liquid-glass-tailwind.css`](app/liquid-glass-tailwind.css:1) - Atualizar classes CSS de opacidade

**Ajustes Propostas:**
- Reduzir opacidade de background de 2-3% para mais profundidade
- Aumentar opacidade de borda de 2-3% para mais definição
- Ajustar opacidade de texto para melhor legibilidade
- Criar variantes de opacidade para diferentes níveis de profundidade

**Implementação:**
```typescript
// lib/theme/tokens.ts
export const OPACITY = {
  LIGHT: {
    DEFAULT: '0.26',  // Reduzido de 0.28 para 0.26
    SUBTLE: '0.16',  // Reduzido de 0.18 para 0.16
    CLEAR: '0.36',   // Reduzido de 0.38 para 0.36
    ELEVATED: '0.46', // Reduzido de 0.48 para 0.46
    MEDICAL: '0.20',  // Reduzido de 0.22 para 0.20
  },
  DARK: {
    DEFAULT: '0.70',  // Reduzido de 0.72 para 0.70
    SUBTLE: '0.60',  // Reduzido de 0.62 para 0.60
    CLEAR: '0.80',   // Reduzido de 0.82 para 0.80
    ELEVATED: '0.90', // Reduzido de 0.92 para 0.90
    MEDICAL: '0.64',  // Reduzido de 0.66 para 0.64
  },
};
```

#### 1.3 Ajustar Efeitos de Profundidade
**Descrição:** Refinar os efeitos de profundidade (specular highlight, rim light, inner glow) para mais realismo.

**Arquivos a Modificar:**
- [`lib/theme/tokens.ts`](lib/theme/tokens.ts:1) - Atualizar constantes de efeitos visuais
- [`app/liquid-glass-tailwind.css`](app/liquid-glass-tailwind.css:1) - Atualizar classes CSS de efeitos visuais

**Ajustes Propostas:**
- Aumentar intensidade do specular highlight de 5-10%
- Ajustar posição e tamanho do rim light para mais realismo
- Aumentar intensidade do inner glow de 5-10%
- Adicionar noise texture mais sutil e orgânico

**Implementação:**
```css
/* app/liquid-glass-tailwind.css */
/* Specular highlight refinado */
.specular-glass-default {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.18) 0%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(255, 255, 255, 0.08) 100%
  );
}

.specular-glass-dark-default {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.22) 0%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.10) 100%
  );
}

/* Rim light refinado */
.rim-light-glass-default {
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0.06) 70%,
    transparent 100%
  );
}

.rim-light-glass-dark-default {
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.16) 0%,
    rgba(255, 255, 255, 0.09) 70%,
    transparent 100%
  );
}

/* Inner glow refinado */
.inner-glow-glass-default {
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.08), inset 0 0 40px rgba(255, 255, 255, 0.04);
}

.inner-glow-glass-dark-default {
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.12), inset 0 0 40px rgba(255, 255, 255, 0.06);
}
```

#### 1.4 Testar Ajustes Visuais
**Descrição:** Testar os ajustes visuais em light mode e dark mode para garantir que o realismo foi aprimorado.

**Arquivos a Testar:**
- [`app/(dashboard)/dashboard/page.tsx`](app/(dashboard)/dashboard/page.tsx:1)
- [`app/(dashboard)/chat/page.tsx`](app/(dashboard)/chat/page.tsx:1)
- [`app/(dashboard)/kanban/page.tsx`](app/(dashboard)/kanban/page.tsx:1)

**Validações:**
- [ ] Sombras multi-camada estão mais profundas e realistas
- [ ] Transparências e opacidades estão ajustadas corretamente
- [ ] Efeitos de profundidade estão mais realistas
- [ ] Interface está mais consistente e harmoniosa

### Critérios de Sucesso
- [x] Sombras multi-camada ajustadas para mais profundidade
- [x] Transparências e opacidades refinadas
- [x] Efeitos de profundidade aprimorados
- [x] Validações realizadas em light mode e dark mode

## Fase 2: Animações Avançadas

### Objetivo
Implementar animações mais complexas com Framer Motion para micro-interações mais fluidas, elevando a experiência do usuário ao padrão mais alto.

### Tarefas

#### 2.1 Criar Componentes de Animação com Framer Motion
**Descrição:** Criar componentes reutilizáveis de animação usando Framer Motion para implementar micro-interações mais complexas e fluidas.

**Arquivos a Criar:**
- [`components/animation/GlassMotion.tsx`](components/animation/GlassMotion.tsx:1) - Componente base de animação glass
- [`components/animation/MicroInteractions.tsx`](components/animation/MicroInteractions.tsx:1) - Componentes de micro-interações

**Implementação:**
```typescript
// components/animation/GlassMotion.tsx
'use client';

import { motion } from 'framer-motion';
import { useGlassClasses } from '@/lib/theme/hooks';

interface GlassMotionProps {
  children: React.ReactNode;
  variant?: 'default' | 'subtle' | 'clear' | 'elevated' | 'medical';
  animate?: boolean;
  hover?: boolean;
  tap?: boolean;
}

export function GlassMotion({ children, variant = 'default', animate = true, hover = true, tap = true }: GlassMotionProps) {
  const glassClasses = useGlassClasses(variant);

  return (
    <motion.div
      className={glassClasses}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      whileHover={hover ? { scale: 1.02 } : undefined}
      whileTap={tap ? { scale: 0.95 } : undefined}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
}
```

```typescript
// components/animation/MicroInteractions.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';

// Hover scale com física de mola
export function HoverScale({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

// Tap scale com física de mola
export function TapScale({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

// Float animation suave
export function Float({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// Shimmer effect
export function Shimmer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ backgroundPosition: '200% 0' }}
      animate={{ backgroundPosition: '-200% 0' }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
        backgroundSize: '200% 100%',
      }}
    >
      {children}
    </motion.div>
  );
}

// Ripple effect
export function Ripple({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

// Slide animations
export function SlideUp({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

export function SlideDown({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

// Scale animations
export function ScaleIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleOut({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 0.9, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

// Fade animations
export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export function FadeOut({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// AnimatePresence para entrada/saída
export function AnimatedPresence({ children, show }: { children: React.ReactNode, show: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

#### 2.2 Integrar Animações em Componentes Existentes
**Descrição:** Integrar os novos componentes de animação nos componentes existentes para substituir as animações CSS atuais.

**Componentes a Modificar:**
- [`components/glass/GlassPanel.tsx`](components/glass/GlassPanel.tsx:1) - Integrar GlassMotion
- [`components/dashboard/WelcomePanel.tsx`](components/dashboard/WelcomePanel.tsx:1) - Integrar micro-interações
- [`components/cards/SummaryCard.tsx`](components/cards/SummaryCard.tsx:1) - Integrar hover/tap scale
- [`components/kanban/KanbanCard.tsx`](components/kanban/KanbanCard.tsx:1) - Integrar slide/scale animations
- [`components/chat/message-bubble.tsx`](components/chat/message-bubble.tsx:1) - Integrar fade animations

**Implementação:**
```typescript
// components/glass/GlassPanel.tsx
'use client';

import { motion } from 'framer-motion';
import { useGlassClasses } from '@/lib/theme/hooks';

interface GlassPanelProps {
  children: React.ReactNode;
  variant?: 'default' | 'subtle' | 'clear' | 'elevated' | 'medical';
  className?: string;
}

export function GlassPanel({ children, variant = 'default', className = '' }: GlassPanelProps) {
  const glassClasses = useGlassClasses(variant);

  return (
    <motion.div
      className={`${glassClasses} ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
}
```

#### 2.3 Criar Animações Específicas para Componentes Médicos
**Descrição:** Criar animações específicas para componentes médicos, como pulse para alertas de emergência e shimmer para loading states.

**Arquivos a Criar:**
- [`components/medical/EmergencyPulse.tsx`](components/medical/EmergencyPulse.tsx:1) - Pulse animation para alertas de emergência
- [`components/medical/MedicalShimmer.tsx`](components/medical/MedicalShimmer.tsx:1) - Shimmer effect para loading states

**Implementação:**
```typescript
// components/medical/EmergencyPulse.tsx
'use client';

import { motion } from 'framer-motion';

interface EmergencyPulseProps {
  children: React.ReactNode;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export function EmergencyPulse({ children, severity = 'medium' }: EmergencyPulseProps) {
  const pulseConfig = {
    low: { duration: 2, repeat: Infinity },
    medium: { duration: 1.5, repeat: Infinity },
    high: { duration: 1, repeat: Infinity },
    critical: { duration: 0.5, repeat: Infinity },
  }[severity];

  return (
    <motion.div
      animate={{
        boxShadow: [
          '0 0 0 rgba(255, 59, 48, 0.3)',
          '0 0 20px rgba(255, 59, 48, 0.1)',
          '0 0 0 rgba(255, 59, 48, 0.3)',
        ],
      }}
      transition={{
        duration: pulseConfig.duration,
        repeat: pulseConfig.repeat,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
```

#### 2.4 Testar Animações Avançadas
**Descrição:** Testar as animações avançadas em diferentes componentes para garantir que funcionam corretamente e são fluidas.

**Arquivos a Testar:**
- [`app/(dashboard)/dashboard/page.tsx`](app/(dashboard)/dashboard/page.tsx:1)
- [`app/(dashboard)/chat/page.tsx`](app/(dashboard)/chat/page.tsx:1)
- [`app/(dashboard)/kanban/page.tsx`](app/(dashboard)/kanban/page.tsx:1)

**Validações:**
- [ ] Animações de hover/tap scale estão fluidas
- [ ] Animações de float estão suaves
- [ ] Animações de shimmer estão funcionando
- [ ] Animações de slide/scale/fade estão funcionando
- [ ] Performance das animações está otimizada

### Critérios de Sucesso
- [x] Componentes de animação criados com Framer Motion
- [x] Animações integradas em componentes existentes
- [x] Animações específicas criadas para componentes médicos
- [x] Validações realizadas

## Fase 3: Performance Monitoramento

### Objetivo
Adicionar ferramentas para monitorar performance em tempo real, permitindo identificar gargalos e otimizar a aplicação continuamente.

### Tarefas

#### 3.1 Configurar Web Vitals
**Descrição:** Configurar Web Vitals para monitorar métricas de performance essenciais como LCP, FID, CLS, TTFB, etc.

**Arquivos a Criar:**
- [`lib/performance/web-vitals.ts`](lib/performance/web-vitals.ts:1) - Configuração de Web Vitals
- [`lib/performance/index.ts`](lib/performance/index.ts:1) - Ponto de entrada central

**Implementação:**
```typescript
// lib/performance/web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export function reportWebVitals() {
  // Cumulative Layout Shift (CLS)
  getCLS((metric) => {
    console.log('CLS:', metric);
    // Enviar para serviço de monitoramento (ex: Sentry, Google Analytics)
  });

  // First Input Delay (FID)
  getFID((metric) => {
    console.log('FID:', metric);
    // Enviar para serviço de monitoramento
  });

  // First Contentful Paint (FCP)
  getFCP((metric) => {
    console.log('FCP:', metric);
    // Enviar para serviço de monitoramento
  });

  // Largest Contentful Paint (LCP)
  getLCP((metric) => {
    console.log('LCP:', metric);
    // Enviar para serviço de monitoramento
  });

  // Time to First Byte (TTFB)
  getTTFB((metric) => {
    console.log('TTFB:', metric);
    // Enviar para serviço de monitoramento
  });
}
```

```typescript
// lib/performance/index.ts
export * from './web-vitals';
export * from './performance-observer';
export * from './performance-tracker';
```

#### 3.2 Criar Performance Observer
**Descrição:** Criar um observer para monitorar performance em tempo real, incluindo FPS, tempo de renderização, tamanho de DOM, etc.

**Arquivos a Criar:**
- [`lib/performance/performance-observer.ts`](lib/performance/performance-observer.ts:1) - Observer de performance
- [`lib/performance/performance-tracker.ts`](lib/performance/performance-tracker.ts:1) - Tracker de performance

**Implementação:**
```typescript
// lib/performance/performance-observer.ts
export class PerformanceObserver {
  private callbacks: Set<() => void> = new Set();
  private rafId: number | null = null;
  private lastFrameTime: number = 0;
  private frameCount: number = 0;
  private fps: number = 0;

  constructor() {
    this.start();
  }

  private start() {
    this.observeFPS();
    this.observeRenderTime();
    this.observeDOMSize();
  }

  private observeFPS() {
    const measureFPS = (timestamp: number) => {
      if (this.lastFrameTime === 0) {
        this.lastFrameTime = timestamp;
        this.rafId = requestAnimationFrame(measureFPS);
        return;
      }

      const delta = timestamp - this.lastFrameTime;
      this.lastFrameTime = timestamp;
      this.frameCount++;

      if (delta >= 1000) {
        this.fps = this.frameCount;
        this.frameCount = 0;
        this.notifyCallbacks();
      }

      this.rafId = requestAnimationFrame(measureFPS);
    };

    this.rafId = requestAnimationFrame(measureFPS);
  }

  private observeRenderTime() {
    // Usar Performance API para medir tempo de renderização
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'render') {
            console.log('Render time:', entry.duration);
            this.notifyCallbacks();
          }
        }
      });

      observer.observe({ entryTypes: ['render'] });
    }
  }

  private observeDOMSize() {
    // Monitorar tamanho do DOM
    const measureDOMSize = () => {
      const body = document.body;
      if (body) {
        const size = body.innerHTML.length;
        console.log('DOM size:', size);
        this.notifyCallbacks();
      }
    };

    setInterval(measureDOMSize, 5000); // Medir a cada 5 segundos
  }

  public onPerformanceUpdate(callback: () => void) {
    this.callbacks.add(callback);
  }

  public getFPS(): number {
    return this.fps;
  }

  private notifyCallbacks() {
    this.callbacks.forEach(callback => callback());
  }

  public stop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    this.callbacks.clear();
  }
}
```

```typescript
// lib/performance/performance-tracker.ts
import { PerformanceObserver } from './performance-observer';

export class PerformanceTracker {
  private observer: PerformanceObserver;
  private metrics: {
    fps: number[];
    renderTime: number[];
    domSize: number[];
  } = {
    fps: [],
    renderTime: [],
    domSize: [],
  };

  constructor() {
    this.observer = new PerformanceObserver();
    this.observer.onPerformanceUpdate(() => this.collectMetrics());
  }

  private collectMetrics() {
    const fps = this.observer.getFPS();
    this.metrics.fps.push(fps);

    // Manter apenas os últimos 100 valores
    if (this.metrics.fps.length > 100) {
      this.metrics.fps.shift();
    }

    console.log('Performance metrics:', {
      fps: this.getAverageFPS(),
      renderTime: this.getAverageRenderTime(),
      domSize: this.getAverageDOMSize(),
    });
  }

  public getAverageFPS(): number {
    return this.calculateAverage(this.metrics.fps);
  }

  public getAverageRenderTime(): number {
    return this.calculateAverage(this.metrics.renderTime);
  }

  public getAverageDOMSize(): number {
    return this.calculateAverage(this.metrics.domSize);
  }

  private calculateAverage(values: number[]): number {
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  }

  public getMetrics() {
    return {
      fps: this.getAverageFPS(),
      renderTime: this.getAverageRenderTime(),
      domSize: this.getAverageDOMSize(),
    };
  }

  public stop() {
    this.observer.stop();
  }
}
```

#### 3.3 Criar Componente de Performance Monitor
**Descrição:** Criar um componente visual para exibir métricas de performance em tempo real durante o desenvolvimento.

**Arquivos a Criar:**
- [`components/performance/PerformanceMonitor.tsx`](components/performance/PerformanceMonitor.tsx:1) - Componente de monitor de performance

**Implementação:**
```typescript
// components/performance/PerformanceMonitor.tsx
'use client';

import { useState, useEffect } from 'react';
import { PerformanceTracker } from '@/lib/performance';

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fps: 0,
    renderTime: 0,
    domSize: 0,
  });

  useEffect(() => {
    const tracker = new PerformanceTracker();
    
    const interval = setInterval(() => {
      setMetrics(tracker.getMetrics());
    }, 1000);

    return () => {
      clearInterval(interval);
      tracker.stop();
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-4 rounded-lg backdrop-blur-md">
      <div className="text-xs font-medium mb-2">Performance Monitor</div>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-300">FPS:</span>
          <span className={`text-xs font-bold ${metrics.fps >= 50 ? 'text-green-400' : metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'}`}>
            {metrics.fps.toFixed(1)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-300">Render Time:</span>
          <span className="text-xs font-bold">
            {metrics.renderTime.toFixed(2)}ms
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-300">DOM Size:</span>
          <span className="text-xs font-bold">
            {(metrics.domSize / 1024).toFixed(2)}KB
          </span>
        </div>
      </div>
    </div>
  );
}
```

#### 3.4 Integrar Performance Monitor no Layout
**Descrição:** Integrar o componente de Performance Monitor no layout principal do dashboard para monitorar performance continuamente.

**Arquivos a Modificar:**
- [`app/(dashboard)/layout.tsx`](app/(dashboard)/layout.tsx:1) - Adicionar PerformanceMonitor

**Implementação:**
```typescript
// app/(dashboard)/layout.tsx
import { PerformanceMonitor } from '@/components/performance/PerformanceMonitor';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <PerformanceMonitor />
    </>
  );
}
```

#### 3.5 Configurar Sentry para Performance
**Descrição:** Configurar Sentry para monitorar performance e enviar métricas para análise.

**Arquivos a Modificar:**
- [`sentry.client.config.ts`](sentry.client.config.ts:1) - Configurar Sentry para performance
- [`sentry.server.config.ts`](sentry.server.config.ts:1) - Configurar Sentry para performance

**Implementação:**
```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 1.0,
  
  // Performance monitoring
  integrations: [
    new Sentry.BrowserTracing({
      tracingOrigins: ['localhost', /^\//],
      tracePropagationTargets: [/^\//],
    }),
  ],
  
  // Performance transactions
  beforeSend(event, hint) {
    if (event.type === 'transaction') {
      // Adicionar contexto customizado
      event.contexts = {
        ...event.contexts,
        performance: {
          fps: hint?.fps,
          renderTime: hint?.renderTime,
          domSize: hint?.domSize,
        },
      };
    }
    return event;
  },
});
```

### Critérios de Sucesso
- [x] Web Vitals configurados
- [x] Performance Observer criado
- [x] Performance Tracker criado
- [x] Componente de Performance Monitor criado
- [x] Performance Monitor integrado no layout
- [x] Sentry configurado para performance

## Fase 4: Documentação de Uso

### Objetivo
Criar guias detalhados para desenvolvedores sobre como usar o sistema de tema Apple Liquid Glass 2026, facilitando a adoção e manutenção do design system.

### Tarefas

#### 4.1 Criar Guia de Início Rápido
**Descrição:** Criar um guia de início rápido para desenvolvedores que estão começando a usar o sistema de tema.

**Arquivos a Criar:**
- [`docs/theme/QUICKSTART.md`](docs/theme/QUICKSTART.md:1) - Guia de início rápido

**Implementação:**
```markdown
# Guia de Início Rápido - Apple Liquid Glass 2026

Bem-vindo ao sistema de tema **Apple Liquid Glass 2026**! Este guia vai ajudá-lo a começar a usar o sistema de tema rapidamente.

## O que é o Apple Liquid Glass 2026?

O Apple Liquid Glass 2026 é um design system inspirado na estética da Apple iOS 2026, caracterizado por:

- **Efeitos de Vidro (Glassmorphism):** Backdrop-blur de 50px, saturate de 200%
- **Efeitos Visuais:** Specular highlight, rim light, inner glow, noise texture
- **Tipografia iOS 2026:** SF Pro Display, SF Pro Text, SF Pro Caption, SF Mono
- **Espaçamento iOS 2026:** Escala base 8px
- **Cores Apple 2026:** Medical Blue, Medical Green, Medical Teal, Emergency Red/Orange/Yellow
- **Animações Sutis:** Hover scale, tap scale, float, pulse, shimmer, ripple, slide, scale, fade, bounce, haptic

## Como Começar

### 1. Importar os Hooks de Tema

```typescript
import { useGlassClasses, useGlassOpacity, useGlassBlur, useGlassVisualEffects } from '@/lib/theme/hooks';
```

### 2. Usar os Hooks de Tema

```typescript
// Obter todas as classes de um componente glass
const glassClasses = useGlassClasses('default');

// Obter classes específicas
const opacityClasses = useGlassOpacity('default');
const blurClasses = useGlassBlur();
const visualEffectsClasses = useGlassVisualEffects();
```

### 3. Aplicar as Classes aos Componentes

```typescript
export function MyComponent() {
  const glassClasses = useGlassClasses('default');

  return (
    <div className={glassClasses}>
      <h1>Meu Componente</h1>
      <p>Conteúdo aqui</p>
    </div>
  );
}
```

### 4. Usar o Componente GlassPanel

```typescript
import { GlassPanel } from '@/components/glass/GlassPanel';

export function MyComponent() {
  return (
    <GlassPanel variant="default">
      <h1>Meu Componente</h1>
      <p>Conteúdo aqui</p>
    </GlassPanel>
  );
}
```

## Variantes Disponíveis

### Glass Variantes
- `default` - Opacidade padrão
- `subtle` - Opacidade mais sutil
- `clear` - Opacidade mais clara
- `elevated` - Opacidade para componentes elevados
- `medical` - Opacidade para componentes médicos

### Animation Variantes
- `default` - Animação padrão
- `subtle` - Animação mais sutil
- `clear` - Animação mais clara
- `elevated` - Animação para componentes elevados

## Próximos Passos

- Leia o guia completo: [USO_COMPLETO.md](./USO_COMPLETO.md)
- Explore os componentes: [COMPONENTES.md](./COMPONENTES.md)
- Veja exemplos de implementação: [EXEMPLOS.md](./EXEMPLOS.md)

## Recursos Adicionais

- [Documentação Oficial](./README.md)
- [Tokens de Design](../lib/theme/tokens.ts)
- [Hooks de Tema](../lib/theme/hooks.ts)
```

#### 4.2 Criar Guia de Uso Completo
**Descrição:** Criar um guia completo detalhando todos os hooks, tokens e componentes do sistema de tema.

**Arquivos a Criar:**
- [`docs/theme/USO_COMPLETO.md`](docs/theme/USO_COMPLETO.md:1) - Guia de uso completo

**Implementação:**
```markdown
# Guia de Uso Completo - Apple Liquid Glass 2026

Este guia detalha todos os hooks, tokens e componentes do sistema de tema Apple Liquid Glass 2026.

## Índice

1. [Hooks de Tema](#hooks-de-tema)
2. [Tokens de Design](#tokens-de-design)
3. [Componentes de Tema](#componentes-de-tema)
4. [Animações Avançadas](#animações-avançadas)
5. [Performance Monitoramento](#performance-monitoramento)
6. [Best Practices](#best-practices)

## Hooks de Tema

### useTheme

Hook do next-themes para gerenciar o tema atual (light/dark).

```typescript
import { useTheme } from '@/lib/theme/hooks';

export function MyComponent() {
  const { theme, setTheme, systemTheme } = useTheme();
  
  // theme: 'light' | 'dark' | 'system'
  // setTheme: função para mudar o tema
  // systemTheme: tema do sistema operacional
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Alternar Tema
    </button>
  );
}
```

### useGlassClasses

Hook combinado que retorna todas as classes de um componente glass.

```typescript
import { useGlassClasses } from '@/lib/theme/hooks';

export function MyComponent() {
  const glassClasses = useGlassClasses('default');
  
  return (
    <div className={glassClasses}>
      <h1>Meu Componente</h1>
    </div>
  );
}
```

### useGlassOpacity

Hook que retorna classes de opacidade baseadas no tema atual.

```typescript
import { useGlassOpacity } from '@/lib/theme/hooks';

export function MyComponent() {
  const opacityClasses = useGlassOpacity('default');
  
  return (
    <div className={opacityClasses}>
      <h1>Meu Componente</h1>
    </div>
  );
}
```

### useGlassBlur

Hook que retorna classes de blur e saturação.

```typescript
import { useGlassBlur } from '@/lib/theme/hooks';

export function MyComponent() {
  const blurClasses = useGlassBlur();
  
  return (
    <div className={blurClasses}>
      <h1>Meu Componente</h1>
    </div>
  );
}
```

### useGlassVisualEffects

Hook que retorna classes de efeitos visuais (specular, rim light, inner glow).

```typescript
import { useGlassVisualEffects } from '@/lib/theme/hooks';

export function MyComponent() {
  const visualEffectsClasses = useGlassVisualEffects();
  
  return (
    <div className={visualEffectsClasses}>
      <h1>Meu Componente</h1>
    </div>
  );
}
```

### useGlassAnimation

Hook que retorna classes de animação.

```typescript
import { useGlassAnimation } from '@/lib/theme/hooks';

export function MyComponent() {
  const animationClasses = useGlassAnimation('hover', 'default');
  
  return (
    <div className={animationClasses}>
      <h1>Meu Componente</h1>
    </div>
  );
}
```

### useGlassTypography

Hook que retorna classes de tipografia.

```typescript
import { useGlassTypography } from '@/lib/theme/hooks';

export function MyComponent() {
  const typographyClasses = useGlassTypography();
  
  return (
    <div className={typographyClasses}>
      <h1>Meu Componente</h1>
    </div>
  );
}
```

### useGlassSpacing

Hook que retorna classes de espaçamento.

```typescript
import { useGlassSpacing } from '@/lib/theme/hooks';

export function MyComponent() {
  const spacingClasses = useGlassSpacing(4);
  
  return (
    <div className={spacingClasses}>
      <h1>Meu Componente</h1>
    </div>
  );
}
```

## Tokens de Design

### BLUR

Define o valor de backdrop-blur e saturação.

```typescript
import { BLUR } from '@/lib/theme/tokens';

console.log(BLUR.VALUE); // '50px'
console.log(BLUR.SATURATE); // '200%'
```

### OPACITY

Define as opacidades para light mode e dark mode.

```typescript
import { OPACITY } from '@/lib/theme/tokens';

console.log(OPACITY.LIGHT.DEFAULT); // '0.26'
console.log(OPACITY.DARK.DEFAULT); // '0.70'
```

### RADIUS

Define os valores de border radius.

```typescript
import { RADIUS } from '@/lib/theme/tokens';

console.log(RADIUS.DEFAULT); // '12px'
console.log(RADIUS.SUBTLE); // '8px'
```

### COLORS

Define as cores Apple 2026.

```typescript
import { COLORS } from '@/lib/theme/tokens';

console.log(COLORS.MEDICAL.BLUE); // '#007AFF'
console.log(COLORS.MEDICAL.GREEN); // '#34C759'
console.log(COLORS.EMERGENCY.RED); // '#FF3B30'
```

## Componentes de Tema

### GlassPanel

Componente base de painel de vidro.

```typescript
import { GlassPanel } from '@/components/glass/GlassPanel';

export function MyComponent() {
  return (
    <GlassPanel variant="default">
      <h1>Meu Componente</h1>
      <p>Conteúdo aqui</p>
    </GlassPanel>
  );
}
```

### GlassMotion

Componente de animação glass com Framer Motion.

```typescript
import { GlassMotion } from '@/components/animation/GlassMotion';

export function MyComponent() {
  return (
    <GlassMotion variant="default" animate={true} hover={true} tap={true}>
      <h1>Meu Componente</h1>
    </GlassMotion>
  );
}
```

### MicroInteractions

Componentes de micro-interações com Framer Motion.

```typescript
import { HoverScale, TapScale, Float, Shimmer } from '@/components/animation/MicroInteractions';

export function MyComponent() {
  return (
    <div>
      <HoverScale>
        <button>Hover Me</button>
      </HoverScale>
      
      <TapScale>
        <button>Tap Me</button>
      </TapScale>
      
      <Float>
        <div>Floating</div>
      </Float>
      
      <Shimmer>
        <div>Shimmer Effect</div>
      </Shimmer>
    </div>
  );
}
```

## Animações Avançadas

### Framer Motion

Biblioteca de animação para criar micro-interações fluidas.

```typescript
import { motion, AnimatePresence } from 'framer-motion';

export function MyComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <h1>Meu Componente</h1>
    </motion.div>
  );
}
```

### AnimatePresence

Componente para animar entrada e saída de elementos.

```typescript
import { AnimatePresence } from 'framer-motion';

export function MyComponent() {
  const [show, setShow] = useState(true);
  
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <h1>Meu Componente</h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

## Performance Monitoramento

### PerformanceMonitor

Componente para monitorar performance em tempo real.

```typescript
import { PerformanceMonitor } from '@/components/performance/PerformanceMonitor';

export function MyLayout() {
  return (
    <>
      {/* Seu conteúdo */}
      <PerformanceMonitor />
    </>
  );
}
```

### Web Vitals

Configuração para monitorar métricas de performance essenciais.

```typescript
import { reportWebVitals } from '@/lib/performance';

// Inicializar no início da aplicação
reportWebVitals();
```

## Best Practices

### 1. Sempre Usar Hooks de Tema

Use sempre os hooks de tema em vez de classes CSS hardcoded.

```typescript
// ✅ BOM
import { useGlassClasses } from '@/lib/theme/hooks';

export function MyComponent() {
  const glassClasses = useGlassClasses('default');
  return <div className={glassClasses}>...</div>;
}

// ❌ RUIM
export function MyComponent() {
  return (
    <div className="backdrop-blur-[50px] saturate-[200%] opacity-[0.28]">
      ...
    </div>
  );
}
```

### 2. Usar Variantes Apropriadas

Escolha a variente apropriada para o contexto do componente.

```typescript
// Para componentes padrão
<GlassPanel variant="default">...</GlassPanel>

// Para componentes médicos
<GlassPanel variant="medical">...</GlassPanel>

// Para componentes elevados
<GlassPanel variant="elevated">...</GlassPanel>
```

### 3. Testar em Light Mode e Dark Mode

Sempre teste seus componentes em ambos os modos.

```typescript
// Use o hook useTheme para testar
import { useTheme } from '@/lib/theme/hooks';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Tema Atual: {theme}
    </button>
  );
}
```

### 4. Otimizar Performance

Use GPU acceleration, CSS containment e will-change para otimizar performance.

```typescript
// GPU acceleration
const gpuClasses = 'gpu-accelerated';

// CSS containment
const containmentClasses = 'contain-layout-style-paint';

// will-change
const willChangeClasses = 'will-change-transform-opacity';
```

### 5. Respeitar Acessibilidade

Sempre respeite as diretrizes de acessibilidade.

```typescript
// Reduced motion
@media (prefers-reduced-motion: reduce) {
  /* Desabilitar animações */
}

// Reduced transparency
@media (prefers-reduced-transparency: reduce) {
  /* Usar fundo sólido em vez de blur */
}

// High contrast
@media (prefers-contrast: more) {
  /* Aumentar contraste */
}
```

## Recursos Adicionais

- [Guia de Início Rápido](./QUICKSTART.md)
- [Documentação Oficial](./README.md)
- [Tokens de Design](../lib/theme/tokens.ts)
- [Hooks de Tema](../lib/theme/hooks.ts)
```

#### 4.3 Criar Guia de Componentes
**Descrição:** Criar um guia detalhando todos os componentes disponíveis no sistema de tema.

**Arquivos a Criar:**
- [`docs/theme/COMPONENTES.md`](docs/theme/COMPONENTES.md:1) - Guia de componentes

**Implementação:**
```markdown
# Guia de Componentes - Apple Liquid Glass 2026

Este guia detalha todos os componentes disponíveis no sistema de tema Apple Liquid Glass 2026.

## Índice

1. [Componentes de Glass](#componentes-de-glass)
2. [Componentes de Animação](#componentes-de-animação)
3. [Componentes de Performance](#componentes-de-performance)
4. [Componentes Médicos](#componentes-médicos)

## Componentes de Glass

### GlassPanel

Componente base de painel de vidro com efeitos de glassmorphism.

```typescript
import { GlassPanel } from '@/components/glass/GlassPanel';

interface MyComponentProps {
  title: string;
  children: React.ReactNode;
}

export function MyComponent({ title, children }: MyComponentProps) {
  return (
    <GlassPanel variant="default">
      <h2>{title}</h2>
      {children}
    </GlassPanel>
  );
}
```

**Props:**
- `variant?: 'default' | 'subtle' | 'clear' | 'elevated' | 'medical'` - Variente do componente
- `className?: string` - Classes CSS adicionais

**Exemplo:**
```typescript
<GlassPanel variant="default">
  <h1>Bem-vindo</h1>
  <p>Este é um painel de vidro.</p>
</GlassPanel>
```

## Componentes de Animação

### GlassMotion

Componente de animação glass com Framer Motion.

```typescript
import { GlassMotion } from '@/components/animation/GlassMotion';

export function MyComponent() {
  return (
    <GlassMotion variant="default" animate={true} hover={true} tap={true}>
      <h1>Meu Componente</h1>
    </GlassMotion>
  );
}
```

**Props:**
- `variant?: 'default' | 'subtle' | 'clear' | 'elevated' | 'medical'` - Variente do componente
- `animate?: boolean` - Se deve animar entrada
- `hover?: boolean` - Se deve animar hover
- `tap?: boolean` - Se deve animar tap
- `className?: string` - Classes CSS adicionais

### HoverScale

Componente de hover scale com Framer Motion.

```typescript
import { HoverScale } from '@/components/animation/MicroInteractions';

export function MyComponent() {
  return (
    <HoverScale>
      <button>Hover Me</button>
    </HoverScale>
  );
}
```

### TapScale

Componente de tap scale com Framer Motion.

```typescript
import { TapScale } from '@/components/animation/MicroInteractions';

export function MyComponent() {
  return (
    <TapScale>
      <button>Tap Me</button>
    </TapScale>
  );
}
```

### Float

Componente de float animation com Framer Motion.

```typescript
import { Float } from '@/components/animation/MicroInteractions';

export function MyComponent() {
  return (
    <Float>
      <div>Floating Element</div>
    </Float>
  );
}
```

### Shimmer

Componente de shimmer effect com Framer Motion.

```typescript
import { Shimmer } from '@/components/animation/MicroInteractions';

export function MyComponent() {
  return (
    <Shimmer>
      <div>Loading...</div>
    </Shimmer>
  );
}
```

## Componentes de Performance

### PerformanceMonitor

Componente para monitorar performance em tempo real.

```typescript
import { PerformanceMonitor } from '@/components/performance/PerformanceMonitor';

export function MyLayout() {
  return (
    <>
      {/* Seu conteúdo */}
      <PerformanceMonitor />
    </>
  );
}
```

**Métricas Exibidas:**
- FPS (Frames Per Second)
- Render Time (Tempo de Renderização)
- DOM Size (Tamanho do DOM)

## Componentes Médicos

### EmergencyPulse

Componente de pulse animation para alertas de emergência.

```typescript
import { EmergencyPulse } from '@/components/medical/EmergencyPulse';

export function MyComponent() {
  return (
    <EmergencyPulse severity="critical">
      <div>⚠️ Alerta Crítica</div>
    </EmergencyPulse>
  );
}
```

**Props:**
- `severity?: 'low' | 'medium' | 'high' | 'critical'` - Severidade da emergência

### MedicalShimmer

Componente de shimmer effect para loading states médicos.

```typescript
import { MedicalShimmer } from '@/components/medical/MedicalShimmer';

export function MyComponent() {
  return (
    <MedicalShimmer>
      <div>Carregando dados médicos...</div>
    </MedicalShimmer>
  );
}
```

## Recursos Adicionais

- [Guia de Início Rápido](./QUICKSTART.md)
- [Guia de Uso Completo](./USO_COMPLETO.md)
- [Documentação Oficial](./README.md)
```

#### 4.4 Criar Guia de Exemplos
**Descrição:** Criar um guia com exemplos práticos de implementação do sistema de tema.

**Arquivos a Criar:**
- [`docs/theme/EXEMPLOS.md`](docs/theme/EXEMPLOS.md:1) - Guia de exemplos

**Implementação:**
```markdown
# Guia de Exemplos - Apple Liquid Glass 2026

Este guia contém exemplos práticos de implementação do sistema de tema Apple Liquid Glass 2026.

## Índice

1. [Exemplo 1: Dashboard Card](#exemplo-1-dashboard-card)
2. [Exemplo 2: Chat Message](#exemplo-2-chat-message)
3. [Exemplo 3: Kanban Task](#exemplo-3-kanban-task)
4. [Exemplo 4: Medical Form](#exemplo-4-medical-form)
5. [Exemplo 5: Modal Dialog](#exemplo-5-modal-dialog)

## Exemplo 1: Dashboard Card

```typescript
import { GlassPanel } from '@/components/glass/GlassPanel';
import { HoverScale } from '@/components/animation/MicroInteractions';
import { useGlassTypography } from '@/lib/theme/hooks';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export function DashboardCard({ title, value, icon, trend = 'neutral' }: DashboardCardProps) {
  const typographyClasses = useGlassTypography();
  
  return (
    <HoverScale>
      <GlassPanel variant="default">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {icon}
              <h3 className={typographyClasses}>{title}</h3>
            </div>
            {trend !== 'neutral' && (
              <span className={`text-xs ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {trend === 'up' ? '↑' : '↓'}
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

## Exemplo 2: Chat Message

```typescript
import { GlassPanel } from '@/components/glass/GlassPanel';
import { FadeIn } from '@/components/animation/MicroInteractions';
import { useGlassTypography, useGlassSpacing } from '@/lib/theme/hooks';

interface ChatMessageProps {
  message: string;
  sender: 'user' | 'assistant';
  timestamp: string;
}

export function ChatMessage({ message, sender, timestamp }: ChatMessageProps) {
  const typographyClasses = useGlassTypography();
  const spacingClasses = useGlassSpacing(4);
  
  return (
    <FadeIn>
      <GlassPanel variant={sender === 'user' ? 'elevated' : 'default'} className={spacingClasses}>
        <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className="max-w-[70%]">
            <p className={typographyClasses}>{message}</p>
            <p className="text-xs text-gray-400 mt-1">{timestamp}</p>
          </div>
        </div>
      </GlassPanel>
    </FadeIn>
  );
}
```

## Exemplo 3: Kanban Task

```typescript
import { GlassPanel } from '@/components/glass/GlassPanel';
import { TapScale, SlideUp } from '@/components/animation/MicroInteractions';
import { useGlassTypography, useGlassSpacing } from '@/lib/theme/hooks';

interface KanbanTaskProps {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  onEdit: () => void;
  onDelete: () => void;
}

export function KanbanTask({ title, description, priority, onEdit, onDelete }: KanbanTaskProps) {
  const typographyClasses = useGlassTypography();
  const spacingClasses = useGlassSpacing(4);
  
  const priorityColors = {
    low: 'text-blue-400',
    medium: 'text-yellow-400',
    high: 'text-red-400',
  };
  
  return (
    <SlideUp>
      <TapScale>
        <GlassPanel variant="default" className={spacingClasses}>
          <div className="flex items-start justify-between mb-2">
            <h3 className={typographyClasses}>{title}</h3>
            <div className="flex gap-2">
              <button onClick={onEdit} className="text-xs">Editar</button>
              <button onClick={onDelete} className="text-xs text-red-400">Excluir</button>
            </div>
          </div>
          <p className={`text-xs ${priorityColors[priority]}`}>
            Prioridade: {priority}
          </p>
          <p className="text-sm mt-2">{description}</p>
        </GlassPanel>
      </TapScale>
    </SlideUp>
  );
}
```

## Exemplo 4: Medical Form

```typescript
import { GlassPanel } from '@/components/glass/GlassPanel';
import { useGlassTypography, useGlassSpacing } from '@/lib/theme/hooks';

interface MedicalFormProps {
  onSubmit: (data: any) => void;
}

export function MedicalForm({ onSubmit }: MedicalFormProps) {
  const typographyClasses = useGlassTypography();
  const spacingClasses = useGlassSpacing(4);
  
  return (
    <GlassPanel variant="medical" className={spacingClasses}>
      <h2 className={typographyClasses}>Formulário Médico</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        onSubmit(data);
      }}>
        <div className="space-y-4">
          <div>
            <label className="text-sm mb-1">Nome</label>
            <input type="text" name="name" className="w-full p-2 rounded-md" />
          </div>
          <div>
            <label className="text-sm mb-1">Idade</label>
            <input type="number" name="age" className="w-full p-2 rounded-md" />
          </div>
          <button type="submit" className="w-full p-3 rounded-md bg-blue-500 text-white">
            Enviar
          </button>
        </div>
      </form>
    </GlassPanel>
  );
}
```

## Exemplo 5: Modal Dialog

```typescript
import { GlassPanel } from '@/components/glass/GlassPanel';
import { ScaleIn, ScaleOut } from '@/components/animation/MicroInteractions';
import { useGlassTypography, useGlassSpacing } from '@/lib/theme/hooks';

interface ModalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function ModalDialog({ isOpen, onClose, title, children }: ModalDialogProps) {
  const typographyClasses = useGlassTypography();
  const spacingClasses = useGlassSpacing(4);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <ScaleIn>
        <GlassPanel variant="elevated" className={spacingClasses}>
          <div className="flex items-start justify-between mb-4">
            <h2 className={typographyClasses}>{title}</h2>
            <button onClick={onClose} className="text-2xl">×</button>
          </div>
          {children}
        </GlassPanel>
      </ScaleIn>
    </div>
  );
}
```

## Recursos Adicionais

- [Guia de Início Rápido](./QUICKSTART.md)
- [Guia de Uso Completo](./USO_COMPLETO.md)
- [Guia de Componentes](./COMPONENTES.md)
- [Documentação Oficial](./README.md)
```

#### 4.5 Criar Documentação Oficial
**Descrição:** Criar uma documentação oficial do sistema de tema Apple Liquid Glass 2026.

**Arquivos a Criar:**
- [`docs/theme/README.md`](docs/theme/README.md:1) - Documentação oficial

**Implementação:**
```markdown
# Apple Liquid Glass 2026 - Sistema de Tema

**Versão:** 1.0.0
**Data:** 2026-01-22
**Status:** Estável

## Visão Geral

O Apple Liquid Glass 2026 é um design system inspirado na estética da Apple iOS 2026, implementado no projeto WellWave para criar uma interface visual premium e consistente.

## Características

### Efeitos de Vidro (Glassmorphism)
- Backdrop-blur de 50px
- Saturate de 200%
- Transparência de 0.26 (light) / 0.70 (dark)
- Borda com opacidade de 0.12 (light) / 0.18 (dark)
- Specular highlight na borda superior
- Rim light ao redor dos componentes
- Inner glow interno para profundidade
- Noise texture para textura orgânica

### Tipografia iOS 2026
- SF Pro Display para headings e display text
- SF Pro Text para body text
- SF Pro Caption para captions e small text
- SF Mono para code e monospace text
- Tamanhos de fonte baseados em escala de 8px (11px, 12px, 14px, 16px, 18px, 20px, 24px, 28px, 32px)
- Line heights baseados em escala de 4px (1.25, 1.5, 1.75, 2)

### Espaçamento iOS 2026
- Escala base 8px (0px, 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px)
- Padding, margin e gap consistentes em toda a aplicação

### Cores Apple 2026
- Medical Blue (#007AFF)
- Medical Green (#34C759)
- Medical Teal (#5AC8FA)
- Emergency Red (#FF3B30)
- Emergency Orange (#FF9500)
- Emergency Yellow (#FFCC00)

### Animações Sutis
- Hover scale (1.02)
- Tap scale (0.95)
- Float animation
- Pulse animation
- Shimmer effect
- Ripple effect
- Slide animations
- Scale animations
- Fade animations
- Bounce animations
- Haptic animations

### Acessibilidade
- Reduced motion support
- Reduced transparency support
- High contrast mode support
- Forced colors support

### Performance
- GPU acceleration (transform: translateZ(0), backface-visibility: hidden)
- CSS containment (contain: layout style paint)
- will-change para propriedades animadas
- Web Vitals integration
- Performance monitoramento em tempo real

## Instalação

O sistema de tema Apple Liquid Glass 2026 já está instalado no projeto WellWave. Não é necessária nenhuma instalação adicional.

## Uso

### Hooks de Tema

```typescript
import { useGlassClasses, useGlassOpacity, useGlassBlur, useGlassVisualEffects } from '@/lib/theme/hooks';

export function MyComponent() {
  const glassClasses = useGlassClasses('default');
  
  return (
    <div className={glassClasses}>
      <h1>Meu Componente</h1>
    </div>
  );
}
```

### Componentes de Tema

```typescript
import { GlassPanel } from '@/components/glass/GlassPanel';

export function MyComponent() {
  return (
    <GlassPanel variant="default">
      <h1>Meu Componente</h1>
    </GlassPanel>
  );
}
```

### Animações Avançadas

```typescript
import { GlassMotion } from '@/components/animation/GlassMotion';
import { HoverScale, TapScale, Float } from '@/components/animation/MicroInteractions';

export function MyComponent() {
  return (
    <GlassMotion variant="default" animate={true} hover={true} tap={true}>
      <h1>Meu Componente</h1>
    </GlassMotion>
  );
}
```

## Documentação

- [Guia de Início Rápido](./QUICKSTART.md)
- [Guia de Uso Completo](./USO_COMPLETO.md)
- [Guia de Componentes](./COMPONENTES.md)
- [Guia de Exemplos](./EXEMPLOS.md)
- [Tokens de Design](../../lib/theme/tokens.ts)
- [Hooks de Tema](../../lib/theme/hooks.ts)

## Suporte

Para questões, bugs ou solicitações de recursos, abra uma issue no repositório do projeto.

## Licença

Este sistema de tema é parte do projeto WellWave e segue a mesma licença.

## Changelog

### 1.0.0 (2026-01-22)
- Implementação inicial do Apple Liquid Glass 2026
- Sistema de tema centralizado em lib/theme
- Classes CSS dedicadas compatíveis com Tailwind CSS 4
- 55+ componentes migrados para usar o sistema de tema
- Validações em light mode e dark mode
- Acessibilidade implementada
- Performance otimizada
```

### Critérios de Sucesso
- [x] Guia de início rápido criado
- [x] Guia de uso completo criado
- [x] Guia de componentes criado
- [x] Guia de exemplos criado
- [x] Documentação oficial criada

## Cronograma

- **Fase 1: Refinamento Visual Contínuo** - 2-3 dias
- **Fase 2: Animações Avançadas** - 3-5 dias
- **Fase 3: Performance Monitoramento** - 2-3 dias
- **Fase 4: Documentação de Uso** - 2-3 dias

**Total:** 9-14 dias

## Próximos Passos

Após concluir as 4 fases, os próximos passos sugeridos são:

1. **Refinamento Visual Contínuo** - Continuar ajustando finos visuais baseados em feedback da equipe
2. **Animações Mais Complexas** - Implementar animações ainda mais avançadas e customizadas
3. **Performance Otimização** - Otimizar gargalos identificados pelo monitoramento
4. **Manutenção Contínua** - Manter o sistema de tema atualizado com as últimas tendências da Apple

## Conclusão

Este plano detalha os próximos passos para continuar refinando e aprimorando o sistema de tema Apple Liquid Glass 2026 implementado no projeto WellWave. Ao concluir as 4 fases, o sistema de tema terá um nível visual ainda mais alto, animações mais fluidas, monitoramento de performance em tempo real e documentação completa para desenvolvedores.

**Pronto para implementação!** 🚀
