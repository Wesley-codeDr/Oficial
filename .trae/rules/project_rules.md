# Trae AI - Project Rules - WellWave Oficial

## Stack Tecnológica

- **Frontend**: Next.js 16.1+, React 19.2+, TypeScript 5.x
- **Database**: PostgreSQL (Supabase) com Prisma ORM 6.19+
- **UI**: Tailwind CSS 4.x, Radix UI, Framer Motion
- **State**: Zustand, React Query v5
- **Validation**: Zod 4.x, React Hook Form
- **Testing**: Vitest, Playwright
- **Package Manager**: pnpm

## Estrutura do Projeto

```bash
Oficial/
├── app/              # Next.js 16 App Router (NÃO src/)
├── components/       # React components
├── lib/             # Business logic e utilities
├── prisma/          # Prisma schema e migrations
└── specs/           # Feature specifications
```

**CRÍTICO**: O projeto usa `app/` diretamente na raiz, NÃO `src/app/`.

## Development Guidelines

### File Structure

- **App Router**: Use `app/` directory for all routes
- **API Routes**: Place in `app/api/`
- **Server Components**: Default in `app/`, no 'use client' needed
- **Client Components**: Mark with `'use client'` directive
- **Shared Components**: Store in `components/` with subdirectories
- **Business Logic**: Keep in `lib/` directory
- **Database**: Prisma schema in `prisma/schema.prisma`

### Code Standards

- **TypeScript**: Strict mode enabled, no implicit any
- **Naming**: PascalCase for components, camelCase for functions
- **Imports**: Use absolute paths with @ alias
- **Styling**: Tailwind CSS utility classes, no inline styles
- **Database**: Always use Prisma Client, never raw SQL

### Spec-Driven Development

- **NEVER** implement code without approved specification
- **ALWAYS** follow: Spec → Plan → Tasks → Code
- **ALWAYS** validate constitution.md, spec.md, plan.md, tasks.md exist
- **ALWAYS** update specs when requirements change

### Commands

```bash
# Development
pnpm dev              # Dev server with Turbo
pnpm build            # Production build
pnpm typecheck        # Type checking

# Database
pnpm db:generate      # Generate Prisma Client
pnpm db:push          # Push schema
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Prisma Studio

# Testing
pnpm test             # Vitest unit tests
pnpm test:e2e         # Playwright E2E tests
```

---

[byterover-mcp]

You are given two tools from Byterover MCP server, including

## 1. `byterover-store-knowledge`

You `MUST` always use this tool when:

- Learning new patterns, APIs, or architectural decisions from the codebase
- Encountering error solutions or debugging techniques
- Finding reusable code patterns or utility functions
- Completing any significant task or plan implementation

## 2. `byterover-retrieve-knowledge`

You `MUST` always use this tool when:

- Starting any new task or implementation to gather relevant context
- Before making architectural decisions to understand existing patterns
- When debugging issues to check for previous solutions
- Working with unfamiliar parts of the codebase

---

**Última atualização**: Janeiro 2026
**Stack**: Next.js 16.1+ | React 19.2+ | TypeScript 5.x | Prisma 6.19+
**Estrutura**: app/ (App Router) | components/ | lib/ | prisma/
