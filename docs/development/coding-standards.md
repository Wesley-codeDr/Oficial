# Coding Standards

Regras simples para manter consistencia de codigo e reduzir retrabalho.

## TypeScript e lint

- `strict` habilitado em `tsconfig.json`.
- ESLint: `eslint.config.mjs`
- Prettier: `.prettierrc`

## Imports

- Prefira aliases `@/` para caminhos absolutos (ex.: `@/components/...`).
- Evite imports relativos longos.

## React e Next.js

- Server Components por padrao; use `"use client"` apenas quando necessario.
- Evite acesso direto a `window`, `document`, `navigator` sem guardas.
- Para browser-only, use `globalThis` e verifique existencia.

## Estilo de codigo

- Prefira `const` e funcoes pequenas.
- Nomeie componentes e arquivos de forma descritiva.
- Evite logar dados sensiveis.
