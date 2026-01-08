# Task Breakdown: Apple Liquid Glass 2026 - Dashboard Completo

**Feature ID:** 005  
**Created:** 2026-01-08  
**Status:** Completed  
**Version:** 1.0.0  
**Based on Plan:** `plan.md` v1.0.0

---

## Tasks

All tasks for implementing Apple Liquid Glass 2026 design system are organized by phase below.

## Dependencies

- Phase 1 must complete before Phases 2, 3, 4
- Phases 2, 3, 4 can run in parallel
- Phase 5 requires Phase 4 complete
- Phase 6 requires Phase 2 complete

---

## Task Organization

**Total Tasks:** 42  
**Estimated Time:** 5 hours  
**Phases:** 6  
**Checkpoints:** 3

**Task Status Legend:**

- [ ] Not Started
- [x] Completed
- [⚠] Blocked (dependency not met)
- [🔄] In Progress

**Priority Legend:**

- 🔴 **Critical** (Must Have - Tier 1)
- 🟡 **High** (Should Have - Tier 2)
- 🟢 **Medium** (Nice to Have - Tier 3)

**Parallelization:**

- `[P]` = Can be executed in parallel with other `[P]` tasks in the same phase

---

## Phase 1: Design Tokens Foundation (30 min)

**Goal:** Create the token system for Liquid Glass 2026

### 1.1 Create CSS Custom Properties

**Priority:** 🔴 Critical  
**Files:** `app/liquid-glass-utils.css` (new file)  
**Dependencies:** None  
**Parallel:** No

**Tasks:**

- [ ] **Task 1.1.1**: Create `app/liquid-glass-utils.css` file
  - **Action:** Create new file
  - **Content:** CSS custom properties for Liquid Glass 2026

  ```css
  :root {
    --liquid-glass-bg: rgba(255, 255, 255, 0.25);
    --liquid-glass-border: rgba(255, 255, 255, 0.3);
    --liquid-glass-blur: 60px;
    --liquid-glass-blur-mobile: 40px;
    --liquid-glass-saturate: 180%;
    --liquid-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.4);
    --liquid-glass-shadow-elevated: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    --liquid-glass-blur-elevated: 80px;
    --shadow-glow-blue: 0 4px 24px rgba(59, 130, 246, 0.35);
    --shadow-glow-red: 0 4px 24px rgba(255, 59, 48, 0.35);
    --shadow-glow-green: 0 4px 24px rgba(52, 199, 89, 0.35);
    --noise-texture: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+');
  }
  ```

- [ ] **Task 1.1.2**: Add dark mode variants
  - **Action:** Add `.dark` selector with dark mode values
  - **File:** `app/liquid-glass-utils.css`

  ```css
  .dark {
    --liquid-glass-bg: rgba(28, 28, 30, 0.25);
    --liquid-glass-border: rgba(255, 255, 255, 0.1);
    --liquid-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    --liquid-glass-shadow-elevated: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
  ```

- [ ] **Task 1.1.3**: Add mobile breakpoint rules
  - **Action:** Add media query for mobile optimization
  - **File:** `app/liquid-glass-utils.css`

  ```css
  @media (max-width: 768px) {
    :root {
      --liquid-glass-blur: 40px;
    }
  }
  ```

- [ ] **Task 1.1.4**: Add `prefers-reduced-transparency` fallback
  - **Action:** Add accessibility fallback
  - **File:** `app/liquid-glass-utils.css`
  ```css
  @media (prefers-reduced-transparency: reduce) {
    :root {
      --liquid-glass-bg: rgba(255, 255, 255, 0.9);
      --liquid-glass-blur: 0px;
    }
  }
  ```

### 1.2 Update Tailwind Configuration

**Priority:** 🔴 Critical  
**Files:** `tailwind.config.ts`  
**Dependencies:** None  
**Parallel:** [P] Can run parallel with 1.1

**Tasks:**

- [ ] **Task 1.2.1**: Add `backdropBlur` extensions
  - **Action:** Add to `theme.extend.backdropBlur`
  - **File:** `tailwind.config.ts` (line 193-200)

  ```typescript
  backdropBlur: {
    xs: '2px',
    xl: '20px',
    '2xl': '40px',
    '3xl': '50px',
    '4xl': '60px',  // ADD
    '5xl': '80px',  // ADD
  },
  ```

- [ ] **Task 1.2.2**: Add `backdropSaturate` extensions
  - **Action:** Add new `backdropSaturate` object to `theme.extend`
  - **File:** `tailwind.config.ts` (after `backdropBlur`)

  ```typescript
  backdropSaturate: {
    180: '180%',
  },
  ```

- [ ] **Task 1.2.3**: Add `borderRadius` liquid variants
  - **Action:** Add to `theme.extend.borderRadius`
  - **File:** `tailwind.config.ts` (line 119-129)

  ```typescript
  borderRadius: {
    lg: 'var(--radius)',
    md: 'calc(var(--radius) - 2px)',
    sm: 'calc(var(--radius) - 4px)',
    'apple-cta': '16px',
    'apple-card': '32px',
    'apple-input': '22px',
    '3xl': '1.5rem',
    '4xl': '2rem',
    '5xl': '2.75rem',
    'liquid-sm': '20px',   // ADD
    'liquid-md': '28px',   // ADD
    'liquid-lg': '32px',   // ADD
    'liquid-xl': '40px',   // ADD
  },
  ```

