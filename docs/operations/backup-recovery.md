# Backup e recovery

Diretrizes gerais para proteção e recuperação de dados.

## Banco de dados (Supabase)

- Verifique se backups automáticos estão habilitados.
- Documente a janela de retenção e o processo de restore.
- Antes de grandes mudanças, gere snapshot manual quando possível.

## Aplicação (Vercel)

- Use deployments imutáveis para facilitar rollback.
- Registre a versão do commit em cada deploy.

## Checklist de recuperação

- Confirmar a causa raiz.
- Restaurar dados a partir do snapshot correto.
- Validar integridade e acessos (RLS).
- Comunicar status e próximos passos.
