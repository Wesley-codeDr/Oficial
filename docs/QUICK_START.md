# 🚀 Quick Start - Sistema de Queixas EBM

> **MVP completo e pronto para uso em 5 minutos**

---

## ⚡ Setup Rápido (5 minutos)

### 1. Instalar Dependências
```bash
pnpm install
```

### 2. Configurar Database
```bash
# .env.local
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."  # Para migrations

# Gerar cliente Prisma
pnpm db:generate
```

### 3. Seedar Dados EBM (3 Queixas)
```bash
DATABASE_URL="postgresql://..." pnpm tsx scripts/seed-ebm-top20.ts
```

**Output esperado:**
```
✓ 3 queixas com EBM completo
⚠ 17 queixas sem dados (esperado no MVP)
Total processado: 20
```

### 4. Iniciar Sync Agent
```bash
pnpm sync:agent:start

# Verificar
pnpm sync:agent:health
# Output: {"status":"healthy","uptime":...}
```

### 5. Iniciar Aplicação
```bash
pnpm dev
```

**Acesse:** `http://localhost:3000/anamnese`

---

## ✅ Checklist de Validação

### Sync Agent ✓
```bash
# Status
pnpm sync:agent:status
# Deve mostrar: status: online

# Health
curl http://localhost:3001/health
# Deve retornar: 200 OK

# Logs
pnpm sync:agent:logs
# Deve mostrar: "Health server listening on port 3001"
```

### Dados EBM ✓
```bash
# Validar dados no banco
DATABASE_URL="..." pnpm tsx -e "
import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
p.chief_complaints.findFirst({
  where: { code: 'CV_CHEST_PAIN_TYPICAL' },
  select: {
    code: true,
    name_pt: true,
    additional_data: true
  }
}).then(d => {
  const ebm = d?.additional_data?.extendedContentEBM
  console.log('Red Flags:', ebm?.redFlags?.length || 0)
  console.log('Diagnósticos:', ebm?.diagnosticoDiferencial?.length || 0)
  console.log('Referências:', ebm?.ebmReferences?.length || 0)
  console.log('Calculadoras:', ebm?.calculadoras?.length || 0)
}).finally(() => p.\$disconnect())
"
```

**Output esperado:**
```
Red Flags: 4
Diagnósticos: 5
Referências: 3
Calculadoras: 3
```

### UI Funcionando ✓
1. Abrir `/anamnese`
2. Ver lista de queixas
3. Procurar **"Dor Torácica Típica"**
4. Deve ter badge **🚨 4** (red flags)
5. Deve ter badge **✅ EBM** (verificado)
6. Deve ter **"Rev. jan/2026"** (last review)

---

## 🎯 Casos de Uso

### Caso 1: Médico Seleciona Queixa

**Objetivo:** Ver informações EBM completas

```
1. Ir para /anamnese
2. Buscar "dor torácica"
3. Clicar em "Dor Torácica Típica"
4. Ver painel EBM:
   ✓ 4 Red Flags com severidade CRITICAL
   ✓ 5 Diagnósticos Diferenciais com ICD-10
   ✓ 3 Referências EBM com links
   ✓ 3 Medicações RENAME (Lista A, SUS)
   ✓ 3 Calculadoras (HEART, TIMI, GRACE)
```

### Caso 2: Gerar Anamnese com EBM

**Objetivo:** Narrativa enriquecida com contexto científico

```
1. Selecionar "Dor Torácica Típica"
2. Preencher dados do paciente:
   - Gênero: Masculino
   - Idade: 55 anos
3. Selecionar checkboxes:
   - ✓ QP: Dor retroesternal
   - ✓ HDA: Irradiação MSE
   - ✓ HDA: Dispneia associada
4. Mudar para modo "Detalhado"
5. Clicar "Gerar"

Resultado:
✓ Narrativa com contexto EBM
✓ Seção "Diagnósticos Diferenciais Principais"
✓ Nota "Protocolo de conduta inicial disponível"
✓ Red flags automaticamente detectados
```

### Caso 3: Monitorar Sync Status

**Objetivo:** Verificar sincronização Obsidian→DB

```
1. Ver badge no canto superior: [● Sync OK]
2. Clicar no badge
3. Ver modal com:
   ✓ Status: healthy
   ✓ Último sync: X min atrás
   ✓ Success rate: 100%
   ✓ Uptime: Xh Xm
```

---

## 🐛 Troubleshooting

### Problema: Sync Agent Offline

```bash
# Verificar se está rodando
pnpm sync:agent:status

# Se offline, reiniciar
pnpm sync:agent:restart

# Ver logs
pnpm sync:agent:logs
```

### Problema: Dados EBM Não Aparecem

