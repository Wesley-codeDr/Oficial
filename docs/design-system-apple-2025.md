# Design System - Apple 2025 Style Guide

> Referência de design para o ChatWell e componentes WellWave seguindo os princípios Apple Human Interface Guidelines 2025.
> Complementos: janelas/multitarefa em `docs/design-system/windows-hig.md` e linguagem em `docs/design-system/writing-guidelines.md`.

---

## 🎯 Princípios Fundamentais

### 1. Content-First Design
- O conteúdo é o protagonista, não a interface
- Containers mínimos e invisíveis
- Hierarquia através de tipografia, não bordas

### 2. Calm Technology
- Interface que não compete por atenção
- Avisos e disclaimers discretos, não dominantes
- Microinterações sutis e significativas

### 3. Spatial Design
- White space generoso e intencional
- Ritmo vertical consistente
- Agrupamento visual claro

---

## 📐 Tokens de Design

### Typography Scale (Apple SF Pro Reference)

| Token | Size | Weight | Tracking | Uso |
|-------|------|--------|----------|-----|
| `largeTitle` | 34px | 700 | -0.02em | Títulos de página |
| `title1` | 28px | 600 | -0.015em | Seções principais |
| `title2` | 22px | 600 | -0.01em | Subtítulos |
| `title3` | 20px | 600 | -0.01em | Cards destacados |
| `headline` | 17px | 600 | -0.005em | Títulos de lista |
| `body` | 17px | 400 | 0 | Texto principal |
| `callout` | 16px | 400 | 0 | Destaque secundário |
| `subheadline` | 15px | 400 | 0 | Texto de suporte |
| `footnote` | 13px | 400 | 0 | Metadados |
| `caption1` | 12px | 400 | 0 | Labels pequenas |
| `caption2` | 11px | 400 | 0 | Disclaimers |

### Spacing Scale

```css
/* Apple-inspired spacing */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 12px;
--space-lg: 16px;
--space-xl: 20px;
--space-2xl: 24px;
--space-3xl: 32px;
--space-4xl: 40px;
--space-5xl: 48px;
```

### Border Radius (Squircle)

```css
--radius-xs: 8px;      /* Badges, small elements */
--radius-sm: 12px;     /* Buttons, inputs */
--radius-md: 16px;     /* Cards pequenos */
--radius-lg: 20px;     /* Cards médios */
--radius-xl: 24px;     /* Cards grandes */
--radius-2xl: 32px;    /* Containers principais */
--radius-full: 9999px; /* Pills, avatars */
```

### Colors - Semantic

```css
/* Backgrounds */
--bg-primary: rgba(255, 255, 255, 0.70);      /* Cards */
--bg-secondary: rgba(0, 0, 0, 0.02);          /* Nested */
--bg-tertiary: rgba(0, 0, 0, 0.04);           /* Inputs */

/* Hover States */
--hover-primary: rgba(0, 0, 0, 0.04);         /* List items */
--hover-secondary: rgba(0, 0, 0, 0.07);       /* Buttons */

/* Active States */
--active-primary: rgba(0, 0, 0, 0.08);        /* Press feedback */

/* Borders */
--border-subtle: rgba(0, 0, 0, 0.04);         /* Separadores */
--border-default: rgba(0, 0, 0, 0.08);        /* Cards */

/* Text */
--text-primary: rgba(0, 0, 0, 0.90);          /* Títulos */
--text-secondary: rgba(0, 0, 0, 0.60);        /* Labels */
--text-tertiary: rgba(0, 0, 0, 0.40);         /* Metadata */
--text-quaternary: rgba(0, 0, 0, 0.25);       /* Disclaimers */
```

### Shadows

```css
/* Elevation levels */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.08);
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.10);
```

### Transitions

```css
/* Apple timing functions */
--ease-apple: cubic-bezier(0.25, 0.1, 0.25, 1);
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
--ease-out: cubic-bezier(0, 0, 0.2, 1);

/* Durations */
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
```

---

## 🧩 Padrões de Componentes

### Lists (Apple Settings Style)

```tsx
// Grouped list with rounded corners
<div className="rounded-2xl overflow-hidden bg-white/70 dark:bg-white/[0.04]">
  {items.map((item, i) => (
    <div 
      key={item.id}
      className={cn(
        "px-4 py-3.5 flex items-center",
        "hover:bg-black/[0.02] active:bg-black/[0.04]",
        i !== items.length - 1 && "border-b border-black/[0.04]"
      )}
    >
      {/* content */}
    </div>
  ))}
</div>
```

### Buttons

```tsx
// Primary CTA
<button className="
  h-[50px] px-7 rounded-full
  bg-foreground text-background
  font-medium text-[16px]
  shadow-sm hover:shadow-md
  active:scale-[0.97]
  transition-all duration-200
">
  Action
</button>

// Secondary/Pill
<button className="
  h-9 px-3.5 rounded-full
  bg-black/[0.04] hover:bg-black/[0.07]
  text-[14px] font-medium
  transition-all duration-150
">
  Label
</button>
```

### Cards

```tsx
// Glass card
<div className="
  p-4 rounded-2xl
  bg-white/70 dark:bg-white/[0.04]
  border border-black/[0.04] dark:border-white/[0.06]
  backdrop-blur-xl
">
  {/* content */}
</div>
```

### Empty States

```tsx
<div className="flex flex-col items-center py-16 text-center">
  {/* Icon with gradient background */}
  <div className="relative mb-6">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl" />
    <div className="relative p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
      <Icon className="h-7 w-7 text-blue-500" />
    </div>
  </div>
  
  {/* Title */}
  <h2 className="text-[20px] font-semibold mb-2">
    Título Claro
  </h2>
  
  {/* Description */}
  <p className="text-[15px] text-muted-foreground/70 max-w-[260px] mb-8">
    Descrição concisa e acionável.
  </p>
  
  {/* CTA */}
  <Button variant="default" size="lg">
    Ação Principal
  </Button>
</div>
```

### Disclaimers

```tsx
// Whisper-quiet disclaimer (Apple style)
<p className="text-[11px] text-muted-foreground/40 text-center">
  Texto do disclaimer · Segunda parte
</p>

// ❌ Evitar: Banner dominante com cor saturada
<div className="bg-amber-500/20 p-4 rounded-xl">
  <p>⚠️ Aviso importante...</p>
</div>
```

---

## ✅ Do's & Don'ts

### Do's ✅

1. **Use tipografia para hierarquia** - Não containers
2. **Espaçamento generoso** - Respiro visual
3. **Transições sutis** - 150-200ms, ease-out
4. **Cores de sistema** - Evite cores customizadas
5. **Feedbacks discretos** - Hover leve, active scale

### Don'ts ❌

1. **Bordas pesadas** - Use opacity 4-8%
2. **Sombras dramáticas** - Menos é mais
3. **Cores saturadas em avisos** - Use tons suaves
4. **Redundância visual** - Um ícone basta
5. **Labels óbvias** - "2 conversas" quando há 2 cards

---

## 📱 Responsive Breakpoints

```css
/* Mobile-first approach */
sm: 640px   /* Tablet portrait */
md: 768px   /* Tablet landscape */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Content Width

```css
/* Max-width for content areas */
--content-width-narrow: 480px;  /* Forms, dialogs */
--content-width-default: 640px; /* Lists, content */
--content-width-wide: 800px;    /* Rich content */
```

---

## 🎨 Referências

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [SF Symbols](https://developer.apple.com/sf-symbols/)
- iOS 18 / macOS Sequoia design patterns

---

*Última atualização: Dezembro 2024*
