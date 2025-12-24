# Autenticação

O WellWave usa Supabase Auth com JWT e políticas de Row Level Security (RLS).

## Fluxo recomendado

1. Cliente autentica via Supabase Auth.
2. Token JWT é enviado automaticamente em cookies/headers pelo SDK.
3. Rotas protegidas validam sessão e aplicam RLS no banco.

## Referências no código

- Cliente: `lib/supabase/client.ts`
- Server helpers: `lib/supabase/server.ts`
- Middleware: `lib/supabase/middleware.ts`

## Boas práticas

- Nunca exponha Service Role no client.
- Evite logs com payload clínico.
- Mantenha scopes mínimos por rota.
