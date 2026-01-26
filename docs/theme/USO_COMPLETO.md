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
      <p>Conteúdo com opacidade ajustada</p>
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
      <p>Conteúdo com blur ajustado</p>
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
      <p>Conteúdo com efeitos visuais</p>
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
      <p>Conteúdo com animação</p>
    </div>
  );
}
```

### useGlassTypography

Hook que retorna classes de tipografia.

```typescript
import { useGlassTypography } from '@/lib/theme/hooks';

export function MyComponent() {
  const typographyClasses = useGlassTypography('MD');
  
  return (
    <div className={typographyClasses}>
      <p>Conteúdo com tipografia iOS 2026</p>
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
      <p>Conteúdo com espaçamento ajustado</p>
    </div>
  );
}
```

## Tokens de Design

### BLUR

Define o valor de backdrop-blur e saturação.

```typescript
import { BLUR_VALUES, SATURATE_VALUES } from '@/lib/theme/tokens';

console.log(BLUR_VALUES.DEFAULT); // '40px'
console.log(SATURATE_VALUES.DEFAULT); // '180%'
```

### OPACITY

Define as opacidades para light mode e dark mode.

```typescript
import { OPACITY_VALUES, OPACITY_DARK_VALUES } from '@/lib/theme/tokens';

console.log(OPACITY_VALUES.LIGHT.DEFAULT); // '0.26'
console.log(OPACITY_DARK_VALUES.DEFAULT); // '0.70'
```

### RADIUS

Define os valores de border radius.

```typescript
import { RADIUS_VALUES } from '@/lib/theme/tokens';

console.log(RADIUS_VALUES.LG); // '16px'
```

### SHADOW

Define as sombras multi-camada refinadas.

```typescript
import { SHADOW_VALUES, SHADOW_DARK_VALUES } from '@/lib/theme/tokens';

console.log(SHADOW_VALUES.LIGHT.DEFAULT); 
// '0 4px 12px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.05)'
console.log(SHADOW_DARK_VALUES.DEFAULT);
// '0 4px 12px rgba(0, 0, 0, 0.18), 0 8px 24px rgba(0, 0, 0, 0.12)'
```

### COLORS

Define as cores Apple 2026.

```typescript
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_SUCCESS,
  COLOR_WARNING,
  COLOR_DANGER,
  COLOR_TEXT_PRIMARY,
  COLOR_TEXT_SECONDARY,
} from '@/lib/theme/tokens';

console.log(COLOR_PRIMARY); // '#007AFF'
console.log(COLOR_SUCCESS); // '#34C759'
```

## Componentes de Tema

### GlassPanel

Componente base de painel de vidro com efeitos de glassmorphism.

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
      <h1>Componente Animado</h1>
      <p>Conteúdo aqui</p>
    </GlassMotion>
  );
}
```

### MicroInteractions

Componentes de micro-interações com Framer Motion.

```typescript
import {
  HoverScale,
  TapScale,
  Float,
  Shimmer,
  FadeIn,
  SlideUp,
} from '@/components/animation/MicroInteractions';

export function MyComponent() {
  return (
    <div>
      <HoverScale>
        <button>Botão com Hover</button>
      </HoverScale>

      <TapScale>
        <button>Botão com Tap</button>
      </TapScale>

      <Float>
        <div>Elemento Flutuante</div>
      </Float>

      <Shimmer>
        <div>Elemento com Shimmer</div>
      </Shimmer>

      <FadeIn>
        <div>Elemento com Fade In</div>
      </FadeIn>

      <SlideUp>
        <div>Elemento com Slide Up</div>
      </SlideUp>
    </div>
  );
}
```

### Medical Components

Componentes médicos com animações específicas.

```typescript
import { EmergencyPulse } from '@/components/medical/EmergencyPulse';
import { MedicalShimmer } from '@/components/medical/MedicalShimmer';

export function MyComponent() {
  return (
    <div>
      <EmergencyPulse severity="critical">
        <div>⚠️ Alerta Crítica</div>
      </EmergencyPulse>

      <MedicalShimmer>
        <div>Carregando dados médicos...</div>
      </MedicalShimmer>
    </div>
  );
}
```

### Performance Monitor

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
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      <h1>Componente Animado</h1>
    </motion.div>
  );
}
```

### AnimatePresence

Componente para animar entrada e saída de elementos.

```typescript
import { AnimatePresence } from 'framer-motion';

export function MyComponent({ show }: { show: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <h1>Componente</h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

## Performance Monitoramento

### Web Vitals

Configuração para monitorar métricas de performance essenciais.

```typescript
import { reportWebVitals } from '@/lib/performance';

// Inicializar no início da aplicação
reportWebVitals();
```

### Performance Observer

Classe para monitorar performance em tempo real.

```typescript
import { PerformanceObserver } from '@/lib/performance';

export function MyComponent() {
  useEffect(() => {
    const observer = new PerformanceObserver();

    observer.onPerformanceUpdate(() => {
      const fps = observer.getFPS();
      console.log('FPS:', fps);
    });

    return () => {
      observer.stop();
    };
  }, []);
}
```

### Performance Tracker

Classe para rastrear métricas de performance.

```typescript
import { PerformanceTracker } from '@/lib/performance';

export function MyComponent() {
  const tracker = new PerformanceTracker();

  const interval = setInterval(() => {
    const metrics = tracker.getMetrics();
    console.log('Metrics:', metrics);
  }, 1000);

  useEffect(() => {
    return () => {
      clearInterval(interval);
      tracker.stop();
    };
  }, []);
}
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
    <div className="backdrop-blur-[40px] saturate-[180%] opacity-[0.28]">
      ...
    </div>
  );
}
```

### 2. Usar Variantes Apropriadas

Escolha a variante apropriada para o contexto do componente.

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
import { useTheme } from '@/lib/theme/hooks';

export function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  );
}
```

### 4. Otimizar Performance

Use GPU acceleration, CSS containment e will-change para otimizar performance.

```typescript
export function MyComponent() {
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
- [Documentação Oficial](../README.md)
- [Tokens de Design](../../lib/theme/tokens.ts)
- [Hooks de Tema](../../lib/theme/hooks.ts)
- [Componentes de Tema](../components/)

## Suporte

Para dúvidas ou problemas, consulte a documentação ou abra uma issue no repositório.
