<!--
SYNC IMPACT REPORT
==================
Version Change: 1.0.0 → 2.0.0 (MAJOR)
Last Amended: 2024-12-08
Ratification Date: 2024-12-08

Modified Principles:
- "Code Quality" → "Code Quality & Medical Precision"
- "Security" → "Security & Healthcare Compliance"
- Added: "Apple Design Language 2025"
- Added: "AI-First Architecture"
- Added: "Healthcare Domain Integrity"

Added Sections:
- Project Identity
- Design Principles (Apple Design Language 2025)
- AI/LLM Guidelines
- Healthcare Compliance Standards
- Non-Functional Requirements
- Quality Gates

Removed Sections: None

Templates Updated:
- specs/wellwave-platform/spec.md ✅
- specs/wellwave-platform/research.md ✅
- docs/PRD.md ✅

Follow-up TODOs: None
-->

# Constitution

**Project:** WellWave - Plataforma de Anamnese Digital com IA para Emergências
**Version:** 2.0.0
**Ratification Date:** 2024-12-08
**Last Amended:** 2024-12-08

This document defines the core principles, rules, and guidelines that govern how this project is developed. All development work MUST adhere to these principles without exception.

---

## Project Identity

**Name:** WellWave
**Vision:** Criar a plataforma de anamnese digital mais rápida, segura e inteligente do mercado, convertendo seleções objetivas em textos médicos completos, consistentes com a prática clínica e juridicamente blindados.
**Slogan:** "De checkboxes a narrativa médica perfeita em segundos."

---

## Core Principles

### 1. Spec-Driven Development

All features MUST start with a specification document. This is **non-negotiable**.

- Specifications MUST exist before any code is written
- Specifications MUST be approved before implementation begins
- Implementation MUST follow the approved specification exactly
- Changes to approved specs require formal amendment process

**Rationale:** Prevents scope creep, ensures alignment, and creates auditable documentation for healthcare compliance.

### 2. Code Quality & Medical Precision

Code MUST be readable, maintainable, and medically accurate.

- Follow TypeScript strict mode with no `any` types in production code
- Use descriptive naming that reflects medical domain terminology
- Write self-documenting code; comments for complex medical logic only
- All medical terminology MUST use standardized codes (CID-10, LOINC, TUSS)

**Rationale:** Medical software requires precision. Ambiguity in code can translate to ambiguity in clinical documentation.

### 3. Testing

All features MUST have comprehensive tests appropriate to their risk level.

- Unit tests: ≥80% coverage for business logic
- Integration tests: All API endpoints and database operations
- E2E tests: Critical user flows (anamnese generation, authentication)
- Medical validation tests: Template outputs MUST be reviewed by clinical consultants

**Rationale:** Healthcare software failure can impact patient safety. Testing is not optional.

### 4. Documentation

Documentation MUST be maintained alongside code.

- API documentation via OpenAPI/Swagger, auto-generated from code
- Component documentation via Storybook for UI components
- Medical templates documented with CFM compliance notes
- README files maintained for each major module

**Rationale:** Healthcare audits require documentation trails. Self-documenting code is not sufficient.

### 5. Security & Healthcare Compliance

Security is paramount. This is a healthcare application handling sensitive data.

- LGPD compliance is mandatory; all data processing MUST have legal basis
- CFM/SBIS standards for electronic medical records
- Encryption: AES-256 at rest, TLS 1.3 in transit
- Audit logs for ALL data access and modifications
- No PHI (Protected Health Information) in logs, errors, or analytics
- Dependencies MUST be reviewed for security vulnerabilities weekly

**Rationale:** Healthcare data breaches have legal consequences. Security is not a feature; it's a requirement.

### 6. Performance

The application MUST be fast enough for emergency department use.

- Initial load: < 2 seconds on hospital network bandwidth
- Text generation response: < 1.5 seconds
- Complete anamnese flow: < 90 seconds end-to-end
- Uptime target: ≥ 99.9%

**Rationale:** Emergency physicians work under extreme time pressure. Slow software costs lives.

### 7. Apple Design Language 2025

All UI MUST follow Apple Design Language 2025 principles. This is a **hard requirement**.

