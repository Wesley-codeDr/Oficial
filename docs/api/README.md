# APIs WellWave

Visão geral da camada de APIs do WellWave e links para contratos e padrões adotados.

## Onde estão as APIs

- Rotas HTTP: `app/api/*`
- Contratos: `specs/1-wellwave-mvp/contracts/openapi.yaml`
- Tipos Supabase: `lib/supabase/types.ts`

## Padrões adotados

- [Autenticação](authentication.md)
- [Tratamento de erros](error-handling.md)
- [Rate limiting](rate-limiting.md)

## Convenções

- Prefira rotas REST simples para leitura.
- Use Server Actions quando a mutação for interna ao app.
- Evite dados sensíveis em logs e mensagens de erro.
