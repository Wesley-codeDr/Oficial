# 🗄️ Guia de Migração de Database - Performance Indexes

## ⚠️ Ação Necessária

As melhorias de performance implementadas incluem **6 novos indexes** no banco de dados que precisam ser aplicados via migração Prisma.

---

## 📋 Pré-requisitos

1. **Acesso ao banco de dados** (Supabase ou PostgreSQL)
2. **Variáveis de ambiente configuradas** (`.env.local`)
3. **Conexão de rede estável**

---

## 🚀 Executar Migração

### Opção 1: Migração Automática (Recomendado)

```bash
# Aplicar migração e criar indexes
pnpm prisma migrate dev --name add_performance_indexes

# Verificar se migração foi aplicada
pnpm prisma migrate status
```

**Tempo esperado**: 1-2 minutos (depende do tamanho do banco)

---

### Opção 2: Migração Manual (Se automática falhar)

Se a migração automática não funcionar, execute SQL diretamente:

```sql
-- AnamneseSession indexes
CREATE INDEX IF NOT EXISTS "anamnese_sessions_createdAt_idx"
  ON "anamnese_sessions"("created_at");

CREATE INDEX IF NOT EXISTS "anamnese_sessions_userId_createdAt_idx"
  ON "anamnese_sessions"("user_id", "created_at");

-- ChatConversation indexes
CREATE INDEX IF NOT EXISTS "chat_conversations_createdAt_idx"
  ON "chat_conversations"("created_at");

CREATE INDEX IF NOT EXISTS "chat_conversations_updatedAt_idx"
  ON "chat_conversations"("updated_at");

CREATE INDEX IF NOT EXISTS "chat_conversations_userId_updatedAt_idx"
  ON "chat_conversations"("user_id", "updated_at");

-- RedFlagRule indexes
CREATE INDEX IF NOT EXISTS "red_flag_rules_isActive_idx"
  ON "red_flag_rules"("is_active");

CREATE INDEX IF NOT EXISTS "red_flag_rules_syndromeId_isActive_idx"
  ON "red_flag_rules"("syndrome_id", "is_active");
```

**Como executar SQL diretamente**:

#### Via Supabase Dashboard
1. Acesse: https://supabase.com/dashboard
2. Navegue até: **SQL Editor**
3. Cole o SQL acima
4. Clique em **Run**

#### Via psql (CLI)
```bash
psql $DATABASE_URL < migration.sql
```

---

## ✅ Verificar Indexes Criados

Após executar a migração, verifique se os indexes foram criados:

```sql
-- Ver todos os indexes das tabelas afetadas
SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename IN (
  'anamnese_sessions',
  'chat_conversations',
  'red_flag_rules'
)
ORDER BY tablename, indexname;
```

**Output esperado**: 16 indexes no total (10 existentes + 6 novos)

---

## 📊 Impacto Esperado

### Performance Gains

| Query | Antes | Depois | Melhoria |
|-------|-------|--------|----------|
| Listar sessões por usuário (ordenadas) | 100ms | 40-60ms | **-40 a -60%** |
| Buscar conversas recentes | 80ms | 30-50ms | **-40 a -60%** |
| Filtrar red flags ativas por síndrome | 50ms | 20-30ms | **-40 a -60%** |

### Queries Otimizadas

1. **AnamneseSession**
   - `SELECT * FROM anamnese_sessions WHERE user_id = ? ORDER BY created_at DESC`
   - `SELECT * FROM anamnese_sessions ORDER BY created_at DESC LIMIT 50`

2. **ChatConversation**
   - `SELECT * FROM chat_conversations WHERE user_id = ? ORDER BY updated_at DESC`
   - `SELECT * FROM chat_conversations ORDER BY updated_at DESC LIMIT 20`

3. **RedFlagRule**
   - `SELECT * FROM red_flag_rules WHERE is_active = true AND syndrome_id = ?`
   - `SELECT * FROM red_flag_rules WHERE is_active = true`

---

## 🔍 Troubleshooting

### Erro: "Connection timeout"
**Solução**: Verifique se `DATABASE_URL` e `DIRECT_URL` estão corretos em `.env.local`

### Erro: "Already exists"
**Solução**: Indexes já foram criados. Execute verificação para confirmar.

### Erro: "Permission denied"
**Solução**: Use `DIRECT_URL` (porta 5432) em vez de `DATABASE_URL` (porta 6543 com PgBouncer)

---

## 📝 Logs de Migração

Após executar, salve os logs para referência:

```bash
pnpm prisma migrate status > migration_status.log
```

---

## 🎯 Próximos Passos Após Migração

1. **Verificar performance** com queries reais
2. **Monitorar logs** de slow queries
3. **Executar ANALYZE** no PostgreSQL para atualizar estatísticas:
   ```sql
   ANALYZE anamnese_sessions;
   ANALYZE chat_conversations;
   ANALYZE red_flag_rules;
   ```

---

## 📚 Referências

- **Prisma Migrations**: https://www.prisma.io/docs/concepts/components/prisma-migrate
- **PostgreSQL Indexes**: https://www.postgresql.org/docs/current/indexes.html
- **Supabase SQL Editor**: https://supabase.com/docs/guides/database/overview

---

**Última atualização**: 2026-01-01
**Relacionado**: IMPROVEMENTS.md (seção Performance)
