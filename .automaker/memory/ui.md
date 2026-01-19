---
tags: [ui]
summary: ui implementation decisions and patterns
relevantTo: [ui]
importance: 0.7
relatedFiles: []
usageStats:
  loaded: 14
  referenced: 12
  successfulFeatures: 12
---
# ui

### Glassmorphism effects implemented via CSS utility classes in globals.css rather than inline styles or component-level CSS-in-JS (2026-01-17)
- **Context:** Apple Liquid Glass design system requiring backdrop-blur, specular highlights, rim lights across multiple components
- **Why:** CSS utilities allow consistent visual effects across GlassModal, GlassDialog, Sheet without duplicating complex backdrop-filter, gradient, and animation code in each component
- **Rejected:** Inline Tailwind classes would create massive className strings; CSS-in-JS would increase bundle size and lose CSS cascade benefits for accessibility overrides
- **Trade-offs:** Easier: consistent effects, accessibility media query overrides in one place. Harder: debugging requires checking both component and globals.css
- **Breaking if changed:** Removing .glass-modal/.glass-dialog/.glass-sheet CSS classes breaks all glassmorphism effects; components become plain boxes

#### [Pattern] Accessibility fallbacks as layered CSS media queries: prefers-reduced-motion, prefers-reduced-transparency, prefers-contrast, forced-colors (2026-01-17)
- **Problem solved:** Glassmorphism heavily relies on transparency and animations which can cause accessibility issues
- **Why this works:** Each accessibility preference needs different treatment: reduced-motion removes animations, reduced-transparency adds solid backgrounds, high-contrast increases borders, forced-colors uses system colors
- **Trade-offs:** Easier: graceful degradation per preference. Harder: more CSS rules to maintain, testing all combinations

#### [Pattern] Glassmorphism components use hybrid approach: CSS classes in globals.css for visual effects (backdrop-filter, layering) combined with TypeScript animation tokens for motion (2026-01-17)
- **Problem solved:** Building glass-modal, glass-dialog, and sheet components with consistent glassmorphism effects
- **Why this works:** backdrop-filter and complex layering work better with global CSS scope, while animation configs benefit from TypeScript for type safety and reuse with Framer Motion
- **Trade-offs:** Easier to maintain consistent glass effects across components, but CSS classes are global and could conflict

#### [Pattern] Spring physics tokens with named presets (glass: stiffness 300/damping 30/mass 1.1, soft: 200/28, haptic: 600/40) (2026-01-17)
- **Problem solved:** Need consistent animation feel across all glass components that matches Apple's iOS aesthetic
- **Why this works:** Higher mass (1.1) on glass preset creates 'premium weight' feeling. Haptic uses high stiffness for snappy micro-interactions. Values derived from iOS spring behavior analysis
- **Trade-offs:** Requires Framer Motion dependency. Bundle size increase (~40kb) but animations feel native

#### [Pattern] Specular highlights via radial-gradient, rim lights via conic-gradient, combined with noise texture overlay (2026-01-17)
- **Problem solved:** Achieving glass material realism without WebGL or complex shaders
- **Why this works:** Radial gradients simulate light reflection point. Conic gradients create edge lighting that follows container shape. Noise adds organic imperfection that prevents 'too perfect' digital look
- **Trade-offs:** Multiple overlapping pseudo-elements increase DOM complexity. Worth it for visual fidelity

### Mouse-following glow effect on GlassInput using onMouseMove with element-relative coordinates (2026-01-17)
- **Context:** Inputs need visual feedback that feels interactive and premium
- **Why:** Glow following cursor creates sense of responsiveness. Uses CSS custom properties (--mouse-x, --mouse-y) updated via JS for GPU-accelerated rendering
- **Rejected:** Pure CSS :hover effect - static, no spatial awareness. Canvas overlay - overkill complexity
- **Trade-offs:** Requires JS for mouse tracking (minimal overhead). Disabled on touch devices where it makes no sense
- **Breaking if changed:** Using transform instead of custom properties would cause layout thrashing on every mouse move

