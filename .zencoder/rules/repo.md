---
description: Repository Information Overview
alwaysApply: true
---

# WellWave Information

## Summary
WellWave is a medical anamnesis system built with Next.js 15/16, React 19, and TypeScript. It is specifically designed for emergency department physicians to quickly generate comprehensive medical documentation using AI-driven clinical syndromes and red flag detection.

## Structure
- **app/**: Next.js App Router structure containing pages, server actions, and API routes.
- **components/**: UI components categorized by domain (medical, chat, auth, ui/shadcn).
- **lib/**: Core business logic, database client (Prisma), AI services, and utility functions.
- **prisma/**: Database schema definitions and seeding scripts.
- **specs/**: Detailed feature specifications and implementation plans following Spec-Driven Development.
- **docs/**: Technical documentation covering architecture, database design, and deployment.
- **scripts/**: Utility scripts for environment setup, database management, and data synchronization.
- **tests/**: Unit and End-to-End test suites.

## Language & Runtime
**Language**: TypeScript  
**Version**: 5.9+  
**Build System**: Next.js (pnpm)  
**Package Manager**: pnpm

## Dependencies
**Main Dependencies**:
- **Framework**: `next` (v16.0.10), `react` (v19.2.3)
- **Database**: `@prisma/client` (v7.2.0), `supabase`
- **AI**: `ai` (Vercel AI SDK), `@ai-sdk/openai` (GPT-4)
- **UI**: `tailwindcss`, `framer-motion`, `lucide-react`, `@radix-ui/*`
- **State/Data**: `zustand`, `@tanstack/react-query`
- **Validation**: `zod`, `react-hook-form`

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
