# Requirements Document

## Apple Liquid Glass 2026 Design System Implementation for WellWave

**Version:** 1.0
**Date:** 2026-01-24
**Feature:** liquid-glass-2026
**Status:** Draft

---

## Introduction

This document defines the requirements for implementing Apple's Liquid Glass 2026 design system in the WellWave medical anamnesis application. Liquid Glass is Apple's new translucent material design language introduced at WWDC 2025, featuring dynamic glass-like surfaces that reflect and refract their surroundings while transforming fluidly to bring focus to content.

WellWave already has a partial implementation of glass morphism effects. This feature will standardize and complete the implementation to achieve visual parity with Apple's iOS 26/macOS Tahoe 26 design specifications, while maintaining medical compliance, accessibility, and performance requirements critical for emergency healthcare environments.

### Objectives

1. Achieve visual consistency with Apple Liquid Glass 2026 design language
2. Unify existing glass components under a single design token system
3. Maintain WCAG 2.1 AA accessibility compliance for medical professionals
4. Ensure performance remains optimal for high-pressure emergency scenarios
5. Preserve all existing medical compliance (CFM/LGPD) requirements

---

## Requirements

### Requirement 1: Design Token System Unification

**User Story:** As a developer, I want a unified design token system for Liquid Glass effects, so that I can ensure visual consistency across all components without duplicating style definitions.

#### Acceptance Criteria

1. WHEN the application loads THEN the system SHALL provide CSS custom properties for all Liquid Glass specifications including blur values, opacity ranges, border radii, and shadow definitions.

2. WHEN a component uses Liquid Glass styling THEN it SHALL reference design tokens from a single source of truth (`lib/design-system/glass-tokens.ts` and `app/liquid-glass-2026.css`).

3. IF multiple glass token files exist (liquidGlassColors.ts, glass-tokens.ts) THEN the system SHALL consolidate them into a unified token structure.

4. WHEN tokens are updated THEN all components using those tokens SHALL automatically reflect the changes without manual modifications.

5. WHEN the system initializes THEN it SHALL define the following token categories:
   - Blur values (40px standard, range 40-120px)
   - Background opacity (0.15-0.38 range by variant)
   - Border opacity (0.25-0.50 range by variant)
   - Border radius (8px-40px based on component size)
   - Shadow definitions (multi-layer with inset highlights)
   - Animation durations and easing curves
   - Color palette (Apple 2026 system colors)

---

### Requirement 2: Material Variants Implementation

**User Story:** As a designer, I want consistent material variants (Regular, Clear, Elevated, Subtle) across all glass components, so that I can apply appropriate visual weight based on context.

#### Acceptance Criteria

1. WHEN rendering a glass component THEN the system SHALL support four material variants:
   - **Regular**: For most UI components (blur: 40-60px, bg-opacity: 0.22-0.28)
   - **Clear**: For components over photos/videos/rich backgrounds (blur: 40px, bg-opacity: 0.12-0.18)
   - **Elevated**: For modals, floating panels, high z-index elements (blur: 40px, bg-opacity: 0.32-0.38)
   - **Subtle**: For low-emphasis backgrounds (blur: 40px, bg-opacity: 0.15-0.20)

2. WHEN a variant is applied THEN it SHALL include appropriate:
   - Backdrop filter (blur and saturate)
   - Background gradient (linear, 135deg angle)
   - Border with white/opacity
   - Multi-layer box shadows with inset highlights

3. IF the component is in dark mode THEN the variant SHALL adjust opacity and color values according to dark mode specifications (darker base colors, reduced border opacity, adjusted shadow intensity).

4. WHEN switching between light and dark modes THEN transitions SHALL animate smoothly using the system easing curve (cubic-bezier(0.25, 1, 0.5, 1)).

---

### Requirement 3: Specular Highlight and Rim Light Effects

**User Story:** As a user, I want glass components to display realistic light reflections, so that the interface feels premium and alive like real glass.

#### Acceptance Criteria

1. WHEN a glass component with specular enabled renders THEN it SHALL display a radial gradient highlight at the top portion simulating light reflection from above.

2. WHEN specular highlight is active THEN it SHALL:
   - Cover approximately 50-55% of the component height from the top
   - Use a radial gradient from white/0.8 at center-top fading to transparent
   - Animate subtly with an 8-second shimmer cycle (prefers-reduced-motion: respect)

