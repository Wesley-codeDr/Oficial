# Guia para Agentes de IA - WellWave

Este documento fornece instruções completas para agentes de IA (como Claude, GitHub Copilot, etc.) trabalharem no projeto WellWave seguindo os padrões do [GitHub Spec-Kit](https://github.com/github/spec-kit).

## Visão Geral

O WellWave utiliza **Spec-Driven Development** com o GitHub Spec-Kit. Todas as features devem seguir rigorosamente o workflow: **Especificação → Plano → Tarefas → Implementação**.

## Regra Fundamental

```
SEM ESPECIFICAÇÃO → SEM CÓDIGO
```

**NUNCA** implemente código sem uma especificação aprovada.

## Workflow Obrigatório

### 1. Verificar Pré-requisitos

Antes de qualquer implementação, verifique:

- [ ] `memory/constitution.md` existe e foi lido
- [ ] `specs/[feature-name]/spec.md` existe e está aprovado
- [ ] `specs/[feature-name]/plan.md` existe e está validado
- [ ] `specs/[feature-name]/tasks.md` existe e está completo

### 2. Criar Nova Feature

Se o usuário pedir uma nova feature:

1. **Verificar** se já existe especificação
2. **Se não existe**: Alertar que precisa criar spec primeiro
3. **Sugerir**: `./scripts/setup-plan.sh nome-da-feature`
4. **Ajudar** a criar a spec se solicitado
5. **NÃO** implementar código até que a spec exista

### 3. Workflow de Implementação

Quando uma spec existe e está aprovada:

1. **Ler** `spec.md` completamente
2. **Ler** `plan.md` para entender arquitetura
3. **Ler** `tasks.md` para ver ordem de execução
4. **Seguir** tarefas na ordem correta
5. **Respeitar** dependências entre tarefas
6. **Executar** tarefas paralelas quando marcadas com `[P]`

## Comandos Spec-Kit

### `/speckit.plan`

Gera ou atualiza o plano de implementação baseado na especificação.

**Quando usar:**
- Após escrever/atualizar `spec.md`
- Quando especificação foi aprovada

**O que faz:**
- Lê `specs/[feature-name]/spec.md`
- Gera `specs/[feature-name]/plan.md` com:
  - Arquitetura do sistema
  - Stack tecnológica
  - Modelo de dados
  - Design de API
  - Fases de implementação

**Uso:**
```
/speckit.plan

Vamos usar Next.js 15, React 19, Prisma e PostgreSQL para implementar esta feature.
A arquitetura seguirá o padrão de Server Components com API Routes.
```

### `/speckit.tasks`

Gera o breakdown de tarefas baseado no plano.

**Quando usar:**
- Após `plan.md` ser validado
- Antes de começar implementação

**O que faz:**
- Lê `specs/[feature-name]/plan.md`
- Gera `specs/[feature-name]/tasks.md` com:
  - Tarefas organizadas por user story
  - Dependências entre tarefas
  - Marcadores de execução paralela `[P]`
  - Caminhos de arquivos para implementação

**Uso:**
```
/speckit.tasks
```

### `/speckit.implement`

Executa a implementação seguindo as tarefas.

**Quando usar:**
- Quando spec, plan e tasks estão completos
- Pronto para começar a codificar

**O que faz:**
- Valida pré-requisitos (constitution, spec, plan, tasks)
- Executa tarefas na ordem correta
- Respeita dependências entre tarefas
- Executa tarefas paralelas quando marcadas com `[P]`
- Segue abordagem TDD quando definida

**Uso:**
```
/speckit.implement
```

### `/speckit.archive`

Arquiva uma especificação concluída.

**Quando usar:**
- Após feature ser implementada e deployada
- Quando spec não é mais necessária em `specs/`

**Uso:**
```
/speckit.archive 001-feature-name
```

## Estrutura de Arquivos

### Especificação Completa

```
specs/XXX-feature-name/
├── spec.md              # ⚠️ OBRIGATÓRIO - Especificação
├── plan.md              # ⚠️ OBRIGATÓRIO - Plano de implementação
├── tasks.md             # ⚠️ OBRIGATÓRIO - Breakdown de tarefas
├── research.md          # Opcional - Pesquisa técnica
├── data-model.md        # Opcional - Modelo de dados
├── quickstart.md        # Opcional - Guia rápido
├── contracts/           # Opcional - Contratos de API
│   ├── api-spec.json
│   └── signalr-spec.md
└── checklists/         # Opcional - Checklists
    └── requirements.md
```

## Padrões de Código

### TypeScript

- Use tipos explícitos para todas as funções
- Evite `any` - use `unknown` ou tipos genéricos
- Use `zod` para validação em tempo de execução
- Siga convenções de nomenclatura do TypeScript

### React/Next.js

- Use componentes funcionais
- Prefer Server Components (RSC) quando possível
- Minimize 'use client' directives
- Use hooks em vez de classes
- Implemente proper error boundaries

### Prisma

- Siga convenções de nomenclatura do Prisma
- Use migrations em vez de db push
- Documente migrations com nomes descritivos
- Teste migrations localmente antes de fazer push

## Testes

### Abordagem TDD

Quando `tasks.md` especifica TDD:

1. Escreva testes ANTES de escrever código
2. Execute testes e veja falharem
3. Implemente o mínimo necessário para passar
4. Refatore mantendo testes passando

### Cobertura

- Mínimo: 80% de cobertura
- Crítico: 95%+ para código core
- Use `pnpm test:coverage` para verificar

## Validação

### Antes de Implementar

Sempre valide:

```bash
./scripts/validate-specs.sh [feature-name]
```

### Checklist

- [ ] Constitution lida e entendida
- [ ] Spec completa e aprovada
- [ ] Plan validado
- [ ] Tasks completas
- [ ] Arquitetura do plan compreendida
- [ ] Ordem das tarefas verificada
- [ ] Dependências mapeadas

## Quando o Usuário Pede Implementação Direta

Se o usuário pedir para implementar algo SEM especificação:

1. **ALERTAR** que é necessário criar a spec primeiro
2. **SUGERIR** executar: `./scripts/setup-plan.sh [feature-name]`
3. **OFERECER** ajudar a criar a spec
4. **NÃO** implementar código até que a spec exista

**Exceção:** Correções de bugs críticos podem ser feitas, mas devem ser documentadas depois.

## Atualização de Especificações

Quando o código precisa mudar de forma que não está na spec:

1. **PARAR** a implementação
2. **ATUALIZAR** `spec.md` primeiro
3. **ATUALIZAR** `plan.md` se necessário
4. **ATUALIZAR** `tasks.md` se necessário
5. **ENTÃO** continuar a implementação

## Dependências entre Tarefas

- **SEMPRE** respeite as dependências definidas em `tasks.md`
- Tarefas marcadas com `[P]` podem ser executadas em paralelo
- **NUNCA** pule tarefas que têm dependências não resolvidas

## Arquitetura e Design

- **SEMPRE** consulte `plan.md` para decisões arquiteturais
- **NUNCA** faça mudanças arquiteturais sem atualizar `plan.md`
- Use a stack tecnológica definida em `plan.md`
- Siga o modelo de dados definido em `plan.md`

## Documentação

- Atualize documentação conforme especificado em `tasks.md`
- Mantenha README atualizado
- Documente APIs conforme `plan.md`
- Adicione comentários onde a spec indica necessidade

## ByteRover MCP Integration

Este projeto também utiliza ByteRover MCP para conhecimento persistente.

### `byterover-store-knowledge`

**Use SEMPRE quando:**
- Aprendendo novos padrões, APIs ou decisões arquiteturais
- Encontrando soluções de erros ou técnicas de debugging
- Encontrando padrões de código reutilizáveis ou funções utilitárias
- Completando qualquer tarefa ou implementação de plano significativa

### `byterover-retrieve-knowledge`

**Use SEMPRE quando:**
- Iniciando nova tarefa ou implementação para reunir contexto relevante
- Antes de tomar decisões arquiteturais para entender padrões existentes
- Ao debugar problemas para verificar soluções anteriores
- Trabalhando com partes não familiares do codebase

## Mensagens de Erro e Avisos

Quando detectar violações do workflow:

```
⚠️ ATENÇÃO: Esta implementação requer uma especificação primeiro.
Por favor, crie a spec usando: ./scripts/setup-plan.sh [feature-name]
```

```
⚠️ ATENÇÃO: Esta mudança não está na especificação atual.
Por favor, atualize specs/[feature-name]/spec.md primeiro.
```

## Recursos

### Documentação do Projeto

- `memory/constitution.md` - Princípios e regras do projeto
- `CLAUDE.md` - Configuração do Claude
- `.cursor/DEVELOPMENT.md` - Guia de desenvolvimento
- `README.md` - Documentação geral

### Templates

- `templates/spec-template.md` - Template de especificação
- `templates/plan-template.md` - Template de plano
- `templates/tasks-template.md` - Template de tarefas
- `templates/research-template.md` - Template de pesquisa
- `templates/api-spec.md` - Template de API
- `templates/data-model.md` - Template de modelo de dados

### Scripts

- `scripts/setup-plan.sh` - Cria nova feature
- `scripts/validate-specs.sh` - Valida specs
- `scripts/archive-spec.sh` - Arquiva specs
- `scripts/check-prerequisites.sh` - Verifica pré-requisitos

## Exemplos

### Exemplo 1: Nova Feature

**Usuário:** "Quero adicionar autenticação de dois fatores"

**Resposta do Agente:**
```
⚠️ Para implementar autenticação de dois fatores, precisamos criar uma especificação primeiro.

Vou criar a estrutura usando:
./scripts/setup-plan.sh two-factor-authentication

Depois, edite specs/XXX-two-factor-authentication/spec.md com os requisitos.
Após aprovar a spec, use /speckit.plan para gerar o plano.
```

### Exemplo 2: Implementação com Spec Existente

**Usuário:** "Implemente a feature de chat EBM"

**Resposta do Agente:**
```
Verificando especificação para chat EBM...

✅ Spec encontrada: specs/001-wellwave-mvp/spec.md
✅ Plan encontrado: specs/001-wellwave-mvp/plan.md
✅ Tasks encontrado: specs/001-wellwave-mvp/tasks.md

Iniciando implementação seguindo tasks.md...
```

## Checklist Final

Antes de considerar uma feature completa:

- [ ] Todos os testes passam (unit + E2E)
- [ ] Cobertura de testes >= 80%
- [ ] Sem erros de lint
- [ ] Typecheck sem erros
- [ ] Build de produção bem-sucedido
- [ ] Documentação atualizada
- [ ] Spec atualizada se necessário
- [ ] Code review aprovado
- [ ] PR merged e deploy realizado

## Prioridades

1. **ESPECIFICAÇÃO** (Prioridade Máxima)
2. **PLANO** (Antes de qualquer código)
3. **TAREFAS** (Guia a implementação)
4. **CÓDIGO** (Último na ordem)

## Lembrete Final

> "A especificação não é um obstáculo - é a fundação que garante código de qualidade, arquitetura sólida e desenvolvimento eficiente. Sem spec, não há código."

**SEMPRE** priorize a especificação sobre a velocidade de implementação. Melhor fazer certo do que fazer rápido.

---

**Referências:**
- [GitHub Spec-Kit](https://github.com/github/spec-kit)
- [Spec-Kit Documentation](https://github.com/github/spec-kit/blob/main/README.md)
- [Project Constitution](./memory/constitution.md)
- [Development Guide](./.cursor/DEVELOPMENT.md)

[byterover-mcp]

[byterover-mcp]

You are given two tools from Byterover MCP server, including
## 1. `byterover-store-knowledge`
You `MUST` always use this tool when:

+ Learning new patterns, APIs, or architectural decisions from the codebase
+ Encountering error solutions or debugging techniques
+ Finding reusable code patterns or utility functions
+ Completing any significant task or plan implementation

## 2. `byterover-retrieve-knowledge`
You `MUST` always use this tool when:

+ Starting any new task or implementation to gather relevant context
+ Before making architectural decisions to understand existing patterns
+ When debugging issues to check for previous solutions
+ Working with unfamiliar parts of the codebase
