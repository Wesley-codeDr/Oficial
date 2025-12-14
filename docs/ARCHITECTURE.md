# Architecture Documentation

## Overview

WellWave is a medical anamnesis system built with a modern web stack, designed for emergency department physicians to quickly generate comprehensive medical documentation.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│  (Next.js 15 App Router + React 19 + TypeScript)                │
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
│  │   /api/*     │  │               │  │    (Auth)    │          │
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
│  - User data (physicians)                                        │
│  - Clinical syndromes                                            │
│  - Checkbox templates                                            │
│  - Anamnesis sessions                                            │
│  - Red flag rules                                                │
│  - Chat conversations                                            │
│  - Audit logs                                                    │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router, React Server Components)
- **UI Library**: React 19
- **Language**: TypeScript 5.9+
- **Styling**: Tailwind CSS 3.4+ with custom configuration
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **State Management**: Zustand (client state), React Query (server state)
- **Forms**: React Hook Form + Zod validation

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Next.js API Routes & Server Actions
- **ORM**: Prisma 7.1
- **Database**: PostgreSQL 16 (via Supabase)
- **Authentication**: Supabase Auth (JWT-based)
- **AI Integration**: Vercel AI SDK + OpenAI GPT-4

### DevOps & Monitoring
- **Hosting**: Vercel (with CDN and edge functions)
- **Database Hosting**: Supabase (managed PostgreSQL)
- **Error Tracking**: Sentry
- **CI/CD**: GitHub Actions
- **Container**: Docker (development environment)
- **Package Manager**: pnpm 8+

### Testing
- **Unit Tests**: Vitest
- **E2E Tests**: Playwright
- **Type Checking**: TypeScript strict mode
- **Linting**: ESLint + Prettier

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
4. Start database (`docker-compose up`)
5. Run migrations (`pnpm prisma migrate dev`)
6. Seed database (`pnpm db:seed`)
7. Start dev server (`pnpm dev`)

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