3. WHEN rim light is enabled THEN the component SHALL display a conic gradient border effect simulating light hitting the glass edge.

4. WHEN rim light renders THEN it SHALL:
   - Use a conic gradient starting from 45deg
   - Vary opacity around the perimeter (1.0 at highlights, 0.15 at shadows)
   - Apply a 0.5px blur for softness
   - Use CSS mask for proper border rendering

5. IF the user has prefers-reduced-motion enabled THEN specular animations SHALL be disabled while static effects remain.

---

### Requirement 4: Component Library Updates

**User Story:** As a developer, I want all UI components updated to use the Liquid Glass 2026 design system, so that the entire application has a consistent visual language.

#### Acceptance Criteria

1. WHEN updating existing glass components THEN the following SHALL be updated:
   - GlassCard (components/ui/glass-card.tsx)
   - GlassButton (components/ui/glass-button.tsx)
   - GlassInput (components/ui/glass-input.tsx)
   - GlassCheckbox (components/ui/glass-checkbox.tsx)
   - GlassSelect (components/ui/glass-select.tsx)
   - GlassSheet (components/ui/glass-sheet.tsx)
   - GlassDialog (components/ui/glass-dialog.tsx)
   - GlassModal (components/ui/glass-modal.tsx)
   - GlassBadge (components/ui/glass-badge.tsx)
   - GlassSlider (components/ui/glass-slider.tsx)
   - GlassNotification (components/ui/glass-notification.tsx)

2. WHEN a component is updated THEN it SHALL:
   - Use design tokens exclusively (no hardcoded values)
   - Support all four material variants
   - Include optional specular and rim light effects
   - Maintain backward compatibility with existing props
   - Include healthcare-specific semantic variants where applicable

3. IF a component does not have a glass variant THEN the system SHALL create one for:
   - Tooltip
   - Accordion
   - Progress indicators
   - Navigation elements (Sidebar, Header, TabBar)

4. WHEN components are in healthcare context THEN they SHALL support semantic color variants:
   - healthcare-primary (blue - trust, clinical)
   - healthcare-success (green - positive outcomes)
   - healthcare-warning (orange - attention needed)
   - healthcare-critical (red - urgent/emergency)
   - healthcare-info (teal - informational)

---

### Requirement 5: Typography System Alignment

**User Story:** As a user, I want text to be crisp and legible against glass backgrounds, so that I can read medical information quickly and accurately in emergency situations.

#### Acceptance Criteria

1. WHEN text renders on glass components THEN the typography system SHALL use:
   - Font family: SF Pro Display/Text (with system font fallbacks)
   - Appropriate font weights (100 ultralight to 800 heavy)
   - Tight letter spacing for headlines (-0.04em to -0.06em)
   - Normal letter spacing for body text (0)

2. WHEN displaying headlines THEN the system SHALL:
   - Use SF Pro Display
   - Apply ultralight (100) to regular (400) weights for large display text
   - Apply semibold (600) to bold (700) for action items

3. WHEN displaying body text on glass THEN the system SHALL:
   - Ensure minimum contrast ratio of 4.5:1 (WCAG AA)
   - Use text shadow or backdrop for improved legibility if needed
   - Adjust color opacity in dark mode for proper contrast

4. IF text contrast falls below WCAG AA standards THEN the system SHALL automatically apply a subtle text shadow or background overlay to improve legibility.

---

### Requirement 6: Animation and Micro-Interactions

**User Story:** As a user, I want smooth, responsive animations that provide visual feedback, so that the interface feels alive and confirms my actions.

#### Acceptance Criteria

1. WHEN elements enter the viewport THEN they SHALL animate with a stagger fade-in effect:
   - Duration: 600ms
   - Easing: cubic-bezier(0.34, 1.56, 0.64, 1) (spring)
   - Delay: 100ms increment per child element

2. WHEN users interact with buttons THEN haptic feedback visual SHALL:
   - Scale down to 0.95-0.97 on press (100-200ms)
   - Spring back to 1.0 on release
   - Provide three intensity levels: light, medium, heavy

3. WHEN hovering over interactive glass elements THEN:
   - Scale SHALL increase to 1.02-1.05
   - Shadow SHALL expand and intensify
   - A shimmer effect MAY play across the surface
   - Transition duration: 200-300ms

4. WHEN scrolling content behind glass navigation THEN:
   - Tab bars/headers SHALL shrink to compact mode
   - Blur intensity MAY increase slightly
   - Labels MAY fade to icon-only mode
   - Expansion SHALL occur on scroll-up

