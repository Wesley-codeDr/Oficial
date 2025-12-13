# Apple 2025 Design Guidelines - WellWave

> Diretrizes de design para interfaces premium seguindo os princípios Apple Human Interface Guidelines 2025.

---

## 🎯 Princípios Fundamentais

### 1. Content-First Design
- **Menos containers, mais conteúdo**
- Informação útil sempre visível
- Decorações apenas quando servem a um propósito

### 2. Calm Technology
- Avisos discretos, não intrusivos
- Confiança implícita na interface
- Feedback sutil e contextual

### 3. Hierarquia Clara
- 3 níveis máximos de destaque
- Espaçamento consistente entre seções
- Tipografia com propósito definido

### 4. Breathing Room
- White space generoso (mínimo 24px entre seções)
- Margens internas consistentes
- Ritmo vertical previsível

---

## 📐 Tokens de Design

### Spacing Scale (8px base)

```css
--space-1: 4px;    /* Micro adjustments */
--space-2: 8px;    /* Tight spacing */
--space-3: 12px;   /* Default padding */
--space-4: 16px;   /* Card padding */
--space-5: 20px;   /* Section gap small */
--space-6: 24px;   /* Section gap medium */
--space-8: 32px;   /* Section gap large */
--space-10: 40px;  /* Page margins */
--space-12: 48px;  /* Hero spacing */
```

### Typography Scale (SF-inspired)

```css
/* Headlines */
--text-hero: 40px;        /* Page hero titles */
--text-title-1: 32px;     /* Primary headings */
--text-title-2: 28px;     /* Section headings */
--text-title-3: 22px;     /* Subsection headings */

/* Body */
--text-body: 17px;        /* Primary body text */
--text-body-sm: 15px;     /* Secondary body text */
--text-caption: 13px;     /* Metadata, timestamps */
--text-footnote: 12px;    /* Disclaimers, legal */
--text-micro: 11px;       /* Badges, labels */
```

### Font Weights

```css
--font-regular: 400;      /* Body text */
--font-medium: 500;       /* Emphasized text */
--font-semibold: 600;     /* Headings, CTAs */
--font-bold: 700;         /* Hero titles only */
```

### Border Radius (Squircle scale)

```css
--radius-xs: 8px;         /* Tags, badges */
--radius-sm: 12px;        /* Buttons, inputs */
--radius-md: 16px;        /* Cards small */
--radius-lg: 20px;        /* Cards medium */
--radius-xl: 24px;        /* Cards large */
--radius-2xl: 32px;       /* Modal, panels */
--radius-full: 9999px;    /* Pills, avatars */
```

### Shadows (Layered depth)

```css
/* Light theme */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.08);
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.12);

/* Dark theme */
--shadow-sm-dark: 0 1px 2px rgba(0, 0, 0, 0.2);
--shadow-md-dark: 0 4px 12px rgba(0, 0, 0, 0.3);
--shadow-lg-dark: 0 8px 24px rgba(0, 0, 0, 0.4);
--shadow-xl-dark: 0 16px 48px rgba(0, 0, 0, 0.5);
```

### Colors (Opacity-based hierarchy)

```css
/* Text hierarchy */
--text-primary: 100%;     /* Headings, important */
--text-secondary: 70%;    /* Body text */
--text-tertiary: 50%;     /* Metadata */
--text-quaternary: 30%;   /* Disabled, hints */

/* Backgrounds */
--bg-hover: 3%;           /* Subtle hover */
--bg-active: 5%;          /* Active/pressed */
--bg-muted: 8%;           /* Muted containers */
--bg-elevated: 12%;       /* Cards, modals */
```

---

## 🏥 Sistema de Cores Healthcare

### Fundamento: Psicologia das Cores na Saúde

A paleta de cores do WellWave foi desenvolvida com base em pesquisas sobre psicologia das cores em ambientes de saúde:

| Cor | Hex | Uso | Fundamento Psicológico |
|-----|-----|-----|------------------------|
| **Azul Médico** | `#0066CC` | Primária/CTAs | Confiança, segurança, profissionalismo. Reduz ansiedade do paciente. |
| **Azul Navy** | `#1E3A5F` | Textos/Headers | Autoridade, estabilidade. Fácil leitura prolongada. |
| **Verde Saúde** | `#059669` | Sucesso/Estável | Esperança, vitalidade, renovação. Associado a "tudo bem". |
| **Âmbar Atenção** | `#D97706` | Alertas médios | Cautela sem alarme. Pede atenção sem pânico. |
| **Vermelho Crítico** | `#DC2626` | Red Flags | Urgência imediata. Ativa resposta de ação. |
| **Teal Accent** | `#0D9488` | Destaques/Links | Inovação tecnológica. Diferencia de azul primário. |

