---
tags: [performance]
summary: performance implementation decisions and patterns
relevantTo: [performance]
importance: 0.7
relatedFiles: []
usageStats:
  loaded: 13
  referenced: 10
  successfulFeatures: 10
---
# performance

#### [Pattern] Mobile-specific blur reduction via CSS media queries to maintain performance on lower-powered devices (2026-01-17)
- **Problem solved:** backdrop-filter: blur() is GPU-intensive, causing jank on mobile Safari and older Android devices
- **Why this works:** Reduced blur values (e.g., 12px vs 24px) maintain glass aesthetic while staying under mobile GPU thresholds
- **Trade-offs:** Easier: pure CSS solution, no JS overhead. Harder: can't detect actual device capability, uses viewport width as proxy

### Reduced backdrop-filter blur from default to 50px on mobile screens (<768px) (2026-01-17)
- **Context:** Backdrop-filter blur is GPU-intensive and causes frame drops on mobile devices during scroll
- **Why:** Mobile GPUs struggle with large blur radii during animations. 50px provides visual effect while maintaining 60fps
- **Rejected:** Same blur values across all devices - caused janky scrolling on mid-range Android devices
- **Trade-offs:** Slightly less premium feel on mobile, but smooth performance. Desktop gets full effect.
- **Breaking if changed:** Removing this causes scroll jank on mobile Safari and Chrome Android, especially with parallax effects active

#### [Gotcha] backdrop-filter with blur 40-100px causes severe frame drops without GPU acceleration hints (2026-01-17)
- **Situation:** Glassmorphism requires heavy backdrop-blur which is computationally expensive
- **Root cause:** Added will-change: transform and transform: translate3d(0,0,0) to force GPU compositing layer for glass elements
- **How to avoid:** Increases GPU memory usage, but necessary for smooth 60fps in emergency UI where lag could delay patient care

#### [Pattern] Use CSS custom properties in :root for glass effects with mobile breakpoint overrides that reduce blur intensity (2026-01-17)
- **Problem solved:** Glass blur effects (backdrop-filter) are GPU-intensive and cause frame drops on mobile devices
- **Why this works:** CSS variables allow runtime theme switching AND device-specific optimizations without JavaScript intervention
- **Trade-offs:** Slightly less blur fidelity on mobile but maintains 60fps; requires disciplined CSS variable naming convention

### Reduced backdrop-filter blur from 80-120px to 50px specifically on mobile devices (2026-01-17)
- **Context:** Implementing glass morphism effects with heavy blur across all devices
- **Why:** backdrop-filter is GPU-intensive and causes frame drops on mobile devices; 50px provides acceptable visual effect while maintaining 60fps
- **Rejected:** Uniform blur values across all devices - caused janky scrolling on iOS Safari and Android Chrome
- **Trade-offs:** Mobile gets slightly less dramatic glass effect but maintains smooth performance; desktop gets full visual fidelity
- **Breaking if changed:** Removing this optimization causes scroll jank and battery drain on mobile devices

### Mobile blur reduction strategy: 50px on mobile vs 80-120px on desktop for backdrop-filter (2026-01-17)
- **Context:** Implementing Apple Liquid Glass effects with heavy use of backdrop-filter blur
- **Why:** Mobile GPUs have significant performance limitations with high blur values - causes frame drops and battery drain
- **Rejected:** Uniform blur across devices would cause janky scrolling on mobile Safari/Chrome
- **Trade-offs:** Slightly less 'premium' glass feel on mobile, but maintains 60fps scrolling
- **Breaking if changed:** Increasing mobile blur above 50px causes visible performance degradation on mid-tier devices

#### [Pattern] GPU acceleration via transform3d and will-change for glass effects, not position/opacity animations (2026-01-17)
- **Problem solved:** Complex layered effects with mesh gradients, specular highlights, rim lights, and caustics
- **Why this works:** transform3d forces GPU compositing layer; will-change hints browser to pre-allocate resources
- **Trade-offs:** Higher GPU memory usage, but enables 60fps animations on complex glass surfaces

### Mobile backdrop-filter blur reduced to 50px vs 40-120px range on desktop (2026-01-17)
- **Context:** Liquid Glass 2026 aesthetic requires heavy blur effects for frosted glass look
- **Why:** backdrop-filter is GPU-intensive; mobile GPUs throttle quickly with high blur values causing jank
- **Rejected:** Same blur values across devices - caused frame drops on mid-range mobile devices
- **Trade-offs:** Less dramatic glass effect on mobile, but consistent 60fps performance
- **Breaking if changed:** Increasing mobile blur above 60px causes visible performance degradation on iOS Safari and older Android

#### [Pattern] GPU acceleration via transform3d(0,0,0) and will-change on glass components for compositor layer promotion (2026-01-17)
- **Problem solved:** Glass effects need smooth animations during scroll and interaction
- **Why this works:** Forces GPU compositing, prevents repaint when blur/opacity animate; essential for 60fps glass effects
- **Trade-offs:** Higher GPU memory usage, but eliminates main thread blocking during animations