5. IF prefers-reduced-motion is enabled THEN:
   - All animations SHALL be disabled or reduced to simple fades
   - Transitions SHALL be instant or very fast (100ms max)
   - Shimmer and caustic effects SHALL be disabled

---

### Requirement 7: Scroll-Responsive Glass Behavior

**User Story:** As a user, I want navigation elements to adapt as I scroll, so that I have maximum screen space for content while keeping navigation accessible.

#### Acceptance Criteria

1. WHEN the user scrolls down past a threshold (50-100px) THEN glass headers SHALL:
   - Shrink from expanded (64px) to collapsed (48px) height
   - Reduce padding from 16px to 8px
   - Transition over 200ms with Apple easing

2. WHEN the user scrolls back up THEN glass headers SHALL:
   - Expand fluidly back to full size
   - Restore all original padding and sizing
   - Animate with the same 200ms duration

3. WHEN tab bars are present THEN they SHALL:
   - Shrink icon size from 24px to 20px on scroll
   - Fade out labels (opacity 1 to 0)
   - Reduce bar height from 56px to 44px

4. WHILE glass elements are in collapsed state THEN they SHALL maintain full functionality and tap targets (minimum 44x44px).

5. WHEN scroll edge is reached THEN the glass element MAY display a subtle edge blur gradient to indicate scroll boundaries.

---

### Requirement 8: Dark Mode Support

**User Story:** As a user working in low-light emergency rooms, I want a dark mode that reduces eye strain while maintaining the glass aesthetic, so that I can work comfortably during night shifts.

#### Acceptance Criteria

1. WHEN dark mode is active THEN glass backgrounds SHALL:
   - Use slate-based colors (rgba(30, 41, 59, opacity))
   - Increase background opacity by 10-20% for better contrast
   - Reduce border opacity by 30-40%
   - Darken shadows significantly (opacity 0.35-0.5)

2. WHEN dark mode transitions occur THEN:
   - All glass elements SHALL animate smoothly (300-500ms)
   - Colors SHALL not flash or jump
   - Specular highlights SHALL reduce intensity (opacity 0.25-0.4)

3. IF the system detects prefers-color-scheme: dark THEN the application SHALL automatically switch to dark mode (unless overridden by user preference).

4. WHEN in dark mode THEN rim light effects SHALL:
   - Reduce opacity to 40-50% of light mode values
   - Maintain visible edge definition
   - Use warmer white tones if applicable

---

### Requirement 9: Accessibility Compliance

**User Story:** As a medical professional with visual impairments or motor disabilities, I want the interface to remain fully accessible despite the glass effects, so that I can provide patient care without barriers.

#### Acceptance Criteria

1. WHEN prefers-reduced-transparency is enabled THEN:
   - Backdrop blur SHALL be disabled
   - Background SHALL use solid colors matching the theme
   - All specular, rim light, and caustic effects SHALL be hidden
   - Borders SHALL use solid, visible colors

2. WHEN prefers-contrast: more is enabled THEN:
   - Glass backgrounds SHALL become opaque or near-opaque
   - Borders SHALL use high-contrast colors (2px solid)
   - Text colors SHALL be full opacity (no transparency)
   - Focus indicators SHALL be highly visible

3. WHEN users navigate via keyboard THEN:
   - Focus rings SHALL be clearly visible (3px outline with offset)
   - Focus SHALL follow logical tab order
   - Glass effects SHALL not obscure focus indicators

4. IF a browser does not support backdrop-filter THEN:
   - Fallback solid backgrounds SHALL be provided
   - Visual hierarchy SHALL be maintained
   - No functionality SHALL be lost

5. WHEN screen readers are in use THEN:
   - All glass components SHALL have appropriate ARIA labels
   - Decorative glass effects SHALL be hidden from AT (aria-hidden)
   - Interactive elements SHALL announce state changes

---

### Requirement 10: Performance Optimization

**User Story:** As a developer, I want glass effects to perform smoothly on all target devices, so that the application remains responsive in time-critical emergency scenarios.

#### Acceptance Criteria

1. WHEN rendering glass components THEN the system SHALL:
   - Use GPU acceleration (transform: translateZ(0))
   - Apply CSS containment (contain: layout style paint)
   - Limit will-change usage to animated elements only
   - Avoid layout thrashing from frequent reflows