### Paleta Healthcare

```css
/* Cores Primárias */
--healthcare-primary: #0066CC;      /* Azul Médico */
--healthcare-primary-light: #3385D6;
--healthcare-primary-dark: #004C99;

--healthcare-secondary: #1E3A5F;    /* Navy */
--healthcare-secondary-light: #2D4A6F;

--healthcare-accent: #0D9488;       /* Teal */
--healthcare-accent-light: #14B8A6;
```

### Sistema de Urgência Clínica

```css
/* Critical - Vermelho (Emergência) */
--clinical-critical: #DC2626;
--clinical-critical-light: #FEE2E2;  /* Background */
--clinical-critical-dark: #B91C1C;

/* Warning - Âmbar (Atenção) */
--clinical-warning: #D97706;
--clinical-warning-light: #FEF3C7;
--clinical-warning-dark: #B45309;

/* Stable - Verde (Estável) */
--clinical-stable: #059669;
--clinical-stable-light: #D1FAE5;
--clinical-stable-dark: #047857;

/* Info - Azul Primário */
--clinical-info: #0066CC;
--clinical-info-light: #DBEAFE;
```

### Uso em Componentes

```tsx
// Acuidade de Pacientes (Kanban)
const acuityColors = {
  critical: 'bg-clinical-critical',      // Emergência
  warning: 'bg-clinical-warning',        // Atenção
  stable: 'bg-clinical-stable',          // Estável
  info: 'bg-healthcare-primary',         // Rotina
}

// Red Flags Alert
<div className="bg-clinical-critical-light border-clinical-critical/50">
  <AlertTriangle className="text-clinical-critical" />
</div>

// Botões Primários
<Button className="bg-healthcare-primary hover:bg-healthcare-primary-dark">
  Confirmar
</Button>

// Focus Rings
<input className="focus-visible:ring-healthcare-primary/30" />
```

### Healthcare Liquid Glass - Apple HIG Principles

> **Princípio Central**: "Use color sparingly in Liquid Glass. To reduce visual noise, limit the amount of color you apply to the material. Reserve color for elements that truly benefit from emphasis, such as status indicators or key actions."

Implementação otimizada para ambientes clínicos (70-85% opacidade) com **bordas e shadows neutros**:

```css
/* Light Mode - Apple HIG: Neutro */
--glass-bg: rgba(255, 255, 255, 0.82);
--glass-bg-elevated: rgba(255, 255, 255, 0.90);
--glass-blur: blur(16px);
--glass-border: rgba(0, 0, 0, 0.08);       /* Neutro */
--glass-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);

/* Dark Mode - Apple HIG: Neutro */
--glass-bg: rgba(15, 23, 42, 0.85);
--glass-bg-elevated: rgba(30, 41, 59, 0.90);
--glass-border: rgba(255, 255, 255, 0.10);
```

### Uso de Cor no Liquid Glass (Apple HIG)

#### Onde USAR cor:
- ✅ Status clínicos (vermelho/amarelo/verde) - indicadores de urgência
- ✅ Botões primários de ação ("Confirmar", "Salvar", "Done")
- ✅ Ícones funcionais (na camada de conteúdo)
- ✅ Texto de destaque
- ✅ Badges e indicadores de status
- ✅ Focus rings (acessibilidade)

#### Onde NÃO usar cor:
- ❌ Background do material Liquid Glass (manter neutro)
- ❌ Bordas de containers genéricos
- ❌ Todos os botões (apenas os proeminentes)
- ❌ Shadows do material glass
- ❌ Containers de avatar (cor só no ícone)

---

## Apple HIG Materials System

> **"Don't use Liquid Glass in the content layer. Liquid Glass works best when it provides a clear distinction between interactive elements and content."**

### Dois Layers Distintos

