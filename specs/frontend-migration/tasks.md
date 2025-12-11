# Tasks: Migração do Frontend Google AI Studio

## Metadata
- **Feature**: frontend-migration
- **Status**: Pending
- **Created**: 2024-12-11

---

## Legenda
- `[ ]` Pendente
- `[P]` Pode ser executado em paralelo
- `[D:X]` Depende da task X
- `[!]` Crítico

---

## Fase 1: Preparação

### T1.1 [!] Adicionar dependência recharts
```bash
pnpm add recharts
```
- **Estimativa**: 1 min
- **Arquivo**: `package.json`

### T1.2 [P] Criar estrutura de pastas
```bash
mkdir -p components/layout
mkdir -p components/dashboard/cards
mkdir -p lib/medical
```
- **Estimativa**: 1 min

### T1.3 [P] Clonar frontend para referência
```bash
cd /tmp && git clone https://github.com/Wesley-codeDr/Oficial-frontend-.git
```
- **Estimativa**: 1 min

### T1.4 [D:T1.1,T1.2] Commit preparação
```bash
git add -A && git commit -m "chore: prepare for frontend migration"
```

---

## Fase 2: Types e Lib

### T2.1 [!] Criar /types/medical.ts
- **Origem**: `types.ts` do frontend
- **Conteúdo**: Interfaces Symptom, AnamnesisSection, Patient, NoteBlock, SyndromeCard, ReferenceItem
- **Estimativa**: 15 min

### T2.2 [!][D:T2.1] Criar /lib/medical/syndromes.ts
- **Origem**: `App.tsx` (array syndromes)
- **Conteúdo**: Array com 10 síndromes + tipos
- **Estimativa**: 20 min

### T2.3 [P][D:T2.1] Criar /lib/medical/references.ts
- **Origem**: `App.tsx` (getStructuredReferences)
- **Conteúdo**: Função que retorna referências por síndrome
- **Estimativa**: 30 min

### T2.4 [P][D:T2.1] Criar /lib/medical/protocols.ts
- **Origem**: `App.tsx` (getProtocolData)
- **Conteúdo**: Protocolos completos para cada síndrome
- **Estimativa**: 45 min

### T2.5 [P][D:T2.1] Criar /lib/medical/clinical-context.ts
- **Origem**: `App.tsx` (getCategoryContext)
- **Conteúdo**: Contextos pediátrico, geriátrico, obstétrico
- **Estimativa**: 15 min

### T2.6 [D:T2.1-T2.5] Commit types e lib
```bash
git add -A && git commit -m "feat: add medical types and utilities from AI Studio"
```

---

## Fase 3: Componentes de Layout

### T3.1 [!] Criar /components/layout/sidebar.tsx
- **Origem**: `components/Sidebar.tsx`
- **Adaptações**:
  - Usar Link do next/link
  - Usar componentes shadcn/ui
  - Conectar com usePathname
- **Estimativa**: 45 min

### T3.2 [P] Criar /components/layout/header.tsx
- **Origem**: `components/Header.tsx`
- **Adaptações**:
  - Usar componentes shadcn/ui
  - Integrar com next-themes
  - Funcionalidade de busca
- **Estimativa**: 45 min

### T3.3 [D:T3.1,T3.2] Criar /components/layout/app-shell.tsx
- **Origem**: Novo componente
- **Conteúdo**: Wrapper que combina Sidebar + Header + Content
- **Estimativa**: 30 min

### T3.4 [D:T3.1-T3.3] Commit layout
```bash
git add -A && git commit -m "feat: add layout components (sidebar, header, app-shell)"
```

---

## Fase 4: Dashboard Cards

### T4.1 [P] Criar /components/dashboard/cards/blood-pressure-card.tsx
- **Origem**: `components/cards/BloodPressureCard.tsx`
- **Adaptações**: Usar recharts, shadcn Card
- **Estimativa**: 30 min

### T4.2 [P] Criar /components/dashboard/cards/heart-rate-card.tsx
- **Origem**: `components/cards/HeartRateCard.tsx`
- **Estimativa**: 30 min

### T4.3 [P] Criar /components/dashboard/cards/medications-card.tsx
- **Origem**: `components/cards/MedicationsCard.tsx`
- **Estimativa**: 25 min

### T4.4 [P] Criar /components/dashboard/cards/reminders-card.tsx
- **Origem**: `components/cards/RemindersCard.tsx`
- **Estimativa**: 30 min

