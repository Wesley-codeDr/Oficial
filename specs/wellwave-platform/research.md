# Research Document: WellWave Platform MVP

## Overview

Este documento consolida as decisões técnicas e pesquisa realizada para o MVP da plataforma WellWave.

---

## 1. Frontend Framework

### Decision: Next.js 15.x com App Router

### Rationale
- App Router oferece React Server Components (RSC) nativamente
- Streaming de SSE simplificado para geração de texto em tempo real
- Suporte nativo a layouts aninhados (ideal para split-screen)
- Vercel otimizado para Next.js = deploy simplificado
- Comunidade ativa e documentação robusta

### Alternatives Considered
| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| Remix | Data loading excelente, nested routes | Menos maduro, menor comunidade | Ecossistema menor |
| Vite + React | Mais leve, build rápido | Sem SSR nativo, mais config | Perderia SSR benefits |
| Astro | Islands architecture | Não ideal para apps interativas | Foco em sites estáticos |

---

## 2. UI Component Library

### Decision: shadcn/ui + Radix UI + Tailwind CSS

### Rationale
- shadcn/ui: componentes copiados (não dependência), customização total
- Radix UI: primitives de acessibilidade robustos (WCAG 2.1)
- Tailwind: utility-first permite glassmorphism customizado
- Combinação permite Apple Design Language 2025 sem limitações

### Alternatives Considered
| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| Chakra UI | DX excelente, acessível | Estilos opinativos, difícil glassmorphism | Design system fechado |
| MUI | Completo, empresarial | Material Design != Apple style | Estética incompatível |
| Mantine | Moderno, hooks úteis | Menor comunidade | Menos flexível |

---

## 3. State Management

### Decision: React Context + Zustand (local) + TanStack Query (server)

### Rationale
- Context para estado de autenticação e tema
- Zustand para estado da anamnese (checkboxes, texto gerado)
- TanStack Query para cache de templates, histórico, dados de sessão
- Sem overhead de Redux para MVP

### Alternatives Considered
| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| Redux Toolkit | Padrão enterprise, devtools | Boilerplate, complexidade | Overkill para MVP |
| Jotai | Atômico, simples | Curva de aprendizado | Zustand mais direto |
| Recoil | Graph-based | Menos maduro | Zustand mais estável |

---

## 4. Database & ORM

### Decision: PostgreSQL (Supabase) + Prisma ORM

### Rationale
- PostgreSQL: JSONB para templates flexíveis, full-text search
- Supabase: managed PostgreSQL, Row Level Security (RLS)
- Prisma: type-safety end-to-end, migrações versionadas
- Supabase Auth integrado com mesmo banco

### Alternatives Considered
| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| PlanetScale | Serverless MySQL | MySQL != PostgreSQL features | JSONB necessário |
| Drizzle ORM | Mais leve, SQL-like | Menos maduro | Prisma mais estável |
| Mongoose + MongoDB | Schema flexível | NoSQL != compliance LGPD padrão | PostgreSQL preferido |

---

## 5. Authentication

### Decision: Supabase Auth

### Rationale
- Integração nativa com Supabase (mesmo projeto)
- Row Level Security (RLS) built-in
- Email/senha + social login (futuro)
- JWT tokens com refresh automático
- Conformidade LGPD out-of-the-box

### Alternatives Considered
| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| NextAuth.js | Flexível, self-hosted | Config manual, sem RLS | Mais setup |
| Auth0 | Enterprise, features ricas | Custo alto, vendor lock-in | Pricing |
| Clerk | DX moderna | Custo, menos controle | Supabase já inclui |

---

## 6. AI/LLM Integration

### Decision: OpenAI API (GPT-4) + Vercel AI SDK + LangChain

### Rationale
- GPT-4: melhor qualidade para texto médico formal
- Vercel AI SDK: streaming SSE simplificado em Next.js
- LangChain: orquestração de prompts, templates de síndrome
- Structured outputs para JSON de hipóteses/condutas

### Alternatives Considered
| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| Anthropic Claude | Contexto maior, safety | API menos madura para streaming | OpenAI mais estável |
| Gemini | Multimodal | Menos testado em medical | OpenAI referência |
| Local LLM (Llama) | Privacidade | Latência, infra própria | Complexidade |