- [ ] **Task 1.2.4**: Add `boxShadow` glass variants
  - **Action:** Add to `theme.extend.boxShadow`
  - **File:** `tailwind.config.ts` (line 206-211)
  ```typescript
  boxShadow: {
    apple: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    'apple-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    'apple-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    'glass': '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.4)',     // UPDATE
    'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',  // ADD
    'glow-blue': '0 4px 24px rgba(59, 130, 246, 0.35)',   // ADD
    'glow-red': '0 4px 24px rgba(255, 59, 48, 0.35)',     // ADD
    'glow-green': '0 4px 24px rgba(52, 199, 89, 0.35)',   // ADD
    'float': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',     // ADD
  },
  ```

### 1.3 Update Global CSS

**Priority:** 🔴 Critical  
**Files:** `app/globals.css`  
**Dependencies:** Task 1.1 (CSS custom properties must exist)  
**Parallel:** No

**Tasks:**

- [ ] **Task 1.3.1**: Import `liquid-glass-utils.css`
  - **Action:** Add import at top of file (after Tailwind imports)
  - **File:** `app/globals.css` (line 2)

  ```css
  @import 'tailwindcss';
  @import './liquid-glass-utils.css'; /* ADD */
  ```

- [ ] **Task 1.3.2**: Update `.liquid-glass-material` utility
  - **Action:** Enhance existing utility with new tokens
  - **File:** `app/globals.css` (lines 100-167)

  ```css
  @utility liquid-glass-material {
    position: relative;
    background-color: var(--liquid-glass-bg);
    -webkit-backdrop-filter: blur(var(--liquid-glass-blur)) saturate(var(--liquid-glass-saturate));
    backdrop-filter: blur(var(--liquid-glass-blur)) saturate(var(--liquid-glass-saturate));
    border: 1px solid var(--liquid-glass-border);
    box-shadow: var(--liquid-glass-shadow);
    transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    z-index: 1;
    border-radius: 32px;
    overflow: hidden;

    /* Add rim light highlight */
    box-shadow:
      var(--liquid-glass-shadow),
      inset 0 1px 1px 0 rgba(255, 255, 255, 0.5);
  }
  ```

- [ ] **Task 1.3.3**: Add `.glass-elevated` utility
  - **Action:** Create new utility class
  - **File:** `app/globals.css` (after `.liquid-glass-material`)

  ```css
  @utility glass-elevated {
    @apply liquid-glass-material;
    -webkit-backdrop-filter: blur(var(--liquid-glass-blur-elevated)) saturate(200%);
    backdrop-filter: blur(var(--liquid-glass-blur-elevated)) saturate(200%);
    box-shadow: var(--liquid-glass-shadow-elevated);
    z-index: 10;
    border-color: rgba(255, 255, 255, 0.5);

    &:hover {
      transform: translateY(-4px) scale(1.005);
      box-shadow:
        0 50px 100px -20px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(255, 255, 255, 0.8) inset;
    }
  }
  ```

- [ ] **Task 1.3.4**: Add `.light-refraction` utility
  - **Action:** Create utility for diagonal light gradient
  - **File:** `app/globals.css` (after `.glass-elevated`)

  ```css
  .light-refraction {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50%;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), transparent);
      border-radius: 32px 32px 0 0;
      pointer-events: none;
      z-index: 1;
    }
  }
  ```

- [ ] **Task 1.3.5**: Add `.icon-glow` utility
  - **Action:** Create utility for icon drop-shadow
  - **File:** `app/globals.css` (after `.light-refraction`)

  ```css
  .icon-glow {
    filter: drop-shadow(0 0 8px currentColor);
    transition: filter 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .icon-glow-active {
    filter: drop-shadow(0 0 12px currentColor);
  }
  ```

### 1.4 Verification & Testing

**Priority:** 🔴 Critical  
**Dependencies:** Tasks 1.1, 1.2, 1.3  
**Parallel:** No

**Tasks:**

- [ ] **Task 1.4.1**: Start dev server and verify CSS variables
  - **Action:** Run `pnpm dev` and inspect elements
  - **Verify:**
    - `--liquid-glass-bg` = `rgba(255, 255, 255, 0.25)`
    - `--liquid-glass-blur` = `60px`
    - Dark mode switches to `rgba(28, 28, 30, 0.25)`

- [ ] **Task 1.4.2**: Verify Tailwind compilation
  - **Action:** Check for build errors
  - **Verify:**
    - No TypeScript errors in `tailwind.config.ts`
    - No CSS compilation errors
    - New utilities available in DevTools autocomplete

- [ ] **Task 1.4.3**: Test mobile breakpoints
  - **Action:** Resize viewport to <768px
  - **Verify:**
    - `--liquid-glass-blur` reduces to `40px` on mobile

**✅ CHECKPOINT 1: Design Tokens Created**

---

## Phase 2: Dashboard Syndrome Cards (45 min)

