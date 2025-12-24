# Feature Specification: Anamnese Médica (Apple HIG iOS17)

## Overview

**Feature Name:** Anamnese Médica com Apple HIG iOS17
**Version:** 1.0.0
**Status:** Draft
**Author:** WellWave Product & Design
**Created:** 2025-12-22
**Last Updated:** 2025-12-22

## Problem Statement

A interface atual de anamnese não segue rigorosamente o Apple Human Interface Guidelines (HIG) e carece de componentes nativos iOS17, validações clínicas em tempo real, priorização de gravidade e colaboração multiprofissional. Isso impacta a eficiência do atendimento, a segurança clínica e a consistência de registros, especialmente em contextos de emergência.

- Contexto: fluxo de anamnese distribuído por síndromes e checklists.
- Impacto: aumento de tempo de atendimento, risco de inconsistências clínicas e baixa usabilidade em mobile.
- Importância: melhoria da qualidade de atendimento e aderência a padrões médicos (CID-10, SNOMED CT, LOINC).
- Evidências: feedback clínico interno, resultados de testes E2E e tempo médio de preenchimento.

## Solution Summary

Redesenho completo da interface de anamnese com design system Apple HIG iOS17, utilizando Next.js 15 (React Server Components, TypeScript strict), tokens baseados em SF Pro, componentes atômicos (atoms/molecules/organisms), validação clínica em tempo real, sistema de priorização de gravidade, autocomplete com ML usando histórico do paciente, modo de emergência otimizado, integração com terminologias (CID-10, SNOMED CT, LOINC) e painel de colaboração multiprofissional via Supabase Realtime.

- Resolve o problema: melhora usabilidade, segurança e velocidade.
- Benefícios: redução do tempo de atendimento, menor erro clínico, padronização.
- Diferenciais: HIG rigoroso, validação clínica live, emergência mode e colaboração.

## User Stories

### US-001: Seleção e preenchimento por categorias
**Como** médico plantonista
**Quero** navegar por categorias dinâmicas com checkboxes nativos iOS
**Para que** eu preencha rápido e com consistência clínica

**Critérios de Aceitação:**
- [ ] Categorias exibidas por especialidade e síndrome
- [ ] Checkboxes com preview de narrativa
- [ ] Gestos táteis para navegação entre seções

**Prioridade:** Alta
**Complexidade:** Média

### US-002: Validação clínica em tempo real
**Como** médico
**Quero** ver inconsistências clínicas sinalizadas imediatamente
**Para que** eu evite combinações inválidas e riscos

**Critérios de Aceitação:**
- [ ] Regras de validação por especialidade
- [ ] Mensagens acessíveis (VoiceOver/Dynamic Type)
- [ ] Sugestão de correções

**Prioridade:** Alta
**Complexidade:** Alta

### US-003: Prioridade de gravidade
**Como** equipe de triagem
**Quero** ver uma priorização automática por gravidade
**Para que** casos críticos sejam atendidos primeiro

**Critérios de Aceitação:**
- [ ] Indicador visual de status crítico
- [ ] Algoritmo considerando red flags e sinais vitais
- [ ] Atualização dinâmica conforme o preenchimento

**Prioridade:** Alta
**Complexidade:** Média

### US-004: Autocomplete com histórico
**Como** médico
**Quero** sugestões inteligentes baseadas no histórico do paciente
**Para que** eu ganhe velocidade e mantenha contexto

**Critérios de Aceitação:**
- [ ] Sugestões inline com explicabilidade
- [ ] Controles de privacidade e consentimento
- [ ] Fallback quando sem dados

**Prioridade:** Média
**Complexidade:** Alta

### US-005: Colaboração em tempo real
**Como** equipe multiprofissional
**Quero** colaborar simultaneamente na mesma anamnese
**Para que** o registro seja construído de forma coordenada

**Critérios de Aceitação:**
- [ ] Presença e edição em tempo real (Supabase Realtime)
- [ ] Logs de atividades
- [ ] Conflitos resolvidos com merging otimista

**Prioridade:** Alta
**Complexidade:** Alta

## Functional Requirements

### FR-001: Design System Apple HIG iOS17
Tokens: tipografia SF Pro, cores iOS, radius, sombras, motion, haptics. Componentes: checkbox iOS, segmented control, progress/status, emergency bar.

**Aceite:**
- [ ] Tokens centralizados em `lib/design/tokens.ts`
- [ ] Componentes em `components/ui/ios/*`

**Dependências:** Tailwind, Radix/shadcn (opcional), Next.js RSC.

### FR-002: Navegação por categorias dinâmicas
Estrutura de categorias por especialidade/síndrome em `lib/anamnese/categories.ts` com prioridade e ordenação.

**Aceite:**
- [ ] Segmented control com gestos
- [ ] Seções com checkboxes e narrativa

**Dependências:** Store/estado, testes E2E.

### FR-003: Validação clínica em tempo real
Motor de validação em `lib/anamnese/validation.ts` com regras de exclusão mútua, obrigatoriedade e red flags.

**Aceite:**
- [ ] UI exibe mensagens acessíveis
- [ ] Bloqueios críticos com explicação

**Dependências:** Terminologias, dados de síndrome.

