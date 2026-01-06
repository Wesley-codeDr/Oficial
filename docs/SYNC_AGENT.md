# WellWave Sync Agent - Guia Operacional

**Versão:** MVP 1.0.0
**Data:** 2026-01-06
**Status:** Production Ready

---

## 📋 Visão Geral

O **Sync Agent** é um serviço standalone que sincroniza automaticamente conteúdo médico do Obsidian vault para o banco de dados PostgreSQL. Ele monitora mudanças em arquivos markdown e garante que o database sempre tenha a versão mais atualizada do conteúdo EBM (Evidence-Based Medicine).

### Características Principais

- ✅ **Unidirecional**: Apenas Obsidian → Database (MVP)
- ✅ **Auto-restart**: PM2 gerencia restarts automáticos
- ✅ **Retry resiliente**: Exponential backoff em caso de falhas
- ✅ **Health monitoring**: HTTP endpoint para status
- ✅ **Detecção de conflitos**: Hash-based conflict detection
- ✅ **Graceful shutdown**: Aguarda sync atual antes de parar

---

## 🚀 Instalação

### Pré-requisitos

```bash
# Node.js 18+ e pnpm
node --version  # >= 18.0.0
pnpm --version  # >= 8.0.0

# PM2 (gerenciador de processos)
pnpm install -g pm2

# tsx (TypeScript executor)
pnpm install -g tsx
```

### Configuração Inicial

1. **Instalar dependências**

```bash
cd /Users/wesleywillian/Oficial/Oficial
pnpm install
```

2. **Configurar variáveis de ambiente**

```bash
# .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/wellwave"
NODE_ENV="production"
SYNC_ON_START="true"
HEALTH_PORT="3001"
HEALTH_HOST="localhost"
```

3. **Validar conexão com database**

```bash
pnpm prisma db pull
```

4. **Criar diretório de logs**

```bash
mkdir -p logs
```

---

## 🎮 Uso

### Desenvolvimento

```bash
# Rodar agent diretamente (sem PM2)
pnpm tsx scripts/sync/agent.ts

# Ou usando npm script
pnpm run sync:agent
```

### Produção (PM2)

```bash
# Iniciar agent com PM2
pm2 start ecosystem.config.js

# Verificar status
pm2 status

# Ver logs em tempo real
pm2 logs sync-agent

# Restart
pm2 restart sync-agent

# Parar
pm2 stop sync-agent

# Remover do PM2
pm2 delete sync-agent

# Salvar configuração (persistir após reboot)
pm2 save

# Auto-start no boot do sistema
pm2 startup
```

### Monitoramento

```bash
# Monitor interativo do PM2
pm2 monit

# Metrics dashboard
pm2 dash

# Health check HTTP
curl http://localhost:3001/health

# Health check com jq (JSON formatted)
curl -s http://localhost:3001/health | jq
```

---

## 🏥 Health Check Endpoint

### Request

```http
GET http://localhost:3001/health
```

### Response (Healthy)

```json
{
  "status": "healthy",
  "uptime": 3600,
  "lastSyncAt": "2026-01-06T10:30:00.000Z",
  "lastSuccessAt": "2026-01-06T10:30:00.000Z",
  "lastErrorAt": null,
  "lastError": null,
  "stats": {
    "totalSyncs": 120,
    "successCount": 120,
    "errorCount": 0,
    "successRate": 100
  },
  "pendingFiles": 0,
  "timestamp": "2026-01-06T10:31:00.000Z"
}
```

### Response (Degraded)

```json
{
  "status": "degraded",
  "uptime": 7200,
  "lastSyncAt": "2026-01-06T12:00:00.000Z",
  "lastSuccessAt": "2026-01-06T11:55:00.000Z",
  "lastErrorAt": "2026-01-06T12:00:00.000Z",
  "lastError": "Connection timeout to database",
  "stats": {
    "totalSyncs": 200,
    "successCount": 180,
    "errorCount": 20,
    "successRate": 90
  },
  "pendingFiles": 3,
  "timestamp": "2026-01-06T12:01:00.000Z"
}
```

### Status Levels

| Status | Descrição | Success Rate | HTTP Code |
|--------|-----------|--------------|-----------|
| `healthy` | Funcionando perfeitamente | ≥ 90% | 200 |
| `degraded` | Funcionando com erros ocasionais | 50-89% | 200 |
| `unhealthy` | Falhas frequentes, requer atenção | < 50% | 503 |

---

## 📁 Estrutura de Arquivos

