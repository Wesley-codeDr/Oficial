# AGENTS.md - WellWave AI Agent Navigation Index
**v3.0.0** | 2026-01-08 | Quick Reference & Navigation

## Quick Start

**New to this project?** Start here:
1. Read `CLAUDE.md` (core rules - 122 lines)
2. Read `memory/constitution.md` (project principles)
3. Use `.ai/RPI_QUICKSTART.md` for workflow reference
4. See `.ai/PLAYBOOK.md` for comprehensive guidance

## RPI Workflow Commands

| Command | Phase | File | Description |
|---------|-------|------|-------------|
| `/1_research` | Research | `.ai/commands/1_research.md` | Gather context, resolve unknowns |
| `/2_plan` | Plan | `.ai/commands/2_plan.md` | Design architecture, create specs |
| `/3_tasks` | Tasks | `.ai/commands/3_tasks.md` | Break down into actionable tasks |
| `/4_implement` | Implement | `.ai/commands/4_implement.md` | Execute implementation |

## Spec-Kit Integration

| Command | Description | Used In |
|---------|-------------|---------|
| `/speckit.plan` | Generate `plan.md` from `spec.md` | Phase 2 (Planning) |
| `/speckit.tasks` | Generate `tasks.md` from `plan.md` | Phase 3 (Tasks) |
| `/speckit.implement` | Execute tasks from `tasks.md` | Phase 4 (Implementation) |

## Core Documentation

### Always Load (Level 1 - 20-30% context)
- **CLAUDE.md** - Core rules, RPI framework, context management
- **memory/constitution.md** - Project principles and standards
- **AGENTS.md** (this file) - Navigation index

### Load on Demand (Level 2 - +10-20% context)
- **specs/[feature]/spec.md** - Feature specification
- **specs/[feature]/plan.md** - Implementation plan
- **specs/[feature]/tasks.md** - Task breakdown
- **specs/[feature]/research.md** - Research findings

### Module-Specific (Level 3 - +10-20% context)
Load only when working in specific module:
- **app/(dashboard)/anamnese/MODULE_GUIDELINES.md** - Medical anamnesis rules
- **app/(dashboard)/chat/MODULE_GUIDELINES.md** - EBM chat rules
- **app/(auth)/MODULE_GUIDELINES.md** - Authentication rules
- **components/medical/DOMAIN_GUIDELINES.md** - Medical components
- **components/ui/DOMAIN_GUIDELINES.md** - UI components
- **lib/ai/SERVICE_GUIDELINES.md** - AI integration

### Session Memory (Level 4 - up to 60% total)
- **thoughts/shared/research/[feature].md** - Research session memory
- **thoughts/shared/progress/[feature].md** - Implementation progress
- **thoughts/shared/handoffs/[date]-[feature].md** - Session handoffs
- **thoughts/shared/plans-archive/[feature].md** - Archived plans

## Sub-Agents

Located in `.ai/agents/`:
- **codebase-analyzer.md** - Analyzes existing codebase patterns
- **medical-validator.md** - Validates CFM/LGPD compliance
- **spec-enforcer.md** - Enforces SPECS-first workflow

## Enforcement Mechanisms

### Pre-Commit Validation
**Script**: `scripts/validate-specs-strict.sh`
- Detects modified production files
- Verifies specs exist for affected features
- Blocks commits if specs missing
- Runs automatically via `.husky/pre-commit`

### CI/CD Validation
**Workflow**: `.github/workflows/specs-validation.yml`
- Runs on all PRs and pushes
- Validates spec structure
- Checks CLAUDE.md size (<200 lines)
- Blocks merge if validation fails

### IDE Validation
**Cursor Rule**: `.cursor/rules/specs-enforcer.mdc`
- Real-time validation in Cursor IDE
- Shows violation messages
- Prevents code without specs
- Auto-loads module-specific guidelines

## Scripts & Tools

### Setup & Validation
```bash
./scripts/check-prerequisites.sh          # Check environment
./scripts/setup-plan.sh [feature]         # Create new feature
./scripts/validate-specs-strict.sh        # Validate specs
./scripts/setup-database.sh               # Configure database
./scripts/docker-db.sh [start|stop]       # Manage local DB
```

### Development
```bash
pnpm dev                                  # Start dev server
pnpm build                                # Production build
pnpm test                                 # Run tests
pnpm typecheck                            # TypeScript validation
pnpm lint                                 # ESLint
pnpm format                               # Prettier
```

### Database
```bash
pnpm prisma generate                      # Generate Prisma client
pnpm prisma migrate dev                   # Create & apply migrations
pnpm prisma studio                        # Open Prisma Studio
pnpm db:seed                              # Seed database
```

