# Configuração de GitHub Actions para Validação de Specs

## Visão Geral

Este workflow valida a estrutura de `docs/` e `specs/` e executa as checagens definidas em `scripts/validate-specs.sh`.

## Workflow: spec-validation.yml

Localização:
```
.github/workflows/spec-validation.yml
```

## Gatilhos

```yaml
on:
  pull_request:
    paths:
      - 'specs/**'
      - 'docs/**'
  push:
    branches:
      - main
      - develop
    paths:
      - 'specs/**'
      - 'docs/**'
  workflow_dispatch:
```

## Job principal

```yaml
jobs:
  validate-specs:
    runs-on: ubuntu-latest
    name: Validate Specs

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: chmod +x scripts/validate-specs.sh
      - run: ./scripts/validate-specs.sh
```

## O que o script valida

- Estrutura de diretorios e templates obrigatorios
- Secoes minimas em `spec.md`
- OpenAPI em `specs/**/contracts/openapi.yaml`
- Links em Markdown (via `npx markdown-link-check`)
