# Specification: lint-cleanup

**Feature ID:** 006
**Created:** 2026-01-05
**Status:** Approved
**Version:** 1.0.0
**Author:** Codex
**Last Updated:** 2026-01-05

> **Spec-Kit Compliance:** This specification follows the [GitHub Spec-Kit](https://github.com/github/spec-kit) standards for Spec-Driven Development.

---

## Overview

This feature removes current ESLint errors so `pnpm exec eslint .` passes again. Scope is limited to the 36 errors reported on 2026-01-05; warnings are explicitly out of scope for this pass. The approach is to fix a small set of code-level issues and adjust ESLint globals for browser/Node types without changing runtime behavior.

### Problem Statement

The repository currently fails lint with 36 errors, which blocks Quality Gates and makes it harder to ship safely. The errors are mostly `no-undef` for browser/DOM globals and a small number of code issues (unreachable code, undefined references, Node globals in scripts).

### Proposed Solution

Resolve each current ESLint error by:
- Adding missing browser/DOM and Node globals in `eslint.config.mjs` for TS/TSX files (keep `no-undef` enabled).
- Fixing code-level issues that are truly undefined or unreachable while preserving intended behavior (Sentry examples).

### Goals

- [ ] `pnpm exec eslint .` returns 0 errors.
- [ ] No functional regressions or behavior changes beyond what is required to satisfy lint.
- [ ] Any ESLint configuration changes are documented in this spec and in the code where applied.

### Non-Goals

- Fixing all lint warnings or refactoring unrelated code.
- Changing UX or product behavior outside of lint fixes.
- Introducing new dependencies or tooling.

---

## Current Error Inventory (2026-01-05)

**Error types:**
- `no-undef` for browser/DOM types and globals.
- `no-undef` for Node globals in scripts.
- `no-unreachable` for dead code.

**Known files (from `pnpm exec eslint .`):**
- `app/(dashboard)/chat/[id]/delete-button.tsx` (`confirm`)
- `app/api/sentry-example-api/route.ts` (`no-unreachable`)
- `app/global-error.tsx` (`Location`)
- `app/sentry-example-page/page.tsx` (`myUndefinedFunction`)
- `components/anamnese/copy-button.tsx` (`Navigator`)
- `components/chat/chat-input.tsx` (`HTMLTextAreaElement`)
- `components/chat/chat-interface.tsx` (`HTMLDivElement`)
- `components/chat/chatwell-demo.tsx` (`HTMLDivElement`)
- `components/error-boundary.tsx` (`Location`)
- `components/glass/GlassPanel.tsx` (`HTMLDivElement`)
- `components/medical/LiquidEditor.tsx` (`HTMLTextAreaElement`)
- `components/ui/badge.tsx` (`HTMLDivElement`)
- `components/ui/form.tsx` (`HTMLDivElement`, `HTMLParagraphElement`)
- `components/ui/glass-action-button.tsx` (`HTMLButtonElement`)
- `components/ui/glass-card.tsx` (`HTMLDivElement`)
- `components/ui/glass-input.tsx` (`HTMLInputElement`)
- `components/ui/sheet.tsx` (`HTMLDivElement`)
- `components/ui/skeleton.tsx` (`HTMLDivElement`)
- `scripts/validation/validate-high-risk.ts` (`require`, `module`)
- `src/hooks/useMediaQuery.ts` (`MediaQueryListEvent`)

---

## User Stories

### User Story 1

**As a** maintainer,
**I want to** have a clean ESLint run,
**So that** CI and local quality gates do not fail on errors.

**Acceptance Criteria:**
- [ ] `pnpm exec eslint .` reports 0 errors.
- [ ] No new lint errors introduced.

### User Story 2

**As a** developer,
**I want to** understand any ESLint config changes,
**So that** I can apply the same patterns consistently.

**Acceptance Criteria:**
- [ ] Configuration changes are documented in this spec and committed alongside the code.

---

## Requirements

### Functional Requirements

**FR-001:** Resolve all `no-undef` errors for browser/DOM contexts.
- Description: Ensure DOM globals and types are handled correctly in client components.
- Input: Existing components flagged by `no-undef`.
- Output: ESLint reports no `no-undef` errors for DOM types/globals.
- Priority: Must

**FR-002:** Resolve `no-undef` errors for Node globals in scripts.
- Description: Update scripts or ESLint config so Node globals are recognized where appropriate.
- Input: `scripts/validation/validate-high-risk.ts`.
- Output: ESLint reports no `no-undef` errors for Node globals.
- Priority: Must

**FR-003:** Remove unreachable or placeholder code flagged by ESLint.
- Description: Remove or refactor unreachable code and undefined references in example pages.
- Input: `app/api/sentry-example-api/route.ts`, `app/sentry-example-page/page.tsx`.
- Output: ESLint reports no `no-unreachable` or `no-undef` errors for those files.
- Priority: Must

**FR-004:** Keep scope limited to lint errors only.
- Description: Avoid unrelated refactors or behavior changes.
- Input: All touched files.
- Output: Minimal diffs focused on lint fixes.
- Priority: Must

### Non-Functional Requirements

**NFR-001:** Reliability
- Lint run returns 0 errors consistently on the same command.

**NFR-002:** Maintainability
- Changes should follow existing code style and avoid introducing new tooling.

---

## Constraints & Assumptions

### Technical Constraints

- Use existing ESLint setup (`eslint.config.mjs`).
- Avoid introducing new dependencies unless strictly necessary.

### Business Constraints

- Limit scope to error fixes; warnings can be handled in a later feature.

### Assumptions

- The current lint output is representative and repeatable.
- Files listed in the error inventory are the only error sources for this pass.

---

## Dependencies

### External Dependencies

| Dependency | Purpose | Version | Status |
|------------|---------|---------|--------|
| ESLint | Linting | Existing | Required |

### Internal Dependencies

| Feature/System | Description | Status |
|---------------|-------------|--------|
| `eslint.config.mjs` | Lint configuration | Existing |
| `tsconfig.json` | TS/DOM libs | Existing |

---

## User Interface Requirements

- Not applicable (no UI changes expected).

---

## Data Requirements

- Not applicable.

---

## API Requirements

- Not applicable.

---

## Testing Requirements

- [ ] Run `pnpm exec eslint .` and confirm 0 errors.
- [ ] Ensure no new errors are introduced by config changes.

---

## Decisions

- Warnings are out of scope for this feature and will be handled in a follow-up spec if needed.
- DOM and Node globals will be handled via `eslint.config.mjs` updates (no per-file disables).
- Scripts will rely on TS/TSX globals (no separate override required).
- Example/demo routes will be corrected directly (no lint exclusions).

## Open Questions

- None.

---

## References

- Lint run (2026-01-05): `pnpm exec eslint .`
- `eslint.config.mjs`
- `tsconfig.json`

---

## Change Log

| Date | Version | Changes | Author |
|-------|----------|---------|--------|
| 2026-01-05 | 1.0.0 | Initial specification | Codex |
