# Research Document: WellWave MVP

## Overview

Este documento consolida as decisões técnicas e pesquisa realizada para o MVP da plataforma WellWave, alinhado com a Constitution v2.0.0 e a especificação do MVP.

---

## 1. Frontend Framework

### Decision: Next.js 15.x com App Router

### Rationale
- App Router oferece React Server Components (RSC) nativamente
- Streaming de SSE simplificado para geração de texto em tempo real
- Suporte nativo a layouts aninhados (ideal para split-screen)
- Vercel otimizado para Next.js = deploy simplificado
- Comunidade ativa e documentação robusta
- Alinhado com Constitution: "Next.js (App Router) | Latest stable (15.x+)"

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
- Alinhado com Constitution: "Tailwind CSS + shadcn/ui" e "Radix UI"

### Alternatives Considered
| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| Chakra UI | DX excelente, acessível | Estilos opinativos, difícil glassmorphism | Design system fechado |
| MUI | Completo, empresarial | Material Design != Apple style | Estética incompatível |
| Mantine | Moderno, hooks úteis | Menor comunidade | Menos flexível |

---

## 3. State Management

### Decision: Zustand (client state) + TanStack Query (server state)

### Rationale
- Zustand: leve, simples, sem boilerplate para estado da anamnese
- TanStack Query: cache de templates, histórico, invalidação automática
- Separação clara entre estado de UI e dados do servidor
- Alinhado com Constitution: "Zustand + TanStack Query"

