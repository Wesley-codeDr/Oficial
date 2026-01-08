# Vibe Kanban - Configuração do Projeto

Este diretório contém arquivos gerados para integração com o Vibe Kanban.

## Estrutura

```
.vibe-kanban/
├── config.json              # Configuração do projeto
├── all-tasks-import.json    # Importação combinada de todas as specs
└── [spec-name]/             # Arquivos por spec
    ├── kanban-import.json   # Formato JSON para importação
    ├── kanban-tasks.md      # Formato Markdown para referência
    └── summary.json         # Estatísticas da spec
```

## Importação no Vibe Kanban

1. Inicie o Vibe Kanban: `npx vibe-kanban`
2. Importe os arquivos JSON usando a interface do Vibe Kanban
3. Ou use o arquivo combinado `all-tasks-import.json` para importar todas as tarefas de uma vez

## Sincronização

Para sincronizar tarefas entre `tasks.md` e Vibe Kanban:

```bash
# Sincronização bidirecional
pnpm kanban:sync

# Apenas para Kanban
pnpm kanban:sync:to

# Apenas de Kanban
pnpm kanban:sync:from
```

## Nota Importante sobre Execução de Comandos

⚠️ **O Vibe Kanban não deve ser usado para executar comandos pnpm diretamente.**

O Vibe Kanban cria worktrees temporários que não contêm `package.json`, causando erros ao tentar executar comandos pnpm.

**Use o terminal do projeto** para executar comandos:
- `pnpm kanban:migrate`
- `pnpm kanban:sync`
- `pnpm dev`
- etc.

O Vibe Kanban deve ser usado apenas para:
- Visualização de tarefas
- Gerenciamento de status
- Organização por labels e filtros

## Documentação Completa

Consulte [`docs/VIBE_KANBAN.md`](../docs/VIBE_KANBAN.md) para documentação completa.

