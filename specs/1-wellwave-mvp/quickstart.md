# Quickstart Guide: WellWave MVP

Este guia fornece instruções para configurar e executar o projeto WellWave MVP localmente.

---

## Prerequisites

- **Node.js** 20.x LTS ou superior
- **pnpm** 8.x ou superior (recomendado) ou npm
- **Git**
- Conta no **Supabase** (gratuita para desenvolvimento)
- Chave de API da **OpenAI** (para ChatWell)

---

## 1. Clone e Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd wellwave

# Checkout na branch do MVP
git checkout 1-wellwave-mvp

# Instale as dependências
pnpm install
```

---

## 2. Configuração do Supabase

### 2.1 Criar Projeto

1. Acesse [supabase.com](https://supabase.com) e crie um novo projeto
2. Anote as credenciais:
   - **Project URL** (ex: `https://xxx.supabase.co`)
   - **Anon Key** (público)
   - **Service Role Key** (privado - apenas para migrações)

### 2.2 Configurar Variáveis de Ambiente

Crie o arquivo `.env.local` na raiz do projeto:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database (Prisma)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres

# OpenAI (para ChatWell)
OPENAI_API_KEY=sk-...

# Sentry (opcional para desenvolvimento)
NEXT_PUBLIC_SENTRY_DSN=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 3. Configuração do Banco de Dados

### 3.1 Executar Migrações

```bash
# Gerar cliente Prisma
pnpm prisma generate

# Executar migrações
pnpm prisma migrate dev

# Popular com dados iniciais (síndromes, checkboxes)
pnpm prisma db seed
```

### 3.2 Verificar no Supabase

1. Acesse o **Table Editor** no dashboard do Supabase
2. Verifique se as tabelas foram criadas:
   - `users`
   - `syndromes`
   - `checkboxes`
   - `red_flag_rules`
   - `anamnese_sessions`
   - `chat_conversations`
   - `chat_messages`
   - `audit_logs`

3. Verifique os dados de seed em `syndromes` e `checkboxes`

---

## 4. Executar o Projeto

### Modo Desenvolvimento

```bash
pnpm dev
```

O app estará disponível em [http://localhost:3000](http://localhost:3000).

### Comandos Úteis

```bash
# Lint
pnpm lint

# Type check
pnpm typecheck

# Build de produção
pnpm build

# Prisma Studio (visualizar banco)
pnpm prisma studio
```

### Comandos de Teste

```bash
# Testes unitários (55 testes)
pnpm vitest run

# Testes unitários em watch mode
pnpm test

# Testes unitários com coverage
pnpm test:coverage

# Testes E2E (requer servidor rodando)
pnpm playwright test

# Testes E2E apenas Chromium (mais rápido)
pnpm playwright test --project=chromium

# Testes E2E com UI interativa
pnpm test:e2e:ui

# Ver relatório de testes E2E
pnpm playwright show-report
```

**Cobertura atual:**
- **Unit Tests:** 55 testes (text generator, guardrails, citations, context)
- **E2E Tests:** 32 specs (auth, home, anamnese, chat)

---

## 5. Criar Usuário de Teste

### Via Supabase Dashboard

1. Acesse **Authentication** > **Users** no dashboard
2. Clique em **Add User** > **Create new user**
3. Preencha:
   - Email: `medico@teste.com`
   - Password: `senha123`
4. Após criar, adicione os dados do perfil via SQL:

```sql
INSERT INTO users (id, email, full_name, crm_number, crm_state)
VALUES (
  'uuid-do-usuario-criado',
  'medico@teste.com',
  'Dr. Teste',
  '123456',
  'SP'
);
```

### Via API (após implementar)

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "medico@teste.com",
    "password": "senha123",
    "fullName": "Dr. Teste",
    "crmNumber": "123456",
    "crmState": "SP"
  }'
