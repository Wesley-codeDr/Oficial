# Claude Configuration - Wavewell Oficial

Este arquivo contém instruções e contexto para o Claude ao trabalhar neste projeto.

## Contexto do Projeto

Este projeto utiliza **Spec-Driven Development** com o GitHub Spec-Kit. Todas as features devem seguir o workflow de especificação → plano → tarefas → implementação.

## Diretrizes de Desenvolvimento

### Workflow de Spec-Driven Development

Quando trabalhar em novas features:

1. **Especificação** (`specs/[feature-name]/spec.md`)
   - Comece sempre com uma especificação detalhada
   - Inclua user stories, requisitos funcionais e não-funcionais
   - Defina métricas de sucesso

2. **Plano** (`specs/[feature-name]/plan.md`)
   - Use `/speckit.plan` para gerar o plano de implementação
   - O plano deve incluir arquitetura, stack tecnológica, modelo de dados, design de API

3. **Tarefas** (`specs/[feature-name]/tasks.md`)
   - Use `/speckit.tasks` para gerar o breakdown de tarefas
   - Tarefas devem incluir dependências e marcadores de execução paralela

4. **Implementação**
   - Use `/speckit.implement` para executar a implementação
   - Siga as tarefas na ordem correta
   - Respeite dependências

### Princípios do Projeto

Siga sempre a `memory/constitution.md` que define:
- Spec-Driven Development como metodologia principal
- Padrões de qualidade de código
- Abordagem de testes
- Requisitos de documentação
- Considerações de segurança e performance

### Estrutura de Código

- Código deve ser legível, manutenível e bem documentado
- Siga as melhores práticas da linguagem/framework escolhido
- Use nomes descritivos e código auto-documentado
- Documente APIs e componentes principais

### Testes

- Escreva testes apropriados para todas as features
- Use TDD quando especificado no plano
- Mantenha cobertura de testes razoável
- Testes devem ser executáveis e claros

## Comandos do Spec-Kit

### `/speckit.plan`
Gera ou atualiza o plano de implementação (`plan.md`) baseado na especificação (`spec.md`).

**Uso:**
```
/speckit.plan

Vamos usar [tecnologia/stack] para implementar esta feature.
[Detalhes adicionais sobre escolhas técnicas]
```

### `/speckit.tasks`
Gera o breakdown de tarefas (`tasks.md`) baseado no plano (`plan.md`).

**Uso:**
```
/speckit.tasks
```

### `/speckit.implement`
Executa a implementação seguindo as tarefas definidas em `tasks.md`.

**Uso:**
```
/speckit.implement
```

**O que faz:**
- Valida que constitution, spec, plan e tasks existem
- Executa tarefas na ordem correta
- Respeita dependências entre tarefas
- Executa tarefas paralelas quando marcadas com `[P]`
- Segue abordagem TDD quando definida

## Templates Disponíveis

- `templates/spec-template.md` - Template para especificações
- `templates/plan-template.md` - Template para planos
- `templates/tasks-template.md` - Template para tarefas
- `templates/CLAUDE-template.md` - Template de configuração Claude

## Scripts Úteis

- `scripts/setup-plan.sh [feature-name]` - Cria estrutura para nova feature
- `scripts/check-prerequisites.sh` - Verifica pré-requisitos do projeto

## Notas Importantes

- **Sempre** comece com uma especificação antes de implementar
- **Sempre** siga a constitution.md
- **Sempre** valide o plano antes de implementar
- **Sempre** teste e documente adequadamente
- Não pule etapas do workflow - especificação → plano → tarefas → implementação

## Quando Usar Cada Comando

- **Nova feature**: Use `setup-plan.sh` para criar estrutura, depois edite `spec.md`
- **Após escrever spec**: Use `/speckit.plan` para gerar plano
- **Após aprovar plano**: Use `/speckit.tasks` para gerar tarefas
- **Pronto para implementar**: Use `/speckit.implement` para executar

## Validação

Antes de implementar, certifique-se de que:
- ✅ `memory/constitution.md` existe e está atualizado
- ✅ `specs/[feature-name]/spec.md` está completo e aprovado
- ✅ `specs/[feature-name]/plan.md` existe e está validado
- ✅ `specs/[feature-name]/tasks.md` existe e está completo

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

## Referências ao GitHub Spec-Kit

