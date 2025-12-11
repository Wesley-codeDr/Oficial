# Plano de Rollback - WellWave MVP

> Documento de contingência para reversão rápida em caso de problemas críticos em produção.

---

## 🚨 Gatilhos para Rollback

Iniciar rollback imediatamente se:

- **Error rate** > 50% por 5 minutos contínuos
- **Tempo de resposta** > 10 segundos por 5 minutos
- **Features críticas quebradas**: login, anamnese, chat EBM
- **Perda de dados** detectada ou reportada
- **Vulnerabilidade de segurança** identificada

---

## 🔄 Procedimentos de Rollback

### 1. Rollback de Deploy (Vercel)

**Tempo estimado: ~30 segundos**

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Navegue até **Project → Deployments**
3. Localize o último deploy **estável** (marcado com ✓ verde antes do problema)
4. Clique nos **"..."** → **"Promote to Production"**
5. Aguarde confirmação (~30 segundos)
6. Verifique se o site está funcionando

```bash
# Alternativa via CLI (se tiver vercel CLI instalado)
vercel rollback
```

### 2. Rollback de Database (Supabase)

**Tempo estimado: 5-10 minutos**

#### Opção A: Point-in-Time Recovery (Pro Plan)
1. Acesse [Supabase Dashboard](https://supabase.com/dashboard)
2. Navegue até **Database → Backups**
3. Selecione **"Point in time recovery"**
4. Escolha timestamp **anterior ao problema**
5. Clique em **"Restore"**
6. Aguarde conclusão (~5-10 minutos)

#### Opção B: Daily Backup (Free Plan)
1. Acesse **Database → Backups**
2. Selecione o backup diário mais recente **antes do problema**
3. Clique em **"Restore"**
4. Aguarde conclusão

⚠️ **ATENÇÃO**: Restore de banco sobrescreve dados. Dados inseridos após o backup serão perdidos.

### 3. Rollback de Schema (Prisma)

**Se uma migration causou o problema:**

```bash
# Ver histórico de migrations
pnpm prisma migrate status

# Verificar SQL da migration problemática
cat prisma/migrations/[TIMESTAMP]_[nome]/migration.sql

# Reverter manualmente (criar migration de reversão)
pnpm prisma migrate dev --name revert_[nome_migration]
```

**Reversão manual via SQL Editor do Supabase:**
1. Acesse **SQL Editor** no Supabase
2. Execute os comandos de reversão apropriados
3. Sincronize o Prisma: `pnpm prisma db pull`

---

## 📞 Contatos de Emergência

| Serviço | Contato | Tempo de Resposta |
|---------|---------|-------------------|
| **Supabase Support** | support@supabase.io | 24-48h (Free), 4h (Pro) |
| **Vercel Support** | support@vercel.com | 24-48h (Free), 4h (Pro) |
| **OpenAI Status** | status.openai.com | N/A |
| **Sentry Status** | status.sentry.io | N/A |

---

## 📋 Checklist Pós-Rollback

Após executar rollback:

- [ ] **Verificar funcionamento** - Testar features críticas manualmente
- [ ] **Notificar equipe** - Informar sobre o rollback e motivo
- [ ] **Monitorar métricas** - Acompanhar error rate e latência por 30 min
- [ ] **Documentar incidente** - Registrar:
  - Horário de início do problema
  - Horário do rollback
  - Causa identificada (se conhecida)
  - Impacto estimado (usuários afetados)
- [ ] **Criar issue** - Abrir issue no GitHub para fix definitivo
- [ ] **Agendar post-mortem** - Se incidente grave, agendar reunião de análise

---

## 🔍 Comandos Úteis de Diagnóstico

```bash
# Verificar status do Prisma
pnpm prisma migrate status

# Verificar conexão com banco
pnpm prisma db pull --print

# Verificar logs do Vercel
vercel logs --follow

# Verificar variáveis de ambiente
vercel env ls
```

---

## 📊 Histórico de Incidentes

| Data | Descrição | Ação | Resolução |
|------|-----------|------|-----------|
| _YYYY-MM-DD_ | _Descrição do incidente_ | _Rollback realizado_ | _Causa e fix_ |

---

## 📚 Referências

- [Vercel Rollback Docs](https://vercel.com/docs/deployments/rollback)
- [Supabase Backup & Restore](https://supabase.com/docs/guides/platform/backups)
- [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)

---

*Última atualização: Dezembro 2024*
