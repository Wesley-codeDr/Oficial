# Visão Geral do Sistema WellWave

## Arquitetura de Alto Nível

```mermaid
graph TB
    subgraph "Frontend Layer"
        UI[Next.js 15 App Router]
        COMP[React Components]
        STATE[Zustand + TanStack Query]
    end
    
    subgraph "API Layer"
        API[Next.js API Routes]
        AUTH[Supabase Auth]
        AI[OpenAI Integration]
    end
    
    subgraph "Data Layer"
        DB[(PostgreSQL + Supabase)]
        CACHE[Cache Layer]
        FILES[File Storage]
    end
    
    subgraph "External Services"
        OPENAI[OpenAI API]
        SENTRY[Sentry Monitoring]
        VERCEL[Vercel Hosting]
    end
    
    UI --> API
    COMP --> STATE
    API --> AUTH
    API --> AI
    API --> DB
    API --> CACHE
    API --> FILES
    AI --> OPENAI
    UI --> SENTRY
    UI --> VERCEL
```

## Componentes Principais

### Frontend Layer

**Next.js 15 com App Router**
- Server Components por padrão
- Client Components apenas quando necessário
- Streaming de dados com Suspense

**React 19**
- Concurrent features
- Server Actions para mutações
- Optimistic updates

**State Management**
- Zustand para estado do cliente
- TanStack Query para estado do servidor
- React Context para tema e autenticação

### API Layer

**Next.js API Routes**
- Endpoints RESTful
- Middleware para autenticação
- Rate limiting implementado

**Autenticação**
- Supabase Auth com JWT
- Row Level Security (RLS)
- Session management

**Integração com IA**
- Vercel AI SDK
- OpenAI GPT-4
- Streaming responses

### Data Layer

**PostgreSQL via Supabase**
- Schema com Prisma ORM
- Migrations versionadas
- Índices otimizados

**Cache Strategy**
- Next.js Data Cache
- Client-side caching com TanStack
- Edge caching para dados públicos

**File Storage**
- Supabase Storage
- Uploads de arquivos médicos
- CDN para assets estáticos

## Fluxos de Dados

### Fluxo de Autenticação

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Supabase
    
    User->>Frontend: Login request
    Frontend->>Supabase: Authenticate
    Supabase-->>Frontend: JWT token
    Frontend->>API: Request with token
    API->>Supabase: Validate token
    Supabase-->>API: Token valid
    API-->>Frontend: User data
    Frontend-->>User: Logged in
```

### Fluxo de Anamnese

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant DB
    participant AI
    
    User->>Frontend: Select syndrome
    Frontend->>API: GET /syndromes/:id
    API->>DB: Query syndrome data
    DB-->>API: Syndrome + checkboxes
    API-->>Frontend: Syndrome data
    
    User->>Frontend: Mark checkboxes
    Frontend->>Frontend: Generate text locally
    Frontend->>API: POST /anamnese/sessions
    API->>DB: Save session
    DB-->>API: Session saved
    API-->>Frontend: Session ID
    
    User->>Frontend: Open chat
    Frontend->>API: POST /chat/conversations
    API->>AI: Send context + question
    AI-->>API: Stream response
    API-->>Frontend: Streamed response
```

## Modelo de Dados

### Entidades Principais

```mermaid
erDiagram
    User ||--o{ AnamneseSession : creates
    User ||--o{ ChatConversation : has
    User ||--o{ AuditLog : generates
    
    Syndrome ||--o{ Checkbox : contains
    Syndrome ||--o{ RedFlagRule : defines
    Syndrome ||--o{ AnamneseSession : used_in
    
    AnamneseSession ||--o{ ChatConversation : context_for
    ChatConversation ||--o{ ChatMessage : contains
    
    User {
        string id PK
        string email UK
        string fullName
        string crmNumber
        string crmState
        string specialty
        boolean isActive
        datetime createdAt
        datetime updatedAt
        datetime lastLoginAt
    }
    
    Syndrome {
        string id PK
        string name UK
        string code UK
        string description
        string icon
        integer orderIndex
        boolean isActive
        datetime createdAt
        datetime updatedAt
    }
    
    Checkbox {
        string id PK
        string syndromeId FK
        enum category
        string displayText
        string narrativeText
        boolean isRequired
        boolean isRedFlag
        boolean isNegative
        integer orderIndex
        datetime createdAt
        datetime updatedAt
    }
    
    AnamneseSession {
        string id PK
        string userId FK
        string syndromeId FK
        json checkedItems
        text generatedText
        enum outputMode
        json redFlagsDetected
        boolean wasCopied
        datetime startedAt
        datetime completedAt
        datetime createdAt
    }
```