| Layer | Material | Uso |
|-------|----------|-----|
| **Controles/Navegação** | Liquid Glass | Sidebars, Tab bars, Toolbars, Modais, Popovers |
| **Conteúdo** | Standard Materials | Cards, Backgrounds, Áreas de conteúdo |

### Liquid Glass (Controls Layer)

```css
/* Regular - blurs background, maintains legibility */
.liquid-glass { ... }

/* Clear - highly translucent, for media backgrounds */
.liquid-glass-clear { ... }

/* Interactive - for transient elements (sliders, toggles) */
.liquid-glass-interactive { ... }
```

**Quando usar:**
- ✅ Sidebar, Tab bar, Toolbar
- ✅ Modais e Popovers
- ✅ Elementos de navegação que flutuam sobre o conteúdo

**Quando NÃO usar:**
- ❌ Cards de conteúdo
- ❌ Backgrounds de áreas de conteúdo
- ❌ Elementos que não são de navegação/controle

### Standard Materials (Content Layer)

```css
/* Ultra Thin - mais translúcido */
.material-ultra-thin { ... }

/* Thin - levemente mais opaco */
.material-thin { ... }

/* Regular - opacidade balanceada (default) */
.material-regular { ... }

/* Thick - mais opaco */
.material-thick { ... }
```

**Uso recomendado:**
| Material | Recomendado para |
|----------|------------------|
| ultra-thin | Views full-screen, esquema claro |
| thin | Overlays que obscurecem parcialmente |
| regular | Cards, content areas (default) |
| thick | Elementos que precisam de esquema escuro |

### Sistema de Vibrancy

Use cores vibrantes sobre materials para garantir legibilidade.

#### Labels (texto)
```css
.vibrant-label           /* Primary - máximo contraste */
.vibrant-label-secondary /* Body text */
.vibrant-label-tertiary  /* Metadata, footnotes */
.vibrant-label-quaternary /* Disabled, hints */
```

#### Fills (backgrounds interativos)
```css
.vibrant-fill           /* Primary fill */
.vibrant-fill-secondary /* Secondary fill */
.vibrant-fill-tertiary  /* Tertiary fill */
```

#### Separators
```css
.vibrant-separator /* Dividers */
```

### Classes de Componentes

| Classe | Uso | Layer |
|--------|-----|-------|
| `.sidebar-glass` | Sidebar navigation | Liquid Glass |
| `.modal-glass` | Modais/Dialogs | Liquid Glass |
| `.popover-glass` | Popovers/Dropdowns | Liquid Glass |
| `.toolbar-glass` | Toolbars | Liquid Glass |
| `.tabbar-glass` | Tab bars | Liquid Glass |
| `.card-material` | Cards de conteúdo | Standard Material |

### Uso no GlassCard

```tsx
// Content layer (default) - Standard Material
<GlassCard>Content</GlassCard>

// Com peso específico
<GlassCard weight="thin">Thin content</GlassCard>
<GlassCard weight="thick">Elevated content</GlassCard>

// Controls layer - Liquid Glass (use sparingly!)
<GlassCard variant="liquid">Navigation element</GlassCard>

// For media backgrounds
<GlassCard variant="liquid-clear">Over video/images</GlassCard>
```

### Referências Científicas

- **Azul**: Estudos mostram que ambientes azuis reduzem frequência cardíaca e pressão arterial (Küller et al., 2006)
- **Verde**: Associado a recuperação e bem-estar em ambientes hospitalares (Ulrich, 1984)
- **Vermelho**: Ativa sistema nervoso simpático - ideal para alertas críticos (Wilson, 1966)

---

## 🧩 Padrões de Componentes

### Headers

```tsx
// ✅ Correto: Simples e direto
<header className="mb-10">
  <h1 className="text-[28px] font-semibold tracking-tight">
    ChatWell
  </h1>
  <p className="text-[15px] text-muted-foreground/80">
    Suporte clínico baseado em evidências
  </p>
</header>

// ❌ Evitar: Gradientes, ícones decorativos, status badges
<header>
  <div className="flex items-center gap-3">
    <div className="rounded-2xl bg-gradient-to-br...">
      <Sparkles />
    </div>
    <h1 className="bg-gradient-to-r bg-clip-text text-transparent">
      ChatWell
    </h1>
    <div className="h-4 w-4 bg-green-500" /> {/* status */}
  </div>
</header>
```

### List Items

