# Implementation Plan: Apple Liquid Glass 2026 - Dashboard Completo

**Feature ID:** 005  
**Created:** 2026-01-08  
**Status:** Completed  
**Version:** 1.0.0  
**Based on Spec:** `spec.md` v1.0.0

---

## Implementation Plan

This document describes the implementation plan for the Apple Liquid Glass 2026 design system across the WellWave dashboard.

## Technology Stack

- **Frontend Framework:** Next.js 16 with React 19
- **Styling:** Tailwind CSS 4 with custom design tokens
- **Animations:** Framer Motion with spring physics
- **CSS Architecture:** CSS Custom Properties for theming

---

## Executive Summary

This plan details the implementation of **authentic Apple Liquid Glass 2026** design language across the WellWave dashboard. We will transform the current glassmorphism (55% opacity, 40px blur) into the authentic Liquid Glass 2026 standard (25% opacity, 60px blur, 180% saturation) with luminous borders, light refraction effects, and volumetric shadows.

**Implementation Approach:** Phased rollout starting with design tokens, then progressive enhancement of components, maintaining backwards compatibility and 60fps performance.

**Tech Stack:**

- Tailwind CSS 4 (utility-first, custom design tokens)
- CSS Custom Properties (dynamic theme switching)
- Framer Motion (spring physics animations)
- React 19 (concurrent rendering for smooth animations)

**Timeline:** 5 hours (6 phases)
**Risk Level:** Medium (performance on low-end devices)

---

## Architecture Overview

### Design Token System

We will create a **3-tier token system**:

1. **Base Tokens** (`app/liquid-glass-utils.css`)
   - CSS custom properties for Liquid Glass 2026 values
   - Light/dark mode variants
   - Mobile-optimized blur values (40px → 30px on mobile)

2. **Tailwind Extensions** (`tailwind.config.ts`)
   - New `backdropBlur` values: `4xl` (60px), `5xl` (80px)
   - New `backdropSaturate`: `180` (180%)
   - New `borderRadius`: `liquid-lg` (32px), `liquid-xl` (40px)
   - New `boxShadow`: `glass`, `glow-blue`, `glow-red`

3. **Utility Classes** (`app/globals.css`)
   - `.liquid-glass-2026` - Main material class
   - `.light-refraction` - Diagonal light gradient
   - `.icon-glow` - Icon drop-shadow effect
   - `.btn-liquid-glass` - Button with colored shadow

### Component Hierarchy

```
app/layout.tsx (Background Gradient)
├── DashboardLayout (app/(dashboard)/layout.tsx)
│   ├── DashboardHeader (Sidebar with glass effect)
│   └── Main Content
│       ├── Dashboard Page (app/(dashboard)/dashboard/page.tsx)
│       │   ├── GlassMetricCard (components/ui/glass-container.tsx)
│       │   └── Syndrome Cards (Updated styling)
│       └── Other Pages (Future)
└── Global CSS (app/globals.css)
```

### Performance Strategy

**GPU Acceleration:**

- Use `will-change: backdrop-filter` on hover states
- `transform: translateZ(0)` for hardware acceleration
- Limit blur to 60px (avoid 80px+ which causes frame drops)

**Mobile Optimization:**

- Reduce blur: 60px → 40px on screens <768px
- Disable blur on `prefers-reduced-transparency`
- Use solid background fallback for Safari <16

**Lazy Loading:**

- Animations only trigger `whileInView` (Framer Motion viewport detection)
- Disable micro-animations on `prefers-reduced-motion`

---

## Design Token Specifications

### 1. CSS Custom Properties (`app/liquid-glass-utils.css`)

