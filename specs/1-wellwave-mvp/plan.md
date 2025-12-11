# Implementation Plan: WellWave MVP

## Overview

**Feature:** WellWave MVP - Sistema de Anamnese Digital para Emergências
**Branch:** `1-wellwave-mvp`
**Spec:** `/specs/1-wellwave-mvp/spec.md`
**Constitution:** `/memory/constitution.md` v2.0.0
**Status:** 🔄 Phase 5 In Progress (~70% Complete)

### Implementation Progress

| Phase | Status | Key Deliverables |
|-------|--------|------------------|
| Phase 1: Setup | ✅ Complete | Prisma schema, Supabase Auth, Design tokens |
| Phase 2: UI | ✅ Complete | Dashboard layout, Medical components, Chat UI |
| Phase 3: Anamnese | ✅ Complete | Text generator, Red flag detector, Session management |
| Phase 4: Chat EBM | ✅ Complete | OpenAI integration, Streaming, Guardrails |
| Phase 5: Testing | 🔄 In Progress | 55 unit tests passing, E2E setup complete |
| Phase 6: Launch | ⏳ Pending | Documentation, Security review, Deploy |

---

## Technical Context

### Technology Stack (from Constitution)

| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | Next.js (App Router) | 15.x+ |
| UI | React + Tailwind + shadcn/ui | Latest |
| Components | Radix UI | Latest |
| Animations | Framer Motion | Latest |
| State | Zustand + TanStack Query | Latest |
| Backend | Next.js API Routes | 15.x+ |
| Database | PostgreSQL via Supabase | Latest |
| ORM | Prisma | Latest |
| Auth | Supabase Auth | Latest |
| AI | OpenAI + Vercel AI SDK | Latest |
| Observability | Sentry | Latest |
| Hosting | Vercel | N/A |

### Design System

- **Style:** Apple Design Language 2025
- **Glassmorphism:** blur 20px, rgba(255,255,255,0.3)
- **Typography:** Inter (SF Pro equivalent)
- **Motion:** Spring physics (stiffness: 300, damping: 30)
- **Dark mode:** Required (clinical environments)

---

## Constitution Compliance Check

