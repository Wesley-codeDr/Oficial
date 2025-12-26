# Spec-Kit CLI Commands

Este diretório contém os comandos da CLI Spec-Kit.

## Comandos Disponíveis

### Criar Nova Feature
Cria uma nova especificação com estrutura completa.

### Validar Specs
Valida especificações contra templates e padrões Spec-Kit.

### Gerar Plano
Gera plano de implementação baseado na especificação.

### Gerar Tarefas
Gera breakdown de tarefas baseado no plano.

### Implementar
Executa implementação seguindo as tarefas.

### Arquivar
Arquiva especificações concluídas.

## Estrutura

```typescript
// Cada comando deve seguir esta estrutura
export interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => Promise<void>;
}
```

## Integração

Os comandos são invocados através dos scripts em `scripts/`.

