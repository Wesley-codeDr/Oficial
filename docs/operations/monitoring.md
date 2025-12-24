# Monitoramento

Visão geral das práticas de observabilidade do WellWave.

## Ferramentas

- **Sentry**: erros e performance (`sentry.*.config.ts`)
- **Logs**: eventos de API e rastreio de falhas
- **Supabase**: métricas de banco e conexões

## Sinais críticos

- Aumento de erros 5xx
- Latência acima do esperado em rotas de IA
- Falhas de autenticação ou RLS