```css
:root {
  /* Liquid Glass 2026 Core Tokens */
  --liquid-glass-bg: rgba(255, 255, 255, 0.25);
  --liquid-glass-border: rgba(255, 255, 255, 0.3);
  --liquid-glass-blur: 60px;
  --liquid-glass-blur-mobile: 40px;
  --liquid-glass-saturate: 180%;
  --liquid-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.4);
  --liquid-glass-shadow-elevated: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  --liquid-glass-blur-elevated: 80px;

  /* Colored Shadows */
  --shadow-glow-blue: 0 4px 24px rgba(59, 130, 246, 0.35);
  --shadow-glow-red: 0 4px 24px rgba(255, 59, 48, 0.35);
  --shadow-glow-green: 0 4px 24px rgba(52, 199, 89, 0.35);

  /* Noise Texture (for grain effect) */
  --noise-texture: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+');
}

.dark {
  --liquid-glass-bg: rgba(28, 28, 30, 0.25);
  --liquid-glass-border: rgba(255, 255, 255, 0.1);
  --liquid-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  --liquid-glass-shadow-elevated: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
```

### 2. Tailwind Config Extensions (`tailwind.config.ts`)

```typescript
// ADD to existing config
{
  extend: {
    backdropBlur: {
      '4xl': '60px',
      '5xl': '80px',
    },
    backdropSaturate: {
      '180': '180%',
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
      'float': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    },
  },
}
```

---

## Implementation Phases

### Phase 1: Design Tokens Foundation (30 min)

**Goal:** Create the token system for Liquid Glass 2026

**Tasks:**

1. **Create `app/liquid-glass-utils.css`**
   - Define CSS custom properties (see above)
   - Dark mode variants
   - Noise texture data URI
   - Mobile breakpoint rules

2. **Update `tailwind.config.ts`**
   - Add `backdropBlur` 4xl, 5xl
   - Add `backdropSaturate` 180
   - Add `borderRadius` liquid-\*
   - Add `boxShadow` glass, glow-\*

3. **Update `app/globals.css`**
   - Import `liquid-glass-utils.css`
   - Update `.liquid-glass-material` utility (already exists, enhance it)
   - Add `.glass-elevated` utility
   - Add `.rim-highlight` utility
   - Add `.icon-glow` utility

**Verification:**

```bash
# Run dev server and inspect CSS variables in DevTools
pnpm dev
# Open http://localhost:3000
# Inspect element → Computed → Filter "liquid-glass"
```

**Success Criteria:**

- [ ] All CSS variables defined and accessible
- [ ] Tailwind utilities compile without errors
- [ ] Dark mode variants work correctly
- [ ] No console errors or warnings

---

### Phase 2: Dashboard Syndrome Cards (45 min)

**Goal:** Update syndrome cards on dashboard to use authentic Liquid Glass 2026

**File:** `app/(dashboard)/dashboard/page.tsx`

**Current State (lines 128-138):**

```tsx
className={`
  h-full relative overflow-hidden
  liquid-glass-material
  bg-white/55 dark:bg-slate-900/55          // ❌ 55% opacity
  border border-white/40 dark:border-white/10
  rounded-2xl                                // ❌ 16px radius
  shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)]
  ...
`}
```

**Target State:**

```tsx
className={`
  h-full relative overflow-hidden
  liquid-glass-material
  bg-white/25 dark:bg-slate-900/25          // ✅ 25% opacity
  backdrop-blur-4xl saturate-180            // ✅ 60px blur + 180% saturation
  border border-white/30 dark:border-white/10
  rounded-liquid-lg                          // ✅ 32px radius
  shadow-glass dark:shadow-glass-dark        // ✅ Luminous border
  ring-1 ring-white/40 dark:ring-white/5    // ✅ Subtle ring
  ...
`}
```

**Changes:**

1. **Update Card Container Classes**
   - `bg-white/55` → `bg-white/25`
   - `rounded-2xl` → `rounded-liquid-lg`
   - Add `backdrop-blur-4xl saturate-180`
   - Add `shadow-glass dark:shadow-glass-dark`
   - Add `ring-1 ring-white/40 dark:ring-white/5`

2. **Add Light Refraction Effect**
   - Add wrapper div with `.light-refraction` class
   - Positioned `::before` pseudo-element with diagonal gradient

**Implementation:**

