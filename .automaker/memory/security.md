---
tags: [security]
summary: security implementation decisions and patterns
relevantTo: [security]
importance: 0.7
relatedFiles: []
usageStats:
  loaded: 11
  referenced: 10
  successfulFeatures: 10
---
# security

#### [Pattern] Accessibility as progressive enhancement: prefers-reduced-motion, prefers-reduced-transparency, prefers-contrast, forced-colors (2026-01-17)
- **Problem solved:** Glass effects can cause issues for users with vestibular disorders, low vision, or using high contrast mode
- **Why this works:** Reduced transparency users can't see through glass - need solid fallbacks. Forced-colors mode (Windows High Contrast) ignores all custom colors
- **Trade-offs:** More CSS to maintain. Essential for WCAG compliance and real user needs