### Implementation Details
```typescript
// Estrutura de prompt para anamnese
interface AnamnesePrompt {
  syndrome: 'chest_pain' | 'dyspnea' | 'acute_abdomen';
  checkboxes: CheckboxSelection[];
  negatives: string[];
  outputMode: 'summary' | 'detailed';
}
```

---

## 7. Streaming Strategy

### Decision: Server-Sent Events (SSE) via Vercel AI SDK

### Rationale
- SSE: conexão unidirecional, ideal para streaming de texto
- Vercel AI SDK: abstração pronta para Next.js App Router
- useChat hook: state management de chat incluído
- Fallback para HTTP polling se SSE falhar

### Alternatives Considered
| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| WebSockets | Bidirecional | Overhead para use case unidirecional | Desnecessário |
| Long polling | Compatível com tudo | Latência, ineficiente | UX inferior |

---

## 8. Design System: Apple Design Language 2025

### Decision: Design system customizado inspirado em Apple HIG

### Rationale
- Requisito hard do PRD
- Glassmorphism: blur 20px, bg-white/30, border-white/20
- Tipografia: Inter (substituto web de SF Pro)
- Radius: 12px-20px para cards, 8px para botões
- Motion: Framer Motion com spring physics

### Design Tokens
```typescript
const designTokens = {
  colors: {
    glass: {
      background: 'rgba(255, 255, 255, 0.3)',
      border: 'rgba(255, 255, 255, 0.2)',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
    accent: {
      primary: '#007AFF', // Apple Blue
      success: '#34C759',
      warning: '#FF9500',
      danger: '#FF3B30',
    },
  },
  blur: {
    glass: '20px',
    overlay: '40px',
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '20px',
    xl: '28px',
  },
  motion: {
    spring: { stiffness: 300, damping: 30 },
    duration: { fast: 150, normal: 300, slow: 500 },
  },
};
```

---

## 9. Testing Strategy

### Decision: Vitest + Testing Library + Playwright

### Rationale
- Vitest: compatível com Vite (usado por Next.js internamente)
- Testing Library: testes focados em comportamento do usuário
- Playwright: E2E para fluxos críticos (anamnese completa)
- Coverage: 80% para lógica de negócio, 60% para UI

### Alternatives Considered
| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| Jest | Padrão da indústria | Mais lento, config complexa | Vitest mais rápido |
| Cypress | E2E completo | Mais pesado que Playwright | Playwright mais leve |

---

## 10. Observability

### Decision: Sentry + Vercel Analytics

### Rationale
- Sentry: error tracking, performance monitoring
- Vercel Analytics: Core Web Vitals, tempo de carregamento
- Structured logging via console (Vercel captura)
- Métricas de negócio via custom events

---

## 11. Security & Compliance

### Decision: LGPD by design + CFM compliance

### Implementation
- RLS no Supabase: dados por usuário isolados
- Encryption: Supabase encrypts at rest by default
- Audit log: tabela separada para ações médicas
- Consentimento: modal obrigatório antes de uso
- Data retention: 20 anos (requisito CFM)

---

## 12. Project Structure

### Decision: Feature-based structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Rotas públicas (login)
│   ├── (dashboard)/       # Rotas protegidas
│   │   ├── anamnese/      # Gerador de anamnese
│   │   ├── chat/          # Chat EBM
│   │   └── history/       # Histórico
│   └── api/               # API routes
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── medical/           # Componentes médicos
│   └── layout/            # Layout components
├── lib/
│   ├── ai/                # LLM integration
│   ├── db/                # Prisma client
│   ├── templates/         # Templates de síndrome
│   └── utils/             # Helpers
├── stores/                # Zustand stores
├── hooks/                 # Custom hooks
└── types/                 # TypeScript types
```

---

## Open Questions (Resolved)

| Question | Resolution |
|----------|------------|
| Como lidar com latência de IA? | Streaming SSE + skeleton loading |
| Templates hardcoded ou DB? | DB com seed inicial, editável via admin (v1.0) |
| Validação de CRM? | Manual no MVP, API CFM em v1.0 |
| Multi-idioma? | Português BR only no MVP |

---

## References

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)
- [CFM Resoluções sobre PEP](https://portal.cfm.org.br)