```tsx
<Link href={`/anamnese/${syndrome.code.toLowerCase()}`}>
  <motion.div
    whileHover={{ scale: 1.02, y: -4 }}
    whileTap={{ scale: 0.98 }}
    className={`
      h-full relative overflow-hidden
      liquid-glass-material
      bg-white/25 dark:bg-slate-900/25
      backdrop-blur-4xl saturate-180
      border border-white/30 dark:border-white/10
      rounded-liquid-lg
      shadow-glass dark:shadow-glass-dark
      ring-1 ring-white/40 dark:ring-white/5
      transition-all duration-[500ms] ease-[cubic-bezier(0.25,1,0.5,1)]
      group
    `}
  >
    {/* Light Refraction */}
    <div className="light-refraction" />

    {/* Existing content ... */}
  </motion.div>
</Link>
```

**Verification:**

- [ ] Cards have 25% opacity (more transparent)
- [ ] Blur is 60px (more depth)
- [ ] Border-radius is 32px (softer corners)
- [ ] Luminous border visible (inner shadow)
- [ ] Light refraction gradient on top 50%
- [ ] 60fps on hover animation

---

### Phase 3: Floating Sidebar Glass Effect (30 min)

**Goal:** Create floating sidebar with deep glass effect separating it from background

**File:** `app/(dashboard)/layout.tsx` (or create `components/layout/DashboardHeader.tsx`)

**Current State:**
Sidebar has standard background, no separation from main content.

**Target State:**
Sidebar floats with glass effect, deep shadow, and clear visual separation.

**Sidebar Styling:**

```tsx
<aside
  className={`
  fixed left-0 top-0 h-full w-64
  liquid-glass-material glass-elevated
  bg-white/25 dark:bg-slate-900/25
  backdrop-blur-5xl saturate-[200%]          // Extra blur for elevation
  border-r border-white/50 dark:border-white/20
  shadow-float                                 // Deep shadow
  z-50
`}
>
  {/* Sidebar content */}
</aside>
```

**Changes:**

1. **Separate Sidebar Component** (if not already)
   - Create `components/layout/DashboardSidebar.tsx` if needed
   - Apply `.glass-elevated` utility (80px blur)

2. **Update Layout Background**
   - Add gradient background to `app/(dashboard)/layout.tsx`
   - `bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30`

3. **Add Sidebar Shadow**
   - Use `shadow-float` for 25px offset shadow
   - Increase blur to 80px (`backdrop-blur-5xl`)
   - Increase saturation to 200%

**Implementation:**

```tsx
// app/(dashboard)/layout.tsx
<div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-slate-950/30 dark:via-purple-950/20 dark:to-pink-950/30">
  <DashboardSidebar />
  <main className="ml-64 p-8">{children}</main>
</div>
```

**Verification:**

- [ ] Sidebar clearly separated from background
- [ ] Deep shadow visible (25px offset)
- [ ] Blur is 80px (maximum depth)
- [ ] Background gradient subtle but visible
- [ ] Dark mode adapts correctly

---

### Phase 4: Glass Components Update (1 hour)

**Goal:** Update existing glass components to match Liquid Glass 2026 standards

#### 4.1 `components/ui/glass-container.tsx`

**Current `variant: 'card'` (line 37):**

```tsx
card: 'bg-white/60 dark:bg-[#1c1c1e]/60 backdrop-blur-3xl ...'
```

**Target:**

```tsx
card: 'bg-white/25 dark:bg-[#1c1c1e]/25 backdrop-blur-4xl saturate-180 border border-white/30 dark:border-white/10 shadow-glass dark:shadow-glass-dark ring-1 ring-white/40 dark:ring-white/5'
```

**Changes:**

1. **Update `variantClasses` object:**
   - Change all opacity values: `/60` → `/25`, `/40` → `/25`, `/20` → `/15`
   - Add `saturate-180` to all variants
   - Update blur: `backdrop-blur-3xl` → `backdrop-blur-4xl`
   - Add `shadow-glass dark:shadow-glass-dark`
   - Add `ring-1 ring-white/40 dark:ring-white/5`

2. **Update `GlassMetricCard` component:**
   - Change border-radius: `rounded-[32px]` (already correct)
   - Update opacity: `bg-white/60` → `bg-white/25`
   - Add `saturate-180`

**Verification:**

- [ ] All cards have 25% opacity
- [ ] Saturation at 180%
- [ ] Luminous borders visible
- [ ] Dark mode contrast maintained (WCAG AA)

#### 4.2 `components/ui/glass-button.tsx`

