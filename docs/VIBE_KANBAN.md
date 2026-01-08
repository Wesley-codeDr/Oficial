# Vibe Kanban Integration Guide

Este documento descreve como usar o Vibe Kanban para gerenciar tarefas do projeto WellWave.

## Visão Geral

O Vibe Kanban foi integrado ao projeto para fornecer uma visualização centralizada de todas as tarefas do projeto. As tarefas são sincronizadas bidirecionalmente entre os arquivos `tasks.md` (usados pelo workflow Spec-Driven) e o Vibe Kanban.

## Pré-requisitos

- Node.js instalado
- pnpm instalado
- Cursor Agent CLI instalado (para autenticação com Vibe Kanban)

## Setup Inicial

### 1. Executar Setup

```bash
pnpm kanban:setup
```

Este comando:
- Verifica pré-requisitos
- Instala Cursor Agent CLI se necessário
- Cria diretório `.vibe-kanban/`
- Cria arquivo de configuração

### 2. Autenticar com Cursor Agent CLI

```bash
agent login
```

Ou configure a variável de ambiente:
```bash
export CURSOR_API_KEY="sua-chave-aqui"
```

### 3. Iniciar Vibe Kanban

```bash
npx vibe-kanban
```

Isso abrirá o Vibe Kanban no navegador.

## Migração de Tarefas Existentes

### Migrar Todas as Specs

```bash
pnpm kanban:migrate
```

Isso irá:
- Ler todos os arquivos `tasks.md` em `specs/`
- Converter tarefas para formato do Vibe Kanban
- Gerar arquivos JSON e Markdown em `.vibe-kanban/[spec-name]/`

### Migrar uma Spec Específica

```bash
pnpm kanban:migrate:spec 001-wellwave-mvp
```

### Arquivos Gerados

Para cada spec, os seguintes arquivos são gerados em `.vibe-kanban/[spec-name]/`:

- `kanban-import.json` - Formato JSON para importação no Vibe Kanban
- `kanban-tasks.md` - Formato Markdown para referência manual
- `summary.json` - Resumo estatístico das tarefas

## Sincronização

### Sincronização Bidirecional

```bash
pnpm kanban:sync
```

Sincroniza status de tarefas entre `tasks.md` e Vibe Kanban em ambas as direções.

### Sincronizar de tasks.md para Kanban

```bash
pnpm kanban:sync:to
```

Atualiza o Kanban com mudanças dos arquivos `tasks.md`.

### Sincronizar de Kanban para tasks.md

```bash
pnpm kanban:sync:from
```

Atualiza os arquivos `tasks.md` com mudanças do Kanban.

**Nota**: Para sincronizar do Kanban, você precisa exportar as tarefas do Vibe Kanban para `.vibe-kanban/[spec-name]/kanban-export.json` primeiro.

## Workflow Recomendado

### 1. Criar Nova Feature

1. Criar `specs/[feature-name]/spec.md`
2. Gerar `plan.md` e `tasks.md` usando Spec-Kit
3. Executar `pnpm kanban:migrate:spec [feature-name]` para migrar tarefas
4. Importar `kanban-import.json` no Vibe Kanban

### 2. Trabalhar em Tarefas

1. Atualizar status no Vibe Kanban (mover entre colunas)
2. Periodicamente executar `pnpm kanban:sync:from` para atualizar `tasks.md`
3. Commitar mudanças sincronizadas

### 3. Atualizar tasks.md Manualmente

1. Editar `tasks.md` diretamente
2. Executar `pnpm kanban:sync:to` para atualizar o Kanban
3. Ou executar `pnpm kanban:migrate:spec [spec-name]` para re-migrar

## Estrutura de Dados

### Formato de Tarefa no tasks.md

```markdown
- [x] [B] **T1.1.1** Descrição da tarefa
  - Arquivo: `path/to/file`
  - Dependências: T1.1
```

### Formato de Tarefa no Kanban

```json
{
  "title": "T1.1.1: Descrição da tarefa",
  "description": "Descrição completa...",
  "status": "done",
  "labels": ["spec:001-wellwave-mvp", "phase:Phase 1", "blocking"],
  "dependencies": ["T1.1"],
  "metadata": {
    "taskId": "T1.1.1",
    "spec": "001-wellwave-mvp",
    "phase": "Phase 1",
    "files": ["path/to/file"]
  }
}
```

## Mapeamento de Status

| tasks.md | Vibe Kanban |
|----------|-------------|
| `[x]` | `done` |
| `[ ]` | `todo` ou `in_progress` |

## Labels no Kanban

As tarefas são automaticamente rotuladas com:

- `spec:[spec-name]` - Identifica a spec
- `phase:[phase-name]` - Identifica a fase
- `blocking` - Tarefa bloqueante (marcador `[B]`)
- `parallel` - Tarefa paralela (marcador `[P]`)

