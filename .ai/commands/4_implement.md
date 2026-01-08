# Phase 4: Implement (`/4_implement`)
**Goal**: Execute implementation following task breakdown

---

## 🎯 Objectives

By the end of this phase, you should have:
1. ✅ All tasks completed in correct order
2. ✅ All tests passing (validation loop)
3. ✅ Code reviewed and refactored
4. ✅ Documentation updated
5. ✅ Medical compliance verified (if applicable)
6. ✅ Feature ready for deployment

---

## 📋 Prerequisites

Before starting this phase:
- [x] Phases 1-3 completed
- [x] `specs/[feature]/spec.md` exists and approved
- [x] `specs/[feature]/plan.md` exists and approved
- [x] `specs/[feature]/tasks.md` exists and complete
- [x] All checkpoints passed
- [x] Human final approval received
- [x] Context budget: 40-60% OK (Working Zone)
- [x] Fresh session started (after Phase 3 compaction)

---

## 🔍 Step-by-Step Process

### **Step 1: Load Required Context (5 min)**

**Load these files**:
```
✅ CLAUDE.md (already loaded)
✅ specs/[feature]/spec.md
✅ specs/[feature]/plan.md
✅ specs/[feature]/tasks.md
```

**Optional (load only when working in that module)**:
```
⚡ app/(dashboard)/anamnese/MODULE_GUIDELINES.md (medical features)
⚡ lib/ai/SERVICE_GUIDELINES.md (AI features)
⚡ components/ui/DOMAIN_GUIDELINES.md (UI components)
```

**Monitor context**: Can reach 50-60% during implementation

---

### **Step 2: Use Spec-Kit Implement (10 min)**

**Run the existing `/speckit.implement` command**:

```
/speckit.implement

This will:
- Load tasks from tasks.md
- Execute in dependency order
- Respect parallel execution markers [P]
- Track progress
- Run tests after each significant change
```

**OR manually execute tasks following the process below**

---

### **Step 3: Execute Tasks in Dependency Order**

**For each task**:

1. **Read task details**:
   - Description
   - Files to create/modify
   - Steps to follow
   - Dependencies
   - Acceptance criteria

2. **Verify dependencies met**:
   ```
   Check: All prerequisite tasks completed
   ```

3. **Implement the task**:
   - Follow steps exactly
   - Use patterns from similar code
   - Follow constitution standards
   - Add TypeScript types
   - Include error handling

4. **Write/update tests**:
   - Unit tests (Vitest)
   - Integration tests (if API route)
   - Update existing tests if needed

5. **Run tests immediately**:
   ```bash
   # For specific file
   pnpm vitest run path/to/file.test.ts
   
   # For all tests
   pnpm vitest run
   ```

6. **Validation loop** (CRITICAL):
   ```
   WHILE tests fail:
     1. Read test error messages
     2. Identify root cause
     3. Fix the issue
     4. Re-run tests
     5. REPEAT until ALL tests pass
   END WHILE
   ```

7. **Mark task complete**:
   ```markdown
   ### Task X.X: [Task name]
   **Status**: ✅ COMPLETE
   **Completed**: [timestamp]
   **Tests**: ✅ PASSING
   ```

8. **Update progress tracking**:
   ```markdown
   # thoughts/shared/progress/[feature].md
   
   ## Implementation Progress
   - [x] Task 1.1: Database migration
   - [x] Task 1.2: Environment variables
   - [ ] Task 2.1: Create component
   - [ ] Task 2.2: Create API route
   ...
   ```

---

### **Step 4: Handle Test Failures**

**When tests fail** (and they will):

1. **Don't panic** - This is expected and normal

2. **Read the error carefully**:
   ```
   FAIL  path/to/file.test.ts
   ● Test suite failed to run
   
   Error: [ERROR MESSAGE]
   at [FILE]:[LINE]
   ```

3. **Identify the issue**:
   - Syntax error?
   - Type error?
   - Logic error?
   - Missing mock?
   - Wrong import?

4. **Fix the root cause** (not the symptom)

5. **Re-run tests**:
   ```bash
   pnpm vitest run
   ```

6. **Repeat until green** ✅

**DO NOT PROCEED** to next task until tests pass

---

### **Step 5: Code Quality Checks**

After each task (or group of related tasks):

1. **Type checking**:
   ```bash
   pnpm typecheck
   ```

2. **Linting**:
   ```bash
   pnpm lint
   ```

