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
