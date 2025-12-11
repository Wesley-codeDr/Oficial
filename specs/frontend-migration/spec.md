# Spec: Migração do Frontend Google AI Studio

## Metadata
- **Feature**: frontend-migration
- **Status**: Draft
- **Created**: 2024-12-11
- **Author**: Claude (Anthropic)

---

## 1. Resumo Executivo

### Objetivo
Substituir completamente o frontend atual do WellWave pelo design desenvolvido no Google AI Studio, mantendo backend, autenticação e integrações existentes.

### Escopo
- Migração de componentes visuais (Sidebar, Header, Cards)
- Migração de protocolos médicos detalhados (10 síndromes)
- Migração de sistema de referências médicas
- Manutenção de funcionalidades existentes (auth, chat, API)

---

## 2. Requisitos Funcionais

### RF-01: Layout Principal
- **Descrição**: Implementar novo layout com Sidebar e Header
- **Origem**: `components/Sidebar.tsx`, `components/Header.tsx`
- **Critérios de Aceite**:
  - [ ] Sidebar com navegação funcional
  - [ ] Header com busca e ações
  - [ ] Layout responsivo (mobile/desktop)
  - [ ] Tema dark/light funcionando

### RF-02: Dashboard com Métricas
- **Descrição**: Implementar cards de métricas médicas
- **Origem**: `components/cards/*.tsx`
- **Critérios de Aceite**:
  - [ ] Card de pressão arterial com gráfico
  - [ ] Card de frequência cardíaca
  - [ ] Cards de estatísticas menores
  - [ ] Card de resumo do paciente
  - [ ] Dados conectados via React Query

### RF-03: Protocolos de Anamnese
- **Descrição**: Implementar 10 protocolos médicos detalhados
- **Origem**: `App.tsx` (função `getProtocolData`)
- **Critérios de Aceite**:
  - [ ] Dor Torácica (HEART Score)
  - [ ] Déficit Neurológico - AVC (NIHSS)
  - [ ] Dispneia (Wells Score)
  - [ ] Síncope/Tontura (OESIL Score)
  - [ ] Dor Abdominal (Alvarado Score)
  - [ ] Cefaleia (Ottawa Rule)
  - [ ] Febre/Sepse (qSOFA/NEWS2)
  - [ ] Lombalgia/Cólica Renal
  - [ ] Trauma/Queda (Glasgow)
  - [ ] Agitação/Psiquiátrico

### RF-04: Sistema de Referências
- **Descrição**: Painel com referências médicas estruturadas
- **Origem**: `App.tsx` (função `getStructuredReferences`)
- **Critérios de Aceite**:
  - [ ] Links para diretrizes (SBC, AHA, WSES, etc.)
  - [ ] Nível de evidência exibido
  - [ ] Organizado por síndrome

### RF-05: Contexto Clínico
- **Descrição**: Alertas por categoria de paciente
- **Origem**: `App.tsx` (função `getCategoryContext`)
- **Critérios de Aceite**:
  - [ ] Contexto pediátrico
  - [ ] Contexto geriátrico
  - [ ] Contexto obstétrico

---

## 3. Requisitos Não-Funcionais

### RNF-01: Compatibilidade
- Manter compatibilidade com Next.js 16 App Router
- Usar componentes shadcn/ui existentes
- Não quebrar autenticação Supabase

### RNF-02: Performance
- Tempo de carregamento < 3s
- Lazy loading de componentes pesados
- Otimização de bundle com recharts

### RNF-03: Acessibilidade
- Seguir padrões WCAG 2.1
- Navegação por teclado
- Contraste adequado em ambos os temas

---

## 4. Dependências

### Novas Dependências
```json
{
  "recharts": "^3.5.1"
}
```

### Dependências Existentes (Manter)
- next-themes
- @radix-ui/*
- framer-motion
- lucide-react
- tailwindcss

---

## 5. Arquivos de Origem (Frontend)

| Arquivo | Tamanho | Descrição |
|---------|---------|-----------|
| `App.tsx` | 61KB | Componente monolítico (dividir) |
| `ThemeContext.tsx` | 1.2KB | Contexto de tema |
| `types.ts` | 841B | Interfaces TypeScript |
| `components/Header.tsx` | 12KB | Header com busca |
| `components/Sidebar.tsx` | 5.5KB | Navegação lateral |
| `components/cards/BloodPressureCard.tsx` | 2.3KB | Card de PA |
| `components/cards/HeartRateCard.tsx` | 2.9KB | Card de FC |
| `components/cards/MedicationsCard.tsx` | 4.4KB | Card de medicamentos |
| `components/cards/RemindersCard.tsx` | 6.7KB | Card de lembretes |
| `components/cards/SmallStatsCards.tsx` | 6.1KB | Cards pequenos |
| `components/cards/SummaryCard.tsx` | 3.7KB | Card de resumo |

---

## 6. Arquivos de Destino (Oficial)

### Novos Arquivos
```
types/medical.ts
lib/medical/syndromes.ts
lib/medical/references.ts
lib/medical/protocols.ts
lib/medical/clinical-context.ts
components/layout/sidebar.tsx
components/layout/header.tsx
components/layout/app-shell.tsx
components/dashboard/cards/blood-pressure-card.tsx
components/dashboard/cards/heart-rate-card.tsx
components/dashboard/cards/medications-card.tsx
components/dashboard/cards/reminders-card.tsx
components/dashboard/cards/small-stats-cards.tsx
components/dashboard/cards/summary-card.tsx
components/anamnese/protocol-selector.tsx
components/anamnese/reference-panel.tsx
```

### Arquivos Modificados
```
app/(dashboard)/layout.tsx
app/(dashboard)/dashboard/page.tsx
app/(dashboard)/anamnese/[syndrome]/page.tsx
package.json
tailwind.config.ts (se necessário)
prisma/seed.ts
```

### Arquivos Intocados
```
app/api/*
lib/db/*
lib/ai/*
middleware.ts
prisma/schema.prisma
components/auth/*
components/chat/*
```

---

## 7. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Quebra de autenticação | Baixa | Alto | Não modificar middleware.ts |
| Conflitos de estilo | Média | Médio | Usar sistema shadcn existente |
| Performance degradada | Média | Médio | Lazy loading, tree shaking |
| Incompatibilidade de tipos | Alta | Baixo | Adaptar interfaces |
| Perda de funcionalidades | Baixa | Alto | Testes E2E completos |

---

## 8. Critérios de Sucesso

1. **Funcional**: Todas as funcionalidades existentes continuam funcionando
2. **Visual**: Novo design implementado conforme frontend
3. **Técnico**: Zero erros de TypeScript, testes passando
4. **Deploy**: Aplicação funcional em produção

---

## 9. Referências

- Frontend repo: https://github.com/Wesley-codeDr/Oficial-frontend-
- Documentação detalhada: `/docs/frontend-integration.md`
- Plano de execução: `/.claude/plans/quiet-seeking-firefly.md`