### Hover animation uses scale(1.015) + translateY(-4px) together rather than just one transform (2026-01-17)
- **Context:** Card hover states need to feel like lifting off the surface
- **Why:** Scale alone feels like zoom. TranslateY alone feels like slide. Combined creates true 'lift' illusion. Small scale (1.5%) is subtle enough not to cause layout shifts
- **Rejected:** Larger scale (1.05) - too dramatic, causes layout jumps with neighboring elements
- **Trade-offs:** Must use transform-origin: center to prevent drift. Shadow must also animate to maintain illusion
- **Breaking if changed:** Using margin/padding instead of transform causes layout reflow and janky animation

### Implemented glassmorphism with CSS custom properties + utility classes instead of CSS-in-JS or Tailwind plugins (2026-01-17)
- **Context:** Building a comprehensive Liquid Glass design system for a medical emergency application
- **Why:** CSS custom properties enable runtime theming, browser-native performance, and allow accessibility media queries (@prefers-reduced-transparency, @prefers-reduced-motion) to work without JavaScript
- **Rejected:** Tailwind plugins (less flexible for complex backdrop-filter stacking), styled-components (runtime JS overhead for effects that must be instant in medical context)
- **Trade-offs:** Less type-safety in CSS, but critical accessibility fallbacks work even if JS fails
- **Breaking if changed:** Removing CSS custom properties would break theming, accessibility fallbacks, and require rewriting all glass components

### Created scroll-responsive glass hook (use-scroll-glass.ts) that dynamically adjusts blur, saturation, and opacity based on scroll position (2026-01-17)
- **Context:** Static glass effects look flat; Apple's implementation changes material properties as content scrolls behind
- **Why:** Scroll position determines how much content is behind the glass, requiring dynamic blur intensity for realistic depth
- **Rejected:** CSS-only scroll-driven animations (limited browser support, less control over interpolation)
- **Trade-offs:** Additional JavaScript overhead on scroll events, but throttled with requestAnimationFrame for performance
- **Breaking if changed:** Without scroll-responsive glass, navbar would look disconnected from content, breaking the material metaphor

#### [Pattern] Implemented 4-layer accessibility fallback system: @prefers-reduced-motion, @prefers-reduced-transparency, @prefers-contrast, @forced-colors (2026-01-17)
- **Problem solved:** Glassmorphism effects (motion, transparency, blur) can cause vestibular issues, low vision problems, and break forced-colors mode
- **Why this works:** Medical users may have visual impairments; emergency UI must remain usable under all accessibility settings
- **Trade-offs:** 4x CSS maintenance burden, but legally required for WCAG compliance and ethically essential for medical software

#### [Pattern] Used physics-based spring animations with specific stiffness/damping values instead of CSS duration-based easing (2026-01-17)
- **Problem solved:** Apple Liquid Glass uses spring physics that respond naturally to interruption
- **Why this works:** Spring animations can be interrupted mid-animation and transition smoothly; duration-based animations jump when interrupted (common in fast medical workflows)
- **Trade-offs:** Requires Framer Motion or similar library, larger bundle, but critical for responsive feel in high-frequency interaction patterns

#### [Gotcha] SVG noise texture overlay required for realistic glass - pure CSS gradients look synthetic (2026-01-17)
- **Situation:** Apple's glass has subtle noise/grain that makes it feel organic and physical
- **Root cause:** Human eyes detect 'too perfect' gradients as artificial; noise adds imperceptible grain that registers as realistic material
- **How to avoid:** Inline SVG data URI adds ~2KB to CSS, but eliminates network request and works everywhere

