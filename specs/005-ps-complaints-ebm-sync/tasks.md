# Tasks: ps-complaints-ebm-sync

**Feature ID:** 005
**Based on Plan:** [plan.md](./plan.md)
**Status:** Approved

---

## Tasks

## Phase 1: Foundations

1. Define canonical DB schema usage for complaints and EBM JSON in `chief_complaints.additional_data`.
2. Create shared validation utilities (frontmatter + EBM schema) for sync + API.
3. Draft API contracts for complaints list/detail/update/changes.

## Phase 2: Sync Agent

4. Convert `scripts/sync/watch.ts` into a long-running local agent service.
5. [P] Implement Obsidian -> DB sync pipeline using existing parser (markdown-parser).
6. [P] Implement DB -> Obsidian sync pipeline using changes feed.
7. Add conflict detection via `contentHash` + timestamp comparison.
8. Add conflict output strategy (status flag or `*-CONFLICT.md`).

## Phase 3: App Integration

9. Replace runtime data source with API calls (remove dependency on static TS for runtime).
10. [P] Add EBM reference display in complaint detail views.
11. [P] Add sync status and last review indicators.

## Phase 4: Content Seeding

12. Import baseline 72 complaints into DB and verify counts.
13. [P] Apply confirmed references from `references-sources.md` to high-risk complaints.
14. [P] Expand Brazilian references for remaining high-risk complaints.

## Phase 5: Tests + Docs

15. Add unit tests for validator + conflict logic.
16. Add integration tests for sync flows.
17. Update `docs/OBSIDIAN_SYNC.md` with new canonical flow and agent runbook.

## Dependencies

- Phase 1 must complete before Phase 2
- Phase 2 tasks 5-6 can run in parallel [P]
- Phase 3 depends on Phase 2 completion
- Phase 3 tasks 10-11 can run in parallel [P]
- Phase 4 depends on Phase 2 completion
- Phase 4 tasks 13-14 can run in parallel [P]
- Phase 5 can begin after Phase 2 and run in parallel with Phase 3-4
