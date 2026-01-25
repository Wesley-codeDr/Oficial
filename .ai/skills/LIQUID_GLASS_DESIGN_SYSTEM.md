# Skill: Apple Liquid Glass 2026 Design System

> **Version:** 3.0.0 | **Updated:** 2026-01-25 | **Status:** MANDATORY
>
> **ENFORCEMENT:** This skill is MANDATORY for ALL AI assistants working on WellWave AI.
> Every component, chart, dashboard, and UI element MUST follow these specifications.

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────┐
│  LIQUID GLASS 2026 — ESSENTIAL VALUES                          │
├─────────────────────────────────────────────────────────────────┤
│  Blur:        40px (universal standard)                        │
│  Saturate:    180% (all variants)                              │
│  Radius:      8px → 12px → 16px → 24px → 32px → 40px          │
│  Shadows:     Multi-layer (drop + inset highlight)             │
│  Transitions: 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)      │
│  Dark Mode:   Class-based (.dark)                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Table of Contents

1. [Enforcement Rules](#1-enforcement-rules)
2. [Core Principles](#2-core-principles)
3. [Color System](#3-color-system)
4. [Typography](#4-typography)
5. [Spacing & Layout](#5-spacing--layout)
6. [Border Radius Hierarchy](#6-border-radius-hierarchy)
7. [Glass Materials](#7-glass-materials)
8. [Shadows & Elevation](#8-shadows--elevation)
9. [Animations & Transitions](#9-animations--transitions)
10. [Components](#10-components)
11. [Charts & Data Visualization](#11-charts--data-visualization)
12. [AI Components](#12-ai-components)
13. [Healthcare-Specific](#13-healthcare-specific)
14. [Accessibility](#14-accessibility)
15. [Implementation Examples](#15-implementation-examples)
16. [Checklist](#16-checklist)

---

## 1. Enforcement Rules

### Mandatory Compliance

**ALL AI assistants** (Claude Code, Cursor, Codex, GitHub Copilot, Windsurf, etc.) MUST:

```
✅ ALWAYS use glass effects on cards, modals, and elevated surfaces
✅ ALWAYS follow the 7-level radius hierarchy
✅ ALWAYS use 40px blur for glass materials
✅ ALWAYS implement dark mode support
✅ ALWAYS use the defined color tokens (NEVER hardcode colors)
✅ ALWAYS use the transition timing functions
✅ ALWAYS ensure WCAG AA contrast ratios (AAA for medical alerts)
```

```
❌ NEVER use opaque backgrounds where glass should be used
❌ NEVER use arbitrary border-radius values
❌ NEVER skip dark mode implementation
❌ NEVER hardcode colors outside the token system
❌ NEVER use linear transitions (always use easing curves)
❌ NEVER ignore accessibility requirements
```

### Pre-Implementation Check

Before writing ANY UI code, verify:

```markdown
- [ ] Using glass tokens from `lib/design-system/glass-tokens.ts`
- [ ] Following radius hierarchy (container > card > item > pill)
- [ ] Implementing both light and dark mode
- [ ] Using semantic color tokens
- [ ] Adding proper transitions and hover states
- [ ] Meeting accessibility requirements
```

---

## 2. Core Principles

### The Liquid Glass Philosophy

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| **Transparency** | Surfaces reveal content beneath | `backdrop-filter: blur(40px)` |
| **Depth** | Layered glass creates hierarchy | Multi-layer shadows + z-index |
| **Fluidity** | Borders feel liquid, not rigid | Generous radius + soft edges |
| **Adaptivity** | Colors respond to context | Theme-aware tokens |
| **Breathability** | UI feels light and airy | High transparency + subtle borders |

### Visual Hierarchy Through Glass

```
Level 1: Page Background (solid)
    └── Level 2: Section Container (glass-subtle)
        └── Level 3: Card (glass-regular)
            └── Level 4: Nested Element (glass-clear)
                └── Level 5: Interactive Item (glass-elevated on hover)
```

---

## 3. Color System

### Text Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `text-primary` | `rgba(0, 0, 0, 0.88)` | `rgba(255, 255, 255, 0.92)` | Headlines, primary content |
| `text-secondary` | `rgba(0, 0, 0, 0.55)` | `rgba(255, 255, 255, 0.60)` | Descriptions, subtitles |
| `text-muted` | `rgba(0, 0, 0, 0.35)` | `rgba(255, 255, 255, 0.38)` | Placeholders, hints |
| `text-on-dark` | `rgba(255, 255, 255, 0.95)` | `rgba(255, 255, 255, 0.95)` | On dark backgrounds |
| `text-on-brand` | `#FFFFFF` | `#FFFFFF` | On action colors |

### Surface Colors (Glass)

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `surface-page` | `#F2F2F7` | `#000000` | Page background |
| `surface-section` | `rgba(255, 255, 255, 0.70)` | `rgba(255, 255, 255, 0.08)` | Section backgrounds |
| `surface-card` | `rgba(255, 255, 255, 0.72)` | `rgba(255, 255, 255, 0.12)` | Card backgrounds |
| `surface-subtle` | `rgba(255, 255, 255, 0.45)` | `rgba(255, 255, 255, 0.06)` | Subtle emphasis |
| `surface-elevated` | `rgba(255, 255, 255, 0.85)` | `rgba(255, 255, 255, 0.18)` | Modals, popovers |

### Action Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `action-primary` | `rgba(0, 122, 255, 0.85)` | `rgba(10, 132, 255, 0.90)` | Primary buttons |
| `action-primary-hover` | `rgba(0, 122, 255, 0.95)` | `rgba(10, 132, 255, 1.0)` | Hover state |
| `action-primary-active` | `rgba(0, 102, 214, 1.0)` | `rgba(0, 112, 224, 1.0)` | Pressed state |
| `action-secondary` | `rgba(255, 255, 255, 0.55)` | `rgba(255, 255, 255, 0.15)` | Secondary buttons |
| `action-strong` | `rgba(0, 0, 0, 0.85)` | `rgba(255, 255, 255, 0.90)` | High-conversion CTAs |

### Status Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `status-success` | `rgba(52, 199, 89, 0.90)` | `rgba(48, 209, 88, 0.90)` | Success states |
| `status-warning` | `rgba(255, 149, 0, 0.90)` | `rgba(255, 159, 10, 0.90)` | Warnings |
| `status-error` | `rgba(255, 59, 48, 0.90)` | `rgba(255, 69, 58, 0.90)` | Errors |
| `status-info` | `rgba(90, 200, 250, 0.90)` | `rgba(100, 210, 255, 0.90)` | Information |

### Border Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `border-default` | `rgba(0, 0, 0, 0.08)` | `rgba(255, 255, 255, 0.12)` | Standard borders |
| `border-subtle` | `rgba(0, 0, 0, 0.04)` | `rgba(255, 255, 255, 0.06)` | Subtle separators |
| `border-focus` | `rgba(0, 122, 255, 0.60)` | `rgba(10, 132, 255, 0.70)` | Focus rings |

### Healthcare Colors

| Token | Value | Usage |
|-------|-------|-------|
| `healthcare-primary` | `#007AFF` | Primary medical UI |
| `healthcare-success` | `#34C759` | Positive outcomes |
| `healthcare-warning` | `#FF9500` | Caution alerts |
| `healthcare-critical` | `#FF3B30` | Critical/emergency |
| `healthcare-info` | `#5AC8FA` | Informational |

---

## 4. Typography

### Font Stack

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
--font-display: 'Plus Jakarta Sans', var(--font-primary);
--font-mono: 'SF Mono', 'Fira Code', 'Consolas', monospace;
```

### Type Scale

| Name | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| `hero` | 48px | Bold (700) | 1.1 | Landing heroes |
| `h1` | 36px | Bold (700) | 1.2 | Page titles |
| `h2` | 30px | Semibold (600) | 1.25 | Section titles |
| `h3` | 24px | Semibold (600) | 1.3 | Card titles |
| `h4` | 20px | Medium (500) | 1.4 | Subtitles |
| `body-lg` | 18px | Normal (400) | 1.5 | Large body text |
| `body` | 16px | Normal (400) | 1.5 | Default body |
| `body-sm` | 14px | Normal (400) | 1.4 | Secondary text |
| `caption` | 12px | Medium (500) | 1.3 | Labels, captions |
| `micro` | 10px | Medium (500) | 1.2 | Badges, pills |

### Tailwind Classes

```tsx
// Headlines
className="text-4xl font-bold text-text-primary"     // h1
className="text-3xl font-semibold text-text-primary" // h2
className="text-2xl font-semibold text-text-primary" // h3

// Body
className="text-base text-text-primary"              // body
className="text-sm text-text-secondary"              // body-sm

// Labels
className="text-xs font-medium text-text-muted"      // caption
```

---

## 5. Spacing & Layout

### Spacing Scale (8px base)

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Micro gaps |
| `space-2` | 8px | Icon gaps, tight spacing |
| `space-3` | 12px | Button padding |
| `space-4` | 16px | Card padding, standard gaps |
| `space-5` | 20px | Medium gaps |
| `space-6` | 24px | Section padding |
| `space-8` | 32px | Large gaps |
| `space-10` | 40px | Section margins |
| `space-12` | 48px | Page sections |
| `space-16` | 64px | Major sections |
| `space-20` | 80px | Hero spacing |

### Layout Guidelines

```
┌─────────────────────────────────────────────────────────────┐
│ Page Padding: 16px (mobile) / 24px (tablet) / 32px (desktop)│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Section Padding: 24px                                │   │
│  │                                                      │   │
│  │  ┌────────────────┐  gap: 16px  ┌────────────────┐  │   │
│  │  │ Card           │             │ Card           │  │   │
│  │  │ padding: 16px  │             │ padding: 16px  │  │   │
│  │  └────────────────┘             └────────────────┘  │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  gap between sections: 32px                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Border Radius Hierarchy

### The 7-Level System

**CRITICAL:** Always use appropriate radius for the component level.

| Level | Component | Radius | Tailwind Class |
|-------|-----------|--------|----------------|
| 1 | Page Container | 24px | `rounded-glass-lg` |
| 2 | Section Card | 24px | `rounded-glass-lg` |
| 3 | Content Card | 24px | `rounded-glass-lg` |
| 4 | Metric Card | 24px | `rounded-glass-lg` |
| 5 | List Item / Patient Card | 16px | `rounded-glass-md` |
| 6 | Pill / Badge | 14px | `rounded-glass-sm` |
| 7 | Icon Button | 14px | `rounded-glass-sm` |
| - | Full Circle | 9999px | `rounded-full` |

### Nesting Rule

```
Parent radius > Child radius (ALWAYS)

Container (24px)
  └── Card (24px) - same level OK
      └── Item (16px) - smaller
          └── Badge (14px) - smallest
```

### Radius Values

```css
:root {
  --radius-xs: 8px;    /* Small pills */
  --radius-sm: 12px;   /* Buttons, inputs */
  --radius-md: 16px;   /* Medium cards */
  --radius-lg: 24px;   /* Large cards */
  --radius-xl: 32px;   /* Modals */
  --radius-2xl: 40px;  /* Hero elements */
  --radius-full: 9999px; /* Circular */
}
```

---

## 7. Glass Materials

### Material Variants

| Variant | Blur | Opacity (Light) | Opacity (Dark) | Use Case |
|---------|------|-----------------|----------------|----------|
| `regular` | 40px | 0.22 | 0.28 | Default cards |
| `clear` | 40px | 0.12 | 0.15 | Overlays |
| `elevated` | 40px | 0.32 | 0.35 | Modals, sheets |
| `subtle` | 40px | 0.08 | 0.10 | Background sections |

### CSS Implementation

```css
/* Base Glass Effect */
.glass {
  background: var(--surface-card);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid var(--border-subtle);
}

/* Liquid Glass with Rim Light (iOS 26 Signature) */
.glass-liquid {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.75) 0%,
    rgba(255, 255, 255, 0.65) 100%
  );
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    0 4px 24px rgba(0, 0, 0, 0.08);
}

/* Specular Highlight */
.glass-specular::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.15) 0%,
    transparent 100%
  );
  border-radius: inherit;
  pointer-events: none;
}
```

### Tailwind Utility Classes

```tsx
// Regular glass card
className="liquid-glass-regular rounded-glass-lg shadow-glass"

// Elevated glass (modals)
className="liquid-glass-elevated rounded-glass-xl shadow-glass-strong"

// Clear glass (overlays)
className="liquid-glass-clear rounded-glass-md"

// With rim light effect
className="liquid-glass-regular rim-light-ios26 rounded-glass-lg"

// With specular highlight
className="liquid-glass-regular liquid-glass-specular rounded-glass-lg"
```

---

## 8. Shadows & Elevation

### Shadow Scale

```css
:root {
  /* Subtle */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);

  /* Medium */
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);

  /* Large */
  --shadow-lg:
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.06);

  /* Card (multi-layer) */
  --shadow-card:
    0 2px 8px rgba(0, 0, 0, 0.04),
    0 8px 24px rgba(0, 0, 0, 0.06);

  /* Card Hover (elevated) */
  --shadow-card-hover:
    0 4px 12px rgba(0, 0, 0, 0.06),
    0 12px 32px rgba(0, 0, 0, 0.10);

  /* Primary Button */
  --shadow-button-primary:
    0 2px 8px rgba(0, 122, 255, 0.25),
    0 4px 16px rgba(0, 122, 255, 0.15);

  /* Glass Inset */
  --shadow-glass-inset:
    inset 0 1px 1px rgba(255, 255, 255, 0.5),
    inset 0 -1px 1px rgba(0, 0, 0, 0.05);
}
```

### Glow Effects (Status Colors)

```css
--shadow-glow-blue: 0 0 20px rgba(0, 122, 255, 0.3);
--shadow-glow-green: 0 0 20px rgba(52, 199, 89, 0.3);
--shadow-glow-red: 0 0 20px rgba(255, 59, 48, 0.3);
--shadow-glow-orange: 0 0 20px rgba(255, 149, 0, 0.3);
```

### Z-Index Scale

| Level | Value | Usage |
|-------|-------|-------|
| Base | 0 | Default content |
| Raised | 10 | Cards, elevated content |
| Dropdown | 100 | Dropdown menus |
| Sticky | 200 | Sticky headers |
| Modal | 300 | Modal dialogs |
| Popover | 400 | Tooltips, popovers |
| Toast | 500 | Notifications |
| Red Flag | 9990 | Medical red flags |
| Emergency | 9999 | Emergency alerts |

---

## 9. Animations & Transitions

### Timing Functions

```css
:root {
  /* Standard Apple Easing */
  --ease-standard: cubic-bezier(0.25, 0.46, 0.45, 0.94);

  /* Spring Bounce */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Apple Ease Out */
  --ease-out: cubic-bezier(0.25, 1, 0.5, 1);

  /* Apple Ease In */
  --ease-in: cubic-bezier(0.42, 0, 1, 1);

  /* Apple Ease In-Out */
  --ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);
}
```

### Duration Scale

| Token | Value | Usage |
|-------|-------|-------|
| `instant` | 100ms | Micro feedback |
| `fast` | 180ms | Hover states |
| `normal` | 280ms | Default transitions |
| `slow` | 350ms | Page transitions |
| `slower` | 500ms | Major animations |

### Standard Transitions

```css
/* Default interactive element */
.interactive {
  transition:
    transform 280ms var(--ease-standard),
    box-shadow 280ms var(--ease-standard),
    background-color 180ms var(--ease-standard);
}

/* Fast micro-interaction */
.micro-interaction {
  transition: all 180ms var(--ease-standard);
}

/* Spring entry animation */
.spring-enter {
  transition: transform 350ms var(--ease-spring);
}
```

### Hover & Active States

```css
/* Card hover */
.card:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: var(--shadow-card-hover);
}

/* Button hover */
.button:hover {
  transform: scale(1.02);
}

/* Button active */
.button:active {
  transform: scale(0.98);
}
```

### Framer Motion Spring Configs

```typescript
const springConfigs = {
  default: { type: 'spring', stiffness: 350, damping: 32, mass: 1 },
  glass: { type: 'spring', stiffness: 300, damping: 30, mass: 1.1 },
  soft: { type: 'spring', stiffness: 200, damping: 28, mass: 1 },
  haptic: { type: 'spring', stiffness: 600, damping: 40, mass: 0.7 },
  bounce: { type: 'spring', stiffness: 400, damping: 25, mass: 1 },
};
```

---

## 10. Components

### Button Primary

```
┌─────────────────────────────┐
│       Primary Action        │
└─────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Background | `action-primary` |
| Text | `text-on-brand`, `font-semibold` |
| Padding | `12px 24px` |
| Radius | `rounded-full` |
| Shadow | `shadow-button-primary` |
| Backdrop | `blur(20px)` |

**States:**
- **Hover:** `action-primary-hover`, `scale(1.02)`
- **Active:** `action-primary-active`, `scale(0.98)`
- **Focus:** `ring-4 border-focus` with 2px offset
- **Disabled:** `opacity-45`, `cursor-not-allowed`

```tsx
<button className="
  bg-action-primary text-white font-semibold
  py-3 px-6 rounded-full
  shadow-button-primary backdrop-blur-[20px]
  hover:bg-action-primary-hover hover:scale-[1.02]
  active:scale-[0.98]
  focus:ring-4 focus:ring-border-focus focus:ring-offset-2
  disabled:opacity-45 disabled:cursor-not-allowed
  transition-all duration-[280ms] ease-out
">
  Primary Action
</button>
```

### Button Secondary

| Property | Value |
|----------|-------|
| Background | `action-secondary` |
| Text | `text-primary`, `font-medium` |
| Border | `border-default` |
| Radius | `rounded-full` |
| Backdrop | `blur(20px)` |

```tsx
<button className="
  bg-action-secondary text-text-primary font-medium
  py-3 px-6 rounded-full
  border border-border-default backdrop-blur-[20px]
  hover:bg-white/65 hover:border-border-default/80
  active:scale-[0.98]
  transition-all duration-[280ms] ease-out
">
  Secondary Action
</button>
```

### Card Glass

```
┌─────────────────────────────────────┐
│  ┌─────┐                            │
│  │ Icon│  Card Title                │
│  └─────┘  Subtitle or description   │
│                                     │
│  Card content goes here with       │
│  relevant information.              │
│                                     │
│  ┌─────────────┐                    │
│  │   Action    │                    │
│  └─────────────┘                    │
└─────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Background | `surface-card` + `backdrop-blur-[40px] saturate-[180%]` |
| Border | `border-subtle` |
| Radius | `rounded-glass-lg` (24px) |
| Shadow | `shadow-card` |
| Padding | `24px` |

**States:**
- **Hover:** `shadow-card-hover`, `translateY(-2px)`, `bg +5% opacity`
- **Active:** `scale(0.99)`, shadow reduces
- **Focus:** `ring-3 border-focus`

```tsx
<div className="
  bg-surface-card backdrop-blur-[40px] saturate-[180%]
  border border-border-subtle
  rounded-glass-lg p-6
  shadow-card
  hover:shadow-card-hover hover:-translate-y-0.5
  transition-all duration-[280ms] ease-out
">
  {/* Card content */}
</div>
```

### Input Glass

| Property | Value |
|----------|-------|
| Background | `surface-subtle` + `backdrop-blur-[20px]` |
| Border | `border-default` |
| Radius | `rounded-glass-sm` (12px) |
| Padding | `12px 16px` |
| Text | `text-primary` |
| Placeholder | `text-muted` |

**States:**
- **Hover:** border more visible
- **Focus:** `border-focus`, `ring-4` with 20% opacity
- **Error:** `border status-error`
- **Disabled:** `opacity-50`

```tsx
<input className="
  w-full bg-surface-subtle backdrop-blur-[20px]
  border border-border-default rounded-glass-sm
  py-3 px-4
  text-text-primary placeholder:text-text-muted
  hover:border-border-default/80
  focus:border-border-focus focus:ring-4 focus:ring-border-focus/20
  focus:outline-none
  disabled:opacity-50
  transition-all duration-[180ms] ease-out
" />
```

### Modal/Sheet Glass

| Property | Value |
|----------|-------|
| Background | `surface-elevated` + `backdrop-blur-[60px]` |
| Radius | `rounded-glass-xl` (top only for sheets) |
| Handle | `36px × 5px`, `text-muted/30`, `rounded-full` |
| Padding | `24px` lateral, `16px` top |
| Overlay | `rgba(0, 0, 0, 0.25)` |

```tsx
{/* Overlay */}
<div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />

{/* Modal */}
<div className="
  bg-surface-elevated backdrop-blur-[60px] saturate-[180%]
  rounded-glass-xl p-6
  shadow-lg
">
  {/* Handle for sheets */}
  <div className="w-9 h-1.5 bg-text-muted/30 rounded-full mx-auto mb-4" />

  {/* Content */}
</div>
```

### Badge/Pill

| Property | Value |
|----------|-------|
| Background | `surface-subtle` + `backdrop-blur-[10px]` |
| Border | `border-subtle` |
| Radius | `rounded-full` |
| Padding | `4px 12px` |
| Text | `text-xs`, `font-medium`, `text-secondary` |

**Variants:**

| Variant | Background | Text |
|---------|------------|------|
| Default | `surface-subtle` | `text-secondary` |
| Success | `status-success/15` | `status-success` |
| Warning | `status-warning/15` | `status-warning` |
| Error | `status-error/15` | `status-error` |
| Info | `status-info/15` | `status-info` |

```tsx
<span className="
  inline-flex items-center
  bg-status-success/15 text-status-success
  text-xs font-medium
  px-3 py-1 rounded-full
  backdrop-blur-[10px]
">
  Active
</span>
```

### Toggle/Switch

```
OFF:  ┌──────○      ┐
      └─────────────┘

ON:   ┌      ●──────┐
      └─────────────┘
```

| Property | Off State | On State |
|----------|-----------|----------|
| Track BG | `surface-subtle` | `action-primary` |
| Track Border | `border-default` | none |
| Thumb | `surface-elevated` | `#FFFFFF` with shadow |

**Dimensions:** 51px × 31px, thumb 27px

### List Row

```tsx
<div className="
  bg-surface-card rounded-glass-lg
  divide-y divide-border-subtle
">
  <div className="
    flex items-center gap-3 p-4
    hover:bg-surface-subtle
    transition-colors duration-[180ms]
  ">
    <div className="w-10 h-10 bg-action-primary/15 rounded-glass-sm flex items-center justify-center">
      <Icon className="w-5 h-5 text-action-primary" />
    </div>
    <div className="flex-1">
      <p className="text-base font-medium text-text-primary">Item Title</p>
      <p className="text-sm text-text-secondary">Description</p>
    </div>
    <ChevronRight className="w-5 h-5 text-text-muted" />
  </div>
</div>
```

---

## 11. Charts & Data Visualization

### Chart Design Principles

**MANDATORY for all charts (Recharts, Chart.js, Victory, D3, etc.):**

```
✅ Use glass background for chart containers
✅ Use healthcare color palette for data series
✅ Apply rounded corners to bars and areas
✅ Use semi-transparent fills with solid strokes
✅ Implement smooth curve interpolation for lines
✅ Add glass tooltips with backdrop blur
✅ Support dark mode with theme-aware colors
```

### Chart Container

```tsx
<div className="
  bg-surface-card backdrop-blur-[40px] saturate-[180%]
  border border-border-subtle
  rounded-glass-lg p-6
  shadow-card
">
  <div className="mb-4">
    <h3 className="text-lg font-semibold text-text-primary">Chart Title</h3>
    <p className="text-sm text-text-secondary">Chart description</p>
  </div>

  {/* Chart goes here */}
  <div className="h-64">
    <ResponsiveContainer width="100%" height="100%">
      {/* ... */}
    </ResponsiveContainer>
  </div>
</div>
```

### Chart Color Palette

| Series | Light Mode | Dark Mode | Usage |
|--------|------------|-----------|-------|
| Primary | `#007AFF` | `#0A84FF` | Main metric |
| Secondary | `#34C759` | `#30D158` | Secondary metric |
| Tertiary | `#FF9500` | `#FF9F0A` | Third metric |
| Quaternary | `#5AC8FA` | `#64D2FF` | Fourth metric |
| Quinary | `#AF52DE` | `#BF5AF2` | Fifth metric |
| Senary | `#FF2D55` | `#FF375F` | Sixth metric |

### Bar Chart Specifications

```tsx
<Bar
  dataKey="value"
  fill="rgba(0, 122, 255, 0.7)"      // Semi-transparent fill
  stroke="#007AFF"                    // Solid stroke
  strokeWidth={1}
  radius={[8, 8, 0, 0]}              // Rounded top corners
/>
```

**Bar Styles:**
- Fill opacity: 0.6-0.8
- Stroke: 1px solid (same color, full opacity)
- Top corners: 8px radius
- Gap between bars: 8px minimum
- Hover: Increase opacity to 0.9

### Line Chart Specifications

```tsx
<Line
  type="monotone"                     // Smooth curves
  dataKey="value"
  stroke="#007AFF"
  strokeWidth={2}
  dot={false}                         // Hide default dots
  activeDot={{
    r: 6,
    fill: '#007AFF',
    stroke: '#FFFFFF',
    strokeWidth: 2,
  }}
/>
```

**Line Styles:**
- Stroke width: 2px
- Curve: `monotone` or `natural`
- Active dot: 6px radius with white stroke
- Grid lines: `border-subtle` color

### Area Chart Specifications

```tsx
<Area
  type="monotone"
  dataKey="value"
  stroke="#007AFF"
  strokeWidth={2}
  fill="url(#gradient-primary)"       // Gradient fill
/>

<defs>
  <linearGradient id="gradient-primary" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stopColor="#007AFF" stopOpacity={0.3} />
    <stop offset="100%" stopColor="#007AFF" stopOpacity={0.05} />
  </linearGradient>
</defs>
```

### Pie/Donut Chart Specifications

```tsx
<Pie
  data={data}
  innerRadius={60}                    // Donut style
  outerRadius={80}
  paddingAngle={2}                    // Gap between slices
  cornerRadius={4}                    // Rounded corners
  stroke="none"
>
  {data.map((entry, index) => (
    <Cell
      key={index}
      fill={COLORS[index]}
      opacity={0.85}
    />
  ))}
</Pie>
```

### Chart Tooltip (Glass Style)

```tsx
const GlassTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;

  return (
    <div className="
      bg-surface-elevated backdrop-blur-[40px] saturate-[180%]
      border border-border-subtle
      rounded-glass-sm p-3
      shadow-lg
    ">
      <p className="text-sm font-medium text-text-primary mb-1">{label}</p>
      {payload.map((item, index) => (
        <p key={index} className="text-sm text-text-secondary">
          <span style={{ color: item.color }}>●</span> {item.name}: {item.value}
        </p>
      ))}
    </div>
  );
};
```

### Chart Grid & Axis

```tsx
<CartesianGrid
  strokeDasharray="3 3"
  stroke="var(--border-subtle)"
  vertical={false}                    // Horizontal lines only
/>

<XAxis
  dataKey="name"
  axisLine={false}
  tickLine={false}
  tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
/>

<YAxis
  axisLine={false}
  tickLine={false}
  tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
  width={40}
/>
```

### Chart Legend

```tsx
<Legend
  wrapperStyle={{
    paddingTop: '16px',
  }}
  formatter={(value) => (
    <span className="text-sm text-text-secondary">{value}</span>
  )}
/>
```

### Responsive Chart Breakpoints

| Breakpoint | Chart Height | Font Size | Padding |
|------------|--------------|-----------|---------|
| Mobile (<640px) | 200px | 10px | 12px |
| Tablet (640-1024px) | 280px | 12px | 16px |
| Desktop (>1024px) | 320px | 14px | 24px |

---

## 12. AI Components

### AI Chat Interface

**MANDATORY for all AI assistants (Claude, GPT, etc.):**

```
┌─────────────────────────────────────────────────────────────┐
│  ┌────┐                                                     │
│  │ AI │  WellWave Assistant                          ●      │
│  └────┘  Online                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 👤 User message bubble (right aligned)               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🤖 AI response bubble (left aligned, glass effect)   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────┐  ┌─────┐  │
│  │ Type your message...                         │  │ ➤  │  │
│  └─────────────────────────────────────────────┘  └─────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Chat Container

```tsx
<div className="
  flex flex-col h-full
  bg-surface-page
">
  {/* Header */}
  <div className="
    bg-surface-card backdrop-blur-[40px] saturate-[180%]
    border-b border-border-subtle
    px-4 py-3
  ">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-action-primary/15 rounded-full flex items-center justify-center">
        <BotIcon className="w-5 h-5 text-action-primary" />
      </div>
      <div>
        <h2 className="text-base font-semibold text-text-primary">WellWave AI</h2>
        <p className="text-xs text-status-success flex items-center gap-1">
          <span className="w-2 h-2 bg-status-success rounded-full" />
          Online
        </p>
      </div>
    </div>
  </div>

  {/* Messages */}
  <div className="flex-1 overflow-y-auto p-4 space-y-4">
    {/* Messages here */}
  </div>

  {/* Input */}
  <div className="
    bg-surface-card backdrop-blur-[40px] saturate-[180%]
    border-t border-border-subtle
    p-4
  ">
    {/* Input field */}
  </div>
</div>
```

### User Message Bubble

```tsx
<div className="flex justify-end">
  <div className="
    max-w-[80%]
    bg-action-primary text-white
    rounded-glass-lg rounded-br-glass-sm
    px-4 py-3
    shadow-sm
  ">
    <p className="text-sm">{message}</p>
    <span className="text-xs text-white/70 mt-1 block text-right">
      {timestamp}
    </span>
  </div>
</div>
```

### AI Message Bubble

```tsx
<div className="flex justify-start">
  <div className="flex gap-3 max-w-[85%]">
    {/* Avatar */}
    <div className="w-8 h-8 bg-surface-card backdrop-blur-[20px] rounded-full flex items-center justify-center flex-shrink-0">
      <BotIcon className="w-4 h-4 text-action-primary" />
    </div>

    {/* Message */}
    <div className="
      bg-surface-card backdrop-blur-[40px] saturate-[180%]
      border border-border-subtle
      rounded-glass-lg rounded-tl-glass-sm
      px-4 py-3
      shadow-card
    ">
      <p className="text-sm text-text-primary">{message}</p>
      <span className="text-xs text-text-muted mt-1 block">
        {timestamp}
      </span>
    </div>
  </div>
</div>
```

### AI Typing Indicator

```tsx
<div className="flex justify-start">
  <div className="flex gap-3">
    <div className="w-8 h-8 bg-surface-card backdrop-blur-[20px] rounded-full flex items-center justify-center">
      <BotIcon className="w-4 h-4 text-action-primary" />
    </div>
    <div className="
      bg-surface-card backdrop-blur-[40px] saturate-[180%]
      border border-border-subtle
      rounded-glass-lg rounded-tl-glass-sm
      px-4 py-3
    ">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  </div>
</div>
```

### AI Suggestion Chips

```tsx
<div className="flex flex-wrap gap-2 mt-4">
  {suggestions.map((suggestion, index) => (
    <button
      key={index}
      className="
        bg-surface-subtle backdrop-blur-[20px]
        border border-border-default
        rounded-full px-4 py-2
        text-sm text-text-secondary
        hover:bg-surface-card hover:text-text-primary
        hover:border-action-primary/50
        transition-all duration-[180ms]
      "
    >
      {suggestion}
    </button>
  ))}
</div>
```

### AI Code Block

```tsx
<div className="
  bg-gray-900 dark:bg-gray-950
  rounded-glass-md overflow-hidden
  my-2
">
  {/* Header */}
  <div className="
    flex items-center justify-between
    bg-gray-800 px-4 py-2
    border-b border-gray-700
  ">
    <span className="text-xs text-gray-400 font-mono">{language}</span>
    <button className="text-xs text-gray-400 hover:text-white transition-colors">
      Copy
    </button>
  </div>

  {/* Code */}
  <pre className="p-4 overflow-x-auto">
    <code className="text-sm font-mono text-gray-100">
      {code}
    </code>
  </pre>
</div>
```

### AI Input Field

```tsx
<div className="flex gap-2">
  <div className="
    flex-1 flex items-center
    bg-surface-subtle backdrop-blur-[20px]
    border border-border-default
    rounded-full
    px-4
    focus-within:border-border-focus
    focus-within:ring-4 focus-within:ring-border-focus/20
    transition-all duration-[180ms]
  ">
    <input
      type="text"
      placeholder="Type your message..."
      className="
        flex-1 bg-transparent
        py-3
        text-text-primary placeholder:text-text-muted
        focus:outline-none
      "
    />
    <button className="p-1 text-text-muted hover:text-text-primary">
      <PaperclipIcon className="w-5 h-5" />
    </button>
  </div>

  <button className="
    w-12 h-12
    bg-action-primary
    rounded-full
    flex items-center justify-center
    text-white
    shadow-button-primary
    hover:bg-action-primary-hover hover:scale-[1.05]
    active:scale-[0.95]
    transition-all duration-[180ms]
  ">
    <SendIcon className="w-5 h-5" />
  </button>
</div>
```

### AI Status Indicators

| Status | Color | Animation |
|--------|-------|-----------|
| Online | `status-success` | Subtle pulse |
| Processing | `status-warning` | Spin |
| Error | `status-error` | None |
| Offline | `text-muted` | None |

---

## 13. Healthcare-Specific

### Medical Alert Levels

| Level | Background | Border | Text | Icon |
|-------|------------|--------|------|------|
| Info | `status-info/10` | `status-info/30` | `status-info` | InfoCircle |
| Warning | `status-warning/10` | `status-warning/30` | `status-warning` | AlertTriangle |
| Critical | `status-error/10` | `status-error/30` | `status-error` | AlertCircle |
| Emergency | `status-error` | `status-error` | `white` | Siren |

### Red Flag Alert

```tsx
<div className="
  fixed bottom-4 left-4 right-4
  bg-status-error text-white
  rounded-glass-lg
  p-4
  shadow-lg shadow-status-error/30
  z-[9990]
  animate-pulse
">
  <div className="flex items-center gap-3">
    <AlertCircle className="w-6 h-6 flex-shrink-0" />
    <div>
      <p className="font-semibold">Red Flag Detected</p>
      <p className="text-sm text-white/90">{message}</p>
    </div>
  </div>
</div>
```

### Patient Card

```tsx
<div className="
  bg-surface-card backdrop-blur-[40px] saturate-[180%]
  border border-border-subtle
  rounded-glass-md p-4
  shadow-card
  hover:shadow-card-hover hover:-translate-y-0.5
  transition-all duration-[280ms]
">
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 bg-action-primary/10 rounded-full flex items-center justify-center">
      <UserIcon className="w-6 h-6 text-action-primary" />
    </div>
    <div className="flex-1">
      <h4 className="text-base font-semibold text-text-primary">{name}</h4>
      <p className="text-sm text-text-secondary">{condition}</p>
    </div>
    <span className={`
      px-3 py-1 rounded-full text-xs font-medium
      ${status === 'stable' ? 'bg-status-success/15 text-status-success' : ''}
      ${status === 'attention' ? 'bg-status-warning/15 text-status-warning' : ''}
      ${status === 'critical' ? 'bg-status-error/15 text-status-error' : ''}
    `}>
      {status}
    </span>
  </div>
</div>
```

### Vital Signs Display

```tsx
<div className="
  bg-surface-card backdrop-blur-[40px] saturate-[180%]
  border border-border-subtle
  rounded-glass-lg p-6
">
  <h3 className="text-lg font-semibold text-text-primary mb-4">Vital Signs</h3>

  <div className="grid grid-cols-2 gap-4">
    <div className="
      bg-surface-subtle rounded-glass-sm p-4
      border border-border-subtle
    ">
      <div className="flex items-center gap-2 mb-2">
        <HeartIcon className="w-5 h-5 text-status-error" />
        <span className="text-sm text-text-secondary">Heart Rate</span>
      </div>
      <p className="text-2xl font-bold text-text-primary">
        72 <span className="text-sm font-normal text-text-muted">bpm</span>
      </p>
    </div>

    {/* More vitals... */}
  </div>
</div>
```

---

## 14. Accessibility

### Requirements

| Requirement | Standard | Implementation |
|-------------|----------|----------------|
| Color Contrast | WCAG AA (4.5:1) | Use defined text colors |
| Focus Indicators | Visible | `ring-4 border-focus` |
| Touch Targets | 44×44px minimum | Apply to all interactive elements |
| Motion | Respect preferences | `prefers-reduced-motion` |
| Screen Readers | Semantic HTML | Proper ARIA labels |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Reduced Transparency

```css
@media (prefers-reduced-transparency: reduce) {
  .glass,
  .liquid-glass-regular,
  .liquid-glass-elevated {
    backdrop-filter: none;
    background: var(--surface-card-solid);
  }
}
```

### High Contrast

```css
@media (prefers-contrast: more) {
  :root {
    --text-primary: rgba(0, 0, 0, 1);
    --text-secondary: rgba(0, 0, 0, 0.8);
    --border-default: rgba(0, 0, 0, 0.3);
  }
}
```

### Focus States

```tsx
// All interactive elements must have visible focus
className="
  focus:outline-none
  focus:ring-4 focus:ring-border-focus
  focus:ring-offset-2 focus:ring-offset-surface-page
"
```

---

## 15. Implementation Examples

### Complete Dashboard Card

```tsx
export function MetricCard({ title, value, unit, change, icon: Icon }) {
  return (
    <div className="
      bg-surface-card backdrop-blur-[40px] saturate-[180%]
      border border-border-subtle
      rounded-glass-lg p-6
      shadow-card
      hover:shadow-card-hover hover:-translate-y-0.5
      transition-all duration-[280ms] ease-out
      group
    ">
      {/* Icon */}
      <div className="
        w-12 h-12 mb-4
        bg-action-primary/10
        rounded-glass-sm
        flex items-center justify-center
        group-hover:bg-action-primary/15
        transition-colors duration-[180ms]
      ">
        <Icon className="w-6 h-6 text-action-primary" />
      </div>

      {/* Title */}
      <h3 className="text-sm font-medium text-text-secondary mb-1">
        {title}
      </h3>

      {/* Value */}
      <p className="text-3xl font-bold text-text-primary mb-2">
        {value}
        {unit && (
          <span className="text-lg font-normal text-text-muted ml-1">
            {unit}
          </span>
        )}
      </p>

      {/* Change indicator */}
      {change && (
        <div className={`
          inline-flex items-center gap-1
          text-sm font-medium
          ${change > 0 ? 'text-status-success' : 'text-status-error'}
        `}>
          {change > 0 ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
          {Math.abs(change)}%
        </div>
      )}
    </div>
  );
}
```

### Complete Form Input

```tsx
export function FormInput({
  label,
  error,
  helper,
  ...props
}) {
  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <label className="
          block text-sm font-medium text-text-secondary
        ">
          {label}
        </label>
      )}

      {/* Input */}
      <input
        className={`
          w-full
          bg-surface-subtle backdrop-blur-[20px]
          border rounded-glass-sm
          py-3 px-4
          text-text-primary placeholder:text-text-muted
          transition-all duration-[180ms] ease-out
          focus:outline-none focus:ring-4
          ${error
            ? 'border-status-error focus:ring-status-error/20'
            : 'border-border-default focus:border-border-focus focus:ring-border-focus/20'
          }
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        {...props}
      />

      {/* Helper/Error text */}
      {(helper || error) && (
        <p className={`
          text-sm
          ${error ? 'text-status-error' : 'text-text-muted'}
        `}>
          {error || helper}
        </p>
      )}
    </div>
  );
}
```

### Complete Modal

```tsx
export function GlassModal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 z-[300]
              bg-black/25 backdrop-blur-sm
            "
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="
              fixed inset-x-4 top-1/2 -translate-y-1/2 z-[301]
              max-w-lg mx-auto
              bg-surface-elevated backdrop-blur-[60px] saturate-[180%]
              border border-border-subtle
              rounded-glass-xl
              shadow-lg
              overflow-hidden
            "
          >
            {/* Header */}
            <div className="
              flex items-center justify-between
              px-6 py-4
              border-b border-border-subtle
            ">
              <h2 className="text-xl font-semibold text-text-primary">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="
                  w-8 h-8
                  rounded-full
                  flex items-center justify-center
                  text-text-muted
                  hover:bg-surface-subtle hover:text-text-primary
                  transition-colors duration-[180ms]
                "
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

---

## 16. Checklist

### Before Every Implementation

```markdown
## Pre-Implementation Checklist

### Design Tokens
- [ ] Imported glass tokens from `lib/design-system/glass-tokens.ts`
- [ ] Using semantic color tokens (NOT hardcoded values)
- [ ] Following radius hierarchy

### Glass Effects
- [ ] Using 40px blur for glass materials
- [ ] Applied backdrop-filter with saturate(180%)
- [ ] Added subtle border for glass edges

### States
- [ ] Implemented hover state
- [ ] Implemented active/pressed state
- [ ] Implemented focus state with ring
- [ ] Implemented disabled state

### Dark Mode
- [ ] All colors support dark mode
- [ ] Tested in both light and dark themes

### Accessibility
- [ ] WCAG AA contrast ratio met
- [ ] Focus indicators visible
- [ ] Touch targets minimum 44px
- [ ] Reduced motion support

### Animation
- [ ] Using defined easing curves
- [ ] Using defined duration values
- [ ] Smooth transitions on all interactive elements

### Typography
- [ ] Using defined type scale
- [ ] Proper font weights
- [ ] Correct line heights
```

### Code Review Checklist

```markdown
## PR Review Checklist for UI Components

- [ ] No hardcoded colors (all from token system)
- [ ] Correct radius level for component hierarchy
- [ ] Glass effect applied where appropriate
- [ ] Dark mode support verified
- [ ] Transitions use standard timing functions
- [ ] Focus states implemented
- [ ] Hover/active states implemented
- [ ] Accessibility requirements met
- [ ] Component follows established patterns
- [ ] TypeScript types properly defined
```

---

## Quick Copy-Paste References

### Glass Card

```tsx
className="bg-surface-card backdrop-blur-[40px] saturate-[180%] border border-border-subtle rounded-glass-lg p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-[280ms] ease-out"
```

### Glass Button Primary

```tsx
className="bg-action-primary text-white font-semibold py-3 px-6 rounded-full shadow-button-primary backdrop-blur-[20px] hover:bg-action-primary-hover hover:scale-[1.02] active:scale-[0.98] focus:ring-4 focus:ring-border-focus focus:outline-none transition-all duration-[280ms] ease-out"
```

### Glass Input

```tsx
className="w-full bg-surface-subtle backdrop-blur-[20px] border border-border-default rounded-glass-sm py-3 px-4 text-text-primary placeholder:text-text-muted focus:border-border-focus focus:ring-4 focus:ring-border-focus/20 focus:outline-none transition-all duration-[180ms]"
```

### Glass Modal Container

```tsx
className="bg-surface-elevated backdrop-blur-[60px] saturate-[180%] border border-border-subtle rounded-glass-xl shadow-lg overflow-hidden"
```

---

**END OF SKILL DOCUMENT**

*This skill is the source of truth for all UI development in WellWave AI.
All AI assistants MUST follow these specifications without exception.*