**Goal:** Add colored shadows to primary variant buttons

**Current `primary` variant (lines 31-39):**

```tsx
primary: [
  'bg-gradient-to-r from-blue-500/90 to-blue-600/90',
  'shadow-[0_25px_50px_-12px_rgba(0,122,255,0.25)]',  // Generic shadow
  ...
]
```

**Target:**

```tsx
primary: [
  'bg-gradient-to-r from-blue-500/90 to-blue-600/90',
  'shadow-glow-blue',  // Use new token
  'hover:shadow-[0_25px_50px_-12px_rgba(0,122,255,0.45)]',  // Intensify on hover
  ...
]
```

**Changes:**

1. **Update `primary` variant:**
   - Replace shadow with `shadow-glow-blue`
   - Add hover state: increase shadow opacity

2. **Update `destructive` variant:**
   - Replace shadow with `shadow-glow-red`

3. **Test button interactions:**
   - Verify ripple effect still works
   - Verify haptic tap animation
   - Verify colored glow visible on both light/dark

**Verification:**

- [ ] Blue glow on primary buttons
- [ ] Red glow on destructive buttons
- [ ] Glow intensifies on hover
- [ ] Ripple effect works
- [ ] 60fps animations

---

### Phase 5: Background & Typography Polish (45 min)

**Goal:** Add subtle background gradient and refine typography

#### 5.1 Background Gradient

**File:** `app/(dashboard)/layout.tsx` (line 27)

**Current:**

```tsx
<div className="min-h-screen bg-slate-50 dark:bg-slate-950">
```

**Target:**

```tsx
<div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-slate-950/30 dark:via-purple-950/20 dark:to-pink-950/30">
```

**Changes:**

- Add gradient with 3 color stops
- Use very low opacity (20-30%) for subtlety
- Dark mode: use dark variants of same colors

#### 5.2 Typography Refinement

**Files:**

- `app/(dashboard)/dashboard/page.tsx` (metric cards)
- `components/ui/glass-container.tsx` (GlassMetricCard)

**Changes:**

1. **Large Numbers (Metric Values):**
   - Current: `font-bold` (700)
   - Target: `font-light` (300)
   - Add `tracking-tight` (letter-spacing: -0.03em)

2. **Example:**

```tsx
// Before
<h3 className="text-[42px] font-bold text-slate-800 dark:text-white">
  {value}
</h3>

// After
<h3 className="text-[42px] font-light tracking-tight text-slate-800 dark:text-white">
  {value}
</h3>
```

**Verification:**

- [ ] Background gradient visible but subtle
- [ ] Numbers use thin font (300 weight)
- [ ] Tight letter spacing on display text
- [ ] Maintains readability (WCAG AA)

---

### Phase 6: Micro-Animations & Icon Glow (30 min)

**Goal:** Add final polish with spring physics and icon glow

#### 6.1 Icon Glow Effect

**File:** `app/globals.css`

**Add utility class:**

```css
.icon-glow {
  filter: drop-shadow(0 0 8px currentColor);
  transition: filter 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.icon-glow-active {
  filter: drop-shadow(0 0 12px currentColor);
}
```

**Apply to active icons:**

```tsx
// In DashboardSidebar or syndrome cards
<Icon className={cn('w-6 h-6', isActive && 'icon-glow-active')} />
```

#### 6.2 Spring Physics Animations

**Files:**

- `app/(dashboard)/dashboard/page.tsx` (syndrome cards)
- `components/ui/glass-container.tsx` (metric cards)

**Current hover animation:**

```tsx
whileHover={{ scale: 1.02, y: -4 }}
```

**Target (with spring physics):**

```tsx
whileHover={{
  scale: 1.02,
  y: -4,
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 30
  }
}}
```

**Add "breathing" animation to active elements:**

```tsx
animate={{
  scale: [1, 1.01, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }
}}
```

**Verification:**

- [ ] Hover has spring bounce (not linear)
- [ ] Active icons have glow (same color as icon)
- [ ] Breathing animation subtle (1% scale)
- [ ] All animations 60fps

---

## Testing Plan

### Performance Testing

**Tools:**

