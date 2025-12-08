# Supabase Configuration

Este diretório contém a configuração do cliente Supabase para o projeto.

## Arquivos

- `client.ts` - Cliente Supabase para uso no lado do cliente (browser)
- `server.ts` - Clientes Supabase para uso no servidor (API routes, server components)
- `types.ts` - Tipos TypeScript gerados do schema do banco de dados

## Uso

### Cliente no Browser (Client Components)

```typescript
import { supabase } from "@/lib/supabase/client";

// Exemplo: Buscar dados
const { data, error } = await supabase
  .from("tabela")
  .select("*");
```

### Cliente no Servidor (Server Components / API Routes)

```typescript
import { createServerClient } from "@/lib/supabase/server";

// Para operações administrativas (bypass RLS)
const supabase = createServerClient();
const { data, error } = await supabase
  .from("tabela")
  .select("*");
```

### Cliente no Servidor com Sessão do Usuário

```typescript
import { createServerClientWithSession } from "@/lib/supabase/server";

// Quando você tem um token de acesso do usuário
const supabase = createServerClientWithSession(accessToken);
const { data, error } = await supabase
  .from("tabela")
  .select("*");
```

## Variáveis de Ambiente

Certifique-se de ter as seguintes variáveis configuradas no `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_anon_key"
SUPABASE_SERVICE_ROLE_KEY="your_service_role_key"  # Apenas para server-side
```

## Gerando Tipos TypeScript

Para gerar tipos TypeScript do seu schema do Supabase:

### Opção 1: Usando Supabase CLI

```bash
# Instalar CLI
npm install -g supabase

# Login
supabase login

# Link do projeto
supabase link --project-ref your-project-ref

# Gerar tipos
supabase gen types typescript --linked > lib/supabase/types.ts
```

### Opção 2: Usando Dashboard do Supabase

1. Acesse o dashboard do Supabase
2. Vá em Settings > API
3. Role até "TypeScript types"
4. Copie os tipos gerados
5. Cole em `lib/supabase/types.ts`

## Segurança

⚠️ **IMPORTANTE**: 
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` pode ser exposta no cliente (é segura)
- `SUPABASE_SERVICE_ROLE_KEY` **NUNCA** deve ser exposta no cliente
- Use `createServerClient()` apenas em código server-side
- Use `createServerClientWithSession()` quando precisar respeitar RLS com sessão do usuário

## Integração com Prisma

Este projeto também usa Prisma para acesso ao banco de dados. Você pode usar:

- **Supabase**: Para autenticação, storage, real-time subscriptions, e Edge Functions
- **Prisma**: Para queries complexas, migrations, e type-safety do schema

Ambos podem coexistir e usar a mesma instância PostgreSQL do Supabase.