| Principle | Status | Implementation Notes |
|-----------|--------|---------------------|
| 1. Spec-Driven Development | ✅ | Spec complete, plan follows spec |
| 2. Code Quality & Medical Precision | ✅ | TypeScript strict, medical types |
| 3. Testing | ✅ | Vitest + Playwright strategy |
| 4. Documentation | ✅ | OpenAPI + Storybook planned |
| 5. Security & Healthcare Compliance | ✅ | LGPD + RLS + Audit logs |
| 6. Performance | ✅ | <2s load, <1.5s text gen |
| 7. Apple Design Language 2025 | ✅ | Design tokens defined |
| 8. AI-First Architecture | ✅ | Streaming + fallbacks |
| 9. Healthcare Domain Integrity | ✅ | Deterministic templates |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND                                    │
│                        (Next.js App Router)                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐     │
│  │   Login    │   │  Dashboard │   │  Anamnese  │   │  Chat EBM  │     │
│  │   Page     │   │    Page    │   │   Page     │   │    Page    │     │
│  └────────────┘   └────────────┘   └────────────┘   └────────────┘     │
│         │                │                │                │            │
│         └────────────────┴────────────────┴────────────────┘            │
│                                    │                                     │
│                          ┌─────────┴─────────┐                          │
│                          │   Zustand Stores  │                          │
│                          │ + TanStack Query  │                          │
│                          └─────────┬─────────┘                          │
│                                    │                                     │
└────────────────────────────────────┼────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           API ROUTES                                     │
│                      (Next.js API Routes)                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  /api/auth/*     /api/syndromes/*   /api/anamnese/*   /api/chat/*      │
│       │                │                  │                │            │
│       │                │                  │                │            │
│       ▼                ▼                  ▼                ▼            │
│  ┌─────────┐    ┌───────────┐    ┌────────────┐    ┌────────────┐      │
│  │Supabase │    │   Prisma  │    │   Text     │    │  OpenAI    │      │
│  │  Auth   │    │   Client  │    │ Generator  │    │    API     │      │
│  └─────────┘    └───────────┘    └────────────┘    └────────────┘      │
│                       │                                                  │
└───────────────────────┼─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          SUPABASE                                        │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐               │
│  │  PostgreSQL   │  │  Auth Service │  │   Storage     │               │
│  │  (with RLS)   │  │               │  │  (future)     │               │
│  └───────────────┘  └───────────────┘  └───────────────┘               │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Phases

### Phase 1: Project Setup & Infrastructure

**Duration:** Foundation setup
**Dependencies:** None

#### Tasks:

1. **Project Initialization**
   - Initialize Next.js 15 with App Router
   - Configure TypeScript strict mode
   - Setup Tailwind CSS + shadcn/ui
   - Install and configure Framer Motion
   - Setup ESLint + Prettier

2. **Database Setup**
   - Create Supabase project
   - Configure Prisma with Supabase connection
   - Create initial schema (from data-model.md)
   - Setup RLS policies
   - Create seed data for syndromes/checkboxes

3. **Authentication Setup**
   - Configure Supabase Auth
   - Create auth middleware for protected routes
   - Setup Zustand auth store
   - Implement login/logout flow

4. **Design System Foundation**
   - Create design tokens (from research.md)
   - Configure Tailwind theme
   - Create base components (GlassCard, Button variants)
   - Setup dark mode support

**Deliverables:**
- Running Next.js app with auth
- Database with schema + seed data
- Base component library

---

### Phase 2: Core UI Components

**Duration:** UI foundation
**Dependencies:** Phase 1

#### Tasks:

1. **Layout Components**
   - Dashboard layout with sidebar
   - Split-screen layout for anamnese
   - Header with user menu
   - Mobile-responsive navigation

2. **Medical Components**
   - Syndrome selector card
   - Checkbox panel (grouped by category)
   - Individual checkbox with red flag indicator
   - Text preview panel with live updates
   - Red flag alert banner
   - Copy button with feedback

3. **Chat Components**
   - Chat interface container
   - Message bubble (user/assistant)
   - Citation card
   - Streaming text indicator

4. **Shared Components**
   - Loading skeletons
   - Error boundaries
   - Toast notifications
   - Modal dialogs

**Deliverables:**
- Complete component library
- Storybook documentation (optional for MVP)

---

### Phase 3: Anamnese Generation Engine

**Duration:** Core feature
**Dependencies:** Phase 2

#### Tasks:

1. **Text Generation Logic**
   - Template engine for each syndrome
   - Checkbox-to-narrative mapping
   - Negative statement generation
   - Output mode switching (summary/detailed)

2. **Red Flag Detection**
   - Rule evaluation engine
   - Condition JSON parser
   - Severity classification
   - Alert triggering

3. **API Endpoints**
   - `GET /api/syndromes` - List syndromes
   - `GET /api/syndromes/:id` - Get syndrome with checkboxes
   - `POST /api/anamnese/generate` - Generate preview
   - `POST /api/anamnese/sessions` - Create session
   - `PATCH /api/anamnese/sessions/:id` - Update session
   - `POST /api/anamnese/sessions/:id/copy` - Track copy

4. **State Management**
   - Anamnese store (selected syndrome, checked items)
   - Real-time text regeneration on checkbox change
   - Session persistence

**Deliverables:**
- Working anamnese generation flow
- All 3 syndrome templates functional

---

### Phase 4: Chat EBM Integration

**Duration:** AI feature
**Dependencies:** Phase 3

#### Tasks:

1. **OpenAI Integration**
   - Vercel AI SDK setup
   - System prompt configuration
   - Context injection (anamnese data)
   - Citation extraction

2. **Streaming Implementation**
   - SSE endpoint for chat
   - Client-side streaming handler
   - Token-by-token rendering
   - Error handling and fallbacks

3. **Chat API Endpoints**
   - `POST /api/chat/conversations` - Create conversation
   - `GET /api/chat/conversations/:id` - Get with messages
   - `POST /api/chat/conversations/:id/messages` - Send message (stream)

4. **Guardrails**
   - Minimum data validation
   - Red flag injection in responses
   - Disclaimer text
   - Rate limiting

**Deliverables:**
- Working chat with streaming responses
- Citations in responses
- Context-aware suggestions

---

### Phase 5: Polish & Testing

**Duration:** Quality assurance
**Dependencies:** Phase 4

#### Tasks:

1. **Testing**
   - Unit tests for text generator
   - Unit tests for red flag detector
   - Integration tests for API endpoints
   - E2E tests for critical flows (Playwright)

2. **Performance Optimization**
   - Bundle analysis and optimization
   - API response time optimization
   - Skeleton loading states
   - Image optimization

3. **Error Handling**
   - Error boundaries
   - API error handling
   - Offline detection
   - Retry logic

4. **Observability**
   - Sentry integration
   - Custom error tracking
   - Performance monitoring
   - User analytics events

**Deliverables:**
- Test coverage ≥80% for business logic
- All E2E scenarios passing
- Sentry configured and reporting

---

### Phase 6: Documentation & Launch Prep

**Duration:** Final prep
**Dependencies:** Phase 5

#### Tasks:

1. **Documentation**
   - API documentation (from OpenAPI)
   - User guide (basic)
   - Development setup guide

2. **Security Review**
   - Dependency audit
   - RLS policy verification
   - Auth flow review
   - LGPD compliance check

3. **Deployment**
   - Environment configuration
   - CI/CD pipeline (GitHub Actions)
   - Production deployment to Vercel
   - Database migration to production

4. **Launch Checklist**
   - Smoke tests on production
   - Monitoring alerts configured
   - Backup procedures documented
   - Rollback plan ready

**Deliverables:**
- Production deployment
- Documentation complete
- Security audit passed

---

## File Structure

```
wellwave/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── page.tsx                    # Dashboard home
│   │   ├── anamnese/
│   │   │   ├── page.tsx                # Syndrome selection
│   │   │   └── [syndromeId]/
│   │   │       └── page.tsx            # Anamnese generator
│   │   ├── chat/
│   │   │   └── page.tsx                # EBM Chat
│   │   ├── history/
│   │   │   └── page.tsx                # Session history
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...supabase]/route.ts
│   │   ├── syndromes/
│   │   │   ├── route.ts                # GET syndromes
│   │   │   └── [id]/
│   │   │       ├── route.ts            # GET syndrome
│   │   │       └── red-flags/route.ts
│   │   ├── anamnese/
│   │   │   ├── generate/route.ts       # POST generate
│   │   │   └── sessions/
│   │   │       ├── route.ts            # POST/GET sessions
│   │   │       └── [id]/
│   │   │           ├── route.ts        # GET/PATCH session
│   │   │           ├── complete/route.ts
│   │   │           └── copy/route.ts
│   │   └── chat/
│   │       └── conversations/
│   │           ├── route.ts            # POST create
│   │           └── [id]/
│   │               ├── route.ts        # GET conversation
│   │               └── messages/route.ts # POST message (stream)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                             # shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   ├── medical/
│   │   ├── syndrome-selector.tsx
│   │   ├── checkbox-panel.tsx
│   │   ├── checkbox-item.tsx
│   │   ├── text-preview.tsx
│   │   ├── red-flag-alert.tsx
│   │   └── copy-button.tsx
│   ├── chat/
│   │   ├── chat-interface.tsx
│   │   ├── message-bubble.tsx
│   │   ├── citation-card.tsx
│   │   └── typing-indicator.tsx
│   └── layout/
│       ├── header.tsx
│       ├── sidebar.tsx
│       ├── split-screen.tsx
│       └── user-menu.tsx
├── lib/
│   ├── ai/
│   │   ├── prompts.ts                  # System prompts
│   │   ├── chat-config.ts              # Vercel AI SDK config
│   │   └── guardrails.ts               # Safety checks
│   ├── db/
│   │   └── prisma.ts                   # Prisma client singleton
│   ├── templates/
│   │   ├── chest-pain.ts               # Dor torácica template
│   │   ├── dyspnea.ts                  # Dispneia template
│   │   ├── acute-abdomen.ts            # Abdome agudo template
│   │   └── index.ts                    # Template registry
│   ├── medical/
│   │   ├── text-generator.ts           # Core generation logic
│   │   ├── red-flag-detector.ts        # Rule evaluation
│   │   └── validators.ts               # Medical data validation
│   ├── auth/
│   │   ├── middleware.ts               # Auth middleware
│   │   └── session.ts                  # Session helpers
│   └── utils/
│       ├── cn.ts                       # Class names helper
│       └── format.ts                   # Formatters
├── stores/
│   ├── anamnese-store.ts
│   ├── auth-store.ts
│   └── ui-store.ts
├── hooks/
│   ├── use-anamnese.ts
│   ├── use-syndromes.ts
│   ├── use-chat.ts
│   └── use-user.ts
├── types/
│   ├── medical.ts
│   ├── auth.ts
│   └── api.ts
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── tests/
│   ├── unit/
│   │   ├── text-generator.test.ts
│   │   └── red-flag-detector.test.ts
│   ├── integration/
│   │   └── api/
│   └── e2e/
│       ├── auth.spec.ts
│       ├── anamnese.spec.ts
│       └── chat.spec.ts
├── .env.local
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Key Implementation Details

### Text Generation Algorithm

```typescript
// lib/medical/text-generator.ts
export function generateAnamneseText(
  syndrome: SyndromeWithCheckboxes,
  checkedIds: string[],
  mode: OutputMode
): GenerationResult {
  // 1. Get checked checkboxes
  const checked = syndrome.checkboxes.filter(cb => checkedIds.includes(cb.id));

  // 2. Group by category
  const grouped = groupBy(checked, 'category');

  // 3. Build sections
  const sections: Section[] = [
    buildIdentificationSection(grouped),
    buildQPSection(grouped.QP),
    buildHDASection(grouped.HDA),
    buildAntecedentesSection(grouped.ANTECEDENTES),
    buildMedicacoesSection(grouped.MEDICACOES),
    buildAlergiasSection(grouped.ALERGIAS),
    buildHabitosSection(grouped.HABITOS),
    buildNegativasSection(grouped.NEGATIVAS),
    buildExameFisicoSection(grouped.EXAME_FISICO),
  ];

  // 4. Format based on mode
  const text = formatSections(sections, mode);

  // 5. Detect red flags
  const redFlags = detectRedFlags(syndrome.redFlagRules, checkedIds);

  // 6. Check required fields
  const missingRequired = syndrome.checkboxes
    .filter(cb => cb.isRequired && !checkedIds.includes(cb.id))
    .map(cb => cb.id);

  return { text, redFlags, missingRequired };
}
```

### Streaming Chat Implementation

```typescript
// app/api/chat/conversations/[id]/messages/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request, { params }) {
  const { content } = await req.json();
  const conversation = await getConversation(params.id);

  // Build context from anamnese session
  const context = buildContext(conversation.session);

  const result = await streamText({
    model: openai('gpt-4-turbo'),
    system: buildSystemPrompt(context),
    messages: [
      ...conversation.messages,
      { role: 'user', content }
    ],
  });

  return result.toDataStreamResponse();
}
```

---

## Risk Mitigations

| Risk | Mitigation |
|------|------------|
| Text quality issues | Extensive template testing with medical consultants |
| API latency | Streaming + skeleton states + fallbacks |
| Auth issues | Supabase managed auth + middleware |
| Data loss | Autosave + Supabase reliability |
| Security vulnerabilities | RLS + weekly audits + Sentry |

---

## Success Criteria Validation

| Criterion | Implementation |
|-----------|---------------|
| <90s anamnese time | Optimized UI + real-time generation |
| ≥95% required fields | Client-side validation + alerts |
| ≥90% negatives | Automatic negative section |
| 100% red flag detection | Deterministic rule engine |
| ≥95% EBM citations | Structured output parsing |
| <2s load time | Next.js optimization + edge caching |

---

## References

- Spec: `/specs/1-wellwave-mvp/spec.md`
- Research: `/specs/1-wellwave-mvp/research.md`
- Data Model: `/specs/1-wellwave-mvp/data-model.md`
- API Contract: `/specs/1-wellwave-mvp/contracts/openapi.yaml`
- Constitution: `/memory/constitution.md`
- PRD: `/docs/PRD.md`
