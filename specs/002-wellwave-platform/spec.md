# Feature Specification: WellWave Platform MVP

## Overview

**Feature Name:** WellWave - Plataforma de Anamnese Digital com IA para Emergências
**Version:** 1.0.0
**Status:** Draft
**Author:** WellWave Team
**Created:** 2024-12-08
**Last Updated:** 2024-12-08

## Problem Statement

Médicos emergencistas enfrentam alta pressão temporal para documentar atendimentos de forma completa, juridicamente robusta e em conformidade com normas do CFM. O processo tradicional de anamnese consome tempo excessivo (5+ minutos por paciente), frequentemente resulta em documentação incompleta e expõe profissionais a riscos médico-legais.

## Solution Summary

WellWave é uma plataforma digital que converte seleções objetivas (checkboxes) em narrativas médicas completas em segundos. O sistema utiliza IA para gerar textos formais, coesos e alinhados com diretrizes clínicas, incluindo negativações relevantes para proteção jurídica.

## User Stories

### US-001: Anamnese Expressa por Checkboxes
**Como** médico emergencista
**Quero** selecionar sintomas e achados através de checkboxes organizados por síndrome
**Para que** eu possa gerar uma anamnese completa em menos de 90 segundos

**Critérios de Aceitação:**
- [ ] Checkboxes organizados por síndromes (dor torácica, dispneia, abdome agudo)
- [ ] Perguntas obrigatórias claramente marcadas (QP, HDA, antecedentes, alergias)
- [ ] Sinais de alarme (red flags) destacados visualmente
- [ ] Negativas importantes incluídas automaticamente no texto
- [ ] Geração de texto em tempo real conforme checkboxes são marcados

### US-002: Visualização Split-Screen
**Como** médico
**Quero** ver os checkboxes e o texto gerado lado a lado
**Para que** eu possa acompanhar a narrativa sendo construída em tempo real

**Critérios de Aceitação:**
- [ ] Layout split-screen responsivo (esquerda: checkboxes, direita: texto)
- [ ] Destaque visual de trechos alterados ao marcar novos checkboxes
- [ ] Indicação clara de campos obrigatórios faltantes
- [ ] Modo resumido (PS) e expandido (internação) disponíveis

### US-003: Exportação e Cópia
**Como** médico
**Quero** copiar ou exportar a anamnese gerada
**Para que** eu possa integrar ao prontuário do hospital

**Critérios de Aceitação:**
- [ ] Botão de cópia rápida para clipboard
- [ ] Exportação em formato texto plano
- [ ] Preservação da formatação médica padrão
- [ ] Metadados de geração (timestamp, versão do sistema)

### US-004: Chat Médico EBM
**Como** médico
**Quero** consultar um assistente de IA com a anamnese do paciente
**Para que** eu receba sugestões de hipóteses diagnósticas e condutas baseadas em evidência

**Critérios de Aceitação:**
- [ ] Envio automático do contexto (anamnese + exame físico + sinais vitais)
- [ ] Respostas com hipóteses diagnósticas principais e diferenciais
- [ ] Citações estruturadas (PMID/DOI) e diretrizes nacionais
- [ ] Indicação de nível de evidência (GRADE)
- [ ] Alertas de red flags obrigatoriamente exibidos

### US-005: Autenticação de Médicos
**Como** médico
**Quero** fazer login seguro na plataforma
**Para que** minhas anamneses sejam atribuídas ao meu perfil profissional

**Critérios de Aceitação:**
- [ ] Login via email/senha
- [ ] Validação de CRM (manual no MVP)
- [ ] Sessão segura com timeout configurável
- [ ] Logout manual disponível

## Requirements

### Functional Requirements

### FR-001: Sistema de Checkboxes Inteligentes
- Organização por síndromes: dor torácica, dispneia, abdome agudo
- Estrutura por bloco: QP, HDA, antecedentes, alergias, medicações, hábitos
- Auto-sugestão de perguntas baseada em combinações de respostas
- Destaque de campos críticos faltantes

### FR-002: Motor de Geração de Texto
- Templates para: identificação, QP, HDA, antecedentes, hábitos, alergias, exame físico
- Linguagem formal, terceira pessoa, estilo prontuário
- Inclusão automática de negativas relevantes
- Coerência cronológica sem contradições

### FR-003: Interface Apple Design Language 2025
- Glassmorphism (blur, transparência, camadas)
- Tipografia SF Pro Display/Text (ou equivalente web)
- Paleta neutra com acentos discretos
- Animações suaves (Framer Motion)

### FR-004: Chat Médico EBM
- Entrada: dados estruturados da anamnese + exame físico + sinais vitais
- Saída: hipóteses, exames recomendados, condutas com doses
- Citações estruturadas obrigatórias
- Guardrails: checagem de dados mínimos, verificação de interações

