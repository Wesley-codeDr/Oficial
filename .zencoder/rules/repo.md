---
description: Repository Information Overview
alwaysApply: true
---

# WellWave Information

## Summary

WellWave is a medical anamnesis system built with Next.js 16.1+, React 19.2+, and TypeScript 5.x. It is specifically designed for emergency department physicians to quickly generate comprehensive medical documentation using AI-driven clinical syndromes and red flag detection.

## Stack Tecnológica

- **Frontend**: Next.js 16.1+, React 19.2+, TypeScript 5.x
- **Database**: PostgreSQL (Supabase) com Prisma ORM 6.19+
- **UI**: Tailwind CSS 4.x, Radix UI, Framer Motion
- **State**: Zustand, React Query v5
- **Validation**: Zod 4.x, React Hook Form
- **Testing**: Vitest, Playwright
- **Package Manager**: pnpm
- **Deployment**: Vercel

## Structure

```bash
Oficial/
├── app/              # Next.js 16 App Router (NÃO src/)
├── components/       # React components
├── lib/             # Business logic e utilities
├── prisma/          # Prisma schema e migrations
├── public/          # Static assets
├── specs/           # Feature specifications
└── scripts/         # Utility scripts
```

**CRÍTICO**: O projeto usa `app/` diretamente na raiz, NÃO `src/app/`.

### Directory Details

- **app/**: Next.js App Router structure containing pages, server actions, and API routes.
- **components/**: UI components categorized by domain (medical, chat, auth, ui/shadcn).
- **lib/**: Core business logic, database client (Prisma), AI services, and utility functions.
- **prisma/**: Database schema definitions and seeding scripts.
- **specs/**: Detailed feature specifications and implementation plans following Spec-Driven Development.
- **scripts/**: Utility scripts for environment setup, database management, and data synchronization.

## Language & Runtime

**Language**: TypeScript
**Version**: 5.9+
**Build System**: Next.js 16.1+ (pnpm)
**Package Manager**: pnpm

## Dependencies

**Main Dependencies**:

- **Framework**: `next` (v16.1.1), `react` (v19.2.3)
- **Database**: `@prisma/client` (v6.19.1), `supabase`
- **AI**: `ai` (Vercel AI SDK), `@ai-sdk/openai` (GPT-4)
- **UI**: `tailwindcss` (v4.1.18), `framer-motion`, `lucide-react`, `@radix-ui/*`
- **State/Data**: `zustand`, `@tanstack/react-query` (v5)
- **Validation**: `zod` (v4.2.1), `react-hook-form`

**Development Dependencies**:
- **Testing**: `vitest`, `@playwright/test`
- **Linting**: `eslint`, `prettier`
- **ORM CLI**: `prisma`
- **Other**: `husky`, `tsx`

## Build & Installation
```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm db:generate

# Run migrations (local)
pnpm db:migrate

# Build production application
pnpm build
```

## Docker

**Dockerfile**: `/Dockerfile`
**Image**: Multi-stage build based on `node:20-alpine`.
**Configuration**: 
- **Stage 1 (deps)**: Installs pnpm and production dependencies.
- **Stage 2 (builder)**: Runs prisma generate and next build.
- **Stage 3 (runner)**: Configures a non-root user and executes the standalone server.
- **Health Check**: Pings `/api/health` to verify service availability.

**Docker Compose**: `/docker-compose.yml`
- Sets up a local PostgreSQL 16 database on port 5434.
- Includes a shadow database on port 5435 for Prisma migrations.

## Testing

**Framework**: Vitest (Unit/Integration), Playwright (E2E)
**Test Location**: `tests/unit`, `tests/e2e`
**Naming Convention**: `*.test.ts`, `*.spec.ts`
**Configuration**: `vitest.config.ts`, `playwright.config.ts`

**Run Command**:

```bash
# Run unit tests
pnpm test

# Run E2E tests
pnpm test:e2e

# Run tests with coverage
pnpm test:coverage
```

## Development Workflow

### Spec-Driven Development

- **NEVER** implement code without approved specification
- **ALWAYS** follow: Spec → Plan → Tasks → Code
- **ALWAYS** validate constitution.md, spec.md, plan.md, tasks.md exist
- **ALWAYS** update specs when requirements change

### Common Commands

```bash
# Development
pnpm dev              # Dev server with Turbo
pnpm build            # Production build
pnpm typecheck        # Type checking
pnpm lint             # Run ESLint

# Database (Prisma 6.19+)
pnpm db:generate      # Generate Prisma Client
pnpm db:push          # Push schema without migration
pnpm db:migrate       # Create and run migration
pnpm db:studio        # Open Prisma Studio
pnpm db:reset         # Reset database

# Testing
pnpm test             # Vitest unit tests
pnpm test:e2e         # Playwright E2E tests
pnpm test:coverage    # Coverage report
```

---

**Última atualização**: Janeiro 2026
**Stack**: Next.js 16.1+ | React 19.2+ | TypeScript 5.x | Prisma 6.19+
**Estrutura**: app/ (App Router) | components/ | lib/ | prisma/