3. **Formatting**:
   ```bash
   pnpm format
   ```

4. **Fix any issues before continuing**

---

### **Step 6: Medical Compliance Verification** *(If applicable)*

For medical features, verify:

- [ ] **CFM Compliance**:
  - Medical terminology accurate
  - Documentation standards met
  - Professional language used

- [ ] **LGPD Compliance**:
  - Patient data encrypted
  - Privacy controls implemented
  - Audit trail in place

- [ ] **Red Flags Detection**:
  - Critical alerts functional
  - Warning system working
  - Medical validation correct

- [ ] **EBM References**:
  - Evidence-based sources cited
  - Medical accuracy verified

**Load**: `app/(dashboard)/anamnese/MODULE_GUIDELINES.md` for standards

---

### **Step 7: E2E Testing**

After all implementation tasks complete:

1. **Run E2E tests**:
   ```bash
   pnpm playwright test
   ```

2. **Fix any failures** (validation loop):
   ```
   WHILE E2E tests fail:
     1. Watch test replay
     2. Identify failing step
     3. Fix the issue
     4. Re-run tests
   END WHILE
   ```

3. **Manual testing** (critical user flows):
   - Test on Chrome, Firefox, Safari
   - Test on mobile (responsive)
   - Test keyboard navigation (accessibility)
   - Test screen reader (if applicable)
   - Verify no console errors

---

### **Step 8: Documentation Updates**

1. **Update README** (if public-facing feature):
   ```markdown
   ## New Feature: [Feature Name]
   [Brief description]
   [How to use]
   ```

2. **Update relevant docs**:
   - `docs/[relevant].md`
   - API documentation
   - Architecture docs (if changed)

3. **Add JSDoc comments**:
   ```typescript
   /**
    * [Function description]
    * @param {Type} paramName - [Description]
    * @returns {ReturnType} [Description]
    * @example
    * const result = functionName(param);
    */
   ```

4. **Update CHANGELOG.md**:
   ```markdown
   ## [Unreleased]
   ### Added
   - [Feature name]: [Brief description] (#PR-number)
   ```

---

### **Step 9: Final Validation**

Before declaring complete:

- [ ] **All tasks completed**
- [ ] **All unit tests passing**
- [ ] **All integration tests passing**
- [ ] **All E2E tests passing**
- [ ] **Type checking passes**
- [ ] **Linting passes**
- [ ] **Code formatted**
- [ ] **Medical compliance verified** (if applicable)
- [ ] **Documentation updated**
- [ ] **No console errors**
- [ ] **Accessibility checked**
- [ ] **Manual testing complete**

**Run full test suite one final time**:
```bash
pnpm typecheck && pnpm lint && pnpm vitest run && pnpm playwright test
```

**ALL MUST PASS** ✅

---

### **Step 10: Pre-Commit Validation**

1. **Stage changes**:
   ```bash
   git add .
   ```

2. **Commit** (validation runs automatically):
   ```bash
   git commit -m "feat([feature]): [description]
   
   - [Change 1]
   - [Change 2]
   
   Closes #[issue-number]"
   ```

3. **Pre-commit hook runs**:
   - Validates SPECS exist ✅
   - Runs linting
   - Runs type checking
   - Blocks if any fail ❌

4. **If blocked**:
   - Fix the issues
   - Re-commit
   - Repeat until passes

5. **Push to remote**:
   ```bash
   git push
   ```

6. **CI/CD runs**:
   - SPECS validation
   - All tests
   - Build verification
   - Blocks merge if any fail

---

## ✅ Phase 4 Completion Checklist

Feature is DONE when:

- [ ] All tasks from `tasks.md` completed
- [ ] All acceptance criteria met
- [ ] All tests passing (unit + integration + E2E)
- [ ] Type checking passes
- [ ] Linting passes
- [ ] Code formatted
- [ ] Medical compliance verified (if applicable)
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] Manual testing complete
- [ ] No regressions introduced
- [ ] Pre-commit validation passes
- [ ] CI/CD pipeline passes
- [ ] Ready for code review

---

## 🔄 The Validation Loop (Critical)

