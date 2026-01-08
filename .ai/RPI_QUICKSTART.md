# RPI Quick Reference
**Research → Plan → Implement** | WellWave v3.0.0

## 🎯 When to Use RPI

**✅ USE RPI FOR:**
- New features or major enhancements
- Architectural changes
- Complex refactoring (>3 files)
- Medical template additions
- Anything requiring design decisions

**✅ SKIP RPI FOR:**
- Bug fixes (document after)
- Typos and documentation
- Dependency updates
- Single-file simple changes
- Test additions

---

## 📋 The 4 Phases

### **Phase 1: Research** (`/1_research`)
**Goal**: Gather context, resolve unknowns, validate approach
**Context**: 20-40% (Smart Zone)
**Output**: `specs/[feature]/research.md`
**End**: New session (compaction)

**Checklist**:
- [ ] Load `.ai/commands/1_research.md`
- [ ] Use codebase-analyzer sub-agent
- [ ] Use medical-validator (if medical feature)
- [ ] Apply FAR pattern (Find-Analyze-Resolve)
- [ ] Document all findings
- [ ] Identify risks and constraints
- [ ] Validate technical feasibility

---

### **Phase 2: Plan** (`/2_plan`)
**Goal**: Design architecture and create implementation plan
**Context**: 20-40% (Smart Zone)
**Output**: `specs/[feature]/spec.md`, `specs/[feature]/plan.md`
**End**: New session (compaction)

**Prerequisites**:
- ✅ `research.md` exists
- ✅ `constitution.md` read
- ✅ Medical compliance verified (if applicable)

**Checklist**:
- [ ] Load `.ai/commands/2_plan.md`
- [ ] Write `spec.md` (requirements, user stories)
- [ ] Run `/speckit.plan` to generate `plan.md`
- [ ] Apply FACTS validation:
  - **F**easibility - Can we build this?
  - **A**lignment - Matches constitution & existing architecture?
  - **C**ompleteness - All requirements covered?
  - **T**estability - Can we test it?
  - **S**ecurity - CFM/LGPD compliant?
- [ ] Document data model
- [ ] Document API contracts (if applicable)
- [ ] **🚦 MANDATORY: Get human approval**

---

### **Phase 3: Tasks** (`/3_tasks`)
**Goal**: Break plan into actionable tasks
**Context**: 20-40% (Smart Zone)
**Output**: `specs/[feature]/tasks.md`
**End**: New session (compaction)

**Prerequisites**:
- ✅ `spec.md` exists and approved
- ✅ `plan.md` exists and approved
- ✅ Human checkpoint approval received

**Checklist**:
- [ ] Load `.ai/commands/3_tasks.md`
- [ ] Run `/speckit.tasks` to generate `tasks.md`
- [ ] Verify task dependencies
- [ ] Mark parallel-safe tasks with `[P]`
- [ ] Estimate complexity
- [ ] Define acceptance criteria per task
- [ ] **Get human review** (recommended)

---

### **Phase 4: Implement** (`/4_implement`)
**Goal**: Execute implementation
**Context**: 40-60% (Working Zone, monitor closely)
**Output**: Working code, passing tests, updated docs
**End**: Complete (no new session needed)

**Prerequisites**:
- ✅ `spec.md`, `plan.md`, `tasks.md` all exist
- ✅ All checkpoints passed
- ✅ **Human final approval received**

**Checklist**:
- [ ] Load `.ai/commands/4_implement.md`
- [ ] Run `/speckit.implement`
- [ ] Execute tasks in dependency order
- [ ] Run tests after each significant change
- [ ] **Validation Loop**: Retry until all tests pass
- [ ] Update documentation
- [ ] Verify medical compliance (if applicable)

**Validation Loop**:
```
WHILE tests fail:
  1. Fix issues
  2. Re-run tests
  3. Continue until all pass
END WHILE
```

---

## 📊 Context Budget Management

| Zone | Range | Phase | Action |
|------|-------|-------|--------|
| **Smart** | 20-40% | Research, Plan, Tasks | ✅ Optimal, stay here |
| **Working** | 40-60% | Implementation | ⚠️ Monitor closely |
| **Danger** | 60-80% | Any | 🚨 Reduce immediately |
| **Critical** | 80-100% | Any | ❌ Emergency compact |

**Strategy**:
- Start **new session** between each phase (1→2, 2→3, 3→4)
- Compact **during implementation** only if context >60%
- **Emergency compact** if context >80%

---

## 🗂️ Progressive Disclosure (What to Load)

### **Level 1: Always (20-30%)**
- `CLAUDE.md`
- `memory/constitution.md`
- `AGENTS.md`