2. WHEN animating glass elements THEN:
   - Only opacity and transform properties SHALL animate
   - Backdrop-filter SHALL NOT animate (static values only)
   - Batch DOM updates using requestAnimationFrame

3. IF performance drops below 60fps THEN:
   - The system SHOULD reduce blur intensity automatically
   - Complex effects (caustics, shimmer) SHOULD be disabled
   - A performance mode toggle MAY be provided

4. WHEN measuring performance THEN the application SHALL:
   - Maintain Lighthouse Performance score >= 70
   - Keep First Contentful Paint < 2 seconds
   - Keep Total Blocking Time < 300ms
   - Keep Cumulative Layout Shift < 0.1

5. WHILE on mobile or low-power devices THEN:
   - Blur values MAY be reduced (40px to 20px)
   - Shadow layers MAY be simplified
   - Animation durations SHOULD be shortened

---

### Requirement 11: Background and Gradient System

**User Story:** As a designer, I want consistent background gradients that complement the glass components, so that the overall visual composition feels cohesive and premium.

#### Acceptance Criteria

1. WHEN rendering page backgrounds THEN the system SHALL support:
   - Light mode gradient: #F5F9FF to #C8DDFD (vertical)
   - Dark mode gradient: #0F172A to #1E4976 (vertical)
   - Animated gradient blobs for visual interest

2. WHEN animated background blobs are enabled THEN:
   - They SHALL use radial gradients with soft edges
   - Colors SHALL match the Apple 2026 palette (blue, teal, purple)
   - Animation SHALL be slow (10-15 second cycles)
   - Position SHALL shift subtly to create depth

3. IF the system detects reduced motion preference THEN animated blobs SHALL:
   - Remain static or disabled
   - Maintain visual interest through color variation

4. WHEN backgrounds render behind glass THEN they SHALL:
   - Provide sufficient color variation for blur effects
   - Not conflict with text legibility
   - Support the overall information hierarchy

---

### Requirement 12: Healthcare-Specific Adaptations

**User Story:** As a medical professional, I want the design to prioritize critical information visibility, so that I can quickly identify urgent patient needs.

#### Acceptance Criteria

1. WHEN displaying critical medical alerts THEN they SHALL:
   - Use healthcare-critical color variant (red/FF3B30)
   - Have increased opacity for higher prominence
   - Include appropriate iconography and animation
   - Never be obscured by glass blur effects

2. WHEN red flag warnings appear THEN:
   - Glass effects SHALL NOT reduce their visibility
   - Contrast ratio SHALL exceed 7:1 (WCAG AAA)
   - Position SHALL be above all glass overlays

3. IF emergency mode is activated THEN:
   - Glass effects MAY be reduced or disabled
   - High contrast mode SHOULD be automatically applied
   - Critical controls SHALL remain fully visible

4. WHEN displaying patient information THEN:
   - Text legibility SHALL be prioritized over aesthetics
   - Form inputs SHALL have clear visual boundaries
   - Error states SHALL be immediately apparent

5. WHILE in anamnese form entry THEN:
   - Glass effects SHALL be subtle to avoid distraction
   - Focus indicators SHALL be prominent
   - Required fields SHALL be clearly marked

---

## Non-Functional Requirements

### NFR-1: Browser Compatibility

1. WHEN the application loads THEN it SHALL support:
   - Safari 15+ (full support)
   - Chrome 100+ (full support)
   - Firefox 100+ (partial support with fallbacks)
   - Edge 100+ (full support)

2. IF backdrop-filter is not supported THEN graceful fallbacks SHALL be provided.

### NFR-2: Performance Targets

1. WHEN measuring Core Web Vitals THEN:
   - LCP SHALL be < 2.5 seconds
   - FID SHALL be < 100ms
   - CLS SHALL be < 0.1
   - INP SHALL be < 200ms

### NFR-3: Bundle Size

1. WHEN adding new CSS THEN the liquid-glass-2026.css file SHALL NOT exceed 30KB (gzipped).
2. WHEN adding new JS for animations THEN the additional bundle size SHALL NOT exceed 10KB (gzipped).

### NFR-4: Medical Compliance

1. WHILE implementing visual changes THEN all existing CFM compliance requirements SHALL be maintained.
2. WHEN displaying patient data THEN LGPD requirements SHALL be respected.

---

## Design Specifications

### Color Palette (Apple 2026 System Colors)

