# Configuração do Banco de Dados

Este projeto usa **PostgreSQL** como banco de dados, **Prisma** como ORM e **Supabase** para serviços adicionais (autenticação, storage, real-time).

## Arquitetura

O projeto utiliza uma abordagem híbrida:

- **Prisma**: Para queries complexas, migrations, type-safety do schema e acesso direto ao PostgreSQL
- **Supabase**: Para autenticação, storage de arquivos, real-time subscriptions, Edge Functions e Row Level Security (RLS)

Ambos utilizam a mesma instância PostgreSQL do Supabase em produção, permitindo flexibilidade na escolha da ferramenta certa para cada tarefa.

### Ambientes

- **Produção**: Supabase (com PgBouncer e SSL obrigatórios)
- **Desenvolvimento**: PostgreSQL local via Docker (recomendado para evitar consumo desnecessário de conexões)

### LGPD e Retenção de Dados

- **Campos sensíveis**: `AnamneseSession.generatedText` e `ChatMessage.content` armazenam texto clínico. Evite inserir identificadores de pacientes; o MVP assume conteúdo desidentificado.
- **Retenção recomendada**: 30 dias para histórico de chat e anamnese gerada. Planeje um job de limpeza ou política de retenção no provedor.
- **Fallback/Mock**: use `MOCK_AI=true` em ambientes de teste/CI para impedir envio de conteúdo clínico real a provedores externos.

## Configuração Inicial

### 1. Desenvolvimento Local (Docker)

**Passo 1: Iniciar banco de dados local**

```bash
# Iniciar containers PostgreSQL
./scripts/docker-db.sh start

# Ou manualmente
docker-compose up -d
```

Isso criará dois containers:
- `ww_postgres` na porta 5432 (banco principal)
- `ww_postgres_shadow` na porta 5433 (banco para migrations do Prisma)

**Passo 2: Configurar .env**

```bash
# Opção 1: Script interativo
./scripts/setup-database.sh
# Escolha opção 1 (Desenvolvimento Local)

# Opção 2: Manualmente
cp env.template .env
# Edite o .env e descomente a DATABASE_URL local
```

Para desenvolvimento local, seu `.env` deve ter:

```bash
# ---- DATABASE (Local - Desenvolvimento) ----
DATABASE_URL="postgresql://postgres:devpassword@localhost:5432/postgres"
SHADOW_DATABASE_URL="postgresql://postgres:devpassword@localhost:5433/postgres_shadow"

# ---- SUPABASE KEYS (opcional em dev) ----
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..."

# ---- ENVIRONMENT ----
NODE_ENV="development"
```

**Passo 3: Gerar cliente Prisma e aplicar schema**

```bash
# Gerar cliente Prisma
pnpm prisma generate

# Aplicar schema ao banco
pnpm prisma migrate dev
# ou
pnpm prisma db push
```

### 2. Produção (Supabase + Vercel)

**Passo 1: Obter credenciais do Supabase**

