# Protocolo de Integração: Frontend Google AI Studio → WellWave Oficial

> **Tipo**: Substituição Completa do Frontend
> **Prioridade**: Visual/UI + Protocolos Médicos (ambos igualmente)
> **Status**: Documento de Referência para Execução Futura

---

## 1. Visão Geral

### 1.1 Objetivo
Substituir completamente o frontend atual do WellWave pelo design desenvolvido no Google AI Studio, mantendo:
- Backend intacto (Next.js API Routes + Prisma + Supabase)
- Autenticação existente (Supabase Auth)
- Integração com IA (GLM-4.6)
- Monitoramento (Sentry)

### 1.2 Repositórios
| Repo | URL | Função |
|------|-----|--------|
| **Oficial** | `Wesley-codeDr/Oficial` | Projeto principal (backend + deploy) |
| **Frontend** | `Wesley-codeDr/Oficial-frontend-` | Design do Google AI Studio |

### 1.3 Stack Comparativa

| Aspecto | Frontend (Vite) | Oficial (Next.js) | Ação |
|---------|-----------------|-------------------|------|
| Framework | Vite + React 19 | Next.js 16 | **Adaptar para Next.js** |
| Roteamento | Client-side SPA | App Router | **Converter rotas** |
| Estilização | Tailwind inline | Tailwind + shadcn | **Mesclar estilos** |
| Gráficos | recharts | - | **Adicionar recharts** |
| Estado | useState local | Zustand + React Query | **Conectar stores** |
| Backend | Nenhum | Prisma + Supabase | **Manter backend** |
| Auth | Nenhuma | Supabase Auth | **Manter auth** |

---

## Notas Operacionais

- `OPENAI_API_KEY` é validada em tempo de execução. Se estiver ausente ou vazia, o ChatWell fica indisponível.
- Para rotas médicas, use sempre `withApiAuth` (`@/lib/api/auth`) e o `logger` (`@/lib/logging`) em vez de `console.error`.
- Em testes ou CI, habilite `MOCK_AI=true` (ou `AI_PROVIDER=mock`) para evitar chamadas externas; a resposta simulada pode ser ajustada via `MOCK_AI_RESPONSE`.
- `RATE_LIMIT_FAIL_OPEN` só deve ser definido como `true` quando a disponibilidade for mais importante que bloquear requisições durante falhas do banco.
- O histórico de mensagens enviado ao modelo é truncado (~20 mensagens) para respeitar o `MODEL_CONFIG.maxTokens`.

---

## 2. Inventário de Componentes do Frontend

### 2.1 Estrutura de Arquivos
```
Oficial-frontend-/
├── App.tsx                    # 61KB - Componente monolítico (DIVIDIR)
├── ThemeContext.tsx           # Tema dark/light
├── types.ts                   # Interfaces TypeScript
├── index.tsx                  # Entry point (não usar)
├── index.html                 # Template (não usar)
├── components/
│   ├── Header.tsx             # 12KB - Header com busca
│   ├── Sidebar.tsx            # 5.5KB - Navegação lateral
│   └── cards/
│       ├── BloodPressureCard.tsx    # 2.3KB
│       ├── HeartRateCard.tsx        # 2.9KB
│       ├── MedicationsCard.tsx      # 4.4KB
│       ├── RemindersCard.tsx        # 6.7KB
│       ├── SmallStatsCards.tsx      # 6.1KB
│       └── SummaryCard.tsx          # 3.7KB
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### 2.2 Conteúdo do App.tsx (Extrair)

O arquivo `App.tsx` contém múltiplos módulos que devem ser extraídos:

#### 2.2.1 Definição de Síndromes
```typescript
// Extrair para: /lib/medical/syndromes.ts
interface SyndromeCard {
  id: string;
  label: string;
  icon: any;
  color: string;
  category: 'critical' | 'clinical' | 'trauma';
  calculator?: string;
}