**Goal:** Update syndrome cards to use authentic Liquid Glass 2026

### 2.1 Update Card Container Styling

**Priority:** 🔴 Critical  
**Files:** `app/(dashboard)/dashboard/page.tsx`  
**Dependencies:** Phase 1 complete  
**Parallel:** No

**Tasks:**

- [ ] **Task 2.1.1**: Update background opacity
  - **Action:** Change background opacity from 55% to 25%
  - **File:** `app/(dashboard)/dashboard/page.tsx` (line 130)
  - **Change:**
    - FROM: `bg-white/55 dark:bg-slate-900/55`
    - TO: `bg-white/25 dark:bg-slate-900/25`

- [ ] **Task 2.1.2**: Add backdrop filter with saturation
  - **Action:** Add blur and saturation
  - **File:** `app/(dashboard)/dashboard/page.tsx` (line 130)
  - **Add:** `backdrop-blur-4xl saturate-180`

- [ ] **Task 2.1.3**: Update border-radius
  - **Action:** Change to liquid variant
  - **File:** `app/(dashboard)/dashboard/page.tsx` (line 132)
  - **Change:**
    - FROM: `rounded-2xl`
    - TO: `rounded-liquid-lg`

- [ ] **Task 2.1.4**: Update box-shadow
  - **Action:** Use new glass shadow token
  - **File:** `app/(dashboard)/dashboard/page.tsx` (line 133-134)
  - **Change:**
    - FROM: `shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)]` `dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)]`
    - TO: `shadow-glass dark:shadow-glass-dark`

- [ ] **Task 2.1.5**: Add ring for subtle border
  - **Action:** Add ring utility
  - **File:** `app/(dashboard)/dashboard/page.tsx` (line 134)
  - **Add:** `ring-1 ring-white/40 dark:ring-white/5`

- [ ] **Task 2.1.6**: Update border color
  - **Action:** Adjust border opacity
  - **File:** `app/(dashboard)/dashboard/page.tsx` (line 131)
  - **Change:**
    - FROM: `border border-white/40 dark:border-white/10`
    - TO: `border border-white/30 dark:border-white/10`

### 2.2 Add Light Refraction Effect

**Priority:** 🔴 Critical  
**Files:** `app/(dashboard)/dashboard/page.tsx`  
**Dependencies:** Task 2.1  
**Parallel:** No

**Tasks:**

- [ ] **Task 2.2.1**: Add light refraction div
  - **Action:** Insert div with `.light-refraction` class inside card
  - **File:** `app/(dashboard)/dashboard/page.tsx` (line 138, after opening `<motion.div>`)
  - **Add:**
  ```tsx
  <motion.div className={/* existing classes */}>
    {/* Light Refraction */}
    <div className="light-refraction" />

    {/* Content */}
    <div className="p-6">{/* existing content */}</div>
  </motion.div>
  ```

### 2.3 Update Icon Container

**Priority:** 🟡 High  
**Files:** `app/(dashboard)/dashboard/page.tsx`  
**Dependencies:** Task 2.1  
**Parallel:** [P] Can run parallel with 2.2

**Tasks:**

- [ ] **Task 2.3.1**: Update icon background opacity
  - **Action:** Reduce opacity for consistency
  - **File:** `app/(dashboard)/dashboard/page.tsx` (line 146)
  - **Change:**
    - FROM: `bg-gradient-to-br from-blue-500/10 to-purple-500/10`
    - TO: `bg-gradient-to-br from-blue-500/15 to-purple-500/15`

- [ ] **Task 2.3.2**: Update icon hover state
  - **Action:** Increase hover opacity slightly
  - **File:** `app/(dashboard)/dashboard/page.tsx` (line 146)
  - **Change:**
    - FROM: `group-hover:from-blue-500/20 group-hover:to-purple-500/20`
    - TO: `group-hover:from-blue-500/25 group-hover:to-purple-500/25`

### 2.4 Verification & Testing

**Priority:** 🔴 Critical  
**Dependencies:** Tasks 2.1, 2.2, 2.3  
**Parallel:** No

**Tasks:**

- [ ] **Task 2.4.1**: Visual verification
  - **Action:** Navigate to `/dashboard` and inspect cards
  - **Verify:**
    - Cards have 25% opacity (more transparent)
    - Blur is 60px (visible depth)
    - Border-radius is 32px (softer corners)
    - Luminous border visible (inner shadow)
    - Light refraction gradient on top 50%

- [ ] **Task 2.4.2**: Performance verification
  - **Action:** Open Chrome DevTools Performance tab
  - **Verify:**
    - 60fps during hover animations
    - No layout shifts (CLS = 0)
    - Paint time <16ms

- [ ] **Task 2.4.3**: Dark mode verification
  - **Action:** Toggle dark mode
  - **Verify:**
    - Background switches to `rgba(28, 28, 30, 0.25)`
    - Shadows adapt correctly
    - Contrast maintained (WCAG AA)

**✅ CHECKPOINT 2: Dashboard Cards Updated**

---

## Phase 3: Floating Sidebar Glass Effect (30 min)

**Goal:** Create floating sidebar with deep glass effect

