## 2026-05-21 - Custom Glass Component Accessibility Gaps
**Learning:** The custom "Glass" design system components (specifically `GlassInput`) were visually polished but lacked semantic association between inputs and their error messages, and icon buttons lacked accessible names.
**Action:** When working with the Glass component library, proactively check for `aria-describedby` on inputs with error states and `aria-label` on icon-only buttons.
