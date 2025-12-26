# Spec-Kit Generators

Este diretório contém geradores automáticos de planos e tarefas.

## Geradores Disponíveis

### Plan Generator
Gera `plan.md` a partir de `spec.md`.

**Gerado automaticamente por**: `/speckit.plan`

Contém:
- Arquitetura do sistema
- Stack tecnológica
- Modelo de dados
- Design de API
- Fases de implementação

### Tasks Generator
Gera `tasks.md` a partir de `plan.md`.

**Gerado automaticamente por**: `/speckit.tasks`

Contém:
- Tarefas organizadas por user story
- Dependências entre tarefas
- Marcadores de execução paralela `[P]`
- Caminhos de arquivos para implementação

## Estrutura

```typescript
export interface Generator {
  name: string;
  generate: (inputPath: string, outputPath: string) => Promise<void>;
}
```

## Integração com AI Agents

Os geradores são projetados para serem usados por agentes de IA:
- Cursor com Claude
- GitHub Copilot
- Outros agentes compatíveis

## Templates

Os geradores usam templates em `templates/` como base.