### 3.1 Add Background Gradient

**Priority:** 🔴 Critical  
**Files:** `app/(dashboard)/layout.tsx`  
**Dependencies:** Phase 1 complete  
**Parallel:** No

**Tasks:**

- [ ] **Task 3.1.1**: Update layout background with gradient
  - **Action:** Add gradient classes to main container
  - **File:** `app/(dashboard)/layout.tsx` (line 27, estimate)
  - **Change:**
    - FROM: `<div className="min-h-screen bg-slate-50 dark:bg-slate-950">`
    - TO: `<div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-slate-950/30 dark:via-purple-950/20 dark:to-pink-950/30">`

### 3.2 Update Sidebar Styling (if sidebar exists)

**Priority:** 🔴 Critical  
**Files:** `app/(dashboard)/layout.tsx` or `components/layout/DashboardHeader.tsx`  
**Dependencies:** Task 3.1  
**Parallel:** No

**Note:** If sidebar doesn't exist as a separate floating element, this phase may be adapted for the header/navigation component.

**Tasks:**

- [ ] **Task 3.2.1**: Identify sidebar component location
  - **Action:** Find where sidebar/navigation is rendered
  - **Options:**
    - `app/(dashboard)/layout.tsx`
    - `components/layout/DashboardHeader.tsx`
    - Inline in layout

- [ ] **Task 3.2.2**: Apply glass-elevated utility to sidebar
  - **Action:** Add `.glass-elevated` class to sidebar container
  - **File:** (Identified in 3.2.1)
  - **Add:** `glass-elevated` to className

- [ ] **Task 3.2.3**: Add background with low opacity
  - **Action:** Add background color
  - **Add:** `bg-white/25 dark:bg-slate-900/25`

- [ ] **Task 3.2.4**: Add elevated blur
  - **Action:** Add extra blur for depth separation
  - **Add:** `backdrop-blur-5xl saturate-[200%]`

- [ ] **Task 3.2.5**: Add border for separation
  - **Action:** Add right border (if sidebar on left)
  - **Add:** `border-r border-white/50 dark:border-white/20`

- [ ] **Task 3.2.6**: Add floating shadow
  - **Action:** Add deep shadow
  - **Add:** `shadow-float`

- [ ] **Task 3.2.7**: Add z-index for layering
  - **Action:** Ensure sidebar floats above content
  - **Add:** `z-50`

### 3.3 Verification & Testing

**Priority:** 🔴 Critical  
**Dependencies:** Tasks 3.1, 3.2  
**Parallel:** No

**Tasks:**

- [ ] **Task 3.3.1**: Visual verification
  - **Action:** Navigate to any dashboard page
  - **Verify:**
    - Background gradient visible but subtle
    - Sidebar clearly separated from background
    - Deep shadow visible (25px offset)
    - Blur is 80px on sidebar (maximum depth)

- [ ] **Task 3.3.2**: Dark mode verification
  - **Action:** Toggle dark mode
  - **Verify:**
    - Gradient adapts to dark colors
    - Sidebar maintains visibility
    - Contrast preserved

- [ ] **Task 3.3.3**: Mobile verification
  - **Action:** Test on mobile viewport (<768px)
  - **Verify:**
    - Sidebar behaves correctly (collapsed/hamburger menu)
    - Blur reduces to 40px on mobile
    - Performance maintained

**✅ CHECKPOINT 3: Sidebar & Background Complete**

---

## Phase 4: Glass Components Update (1 hour)

**Goal:** Update existing glass components to match Liquid Glass 2026 standards

### 4.1 Update `glass-container.tsx` Variants

**Priority:** 🔴 Critical  
**Files:** `components/ui/glass-container.tsx`  
**Dependencies:** Phase 1 complete  
**Parallel:** No

**Tasks:**

- [ ] **Task 4.1.1**: Update `card` variant
  - **Action:** Change opacity, blur, and add saturation
  - **File:** `components/ui/glass-container.tsx` (line 37)
  - **Change:**
    - FROM: `bg-white/60 dark:bg-[#1c1c1e]/60 backdrop-blur-3xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] ring-1 ring-white/40 dark:ring-white/5`
    - TO: `bg-white/25 dark:bg-[#1c1c1e]/25 backdrop-blur-4xl saturate-180 border border-white/30 dark:border-white/10 shadow-glass dark:shadow-glass-dark ring-1 ring-white/40 dark:ring-white/5`

- [ ] **Task 4.1.2**: Update `panel` variant
  - **Action:** Change opacity and blur
  - **File:** `components/ui/glass-container.tsx` (line 38)
  - **Change:**
    - FROM: `bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10`
    - TO: `bg-white/25 dark:bg-white/[0.03] backdrop-blur-4xl saturate-180 border border-white/30 dark:border-white/10`

- [ ] **Task 4.1.3**: Update `section` variant
  - **Action:** Change opacity and blur
  - **File:** `components/ui/glass-container.tsx` (line 39)
  - **Change:**
    - FROM: `bg-white/20 dark:bg-white/[0.02] backdrop-blur-2xl border border-white/30 dark:border-white/5`
    - TO: `bg-white/15 dark:bg-white/[0.02] backdrop-blur-4xl saturate-180 border border-white/20 dark:border-white/5`

