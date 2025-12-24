# Resposta a incidentes

Processo mínimo para lidar com incidentes em produção.

## Fluxo básico

1. **Detectar**: alertas (Sentry), logs, reports do time.
2. **Classificar**: impacto em usuários e serviços críticos.
3. **Mitigar**: rollback, feature flag, hotfix.
4. **Comunicar**: status e expectativas para stakeholders.
5. **Aprender**: postmortem e ações preventivas.

## Severidade sugerida

- **SEV-1**: indisponibilidade total ou risco clínico direto.
- **SEV-2**: degradação relevante ou perda parcial de função.
- **SEV-3**: impacto limitado, workaround disponível.
