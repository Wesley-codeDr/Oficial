# Liquid Glass 2026 — Quick Reference Card

> **Copy-paste ready snippets for all AI assistants**

---

## Essential Values

```
Blur:        40px (universal)
Saturate:    180%
Transition:  280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
Fast:        180ms (hovers)
```

## Radius Hierarchy

```
Container/Card:  24px  →  rounded-glass-lg
Item:            16px  →  rounded-glass-md
Pill/Badge:      14px  →  rounded-glass-sm
Button:          9999px → rounded-full
```

## Color Tokens (USE THESE, NOT HEX)

```css
/* Text */
text-text-primary       /* Main text */
text-text-secondary     /* Descriptions */
text-text-muted         /* Placeholders */

/* Surfaces */
bg-surface-card         /* Cards */
bg-surface-subtle       /* Inputs */
bg-surface-elevated     /* Modals */

/* Actions */
bg-action-primary       /* Primary button */
bg-action-secondary     /* Secondary button */
bg-action-strong        /* CTA */

/* Status */
text-status-success / bg-status-success
text-status-warning / bg-status-warning
text-status-error / bg-status-error

/* Borders */
border-border-default   /* Standard */
border-border-subtle    /* Glass edges */
border-border-focus     /* Focus ring */
```

---

## Ready-to-Use Classes

### Glass Card

```tsx
className="
  bg-surface-card backdrop-blur-[40px] saturate-[180%]
  border border-border-subtle
  rounded-glass-lg p-6
  shadow-card
  hover:shadow-card-hover hover:-translate-y-0.5
  transition-all duration-[280ms] ease-out
"
```

### Primary Button

```tsx
className="
  bg-action-primary text-white font-semibold
  py-3 px-6 rounded-full
  shadow-button-primary backdrop-blur-[20px]
  hover:bg-action-primary-hover hover:scale-[1.02]
  active:scale-[0.98]
  focus:ring-4 focus:ring-border-focus focus:outline-none
  transition-all duration-[280ms] ease-out
"
```

### Secondary Button

```tsx
className="
  bg-action-secondary text-text-primary font-medium
  py-3 px-6 rounded-full
  border border-border-default backdrop-blur-[20px]
  hover:bg-white/65
  active:scale-[0.98]
  transition-all duration-[280ms] ease-out
"
```

### Input Field

```tsx
className="
  w-full bg-surface-subtle backdrop-blur-[20px]
  border border-border-default rounded-glass-sm
  py-3 px-4
  text-text-primary placeholder:text-text-muted
  focus:border-border-focus focus:ring-4 focus:ring-border-focus/20
  focus:outline-none
  transition-all duration-[180ms]
"
```

### Modal Container

```tsx
className="
  bg-surface-elevated backdrop-blur-[60px] saturate-[180%]
  border border-border-subtle
  rounded-glass-xl
  shadow-lg overflow-hidden
"
```

### Badge (Success)

```tsx
className="
  inline-flex items-center
  bg-status-success/15 text-status-success
  text-xs font-medium
  px-3 py-1 rounded-full
"
```

### Badge (Warning)

```tsx
className="
  inline-flex items-center
  bg-status-warning/15 text-status-warning
  text-xs font-medium
  px-3 py-1 rounded-full
"
```

### Badge (Error)

```tsx
className="
  inline-flex items-center
  bg-status-error/15 text-status-error
  text-xs font-medium
  px-3 py-1 rounded-full
"
```

### List Container

```tsx
className="
  bg-surface-card backdrop-blur-[40px] saturate-[180%]
  border border-border-subtle
  rounded-glass-lg
  divide-y divide-border-subtle
"
```

### List Row

```tsx
className="
  flex items-center gap-3 p-4
  hover:bg-surface-subtle
  transition-colors duration-[180ms]
"
```

### Icon Container

```tsx
className="
  w-10 h-10
  bg-action-primary/15
  rounded-glass-sm
  flex items-center justify-center
"
```

---

## Charts — REQUIRED Patterns

### Chart Container

```tsx
<div className="
  bg-surface-card backdrop-blur-[40px] saturate-[180%]
  border border-border-subtle
  rounded-glass-lg p-6
  shadow-card
">
  <h3 className="text-lg font-semibold text-text-primary mb-4">Title</h3>
  <div className="h-64">
    {/* Chart here */}
  </div>
</div>
```

### Chart Colors

```typescript
const CHART_COLORS = {
  primary: '#007AFF',
  secondary: '#34C759',
  tertiary: '#FF9500',
  quaternary: '#5AC8FA',
  quinary: '#AF52DE',
  senary: '#FF2D55',
};
```

### Bar Chart

