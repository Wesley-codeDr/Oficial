# Tasks: lint-warnings-cleanup

**Feature ID:** 007
**Based on Plan:** [plan.md](./plan.md)
**Status:** Approved

---

## Tasks

## Phase 1: Inventory

1. Capture current warnings via `pnpm exec eslint .` and group by rule.

## Phase 2: App/Component Cleanup

2. Remove unused imports/vars or convert to type-only imports.
3. Replace `any` with explicit types or `unknown` + narrowing.
4. Fix `react-hooks/exhaustive-deps` warnings.

## Phase 3: Scripts/Tests Cleanup

5. Resolve `no-console` warnings in scripts/tests (either replace with `warn/error` or add scoped overrides).

## Phase 4: Validation

6. Run `pnpm exec eslint .` and confirm 0 warnings.

## Dependencies

- Phase 1 must complete first to understand scope
- Phase 2 and Phase 3 can run in parallel
- Phase 4 depends on completion of Phase 2 and Phase 3