- [ ] **Task 4.1.4**: Update `nav` variant
  - **Action:** Change opacity and blur
  - **File:** `components/ui/glass-container.tsx` (line 40)
  - **Change:**
    - FROM: `bg-white/60 dark:bg-[#1c1c1e]/60 backdrop-blur-3xl border-b border-white/60 dark:border-white/10`
    - TO: `bg-white/25 dark:bg-[#1c1c1e]/25 backdrop-blur-4xl saturate-180 border-b border-white/30 dark:border-white/10`

### 4.2 Update `GlassMetricCard` Component

**Priority:** 🔴 Critical  
**Files:** `components/ui/glass-container.tsx`  
**Dependencies:** Task 4.1  
**Parallel:** No

**Tasks:**

- [ ] **Task 4.2.1**: Update card background opacity
  - **Action:** Change from 60% to 25%
  - **File:** `components/ui/glass-container.tsx` (line 158)
  - **Change:**
    - FROM: `bg-white/60 dark:bg-[#1c1c1e]/60 backdrop-blur-3xl`
    - TO: `bg-white/25 dark:bg-[#1c1c1e]/25 backdrop-blur-4xl saturate-180`

- [ ] **Task 4.2.2**: Update border color
  - **Action:** Adjust border opacity
  - **File:** `components/ui/glass-container.tsx` (line 159)
  - **Change:**
    - FROM: `border border-white/60 dark:border-white/10`
    - TO: `border border-white/30 dark:border-white/10`

- [ ] **Task 4.2.3**: Update box-shadow
  - **Action:** Use glass shadow tokens
  - **File:** `components/ui/glass-container.tsx` (line 160)
  - **Change:**
    - FROM: `shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]`
    - TO: `shadow-glass hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]`

- [ ] **Task 4.2.4**: Verify border-radius
  - **Action:** Ensure using correct radius
  - **File:** `components/ui/glass-container.tsx` (line 156)
  - **Verify:** `rounded-[32px]` is correct (already matches spec)

### 4.3 Update `glass-button.tsx` Variants

**Priority:** 🟡 High  
**Files:** `components/ui/glass-button.tsx`  
**Dependencies:** Phase 1 complete  
**Parallel:** [P] Can run parallel with 4.1, 4.2

**Tasks:**

- [ ] **Task 4.3.1**: Update `primary` variant shadow
  - **Action:** Use colored shadow token
  - **File:** `components/ui/glass-button.tsx` (line 35)
  - **Change:**
    - FROM: `shadow-[0_25px_50px_-12px_rgba(0,122,255,0.25)]`
    - TO: `shadow-glow-blue`

- [ ] **Task 4.3.2**: Add hover shadow intensification for primary
  - **Action:** Increase shadow on hover
  - **File:** `components/ui/glass-button.tsx` (line 38)
  - **Change:**
    - FROM: `hover:shadow-[0_25px_50px_-12px_rgba(0,122,255,0.35)]`
    - TO: `hover:shadow-[0_25px_50px_-12px_rgba(0,122,255,0.45)]`

- [ ] **Task 4.3.3**: Update `secondary` variant opacity
  - **Action:** Reduce background opacity
  - **File:** `components/ui/glass-button.tsx` (line 41)
  - **Change:**
    - FROM: `bg-white/55 dark:bg-slate-900/65`
    - TO: `bg-white/35 dark:bg-slate-900/45`

- [ ] **Task 4.3.4**: Update `secondary` variant border
  - **Action:** Adjust border opacity
  - **File:** `components/ui/glass-button.tsx` (line 43)
  - **Change:**
    - FROM: `border-[1.5px] border-white/50 dark:border-white/12`
    - TO: `border-[1.5px] border-white/30 dark:border-white/12`

- [ ] **Task 4.3.5**: Update `destructive` variant shadow
  - **Action:** Use colored shadow token
  - **File:** `components/ui/glass-button.tsx` (line 54)
  - **Change:**
    - FROM: `shadow-[0_25px_50px_-12px_rgba(255,59,48,0.25)]`
    - TO: `shadow-glow-red`

- [ ] **Task 4.3.6**: Add hover shadow intensification for destructive
  - **Action:** Increase shadow on hover
  - **File:** `components/ui/glass-button.tsx` (line 57)
  - **Change:**
    - FROM: `hover:shadow-[0_25px_50px_-12px_rgba(255,59,48,0.35)]`
    - TO: `hover:shadow-[0_25px_50px_-12px_rgba(255,59,48,0.45)]`

### 4.4 Verification & Testing

**Priority:** 🔴 Critical  
**Dependencies:** Tasks 4.1, 4.2, 4.3  
**Parallel:** No

**Tasks:**

- [ ] **Task 4.4.1**: Test all GlassContainer variants
  - **Action:** Create test page with all variants
  - **Verify:**
    - All variants use 25% opacity
    - Saturation at 180%
    - Luminous borders visible
    - Dark mode works

- [ ] **Task 4.4.2**: Test GlassMetricCard
  - **Action:** View dashboard metrics
  - **Verify:**
    - Cards have correct opacity and blur
    - Hover effects work
    - Glow effects visible