```tsx
<Bar
  dataKey="value"
  fill="rgba(0, 122, 255, 0.7)"
  stroke="#007AFF"
  strokeWidth={1}
  radius={[8, 8, 0, 0]}
/>
```

### Line Chart

```tsx
<Line
  type="monotone"
  dataKey="value"
  stroke="#007AFF"
  strokeWidth={2}
  dot={false}
  activeDot={{ r: 6, fill: '#007AFF', stroke: '#FFF', strokeWidth: 2 }}
/>
```

### Glass Tooltip

```tsx
const GlassTooltip = ({ active, payload, label }) => {
  if (!active) return null;
  return (
    <div className="
      bg-surface-elevated backdrop-blur-[40px] saturate-[180%]
      border border-border-subtle
      rounded-glass-sm p-3 shadow-lg
    ">
      <p className="text-sm font-medium text-text-primary">{label}</p>
      {payload?.map((item, i) => (
        <p key={i} className="text-sm text-text-secondary">
          {item.name}: {item.value}
        </p>
      ))}
    </div>
  );
};
```

### Axis Styling

```tsx
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
/>
<CartesianGrid
  strokeDasharray="3 3"
  stroke="var(--border-subtle)"
  vertical={false}
/>
```

---

## AI Chat — REQUIRED Patterns

### User Message

```tsx
<div className="flex justify-end">
  <div className="
    max-w-[80%]
    bg-action-primary text-white
    rounded-glass-lg rounded-br-glass-sm
    px-4 py-3 shadow-sm
  ">
    {message}
  </div>
</div>
```

### AI Message

```tsx
<div className="flex gap-3 max-w-[85%]">
  <div className="w-8 h-8 bg-surface-card rounded-full flex items-center justify-center">
    <BotIcon className="w-4 h-4 text-action-primary" />
  </div>
  <div className="
    bg-surface-card backdrop-blur-[40px] saturate-[180%]
    border border-border-subtle
    rounded-glass-lg rounded-tl-glass-sm
    px-4 py-3 shadow-card
  ">
    {message}
  </div>
</div>
```

### Chat Input

```tsx
<div className="flex gap-2">
  <input className="
    flex-1 bg-surface-subtle backdrop-blur-[20px]
    border border-border-default rounded-full
    py-3 px-4
    text-text-primary placeholder:text-text-muted
    focus:border-border-focus focus:ring-4 focus:ring-border-focus/20
    focus:outline-none
  " />
  <button className="
    w-12 h-12 bg-action-primary rounded-full
    flex items-center justify-center
    text-white shadow-button-primary
    hover:scale-[1.05] active:scale-[0.95]
    transition-all duration-[180ms]
  ">
    <SendIcon />
  </button>
</div>
```

---

## Healthcare — REQUIRED Patterns

### Alert Critical

```tsx
<div className="
  bg-status-error/10 border border-status-error/30
  rounded-glass-md p-4
  flex items-center gap-3
">
  <AlertCircle className="w-5 h-5 text-status-error" />
  <p className="text-sm text-status-error">{message}</p>
</div>
```

### Alert Warning

```tsx
<div className="
  bg-status-warning/10 border border-status-warning/30
  rounded-glass-md p-4
  flex items-center gap-3
">
  <AlertTriangle className="w-5 h-5 text-status-warning" />
  <p className="text-sm text-status-warning">{message}</p>
</div>
```

### Patient Card

```tsx
<div className="
  bg-surface-card backdrop-blur-[40px] saturate-[180%]
  border border-border-subtle
  rounded-glass-md p-4
  hover:shadow-card-hover hover:-translate-y-0.5
  transition-all duration-[280ms]
">
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 bg-action-primary/10 rounded-full" />
    <div className="flex-1">
      <h4 className="font-semibold text-text-primary">{name}</h4>
      <p className="text-sm text-text-secondary">{condition}</p>
    </div>
    <StatusBadge status={status} />
  </div>
</div>
```

---

## Framer Motion Springs

```typescript
const springs = {
  default: { type: 'spring', stiffness: 350, damping: 32 },
  glass: { type: 'spring', stiffness: 300, damping: 30, mass: 1.1 },
  soft: { type: 'spring', stiffness: 200, damping: 28 },
  haptic: { type: 'spring', stiffness: 600, damping: 40, mass: 0.7 },
};
```

---

## DO NOT

```
❌ Hardcode colors (#007AFF) → use tokens (action-primary)
❌ Use arbitrary radius (rounded-xl) → use hierarchy (rounded-glass-lg)
❌ Skip dark mode support
❌ Use linear transitions → use ease curves
❌ Forget focus states
❌ Use opaque backgrounds on cards → use glass
```

---

*Full documentation: `.ai/skills/LIQUID_GLASS_DESIGN_SYSTEM.md`*