```
scripts/sync/
├── agent.ts              # Serviço principal
├── health-server.ts      # HTTP health check server
├── obsidian-to-db.ts     # Lógica de sync Obsidian → DB
├── watch.ts              # File watcher (legacy)
└── utils/
    ├── config.ts         # Configurações
    ├── markdown-parser.ts # Parser de markdown
    ├── sync-helpers.ts   # Helpers de sync
    └── obsidian-render.ts # Renderizador de markdown

logs/
├── sync-agent-out.log    # Logs de output
└── sync-agent-error.log  # Logs de erro

ecosystem.config.js       # Configuração PM2
```

---

## ⚙️ Configuração

### Variáveis de Ambiente

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `DATABASE_URL` | - | String de conexão PostgreSQL (obrigatório) |
| `NODE_ENV` | `development` | Ambiente (development, production, test) |
| `SYNC_ON_START` | `true` | Executar sync inicial ao iniciar agent |
| `HEALTH_PORT` | `3001` | Porta do health check server |
| `HEALTH_HOST` | `localhost` | Host do health check server |

### Configuração de Sync

Editável em `scripts/sync/utils/config.ts`:

```typescript
export const SYNC_CONFIG = {
  // Caminho para o vault do Obsidian
  obsidianVault: '/Users/wesleywillian/Library/Mobile Documents/...',

  // Pasta de queixas dentro do vault
  queixasFolder: 'Queixas',

  // Debounce em ms para o file watcher
  watchDebounce: 1000,

  // Padrões de arquivos a ignorar
  ignorePatterns: [
    '_índice.md',
    '00 - Índice Queixas.md',
    '.obsidian',
  ],
}
```

### Configuração de Retry

Editável em `scripts/sync/agent.ts`:

```typescript
const RETRY_CONFIG = {
  maxAttempts: 3,        // Número máximo de tentativas
  baseDelay: 1000,       // Delay inicial (ms)
  maxDelay: 30000,       // Delay máximo (ms)
  backoffFactor: 2,      // Fator de multiplicação exponencial
}
```

---

## 🔍 Troubleshooting

### Agent não inicia

**Problema:** `Error: Cannot find module 'dotenv'`

```bash
# Solução: Instalar dependências
pnpm install
```

**Problema:** `Error: Connection refused to database`

```bash
# Solução: Verificar se PostgreSQL está rodando
psql $DATABASE_URL -c "SELECT 1"

# Ou verificar Prisma client
pnpm prisma db pull
```

### Conflitos de Sincronização

**Problema:** Arquivos `*-CONFLICT.md` sendo criados

**Causa:** Database possui versão mais recente do que arquivo local

**Solução:**
1. Revisar arquivo de conflito
2. Escolher qual versão manter (local ou DB)
3. Atualizar arquivo local ou database manualmente
4. Remover arquivo `-CONFLICT.md`

```bash
# Exemplo de conflito
cat Queixas/Dor-Torácica-CONFLICT.md

# Versão do DB está em:
## Versao do banco (DB)
[conteúdo do DB]

# Versão local está em:
## Versao local (Obsidian)
[conteúdo local]
```

### Health Check Retorna 503

**Problema:** `{ "status": "unhealthy", "successRate": 30 }`

**Diagnóstico:**
1. Verificar logs: `pm2 logs sync-agent --lines 100`
2. Checar erros recentes: `grep ERROR logs/sync-agent-error.log | tail -20`
3. Validar conexão DB: `psql $DATABASE_URL -c "SELECT COUNT(*) FROM chief_complaints"`

**Soluções Comuns:**
- Database offline → Reiniciar PostgreSQL
- Credenciais inválidas → Atualizar `DATABASE_URL` em `.env`
- Timeout de rede → Aumentar timeout no Prisma client

### Alta Utilização de Memória

**Problema:** Agent usa > 500MB de RAM

**Causa:** Sync de muitos arquivos simultâneos

**Solução:**

```bash
# Reiniciar agent (PM2 auto-restart se exceder max_memory_restart)
pm2 restart sync-agent

# Verificar memória atual
pm2 info sync-agent | grep memory

# Aumentar limite de memória (ecosystem.config.js)
max_memory_restart: '1G'
```

### Logs Muito Grandes

**Problema:** `logs/sync-agent-out.log` com > 1GB

**Solução:** Instalar PM2 log rotation

```bash
# Instalar módulo
pm2 install pm2-logrotate

# Configurar rotação
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
```

---

## 🧪 Testes

### Teste Manual

```bash
# 1. Editar um arquivo no Obsidian vault
# 2. Aguardar 1-2 segundos (debounce)
# 3. Verificar logs
pm2 logs sync-agent --lines 50

# 4. Validar no database
psql $DATABASE_URL -c "
  SELECT code, name_pt, updated_at
  FROM chief_complaints
  ORDER BY updated_at DESC
  LIMIT 5
"
```

### Teste de Health Endpoint

