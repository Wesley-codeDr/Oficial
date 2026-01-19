---
tags: [gotcha, mistake, edge-case, bug, warning]
summary: Mistakes and edge cases to avoid
relevantTo: [error, bug, fix, issue, problem]
importance: 0.9
relatedFiles: []
usageStats:
  loaded: 58
  referenced: 31
  successfulFeatures: 31
---
# Gotchas

Mistakes and edge cases to avoid. These are lessons learned from past issues.

---



#### [Gotcha] Pre-existing type errors in codebase require filtering typecheck output to verify only new component changes (2026-01-17)
- **Situation:** Running pnpm typecheck showed errors unrelated to new glass components
- **Root cause:** Large codebases often have legacy type issues; blocking all work until fixed is impractical
- **How to avoid:** Easier: ship new features faster. Harder: accumulating tech debt, harder to distinguish new errors from old

#### [Gotcha] Pre-existing type errors in unrelated files appear in typecheck output - filter with grep to isolate new component errors (2026-01-17)
- **Situation:** Verifying new glass components don't introduce type errors in a codebase with existing technical debt
- **Root cause:** Running full typecheck surfaces all errors; need to filter output to verify new code specifically
- **How to avoid:** Can verify new code works without fixing legacy issues, but requires careful output filtering

#### [Gotcha] Must include -webkit-backdrop-filter alongside backdrop-filter for Safari support (2026-01-17)
- **Situation:** Safari requires vendor prefix for backdrop-filter even in 2024+
- **Root cause:** Safari's webkit engine still needs prefix. Omitting it breaks glass effect entirely on iOS Safari
- **How to avoid:** Duplicate CSS lines. No real downside, prevents silent Safari failures

#### [Gotcha] TypeScript errors in unrelated files (scripts, hooks) don't block glass component system from working - verify scope before debugging (2026-01-17)
- **Situation:** Typecheck showed errors but they were in chat hooks, medical components, validation scripts - not in glass system
- **Root cause:** Large codebases accumulate technical debt in non-critical paths; glass components were correctly isolated
- **How to avoid:** Risk of false confidence if errors were actually related; requires disciplined grep/filtering of typecheck output

#### [Gotcha] TypeScript errors during large UI overhaul were pre-existing in unrelated parts of codebase (Prisma types, AI SDK, medical components) (2026-01-17)
- **Situation:** Running tsc --noEmit after implementing glass components showed 60+ errors
- **Root cause:** Large codebases accumulate type drift; running full typecheck surfaces latent issues unrelated to current work
- **How to avoid:** Accepting known unrelated errors allows focused delivery but requires discipline to not ignore new errors introduced by current work

#### [Gotcha] -webkit-backdrop-filter prefix still required in 2026 with solid color fallbacks for older browsers (2026-01-17)
- **Situation:** Cross-browser glass effects implementation
- **Root cause:** Safari requires webkit prefix; some enterprise browsers and embedded webviews lack support entirely
- **How to avoid:** Duplicate CSS rules, but ensures graceful degradation to solid semi-transparent backgrounds

#### [Gotcha] ESLint no-undef error when casting refs with Radix UI Slot component - ref forwarding pattern incompatible with standard Button approach (2026-01-17)
- **Situation:** GlassButton component using Radix Slot for asChild prop needed ref forwarding
- **Root cause:** Radix UI Slot doesn't forward refs the same way as regular elements, ESLint cannot recognize certain ref casting patterns
- **How to avoid:** Simpler code without cast, but need alternative ref handling for Slot polymorphism