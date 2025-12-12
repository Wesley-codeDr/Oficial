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
**Baseado em**: Apple Human Interface Guidelines 2025

