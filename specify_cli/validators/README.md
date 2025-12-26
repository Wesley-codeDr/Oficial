# Spec-Kit Validators

Este diretório contém validadores para garantir compliance com Spec-Kit.

## Validadores Disponíveis

### Spec Validator
Valida que `spec.md` contém todas as seções obrigatórias.

### Plan Validator
Valida que `plan.md` segue a estrutura Spec-Kit padrão.

### Tasks Validator
Valida que `tasks.md` tem dependências e ordem correta.

### Constitution Validator
Valida que `constitution.md` existe e está atualizado.

### Template Validator
Valida que templates seguem padrões do projeto.

## Estrutura

```typescript
export interface Validator {
  name: string;
  validate: (filePath: string) => ValidationResult;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}
```

## Uso

Os validadores são usados por:
- Pre-commit hooks
- CI/CD pipelines
- Scripts de validação manual