const syndromes: SyndromeCard[] = [
  // Critical / Cardiovascular
  { id: 'dor_toracica', label: 'Dor Torácica', icon: Heart, color: 'red', category: 'critical', calculator: 'HEART Score' },
  { id: 'neuro_deficit', label: 'Déficit Neurológico (AVC)', icon: Brain, color: 'indigo', category: 'critical', calculator: 'NIHSS' },
  { id: 'dispneia', label: 'Dispneia / Insuf. Resp.', icon: Wind, color: 'blue', category: 'critical', calculator: 'Wells Score' },
  { id: 'sincope', label: 'Síncope / Tontura', icon: Activity, color: 'amber', category: 'critical', calculator: 'OESIL Score' },

  // General Clinical
  { id: 'dor_abdominal', label: 'Dor Abdominal', icon: Stethoscope, color: 'emerald', category: 'clinical', calculator: 'Alvarado Score' },
  { id: 'cefaleia', label: 'Cefaleia', icon: Sparkles, color: 'purple', category: 'clinical', calculator: 'Ottawa Rule' },
  { id: 'febre', label: 'Febre / Sepse', icon: Thermometer, color: 'rose', category: 'clinical', calculator: 'qSOFA / NEWS2' },
  { id: 'lombalgia', label: 'Lombalgia / Cólica Renal', icon: Activity, color: 'orange', category: 'clinical' },

  // Trauma & Others
  { id: 'trauma', label: 'Trauma / Queda', icon: Bone, color: 'slate', category: 'trauma', calculator: 'Glasgow Coma Scale' },
  { id: 'psiquiatria', label: 'Agitação / Psiquiátrico', icon: AlertOctagon, color: 'pink', category: 'clinical' },
];
```

#### 2.2.2 Referências Médicas Estruturadas
```typescript
// Extrair para: /lib/medical/references.ts
interface ReferenceItem {
  source: string;
  title: string;
  url: string;
  evidenceLevel: 'Nível 1A' | 'Nível 1B' | 'Nível 2A' | 'Opinião de Expert' | 'Consenso';
  year: string;
}

// Referências por síndrome:
// - dor_toracica: SBC, AHA/ACC, ABRAMEDE
// - dor_abdominal: WSES, UpToDate, ABRAMEDE
// - cefaleia: IHS (ICHD-3), ACEP
// - dispneia: GOLD, GINA
// - neuro_deficit: AHA/ASA, Ministério da Saúde
```

#### 2.2.3 Contexto Clínico por Categoria
```typescript
// Extrair para: /lib/medical/clinical-context.ts
const getCategoryContext = (patient: Patient) => {
  // Contexto Pediátrico
  // Contexto Geriátrico
  // Contexto Obstétrico
}
```

#### 2.2.4 Protocolos de Anamnese Detalhados
```typescript
// Extrair para: /lib/medical/protocols.ts ou banco de dados
const getProtocolData = (syndromeId: string): AnamnesisSection[] => {
  // Protocolos completos para:
  // - dor_toracica (características, sintomas, fatores de risco CV)
  // - cefaleia (características, sinais de alarme)
  // - dor_abdominal (localização, sinais de alarme)
  // - dispneia (característica respiratória, sintomas)
  // - default (queixa geral, sinais de alarme)
}
```

### 2.3 Types do Frontend
```typescript
// Extrair para: /types/medical.ts
export interface Symptom {
  id: string;
  label: string;
  type: 'boolean' | 'multi' | 'scale';
  options?: string[];
  checked?: boolean;
  negative?: boolean;
  value?: string;
  isRedFlag?: boolean;
}

export interface AnamnesisSection {
  id: string;
  title: string;
  items: Symptom[];
}

export interface Patient {
  id: string;
  age: string;
  gender: 'M' | 'F';
  category: 'adult' | 'elderly' | 'pediatric';
  isPregnant: boolean;
  phoneNumber: string;
  allergies: string[];
  entryTime: string;
  status: 'waiting' | 'in_progress' | 'discharged';
}