### FR-005: Alertas Clínicos
- Sinais de alarme destacados por cor/ícone
- Alertas de inconsistência (ex: dor torácica sem fatores de risco)
- Sugestão de registro jurídico adicional

## Non-Functional Requirements

### NFR-001: Performance
- Tempo de carregamento inicial: < 2s
- Tempo de resposta do motor de texto: < 1.5s
- Tempo médio de anamnese completa: < 90s

### NFR-002: Disponibilidade
- Uptime: ≥ 99.9%
- Recuperação de falhas: < 5 minutos

### NFR-003: Segurança
- Criptografia AES-256 em repouso
- TLS 1.3 em trânsito
- Conformidade LGPD
- Auditoria de ações médicas

### NFR-004: Usabilidade
- Interface intuitiva para uso sob pressão
- Suporte a ambientes escuros de plantão
- Responsivo para tablets (uso comum em PS)

### NFR-005: Compliance
- CFM/SBIS para PEP
- LGPD para dados de saúde
- Documentação à prova de auditoria

## Technical Constraints

### TC-001: Stack Obrigatória
- Frontend: Next.js 15.x+ (App Router), React, Tailwind CSS, shadcn/ui
- Backend: NestJS + Fastify (quando necessário API própria)
- Database: PostgreSQL via Supabase
- Auth: Supabase Auth
- AI: OpenAI API com streaming SSE

### TC-002: Infraestrutura
- Deploy: Vercel (frontend)
- Backend services: Supabase
- Storage: Supabase Storage
- Observability: Sentry

### TC-003: Design
- Apple Design Language 2025 obrigatório
- Glassmorphism como padrão visual
- SF Pro ou equivalente como tipografia

## Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Tempo médio anamnese | < 90s | Analytics de uso |
| Cobertura campos obrigatórios | ≥ 95% | Validação automática |
| Respostas EBM com citação | ≥ 95% | Log de respostas |
| CSAT médicos | ≥ 4.6/5 | Survey pós-uso |
| Uptime | ≥ 99.9% | Monitoring |

## Out of Scope (MVP)

- Prescrição digital com assinatura ICP-Brasil
- Integração SADT/TISS com operadoras
- LME para CEAF/SUS
- PWA/mobile com offline
- Input por voz
- Integrações FHIR com prontuários externos
- Multi-tenancy por hospital

## Dependencies

### External Dependencies
- Supabase (Auth, Database, Storage)
- OpenAI API (ou equivalente)
- Vercel (hosting)

### Internal Dependencies
- Design system WellWave (a ser criado)
- Templates médicos por síndrome
- Base de conhecimento EBM

## Risks and Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Qualidade do texto gerado inadequada | Alto | Médio | Templates revisados por médicos, testes com especialistas |
| Latência da API de IA | Médio | Médio | Streaming SSE, cache de respostas parciais |
| Rejeição por médicos | Alto | Baixo | UX testing com emergencistas, iteração rápida |
| Conformidade CFM questionada | Alto | Baixo | Consultoria jurídica, disclaimers claros |

## Appendix

### A. Síndromes MVP

1. **Dor Torácica / Cardiovascular**
   - QP: localização, irradiação, intensidade, duração
   - Red flags: síncope, dispneia, sudorese, náusea
   - Antecedentes: HAS, DM, DLP, tabagismo, história familiar

2. **Dispneia / Respiratória**
   - QP: início, fator desencadeante, evolução
   - Red flags: cianose, uso de musculatura acessória, alteração de consciência
   - Antecedentes: asma, DPOC, ICC, tabagismo

3. **Abdome Agudo**
   - QP: localização, irradiação, tipo de dor, evolução
   - Red flags: febre, vômitos, parada de eliminação de gases/fezes
   - Antecedentes: cirurgias prévias, constipação crônica

### B. Estrutura de Texto Gerado

```
ANAMNESE

IDENTIFICAÇÃO: [Nome], [Idade] anos, [Sexo], [Ocupação].

QUEIXA PRINCIPAL: [QP] há [tempo].

HISTÓRIA DA DOENÇA ATUAL: [Narrativa cronológica...]

NEGA: [Negativas relevantes].

ANTECEDENTES PESSOAIS: [Lista de comorbidades ou "Nega comorbidades prévias"].

MEDICAÇÕES EM USO: [Lista ou "Nega uso de medicações contínuas"].

ALERGIAS: [Lista ou "Nega alergias medicamentosas conhecidas"].

HÁBITOS: [Tabagismo, etilismo, drogas ou "Nega tabagismo, etilismo ou uso de drogas ilícitas"].

EXAME FÍSICO: [Achados dirigidos por síndrome].
```

### C. Referências

- PRD completo: `/docs/PRD.md`
- Constitution: `/memory/constitution.md`
- Human Interface Guidelines (Apple)
- Resoluções CFM pertinentes
