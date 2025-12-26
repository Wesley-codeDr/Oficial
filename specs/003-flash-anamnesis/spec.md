# Feature Specification: Flash Anamnesis (Anamnese WellWave)

## Overview

**Feature Name:** Flash Anamnesis Flow
**Version:** 1.0.0
**Status:** Approved
**Author:** Trae AI
**Created:** 2024-12-25
**Last Updated:** 2024-12-25

## Problem Statement

Users require a streamlined, high-speed anamnesis workflow for emergency (Pronto Socorro) scenarios. The standard anamnesis flow is too detailed for "fast track" cases. Users need a way to quickly identify the patient (adult/pediatric, gender), select a specific complaint (e.g., IVAS, Faringoamigdalite), fill only variable data (vital signs, specific symptoms), and instantly generate a medically legally compliant text record (prontuário) with gender flexion and correct formatting.

## Solution Summary

Implement a "Flash Anamnesis" flow accessible from the Sidebar.
The flow consists of 4 steps:

1.  **Identity:** Select Patient Category (Adult/Pediatric) and Gender (M/F).
2.  **Selection:** Choose a Complaint Template (e.g., IVAS, Faringoamigdalite).
3.  **Form:** Input variable data (Vitals, Glasgow, specific symptoms) into a dynamic form.
4.  **Preview:** View and copy the generated text record.

The solution leverages a template engine (`flashTemplates.ts`) that handles:

- Gender flexion (e.g., "corado"/"corada").
- Variable substitution (`{temperatura}`, `{pa_sistolica}`).
- Mandatory fields: Queixa Principal, Exame Físico, Hipótese Diagnóstica, Conduta, CID.
- "Pertinent Negatives" and "Follow-up Orientations" included in the templates.

## User Stories

### US-01: Quick Patient Identification

**Como** médico plantonista
**Quero** selecionar rapidamente se o paciente é adulto/criança e o sexo
**Para que** o texto gerado tenha a concordância de gênero correta (flexão de gênero) e os templates sejam adequados (ex: alertas de gestação).

**Critérios de Aceitação:**

- [ ] Interface com botões grandes para Adulto/Pediátrico.
- [ ] Seleção de sexo (M/F).
- [ ] Ao selecionar "Feminino", exibir opção condicional para marcar "Gestante".
- [ ] Transição suave para a próxima etapa.
- [ ] Opção Gestante deve ser clara e de fácil acesso após selecionar Feminino.

### US-02: Template Selection

**Como** médico
**Quero** escolher entre queixas comuns de pronto-socorro (ex: IVAS, Dor de Garganta)
**Para que** eu não precise digitar textos repetitivos.

**Critérios de Aceitação:**

- [ ] Lista de templates disponíveis.
- [ ] Busca por template (opcional para MVP, mas desejável).

### US-03: Variable Data Input

**Como** médico
**Quero** preencher apenas os dados variáveis (Sinais Vitais, Glasgow, tempo de sintomas)
**Para que** o restante do texto padrão seja mantido sem esforço.

**Critérios de Aceitação:**

- [ ] Formulário dinâmico baseado no template selecionado.
- [ ] Campos para PA, FC, FR, SpO2, Temp, Glasgow, etc.
- [ ] Seleção de "Tempo de Sintomas" via botões predefinidos (ex: 1 dia, 2 dias, 3 dias...) para agilidade.
- [ ] Opção de inserir valor manual caso não esteja nos botões.

### US-04: Record Generation & Preview

**Como** médico
**Quero** ver o texto final gerado com todas as substituições e flexões de gênero
**Para que** eu possa copiar e colar no prontuário eletrônico.

**Critérios de Aceitação:**

- [ ] Texto gerado contém 5 seções obrigatórias: Queixa Principal, Exame Físico, HD, Conduta, CID.
- [ ] CID deve ser formatado sem pontos (ex: J00 e não J00.X se assim solicitado, ou padrão J00).
- [ ] Flexão de gênero correta ("Orientado" vs "Orientada").
- [ ] Permite edição inline do texto gerado ao dar duplo clique, para ajustes finos antes da cópia.

## Functional Requirements

### FR-01: Template Engine

O sistema deve suportar templates com placeholders `{variable}` e lógica de gênero.
**Aceite:**

- [ ] Substituição correta de `{temperatura}`, `{fc}`, etc.
- [ ] Função helper para flexão de gênero `g('masc', 'fem')`.

### FR-02: Sidebar Integration

O acesso deve ser via Sidebar, ícone "Flash".
**Aceite:**

- [ ] Ícone dedicado na Sidebar.
- [ ] Clique abre o fluxo Flash, ocultando o Dashboard padrão.

## Non-Functional Requirements

### NFR-01: Performance

**Métricas:**

- Tempo de geração do texto < 200ms.
- Transições de tela fluidas (60fps).

### NFR-02: UI/UX (Apple Design)

**Métricas:**

- Uso de Glassmorphism.
- Botões com target size adequado (min 44px, ideal 56px).
- Animações de entrada/saída (Framer Motion).

## Technical Constraints

### TC-01: Data Persistence

Não é necessário salvar no banco de dados para o MVP, apenas gerar o texto para cópia. O foco é agilidade.
**Impacto:** Estado local React é suficiente.

## Dependencies

### Internas

- `flashTemplates.ts`: Definição dos templates.
- `FlashAnamnesisFlow.tsx`: Componente orquestrador.
- `Sidebar.tsx`: Navegação.