```bash
# Instalar dependência para testes
pnpm add -D @types/node

# Executar teste
tsx scripts/sync/health-server.ts
# Aguardar 3 segundos
# Endpoint será testado automaticamente
```

### Teste de Conflitos

```bash
# 1. Atualizar diretamente no DB (simula edit de outro sistema)
psql $DATABASE_URL -c "
  UPDATE chief_complaints
  SET name_pt = 'Teste de Conflito', updated_at = NOW()
  WHERE code = 'DT-001'
"

# 2. Editar mesmo arquivo no Obsidian
# 3. Verificar se arquivo *-CONFLICT.md foi criado
ls -la Queixas/*CONFLICT.md
```

---

## 📊 Métricas e Monitoramento

### Métricas Chave

| Métrica | Threshold | Descrição |
|---------|-----------|-----------|
| **Success Rate** | > 95% | Taxa de syncs bem-sucedidos |
| **Uptime** | > 99.5% | Tempo de disponibilidade |
| **Avg Sync Time** | < 5s | Tempo médio por sync |
| **Memory Usage** | < 500MB | Uso de memória |
| **Pending Files** | < 10 | Arquivos na fila |

### Dashboards Recomendados

**Opção 1: PM2 Plus (Keymetrics)**
```bash
pm2 link <secret_key> <public_key>
pm2 web
```

**Opção 2: Prometheus + Grafana** (futuro)
- Exportar métricas do health endpoint
- Dashboard customizado com alertas

**Opção 3: Log Aggregation** (futuro)
- ElasticSearch + Kibana
- Datadog / New Relic

---

## 🔐 Segurança

### Boas Práticas

1. **Credenciais de Database**
   - Nunca commitar `DATABASE_URL` no git
   - Usar `.env.local` (gitignored)
   - Rotacionar senhas periodicamente

2. **Health Endpoint**
   - Não expor publicamente (localhost only)
   - Se expor, usar firewall ou VPN
   - Opcional: Adicionar autenticação via API key

3. **Logs**
   - Não logar dados sensíveis (PII)
   - Sanitizar mensagens de erro
   - Log rotation habilitado

4. **File System**
   - Agent roda como usuário não-root
   - Permissões 644 para logs
   - Vault em diretório seguro (iCloud)

### Hardening (Produção)

```bash
# 1. Criar usuário dedicado
sudo useradd -r -s /bin/false sync-agent

# 2. Permissões de arquivos
sudo chown -R sync-agent:sync-agent logs/
sudo chmod 644 logs/*.log

# 3. Limitar recursos (systemd)
# Adicionar em /etc/systemd/system/pm2-sync-agent.service
LimitNOFILE=4096
MemoryMax=1G
CPUQuota=50%
```

---

## 🔄 Upgrade e Manutenção

### Atualização de Versão

```bash
# 1. Parar agent
pm2 stop sync-agent

# 2. Backup de logs
cp -r logs logs-backup-$(date +%Y%m%d)

# 3. Pull do código
git pull origin main

# 4. Instalar dependências
pnpm install

# 5. Restart agent
pm2 restart sync-agent

# 6. Verificar health
curl http://localhost:3001/health
```

### Backup de Configuração

```bash
# Backup de configurações PM2
pm2 save

# Backup de configuração de sync
cp scripts/sync/utils/config.ts config-backup-$(date +%Y%m%d).ts

# Backup de .env
cp .env.local .env.local.backup
```

### Limpeza de Logs

```bash
# Limpar logs antigos (manter últimos 7 dias)
find logs/ -name "*.log" -mtime +7 -delete

# Ou truncar logs atuais
pm2 flush sync-agent
```

---

## 📞 Suporte

### Logs de Debug

```bash
# Habilitar debug mode
NODE_ENV=development pm2 restart sync-agent --update-env

# Ver logs detalhados
pm2 logs sync-agent --lines 200 --raw
```

### Checklist de Suporte

- [ ] Verificar health endpoint: `curl http://localhost:3001/health`
- [ ] Ver logs de erro: `pm2 logs sync-agent --err --lines 50`
- [ ] Validar conexão DB: `psql $DATABASE_URL -c "SELECT 1"`
- [ ] Checar uptime: `pm2 info sync-agent`
- [ ] Verificar conflitos: `ls -la Queixas/*CONFLICT.md`
- [ ] Validar vault path: `ls "$SYNC_CONFIG.obsidianVault"`

### Contato

- **Repositório**: [GitHub - WellWave](https://github.com/yourorg/wellwave)
- **Issues**: [GitHub Issues](https://github.com/yourorg/wellwave/issues)
- **Documentação**: `/docs/README.md`

---

**Última atualização:** 2026-01-06
**Versão do documento:** 1.0.0
**Maintainer:** Time de Engenharia WellWave
