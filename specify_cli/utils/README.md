# Spec-Kit Utils

Este diretório contém utilitários compartilhados usados pela CLI Spec-Kit.

## Funções Disponíveis

### File System Utils
- `readSpec(specPath: string)` - Lê especificação
- `writeSpec(specPath: string, content: string)` - Escreve especificação
- `listSpecs()` - Lista todas as especificações
- `archiveSpec(specPath: string)` - Arquiva especificação

### Validation Utils
- `validateStructure(path: string)` - Valida estrutura de diretórios
- `checkPrerequisites()` - Verifica pré-requisitos do projeto
- `validateMarkdown(content: string)` - Valida sintaxe Markdown

### Path Utils
- `getSpecPath(featureName: string)` - Retorna caminho da spec
- `getPlanPath(featureName: string)` - Retorna caminho do plano
- `getTasksPath(featureName: string)` - Retorna caminho das tarefas

### Template Utils
- `loadTemplate(templateName: string)` - Carrega template
- `applyTemplate(template: string, data: object)` - Aplica variáveis ao template

## Estrutura

```typescript
// Utilitários devem ser puras e testáveis
export function utilFunction(input: InputType): OutputType {
  // Implementação
}
```

## Testes

Todos os utilitários devem ter testes unitários.

Testes em: `tests/unit/specify_cli/`

