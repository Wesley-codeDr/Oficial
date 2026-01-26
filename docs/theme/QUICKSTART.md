# Guia de Início Rápido - Apple Liquid Glass 2026

Bem-vindo ao sistema de tema **Apple Liquid Glass 2026**! Este guia vai ajudá-lo a começar a usar o sistema de tema rapidamente.

## O que é o Apple Liquid Glass 2026?

O Apple Liquid Glass 2026 é um design system inspirado na estética da Apple iOS 2026, caracterizado por:

- **Efeitos de Vidro (Glassmorphism):** Backdrop-blur de 40px, saturate de 180%
- **Efeitos Visuais:** Specular highlight, rim light, inner glow, noise texture
- **Tipografia iOS 2026:** SF Pro Display, SF Pro Text, SF Pro Caption, SF Mono
- **Espaçamento iOS 2026:** Escala base 8px
- **Cores Apple 2026:** Medical Blue, Medical Green, Medical Teal, Emergency Red/Orange/Yellow
- **Animações Sutis:** Hover scale, tap scale, float, pulse, shimmer, ripple, slide, scale, fade, bounce, haptic
- **Animações Avançadas:** Framer Motion com física de mola

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

### 5. Usar Animações com Framer Motion

```typescript
import { GlassMotion } from '@/components/animation/GlassMotion';
import { HoverScale, TapScale, Float, FadeIn } from '@/components/animation/MicroInteractions';

export function MyComponent() {
  return (
    <div>
      <GlassMotion variant="default">
        <h1>Componente Animado</h1>
      </GlassMotion>

      <HoverScale>
        <button>Botão com Hover</button>
      </HoverScale>

      <TapScale>
        <button>Botão com Tap</button>
      </TapScale>

      <Float>
        <div>Elemento Flutuante</div>
      </Float>

      <FadeIn>
        <div>Elemento com Fade In</div>
      </FadeIn>
    </div>
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

- [Documentação Oficial](../README.md)
- [Tokens de Design](../../lib/theme/tokens.ts)
- [Hooks de Tema](../../lib/theme/hooks.ts)

## Suporte

Para dúvidas ou problemas, consulte a documentação ou abra uma issue no repositório.
