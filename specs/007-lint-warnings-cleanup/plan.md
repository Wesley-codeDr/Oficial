# Implementation Plan: lint-warnings-cleanup

**Feature ID:** 007
**Based on Spec:** [spec.md](./spec.md) v1.0.0
**Created:** 2026-01-05
**Status:** Approved
**Author:** Codex
**Last Updated:** 2026-01-05

> **Spec-Kit Compliance:** This plan follows the [GitHub Spec-Kit](https://github.com/github/spec-kit) standards and was generated using `/speckit.plan`.

---

## Executive Summary

Remove existing ESLint warnings with minimal, low-risk changes. Prioritize code fixes in app/components, then address `any` types, hook deps, and finally tool/script warnings (either code fixes or scoped lint overrides).

### Scope Summary

- **In Scope:** Resolve all current warnings from `pnpm exec eslint .`.
- **Out of Scope:** Feature changes, refactors, new dependencies.

### Estimated Effort

- **Development:** 1-2 days
- **Testing:** 0.5 day
- **Documentation:** 0.25 day
- **Total:** 1.75-2.75 days

### Risk Assessment

- **Overall Risk:** Low
- **Key Risk:** Behavior change during cleanup
- **Mitigation:** Keep diffs minimal and review each warning fix.

---

## Technology Stack

| Technology | Purpose | Version | Rationale |
|------------|---------|---------|-----------|
| ESLint | Linting | Existing | Warning cleanup target |
| TypeScript | Types | Existing | Replace `any`/unused types |
| React | UI | Existing | Hook dependency fixes |

---

## Implementation Plan

### Phase 1: Inventory and Grouping

- Snapshot current warnings from `pnpm exec eslint .`.
- Group by rule: `no-unused-vars`, `no-explicit-any`, `react-hooks/exhaustive-deps`, `no-console`.

### Phase 2: App/Component Code

- Remove unused imports/vars or convert to type-only imports.
- Replace `any` with specific types or `unknown` + narrowing.
- Fix hook dependency warnings by stabilizing inputs or moving logic into hooks.

### Phase 3: Scripts/Tests

- For `scripts/` and `tests/`, decide per-file: replace logs with `console.warn/error` or add scoped ESLint overrides.
- Keep developer tooling output intact.

### Phase 4: Validation

- Run `pnpm exec eslint .` and confirm zero warnings.
- Optional typecheck if typing changes were made.

---

## Testing Strategy

- Primary check: `pnpm exec eslint .` (0 warnings).
- Optional: `pnpm exec tsc -p tsconfig.json` if types changed.

---

## Documentation

- No end-user documentation changes expected.
- Update spec change log if scope changes.

---

## Dependencies

- None beyond existing ESLint/TypeScript setup.

---

## Open Questions

- Whether to add lint overrides for `scripts/` and `tests/` or clean them in code.

---

## Change Log

| Date | Version | Changes | Author |
|-------|----------|---------|--------|
| 2026-01-05 | 1.0.0 | Initial plan | Codex |
