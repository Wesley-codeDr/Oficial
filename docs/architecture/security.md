# Security

Diretrizes basicas para protecao de dados clinicos.

## Principios

- Minimo privilegio e RLS no Supabase.
- Segredos apenas em variaveis de ambiente.
- Sem dados sensiveis em logs.

## Controles

- JWT + Supabase Auth.
- Criptografia em transito (TLS).
- Auditoria de acesso a dados.