### FR-004: Algoritmo de gravidade
Cálculo de severidade em `lib/anamnese/severity.ts` usando pesos de red flags e sinais.

**Aceite:**
- [ ] Classes: low/moderate/high/critical
- [ ] Atualização dinâmica

**Dependências:** Validação, categorias.

### FR-005: Autocomplete (ML)
Stub de ML em `lib/ai/anamneseAutocomplete.ts` consumindo histórico.

**Aceite:**
- [ ] Sugestões com score e justificativa
- [ ] API/SDK futura para modelo

**Dependências:** Dados do paciente, privacidade.

### FR-006: Modo Emergência
UI reduzida e otimizada, `components/anamnese/EmergencyModeBar.tsx`, foco em críticos.

**Aceite:**
- [ ] Layout condensado
- [ ] Ações rápidas

**Dependências:** Severidade, validação.

### FR-007: Terminologia médica padronizada
Mapeamento em `lib/anamnese/terminology.ts` para CID-10, SNOMED CT, LOINC (somente estrutura e exemplos). Nenhum dataset completo embutido.

**Aceite:**
- [ ] Normalização de códigos
- [ ] Export para API

**Dependências:** API routes, compliance.

### FR-008: Colaboração em tempo real
`components/anamnese/CollaborationPanel.tsx` com Supabase Realtime (presence, eventos).

**Aceite:**
- [ ] Lista de participantes
- [ ] Eventos de edição

**Dependências:** Supabase client.

## Non-Functional Requirements

### NFR-001: Acessibilidade
- VoiceOver (aria, roles)
- Dynamic Type (respeito ao tamanho do sistema)
- Contraste (dark mode adaptativo)

### NFR-002: Performance
- Server-first (RSC)
- Client components só para interação
- Prefers-reduced-motion respeitado

### NFR-003: Segurança e Privacidade
- Sem dados sensíveis em logs
- Consentimento para uso de histórico no ML
- RLS via Supabase

## Success Criteria

| Critério | Meta | Método de Verificação |
|-----------|-------|----------------------|
| Tempo de preenchimento | -25% | E2E + métricas de uso |
| Erros de validação | -40% | Logs de inconsistências |
| Aderência HIG | 100% | Review de design + checklist |

## Technical Constraints

### TC-001: Web Haptics
Vibration API indisponível no iOS Safari. Fallback com microinterações visuais.

**Impacto:** Haptic real depende de app nativo; usar feedback visual.

### TC-002: Fonts SF Pro
Sem distribuição de fontes proprietárias. Usar `-apple-system`/system-ui como fallback.

**Impacto:** Garantir tipografia similar sem embutir fontes Apple.

## Dependencies

### Externas
- Supabase Realtime: presença/edição
- OpenAI/Vercel AI SDK: futuro autocomplete ML

### Internas
- `lib/supabase/*`: clientes
- `lib/anamnese/*`: regras e categorias

## Scope Boundaries

### Incluído
- UI HIG iOS17
- Validação, severidade, emergência
- Colaboração básica

### Excluído
- Modelo ML produtivo (apenas stub)
- Listas completas CID/SNOMED/LOINC (apenas estrutura)

## Risks and Mitigations

| Risco | Impacto | Probabilidade | Mitigação |
|--------|---------|---------------|------------|
| Aderência incompleta ao HIG | Médio | Média | Checklist e revisão de design |
| Falta de haptics | Baixo | Alta | Microinterações e animações |
| Performance client-side | Alto | Média | RSC, lazy load, memoização |

## Key Entities

### Category
- id: string
- name: string
- priority: number
- fields: Field[]

### Field
- id: string
- label: string
- narrative: string
- required: boolean
- redFlag: boolean

## Assumptions

1. Histórico do paciente disponível via API.
2. Supabase configurado com chaves públicas/privadas.
3. Dispositivos iOS predominantes no uso mobile.

## Glossary

| Termo | Definição |
|--------|-----------|
| Red flag | Sinal clínico de gravidade alta |
| Dynamic Type | Ajuste de fonte pelo sistema |

## References

- Apple Human Interface Guidelines
- docs/architecture/system-overview.md
- docs/SPEC_KIT_IMPLEMENTATION.md

## Appendix

### A. UI Checklist HIG
- Tipografia, espaçamentos, cores iOS
- Gestos, estados, acessibilidade

---

## Validation Checklist

### Review de Especificação
- [ ] Problema claramente definido
- [ ] Solução alinhada com o problema
- [ ] User stories completas com critérios de aceite
- [ ] Requisitos funcionais e não-funcionais claros
- [ ] Critérios de sucesso mensuráveis
- [ ] Dependências identificadas
- [ ] Riscos avaliados com planos de mitigação

### Review Técnico
- [ ] Viabilidade técnica confirmada
- [ ] Restrições técnicas documentadas
- [ ] Arquitetura considerada
- [ ] Impacto em sistemas existentes avaliado

### Review de Negócio
- [ ] Alinhamento com objetivos de negócio
- [ ] ROI justificado
- [ ] Prioridade de negócio definida
- [ ] Stakeholders consultados

---

**History of Changes**

| Data | Versão | Autor | Mudanças |
|-------|---------|--------|-----------|
| 2025-12-22 | 1.0.0 | WellWave | Primeira versão (Draft) |