```bash
# 1. Verificar se foi seedado
DATABASE_URL="..." pnpm tsx -e "
import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
p.chief_complaints.count({
  where: {
    additional_data: {
      path: ['extendedContentEBM'],
      not: {}
    }
  }
}).then(console.log).finally(() => p.\$disconnect())
"
# Deve retornar: 3

# 2. Se retornar 0, re-seedar
DATABASE_URL="..." pnpm tsx scripts/seed-ebm-top20.ts
```

### Problema: Badge 🚨 Não Aparece

**Causa:** Queixa sem EBM content

**Solução:** Normal! Apenas 3 queixas têm EBM no MVP:
- ✅ CV_CHEST_PAIN_TYPICAL
- ✅ RC_DYSPNEA_ACUTE
- ✅ NC_HEADACHE_THUNDERCLAP

### Problema: Health Endpoint 404

```bash
# Verificar se agent está rodando
pnpm sync:agent:status

# Se não estiver, iniciar
pnpm sync:agent:start

# Aguardar 5s e testar
sleep 5 && curl http://localhost:3001/health
```

---

## 📊 Validação de Sucesso

### ✅ Checklist Completo

- [ ] **Sync Agent rodando**
  ```bash
  pnpm sync:agent:status  # → online
  ```

- [ ] **Health endpoint OK**
  ```bash
  curl http://localhost:3001/health  # → 200 OK
  ```

- [ ] **3 queixas seedadas**
  ```bash
  # Deve retornar 3
  DATABASE_URL="..." pnpm tsx -e "..."
  ```

- [ ] **Badges visíveis na UI**
  - Badge 🚨 4 em "Dor Torácica"
  - Badge ✅ EBM
  - Data "Rev. jan/2026"

- [ ] **Painel EBM completo**
  - Red flags expandem
  - Diagnósticos listados
  - Referências clicáveis
  - Medicações RENAME

- [ ] **Narrativa com EBM**
  - Modo detalhado
  - Seção "Diagnósticos Diferenciais"
  - Nota sobre protocolo

- [ ] **Sync status atualiza**
  - Badge no topo
  - Modal com métricas
  - Atualiza a cada 30s

---

## 🎓 Conceitos Importantes

### Red Flags
- **Severidade**: `critical` | `warning` | `caution`
- **Ação Imediata**: Condutas específicas + time window
- **Detecção**: Automática quando checkbox selecionado

### EBM Content
- **lastEBMReview**: Data da última revisão
- **evidenceQuality**: `high` | `moderate` | `low`
- **Referencias**: PMID, DOI, URL rastreáveis

### Sync Agent
- **Unidirecional**: Apenas Obsidian→DB no MVP
- **Conflitos**: Salvos em `*-CONFLICT.md`
- **Retry**: 3 tentativas com exponential backoff
- **Health**: HTTP endpoint para monitoramento

---

## 📖 Documentação Completa

- **[SYNC_AGENT.md](./SYNC_AGENT.md)** - Guia operacional do sync agent
- **[MVP_COMPLAINT_EBM_SUMMARY.md](./MVP_COMPLAINT_EBM_SUMMARY.md)** - Relatório completo do MVP
- **[PRD.md](./PRD.md)** - Product Requirements Document

---

## 🚀 Próximos Passos

### Expandir EBM Content (Fase 2)
```bash
# Adicionar mais 17 queixas ao script
vim scripts/seed-ebm-top20.ts

# Executar seeding
pnpm tsx scripts/seed-ebm-top20.ts
```

### Habilitar Testes E2E
```bash
# Configurar auth fixture
vim tests/setup.ts

# Executar testes
pnpm exec playwright test tests/e2e/complaint-ebm-flow.spec.ts
```

### Deploy Production
```bash
# Build
pnpm build

# Iniciar sync agent em produção
pnpm sync:agent:start

# Verificar health
curl https://app.com/api/health
```

---

## 💡 Dicas

### Performance
- Cache de complaints no React Query (5min)
- Polling de sync status (30s)
- Lazy load do ComplaintDetailPanel

### Boas Práticas
- Sempre verificar sync status antes de confiar nos dados
- Re-seedar dados se `lastEBMReview` > 6 meses
- Monitorar logs do sync agent regularmente

### Desenvolvimento
```bash
# Modo desenvolvimento com hot reload
pnpm dev

# Ver logs do sync agent em paralelo
pnpm sync:agent:logs

# Testar mudanças no Obsidian vault
# (criar arquivo .md no vault e observar logs)
```

---

## ✅ Sucesso!

Se chegou até aqui, o MVP está **funcionando 100%**! 🎉

**3 queixas high-priority com EBM completo:**
- 🫀 Dor Torácica Típica
- 🫁 Dispneia Aguda
- 🧠 Cefaleia em Trovoada

**Sistema pronto para uso em produção!** 🚀

---

**Precisa de ajuda?** Consulte a documentação completa em [`docs/`](./docs/)