- [ ] **Task 4.4.3**: Test GlassButton variants
  - **Action:** Test all button variants
  - **Verify:**
    - Primary has blue glow
    - Destructive has red glow
    - Secondary has correct opacity
    - Ripple effect works
    - Hover states smooth

- [ ] **Task 4.4.4**: Performance check
  - **Action:** Open Performance tab during interactions
  - **Verify:**
    - 60fps maintained
    - No jank on button clicks
    - Ripple animation smooth

---

## Phase 5: Background & Typography Polish (45 min)

**Goal:** Add subtle background gradient and refine typography

### 5.1 Typography Refinement

**Priority:** 🟡 High  
**Files:** `components/ui/glass-container.tsx`, `app/(dashboard)/dashboard/page.tsx`  
**Dependencies:** Phase 4 complete  
**Parallel:** No

**Tasks:**

- [ ] **Task 5.1.1**: Update metric value font weight
  - **Action:** Change from bold (700) to light (300)
  - **File:** `components/ui/glass-container.tsx` (line 219)
  - **Change:**
    - FROM: `text-[42px] font-bold text-slate-800 dark:text-white tracking-tight leading-none`
    - TO: `text-[42px] font-light text-slate-800 dark:text-white tracking-tight leading-none`

- [ ] **Task 5.1.2**: Add tight letter-spacing to display numbers
  - **Action:** Ensure `tracking-tight` is applied
  - **File:** `components/ui/glass-container.tsx` (line 219)
  - **Verify:** `tracking-tight` class exists (already present)

- [ ] **Task 5.1.3**: Update metric title font weight (if needed)
  - **Action:** Keep title as bold for contrast
  - **File:** `components/ui/glass-container.tsx` (line 216)
  - **Verify:** `text-[13px] font-bold` is correct for labels

- [ ] **Task 5.1.4**: Check syndrome card title typography
  - **Action:** Verify syndrome names use appropriate weight
  - **File:** `app/(dashboard)/dashboard/page.tsx` (locate syndrome title)
  - **Verify:** Titles are readable and contrast well

### 5.2 Additional Typography (if applicable)

**Priority:** 🟢 Medium  
**Files:** Various dashboard pages  
**Dependencies:** Task 5.1  
**Parallel:** [P] Can run parallel with 5.1

**Tasks:**

- [ ] **Task 5.2.1**: Identify other large numbers on dashboard
  - **Action:** Find any other display numbers that should be thin
  - **Files:** Check dashboard pages for metrics

- [ ] **Task 5.2.2**: Update identified numbers to font-light
  - **Action:** Apply `font-light tracking-tight` to display numbers
  - **Files:** (Identified in 5.2.1)

### 5.3 Verification & Testing

**Priority:** 🟡 High  
**Dependencies:** Tasks 5.1, 5.2  
**Parallel:** No

**Tasks:**

- [ ] **Task 5.3.1**: Visual verification
  - **Action:** Review all dashboard pages
  - **Verify:**
    - Large numbers use thin font (300 weight)
    - Tight letter spacing applied
    - Maintains readability (not too thin)

- [ ] **Task 5.3.2**: Accessibility check
  - **Action:** Run axe DevTools or WAVE
  - **Verify:**
    - Color contrast still ≥4.5:1 (WCAG AA)
    - Text readable in both light/dark mode
    - No accessibility regressions

- [ ] **Task 5.3.3**: Dark mode verification
  - **Action:** Toggle dark mode
  - **Verify:**
    - Thin fonts still readable
    - Contrast maintained
    - Background gradient visible but subtle

---

## Phase 6: Micro-Animations & Icon Glow (30 min)

**Goal:** Add final polish with spring physics and icon glow

### 6.1 Icon Glow Implementation

**Priority:** 🟢 Medium  
**Files:** `app/(dashboard)/dashboard/page.tsx`, sidebar components  
**Dependencies:** Phase 1 complete (`.icon-glow` utility exists)  
**Parallel:** No

**Tasks:**

- [ ] **Task 6.1.1**: Add glow to syndrome card icons
  - **Action:** Add `.icon-glow-active` on hover
  - **File:** `app/(dashboard)/dashboard/page.tsx` (line 148, icon component)
  - **Add:** Conditional class based on hover state

  ```tsx
  <IconComponent
    className={cn(
      'h-7 w-7 text-blue-600 dark:text-blue-400 transition-colors',
      'group-hover:icon-glow-active' // ADD
    )}
  />
  ```

- [ ] **Task 6.1.2**: Add glow to sidebar navigation icons (if applicable)
  - **Action:** Add `.icon-glow-active` to active nav items
  - **File:** Sidebar component (location TBD from Phase 3)
  - **Add:**
  ```tsx
  className={cn(
    "icon-base-classes",
    isActive && "icon-glow-active"
  )}
  ```

### 6.2 Spring Physics Animations

**Priority:** 🟢 Medium  
**Files:** `app/(dashboard)/dashboard/page.tsx`, `components/ui/glass-container.tsx`  
**Dependencies:** Phase 2 complete  
**Parallel:** [P] Can run parallel with 6.1

