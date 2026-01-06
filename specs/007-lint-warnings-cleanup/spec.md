# Specification: lint-warnings-cleanup

**Feature ID:** 007
**Created:** 2026-01-05
**Status:** Draft
**Version:** 1.0.0
**Author:** Codex
**Last Updated:** 2026-01-05

> **Spec-Kit Compliance:** This specification follows the [GitHub Spec-Kit](https://github.com/github/spec-kit) standards for Spec-Driven Development.

---

## Overview

Clean up the current ESLint warnings so `pnpm exec eslint .` reports zero warnings. The work focuses on warning types already present and avoids feature changes or large refactors.

### Problem Statement

The repository currently emits 309 ESLint warnings. The volume hides real issues, makes CI noisy, and violates the quality gate that expects a clean lint run.

### Proposed Solution

Address warnings by category with minimal code changes:
- Remove unused imports/vars or convert to type-only usage.
- Replace `any` with explicit types or `unknown` with narrowing.
- Fix `react-hooks/exhaustive-deps` warnings by stabilizing dependencies or refactoring hook usage.
- Decide how to handle `no-console` warnings in scripts/tests (either allow via overrides or replace with `console.warn/error`).

### Goals

- [ ] `pnpm exec eslint .` returns zero warnings and errors.
- [ ] No behavior changes beyond what is required for warning fixes.
- [ ] Any ESLint config changes are minimal, documented, and scoped.

### Non-Goals

- Large refactors or feature work.
- Removing logs or instrumentation from runtime code unless required.
- Changing UI/UX or product behavior.

---

## Current Warning Inventory (2026-01-05)

**Primary warning categories:**
- `@typescript-eslint/no-unused-vars` (unused imports/variables/params).
- `@typescript-eslint/no-explicit-any`.
- `react-hooks/exhaustive-deps`.
- `no-console` (scripts, seed, validation, sync tooling).

**Representative locations (not exhaustive):**
- UI/components: `components/medical/*`, `components/anamnese/*`, `components/chat/*`, `components/admin/*`.
- App pages: `app/(dashboard)/*`, `app/page.tsx`, `app/demo/*`.
- Scripts/tests: `scripts/sync/*`, `scripts/validation/*`, `prisma/seed.ts`, `tests/e2e/*`.

---

## User Stories

### User Story 1

**As a** maintainer,
**I want to** have a clean lint run without warnings,
**So that** CI and local checks stay reliable and actionable.

**Acceptance Criteria:**
- [ ] `pnpm exec eslint .` reports 0 warnings.
- [ ] No new lint warnings introduced.

### User Story 2

**As a** developer,
**I want to** keep lint rules meaningful,
**So that** warnings reflect real problems and not false positives.

**Acceptance Criteria:**
- [ ] Any rule overrides are narrowly scoped and documented.
- [ ] Warnings in application code are resolved in code, not suppressed.

---

## Requirements

### Functional Requirements

**FR-001:** Remove unused imports/vars in app and component code.
- Description: Clean unused identifiers and convert to type-only imports when appropriate.
- Input: Files with `@typescript-eslint/no-unused-vars` warnings.
- Output: Warnings removed.
- Priority: Must

**FR-002:** Address explicit `any` usage.
- Description: Replace `any` with explicit types or `unknown` + narrowing.
- Input: Files with `@typescript-eslint/no-explicit-any` warnings.
- Output: Warnings removed.
- Priority: Must

**FR-003:** Fix `react-hooks/exhaustive-deps` warnings.
- Description: Stabilize dependencies or refactor hooks to meet rules.
- Input: Hooks flagged by ESLint.
- Output: Warnings removed without behavior change.
- Priority: Must

**FR-004:** Handle `no-console` warnings in scripts/tests.
- Description: Either replace console usage with allowed methods or add scoped ESLint overrides for tooling paths.
- Input: `scripts/*`, `prisma/seed.ts`, `tests/*`.
- Output: Warnings removed while preserving developer tooling output.
- Priority: Must

### Non-Functional Requirements

**NFR-001:** Maintainability
- Changes should be small and localized.

**NFR-002:** Reliability
- No changes should alter runtime behavior or data flow.

---

## Constraints & Assumptions

### Technical Constraints

- Use existing ESLint config (`eslint.config.mjs`).
- No new dependencies.

### Business Constraints

- Prioritize low-risk changes; avoid scope creep.

### Assumptions

- The warning inventory above reflects current state and is repeatable.

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

---

## Testing Requirements

- [ ] Run `pnpm exec eslint .` and confirm 0 warnings.
- [ ] Optional: run `pnpm exec tsc -p tsconfig.json` if any typing changes are made.

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Over-broad lint overrides | Medium | Low | Scope overrides to scripts/tests only and document them. |
| Behavior change during cleanup | Medium | Low | Keep diffs small and review each change for semantics. |

---

## Open Questions

- Should `no-console` be relaxed for `scripts/` and `tests/`, or should we replace logs with `console.warn/error`?

---

## References

- Lint run: `pnpm exec eslint .` (2026-01-05)
- `eslint.config.mjs`

---

## Change Log

| Date | Version | Changes | Author |
|-------|----------|---------|--------|
| 2026-01-05 | 1.0.0 | Initial specification | Codex |