```
┌─────────────────────────────────┐
│   Implement Task                │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│   Run Tests                     │
└──────────┬──────────────────────┘
           │
           ▼
       Tests Pass?
           │
    ┌──────┴──────┐
    │             │
   Yes            No
    │             │
    │             ▼
    │      ┌──────────────────┐
    │      │  Read Errors     │
    │      └────────┬─────────┘
    │               │
    │               ▼
    │      ┌──────────────────┐
    │      │  Fix Issues      │
    │      └────────┬─────────┘
    │               │
    │               ▼
    │      ┌──────────────────┐
    │      │  Re-run Tests    │
    │      └────────┬─────────┘
    │               │
    │               └─────────┐
    │                         │
    ▼                         │
┌─────────────────────┐       │
│  Mark Task Complete │       │
└─────────────────────┘       │
           │                  │
           ▼                  │
     Next Task ───────────────┘
```

**KEY PRINCIPLE**: Never move forward with failing tests

---

## 🎓 Tips & Best Practices

### **General**
✅ **Follow the plan** - Don't improvise major changes
✅ **Test immediately** - Don't accumulate untested code
✅ **Small commits** - Easier to revert if needed
✅ **Clear messages** - Future you needs context
✅ **Ask if stuck** - Don't waste hours guessing

### **Testing**
✅ **Read error messages** - They tell you what's wrong
✅ **Fix root cause** - Not just symptoms
✅ **Run often** - Catch issues early
✅ **Cover edge cases** - That's where bugs hide

### **Code Quality**
✅ **Use TypeScript** - Catch errors at compile time
✅ **Add comments** - Explain "why", not "what"
✅ **Follow patterns** - Match existing codebase style
✅ **Refactor as you go** - Don't create technical debt

### **Medical Features**
✅ **Double-check** - Medical accuracy is critical
✅ **Load guidelines** - Follow MODULE_GUIDELINES.md
✅ **Verify compliance** - CFM/LGPD requirements
✅ **Test thoroughly** - Lives may depend on it

### **Avoid**
❌ **Don't skip tests** - You'll regret it later
❌ **Don't commit broken code** - Breaks others' work
❌ **Don't ignore warnings** - They become errors
❌ **Don't rush** - Quality over speed
❌ **Don't bypass validation** - It's there for a reason

---

## 🆘 Troubleshooting

### **"Tests are failing and I don't know why"**
1. Read the full error message
2. Check the stack trace
3. Add `console.log()` to debug
4. Verify mocks are correct
5. Check imports are correct
6. Ask for help if stuck >30 min

### **"Type errors everywhere"**
1. Run `pnpm prisma generate` (if DB changes)
2. Restart TypeScript server
3. Check imports
4. Verify types are exported
5. Run `pnpm typecheck` for full list

### **"Context budget exceeded"**
1. Save progress to `thoughts/shared/progress/[feature].md`
2. Create handoff document
3. Start new session
4. Load only what's needed for current task

### **"Feature works but tests fail"**
1. Tests might be correct, code might be wrong
2. Re-read acceptance criteria
3. Verify test expectations match spec
4. Fix code to match spec (not tests to match code)

---

## 🎉 Completion

**When all checklist items pass**:

```
Implementation complete for [feature]! 🎉

Summary:
- [X] tasks completed
- [X] tests passing
- [X] lines of code added/modified
- [X] files changed

Test Results:
✅ Unit tests: [X] passing
✅ Integration tests: [X] passing
✅ E2E tests: [X] passing
✅ Type checking: PASS
✅ Linting: PASS

Documentation:
✅ README updated
✅ Docs updated
✅ CHANGELOG updated
✅ Code commented

Compliance:
✅ CFM compliance verified (if medical)
✅ LGPD compliance verified
✅ Security reviewed

Ready for:
- Code review
- QA testing
- Deployment to staging

Next steps:
1. Create PR
2. Request code review
3. Address feedback
4. Merge to main
5. Deploy to production

Great work! 🚀
```

---

## 📚 Reference Files

- **Quick Reference**: `.ai/RPI_QUICKSTART.md`
- **Previous Phase**: `.ai/commands/3_tasks.md`
- **Core Rules**: `CLAUDE.md`
- **Spec**: `specs/[feature]/spec.md`
- **Plan**: `specs/[feature]/plan.md`
- **Tasks**: `specs/[feature]/tasks.md`

---

**Version**: 3.0.0 | **Last Updated**: 2026-01-08
**Estimated Time**: Varies (depends on complexity)
**Context Budget**: 40-60% (Working Zone) - monitor closely
**Critical**: VALIDATION LOOP - tests must pass before advancing
