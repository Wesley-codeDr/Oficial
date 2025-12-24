# Rate limiting

Objetivo: proteger endpoints críticos e controlar custos de IA.

## Referência no código

- Utilitário base: `lib/rate-limit.ts`

## Diretrizes

- Aplique limites mais baixos em rotas de IA.
- Retorne `429` com headers de retry quando exceder o limite.
- Mantenha limites por usuário e por IP para reduzir abuso.