## Tech Stack Quick Reference

**Frontend**: Next.js 16 (App Router), React 19, TypeScript 5.9, Tailwind CSS 4, shadcn/ui
**Backend**: Next.js API Routes (serverless)
**Database**: PostgreSQL (Supabase) + Prisma ORM 6
**Auth**: Supabase Auth
**AI**: Vercel AI SDK + OpenAI GPT-4
**State**: Zustand + TanStack Query
**Testing**: Vitest (unit), Playwright (E2E)
**Monitoring**: Sentry
**CI/CD**: GitHub Actions
**Deploy**: Vercel

## Project Structure Navigation

```
.ai/                          # AI configuration hub
├── commands/                 # RPI phase commands
├── agents/                   # Sub-agents
├── PLAYBOOK.md              # Comprehensive guide
└── RPI_QUICKSTART.md        # Quick reference

app/                          # Next.js App Router
├── (auth)/                  # Public routes (login, signup)
├── (dashboard)/             # Protected routes
│   ├── anamnese/           # Anamnesis generator
│   ├── chat/               # EBM chat
│   └── history/            # Session history
└── api/                     # API routes

components/                   # React components
├── ui/                      # shadcn/ui components
├── medical/                 # Medical-specific
└── layout/                  # Layout components

lib/                         # Utilities & services
├── ai/                      # LLM integration
├── db/                      # Prisma client
├── templates/               # Medical templates
└── utils/                   # Helpers

memory/                      # Project memory
└── constitution.md          # Core principles

specs/                       # Specifications
└── [feature]/
    ├── spec.md             # Feature specification
    ├── plan.md             # Implementation plan
    ├── tasks.md            # Task breakdown
    └── research.md         # Research findings

thoughts/                    # Session memory
└── shared/
    ├── research/           # Research outputs
    ├── progress/           # Implementation tracking
    ├── handoffs/           # Session transitions
    └── plans-archive/      # Archived plans
```

## Medical Compliance Checklist

When working on medical features:
- [ ] CFM compliance verified
- [ ] LGPD privacy requirements met
- [ ] Red flags detection implemented
- [ ] EBM sources referenced
- [ ] Professional medical terminology used
- [ ] Medical validator sub-agent consulted
- [ ] Module guidelines loaded

**Load**: Appropriate `MODULE_GUIDELINES.md` for medical features

## Context Management Zones

| Zone | Range | Status | Action |
|------|-------|--------|--------|
| **Smart** | 20-40% | ✅ Optimal | Research & planning |
| **Working** | 40-60% | ⚠️ Caution | Implementation OK |
| **Danger** | 60-80% | 🚨 High Risk | Reduce context |
| **Critical** | 80-100% | ❌ Failure | Emergency compact |

**Strategy**: New session between RPI phases | During impl if >60% | Emergency if >80%

## Troubleshooting

### "No spec exists for this feature"
```bash
./scripts/setup-plan.sh [feature-name]
# Then edit specs/[feature]/spec.md
```

### "Context budget exceeded"
1. Save progress to `thoughts/shared/progress/[feature].md`
2. Create handoff: `thoughts/shared/handoffs/[date]-[feature].md`
3. Start new session
4. Load handoff + continue

### "Tests failing"
1. Fix issues identified by tests
2. Re-run tests: `pnpm test`
3. Repeat until all pass (validation loop)
4. Do not advance until tests pass

### "Medical compliance unclear"
1. Load `app/(dashboard)/anamnese/MODULE_GUIDELINES.md`
2. Consult `.ai/agents/medical-validator.md`
3. Reference CFM documentation
4. Get human review before proceeding

## Rules Summary

1. **NO SPEC = NO CODE** (absolute rule)
2. **Context 20-40%** (Smart Zone for research/planning)
3. **Clean sessions** (between RPI phases)
4. **Human checkpoints** (mandatory Phase 2→3, 3→4)
5. **Tests pass** (before advancing)
6. **Medical compliance** (CFM/LGPD for healthcare features)
7. **Progressive disclosure** (load only what's needed)
8. **Validation loop** (retry until tests pass)

## Getting Help

- **Quick reference**: `.ai/RPI_QUICKSTART.md`
- **Detailed guide**: `.ai/PLAYBOOK.md`
- **Core rules**: `CLAUDE.md`
- **Project principles**: `memory/constitution.md`
- **Workflow details**: `.ai/commands/[1-4]_*.md`

---

**Remember**: This is a navigation index. Detailed instructions are in the referenced files. Load them on-demand using Progressive Disclosure to manage context budget.
