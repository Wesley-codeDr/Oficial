# Guia de Componentes - Apple Liquid Glass 2026

Este guia detalha todos os componentes disponíveis no sistema de tema Apple Liquid Glass 2026.

## Índice

1. [Componentes de Glass](#componentes-de-glass)
2. [Componentes de Animação](#componentes-de-animação)
3. [Componentes de Performance](#componentes-de-performance)
4. [Componentes Médicos](#componentes-médicos)

## Componentes de Glass

### GlassPanel

Componente base de painel de vidro com efeitos de glassmorphism e animações do Framer Motion.

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
- `variant?: 'default' | 'subtle' | 'clear' | 'elevated' | 'medical'` - Variante do componente
- `className?: string` - Classes CSS adicionais

**Exemplo:**
```typescript
<GlassPanel variant="elevated">
  <h1>Componente Elevado</h1>
  <p>Conteúdo aqui</p>
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
      <h1>Componente Animado</h1>
      <p>Conteúdo aqui</p>
    </GlassMotion>
  );
}
```

### MicroInteractions

Componentes de micro-interações com Framer Motion.

#### HoverScale

Hover scale com física de mola.

```typescript
import { HoverScale } from '@/components/animation/MicroInteractions';

export function MyComponent() {
  return (
    <HoverScale>
      <button>Botão com Hover</button>
    </HoverScale>
  );
}
```

#### TapScale

Tap scale com física de mola.

```typescript
import { TapScale } from '@/components/animation/MicroInteractions';

export function MyComponent() {
  return (
    <TapScale>
      <button>Botão com Tap</button>
    </TapScale>
  );
}
```

#### Float

Float animation suave.

```typescript
import { Float } from '@/components/animation/MicroInteractions';

export function MyComponent() {
  return (
    <Float>
      <div>Elemento Flutuante</div>
    </Float>
  );
}
```

#### Shimmer

Shimmer effect para loading states.

```typescript
import { Shimmer } from '@/components/animation/MicroInteractions';

export function MyComponent({ isLoading }: { isLoading: boolean }) {
  return (
    <div>
      {isLoading ? (
        <Shimmer>
          <div>Carregando...</div>
        </Shimmer>
      ) : (
        <div>Conteúdo carregado</div>
      )}
    </div>
  );
}
```

#### FadeIn

Fade in animation.

```typescript
import { FadeIn } from '@/components/animation/MicroInteractions';

export function MyComponent({ show }: { show: boolean }) {
  return (
    <div>
      {show && (
        <FadeIn>
          <div>Conteúdo aparecendo</div>
        </FadeIn>
      )}
    </div>
  );
}
```

#### SlideUp

Slide up animation.

```typescript
import { SlideUp } from '@/components/animation/MicroInteractions';

export function MyComponent() {
  return (
    <SlideUp>
      <div>Conteúdo subindo</div>
    </SlideUp>
  );
}
```

#### AnimatedPresence

AnimatePresence para entrada/saída de elementos.

```typescript
import { AnimatedPresence } from '@/components/animation/MicroInteractions';

export function MyComponent({ show }: { show: boolean }) {
  return (
    <AnimatedPresence show={show}>
      <div>Conteúdo com animação de entrada/saída</div>
    </AnimatedPresence>
  );
}
```

## Componentes de Performance

### PerformanceMonitor

Componente para monitorar performance em tempo real com indicadores coloridos.

```typescript
import { PerformanceMonitor } from '@/components/performance/PerformanceMonitor';

export function MyLayout() {
  return (
    <>
      <h1>Dashboard</h1>
      {/* Seu conteúdo */}
      <PerformanceMonitor />
    </>
  );
}
```

**Features:**
- Monitoramento de FPS em tempo real
- Indicador de tempo de renderização
- Monitoramento de tamanho do DOM
- Indicadores coloridos:
  - Verde: FPS ≥ 50
  - Amarelo: FPS ≥ 30
  - Vermelho: FPS < 30

**Integração com Layout:**
```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <PerformanceMonitor />
      </body>
    </html>
  );
}
```

## Componentes Médicos

### EmergencyPulse

Componente de pulse animation para alertas de emergência.

```typescript
import { EmergencyPulse } from '@/components/medical/EmergencyPulse';

export function AlertPanel() {
  return (
    <div className="space-y-4">
      <EmergencyPulse severity="low">
        <div>⚠️ Alerta de Baixa Prioridade</div>
      </EmergencyPulse>

      <EmergencyPulse severity="medium">
        <div>⚠️ Alerta de Média Prioridade</div>
      </EmergencyPulse>

      <EmergencyPulse severity="high">
        <div>🔴 Alerta de Alta Prioridade</div>
      </EmergencyPulse>

      <EmergencyPulse severity="critical">
        <div>🚨 Alerta Crítica</div>
      </EmergencyPulse>
    </div>
  );
}
```

**Props:**
- `severity?: 'low' | 'medium' | 'high' | 'critical'` - Severidade da emergência

**Durações de Pulse:**
- Low: 2 segundos
- Medium: 1.5 segundos
- High: 1 segundo
- Critical: 0.5 segundos

### MedicalShimmer

Shimmer effect para loading states médicos.

```typescript
import { MedicalShimmer } from '@/components/medical/MedicalShimmer';

export function MedicalCard({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="p-4">
      {isLoading ? (
        <MedicalShimmer>
          <div>Carregando dados médicos...</div>
        </MedicalShimmer>
      ) : (
        <div>Dados médicos carregados</div>
      )}
    </div>
  );
}
```

**Features:**
- Gradiente linear com opacidade (transparent → rgba(255,255,255,0.08))
- 1.5 segundos de duração
- Repetição infinita
- Tamanho 200% para efeito suave

## Composição de Componentes

### Exemplo: Dashboard com Animações

```typescript
import { GlassPanel } from '@/components/glass/GlassPanel';
import { HoverScale, TapScale } from '@/components/animation/MicroInteractions';

export function DashboardCard({ title, value, icon }: DashboardCardProps) {
  return (
    <HoverScale>
      <GlassPanel variant="default">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            {icon}
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </GlassPanel>
    </HoverScale>
  );
}
```

### Exemplo: Chat com Animações

```typescript
import { GlassPanel } from '@/components/glass/GlassPanel';
import { FadeIn } from '@/components/animation/MicroInteractions';

export function MessageBubble({ message, sender }: MessageBubbleProps) {
  return (
    <FadeIn>
      <GlassPanel variant={sender === 'user' ? 'elevated' : 'default'}>
        <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className="max-w-[70%]">
            <p className="text-sm">{message}</p>
          </div>
        </div>
      </GlassPanel>
    </FadeIn>
  );
}
```

### Exemplo: Painel de Emergência

```typescript
import { EmergencyPulse } from '@/components/medical/EmergencyPulse';

export function EmergencyAlert({ severity, message }: EmergencyAlertProps) {
  return (
    <GlassPanel variant="elevated">
      <EmergencyPulse severity={severity}>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2">Alerta de Emergência</h3>
          <p className="text-sm">{message}</p>
        </div>
      </EmergencyPulse>
    </GlassPanel>
  );
}
```

## Recursos Adicionais

- [Guia de Início Rápido](./QUICKSTART.md)
- [Guia de Uso Completo](./USO_COMPLETO.md)
- [Guia de Exemplos](./EXEMPLOS.md)
- [Documentação Oficial](../README.md)
- [Tokens de Design](../../lib/theme/tokens.ts)
- [Hooks de Tema](../../lib/theme/hooks.ts)

## Boas Práticas

### 1. Compor Componentes

Use GlassPanel como base e adicione interações com HoverScale ou TapScale.

```typescript
// ✅ BOM
export function MyComponent() {
  return (
    <HoverScale>
      <GlassPanel variant="default">
        <div>Conteúdo</div>
      </GlassPanel>
    </HoverScale>
  );
}

// ❌ RUIM - adicionar animações manualmente
export function MyComponent() {
  return (
    <div className="transition-all hover:scale-102 active:scale-95">
      <div className={glassClasses}>Conteúdo</div>
    </div>
  );
}
```

### 2. Usar Animações Apropriadas

Escolha a animação apropriada para o contexto.

```typescript
// Loading states
<Shimmer><div>Carregando...</div></Shimmer>

// Entry animations
<FadeIn><div>Conteúdo aparecendo</div></FadeIn>

// Interactive elements
<HoverScale><button>Clique aqui</button></HoverScale>
```

### 3. Performance em Tempo Real

Adicione PerformanceMonitor ao layout principal para monitorar performance durante o desenvolvimento.

```typescript
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <PerformanceMonitor />
      </body>
    </html>
  );
}
```

### 4. Testar em Ambos os Modos

Verifique que os componentes funcionam corretamente em light mode e dark mode.

## Suporte

Para dúvidas ou problemas, consulte a documentação ou abra uma issue no repositório.
