# Especificações - WellWave

Este diretório contém todas as especificações do projeto WellWave, organizadas numericamente.

## Estrutura Padronizada

Cada especificação segue esta estrutura:

```
specs/XXX-feature-name/
├── spec.md              # Especificação da feature (OBRIGATÓRIO)
├── plan.md              # Plano de implementação (OBRIGATÓRIO)
├── tasks.md             # Breakdown de tarefas (OBRIGATÓRIO)
├── contracts/           # Contratos de API (opcional)
│   ├── api-spec.json
│   └── signalr-spec.md
├── data-model.md        # Modelo de dados (opcional)
├── research.md          # Pesquisa técnica (opcional)
└── quickstart.md        # Guia de início rápido (opcional)
```

## Especificações Atuais

### 001-wellwave-mvp
- **Status**: Implementado
- **Descrição**: MVP do sistema WellWave com anamnese digital
- **Contém**: spec.md, plan.md, tasks.md, research.md, data-model.md, contracts/

### 002-wellwave-platform
- **Status**: Em desenvolvimento
- **Descrição**: Plataforma completa WellWave com múltiplas síndromes
- **Contém**: spec.md, research.md, anamnese-apple-hig.md

### 003-flash-anamnesis
- **Status**: Planejado
- **Descrição**: Sistema de anamnese rápida para triagem
- **Contém**: spec.md, plan.md, tasks.md

### 004-inslate-backend
- **Status**: Planejado
- **Descrição**: Backend e integrações com InSlate
- **Contém**: spec.md, plan.md, tasks.md

## Workflow de Especificação

### 1. Criar Nova Especificação

```bash
./scripts/setup-plan.sh nome-da-feature
```

Isso criará a estrutura base em `specs/XXX-nome-da-feature/`

### 2. Escrever Especificação

Edite `specs/XXX-nome-da-feature/spec.md` com:
- User stories
- Requisitos funcionais
- Requisitos não-funcionais
- Restrições técnicas
- Métricas de sucesso

### 3. Gerar Plano de Implementação

Use o comando `/speckit.plan` no Cursor Code para gerar `plan.md`.

### 4. Gerar Breakdown de Tarefas

Use o comando `/speckit.tasks` no Cursor Code para gerar `tasks.md`.

### 5. Migrar para Vibe Kanban (Opcional)

Após criar `tasks.md`, você pode migrar as tarefas para o Vibe Kanban para visualização e gerenciamento:

```bash
pnpm kanban:migrate:spec XXX-nome-da-feature
```

Isso gerará arquivos em `.vibe-kanban/XXX-nome-da-feature/` que podem ser importados no Vibe Kanban.

**Documentação completa**: [`docs/VIBE_KANBAN.md`](../docs/VIBE_KANBAN.md)

### 6. Implementar

Use o comando `/speckit.implement` no Cursor Code para executar a implementação.

## Templates

Templates padrão estão disponíveis em `specs/templates/`:

- `feature-spec.md` - Template de especificação de feature
- `api-spec.md` - Template de especificação de API
- `technical-design.md` - Template de design técnico
- `deployment-guide.md` - Template de guia de deploy

## Validação

Validar especificações antes de implementar:

```bash
./scripts/validate-specs.sh
```

## Nomenclatura

Siga estas regras para nomenclatura:

1. **Prefixo Numérico**: Use 3 dígitos (001, 002, 003, etc.)
2. **Kebab-case**: Use kebab-case para o nome da feature
3. **Descritivo**: Use nomes descritivos e curtos

Exemplos:
- `001-wellwave-mvp` ✅
- `002-user-authentication` ✅
- `003-red-flag-detection` ✅
- `feature` ❌ (sem número)
- `001_Feature` ❌ (sem kebab-case)
- `001-feature-name-muito-longo` ❌ (muito longo)

## Arquivos Obrigatórios

Para cada especificação, estes arquivos são OBRIGATÓRIOS antes da implementação:

- `spec.md` - Especificação aprovada
- `plan.md` - Plano de implementação validado
- `tasks.md` - Breakdown de tarefas completo

## Links Úteis

- [Templates](./templates/)
- [Development Guide](../docs/development/getting-started.md)
- [Coding Standards](../docs/development/coding-standards.md)
- [Spec-Kit Implementation](../docs/SPEC_KIT_IMPLEMENTATION.md)
- [GitHub Spec-Kit](https://github.com/github/spec-kit)

## Arquivamento

Quando uma especificação for concluída:

```bash
./scripts/archive-spec.sh XXX-nome-da-feature
```

Isso moverá a especificação para `specs/archived/XXX-nome-da-feature/`.