```tsx
// ✅ Correto: Hover sutil, sem containers visíveis
<div className="hover:bg-black/[0.03] rounded-2xl px-4 py-4 -mx-4">
  <p className="text-[15px] font-medium truncate">
    {title}
  </p>
  <div className="text-[13px] text-muted-foreground/70">
    {metadata}
  </div>
</div>

// ❌ Evitar: Cards com bordas/sombras para cada item
<GlassCard className="p-5">
  <div className="flex items-center gap-4">
    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br...">
      <MessageSquare />
    </div>
    ...
  </div>
</GlassCard>
```

### Buttons (CTA)

```tsx
// Primary (filled)
className="bg-foreground text-background rounded-full h-10 px-5"

// Secondary (pill outline)
className="bg-muted/60 border border-border/50 rounded-full h-9 px-4"

// Minimal (icon only)
className="h-9 w-9 rounded-full hover:bg-muted/80"
```

### Disclaimers/Avisos

```tsx
// ✅ Correto: Discreto, footer position
<footer className="pb-8">
  <div className="flex items-center justify-center gap-2 py-3">
    <Info className="h-3.5 w-3.5 text-muted-foreground/40" />
    <p className="text-[12px] text-muted-foreground/50">
      Suporte à decisão clínica. Não substitui avaliação médica.
    </p>
  </div>
</footer>

// ❌ Evitar: Banners coloridos, múltiplos avisos
<div className="rounded-2xl bg-amber-500/10 border-amber-500/20 p-4">
  <p className="text-amber-700">
    ⚠️ <strong>Aviso:</strong> Este assistente é para suporte...
  </p>
</div>
```

### Empty States

```tsx
// ✅ Correto: Minimal, convite suave
<div className="flex flex-col items-center py-20 text-center">
  <div className="mb-6 p-4 rounded-full bg-muted/50">
    <Icon className="h-8 w-8 text-muted-foreground/40" />
  </div>
  <h2 className="text-[17px] font-medium mb-2">Título</h2>
  <p className="text-[15px] text-muted-foreground/70 max-w-[280px] mb-8">
    Descrição breve e útil.
  </p>
  <Button>CTA</Button>
</div>

// ❌ Evitar: Gradientes, animações, múltiplos CTAs
```

---

## 🚫 Anti-Patterns a Evitar

1. **Gradientes em texto** para títulos primários
2. **Ícones decorativos** sem função interativa
3. **Status badges** sem contexto claro
4. **Bordas coloridas** (border-l-4 style)
5. **Múltiplos níveis** de containers aninhados
6. **Avisos repetidos** com a mesma mensagem
7. **Emojis em UI** profissional (⚠️)
8. **Sombras pesadas** em cada elemento

---

## 📱 Responsividade

### Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet portrait */
lg: 1024px  /* Tablet landscape */
xl: 1280px  /* Desktop */
2xl: 1536px /* Large desktop */
```

### Container Max-Widths

```css
--content-xs: 320px;   /* Modals, narrow dialogs */
--content-sm: 480px;   /* Mobile-optimized */
--content-md: 640px;   /* Reading content */
--content-lg: 768px;   /* Forms, lists */
--content-xl: 1024px;  /* Dashboards */
```

---

## ✨ Microinterações

### Hover States

```css
/* List items */
transition: background-color 200ms;
hover:bg-black/[0.03] dark:hover:bg-white/[0.03]

/* Buttons */
transition: all 200ms;
hover:opacity-90 active:scale-[0.98]

/* Cards (quando apropriado) */
transition: transform 200ms, box-shadow 200ms;
hover:translateY(-2px) hover:shadow-lg
```

### Chevrons

```tsx
<ChevronRight 
  className="transition-all duration-200 
             group-hover:text-foreground/60 
             group-hover:translate-x-0.5"
/>
```

---

## 📐 Apple HIG Layout System

### Safe Areas

O sistema de safe areas garante que o conteúdo respeite os limites físicos do dispositivo (notch, Dynamic Island, home indicator).

```css
/* CSS Variables disponíveis */
--safe-area-top: env(safe-area-inset-top, 0px);
--safe-area-right: env(safe-area-inset-right, 0px);
--safe-area-bottom: env(safe-area-inset-bottom, 0px);
--safe-area-left: env(safe-area-inset-left, 0px);

