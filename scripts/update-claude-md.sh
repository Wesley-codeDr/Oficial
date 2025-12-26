#!/bin/bash
# Update CLAUDE.md with latest Spec-Kit instructions and project context

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common.sh"

PROJECT_ROOT=$(get_project_root)
CLAUDE_MD="$PROJECT_ROOT/CLAUDE.md"
AGENTS_MD="$PROJECT_ROOT/AGENTS.md"
CONSTITUTION="$PROJECT_ROOT/memory/constitution.md"
README="$PROJECT_ROOT/README.md"

log_info "Updating CLAUDE.md with latest Spec-Kit standards..."

# Check if CLAUDE.md exists
if [ ! -f "$CLAUDE_MD" ]; then
    log_error "CLAUDE.md not found"
    exit 1
fi

# Backup existing CLAUDE.md
BACKUP_FILE="${CLAUDE_MD}.backup.$(date +%Y%m%d_%H%M%S)"
cp "$CLAUDE_MD" "$BACKUP_FILE"
log_success "Backup created: $BACKUP_FILE"

# Extract key information from constitution
CONSTITUTION_VERSION=$(grep "^**Version:**" "$CONSTITUTION" | head -1 | sed 's/**Version: //' | sed 's/**//')
LAST_AMENDED=$(grep "^**Last Amended:**" "$CONSTITUTION" | head -1 | sed 's/**Last Amended: //' | sed 's/**//')

# Extract project name from README
PROJECT_NAME=$(grep -m 1 "^# " "$README" | sed 's/^# //')

# Update CLAUDE.md header
cat > "$CLAUDE_MD" << EOF
# Claude Configuration - ${PROJECT_NAME}

Este arquivo contém instruções e contexto para o Claude ao trabalhar neste projeto.

## Metadados do Projeto
- **Nome:** ${PROJECT_NAME}
- **Versão da Constitution:** ${CONSTITUTION_VERSION}
- **Última Atualização:** ${LAST_AMENDED}
- **Metodologia:** Spec-Driven Development com GitHub Spec-Kit

## Contexto do Projeto

Este projeto utiliza **Spec-Driven Development** com o GitHub Spec-Kit. Todas as features devem seguir o workflow de especificação → plano → tarefas → implementação.

## Workflow Obrigatório