### **Level 2: Phase-Specific (add 10-20%)**
- Phase 1: Load `research.md` (if exists from previous attempt)
- Phase 2: Load `research.md` + write `spec.md`/`plan.md`
- Phase 3: Load `spec.md` + `plan.md`
- Phase 4: Load `spec.md` + `plan.md` + `tasks.md`

### **Level 3: Module-Specific (add 10-20%)**
Load ONLY when working in that module:
- Medical: `app/(dashboard)/anamnese/MODULE_GUIDELINES.md`
- Chat: `lib/ai/SERVICE_GUIDELINES.md`
- UI: `components/ui/DOMAIN_GUIDELINES.md`

### **Level 4: Session Memory (up to 60% total)**
- `thoughts/shared/research/[feature].md`
- `thoughts/shared/progress/[feature].md`

---

## 🔍 FAR Pattern (Phase 1: Research)

**Find-Analyze-Resolve** for unknowns:

1. **FIND** unknowns:
   - What parts of the codebase are affected?
   - What dependencies exist?
   - What are the risks?
   - What constraints apply?

2. **ANALYZE** each unknown:
   - Why is this unknown?
   - What information is needed?
   - Who/what can provide answers?

3. **RESOLVE** using:
   - Codebase analysis (explore agent)
   - Documentation review
   - Librarian agent (external docs)
   - Reverse prompting (ask better questions)
   - Human consultation

**Goal**: No unknowns remain before Phase 2

---

## ✅ FACTS Validation (Phase 2: Plan)

Before completing Phase 2, validate plan against FACTS:

- **F**easibility
  - Do we have the tech stack?
  - Are dependencies available?
  - Is timeline realistic?

- **A**lignment
  - Matches `constitution.md` principles?
  - Follows existing architecture patterns?
  - Uses approved tech stack?

- **C**ompleteness
  - All requirements covered?
  - Edge cases considered?
  - Error handling defined?

- **T**estability
  - Can we write unit tests?
  - Can we write E2E tests?
  - Are acceptance criteria measurable?

- **S**ecurity
  - CFM compliance (medical features)?
  - LGPD compliance (patient data)?
  - OWASP Top 10 considered?
  - Authentication/authorization correct?

**All must pass** before Phase 3

---

## 🚦 Mandatory Checkpoints

### **Checkpoint 1: Phase 2 → Phase 3**
**Trigger**: After `plan.md` created
**Required**: Human approval
**Questions**:
- Does the plan make sense?
- Is the architecture sound?
- Are there better approaches?
- Any concerns or risks?

**Action**: Get explicit "yes" before proceeding

### **Checkpoint 2: Phase 3 → Phase 4**
**Trigger**: After `tasks.md` created
**Required**: Human final approval
**Questions**:
- Are tasks complete and clear?
- Is execution order correct?
- Are estimates reasonable?
- Ready to implement?

**Action**: Get explicit "go ahead" before coding

---

## 🛠️ Command Quick Reference

```bash
# Create new feature structure
./scripts/setup-plan.sh [feature-name]

# Validate SPECS exist
./scripts/validate-specs-strict.sh

# Check environment
./scripts/check-prerequisites.sh

# Phase commands (in AI chat)
/1_research      # Start research phase
/2_plan          # Start planning phase
/3_tasks         # Generate task breakdown
/4_implement     # Execute implementation

# Spec-Kit integration
/speckit.plan       # Generate plan.md from spec.md
/speckit.tasks      # Generate tasks.md from plan.md
/speckit.implement  # Execute tasks from tasks.md
```

---

## 🚨 Common Mistakes to Avoid

❌ **Skipping research phase** → Unknown unknowns cause failures
❌ **Bypassing human checkpoints** → Misaligned implementation
❌ **Not managing context** → Context overflow, lost information
❌ **Continuing without SPECS** → Enforcement blocks commit
❌ **Ignoring medical compliance** → CFM/LGPD violations
❌ **Rushing through phases** → Technical debt accumulates
❌ **Not using validation loop** → Broken tests committed

---

## 💡 Pro Tips

✅ **Use sub-agents** liberally in Phase 1 (they're cheap)
✅ **Reverse prompting** when stuck (ask better questions)
✅ **Small tasks** are better than large ones (easier to test)
✅ **Mark parallel tasks** with `[P]` (faster execution)
✅ **New session between phases** (fresh context)
✅ **Load only what's needed** (Progressive Disclosure)
✅ **Tests first** when possible (TDD approach)

---

## 📚 More Information

- **Detailed guide**: `.ai/PLAYBOOK.md`
- **Core rules**: `CLAUDE.md`
- **Navigation**: `AGENTS.md`
- **Phase details**: `.ai/commands/[1-4]_*.md`
- **Project principles**: `memory/constitution.md`

---

**Questions?** Load the appropriate reference file or ask for human guidance.

**Version**: 3.0.0 | **Last Updated**: 2026-01-08
