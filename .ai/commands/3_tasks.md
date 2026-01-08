# Phase 3: Tasks (`/3_tasks`)
**Goal**: Break plan into actionable, testable tasks

---

## 🎯 Objectives

By the end of this phase, you should have:
1. ✅ Complete task breakdown (`tasks.md`)
2. ✅ Dependencies identified and documented
3. ✅ Parallel-safe tasks marked with `[P]`
4. ✅ Acceptance criteria per task
5. ✅ Execution order defined
6. ✅ Human review received (recommended)

---

## 📋 Prerequisites

Before starting this phase:
- [x] Phase 2 (Plan) completed and approved
- [x] `specs/[feature]/spec.md` exists
- [x] `specs/[feature]/plan.md` exists and approved
- [x] Human checkpoint approval received
- [x] Context budget: 20-40% (Smart Zone)
- [x] Fresh session started (after Phase 2 compaction)

---

## 🔍 Step-by-Step Process

### **Step 1: Load Required Context (5 min)**

**Load these files**:
```
✅ CLAUDE.md (already loaded)
✅ specs/[feature]/spec.md
✅ specs/[feature]/plan.md
```

**Verify context budget**: Should be ~30-35% after loading

---

### **Step 2: Generate Task Breakdown (15 min)**

**Use existing `/speckit.tasks` command**:

```
/speckit.tasks

Additional context for task generation:
- Break down each implementation phase from plan.md
- Include setup/configuration tasks
- Include testing tasks
- Include documentation tasks
- Mark parallel-safe tasks with [P]
```

**This generates** `specs/[feature]/tasks.md` with initial task structure

---

### **Step 3: Refine and Enhance Tasks (30 min)**

**Enhance each task with details**:

```markdown
# Tasks: [Feature Name]

## Task Organization

Tasks are organized by user story and include:
- **[P]** = Can be executed in parallel with other [P] tasks
- **Dependencies**: Must complete before starting
- **Acceptance**: How to know it's done

---

## Setup & Configuration

### Task 1.1: Create database migration [P]
**Description**: Add new fields to Prisma schema and generate migration

**Files to modify**:
- `prisma/schema.prisma`

**Steps**:
1. Add new model/fields to schema
2. Run `pnpm prisma migrate dev --name add-[feature]-schema`
3. Run `pnpm prisma generate`
4. Verify migration applied successfully

**Dependencies**: None

**Acceptance Criteria**:
- [ ] Prisma schema updated
- [ ] Migration file generated
- [ ] Migration applied to dev DB
- [ ] Prisma client regenerated

**Estimated Time**: 15 min

---

### Task 1.2: Set up environment variables [P]
**Description**: Add required environment variables

**Files to modify**:
- `env.template`
- `.env` (local)

**Steps**:
1. Add new variables to `env.template` with descriptions
2. Document in `docs/ENVIRONMENT.md` (if needed)
3. Add to Vercel environment variables (production)

**Dependencies**: None

**Acceptance Criteria**:
- [ ] env.template updated
- [ ] Documentation updated
- [ ] Production environment configured

**Estimated Time**: 10 min

---

## User Story 1: [Story Title]

### Task 2.1: Create [Component] component
**Description**: Build main UI component for [story]

**Files to create**:
- `components/[domain]/[Component]/[Component].tsx`
- `components/[domain]/[Component]/[Component].test.tsx`
- `components/[domain]/[Component]/index.ts`

**Steps**:
1. Create component directory structure
2. Implement component with TypeScript props
3. Add shadcn/ui components as needed
4. Implement responsive design
5. Add accessibility attributes
6. Write unit tests (80% coverage target)

**Dependencies**: 
- Task 1.1 (database schema)

**Acceptance Criteria**:
- [ ] Component renders correctly
- [ ] Props properly typed
- [ ] Responsive on mobile/tablet/desktop
- [ ] Accessible (ARIA labels, keyboard navigation)
- [ ] Unit tests pass with 80%+ coverage

**Estimated Time**: 60 min

---

### Task 2.2: Create API route for [action] [P]
**Description**: Implement backend API endpoint

**Files to create**:
- `app/api/[feature]/[action]/route.ts`
- `app/api/[feature]/[action]/route.test.ts`

**Steps**:
1. Create API route file
2. Implement request validation (Zod schema)
3. Add authentication check (Supabase)
4. Add authorization check (if needed)
5. Implement business logic
6. Add error handling
7. Write integration tests

**Dependencies**:
- Task 1.1 (database schema)

**Acceptance Criteria**:
- [ ] Endpoint responds correctly
- [ ] Request validation works
- [ ] Authentication enforced
- [ ] Authorization enforced (if applicable)
- [ ] Error responses formatted correctly
- [ ] Integration tests pass

**Estimated Time**: 45 min

---

### Task 2.3: Integrate component with API
**Description**: Connect frontend component to backend API

**Files to modify**:
- `components/[domain]/[Component]/[Component].tsx`

**Steps**:
1. Add TanStack Query hook for data fetching
2. Implement loading states
3. Implement error states
4. Add optimistic updates (if applicable)
5. Update tests to mock API

**Dependencies**:
- Task 2.1 (component created)
- Task 2.2 (API route created)

**Acceptance Criteria**:
- [ ] Data fetches correctly
- [ ] Loading states display
- [ ] Error states display
- [ ] Optimistic updates work (if applicable)
- [ ] Tests updated and passing

**Estimated Time**: 30 min

---

## User Story 2: [Story Title]

[Repeat pattern for each user story]

---

## Testing

### Task N.1: Write E2E tests [P]
**Description**: Playwright tests for critical user flows

**Files to create**:
- `e2e/[feature]/[flow].spec.ts`

**Steps**:
1. Create test file
2. Implement user flow tests
3. Add assertions for success criteria
4. Run tests locally
5. Verify tests pass in CI

**Dependencies**:
- All implementation tasks complete

**Acceptance Criteria**:
- [ ] All user flows tested
- [ ] Tests pass locally
- [ ] Tests pass in CI
- [ ] Critical paths covered

**Estimated Time**: 45 min

---

### Task N.2: Manual testing checklist
**Description**: Human verification of feature

**Checklist**:
- [ ] Feature works on Chrome/Firefox/Safari
- [ ] Feature works on mobile (iOS/Android)
- [ ] All acceptance criteria met
- [ ] No console errors
- [ ] No accessibility violations (Lighthouse)
- [ ] Medical compliance verified (if applicable)

**Dependencies**:
- All implementation tasks complete

**Acceptance Criteria**:
- [ ] All checklist items verified
- [ ] No critical issues found

**Estimated Time**: 30 min

---

## Documentation

### Task N.3: Update documentation [P]
**Description**: Document new feature for users and developers

**Files to modify**:
- `README.md` (if public-facing)
- `docs/[relevant].md`
- JSDoc comments in code

**Steps**:
1. Add feature to README (if applicable)
2. Update relevant documentation
3. Add JSDoc comments to public APIs
4. Update CHANGELOG.md

**Dependencies**:
- All implementation tasks complete

**Acceptance Criteria**:
- [ ] README updated (if needed)
- [ ] Docs updated
- [ ] Code commented
- [ ] CHANGELOG updated

**Estimated Time**: 20 min

---

## Execution Order

### Phase 1: Setup (Parallel)
```
[P] Task 1.1: Database migration
[P] Task 1.2: Environment variables
```

### Phase 2: User Story 1
```
Task 2.1: Create component
    ↓
Task 2.2: Create API route  [Can run parallel with 2.1]
    ↓
Task 2.3: Integrate component with API
```

### Phase 3: User Story 2
[Similar dependency chain]

### Phase 4: Testing & Documentation (Some Parallel)
```
[P] Task N.1: E2E tests
    Task N.2: Manual testing (after N.1)
[P] Task N.3: Documentation (parallel with testing)
```

---

## Dependency Graph

```
Setup Tasks (1.1, 1.2)
    ↓