1. Acesse o [Supabase Dashboard](https://app.supabase.com)
2. Vá em **Settings > API**
3. Copie:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

4. Vá em **Settings > Database**
5. Copie a **Connection String** (use a que tem **Connection Pooling**)
   - Deve incluir `?pgbouncer=true&sslmode=require`

**Passo 2: Configurar .env para produção**

```bash
./scripts/setup-database.sh
# Escolha opção 2 (Produção)
```

Ou manualmente:

```bash
# ---- DATABASE (Supabase - Produção) ----
DATABASE_URL="postgresql://postgres:SENHA@db.xxxxx.supabase.co:5432/postgres?pgbouncer=true&sslmode=require"
SHADOW_DATABASE_URL="postgresql://postgres:SENHA@db.xxxxx.supabase.co:5432/postgres?pgbouncer=true&sslmode=require"

# ---- SUPABASE KEYS ----
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..."

# ---- ENVIRONMENT ----
NODE_ENV="production"
```

**⚠️ CRÍTICO para Vercel:**

1. Configure todas as variáveis no **Vercel Dashboard**:
   - Settings > Environment Variables
   - Adicione todas as variáveis do `.env`
   - Configure para **Production** e **Preview**

2. **Sempre use PgBouncer em produção:**
   ```
   ?pgbouncer=true&sslmode=require
   ```

3. **Nunca exponha `SUPABASE_SERVICE_ROLE_KEY` no client-side**

## Comandos Úteis

### Docker (Desenvolvimento Local)

```bash
# Iniciar containers
./scripts/docker-db.sh start

# Parar containers
./scripts/docker-db.sh stop

# Reiniciar containers
./scripts/docker-db.sh restart

# Ver logs
./scripts/docker-db.sh logs

# Ver status
./scripts/docker-db.sh status

# Resetar (apaga todos os dados)
./scripts/docker-db.sh reset
```

### Prisma CLI

```bash
# Gerar cliente Prisma
pnpm prisma generate

# Criar nova migration
pnpm prisma migrate dev --name nome_da_migration

# Aplicar migrations pendentes
pnpm prisma migrate deploy

# Aplicar schema diretamente (sem migrations)
pnpm prisma db push

# Abrir Prisma Studio (interface visual)
pnpm prisma studio

# Resetar banco de dados (CUIDADO: apaga todos os dados)
pnpm prisma migrate reset

# Ver status das migrations
pnpm prisma migrate status
```

## Schema do Banco de Dados

O schema está definido em `prisma/schema.prisma` com os seguintes modelos:

### Patient (Paciente)

```prisma
model Patient {
  id        String     @id @default(cuid())
  name      String
  phone     String?
  birthDate DateTime?
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  anamneses Anamnese[]
}
```

### Anamnese

```prisma
model Anamnese {
  id         String   @id @default(cuid())
  patientId  String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  structured Json     // dados estruturados coletados
  finalText  String   // texto narrativo final gerado pela IA
  Patient    Patient  @relation(fields: [patientId], references: [id])
}
```

## Migrations

### Criar Nova Migration

```bash
# Desenvolvimento
pnpm prisma migrate dev --name nome_da_migration

# Isso irá:
# 1. Criar arquivo de migration em prisma/migrations/
# 2. Aplicar a migration ao banco
# 3. Gerar o cliente Prisma
```

### Aplicar Migrations em Produção

```bash
# No Vercel, migrations são aplicadas automaticamente no build
# Ou manualmente:
pnpm prisma migrate deploy
```

## Shadow Database

O Prisma usa um **Shadow Database** para validar migrations. Ele:

- Em **desenvolvimento**: Pode ser um banco separado (porta 5433) ou o mesmo banco
- Em **produção**: Geralmente usa o mesmo `DATABASE_URL`

Configure via `SHADOW_DATABASE_URL` no `.env`.

## Troubleshooting

### Erro: "Can't reach database server"

**Local:**
- Verifique se Docker está rodando: `docker ps`
- Verifique se containers estão up: `./scripts/docker-db.sh status`
- Tente reiniciar: `./scripts/docker-db.sh restart`

**Produção:**
- Verifique se a URL está correta
- Confirme que está usando PgBouncer: `?pgbouncer=true&sslmode=require`
- Verifique credenciais no Supabase Dashboard

### Erro: "database does not exist"

**Local:**
- Os containers Docker criam o banco automaticamente
- Se necessário, recrie: `./scripts/docker-db.sh reset`

**Produção:**
- O banco já existe no Supabase
- Verifique se está usando a connection string correta

### Erro: "relation does not exist"

- Execute migrations: `pnpm prisma migrate dev`
- Ou aplique schema: `pnpm prisma db push`

### Erro: "Connection pool timeout" (Vercel)

- **SEMPRE** use `?pgbouncer=true` na `DATABASE_URL` em produção
- Verifique se está usando a connection string de **Connection Pooling** do Supabase
- Não a connection string direta

### Resetar Tudo (Desenvolvimento)

```bash
# CUIDADO: Isso apaga todos os dados!
./scripts/docker-db.sh reset
pnpm prisma migrate reset
```

## Segurança

⚠️ **IMPORTANTE:**

1. **Nunca commite o arquivo `.env`** (já está no `.gitignore`)
2. **Use `env.template`** como referência para outros desenvolvedores
3. **Em produção (Vercel)**, configure variáveis no Dashboard
4. **Nunca exponha `SUPABASE_SERVICE_ROLE_KEY`** no client-side
5. **Sempre use SSL** em produção: `sslmode=require`
6. **Sempre use PgBouncer** em produção: `pgbouncer=true`

## Próximos Passos

Após configurar o banco:

1. ✅ Criar/editar modelos no `prisma/schema.prisma`
2. ✅ Executar `pnpm prisma generate`
3. ✅ Criar migrations: `pnpm prisma migrate dev`
4. ✅ Usar `@prisma/client` no código da aplicação
5. ✅ Configurar autenticação e RLS no Supabase (se necessário)
6. ✅ Gerar tipos TypeScript do Supabase (se necessário)

## Referências

- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
- [Supabase Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
- [Vercel + Prisma Integration](https://vercel.com/docs/storage/vercel-postgres/using-an-orm)