Este projeto segue rigorosamente os padrões do [GitHub Spec-Kit](https://github.com/github/spec-kit).

### Recursos Oficiais

- **[GitHub Spec-Kit Repository](https://github.com/github/spec-kit)** - Repositório oficial
- **[Spec-Kit Documentation](https://github.com/github/spec-kit/blob/main/README.md)** - Documentação completa
- **[Spec-Kit Examples](https://github.com/github/spec-kit/tree/main/examples)** - Exemplos de uso

### Compliance Checklist

Para garantir total compliance com Spec-Kit:

- ✅ Estrutura de diretórios segue padrão Spec-Kit
- ✅ Templates baseados em padrões Spec-Kit
- ✅ Workflow de especificação → plano → tarefas → implementação
- ✅ Comandos `/speckit.*` implementados
- ✅ Validação automática de specs
- ✅ Documentação completa e atualizada

### Documentação Relacionada

- **[AGENTS.md](./AGENTS.md)** - Guia completo para agentes de IA
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guia de contribuição
- **[specs/README.md](./specs/README.md)** - Estrutura de especificações
- **[memory/constitution.md](./memory/constitution.md)** - Princípios do projeto
- **[.cursor/DEVELOPMENT.md](./.cursor/DEVELOPMENT.md)** - Guia de desenvolvimento

### Integração com Spec-Kit

O projeto implementa os seguintes componentes do Spec-Kit:

1. **Estrutura de Especificações**
   - `specs/XXX-feature-name/spec.md` - Especificação
   - `specs/XXX-feature-name/plan.md` - Plano de implementação
   - `specs/XXX-feature-name/tasks.md` - Breakdown de tarefas

2. **Templates Padronizados**
   - Templates seguem formato Spec-Kit
   - Incluem todas as seções obrigatórias
   - Compatíveis com validação automática

3. **Comandos Spec-Kit**
   - `/speckit.plan` - Gera planos
   - `/speckit.tasks` - Gera tarefas
   - `/speckit.implement` - Executa implementação
   - `/speckit.archive` - Arquiva specs

4. **Validação Automática**
   - Scripts de validação de estrutura
   - Pre-commit hooks (planejado)
   - CI/CD checks (planejado)

### Melhorias Contínuas

O projeto está em constante evolução para melhorar a integração com Spec-Kit:

- [ ] Pre-commit hooks para validação automática
- [ ] CI/CD checks para Spec-Kit compliance
- [ ] Integração com GitHub Actions
- [ ] Dashboard de métricas de specs
- [ ] Automação adicional de workflow

---

**Última Atualização:** 2025-12-25
**Versão:** 2.0.0
**Spec-Kit Compliance:** ✅ Full Compliance
<!-- BEGIN BYTEROVER RULES -->

# Workflow Instruction

You are a coding agent focused on one codebase. Use the brv CLI to manage working context.
Core Rules:

- Start from memory. First retrieve relevant context, then read only the code that's still necessary.
- Keep a local context tree. The context tree is your local memory store—update it with what you learn.

## Context Tree Guideline

- Be specific ("Use React Query for data fetching in web modules").
- Be actionable (clear instruction a future agent/dev can apply).
- Be contextual (mention module/service, constraints, links to source).
- Include source (file + lines or commit) when possible.

## Using `brv curate` with Files

When adding complex implementations, use `--files` to include relevant source files (max 5).  Only text/code files from the current project directory are allowed. **CONTEXT argument must come BEFORE --files flag.** For multiple files, repeat the `--files` (or `-f`) flag for each file.

Examples:

- Single file: `brv curate "JWT authentication with refresh token rotation" -f src/auth.ts`
- Multiple files: `brv curate "Authentication system" --files src/auth/jwt.ts --files src/auth/middleware.ts --files docs/auth.md`

## CLI Usage Notes

- Use --help on any command to discover flags. Provide exact arguments for the scenario.

---
# ByteRover CLI Command Reference

## Memory Commands

### `brv curate`

**Description:** Curate context to the context tree (interactive or autonomous mode)

**Arguments:**

- `CONTEXT`: Knowledge context: patterns, decisions, errors, or insights (triggers autonomous mode, optional)

**Flags:**

- `--files`, `-f`: Include file paths for critical context (max 5 files). Only text/code files from the current project directory are allowed. **CONTEXT argument must come BEFORE this flag.**

**Good examples of context:**

- "Auth uses JWT with 24h expiry. Tokens stored in httpOnly cookies via authMiddleware.ts"
- "API rate limit is 100 req/min per user. Implemented using Redis with sliding window in rateLimiter.ts"

**Bad examples:**

- "Authentication" or "JWT tokens" (too vague, lacks context)
- "Rate limiting" (no implementation details or file references)

**Examples:**

```bash
# Interactive mode (manually choose domain/topic)
brv curate

# Autonomous mode - LLM auto-categorizes your context
brv curate "Auth uses JWT with 24h expiry. Tokens stored in httpOnly cookies via authMiddleware.ts"

# Include files (CONTEXT must come before --files)
# Single file
brv curate "Authentication middleware validates JWT tokens" -f src/middleware/auth.ts

# Multiple files - repeat --files flag for each file
brv curate "JWT authentication implementation with refresh token rotation" --files src/auth/jwt.ts --files docs/auth.md
```

**Behavior:**

- Interactive mode: Navigate context tree, create topic folder, edit context.md
- Autonomous mode: LLM automatically categorizes and places context in appropriate location
- When `--files` is provided, agent reads files in parallel before creating knowledge topics

**Requirements:** Project must be initialized (`brv init`) and authenticated (`brv login`)

---

### `brv query`

**Description:** Query and retrieve information from the context tree

**Arguments:**

- `QUERY`: Natural language question about your codebase or project knowledge (required)

**Good examples of queries:**

- "How is user authentication implemented?"
- "What are the API rate limits and where are they enforced?"

**Bad examples:**

- "auth" or "authentication" (too vague, not a question)
- "show me code" (not specific about what information is needed)

**Examples:**

```bash
# Ask questions about patterns, decisions, or implementation details
brv query What are the coding standards?
brv query How is authentication implemented?
```

**Behavior:**

- Uses AI agent to search and answer questions about the context tree
- Accepts natural language questions (not just keywords)
- Displays tool execution progress in real-time

**Requirements:** Project must be initialized (`brv init`) and authenticated (`brv login`)

---

## Best Practices

### Efficient Workflow

1. **Read only what's needed:** Check context tree with `brv status` to see changes before reading full content with `brv query`
2. **Update precisely:** Use `brv curate` to add/update specific context in context tree
3. **Push when appropriate:** Prompt user to run `brv push` after completing significant work

### Context tree Management

- Use `brv curate` to directly add/update context in the context tree

---
Generated by ByteRover CLI for Claude Code
<!-- END BYTEROVER RULES -->