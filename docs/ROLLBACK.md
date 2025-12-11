# Plano de Rollback - WellWave MVP

> **Documento de Contingência** - Última atualização: Dezembro 2024

---

## 🚨 Gatilhos para Rollback

Iniciar rollback imediatamente se:

- Error rate > 50% por 5 minutos consecutivos
- Tempo de resposta médio > 10s por 5 minutos
- Feature crítica quebrada (login, anamnese, chat EBM)
- Perda de dados detectada
- Vulnerabilidade de segurança crítica identificada

---

## 📋 Procedimentos de Rollback

### 1. Rollback de Deploy (Vercel)

**Tempo estimado: ~30 segundos**

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione o projeto **wellwave-mvp**
3. Vá para **Deployments**
4. Encontre o último deploy estável (marcado com ✅)
5. Clique nos **"..."** → **"Promote to Production"**
6. Aguarde confirmação (~30 segundos)
7. Verifique se a URL de produção está funcionando

**Via CLI (alternativa):**
```bash
# Listar deployments
vercel ls

# Promover deployment específico
vercel promote [deployment-url]
```

---

### 2. Rollback de Database (Supabase)

**Tempo estimado: 5-10 minutos**

#### Opção A: Point-in-Time Recovery (Pro Plan)
1. Acesse [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione o projeto
3. Vá para **Settings** → **Database** → **Backups**
4. Clique em **"Point-in-time Recovery"**
5. Selecione data/hora anterior ao problema
6. Confirme restauração
7. Aguarde conclusão

#### Opção B: Restore de Backup Diário (Free/Pro)
1. Acesse **Database** → **Backups**
2. Selecione o backup mais recente antes do problema
3. Clique em **"Restore"**
4. Confirme a operação
5. Aguarde conclusão (~5-10 minutos)

⚠️ **ATENÇÃO:** Restaurar backup sobrescreve TODOS os dados atuais!

---

### 3. Rollback de Schema (Prisma)

**Para reverter mudanças no schema:**

```bash
# Ver histórico de migrations
pnpm prisma migrate status

# Ver diferença entre schema e banco
pnpm prisma db pull

# Se necessário, reverter manualmente via SQL
# Consulte: prisma/migrations/[nome]/migration.sql
```

**Rollback manual de migration:**
```sql
-- Exemplo: Reverter adição de coluna
ALTER TABLE users DROP COLUMN IF EXISTS new_column;

-- Exemplo: Reverter criação de tabela
DROP TABLE IF EXISTS new_table CASCADE;
```

---

## 🔄 Checklist Pós-Rollback

- [ ] Verificar se aplicação está respondendo
- [ ] Testar login/autenticação
- [ ] Testar fluxo de anamnese
- [ ] Testar chat EBM
- [ ] Verificar logs de erro no Sentry
- [ ] Notificar equipe via Slack/Email
- [ ] Documentar causa do problema
- [ ] Criar issue no GitHub para investigação
- [ ] Agendar post-mortem (se necessário)

---

## 📞 Contatos de Emergência

| Serviço | Contato | SLA |
|---------|---------|-----|
| Supabase Support | support@supabase.io | 24h (Pro) |
| Vercel Support | support@vercel.com | 24h (Pro) |
| OpenAI Status | status.openai.com | - |
| Sentry Status | status.sentry.io | - |

---

## 📊 Informações de Backup

| Item | Frequência | Retenção | Tipo |
|------|------------|----------|------|
| Supabase (Free) | Diário | 7 dias | Automático |
| Supabase (Pro) | Contínuo | 30 dias | PITR |
| Vercel Deploys | Por commit | Ilimitado | Automático |
| Git Repository | Por commit | Ilimitado | Manual |

---

## 🔐 Variáveis de Ambiente Críticas

Em caso de comprometimento, regenerar imediatamente:

1. `SUPABASE_SERVICE_ROLE_KEY` - Supabase Dashboard → Settings → API
2. `OPENAI_API_KEY` - platform.openai.com/api-keys
3. `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase Dashboard → Settings → API

**Após regenerar:**
1. Atualizar no Vercel (Settings → Environment Variables)
2. Fazer redeploy
3. Revogar chaves antigas

---

## 📝 Template de Post-Mortem

```markdown
# Post-Mortem: [Título do Incidente]

**Data:** YYYY-MM-DD
**Duração:** HH:MM - HH:MM
**Severidade:** Alta/Média/Baixa
**Impacto:** [Descrição do impacto]

## Timeline
- HH:MM - Problema detectado
- HH:MM - Rollback iniciado
- HH:MM - Serviço restaurado

## Causa Raiz
[Descrição técnica]

## Ações Tomadas
1. [Ação 1]
2. [Ação 2]

## Prevenção Futura
- [ ] [Melhoria 1]
- [ ] [Melhoria 2]

## Lições Aprendidas
[Reflexões]
```