| Color | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| Blue Primary | #007AFF | #0A84FF | Primary actions, links |
| Green Success | #34C759 | #30D158 | Success states, positive outcomes |
| Red Critical | #FF3B30 | #FF453A | Errors, critical alerts |
| Orange Warning | #FF9500 | #FF9F0A | Warnings, attention needed |
| Teal Info | #5AC8FA | #64D2FF | Informational elements |
| Purple | #AF52DE | #BF5AF2 | AI/Intelligence features |

### Blur and Opacity Ranges

| Variant | Blur | Background Opacity (Light) | Background Opacity (Dark) | Border Opacity |
|---------|------|---------------------------|---------------------------|----------------|
| Regular | 40-60px | 0.22-0.28 | 0.28-0.35 | 0.30-0.40 |
| Clear | 40px | 0.12-0.18 | 0.18-0.22 | 0.25-0.30 |
| Elevated | 40px | 0.32-0.38 | 0.38-0.45 | 0.40-0.50 |
| Subtle | 40px | 0.15-0.20 | 0.20-0.25 | 0.20-0.28 |

### Border Radius Scale

| Size | Radius | Usage |
|------|--------|-------|
| xs | 8px | Small pills, badges |
| sm | 12px | Buttons, inputs, small cards |
| md | 16px | Medium cards, dialogs |
| lg | 24px | Large cards, panels |
| xl | 32px | Modals, full sheets |
| 2xl | 40px | Hero elements |
| full | 9999px | Circular elements |

### Shadow System

```css
/* Base shadow */
0 8px 32px rgba(0, 0, 0, 0.1),
inset 0 1px 1px rgba(255, 255, 255, 0.2)

/* Elevated shadow */
0 20px 60px -15px rgba(0, 0, 0, 0.15),
0 8px 24px -8px rgba(0, 0, 0, 0.08),
inset 0 0 0 1px rgba(255, 255, 255, 0.6),
inset 0 2px 0 rgba(255, 255, 255, 0.8)
```

### Animation Curves

| Name | Curve | Duration | Usage |
|------|-------|----------|-------|
| Apple Ease Out | cubic-bezier(0.25, 1, 0.5, 1) | 200-300ms | Default transitions |
| Apple Spring | cubic-bezier(0.34, 1.56, 0.64, 1) | 400-600ms | Entry animations |
| Apple Ease In | cubic-bezier(0.42, 0, 1, 1) | 150-200ms | Exit animations |

---

## Constraints and Dependencies

### Dependencies

1. **Existing CSS Framework**: Tailwind CSS 4.x
2. **Animation Library**: Framer Motion
3. **Component Base**: Radix UI primitives
4. **Font System**: SF Pro family (with system fallbacks)

### Constraints

1. Must maintain backward compatibility with existing component props
2. Must not break existing medical compliance features
3. Must work without JavaScript for basic rendering (progressive enhancement)
4. Must respect user accessibility preferences (system settings)
5. Must maintain existing test coverage

### Risks

1. Performance impact on low-end devices - mitigated by performance mode
2. Browser compatibility issues - mitigated by feature detection and fallbacks
3. Accessibility concerns - mitigated by comprehensive a11y testing

---

## Out of Scope

The following items are explicitly excluded from this feature:

1. Native iOS/macOS development (this is web-only)
2. 3D transformations or WebGL effects
3. AR/VR adaptations
4. Offline-first PWA features
5. Complete redesign of medical workflows
6. Changes to backend API or data structures
7. New feature functionality (visual changes only)
8. Redesign of icons or logo assets
9. Changes to authentication flows
10. Multi-language typography adjustments

---

## Acceptance Criteria Summary

The feature is considered complete when:

1. All glass components use unified design tokens
2. Four material variants are consistently implemented
3. Specular and rim light effects work correctly
4. All animations respect prefers-reduced-motion
5. Dark mode is fully supported with proper transitions
6. WCAG 2.1 AA compliance is verified
7. Performance targets are met (Lighthouse >= 70)
8. All existing tests pass
9. Medical compliance features remain functional
10. Cross-browser testing passes (Safari, Chrome, Firefox, Edge)

---

## References

- [Apple Newsroom: Liquid Glass Announcement](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)
- [Apple Human Interface Guidelines - Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- [WWDC 2025 Session: Build a SwiftUI app with the new design](https://developer.apple.com/videos/play/wwdc2025/323/)
- [Apple Design Resources](https://developer.apple.com/design/resources/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