**Tasks:**

- [ ] **Task 6.2.1**: Update syndrome card hover animation
  - **Action:** Add spring physics to hover
  - **File:** `app/(dashboard)/dashboard/page.tsx` (line 125)
  - **Change:**
    - FROM: `whileHover={{ scale: 1.02, y: -4 }}`
    - TO:
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

- [ ] **Task 6.2.2**: Update GlassMetricCard hover animation
  - **Action:** Verify spring physics in place
  - **File:** `components/ui/glass-container.tsx` (hover state)
  - **Verify:** Hover already uses transition from `springConfig`

- [ ] **Task 6.2.3**: Add breathing animation to active elements (optional)
  - **Action:** Add subtle scale animation loop
  - **File:** `app/(dashboard)/dashboard/page.tsx` (optional for active cards)
  - **Add:**
  ```tsx
  animate={{
    scale: [1, 1.01, 1],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }}
  ```

### 6.3 Verification & Testing

**Priority:** 🟢 Medium  
**Dependencies:** Tasks 6.1, 6.2  
**Parallel:** No

**Tasks:**

- [ ] **Task 6.3.1**: Visual verification of icon glow
  - **Action:** Hover over syndrome cards and nav items
  - **Verify:**
    - Icons glow on hover
    - Glow color matches icon color
    - Smooth transition (0.3s)

- [ ] **Task 6.3.2**: Animation smoothness check
  - **Action:** Test all hover animations
  - **Verify:**
    - Hover has spring bounce (not linear)
    - Feels natural and responsive
    - No jank or stuttering

- [ ] **Task 6.3.3**: Performance verification
  - **Action:** Open Performance tab, interact with elements
  - **Verify:**
    - All animations run at 60fps
    - No dropped frames
    - GPU acceleration working

- [ ] **Task 6.3.4**: Mobile verification
  - **Action:** Test on mobile device or emulator
  - **Verify:**
    - Animations disabled on `prefers-reduced-motion`
    - Touch interactions smooth
    - No performance issues

---

## Final Testing & QA (30 min - not in original 5 hour estimate)

**Goal:** Comprehensive testing before deployment

### Final.1 Performance Testing

**Priority:** 🔴 Critical  
**Dependencies:** All phases complete  
**Parallel:** No

**Tasks:**

- [ ] **Task Final.1.1**: Run Lighthouse audit
  - **Action:** Run Lighthouse in Chrome DevTools
  - **Target:** Performance score ≥90
  - **Verify:**
    - FPS: 60fps maintained
    - Paint time: <16ms
    - CLS: 0
    - LCP: <2.5s

- [ ] **Task Final.1.2**: Test on low-end device
  - **Action:** Throttle CPU 4x in DevTools
  - **Verify:**
    - No jank or stuttering
    - Animations still smooth
    - Blur renders correctly

- [ ] **Task Final.1.3**: Mobile device testing
  - **Action:** Test on real iPhone and Android device
  - **Verify:**
    - iOS Safari renders correctly
    - Android Chrome renders correctly
    - 60fps maintained

### Final.2 Visual Regression Testing

**Priority:** 🔴 Critical  
**Dependencies:** All phases complete  
**Parallel:** [P] Can run parallel with Final.1

**Tasks:**

- [ ] **Task Final.2.1**: Dashboard light mode snapshot
  - **Action:** Take screenshot or use Percy
  - **Verify:** Matches design spec

- [ ] **Task Final.2.2**: Dashboard dark mode snapshot
  - **Action:** Toggle dark mode, take screenshot
  - **Verify:** Matches design spec

- [ ] **Task Final.2.3**: Hover states verification
  - **Action:** Test all hover states
  - **Verify:** All animations work correctly

- [ ] **Task Final.2.4**: Mobile viewport snapshots
  - **Action:** Test at 375px, 768px, 1024px
  - **Verify:** Responsive design works

### Final.3 Browser Compatibility Testing

**Priority:** 🔴 Critical  
**Dependencies:** All phases complete  
**Parallel:** [P] Can run parallel with Final.1, Final.2

**Tasks:**

- [ ] **Task Final.3.1**: Test Safari 16+ (macOS)
  - **Verify:** All effects render correctly

- [ ] **Task Final.3.2**: Test Chrome 90+
  - **Verify:** All effects render correctly

- [ ] **Task Final.3.3**: Test Firefox 103+
  - **Verify:** All effects render correctly

- [ ] **Task Final.3.4**: Test Edge 90+
  - **Verify:** All effects render correctly

- [ ] **Task Final.3.5**: Test Safari iOS 16+
  - **Verify:** Mobile rendering correct

### Final.4 Accessibility Testing

**Priority:** 🔴 Critical  
**Dependencies:** All phases complete  
**Parallel:** [P] Can run parallel with Final.1, Final.2, Final.3

**Tasks:**

- [ ] **Task Final.4.1**: Run axe DevTools scan
  - **Action:** Scan all dashboard pages
  - **Verify:** No critical accessibility issues

- [ ] **Task Final.4.2**: Color contrast check (WCAG AA)
  - **Action:** Use Lighthouse or Color Contrast Analyzer
  - **Verify:** All text ≥4.5:1 contrast ratio

