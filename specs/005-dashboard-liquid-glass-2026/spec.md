# Specification: Apple Liquid Glass 2026 - Dashboard Completo

**Feature ID:** 005  
**Created:** 2026-01-08  
**Status:** Draft  
**Version:** 1.0.0  
**Author:** AI Assistant (Claude) + Wesley (User Feedback)  
**Last Updated:** 2026-01-08  

> **Spec-Kit Compliance:** This specification follows the [GitHub Spec-Kit](https://github.com/github/spec-kit) standards for Spec-Driven Development.

---

## Overview

Esta especificação define a implementação **completa e autêntica** do **Apple Liquid Glass Design Language 2026** em todo o dashboard do WellWave. O objetivo é elevar o nível visual da aplicação para os padrões mais modernos da Apple, com glassmorphism pronunciado, efeitos de refração, sombras volumétricas e micro-interações sofisticadas.

### Problem Statement

**Current Issues:**

1. **Glassmorphism Insuficiente**: Cards usam `bg-white/55` (55% opacidade) quando o padrão Liquid Glass 2026 requer `bg-white/25` (25%) com `saturate(180%)`
2. **Blur Moderado**: Backdrop blur de 40px é adequado, mas 60px cria o efeito de profundidade líquida característico
3. **Falta de Refração de Luz**: Ausência de gradientes diagonais internos e inner shadows que simulam refração de luz
4. **Bordas Flat**: Bordas sem o brilho luminoso característico (`inset 0 1px 1px rgba(255,255,255,0.4)`)
5. **Sidebar Flat**: Sidebar não se destaca visualmente do fundo, sem efeito de vidro flutuante
6. **Border-Radius Inconsistente**: Cards usam 20-24px quando o padrão é 32px para large containers
7. **Shadows Genéricas**: Faltam shadows coloridas difusas nos elementos interativos
8. **Background Simples**: Fundo neutro sem gradientes sutis ou formas abstratas blur
9. **Ícones Sem Glow**: Ícones ativos não têm o efeito de glow característico
10. **Tipografia Básica**: Números grandes com peso muito bold (deveria ser 300-400)

**Impact:**

- Design não atinge o nível premium esperado para aplicações médicas profissionais
- Inconsistência com Apple Design Language 2025 mandatado pela Constitution v2.0.0
- Perda de oportunidade de diferenciação visual no mercado de healthtech
- UX menos imersiva e moderna

### Proposed Solution

Implementar **10 melhorias críticas** para atingir autenticidade Liquid Glass 2026:

#### 🔴 **Tier 1: Glassmorphism Core (Must Have)**

1. **Transparência Reduzida & Saturação**
   - `bg-white/55` → `bg-white/25`
   - Adicionar `backdrop-filter: saturate(180%)`
   - `backdrop-blur-[40px]` → `backdrop-blur-[60px]`

2. **Bordas Luminosas & Inner Shadows**
   - Adicionar `box-shadow: inset 0 1px 1px rgba(255,255,255,0.4)`
   - Border: `1px solid rgba(255,255,255,0.3)`

3. **Refração de Luz**
   - Gradiente diagonal de luz no topo dos cards
   - Efeito de brilho interno simulando vidro

4. **Sidebar Glass Flutuante**
   - Separar visualmente do background
   - Shadow profunda: `0 25px 50px -12px rgba(0,0,0,0.25)`
   - Background translúcido com blur

#### 🟡 **Tier 2: Visual Refinement (Should Have)**

5. **Cards de Métricas Aprimorados**
   - Border-radius: `24px` → `32px`
   - Shadow dupla: `0 8px 32px rgba(0,0,0,0.1), inset 0 2px 0 rgba(255,255,255,0.2)`

6. **Botões com Shadow Colorida**
   - Gradiente com transparência mantido
   - Shadow colorida: `0 4px 20px rgba(59,130,246,0.4)` para botões azuis
   - Shadow para red flags: `0 4px 20px rgba(255,59,48,0.4)`

7. **Background Gradiente Sutil**
   - Gradiente com cores pastel: `from-blue-50/30 via-purple-50/20 to-pink-50/30`
   - Formas abstratas blur (estilo macOS Sonoma) - opcional

#### 🟢 **Tier 3: Polish & Animations (Nice to Have)**

8. **Ícones com Glow**
   - `filter: drop-shadow(0 0 8px currentColor)` em ícones ativos
   - Glow do mesmo tom da cor do ícone

9. **Tipografia Refinada**
   - Números grandes: `font-weight: 300` (Thin)
   - `letter-spacing: -0.03em` para display text

10. **Micro-interações**
    - Hover: `transform: translateY(-2px)`
    - Efeito de "respiração" em elementos ativos
    - Transições com spring physics

### Goals

- [x] Implementar glassmorphism autêntico (25% opacity + saturate 180%)
- [x] Aplicar bordas luminosas e inner shadows em todos os cards
- [x] Criar sidebar flutuante com efeito de vidro separado
- [x] Aumentar border-radius para 32px em large containers
- [x] Adicionar shadows coloridas difusas em botões e CTAs
- [x] Implementar background gradiente sutil
- [x] Adicionar glow em ícones ativos
- [x] Refinar tipografia (font-weight, letter-spacing)
- [x] Implementar micro-interações suaves
- [x] Garantir 60fps em todas as animações

### Non-Goals

- **Não**: Redesenhar a estrutura de layout do dashboard
- **Não**: Mudar a arquitetura de componentes existentes
- **Não**: Adicionar novas funcionalidades ao dashboard
- **Não**: Modificar a lógica de negócio ou state management
- **Não**: Alterar a navegação ou user flows
- **Não**: Criar novos componentes (apenas atualizar existentes)

---

## User Stories

### User Story 1: Visual Premium Experience

**As a** emergency physician using WellWave,  
**I want to** see a premium, modern interface that reflects the quality of the medical software,  
**So that** I trust the application and feel confident using it in critical situations.

**Acceptance Criteria:**

- [ ] Dashboard cards têm glassmorphism pronunciado (25% opacity, blur 60px)
- [ ] Bordas luminosas visíveis em todos os cards
- [ ] Sidebar se destaca visualmente como elemento flutuante
- [ ] Shadows são suaves e volumétricas (não flat)
- [ ] Ícones ativos têm glow sutil do mesmo tom
- [ ] Interface parece "cara" e profissional

### User Story 2: Dark Mode Excellence

**As a** emergency physician working night shifts,  
**I want to** dark mode com glassmorphism perfeito,  
**So that** a interface seja confortável para os olhos em ambientes de baixa luz.

**Acceptance Criteria:**

- [ ] Glassmorphism adapta corretamente (rgba(28,28,30,0.25) no dark)
- [ ] Bordas luminosas mantêm contraste adequado
- [ ] Shadows não criam halos visuais
- [ ] Saturação funciona corretamente no dark mode
- [ ] Todas as cores mantêm acessibilidade (WCAG AA)

### User Story 3: Smooth Interactions

**As a** emergency physician interacting com o dashboard,  
**I want to** micro-animações suaves e responsivas,  
**So that** a interface pareça fluida e agradável de usar.

**Acceptance Criteria:**

- [ ] Hover em cards: translateY(-2px) em <200ms
- [ ] Transições usam spring physics (stiffness: 300, damping: 30)
- [ ] Todas as animações rodam a 60fps (sem janks)
- [ ] Efeito de "respiração" em elementos ativos
- [ ] Ripple effect nos botões

---

## Requirements

### Functional Requirements

**FR-001: Glassmorphism Autêntico**
- **Description**: Aplicar glassmorphism com 25% opacity, blur 60px, saturate 180%
- **Input**: Componentes existentes com `bg-white/55` e `backdrop-blur-[40px]`
- **Output**: Componentes atualizados com `bg-white/25` e `backdrop-blur-[60px] saturate-[180%]`
- **Priority**: Must Have

**FR-002: Bordas Luminosas**
- **Description**: Adicionar inner shadows e bordas com rgba branco
- **Input**: Cards com bordas simples
- **Output**: Cards com `box-shadow: inset 0 1px 1px rgba(255,255,255,0.4)` e `border: 1px solid rgba(255,255,255,0.3)`
- **Priority**: Must Have

**FR-003: Sidebar Flutuante**
- **Description**: Separar sidebar do background com glass effect
- **Input**: Sidebar atual com background sólido
- **Output**: Sidebar com glassmorphism, shadow profunda e separação visual
- **Priority**: Must Have

**FR-004: Border-Radius Aumentado**
- **Description**: Aumentar border-radius de large containers para 32px
- **Input**: Cards com `rounded-2xl` (16px) ou `rounded-[24px]`
- **Output**: Cards com `rounded-[32px]`
- **Priority**: Must Have

**FR-005: Shadows Coloridas**
- **Description**: Adicionar shadows coloridas difusas em botões e CTAs
- **Input**: Botões com shadows genéricas
- **Output**: Botões com `box-shadow: 0 4px 20px rgba(COLOR, 0.4)`
- **Priority**: Should Have

**FR-006: Background Gradiente**
- **Description**: Adicionar gradiente sutil no background
- **Input**: Background neutro `bg-slate-50`
- **Output**: Background com gradiente `bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30`
- **Priority**: Should Have

**FR-007: Ícones com Glow**
- **Description**: Adicionar glow em ícones ativos
- **Input**: Ícones sem efeitos especiais
- **Output**: Ícones com `filter: drop-shadow(0 0 8px currentColor)`
- **Priority**: Nice to Have

**FR-008: Tipografia Refinada**
- **Description**: Ajustar font-weight e letter-spacing
- **Input**: Números com `font-bold` (700)
- **Output**: Números com `font-light` (300) e `tracking-tight`
- **Priority**: Nice to Have

**FR-009: Micro-interações**
- **Description**: Implementar hover, tap e breathing animations
- **Input**: Transições básicas
- **Output**: Spring physics, translateY, scale animations
- **Priority**: Nice to Have

**FR-010: Refração de Luz**
- **Description**: Adicionar gradiente diagonal de luz no topo dos cards
- **Input**: Cards sem gradiente interno
- **Output**: Pseudo-element com gradiente diagonal rgba(255,255,255,0.1)
- **Priority**: Should Have

### Non-Functional Requirements

**NFR-001: Performance**
- **Target**: 60fps em todas as animações
- **Metric**: Chrome DevTools Performance tab
- **Constraint**: Blur deve usar GPU acceleration (will-change: backdrop-filter)

**NFR-002: Browser Support**
- **Safari 16+**: Full support (backdrop-filter nativo)
- **Chrome 90+**: Full support
- **Firefox 103+**: Full support (backdrop-filter enabled)
- **Edge 90+**: Full support

**NFR-003: Accessibility**
- **WCAG AA**: Contraste mínimo 4.5:1 para texto
- **Keyboard Navigation**: Focus indicators visíveis
- **Screen Readers**: Não impactado (apenas visual)

**NFR-004: Responsiveness**
- **Mobile**: Glassmorphism adapta para telas pequenas
- **Tablet**: Layout preservado
- **Desktop**: Full experience

---

## Design Specifications

### CSS/Tailwind Tokens

```css
/* Liquid Glass 2026 - Authentic Core */
.liquid-glass-2026 {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(60px) saturate(180%);
  -webkit-backdrop-filter: blur(60px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 32px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    inset 0 1px 1px rgba(255, 255, 255, 0.4);
}

/* Light Refraction Effect */
.light-refraction::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
  border-radius: 32px 32px 0 0;
  pointer-events: none;
}

/* Button Liquid Glass */
.btn-liquid-glass {
  background: linear-gradient(135deg, rgba(59,130,246,0.9), rgba(99,102,241,0.9));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 4px 24px rgba(59,130,246,0.35);
  border-radius: 20px;
}

/* Icon Glow */
.icon-glow {
  filter: drop-shadow(0 0 8px currentColor);
}

/* Dark Mode Variants */
.dark .liquid-glass-2026 {
  background: rgba(28, 28, 30, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.dark .btn-liquid-glass {
  background: linear-gradient(135deg, rgba(59,130,246,0.8), rgba(99,102,241,0.8));
  box-shadow: 0 4px 24px rgba(59,130,246,0.25);
}
```

### Tailwind Config Updates

```typescript
// tailwind.config.ts additions
{
  backdropBlur: {
    '3xl': '50px',
    '4xl': '60px',
    '5xl': '80px',
  },
  backdropSaturate: {
    180: '180%',
  },
  borderRadius: {
    'liquid-sm': '20px',
    'liquid-md': '28px',
    'liquid-lg': '32px',
    'liquid-xl': '40px',
  },
  boxShadow: {
    'glass': '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
    'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    'glow-blue': '0 4px 24px rgba(59, 130, 246, 0.35)',
    'glow-red': '0 4px 24px rgba(255, 59, 48, 0.35)',
    'glow-green': '0 4px 24px rgba(52, 199, 89, 0.35)',
  },
}
```

---

## Implementation Files

### Primary Files to Update

1. **`app/globals.css`**
   - Adicionar `.liquid-glass-2026` class
   - Adicionar `.light-refraction` class
   - Adicionar `.btn-liquid-glass` class
   - Adicionar `.icon-glow` class

2. **`tailwind.config.ts`**
   - Adicionar `backdropBlur` 4xl, 5xl
   - Adicionar `backdropSaturate` 180
   - Adicionar `borderRadius` liquid-*
   - Adicionar `boxShadow` glass, glow-*

3. **`app/(dashboard)/dashboard/page.tsx`**
   - Atualizar syndrome cards (linha 128-138)
   - Aplicar `.liquid-glass-2026`
   - Aumentar border-radius para `rounded-liquid-lg`
   - Adicionar `.light-refraction`

4. **`components/ui/glass-container.tsx`**
   - Atualizar variant `card` (linha 37)
   - Mudar `bg-white/60` → `bg-white/25`
   - Adicionar `saturate-[180%]`
   - Aumentar blur para `backdrop-blur-4xl`

5. **`components/ui/glass-button.tsx`**
   - Atualizar variant `primary` (linha 31-39)
   - Adicionar shadow colorida `shadow-glow-blue`

6. **`components/layout/DashboardHeader.tsx`** (criar se não existir)
   - Aplicar glassmorphism na sidebar
   - Shadow profunda
   - Separação visual do background

7. **`app/(dashboard)/layout.tsx`**
   - Adicionar background gradiente (linha 27)
   - `bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30`

---

## Testing Requirements

### Visual Regression Tests

- [ ] Dashboard cards - Light mode
- [ ] Dashboard cards - Dark mode
- [ ] Sidebar - Light mode
- [ ] Sidebar - Dark mode
- [ ] Buttons - All variants
- [ ] Hover states - All interactive elements
- [ ] Focus states - Keyboard navigation

### Performance Tests

- [ ] FPS durante animações (target: 60fps)
- [ ] Paint time de backdrop-filter (target: <16ms)
- [ ] CLS (Cumulative Layout Shift) = 0
- [ ] LCP (Largest Contentful Paint) < 2.5s

### Browser Compatibility Tests

- [ ] Safari 16+ (macOS)
- [ ] Chrome 90+ (macOS, Windows)
- [ ] Firefox 103+ (macOS, Windows)
- [ ] Edge 90+ (Windows)
- [ ] Safari iOS 16+ (iPhone, iPad)

### Accessibility Tests

- [ ] Color contrast (WCAG AA) - Light mode
- [ ] Color contrast (WCAG AA) - Dark mode
- [ ] Keyboard navigation
- [ ] Screen reader (VoiceOver, NVDA)
- [ ] Focus indicators visíveis

---

## Success Criteria

- [x] Glassmorphism autêntico implementado (25% opacity, blur 60px, saturate 180%)
- [x] Bordas luminosas e inner shadows em todos os cards
- [x] Sidebar flutuante com efeito de vidro
- [x] Border-radius aumentado para 32px
- [x] Shadows coloridas em botões
- [x] Background com gradiente sutil
- [x] Ícones com glow em estado ativo
- [x] Tipografia refinada (font-weight 300, tracking tight)
- [x] Micro-interações suaves (60fps)
- [x] Dark mode perfeito
- [x] Performance mantida (60fps, <16ms paint)
- [x] Acessibilidade preservada (WCAG AA)

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Performance degradation com blur 60px | Alto | Médio | Usar `will-change: backdrop-filter`, testar em devices lentos |
| Compatibilidade backdrop-filter | Médio | Baixo | Fallback para solid background com 80% opacity |
| Contraste insuficiente no dark mode | Alto | Médio | Testes WCAG AA, ajustar opacidades se necessário |
| Over-engineering visual | Baixo | Médio | Manter simplicidade, não adicionar efeitos desnecessários |
| Breaking changes em componentes | Médio | Baixo | Testes E2E antes do merge |

---

## References

- [Apple Human Interface Guidelines - Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- [Constitution v2.0.0 - Apple Design Language 2025](../../memory/constitution.md#7-apple-design-language-2025)
- [macOS Sonoma Design System](https://www.apple.com/macos/sonoma/)
- [CSS backdrop-filter MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [Framer Motion Spring Physics](https://www.framer.com/motion/animation/)

---

## Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-08 | 1.0.0 | Initial specification | AI Assistant (Claude) + Wesley |