### Export component types alongside components in barrel file (e.g., GlassActionButton AND GlassActionButtonProps) (2026-01-17)
- **Context:** TypeScript consumers need both the component and its prop types for proper typing in wrapper components
- **Why:** Prevents consumers from importing from deep paths like 'components/ui/glass-action-button' which breaks if internal structure changes
- **Rejected:** Type-only exports in separate index.types.ts - rejected because doubles import statements for consumers
- **Trade-offs:** Barrel file grows larger but provides single import point; slight bundle size increase from type re-exports
- **Breaking if changed:** Removing type exports forces consumers to use typeof or import from internal paths, creating fragile dependencies

#### [Pattern] Separated design tokens into dedicated liquid-glass-utils.css (816 lines) rather than extending Tailwind config (2026-01-17)
- **Problem solved:** Need comprehensive CSS custom properties for glass effects including blur, saturation, shadows, and spring physics
- **Why this works:** CSS custom properties allow runtime theming, cascade properly with media queries (prefers-reduced-motion), and work with backdrop-filter which Tailwind doesn't fully support
- **Trade-offs:** Slightly more verbose class usage but gains full CSS cascade control and media query responsiveness

#### [Pattern] Combined specular highlights (radial gradient ellipse at top) with rim lights (conic gradient border mask) for glass realism (2026-01-17)
- **Problem solved:** Single-layer glass effects look flat; real glass has multiple light interaction layers
- **Why this works:** Specular simulates light source reflection, rim light simulates edge refraction - together they create volumetric depth perception
- **Trade-offs:** More CSS layers (pseudo-elements) but gains realistic glass appearance that responds to implied light source

#### [Pattern] Implemented 4 accessibility media queries (prefers-reduced-motion, prefers-reduced-transparency, prefers-contrast, forced-colors) with graceful degradation (2026-01-17)
- **Problem solved:** Glass effects use heavy animations, transparency, and subtle contrast which are accessibility concerns
- **Why this works:** Each preference addresses different disability: vestibular disorders (motion), cognitive load (transparency), low vision (contrast), assistive tech (forced-colors)
- **Trade-offs:** More CSS to maintain but gains WCAG AAA compliance and supports Windows High Contrast mode

#### [Pattern] Separate CSS architecture: globals.css (utilities/animations) + liquid-glass-utils.css (CSS custom properties/tokens) (2026-01-17)
- **Problem solved:** 4,000+ lines of glass styling needed organization without becoming unmaintainable
- **Why this works:** CSS custom properties in separate file allows runtime theming and easier token updates without touching utility classes
- **Trade-offs:** Two imports required, but clear separation between 'what values' (tokens) and 'how applied' (utilities)

### Medical-specific component variants (medical, elevated) with distinct visual hierarchy from standard glass (2026-01-17)
- **Context:** Healthcare app needs clear visual distinction for critical medical information
- **Why:** Medical contexts require higher contrast and clearer boundaries than standard glass aesthetics allow
- **Rejected:** Single glass variant for all contexts - insufficient visual hierarchy for clinical decision-making
- **Trade-offs:** More variant maintenance, but ensures critical medical info isn't obscured by aesthetic effects
- **Breaking if changed:** Removing medical variant would reduce readability of critical patient data in high-stress ER environments

#### [Pattern] Mesh gradient blobs with 25-30s animation cycles for ambient background movement (2026-01-17)
- **Problem solved:** Creating living, breathing glass surfaces without distracting from content
- **Why this works:** Cycle times under 20s are perceptible as 'animated'; 25-30s feels like natural light shifting
- **Trade-offs:** Constant GPU compositing cost, but creates premium ambient feel without user noticing movement

#### [Pattern] Separate CSS file (liquid-glass-utils.css) for design system tokens imported alongside globals.css (2026-01-17)
- **Problem solved:** Large design system with 6500+ lines of glass styling utilities, animations, mesh gradients
- **Why this works:** Separation allows theming/swapping glass variants without touching base styles; easier tree-shaking if not using glass components
- **Trade-offs:** Extra HTTP request on initial load, but better code organization and selective importing