## Padrões Arquiteturais

### 1. Server-First Architecture
- Server Components como padrão
- Client Components apenas quando necessário
- Redução do bundle size

### 2. API Gateway Pattern
- Next.js API Routes como gateway
- Middleware centralizado
- Rate limiting e autenticação

### 3. Repository Pattern
- Abstração com Prisma
- Facilita testes
- Isola lógica de negócio

### 4. CQRS (Command Query Responsibility Segregation)
- Queries otimizadas para leitura
- Commands para escrita
- Separação clara de responsabilidades

## Considerações de Escalabilidade

### Horizontal Scaling
- Serverless functions no Vercel
- Auto-scaling automático
- Load balancing embutido

### Database Scaling
- Connection pooling com PgBouncer
- Read replicas quando necessário
- Índices otimizados

### Caching Strategy
- Múltiplos níveis de cache
- Cache invalidação inteligente
- Edge caching para conteúdo estático

## Segurança

### Autenticação e Autorização
- JWT tokens com expiração
- Row Level Security (RLS)
- Rate limiting por usuário

### Proteção de Dados
- Criptografia AES-256 em repouso
- TLS 1.3 em trânsito
- Sensitive data nunca em logs

### Auditoria
- Audit logs para todas as ações
- Rastreamento completo
- Conformidade LGPD

## Performance

### Frontend Optimization
- Code splitting automático
- Lazy loading de componentes
- Bundle optimization

### Backend Optimization
- Queries otimizadas com Prisma
- Connection pooling
- Response caching

### Monitoring
- Sentry para errors
- Performance monitoring
- Custom metrics

## Deploy e Infraestrutura

### Ambientes
- **Development:** Local + Vercel Preview
- **Staging:** Vercel com dados de teste
- **Production:** Vercel + Supabase Pro

### CI/CD
- GitHub Actions para automação
- Deploy automático em merge
- Rollback automático

### Backup e Recovery
- Backups diários automáticos
- Point-in-time recovery
- Testes de restore regulares

## Tecnologias e Ferramentas

### Frontend Stack
- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19 + Tailwind CSS
- **Components:** shadcn/ui + Radix UI
- **State:** Zustand + TanStack Query
- **Animations:** Framer Motion

### Backend Stack
- **Runtime:** Node.js 18+
- **Framework:** Next.js API Routes
- **Database:** PostgreSQL via Supabase
- **ORM:** Prisma
- **Auth:** Supabase Auth

### DevOps Stack
- **Hosting:** Vercel
- **Database:** Supabase
- **Monitoring:** Sentry
- **CI/CD:** GitHub Actions
- **Package Manager:** pnpm

## Próximos Passos

### Melhorias de Arquitetura
1. Implementar Redis para caching distribuído
2. Adotar microservices para escalabilidade
3. Implementar GraphQL para otimização de queries
4. Adicionar message queue para processamento assíncrono

### Otimizações de Performance
1. Implementar edge functions para globalização
2. Otimizar bundle size
3. Adicionar service workers para offline
4. Implementar database sharding se necessário

### Melhorias de Segurança
1. Implementar 2FA para autenticação
2. Adicionar WAF para proteção
3. Implementar rate limiting avançado
4. Adicionar security scanning automatizado

## Referencias

- [Data flow](data-flow.md)
- [Security](security.md)
- [Performance](performance.md)
- [Scalability](scalability.md)