- [ ] **Task Final.4.3**: Keyboard navigation test
  - **Action:** Tab through all interactive elements
  - **Verify:**
    - Focus indicators visible
    - Logical tab order
    - All elements reachable

- [ ] **Task Final.4.4**: Screen reader test (VoiceOver/NVDA)
  - **Action:** Navigate with screen reader
  - **Verify:** Content announced correctly

- [ ] **Task Final.4.5**: Test `prefers-reduced-motion`
  - **Action:** Enable reduced motion in OS settings
  - **Verify:** Animations disabled

- [ ] **Task Final.4.6**: Test `prefers-reduced-transparency`
  - **Action:** Enable reduced transparency in OS settings
  - **Verify:** Fallback to solid backgrounds

---

## Implementation Notes

### Execution Strategy

**Sequential Phases:**

- Phase 1 must complete before Phase 2, 3, 4
- Phases 2, 3, 4 can run in parallel after Phase 1
- Phase 5 requires Phase 4 complete
- Phase 6 requires Phase 2 complete
- Final testing requires all phases complete

**Parallelization Opportunities:**
Within phases:

- Phase 1: Tasks 1.1 and 1.2 can run parallel
- Phase 2: Tasks 2.2 and 2.3 can run parallel
- Phase 4: Tasks 4.1, 4.2, 4.3 can run parallel
- Phase 5: Tasks 5.1 and 5.2 can run parallel
- Phase 6: Tasks 6.1 and 6.2 can run parallel
- Final: All Final.\* tasks can run parallel

**Checkpoint Strategy:**

- Checkpoint 1 after Phase 1 (mandatory)
- Checkpoint 2 after Phase 2 (mandatory)
- Checkpoint 3 after Phase 3 (mandatory)
- Final review after Phase 6

### File Modification Summary

| File                                 | Lines Modified  | Priority    | Phase |
| ------------------------------------ | --------------- | ----------- | ----- |
| `app/liquid-glass-utils.css`         | ~100 (new file) | 🔴 Critical | 1     |
| `tailwind.config.ts`                 | ~15             | 🔴 Critical | 1     |
| `app/globals.css`                    | ~50             | 🔴 Critical | 1     |
| `app/(dashboard)/dashboard/page.tsx` | ~10             | 🔴 Critical | 2     |
| `app/(dashboard)/layout.tsx`         | ~5              | 🔴 Critical | 3     |
| `components/ui/glass-container.tsx`  | ~20             | 🔴 Critical | 4     |
| `components/ui/glass-button.tsx`     | ~10             | 🟡 High     | 4     |
| Various (typography)                 | ~10             | 🟡 High     | 5     |
| Various (animations)                 | ~10             | 🟢 Medium   | 6     |

**Total Files:** 8-10  
**Total Lines:** ~230

### Risk Mitigation

**High Risk Areas:**

1. **Performance on mobile** (Phase 3, 6)
   - Mitigation: Reduce blur to 40px on <768px
   - Test on real devices early

2. **Browser compatibility** (Phase 1, 4)
   - Mitigation: Include fallbacks for unsupported features
   - Test Safari 16 specifically

3. **Accessibility** (Phase 5, Final)
   - Mitigation: Test with screen readers early
   - Use WCAG AA contrast checker

**Medium Risk Areas:**

1. **Dark mode contrast** (Phase 2, 4, 5)
   - Mitigation: Test dark mode after each phase
   - Adjust opacity if needed

2. **Animation jank** (Phase 6)
   - Mitigation: Use GPU acceleration
   - Profile with Chrome DevTools

---

## Definition of Done

### Phase-Level DoD

- [ ] All tasks in phase marked complete
- [ ] Verification tasks pass
- [ ] No console errors or warnings
- [ ] Dark mode works correctly
- [ ] Performance maintained (60fps)

### Feature-Level DoD

- [ ] All 6 phases complete
- [ ] All 3 checkpoints passed
- [ ] Final testing complete
- [ ] All accessibility criteria met (WCAG AA)
- [ ] Browser compatibility verified (Safari 16+, Chrome 90+, Firefox 103+, Edge 90+)
- [ ] Performance targets met (Lighthouse ≥90, 60fps, <16ms paint)
- [ ] Visual regression tests pass
- [ ] Documentation updated (`IMPLEMENTATION_NOTES.md`)
- [ ] User approval obtained

---

## Post-Implementation Tasks

### Documentation

- [ ] Create `specs/005-dashboard-liquid-glass-2026/IMPLEMENTATION_NOTES.md`
- [ ] Update `docs/DESIGN_SYSTEM.md` with Liquid Glass 2026 tokens
- [ ] Update `README.md` with design badge
- [ ] Document any deviations from plan

### Monitoring

- [ ] Set up Sentry performance monitoring
- [ ] Track FPS metrics
- [ ] Monitor error rates
- [ ] User session replays

### Future Enhancements

- [ ] Document Phase 7 ideas (animated noise, parallax)
- [ ] Plan Phase 8 (component library extraction)

---

**Ready to begin implementation with `/speckit.implement`**
