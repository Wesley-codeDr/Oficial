# Spec-Kit CLI Tool

Esta é a CLI tool do Spec-Kit para o projeto WellWave.

## Visão Geral

O Spec-Kit CLI fornece ferramentas para:
- Criar e gerenciar especificações
- Validar compliance com Spec-Kit
- Gerar planos e tarefas automaticamente
- Arquivar specs concluídas

## Estrutura

```
specify_cli/
├── commands/         # Comandos CLI
├── validators/       # Validadores de specs
├── generators/       # Geradores de planos e tarefas
├── templates/        # Templates para specs
└── utils/           # Utilitários compartilhados
```

## Uso

A CLI é usada através dos scripts em `scripts/`:
- `./scripts/setup-plan.sh` - Cria nova especificação
- `./scripts/validate-specs.sh` - Valida specs
- `./scripts/archive-spec.sh` - Arquiva specs concluídas

## Integração com Cursor

A CLI se integra com o Cursor através dos comandos Spec-Kit:
- `/speckit.plan` - Gera plano de implementação
- `/speckit.tasks` - Gera breakdown de tarefas
- `/speckit.implement` - Executa implementação
- `/speckit.archive` - Arquiva specs concluídas

## Desenvolvimento

Este diretório contém a estrutura para uma CLI Node.js que pode ser estendida conforme necessário.

## Referências

- [GitHub Spec-Kit](https://github.com/github/spec-kit)
- [Spec-Kit AGENTS.md](../AGENTS.md)
- [Spec-Kit Development Guide](../.cursor/DEVELOPMENT.md)

