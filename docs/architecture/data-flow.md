# Data Flow

Resumo dos fluxos principais do WellWave. Para a visao completa, veja `docs/architecture/system-overview.md`.

## Autenticacao

1. Cliente inicia login via Supabase Auth.
2. Token JWT e sessao sao usados nas rotas protegidas.
3. RLS garante acesso somente aos dados do usuario.

## Anamnese

1. Frontend carrega sindrome e categorias.
2. Usuario seleciona itens e gera narrativa em tempo real.
3. Sessao e texto podem ser persistidos no banco.

## Chat EBM

1. Contexto clinico e enviado para o backend.
2. IA processa e retorna resposta com streaming.
3. Resposta e citacoes podem ser armazenadas para auditoria.