### State Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                      Zustand Stores                          │
├─────────────────────────────────────────────────────────────┤
│ useAnamneseStore     │ selectedSyndrome, checkedItems,      │
│                      │ generatedText, redFlags              │
├──────────────────────┼──────────────────────────────────────┤
│ useAuthStore         │ user, session, isAuthenticated       │
├──────────────────────┼──────────────────────────────────────┤
│ useUIStore           │ theme, sidebarOpen, activePanel      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    TanStack Query                            │
├─────────────────────────────────────────────────────────────┤
│ useSyndromes()       │ GET /api/syndromes (cached)          │
│ useCheckboxes(id)    │ GET /api/syndromes/:id/checkboxes    │
│ useChatHistory()     │ GET /api/chat/history                │
│ useUserProfile()     │ GET /api/user/profile                │
└─────────────────────────────────────────────────────────────┘
```

### Alternatives Considered
| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| Redux Toolkit | Padrão enterprise, devtools | Boilerplate, complexidade | Overkill para MVP |
| Jotai | Atômico, simples | Curva de aprendizado | Zustand mais direto |
| Context API | Nativo, sem deps | Performance, prop drilling | Não escala bem |

---

## 4. Database & ORM

### Decision: PostgreSQL (Supabase) + Prisma ORM

### Rationale
- PostgreSQL: JSONB para templates flexíveis, full-text search
- Supabase: managed PostgreSQL, Row Level Security (RLS)
- Prisma: type-safety end-to-end, migrações versionadas
- Supabase Auth integrado com mesmo banco
- Alinhado com Constitution: "PostgreSQL | Via Supabase" e "Prisma | Latest stable"

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
- Email/senha + recuperação de senha incluídos
- JWT tokens com refresh automático
- Conformidade LGPD out-of-the-box
- Alinhado com Constitution: "Supabase Auth (future: hospital SSO)"

### Implementation Details
```typescript
// Fluxo de autenticação
1. Login: supabase.auth.signInWithPassword()
2. Middleware verifica session em rotas protegidas
3. RLS no Supabase filtra dados por user_id
4. Refresh automático via supabase-js client
```

### Alternatives Considered
| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| NextAuth.js | Flexível, self-hosted | Config manual, sem RLS | Mais setup |
| Auth0 | Enterprise, features ricas | Custo alto, vendor lock-in | Pricing |
| Clerk | DX moderna | Custo, menos controle | Supabase já inclui |

---

## 6. AI/LLM Integration

### Decision: OpenAI API (GPT-4) + Vercel AI SDK

### Rationale
- GPT-4: melhor qualidade para texto médico formal
- Vercel AI SDK: streaming SSE simplificado em Next.js App Router
- `useChat` hook para gerenciamento de estado de chat
- Structured outputs para JSON de hipóteses/condutas
- Alinhado com Constitution: "OpenAI (or compatible)" e "Vercel AI SDK + LangChain"

### Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Text Generation Flow                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Checkboxes → Template Engine → OpenAI (optional) → Text    │
│       │                              │                       │
│       │         [Deterministic]      │ [AI-enhanced]        │
│       └──────────────────────────────┘                      │
│                                                              │
│  • MVP: Template-based generation (no AI call)              │
│  • AI opcional para polimento de texto                      │
│  • Fallback sempre para template determinístico             │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    ChatWell Flow                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  User Message → System Prompt (context) → OpenAI → Stream   │
│       │              │                                       │
│       │              │ Includes:                            │
│       │              │ - Anamnese atual                     │
│       │              │ - Red flags identificados            │
│       │              │ - Instruções para citações           │
│       │              │ - Guardrails médicos                 │
│       │                                                      │
│  • Streaming via SSE                                        │
│  • Structured output para citações                          │
│  • Fallback para mensagem genérica se API falhar            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Prompt Engineering Strategy
```typescript
const systemPrompt = `
Você é um assistente médico especializado em medicina de emergência.
Sua função é fornecer suporte à decisão clínica baseada em evidências.

REGRAS OBRIGATÓRIAS:
1. SEMPRE inclua citações com PMID/DOI quando disponíveis
2. SEMPRE destaque red flags se presentes
3. SEMPRE priorize diretrizes brasileiras (SBC, SBPT, SBD, MS)
4. NUNCA sugira diagnóstico definitivo - use "hipótese diagnóstica"
5. SEMPRE inclua disclaimer sobre julgamento clínico

FORMATO DE RESPOSTA:
1. Hipóteses diagnósticas (ordenadas por probabilidade)
2. Exames recomendados
3. Condutas sugeridas
4. Referências (formato: Autor - Periódico - Ano - PMID)
`;
```

### Alternatives Considered
| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| Anthropic Claude | Contexto maior, safety | API menos madura streaming | OpenAI mais estável |
| Gemini | Multimodal | Menos testado em medical | OpenAI referência |
| Local LLM (Llama) | Privacidade | Latência, infra própria | Complexidade |

---

## 7. Text Generation Strategy

### Decision: Template-Based (Deterministic) + Optional AI Enhancement

### Rationale
- Texto médico requer precisão e reprodutibilidade
- Templates garantem estrutura consistente e sem alucinações
- AI usado apenas para polimento opcional, não para geração primária
- Alinhado com Constitution: "Every AI call MUST have a deterministic fallback"

### Implementation
```typescript
// Geração de texto é DETERMINÍSTICA
function generateAnamneseText(
  syndrome: Syndrome,
  checkedItems: CheckedItem[],
  mode: 'summary' | 'detailed'
): string {
  // 1. Agrupa checkboxes por categoria
  const grouped = groupByCategory(checkedItems);

  // 2. Aplica template da síndrome
  const sections = syndrome.template.sections.map(section => {
    const items = grouped[section.category] || [];
    return section.render(items);
  });

  // 3. Adiciona negativas explícitas
  const negatives = checkedItems
    .filter(item => item.isNegative)
    .map(item => item.narrativeText);

  // 4. Monta texto final
  return formatAnamnese(sections, negatives, mode);
}
```

### Red Flag Detection
```typescript
// Detecção de red flags é DETERMINÍSTICA
function detectRedFlags(
  syndrome: Syndrome,
  checkedItems: CheckedItem[]
): RedFlag[] {
  const redFlagRules = syndrome.redFlagRules;

  return redFlagRules.filter(rule => {
    // Regras são definidas no template da síndrome
    // Ex: dor típica + idade > 40 + fatores de risco >= 2
    return rule.condition(checkedItems);
  });
}
```

---

## 8. Design System: Apple Design Language 2025

### Decision: Design system customizado baseado em Apple HIG

### Rationale
- Requisito hard da Constitution: "Apple Design Language 2025 principles"
- Glassmorphism para visual moderno e elegante
- Dark mode otimizado para ambientes de plantão
- Inter como substituto web de SF Pro

### Design Tokens
```typescript
// lib/design-tokens.ts
export const designTokens = {
  colors: {
    // Glass surfaces
    glass: {
      background: 'rgba(255, 255, 255, 0.3)',
      backgroundDark: 'rgba(28, 28, 30, 0.6)',
      border: 'rgba(255, 255, 255, 0.2)',
      borderDark: 'rgba(255, 255, 255, 0.1)',
    },
    // Apple accent palette
    accent: {
      blue: '#007AFF',
      green: '#34C759',
      orange: '#FF9500',
      red: '#FF3B30',
      purple: '#AF52DE',
    },
    // Semantic colors
    semantic: {
      redFlag: '#FF3B30',
      required: '#FF9500',
      success: '#34C759',
      info: '#007AFF',
    },
  },
  blur: {
    glass: '20px',
    overlay: '40px',
  },
  radius: {
    button: '8px',
    card: '12px',
    cardLarge: '20px',
    container: '28px',
  },
  motion: {
    spring: {
      stiffness: 300,
      damping: 30,
    },
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    scale: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
    },
  },
} as const;
```

### Tailwind Configuration
```typescript
// tailwind.config.ts
import { designTokens } from './lib/design-tokens';