export interface NoteBlock {
  id: string;
  title: string;
  content: string;
  iconName: 'heart' | 'list' | 'x' | 'stethoscope' | 'alert';
  alerts?: string[];
}
```

---

## 3. Plano de Execução

### Fase 1: Preparação (Não Quebrar Nada)

#### 1.1 Adicionar Dependência
```bash
pnpm add recharts
```

#### 1.2 Criar Estrutura de Pastas
```bash
mkdir -p components/layout
mkdir -p components/dashboard/cards
mkdir -p lib/medical
```

#### 1.3 Backup de Arquivos Críticos
- `/app/(dashboard)/layout.tsx`
- `/app/(dashboard)/dashboard/page.tsx`
- `/components/ui/*`

### Fase 2: Migração de Types e Lib

#### 2.1 Criar `/types/medical.ts`
Copiar interfaces do frontend:
- `Symptom`
- `AnamnesisSection`
- `Patient` (mesclar com existente)
- `NoteBlock`
- `SyndromeCard`
- `ReferenceItem`

#### 2.2 Criar `/lib/medical/syndromes.ts`
- Exportar array `syndromes` com 10 síndromes
- Manter compatibilidade com Prisma schema existente

#### 2.3 Criar `/lib/medical/references.ts`
- Função `getStructuredReferences(syndromeId)`
- Referências para cada síndrome

#### 2.4 Criar `/lib/medical/protocols.ts`
- Função `getProtocolData(syndromeId)`
- Dados completos de checklist para cada síndrome

#### 2.5 Criar `/lib/medical/clinical-context.ts`
- Função `getCategoryContext(patient)`
- Contextos pediátrico, geriátrico, obstétrico

### Fase 3: Migração de Componentes UI

#### 3.1 Layout Components

**Criar `/components/layout/sidebar.tsx`**
- Adaptar de `components/Sidebar.tsx` do frontend
- Usar componentes shadcn/ui existentes
- Conectar ao sistema de rotas Next.js

**Criar `/components/layout/header.tsx`**
- Adaptar de `components/Header.tsx` do frontend
- Manter busca funcional
- Integrar com tema existente

**Criar `/components/layout/app-shell.tsx`**
- Wrapper que combina Sidebar + Header + Content
- Responsivo (mobile/desktop)

#### 3.2 Dashboard Cards

**Criar `/components/dashboard/cards/blood-pressure-card.tsx`**
- Adaptar BloodPressureCard.tsx
- Usar recharts para gráfico
- Conectar a dados reais via React Query

**Criar `/components/dashboard/cards/heart-rate-card.tsx`**
- Adaptar HeartRateCard.tsx
- Gráfico de linha com recharts

**Criar `/components/dashboard/cards/medications-card.tsx`**
- Adaptar MedicationsCard.tsx
- Lista de medicamentos do paciente

**Criar `/components/dashboard/cards/reminders-card.tsx`**
- Adaptar RemindersCard.tsx
- Lembretes e alertas

**Criar `/components/dashboard/cards/small-stats-cards.tsx`**
- Adaptar SmallStatsCards.tsx
- Cards menores com métricas

**Criar `/components/dashboard/cards/summary-card.tsx`**
- Adaptar SummaryCard.tsx
- Resumo do paciente

#### 3.3 Componentes de Anamnese

**Atualizar `/components/anamnese/checkbox-group.tsx`**
- Incorporar lógica de red flags
- Suporte a tipos: boolean, multi, scale

**Criar `/components/anamnese/protocol-selector.tsx`**
- Seletor de síndrome com categorias
- Visual com cards coloridos

**Criar `/components/anamnese/reference-panel.tsx`**
- Painel de referências médicas
- Links para diretrizes

### Fase 4: Atualizar Layout Dashboard

#### 4.1 Modificar `/app/(dashboard)/layout.tsx`
```tsx
// Estrutura alvo:
<AppShell>
  <Sidebar />
  <main>
    <Header />
    <Content>{children}</Content>
  </main>
</AppShell>
```

#### 4.2 Reescrever `/app/(dashboard)/dashboard/page.tsx`
- Grid de cards de métricas
- Lista de síndromes por categoria
- Resumo do paciente atual
- Ações rápidas

### Fase 5: Atualizar Páginas de Anamnese

#### 5.1 Modificar `/app/(dashboard)/anamnese/[syndrome]/page.tsx`
- Usar novos protocolos detalhados
- Adicionar painel de referências
- Contexto clínico por categoria de paciente

### Fase 6: Tema e Estilos

#### 6.1 Atualizar ThemeProvider
- Verificar compatibilidade com ThemeContext do frontend
- Manter next-themes funcionando

#### 6.2 Cores e Design Tokens
- Mapear cores do frontend para variáveis CSS existentes
- Adicionar novas cores se necessário

### Fase 7: Testes e Validação

#### 7.1 Verificar Funcionalidades
- [ ] Login/Logout funcionando
- [ ] Navegação entre páginas
- [ ] Criação de anamnese
- [ ] Chat com IA
- [ ] Histórico de sessões
- [ ] Tema dark/light

#### 7.2 Rodar Testes
```bash
pnpm typecheck
pnpm test
pnpm test:e2e
```

#### 7.3 Deploy de Teste
```bash
vercel deploy --prod
```

---

## 4. Mapeamento de Arquivos

### 4.1 Arquivos a Criar

| Arquivo | Origem | Prioridade |
|---------|--------|------------|
| `/types/medical.ts` | `types.ts` | Alta |
| `/lib/medical/syndromes.ts` | `App.tsx` | Alta |
| `/lib/medical/references.ts` | `App.tsx` | Alta |
| `/lib/medical/protocols.ts` | `App.tsx` | Alta |
| `/lib/medical/clinical-context.ts` | `App.tsx` | Média |
| `/components/layout/sidebar.tsx` | `Sidebar.tsx` | Alta |
| `/components/layout/header.tsx` | `Header.tsx` | Alta |
| `/components/layout/app-shell.tsx` | Novo | Alta |
| `/components/dashboard/cards/*.tsx` | `cards/*.tsx` | Média |
| `/components/anamnese/protocol-selector.tsx` | `App.tsx` | Alta |
| `/components/anamnese/reference-panel.tsx` | `App.tsx` | Média |

### 4.2 Arquivos a Modificar

| Arquivo | Modificação |
|---------|-------------|
| `/app/(dashboard)/layout.tsx` | Integrar AppShell |
| `/app/(dashboard)/dashboard/page.tsx` | Novo design |
| `/app/(dashboard)/anamnese/[syndrome]/page.tsx` | Novos protocolos |
| `/package.json` | Adicionar recharts |
| `/tailwind.config.ts` | Novas cores (se necessário) |

### 4.3 Arquivos a Manter Intactos

| Arquivo | Razão |
|---------|-------|
| `/app/api/*` | Backend funciona |
| `/lib/db/*` | Prisma configurado |
| `/lib/ai/*` | GLM-4.6 funcionando |
| `/middleware.ts` | Auth funcionando |
| `/prisma/*` | Schema validado |
| `/components/auth/*` | Login funcionando |
| `/components/chat/*` | Chat funcionando |

---

## 5. Checklist de Execução

### Pré-Requisitos
- [ ] Projeto Oficial rodando localmente
- [ ] Acesso ao repo `Oficial-frontend-`
- [ ] Backup do código atual

### Fase 1: Preparação
- [ ] `pnpm add recharts`
- [ ] Criar estrutura de pastas
- [ ] Commit: "chore: prepare for frontend migration"

### Fase 2: Types e Lib
- [ ] Criar `/types/medical.ts`
- [ ] Criar `/lib/medical/syndromes.ts`
- [ ] Criar `/lib/medical/references.ts`
- [ ] Criar `/lib/medical/protocols.ts`
- [ ] Criar `/lib/medical/clinical-context.ts`
- [ ] Commit: "feat: add medical types and utilities from AI Studio"

### Fase 3: Componentes UI
- [ ] Criar `/components/layout/sidebar.tsx`
- [ ] Criar `/components/layout/header.tsx`
- [ ] Criar `/components/layout/app-shell.tsx`
- [ ] Criar cards em `/components/dashboard/cards/`
- [ ] Commit: "feat: add layout and dashboard components"

### Fase 4: Layout Dashboard
- [ ] Modificar `/app/(dashboard)/layout.tsx`
- [ ] Reescrever `/app/(dashboard)/dashboard/page.tsx`
- [ ] Commit: "feat: new dashboard layout with metrics cards"

### Fase 5: Anamnese
- [ ] Criar `/components/anamnese/protocol-selector.tsx`
- [ ] Criar `/components/anamnese/reference-panel.tsx`
- [ ] Modificar `/app/(dashboard)/anamnese/[syndrome]/page.tsx`
- [ ] Commit: "feat: enhanced anamnese with protocols and references"

### Fase 6: Validação
- [ ] `pnpm typecheck` passa
- [ ] `pnpm test` passa
- [ ] `pnpm test:e2e` passa
- [ ] Teste manual completo
- [ ] Deploy para produção

---

## 6. Dados para Migração do Banco

### 6.1 Atualizar Seed com Novas Síndromes

O seed atual tem 3 síndromes. O frontend tem 10. Criar migration para adicionar:

```typescript
// prisma/seed.ts - adicionar:
const newSyndromes = [
  { code: 'NEURO_DEFICIT', name: 'Déficit Neurológico (AVC)', icon: 'brain', category: 'critical' },
  { code: 'SINCOPE', name: 'Síncope / Tontura', icon: 'activity', category: 'critical' },
  { code: 'CEFALEIA', name: 'Cefaleia', icon: 'sparkles', category: 'clinical' },
  { code: 'FEBRE', name: 'Febre / Sepse', icon: 'thermometer', category: 'clinical' },
  { code: 'LOMBALGIA', name: 'Lombalgia / Cólica Renal', icon: 'activity', category: 'clinical' },
  { code: 'TRAUMA', name: 'Trauma / Queda', icon: 'bone', category: 'trauma' },
  { code: 'PSIQUIATRIA', name: 'Agitação / Psiquiátrico', icon: 'alert', category: 'clinical' },
];
```

### 6.2 Adicionar Checkboxes Detalhados

Para cada síndrome, adicionar os checkboxes do `getProtocolData()`.

---

## 7. Comandos Úteis

```bash
# Clonar frontend para referência local (temporário)
cd /tmp && git clone https://github.com/Wesley-codeDr/Oficial-frontend-.git

# Copiar arquivo específico
cat /tmp/Oficial-frontend-/components/Sidebar.tsx

# Ver diff de package.json
diff <(cat /tmp/Oficial-frontend-/package.json) <(cat package.json)

# Rodar projeto
pnpm dev

# Verificar tipos
pnpm typecheck

# Deploy
vercel deploy --prod
```

---

## 8. Notas Importantes

### 8.1 O que NÃO fazer
- Não substituir `/app/api/*` - backend funciona
- Não mexer em `/middleware.ts` - auth funciona
- Não alterar `/prisma/schema.prisma` sem migration
- Não remover componentes de `/components/chat/*`
- Não desconfigurar Sentry ou Supabase

### 8.2 Ordem de Prioridade
1. **Types e Lib** - Base para tudo
2. **Layout (Sidebar/Header)** - Impacto visual imediato
3. **Dashboard** - Tela principal
4. **Anamnese** - Core do produto
5. **Cards de métricas** - Nice to have

### 8.3 Rollback
Se algo quebrar, reverter para último commit estável:
```bash
git checkout HEAD~1 -- .
pnpm install
pnpm dev
```

---

**Documento criado em**: 2024-12-11
**Autor**: Claude (Anthropic)
**Para execução futura quando usuário solicitar**