- Chrome DevTools Performance tab
- Lighthouse CI

**Metrics:**

- **FPS**: Must maintain 60fps during animations
- **Paint Time**: backdrop-filter must be <16ms
- **CLS**: Cumulative Layout Shift = 0
- **LCP**: Largest Contentful Paint <2.5s

**Test Scenarios:**

1. Hover over all syndrome cards rapidly
2. Toggle dark mode
3. Scroll dashboard with animations
4. Open/close sidebar
5. Mobile viewport (iPad, iPhone)

**Performance Checklist:**

- [ ] 60fps on desktop (Chrome, Safari, Firefox)
- [ ] 60fps on mobile (iOS Safari, Chrome Android)
- [ ] No jank on low-end devices (throttle CPU 4x)
- [ ] Blur fallback works on unsupported browsers

### Visual Regression Testing

**Tools:**

- Percy.io (visual snapshots)
- Manual QA

**Test Cases:**

1. Dashboard - Light mode
2. Dashboard - Dark mode
3. Syndrome cards - Hover states
4. Sidebar - Collapsed/expanded
5. Mobile view (375px, 768px, 1024px)

**Visual Checklist:**

- [ ] Glassmorphism has 25% opacity (not 55%)
- [ ] Blur is 60px (noticeable depth)
- [ ] Luminous borders visible
- [ ] Light refraction gradient on cards
- [ ] Colored shadows on buttons
- [ ] Icon glow on active states
- [ ] Typography thin (300 weight)

### Browser Compatibility Testing

**Target Browsers:**

- Safari 16+ (macOS, iOS)
- Chrome 90+
- Firefox 103+
- Edge 90+

**Test Matrix:**
| Browser | Light | Dark | Mobile | Blur | Saturate |
|---------|-------|------|--------|------|----------|
| Safari 16+ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Chrome 90+ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Firefox 103+ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Edge 90+ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Fallback Strategy:**

```css
@supports not (backdrop-filter: blur(60px)) {
  .liquid-glass-material {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: none;
  }
}

@media (prefers-reduced-transparency: reduce) {
  .liquid-glass-material {
    backdrop-filter: none;
    background: var(--color-background);
    border-color: var(--color-border);
  }
}
```

### Accessibility Testing

**Tools:**

- axe DevTools
- WAVE
- macOS VoiceOver
- NVDA (Windows)

**WCAG AA Compliance:**

- [ ] Color contrast ≥4.5:1 for text
- [ ] Focus indicators visible (3px glow)
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] No flashing animations (seizure risk)

**Test Checklist:**

- [ ] Tab through all interactive elements
- [ ] Focus ring visible on all states
- [ ] VoiceOver reads card content
- [ ] Dark mode maintains contrast
- [ ] `prefers-reduced-motion` disables animations

---

## Rollback Strategy

If performance issues arise or visual bugs are discovered:

### Phase 1: Immediate Rollback

```bash
git revert HEAD~1  # Revert last commit
pnpm build && pnpm start  # Verify production build
```

### Phase 2: Gradual Rollback

1. **Disable specific features:**
   - Remove `saturate-180` (keep blur)
   - Reduce blur: 60px → 40px
   - Remove colored shadows

2. **Feature flags (future):**
   - Add `NEXT_PUBLIC_LIQUID_GLASS_ENABLED` env var
   - Conditional CSS class application

### Phase 3: Fallback to Previous Design

- Keep design tokens but reduce opacity
- `bg-white/25` → `bg-white/45` (compromise)
- `backdrop-blur-4xl` → `backdrop-blur-3xl`

---

## Success Metrics

### Quantitative Metrics

| Metric                 | Current | Target | How to Measure           |
| ---------------------- | ------- | ------ | ------------------------ |
| Glassmorphism Opacity  | 55%     | 25%    | DevTools Computed Styles |
| Backdrop Blur          | 40px    | 60px   | DevTools Computed Styles |
| Border Radius (cards)  | 16px    | 32px   | DevTools Computed Styles |
| FPS (hover animations) | 60fps   | 60fps  | Chrome Performance Tab   |
| Paint Time (blur)      | ~10ms   | <16ms  | Chrome Performance Tab   |
| Lighthouse Performance | 85      | 90+    | Lighthouse CI            |