```

---

## 6. Testar Fluxos Principais

### 6.1 Login

1. Acesse [http://localhost:3000/login](http://localhost:3000/login)
2. Use as credenciais do usuário de teste
3. Verifique redirecionamento para dashboard

### 6.2 Gerar Anamnese

1. No dashboard, selecione uma síndrome (ex: "Dor Torácica")
2. Marque alguns checkboxes
3. Observe o texto gerado em tempo real no painel direito
4. Verifique destaque de red flags se aplicável
5. Clique em "Copiar" e verifique o clipboard

### 6.3 ChatWell

1. Com uma anamnese preenchida, abra o ChatWell
2. Envie uma pergunta (ex: "Quais as hipóteses diagnósticas?")
3. Observe a resposta em streaming
4. Verifique citações na resposta

---

## 7. Estrutura de Diretórios

```
wellwave/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Rotas públicas
│   ├── (dashboard)/       # Rotas protegidas
│   └── api/               # API Routes
├── components/            # Componentes React
│   ├── ui/               # shadcn/ui
│   ├── medical/          # Componentes médicos
│   └── chat/             # Componentes de chat
├── lib/                   # Bibliotecas e utilitários
│   ├── ai/               # Integração OpenAI
│   ├── db/               # Cliente Prisma
│   ├── templates/        # Templates médicos
│   └── medical/          # Lógica de geração
├── stores/                # Zustand stores
├── hooks/                 # Custom hooks
├── types/                 # TypeScript types
├── prisma/                # Schema e migrations
└── tests/                 # Testes
```

---

## 8. Troubleshooting

### Erro de conexão com Supabase

```
Error: Connection refused
```

**Solução:** Verifique se as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `DATABASE_URL` estão corretas.

### Erro de migração Prisma

```
Error: P1001 - Can't reach database server
```

**Solução:**
1. Verifique a `DATABASE_URL`
2. Certifique-se de que o IP está liberado no Supabase (Database > Settings > Connection Pooling)

### Erro de autenticação

```
Error: Invalid JWT
```

**Solução:** Verifique se `NEXT_PUBLIC_SUPABASE_ANON_KEY` está correto.

### OpenAI não responde

```
Error: 401 Unauthorized
```

**Solução:** Verifique se `OPENAI_API_KEY` é válida e tem créditos.

---

## 9. Deploy para Produção

### Pre-Deploy Checklist

- [ ] Build de produção passa (`pnpm build`)
- [ ] Testes unitários passam (`pnpm vitest run` - 55 tests)
- [ ] TypeScript sem erros (`pnpm typecheck`)
- [ ] Lint sem erros (`pnpm lint`)

### Vercel (Recomendado)

1. Conecte o repositório ao Vercel
2. Configure as variáveis de ambiente na dashboard
3. Deploy é automático em cada push para `main`

### Variáveis de Ambiente para Produção

Configure no Vercel Dashboard (Settings > Environment Variables):

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string (Supabase) |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase service role key (server-side) |
| `OPENAI_API_KEY` | ✅ | OpenAI API key for ChatWell |
| `NEXT_PUBLIC_SENTRY_DSN` | ⚠️ | Sentry DSN for error tracking |
| `SENTRY_AUTH_TOKEN` | ⚠️ | Sentry auth token for source maps |
| `NEXT_PUBLIC_APP_URL` | ✅ | Production URL (ex: https://wellwave.com) |

### Post-Deploy Checklist

- [ ] Verificar que o deploy foi bem sucedido no Vercel
- [ ] Executar migrations no banco de produção (`pnpm db:push`)
- [ ] Popular dados iniciais (`pnpm db:seed`)
- [ ] Testar login/registro
- [ ] Testar geração de anamnese
- [ ] Testar ChatWell
- [ ] Verificar Sentry está recebendo eventos
- [ ] Configurar domínio customizado (opcional)

---

## 10. Referências

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [shadcn/ui](https://ui.shadcn.com)

### Documentação do Projeto

- Spec: `/specs/1-wellwave-mvp/spec.md`
- Research: `/specs/1-wellwave-mvp/research.md`
- Data Model: `/specs/1-wellwave-mvp/data-model.md`
- API Contract: `/specs/1-wellwave-mvp/contracts/openapi.yaml`
- Plan: `/specs/1-wellwave-mvp/plan.md`
- Constitution: `/memory/constitution.md`
- PRD: `/docs/PRD.md`