export default {
  theme: {
    extend: {
      colors: {
        glass: designTokens.colors.glass,
        accent: designTokens.colors.accent,
        semantic: designTokens.colors.semantic,
      },
      borderRadius: {
        button: designTokens.radius.button,
        card: designTokens.radius.card,
        'card-lg': designTokens.radius.cardLarge,
        container: designTokens.radius.container,
      },
      backdropBlur: {
        glass: designTokens.blur.glass,
        overlay: designTokens.blur.overlay,
      },
      fontFamily: {
        sans: [designTokens.typography.fontFamily],
      },
    },
  },
};
```

---

## 9. Testing Strategy

### Decision: Vitest + Testing Library + Playwright

### Rationale
- Vitest: compatível com Vite, rápido, ESM-first
- Testing Library: testes focados em comportamento do usuário
- Playwright: E2E para fluxos críticos (anamnese, auth)
- Alinhado com Constitution: "≥80% coverage for business logic"

### Test Coverage Requirements
| Layer | Tool | Coverage Target |
|-------|------|-----------------|
| Unit (business logic) | Vitest | ≥80% |
| Component (UI) | Testing Library | ≥60% |
| Integration (API) | Vitest + MSW | ≥70% |
| E2E (critical flows) | Playwright | 100% dos cenários |

### Critical E2E Flows
1. Login completo (email/senha → dashboard)
2. Fluxo de anamnese de dor torácica (selecionar → gerar → copiar)
3. ChatWell (enviar pergunta → receber resposta com citações)
4. Detecção de red flags (marcar red flag → ver destaque)

---

## 10. Observability

### Decision: Sentry + Vercel Analytics

### Rationale
- Sentry: error tracking, performance monitoring, session replay
- Vercel Analytics: Core Web Vitals, tempo de carregamento
- Alinhado com Constitution: "Sentry" para observabilidade

### Monitoring Requirements
```typescript
// Métricas críticas a monitorar
const metrics = {
  performance: {
    initialLoad: '< 2s',           // Constitution requirement
    textGeneration: '< 1.5s',     // Constitution requirement
    chatFirstToken: '< 2s',        // Spec requirement
  },
  availability: {
    uptime: '≥ 99.9%',            // Constitution requirement
    errorRate: '< 0.1%',
  },
  business: {
    anamneseTime: '< 90s',        // Success criteria
    copyRate: 'track',            // Engagement metric
    chatUsage: 'track',           // Feature adoption
  },
};
```

---

## 11. Security & Compliance

### Decision: LGPD by design + RLS + Audit Logs

### Rationale
- Dados de saúde exigem proteção especial (LGPD Art. 11)
- RLS no Supabase isola dados por usuário automaticamente
- Audit logs para todas as ações médicas
- Alinhado com Constitution: "LGPD compliant" e "Audit logs for ALL data access"

### Implementation
```sql
-- Row Level Security no Supabase
ALTER TABLE anamnese_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access own sessions" ON anamnese_sessions
  FOR ALL
  USING (auth.uid() = user_id);

-- Audit log table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action VARCHAR(50) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id UUID,
  metadata JSONB,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Data Privacy
- **NO PHI in logs**: Anamnese content not logged, only metadata
- **Session data**: Stored for audit, anonymizable after retention period
- **Patient data**: NOT stored in MVP (copy-paste only)

---

## 12. Project Structure