### Qualitative Metrics

- [ ] **Visual Premium:** Design looks "expensive" and professional
- [ ] **Consistent:** All components follow same glass language
- [ ] **Smooth:** Animations feel natural (spring physics)
- [ ] **Accessible:** WCAG AA contrast maintained
- [ ] **Dark Mode Excellence:** Dark mode equally polished

### User Feedback (Post-Launch)

- [ ] Medical professionals find interface "trustworthy"
- [ ] No complaints about readability
- [ ] Positive feedback on visual design
- [ ] No performance issues reported

---

## Dependencies

### External Dependencies

- **Tailwind CSS 4**: Already installed ✅
- **Framer Motion**: Already installed ✅
- **React 19**: Already installed ✅

### Internal Dependencies

- **`app/globals.css`**: Will be updated (Phase 1)
- **`app/liquid-glass-utils.css`**: Will be created (Phase 1)
- **`tailwind.config.ts`**: Will be updated (Phase 1)
- **Constitution v2.0.0**: Apple Design Language 2025 compliance ✅

### Breaking Changes

- **None**: This is a visual update only, no API changes

---

## Constraints & Considerations

### Technical Constraints

1. **Performance Budget:**
   - Max blur: 60px (80px only for elevated sidebar)
   - Mobile: Reduce to 40px blur
   - GPU acceleration required

2. **Browser Support:**
   - Must work on Safari 16+ (no `@supports` fallback acceptable)
   - Firefox backdrop-filter enabled by default since 103

3. **Accessibility:**
   - WCAG AA contrast maintained
   - `prefers-reduced-motion` honored
   - `prefers-reduced-transparency` honored

### Design Constraints

1. **Apple HIG Compliance:**
   - Border-radius: 32px for large containers
   - Shadows: Soft, volumetric (not flat)
   - Typography: Thin weights (300) for display text

2. **Medical Context:**
   - Must maintain professionalism
   - Cannot distract from critical information
   - Red flags must remain prominent

### Implementation Constraints

1. **No Functionality Changes:**
   - Only visual styling updates
   - No new components (update existing)
   - No state management changes

2. **Backwards Compatibility:**
   - Existing components continue to work
   - No breaking changes to props/APIs

---

## Timeline & Milestones

### Week 1: Foundation (30 min)

- **Day 1:** Phase 1 - Design Tokens Foundation
  - Create `liquid-glass-utils.css`
  - Update `tailwind.config.ts`
  - Update `app/globals.css`
  - **Checkpoint 1:** Verify tokens compile

### Week 1: Core Implementation (2 hours)

- **Day 1:** Phase 2 - Dashboard Syndrome Cards (45 min)
  - Update card styling
  - Add light refraction
  - **Checkpoint 2:** Verify cards render correctly

- **Day 1:** Phase 3 - Floating Sidebar (30 min)
  - Update sidebar styling
  - Add background gradient
  - **Checkpoint 3:** Verify sidebar separation

- **Day 1:** Phase 4 - Glass Components (1 hour)
  - Update `glass-container.tsx`
  - Update `glass-button.tsx`

### Week 1: Polish (1.25 hours)

- **Day 2:** Phase 5 - Background & Typography (45 min)
  - Add gradient background
  - Refine typography weights

- **Day 2:** Phase 6 - Micro-Animations (30 min)
  - Add icon glow
  - Implement spring physics

### Week 1: Testing & QA (2 hours)

- **Day 2:** Performance testing (1 hour)
- **Day 2:** Visual regression testing (30 min)
- **Day 2:** Browser compatibility testing (30 min)

**Total Time:** ~5 hours
**Checkpoints:** 3 (after Phase 1, 2, 3)
**Final Review:** Phase 6 complete

---

## Checkpoints

### Checkpoint 1: Design Tokens Created

**After Phase 1 (30 min)**

**Verification Steps:**

1. Run `pnpm dev`
2. Inspect any element in DevTools
3. Search for `--liquid-glass-bg` in Computed styles
4. Verify value is `rgba(255, 255, 255, 0.25)`
5. Toggle dark mode, verify changes to `rgba(28, 28, 30, 0.25)`