## Resolução de Conflitos

Quando há conflitos entre `tasks.md` e Kanban:

- **Status**: Kanban tem prioridade (mais atualizado)
- **Estrutura**: `tasks.md` tem prioridade (fonte de verdade)
- **Dependências**: `tasks.md` tem prioridade

## Formatos Suportados

O parser suporta tarefas no formato:

```markdown
- [x] [B] **T1.1.1** Descrição da tarefa
- [ ] [P] **T1.1.2** Outra tarefa
```

**Nota**: Alguns arquivos `tasks.md` podem usar formatos diferentes (listas numeradas, etc.). Esses formatos não são suportados automaticamente. Converta para o formato de checkboxes antes de migrar.

## Troubleshooting

### Erro: "Kanban export not found"

**Solução**: Exporte as tarefas do Vibe Kanban para `.vibe-kanban/[spec-name]/kanban-export.json` antes de sincronizar.

### Erro: "tasks.md not found"

**Solução**: Verifique se o nome da spec está correto e se o arquivo `tasks.md` existe em `specs/[spec-name]/tasks.md`.

### Tarefas não aparecem no Kanban

**Solução**: 
1. Verifique se a migração foi executada: `pnpm kanban:migrate`
2. Verifique os arquivos gerados em `.vibe-kanban/`
3. Importe manualmente o arquivo `kanban-import.json` no Vibe Kanban

### Status não sincroniza

**Solução**:
1. Verifique se o formato do `kanban-export.json` está correto
2. Verifique se os IDs das tarefas correspondem entre `tasks.md` e Kanban
3. Execute `pnpm kanban:sync` novamente

### Erro: "ERR_PNPM_NO_IMPORTER_MANIFEST_FOUND"

Este erro ocorre quando o Vibe Kanban tenta executar comandos pnpm em um worktree temporário que não tem `package.json`.

**Causa**: O Vibe Kanban cria worktrees temporários para tarefas, mas esses diretórios não contêm o `package.json` do projeto.

**Soluções**:

1. **Desabilitar execução automática no Vibe Kanban** (recomendado):
   - No Vibe Kanban, desabilite a execução automática de comandos
   - Use o Vibe Kanban apenas para visualização e gerenciamento de tarefas
   - Execute comandos manualmente no terminal do projeto

2. **Usar o script wrapper** (se necessário executar comandos):
   - Se você precisar que o Vibe Kanban execute comandos, configure-o para usar o wrapper:
   ```bash
   # No Vibe Kanban, configure o executor para usar:
   /Users/wesleywillian/Oficial/Oficial/scripts/kanban/pnpm-wrapper.sh
   ```
   - O wrapper detecta worktrees e redireciona para o diretório raiz do projeto

3. **Configurar o diretório de trabalho manualmente**:
   - No Vibe Kanban, ao criar uma task attempt, configure o diretório de trabalho para:
   ```
   /Users/wesleywillian/Oficial/Oficial
   ```
   - Não use worktrees temporários para comandos pnpm

4. **Executar comandos no terminal do projeto** (mais seguro):
   - Use o terminal do projeto diretamente:
   ```bash
   cd /Users/wesleywillian/Oficial/Oficial
   pnpm kanban:migrate
   pnpm kanban:sync
   pnpm dev
   # etc.
   ```

**Recomendação**: O Vibe Kanban foi projetado principalmente para visualização e gerenciamento de tarefas. Para execução de comandos, use o terminal do projeto diretamente.

## Integração com Spec-Driven Workflow

O Vibe Kanban é totalmente compatível com o workflow Spec-Driven:

1. **Spec → Plan → Tasks**: Criação de `tasks.md` seguindo Spec-Kit
2. **Migração**: `pnpm kanban:migrate` para migrar para Kanban
3. **Trabalho**: Gerenciar tarefas no Kanban
4. **Sincronização**: `pnpm kanban:sync` para manter alinhado
5. **Commit**: Commitar mudanças sincronizadas

## Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `pnpm kanban:setup` | Setup inicial do Kanban |
| `pnpm kanban:migrate` | Migra todas as specs para Kanban |
| `pnpm kanban:migrate:spec [name]` | Migra uma spec específica |
| `pnpm kanban:sync` | Sincronização bidirecional |
| `pnpm kanban:sync:to` | Sincroniza tasks.md → Kanban |
| `pnpm kanban:sync:from` | Sincroniza Kanban → tasks.md |

## Referências

- [Vibe Kanban Documentation](https://vibekanban.com/docs)
- [Cursor Agent CLI Documentation](https://docs.cursor.com/en/cli)
- [Spec-Driven Development Guide](../CLAUDE.md)