Story 1 Tasks (2.1, 2.2, 2.3)
    ↓
Story 2 Tasks (...)
    ↓
Testing Tasks (N.1, N.2)
    ↓
Documentation (N.3)
```

---

## Complexity Estimates

| Task | Complexity | Time | Risk |
|------|------------|------|------|
| 1.1 | Low | 15min | Low |
| 1.2 | Low | 10min | Low |
| 2.1 | Medium | 60min | Medium |
| 2.2 | Medium | 45min | Low |
| 2.3 | Low | 30min | Low |
| ... | ... | ... | ... |

**Total Estimated Time**: [X hours]

---

## Risk Assessment

### High-Risk Tasks
- **Task [X]**: [Why risky] → **Mitigation**: [Strategy]

### Dependencies on External Factors
- **Task [X]**: Requires [external factor] → **Mitigation**: [Strategy]

---

## Optional Enhancements (Future)

Tasks that could be added later:
- [ ] [Enhancement 1]: [Description]
- [ ] [Enhancement 2]: [Description]
```

---

## ✅ Phase 3 Completion Checklist

Before moving to Phase 4:

- [ ] `specs/[feature]/tasks.md` created and complete
- [ ] All tasks have clear descriptions
- [ ] All tasks have file paths listed
- [ ] All tasks have step-by-step instructions
- [ ] Dependencies identified for each task
- [ ] Parallel-safe tasks marked with `[P]`
- [ ] Acceptance criteria defined per task
- [ ] Execution order documented
- [ ] Time estimates provided
- [ ] Risk assessment complete
- [ ] Human review received (recommended)
- [ ] Context budget: Still in Smart Zone (20-40%)

---

## 🚦 Transition to Phase 4

**Present to human for review**:

```
Task breakdown complete for [feature]! ✅

Summary:
- [X] total tasks
- [X] user stories covered
- [X] setup/config tasks
- [X] testing tasks
- [X] documentation tasks

Execution order:
- Phase 1 (Setup): [X] tasks - [X] minutes
- Phase 2 (Story 1): [X] tasks - [X] minutes
- Phase 3 (Story 2): [X] tasks - [X] minutes
- Phase 4 (Testing): [X] tasks - [X] minutes
- Phase 5 (Docs): [X] tasks - [X] minutes

Total estimated time: [X] hours

Parallel execution opportunities:
- [X] tasks can run in parallel
- Could reduce timeline by [X]%

📄 Full task breakdown: specs/[feature]/tasks.md

Ready to proceed to Phase 4 (Implementation)?
- If yes: Starting new session and beginning implementation
- If concerns: What needs adjustment?
```

**After approval**:

1. **Save progress**:
```markdown
# thoughts/shared/progress/[feature].md
- Tasks phase completed: [date]
- Total tasks: [X]
- Estimated timeline: [X] hours
- Ready for Phase 4: Yes
```

2. **End session for compaction**

3. **User starts new session and runs**: `/4_implement`

---

## 🎓 Tips & Best Practices

✅ **Small tasks** - Easier to test and review (30-60 min max)
✅ **Clear acceptance** - No ambiguity on "done"
✅ **Mark parallel** - Speeds up execution
✅ **Include tests** - Don't forget testing tasks
✅ **Document deps** - Execution order matters
✅ **Be realistic** - Honest time estimates

❌ **Don't make huge tasks** - Hard to test and track
❌ **Don't skip dependencies** - Causes blocking
❌ **Don't forget docs** - Future you needs them
❌ **Don't under-estimate** - Always add buffer

---

## 📚 Reference Files

- **Quick Reference**: `.ai/RPI_QUICKSTART.md`
- **Previous Phase**: `.ai/commands/2_plan.md`
- **Next Phase**: `.ai/commands/4_implement.md`
- **Spec**: `specs/[feature]/spec.md`
- **Plan**: `specs/[feature]/plan.md`

---

**Version**: 3.0.0 | **Last Updated**: 2026-01-08
**Estimated Time**: 45-60 minutes
**Context Budget**: 20-40% (Smart Zone)