**Success Criteria:**

- [ ] All CSS variables accessible
- [ ] Tailwind compiles without errors
- [ ] Dark mode variants work
- [ ] No console warnings

**Go/No-Go Decision:**

- ✅ **GO**: All criteria met → Proceed to Phase 2
- ❌ **NO-GO**: Fix errors before continuing

### Checkpoint 2: Dashboard Cards Updated

**After Phase 2 (45 min)**

**Verification Steps:**

1. Navigate to `/dashboard`
2. Inspect syndrome cards
3. Verify `bg-white/25` (not `/55`)
4. Verify `backdrop-blur-4xl` (60px)
5. Verify `shadow-glass` applied
6. Hover over card, verify 60fps animation

**Success Criteria:**

- [ ] Cards have 25% opacity
- [ ] Blur is 60px
- [ ] Luminous border visible
- [ ] Light refraction gradient present
- [ ] 60fps hover animation

**Go/No-Go Decision:**

- ✅ **GO**: All criteria met → Proceed to Phase 3
- ⚠️ **CONDITIONAL GO**: Performance issues → Reduce blur to 50px
- ❌ **NO-GO**: Visual bugs → Fix before continuing

### Checkpoint 3: All Components Updated

**After Phase 4 (1 hour)**

**Verification Steps:**

1. Test all components:
   - Dashboard cards
   - Sidebar
   - Metric cards (GlassMetricCard)
   - Buttons (GlassButton)
2. Toggle dark mode, verify all work
3. Test mobile viewport (375px)
4. Run Lighthouse, check Performance score

**Success Criteria:**

- [ ] All components use Liquid Glass 2026
- [ ] Dark mode works correctly
- [ ] Mobile optimizations applied
- [ ] Lighthouse Performance ≥90

**Go/No-Go Decision:**

- ✅ **GO**: All criteria met → Proceed to Phase 5
- ⚠️ **CONDITIONAL GO**: Performance <90 → Optimize blur on mobile
- ❌ **NO-GO**: Major visual inconsistencies → Review architecture

---

## Post-Implementation

### Documentation Updates

1. **Update `docs/DESIGN_SYSTEM.md`:**
   - Document Liquid Glass 2026 tokens
   - Add usage examples
   - Include dark mode guidelines

2. **Update `README.md`:**
   - Add badge: "Design: Apple Liquid Glass 2026"
   - Link to design system docs

3. **Create `specs/005-dashboard-liquid-glass-2026/IMPLEMENTATION_NOTES.md`:**
   - Document any deviations from plan
   - Performance optimizations applied
   - Browser quirks discovered

### Monitoring

**Production Monitoring (Sentry):**

- Track performance metrics (FPS drops)
- Monitor error rates (browser compatibility issues)
- User session replays (visual bugs)

**Analytics:**

- Track dark mode usage
- Monitor viewport distributions (mobile vs desktop)
- Session duration (does design improve engagement?)

### Future Enhancements

**Phase 7: Advanced Effects (Future)**

- Animated noise grain texture
- Parallax scroll on cards
- Color-adaptive glass (tints based on content)

**Phase 8: Component Library (Future)**

- Extract to `@wellwave/liquid-glass` package
- Publish to npm
- Documentation site (Storybook)

---

## References

- [Apple Human Interface Guidelines - Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- [Constitution v2.0.0 - Apple Design Language 2025](../../memory/constitution.md#7-apple-design-language-2025)
- [macOS Sonoma Design System](https://www.apple.com/macos/sonoma/)
- [CSS backdrop-filter MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [Framer Motion Spring Physics](https://www.framer.com/motion/animation/)
- [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)
- [Spec-Kit Implementation](../../docs/SPEC_KIT_IMPLEMENTATION.md)

---

## Approval & Sign-off

**Spec Approved By:** User (Wesley)  
**Plan Author:** AI Assistant (Claude)  
**Implementation Start:** Pending user approval  
**Target Completion:** 5 hours from start

**Next Steps:**

1. ✅ Approve this plan
2. Run `/speckit.tasks` to generate task breakdown
3. Run `/speckit.implement` to begin implementation