- Glassmorphism: blur (20px), transparency (30% white), layered surfaces
- Typography: Inter (SF Pro equivalent), weights 400-700, proper scale
- Border radius: 8px buttons, 12-20px cards, 28px large containers
- Motion: Spring physics (stiffness: 300, damping: 30), never jarring
- Colors: Neutral base with Apple accent palette (#007AFF, #34C759, #FF3B30)
- Dark mode: Optimized for low-light clinical environments

**Rationale:** Consistent, beautiful UI increases adoption. Apple design reduces cognitive load.

### 8. AI-First Architecture

AI is central to the product. LLM integrations MUST be designed for reliability.

- Streaming: All text generation MUST use SSE for real-time feedback
- Fallbacks: Every AI call MUST have a deterministic fallback
- Guardrails: Medical AI responses MUST include confidence indicators
- Citations: EBM responses MUST include PMID/DOI references
- Cost awareness: Monitor token usage; optimize prompts for efficiency

**Rationale:** AI failures should degrade gracefully. Never leave users with a blank screen.

### 9. Healthcare Domain Integrity

The application MUST respect medical domain rules at all times.

- Medical templates MUST be reviewed by licensed physicians
- Red flags MUST always be displayed; never hidden or minimized
- Negative findings MUST be explicitly documented (legal protection)
- CID-10, LOINC, TUSS codes MUST be validated against official databases
- Time-critical protocols (Sepsis, SCA, AVE) MUST surface prominently

**Rationale:** This is clinical software. Domain integrity is patient safety.

---

## Development Workflow

**CRITICAL: This workflow is MANDATORY and cannot be skipped.**

### Phase 1: Specification
- Create or update specification document
- MUST exist before any code is written
- MUST be approved before proceeding
- Location: `specs/[feature-name]/spec.md`

### Phase 2: Planning
- Create implementation plan based on specification
- MUST exist before implementation begins
- Generated using `/speckit.plan` command
- Location: `specs/[feature-name]/plan.md`

### Phase 3: Tasks
- Break down plan into actionable tasks
- MUST exist before implementation begins
- Generated using `/speckit.tasks` command
- Location: `specs/[feature-name]/tasks.md`

### Phase 4: Implementation
- Implement following the tasks
- MUST follow tasks in order
- MUST respect dependencies
- Use `/speckit.implement` command

### Phase 5: Review
- Code review and testing
- All tests MUST pass
- Code MUST follow constitution
- Architecture MUST match plan

### Phase 6: Documentation
- Update documentation as needed
- Keep README updated
- Document APIs
- Update Storybook components

---

## Technology Stack

### Frontend
| Component | Technology | Version Policy |
|-----------|------------|----------------|
| Framework | Next.js (App Router) | Latest stable (15.x+) |
| UI Library | React | Latest stable |
| Styling | Tailwind CSS + shadcn/ui | Latest stable |
| Components | Radix UI | Latest stable |
| Animations | Framer Motion | Latest stable |
| State | Zustand + TanStack Query | Latest stable |
| Design System | Custom (Apple Design 2025) | Internal |

### Backend
| Component | Technology | Version Policy |
|-----------|------------|----------------|
| Framework | NestJS + Fastify | Latest LTS |
| Runtime | Node.js | Latest LTS (Vercel-compatible) |
| ORM | Prisma | Latest stable |
| Database | PostgreSQL | Via Supabase |

### Infrastructure
| Component | Technology |
|-----------|------------|
| Hosting | Vercel (frontend + edge) |
| Backend Services | Supabase (Postgres, Auth, Storage) |
| Observability | Sentry |
| CI/CD | GitHub Actions |

### AI/ML
| Component | Technology |
|-----------|------------|
| LLM Provider | OpenAI (or compatible) |
| Orchestration | Vercel AI SDK + LangChain |
| Streaming | Server-Sent Events (SSE) |

### Compliance & Security
| Standard | Requirement |
|----------|-------------|
| Authentication | Supabase Auth (future: hospital SSO) |
| Encryption | AES-256 at rest, TLS 1.3 in transit |
| Data Privacy | LGPD compliant |
| Medical Records | CFM/SBIS standards |
| Insurance | ANS/TISS/TUSS |

### Interoperability
| Standard | Usage |
|----------|-------|
| Health Data | HL7 FHIR R4 |
| Insurance | TISS/TUSS |
| Diagnostics | CID-10 |
| Lab Results | LOINC |
| Medications | DCB/ATC |

---

## Project Structure

```
.
├── app/                      # Next.js App Router
│   ├── (auth)/              # Public routes (login)
│   ├── (dashboard)/         # Protected routes
│   │   ├── anamnese/        # Anamnesis generator
│   │   ├── chat/            # EBM Chat
│   │   └── history/         # History
│   └── api/                 # API routes
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── medical/             # Medical domain components
│   └── layout/              # Layout components
├── lib/
│   ├── ai/                  # LLM integration
│   ├── db/                  # Prisma client
│   ├── templates/           # Medical templates
│   └── utils/               # Helpers
├── stores/                  # Zustand stores
├── hooks/                   # Custom hooks
├── types/                   # TypeScript types
├── memory/
│   └── constitution.md      # This file
├── specs/
│   └── [feature-name]/
│       ├── spec.md
│       ├── plan.md
│       ├── tasks.md
│       └── contracts/
├── docs/
│   └── PRD.md              # Product Requirements Document
└── README.md
```

---

## Quality Gates

Before any PR can be merged, ALL of the following MUST pass:

### Automated Checks
- [ ] TypeScript compilation with zero errors
- [ ] ESLint with zero warnings
- [ ] Unit tests passing (≥80% coverage)
- [ ] Integration tests passing
- [ ] E2E tests passing for affected flows
- [ ] Bundle size within limits
- [ ] No security vulnerabilities (npm audit)

### Manual Checks
- [ ] Code review by at least one team member
- [ ] Medical content reviewed if templates changed
- [ ] Design review if UI changed (Apple Design compliance)
- [ ] Documentation updated

---

## Governance

### Amendment Process

1. Propose change via PR to `memory/constitution.md`
2. Require approval from project lead
3. Update version following semver:
   - MAJOR: Breaking changes to principles
   - MINOR: New sections or expanded guidance
   - PATCH: Clarifications or typo fixes
4. Update `Last Amended` date

### Compliance Review

- Weekly: Dependency security audit
- Monthly: Constitution compliance review
- Quarterly: Full architecture review against PRD

---

## Communication

- Use clear, descriptive commit messages following Conventional Commits
- Document decisions in specifications or ADRs (Architecture Decision Records)
- Ask for clarification when requirements are unclear
- Never assume medical requirements; always validate with clinical team

---

## Enforcement

These rules are enforced through:

- `.cursorrules` file (Cursor IDE integration)
- `CLAUDE.md` configuration (Claude Code integration)
- GitHub Actions CI/CD pipeline
- Pre-commit hooks (lint, type-check)
- Code review process

**Violations of this workflow will result in:**
- PR rejection
- Request to create/update specifications first
- Automated CI failure
- Alerts from development tools

---

## Golden Rule

> **NO SPEC = NO CODE**
>
> Without a specification, there can be no implementation. This is non-negotiable.

> **PATIENT SAFETY FIRST**
>
> When in doubt, prioritize patient safety over feature velocity. Always.