### Decision: Feature-based + Domain-driven

### Rationale
- Separação clara entre domínios (medical, auth, chat)
- Componentes UI isolados do domínio médico
- Facilita testes e manutenção
- Alinhado com Constitution project structure

### Structure
```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Public routes
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── forgot-password/
│   │       └── page.tsx
│   ├── (dashboard)/              # Protected routes
│   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   ├── page.tsx              # Dashboard home
│   │   ├── anamnese/
│   │   │   ├── page.tsx          # Syndrome selection
│   │   │   └── [syndromeId]/
│   │   │       └── page.tsx      # Anamnese generator
│   │   ├── chat/
│   │   │   └── page.tsx          # EBM Chat
│   │   └── history/
│   │       └── page.tsx          # Session history
│   └── api/
│       ├── syndromes/
│       │   └── route.ts
│       ├── chat/
│       │   └── route.ts          # AI chat endpoint
│       └── auth/
│           └── [...supabase]/
│               └── route.ts
│
├── components/
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   └── ...
│   ├── medical/                  # Medical domain components
│   │   ├── syndrome-selector.tsx
│   │   ├── checkbox-panel.tsx
│   │   ├── text-preview.tsx
│   │   ├── red-flag-alert.tsx
│   │   └── copy-button.tsx
│   ├── chat/                     # Chat components
│   │   ├── chat-interface.tsx
│   │   ├── message-bubble.tsx
│   │   └── citation-card.tsx
│   └── layout/                   # Layout components
│       ├── header.tsx
│       ├── sidebar.tsx
│       └── split-screen.tsx
│
├── lib/
│   ├── ai/                       # AI integration
│   │   ├── prompts.ts            # System prompts
│   │   └── chat-config.ts        # Vercel AI SDK config
│   ├── db/                       # Database
│   │   └── prisma.ts             # Prisma client
│   ├── templates/                # Medical templates
│   │   ├── chest-pain.ts
│   │   ├── dyspnea.ts
│   │   ├── acute-abdomen.ts
│   │   └── index.ts
│   ├── medical/                  # Medical logic
│   │   ├── text-generator.ts
│   │   ├── red-flag-detector.ts
│   │   └── validators.ts
│   └── utils/                    # Utilities
│       ├── cn.ts                 # classnames helper
│       └── format.ts
│
├── stores/                       # Zustand stores
│   ├── anamnese-store.ts
│   ├── auth-store.ts
│   └── ui-store.ts
│
├── hooks/                        # Custom hooks
│   ├── use-anamnese.ts
│   ├── use-syndromes.ts
│   └── use-chat.ts
│
├── types/                        # TypeScript types
│   ├── medical.ts
│   ├── auth.ts
│   └── api.ts
│
└── styles/
    └── globals.css               # Tailwind + custom styles
```

---

## 13. Open Questions (Resolved)

| Question | Resolution |
|----------|------------|
| Como lidar com latência de IA? | Streaming SSE + skeleton loading + fallback determinístico |
| Templates hardcoded ou DB? | DB (Prisma) com seed inicial, editável via admin em v1.0 |
| Validação de CRM? | Manual no MVP, API CFM em versão futura |
| Multi-idioma? | Português BR only no MVP |
| Dados de paciente? | NÃO armazenados - copy-paste only |

---

## 14. Constitution Compliance Check

| Principle | Compliance | Notes |
|-----------|------------|-------|
| 1. Spec-Driven Development | ✅ | Spec exists before plan |
| 2. Code Quality & Medical Precision | ✅ | TypeScript strict, medical terminology |
| 3. Testing | ✅ | Vitest + Playwright strategy defined |
| 4. Documentation | ✅ | OpenAPI + Storybook planned |
| 5. Security & Healthcare Compliance | ✅ | LGPD + RLS + Audit logs |
| 6. Performance | ✅ | Targets defined, monitoring setup |
| 7. Apple Design Language 2025 | ✅ | Design tokens defined |
| 8. AI-First Architecture | ✅ | Streaming + fallbacks + guardrails |
| 9. Healthcare Domain Integrity | ✅ | Deterministic templates + red flag rules |

---

## References

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)
- [CFM Resoluções sobre PEP](https://portal.cfm.org.br)
- Constitution: `/memory/constitution.md`
- PRD: `/docs/PRD.md`
