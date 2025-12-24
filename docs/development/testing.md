# Testing

Visao geral de testes e comandos do projeto.

## Estrutura

- Unit tests: `tests/unit`
- E2E: `tests/e2e`
- Setup comum: `tests/setup.ts`

## Comandos

```bash
# Unit tests
pnpm test

# UI runner
pnpm test:ui

# Cobertura
pnpm test:coverage

# E2E
pnpm test:e2e
```

## Ferramentas

- Vitest (`vitest.config.ts`)
- Playwright (`playwright.config.ts`)

## Boas praticas

- Cubra caminhos criticos (anamnese, validacao, exportacao).
- Mantenha testes deterministas e sem dependencia externa.
