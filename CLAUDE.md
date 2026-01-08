# CLAUDE.md - WellWave AI Configuration
**v3.0.0** | 2026-01-08 | Healthcare Emergency Anamnesis System

## 🚨 ABSOLUTE RULE: NO SPEC = NO CODE
```
NEVER write production code without approved specs.
NEVER bypass RPI workflow for new features.
NEVER make architectural changes without updating specs.
```
**Enforcement**: Pre-commit + CI/CD + Cursor rules

## Core Responsibilities
1. **SPECS-first** - Verify before code
2. **Context 20-40%** - Smart Zone management
3. **Medical compliance** - CFM/LGPD regulations
4. **Test-driven** - Pass before advancing
5. **Human approval** - Mandatory checkpoints

## RPI Framework (Research → Plan → Implement)

### When to Use RPI
✅ **Use**: New features, arch changes, complex refactor (>3 files), medical templates
✅ **Skip**: Bug fixes, typos, docs, deps, simple single-file changes

### Phase 1: Research (`/1_research`)
**Goal**: Gather context, resolve unknowns
1. Load `.ai/commands/1_research.md`
2. Use sub-agents: `codebase-analyzer`, `medical-validator`
3. Apply FAR (Find-Analyze-Resolve)
4. Output: `specs/[feature]/research.md`
5. Context: 20-40% | End: New session

### Phase 2: Plan (`/2_plan`)
**Goal**: Design architecture
**Prerequisites**: ✅ research.md ✅ constitution.md ✅ medical compliance
1. Load `.ai/commands/2_plan.md` + use `/speckit.plan`
2. Apply FACTS validation
3. Output: `spec.md`, `plan.md`
4. Context: 20-40%
5. **🚦 CHECKPOINT**: Human approval required
6. End: New session

### Phase 3: Tasks (`/3_tasks`)
**Goal**: Break into actionable tasks
**Prerequisites**: ✅ spec.md ✅ plan.md ✅ human approval
1. Load `.ai/commands/3_tasks.md` + use `/speckit.tasks`
2. Output: `tasks.md` (dependencies, `[P]` parallel)
3. **Optional**: Run `pnpm kanban:migrate:spec [feature]` to sync to Vibe Kanban
4. Context: 20-40% | End: New session

### Phase 4: Implement (`/4_implement`)
**Goal**: Execute implementation
**Prerequisites**: ✅ spec.md ✅ plan.md ✅ tasks.md ✅ checkpoints ✅ final approval
1. Load `.ai/commands/4_implement.md` + use `/speckit.implement`
2. Execute in dependency order, test after each change
3. Context: Up to 60% (monitor)
4. Validation loop: Retry until tests pass
5. End: Complete (no new session)

## Context Budget Zones
| Zone | Range | Status | Action |
|------|-------|--------|--------|
| Smart | 20-40% | ✅ | Stay here (research/planning) |
| Working | 40-60% | ⚠️ | OK for implementation |
| Danger | 60-80% | 🚨 | Reduce immediately |
| Critical | 80-100% | ❌ | Emergency compaction |

## Progressive Disclosure (4 Levels)
**L1 (Always 20-30%)**: `CLAUDE.md`, `constitution.md`, `AGENTS.md`
**L2 (On-demand +10-20%)**: `spec.md`, `plan.md`, `tasks.md`
**L3 (Module +10-20%)**: `MODULE_GUIDELINES.md` (load only when in module)
**L4 (Session ≤60%)**: `thoughts/shared/research/`, `progress/`

**Compaction**: New session between RPI phases | During impl if >60% | Emergency if >80%

## Pre-Implementation Checklist
- [ ] `constitution.md` read
- [ ] `spec.md` approved
- [ ] `plan.md` validated
- [ ] `tasks.md` complete
- [ ] Checkpoint approval (Phase 2→3)
- [ ] Final approval (Phase 3→4)
- [ ] Medical compliance (if applicable)

**If unchecked**: STOP. Create specs first.

## Automated Enforcement
**Pre-commit**: `scripts/validate-specs-strict.sh` (blocks commits)
**CI/CD**: `.github/workflows/specs-validation.yml` (blocks PRs)
**Cursor**: `.cursor/rules/specs-enforcer.mdc` (IDE validation)

## Error Messages

### No Specs
```
⚠️ Specification required. Run: ./scripts/setup-plan.sh [feature]
Then: 1) Edit spec.md 2) /speckit.plan 3) /speckit.tasks 4) Get approval 5) /speckit.implement
```

### Specs Outdated
```
⚠️ Update specs/[feature]/spec.md first.
Then: 1) /speckit.plan 2) /speckit.tasks 3) Continue
```

## Medical Compliance
**CFM** compliance | **LGPD** privacy | **Red flags** detection | **EBM** sources | **Professional** language
**Load**: `app/(dashboard)/anamnese/MODULE_GUIDELINES.md` when needed

## Quick Reference

### Commands
`/1_research` | `/2_plan` | `/3_tasks` | `/4_implement` | `/speckit.plan` | `/speckit.tasks` | `/speckit.implement`

### Files
`memory/constitution.md` | `AGENTS.md` | `.ai/PLAYBOOK.md` | `.ai/RPI_QUICKSTART.md` | `specs/[feature]/`

### Scripts
`./scripts/setup-plan.sh [feature]` | `./scripts/validate-specs-strict.sh` | `./scripts/check-prerequisites.sh`

### Vibe Kanban
`pnpm kanban:migrate` | `pnpm kanban:sync` - Gerenciamento de tarefas visual
**Docs**: `docs/VIBE_KANBAN.md`

---
**Specs are the foundation. Without specs, there is no code.**
**Detailed guidance**: `.ai/PLAYBOOK.md`, `AGENTS.md`
