# Architecture Documentation

> **Versão**: 2.0
> **Última Atualização**: Janeiro 2026
> **Status**: Produção Ativa

## Overview

WellWave/Oficial é um sistema médico de geração de anamneses para ambientes de pronto-socorro, construído com stack moderna e otimizado para deployment no Vercel com Supabase.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│  (Next.js 16.1+ App Router + React 19.2+ + TypeScript 5.x)     │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   UI Layer   │  │  State Mgmt  │  │   Routing    │          │
│  │  (shadcn/ui) │  │   (Zustand)  │  │ (App Router) │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API Layer (Next.js)                         │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  API Routes  │  │ Server Actions│  │  Middleware  │          │
│  │   app/api/*  │  │               │  │    (Auth)    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│   Authentication         │  │    AI Services           │
│   (Supabase Auth)        │  │    (OpenAI GPT-4)        │
│                          │  │                          │
│  - JWT Tokens            │  │  - Text Generation       │
│  - Session Management    │  │  - EBM Chat             │
│  - RLS Policies          │  │  - Medical Narratives    │
└──────────────────────────┘  └──────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Data Layer (Prisma ORM)                       │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Models     │  │  Migrations  │  │    Seed      │          │
│  │  (Schema)    │  │              │  │    Data      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│               Database (PostgreSQL 16 + Supabase)                │
│                                                                   │
│  - Patient data                                                  │
│  - Anamneses (structured + narrative)                           │
│  - Clinical syndromes                                            │
│  - Checkbox templates                                            │
│  - Red flag rules                                                │
│  - Chat conversations                                            │
│  - Audit logs                                                    │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend

- **Framework**: Next.js 16.1+ (App Router, React Server Components)
- **UI Library**: React 19.2+
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Tailwind CSS 4.x com configuração customizada
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **State Management**: Zustand (client state), TanStack Query v5 (server state)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

### Backend

- **Runtime**: Node.js 20+ (LTS)
- **Framework**: Next.js API Routes & Server Actions (serverless)
- **ORM**: Prisma 6.19+ (downgrade de v7 para estabilidade)
- **Database**: PostgreSQL 16 (Supabase managed)
- **Authentication**: Supabase Auth (JWT-based) + NextAuth.js v4
- **AI Integration**: Vercel AI SDK + OpenAI GPT-4

### DevOps & Monitoring

- **Hosting**: Vercel (CDN, edge functions, region: gru1)
- **Database**: Supabase (managed PostgreSQL com PgBouncer)
- **Error Tracking**: Sentry 10
- **CI/CD**: GitHub Actions
- **Container**: Docker (desenvolvimento local)
- **Package Manager**: pnpm 9+

### Testing

- **Unit Tests**: Vitest
- **E2E Tests**: Playwright
- **Type Checking**: TypeScript strict mode
- **Linting**: ESLint + Prettier

## Estrutura de Projeto Real

```bash
Oficial/
├── app/                    # Next.js 16 App Router
│   ├── (auth)/            # Rotas de autenticação
│   ├── (dashboard)/       # Rotas autenticadas
│   ├── api/               # API Routes (serverless)
│   └── layout.tsx         # Layout raiz
│
├── components/            # React components
│   ├── ui/               # Componentes base (shadcn/ui)
│   ├── medical/          # Componentes médicos
│   └── features/         # Features complexas
│
├── lib/                  # Business logic
│   ├── supabase/        # Cliente Supabase
│   ├── medical/         # Lógica médica
│   └── utils/           # Utilities
│
├── prisma/              # Prisma ORM
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
│
├── public/              # Static assets
├── styles/              # Global styles
└── docs/                # Documentation
```

**IMPORTANTE**: O projeto NÃO usa NestJS, Fastify ou outras estruturas backend separadas. Tudo é Next.js serverless.

## Data Model

### Core Entities

1. **User** (Physician)
   - Authentication via Supabase
   - CRM credentials (Brazilian medical license)
   - Profile information

2. **Syndrome**
   - Clinical syndromes (Chest Pain, Dyspnea, Acute Abdomen)
   - Checkbox templates
   - Red flag rules

3. **Checkbox**
   - Template items for data collection
   - Categorized (HDA, Exam, etc.)
   - Narrative text generation

4. **AnamneseSession**
   - User's anamnesis data
   - Selected checkboxes
   - Generated medical text
   - Red flags detected

5. **ChatConversation & ChatMessage**
   - EBM (Evidence-Based Medicine) chat
   - Context-aware medical Q&A
   - Citation tracking

6. **AuditLog**
   - Compliance tracking
   - Action logging
   - LGPD/HIPAA compliance

For detailed schema, see `prisma/schema.prisma`.

## Key Design Patterns

### 1. Spec-Driven Development
- All features start with specifications (`specs/[feature]/spec.md`)
- Implementation follows detailed plans (`plan.md`)
- Tasks are tracked (`tasks.md`)
- Constitution defines project principles

### 2. Server Components First
- Use React Server Components by default
- Client Components only when needed (interactivity, hooks)
- Reduces JavaScript bundle size
- Improves initial page load

### 3. API Design
- RESTful API routes in `/app/api`
- Server Actions for mutations
- Middleware for authentication
- Rate limiting (planned)

### 4. Type Safety
- Zod schemas for runtime validation
- TypeScript for compile-time safety
- Prisma for type-safe database queries
- End-to-end type safety

### 5. Error Handling
- Try-catch blocks with specific error types
- Error boundaries for React components
- Sentry integration for production errors
- User-friendly error messages

## Security Architecture

### Authentication Flow
```
1. User visits app
2. Supabase Auth checks session (JWT cookie)
3. If invalid → Redirect to /login
4. If valid → Middleware allows access
5. Protected API routes verify JWT
```

### Data Protection
- Environment variables for secrets
- Row-Level Security (RLS) in Supabase
- Server-only code in API routes
- HTTPS only in production
- SQL injection prevention (Prisma)
- XSS prevention (React auto-escaping)

### Medical Data Compliance
- LGPD (Brazilian data protection law)
- CFM (Medical Council) guidelines
- Audit logging for all data access
- Data encryption at rest and in transit

## Performance Optimizations

### Frontend
- Code splitting (Next.js automatic)
- Image optimization (Next.js Image component)
- Font optimization (next/font)
- Lazy loading for heavy components
- Bundle analysis (`pnpm build:analyze`)

### Backend
- Database connection pooling (PgBouncer)
- Query optimization with Prisma
- Caching strategies (planned)
- CDN for static assets (Vercel)

### Database
- Proper indexes on frequently queried columns
- Efficient join patterns
- Shadow database for safe migrations
- Query performance monitoring

## Deployment Architecture

### Production (Vercel)
```
┌─────────────┐
│   Vercel    │
│   (Edge)    │
│             │
│  - CDN      │
│  - SSL      │
│  - Preview  │
└─────┬───────┘
      │
      ├─── Next.js App (Serverless Functions)
      │
      ├─── Supabase (Database + Auth)
      │
      ├─── OpenAI API (AI Services)
      │
      └─── Sentry (Error Tracking)
```

### Development (Local)
```
┌─────────────┐
│  Developer  │
│   Machine   │
└─────┬───────┘
      │
      ├─── Next.js Dev Server (localhost:3000)
      │
      ├─── Docker PostgreSQL (localhost:5434)
      │
      └─── Prisma Studio (localhost:5555)
```

## Monitoring & Observability

### Error Tracking
- Sentry for exception monitoring
- Source maps uploaded for production
- Custom error contexts
- Performance monitoring

### Logging
- Console logs in development
- Structured logging in production
- Audit logs in database
- GitHub Actions logs for CI/CD

### Health Checks
- `/api/health` endpoint
- Database connectivity check
- Memory usage monitoring
- Service uptime tracking

## Development Workflow

### Local Development

1. Clone repository
2. Install dependencies (`pnpm install`)
3. Setup environment (`.env`)
4. Start database (`./scripts/docker-db.sh start`)
5. Generate Prisma client (`pnpm db:generate`)
6. Run migrations (`pnpm db:migrate`)
7. Seed database (`pnpm db:seed`)
8. Start dev server (`pnpm dev`)

### Comandos Disponíveis

**Desenvolvimento:**

```bash
pnpm dev                    # Next.js dev server com Turbo
pnpm build                  # Build de produção
pnpm build:analyze          # Build com análise de bundle
pnpm start                  # Servidor de produção
```

**Qualidade de Código:**

```bash
pnpm lint                   # ESLint
pnpm lint:fix               # ESLint com auto-fix
pnpm typecheck              # TypeScript type checking
pnpm format                 # Prettier format
pnpm format:check           # Prettier check
```

**Testes:**

```bash
pnpm test                   # Vitest (unit tests)
pnpm test:ui                # Vitest UI
pnpm test:coverage          # Coverage report
pnpm test:e2e               # Playwright (E2E)
pnpm test:e2e:ui            # Playwright UI
```

**Database (Prisma):**

```bash
pnpm db:generate            # Gera Prisma Client
pnpm db:push                # Push schema (sem migration)
pnpm db:migrate             # Cria e aplica migration
pnpm db:migrate:deploy      # Aplica migrations (produção)
pnpm db:seed                # Popula banco com seeds
pnpm db:studio              # Prisma Studio (GUI)
```

### Feature Development
1. Write specification (`specs/[feature]/spec.md`)
2. Generate plan (`/speckit.plan`)
3. Generate tasks (`/speckit.tasks`)
4. Implement feature (TDD approach)
5. Write tests
6. Submit PR
7. Code review
8. Merge and deploy

### CI/CD Pipeline
1. Push to branch
2. GitHub Actions run:
   - Lint and type check
   - Run tests
   - Build application
   - Check migrations
   - Security audit
3. Create PR
4. Automated preview deployment (Vercel)
5. Manual review
6. Merge to main
7. Automatic production deployment

## Scalability Considerations

### Current Scale
- Single-region deployment
- Serverless architecture (auto-scaling)
- Connection pooling for database
- CDN for static assets

### Future Scale (when needed)
- Multi-region deployment
- Database read replicas
- Redis caching layer
- Microservices extraction
- Message queue for async tasks

## API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `POST /api/auth/*` - Authentication (Supabase)

### Protected Endpoints (Auth Required)
- `GET /api/chat/conversations` - List conversations
- `POST /api/chat/conversations` - Create conversation
- `POST /api/chat/conversations/[id]/messages` - Send message

### Internal Use Only
- Server Actions for mutations
- Server Components for data fetching

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Spec-Kit Repository](https://github.com/github/spec-kit)

## Diagrams

For visual diagrams and flowcharts, see:
- User flow diagrams in `specs/*/spec.md`
- Database schema in `specs/*/data-model.md`
- API contracts in `specs/*/contracts/`
