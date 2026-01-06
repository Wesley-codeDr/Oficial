# Tasks: lint-cleanup

**Feature ID:** 006
**Based on Plan:** [plan.md](./plan.md)
**Status:** Approved

---

## Tasks

## Phase 1: Lint Config Updates

1. Update `eslint.config.mjs` to add missing DOM/browser globals for TS/TSX.
2. Add Node globals required for TS/TSX scripts (`require`, `module`) to resolve `no-undef` in `scripts/`.

## Phase 2: Code Fixes

3. Fix unreachable code in `app/api/sentry-example-api/route.ts` while preserving error behavior.
4. Replace undefined placeholder usage in `app/sentry-example-page/page.tsx` with explicit error handling.
5. Ensure `confirm` usage in client components is lint-safe (use `window`/`globalThis`).

## Phase 3: Validation

6. Run `pnpm exec eslint .` and confirm 0 errors.

## Dependencies

- Phase 1 must complete before Phase 2
- Phase 2 tasks can be executed sequentially
- Phase 3 depends on completion of Phase 1 and Phase 2