/* Utility classes */
.safe-area-top     /* padding-top: safe area */
.safe-area-bottom  /* padding-bottom: safe area */
.safe-area-left    /* padding-left: safe area */
.safe-area-right   /* padding-right: safe area */
.safe-area-x       /* left + right */
.safe-area-y       /* top + bottom */
.safe-area-all     /* todos os lados */
```

### Layout Guides (Margens Consistentes)

```css
--layout-margin-compact: 16px;  /* Mobile */
--layout-margin-regular: 20px;  /* Tablet/Desktop */
--layout-margin-wide: 24px;     /* Large screens */

/* Content insets (safe area + margin) */
--content-inset-top
--content-inset-bottom
--content-inset-horizontal
```

### Touch Targets (Apple HIG Minimum 44pt)

```css
--touch-target-min: 44px;
--touch-target-spacing: 8px;

/* Utility classes */
.touch-target      /* min-width/height 44px, flex center */
.touch-hitarea     /* Expand hit area via ::before */
.min-h-touch       /* Tailwind: min-height: 44px */
.min-w-touch       /* Tailwind: min-width: 44px */
```

### Size Classes

Apple HIG define duas size classes principais:
- **Compact**: < 768px (iPhone portrait, iPad split view)
- **Regular**: >= 768px (iPad full, desktop)

```tsx
// Hook disponível
import { useSizeClass } from '@/lib/hooks';

const { isCompact, isRegular, horizontal } = useSizeClass();

// CSS classes
.size-compact:hidden  /* Esconde em compact */
.size-regular:hidden  /* Esconde em regular */
.size-compact:block   /* Mostra em compact */
.size-regular:block   /* Mostra em regular */
```

### Scroll Edge Effects

```tsx
import { useScrollEdge, useScrollEdgeClass } from '@/lib/hooks';

const scrollRef = useRef<HTMLDivElement>(null);
const { isAtTop, canScroll } = useScrollEdge(scrollRef);
const scrollAttrs = useScrollEdgeClass(scrollRef);

<div
  ref={scrollRef}
  className="scroll-edge-top overflow-auto"
  {...scrollAttrs}
>
  {/* Content */}
</div>
```

### Content Grouping

```css
/* Separadores */
.separator-inset   /* Linha com margens */
.separator-full    /* Linha full width */

/* Grupos de conteúdo */
.content-group     /* Container com glass effect */

/* Espaçamento */
.spacer-section    /* 32px mobile, 48px desktop */
.spacer-sm         /* 8px */
.spacer-md         /* 16px */
.spacer-lg         /* 24px */
.spacer-xl         /* 32px */
```

### Componentes de Layout

```tsx
// SafeAreaProvider - Aplica safe areas
import { SafeAreaProvider } from '@/components/layout/shared-layout';

<SafeAreaProvider edges={['top', 'bottom']}>
  <YourContent />
</SafeAreaProvider>

// ContentContainer - Conteúdo centralizado com max-width
import { ContentContainer } from '@/components/layout/shared-layout';

<ContentContainer maxWidth="md">  {/* 640px - padrão Apple */}
  <YourContent />
</ContentContainer>
```

### Adaptive Typography

```css
/* Tipografia que escala com viewport */
.text-adaptive-large-title  /* clamp(28px, 5vw, 34px) */
.text-adaptive-title1       /* clamp(24px, 4.5vw, 28px) */
.text-adaptive-title2       /* clamp(20px, 4vw, 22px) */
.text-adaptive-body         /* clamp(15px, 3.5vw, 17px) */
```

---

## 📋 Checklist de Revisão

Antes de finalizar qualquer tela, verifique:

- [ ] Título único e claro (sem repetições)
- [ ] Máximo 2 níveis de hierarquia visual
- [ ] Avisos discretos e não redundantes
- [ ] Ícones apenas quando funcionais
- [ ] Espaçamento consistente (8px grid)
- [ ] Hover states sutis
- [ ] Empty states informativos
- [ ] Tipografia legível (mínimo 13px)
- [ ] Contraste adequado (WCAG AA)
- [ ] Sem gradientes em elementos de texto

---

**Última atualização**: Dezembro 2024
**Baseado em**: Apple Human Interface Guidelines 2025, Psicologia das Cores na Saúde
**Paleta**: Healthcare Liquid Glass (#0066CC Primary)