### T4.5 [P] Criar /components/dashboard/cards/small-stats-cards.tsx
- **Origem**: `components/cards/SmallStatsCards.tsx`
- **Estimativa**: 30 min

### T4.6 [P] Criar /components/dashboard/cards/summary-card.tsx
- **Origem**: `components/cards/SummaryCard.tsx`
- **Estimativa**: 25 min

### T4.7 [D:T4.1-T4.6] Commit cards
```bash
git add -A && git commit -m "feat: add dashboard metric cards"
```

---

## Fase 5: Integração no App

### T5.1 [!][D:T3.3] Modificar /app/(dashboard)/layout.tsx
- **Modificação**: Integrar AppShell como wrapper
- **Backup antes**: Sim
- **Estimativa**: 20 min

### T5.2 [!][D:T5.1,T4.7] Reescrever /app/(dashboard)/dashboard/page.tsx
- **Modificação**: Novo design com grid de cards e síndromes
- **Backup antes**: Sim
- **Estimativa**: 45 min

### T5.3 [D:T5.1-T5.2] Commit integração
```bash
git add -A && git commit -m "feat: new dashboard layout with metrics cards"
```

---

## Fase 6: Componentes de Anamnese

### T6.1 [D:T2.2] Criar /components/anamnese/protocol-selector.tsx
- **Origem**: `App.tsx` (seletor de síndromes)
- **Conteúdo**: Cards coloridos por categoria
- **Estimativa**: 40 min

### T6.2 [D:T2.3] Criar /components/anamnese/reference-panel.tsx
- **Origem**: `App.tsx` (painel de referências)
- **Conteúdo**: Lista de referências com nível de evidência
- **Estimativa**: 30 min

### T6.3 [!][D:T6.1,T6.2,T2.4,T2.5] Modificar /app/(dashboard)/anamnese/[syndrome]/page.tsx
- **Modificação**: Usar novos protocolos e referências
- **Backup antes**: Sim
- **Estimativa**: 60 min

### T6.4 [D:T6.1-T6.3] Commit anamnese
```bash
git add -A && git commit -m "feat: enhanced anamnese with protocols and references"
```

---

## Fase 7: Dados do Banco

### T7.1 [D:T2.2] Atualizar prisma/seed.ts
- **Modificação**: Adicionar 7 novas síndromes
- **Estimativa**: 30 min

### T7.2 [D:T7.1] Rodar seed
```bash
pnpm db:seed
```

### T7.3 [D:T7.2] Commit seed
```bash
git add -A && git commit -m "feat: add new syndromes to database seed"
```

---

## Fase 8: Validação

### T8.1 [!] Verificar TypeScript
```bash
pnpm typecheck
```
- **Critério**: Zero erros

### T8.2 [P] Rodar testes unitários
```bash
pnpm test
```
- **Critério**: Todos passando

### T8.3 [P] Rodar testes E2E
```bash
pnpm test:e2e
```
- **Critério**: Todos passando

### T8.4 Teste manual completo
- [ ] Login/Logout
- [ ] Navegação entre páginas
- [ ] Criar anamnese
- [ ] Chat com IA
- [ ] Histórico
- [ ] Tema dark/light
- [ ] Responsividade

### T8.5 [D:T8.1-T8.4] Deploy produção
```bash
vercel deploy --prod
```

---

## Resumo

| Fase | Tasks | Estimativa Total |
|------|-------|------------------|
| 1. Preparação | 4 | 5 min |
| 2. Types e Lib | 6 | 2h 5min |
| 3. Layout | 4 | 2h |
| 4. Cards | 7 | 2h 50min |
| 5. Integração | 3 | 1h 5min |
| 6. Anamnese | 4 | 2h 10min |
| 7. Dados | 3 | 35 min |
| 8. Validação | 5 | 1h |
| **TOTAL** | **36** | **~12h** |

---

## Ordem de Execução Recomendada

```
T1.1 → T1.2/T1.3 (paralelo) → T1.4
                ↓
T2.1 → T2.2 → T2.3/T2.4/T2.5 (paralelo) → T2.6
                ↓
T3.1/T3.2 (paralelo) → T3.3 → T3.4
                ↓
T4.1/T4.2/T4.3/T4.4/T4.5/T4.6 (paralelo) → T4.7
                ↓
T5.1 → T5.2 → T5.3
                ↓
T6.1/T6.2 (paralelo) → T6.3 → T6.4
                ↓
T7.1 → T7.2 → T7.3
                ↓
T8.1/T8.2/T8.3 (paralelo) → T8.4 → T8.5
```
