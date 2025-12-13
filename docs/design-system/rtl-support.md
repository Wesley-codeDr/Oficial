# Right-to-Left (RTL) Support

> Implementation following [Apple Human Interface Guidelines - Right to Left](https://developer.apple.com/design/human-interface-guidelines/right-to-left)

## Overview

This document describes the RTL support implementation in WellWave, designed to support languages like Arabic, Hebrew, Persian, and Urdu while maintaining Apple's design principles.

## Key Principles

Following Apple HIG, our RTL implementation adheres to these principles:

1. **Text alignment adjusts to match interface direction**
2. **Controls flip to show progress in reading direction**
3. **Interface icons adapt based on semantic meaning**
4. **Numbers maintain their order (never reversed)**
5. **Paragraphs align based on their language, not context**

## Quick Start

### Enable RTL for Your App

RTL is automatically enabled based on the current language. The `DirectionProvider` detects RTL languages and sets the appropriate direction.

```tsx
// Already configured in components/providers/index.tsx
import { Providers } from '@/components/providers'

// For Arabic
<Providers defaultLanguage="ar">
  <App />
</Providers>

// For Hebrew
<Providers defaultLanguage="he">
  <App />
</Providers>
```

### Using the Direction Hook

```tsx
import { useDirection } from '@/lib/contexts/direction-context'

function MyComponent() {
  const { isRTL, direction, startSide, endSide } = useDirection()
  
  return (
    <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
      {/* Content automatically aligns based on direction */}
    </div>
  )
}
```

## Components

### DirectionalIcon

Use for icons that should flip in RTL contexts:

```tsx
import { DirectionalIcon } from '@/components/ui/rtl-index'
import { ArrowRight, ChevronLeft, Check } from 'lucide-react'

// Arrow that flips in RTL (directional)
<DirectionalIcon icon={ArrowRight} semantic="directional" />

// Back button that flips (navigation)
<DirectionalIcon icon={ChevronLeft} semantic="navigation" />

// Checkmark that never flips (static)
<DirectionalIcon icon={Check} semantic="static" />
```

**Icon Semantic Types:**

| Type | Description | Flips in RTL? |
|------|-------------|---------------|
| `directional` | Arrows, chevrons indicating movement | ✅ Yes |
| `navigation` | Back/forward navigation | ✅ Yes |
| `progress` | Progress indicators, ratings | ✅ Yes |
| `static` | Logos, checkmarks, universal signs | ❌ No |
| `text` | Text representation icons | ✅ Yes |
| `audio` | Speaker, volume icons | ✅ Yes |

### RTLProgress

Progress bars that fill in the reading direction:

```tsx
import { RTLProgress, RTLCircularProgress } from '@/components/ui/rtl-index'

// Linear progress
<RTLProgress value={75} variant="success" showLabel />

// Circular progress
<RTLCircularProgress value={60} />
```

### RTLRating

Star ratings with correct visual order in RTL:

```tsx
import { RTLRating, RatingDisplay } from '@/components/ui/rtl-index'

// Editable rating
<RTLRating 
  value={rating} 
  onChange={setRating} 
  editable 
  showLabels 
/>

// Read-only display
<RatingDisplay value={4.5} />
```

### RTLNumber

For numbers that should never reverse their digit order:

```tsx
import { 
  RTLNumber, 
  PhoneNumber, 
  CreditCardNumber, 
  OrderNumber 
} from '@/components/ui/rtl-index'

// Currency
<RTLNumber value={1234.56} format="currency" currency="BRL" />

// Phone number
<PhoneNumber value="11999887766" format />

// Credit card (masked)
<CreditCardNumber value="4111111111111111" masked />

// Order number
<OrderNumber value={123456} prefix="Pedido #" />
```

### RTLContainer

Containers that adapt to text direction:

```tsx
import { 
  RTLContainer, 
  LanguageText, 
  RTLList,
  RTLBreadcrumb 
} from '@/components/ui/rtl-index'

// Flex container that reverses in RTL
<RTLContainer reverseInRTL>
  <Icon />
  <Text />
</RTLContainer>

// Text with language-specific alignment
<LanguageText lang="ar" isParagraph>
  هذا نص عربي
</LanguageText>

// List with consistent alignment
<RTLList>
  <li>Item 1</li>
  <li>Item 2</li>
</RTLList>

// Breadcrumb with flipping separators
<RTLBreadcrumb>
  <a href="/">Home</a>
  <a href="/products">Products</a>
  <span>Details</span>
</RTLBreadcrumb>
```

## Tailwind CSS Utilities

### RTL/LTR Variants

```html
<!-- Apply styles only in RTL -->
<div class="text-left rtl:text-right">
  Content
</div>

<!-- Apply styles only in LTR -->
<div class="hidden ltr:block">
  LTR only content
</div>
```

### Logical Properties

Use logical properties instead of physical ones for automatic RTL support:

```html
<!-- Margin/Padding -->
<div class="ms-4 me-2 ps-6 pe-4">
  <!-- ms = margin-inline-start -->
  <!-- me = margin-inline-end -->
  <!-- ps = padding-inline-start -->
  <!-- pe = padding-inline-end -->
</div>

<!-- Positioning -->
<div class="start-0 end-auto">
  <!-- start = inset-inline-start -->
  <!-- end = inset-inline-end -->
</div>

<!-- Text alignment -->
<div class="text-start">
  Aligns to start (left in LTR, right in RTL)
</div>

<!-- Border radius -->
<div class="rounded-s-lg rounded-e-xl">
  <!-- s = start side -->
  <!-- e = end side -->
</div>
```

### Icon Classes

```html
<!-- Directional icon that flips -->
<span class="icon-directional">→</span>

<!-- Navigation icon that flips -->
<span class="icon-navigation">←</span>

<!-- Static icon that never flips -->
<span class="icon-static">✓</span>

<!-- Manual flip control -->
<span class="rtl-flip">→</span>
```

### Number Preservation

```html
<!-- Phone numbers, IDs, credit cards -->
<span class="number-preserve">+1 (555) 123-4567</span>

<!-- Unicode isolation for mixed content -->
<span class="number-isolate">Order #123456</span>
```

## CSS Custom Properties

```css
/* Safe areas (for notch/Dynamic Island) */
var(--safe-area-top)
var(--safe-area-right)
var(--safe-area-bottom)
var(--safe-area-left)

/* Layout margins */
var(--layout-margin-compact)    /* 16px */
var(--layout-margin-regular)    /* 20px */
var(--layout-margin-wide)       /* 24px */
```

## Best Practices

### 1. Use Logical Properties

❌ Don't use physical properties:
```css
.element {
  margin-left: 16px;
  padding-right: 8px;
  left: 0;
}
```

✅ Use logical properties:
```css
.element {
  margin-inline-start: 16px;
  padding-inline-end: 8px;
  inset-inline-start: 0;
}
```

### 2. Handle Icons Correctly

❌ Don't flip all icons:
```tsx
// Wrong - checkmarks shouldn't flip
<Check className="rtl:scale-x-[-1]" />
```

✅ Use semantic icon types:
```tsx
// Correct - semantic determines flip
<DirectionalIcon icon={Check} semantic="static" />
<DirectionalIcon icon={ArrowRight} semantic="directional" />
```

### 3. Preserve Number Order

❌ Don't let numbers reverse:
```html
<!-- Numbers could incorrectly reverse -->
<div>Order: 12345</div>
```

✅ Use number-preserve class:
```html
<div>Order: <span class="number-preserve">12345</span></div>
```

### 4. Handle Paragraphs by Language

❌ Don't force context alignment on paragraphs:
```tsx
// Wrong for multi-language content
<p className="text-right">
  English paragraph that should be left-aligned
</p>
```

✅ Align paragraphs by their language:
```tsx
<LanguageText lang="en" isParagraph>
  English paragraph - automatically left-aligned
</LanguageText>

<LanguageText lang="ar" isParagraph>
  نص عربي - automatically right-aligned
</LanguageText>
```

### 5. Flip Progress Controls

Progress should move in reading direction:

```tsx
// Progress bar fills left-to-right in LTR
// and right-to-left in RTL automatically
<RTLProgress value={75} />
```

## Testing RTL

### Toggle Direction Manually

```tsx
import { useDirection } from '@/lib/contexts/direction-context'

function DebugToggle() {
  const { direction, toggleDirection } = useDirection()
  
  return (
    <button onClick={toggleDirection}>
      Current: {direction} (Click to toggle)
    </button>
  )
}
```

### Force RTL for Testing

```tsx
<DirectionProvider forceDirection="rtl">
  <App />
</DirectionProvider>
```

### Browser DevTools

1. Open DevTools → Elements
2. Find `<html>` element
3. Change `dir="ltr"` to `dir="rtl"`
4. Verify layout adapts correctly

## Supported RTL Languages

The system automatically detects these RTL language codes:

| Code | Language |
|------|----------|
| `ar` | Arabic |
| `he` | Hebrew |
| `fa` | Persian (Farsi) |
| `ur` | Urdu |
| `yi` | Yiddish |
| `ps` | Pashto |
| `sd` | Sindhi |
| `ckb` | Central Kurdish |
| `ug` | Uyghur |

## Typography Balancing

Apple HIG recommends increasing Arabic/Hebrew font size by ~2pt when next to uppercase Latin text:

```css
/* Applied automatically via .text-balanced-rtl */
[lang="ar"] .text-balanced-rtl,
[lang="he"] .text-balanced-rtl {
  font-size: calc(1em + 2px);
}
```

## References

- [Apple HIG - Right to Left](https://developer.apple.com/design/human-interface-guidelines/right-to-left)
- [MDN - CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- [Unicode Bidirectional Algorithm](https://www.w3.org/International/articles/inline-bidi-markup/)