### Regra de Ouro
\`\`\`
SEM SPEC → SEM CÓDIGO
\`\`\`

### Fases de Desenvolvimento

1. **ESPECIFICAÇÃO** - Especificação detalhada da feature
2. **PLANEJAMENTO** - Plano de implementação completo
3. **TAREFAS** - Breakdown em tarefas executáveis
4. **IMPLEMENTAÇÃO** - Código seguindo as tarefas
5. **REVISÃO** - Code review e testes
6. **DOCUMENTAÇÃO** - Atualização de docs

## Comandos do Spec-Kit

### /speckit.plan
Gera ou atualiza o plano de implementação (\`plan.md\`) baseado na especificação (\`spec.md\`).

**Uso:**
\`\`\`
/speckit.plan

Vamos usar [tecnologia/stack] para implementar esta feature.
[Detalhes adicionais sobre escolhas técnicas]
\`\`\`

### /speckit.tasks
Gera o breakdown de tarefas (\`tasks.md\`) baseado no plano (\`plan.md\`).

**Uso:**
\`\`\`
/speckit.tasks
\`\`\`

### /speckit.implement
Executa a implementação seguindo as tarefas definidas em \`tasks.md\`.

**Uso:**
\`\`\`
/speckit.implement
\`\`\`

**O que faz:**
- Valida que constitution, spec, plan e tasks existem
- Executa tarefas na ordem correta
- Respeita dependências entre tarefas
- Executa tarefas paralelas quando marcadas com \`\`[P]\`\`
- Segue abordagem TDD quando definida

### /speckit.archive
Arquiva uma specification concluída e move para histórico.

**Uso:**
\`\`\`
/speckit.archive <feature-name>
\`\`\`

## Scripts Disponíveis

### setup-plan.sh
Cria estrutura para nova feature especificação.

\`\`\`bash
./scripts/setup-plan.sh <feature-name>
\`\`\`

Cria:
- \`specs/XXX-feature-name/spec.md\` - Especificação
- \`specs/XXX-feature-name/plan.md\` - Plano
- \`specs/XXX-feature-name/tasks.md\` - Tarefas
- \`specs/XXX-feature-name/research.md\` - Pesquisa
- \`specs/XXX-feature-name/data-model.md\` - Modelo de dados
- \`specs/XXX-feature-name/quickstart.md\` - Guia rápido

### check-prerequisites.sh
Verifica pré-requisitos do projeto.

\`\`\`bash
./scripts/check-prerequisites.sh
\`\`\`

Verifica:
- Git
- Node.js
- pnpm
- TypeScript
- Prisma
- Estrutura do projeto
- Variáveis de ambiente

### validate-specs.sh
Valida especificações contra padrões Spec-Kit.

\`\`\`bash
./scripts/validate-specs.sh
\`\`\`

### archive-spec.sh
Arquiva especificações concluídas.

\`\`\`bash
./scripts/archive-spec.sh <feature-name>
\`\`\`

### update-claude-md.sh
Atualiza CLAUDE.md (este script).

\`\`\`bash
./scripts/update-claude-md.sh
\`\`\`

## Padrões de Desenvolvimento

### Spec-Driven Development
1. **NUNCA** comece a codificar sem uma especificação aprovada
2. **SEMPRE** valide o plano antes de implementar
3. **SEMPRE** siga as tarefas na ordem correta
4. **SEMPRE** atualize a documentação
5. **SEMPRE** respeite as dependências entre tarefas

### Qualidade de Código
- Siga \`memory/constitution.md\` rigorosamente
- Use TypeScript strict mode
- Escreva código legível e bem documentado
- Use nomes descritivos
- Siga padrões da linguagem/framework

### Testes
- Escreva testes apropriados para todas as features
- Use TDD quando especificado no plano
- Mantenha cobertura de testes adequada
- Testes devem ser executáveis e claros

### Documentação
- Mantenha README atualizado
- Documente APIs e componentes principais
- Atualize \`AGENTS.md\` conforme necessário
- Mantenha changelog atualizado

## Estrutura de Especificações

Cada feature deve ter a seguinte estrutura:

\`\`\`
specs/XXX-feature-name/
├── spec.md              # OBRIGATÓRIO antes de qualquer código
├── plan.md              # OBRIGATÓRIO antes de implementar
├── tasks.md             # OBRIGATÓRIO antes de implementar
├── research.md          # Pesquisa e descobertas
├── data-model.md        # Modelo de dados
├── quickstart.md        # Guia de desenvolvimento
├── checklists/
│   └── requirements.md  # Checklist de requisitos
└── contracts/          # Contratos de API
    ├── api-spec.json    # Especificação OpenAPI
    └── *.md            # Outras especificações
\`\`\`

## Validações Obrigatórias

Antes de escrever QUALQUER código, verifique:

- [ ] \`memory/constitution.md\` existe e foi lido
- [ ] \`specs/[feature-name]/spec.md\` existe e foi lido
- [ ] \`specs/[feature-name]/plan.md\` existe e foi lido
- [ ] \`specs/[feature-name]/tasks.md\` existe e foi lido
- [ ] Plano segue a arquitetura do projeto
- [ ] Tarefas respeitam as dependências
- [ ] Código segue a constitution

## Tecnologias e Ferramentas

### Frontend
- Framework: Next.js 15 (App Router)
- UI: React 19 + shadcn/ui
- Styling: Tailwind CSS
- State: Zustand + TanStack Query
- Animations: Framer Motion

### Backend
- Framework: NestJS + Fastify
- ORM: Prisma
- Database: PostgreSQL (Supabase)
- Auth: Supabase Auth

### Desenvolvimento
- Package Manager: pnpm
- Language: TypeScript
- Testing: Vitest + Playwright
- Linting: ESLint + Prettier
- CI/CD: GitHub Actions

### Observabilidade
- Error Tracking: Sentry
- Logging: Winston (backend)
- Analytics: (TBD)

## Convenções de Commit

Use Conventional Commits:

\`\`\`
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
\`\`\`

Types: \`feat\`, \`fix\`, \`docs\`, \`style\`, \`refactor\`, \`test\`, \`chore\`

Exemplos:
- \`feat(auth): add OAuth2 login\`
- \`fix(database): resolve connection timeout\`
- \`docs(readme): update installation guide\`

## Erros Comuns a Evitar

### ❌ NÃO FAÇA:
1. Codificar sem especificação
2. Pular fases do workflow
3. Ignorar dependências entre tarefas
4. Implementar fora da ordem
5. Não testar antes de commitar
6. Não documentar mudanças

### ✅ FAÇA:
1. Sempre comece com uma spec
2. Siga o workflow rigorosamente
3. Valide tudo antes de implementar
4. Escreva testes apropriados
5. Documente tudo claramente
6. Use \`pnpm\` para dependências

## Referências

- GitHub Spec-Kit: https://github.com/github/spec-kit
- AGENTS.md: Guia completo para agentes de IA
- Constitution: \`memory/constitution.md\`
- Contributing: \`CONTRIBUTING.md\`

## Ajuda

Se tiver dúvidas:
1. Consulte \`AGENTS.md\` primeiro
2. Verifique \`memory/constitution.md\`
3. Consulte \`CONTRIBUTING.md\`
4. Revise exemplos em \`specs/\`

---

**LEMBRETE:**
> "A especificação não é um obstáculo - é a fundação que garante código de qualidade, arquitetura sólida e desenvolvimento eficiente."

**Sem spec, não há código.**
EOF

log_success "CLAUDE.md updated successfully!"
log_info "Changes based on:"
log_info "  - Constitution version: $CONSTITUTION_VERSION"
log_info "  - Project name: $PROJECT_NAME"
log_info "  - Last amended: $LAST_AMENDED"
log_info ""
log_info "Backup saved to: $BACKUP_FILE"

