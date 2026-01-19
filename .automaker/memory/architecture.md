---
tags: [architecture]
summary: architecture implementation decisions and patterns
relevantTo: [architecture]
importance: 0.7
relatedFiles: []
usageStats:
  loaded: 14
  referenced: 12
  successfulFeatures: 12
---
# architecture

#### [Pattern] Separate GlassModal/GlassDialog components wrapping Radix primitives rather than adding glass variants to existing Dialog component (2026-01-17)
- **Problem solved:** Need glassmorphism modals/dialogs while preserving existing non-glass dialogs
- **Why this works:** Radix Dialog primitives provide accessibility (focus trap, aria, keyboard nav) while wrapper components add visual treatment without polluting base component with conditional logic
- **Trade-offs:** Easier: clean separation, can iterate glass design independently. Harder: two components to maintain, possible divergence in behavior

### Separate glass-modal, glass-dialog, and sheet components rather than one generic glass-overlay component (2026-01-17)
- **Context:** Creating modal/dialog system with glassmorphism design
- **Why:** Each has distinct UX semantics: modal=blocking/critical, dialog=conversational/forms, sheet=contextual/panels. Specialized components encode correct accessibility patterns
- **Rejected:** Single generic glass-overlay with mode prop - would require complex conditional logic for ARIA roles, focus management, and animations
- **Trade-offs:** More files to maintain but each component is simpler and has correct semantic HTML/ARIA by default
- **Breaking if changed:** Merging into one component would require consumers to correctly configure accessibility for each use case

### Separated useParallax and useScrollGlass as distinct hooks rather than unified scroll handler (2026-01-17)
- **Context:** Both hooks respond to scroll events but serve different purposes - parallax for content depth, scroll-glass for navbar transparency
- **Why:** Single responsibility allows using them independently. Navbar glass effect needed even when page has no parallax content
- **Rejected:** Combined useScrollEffects hook - became complex with many config options, harder to tree-shake
- **Trade-offs:** Two scroll listeners instead of one (minor perf impact). Cleaner API and better composability
- **Breaking if changed:** Combining them creates unwanted coupling - pages without parallax still import parallax logic

### Design tokens split into TypeScript constants (glass-tokens.ts) AND CSS custom properties with duplication (2026-01-17)
- **Context:** Need both compile-time type-safety for component props AND runtime CSS theming
- **Why:** TypeScript tokens provide autocomplete and prevent typos in component code; CSS variables enable media query overrides and runtime theme switching
- **Rejected:** Single source of truth (either TS-only losing CSS flexibility, or CSS-only losing type-safety)
- **Trade-offs:** Manual sync required between TS and CSS tokens, but caught by visual regression testing
- **Breaking if changed:** Removing TS tokens loses IDE autocomplete; removing CSS variables breaks accessibility fallbacks

### Created separate micro-interactions.ts with haptic feedback variants (light/medium/heavy/success/error) as animation presets (2026-01-17)
- **Context:** Medical UI needs consistent, immediate feedback for actions - button press, form submit, error states
- **Why:** Standardized haptic variants ensure consistent feedback language across 21+ glass components; medical users learn one feedback pattern
- **Rejected:** Per-component animation definitions (inconsistent feedback, harder to maintain, no semantic meaning)
- **Trade-offs:** Additional abstraction layer, but enables global haptic intensity adjustment for accessibility
- **Breaking if changed:** Removing haptic presets would make feedback inconsistent across components, confusing users in high-stress situations

### Separate design tokens into distinct files by concern: glass-tokens.ts (visual properties), animation-tokens.ts (physics presets), micro-interactions.ts (behavioral animations) (2026-01-17)
- **Context:** Building a comprehensive design system with 13+ glass components needing consistent styling and animations
- **Why:** Enables independent evolution of visual properties vs motion physics vs interaction behaviors without cross-contamination
- **Rejected:** Single monolithic tokens file - rejected because changes to animation physics would risk breaking visual properties during refactoring
- **Trade-offs:** More files to maintain but safer incremental updates; import paths more explicit but verbosity increases
- **Breaking if changed:** Merging files would create coupling that makes A/B testing animation variants difficult without affecting core glass materials

#### [Pattern] Provide dedicated test page (/test-glass) demonstrating all design system components with accessibility features (2026-01-17)
- **Problem solved:** 13+ glass components with complex interactions need visual verification beyond unit tests
- **Why this works:** Enables rapid visual QA, serves as living documentation, and proves accessibility compliance in real browser context
- **Trade-offs:** Test page is production code that needs maintenance; but catches SSR/hydration issues Storybook would miss

#### [Pattern] Created 7 distinct spring physics presets (default, glass, soft, gesture, spatial, haptic, layout) as reusable animation tokens (2026-01-17)
- **Problem solved:** Apple's Liquid Glass uses spring-based animations with different damping ratios for different interaction types
- **Why this works:** Different UI interactions require different animation feels - gestures need responsive springs, modals need softer springs, micro-interactions need snappy haptic springs
- **Trade-offs:** More tokens to maintain but gains consistent animation language across all components

### Created dedicated hooks (useParallax, useScrollGlass) for scroll-based glass effects instead of inline event handlers (2026-01-17)
- **Context:** Glass navbar needs scroll-responsive blur/opacity; cards need parallax depth effects
- **Why:** Scroll handlers are called 60+ times/second; hooks encapsulate throttling, RAF optimization, and cleanup logic
- **Rejected:** Inline useEffect with scroll listener - duplicated throttling logic across components, memory leak risk from missing cleanup
- **Trade-offs:** Additional abstraction layer but gains testability, reusability across components, and guaranteed cleanup on unmount
- **Breaking if changed:** Removing hooks would require duplicating scroll optimization logic in every component using glass effects

### Spring physics animation presets in TypeScript (animation-tokens.ts) rather than CSS keyframes (2026-01-17)
- **Context:** Apple Liquid Glass requires natural, physics-based motion
- **Why:** Spring animations have dynamic endpoints based on velocity; CSS keyframes are fixed-duration and feel mechanical
- **Rejected:** CSS transitions with cubic-bezier - cannot replicate spring overshoot/settle behavior
- **Trade-offs:** Requires JavaScript for spring calculations, but delivers Apple-quality motion feel
- **Breaking if changed:** Switching to CSS-only animations would lose the characteristic 'bounce' of Apple UI interactions